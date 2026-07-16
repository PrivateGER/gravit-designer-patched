module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            RegExp = require(23),
            a = require(29),
            r = require(49),
            s = require(693),
            NATIVE_ARRAY_BUFFER_VIEWS = require(152),
            c = require(324),
            d = require(146),
            u = require(174),
            p = require(100),
            g = require(694),
            h = require(117),
            f = require(426),
            m = require(428),
            y = require(695),
            v = require(294),
            _ = require(61),
            b = require(131),
            w = require(46),
            C = require(241),
            x = require(136),
            S = require(144),
            E = require(175),
            A = require(243).f,
            T = require(696),
            G = require(349).forEach,
            P = require(260),
            D = require(120),
            L = require(88),
            I = require(222),
            k = require(698),
            O = require(80),
            F = require(288),
            R = O.get,
            M = O.set,
            N = O.enforce,
            B = L.f,
            U = I.f,
            $ = RegExp.RangeError,
            j = c.ArrayBuffer,
            K = j.prototype,
            V = c.DataView,
            H = NATIVE_ARRAY_BUFFER_VIEWS.NATIVE_ARRAY_BUFFER_VIEWS,
            W = NATIVE_ARRAY_BUFFER_VIEWS.TYPED_ARRAY_TAG,
            z = NATIVE_ARRAY_BUFFER_VIEWS.TypedArray,
            q = NATIVE_ARRAY_BUFFER_VIEWS.TypedArrayPrototype,
            Y = NATIVE_ARRAY_BUFFER_VIEWS.isTypedArray,
            X = function (e, t) {
                D(e, t, {
                    configurable: true,
                    get: function () {
                        return R(this)[t];
                    },
                });
            },
            Q = function (e) {
                var t;
                return S(K, e) || "ArrayBuffer" === (t = b(e)) || "SharedArrayBuffer" === t;
            },
            J = function (e, t) {
                return Y(e) && !C(t) && t in e && g(+t) && t >= 0;
            },
            Z = function (e, t) {
                return ((t = v(t)), J(e, t) ? u(2, e[t]) : U(e, t));
            },
            ee = function (e, t, n) {
                return (
                    (t = v(t)),
                    !(J(e, t) && w(n) && _(n, "value")) ||
                    _(n, "get") ||
                    _(n, "set") ||
                    n.configurable ||
                    (_(n, "writable") && !n.writable) ||
                    (_(n, "enumerable") && !n.enumerable)
                        ? B(e, t, n)
                        : ((e[t] = n.value), e)
                );
            };
        r
            ? (H || ((I.f = Z), (L.f = ee), X(q, "buffer"), X(q, "byteOffset"), X(q, "byteLength"), X(q, "length")),
              o({ target: "Object", stat: true, forced: !H }, { getOwnPropertyDescriptor: Z, defineProperty: ee }),
              (module.exports = function (e, t, n) {
                  var r = e.match(/\d+/)[0] / 8,
                      l = e + (n ? "Clamped" : "") + "Array",
                      c = "get" + e,
                      u = "set" + e,
                      g = RegExp[l],
                      v = g,
                      _ = v && v.prototype,
                      b = {},
                      C = function (e, t) {
                          B(e, t, {
                              get: function () {
                                  return (function (e, t) {
                                      var n = R(e);
                                      return n.view[c](t * r + n.byteOffset, true);
                                  })(this, t);
                              },
                              set: function (e) {
                                  return (function (e, t, o) {
                                      var i = R(e);
                                      i.view[u](t * r + i.byteOffset, n ? y(o) : o, true);
                                  })(this, t, e);
                              },
                              enumerable: true,
                          });
                      };
                  (H
                      ? s &&
                        ((v = t(function (e, t, n, o) {
                            return (
                                d(e, _),
                                F(
                                    w(t)
                                        ? Q(t)
                                            ? void 0 !== o
                                                ? new g(t, m(n, r), o)
                                                : void 0 !== n
                                                  ? new g(t, m(n, r))
                                                  : new g(t)
                                            : Y(t)
                                              ? k(v, t)
                                              : a(T, v, t)
                                        : new g(f(t)),
                                    e,
                                    v
                                )
                            );
                        })),
                        E && E(v, z),
                        G(A(g), function (e) {
                            e in v || p(v, e, g[e]);
                        }),
                        (v.prototype = _))
                      : ((v = t(function (e, t, n, o) {
                            d(e, _);
                            var i,
                                s,
                                l,
                                c = 0,
                                u = 0;
                            if (w(t)) {
                                if (!Q(t)) return Y(t) ? k(v, t) : a(T, v, t);
                                ((i = t), (u = m(n, r)));
                                var p = t.byteLength;
                                if (void 0 === o) {
                                    if (p % r) throw new $("Wrong length");
                                    if ((s = p - u) < 0) throw new $("Wrong length");
                                } else if ((s = h(o) * r) + u > p) throw new $("Wrong length");
                                l = s / r;
                            } else ((l = f(t)), (i = new j((s = l * r))));
                            for (
                                M(e, {
                                    buffer: i,
                                    byteOffset: u,
                                    byteLength: s,
                                    length: l,
                                    view: new V(i),
                                });
                                c < l;

                            )
                                C(e, c++);
                        })),
                        E && E(v, z),
                        (_ = v.prototype = x(q))),
                      _.constructor !== v && p(_, "constructor", v),
                      (N(_).TypedArrayConstructor = v),
                      W && p(_, W, l));
                  var S = v !== g;
                  ((b[l] = v),
                      o({ global: true, constructor: true, forced: S, sham: !H }, b),
                      "BYTES_PER_ELEMENT" in v || p(v, "BYTES_PER_ELEMENT", r),
                      "BYTES_PER_ELEMENT" in _ || p(_, "BYTES_PER_ELEMENT", r),
                      P(l));
              }))
            : (module.exports = function () {});
    };
