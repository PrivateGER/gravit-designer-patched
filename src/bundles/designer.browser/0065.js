module.exports = function (module, exports, require) {
        "use strict";
        var o = require(35),
            i = require(185),
            a = TypeError;
        module.exports = function (e) {
            if (o(e)) return e;
            throw new a(i(e) + " is not a function");
        };
    };
