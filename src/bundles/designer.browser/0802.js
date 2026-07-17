module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.default = exports.WINDOW_STATUS_BLOCKED = void 0),
            require(58 /* polyfill:Array */),
            require(19),
            require(96 /* polyfill:JSON */),
            require(57),
            require(8 /* Symbol */),
            require(71 /* polyfill:String */),
            require(134 /* polyfill:String */),
            require(4),
            require(41),
            require(13),
            require(38),
            require(97),
            require(26));
        var GObject = require(1),
            AppError = _interopRequireDefault(require(355)),
            GError = _interopRequireDefault(require(594)),
            GFilesPanelConstants = require(858);
        const GDriveSettings = require(1240),
            DriveConstants = require(520),
            { FILE_FORMATS } = require(10 /* designerConfig */);
        exports.WINDOW_STATUS_BLOCKED = "window-blocked";
        function CloudDrive(settings) {
            ((this._settings = settings),
                this.setQueryLimit(10),
                (this._currentFolder = null),
                (this._folders = {}),
                (this._actions = []),
                (this._filterFileTypes = new Set()),
                (this.PREVIOUS_SELECTED_FOLDER_PATH = []),
                this.getPreviousSelectedFolder().then((folder) => {
                    folder && this.setCurrentFolder(folder);
                }));
        }
        (GObject.GObject.inheritAndMix(CloudDrive, GObject.GObject, [GObject.GEventTarget]),
            (CloudDrive.DriveEvent = function (source, type) {
                let data = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                ((this.source = source), (this.type = type), (this.data = data));
            }),
            GObject.GObject.inherit(CloudDrive.DriveEvent, GObject.GEvent),
            (CloudDrive.DriveEvent.type = null),
            (CloudDrive.DriveEvent.source = null),
            (CloudDrive.DriveEvent.data = null),
            (CloudDrive.DriveEvent.Type = {
                Added: 0,
                UserUpdated: 1,
                FolderSwitchRequired: 2,
                FileDeleted: 3,
            }),
            (CloudDrive.ExceptionCode = { InvalidCredentials: 1 }));
        class CloudException extends GError.default {
            constructor(message, code) {
                (super(message), (this.code = code), (this.__proto__ = CloudException.prototype), (this.name = "CloudException"));
            }
            toString() {
                return "[Object CloudException]";
            }
        }
        function getMimeType(fileFormat) {
            return fileFormat.type || fileFormat.mime;
        }
        ((CloudDrive.CloudException = CloudException),
            (CloudDrive.prototype._driveSettings = null),
            (CloudDrive.prototype.setDriveSettings = function (settings) {
                this._driveSettings = GDriveSettings.from(settings);
            }),
            (CloudDrive.prototype.shouldOnlyListOwnedFiles = function () {
                return !!this._driveSettings && this._driveSettings.onlyListFilesOwnedByUser;
            }),
            (CloudDrive.prototype._queryLimit = null),
            (CloudDrive.prototype._currentFolder = null),
            (CloudDrive.prototype.SORT_TYPES = GFilesPanelConstants.GFilesPanelSortTypes),
            (CloudDrive.prototype.FILTER_FILE_TYPES = GFilesPanelConstants.GFilesPanelFileTypesFilter),
            (CloudDrive.prototype._sortType = CloudDrive.prototype.SORT_TYPES.UPDATED),
            (CloudDrive.prototype._filterFileTypes = null),
            (CloudDrive.prototype._sortDirection = GFilesPanelConstants.GFilesPanelSortDirections.DESCEND),
            (CloudDrive.prototype._folders = null),
            (CloudDrive.prototype._corporateStorage = null),
            (CloudDrive.prototype._actions = null),
            (CloudDrive.prototype._defaultEmpyMessage = null),
            (CloudDrive.prototype.CURRENT_FOLDER_PROP = "designer.filespanel.base-drive.current-folder"),
            (CloudDrive.prototype.getUser = function () {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype._driveInstalled = false),
            (CloudDrive.getInstance = function () {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.hasUserProfile = function () {
                return false;
            }),
            (CloudDrive.prototype.getSortType = function () {
                return this._sortType;
            }),
            (CloudDrive.prototype.setSortType = function (sortType) {
                Object.values(this.SORT_TYPES).includes(sortType) && (this._sortType = sortType);
            }),
            (CloudDrive.prototype.getAvailableFileTypesFilter = function () {
                return this._driveSettings && this._driveSettings.supportedFileFilters
                    ? this._driveSettings.supportedFileFilters
                    : this.FILTER_FILE_TYPES;
            }),
            (CloudDrive.prototype.getSelectedFilterForFileTypes = function () {
                return Array.from(this._filterFileTypes);
            }),
            (CloudDrive.prototype.addFileTypeToSelectedFilter = function (fileType) {
                this._isFilterFileTypeSupported(fileType) && this._filterFileTypes.add(fileType);
            }),
            (CloudDrive.prototype.deleteFileTypeFromSelectedFilter = function (fileType) {
                this._isFilterFileTypeSupported(fileType) && this._filterFileTypes.delete(fileType);
            }),
            (CloudDrive.prototype._isFilterFileTypeSupported = function (fileType) {
                return this.getAvailableFileTypesFilter().some((filter) => filter.type === fileType);
            }),
            (CloudDrive.prototype.clearAllFileTypesFromSelectedFilter = function () {
                this._filterFileTypes = new Set();
            }),
            (CloudDrive.prototype.getSortDirection = function () {
                return this._sortDirection;
            }),
            (CloudDrive.prototype.setSortDirection = function (direction) {
                Object.values(GFilesPanelConstants.GFilesPanelSortDirections).includes(direction) && (this._sortDirection = direction);
            }),
            (CloudDrive.prototype.hasMoreItemsToLoad = function () {
                return false;
            }),
            (CloudDrive.prototype.setQueryLimit = function (limit) {
                return ((this._queryLimit = parseInt(limit, 10)), this);
            }),
            (CloudDrive.prototype.isInstalled = function () {
                return this._driveInstalled;
            }),
            (CloudDrive.prototype.install = function (e) {
                return ((this._driveInstalled = true), Promise.resolve());
            }),
            (CloudDrive.prototype.uninstall = function () {
                return ((this._driveInstalled = false), Promise.resolve());
            }),
            (CloudDrive.prototype.getQueryLimit = function () {
                return this._queryLimit;
            }),
            (CloudDrive.prototype.setCurrentFolder = function (folder) {
                return ((this._currentFolder = folder), gContainer.setProperty(this.CURRENT_FOLDER_PROP, JSON.stringify(folder)), this);
            }),
            (CloudDrive.prototype.isFolderSharedWithMeFolder = function (folder) {
                return false;
            }),
            (CloudDrive.prototype.getCurrentFolder = function () {
                return this._currentFolder;
            }),
            (CloudDrive.prototype.fetchFolders = function (sortType) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.isLoadFoldersOnDemandSupported = function () {
                return false;
            }),
            (CloudDrive.prototype.hasFolders = async function () {
                let folder = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                return this.fetchFolders("name", folder, 1).then((folders) => !!folders && folders.length > 0);
            }),
            (CloudDrive.prototype.getFolders = function () {
                return this._folders;
            }),
            (CloudDrive.prototype.createFolder = function (folderName) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.navigateToParentFolder = function () {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.getFile = function (fileId) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.getFolder = function (folderId) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.getRawFile = function (fileId, folder, options) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.openFile = async function (file, options) {
                return new Promise((resolve, reject) => {
                    reject("Not implemented!");
                });
            }),
            (CloudDrive.prototype.saveNewFile = function (file, options) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.fetchFiles = function (sortType, folder, limit) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.fetchRecentFiles = async function () {
                return [];
            }),
            (CloudDrive.prototype.filterSupportedFileFormats = function () {
                let files = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                const supportedTypes = this.getSupportedMIMETypes();
                return files.filter((file) => supportedTypes.includes(file.getMimeType()));
            }),
            (CloudDrive.prototype.renameItem = function (item, newName) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.isItemAllowedToBeRendered = function (item) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.itemRequiresLazyUpdate = async function (item) {
                return false;
            }),
            (CloudDrive.prototype.getItemLazyUpdate = async function (item) {
                return item;
            }),
            (CloudDrive.prototype.isFileAllowedToBeOpened = function (file) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.deleteItem = function (item) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.cutPaste = function (item) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.fileMove = function (file, targetFolder) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.copyPaste = function (item) {
                throw Error("Not implemented!");
            }),
            (CloudDrive.prototype.supportsCorporateStorage = function () {
                return false;
            }),
            (CloudDrive.prototype.setCorporateStorage = async function (storage) {
                this._corporateStorage = storage;
            }),
            (CloudDrive.prototype.initLastCorporateStorage = function (storageIdProperty) {
                let idProperty = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "id";
                const self = this;
                async function resolveStorage(id) {
                    if (!id) return null;
                    const storages = await self.getCorporateStorages();
                    return storages.length ? storages.find((storage) => storage[idProperty] === id) : null;
                }
                async function applyStorage(storage) {
                    self.setCorporateStorage(storage);
                    let previousFolder = await self.getPreviousSelectedFolder();
                    self.setCurrentFolder(previousFolder || self.getRootFolder());
                }
                return storageIdProperty && this.supportsCorporateStorage() ? gContainer.getProperty(storageIdProperty).then(resolveStorage).then(applyStorage) : applyStorage(null);
            }),
            (CloudDrive.prototype.saveLastTeamDriveId = function (propertyName, driveId) {
                if (!propertyName) throw new AppError.default("Invalid arguments for saving last team drive id");
                return (gContainer.setProperty(propertyName, driveId), this);
            }),
            (CloudDrive.prototype.getCorporateStorage = function () {
                return this._corporateStorage;
            }),
            (CloudDrive.prototype.getCorporateStorages = async function () {
                return [];
            }),
            (CloudDrive.prototype.isRootFolder = function (folder) {
                throw new Error("Not implemented!");
            }),
            (CloudDrive.prototype.getRootFolder = function () {
                throw new Error("Not implemented!");
            }),
            (CloudDrive.prototype.supportsSaveCollisionFlow = function () {
                return false;
            }),
            (CloudDrive.prototype.requiresOverwriteCollisionHandling = function () {
                return false;
            }),
            (CloudDrive.prototype.fileExists = async function (fileName, folder, options) {
                throw new Error("Not implemented!");
            }),
            (CloudDrive.prototype.folderExists = function (folderName, parentFolder) {
                throw new Error("Not implemented!");
            }),
            (CloudDrive.prototype.getPreviousSelectedFolder = function () {
                return this.CURRENT_FOLDER_PROP
                    ? gContainer
                          .getProperty(this.CURRENT_FOLDER_PROP)
                          .then(JSON.parse)
                          .catch((error) => {
                              console.log("Current folder is not set", error.message);
                          })
                    : Promise.resolve(null);
            }),
            (CloudDrive.prototype.clearPreviousSelectedFolder = function () {
                return gContainer.removeProperty(this.CURRENT_FOLDER_PROP);
            }),
            (CloudDrive.prototype.getSupportedExtensions = function () {
                return this.getSupportedFileFormats().map((fileFormat) => {
                    let { ext } = fileFormat;
                    return ext.toLowerCase();
                });
            }),
            (CloudDrive.prototype.getSupportedMIMETypes = function () {
                return this.getSupportedFileFormats().map((fileFormat) => getMimeType(fileFormat));
            }),
            (CloudDrive.prototype.filterTypesWithSearchString = function (mimeTypes, searchString) {
                if (!searchString || !mimeTypes) return mimeTypes;
                let extension;
                if (((searchString = searchString.toLowerCase()).startsWith(".") ? (extension = searchString.slice(1)) : searchString.startsWith("*.") && (extension = searchString.slice(2)), !extension)) return mimeTypes;
                const formats = this.getSupportedFileFormats(),
                    matchingExtensions = formats
                        .filter((format) => mimeTypes.includes(getMimeType(format)))
                        .map((format) => format.ext)
                        .filter((ext) => ext.startsWith(extension));
                if (matchingExtensions.length > 0) {
                    return formats.filter((format) => matchingExtensions.includes(format.ext)).map(getMimeType);
                }
                return [];
            }),
            (CloudDrive.prototype.getSupportedFileFormats = function () {
                return this._driveSettings && this._driveSettings.supportedFileFormats ? this._driveSettings.supportedFileFormats : FILE_FORMATS;
            }),
            (CloudDrive.prototype.getDefaultFileFormat = function () {
                return this.getSupportedFileFormats().find((format) => format.default);
            }),
            (CloudDrive.prototype.findFileFormatByExtension = function (extension) {
                return this.getSupportedFileFormats().find((format) => {
                    let { ext: formatExt } = format;
                    return !!formatExt && formatExt.toLowerCase() === extension.toLowerCase();
                });
            }),
            (CloudDrive.prototype.lookupByMimeType = function (mimeType) {
                const normalizedMimeType = mimeType.toLowerCase();
                return this.getSupportedFileFormats().find((format) => {
                    const formatMimeType = getMimeType(format);
                    return !!formatMimeType && formatMimeType.toLowerCase() === normalizedMimeType;
                });
            }),
            (CloudDrive.prototype.getFileFormat = function (file) {
                var format = this.findFileFormatByExtension(file.extension || file.ext);
                return (format || (format = this.lookupByMimeType(file.type)), format);
            }),
            (CloudDrive.prototype.isFileSupported = function (file) {
                return !(
                    !file ||
                    !(
                        this.getSupportedMIMETypes().includes(file.type) ||
                        this.getSupportedMIMETypes().includes(file.mimeType) ||
                        (file.extension && this.getSupportedExtensions().includes(file.extension.toLowerCase()))
                    )
                );
            }),
            (CloudDrive.prototype.canAccessFile = async function () {
                return true;
            }),
            (CloudDrive.prototype.addAction = function (action) {
                this._actions.push(action);
            }),
            (CloudDrive.prototype.getActions = function () {
                return this._actions;
            }),
            (CloudDrive.prototype.setDefaultEmptyMessage = function (message) {
                this._defaultEmpyMessage = message;
            }),
            (CloudDrive.prototype.getDefaultEmptyMessage = function () {
                return this._defaultEmpyMessage;
            }),
            (CloudDrive.prototype.generatePreviousSelectedFolderPath = function () {
                throw new Error("Not implemented!");
            }),
            (CloudDrive.prototype.containsInPreviousPath = function (folder) {
                return this.PREVIOUS_SELECTED_FOLDER_PATH.find((id) => id === folder.getId());
            }),
            (CloudDrive.prototype.resetPreviousSelectedFolderPath = function () {
                this.PREVIOUS_SELECTED_FOLDER_PATH = [];
            }),
            (CloudDrive.prototype.removeLoadedFolderFromPreviousPath = function (folder) {
                this.PREVIOUS_SELECTED_FOLDER_PATH = this.PREVIOUS_SELECTED_FOLDER_PATH.filter((id) => id !== folder.getId());
            }),
            (CloudDrive.prototype.hasTitleValidation = function () {
                return false;
            }),
            (CloudDrive.prototype.getTitleValidator = function () {
                throw Error("NOT IMPLEMENTED");
            }),
            (CloudDrive.prototype.loadExampleFiles = async function () {
                return Promise.resolve([]);
            }),
            (CloudDrive.prototype.isAssetsSharedWithMeFolder = function () {
                return false;
            }),
            (CloudDrive.prototype.getSharedFilesWithMeFolder = function () {
                return null;
            }),
            (CloudDrive.prototype.getDriveIdPropertyName = function () {
                return "id";
            }),
            (CloudDrive.Provider = DriveConstants.Provider));
        exports.default = CloudDrive;
    };
