module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(31 /* GAction */)),
            s = _interopRequireDefault(require(18 /* GCategory */));
        class l extends r.default {
            getId() {
                return l.ID;
            }
            getTitle() {
                return l.TITLE;
            }
            getCategory() {
                return s.default.CATEGORY_FILE;
            }
            isVisible() {
                return false;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.Q];
            }
            isEnabled() {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getActiveWindow(),
                    n = gDesigner.getWindows();
                return !(!t || !n);
            }
            execute() {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getActiveWindow();
                gDesigner.getWindows().removeWindow(t);
            }
            toString() {
                return "[Object GCloseActiveWindowAction]";
            }
        }
        ((l.ID = "file.close-active-window"), (l.TITLE = new GObject.GLocaleKey("GCloseActiveWindowAction", "title")), (module.exports = l));
    };
