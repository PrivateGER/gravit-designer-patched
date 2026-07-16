module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = require(53),
            GCategory = require(18),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "modify.crop"),
            (s.TITLE = new GObject.GLocaleKey("GCropAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getIcon = function () {
                return "gravit-icon-crop";
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (s.prototype.getGroup = function () {
                return "structure-group";
            }),
            (s.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor(),
                        n = t.getIndividualSelection();
                    if (n && n.length && n[0] instanceof GObject.GImage && t.hasSelectionDetail()) return n[0].isReady();
                }
                return false;
            }),
            (s.prototype.execute = function (e, t) {
                var n = gDesigner.getToolManager();
                n.getActiveTool() instanceof i.GSubSelectTool
                    ? (n.activateTool(i.GPointerTool, null, true), n.getActiveTool().setEditMode(i.GSelectTool.EditMode.Select))
                    : n.getActiveTool() instanceof i.GPointerTool && n.getActiveTool().setEditMode(i.GSelectTool.EditMode.Select);
            }),
            (s.prototype.toString = function () {
                return "[Object GCropAction]";
            }),
            (module.exports = s));
    };
