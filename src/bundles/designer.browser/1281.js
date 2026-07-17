module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(71 /* polyfill:String */), require(4), require(41), require(13), require(38));
        var GPlatform = require(15),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GSubAction = _interopRequireDefault(require(1168));
        class GMainAction extends GAction.default {
            constructor(options) {
                (super(), (this.Type = options.Type));
                const subActionTypes = Object.values(this.Type);
                ((this._subActionIds = subActionTypes.map((type) => GSubAction.default.getSubActionId(this.getId(), type))),
                    (this._timeoutId = null),
                    (this._shortcutSubKeyHandlerBind = this._shortcutSubKeyHandler.bind(this)));
            }
            executeFromShortcut() {
                this._setShortcutSubKeyListener();
            }
            execute() {}
            getSubActions() {
                return this._subActionIds ? this._subActionIds.map((subActionId) => gDesigner.getAction(subActionId)) : null;
            }
            getShortcutSubKeys() {
                const subActions = this.getSubActions();
                return subActions ? subActions.map((e) => e.getShortcutSubKey()).filter((e) => e) : null;
            }
            getShortcutHint(options) {
                return null;
            }
            _setShortcutSubKeyListener() {
                (this._resetShortcutSubKeyListener(),
                    document.addEventListener("keydown", this._shortcutSubKeyHandlerBind, true),
                    (this._timeoutId = setTimeout(() => {
                        (this._resetShortcutSubKeyListener(), this.execute());
                    }, GAction.default.SHORTCUT_DELAY)));
            }
            _executeFromShortcutSubKey(shortcutSubKey) {
                const subActions = this.getSubActions();
                if (!subActions) return;
                const subAction = subActions.find((action) => action.getShortcutSubKey() === shortcutSubKey);
                subAction && subAction.execute();
            }
            _shortcutSubKeyHandler(event) {
                const key = GPlatform.GKey.translateCode(event.code),
                    shortcutSubKeys = this.getShortcutSubKeys();
                (this._resetShortcutSubKeyListener(),
                    key && shortcutSubKeys && shortcutSubKeys.includes(key) && (event.preventDefault(), event.stopPropagation(), this._executeFromShortcutSubKey(key)));
            }
            _resetShortcutSubKeyListener() {
                this._timeoutId &&
                    (document.removeEventListener("keydown", this._shortcutSubKeyHandlerBind, true),
                    clearTimeout(this._timeoutId),
                    (this._timeoutId = null));
            }
            toString() {
                return "[Object GMainAction]";
            }
        }
        module.exports = GMainAction;
    };
