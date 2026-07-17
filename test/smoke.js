// End-to-end smoke test: boots server.js (plus a mock Unsplash API) and
// drives the real app in headless Chromium. Guards the invariants that have
// bitten this rescue before:
//   - the app boots to the editor with no requests to third-party hosts
//   - no fetch of the literal URL "/null" (dead-i18n regression)
//   - the avatar is local and actually rendered
//   - dead features stay hidden (no "New from Template" tile or menu entry)
//   - the Unsplash proxy works end-to-end and the LIBRARIES tab
//     appears/disappears with UNSPLASH_ACCESS_KEY
// ...and that the editor itself still works (a rename-sweep regression here
// would pass every boot-level check):
//   - drawing a rectangle on the canvas creates a scene node; undo/redo works
//   - PNG, SVG and PDF export produce well-formed non-empty output
//     (PDF goes through the real pdfexport worker)
//   - a document saves to .gvdesign (gzipped scene) and reopens with its
//     content intact, through the real storage read/write code paths
//   - the service worker installs and precaches every entry (a single 404
//     aborts the whole install — see README "Service worker cache busting")
//
// Usage: npm test    (needs a Chromium binary; see resolveChromium below)
const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { chromium } = require("playwright-core");

const ROOT = path.join(__dirname, "..");
const APP_PORT = parseInt(process.env.SMOKE_APP_PORT, 10) || 3190;
const MOCK_PORT = parseInt(process.env.SMOKE_MOCK_PORT, 10) || 3290;
const APP = `http://localhost:${APP_PORT}`;

// The bundles hardcode the original deployment domain as their API base;
// tests proxy those calls back to the local server (matching what a real
// deployment at that domain sees).
const APP_DOMAIN_RE = /https:\/\/gravit\.plasmatrap\.com\/.*/;

function resolveChromium() {
    const candidates = [
        process.env.CHROMIUM_PATH,
        process.env.PLAYWRIGHT_BROWSERS_PATH && path.join(process.env.PLAYWRIGHT_BROWSERS_PATH, "chromium"),
        "/opt/pw-browsers/chromium",
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
        "/usr/bin/google-chrome",
    ].filter(Boolean);
    for (const c of candidates) if (fs.existsSync(c)) return c;
    console.error("No Chromium binary found. Set CHROMIUM_PATH to a Chrome/Chromium executable.");
    process.exit(2);
}

const children = [];
function launch(cmd, args, env) {
    const child = spawn(cmd, args, { env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"] });
    child.stdout.on("data", () => {});
    child.stderr.on("data", (d) => process.stderr.write(`[${path.basename(args[0])}] ${d}`));
    children.push(child);
    return child;
}

async function waitForHttp(url, timeoutMs = 15000) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        try {
            const res = await fetch(url);
            if (res.ok) return;
        } catch (e) {}
        await new Promise((r) => setTimeout(r, 250));
    }
    throw new Error(`timed out waiting for ${url}`);
}

let failures = 0;
function check(name, cond, detail) {
    if (cond) console.log(`  ok   ${name}`);
    else {
        failures++;
        console.log(`  FAIL ${name}${detail !== undefined ? ` — ${JSON.stringify(detail)}` : ""}`);
    }
}

async function openApp(browser) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const requests = [];
    page.on("request", (r) => requests.push(r.url()));
    await page.route(APP_DOMAIN_RE, async (route) => {
        const url = new URL(route.request().url());
        try {
            const resp = await route.fetch({ url: APP + url.pathname + url.search });
            await route.fulfill({ response: resp });
        } catch (e) {
            await route.abort();
        }
    });
    await page.goto(APP + "/", { waitUntil: "load", timeout: 60000 });
    // Startup is chatty; wait for it to settle on the welcome dialog.
    await page.locator(".preset .title").first().waitFor({ timeout: 45000 });
    await page.waitForTimeout(3000);
    return { page, requests };
}

