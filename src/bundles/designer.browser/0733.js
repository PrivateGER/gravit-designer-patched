module.exports = function (module, exports, require) {
        "use strict";
        const { GObject, GEventTarget, GEvent } = require(1 /* GObject */);
        function r() {}
        (GObject.inheritAndMix(r, GObject, [GEventTarget]),
            (r.prototype._role = null),
            (r.prototype.setRole = function (e) {
                ((this._role = e), this.hasEventListeners(r.RoleChangedEvent) && this.trigger(new r.RoleChangedEvent(e, this)));
            }),
            (r.prototype.getRole = function () {
                return this._role;
            }),
            (r.RoleChangedEvent = function (e, t) {
                ((this.role = e), (this.target = t));
            }),
            GObject.inherit(r.RoleChangedEvent, GEvent),
            (module.exports = r));
    };
