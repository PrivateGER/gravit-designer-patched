module.exports = function (module, exports, require) {
        "use strict";
        var o = require(239),
            i = Function.prototype,
            a = i.call,
            r = o && i.bind.bind(a, a);
        module.exports = o
            ? r
            : function (e) {
                  return function () {
                      return a.apply(e, arguments);
                  };
              };
    };
