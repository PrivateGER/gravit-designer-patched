module.exports = function (e, t, n) {
        "use strict";
        e.exports = function (e) {
            try {
                return !!e();
            } catch (e) {
                return !0;
            }
        };
    };
