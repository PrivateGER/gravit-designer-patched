module.exports = function (module, exports, require) {
        "use strict";
        var o = require(185),
            i = TypeError;
        module.exports = function (e, t) {
            if (!delete e[t]) throw new i("Cannot delete property " + o(t) + " of " + o(e));
        };
    };
