module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(18 /* GCategory */)),
            s = _interopRequireDefault(require(1281 /* GMainAction */)),
            SidebarsIds = require(198);
        class c extends s.default {
            getId() {
                return c.ID;
            }
            getTitle() {
                return c.TITLE;
            }
            getCategory() {
                return r.default.CATEGORY_MODIFY;
            }
            isVisible() {
                return false;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.A];
            }
            isEnabled() {
                return gDesigner.getRightSidebars().getActiveSidebar() === SidebarsIds.SidebarsIds.GInspectorSidebar;
            }
            toString() {
                return "[Object GChangeAnchorPointsJointTypeMainAction]";
            }
        }
        ((c.ID = "modify.change-anchor-points-joint-type"),
            (c.TITLE = new GObject.GLocaleKey("GChangeAnchorPointsJointTypeMainAction", "title")),
            (module.exports = c));
    };
