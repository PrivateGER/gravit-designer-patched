module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i(e, t) {
            ((this.type = e), (this.storageItem = t));
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.Type = {
                VersionUpdate: 2,
                ShareCreated: 3,
                FileUpdated: 4,
                FileCheckIn: 5,
            }),
            (i.prototype.storageItem = null),
            (i.prototype.type = null),
            (i.FileStatusUpdate = function (e, t, n) {
                ((this.storageItem = e), (this.oldStatus = t), (this.newStatus = n));
            }),
            GObject.GObject.inherit(i.FileStatusUpdate, GObject.GEvent),
            (module.exports = i));
    };
