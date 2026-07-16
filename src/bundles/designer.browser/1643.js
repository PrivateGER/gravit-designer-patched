module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        const { GObject: o, GLocaleKey: i } = require(1 /* GObject */),
            a = require(31),
            GCategory = require(18),
            s = require(1644);
        function l() {}
        (o.inherit(l, a),
            (l.ID = "help.shortcuts"),
            (l.TITLE = new i("GShowShortcutsAction", "title")),
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
