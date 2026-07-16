module.exports = function (module, exports, require) {
        "use strict";
        var o = require(576),
            i = RangeError;
        module.exports = function (e, t) {
            var n = o(e);
            if (n % t) throw new i("Wrong offset");
            return n;
        };
    };
