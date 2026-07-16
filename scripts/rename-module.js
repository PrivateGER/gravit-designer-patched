// Scope-aware variable rename for split bundle modules — the ergonomic way to
// improve body-level readability by hand (the refiner only fixes the webpack
// plumbing; local names like `e`, `t`, `n` are yours to name).
//
//   npm run rename -- designer.browser/1663 e:asset t:category
//
// When several distinct bindings share the old name (nested minified params),
// the tool lists them with their declaration lines; disambiguate with
// old@<line>:new. A rename is refused if the new name already occurs in the
// binding's scope subtree, so no reference can ever be captured — sibling
// scopes may safely reuse the same new name. Before writing, the result is
// canonicalized and compared against the original token stream — the same
// proof verify-refine uses — so a rename that would change behavior cannot
// be saved.
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { canonical } = require("./canonical");

const ROOT = path.join(__dirname, "..");
const BUNDLES_DIR = path.join(ROOT, "src", "bundles");

const RESERVED = new Set(
    (
        "break case catch class const continue debugger default delete do else export extends finally for function if " +
        "import in instanceof new return super switch this throw try typeof var void while with yield let static enum " +
        "await implements package protected interface private public true false null arguments eval undefined NaN Infinity"
    ).split(" ")
);
const isValidName = (s) => /^[A-Za-z_$][\w$]*$/.test(s) && !RESERVED.has(s);

function usage() {
    console.error("usage: npm run rename -- <bundle>/<module> <old>:<new> [<old>:<new> ...]");
    console.error("       disambiguate same-named bindings with <old>@<declLine>:<new>");
    console.error("       npm run rename -- <bundle>/<module> --list   (list all bindings, change nothing)");
    console.error("   e.g. npm run rename -- designer.browser/1663 e:asset t@57:category");
    process.exit(2);
}

const [target, ...specArgs] = process.argv.slice(2);
if (!target || !specArgs.length || !target.includes("/")) usage();
const listOnly = specArgs.includes("--list");
const [bundle, moduleArg] = target.split("/");
const dir = path.join(BUNDLES_DIR, bundle);
if (!fs.existsSync(dir)) {
    console.error(`unknown bundle "${bundle}" (expected a directory under src/bundles/)`);
    process.exit(2);
}
const moduleFile = fs.readdirSync(dir).find((f) => /^\d+\.js$/.test(f) && parseInt(f, 10) === parseInt(moduleArg, 10));
if (!moduleFile) {
    console.error(`module ${moduleArg} not found in src/bundles/${bundle}/`);
    process.exit(2);
}
const filePath = path.join(dir, moduleFile);
const relPath = `src/bundles/${bundle}/${moduleFile}`;

const specs = listOnly
    ? []
    : specArgs.map((s) => {
          const m = s.match(/^([A-Za-z_$][\w$]*)(?:@(\d+))?:([A-Za-z_$][\w$]*)$/);
          if (!m) {
              console.error(`bad rename spec "${s}" (expected old:new or old@line:new)`);
              process.exit(2);
          }
          return { oldName: m[1], line: m[2] ? parseInt(m[2], 10) : null, newName: m[3] };
      });
for (const { newName } of specs) {
    if (!isValidName(newName)) {
        console.error(`"${newName}" is a reserved word or not a valid identifier`);
        process.exit(2);
    }
}

const src = fs.readFileSync(filePath, "utf8");
const ast = parser.parse(src, { sourceType: "script" });

// Collect every binding in the module, plus every variable-namespace
// identifier occurrence (declarations and references — not property names:
// `x.foo` can't collide with a variable named foo) with its position, for
// scope-subtree collision checks.
const bindings = new Set();
const varIdents = []; // {name, start}
traverse(ast, {
    Scopable(p) {
        for (const name of Object.keys(p.scope.bindings)) bindings.add(p.scope.bindings[name]);
    },
    Identifier(p) {
        const isMemberProp = p.parentPath.isMemberExpression() && p.key === "property" && !p.parent.computed;
        const isPropKey = p.parentPath.isObjectProperty() && p.key === "key" && !p.parent.computed;
        if (!isMemberProp && !isPropKey) varIdents.push({ name: p.node.name, start: p.node.start });
    },
});

