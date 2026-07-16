module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            RegExp = require(23),
            a = require(27),
            r = require(277),
            s = require(79),
            l = require(558 /* polyfill:Object */),
            c = require(121),
            d = require(146),
            u = require(35),
            p = require(194),
            g = require(46),
            h = require(21),
            f = require(343),
            m = require(137),
            y = require(288);
        module.exports = function (e, t, n) {
            var v = -1 !== e.indexOf("Map"),
                _ = -1 !== e.indexOf("Weak"),
                b = v ? "set" : "add",
                w = RegExp[e],
                C = w && w.prototype,
                x = w,
                S = {},
                E = function (e) {
                    var t = a(C[e]);
                    s(
                        C,
                        e,
                        "add" === e
                            ? function (e) {
                                  return (t(this, 0 === e ? 0 : e), this);
                              }
                            : "delete" === e
                              ? function (e) {
                                    return !(_ && !g(e)) && t(this, 0 === e ? 0 : e);
                                }
                              : "get" === e
                                ? function (e) {
                                      return _ && !g(e) ? void 0 : t(this, 0 === e ? 0 : e);
                                  }
                                : "has" === e
                                  ? function (e) {
                                        return !(_ && !g(e)) && t(this, 0 === e ? 0 : e);
                                    }
                                  : function (e, n) {
                                        return (t(this, 0 === e ? 0 : e, n), this);
                                    }
                    );
                };
            if (
                r(
                    e,
                    !u(w) ||
                        !(
                            _ ||
                            (C.forEach &&
                                !h(function () {
                                    new w().entries().next();
                                }))
                        )
                )
            )
                ((x = n.getConstructor(t, e, v, b)), l.enable());
            else if (r(e, true)) {
                var A = new x(),
                    T = A[b](_ ? {} : -0, 1) !== A,
                    G = h(function () {
                        A.has(1);
                    }),
                    P = f(function (e) {
                        new w(e);
                    }),
                    D =
                        !_ &&
                        h(function () {
                            for (var e = new w(), t = 5; t--; ) e[b](t, t);
                            return !e.has(-0);
                        });
                (P ||
                    (((x = t(function (e, t) {
                        d(e, C);
                        var n = y(new w(), e, x);
                        return (p(t) || c(t, n[b], { that: n, AS_ENTRIES: v }), n);
                    })).prototype = C),
                    (C.constructor = x)),
                    (G || D) && (E("delete"), E("has"), v && E("get")),
                    (D || T) && E(b),
                    _ && C.clear && delete C.clear);
            }
            return ((S[e] = x), o({ global: true, constructor: true, forced: x !== w }, S), m(x, e), _ || n.setStrong(x, e, v), x);
        };
    };
