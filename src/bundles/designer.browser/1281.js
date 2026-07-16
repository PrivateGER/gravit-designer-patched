module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(58), require(71), require(4), require(41), require(13), require(38));
        var GPlatform = require(15),
            a = o(require(31)),
            r = o(require(1168));
        class s extends a.default {
            constructor(e) {
                (super(), (this.Type = e.Type));
                const t = Object.values(this.Type);
                ((this._subActionIds = t.map((e) => r.default.getSubActionId(this.getId(), e))),
                    (this._timeoutId = null),
                    (this._shortcutSubKeyHandlerBind = this._shortcutSubKeyHandler.bind(this)));
            }
            executeFromShortcut() {
                this._setShortcutSubKeyListener();
            }
            execute() {}
            getSubActions() {
                return this._subActionIds ? this._subActionIds.map((e) => gDesigner.getAction(e)) : null;
            }
            getShortcutSubKeys() {
                const e = this.getSubActions();
                return e ? e.map((e) => e.getShortcutSubKey()).filter((e) => e) : null;
            }
            getShortcutHint(e) {
                return null;
            }
            _setShortcutSubKeyListener() {
                (this._resetShortcutSubKeyListener(),
                    document.addEventListener("keydown", this._shortcutSubKeyHandlerBind, true),
                    (this._timeoutId = setTimeout(() => {
                        (this._resetShortcutSubKeyListener(), this.execute());
                    }, a.default.SHORTCUT_DELAY)));
            }
            _executeFromShortcutSubKey(e) {
                const t = this.getSubActions();
                if (!t) return;
                const n = t.find((t) => t.getShortcutSubKey() === e);
                n && n.execute();
            }
            _shortcutSubKeyHandler(e) {
                const t = GPlatform.GKey.translateCode(e.code),
                    n = this.getShortcutSubKeys();
                (this._resetShortcutSubKeyListener(),
                    t && n && n.includes(t) && (e.preventDefault(), e.stopPropagation(), this._executeFromShortcutSubKey(t)));
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
        module.exports = s;
    };
