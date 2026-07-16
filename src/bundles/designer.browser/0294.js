module.exports = function (module, exports, require) {
        "use strict";
        var o = require(397),
            i = require(241);
        module.exports = function (e) {
            var t = o(e, "string");
            return i(t) ? t : t + "";
        };
    };
