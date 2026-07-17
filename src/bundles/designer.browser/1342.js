module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            a = _interopRequireDefault(require(18 /* GCategory */)),
            r = _interopRequireDefault(require(31 /* GAction */));
        const s = "designer.settings.enhanced-tooltips.enabled";
        let l = true;
        function c() {
            gContainer.getProperty(s).then((e) => {
                "boolean" == typeof e && (l = e);
            });
        }
        (GObject.GObject.inherit(c, r.default),
            (c.ID = "help.tooltip-visibility"),
            (c.TITLE = new GObject.GLocaleKey("GEnhancedTooltipsAction", "title")),
            (c.GroupID = "help/learn"),
            (c.StoragePropertyName = s),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return GObject.GLocale.get(c.TITLE);
            }),
            (c.prototype.getCategory = function () {
                return a.default.CATEGORY_HELP_LEARN;
            }),
            (c.prototype.getGroup = function () {
                return c.GroupID;
            }),
            (c.prototype.isCheckable = function () {
                return true;
            }),
            (c.prototype.isChecked = function () {
                return l;
            }),
            (c.prototype.isEnabled = function () {
                return true;
            }),
            (c.prototype.execute = function () {
                ((l = !l), gContainer.setProperty(s, l));
            }),
            (c.prototype.statsValue = function () {
                return "".concat(c.ID, ".").concat(l ? "on" : "off");
            }),
            (c.prototype.toString = function () {
                return "[Object GEnhancedTooltipsAction]";
            }),
            (module.exports = c));
    };
