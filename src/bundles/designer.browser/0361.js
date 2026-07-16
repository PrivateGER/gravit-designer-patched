module.exports = function (module, exports, require) {
        "use strict";
        var o = require(454),
            i = TypeError;
        module.exports = function (e) {
            if (o(e)) throw new i("The method doesn't accept regular expressions");
            return e;
        };
    };
