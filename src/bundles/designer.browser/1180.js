module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GEditorModule = require(53),
            GObject = require(1),
            GCategory = require(18),
            GAction = require(106);
        function GSelectByFontTypeAction() {}
        (GObject.GObject.inherit(GSelectByFontTypeAction, GAction),
            (GSelectByFontTypeAction.ID = "edit.selectbyfonttype"),
            (GSelectByFontTypeAction.TITLE = new GObject.GLocaleKey("GSelectByFontTypeAction", "title")),
            (GSelectByFontTypeAction.prototype.getId = function () {
                return GSelectByFontTypeAction.ID;
            }),
            (GSelectByFontTypeAction.prototype.getTitle = function () {
                return GSelectByFontTypeAction.TITLE;
            }),
            (GSelectByFontTypeAction.prototype.getGroup = function () {
                return "edit/select-by-font";
            }),
            (GSelectByFontTypeAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_SELECT_SAME;
            }),
            (GSelectByFontTypeAction.prototype.isEnabled = function () {
                if (!GAction.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument && activeDocument.getEditor() && activeDocument.getEditor().getSelection()) {
                    var fontFamily = this._getFontFamily();
                    return !(!fontFamily || !fontFamily.length);
                }
                return false;
            }),
            (GSelectByFontTypeAction.prototype.execute = function () {
                var activeDocument = gDesigner.getActiveDocument(),
                    fontFamily = this._getFontFamily(),
                    defaultFont = gDesigner.getWorkspace().getFontManager().getDefaultFont(),
                    matchingElements = [];
                (activeDocument.getScene().acceptChildren(function (element) {
                    (element.removeFlag(GObject.GNode.Flag.Selected), element instanceof GObject.GText) &&
                        (element.getProperty("_tff") || (defaultFont && defaultFont.getFamily())) === fontFamily &&
                        matchingElements.push(element);
                }),
                    activeDocument.getEditor().updateSelection(true, matchingElements));
            }),
            (GSelectByFontTypeAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-select-by-font" : "";
            }),
            (GSelectByFontTypeAction.prototype.toString = function () {
                return "[Object GSelectByFontTypeAction]";
            }),
            (GSelectByFontTypeAction.prototype._getFontFamily = function () {
                for (
                    var commonFontFamily,
                        selection = gDesigner.getActiveDocument().getEditor().getSelection(),
                        defaultFont = gDesigner.getWorkspace().getFontManager().getDefaultFont(),
                        a = 0;
                    a < selection.length;
                    a++
                ) {
                    var r = selection[a];
                    if (r instanceof GObject.GText) {
                        var s = (GEditorModule.GElementEditor.getEditor(r) || r).getProperty("_tff");
                        if ((s || (s = defaultFont && defaultFont.getFamily()), commonFontFamily)) {
                            if (commonFontFamily !== s) {
                                commonFontFamily = "";
                                break;
                            }
                        } else commonFontFamily = s;
                    }
                }
                return commonFontFamily;
            }),
            (module.exports = GSelectByFontTypeAction));
    };
