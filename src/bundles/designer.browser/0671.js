module.exports = function (module, exports, require) {
        "use strict";
        var o = require(349).forEach,
            i = require(350)("forEach");
        module.exports = i
            ? [].forEach
            : function (e) {
                  return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
              };
    };
