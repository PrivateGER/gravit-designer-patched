module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21);
        module.exports = !o(function () {
            function e() {}
            return ((e.prototype.constructor = null), Object.getPrototypeOf(new e()) !== e.prototype);
        });
    };
