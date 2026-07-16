module.exports = function (module, exports, require) {
        "use strict";
        var o = String;
        module.exports = function (e) {
            try {
                return o(e);
            } catch (e) {
                return "Object";
            }
        };
    };
