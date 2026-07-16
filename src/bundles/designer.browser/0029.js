module.exports = function (module, exports, require) {
        "use strict";
        var o = require(239),
            i = Function.prototype.call;
        module.exports = o
            ? i.bind(i)
            : function () {
                  return i.apply(i, arguments);
              };
    };
