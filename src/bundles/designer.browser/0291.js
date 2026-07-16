module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i(e) {
            this.connected = e;
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.prototype.connected = false),
            (i.prototype.toString = function () {
                return "[Object GNetworkAvailabilityChangedEvent]";
            }),
            (module.exports = i));
    };
