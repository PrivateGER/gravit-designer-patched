module.exports = function (module, exports, require) {
        "use strict";
        var o = require(49),
            i = require(27),
            a = require(29),
            r = require(21),
            s = require(405),
            l = require(404),
            c = require(396),
            d = require(93),
            u = require(240),
            p = Object.assign,
            g = Object.defineProperty,
            h = i([].concat);
        module.exports =
            !p ||
            r(function () {
                if (
                    o &&
                    1 !==
                        p(
                            { b: 1 },
                            p(
                                g({}, "a", {
                                    enumerable: true,
                                    get: function () {
                                        g(this, "b", { value: 3, enumerable: false });
                                    },
                                }),
                                { b: 2 }
                            )
                        ).b
                )
                    return true;
                var e = {},
                    t = {},
                    n = Symbol("assign detection");
                return (
                    (e[n] = 7),
                    "abcdefghijklmnopqrst".split("").forEach(function (e) {
                        t[e] = e;
                    }),
                    7 !== p({}, e)[n] || "abcdefghijklmnopqrst" !== s(p({}, t)).join("")
                );
            })
                ? function (e, t) {
                      for (var n = d(e), i = arguments.length, r = 1, p = l.f, g = c.f; i > r; )
                          for (var f, m = u(arguments[r++]), y = p ? h(s(m), p(m)) : s(m), v = y.length, _ = 0; v > _; )
                              ((f = y[_++]), (o && !a(g, m, f)) || (n[f] = m[f]));
                      return n;
                  }
                : p;
    };
