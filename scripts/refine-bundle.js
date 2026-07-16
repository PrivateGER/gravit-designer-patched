// Make the split webpack modules readable, without changing behavior:
//   1. rename the webpack params (e, t, n) -> (module, exports, require)
//   2. rename short variables holding requires of named modules:
//        var o = n(15)  ->  var GPlatform = require(15)
//      (names come from src/bundles/<bundle>/names.json)
//   3. annotate inline require calls: require(820 /* GoogleTagManagerSettings */)
//   4. replace minifier literals: !0 -> true, !1 -> false, void 0 -> undefined
//   5. un-alias destructures: const { debounce: s } -> const { debounce }
//      (renames the mangled local to the real property name it already carries)
//
// All edits are scope-aware AST renames applied as precise text splices — no
// code generation. A module is skipped entirely if it uses eval, and a param
// rename is skipped if the module references that name as a free global
// (UMD/environment detection would change behavior). Idempotent.
// Usage: node scripts/refine-bundle.js [bundle ...]
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const ROOT = path.join(__dirname, "..");
const BUNDLES_DIR = path.join(ROOT, "src", "bundles");
const PARAM_NAMES = ["module", "exports", "require"];

// Names we must never rename a binding TO (reserved words + confusing globals).
const RESERVED = new Set(
    (
        "break case catch class const continue debugger default delete do else export extends finally for function if " +
        "import in instanceof new return super switch this throw try typeof var void while with yield let static enum " +
        "await implements package protected interface private public true false null arguments eval undefined NaN Infinity"
    ).split(" ")
);
const isValidName = (s) => /^[A-Za-z_$][\w$]*$/.test(s) && !RESERVED.has(s);

const bundles = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(BUNDLES_DIR);

const stats = { params: 0, requireVars: 0, destructures: 0, annotations: 0, literals: 0, skippedEval: 0, skippedGlobal: 0 };

