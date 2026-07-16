module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(222).f,
            a = require(100),
            r = require(79),
            s = require(298),
            l = require(341),
            c = require(277);
        module.exports = function (e, t) {
            var n,
                d,
                u,
                p,
                g,
                h = e.target,
                f = e.global,
                m = e.stat;
            if ((n = f ? RegExp : m ? RegExp[h] || s(h, {}) : RegExp[h] && RegExp[h].prototype))
                for (d in t) {
                    if (
                        ((p = t[d]),
                        (u = e.dontCallGetSet ? (g = i(n, d)) && g.value : n[d]),
                        !c(f ? d : h + (m ? "." : "#") + d, e.forced) && void 0 !== u)
                    ) {
                        if (typeof p == typeof u) continue;
                        l(p, u);
                    }
                    ((e.sham || (u && u.sham)) && a(p, "sham", true), r(n, d, p, e));
                }
        };
    };
