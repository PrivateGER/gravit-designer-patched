module.exports = function (module, exports, require) {
        "use strict";
        var o = require(131),
            i = String;
        module.exports = function (e) {
            if ("Symbol" === o(e)) throw new TypeError("Cannot convert a Symbol value to a string");
            return i(e);
        };
    };
