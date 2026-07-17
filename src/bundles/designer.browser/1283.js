module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(3), require(4), require(41));
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GRuntime = _interopRequireDefault(require(85 /* GContainer */)),
            designerConfig = require(10),
            GCategory = require(18),
            GDocument = require(163),
            GAction = require(31);
        function GPlaceImportAction() {
            GPlaceImportAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GPlaceImportAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GPlaceImportAction", "tooltip-description")),
                    middle: false,
                    video: designerConfig.gApi.getRichTooltipVideoURL("Place_Image.mp4"),
                    learnMore: "/docs/working-with-images/insert-images/#place-image",
                }),
            };
        }
        (GObject.GObject.inherit(GPlaceImportAction, GAction),
            (GPlaceImportAction.ID = "file.place-import"),
            (GPlaceImportAction.TITLE = new GObject.GLocaleKey("GPlaceImportAction", "title")),
            (GPlaceImportAction.TOOLTIP_CONFIG = null),
            (GPlaceImportAction.prototype.getId = function () {
                return GPlaceImportAction.ID;
            }),
            (GPlaceImportAction.prototype.getTitle = function () {
                return GPlaceImportAction.TITLE;
            }),
            (GPlaceImportAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE_IMPORT;
            }),
            (GPlaceImportAction.prototype.getGroup = function () {
                return "import/place-import";
            }),
            (GPlaceImportAction.prototype.isVisible = function () {
                return gContainer.getRuntime() !== GRuntime.default.Runtime.IPad;
            }),
            (GPlaceImportAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-place-image" : null;
            }),
            (GPlaceImportAction.prototype.isEnabled = function (storage) {
                var activeDocument = gDesigner.getActiveDocument();
                return (
                    !!activeDocument &&
                    (storage = storage || activeDocument.getStorage() || gDesigner.getDefaultStorage()) &&
                    storage.canPromptOpen() &&
                    gDesigner.getApplicationManager().isImportResourcesEnabled()
                );
            }),
            (GPlaceImportAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, "P"];
            }),
            (GPlaceImportAction.prototype.execute = function (storage, callback) {
                var activeDocument = gDesigner.getActiveDocument();
                if (!activeDocument) return false;
                (storage = storage || activeDocument.getStorage() || gDesigner.getDefaultStorage()).openPrompt(
                    GDocument.FileTypes.filter((fileType) => fileType.import_image),
                    (file) => {
                        (gDesigner.stats("import-placeimport_open_localfile", file.getExtension()), activeDocument.placeOrImport(file), callback && callback());
                    },
                    false
                );
            }),
            (GPlaceImportAction.prototype.getTooltipConfig = function (area) {
                return (area && GPlaceImportAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GPlaceImportAction.prototype.toString = function () {
                return "[Object GPlaceImportAction]";
            }),
            (module.exports = GPlaceImportAction));
    };
