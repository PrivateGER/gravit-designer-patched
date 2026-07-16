module.exports = function (module, exports, require) {
        "use strict";
        var o,
            i,
            a,
            r,
            s,
            RegExp = require(23),
            c = require(411),
            d = require(124),
            u = require(409).set,
            p = require(412),
            g = require(410),
            h = require(624),
            f = require(625),
            m = require(245),
            y = RegExp.MutationObserver || RegExp.WebKitMutationObserver,
            v = RegExp.document,
            _ = RegExp.process,
            b = RegExp.Promise,
            w = c("queueMicrotask");
        if (!w) {
            var C = new p(),
                x = function () {
                    var e, t;
                    for (m && (e = _.domain) && e.exit(); (t = C.get()); )
                        try {
                            t();
                        } catch (e) {
                            throw (C.head && o(), e);
                        }
                    e && e.enter();
                };
            (g || m || f || !y || !v
                ? !h && b && b.resolve
                    ? (((r = b.resolve(void 0)).constructor = b),
                      (s = d(r.then, r)),
                      (o = function () {
                          s(x);
                      }))
                    : m
                      ? (o = function () {
                            _.nextTick(x);
                        })
                      : ((u = d(u, RegExp)),
                        (o = function () {
                            u(x);
                        }))
                : ((i = true),
                  (a = v.createTextNode("")),
                  new y(x).observe(a, { characterData: true }),
                  (o = function () {
                      a.data = i = !i;
                  })),
                (w = function (e) {
                    (C.head || o(), C.add(e));
                }));
        }
        module.exports = w;
    };
