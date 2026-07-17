module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(8 /* Symbol */);
        var GObject = require(1),
            designerConfig = require(10),
            AuthorizationStatus = _interopRequireDefault(require(1091)),
            pako = require(165 /* PDFNodeStream */),
            AlertDialog = require(219),
            String = require(9),
            GLocaleKey = require(47);
        function GStorage() {}
        ((GStorage.Directory = function (storage) {
            this._storage = storage;
        }),
            (GStorage.Directory.prototype._storage = null),
            (GStorage.Directory.prototype.getStorage = function () {
                return this._storage;
            }),
            (GStorage.Directory.prototype.getUniqueId = function () {
                return null;
            }),
            (GStorage.Directory.prototype.addDirectory = async function (name, t) {
                throw new Error("Not implemented.");
            }),
            (GStorage.Directory.prototype.addFile = async function (name, t) {
                throw new Error("Not implemented.");
            }),
            (GStorage.Item = function (storage) {
                this._storage = storage;
            }),
            GObject.GObject.inherit(GStorage.Item, GObject.GObject),
            (GStorage.Item.prototype._storage = null),
            (GStorage.Item.prototype._fileFormatVersion = null),
            (GStorage.Item.prototype.isRegistrable = function () {
                return false;
            }),
            (GStorage.Item.prototype.release = function () {
                this._data && (this._data = null);
            }),
            (GStorage.Item.prototype.getStorage = function () {
                return this._storage;
            }),
            (GStorage.Item.prototype.getUniqueId = function () {
                return null;
            }),
            (GStorage.Item.prototype.getVersionId = function () {
                return null;
            }),
            (GStorage.Item.prototype.getFile = function () {
                return null;
            }),
            (GStorage.Item.prototype.getId = function () {
                return null;
            }),
            (GStorage.Item.prototype.getFullName = function () {
                throw new Error("Not implemented.");
            }),
            (GStorage.Item.prototype.setFileName = function (filename) {
                throw new Error("Not implemented.");
            }),
            (GStorage.Item.prototype.getName = function () {
                var fullName = this.getFullName();
                if (fullName) {
                    var dotIndex = fullName.lastIndexOf(".");
                    return dotIndex >= 0 ? fullName.substr(0, dotIndex) : fullName;
                }
                return null;
            }),
            (GStorage.Item.prototype.getExtension = function () {
                var fullName = this.getFullName();
                if (fullName) {
                    var dotIndex = fullName.lastIndexOf(".");
                    if (dotIndex >= 0) return fullName.substr(dotIndex + 1).toUpperCase();
                }
                return null;
            }),
            (GStorage.Item.prototype.storeFileFormatVersion = async function (version) {
                this._fileFormatVersion = version;
            }),
            (GStorage.Item.prototype.getFileFormatVersion = function () {
                return this._fileFormatVersion;
            }),
            (GStorage.Item.prototype.read = function (callback, t, n) {
                throw new Error("Not implemented.");
            }),
            (GStorage.Item.prototype.write = function (data, callback, quotaErrorCallback, progress, document) {
                throw new Error("Not implemented.");
            }),
            (GStorage.Item.prototype.createOrUpdateFileWithMetadata = async function (fileData, options) {
                throw new Error("Not implemented");
            }),
            (GStorage.Item.prototype.getToken = function () {
                throw new Error("Not implemented");
            }),
            (GStorage.Item.prototype.supportsShadowFile = function () {
                return false;
            }),
            (GStorage.Item.prototype.isEditingEnabled = function () {
                return true;
            }),
            (GStorage.Item.prototype.supportsSharing = function () {
                return false;
            }),
            (GStorage.Item.prototype.hasVersionControl = function () {
                return false;
            }),
            (GStorage.Item.prototype.supportsExternalSharing = function () {
                return false;
            }),
            (GStorage.Item.prototype.supportsExternalSharingByLink = function () {
                return false;
            }),
            (GStorage.Item.prototype.getPermissionsList = function () {}),
            (GStorage.Item.prototype._fileSizeBeforeSaved = 0),
            (GStorage.Item.prototype._fileSizeAfterSaved = 0),
            (GStorage.Item.prototype.documentRealFileSize = 0),
            (GStorage.Item.prototype._fileLastModifiedDate = null),
            (GStorage.Item.prototype._fileAutoSaveLastModifiedDate = null),
            (GStorage.Item.prototype._isSaveCounterMeasureEnabled = false),
            (GStorage.Item.prototype.getFileSizeBeforeSaved = function () {
                return this._fileSizeBeforeSaved;
            }),
            (GStorage.Item.prototype._setFileSizeBeforeSaved = function (size) {
                this._fileSizeBeforeSaved = size;
            }),
            (GStorage.Item.prototype.getFileLastModifiedDate = function () {
                return this._fileLastModifiedDate;
            }),
            (GStorage.Item.prototype.setFileLastModifiedDate = function (date) {
                this._fileLastModifiedDate = date;
            }),
            (GStorage.Item.prototype.getFileAutoSaveLastModifiedDate = function () {
                return this._fileAutoSaveLastModifiedDate;
            }),
            (GStorage.Item.prototype.setFileAutoSaveLastModifiedDate = function (date) {
                this._fileAutoSaveLastModifiedDate = date;
            }),
            (GStorage.Item.prototype._setFileSizeAfterSaved = async function () {
                throw new Error("Not implemented");
            }),
            (GStorage.Item.prototype.getFileSizeAfterSaved = function () {
                return this._fileSizeAfterSaved;
            }),
            (GStorage.Item.prototype.isSaveCounterMeasureEnabled = function () {
                return this._isSaveCounterMeasureEnabled;
            }),
            (GStorage.Item.prototype.setSaveCounterMeasureEnabled = function (enabled) {
                this._isSaveCounterMeasureEnabled = enabled;
            }),
            (GStorage.Item.prototype._verifyFileNotTooSmall = function (size, document) {
                try {
                    (size < designerConfig.UN_BELIVEVABLE_FEW_BYTES_TO_SAVE &&
                        !this.isSaveCounterMeasureEnabled() &&
                        new AlertDialog(String.get(new GLocaleKey("GDocument", "text.saveing-error"))).open(),
                        this.getDocumentRealSizeAfterSave(document));
                } catch (error) {
                    console.error(error);
                }
            }),
            (GStorage.Item.prototype._verifyFileSizeAfterSaved = function () {
                try {
                    (() =>
                        !(this.getFileSizeBeforeSaved() < this.getFileSizeAfterSaved()) &&
                        this.getFileSizeBeforeSaved() / 2 > this.getFileSizeAfterSaved())() &&
                        this.getFileSizeAfterSaved() &&
                        this.getFileSizeAfterSaved() > 0 &&
                        new AlertDialog(String.get(new GLocaleKey("GDocument", "text.saveing-error"))).open();
                } catch (error) {
                    console.error(error);
                }
            }),
            (GStorage.Item.prototype.notEnoughDiskSpace = function () {
                new AlertDialog(String.get(new GLocaleKey("GDocument", "text.save-no-space"))).open();
            }),
            (GStorage.Item.prototype.getDocumentRealSizeAfterSave = function (document) {
                let serializedScene = null;
                document = document || gDesigner.getActiveDocument();
                try {
                    serializedScene = GObject.GNode.serialize(document.getScene(), { save: true, singleton: false });
                } catch (error) {
                    return (console.error(error), (this.documentRealFileSize = 0), this.documentRealFileSize);
                }
                return null === serializedScene || "" === serializedScene
                    ? ((this.documentRealFileSize = 0), this.documentRealFileSize)
                    : ((this.documentRealFileSize = pako.gzip(serializedScene, { level: 9 }).length), this.documentRealFileSize);
            }),
            (GStorage.Item.prototype.hasUpdates = async function () {
                throw Error("Not implemented!");
            }),
            (GStorage.prototype.canChooseDirectory = function () {
                return false;
            }),
            (GStorage.prototype.canPromptOpen = function () {
                return false;
            }),
            (GStorage.prototype.canPromptSave = function () {
                return false;
            }),
            (GStorage.prototype.canSave = function () {
                return false;
            }),
            (GStorage.prototype.canDownload = function () {
                return false;
            }),
            (GStorage.prototype.chooseDirectory = function (successCallback, errorCallback) {
                throw new Error("Not implemented.");
            }),
            (GStorage.prototype.openPrompt = function (filters, callback, multiple, options) {
                throw new Error("Not implemented.");
            }),
            (GStorage.prototype.savePrompt = function (suggestedName, filters, callback, cancelCallback) {
                throw new Error("Not implemented.");
            }),
            (GStorage.prototype.download = function (name, callback) {
                throw new Error("Not implemented.");
            }),
            (GStorage.prototype.storeLastDirectory = function (path) {
                gDesigner.setSetting("lastDirectory", path);
            }),
            (GStorage.prototype.getLastDirectory = function () {
                var separator = GObject.GSystem.operatingSystem === GObject.GSystem.OperatingSystem.Windows ? "\\" : "/";
                if (gDesigner.getSetting("lastDirectory")) return gDesigner.getSetting("lastDirectory");
                if (gDesigner.getActiveDocument() && gDesigner.getActiveDocument().getStorageItem()) {
                    let uniqueId = gDesigner.getActiveDocument().getStorageItem().getUniqueId();
                    return uniqueId.substring(0, uniqueId.lastIndexOf(separator));
                }
                for (var t = 0; t < gDesigner.getDocuments().length; ++t)
                    if (gDesigner.getDocuments()[t].getStorageItem()) {
                        let uniqueId = gDesigner.getDocuments()[t].getStorageItem().getUniqueId();
                        return uniqueId.substring(0, uniqueId.lastIndexOf(separator));
                    }
                return "";
            }),
            (GStorage.prototype.getPlugins = function () {
                return [];
            }),
            (GStorage.prototype.getPluginPath = function (pluginId) {
                return null;
            }),
            (GStorage.prototype.getPluginSrc = function (pluginId) {
                return null;
            }),
            (GStorage.prototype.getWritePermission = async function (destination) {
                return new AuthorizationStatus.default(true);
            }),
            (module.exports = GStorage));
    };
