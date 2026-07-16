module.exports = function (module, exports, require) {
        "use strict";
        var o = require(27),
            i = require(61),
            a = require(184),
            r = require(403).indexOf,
            s = require(259),
            l = o([].push);
        module.exports = function (e, t) {
            var n,
                o = a(e),
                c = 0,
                d = [];
            for (n in o) !i(s, n) && i(o, n) && l(d, n);
            for (; t.length > c; ) i(o, (n = t[c++])) && (~r(d, n) || l(d, n));
            return d;
        };
    };
