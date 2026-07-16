module.exports = function (module, exports, require) {
        "use strict";
        var o = require(25),
            RegExp = require(23),
            a = require(146),
            r = require(37),
            s = require(35),
            l = require(208),
            c = require(120),
            d = require(420),
            u = require(21),
            p = require(61),
            g = require(43),
            h = require(251 /* IteratorPrototype */).IteratorPrototype,
            f = require(49),
            m = require(74),
            y = g("toStringTag"),
            v = TypeError,
            _ = RegExp.Iterator,
            b =
                m ||
                !s(_) ||
                _.prototype !== h ||
                !u(function () {
                    _({});
                }),
            w = function () {
                if ((a(this, h), l(this) === h)) throw new v("Abstract class Iterator not directly constructable");
            },
            C = function (e, t) {
                f
                    ? c(h, e, {
                          configurable: true,
                          get: function () {
                              return t;
                          },
                          set: function (t) {
                              if ((r(this), this === h)) throw new v("You can't redefine this property");
                              p(this, e) ? (this[e] = t) : d(this, e, t);
                          },
                      })
                    : (h[e] = t);
            };
        (p(h, y) || C(y, "Iterator"),
            (!b && p(h, "constructor") && h.constructor !== Object) || C("constructor", w),
            (w.prototype = h),
            o({ global: true, constructor: true, forced: b }, { Iterator: w }));
    };
