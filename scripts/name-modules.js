// Derive human names for webpack module ids and write them to
// src/bundles/<name>/names.json. Minification mangled the declarations, so
// names come from what survived it:
//   1. cross-module usage: `n(123).GFoo` and `{ GFoo } = n(123)` name module 123
//   2. locale keys: modules resolve their own UI strings via a quoted
//      "GSomething" table name — the majority key names the module
//   3. any surviving class/function declarations
// Existing manual entries in names.json always win; heuristics only fill gaps.
// Usage: node scripts/name-modules.js [bundle ...]
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BUNDLES_DIR = path.join(ROOT, "src", "bundles");

const bundleNames = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(BUNDLES_DIR);

const HINT_NOISE = new Set(["use strict", "toString", "prototype", "object", "string", "number", "function", "undefined", "default"]);
function moduleHints(src) {
    const hints = [];
    for (const m of src.matchAll(/\bclass ([A-Za-z_$][\w$]{2,})/g)) hints.push(m[1]);
    for (const m of src.matchAll(/\b(?:G[A-Z][A-Za-z]{3,})\b/g)) hints.push(m[0]);
    for (const m of src.matchAll(/"([A-Za-z][A-Za-z0-9 ._/-]{5,40})"/g)) if (!HINT_NOISE.has(m[1])) hints.push(JSON.stringify(m[1]));
    return [...new Set(hints)].slice(0, 6).join(" ");
}

const vote = (map, id, name, weight) => {
    if (!map.has(id)) map.set(id, new Map());
    const votes = map.get(id);
    votes.set(name, (votes.get(name) || 0) + weight);
};

// The vote/locale heuristics read the mangled shapes (n(123).GFoo, single-char
// require vars) that refine-bundle.js consumes. Once the bundles are refined
// those patterns are gone, so voting on refined source produces WRONG names.
// Detect that and fall back to signatures-only (which are refine-stable).
// The correct pipeline order is: split -> name -> refine.
const refined = fs.readdirSync(BUNDLES_DIR).some((b) =>
    fs
        .readdirSync(path.join(BUNDLES_DIR, b))
        .filter((f) => /^\d+\.js$/.test(f))
        .slice(0, 20)
        .some((f) => /function \(module, exports, require\)/.test(fs.readFileSync(path.join(BUNDLES_DIR, b, f), "utf8")))
);
if (refined) console.warn("note: bundles look refined — voting disabled, applying signatures only (re-split for full naming)");

// pass 1: cross-module votes from require usage — pooled across ALL bundles,
// because webpack module ids are global across chunks
const crossVotes = new Map(); // id -> Map(name -> votes)
if (!refined)
    for (const bundle of fs.readdirSync(BUNDLES_DIR)) {
        const dir = path.join(BUNDLES_DIR, bundle);
        for (const f of fs.readdirSync(dir).filter((f) => /^\d+\.js$/.test(f))) {
            const src = fs.readFileSync(path.join(dir, f), "utf8");
            // n(123).GFoo  /  require(123).GFoo
            for (const m of src.matchAll(/\b[a-z$_]{1,10}\((\d+)\)\.([A-Z][A-Za-z0-9_]{3,})\b/g)) vote(crossVotes, m[1], m[2], 2);
            // const { GFoo, GBar } = n(123)
            for (const m of src.matchAll(/\{([^{}]{4,120})\}\s*=\s*[a-z$_]{1,10}\((\d+)\)/g)) {
                const props = m[1].match(/\b[A-Z][A-Za-z0-9_]{3,}\b/g) || [];
                for (const p of props) vote(crossVotes, m[2], p, 1);
            }
        }
    }

