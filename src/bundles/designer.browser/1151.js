module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i(e) {
            this.scope = e;
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.prototype.scope = null),
            (i.prototype.toString = function () {
                return "[Object GSwatchesChangedEvent]";
            }),
            (module.exports = i));
    };
