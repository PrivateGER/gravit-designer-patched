module.exports = function (module, exports, require) {
        "use strict";
        var o = require(184),
            i = require(244),
            a = require(101),
            r = function (e) {
                return function (t, n, r) {
                    var s = o(t),
                        l = a(s);
                    if (0 === l) return !e && -1;
                    var c,
                        d = i(r, l);
                    if (e && n != n) {
                        for (; l > d; ) if ((c = s[d++]) != c) return true;
                    } else for (; l > d; d++) if ((e || d in s) && s[d] === n) return e || d || 0;
                    return !e && -1;
                };
            };
        module.exports = { includes: r(true), indexOf: r(false) };
    };
