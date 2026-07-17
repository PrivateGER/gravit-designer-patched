module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41));
        var GObject = require(1),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GDocument = require(163),
            GAction = require(31),
            GContainer = require(85);
        function GLinkImageAction() {
            GLinkImageAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GLinkImageAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GLinkImageAction", "tooltip-description")),
                    middle: false,
                    learnMore: "/docs/working-with-images/insert-images/#link-image",
                }),
            };
        }
        (GObject.GObject.inherit(GLinkImageAction, GAction),
            (GLinkImageAction.ID = "file.link-import"),
            (GLinkImageAction.TITLE = new GObject.GLocaleKey("GLinkImageAction", "title")),
            (GLinkImageAction.TOOLTIP_CONFIG = null),
            (GLinkImageAction.prototype.getId = function () {
                return GLinkImageAction.ID;
            }),
            (GLinkImageAction.prototype.getTitle = function () {
                return GLinkImageAction.TITLE;
            }),
            (GLinkImageAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE_IMPORT;
            }),
            (GLinkImageAction.prototype.getGroup = function () {
                return "import/place-import";
            }),
            (GLinkImageAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-link-image" : null;
            }),
            (GLinkImageAction.prototype.isEnabled = function (storage) {
                if (gContainer.getRuntime() !== GContainer.Runtime.Electron) return false;
                var activeDocument = gDesigner.getActiveDocument();
                return !!activeDocument && (storage = storage || activeDocument.getStorage() || gDesigner.getDefaultStorage()) && storage.canPromptOpen();
            }),
            (GLinkImageAction.prototype.execute = function (storage, callback) {
                var activeDocument = gDesigner.getActiveDocument();
                if (!activeDocument) return false;
                (storage = storage || activeDocument.getStorage() || gDesigner.getDefaultStorage()).openPrompt(
                    GDocument.FileTypes.filter((fileType) => 0 === fileType.mime.indexOf("image")),
                    (file) => {
                        var fileUrl = "file://" + file.getUniqueId(),
                            imageUrl = fileUrl,
                            dictionaryEntry = activeDocument.getScene().getDictionary().putValueIfAbsent(imageUrl);
                        dictionaryEntry && (imageUrl = dictionaryEntry.getUrl());
                        var image = new Image();
                        ((image.onload = () => {
                            var imageElement = new GObject.GImage();
                            (imageElement.setProperties(["iw", "ih", "url"], [image.naturalWidth, image.naturalHeight, imageUrl]),
                                activeDocument.insertElement(imageElement, true, true),
                                callback && callback());
                        }),
                            (image.src = fileUrl));
                    },
                    false
                );
            }),
            (GLinkImageAction.prototype.isAvailable = function () {
                return gContainer.getRuntime() !== GContainer.Runtime.IPad;
            }),
            (GLinkImageAction.prototype.getTooltipConfig = function (area) {
                return (area && GLinkImageAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GLinkImageAction.prototype.toString = function () {
                return "[Object GLinkImageAction]";
            }),
            (module.exports = GLinkImageAction));
    };
