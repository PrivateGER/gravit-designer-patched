module.exports = function (module, exports, require) {
        "use strict";
        var o = require(27),
            i = require(93),
            a = o({}.hasOwnProperty);
        module.exports =
            Object.hasOwn ||
            function (e, t) {
                return a(i(e), t);
            };
    };
