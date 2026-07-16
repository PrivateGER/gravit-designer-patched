module.exports = function (module, exports, require) {
        "use strict";
        var o = require(129);
        module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(o);
    };
