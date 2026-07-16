module.exports = function (module, exports, require) {
        "use strict";
        var o = require(116),
            i = require(184),
            a = require(243).f,
            r = require(157),
            s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        module.exports.f = function (e) {
            return s && "Window" === o(e)
                ? (function (e) {
                      try {
                          return a(e);
                      } catch (e) {
                          return r(s);
                      }
                  })(e)
                : a(i(e));
        };
    };
