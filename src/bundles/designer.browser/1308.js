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
            (r.ID = "edit.select-by-shape"),
            (r.TITLE = new GObject.GLocaleKey("GSelectByShapeAction", "title")),
            (r.prototype.getGroup = function () {
                return "edit/select-by-style";
            }),
            (r.prototype._getValue = function (e) {
                return e.getNodeName();
            }),
            (r.prototype.toString = function () {
                return "[Object GSelectByShapeAction]";
            }),
            (module.exports = r));
    };