function refine(src, names) {
    if (/\beval\b/.test(src)) {
        stats.skippedEval++;
        return src;
    }
    const ast = parser.parse(src, { sourceType: "script" });
    const edits = []; // {start, end, text}

    // the module function is the RHS of `module.exports = <fn>`
    let fnPath = null;
    traverse(ast, {
        Program(p) {
            const expr = p.get("body.0.expression");
            if (expr && expr.isAssignmentExpression()) {
                const right = expr.get("right");
                if (right.isFunctionExpression() || right.isArrowFunctionExpression()) fnPath = right;
            }
            p.stop();
        },
    });
    if (!fnPath) return src;

    // Names that renames must not collide with: every binding declared inside
    // the module function, plus every free (unbound) reference inside it.
    // Property names don't count — `o.GPlatform` can't conflict with a
    // variable named GPlatform.
    const usedNames = new Set();
    const collectScope = (scope) => {
        for (const n of Object.keys(scope.bindings)) usedNames.add(n);
    };
    collectScope(fnPath.scope);
    fnPath.traverse({
        Scopable(p) {
            collectScope(p.scope);
        },
        ReferencedIdentifier(p) {
            if (!p.scope.getBinding(p.node.name)) usedNames.add(p.node.name); // free/global ref
        },
    });

    const renameBinding = (binding, newName, { skipDeclNode = false } = {}) => {
        if (!binding || usedNames.has(newName) || !isValidName(newName)) return false;
        const refPaths = [...binding.referencePaths, ...binding.constantViolations];
        // collect edits, but bail out on any node shape we don't fully understand
        const pending = [];
        for (const refPath of refPaths) {
            const node = refPath.node.type === "Identifier" ? refPath.node : refPath.node.left;
            if (!node || node.type !== "Identifier") return false;
            const parent = refPath.parentPath;
            // `{ x }` (shorthand property VALUE) — renaming the text would also
            // change the property KEY, so expand to `{ x: newName }` instead.
            if (parent && parent.isObjectProperty() && parent.node.shorthand && parent.node.value === node) {
                pending.push({ start: node.start, end: node.end, text: `${node.name}: ${newName}` });
            } else {
                pending.push({ start: node.start, end: node.end, text: newName });
            }
        }
        if (!skipDeclNode) {
            if (binding.identifier.type !== "Identifier") return false;
            pending.push({ start: binding.identifier.start, end: binding.identifier.end, text: newName });
        }
        edits.push(...pending);
        usedNames.add(newName);
        return true;
    };

    // 1. webpack params. usedNames already blocks the rename when the module
    // references module/exports/require freely (UMD/environment detection).
    const params = fnPath.node.params;
    for (let i = 0; i < Math.min(params.length, 3); i++) {
        const p = params[i];
        if (p.type !== "Identifier" || p.name.length > 2) continue; // already renamed or unusual
        if (usedNames.has(PARAM_NAMES[i])) {
            stats.skippedGlobal++;
            continue;
        }
        if (renameBinding(fnPath.scope.getBinding(p.name), PARAM_NAMES[i])) stats.params++;
    }

    // 2 + 3. require bindings and inline annotations. The AST still carries the
    // ORIGINAL param name (edits are pending text splices), so match on that.
    const requireOrig = params[2] && params[2].type === "Identifier" ? params[2].name : null;
    if (requireOrig) {
        const fnBinding = fnPath.scope.getBinding(requireOrig);
        fnPath.traverse({
            CallExpression(callPath) {
                const callee = callPath.node.callee;
                if (callee.type !== "Identifier" || callee.name !== requireOrig) return;
                if (callPath.scope.getBinding(requireOrig) !== fnBinding) return; // shadowed
                const arg = callPath.node.arguments[0];
                if (!arg || arg.type !== "NumericLiteral" || callPath.node.arguments.length !== 1) return;
                const name = names[String(arg.value)];

                // 2. rename `var x = require(15)` when x is a mangled 1-2 char
                // name — or resync a previously applied name after names.json
                // was corrected (only G-style/uppercase names, so deliberate
                // lowercase hand-aliases like `configBase` are never touched)
                const parent = callPath.parentPath;
                const isDeclarator = parent.isVariableDeclarator() && parent.node.id.type === "Identifier";
                let carriesName = Boolean(name) && isDeclarator && parent.node.id.name === name;
                if (name && isDeclarator && !carriesName) {
                    const varName = parent.node.id.name;
                    const mangled = varName.length <= 2;
                    const staleName = /^[A-Z_]/.test(varName) && varName.length > 2;
                    if ((mangled || staleName) && renameBinding(parent.scope.getBinding(varName), name)) {
                        stats.requireVars++;
                        carriesName = true;
                    }
                }
                // 3. keep the inline annotation in sync: add it when missing,
                // refresh it when names.json changed, remove it when the module
                // lost its name or the variable now carries it
                const existingAnn = src.slice(arg.end).match(/^ \/\* ([^*]*) \*\//);
                const wanted = name && !carriesName ? name : null;
                if (wanted && (!existingAnn || existingAnn[1] !== wanted)) {
                    edits.push({ start: arg.end, end: arg.end + (existingAnn ? existingAnn[0].length : 0), text: ` /* ${wanted} */` });
                    stats.annotations++;
                } else if (!wanted && existingAnn) {
                    edits.push({ start: arg.end, end: arg.end + existingAnn[0].length, text: "" });
                    stats.annotations++;
                }
            },
        });
    }

    // 5. destructure aliases: `const { debounce: s } = ...` keeps the real
    // property name, so rename the mangled local `s` -> `debounce` and collapse
    // the property to shorthand `{ debounce }`. Behavior-preserving: the key is
    // the source of truth and property/variable namespaces don't collide.
    fnPath.traverse({
        ObjectProperty(propPath) {
            const node = propPath.node;
            if (node.shorthand || node.computed) return;
            if (!propPath.parentPath.isObjectPattern()) return; // destructuring only
            if (node.key.type !== "Identifier" || node.value.type !== "Identifier") return;
            const keyName = node.key.name;
            const alias = node.value.name;
            if (alias.length > 2 || alias === keyName || !isValidName(keyName)) return;
            const binding = propPath.scope.getBinding(alias);
            if (!binding) return;
            // collapse `key: alias` -> `key` at the declaration site, and rename
            // every other reference of the binding to the key name
            if (renameBinding(binding, keyName, { skipDeclNode: true })) {
                edits.push({ start: node.start, end: node.end, text: keyName });
                stats.destructures++;
            }
        },
    });

    // 4. minifier literals
    traverse(ast, {
        UnaryExpression(p) {
            const { operator, argument } = p.node;
            if (operator === "!" && argument.type === "NumericLiteral" && (argument.value === 0 || argument.value === 1)) {
                edits.push({ start: p.node.start, end: p.node.end, text: argument.value === 0 ? "true" : "false" });
                stats.literals++;
            } else if (
                operator === "void" &&
                argument.type === "NumericLiteral" &&
                argument.value === 0 &&
                !p.scope.hasBinding("undefined")
            ) {
                edits.push({ start: p.node.start, end: p.node.end, text: "undefined" });
                stats.literals++;
            }
        },
    });

    edits.sort((a, b) => b.start - a.start || b.end - a.end);
    let out = src;
    let lastStart = Infinity;
    for (const e of edits) {
        if (e.end > lastStart) continue; // overlapping edit — skip defensively
        out = out.slice(0, e.start) + e.text + out.slice(e.end);
        lastStart = e.start;
    }
    return out;
}

for (const bundle of bundles) {
    const dir = path.join(BUNDLES_DIR, bundle);
    const namesPath = path.join(dir, "names.json");
    const names = fs.existsSync(namesPath) ? JSON.parse(fs.readFileSync(namesPath, "utf8")) : {};
    // module ids are global across chunks — merge all bundles' names for lookups
    for (const other of fs.readdirSync(BUNDLES_DIR)) {
        const p = path.join(BUNDLES_DIR, other, "names.json");
        if (other !== bundle && fs.existsSync(p)) Object.assign(names, JSON.parse(fs.readFileSync(p, "utf8")));
    }
    const files = fs.readdirSync(dir).filter((f) => /^\d+\.js$/.test(f));
    let changed = 0;
    for (const f of files) {
        const file = path.join(dir, f);
        const src = fs.readFileSync(file, "utf8");
        let out;
        try {
            out = refine(src, names);
        } catch (e) {
            console.warn(`  skip ${bundle}/${f}: ${e.message}`);
            continue;
        }
        if (out !== src) {
            fs.writeFileSync(file, out);
            changed++;
        }
    }
    console.log(`${bundle}: refined ${changed}/${files.length} modules`);
}
console.log(stats);
