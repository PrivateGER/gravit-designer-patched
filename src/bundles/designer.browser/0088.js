module.exports = function (module, exports, require) {
        "use strict";
        var o = require(49),
            i = require(399),
            a = require(400),
            r = require(37),
            s = require(294),
            l = TypeError,
            c = Object.defineProperty,
            d = Object.getOwnPropertyDescriptor;
        exports.f = o
            ? a
                ? function (e, t, n) {
                      if (
                          (r(e),
                          (t = s(t)),
                          r(n),
                          "function" == typeof e && "prototype" === t && "value" in n && "writable" in n && !n.writable)
                      ) {
                          var o = d(e, t);
                          o &&
                              o.writable &&
                              ((e[t] = n.value),
                              (n = {
                                  configurable: "configurable" in n ? n.configurable : o.configurable,
                                  enumerable: "enumerable" in n ? n.enumerable : o.enumerable,
                                  writable: false,
                              }));
                      }
                      return c(e, t, n);
                  }
                : c
            : function (e, t, n) {
                  if ((r(e), (t = s(t)), r(n), i))
                      try {
                          return c(e, t, n);
                      } catch (e) {}
                  if ("get" in n || "set" in n) throw new l("Accessors not supported");
                  return ("value" in n && (e[t] = n.value), e);
              };
    };
