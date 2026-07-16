module.exports = function (module, exports, require) {
        "use strict";
        var o = require(130),
            i = Math.min;
        module.exports = function (e) {
            var t = o(e);
            return t > 0 ? i(t, 9007199254740991) : 0;
        };
    };
