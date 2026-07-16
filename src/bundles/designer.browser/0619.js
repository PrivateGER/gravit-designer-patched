module.exports = function (module, exports, require) {
        "use strict";
        var o = require(27),
            i = require(65);
        module.exports = function (e, t, n) {
            try {
                return o(i(Object.getOwnPropertyDescriptor(e, t)[n]));
            } catch (e) {}
        };
    };
