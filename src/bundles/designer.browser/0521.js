module.exports = function (module, exports, require) {
        "use strict";
        var o = require(129).match(/firefox\/(\d+)/i);
        module.exports = !!o && +o[1];
    };
