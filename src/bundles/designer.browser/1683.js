module.exports = function (module, exports, require) {
        "use strict";
        const o = require(1190);
        module.exports = class extends o {
            canMakePayments() {
                return false;
            }
        };
    };
