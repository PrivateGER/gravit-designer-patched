module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GTooltip = (require(15 /* GPlatform */), require(67 /* GRichTooltipConfig */)),
            GCategory = require(18),
            GAction = require(31),
            FontImporter = require(1245);
        function GImportFontsAction() {
            GImportFontsAction.TOOLTIP_CONFIG = {
                [GTooltip.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON]: GTooltip.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GImportFontsAction", "text.try-this-feature-pro-tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GImportFontsAction", "text.try-this-feature-pro-tooltip-description")),
                    learnMore: "/docs/import-export/import/#import-fonts",
                    upgradeToProStatsValue: "font.import",
                    middle: false,
                    side: true,
                }),
            };
        }
        (GObject.GObject.inherit(GImportFontsAction, GAction),
            (GImportFontsAction.ID = "font.import"),
            (GImportFontsAction.TITLE = new GObject.GLocaleKey("GImportFontsAction", "title")),
            (GImportFontsAction.TOOLTIP_CONFIG = null),
            (GImportFontsAction.prototype.getId = function () {
                return GImportFontsAction.ID;
            }),
            (GImportFontsAction.prototype.getTitle = function () {
                return GImportFontsAction.TITLE;
            }),
            (GImportFontsAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE_IMPORT;
            }),
            (GImportFontsAction.prototype.getGroup = function () {
                return "import/import-fonts";
            }),
            (GImportFontsAction.prototype.isEnabled = function (storage) {
                return (
                    (storage = storage || gDesigner.getDefaultStorage()),
                    !!gDesigner.getApplicationManager().isImportResourcesEnabled() &&
                        storage.canPromptOpen() &&
                        "undefined" != typeof window &&
                        window.indexedDB
                );
            }),
            (GImportFontsAction.prototype.execute = function (importer, doneCallback) {
                (importer = importer || new FontImporter()).import(doneCallback);
            }),
            (GImportFontsAction.prototype.getTooltipArea = function () {
                return GTooltip.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON;
            }),
            (GImportFontsAction.prototype.getTooltipConfig = function (area) {
                return (area && GImportFontsAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GImportFontsAction.prototype.toString = function () {
                return "[Object GImportFontsAction]";
            }),
            (module.exports = GImportFontsAction));
    };
