module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16),
            GPlatform = require(15),
            GObject = require(1),
            r = o(require(18 /* GCategory */)),
            s = o(require(31)),
            SidebarsIds = require(198);
        class c extends s.default {
            constructor(e) {
                (super(), (this._type = e), (this._title = new GObject.GLocaleKey("GCycleThroughLayersAction", "title.".concat(this._type))));
            }
            getId() {
                return "".concat(c.ID, ".").concat(this._type);
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return r.default.CATEGORY_VIEW;
            }
            getShortcut() {
                switch (this._type) {
                    case c.Type.Next:
                        return [GPlatform.GKey.Constant.TAB];
                    case c.Type.Previous:
                        return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.TAB];
                    default:
                        return null;
                }
            }
            isVisible() {
                return false;
            }
            execute() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c.Mode.Level;
                const t = gDesigner.getLeftSidebars().getActiveSidebar(),
                    n = gDesigner.getLeftSidebars().getSidebar(SidebarsIds.SidebarsIds.GOutlineSidebar),
                    o = n.getLayerPanel(),
                    i = o.gLayerPanel("getCurrentFocusedNode");
                if (!i || t !== n.getId()) return;
                const r = this._getNextNodeInIteration(e, i);
                if (r) {
                    const e = o.gLayerPanel("getItem", i),
                        t = o.gLayerPanel("getItem", r);
                    (e.removeFlag(GObject.GNode.Flag.Selected),
                        t.setFlag(GObject.GNode.Flag.Selected),
                        o.gLayerPanel("setCurrentFocusedNode", r),
                        o.gLayerPanel("relayout"));
                }
            }
            _getNextNodeInIteration(e, t) {
                switch (e) {
                    case c.Mode.Level:
                        return this._getNextNodeOfCurrentLevel(t);
                    case c.Mode.Focus:
                        return this._getNextFocusableNode(t);
                    default:
                        return null;
                }
            }
            _getNextNodeOfCurrentLevel(e) {
                switch (this._type) {
                    case c.Type.Next:
                        return e.next || e.parent.firstChild;
                    case c.Type.Previous:
                        return e.previous || e.parent.lastChild;
                    default:
                        return null;
                }
            }
            _getNextFocusableNode(e) {
                switch (this._type) {
                    case c.Type.Next:
                        return e.getNextFocusableNode();
                    case c.Type.Previous:
                        return e.getPreviousFocusableNode();
                    default:
                        return null;
                }
            }
            toString() {
                return "[Object GCycleThroughLayersAction]";
            }
        }
        ((c.ID = "view.cycle-through-layers"),
            (c.Type = { Next: "next", Previous: "previous" }),
            (c.Mode = { Focus: "focus", Level: "level" }),
            (module.exports = c));
    };
