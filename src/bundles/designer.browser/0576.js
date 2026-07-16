module.exports = function (module, exports, require) {
        "use strict";
        var o = require(130),
            i = RangeError;
        module.exports = function (e) {
            var t = o(e);
            if (t < 0) throw new i("The argument can't be less than 0");
            return t;
        };
    };
