module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = o(require(18 /* GCategory */)),
            s = o(require(1168)),
            SidebarsIds = require(198),
            c = o(require(1345));
        class d extends s.default {
            constructor(e) {
                (super(e), (this._title = new GObject.GLocaleKey("GChangeAnchorPointsJointTypeSubAction", "title.".concat(this._type))));
            }
            _getMainActionId() {
                return c.default.ID;
            }
            getCategory() {
                return r.default.CATEGORY_MODIFY;
            }
            getShortcutSubKey() {
                switch (this._type) {
                    case d.Type.Straight:
                        return GPlatform.GKey.Constant.S;
                    case d.Type.Mirrored:
                        return GPlatform.GKey.Constant.M;
                    case d.Type.Disconnected:
                        return GPlatform.GKey.Constant.D;
                    case d.Type.Connector:
                        return GPlatform.GKey.Constant.C;
                    case d.Type.Asymmetric:
                        return GPlatform.GKey.Constant.A;
                    default:
                        return null;
                }
            }
            execute() {
                const e = gDesigner.getRightSidebars().getSidebar(SidebarsIds.SidebarsIds.GInspectorSidebar),
                    t = this._getNodeType();
                t && e.setPathPointsNodeType(t);
            }
            _getNodeType() {
                switch (this._type) {
                    case d.Type.Straight:
                        return "-";
                    case d.Type.Mirrored:
                        return GObject.GPathBase.AnchorPoint.Type.Mirror;
                    case d.Type.Disconnected:
                        return GObject.GPathBase.AnchorPoint.Type.Asymmetric;
                    case d.Type.Connector:
                        return GObject.GPathBase.AnchorPoint.Type.Connector;
                    case d.Type.Asymmetric:
                        return GObject.GPathBase.AnchorPoint.Type.Symmetric;
                    default:
                        return null;
                }
            }
            toString() {
                return "[Object GChangeAnchorPointsJointTypeSubAction]";
            }
        }
        ((d.Type = {
            Straight: "straight",
            Mirrored: "mirrored",
            Disconnected: "disconnected",
            Connector: "connector",
            Asymmetric: "asymmetric",
        }),
            (module.exports = d));
    };
