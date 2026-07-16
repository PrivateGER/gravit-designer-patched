module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i(e) {
            this.status = e;
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.Status = { Init: 0, Ready: 1 }),
            (i.prototype.status = null),
            (i.prototype.toString = function () {
                return "[Object GApplicationStatusEvent]";
            }),
            (module.exports = i));
    };
