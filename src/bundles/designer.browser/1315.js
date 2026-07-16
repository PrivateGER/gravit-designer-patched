module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "edit.duplicate"),
            (s.TITLE = new GObject.GLocaleKey("GDuplicateAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (s.prototype.getGroup = function () {
                return "ccp";
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "D"];
            }),
            (s.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-duplicate" : null;
            }),
            (s.prototype.getAdditionalShortcuts = function () {
                return [[GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "D"]];
            }),
            (s.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                return e && null != e.getEditor().getSelection();
            }),
            (s.prototype.execute = function () {
                var e = gDesigner.getActiveDocument().getEditor();
                e.beginTransaction();
                try {
                    e.cloneSelection(false, true);
                } finally {
                    e.commitTransaction(GObject.GLocale.get(this.getTitle()));
                }
            }),
            (s.prototype.toString = function () {
                return "[Object GDuplicateAction]";
            }),
            (module.exports = s));
    };
