module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GPlatform = require(15),
            GObject = require(1),
            r = _interopRequireDefault(require(18 /* GCategory */)),
            SidebarsIds = require(198);
        const l = require(31);
        class c extends l {
            getId() {
                return c.ID;
            }
            getTitle() {
                return c.TITLE;
            }
            getCategory() {
                return r.default.CATEGORY_EDIT;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.OPTION, "R"];
            }
            isVisible() {
                return false;
            }
            execute() {
                const e = gDesigner.getLeftSidebars().getActiveSidebar(),
                    t = gDesigner.getLeftSidebars().getSidebar(SidebarsIds.SidebarsIds.GOutlineSidebar),
                    n = t.getLayerPanel(),
                    { currentFocus } = n.data("glayerpanel");
                if (currentFocus && e === t.getId()) {
                    const e = n.gLayerPanel("getTitleOfLayer", $(currentFocus.row));
                    e.gAutoEdit("open", e.data("gautoedit"));
                }
            }
            toString() {
                return "[Object GRenameLayerAction]";
            }
        }
        ((c.ID = "edit.rename-layer"), (c.TITLE = new GObject.GLocaleKey("GRenameLayerAction", "title")), (module.exports = c));
    };
