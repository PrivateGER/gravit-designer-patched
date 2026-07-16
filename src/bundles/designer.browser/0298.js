module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = Object.defineProperty;
        module.exports = function (e, t) {
            try {
                i(RegExp, e, { value: t, configurable: true, writable: true });
            } catch (n) {
                RegExp[e] = t;
            }
            return t;
        };
    };
