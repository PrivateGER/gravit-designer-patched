module.exports = function (module, exports, require) {
        "use strict";
        var o = require(402),
            i = require(301).concat("length", "prototype");
        exports.f =
            Object.getOwnPropertyNames ||
            function (e) {
                return o(e, i);
            };
    };
