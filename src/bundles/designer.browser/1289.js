module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = require(67),
            GCategory = require(18),
            r = require(31);
        function s() {
            s.TOOLTIP_CONFIG = {
                [i.TOOLTIP_AREA.TOOLBAR]: i.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GToggleSnapZonesAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GToggleSnapZonesAction", "tooltip-description")),
                    middle: false,
                    learnMore: "/docs/design-aids/snaping/#h.357kb75pbg9h",
                }),
            };
        }
        (GObject.GObject.inherit(s, r),
            (s.ID = "view.toggle-snapzones"),
            (s.TITLE = new GObject.GLocaleKey("GToggleSnapZonesAction", "title")),
            (s.TOOLTIP_CONFIG = null),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_SNAP;
            }),
            (s.prototype.getGroup = function () {
                return "snap/enable";
            }),
            (s.prototype.isCheckable = function () {
                return true;
            }),
            (s.prototype.isChecked = function () {
                return gDesigner.getSetting("snap_zones");
            }),
            (s.prototype.execute = function () {
                gDesigner.setSetting("snap_zones", !gDesigner.getSetting("snap_zones"));
            }),
            (s.prototype.getTooltipConfig = function (e) {
                return (e && s.TOOLTIP_CONFIG[e]) || null;
            }),
            (s.prototype.toString = function () {
                return "[Object GToggleSnapZonesAction]";
            }),
            (module.exports = s));
    };
