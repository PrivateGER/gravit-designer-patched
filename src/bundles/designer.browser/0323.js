module.exports = function (module, exports, require) {
        "use strict";
        var o = require(37),
            i = require(102);
        module.exports = function (e, t, n, a) {
            try {
                return a ? t(o(n)[0], n[1]) : t(n);
            } catch (t) {
                i(e, "throw", t);
            }
        };
    };
