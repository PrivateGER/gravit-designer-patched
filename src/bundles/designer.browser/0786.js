module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21);
        module.exports = !o(function () {
            return Object.isExtensible(Object.preventExtensions({}));
        });
    };
