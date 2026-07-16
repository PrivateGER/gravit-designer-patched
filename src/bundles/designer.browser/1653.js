module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(31)),
            s = _interopRequireDefault(require(18 /* GCategory */)),
            SidebarsIds = require(198),
            c = _interopRequireDefault(require(1170));
        class d extends r.default {
            getId() {
                return d.ID;
            }
            getTitle() {
                return d.TITLE;
            }
            getCategory() {
                return s.default.CATEGORY_MODIFY;
            }
            isVisible() {
                return false;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.M];
            }
            isEnabled() {
                return gDesigner.getApplicationManager().isEditingEnabled();
            }
            execute() {
                this._showOutlineSidebar();
                const e = gDesigner.getLeftSidebars();
                (e && e.getSidebar(SidebarsIds.SidebarsIds.GOutlineSidebar)).insertLayer();
            }
            _showOutlineSidebar() {
                const e = gDesigner.getAction("".concat(c.default.ID, ".").concat(SidebarsIds.SidebarsIds.GOutlineSidebar));
                e.isChecked() || e.execute();
            }
            toString() {
                return "[Object GCreateNewLayerAction]";
            }
        }
        ((d.ID = "modify.create-new-layer"), (d.TITLE = new GObject.GLocaleKey("GCreateNewLayerAction", "title")), (module.exports = d));
    };
