module.exports = function (module, exports, require) {
        "use strict";
        class o {
            static getSetting() {
                return "scrubbing_flag";
            }
            static isEnabled() {
                return !!gDesigner.getSetting(o.getSetting(), true);
            }
        }
        module.exports = o;
    };
