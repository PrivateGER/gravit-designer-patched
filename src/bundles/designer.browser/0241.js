module.exports = function (module, exports, require) {
        "use strict";
        var o = require(110),
            i = require(35),
            a = require(144),
            r = require(398),
            s = Object;
        module.exports = r
            ? function (e) {
                  return "symbol" == typeof e;
              }
            : function (e) {
                  var t = o("Symbol");
                  return i(t) && a(t.prototype, s(e));
              };
    };
