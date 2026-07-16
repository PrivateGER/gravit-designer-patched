module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const { gApi } = require(10 /* designerConfig */),
            i = require(536);
        class a {
            static async checkMaintenance() {
                try {
                    const e = await this._cache.get().catch(() => null);
                    return !!e && e.isMaintenanceEnabled();
                } catch (e) {
                    console.log("Maintenance status", e);
                }
                return false;
            }
        }
        ((a._cache = new i(() => gApi.maintenance.getStatus(), 6e4)), (module.exports = a));
    };
