module.exports = function (module, exports, require) {
        "use strict";
        var o = require(621),
            i = String,
            a = TypeError;
        module.exports = function (e) {
            if (o(e)) return e;
            throw new a("Can't set " + i(e) + " as a prototype");
        };
    };
