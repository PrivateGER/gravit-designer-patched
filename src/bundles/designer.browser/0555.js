module.exports = function (module, exports, require) {
        "use strict";
        module.exports = class {
            static calculateProgress(e, t, n) {
                return e + (t - e) * n;
            }
        };
    };
