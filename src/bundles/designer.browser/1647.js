module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(20), require(34), require(4), require(32), require(33));
        var GObject = require(1),
            a = require(53),
            GPlatform = require(15),
            s = o(require(31)),
            l = o(require(18 /* GCategory */));
        class c extends s.default {
            constructor() {
                (super(), (this._opacityLevel = null), (this._timeoutId = null), (this._currentValue = ""));
            }
            getId() {
                return c.ID;
            }
            getTitle() {
                return c.TITLE;
            }
            getFullTitle() {
                return GObject.GLocale.getValue("GChangeOpacityAction", "full-title").replace(
                    "%value",
                    "100% (10%, 20%, 25%, 26%, 30%, 40%, ... 90%)"
                );
            }
            getCategory() {
                return l.default.CATEGORY_EDIT;
            }
            isVisible() {
                return false;
            }
            getAdditionalShortcuts() {
                return [
                    GPlatform.GKey.Constant.Digit0,
                    GPlatform.GKey.Constant.Digit1,
                    GPlatform.GKey.Constant.Digit2,
                    GPlatform.GKey.Constant.Digit3,
                    GPlatform.GKey.Constant.Digit4,
                    GPlatform.GKey.Constant.Digit5,
                    GPlatform.GKey.Constant.Digit6,
                    GPlatform.GKey.Constant.Digit7,
                    GPlatform.GKey.Constant.Digit8,
                    GPlatform.GKey.Constant.Digit9,
                ].map((e) => [GPlatform.GKey.Constant.SHIFT, e]);
            }
            execute() {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getEditor(),
                    n = e && e.getScene(),
                    o = t && t.getSelection();
                n &&
                    o &&
                    (a.GEditor.tryRunTransaction(
                        n,
                        () => {
                            o.forEach((e) => {
                                e.hasMixin(GObject.GStylable) && e.setProperty("_stop", this._opacityLevel);
                            });
                        },
                        GObject.GLocale.get(c.TITLE)
                    ),
                    this._setOpacityLevel());
            }
            executeFromShortcut(e) {
                const t = GPlatform.GKey.translateCode(e.code),
                    n = this._currentValue;
                (this._setCurrentValue(t),
                    n
                        ? this._processDefinedCurrentValue()
                        : (this._timeoutId = setTimeout(() => {
                              this._processDefinedCurrentValue();
                          }, s.default.SHORTCUT_DELAY)));
            }
            isKeyBoardEventRequiredToExecute() {
                return true;
            }
            getShortcutHint(e) {
                const t = [GPlatform.GKey.Constant.SHIFT, "0 (1, 2, 25, 26, 3, 4, ... 9)"];
                return s.default.getActionShortcutHint(t, e);
            }
            _processDefinedCurrentValue() {
                (this._clearTimeout(),
                    this._currentValue.length > 1 &&
                        "0" === this._currentValue[0] &&
                        (this._currentValue = this._currentValue.replace("0", ".")));
                const e = GObject.GUtil.parseNumber(this._currentValue);
                if ("number" == typeof e && !isNaN(e)) {
                    const t = this._getOpacityLevel(e);
                    (this._setOpacityLevel(t), this.execute.apply(this));
                }
                this._setCurrentValue();
            }
            _getOpacityLevel(e) {
                return 0 === e ? 1 : e < 10 ? e / 10 : e < 100 ? e / 100 : 1;
            }
            _setCurrentValue(e) {
                e ? (this._currentValue += e) : (this._currentValue = "");
            }
            _setOpacityLevel() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this._opacityLevel = e;
            }
            _clearTimeout() {
                this._timeoutId && clearTimeout(this._timeoutId);
            }
            toString() {
                return "[Object GChangeOpacityAction]";
            }
        }
        ((c.ID = "edit.change-opacity"), (c.TITLE = new GObject.GLocaleKey("GChangeOpacityAction", "title")), (module.exports = c));
    };
