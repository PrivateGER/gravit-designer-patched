module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const GSystemDialog = require(44),
            { gApi } = require(10 /* designerConfig */),
            a = require(1350);
        module.exports = class {
            async open(e) {
                try {
                    gContainer.openExternalLink(null, e);
                    return a.getInstance().waitForPurchase();
                } catch (e) {
                    GSystemDialog.alert(gApi.formatError(e));
                }
            }
        };
    };
