module.exports = function (module, exports, require) {
        "use strict";
        var o = require(129).match(/AppleWebKit\/(\d+)\./);
        module.exports = !!o && +o[1];
    };