// A rename of binding B (declared in scope S) to N is refused if the name N
// appears anywhere in S's subtree — an inner binding named N would capture
// B's references, and inner references to an outer N would start resolving
// to B. Occurrences outside the subtree (sibling functions) are unaffected.
function nameUsedInRange(name, start, end) {
    return varIdents.some((v) => v.name === name && v.start >= start && v.start < end);
}

if (listOnly) {
    const srcLines = src.split("\n");
    const rows = [...bindings].sort((a, b) => a.identifier.start - b.identifier.start);
    for (const b of rows) {
        const l = b.identifier.loc.start.line;
        console.log(
            `${b.identifier.name}@${l}  (${b.kind}, ${b.references} ref${b.references === 1 ? "" : "s"})  ${srcLines[l - 1].trim().slice(0, 100)}`
        );
    }
    console.log(`\n${rows.length} bindings in ${relPath} (nothing changed)`);
    process.exit(0);
}

const edits = [];
let renamedRefs = 0;

for (const { oldName, line, newName } of specs) {
    const candidates = [...bindings].filter((b) => b.identifier.name === oldName);
    if (!candidates.length) {
        console.error(`no binding named "${oldName}" in ${relPath} (free/global names can't be renamed)`);
        process.exit(1);
    }
    let chosen = candidates;
    if (line !== null) {
        chosen = candidates.filter((b) => b.identifier.loc.start.line === line);
        if (!chosen.length) {
            console.error(`no binding named "${oldName}" declared on line ${line}; candidates:`);
            candidates.forEach((b) => console.error(`  ${oldName}@${b.identifier.loc.start.line}  (${b.kind})`));
            process.exit(1);
        }
    } else if (candidates.length > 1) {
        console.error(`"${oldName}" names ${candidates.length} distinct bindings — pick one with ${oldName}@<line>:${newName}:`);
        candidates.forEach((b) => {
            const l = b.identifier.loc.start.line;
            console.error(
                `  ${oldName}@${l}  (${b.kind}, ${b.references} reference${b.references === 1 ? "" : "s"})  ${src.split("\n")[l - 1].trim().slice(0, 100)}`
            );
        });
        process.exit(1);
    }
    for (const binding of chosen) {
        const scopeNode = binding.scope.path.node;
        if (nameUsedInRange(newName, scopeNode.start, scopeNode.end)) {
            console.error(
                `"${newName}" already occurs inside the scope of ${oldName}@${binding.identifier.loc.start.line} — renaming could capture references`
            );
            process.exit(1);
        }
        const refPaths = [...binding.referencePaths, ...binding.constantViolations];
        for (const refPath of refPaths) {
            const node = refPath.node.type === "Identifier" ? refPath.node : refPath.node.left;
            if (!node || node.type !== "Identifier") {
                console.error(`unsupported reference shape (${refPath.node.type}) for "${oldName}" — aborting`);
                process.exit(1);
            }
            const parent = refPath.parentPath;
            // `{ x }` shorthand: renaming the text would change the property KEY
            // too, so expand to `{ x: newName }` instead.
            if (parent && parent.isObjectProperty() && parent.node.shorthand && parent.node.value === node) {
                edits.push({ start: node.start, end: node.end, text: `${node.name}: ${newName}` });
            } else {
                edits.push({ start: node.start, end: node.end, text: newName });
            }
            renamedRefs++;
        }
        edits.push({ start: binding.identifier.start, end: binding.identifier.end, text: newName });
        // Make the new name visible to collision checks of later specs that
        // target the same subtree.
        varIdents.push({ name: newName, start: scopeNode.start });
    }
}

edits.sort((a, b) => b.start - a.start || b.end - a.end);
let out = src;
let lastStart = Infinity;
for (const e of edits) {
    if (e.end > lastStart) {
        console.error("overlapping edits — aborting");
        process.exit(1);
    }
    out = out.slice(0, e.start) + e.text + out.slice(e.end);
    lastStart = e.start;
}

// The proof: renames may only change identifier spellings. If the canonical
// token streams differ, something went wrong — refuse to write.
if (canonical(src) !== canonical(out)) {
    console.error("self-check failed: rename would alter the canonical token stream — not writing");
    process.exit(1);
}

fs.writeFileSync(filePath, out);
console.log(
    `${relPath}: renamed ${specs.map((s) => `${s.oldName}->${s.newName}`).join(", ")} (${renamedRefs} reference${renamedRefs === 1 ? "" : "s"} + declarations)`
);
console.log("run `npm run build` to reassemble the bundle");
