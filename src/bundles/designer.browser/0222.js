module.exports = function (module, exports, require) {
        "use strict";
        var o = require(49),
            i = require(29),
            a = require(396),
            r = require(174),
            s = require(184),
            l = require(294),
            c = require(61),
            d = require(399),
            u = Object.getOwnPropertyDescriptor;
        exports.f = o
            ? u
            : function (e, t) {
                  if (((e = s(e)), (t = l(t)), d))
                      try {
                          return u(e, t);
                      } catch (e) {}
                  if (c(e, t)) return r(!i(a.f, e, t), e[t]);
              };
    };
