module.exports = function (module, exports, require) {
        "use strict";
        var o = require(144),
            i = TypeError;
        module.exports = function (e, t) {
            if (o(t, e)) return e;
            throw new i("Incorrect invocation");
        };
    };
