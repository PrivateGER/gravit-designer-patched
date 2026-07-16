module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = (require(15 /* GPlatform */), require(67)),
            GCategory = require(18),
            r = require(31),
            s = require(1245);
        function l() {
            l.TOOLTIP_CONFIG = {
                [i.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON]: i.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GImportFontsAction", "text.try-this-feature-pro-tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GImportFontsAction", "text.try-this-feature-pro-tooltip-description")),
                    learnMore: "/docs/import-export/import/#import-fonts",
                    upgradeToProStatsValue: "font.import",
                    middle: false,
                    side: true,
                }),
            };
        }
        (GObject.GObject.inherit(l, r),
            (l.ID = "font.import"),
            (l.TITLE = new GObject.GLocaleKey("GImportFontsAction", "title")),
            (l.TOOLTIP_CONFIG = null),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE_IMPORT;
            }),
            (l.prototype.getGroup = function () {
                return "import/import-fonts";
            }),
            (l.prototype.isEnabled = function (e) {
                return (
                    (e = e || gDesigner.getDefaultStorage()),
                    !!gDesigner.getApplicationManager().isImportResourcesEnabled() &&
                        e.canPromptOpen() &&
                        "undefined" != typeof window &&
                        window.indexedDB
                );
            }),
            (l.prototype.execute = function (e, t) {
                (e = e || new s()).import(t);
            }),
            (l.prototype.getTooltipArea = function () {
                return i.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON;
            }),
            (l.prototype.getTooltipConfig = function (e) {
                return (e && l.TOOLTIP_CONFIG[e]) || null;
            }),
            (l.prototype.toString = function () {
                return "[Object GImportFontsAction]";
            }),
            (module.exports = l));
    };
