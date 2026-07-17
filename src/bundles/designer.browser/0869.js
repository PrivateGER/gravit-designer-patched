module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GEditorModule = require(53),
            GObject = require(1),
            GPlatform = require(15),
            designerConfig = require(10),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        function ArrangeAction(type) {
            ((this._type = type),
                (this._title = new GObject.GLocaleKey("GArrangeAction", "title." + type)),
                (ArrangeAction.TOOLTIP_CONFIG = {
                    [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: {
                        [GEditorModule.GEditor.ArrangeOrderType.BringForward]: GRichTooltipConfig.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GArrangeAction", "bring-forward-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GArrangeAction", "bring-forward-tooltip-description")),
                            shortcut: ArrangeAction.SHORTCUT[GEditorModule.GEditor.ArrangeOrderType.BringForward],
                            video: designerConfig.gApi.getRichTooltipVideoURL("Bring_Forward.mp4"),
                            learnMore: "/docs/arrange-objects/stacking-order/",
                        }),
                        [GEditorModule.GEditor.ArrangeOrderType.SendBackward]: GRichTooltipConfig.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GArrangeAction", "send-backward-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GArrangeAction", "send-backward-tooltip-description")),
                            shortcut: ArrangeAction.SHORTCUT[GEditorModule.GEditor.ArrangeOrderType.SendBackward],
                            video: designerConfig.gApi.getRichTooltipVideoURL("Send_Backward.mp4"),
                            learnMore: "/docs/arrange-objects/stacking-order/",
                        }),
                    },
                }));
        }
        (GObject.GObject.inherit(ArrangeAction, GAction),
            (ArrangeAction.SHORTCUT = {
                [GEditorModule.GEditor.ArrangeOrderType.SendToFront]: [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.UP],
                [GEditorModule.GEditor.ArrangeOrderType.BringForward]: [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.UP],
                [GEditorModule.GEditor.ArrangeOrderType.SendBackward]: [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.DOWN],
                [GEditorModule.GEditor.ArrangeOrderType.SendToBack]: [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.DOWN],
            }),
            (ArrangeAction.TOOLTIP_CONFIG = null),
            (ArrangeAction.ID = "arrange.order"),
            (ArrangeAction.prototype._type = null),
            (ArrangeAction.prototype._title = null),
            (ArrangeAction.prototype.getId = function () {
                return ArrangeAction.ID + "." + this._type;
            }),
            (ArrangeAction.prototype.getTitle = function () {
                return this._title;
            }),
            (ArrangeAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_ARRANGE;
            }),
            (ArrangeAction.prototype.getGroup = function () {
                return "arrange/arrange";
            }),
            (ArrangeAction.prototype.getShortcut = function () {
                return ArrangeAction.SHORTCUT[this._type] || null;
            }),
            (ArrangeAction.prototype.isEnabled = function (selection) {
                return (
                    (selection =
                        selection || (gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null)) &&
                    selection.length > 0
                );
            }),
            (ArrangeAction.prototype.execute = function (selection) {
                gDesigner.getActiveDocument().getEditor().arrangeOrder(this._type, selection, false);
            }),
            (ArrangeAction.prototype.getTooltipConfig = function (area) {
                return (area && ArrangeAction.TOOLTIP_CONFIG[area] && ArrangeAction.TOOLTIP_CONFIG[area][this._type]) || null;
            }),
            (ArrangeAction.prototype.toString = function () {
                return "[Object GArrangeAction]";
            }),
            (module.exports = ArrangeAction));
    };
