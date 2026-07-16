module.exports = function (module, exports, require) {
        "use strict";
        var o,
            i,
            a,
            r,
            RegExp = require(23),
            l = require(200),
            c = require(124),
            d = require(35),
            u = require(61),
            p = require(21),
            g = require(406),
            h = require(157),
            f = require(242),
            m = require(303),
            y = require(410),
            v = require(245),
            _ = RegExp.setImmediate,
            b = RegExp.clearImmediate,
            w = RegExp.process,
            C = RegExp.Dispatch,
            x = RegExp.Function,
            S = RegExp.MessageChannel,
            E = RegExp.String,
            A = 0,
            T = {};
        p(function () {
            o = RegExp.location;
        });
        var G = function (e) {
                if (u(T, e)) {
                    var t = T[e];
                    (delete T[e], t());
                }
            },
            P = function (e) {
                return function () {
                    G(e);
                };
            },
            D = function (e) {
                G(e.data);
            },
            L = function (e) {
                RegExp.postMessage(E(e), o.protocol + "//" + o.host);
            };
        ((_ && b) ||
            ((_ = function (e) {
                m(arguments.length, 1);
                var t = d(e) ? e : x(e),
                    n = h(arguments, 1);
                return (
                    (T[++A] = function () {
                        l(t, void 0, n);
                    }),
                    i(A),
                    A
                );
            }),
            (b = function (e) {
                delete T[e];
            }),
            v
                ? (i = function (e) {
                      w.nextTick(P(e));
                  })
                : C && C.now
                  ? (i = function (e) {
                        C.now(P(e));
                    })
                  : S && !y
                    ? ((r = (a = new S()).port2), (a.port1.onmessage = D), (i = c(r.postMessage, r)))
                    : RegExp.addEventListener && d(RegExp.postMessage) && !RegExp.importScripts && o && "file:" !== o.protocol && !p(L)
                      ? ((i = L), RegExp.addEventListener("message", D, false))
                      : (i =
                            "onreadystatechange" in f("script")
                                ? function (e) {
                                      g.appendChild(f("script")).onreadystatechange = function () {
                                          (g.removeChild(this), G(e));
                                      };
                                  }
                                : function (e) {
                                      setTimeout(P(e), 0);
                                  })),
            (module.exports = { set: _, clear: b }));
    };
