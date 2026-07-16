// Canonicalize a module source into a structural token stream that is
// invariant under the edits our tooling is allowed to make:
//   - every identifier -> "ID"           (scope-consistent renames)
//   - true/false/undefined <-> !0/!1/void 0
//   - comments ignored                   (require annotations)
// Two sources with equal canonical streams are behaviorally identical up to
// those transforms. Shared by verify-refine.js (diff against git HEAD) and
// rename-module.js (self-check before writing).
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function canonical(src) {
    const ast = parser.parse(src, { sourceType: "script", attachComment: false });
    const toks = [];
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
                        toks.push("ID");
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
