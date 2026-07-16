module.exports = function (module, exports, require) {
        "use strict";
        var o = require(297);
        module.exports = function (e, t) {
            return o[e] || (o[e] = t || {});
        };
    };
