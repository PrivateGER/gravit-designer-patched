module.exports = function (module, exports, require) {
        "use strict";
        var o = require(46);
        module.exports = function (e) {
            return o(e) || null === e;
        };
    };
