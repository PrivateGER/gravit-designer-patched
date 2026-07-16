module.exports = function (module, exports, require) {
        "use strict";
        var o = require(116);
        module.exports =
            Array.isArray ||
            function (e) {
                return "Array" === o(e);
            };
    };
