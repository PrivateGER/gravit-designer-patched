// Prove the refiner changed nothing but names and minifier-literal spellings.
// For each split module, compare the CURRENT file against the ORIGINAL (from
// git HEAD or a --baseline dir) after canonicalizing away exactly the edits the
// refiner is permitted to make:
//   - every identifier -> "_id_"        (renames are behavior-preserving because
//                                         they are scope-consistent AST renames)
//   - true/false/undefined <-> !0/!1/void 0
//   - block/line comments removed        (the require annotations)
// If the canonical forms differ, the refiner changed program behavior — fail.
// Usage: node scripts/verify-refine.js [--baseline <dir>] [bundle ...]
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { canonical } = require("./canonical");

const ROOT = path.join(__dirname, "..");
const BUNDLES_DIR = path.join(ROOT, "src", "bundles");

const argv = process.argv.slice(2);
let baselineDir = null;
const bi = argv.indexOf("--baseline");
if (bi !== -1) {
    baselineDir = path.resolve(argv[bi + 1]);
    argv.splice(bi, 2);
}
const bundles = argv.length ? argv : fs.readdirSync(BUNDLES_DIR);

function readBaseline(bundle, file) {
    if (baselineDir) {
        const p = path.join(baselineDir, bundle, file);
        return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
    }
    const rel = path.relative(ROOT, path.join(BUNDLES_DIR, bundle, file));
    try {
        return execFileSync("git", ["show", `HEAD:${rel}`], { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 }).toString();
    } catch {
        return null;
    }
}

let checked = 0,
    failed = 0,
    missing = 0;
for (const bundle of bundles) {
    const dir = path.join(BUNDLES_DIR, bundle);
    for (const file of fs.readdirSync(dir).filter((f) => /^\d+\.js$/.test(f))) {
        const cur = fs.readFileSync(path.join(dir, file), "utf8");
        const base = readBaseline(bundle, file);
        if (base == null) {
            missing++;
            continue;
        }
        let a, b;
        try {
            a = canonical(base);
            b = canonical(cur);
        } catch (e) {
            console.error(`PARSE FAIL ${bundle}/${file}: ${e.message}`);
            failed++;
            continue;
        }
        checked++;
        if (a !== b) {
            failed++;
            // find first differing token for a helpful message
            const ta = a.split("|"),
                tb = b.split("|");
            let i = 0;
            while (i < ta.length && ta[i] === tb[i]) i++;
            console.error(`DIVERGENCE ${bundle}/${file} at token ${i}: ${ta[i] ?? "<end>"}  !=  ${tb[i] ?? "<end>"}`);
        }
    }
}
console.log(`\nverify-refine: ${checked} modules checked, ${failed} divergent, ${missing} without baseline`);
if (checked === 0 && missing > 0) {
    // A run that verified nothing must not look like a pass (typo'd
    // --baseline path, or modules not committed yet so `git show` has none).
    console.error("verify-refine: no module had a baseline — nothing was verified");
    process.exit(2);
}
process.exit(failed ? 1 : 0);
