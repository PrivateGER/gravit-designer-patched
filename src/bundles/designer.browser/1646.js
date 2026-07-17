module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(4), require(13));
        var GObject = require(1),
            GPlatform = require(15),
            GEditor = require(53),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            GAction = _interopRequireDefault(require(31 /* GAction */));
        class GShowSelectionHandlesAction extends GAction.default {
            constructor() {
                (super(), (this._lastIsCheckedValue = true));
            }
            getId() {
                return GShowSelectionHandlesAction.ID;
            }
            getTitle() {
                return GShowSelectionHandlesAction.TITLE;
            }
            getCategory() {
                return GCategory.default.CATEGORY_VIEW_CANVAS;
            }
            isCheckable() {
                return true;
            }
            isEnabled() {
                return !!this._getSelection();
            }
            isChecked() {
                const selection = this._getSelection();
                if (!selection) return this._lastIsCheckedValue;
                const hasVisibleElement = !!selection.find((element) => !GEditor.GElementEditor.getEditor(element).hasFlag(GEditor.GBaseEditor.Flag.HideEditor));
                return ((this._lastIsCheckedValue = hasVisibleElement), hasVisibleElement);
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "X"];
            }
            execute() {
                const editor = this._getEditor();
                if (editor) {
                    this.isChecked() ? editor.hideSelection() : editor.resetHideSelection();
                }
            }
            _getEditor() {
                const activeDocument = gDesigner.getActiveDocument();
                return activeDocument && activeDocument.getEditor();
            }
            _getSelection() {
                const editor = this._getEditor(),
                    selection = editor && editor.getSelection();
                return selection && selection.length > 0 ? selection : null;
            }
            toString() {
                return "[Object GShowSelectionHandlesAction]";
            }
        }
        ((GShowSelectionHandlesAction.ID = "view.canvas.show-selection-handles"),
            (GShowSelectionHandlesAction.TITLE = new GObject.GLocaleKey("GShowSelectionHandlesAction", "title")),
            (module.exports = GShowSelectionHandlesAction));
    };