// Names already assigned anywhere (module ids are global across chunks, so
// pool every bundle's names.json). Vote/locale-derived candidates skip taken
// names: those heuristics identify *usage*, not identity, and letting a name
// label two modules is how "GCommonNames" ended up on 15 of them. Library
// plumbing labels (polyfill:*, _interop*) are intentionally repeated.
const takenNames = new Set();
for (const b of fs.readdirSync(BUNDLES_DIR)) {
    const p = path.join(BUNDLES_DIR, b, "names.json");
    if (fs.existsSync(p)) for (const name of Object.values(JSON.parse(fs.readFileSync(p, "utf8")))) takenNames.add(name);
}

for (const bundle of bundleNames) {
    const dir = path.join(BUNDLES_DIR, bundle);
    const namesPath = path.join(dir, "names.json");
    const existing = fs.existsSync(namesPath) ? JSON.parse(fs.readFileSync(namesPath, "utf8")) : {};
    const files = fs.readdirSync(dir).filter((f) => /^\d+\.js$/.test(f));

    let derived = 0;
    for (const f of files) {
        const id = String(parseInt(f, 10));
        if (existing[id]) continue;
        const src = fs.readFileSync(path.join(dir, f), "utf8");
        let name = null;

        // high-confidence library self-signatures (exact shapes from core-js /
        // babel runtime) — these label vendor plumbing so readers can skip it
        if (/__esModule \? [a-z] : \{ default: [a-z] \}/.test(src) && !/WeakMap|_getRequireWildcardCache/.test(src)) {
            name = "_interopRequireDefault";
        } else if (/__esModule/.test(src) && /_getRequireWildcardCache|new WeakMap\(\)/.test(src) && /default: [a-z]/.test(src)) {
            name = "_interopRequireWildcard";
        } else {
            const poly = src.match(/target: "([A-Za-z][\w.]*)"[\s\S]{0,80}?(?:proto: |stat: |global: )/);
            if (poly) name = "polyfill:" + poly[1];
        }

        // surviving declarations (rare but authoritative)
        const decl = !name && src.match(/\b(?:class|function) (G[A-Z][A-Za-z0-9_]{2,})\b/);
        if (decl) name = decl[1];

        // cross-module votes (skip names already naming another module)
        if (!name && crossVotes.has(id)) {
            const [top] = [...crossVotes.get(id).entries()].sort((a, b) => b[1] - a[1]).filter(([n]) => !takenNames.has(n));
            if (top && top[1] >= 2) name = top[0];
        }

        // locale-key majority inside the module (weakest signal — it names the
        // strings table the module USES, which is only usually its identity)
        if (!name) {
            const counts = new Map();
            for (const m of src.matchAll(/"(G[A-Z][A-Za-z0-9]{3,})"/g)) counts.set(m[1], (counts.get(m[1]) || 0) + 1);
            const [top] = [...counts.entries()].sort((a, b) => b[1] - a[1]).filter(([n]) => !takenNames.has(n));
            if (top && top[1] >= 3) name = top[0];
        }

        if (name) {
            existing[id] = name;
            takenNames.add(name);
            derived++;
        }
    }

    const sorted = Object.fromEntries(Object.entries(existing).sort((a, b) => Number(a[0]) - Number(b[0])));
    fs.writeFileSync(namesPath, JSON.stringify(sorted, null, 1) + "\n");

    // regenerate INDEX.md keyed on the derived names (fall back to content hints)
    const rows = files
        .map((f) => {
            const id = String(parseInt(f, 10));
            const padded = f.replace(".js", "");
            const name = sorted[id];
            if (name) return `- \`${padded}\` **${name}**`;
            const hint = moduleHints(fs.readFileSync(path.join(dir, f), "utf8"));
            return hint ? `- \`${padded}\` ${hint}` : null;
        })
        .filter(Boolean);
    fs.writeFileSync(
        path.join(dir, "INDEX.md"),
        `# ${bundle}.js module index\n\n` +
            `Module id → name (bold, from names.json) or content hints. Regenerated by name-modules.js.\n\n` +
            rows.join("\n") +
            "\n"
    );
    console.log(`${bundle}: ${Object.keys(sorted).length}/${files.length} modules named (+${derived} new)`);
}
