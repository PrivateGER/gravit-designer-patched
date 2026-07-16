module.exports = function (module, exports, require) {
        "use strict";
        var o = require(43)("match");
        module.exports = function (e) {
            var t = /./;
            try {
                "/./"[e](t);
            } catch (n) {
                try {
                    return ((t[o] = false), "/./"[e](t));
                } catch (e) {}
            }
            return false;
        };
    };
