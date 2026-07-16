module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(4), require(13));
        var GObject = require(1),
            GPlatform = require(15),
            r = require(53),
            s = o(require(18 /* GCategory */)),
            l = o(require(31));
        class c extends l.default {
            constructor() {
                (super(), (this._lastIsCheckedValue = true));
            }
            getId() {
                return c.ID;
            }
            getTitle() {
                return c.TITLE;
            }
            getCategory() {
                return s.default.CATEGORY_VIEW_CANVAS;
            }
            isCheckable() {
                return true;
            }
            isEnabled() {
                return !!this._getSelection();
            }
            isChecked() {
                const e = this._getSelection();
                if (!e) return this._lastIsCheckedValue;
                const t = !!e.find((e) => !r.GElementEditor.getEditor(e).hasFlag(r.GBaseEditor.Flag.HideEditor));
                return ((this._lastIsCheckedValue = t), t);
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "X"];
            }
            execute() {
                const e = this._getEditor();
                if (e) {
                    this.isChecked() ? e.hideSelection() : e.resetHideSelection();
                }
            }
            _getEditor() {
                const e = gDesigner.getActiveDocument();
                return e && e.getEditor();
            }
            _getSelection() {
                const e = this._getEditor(),
                    t = e && e.getSelection();
                return t && t.length > 0 ? t : null;
            }
            toString() {
                return "[Object GShowSelectionHandlesAction]";
            }
        }
        ((c.ID = "view.canvas.show-selection-handles"),
            (c.TITLE = new GObject.GLocaleKey("GShowSelectionHandlesAction", "title")),
            (module.exports = c));
    };
