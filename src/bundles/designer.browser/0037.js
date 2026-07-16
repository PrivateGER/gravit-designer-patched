module.exports = function (module, exports, require) {
        "use strict";
        var o = require(46),
            i = String,
            a = TypeError;
        module.exports = function (e) {
            if (o(e)) return e;
            throw new a(i(e) + " is not an object");
        };
    };
