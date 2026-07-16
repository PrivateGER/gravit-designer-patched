module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "edit.deselect-all"),
            (s.TITLE = new GObject.GLocaleKey("GDeselectAllAction", "title")),
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
                return "select";
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "A"];
            }),
            (s.prototype.isEnabled = function () {
                if (document.activeElement && $(document.activeElement).is(":editable")) return true;
                if (gDesigner.getActiveDocument()) {
                    var e = gDesigner.getActiveDocument().getEditor().getSelection();
                    if (e && e.length) return true;
                }
                return false;
            }),
            (s.prototype.execute = function () {
                document.activeElement &&
                $(document.activeElement).is(":editable") &&
                !$(document.activeElement).is("button") &&
                !gDesigner.isGravitIME(document.activeElement)
                    ? document.execCommand("selectAll")
                    : gDesigner.getActiveDocument().getEditor().clearSelection();
            }),
            (s.prototype.toString = function () {
                return "[Object GDeselectAllAction]";
            }),
            (module.exports = s));
    };
