module.exports = function (module, exports, require) {
        "use strict";
        var o = require(184),
            i = require(360),
            a = require(203),
            r = require(80),
            s = require(88).f,
            l = require(418),
            c = require(252),
            d = require(74),
            u = require(49),
            p = r.set,
            g = r.getterFor("Array Iterator");
        module.exports = l(
            Array,
            "Array",
            function (e, t) {
                p(this, { type: "Array Iterator", target: o(e), index: 0, kind: t });
            },
            function () {
                var e = g(this),
                    t = e.target,
                    n = e.index++;
                if (!t || n >= t.length) return ((e.target = null), c(void 0, true));
                switch (e.kind) {
                    case "keys":
                        return c(n, false);
                    case "values":
                        return c(t[n], false);
                }
                return c([n, t[n]], false);
            },
            "values"
        );
        var h = (a.Arguments = a.Array);
        if ((i("keys"), i("values"), i("entries"), !d && u && "values" !== h.name))
            try {
                s(h, "name", { value: "values" });
            } catch (e) {}
    };
