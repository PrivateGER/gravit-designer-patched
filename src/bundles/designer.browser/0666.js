module.exports = function (module, exports, require) {
        "use strict";
        var o = require(27),
            i = require(348),
            a = require(35),
            r = require(116),
            s = require(62),
            l = o([].push);
        module.exports = function (e) {
            if (a(e)) return e;
            if (i(e)) {
                for (var t = e.length, n = [], o = 0; o < t; o++) {
                    var c = e[o];
                    "string" == typeof c ? l(n, c) : ("number" != typeof c && "Number" !== r(c) && "String" !== r(c)) || l(n, s(c));
                }
                var d = n.length,
                    u = true;
                return function (e, t) {
                    if (u) return ((u = false), t);
                    if (i(this)) return t;
                    for (var o = 0; o < d; o++) if (n[o] === e) return t;
                };
            }
        };
    };
