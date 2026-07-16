module.exports = function (module, exports, require) {
        "use strict";
        module.exports = function (e) {
            try {
                return !!e();
            } catch (e) {
                return true;
            }
        };
    };
