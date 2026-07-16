module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var o = require(53),
            GObject = require(1),
            GPlatform = require(15),
            designerConfig = require(10),
            s = require(67),
            GCategory = require(18),
            c = require(31);
        function d(e) {
            ((this._type = e),
                (this._title = new GObject.GLocaleKey("GArrangeAction", "title." + e)),
                (d.TOOLTIP_CONFIG = {
                    [s.TOOLTIP_AREA.TOOLBAR]: {
                        [o.GEditor.ArrangeOrderType.BringForward]: s.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GArrangeAction", "bring-forward-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GArrangeAction", "bring-forward-tooltip-description")),
                            shortcut: d.SHORTCUT[o.GEditor.ArrangeOrderType.BringForward],
                            video: designerConfig.gApi.getRichTooltipVideoURL("Bring_Forward.mp4"),
                            learnMore: "/docs/arrange-objects/stacking-order/",
                        }),
                        [o.GEditor.ArrangeOrderType.SendBackward]: s.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GArrangeAction", "send-backward-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GArrangeAction", "send-backward-tooltip-description")),
                            shortcut: d.SHORTCUT[o.GEditor.ArrangeOrderType.SendBackward],
                            video: designerConfig.gApi.getRichTooltipVideoURL("Send_Backward.mp4"),
                            learnMore: "/docs/arrange-objects/stacking-order/",
                        }),
                    },
                }));
        }
        (GObject.GObject.inherit(d, c),
            (d.SHORTCUT = {
                [o.GEditor.ArrangeOrderType.SendToFront]: [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.UP],
                [o.GEditor.ArrangeOrderType.BringForward]: [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.UP],
                [o.GEditor.ArrangeOrderType.SendBackward]: [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.DOWN],
                [o.GEditor.ArrangeOrderType.SendToBack]: [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.DOWN],
            }),
            (d.TOOLTIP_CONFIG = null),
            (d.ID = "arrange.order"),
            (d.prototype._type = null),
            (d.prototype._title = null),
            (d.prototype.getId = function () {
                return d.ID + "." + this._type;
            }),
            (d.prototype.getTitle = function () {
                return this._title;
            }),
            (d.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_ARRANGE;
            }),
            (d.prototype.getGroup = function () {
                return "arrange/arrange";
            }),
            (d.prototype.getShortcut = function () {
                return d.SHORTCUT[this._type] || null;
            }),
            (d.prototype.isEnabled = function (e) {
                return (
                    (e =
                        e || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null)) &&
                    e.length > 0
                );
            }),
            (d.prototype.execute = function (e) {
                gDesigner.getActiveDocument().getEditor().arrangeOrder(this._type, e, false);
            }),
            (d.prototype.getTooltipConfig = function (e) {
                return (e && d.TOOLTIP_CONFIG[e] && d.TOOLTIP_CONFIG[e][this._type]) || null;
            }),
            (d.prototype.toString = function () {
                return "[Object GArrangeAction]";
            }),
            (module.exports = d));
    };
