module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const { gApi: o } = require(10 /* designerConfig */);
        module.exports = class {
            canMakePayments() {
                return true;
            }
            getOptions() {
                return null;
            }
            async purchase(e, t) {
                throw "Not implemented";
            }
            async getProduct() {
                return null;
            }
            async syncLicense() {
                return Promise.resolve();
            }
        };
    };