async function testWithUnsplash(executablePath) {
    console.log("\n=== with UNSPLASH_ACCESS_KEY (proxy live, mock API) ===");
    const server = launch(process.execPath, [path.join(ROOT, "server.js")], {
        PORT: String(APP_PORT),
        UNSPLASH_ACCESS_KEY: "smoketest-key",
        UNSPLASH_API_BASE: `http://localhost:${MOCK_PORT}`,
    });
    await waitForHttp(`${APP}/connection/test`);

    // stub endpoints
    const user = await (await fetch(`${APP}/user?lang=0`)).json();
    check("GET /user lang=0 resolves to English locale", user.locale === "en", user.locale);
    check("avatar is local", user.avatar.startsWith("/assets/"), user.avatar);
    const featured = await (await fetch(`${APP}/unsplash/featured?page=1`)).json();
    check("unsplash featured returns shaped assets", featured.length === 12 && featured[0].path === "element.image.unsplash");
    const dl = await (await fetch(`${APP}/unsplash/download/photo?id=mockphoto2&size=regular`)).json();
    check("unsplash download returns a URL string", typeof dl === "string" && dl.includes("/img/2.png"), dl);
    const reported = await (await fetch(`http://localhost:${MOCK_PORT}/__downloads`)).json();
    check("download reported to Unsplash", reported.downloadsReported >= 1);
    const market = await (await fetch(`${APP}/market?path=element.`)).json();
    check("market stub returns empty list", Array.isArray(market) && market.length === 0);

    const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
    try {
        const { page, requests } = await openApp(browser);

        check("no /null requests", requests.filter((u) => u.endsWith("/null")).length === 0);
        const external = requests.filter((u) => !u.includes("localhost") && !APP_DOMAIN_RE.test(u));
        check("no third-party requests at startup", external.length === 0, external.slice(0, 5));

        const tiles = await page.locator(".preset .title").allTextContents();
        check("welcome dialog has no template tile", !tiles.some((t) => /template/i.test(t)), tiles);

        await page.locator(".cloud-button:has-text('Create')").click();
        await page.waitForTimeout(2500);

        await page.getByText("File", { exact: true }).first().click();
        await page.waitForTimeout(500);
        const bodyText = await page.evaluate(() => document.body.innerText);
        check("File menu has no 'From Template'", !/from template/i.test(bodyText));
        await page.keyboard.press("Escape");

        const avatarBg = await page.evaluate(() => {
            const el = document.querySelector(".login .avatar");
            return el ? getComputedStyle(el).backgroundImage : "";
        });
        check("avatar rendered from local URL", avatarBg.includes("/assets/prerendered/"), avatarBg);

        const libTab = page.locator(".sidebar-option:has-text('LIBRARIES')");
        check("LIBRARIES tab visible", await libTab.isVisible());
        await libTab.click();
        await page.waitForTimeout(1000);
        const cats = await page.locator(".category .title").allTextContents();
        check("only the Unsplash category is offered", cats.length === 1 && /unsplash/i.test(cats[0]), cats);
        await page.locator(".category").first().click();
        await page.locator(".asset-container img.asset").first().waitFor({ timeout: 20000 });
        check("photos rendered", (await page.locator(".asset-container img.asset").count()) === 12);
        const authors = await page.locator(".asset-container span").allTextContents();
        check(
            "photographer attribution shown",
            authors.every((a) => a.startsWith("Mock Photographer")),
            authors.slice(0, 2)
        );

        await page.locator(".library-search input").fill("cat");
        await page.keyboard.press("Enter");
        await page.waitForTimeout(3000);
        check("search returns results", (await page.locator(".asset-container img.asset").count()) > 12);
    } finally {
        await browser.close();
        server.kill();
    }
}

async function testWithoutUnsplash(executablePath) {
    console.log("\n=== without UNSPLASH_ACCESS_KEY (integration hidden) ===");
    const server = launch(process.execPath, [path.join(ROOT, "server.js")], { PORT: String(APP_PORT) });
    await waitForHttp(`${APP}/connection/test`);

    const config = await (await fetch(`${APP}/config.js`)).text();
    check("config.js reports disabled", config.includes("window.UNSPLASH_ENABLED = false"), config.trim());
    const featured = await (await fetch(`${APP}/unsplash/featured?page=1`)).json();
    check("featured degrades to empty list", Array.isArray(featured) && featured.length === 0);

    const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
    try {
        const { page } = await openApp(browser);
        await page.locator(".cloud-button:has-text('Create')").click();
        await page.waitForTimeout(2500);
        const libTab = page.locator(".sidebar-option:has-text('LIBRARIES')");
        check("LIBRARIES tab hidden", !(await libTab.isVisible()));
        const visible = await page.locator(".sidebar-option:visible").allTextContents();
        check("other tabs still present", visible.some((t) => /layers/i.test(t)) && visible.some((t) => /symbols/i.test(t)), visible);
    } finally {
        await browser.close();
        server.kill();
    }
}

