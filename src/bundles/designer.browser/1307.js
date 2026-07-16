module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            a = _interopRequireDefault(require(609));
        function r() {
            a.default.call(this, r.ID, r.TITLE);
        }
        (GObject.GObject.inherit(r, a.default),
            (r.ID = "edit.select-by-blend-mode"),
            (r.TITLE = new GObject.GLocaleKey("GSelectByBlendModeAction", "title")),
            (r.prototype.getGroup = function () {
                return "edit/select-by-style";
            }),
            (r.prototype._getValue = function (e) {
                return e.hasMixin(GObject.GNode.Properties) ? e.getProperty("_sbl") : a.default.EmptyValue;
            }),
            (r.prototype.toString = function () {
                return "[Object GSelectByBlendModeAction]";
            }),
            (module.exports = r));
    };
