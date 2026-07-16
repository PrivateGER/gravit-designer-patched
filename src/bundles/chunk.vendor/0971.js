module.exports = function (module, exports, require) {
            "use strict";
            module.exports = {
                MaintenanceStatus: class {
                    constructor(e) {
                        this._dto = e;
                    }
                    isCloudMaintenanceEnabled() {
                        return !!this._dto.cloud;
                    }
                    isClientAllowed() {
                        return !!this._dto.clientAllowed;
                    }
                    isMaintenanceEnabled() {
                        return !!this.isCloudMaintenanceEnabled() && !this.isClientAllowed();
                    }
                },
            };
        };
