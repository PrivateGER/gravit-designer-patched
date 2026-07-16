// End-to-end smoke test: boots server.js (plus a mock Unsplash API) and
// drives the real app in headless Chromium. Guards the invariants that have
// bitten this rescue before:
//   - the app boots to the editor with no requests to third-party hosts
//   - no fetch of the literal URL "/null" (dead-i18n regression)
//   - the avatar is local and actually rendered
//   - dead features stay hidden (no "New from Template" tile or menu entry)
//   - the Unsplash proxy works end-to-end and the LIBRARIES tab
//     appears/disappears with UNSPLASH_ACCESS_KEY
//
// Usage: npm test    (needs a Chromium binary; see resolveChromium below)
const { spawn } = require("child_process");
const fs = require("fs");
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

(async () => {
    const executablePath = resolveChromium();
    const mock = launch(process.execPath, [path.join(ROOT, "test", "mock-unsplash.js"), String(MOCK_PORT)], {});
    await waitForHttp(`http://localhost:${MOCK_PORT}/__downloads`);

    try {
        await testWithUnsplash(executablePath);
        await testWithoutUnsplash(executablePath);
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
