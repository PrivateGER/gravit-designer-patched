module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21);
        module.exports = o(function () {
            if ("function" == typeof ArrayBuffer) {
                var e = new ArrayBuffer(8);
                Object.isExtensible(e) && Object.defineProperty(e, "a", { value: 8 });
            }
        });
    };
