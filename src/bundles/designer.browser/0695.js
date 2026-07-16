module.exports = function (module, exports, require) {
        "use strict";
        var o = Math.round;
        module.exports = function (e) {
            var t = o(e);
            return t < 0 ? 0 : t > 255 ? 255 : 255 & t;
        };
    };
