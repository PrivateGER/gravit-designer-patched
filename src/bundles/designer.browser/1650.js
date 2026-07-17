module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(31 /* GAction */)),
            s = _interopRequireDefault(require(18 /* GCategory */)),
            SidebarsIds = require(198);
        class c extends r.default {
            getId() {
                return c.ID;
            }
            getTitle() {
                return c.TITLE;
            }
            getCategory() {
                return s.default.CATEGORY_VIEW;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.F6];
            }
            isVisible() {
                return false;
            }
            execute() {
                const e = gDesigner.getLeftSidebars(),
                    t = e && e.getSidebar(SidebarsIds.SidebarsIds.GOutlineSidebar);
                t && t.toggleMultiPageMode();
            }
            toString() {
                return "[Object GToggleMultiPageModeAction]";
            }
        }
        ((c.ID = "view.toggle-multi-page-mode"), (c.TITLE = new GObject.GLocaleKey("GToggleMultiPageModeAction", "title")), (module.exports = c));
    };
