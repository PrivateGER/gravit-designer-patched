module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(31 /* GAction */)),
            s = _interopRequireDefault(require(18 /* GCategory */));
        class GChangeActiveWindowAction extends r.default {
            constructor(type) {
                (super(), (this._type = type), (this._title = new GObject.GLocaleKey("GChangeActiveWindowAction", "title.".concat(this._type))));
            }
            getId() {
                return "".concat(GChangeActiveWindowAction.ID, ".").concat(this._type);
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
                const modifiers = [GPlatform.GKey.Constant.OPTION];
                switch (this._type) {
                    case GChangeActiveWindowAction.Type.Next:
                        return modifiers.concat(GPlatform.GKey.Constant.PERIOD);
                    case GChangeActiveWindowAction.Type.Previous:
                        return modifiers.concat(GPlatform.GKey.Constant.COMMA);
                    default:
                        return null;
                }
            }
            isEnabled() {
                const windowManager = gDesigner.getWindows(),
                    windows = windowManager && windowManager.getWindows();
                return windows && windows.length > 1;
            }
            execute() {
                if (this.isEnabled()) {
                    const windowManager = gDesigner.getWindows(),
                        nextWindow = this._getNextWindowAccordingToType(windowManager);
                    windowManager.activateWindow(nextWindow);
                }
            }
            _getNextWindowAccordingToType(windowManager) {
                const windows = windowManager.getWindows(),
                    activeWindow = windowManager && windowManager.getActiveWindow(),
                    activeIndex = windows.findIndex((window) => window === activeWindow);
                switch (this._type) {
                    case GChangeActiveWindowAction.Type.Next:
                        return activeIndex === windows.length - 1 ? windows[0] : windows[activeIndex + 1];
                    case GChangeActiveWindowAction.Type.Previous:
                        return 0 === activeIndex ? windows[windows.length - 1] : windows[activeIndex - 1];
                    default:
                        return null;
                }
            }
            toString() {
                return "[Object GChangeActiveWindowAction]";
            }
        }
        ((GChangeActiveWindowAction.ID = "view.change-active-window"), (GChangeActiveWindowAction.Type = { Next: "next", Previous: "previous" }), (module.exports = GChangeActiveWindowAction));
    };
