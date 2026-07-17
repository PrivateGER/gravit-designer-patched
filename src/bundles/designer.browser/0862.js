module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.lookupByMimeType =
                exports.lookupByExtension =
                exports.default =
                exports.TYPES =
                exports.FILE_MIME_TYPES =
                exports.FILE_EXTENSIONS =
                exports.DEFAULT_TYPE =
                    void 0),
            require(58 /* polyfill:Array */),
            require(19),
            require(168 /* PDFFetchStream */),
            require(96 /* polyfill:JSON */),
            require(30 /* polyfill:Object */),
            require(57),
            require(8 /* Symbol */),
            require(71 /* polyfill:String */),
            require(4),
            require(41),
            require(13),
            require(32),
            require(38),
            require(169 /* PDFNetworkStream */),
            require(33),
            require(26));
        var GObject = require(1),
            designerConfig = require(10),
            cloudUtil = _interopRequireDefault(require(119 /* GCommonNames */)),
            cloudStorage = _interopRequireDefault(require(220 /* GCloudStorage */)),
            GDocument = _interopRequireDefault(require(163 /* GDocument */)),
            DocumentStatus = _interopRequireDefault(require(86)),
            GDrive = _interopRequireDefault(require(802 /* CloudDrive */)),
            driveUtils = require(593);
        const CloudFile = require(156),
            { FILE_FORMATS, FOLDER_FORMAT, MAX_FOLDER_DEPTH_FOR_CLOUD } = require(10 /* designerConfig */);
        let instance;
        function GCloudDrive() {
            (GDrive.default.apply(this, arguments),
                (this.CURRENT_FOLDER = this.getRootFolder()),
                (this.FOLDERS = {}),
                (this.QUERY_LIMIT = 10),
                (this.EXAMPLE_FILES_CACHE = []),
                this.getPreviousSelectedFolder().then((folder) => {
                    folder && this.setCurrentFolder(folder);
                }),
                this.setDefaultEmptyMessage({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.message-explore-cloud-templates")),
                }));
        }
        (GObject.GObject.inherit(GCloudDrive, GDrive.default),
            (GCloudDrive.prototype.CURRENT_FOLDER_PROP = "designer.filespanel.cloud-drive.current-folder"),
            (GCloudDrive.getInstance = function () {
                return (instance || (instance = new GCloudDrive()), instance);
            }),
            (GCloudDrive.prototype.getPreviousSelectedFolder = function () {
                return GDrive.default.prototype.getPreviousSelectedFolder
                    .apply(this, arguments)
                    .then((folder) => (folder ? this._convertToFolderElement(folder) : folder));
            }),
            (GCloudDrive.prototype.setQueryLimit = function (limit) {
                return ((this.QUERY_LIMIT = parseInt(limit, 10)), this);
            }),
            (GCloudDrive.prototype.setCurrentFolder = function (folder) {
                return ((this.CURRENT_FOLDER = folder), gContainer.setProperty(this.CURRENT_FOLDER_PROP, JSON.stringify(folder)), this);
            }),
            (GCloudDrive.prototype.isRootFolder = function (folder) {
                return !(folder = void 0 !== folder ? folder : this.getCurrentFolder()) || (folder && "object" == typeof folder && !folder.id);
            }),
            (GCloudDrive.prototype.getRootFolder = function () {
                return CloudFile.from({
                    id: null,
                    name: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.my-cloud")),
                });
            }),
            (GCloudDrive.prototype.getFolder = function (folder) {
                return designerConfig.gApi.getFile(folder.id || folder).then((file) => this._convertToFolderElement(file));
            }),
            (GCloudDrive.prototype.getCurrentFolder = function () {
                return this.CURRENT_FOLDER;
            }),
            (GCloudDrive.prototype.buildFoldersHierarchy = function (folders) {
                var result = {},
                    excludedIds = new Set(),
                    foldersByPath = {};
                if (!folders.length) return result;
                for (let t = 0; t < folders.length; t++) {
                    let path = cloudUtil.default.definePath(folders[t]);
                    foldersByPath[path] = folders[t];
                }
                function getAncestorIds(folder) {
                    let visited = new Set();
                    for (; folder && folder.parent; ) {
                        if (folder.id === folder.parent) return (console.warn("Invalid folder"), (folder.parent = null), []);
                        if (visited.has(folder.parent)) return (console.warn("Invalid folder"), (folder.parent = null), []);
                        (visited.add(folder.parent), (folder = foldersByPath[folder.parent]));
                    }
                    return [...visited];
                }
                return (
                    folders.forEach((folder) => {
                        if (excludedIds.has(folder.id)) return;
                        let entry = { path: getAncestorIds(folder), folder: folder };
                        if (entry.path.length > MAX_FOLDER_DEPTH_FOR_CLOUD) for (let e = 0; e < entry.path.length - MAX_FOLDER_DEPTH_FOR_CLOUD; e++) excludedIds.add(entry.path[e]);
                        else result[folder.id] = entry;
                    }),
                    result
                );
            }),
            (GCloudDrive.prototype.isLoadFoldersOnDemandSupported = function () {
                return true;
            }),
            (GCloudDrive.prototype.fetchFolders = async function (sort, folder) {
                let limit = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : -1,
                    skip = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                return (
                    Object.keys(this.FOLDERS).length || (await this._buildFolderStructure(sort)),
                    this.isRootFolder(folder) && this.generatePreviousSelectedFolderPath(),
                    (folder = folder || this.CURRENT_FOLDER),
                    designerConfig.gApi
                        .listFiles({
                            type: FOLDER_FORMAT,
                            parent: this._extractId(folder),
                            sort: sort + "",
                            limit: limit > 0 ? limit : 100,
                            skip: skip,
                        })
                        .then((folders) => this._convertToFolderElement(folders))
                );
            }),
            (GCloudDrive.prototype._convertToFolderElement = function (data) {
                const convert = (raw) => {
                    var item = CloudFile.from(raw);
                    return (
                        item.setItemType(CloudFile.Type.Folder),
                        item.setPermissions([
                            CloudFile.Permission.Open,
                            CloudFile.Permission.Copy,
                            CloudFile.Permission.Editing,
                            CloudFile.Permission.Rename,
                            CloudFile.Permission.CutPaste,
                            CloudFile.Permission.Delete,
                        ]),
                        item
                    );
                };
                return data instanceof Array ? data.map(convert) : convert(data);
            }),
            (GCloudDrive.prototype._buildFolderStructure = async function () {
                let sort = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "asc";
                if (Object.keys(this.FOLDERS).length) return;
                const folders = await designerConfig.gApi.listFiles({
                    type: FOLDER_FORMAT,
                    parent: "*",
                    sort: sort + "",
                    limit: Number.MAX_SAFE_INTEGER,
                });
                ((this.FOLDERS = this.buildFoldersHierarchy(folders)),
                    !this.CURRENT_FOLDER ||
                        this.FOLDERS[this.CURRENT_FOLDER.id] ||
                        this.isRootFolder(this.CURRENT_FOLDER) ||
                        this._isCustomFolder(this.CURRENT_FOLDER) ||
                        this.setCurrentFolder(null));
            }),
            (GCloudDrive.prototype._isCustomFolder = function (e) {
                return false;
            }),
            (GCloudDrive.prototype.getFolders = function () {
                return this.FOLDERS;
            }),
            (GCloudDrive.prototype.createFolder = function (name) {
                return cloudUtil.default.createFolder(name, this.CURRENT_FOLDER);
            }),
            (GCloudDrive.prototype.navigateToParentFolder = function () {
                var parentFolder = this.CURRENT_FOLDER && this.CURRENT_FOLDER.parent ? this.FOLDERS[this.CURRENT_FOLDER.parent].folder : null;
                return (this.setCurrentFolder(parentFolder), this);
            }),
            (GCloudDrive.prototype.getFile = function (fileRef) {
                return designerConfig.gApi.getFile(fileRef, true).then((file) => cloudUtil.default.convertToCloudItem(file));
            }),
            (GCloudDrive.prototype.getRawFile = async function (file, abortSignal, options) {
                const extendedFile = await designerConfig.gApi.getFileExtended(file.id),
                    response = await fetch(extendedFile.getFileDataURL(), { signal: abortSignal });
                return (0, driveUtils.readResponseWithProgress)(response, options.progress, true).then((result) => result.blob());
            }),
            (GCloudDrive.prototype.openFile = function (file, index) {
                return new Promise(async (resolve, reject) => {
                    try {
                        const storageItem = await cloudStorage.default.from(gDesigner.getDefaultStorage(), file, void 0, void 0, file.autosave);
                        (gDesigner.openDocument(storageItem, index), resolve());
                    } catch (error) {
                        reject(error);
                    }
                });
            }),
            (GCloudDrive.prototype.saveNewFile = function (doc, title) {
                let format = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    saveOptions = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    statusCallback = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
                format = format || defaultType.ext.toUpperCase();
                var scene = doc.getScene();
                if (doc.hasPagesWithInfiniteEmptyCanvas())
                    return Promise.reject({
                        message: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas")),
                        dontExtend: true,
                    });
                let view = gDesigner.getWindows().getActiveWindow().getView();
                const zoom = view.getZoom(),
                    scrollX = view.getScrollX(),
                    scrollY = view.getScrollY(),
                    activePage = scene.getActivePage(),
                    referenceId = activePage.getReferenceId(),
                    geometryBBox = scene.getActivePage().getGeometryBBox();
                return designerConfig.gApi
                    .createFile({
                        name: title,
                        parent: this._extractId(this.CURRENT_FOLDER),
                        type: (findByExtension(format) || defaultType).type,
                        app: "designer",
                        unit: scene.getProperty("ut"),
                        width: geometryBBox.getWidth(),
                        height: geometryBBox.getHeight(),
                        trashed: null,
                    })
                    .then(async (newFile) => {
                        newFile.type === defaultType.type && scene.setCloudSynchronization(newFile.id);
                        const isExportFormat = newFile.type !== defaultType.type;
                        (await doc.saveAnnotations(isExportFormat), (saveOptions = doc.updateSaveOptionsLastModifiedDate(saveOptions)));
                        var storageItem = await cloudStorage.default.from(gDesigner.getDefaultStorage(), newFile.id);
                        doc.setStorageItem(storageItem);
                        var newDocument = new GDocument.default(storageItem);
                        return newDocument
                            .deserializeData(GObject.GNode.serialize(scene, saveOptions))
                            .then(
                                async () => (
                                    doc.getFileFormatVersion() && newDocument.setFileFormatVersion(doc.getFileFormatVersion()),
                                    await newDocument.saveAnnotations(isExportFormat, true),
                                    (scene = newDocument.getScene()).iteratePages((page) => {
                                        if (page.getReferenceId() === referenceId) return (scene.setActivePage(page), false);
                                    }),
                                    gDesigner.addDocument(newDocument),
                                    statusCallback ? statusCallback(DocumentStatus.default.Loaded) : gDesigner.removeDocument(doc, null, true),
                                    (view = gDesigner.getWindows().getActiveWindow().getView()),
                                    view.transform(scrollX, scrollY, zoom),
                                    (saveOptions = newDocument.updateSaveOptionsLastModifiedDate(saveOptions)),
                                    GObject.GUtil.prepareForSaving(scene, format),
                                    cloudUtil.default.performSave(
                                        newDocument,
                                        () => {
                                            (newDocument.getFileFormatVersion() &&
                                                newDocument.getStorageItem().storeFileFormatVersion(newDocument.getFileFormatVersion()),
                                                statusCallback && statusCallback(DocumentStatus.default.Saved));
                                        },
                                        () => {
                                            statusCallback && statusCallback(DocumentStatus.default.SaveFailed);
                                        },
                                        saveOptions
                                    ),
                                    doc.isCloudFile() || doc.setTitle(title),
                                    newFile
                                )
                            )
                            .catch(
                                (error) => (
                                    console.error(error),
                                    new Promise((e, reject) => {
                                        reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-saving-file")));
                                    })
                                )
                            );
                    })
                    .catch(
                        (error) => (
                            console.error(error),
                            new Promise((e, reject) => {
                                reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-saving-file")));
                            })
                        )
                    );
            }),
            (GCloudDrive.prototype.fetchRecentFiles = function () {
                const typeFilters = this._getFileTypesForFilter().map((typeFilters) => ({ type: typeFilters }));
                return cloudUtil.default.getRecentStorageItems(typeFilters).then((files) => this._convertAndUpdateCloudItems(files));
            }),
            (GCloudDrive.prototype.fetchFiles = function (searchName, skip, sort) {
                var query = {
                    type: this._getFileTypesForFilter().join("|"),
                    parent: this._extractId(this.CURRENT_FOLDER),
                    limit: this.QUERY_LIMIT + "",
                    skip: skip + "",
                    sort: sort + "",
                };
                return (searchName && ((query.name = searchName), (query.parent = "*")), designerConfig.gApi.listFiles(query).then((files) => this._convertAndUpdateCloudItems(files)));
            }),
            (GCloudDrive.prototype._convertAndUpdateCloudItems = function (data) {
                return cloudUtil.default.convertToCloudItem(data);
            }),
            (GCloudDrive.prototype._getFileTypesForFilter = function () {
                const selectedTypes = this.getSelectedFilterForFileTypes();
                return 0 !== selectedTypes.length ? selectedTypes : this.getSupportedMIMETypes();
            }),
            (GCloudDrive.prototype.renameItem = function (item, name) {
                return designerConfig.gApi.updateFile(item.id, { name: name });
            }),
            (GCloudDrive.prototype.isItemAllowedToBeRendered = function (item) {
                let isRecent = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    isExample = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return !(!isRecent && !isExample) || cloudUtil.default.definePath(this.CURRENT_FOLDER) === item.parent;
            }),
            (GCloudDrive.prototype.deleteItem = function (item) {
                return designerConfig.gApi.updateFile(item.id, { trashed: true }).then(() => designerConfig.gApi.deleteFile(item.id));
            }),
            (GCloudDrive.prototype.cutPaste = function (items) {
                var targetPath = cloudUtil.default.definePath(this.CURRENT_FOLDER);
                return cloudUtil.default.changePathTree(items, targetPath);
            }),
            (GCloudDrive.prototype.fileMove = function (item, targetFolder) {
                return cloudUtil.default.changePathTree([item], targetFolder.id);
            }),
            (GCloudDrive.prototype.copyPaste = function (items) {
                const targetPath = cloudUtil.default.definePath(this.CURRENT_FOLDER);
                return Promise.all(
                    items.map(async (item) => {
                        const { id } = await designerConfig.gApi.copyFile(item.id, { parent: targetPath });
                        return { id: id, parent: targetPath };
                    })
                );
            }),
            (GCloudDrive.prototype.supportsSaveCollisionFlow = function () {
                return true;
            }),
            (GCloudDrive.prototype._extractId = function (folderOrId) {
                return folderOrId ? ("string" == typeof folderOrId ? folderOrId || null : folderOrId.id || null) : null;
            }),
            (GCloudDrive.prototype.fileExists = async function (name, extension, folder) {
                folder = folder || this.CURRENT_FOLDER;
                var query = {
                    type: this.getSupportedFileFormats().find((format) => format.ext.toLocaleLowerCase() === extension.toLocaleLowerCase()).type,
                    parent: this._extractId(folder),
                    name: '"'.concat(name, '"'),
                };
                return designerConfig.gApi.listFiles(query).then((files) => !!files.length);
            }),
            (GCloudDrive.prototype.folderExists = function (name, folder) {
                return (
                    (folder = folder || this.CURRENT_FOLDER),
                    designerConfig.gApi
                        .listFiles({
                            type: FOLDER_FORMAT,
                            parent: this._extractId(folder),
                            name: '"'.concat(name, '"'),
                        })
                        .then((folders) => !!folders.length)
                );
            }),
            (GCloudDrive.prototype.generatePreviousSelectedFolderPath = function () {
                if (!this.PREVIOUS_SELECTED_FOLDER_PATH.length && this.CURRENT_FOLDER) {
                    const entry = this.FOLDERS && this.FOLDERS[this.CURRENT_FOLDER.getId()];
                    if (!entry) return;
                    ((this.PREVIOUS_SELECTED_FOLDER_PATH = this.PREVIOUS_SELECTED_FOLDER_PATH.concat(entry.path)),
                        this.PREVIOUS_SELECTED_FOLDER_PATH.find((id) => id === entry.folder.id) ||
                            this.PREVIOUS_SELECTED_FOLDER_PATH.push(entry.folder.id));
                }
            }),
            (GCloudDrive.prototype.loadExampleFiles = async function () {
                0 === this.EXAMPLE_FILES_CACHE.length && (this.EXAMPLE_FILES_CACHE = await designerConfig.gApi.getExampleFiles().catch(() => []));
                const selectedTypes = this.getSelectedFilterForFileTypes();
                let files = this.EXAMPLE_FILES_CACHE;
                return (
                    0 !== selectedTypes.length && (files = files.filter((file) => this._getFileTypesForFilter().includes(file.type))),
                    files.map((file) => {
                        let item = CloudFile.from(file);
                        return (item.setPermissions([CloudFile.Permission.Open]), item);
                    })
                );
            }));
        exports.default = GCloudDrive;
        const typesMap = (exports.TYPES = Object.assign(
                { FOLDER: FOLDER_FORMAT },
                FILE_FORMATS.reduce((acc, format) => ((acc[format.ext.toUpperCase() + "_FILE"] = format), acc), {})
            )),
            defaultType = (exports.DEFAULT_TYPE = Object.values(typesMap).find((format) => format.default));
        ((exports.FILE_EXTENSIONS = FILE_FORMATS.map((format) => {
            let { ext } = format;
            return ext.toUpperCase();
        })),
            (exports.FILE_MIME_TYPES = FILE_FORMATS.map((format) => {
                let { type } = format;
                return type;
            })));
        exports.lookupByMimeType = (searchMimeType) =>
            Object.values(typesMap).find((format) => {
                let { type: formatType } = format;
                return !!formatType && formatType.toLowerCase() === searchMimeType.toLowerCase();
            });
        const findByExtension = (searchExtension) =>
            Object.values(typesMap).find((format) => {
                let { ext: formatExt } = format;
                return !!formatExt && formatExt.toLowerCase() === searchExtension.toLowerCase();
            });
        exports.lookupByExtension = findByExtension;
    };
