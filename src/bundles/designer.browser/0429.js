module.exports = function (module, exports, require) {
        "use strict";
        var o = require(397),
            i = TypeError;
        module.exports = function (e) {
            var t = o(e, "number");
            if ("number" == typeof t) throw new i("Can't convert number to bigint");
            return BigInt(t);
        };
    };
