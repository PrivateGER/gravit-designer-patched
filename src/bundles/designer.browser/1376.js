module.exports = function (e, t, n) {
        "use strict";
        var o = TypeError;
        e.exports = function (e) {
            if (e > 9007199254740991) throw o("Maximum allowed index exceeded");
            return e;
        };
    };