// Expose the bundle's internal webpack require in page context by pushing a
// fake chunk whose entry module captures it. Module ids are stable — they are
// the same ids used by src/bundles/*/names.json and the require() annotations.
async function hookRequire(page) {
    await page.evaluate(() => {
        window.webpackJsonpGravitDesigner.push([
            [],
            {
                999999: (module, exports, require) => {
                    window.__req = require;
                },
            },
            [[999999]],
        ]);
    });
}

// Count GRectangle nodes in the active document's scene.
function countRectangles(page) {
    return page.evaluate(() => {
        const GObject = window.__req(1);
        let rects = 0;
        const visit = (node) => {
            if (node instanceof GObject.GRectangle) rects++;
            if (node.getFirstChild) for (let child = node.getFirstChild(); child; child = child.getNext()) visit(child);
        };
        visit(gDesigner.getActiveDocument().getScene());
        return rects;
    });
}

async function testEditor(executablePath) {
    console.log("\n=== editor: draw, undo/redo, export, save/reopen, service worker ===");
    const server = launch(process.execPath, [path.join(ROOT, "server.js")], { PORT: String(APP_PORT) });
    await waitForHttp(`${APP}/connection/test`);

    const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "gravit-smoke-"));
    try {
        const { page } = await openApp(browser);
        await page.locator(".cloud-button:has-text('Create')").click();
        await page.waitForTimeout(2500);
        await hookRequire(page);

        // Draw a rectangle with the real tool: keyboard shortcut + canvas drag.
        await page.keyboard.press("r");
        await page.mouse.move(600, 400);
        await page.mouse.down();
        await page.mouse.move(760, 500, { steps: 10 });
        await page.mouse.up();
        await page.waitForTimeout(800);
        check("drawing creates a rectangle in the scene", (await countRectangles(page)) === 1);

        await page.keyboard.press("Control+z");
        await page.waitForTimeout(500);
        check("undo removes the rectangle", (await countRectangles(page)) === 0);
        await page.keyboard.press("Control+Shift+z");
        await page.waitForTimeout(500);
        check("redo restores the rectangle", (await countRectangles(page)) === 1);

        // Export the active page through GExporter (module 1253) — the same
        // path GExportDialog uses. PNG/JPG render via GBitmapExport onto a
        // canvas; PDF runs through the pdfexport worker.
        const exported = await page.evaluate(async () => {
            const GExporter = window.__req(1253);
            const activePage = gDesigner.getActiveDocument().getScene().getActivePage();
            const exportOne = (format) =>
                new Promise((resolve, reject) => {
                    const timer = setTimeout(() => reject(new Error(format + " export timed out")), 30000);
                    GExporter.exportExportable({ element: activePage, format, size: "1x" }, async (blob) => {
                        clearTimeout(timer);
                        const bytes = new Uint8Array(await blob.arrayBuffer());
                        resolve({ size: bytes.length, head: Array.from(bytes.slice(0, 5)) });
                    });
                });
            const result = {};
            for (const format of ["png", "svg", "pdf"]) {
                result[format] = await exportOne(format).catch((e) => ({ error: String(e) }));
            }
            return result;
        });
        const asString = (info) => (info.head ? String.fromCharCode(...info.head) : "");
        check("PNG export produces a PNG", exported.png.size > 0 && asString(exported.png).includes("PNG"), exported.png);
        check("SVG export produces XML", exported.svg.size > 0 && asString(exported.svg).startsWith("<?xml"), exported.svg);
        check("PDF export produces a PDF", exported.pdf.size > 0 && asString(exported.pdf).startsWith("%PDF"), exported.pdf);

        // Save to .gvdesign through document.store() with a handle-less
        // GBrowserStorage.Item (module 1195): serialize → gzip → saveAs
        // download, the same fallback a real browser save uses without the
        // File System Access API.
        const downloadPromise = page.waitForEvent("download", { timeout: 30000 });
        const storeStatus = await page.evaluate(
            () =>
                new Promise((resolve) => {
                    const GBrowserStorage = window.__req(1195);
                    const item = new GBrowserStorage.Item(gContainer.getStorage(), null, "smoke-roundtrip.gvdesign");
                    gDesigner.getActiveDocument().store(
                        item,
                        () => resolve("stored"),
                        (e) => resolve("save failed: " + e)
                    );
                    setTimeout(() => resolve("save timed out"), 20000);
                })
        );
        check("document saves to .gvdesign", storeStatus === "stored", storeStatus);
        const download = await downloadPromise;
        const savedPath = path.join(tmpDir, "smoke-roundtrip.gvdesign");
        await download.saveAs(savedPath);
        const savedBytes = fs.readFileSync(savedPath);
        check(
            "saved file is a gzipped scene",
            savedBytes.length > 100 && savedBytes[0] === 0x1f && savedBytes[1] === 0x8b,
            savedBytes.slice(0, 2)
        );

        // Reopen the saved bytes through the same storage-item path a real
        // file-picker open takes, and verify the content survived.
        const reopened = await page.evaluate(async (base64) => {
            const GBrowserStorage = window.__req(1195);
            const GObject = window.__req(1);
            const raw = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
            gDesigner.openDocument(new GBrowserStorage.Item(gContainer.getStorage(), raw, "smoke-roundtrip.gvdesign"));
            // The scene deserializes asynchronously after the document becomes
            // active, so poll for the content, not just the title.
            const countRects = (doc) => {
                let rects = 0;
                const visit = (node) => {
                    if (node instanceof GObject.GRectangle) rects++;
                    if (node.getFirstChild) for (let child = node.getFirstChild(); child; child = child.getNext()) visit(child);
                };
                return doc && doc.getScene() ? (visit(doc.getScene()), rects) : 0;
            };
            const deadline = Date.now() + 15000;
            let doc,
                rects = 0;
            while (Date.now() < deadline) {
                doc = gDesigner.getActiveDocument();
                if (doc && doc.getTitle() === "smoke-roundtrip" && (rects = countRects(doc)) > 0) break;
                await new Promise((r) => setTimeout(r, 250));
            }
            return { title: doc && doc.getTitle(), rects };
        }, savedBytes.toString("base64"));
        check("saved document reopens", reopened.title === "smoke-roundtrip", reopened);
        check("reopened document still has the rectangle", reopened.rects === 1, reopened);

        // Service worker: the app registers /cacher.js 15s after boot; register
        // directly to skip the wait. Install must precache every entry — one
        // missing file aborts the whole install (state becomes "redundant").
        const swPage = await browser.newPage();
        await swPage.goto(APP + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
        const sw = await swPage.evaluate(async () => {
            const registration = await navigator.serviceWorker.register("/cacher.js");
            await new Promise((resolve, reject) => {
                const timer = setTimeout(() => reject(new Error("service worker did not activate in 120s")), 120000);
                const settle = () => {
                    if (registration.active && registration.active.state === "activated") {
                        clearTimeout(timer);
                        resolve();
                        return true;
                    }
                    return false;
                };
                const watch = (worker) => {
                    worker &&
                        worker.addEventListener("statechange", () => {
                            if (worker.state === "redundant") {
                                clearTimeout(timer);
                                reject(new Error("service worker became redundant (precache failed)"));
                            } else settle();
                        });
                };
                if (settle()) return;
                watch(registration.installing);
                watch(registration.waiting);
                registration.addEventListener("updatefound", () => watch(registration.installing));
            });
            const cacheNames = await caches.keys();
            const precacheName = cacheNames.find((name) => name.includes("precache"));
            const entries = precacheName ? (await (await caches.open(precacheName)).keys()).length : 0;
            return { state: registration.active.state, entries };
        });
        check("service worker installs and activates", sw.state === "activated", sw);
        // cacher.js lists ~1300 precache entries; assert the cache actually
        // filled rather than pinning the exact count here.
        check("service worker precached the app", sw.entries > 1000, sw);
    } finally {
        await browser.close();
        server.kill();
        fs.rmSync(tmpDir, { recursive: true, force: true });
    }
}

(async () => {
    const executablePath = resolveChromium();
    const mock = launch(process.execPath, [path.join(ROOT, "test", "mock-unsplash.js"), String(MOCK_PORT)], {});
    await waitForHttp(`http://localhost:${MOCK_PORT}/__downloads`);

    try {
        await testWithUnsplash(executablePath);
        await testWithoutUnsplash(executablePath);
        await testEditor(executablePath);
    } finally {
        mock.kill();
        children.forEach((c) => c.kill());
    }

    console.log(failures ? `\n${failures} check(s) FAILED` : "\nall checks passed");
    process.exit(failures ? 1 : 0);
})().catch((e) => {
    children.forEach((c) => c.kill());
    console.error("smoke test crashed:", e);
    process.exit(1);
});
