module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(8 /* Symbol */), require(3), require(4), require(41));
        var GObject = require(1),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            GDocument = _interopRequireDefault(require(163 /* GDocument */)),
            GContainer = _interopRequireDefault(require(85 /* GContainer */)),
            GElementAction = _interopRequireDefault(require(106));
        function GImportImageFromIOSAction(source) {
            this._source = source;
        }
        (GObject.GObject.inherit(GImportImageFromIOSAction, GElementAction.default),
            (GImportImageFromIOSAction.getId = function (source) {
                return "file.import-image-from-ios-".concat(source);
            }),
            (GImportImageFromIOSAction.Source = { FILES: "files", PHOTOS: "photos" }),
            (GImportImageFromIOSAction.prototype._source = null),
            (GImportImageFromIOSAction.prototype.getId = function () {
                return GImportImageFromIOSAction.getId(this._source);
            }),
            (GImportImageFromIOSAction.prototype.getTitle = function () {
                return new GObject.GLocaleKey("GImportImageFromIOSAction", "text.ios-".concat(this._source));
            }),
            (GImportImageFromIOSAction.prototype.getCategory = function () {
                return GCategory.default.CATEGORY_FILE_IMPORT_IMAGE;
            }),
            (GImportImageFromIOSAction.prototype.getGroup = function () {
                return "import/image-type/".concat(this._source);
            }),
            (GImportImageFromIOSAction.prototype.isAvailable = function () {
                return gContainer.getRuntime() === GContainer.default.Runtime.IPad;
            }),
            (GImportImageFromIOSAction.prototype.isEnabled = function (storage) {
                if (!GElementAction.default.prototype.isEnabled.call(this)) return false;
                const activeDocument = gDesigner.getActiveDocument();
                return (
                    !!activeDocument &&
                    !!(storage = storage || activeDocument.getStorage() || gDesigner.getDefaultStorage()) &&
                    storage.canPromptOpen() &&
                    gDesigner.getApplicationManager().isImportResourcesEnabled()
                );
            }),
            (GImportImageFromIOSAction.prototype.execute = async function (storage, callback) {
                const activeDocument = gDesigner.getActiveDocument();
                if (!activeDocument) return false;
                storage = storage || activeDocument.getStorage() || gDesigner.getDefaultStorage();
                const fileTypes = GDocument.default.FileTypes.filter((fileType) => fileType.import_image);
                try {
                    let importedFile;
                    ((importedFile = this._source === GImportImageFromIOSAction.Source.FILES ? await storage.openFromFiles(fileTypes) : await storage.openFromPhotos(fileTypes)),
                        activeDocument.placeOrImport(importedFile),
                        callback && callback());
                } catch (error) {
                    console.warn("GImportImageFromIOSAction.prototype.execute", error);
                }
            }),
            (GImportImageFromIOSAction.prototype.toString = function () {
                return "[Object GImportImageFromIOSAction]";
            }),
            (module.exports = GImportImageFromIOSAction));
    };
