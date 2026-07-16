module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.getOS = void 0));
        var GObject = require(1);
        exports.getOS = () => {
            let e = null;
            switch (GObject.GSystem.operatingSystem) {
                case GObject.GSystem.OperatingSystem.Unix:
                    e = "Unix";
                    break;
                case GObject.GSystem.OperatingSystem.Windows:
                    e = "Windows";
                    break;
                case GObject.GSystem.OperatingSystem.OSX_IOS:
                    e = "OSX";
            }
            return e;
        };
    };
