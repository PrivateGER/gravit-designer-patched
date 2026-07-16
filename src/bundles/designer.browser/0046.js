module.exports = function (module, exports, require) {
        "use strict";
        var o = require(35);
        module.exports = function (e) {
            return "object" == typeof e ? null !== e : o(e);
        };
    };
