module.exports = function (module, exports, require) {
        "use strict";
        var o = TypeError;
        module.exports = function (e) {
            if (e > 9007199254740991) throw o("Maximum allowed index exceeded");
            return e;
        };
    };
