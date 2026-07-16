module.exports = function (module, exports, require) {
        "use strict";
        var RegExp = require(23),
            i = require(35),
            a = RegExp.WeakMap;
        module.exports = i(a) && /native code/.test(String(a));
    };
