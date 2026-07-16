module.exports = function (module, exports, require) {
        "use strict";
        var o = require(348),
            i = require(101),
            a = require(1376),
            r = require(124),
            s = function (e, t, n, l, c, d, u, p) {
                for (var g, h, f = c, m = 0, y = !!u && r(u, p); m < l; )
                    (m in n &&
                        ((g = y ? y(n[m], m, t) : n[m]),
                        d > 0 && o(g) ? ((h = i(g)), (f = s(e, t, g, h, f, d - 1) - 1)) : (a(f + 1), (e[f] = g)),
                        f++),
                        m++);
                return f;
            };
        module.exports = s;
    };
