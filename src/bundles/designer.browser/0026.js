module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(421),
            a = require(422),
            r = require(19),
            s = require(100),
            l = require(137),
            c = require(43)("iterator"),
            d = r.values,
            u = function (e, t) {
                if (e) {
                    if (e[c] !== d)
                        try {
                            s(e, c, d);
                        } catch (t) {
                            e[c] = d;
                        }
                    if ((l(e, t, true), i[t]))
                        for (var n in r)
                            if (e[n] !== r[n])
                                try {
                                    s(e, n, r[n]);
                                } catch (t) {
                                    e[n] = r[n];
                                }
                }
            };
        for (var p in i) u(RegExp[p] && RegExp[p].prototype, p);
        u(a, "DOMTokenList");
    };
