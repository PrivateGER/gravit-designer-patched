module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16),
            GPlatform = require(15),
            GObject = require(1),
            SidebarsIds = require(198),
            s = o(require(18 /* GCategory */)),
            l = o(require(31));
        class c extends l.default {
            getId() {
                return c.ID;
            }
            getTitle() {
                return c.TITLE;
            }
            getCategory() {
                return s.default.CATEGORY_MODIFY;
            }
            getShortcut() {
                return [GPlatform.GKey.Constant.META, "2"];
            }
            isVisible() {
                return false;
            }
            execute() {
                const e = gDesigner.getLeftSidebars().getActiveSidebar(),
                    t = gDesigner.getLeftSidebars().getSidebar(SidebarsIds.SidebarsIds.GOutlineSidebar),
                    n = t.getLayerPanel(),
                    o = n.gLayerPanel("getCurrentFocusedNode");
                if (o && e === t.getId()) {
                    const e = n.gLayerPanel("getItem", o);
                    e.hasFlag(GObject.GNode.Flag.Selected) && n.gLayerPanel("toggleLockStatusOfLayerOrItem", e);
                }
            }
            toString() {
                return "[Object GLockLayerAction]";
            }
        }
        ((c.ID = "modify.lock-layer"), (c.TITLE = new GObject.GLocaleKey("GLockLayerAction", "title")), (module.exports = c));
    };
