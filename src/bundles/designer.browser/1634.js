module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = require(67),
            GCategory = require(18),
            r = require(31);
        const { TOUCH_LAYOUT } = require(10 /* designerConfig */),
            l = require(85);
        function c() {
            c.TOOLTIP_CONFIG = {
                [i.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON]: i.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GToggleTouchAction", "text.try-this-feature-pro-tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GToggleTouchAction", "text.try-this-feature-pro-tooltip-description")),
                    learnMore: "/docs/touch-interface/",
                    upgradeToProStatsValue: "view.toggle-touch",
                    middle: false,
                    side: true,
                }),
            };
        }
        (GObject.GObject.inherit(c, r),
            (c.ID = "view.toggle-touch"),
            (c.TITLE = new GObject.GLocaleKey("GToggleTouchAction", "title")),
            (c.TITLE_DISABLE = new GObject.GLocaleKey("GToggleTouchAction", "title-disable")),
            (c.TOOLTIP_CONFIG = null),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return gDesigner.isTouchEnabled() ? c.TITLE_DISABLE : c.TITLE;
            }),
            (c.prototype.getGroup = function () {
                return "touch";
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (c.prototype.isCheckable = function () {
                return true;
            }),
            (c.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-touch-disable" : null;
            }),
            (c.prototype.execute = function () {
                gDesigner.setTouchEnabled(!gDesigner.isTouchEnabled());
            }),
            (c.prototype.getTooltipArea = function () {
                return i.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON;
            }),
            (c.prototype.getTooltipConfig = function (e) {
                return (e && c.TOOLTIP_CONFIG[e]) || null;
            }),
            (c.prototype.isAvailable = function () {
                return !!TOUCH_LAYOUT && !gDesigner.getLicense().isGuest() && gContainer.getRuntime() !== l.Runtime.IPad;
            }),
            (c.prototype.statsValue = function () {
                return "".concat(c.ID, ".").concat(gDesigner.isTouchEnabled() ? "on" : "off");
            }),
            (c.prototype.toString = function () {
                return "[Object GToggleTouchAction]";
            }),
            (module.exports = c));
    };
