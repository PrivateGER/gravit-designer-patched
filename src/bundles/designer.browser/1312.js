module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var editorModule = require(53),
            GObject = require(1),
            GCategory = (require(15 /* GPlatform */), require(18 /* GCategory */)),
            GElementAction = require(106);
        function EditElementAction() {
            this._title = new GObject.GLocaleKey("GEditElementActon", "title");
        }
        (GObject.GObject.inherit(EditElementAction, GElementAction),
            (EditElementAction.ID = "edit.edit"),
            (EditElementAction.prototype._title = null),
            (EditElementAction.prototype.getId = function () {
                return EditElementAction.ID;
            }),
            (EditElementAction.prototype.getTitle = function () {
                return this._title;
            }),
            (EditElementAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (EditElementAction.prototype.getGroup = function () {
                return "select";
            }),
            (EditElementAction.prototype.getShortcut = function () {
                return null;
            }),
            (EditElementAction.prototype.isEnabled = function (selection) {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var enabled = false;
                if (
                    (selection =
                        selection || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null)) &&
                    selection.length > 0 &&
                    !gDesigner.getActiveDocument().getEditor().isInlineEditing()
                )
                    if (gDesigner.getToolManager().getActiveTool() != gDesigner.getToolManager().getTool(editorModule.GSubSelectTool)) enabled = true;
                    else for (var n = 0; n < selection.length; ++n) selection[n] instanceof GObject.GText && (enabled = true);
                return enabled;
            }),
            (EditElementAction.prototype.execute = function (selection) {
                var opened = false;
                if (
                    (selection =
                        selection || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null)) &&
                    selection.length > 0
                ) {
                    for (var n = 0; n < selection.length && !opened; ++n)
                        if (selection[n] instanceof GObject.GText) {
                            var a = selection[n].getGeometryBBox(),
                                r = gDesigner.getWindows().getActiveWindow(),
                                s = r ? r.getView() : null;
                            a &&
                                s &&
                                (opened = gDesigner.getActiveDocument().getEditor().openInlineEditor(selection[n], s, new GObject.GPoint(a.getX(), a.getY())));
                        }
                    opened ||
                        gDesigner.getToolManager().getActiveTool() == gDesigner.getToolManager().getTool(editorModule.GSubSelectTool) ||
                        gDesigner.getToolManager().activateTool(editorModule.GSubSelectTool, null, true);
                }
            }),
            (EditElementAction.prototype.toString = function () {
                return "[Object GEditElementActon]";
            }),
            (module.exports = EditElementAction));
    };
