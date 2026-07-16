module.exports = function (module, exports, require) {
        "use strict";
        const o = require(1244),
            i = require(1679),
            a = require(1682),
            r = require(1683);
        module.exports = class {
            static newInAppPurchase(e) {
                switch (e) {
                    case o.Windows:
                        return new a();
                    case o.Apple:
                        return new r();
                    default:
                        return new i();
                }
            }
        };
    };
