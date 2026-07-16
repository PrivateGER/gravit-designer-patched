module.exports = function (module, exports, require) {
        "use strict";
        var o = require(23 /* RegExp */).navigator,
            i = o && o.userAgent;
        module.exports = i ? String(i) : "";
    };
