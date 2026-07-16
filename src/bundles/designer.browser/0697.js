module.exports = function (module, exports, require) {
        "use strict";
        var o = require(131);
        module.exports = function (e) {
            var t = o(e);
            return "BigInt64Array" === t || "BigUint64Array" === t;
        };
    };
