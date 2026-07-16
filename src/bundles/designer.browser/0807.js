module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i(e, t) {
            ((this.type = e), (this.sidebar = t));
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.Type = {
                Deactivated: 10,
                Activated: 11,
                ChildAdded: 12,
                ChildRemoved: 14,
            }),
            (i.prototype.type = null),
            (i.prototype.sidebar = null),
            (i.prototype.toString = function () {
                return "[Object GSidebars.SidebarEvent]";
            }),
            (module.exports = i));
    };
