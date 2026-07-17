module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        const GCategory = require(18),
            GAction = require(31),
            GTranslationToolDialog = require(1640),
            { IS_TRUNK, IS_LOCALHOST } = require(231 /* IS_TRUNK */);
        function c() {}
        (GObject.GObject.inherit(c, GAction),
            (c.ID = "help.translationtool"),
            (c.TITLE = new GObject.GLocaleKey("GTranslationToolAction", "title")),
            (c.prototype._translationTool = null),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return GObject.GLocale.get(c.TITLE) + " [DEVELOPMENT]";
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP;
            }),
            (c.prototype.getGroup = function () {
                return "help";
            }),
            (c.prototype.isEnabled = function () {
                return true;
            }),
            (c.prototype.isVisible = function () {
                return !(!IS_TRUNK && !IS_LOCALHOST);
            }),
            (c.prototype.execute = function () {
                (this._translationTool || (this._translationTool = new GTranslationToolDialog()), this._translationTool.init());
            }),
            (c.prototype.toString = function () {
                return "[Object GTranslationToolAction]";
            }),
            (module.exports = c));
    };
