module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(3), require(38));
        var GObject = require(1),
            a = _interopRequireDefault(require(609 /* GSelectByAction */));
        function r() {
            a.default.call(this, r.ID, r.TITLE);
        }
        (GObject.GObject.inherit(r, a.default),
            (r.ID = "edit.select-by-border-width"),
            (r.TITLE = new GObject.GLocaleKey("GSelectByBorderWidthAction", "title")),
            (r.prototype.getGroup = function () {
                return "edit/select-by-style";
            }),
            (r.prototype._getValue = function (e) {
                if (e.hasMixin(GObject.GStylable)) {
                    const t = e.getPaintLayers(),
                        n = t && t.getBorderLayers(true);
                    if (n && n.length > 0) return n.map((e) => e.getProperty("_bw"));
                }
                return a.default.EmptyValue;
            }),
            (r.prototype.toString = function () {
                return "[Object GSelectByBorderWidthAction]";
            }),
            (module.exports = r));
    };
