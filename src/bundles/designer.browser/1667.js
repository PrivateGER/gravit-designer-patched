module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i(e, t) {
            ((this._builder = e), (this._onClose = t));
        }
        (GObject.GObject.inherit(i, GObject.GEventTarget),
            (i.prototype.build = function () {
                return this._builder();
            }),
            (i.prototype.close = function () {
                (this.hasEventListeners(i.Event) && this.trigger(new i.Event(i.Event.Type.Close)), this._onClose && this._onClose());
            }),
            (i.Event = function (e) {
                this.type = e;
            }),
            GObject.GObject.inherit(i.Event, GObject.GEvent),
            (i.Event.Type = { Close: 0 }),
            (module.exports = i));
    };
