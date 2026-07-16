module.exports = function (module, exports, require) {
        "use strict";
        var o = require(402),
            i = require(301);
        module.exports =
            Object.keys ||
            function (e) {
                return o(e, i);
            };
    };
