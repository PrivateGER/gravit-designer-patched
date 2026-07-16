// Reassemble bundles from src/bundles/<name>/ into public/<name>.js,
// syntax-check the result, refresh the service-worker precache revision in
// public/cacher.js, and regenerate the .br/.gz variants.
// Usage: node scripts/build-bundle.js [name ...]   (default: all split bundles)
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const BUNDLES_DIR = path.join(ROOT, "src", "bundles");

const names = process.argv.slice(2).length
    ? process.argv.slice(2).map((n) => path.basename(n, ".js"))
    : fs.existsSync(BUNDLES_DIR)
      ? fs.readdirSync(BUNDLES_DIR)
      : [];
if (!names.length) {
    console.log("no split bundles found under src/bundles/");
    process.exit(0);
}

for (const name of names) {
    const dir = path.join(BUNDLES_DIR, name);
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
    const out = manifest.parts
        .map((part) => {
            if (typeof part === "string") return part;
            const file = fs.readFileSync(path.join(dir, part.id + ".js"), "utf8");
            const m = file.match(/^module\.exports = ([\s\S]*);\n?$/);
            if (!m) throw new Error(`${name}/${part.id}.js: expected "module.exports = <fn>;" wrapper`);
            return m[1];
        })
        .join("");

    const target = path.join(ROOT, "public", manifest.bundle);
    fs.writeFileSync(target, out);
    execFileSync(process.execPath, ["--check", target], { stdio: "inherit" });

    // refresh the service-worker precache revision so clients refetch
    const md5 = crypto.createHash("md5").update(out).digest("hex");
    const cacherPath = path.join(ROOT, "public", "cacher.js");
    const cacher = fs.readFileSync(cacherPath, "utf8");
    const entry = new RegExp(`revision: "[^"]*", url: "${manifest.bundle.replace(".", "\\.")}"`);
    if (!entry.test(cacher)) console.warn(`  WARNING: no precache entry for ${manifest.bundle} in cacher.js`);
    fs.writeFileSync(cacherPath, cacher.replace(entry, `revision: "${md5}_src", url: "${manifest.bundle}"`));

    // refresh precompressed variants
    const buf = Buffer.from(out);
    fs.writeFileSync(
        target + ".br",
        zlib.brotliCompressSync(buf, {
            params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 10, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: buf.length },
        })
    );
    fs.writeFileSync(target + ".gz", zlib.gzipSync(buf, { level: 9 }));

    console.log(
        `built public/${manifest.bundle} (${(out.length / 1048576).toFixed(1)}MB, ${manifest.moduleCount} modules, revision ${md5.slice(0, 8)}…_src)`
    );
}
