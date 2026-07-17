module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        const { GObject, GLocaleKey } = require(1 /* GObject */),
            GAction = require(31),
            GCategory = require(18),
            s = require(1644);
        function l() {}
        (GObject.inherit(l, GAction),
            (l.ID = "help.shortcuts"),
            (l.TITLE = new GLocaleKey("GShowShortcutsAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP_LEARN;
            }),
            (l.prototype.getGroup = function () {
                return "help/learn";
            }),
            (l.prototype.execute = function () {
                new s().open();
            }),
            (l.prototype.toString = function () {
                return "[Object GShowShortcutsAction]";
            }),
            (module.exports = l));
    };
