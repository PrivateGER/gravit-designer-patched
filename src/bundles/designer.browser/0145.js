module.exports = function (module, exports, require) {
        "use strict";
        var o = require(65),
            i = require(194);
        module.exports = function (e, t) {
            var n = e[t];
            return i(n) ? void 0 : o(n);
        };
    };
