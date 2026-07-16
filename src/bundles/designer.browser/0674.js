module.exports = function (module, exports, require) {
        "use strict";
        var o = require(309).charAt,
            i = require(62),
            a = require(80),
            r = require(418),
            s = require(252),
            l = a.set,
            c = a.getterFor("String Iterator");
        r(
            String,
            "String",
            function (e) {
                l(this, { type: "String Iterator", string: i(e), index: 0 });
            },
            function () {
                var e,
                    t = c(this),
                    n = t.string,
                    i = t.index;
                return i >= n.length ? s(void 0, true) : ((e = o(n, i)), (t.index += e.length), s(e, false));
            }
        );
    };
