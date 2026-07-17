module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        const GCategory = require(18),
            GAction = require(31),
            GQuickHelpScreen = require(1589);
        function s() {}
        (GObject.GObject.inherit(s, GAction),
            (s.ID = "help.open-quick-help"),
            (s.TITLE = new GObject.GLocaleKey("GOpenQuickHelpScreenAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP;
            }),
            (s.prototype.getGroup = function () {
                return "help";
            }),
            (s.prototype.isEnabled = function () {
                return true;
            }),
            (s.prototype.isVisible = function () {
                return gDesigner.isTouchEnabled();
            }),
            (s.prototype.execute = function () {
                GQuickHelpScreen.open();
            }),
            (s.prototype.toString = function () {
                return "[Object GOpenQuickHelpScreenAction]";
            }),
            (module.exports = s));
    };
