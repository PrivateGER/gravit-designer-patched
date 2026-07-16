module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            a = require(67),
            GCategory = require(18),
            s = require(31);
        function l() {
            l.TOOLTIP_CONFIG = {
                [a.TOOLTIP_AREA.TOOLBAR]: a.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GToggleSnapAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GToggleSnapAction", "tooltip-description")),
                    shortcut: l.SHORTCUT,
                    middle: false,
                    learnMore: "/docs/design-aids/snaping/",
                }),
            };
        }
        (GObject.GObject.inherit(l, s),
            (l.ID = "view.toggle-snap"),
            (l.TITLE = new GObject.GLocaleKey("GToggleSnapAction", "title")),
            (l.SHORTCUT = [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.F10]),
            (l.TOOLTIP_CONFIG = null),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_SNAP;
            }),
            (l.prototype.getGroup = function () {
                return "snap/enable";
            }),
            (l.prototype.getShortcut = function () {
                return l.SHORTCUT;
            }),
            (l.prototype.isCheckable = function () {
                return true;
            }),
            (l.prototype.isChecked = function () {
                return !gDesigner.getSetting("snap_disabled");
            }),
            (l.prototype.execute = function () {
                gDesigner.setSetting("snap_disabled", !gDesigner.getSetting("snap_disabled"));
            }),
            (l.prototype.getTooltipConfig = function (e) {
                if (!e) return null;
                const t = l.TOOLTIP_CONFIG[e];
                return (
                    t.setConfig({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GToggleSnapAction", "tootlip-title-action")),
                    }),
                    t
                );
            }),
            (l.prototype.toString = function () {
                return "[Object GToggleSnapAction]";
            }),
            (module.exports = l));
    };
