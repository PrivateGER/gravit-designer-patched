module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(30 /* polyfill:Object */), require(20 /* polyfill:RegExp */), require(271 /* polyfill:String */), require(71 /* polyfill:String */), require(151), require(34), require(91 /* polyfill:String */), require(4), require(32), require(33));
        var Utils = require(40),
            GRegex = _interopRequireDefault(require(263 /* GRegex */));
        const { FILE_ID_PREFIX } = require(10 /* designerConfig */);
        function CloudFile() {
            this._permissions = [];
        }
        ((CloudFile.prototype.parent = null),
            (CloudFile.prototype._previewURL = null),
            (CloudFile.prototype.setPreviewURL = function (url) {
                this._previewURL = url;
            }),
            (CloudFile.prototype.getPreviewURL = function () {
                return this._previewURL;
            }),
            (CloudFile.prototype.getParentId = function () {
                const parent = this.getParent();
                return parent instanceof CloudFile ? parent.getId() : parent;
            }),
            (CloudFile.prototype.getParent = function () {
                return this.parent;
            }),
            (CloudFile.prototype.getId = function () {
                return this.id;
            }),
            (CloudFile.prototype._permissions = null),
            (CloudFile.prototype._itemType = null),
            (CloudFile.prototype.storage = null),
            (CloudFile.prototype.settings = null),
            (CloudFile.prototype.autosave = null),
            (CloudFile.prototype.getStorage = function () {
                return this.storage;
            }),
            (CloudFile.prototype.isAutoSavedVersion = function () {
                return this.autosave;
            }),
            (CloudFile.prototype.getExtension = function () {
                const extension = this.extension || this.ext;
                return (extension && extension.toLowerCase()) || null;
            }),
            (CloudFile.prototype.getNameWithExtension = function () {
                let name = this.getName();
                name = CloudFile.normalizeMultipleDotsEnd(name);
                const dotExtension = ".".concat(this.getExtension());
                return (!name.toLowerCase().endsWith(dotExtension) ? (name += dotExtension) : (name = name.substr(0, name.lastIndexOf(".")) + dotExtension), name);
            }),
            (CloudFile.prototype.getNameWithoutExtension = function () {
                return (0, Utils.getFileNameWithoutExtension)(this.getName(), this.getExtension());
            }),
            (CloudFile.prototype.getName = function () {
                return (this.name && this.name.trim()) || this.name;
            }),
            (CloudFile.prototype.setItemType = function (type) {
                if (!Object.values(CloudFile.Type).includes(type)) throw Error("Invalid type!");
                this._itemType = type;
            }),
            (CloudFile.prototype.getType = function () {
                return this._itemType;
            }),
            (CloudFile.prototype.getPermissions = function () {
                return this._permissions;
            }),
            (CloudFile.prototype.revokePermissions = function () {
                this._permissions = [];
            }),
            (CloudFile.prototype.getIcon = function () {
                return this.icon;
            }),
            (CloudFile.prototype.setMimeType = function (mimeType) {
                this._mimetype = mimeType;
            }),
            (CloudFile.prototype.getMimeType = function () {
                return this._mimetype || this.mimeType || this.type;
            }),
            (CloudFile.prototype.setSize = function (size) {
                this._size = size;
            }),
            (CloudFile.prototype.getSize = function () {
                return this._size;
            }),
            (CloudFile.prototype.hasPermission = function (permission) {
                return this._permissions.includes(permission);
            }),
            (CloudFile.prototype.setPermission = function (permission) {
                let enabled = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (this._permissionSupported(permission)) {
                    if (enabled) this.hasPermission(permission) || this._permissions.push(permission);
                    else if (this.hasPermission(permission)) {
                        var index = this._permissions.indexOf(permission);
                        this._permissions.splice(index, 1);
                    }
                } else console.warn("Permission not supported: " + permission);
            }),
            (CloudFile.prototype.setVersion = function (version) {
                this._version = version;
            }),
            (CloudFile.prototype.getVersion = function () {
                return this._version;
            }),
            (CloudFile.prototype.setModificationTime = function (modificationTime) {
                this._modificationTime = modificationTime;
            }),
            (CloudFile.prototype.getModificationTime = function () {
                return this._modificationTime;
            }),
            (CloudFile.prototype.setPermissions = function (permissions) {
                let enabled = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                permissions.forEach((permission) => this.setPermission(permission, enabled));
            }),
            (CloudFile.prototype._permissionSupported = function (permission) {
                return Object.values(CloudFile.Permission).includes(permission);
            }),
            (CloudFile.from = function (data) {
                var file = new CloudFile();
                return ((file = Object.assign(file, data)).settings && (file.settings = CloudFile.GCloudSettings.from(file.settings)), file);
            }),
            (CloudFile.parseFromJSON = function (json, defaultValue) {
                try {
                    const parsed = JSON.parse(json);
                    return CloudFile.from(parsed);
                } catch (error) {
                    if (!defaultValue && void 0 === defaultValue) throw error;
                    return defaultValue;
                }
            }),
            (CloudFile.Permission = {
                Open: "open",
                Copy: "copy",
                Editing: "editing",
                Rename: "rename",
                CutPaste: "cutPaste",
                Download: "download",
                Delete: "delete",
                UnshareWithMe: "unshareWithMe",
            }),
            (CloudFile.Storage = {
                GoogleDrive: "GOOGLE_DRIVE",
                SharePoint: "SHAREPOINT",
                OneDriveBusiness: "ONEDRIVE_BUSINESS",
                Gravit: "GRAVIT_CLOUD",
            }),
            (CloudFile.Type = {
                Folder: "folder",
                File: "file",
                CorporateStorage: "corporate-storage",
            }),
            (CloudFile.GCloudSettings = function () {}),
            (CloudFile.GCloudSettings.from = function (data) {
                let settings = new CloudFile.GCloudSettings();
                return ((settings = Object.assign(settings, data)), settings);
            }),
            (CloudFile.GCloudSettings.parseFromJSON = function (json, defaultValue) {
                try {
                    const parsed = JSON.parse(json);
                    return CloudFile.GCloudSettings.from(parsed);
                } catch (error) {
                    if (!defaultValue && void 0 === defaultValue) throw error;
                    return defaultValue;
                }
            }),
            (CloudFile.getPrefixIdForStorage = function (storage) {
                switch (storage) {
                    case CloudFile.Storage.Gravit:
                        return "";
                    case CloudFile.Storage.GoogleDrive:
                        return FILE_ID_PREFIX.GOOGLEDRIVE;
                    case CloudFile.Storage.SharePoint:
                        return FILE_ID_PREFIX.SHAREPOINT;
                    case CloudFile.Storage.OneDriveBusiness:
                        return FILE_ID_PREFIX.ONEDRIVEBUSINESS;
                }
                throw new Error("Unsupported storage!");
            }),
            (CloudFile.getFileStorageId = function (file) {
                if (!file.id) return null;
                const prefix = CloudFile.getPrefixIdForStorage(file.storage);
                let id = file.id;
                return (prefix && (id = id.replace("".concat(prefix, "_"), "")), id);
            }),
            (CloudFile.getCollaborativeFileId = function (id, storage) {
                const prefix = CloudFile.getPrefixIdForStorage(storage);
                return "".concat(prefix ? prefix + "_" : "").concat(id);
            }),
            (CloudFile.createOrReturnSelfInstance = function (data) {
                return data instanceof CloudFile ? data : CloudFile.from(data);
            }),
            (CloudFile.getExtensionFromName = function (name) {
                const match = name.match(GRegex.default.String.FileExtension);
                return match ? match[0].slice(1) : null;
            }),
            (CloudFile.normalizeMultipleDotsEnd = function (name) {
                if (name.endsWith(".")) {
                    const match = name.match(GRegex.default.String.MultipleDotsEnd);
                    if (match) return name.slice(0, match.index);
                }
                return name;
            }),
            (module.exports = CloudFile));
    };
