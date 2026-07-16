module.exports = function (module, exports, require) {
        "use strict";
        var o = TypeError;
        module.exports = function (e, t) {
            if (e < t) throw new o("Not enough arguments");
            return e;
        };
    };
