module.exports = function (module, exports, require) {
        "use strict";
        module.exports = function (e) {
            try {
                return { error: false, value: e() };
            } catch (e) {
                return { error: true, value: e };
            }
        };
    };
