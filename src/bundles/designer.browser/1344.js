module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GPlatform = require(15),
            GObject = require(1),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            SidebarsIds = require(198);
        class GCycleThroughLayersAction extends GAction.default {
            constructor(type) {
                (super(), (this._type = type), (this._title = new GObject.GLocaleKey("GCycleThroughLayersAction", "title.".concat(this._type))));
            }
            getId() {
                return "".concat(GCycleThroughLayersAction.ID, ".").concat(this._type);
            }
            getTitle() {
                return this._title;
            }
            getCategory() {
                return GCategory.default.CATEGORY_VIEW;
            }
            getShortcut() {
                switch (this._type) {
                    case GCycleThroughLayersAction.Type.Next:
                        return [GPlatform.GKey.Constant.TAB];
                    case GCycleThroughLayersAction.Type.Previous:
                        return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.TAB];
                    default:
                        return null;
                }
            }
            isVisible() {
                return false;
            }
            execute() {
                let mode = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : GCycleThroughLayersAction.Mode.Level;
                const activeSidebarId = gDesigner.getLeftSidebars().getActiveSidebar(),
                    outlineSidebar = gDesigner.getLeftSidebars().getSidebar(SidebarsIds.SidebarsIds.GOutlineSidebar),
                    layerPanel = outlineSidebar.getLayerPanel(),
                    focusedNode = layerPanel.gLayerPanel("getCurrentFocusedNode");
                if (!focusedNode || activeSidebarId !== outlineSidebar.getId()) return;
                const nextNode = this._getNextNodeInIteration(mode, focusedNode);
                if (nextNode) {
                    const currentItem = layerPanel.gLayerPanel("getItem", focusedNode),
                        nextItem = layerPanel.gLayerPanel("getItem", nextNode);
                    (currentItem.removeFlag(GObject.GNode.Flag.Selected),
                        nextItem.setFlag(GObject.GNode.Flag.Selected),
                        layerPanel.gLayerPanel("setCurrentFocusedNode", nextNode),
                        layerPanel.gLayerPanel("relayout"));
                }
            }
            _getNextNodeInIteration(mode, node) {
                switch (mode) {
                    case GCycleThroughLayersAction.Mode.Level:
                        return this._getNextNodeOfCurrentLevel(node);
                    case GCycleThroughLayersAction.Mode.Focus:
                        return this._getNextFocusableNode(node);
                    default:
                        return null;
                }
            }
            _getNextNodeOfCurrentLevel(node) {
                switch (this._type) {
                    case GCycleThroughLayersAction.Type.Next:
                        return node.next || node.parent.firstChild;
                    case GCycleThroughLayersAction.Type.Previous:
                        return node.previous || node.parent.lastChild;
                    default:
                        return null;
                }
            }
            _getNextFocusableNode(node) {
                switch (this._type) {
                    case GCycleThroughLayersAction.Type.Next:
                        return node.getNextFocusableNode();
                    case GCycleThroughLayersAction.Type.Previous:
                        return node.getPreviousFocusableNode();
                    default:
                        return null;
                }
            }
            toString() {
                return "[Object GCycleThroughLayersAction]";
            }
        }
        ((GCycleThroughLayersAction.ID = "view.cycle-through-layers"),
            (GCycleThroughLayersAction.Type = { Next: "next", Previous: "previous" }),
            (GCycleThroughLayersAction.Mode = { Focus: "focus", Level: "level" }),
            (module.exports = GCycleThroughLayersAction));
    };
