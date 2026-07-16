module.exports = function (module, exports, require) {
        "use strict";
        var o = require(21);
        module.exports = !o(function () {
            var e = function () {}.bind();
            return "function" != typeof e || e.hasOwnProperty("prototype");
        });
    };
