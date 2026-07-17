module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            a = _interopRequireDefault(require(609 /* GSelectByAction */));
        function r() {
            a.default.call(this, r.ID, r.TITLE);
        }
        (GObject.GObject.inherit(r, a.default),
            (r.ID = "edit.select-by-effect"),
            (r.TITLE = new GObject.GLocaleKey("GSelectByEffectAction", "title")),
            (r.prototype.getGroup = function () {
                return "edit/select-by-style";
            }),
            (r.prototype._getValue = function (e) {
                if (!e.hasMixin(GObject.GStylable)) return a.default.EmptyValue;
                const t = e.getEffects();
                return t ? t.getChildren() : [];
            }),
            (r.prototype.toString = function () {
                return "[Object GSelectByEffectAction]";
            }),
            (module.exports = r));
    };
