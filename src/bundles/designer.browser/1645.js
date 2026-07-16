module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(4), require(41), require(13));
        var GPlatform = require(15),
            GObject = require(1),
            r = _interopRequireDefault(require(18 /* GCategory */)),
            SidebarsIds = require(198);
        const l = require(31);
        class c extends l {
            constructor(e) {
                (super(),
                    (this._type = e),
                    (this._title = new GObject.GLocaleKey("GEyeDropperAction", "title.".concat(e))),
                    (this.pageX = 0),
                    (this.pageY = 0));
            }
            getId() {
                return "".concat(c.ID, ".").concat(this._type);
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return r.default.CATEGORY_EDIT;
            }
            getShortcut() {
                switch (this._type) {
                    case c.Type.Fill:
                        return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "C"];
                    case c.Type.Border:
                        return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "C"];
                    default:
                        return null;
                }
            }
            getAdditionalShortcuts() {
                switch (this._type) {
                    case c.Type.Fill:
                        return [["I"]];
                    default:
                        return null;
                }
            }
            isVisible() {
                return false;
            }
            execute() {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getEditor(),
                    n = t && t.getSelection(),
                    o = gDesigner.getRightSidebars().getSidebar(SidebarsIds.SidebarsIds.GInspectorSidebar),
                    i = n && n.filter((e) => e && e.hasMixin(GObject.GStylable));
                if (!(i && i.length > 0)) return;
                const { pageX, pageY } = this._getLastCursorPoint();
                switch (this._type) {
                    case c.Type.Fill:
                        i.find((e) => e.hasStyleFill() && !(e instanceof GObject.GText))
                            ? o.openFillEyeDropper(pageX, pageY)
                            : i.find((e) => e instanceof GObject.GText)
                              ? o.openTextColorEyeDropper(pageX, pageY)
                              : i.find((e) => !e.hasStyleBorder()) || o.openBorderEyeDropper(pageX, pageY);
                        break;
                    case c.Type.Border:
                        i.find((e) => !e.hasStyleBorder()) || o.openBorderEyeDropper(pageX, pageY);
                }
            }
            _getLastCursorPoint() {
                const e = gDesigner.getCursorManager().getLastCursorPoint();
                return { pageX: (e && e.getX()) || 0, pageY: (e && e.getY()) || 0 };
            }
            toString() {
                return "[Object GEyeDropperAction]";
            }
        }
        ((c.ID = "edit.eyedropper"), (c.Type = { Border: "border", Fill: "fill", Text: "text" }), (module.exports = c));
    };
