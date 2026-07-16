module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GPlatform = require(15),
            GObject = require(1),
            SidebarsIds = require(198),
            s = _interopRequireDefault(require(18 /* GCategory */)),
            l = _interopRequireDefault(require(31));
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
                    { vtree, currentFocus } = e.data("glayerpanel");
                if (!currentFocus) return;
                let o;
                if (
                    (!this._isReverse && currentFocus.firstChild ? (o = currentFocus.firstChild) : this._isReverse && currentFocus.parent && currentFocus.parent.row && (o = currentFocus.parent),
                    o)
                ) {
                    const i = e.gLayerPanel("getItem", currentFocus),
                        r = e.gLayerPanel("getItem", o);
                    (i.removeFlag(GObject.GNode.Flag.Selected), r.setFlag(GObject.GNode.Flag.Selected), vtree.expandAndFocus(r));
                }
            }
            toString() {
                return "[Object GEnterLayerGroupAction]";
            }
        }
        ((c.ID = "view.enter-layer-group"), (c.ID_REVERSE = "view.enter-layer-group.reverse"), (module.exports = c));
    };
