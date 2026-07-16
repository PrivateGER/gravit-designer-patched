module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i(e) {
            this.item = e;
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.item = null),
            (i.prototype.toString = function () {
                return "[Object GMenuActivateEvent]";
            }),
            (i.EVENT = new i()),
            (module.exports = i));
    };
