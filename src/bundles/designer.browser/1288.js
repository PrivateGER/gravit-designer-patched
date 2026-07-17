module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        function GToggleSnapAction() {
            GToggleSnapAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GToggleSnapAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GToggleSnapAction", "tooltip-description")),
                    shortcut: GToggleSnapAction.SHORTCUT,
                    middle: false,
                    learnMore: "/docs/design-aids/snaping/",
                }),
            };
        }
        (GObject.GObject.inherit(GToggleSnapAction, GAction),
            (GToggleSnapAction.ID = "view.toggle-snap"),
            (GToggleSnapAction.TITLE = new GObject.GLocaleKey("GToggleSnapAction", "title")),
            (GToggleSnapAction.SHORTCUT = [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.F10]),
            (GToggleSnapAction.TOOLTIP_CONFIG = null),
            (GToggleSnapAction.prototype.getId = function () {
                return GToggleSnapAction.ID;
            }),
            (GToggleSnapAction.prototype.getTitle = function () {
                return GToggleSnapAction.TITLE;
            }),
            (GToggleSnapAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_SNAP;
            }),
            (GToggleSnapAction.prototype.getGroup = function () {
                return "snap/enable";
            }),
            (GToggleSnapAction.prototype.getShortcut = function () {
                return GToggleSnapAction.SHORTCUT;
            }),
            (GToggleSnapAction.prototype.isCheckable = function () {
                return true;
            }),
            (GToggleSnapAction.prototype.isChecked = function () {
                return !gDesigner.getSetting("snap_disabled");
            }),
            (GToggleSnapAction.prototype.execute = function () {
                gDesigner.setSetting("snap_disabled", !gDesigner.getSetting("snap_disabled"));
            }),
            (GToggleSnapAction.prototype.getTooltipConfig = function (tooltipArea) {
                if (!tooltipArea) return null;
                const tooltipConfig = GToggleSnapAction.TOOLTIP_CONFIG[tooltipArea];
                return (
                    tooltipConfig.setConfig({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GToggleSnapAction", "tootlip-title-action")),
                    }),
                    tooltipConfig
                );
            }),
            (GToggleSnapAction.prototype.toString = function () {
                return "[Object GToggleSnapAction]";
            }),
            (module.exports = GToggleSnapAction));
    };
