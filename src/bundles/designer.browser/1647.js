module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(20 /* polyfill:RegExp */), require(34), require(4), require(32), require(33));
        var GObject = require(1),
            GEditor = require(53),
            GPlatform = require(15),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GCategory = _interopRequireDefault(require(18 /* GCategory */));
        class GChangeOpacityAction extends GAction.default {
            constructor() {
                (super(), (this._opacityLevel = null), (this._timeoutId = null), (this._currentValue = ""));
            }
            getId() {
                return GChangeOpacityAction.ID;
            }
            getTitle() {
                return GChangeOpacityAction.TITLE;
            }
            getFullTitle() {
                return GObject.GLocale.getValue("GChangeOpacityAction", "full-title").replace(
                    "%value",
                    "100% (10%, 20%, 25%, 26%, 30%, 40%, ... 90%)"
                );
            }
            getCategory() {
                return GCategory.default.CATEGORY_EDIT;
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
                ].map((digitKey) => [GPlatform.GKey.Constant.SHIFT, digitKey]);
            }
            execute() {
                const document = gDesigner.getActiveDocument(),
                    editor = document && document.getEditor(),
                    scene = document && document.getScene(),
                    selection = editor && editor.getSelection();
                scene &&
                    selection &&
                    (GEditor.GEditor.tryRunTransaction(
                        scene,
                        () => {
                            selection.forEach((element) => {
                                element.hasMixin(GObject.GStylable) && element.setProperty("_stop", this._opacityLevel);
                            });
                        },
                        GObject.GLocale.get(GChangeOpacityAction.TITLE)
                    ),
                    this._setOpacityLevel());
            }
            executeFromShortcut(keyboardEvent) {
                const digit = GPlatform.GKey.translateCode(keyboardEvent.code),
                    previousValue = this._currentValue;
                (this._setCurrentValue(digit),
                    previousValue
                        ? this._processDefinedCurrentValue()
                        : (this._timeoutId = setTimeout(() => {
                              this._processDefinedCurrentValue();
                          }, GAction.default.SHORTCUT_DELAY)));
            }
            isKeyBoardEventRequiredToExecute() {
                return true;
            }
            getShortcutHint(keyboardEvent) {
                const shortcutKeys = [GPlatform.GKey.Constant.SHIFT, "0 (1, 2, 25, 26, 3, 4, ... 9)"];
                return GAction.default.getActionShortcutHint(shortcutKeys, keyboardEvent);
            }
            _processDefinedCurrentValue() {
                (this._clearTimeout(),
                    this._currentValue.length > 1 &&
                        "0" === this._currentValue[0] &&
                        (this._currentValue = this._currentValue.replace("0", ".")));
                const numericValue = GObject.GUtil.parseNumber(this._currentValue);
                if ("number" == typeof numericValue && !isNaN(numericValue)) {
                    const opacityLevel = this._getOpacityLevel(numericValue);
                    (this._setOpacityLevel(opacityLevel), this.execute.apply(this));
                }
                this._setCurrentValue();
            }
            _getOpacityLevel(value) {
                return 0 === value ? 1 : value < 10 ? value / 10 : value < 100 ? value / 100 : 1;
            }
            _setCurrentValue(digit) {
                digit ? (this._currentValue += digit) : (this._currentValue = "");
            }
            _setOpacityLevel() {
                let level = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this._opacityLevel = level;
            }
            _clearTimeout() {
                this._timeoutId && clearTimeout(this._timeoutId);
            }
            toString() {
                return "[Object GChangeOpacityAction]";
            }
        }
        ((GChangeOpacityAction.ID = "edit.change-opacity"), (GChangeOpacityAction.TITLE = new GObject.GLocaleKey("GChangeOpacityAction", "title")), (module.exports = GChangeOpacityAction));
    };
