module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            GSubAction = _interopRequireDefault(require(1168)),
            SidebarsIds = require(198),
            GChangeAnchorPointsJointTypeAction = _interopRequireDefault(require(1345));
        class GChangeAnchorPointsJointTypeSubAction extends GSubAction.default {
            constructor(type) {
                (super(type), (this._title = new GObject.GLocaleKey("GChangeAnchorPointsJointTypeSubAction", "title.".concat(this._type))));
            }
            _getMainActionId() {
                return GChangeAnchorPointsJointTypeAction.default.ID;
            }
            getCategory() {
                return GCategory.default.CATEGORY_MODIFY;
            }
            getShortcutSubKey() {
                switch (this._type) {
                    case GChangeAnchorPointsJointTypeSubAction.Type.Straight:
                        return GPlatform.GKey.Constant.S;
                    case GChangeAnchorPointsJointTypeSubAction.Type.Mirrored:
                        return GPlatform.GKey.Constant.M;
                    case GChangeAnchorPointsJointTypeSubAction.Type.Disconnected:
                        return GPlatform.GKey.Constant.D;
                    case GChangeAnchorPointsJointTypeSubAction.Type.Connector:
                        return GPlatform.GKey.Constant.C;
                    case GChangeAnchorPointsJointTypeSubAction.Type.Asymmetric:
                        return GPlatform.GKey.Constant.A;
                    default:
                        return null;
                }
            }
            execute() {
                const sidebar = gDesigner.getRightSidebars().getSidebar(SidebarsIds.SidebarsIds.GInspectorSidebar),
                    nodeType = this._getNodeType();
                nodeType && sidebar.setPathPointsNodeType(nodeType);
            }
            _getNodeType() {
                switch (this._type) {
                    case GChangeAnchorPointsJointTypeSubAction.Type.Straight:
                        return "-";
                    case GChangeAnchorPointsJointTypeSubAction.Type.Mirrored:
                        return GObject.GPathBase.AnchorPoint.Type.Mirror;
                    case GChangeAnchorPointsJointTypeSubAction.Type.Disconnected:
                        return GObject.GPathBase.AnchorPoint.Type.Asymmetric;
                    case GChangeAnchorPointsJointTypeSubAction.Type.Connector:
                        return GObject.GPathBase.AnchorPoint.Type.Connector;
                    case GChangeAnchorPointsJointTypeSubAction.Type.Asymmetric:
                        return GObject.GPathBase.AnchorPoint.Type.Symmetric;
                    default:
                        return null;
                }
            }
            toString() {
                return "[Object GChangeAnchorPointsJointTypeSubAction]";
            }
        }
        ((GChangeAnchorPointsJointTypeSubAction.Type = {
            Straight: "straight",
            Mirrored: "mirrored",
            Disconnected: "disconnected",
            Connector: "connector",
            Asymmetric: "asymmetric",
        }),
            (module.exports = GChangeAnchorPointsJointTypeSubAction));
    };
