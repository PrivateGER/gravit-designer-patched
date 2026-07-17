module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        const { TOUCH_LAYOUT } = require(10 /* designerConfig */),
            GContainer = require(85);
        function GToggleTouchAction() {
            GToggleTouchAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GToggleTouchAction", "text.try-this-feature-pro-tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GToggleTouchAction", "text.try-this-feature-pro-tooltip-description")),
                    learnMore: "/docs/touch-interface/",
                    upgradeToProStatsValue: "view.toggle-touch",
                    middle: false,
                    side: true,
                }),
            };
        }
        (GObject.GObject.inherit(GToggleTouchAction, GAction),
            (GToggleTouchAction.ID = "view.toggle-touch"),
            (GToggleTouchAction.TITLE = new GObject.GLocaleKey("GToggleTouchAction", "title")),
            (GToggleTouchAction.TITLE_DISABLE = new GObject.GLocaleKey("GToggleTouchAction", "title-disable")),
            (GToggleTouchAction.TOOLTIP_CONFIG = null),
            (GToggleTouchAction.prototype.getId = function () {
                return GToggleTouchAction.ID;
            }),
            (GToggleTouchAction.prototype.getTitle = function () {
                return gDesigner.isTouchEnabled() ? GToggleTouchAction.TITLE_DISABLE : GToggleTouchAction.TITLE;
            }),
            (GToggleTouchAction.prototype.getGroup = function () {
                return "touch";
            }),
            (GToggleTouchAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (GToggleTouchAction.prototype.isCheckable = function () {
                return true;
            }),
            (GToggleTouchAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-touch-disable" : null;
            }),
            (GToggleTouchAction.prototype.execute = function () {
                gDesigner.setTouchEnabled(!gDesigner.isTouchEnabled());
            }),
            (GToggleTouchAction.prototype.getTooltipArea = function () {
                return GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON;
            }),
            (GToggleTouchAction.prototype.getTooltipConfig = function (tooltipArea) {
                return (tooltipArea && GToggleTouchAction.TOOLTIP_CONFIG[tooltipArea]) || null;
            }),
            (GToggleTouchAction.prototype.isAvailable = function () {
                return !!TOUCH_LAYOUT && !gDesigner.getLicense().isGuest() && gContainer.getRuntime() !== GContainer.Runtime.IPad;
            }),
            (GToggleTouchAction.prototype.statsValue = function () {
                return "".concat(GToggleTouchAction.ID, ".").concat(gDesigner.isTouchEnabled() ? "on" : "off");
            }),
            (GToggleTouchAction.prototype.toString = function () {
                return "[Object GToggleTouchAction]";
            }),
            (module.exports = GToggleTouchAction));
    };
