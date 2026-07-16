module.exports = function (module, exports, require) {
        "use strict";
        var o = require(194),
            i = TypeError;
        module.exports = function (e) {
            if (o(e)) throw new i("Can't call method on " + e);
            return e;
        };
    };
