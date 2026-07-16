module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(223),
            a = require(21),
            r = require(65),
            s = require(351),
            NATIVE_ARRAY_BUFFER_VIEWS = require(152),
            c = require(521),
            d = require(522),
            u = require(213),
            p = require(523),
            g = NATIVE_ARRAY_BUFFER_VIEWS.aTypedArray,
            h = NATIVE_ARRAY_BUFFER_VIEWS.exportTypedArrayMethod,
            f = RegExp.Uint16Array,
            m = f && i(f.prototype.sort),
            y = !(
                !m ||
                (a(function () {
                    m(new f(2), null);
                }) &&
                    a(function () {
                        m(new f(2), {});
                    }))
            ),
            v =
                !!m &&
                !a(function () {
                    if (u) return u < 74;
                    if (c) return c < 67;
                    if (d) return true;
                    if (p) return p < 602;
                    var e,
                        t,
                        n = new f(516),
                        o = Array(516);
                    for (e = 0; e < 516; e++) ((t = e % 4), (n[e] = 515 - e), (o[e] = e - 2 * t + 3));
                    for (
                        m(n, function (e, t) {
                            return ((e / 4) | 0) - ((t / 4) | 0);
                        }),
                            e = 0;
                        e < 516;
                        e++
                    )
                        if (n[e] !== o[e]) return true;
                });
        h(
            "sort",
            function (e) {
                return (
                    void 0 !== e && r(e),
                    v
                        ? m(this, e)
                        : s(
                              g(this),
                              (function (e) {
                                  return function (t, n) {
                                      return void 0 !== e
                                          ? +e(t, n) || 0
                                          : n != n
                                            ? -1
                                            : t != t
                                              ? 1
                                              : 0 === t && 0 === n
                                                ? 1 / t > 0 && 1 / n < 0
                                                    ? 1
                                                    : -1
                                                : t > n;
                                  };
                              })(e)
                          )
                );
            },
            !v || y
        );
    };
