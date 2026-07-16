module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(3), require(4), require(41));
        var GObject = require(1),
            GPlatform = require(15),
            r = require(67),
            s = _interopRequireDefault(require(85)),
            designerConfig = require(10),
            GCategory = require(18),
            GDocument = require(163),
            u = require(31);
        function p() {
            p.TOOLTIP_CONFIG = {
                [r.TOOLTIP_AREA.TOOLBAR]: r.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GPlaceImportAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GPlaceImportAction", "tooltip-description")),
                    middle: false,
                    video: designerConfig.gApi.getRichTooltipVideoURL("Place_Image.mp4"),
                    learnMore: "/docs/working-with-images/insert-images/#place-image",
                }),
            };
        }
        (GObject.GObject.inherit(p, u),
            (p.ID = "file.place-import"),
            (p.TITLE = new GObject.GLocaleKey("GPlaceImportAction", "title")),
            (p.TOOLTIP_CONFIG = null),
            (p.prototype.getId = function () {
                return p.ID;
            }),
            (p.prototype.getTitle = function () {
                return p.TITLE;
            }),
            (p.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE_IMPORT;
            }),
            (p.prototype.getGroup = function () {
                return "import/place-import";
            }),
            (p.prototype.isVisible = function () {
                return gContainer.getRuntime() !== s.default.Runtime.IPad;
            }),
            (p.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-place-image" : null;
            }),
            (p.prototype.isEnabled = function (e) {
                var t = gDesigner.getActiveDocument();
                return (
                    !!t &&
                    (e = e || t.getStorage() || gDesigner.getDefaultStorage()) &&
                    e.canPromptOpen() &&
                    gDesigner.getApplicationManager().isImportResourcesEnabled()
                );
            }),
            (p.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, "P"];
            }),
            (p.prototype.execute = function (e, t) {
                var n = gDesigner.getActiveDocument();
                if (!n) return false;
                (e = e || n.getStorage() || gDesigner.getDefaultStorage()).openPrompt(
                    GDocument.FileTypes.filter((e) => e.import_image),
                    (e) => {
                        (gDesigner.stats("import-placeimport_open_localfile", e.getExtension()), n.placeOrImport(e), t && t());
                    },
                    false
                );
            }),
            (p.prototype.getTooltipConfig = function (e) {
                return (e && p.TOOLTIP_CONFIG[e]) || null;
            }),
            (p.prototype.toString = function () {
                return "[Object GPlaceImportAction]";
            }),
            (module.exports = p));
    };
