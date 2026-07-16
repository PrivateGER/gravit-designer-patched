module.exports = function (module, exports, require) {
        "use strict";
        var o = require(65),
            i = require(93),
            a = require(240),
            r = require(101),
            s = TypeError,
            l = "Reduce of empty array with no initial value",
            c = function (e) {
                return function (t, n, c, d) {
                    var u = i(t),
                        p = a(u),
                        g = r(u);
                    if ((o(n), 0 === g && c < 2)) throw new s(l);
                    var h = e ? g - 1 : 0,
                        f = e ? -1 : 1;
                    if (c < 2)
                        for (;;) {
                            if (h in p) {
                                ((d = p[h]), (h += f));
                                break;
                            }
                            if (((h += f), e ? h < 0 : g <= h)) throw new s(l);
                        }
                    for (; e ? h >= 0 : g > h; h += f) h in p && (d = n(d, p[h], h, u));
                    return d;
                };
            };
        module.exports = { left: c(false), right: c(true) };
    };
