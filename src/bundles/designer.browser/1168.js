module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(20 /* polyfill:RegExp */), require(34));
        var GObject = require(1),
            a = _interopRequireDefault(require(31 /* GAction */));
        class r extends a.default {
            static getSubActionId(e, t) {
                return "".concat(e, ".").concat(t);
            }
            constructor(e) {
                (super(), (this._type = e), (this._title = null));
            }
            getId() {
                return r.getSubActionId(this._getMainActionId(), this._type);
            }
            _getMainActionId() {
                throw new Error("Not implemented.");
            }
            getTitle() {
                return this._title;
            }
            getMainAction() {
                const e = this._getMainActionId();
                return gDesigner.getAction(e);
            }
            isVisible() {
                return false;
            }
            isEnabled() {
                return this.getMainAction().isEnabled();
            }
            getShortcutSubKey() {
                return null;
            }
            getShortcutHint(e) {
                const t = this.getMainAction().getShortcut(),
                    n = this.getShortcutSubKey(),
                    o = a.default.getActionShortcutHint(t, e);
                return o && n
                    ? GObject.GLocale.getValue("GSubAction", "shortcut-hint-template")
                          .replace("%mainShortcutHint", o)
                          .replace("%shortcutSubKeyHint", n)
                    : null;
            }
            toString() {
                return "[Object GSubAction]";
            }
        }
        ((r.Type = {}), (module.exports = r));
    };
