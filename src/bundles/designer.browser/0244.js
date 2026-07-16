module.exports = function (module, exports, require) {
        "use strict";
        var o = require(130),
            i = Math.max,
            a = Math.min;
        module.exports = function (e, t) {
            var n = o(e);
            return n < 0 ? i(n + t, 0) : a(n, t);
        };
    };
