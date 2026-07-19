#!/usr/bin/env node
// Recover docs images missing from the public/docs mirror.
//
// The mirror was scraped from Wayback captures of documentation.corelvector.com,
// which never archived ~1/3 of the images. The same WordPress site previously
// lived at documentation.designer.io, whose captures DO contain most of them.
// This script inventories archived uploads via the CDX API, matches them against
// image references in the local HTML, and downloads whatever is missing.
// Idempotent: existing files are skipped, so it can be re-run to resume.

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUB = path.join(ROOT, "public");
const DOCS = path.join(PUB, "docs");

const CDX_HOSTS = ["documentation.designer.io/wp-content/uploads/", "documentation.corelvector.com/wp-content/uploads/"];

const IMG_EXT = /\.(png|jpe?g|gif|svg|webp|ico)$/i;

function* walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) yield* walk(p);
        else yield p;
    }
}

function collectRefs() {
    const refs = new Set();
    const attrRe = /(?:src|srcset|data-src|data-lazy-src|data-lazy-srcset|href|content|data-bg)\s*=\s*["']([^"']+)["']/gi;
    for (const file of walk(DOCS)) {
        if (!file.endsWith(".html")) continue;
        const text = fs.readFileSync(file, "utf8");
        for (const m of text.matchAll(attrRe)) {
            for (const part of m[1].split(",")) {
                const u = part.trim().split(" ")[0];
                const p = decodeURIComponent(u.split(/[?#]/)[0]);
                if (p.startsWith("/docs/wp-content/uploads/") && IMG_EXT.test(p)) refs.add(p);
            }
        }
    }
    return refs;
}

async function cdxInventory() {
    // lowercase wp path -> { ts, original }
    const arch = new Map();
    for (const host of CDX_HOSTS) {
        const api =
            "https://web.archive.org/cdx/search/cdx?" +
            new URLSearchParams({
                url: host,
                matchType: "prefix",
                output: "json",
                filter: "statuscode:200",
                collapse: "urlkey",
            });
        const res = await fetch(api);
        if (!res.ok) throw new Error(`CDX ${host}: HTTP ${res.status}`);
        const rows = await res.json();
        for (const [, ts, original] of rows.slice(1)) {
            const key = decodeURIComponent(new URL(original).pathname).toLowerCase();
            if (!arch.has(key)) arch.set(key, { ts, original });
        }
        console.log(`CDX ${host}: ${rows.length - 1} captures`);
    }
    return arch;
}

function validImage(buf, ext) {
    if (buf.length < 16) return false;
    switch (ext) {
        case "gif":
            return buf.slice(0, 6).equals(Buffer.from("GIF87a")) || buf.slice(0, 6).equals(Buffer.from("GIF89a"));
        case "png":
            return buf.slice(0, 6).equals(Buffer.from("\x89PNG\r\n", "binary"));
        case "jpg":
        case "jpeg":
            return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
        case "webp":
            return buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP";
        case "svg":
            return buf.slice(0, 2048).toString().toLowerCase().includes("<svg");
        case "ico":
            return buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3] === 0;
        default:
            return false;
    }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(ref, { ts, original }) {
    const local = path.join(PUB, ref.replace(/^\//, ""));
    if (fs.existsSync(local)) return "skip";
    const ext = path.extname(local).slice(1).toLowerCase();
    const wb = `https://web.archive.org/web/${ts}id_/${original}`;
    for (let attempt = 0; attempt < 6; attempt++) {
        let res;
        try {
            res = await fetch(wb, { headers: { "User-Agent": "Mozilla/5.0 (docs-mirror-repair)" } });
        } catch (e) {
            await sleep(3000 * (attempt + 1));
            continue;
        }
        if (res.status === 429 || res.status === 503) {
            await sleep(15000 * (attempt + 1));
            continue;
        }
        if (!res.ok) return `HTTP ${res.status}`;
        const buf = Buffer.from(await res.arrayBuffer());
        if (!validImage(buf, ext)) return `invalid ${ext} (${buf.length}B)`;
        fs.mkdirSync(path.dirname(local), { recursive: true });
        fs.writeFileSync(local, buf);
        return "ok";
    }
    return "retries exhausted";
}

async function main() {
    const refs = collectRefs();
    const missing = [...refs].filter((p) => !fs.existsSync(path.join(PUB, p.replace(/^\//, ""))));
    console.log(`image refs: ${refs.size}, missing on disk: ${missing.length}`);
    if (!missing.length) return;

    const arch = await cdxInventory();
    const jobs = [];
    const lost = [];
    for (const ref of missing) {
        const hit = arch.get(ref.slice("/docs".length).toLowerCase());
        if (hit) jobs.push([ref, hit]);
        else lost.push(ref);
    }
    console.log(`recoverable: ${jobs.length}, lost (no capture on any host): ${lost.length}`);

    let ok = 0,
        failed = [];
    // serial-ish: 3 lanes, Wayback rate-limits aggressively
    const lanes = 3;
    let idx = 0;
    await Promise.all(
        Array.from({ length: lanes }, async () => {
            while (idx < jobs.length) {
                const [ref, hit] = jobs[idx++];
                const r = await download(ref, hit);
                if (r === "ok" || r === "skip") ok++;
                else failed.push([ref, r]);
                if ((ok + failed.length) % 50 === 0) console.log(`progress: ${ok + failed.length}/${jobs.length}`);
            }
        })
    );
    console.log(`done: ok=${ok} failed=${failed.length}`);
    for (const [ref, why] of failed) console.log(`FAIL ${ref}: ${why}`);
    // Known-LOST items are expected (never archived); actual download
    // failures mean the run is incomplete and must not look successful.
    if (failed.length) process.exitCode = 1;
    if (lost.length) {
        console.log("unrecoverable (never archived):");
        for (const ref of lost) console.log(`LOST ${ref}`);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
