module.exports = function (module, exports, require) {
        "use strict";
        var o = require(619),
            i = require(46),
            a = require(92),
            r = require(620);
        module.exports =
            Object.setPrototypeOf ||
            ("__proto__" in {}
                ? (function () {
                      var e,
                          t = false,
                          n = {};
                      try {
                          ((e = o(Object.prototype, "__proto__", "set"))(n, []), (t = n instanceof Array));
                      } catch (e) {}
                      return function (n, o) {
                          return (a(n), r(o), i(n) ? (t ? e(n, o) : (n.__proto__ = o), n) : n);
                      };
                  })()
                : void 0);
    };
