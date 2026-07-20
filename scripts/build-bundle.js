// Reassemble bundles from src/bundles/<name>/ into public/<name>.js,
// syntax-check the result, refresh the service-worker precache revision in
// public/cacher.js, and regenerate the .br/.gz variants.
//
// Also emits per-bundle debugging aids (both gitignored, rebuilt on demand):
//   src/bundles/<name>/linemap.json — built-bundle line ranges per module,
//     consumed by scripts/where.js to map stack-trace lines to module files
//   public/<name>.js.map — a real source map pointing DevTools at the split
//     module files (served via the SourceMap response header in server.js)
//
// Usage: node scripts/build-bundle.js [name ...]   (default: all split bundles)
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require("crypto");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const BUNDLES_DIR = path.join(ROOT, "src", "bundles");

// Length of the "module.exports = " wrapper that split-bundle.js prepends to
// each module file: line 1 of a module's bundle text starts at this column
// of line 1 of the module file.
const WRAPPER_PREFIX = "module.exports = ".length;

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function vlq(n) {
    let v = n < 0 ? (-n << 1) | 1 : n << 1;
    let out = "";
    do {
        let digit = v & 31;
        v >>>= 5;
        if (v) digit |= 32;
        out += B64[digit];
    } while (v);
    return out;
}

// segsByLine: sparse array (1-based line -> [[genCol, srcIdx, origLine0, origCol0], ...])
function encodeMappings(segsByLine, totalLines) {
    let prevSrc = 0,
        prevOrigLine = 0,
        prevOrigCol = 0;
    const lines = [];
    for (let l = 1; l <= totalLines; l++) {
        const segs = segsByLine[l];
        if (!segs) {
            lines.push("");
            continue;
        }
        let prevGenCol = 0;
        lines.push(
            segs
                .map(([genCol, src, origLine, origCol]) => {
                    const s = vlq(genCol - prevGenCol) + vlq(src - prevSrc) + vlq(origLine - prevOrigLine) + vlq(origCol - prevOrigCol);
                    ((prevGenCol = genCol), (prevSrc = src), (prevOrigLine = origLine), (prevOrigCol = origCol));
                    return s;
                })
                .join(",")
        );
    }
    return lines.join(";");
}

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
    const pieces = manifest.parts.map((part) => {
        if (typeof part === "string") return { text: part, id: null };
        const file = fs.readFileSync(path.join(dir, part.id + ".js"), "utf8");
        const m = file.match(/^module\.exports = ([\s\S]*);\n?$/);
        if (!m) throw new Error(`${name}/${part.id}.js: expected "module.exports = <fn>;" wrapper`);
        return { text: m[1], id: part.id };
    });
    const out = pieces.map((p) => p.text).join("");

    // walk the pieces once to build the line map and source-map segments
    let line = 1,
        col = 0;
    const linemap = [];
    const sources = [];
    const segsByLine = [];
    const addSeg = (l, seg) => (segsByLine[l] || (segsByLine[l] = [])).push(seg);
    for (const piece of pieces) {
        if (piece.id !== null) {
            const srcIdx = sources.push(`/src/bundles/${name}/${piece.id}.js`) - 1;
            addSeg(line, [col, srcIdx, 0, WRAPPER_PREFIX]);
            let localLine = 0;
            for (let i = piece.text.indexOf("\n"); i !== -1; i = piece.text.indexOf("\n", i + 1)) {
                localLine++;
                if (i + 1 < piece.text.length) addSeg(line + localLine, [0, srcIdx, localLine, 0]);
            }
            linemap.push({ id: piece.id, startLine: line, startCol: col, endLine: line + localLine });
        }
        for (let i = 0; i < piece.text.length; i++) {
            if (piece.text[i] === "\n") (line++, (col = 0));
            else col++;
        }
    }

    const target = path.join(ROOT, "public", manifest.bundle);
    // Validate everything BEFORE the first write: a failure must never leave
    // the repo half-updated (clobbered bundle, stale precache revision).
    try {
        new vm.Script(out, { filename: manifest.bundle });
    } catch (e) {
        console.error(`SYNTAX ERROR in reassembled ${manifest.bundle}: ${e.message}`);
        process.exit(1);
    }
    const md5 = crypto.createHash("md5").update(out).digest("hex");
    const cacherPath = path.join(ROOT, "public", "cacher.js");
    const cacher = fs.readFileSync(cacherPath, "utf8");
    // Whitespace-tolerant (prettier may line-wrap entries); a missing entry is
    // a hard error — silently keeping the old revision would pin returning
    // clients' service workers to the stale bundle forever.
    const entry = new RegExp(`revision: "[^"]*",\\s*url: "${manifest.bundle.replace(/\./g, "\\.")}"`);
    if (!entry.test(cacher)) {
        console.error(`ERROR: no precache entry for ${manifest.bundle} in cacher.js`);
        process.exit(1);
    }

    fs.writeFileSync(target, out);
    fs.writeFileSync(path.join(dir, "linemap.json"), JSON.stringify({ bundle: manifest.bundle, modules: linemap }, null, 1));
    fs.writeFileSync(
        target + ".map",
        JSON.stringify({
            version: 3,
            file: manifest.bundle,
            sources,
            names: [],
            mappings: encodeMappings(segsByLine, line),
        })
    );
    // Refresh the service-worker precache revision so clients refetch.
    // Function replacer: exempt from $-pattern substitution in the new text.
    fs.writeFileSync(cacherPath, cacher.replace(entry, () => `revision: "${md5}_src", url: "${manifest.bundle}"`));

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
