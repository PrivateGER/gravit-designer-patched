module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(4), require(41), require(13));
        var GPlatform = require(15),
            GObject = require(1),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            SidebarsIds = require(198);
        const GAction = require(31);
        class EyeDropperAction extends GAction {
            constructor(type) {
                (super(),
                    (this._type = type),
                    (this._title = new GObject.GLocaleKey("GEyeDropperAction", "title.".concat(type))),
                    (this.pageX = 0),
                    (this.pageY = 0));
            }
            getId() {
                return "".concat(EyeDropperAction.ID, ".").concat(this._type);
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return GCategory.default.CATEGORY_EDIT;
            }
            getShortcut() {
                switch (this._type) {
                    case EyeDropperAction.Type.Fill:
                        return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "C"];
                    case EyeDropperAction.Type.Border:
                        return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "C"];
                    default:
                        return null;
                }
            }
            getAdditionalShortcuts() {
                switch (this._type) {
                    case EyeDropperAction.Type.Fill:
                        return [["I"]];
                    default:
                        return null;
                }
            }
            isVisible() {
                return false;
            }
            execute() {
                const activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument && activeDocument.getEditor(),
                    selection = editor && editor.getSelection(),
                    inspectorSidebar = gDesigner.getRightSidebars().getSidebar(SidebarsIds.SidebarsIds.GInspectorSidebar),
                    styledElements = selection && selection.filter((element) => element && element.hasMixin(GObject.GStylable));
                if (!(styledElements && styledElements.length > 0)) return;
                const { pageX, pageY } = this._getLastCursorPoint();
                switch (this._type) {
                    case EyeDropperAction.Type.Fill:
                        styledElements.find((element) => element.hasStyleFill() && !(element instanceof GObject.GText))
                            ? inspectorSidebar.openFillEyeDropper(pageX, pageY)
                            : styledElements.find((element) => element instanceof GObject.GText)
                              ? inspectorSidebar.openTextColorEyeDropper(pageX, pageY)
                              : styledElements.find((element) => !element.hasStyleBorder()) || inspectorSidebar.openBorderEyeDropper(pageX, pageY);
                        break;
                    case EyeDropperAction.Type.Border:
                        styledElements.find((element) => !element.hasStyleBorder()) || inspectorSidebar.openBorderEyeDropper(pageX, pageY);
                }
            }
            _getLastCursorPoint() {
                const cursorPoint = gDesigner.getCursorManager().getLastCursorPoint();
                return { pageX: (cursorPoint && cursorPoint.getX()) || 0, pageY: (cursorPoint && cursorPoint.getY()) || 0 };
            }
            toString() {
                return "[Object GEyeDropperAction]";
            }
        }
        ((EyeDropperAction.ID = "edit.eyedropper"), (EyeDropperAction.Type = { Border: "border", Fill: "fill", Text: "text" }), (module.exports = EyeDropperAction));
    };
