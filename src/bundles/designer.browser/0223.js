module.exports = function (module, exports, require) {
        "use strict";
        var o = require(116),
            i = require(27);
        module.exports = function (e) {
            if ("Function" === o(e)) return i(e);
        };
    };
