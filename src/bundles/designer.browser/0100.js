module.exports = function (module, exports, require) {
        "use strict";
        var o = require(49),
            i = require(88),
            a = require(174);
        module.exports = o
            ? function (e, t, n) {
                  return i.f(e, t, a(1, n));
              }
            : function (e, t, n) {
                  return ((e[t] = n), e);
              };
    };
