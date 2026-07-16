module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            i = require(74),
            a = require(186),
            r = require(21),
            s = require(110),
            l = require(35),
            c = require(342),
            d = require(453),
            u = require(79),
            p = a && a.prototype;
        if (
            (o(
                {
                    target: "Promise",
                    proto: true,
                    real: true,
                    forced:
                        !!a &&
                        r(function () {
                            p.finally.call({ then: function () {} }, function () {});
                        }),
                },
                {
                    finally: function (e) {
                        var t = c(this, s("Promise")),
                            n = l(e);
                        return this.then(
                            n
                                ? function (n) {
                                      return d(t, e()).then(function () {
                                          return n;
                                      });
                                  }
                                : e,
                            n
                                ? function (n) {
                                      return d(t, e()).then(function () {
                                          throw n;
                                      });
                                  }
                                : e
                        );
                    },
                }
            ),
            !i && l(a))
        ) {
            var g = s("Promise").prototype.finally;
            p.finally !== g && u(p, "finally", g, { unsafe: true });
        }
    };
