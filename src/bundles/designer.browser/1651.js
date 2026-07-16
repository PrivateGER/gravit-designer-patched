module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = o(require(31)),
            s = o(require(18 /* GCategory */));
        class l extends r.default {
            constructor(e) {
                (super(), (this._type = e), (this._title = new GObject.GLocaleKey("GChangeActiveWindowAction", "title.".concat(this._type))));
            }
            getId() {
                return "".concat(l.ID, ".").concat(this._type);
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return s.default.CATEGORY_VIEW;
            }
            isVisible() {
                return false;
            }
            getShortcut() {
                const e = [GPlatform.GKey.Constant.OPTION];
                switch (this._type) {
                    case l.Type.Next:
                        return e.concat(GPlatform.GKey.Constant.PERIOD);
                    case l.Type.Previous:
                        return e.concat(GPlatform.GKey.Constant.COMMA);
                    default:
                        return null;
                }
            }
            isEnabled() {
                const e = gDesigner.getWindows(),
                    t = e && e.getWindows();
                return t && t.length > 1;
            }
            execute() {
                if (this.isEnabled()) {
                    const e = gDesigner.getWindows(),
                        t = this._getNextWindowAccordingToType(e);
                    e.activateWindow(t);
                }
            }
            _getNextWindowAccordingToType(e) {
                const t = e.getWindows(),
                    n = e && e.getActiveWindow(),
                    o = t.findIndex((e) => e === n);
                switch (this._type) {
                    case l.Type.Next:
                        return o === t.length - 1 ? t[0] : t[o + 1];
                    case l.Type.Previous:
                        return 0 === o ? t[t.length - 1] : t[o - 1];
                    default:
                        return null;
                }
            }
            toString() {
                return "[Object GChangeActiveWindowAction]";
            }
        }
        ((l.ID = "view.change-active-window"), (l.Type = { Next: "next", Previous: "previous" }), (module.exports = l));
    };
