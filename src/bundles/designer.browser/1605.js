module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16),
            GPlatform = require(15),
            GObject = require(1),
            SidebarsIds = require(198),
            s = o(require(18 /* GCategory */)),
            l = o(require(31));
        class c extends l.default {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                (super(),
                    (this._isReverse = e),
                    (this._title = new GObject.GLocaleKey("GEnterLayerGroupAction", "title".concat(this._isReverse ? ".reverse" : ""))));
            }
            getId() {
                return this._isReverse ? c.ID_REVERSE : c.ID;
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return s.default.CATEGORY_VIEW;
            }
            getShortcut() {
                return this._isReverse ? [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.ENTER] : [GPlatform.GKey.Constant.ENTER];
            }
            isVisible() {
                return false;
            }
            execute() {
                const e = gDesigner.getLeftSidebars().getSidebar(SidebarsIds.SidebarsIds.GOutlineSidebar).getLayerPanel(),
                    { vtree: t, currentFocus: n } = e.data("glayerpanel");
                if (!n) return;
                let o;
                if (
                    (!this._isReverse && n.firstChild ? (o = n.firstChild) : this._isReverse && n.parent && n.parent.row && (o = n.parent),
                    o)
                ) {
                    const i = e.gLayerPanel("getItem", n),
                        r = e.gLayerPanel("getItem", o);
                    (i.removeFlag(GObject.GNode.Flag.Selected), r.setFlag(GObject.GNode.Flag.Selected), t.expandAndFocus(r));
                }
            }
            toString() {
                return "[Object GEnterLayerGroupAction]";
            }
        }
        ((c.ID = "view.enter-layer-group"), (c.ID_REVERSE = "view.enter-layer-group.reverse"), (module.exports = c));
    };
