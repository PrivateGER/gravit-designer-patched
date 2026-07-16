module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const o = require(1574),
            i = require(1576);
        require(1186);
        module.exports = class {
            static async newBuilder(e) {
                return (await gDesigner.isOfflineAsync()) ? new i(e) : new o();
            }
        };
    };
