module.exports = function (module, exports, require) {
        "use strict";
        var designerConfig = require(10);
        class i extends designerConfig.License {
            isExpired(e) {
                return super.isExpired(e || gDesigner.now());
            }
            isSpecialPriceExpired(e) {
                return super.isSpecialPriceExpired(e || gDesigner.now());
            }
            isOfflinePeriodExpired(e) {
                return super.isOfflinePeriodExpired(e || gDesigner.now());
            }
        }
        module.exports = i;
    };
