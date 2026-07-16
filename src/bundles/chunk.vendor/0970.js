module.exports = function (module, exports, require) {
            "use strict";
            const { MaintenanceStatus: n } = require(971);
            module.exports = function (e) {
                e.maintenance = {
                    getStatus: () => e.GET("/maintenance/status").then((e) => new n(e)),
                };
            };
        };
