module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i(e, t, n, o) {
            ((this.key = e), (this.previousValue = t), (this.newValue = n), (this.restoring = o));
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.prototype.key = null),
            (i.prototype.previousValue = null),
            (i.prototype.newValue = null),
            (i.prototype.restoring = false),
            (i.prototype.toString = function () {
                return "[Object GSettingChangedEvent]";
            }),
            (module.exports = i));
    };
