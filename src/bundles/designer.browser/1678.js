module.exports = function (module, exports, require) {
        "use strict";
        const o = require(1244),
            GWebInAppPurchase = require(1679),
            GWindowsInAppPurchase = require(1682),
            r = require(1683);
        module.exports = class {
            static newInAppPurchase(e) {
                switch (e) {
                    case o.Windows:
                        return new GWindowsInAppPurchase();
                    case o.Apple:
                        return new r();
                    default:
                        return new GWebInAppPurchase();
                }
            }
        };
    };
