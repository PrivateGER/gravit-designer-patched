// Keep the service-worker precache revisions in public/cacher.js in sync with
// the actual file contents, so editing a precached file can never leave
// returning browsers pinned to a stale cached copy (see README maintenance
// notes). Runs as part of `npm run build`; also available standalone as
// `npm run sync-cacher`.
//
// Revisions are content-addressed: the original Corel build already used the
// file's md5 as the revision hash (suffixed "_8795"), and our bumps use the
// same md5 suffixed "_src" — so every entry can be verified by simply
// recomputing the file's md5 and comparing it against the revision's hash
// part. Any mismatch means the file changed after its revision was written,
// and the entry is rewritten to "<md5>_src".
//
// Missing precached files are a hard error: a single 404 during precaching
// aborts the entire service-worker install.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const CACHER = path.join(PUBLIC, "cacher.js");

let cacher = fs.readFileSync(CACHER, "utf8");

// Whitespace-tolerant: prettier line-wraps entries with long URLs.
const entries = [...cacher.matchAll(/\{\s*revision: "([^"]*)",\s*url: "([^"]*)",?\s*\}/g)];
if (!entries.length) throw new Error("no precache entries found in public/cacher.js");

let updated = 0;
const missing = [];

for (const [match, revision, url] of entries) {
    const filePath = path.join(PUBLIC, url);
    if (!fs.existsSync(filePath)) {
        missing.push(url);
        continue;
    }
    const md5 = crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("hex");
    if (revision.startsWith(md5)) continue;
    // Replace only the revision string inside the matched entry so the
    // original formatting (prettier line-wrapping) is preserved.
    cacher = cacher.replace(match, match.replace(`revision: "${revision}"`, `revision: "${md5}_src"`));
    updated++;
    console.log(`  bumped ${url} -> ${md5.slice(0, 8)}…_src`);
}

if (missing.length) {
    console.error(`sync-cacher: ${missing.length} precached file(s) missing from public/ — this would break the service-worker install:`);
    missing.forEach((u) => console.error(`  MISSING ${u}`));
    process.exit(1);
}

if (updated) fs.writeFileSync(CACHER, cacher);
console.log(`sync-cacher: ${entries.length} precache entries checked, ${updated} revision(s) bumped`);
