module.exports = function (module, exports, require) {
        "use strict";
        var o = require(46),
            i = Math.floor;
        module.exports =
            Number.isInteger ||
            function (e) {
                return !o(e) && isFinite(e) && i(e) === e;
            };
    };
