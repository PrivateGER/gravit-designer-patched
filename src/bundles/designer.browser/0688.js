module.exports = function (module, exports, require) {
        "use strict";
        var o = require(689),
            i = require(690),
            a = Math.abs;
        module.exports = function (e, t, n, r) {
            var s = +e,
                l = a(s),
                c = o(s);
            if (l < r) return c * i(l / r / t) * r * t;
            var d = (1 + t / 2220446049250313e-31) * l,
                u = d - (d - l);
            return u > n || u != u ? c * (1 / 0) : c * u;
        };
    };
