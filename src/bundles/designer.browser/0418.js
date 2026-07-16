module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(29),
            a = require(74),
            PROPER = require(199),
            s = require(35),
            l = require(419),
            c = require(208),
            d = require(175),
            u = require(137),
            p = require(100),
            g = require(79),
            h = require(43),
            f = require(203),
            IteratorPrototype = require(251),
            y = PROPER.PROPER,
            v = PROPER.CONFIGURABLE,
            _ = IteratorPrototype.IteratorPrototype,
            b = IteratorPrototype.BUGGY_SAFARI_ITERATORS,
            w = h("iterator"),
            C = function () {
                return this;
            };
        module.exports = function (e, t, n, r, h, m, x) {
            l(n, t, r);
            var S,
                E,
                A,
                T = function (e) {
                    if (e === h && I) return I;
                    if (!b && e && e in D) return D[e];
                    switch (e) {
                        case "keys":
                        case "values":
                        case "entries":
                            return function () {
                                return new n(this, e);
                            };
                    }
                    return function () {
                        return new n(this);
                    };
                },
                G = t + " Iterator",
                P = false,
                D = e.prototype,
                L = D[w] || D["@@iterator"] || (h && D[h]),
                I = (!b && L) || T(h),
                k = ("Array" === t && D.entries) || L;
            if (
                (k &&
                    (S = c(k.call(new e()))) !== Object.prototype &&
                    S.next &&
                    (a || c(S) === _ || (d ? d(S, _) : s(S[w]) || g(S, w, C)), u(S, G, true, true), a && (f[G] = C)),
                y &&
                    "values" === h &&
                    L &&
                    "values" !== L.name &&
                    (!a && v
                        ? p(D, "name", "values")
                        : ((P = true),
                          (I = function () {
                              return i(L, this);
                          }))),
                h)
            )
                if (
                    ((E = {
                        values: T("values"),
                        keys: m ? I : T("keys"),
                        entries: T("entries"),
                    }),
                    x)
                )
                    for (A in E) (b || P || !(A in D)) && g(D, A, E[A]);
                else o({ target: t, proto: true, forced: b || P }, E);
            return ((a && !x) || D[w] === I || g(D, w, I, { name: h }), (f[t] = I), E);
        };
    };
