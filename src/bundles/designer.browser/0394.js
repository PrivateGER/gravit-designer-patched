module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i() {}
        (GObject.GObject.inherit(i, GObject.GEventTarget),
            (i.UpdateEvent = function () {}),
            GObject.GObject.inherit(i.UpdateEvent, GObject.GEvent),
            (i.UpdateEvent.prototype.toString = function () {
                return "[Object GView.UpdateEvent]";
            }),
            (i.UPDATE_EVENT = new i.UpdateEvent()),
            (i.prototype.getId = function () {
                throw new Error("Not Supported");
            }),
            (i.prototype.getTitle = function () {
                throw new Error("Not Supported");
            }),
            (i.prototype.isEnabled = function () {
                return true;
            }),
            (i.prototype.isVisible = function () {
                return true;
            }),
            (i.prototype._fireUpdateEvent = function () {
                this.trigger(i.UPDATE_EVENT);
            }),
            (i.prototype.toString = function () {
                return "[Object GView]";
            }),
            (module.exports = i));
    };
