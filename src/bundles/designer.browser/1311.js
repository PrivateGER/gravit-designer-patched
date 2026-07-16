module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = require(53),
            GCategory = require(18),
            r = (require(31), require(106));
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "modify.cancel-crop"),
            (s.TITLE = new GObject.GLocaleKey("GCancelCropAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getIcon = function () {
                return null;
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
                if (!r.prototype.isEnabled.call(this)) return false;
                var n = gDesigner.getActiveDocument();
                if (n) {
                    var a = n.getEditor().getIndividualSelection(),
                        l = a && a.length ? a[0] : null;
                    l &&
                        l instanceof GObject.GImage &&
                        !GObject.GTransform.equals(l.getTransform(), l.getImageTransform()) &&
                        i.GEditor.tryRunTransaction(
                            l,
                            function () {
                                var e = l.getImageTransform();
                                l.setProperties(["trf", "ut", "tl_sx"], [e, true, 0]);
                            }.bind(this),
                            GObject.GLocale.get(s.TITLE)
                        );
                }
                var c = gDesigner.getToolManager();
                c.getActiveTool() instanceof i.GSubSelectTool
                    ? (c.activateTool(i.GPointerTool, null, true), c.getActiveTool().setEditMode(i.GSelectTool.EditMode.Select))
                    : c.getActiveTool() instanceof i.GPointerTool && c.getActiveTool().setEditMode(i.GSelectTool.EditMode.Select);
            }),
            (s.prototype.toString = function () {
                return "[Object GCancelCropAction]";
            }),
            (module.exports = s));
    };
