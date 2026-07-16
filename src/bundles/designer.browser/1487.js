module.exports = function (module, exports, require) {
        "use strict";
        module.exports = class {
            static getSetting() {
                return "show_welcome_screen";
            }
            static isEnabled() {
                const e = gDesigner.getSetting("show_welcome_screen");
                return "boolean" != typeof e || e;
            }
        };
    };
