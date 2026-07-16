// Canonicalize a module source into a structural token stream that is
// invariant under the edits our tooling is allowed to make:
//   - scope-consistent identifier renames
//   - true/false/undefined <-> !0/!1/void 0
//   - comments ignored                   (the require annotations)
// Two sources with equal canonical streams are behaviorally identical up to
// those transforms. Shared by verify-refine.js (diff against git HEAD) and
// rename-module.js (self-check before writing).
//
// Identifiers are NOT collapsed to a single placeholder: each one resolves to
// its binding, and bindings are numbered in traversal order ("B:<n>"), while
// free/global references keep their names ("F:<name>"). Renaming a binding
// consistently leaves the stream unchanged, but a rename that MERGES two
// bindings (`var o = e` -> `var x = x`) or captures a reference re-routes the
// resolution and the streams diverge. A flat-placeholder canonicalizer is
// blind to exactly that bug class (found the hard way: module 1339).
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function canonical(src) {
    const ast = parser.parse(src, { sourceType: "script", attachComment: false });
    const toks = [];
    const bindingOrdinals = new Map();
    const ordinalOf = (binding) => {
        let n = bindingOrdinals.get(binding);
        if (n === undefined) {
            n = bindingOrdinals.size;
            bindingOrdinals.set(binding, n);
        }
        return n;
    };
    // Pre-pass: map declaration identifier nodes to their bindings. A
    // declaration's own name must resolve to ITS binding, not through
    // p.scope lexical lookup — for `function n() { let n = ...; }` babel
    // resolves the function's name identifier via the function's inner
    // scope and hits the shadower, which made consistent renames of
    // shadowed minified names look like divergences.
    const declBinding = new Map();
    traverse(ast, {
        Scopable(p) {
            for (const name of Object.keys(p.scope.bindings)) {
                const b = p.scope.bindings[name];
                declBinding.set(b.identifier, b);
            }
        },
    });
    traverse(ast, {
        enter(p) {
            const n = p.node;
            switch (n.type) {
                case "Identifier": {
                    // A name is a fixed property label (not a renameable variable)
                    // only when it's an object-property key or a NON-computed member
                    // access (`x.foo`). In `x[foo]` foo is a real variable reference.
                    const isMemberProp = p.parentPath.isMemberExpression() && p.key === "property" && !p.parent.computed;
                    const isPropKey = p.parentPath.isObjectProperty() && p.key === "key" && !p.parent.computed;
                    if (isPropKey || isMemberProp) {
                        toks.push("P:" + n.name);
                    } else if (n.name === "undefined") {
                        toks.push("UNDEF");
                    } else {
                        const binding = declBinding.get(n) || p.scope.getBinding(n.name);
                        toks.push(binding ? "B:" + ordinalOf(binding) : "F:" + n.name);
                    }
                    return;
                }
                case "NumericLiteral":
                    toks.push("N:" + n.value);
                    return;
                case "BooleanLiteral":
                    toks.push("BOOL:" + n.value);
                    return;
                case "UnaryExpression":
                    // !0 / !1 normalize to booleans; void 0 to undefined
                    if (n.operator === "!" && n.argument.type === "NumericLiteral" && (n.argument.value === 0 || n.argument.value === 1)) {
                        toks.push("BOOL:" + (n.argument.value === 0));
                        p.skip();
                        return;
                    }
                    if (n.operator === "void" && n.argument.type === "NumericLiteral" && n.argument.value === 0) {
                        toks.push("UNDEF");
                        p.skip();
                        return;
                    }
                    toks.push("U:" + n.operator);
                    return;
                case "StringLiteral":
                    toks.push("S:" + n.value);
                    return;
                default:
                    toks.push(n.type);
            }
        },
    });
    return toks.join("|");
}

module.exports = { canonical };
