module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19),
            require(168 /* PDFFetchStream */),
            require(328 /* polyfill:Array */),
            require(180),
            require(181 /* polyfill:ArrayBuffer */),
            require(96 /* polyfill:JSON */),
            require(30 /* polyfill:Object */),
            require(8 /* Symbol */),
            require(356 /* polyfill:RegExp */),
            require(20 /* polyfill:RegExp */),
            require(3),
            require(271 /* polyfill:String */),
            require(34),
            require(851),
            require(91 /* polyfill:String */),
            require(218),
            require(189),
            require(190),
            require(191),
            require(192),
            require(4),
            require(41),
            require(13),
            require(32),
            require(38),
            require(169 /* PDFNetworkStream */),
            require(97),
            require(33),
            require(26));
        var GObject = require(1),
            filesPanelView = require(1546),
            Utils = require(40),
            downloadUtils = require(1154),
            cloudDrives = require(1552),
            GCloudDrive = require(862),
            filePanelConstants = require(858),
            GNewFilePrompt = _interopRequireDefault(require(1556 /* GNewFilePromptDialog */)),
            GDocumentStatus = _interopRequireDefault(require(86)),
            GCloudUtils = _interopRequireDefault(require(119 /* GCommonNames */)),
            GDrive = _interopRequireDefault(require(802 /* CloudDrive */)),
            GDriveSettings = _interopRequireDefault(require(1240)),
            GSaveAsAction = _interopRequireDefault(require(445 /* GSaveAsAction */)),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            AppError = _interopRequireDefault(require(355)),
            designerConfig = require(10),
            configBase = require(519),
            GRepeatActionError = _interopRequireDefault(require(1557));
        const CloudFile = require(156),
            GDocumentEvent = require(78);
        var cloudOptions = designerConfig.CloudIntegration.cloudOptions,
            nativeCloudOption = designerConfig.CloudIntegration.nativeOption,
            allCloudOptions = [...designerConfig.CloudIntegration.cloudOptions, designerConfig.CloudIntegration.nativeOption];
        function GFilesPanel(options) {
            (this._initializeDefaultValues(options), (this._initializingPromise = this._init(options)));
        }
        ((GFilesPanel.prototype._initializingPromise = null),
            (GFilesPanel.prototype._GUISettings = null),
            (GFilesPanel.prototype._cloudSettings = null),
            (GFilesPanel.prototype.view = null),
            (GFilesPanel.prototype.drive = null),
            (GFilesPanel.prototype.MODE = null),
            (GFilesPanel.IMAGES_WAIT_TIMEOUT = 2e4),
            (GFilesPanel.DriveAccountsSettingName = "designer.filespanel.cloud-accounts"),
            (GFilesPanel.DriveAccountsActiveSettingsName = "designer.filespanel.cloud-accounts.active"),
            GObject.GObject.inherit(GFilesPanel, GObject.GObject),
            (GFilesPanel.prototype._showEmptyPanel = false),
            (GFilesPanel.prototype._hasFolders = false),
            (GFilesPanel.prototype._showRecentFiles = false),
            (GFilesPanel.prototype._isSaveMode = false),
            (GFilesPanel.prototype._documentToSave = null),
            (GFilesPanel.prototype._initializeDefaultValues = function (options) {
                var self = this;
                let {
                    closeCallback: closeCallback = Utils.fakeFunction,
                    documentToSave,
                    cancelSave: cancelSave = Utils.fakeFunction,
                    defaultFilename,
                    readyStateChange,
                    showExampleFiles,
                    GUISettings,
                    saveMode,
                    driveSettings: driveSettings = null,
                    isDashboard,
                    isCorporateStoragesEnabled: isCorporateStoragesEnabled = true,
                } = options;
                ((this._GUISettings = GUISettings || new GFilesPanel.GUISettings()),
                    (this._driveSettings = driveSettings || new GDriveSettings.default()),
                    (this.SELECTION = []),
                    (this.TEMP_SELECTION = []),
                    (this.CURRENT_FILE_LOAD = 0),
                    (this.CURRENT_UPDATE_OPERATION_ID = -1),
                    (this.MODE = filePanelConstants.GFilesPanelClipboardModes.DEFAULT),
                    (this.BUILD_IN_PROGRESS = false),
                    (this.DEFAULT_FILENAME = defaultFilename),
                    (this._newClipBoard = false),
                    (this._showExampleFiles = showExampleFiles),
                    (this._isDashboard = isDashboard),
                    (this._isCorporateStoragesEnabled = isCorporateStoragesEnabled),
                    (this.readyStateChange = readyStateChange),
                    (this.search = (0, Utils.debounce)(this.search, 200)));
                var wrapCallback = (callback) =>
                    function () {
                        (self._removeEventListeners(), callback(...arguments));
                    };
                ((this._onCancelSaveCallback = cancelSave && wrapCallback(cancelSave)),
                    (this._onCloseCallback = closeCallback && wrapCallback(closeCallback)),
                    (this._documentToSave = documentToSave),
                    (this._isSaveMode = saveMode || this._documentToSave));
            }),
            (GFilesPanel.prototype._init = async function (options) {
                let { parentComponent, nativeCloud, initCallback } = options;
                return (
                    (this.USER = await gDesigner.getUser()),
                    (this.panel = $("<div/>").addClass("g-files-panel").appendTo(parentComponent)),
                    this.initLayout(nativeCloud)
                        .then(() => {
                            initCallback && initCallback();
                        })
                        .catch((error) => {
                            initCallback && initCallback(error);
                        })
                );
            }),
            (GFilesPanel.GUISettings = function () {
                let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return Object.assign({ dialogControls: true, downloadSourceFile: false }, options);
            }),
            (GFilesPanel.prototype.unmount = function () {
                function removePanel() {
                    this.panel && $(this.panel).remove();
                }
                this._initializingPromise ? this._initializingPromise.then(() => removePanel.call(this)) : removePanel.call(this);
            }),
            (GFilesPanel.isMaximized = () => gContainer.getProperty("GFilesPanel.maximized")),
            (GFilesPanel.isFilesGridListStyle = () => gContainer.getProperty("GFilesPanel.isFilesListStyle")),
            (GFilesPanel.prototype.getContextSource = function () {
                return {
                    toggleLoading: (isLoading) => this.view.toggleLoading(isLoading),
                    update: () => this.updateFilesList(),
                    close: () => {
                        (this.view.toggleLoading(true), this._onCloseCallback());
                    },
                };
            }),
            (GFilesPanel.prototype.initLayout = async function (nativeCloud) {
                ((this.drive = cloudDrives.GCloudDrive.getInstance()),
                    this.drive.setQueryLimit(20),
                    (this.view = new filesPanelView.GFilesPanelViewNative(this.panel, this)),
                    (this.accountSettingsKey = "".concat(GFilesPanel.DriveAccountsSettingName, ".").concat(this.USER.id)));
                var self = this;
                let activeSettings = await gContainer.getProperty(GFilesPanel.DriveAccountsActiveSettingsName);
                return (async function (activeSettingsId) {
                    let cloudSetting,
                        persist = true;
                    (await self.updateCloudSettings(), nativeCloud ? ((persist = false), (cloudSetting = nativeCloudOption)) : (activeSettingsId && (cloudSetting = self.getCloudSettingsById(activeSettingsId)), cloudSetting || (cloudSetting = nativeCloudOption)));
                    try {
                        await self.setCloudDrive(cloudSetting, persist);
                    } catch (e) {
                        await self.setCloudDrive(nativeCloudOption);
                    }
                    ((await GFilesPanel.isFilesGridListStyle()) && self.toListView(),
                        (await GFilesPanel.isMaximized()) && self._maximizeWindow(true),
                        window.addEventListener("resize", self._minimizeWindow.bind(self)));
                })(activeSettings && activeSettings.activeSettingsId);
            }),
            (GFilesPanel.prototype.updateCloudAccountName = function (driveId, newName) {
                var self = this;
                return gContainer
                    .getProperty(self.accountSettingsKey)
                    .then(async function (settingsString) {
                        let index,
                            accounts = settingsString ? self._stringToSettings(settingsString) : [];
                        accounts instanceof Array || (accounts = []);
                        for (let t = 0, count = accounts.length; t < count; t++)
                            if (accounts[t].id === driveId) {
                                index = t;
                                break;
                            }
                        (index > -1 && (accounts[index].name = newName),
                            gContainer.setProperty(self.accountSettingsKey, self._settingsToString(accounts)),
                            await self.updateCloudSettings(),
                            driveId === self.getCurrentDriveId() && self.view.updateTopBar());
                    })
                    .catch((error) => Promise.reject(error));
            }),
            (GFilesPanel.prototype.saveNewCloudAccount = function (account) {
                var self = this;
                return gContainer
                    .getProperty(self.accountSettingsKey)
                    .then(function (settingsString) {
                        let accounts = settingsString ? self._stringToSettings(settingsString) : [];
                        return (
                            accounts instanceof Array || (accounts = []),
                            (account.id = new Date().getTime()),
                            (account.deletable = true),
                            accounts.push(account),
                            gContainer.setProperty(self.accountSettingsKey, self._settingsToString(accounts)),
                            self.updateCloudSettings()
                        );
                    })
                    .catch((error) => Promise.reject(error));
            }),
            (GFilesPanel.prototype.deleteCloudDrive = function (drive) {
                var self = this;
                return gContainer
                    .getProperty(self.accountSettingsKey)
                    .then(async function (settingsString) {
                        let index,
                            accounts = settingsString ? self._stringToSettings(settingsString) : [];
                        accounts instanceof Array || (accounts = []);
                        for (let t = 0, count = accounts.length; t < count; t++)
                            if (accounts[t].id === drive.id) {
                                index = t;
                                break;
                            }
                        (index > -1 && accounts.splice(index, 1),
                            accounts.length > 0
                                ? gContainer.setProperty(self.accountSettingsKey, self._settingsToString(accounts))
                                : gContainer.removeProperty(self.accountSettingsKey));
                        try {
                            if ("googledrive" === drive.type) {
                                var googleDrive = new cloudDrives.GGoogleDrive();
                                (await googleDrive.install(), await googleDrive.uninstall());
                            }
                            gDesigner.removeExternalRecentFiles(drive.type, drive.id);
                        } catch (error) {
                            console.log(error);
                        }
                        return self.updateCloudSettings();
                    })
                    .catch((error) => Promise.reject(error));
            }),
            (GFilesPanel.prototype.handleNewFolder = function (callback) {
                var self = this;
                let submitting = false;
                (gDesigner.stats("filespanel_create_cloudfolder"), this.view.toggleLoading(true));
                let o = 0;
                const promptCreateFolder = (initialName) => {
                    if ((o++, o > configBase.MAX_FOLDER_DEPTH_FOR_CLOUD))
                        return (
                            (submitting = false),
                            self.view.toggleLoading(false),
                            void GSystemDialog.default.alert(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-creating-folder")))
                        );
                    let validator = {};
                    (self.drive.hasTitleValidation() && (validator = self.drive.getTitleValidator()),
                        new GNewFilePrompt.default(
                            async function (folderName) {
                                if (((folderName = folderName.trim()), self.view.toggleLoading(true), self.drive.supportsSaveCollisionFlow())) {
                                    if (
                                        (await self.drive.folderExists(folderName, self.drive.getCurrentFolder())) &&
                                        !(await ((confirmName = folderName),
                                        new Promise((resolve) => {
                                            GSystemDialog.default.confirm(
                                                GObject.GLocale.get(
                                                    new GObject.GLocaleKey("GFilesPanel", "text.folder-already-exists-on-current-location")
                                                ).replace("%foldername", '"'.concat(confirmName, '"')),
                                                (confirmed) => resolve(!!confirmed),
                                                null,
                                                null,
                                                true,
                                                true,
                                                true
                                            );
                                        })))
                                    )
                                        return promptCreateFolder(folderName);
                                    if (self.drive.requiresOverwriteCollisionHandling()) {
                                        for (var r = 0, candidateName = folderName; await self.drive.folderExists(candidateName, self.drive.getCurrentFolder()); )
                                            candidateName = "".concat(folderName, " (").concat(++r, ")");
                                        folderName = candidateName;
                                    }
                                }
                                var confirmName;
                                ((submitting = true),
                                    self.drive
                                        .createFolder(folderName)
                                        .then(() => {
                                            (self.view.toggleLoading(false), callback ? callback() : self.updateFilesList());
                                        })
                                        .catch((error) => {
                                            if ((self.view.toggleLoading(false), error && error.badName))
                                                return (
                                                    GSystemDialog.default.alert(error.message),
                                                    setTimeout(() => {
                                                        promptCreateFolder(folderName);
                                                    })
                                                );
                                            ((submitting = false),
                                                console.error(error),
                                                GSystemDialog.default.alert(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-creating-folder"))
                                                ));
                                        }));
                            },
                            function () {
                                submitting || self.view.toggleLoading(false);
                            },
                            "primary",
                            initialName,
                            validator
                        ).open());
                };
                return (promptCreateFolder(), this);
            }),
            (GFilesPanel.prototype.handleMaximizePanel = function () {
                return (this._maximizeWindow(), gDesigner.stats("filespanel_maximize_cloudfile"), this);
            }),
            (GFilesPanel.prototype.handleMinimizePanel = function () {
                return (this._minimizeWindow(), gDesigner.stats("filespanel_minimize_cloudfile"), this);
            }),
            (GFilesPanel.prototype.handleClosePanel = function () {
                return (
                    this.panel.closest(".g-dialog-container").mousedown(),
                    this._removeEventListeners(),
                    gDesigner.stats("filespanel_close_cloudfile"),
                    this
                );
            }),
            (GFilesPanel.prototype.handleDelete = function () {
                this.logStatsForCurrentFilesSelection("filespanel_delete_cloud", "filespanel_delete_cloud-multiple");
                var self = this;
                return (
                    GSystemDialog.default.confirm(
                        GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.delete-confirm")),
                        function (confirmed) {
                            confirmed && self.deleteSelection();
                        }.bind(this),
                        null,
                        GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.delete-button")),
                        false,
                        true,
                        true
                    ),
                    this
                );
            }),
            (GFilesPanel.prototype.handleCancelSave = function () {
                return (gDesigner.stats("filespanel_cancelsave_cloud"), this._onCancelSaveCallback(), this);
            }),
            (GFilesPanel.prototype.handleSave = async function (fileName, extension) {
                let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                extension || (extension = this.getDefaultExtensionForSave());
                const confirmOverwrite = (fileName) =>
                    new Promise((resolve) => {
                        GSystemDialog.default.confirm(
                            GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.file-already-exists-on-current-location")).replace(
                                "%filename",
                                '"'.concat(fileName, '"')
                            ),
                            (confirmed) => resolve(!!confirmed),
                            null,
                            null,
                            false,
                            true,
                            true
                        );
                    });
                if (
                    (this.view.toggleLoading(true),
                    gDesigner.stats("filespanel_save_cloudfile", extension),
                    (fileName = (0, Utils.removeAllSuffixWhichLikeExtension)(fileName, extension)).trim())
                ) {
                    try {
                        if (this.drive.supportsSaveCollisionFlow()) {
                            if ((await this.drive.fileExists(fileName, extension, this.drive.getCurrentFolder())) && !(await confirmOverwrite(fileName)))
                                return (this.view.toggleLoading(false), void this.view.focusFileNameInput({ name: fileName }));
                            if (this.drive.requiresOverwriteCollisionHandling()) {
                                for (var a = 0, candidateName = fileName; await this.drive.fileExists(candidateName, extension, this.drive.getCurrentFolder()); )
                                    candidateName = "".concat(fileName, " (").concat(++a, ")");
                                fileName = candidateName;
                            }
                        }
                        await this._triggerNewFileSave(fileName, extension, options);
                    } catch (error) {
                        if (error && error.badName) return (this.view.toggleLoading(false), void GSystemDialog.default.alert(error.message));
                        this.getDocumentToSave() && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.SynchronismUpdateFailed, this.getDocumentToSave()));
                        let errorMessage = GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-saving-file"));
                        (error && error.message && error.dontExtend
                            ? (errorMessage = error.message)
                            : error && error.message
                              ? (errorMessage = "".concat(errorMessage, "<br />").concat(error.message))
                              : error && (errorMessage = "".concat(errorMessage, "<br />").concat(error)),
                            GSystemDialog.default.alert(errorMessage),
                            console.error(error));
                    }
                    this._onCloseCallback(true);
                } else
                    GSystemDialog.default.alert(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.please-inform-valid-file-name")), () => {
                        (this.view.toggleLoading(false),
                            this.view.focusFileNameInput({
                                name: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.untitled")),
                            }));
                    });
                return this;
            }),
            (GFilesPanel.prototype._setFileNameInputValue = function (fileName) {
                this.view.setFileNameInputValue(fileName);
            }),
            (GFilesPanel.prototype._triggerNewFileSave = async function (fileName, extension, options) {
                await this.drive.saveNewFile(this.getDocumentToSave(), fileName, extension, options, this.readyStateChange);
            }),
            (GFilesPanel.prototype._triggerFileOpen = async function (file) {
                await this.drive.openFile(file);
            }),
            (GFilesPanel.prototype._triggerFileDeleted = async function (file) {}),
            (GFilesPanel.prototype._triggerFileRenamed = async function (file) {}),
            (GFilesPanel.prototype.setKeyListener = function (callback) {
                return (
                    this._handleKeyPress && document.removeEventListener("keypress", this._handleKeyPress),
                    (this._handleKeyPress = (event) => {
                        var keyCode = event.which || event.keyCode;
                        callback(keyCode, event);
                    }),
                    document.addEventListener("keypress", this._handleKeyPress),
                    this
                );
            }),
            (GFilesPanel.prototype.getDefaultSaveFormat = function () {
                return this.drive.getDefaultFileFormat();
            }),
            (GFilesPanel.prototype.handleBack = function () {
                if ((gDesigner.stats("filespanel_go-to-parent_cloudfolder"), this.drive.getCurrentFolder())) {
                    (this.view.toggleLoading(true), this.drive.navigateToParentFolder());
                    var folder = this.drive.getCurrentFolder();
                    (this.view.manageOpenFolder(null, folder), this.view.resetSelection());
                }
                return (this.updateFilesList(true, false), this);
            }),
            (GFilesPanel.prototype.navigateToRoot = function () {
                let updateList = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return (
                    gDesigner.stats("filespanel_go-to-root_cloudfolder"),
                    this.drive.isRootFolder() ||
                        (this.view.toggleLoading(true),
                        this.drive.setCurrentFolder(this.drive.getRootFolder()),
                        this.navigateToFolder(this.drive.getRootFolder(), updateList),
                        this.view.manageOpenFolder(null, this.drive.getRootFolder()),
                        this.view.resetSelection()),
                    this
                );
            }),
            (GFilesPanel.prototype.handleSaveAs = function (extension, saveOptions, version) {
                (gDesigner.stats("filespanel_download_file", extension),
                    this._onCancelSaveCallback(),
                    gDesigner.executeAction("".concat(GSaveAsAction.default.ID, ".").concat(extension.toLowerCase()), [null, null, null, saveOptions, version], void 0, true));
            }),
            (GFilesPanel.prototype.handleDownload = function () {
                return (gDesigner.stats("filespanel_download_multiple-files"), this.downloadSelectedFiles(GCloudDrive.DEFAULT_TYPE), this);
            }),
            (GFilesPanel.prototype.handleFileDblClick = function (file) {
                return (
                    file.hasPermission(CloudFile.Permission.Open) && !this.isSaveMode()
                        ? (gDesigner.stats("filespanel_open_cloudfile"), this.openFile(file))
                        : file.hasPermission(CloudFile.Permission.Rename) &&
                          (gDesigner.stats("filespanel_focus_filename-input"), this.view.focusFileNameInput(file)),
                    this
                );
            }),
            (GFilesPanel.prototype.handleFileClick = function (item, element) {
                return (gDesigner.stats("filespanel_select_cloudfile"), this.view.manageSelection(element, item), this);
            }),
            (GFilesPanel.prototype.handleParentClose = function () {
                return (this._removeEventListeners(), this.view && this.view.handleParentClose(), this);
            }),
            (GFilesPanel.prototype.openFile = async function (file) {
                file.example && gDesigner.stats("filespanel_open_examplefile", file.name);
                if (await this.drive.canAccessFile(file).catch((e) => false))
                    try {
                        (this._triggerFileOpen(file), this._onCloseCallback());
                    } catch (error) {
                        (console.log(error.stack), GSystemDialog.default.alert(error.message), this.updateFilesList());
                    }
                else GSystemDialog.default.alert(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.file-can-not-be-accessed-missing-permissions")));
            }),
            (GFilesPanel.prototype.handleFolderClick = function (folder, element) {
                return (
                    gDesigner.stats("filespanel_open_cloudfolder"),
                    this.view.resetSelection(),
                    this.navigateToFolder(folder),
                    this.view.manageOpenFolder(element, folder),
                    this
                );
            }),
            (GFilesPanel.prototype.manageSelection = function (item, element) {
                return (gDesigner.stats("filespanel_select_cloudfolder"), this.view.manageSelection(element, item), this);
            }),
            (GFilesPanel.prototype.renameItem = async function (item, newName) {
                return this.drive.renameItem(item, newName);
            }),
            (GFilesPanel.prototype._removeEventListeners = function () {
                (document.removeEventListener("keypress", this._handleKeyPress),
                    window.removeEventListener("resize", this._minimizeWindow.bind(this)));
            }),
            (GFilesPanel.prototype._getFullPathNames = function (item) {
                var folders = this.drive.getFolders(),
                    pathNames = [item.name];
                let folder, folderEntry;
                if (!folders) return pathNames;
                for (; item.parent && ((folderEntry = folders[item.parent]), folderEntry) && ((folder = folderEntry.folder), folder.name); ) (pathNames.unshift(folder.name), (item = folder));
                return pathNames;
            }),
            (GFilesPanel.prototype.addFile = function (item, isRecent, isExample, isLazyUpdate) {
                this.view.addFile(this.updateCloudItemForUserPermission(item), isRecent, isExample, isLazyUpdate);
            }),
            (GFilesPanel.prototype._convertBlob = function (blob, formatInfo, downloadOptions) {
                return Promise.resolve(blob);
            }),
            (GFilesPanel.prototype.downloadFile = function (file, format) {
                let downloadOptions = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    downloadSource = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                if (downloadSource) {
                    if (!(format = this.drive.getFileFormat(file)))
                        return wrapDownload(Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.file-not-supported"))));
                } else format || (format = this.drive.getFileFormat(file) || GCloudDrive.DEFAULT_TYPE);
                var { ext, type, mime, version } = format;
                type = type || mime;
                const downloadPromise = this._triggerFileDownload(file, downloadOptions, ext, type, version);
                function wrapDownload(promise) {
                    return { promise: promise, file: file, cancel: () => downloadOptions.cancel && downloadOptions.cancel() };
                }
                return wrapDownload(downloadPromise);
            }),
            (GFilesPanel.prototype._triggerFileDownload = function (file, downloadOptions, ext, type, version) {
                const abortController = new AbortController(),
                    signal = abortController.signal;
                return (
                    (downloadOptions.progress = downloadOptions.progress || (() => {})),
                    this.drive
                        .getRawFile(file, signal, downloadOptions)
                        .then(async (rawFile) => {
                            let downloadError,
                                blob = rawFile;
                            if (
                                ((downloadOptions.cancel = (0, Utils.chaining)(downloadOptions.cancel, () => abortController.abort())),
                                file.type !== type
                                    ? ((blob = await this._convertBlob(blob, { ext: ext, type: type, version: version }, downloadOptions).catch((error) => (downloadError = error || true))),
                                      blob || (downloadError = new Error("Unsupported mime type: #".concat(file.type))))
                                    : type === GCloudDrive.DEFAULT_TYPE.type &&
                                      ((blob = await this._repackNativeBlob(blob, downloadOptions).catch((error) => (downloadError = error || true))),
                                      blob || downloadError || (downloadError = new Error("Error fetching file contents for download"))),
                                downloadError)
                            ) {
                                if (downloadError instanceof Error) throw downloadError;
                                throw new Error("Error fetching file contents for download");
                            }
                            {
                                downloadOptions.done && downloadOptions.done();
                                let fileName = file.name || rawFile.name;
                                (fileName.endsWith(".".concat(ext)) && (fileName = fileName.replace(new RegExp(".".concat(ext, "$")), "")),
                                    (0, downloadUtils.downloadDataURI)(blob, fileName, ext, { type: type }));
                            }
                        })
                        .catch((error) => {
                            if ((downloadOptions.failed && downloadOptions.failed(), error)) {
                                if ((console.error(error), error instanceof Error)) throw error;
                                throw new Error("Error fetching file contents for download");
                            }
                        })
                );
            }),
            (GFilesPanel.prototype._repackNativeBlob = function (blob) {
                let downloadOptions = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new Promise(async (resolve, reject) => {
                    const fileReader = new FileReader();
                    ((fileReader.onload = async function () {
                        const bytes = new Uint8Array(this.result),
                            node = GObject.GNode.deserialize(GCloudUtils.default.unzipData(bytes), gDesigner.getWorkspace());
                        var cancelState = { cancelled: false };
                        ((downloadOptions.cancel = (0, Utils.chaining)(downloadOptions.cancel, () => (cancelState.cancelled = true))),
                            await (0, Utils.resolveDocumentImages)(node, GFilesPanel.IMAGES_WAIT_TIMEOUT, cancelState).catch(() => {
                                cancelState.cancelled
                                    ? reject()
                                    : reject(
                                          new Error(
                                              GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.file-no-images-cannot-be-processed"))
                                          )
                                      );
                            }));
                        var serialized = GObject.GNode.serialize(node, { save: true });
                        (null === serialized || "" === serialized || serialized.length < 1 || cancelState.cancelled) && reject();
                        var gzipped = new Uint8Array(pako.gzip(serialized, { level: 9 }).buffer);
                        gzipped.byteLength > 20 ? resolve(gzipped) : reject();
                    }),
                        (fileReader.onerror = reject),
                        fileReader.readAsArrayBuffer(blob));
                });
            }),
            (GFilesPanel.prototype.downloadSelectedFiles = async function () {
                let { ext: ext, type: type } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : GCloudDrive.DEFAULT_TYPE,
                    downloadSource = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    version = arguments.length > 2 ? arguments[2] : void 0;
                if (this.SELECTION.length < 1) return;
                const accessResults = await Promise.all(
                        this.SELECTION.map(
                            async (file) =>
                                this.drive.isFileSupported(file) &&
                                (await this.drive.canAccessFile(file).catch((error) => (console.error("drive.canAccessFile error", error), false)))
                        )
                    ),
                    accessibleFiles = this.SELECTION.filter((e, index) => !!accessResults[index]);
                await this._triggerSelectedFilesDownload(accessibleFiles, ext, type, downloadSource, version);
            }),
            (GFilesPanel.prototype._triggerSelectedFilesDownload = async function (files, ext, type, downloadSource, version) {
                const progressList = files.map(() => 0),
                    fileCount = files.length,
                    percentPerFile = 100 / fileCount,
                    statusInfo = {};
                let document = gDesigner.getActiveDocument();
                (document || (document = gDesigner.newInfiniteDocument()),
                    document.updateStatus(GDocumentStatus.default.Downloading, statusInfo),
                    statusInfo.text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.downloading-files")), true),
                    statusInfo.progressInfo("0/".concat(fileCount)));
                let u = 0,
                    cancelled = false;
                const onDone = () => statusInfo.progressInfo("".concat(++u, "/").concat(fileCount)),
                    onFailed = () => statusInfo.progressInfo("".concat(++u, "/").concat(fileCount)),
                    onCancel = () => (cancelled = true),
                    downloads = files.map((file, index) => {
                        var useSource = downloadSource;
                        !useSource && this.fileRequiresSourceDownload(file) && (useSource = true);
                        var fileFormat = {
                            ext: ((useSource && (file.extension || file.ext)) || ext).toLowerCase(),
                            type: (useSource && ((file instanceof CloudFile && file.getMimeType()) || file.type)) || type,
                            version: version,
                        };
                        return this.downloadFile(
                            file,
                            fileFormat,
                            {
                                progress(percent) {
                                    progressList[index] = percent;
                                    const t = progressList.reduce((e, t) => e + Math.min(t / 100, 1) * percentPerFile, 0);
                                    statusInfo.progress(t);
                                },
                                done: onDone,
                                failed: onFailed,
                                cancel: onCancel,
                            },
                            downloadSource
                        );
                    });
                (downloads.length && (this._onCancelSaveCallback(), gDesigner.closeNewDocumentDialog()),
                    document.initCancelHandler(() => {
                        try {
                            downloads.forEach((download) => download.cancel());
                        } finally {
                            document.updateStatus(GDocumentStatus.default.DownloadCancelled);
                        }
                    }));
                const results = await Promise.all(
                    downloads.map((download) => {
                        let { file, promise } = download;
                        return promise.catch((error) => Object.create({ file: file, status: "rejected", error: error }));
                    })
                );
                if (cancelled) return void document.updateStatus(GDocumentStatus.default.DownloadCancelled);
                const failedResults = results.filter((result) => result && "rejected" === result.status);
                failedResults.length
                    ? (document.updateStatus(GDocumentStatus.default.DownloadFailed),
                      GSystemDialog.default.alert(
                          $("<div/>")
                              .addClass("error-download-multiple-files")
                              .append(
                                  $("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-download-multiple-files")))
                              )
                              .append(
                                  $("<ul/>").append(
                                      failedResults.map((result) => {
                                          let { file: file, error: { message: message = "" } = {} } = result;
                                          return $("<li/>").html("".concat(file.name).concat(message ? ": " + message : ""));
                                      })
                                  )
                              )
                      ))
                    : document.updateStatus(GDocumentStatus.default.Downloaded);
            }),
            (GFilesPanel.prototype.navigateToFolder = function (folder) {
                let updateList = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                const beforeFilter = this.getAvailableFileTypesFilter();
                this._navigateDriveToUserFolderOrRoot(folder);
                const afterFilter = this.getAvailableFileTypesFilter();
                (this._clearFileFiltersInCaseAvailableFiltersDoesNotMatch(beforeFilter, afterFilter), updateList && this.updateFilesList(true, false));
                var selectionIndex = this.SELECTION.indexOf(folder);
                selectionIndex > -1 && this.SELECTION.splice(selectionIndex, 1);
                var tempSelectionIndex = this.TEMP_SELECTION.indexOf(folder);
                (tempSelectionIndex > -1 && this.TEMP_SELECTION.splice(tempSelectionIndex, 1), this.SELECTION.length < 1 && this.view.resetSelection());
            }),
            (GFilesPanel.prototype._clearFileFiltersInCaseAvailableFiltersDoesNotMatch = function (beforeFilter, afterFilter) {
                GObject.GUtil.equals(beforeFilter, afterFilter, true) || this.clearAllFileTypesFromSelectedFilter();
            }),
            (GFilesPanel.prototype._navigateDriveToUserFolderOrRoot = function (folder) {
                (this._isUserAllowedToOpenTheFolder(folder) || (folder = this.drive.getRootFolder()), this.drive.setCurrentFolder(folder));
            }),
            (GFilesPanel.prototype._isUserAllowedToOpenTheFolder = function (folder) {
                return true;
            }),
            (GFilesPanel.prototype.addFolder = function (folder) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.view.addFolder(this.updateCloudItemForUserPermission(folder), t);
            }),
            (GFilesPanel.prototype.addCustomFolder = function (folder) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.view.addCustomFolder(this.updateCloudItemForUserPermission(folder), t);
            }),
            (GFilesPanel.prototype.getSort = function () {
                let sort = this.getCurrentAscend() ? "" : "-";
                return ((sort += this.getCurrentSortType()), sort);
            }),
            (GFilesPanel.prototype.hasMoreItemsToLoad = function () {
                return -1 !== this.CURRENT_FILE_LOAD || this.drive.hasMoreItemsToLoad();
            }),
            (GFilesPanel.prototype._sortFilesByMimeType = function (files) {
                if (0 === this.drive.getSelectedFilterForFileTypes().length) return files;
                return (function (files) {
                    let groups = {};
                    files.forEach((file) => {
                        let mimeType = file.getMimeType();
                        ((groups[mimeType] = groups[mimeType] || []), groups[mimeType].push(file));
                    });
                    let sorted = [];
                    return (
                        Object.values(groups).forEach((group) => {
                            sorted = sorted.concat(group);
                        }),
                        sorted
                    );
                })(files);
            }),
            (GFilesPanel.prototype._displayRecentFiles = async function () {
                let recentFiles;
                if (this.isRootFolder() && !this._showExampleFiles)
                    try {
                        ((recentFiles = await this.drive.fetchRecentFiles()),
                            (recentFiles = this._sortFilesByMimeType(recentFiles)),
                            recentFiles &&
                                (this.view.toggleRecentFiles(!!recentFiles && recentFiles.length > 0),
                                recentFiles.forEach((file) => {
                                    (this.drive.isItemAllowedToBeRendered(file, true) && this.addFile(file, true),
                                        this.drive.itemRequiresLazyUpdate(file).then((needsUpdate) => {
                                            needsUpdate &&
                                                this.drive.getItemLazyUpdate(file).then((updatedFile) => {
                                                    this.addFile(updatedFile, true, false, true);
                                                });
                                        }));
                                })));
                    } catch (e) {
                        throw new Error(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-fetching-files")));
                    } finally {
                        this._showRecentFiles = !!recentFiles && recentFiles.length > 0;
                    }
                else this._showRecentFiles = false;
            }),
            (GFilesPanel.prototype.buildDepth = async function (full) {
                let includeFolders = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (!gDesigner.getApplicationManager().isOpenFromCloudEnabled()) return (this.view.toggleLoading(false), Promise.reject());
                var self = this;
                if (this.BUILD_IN_PROGRESS) return Promise.reject(new GRepeatActionError.default());
                async function loadPage(full) {
                    let success = true;
                    try {
                        var loadedCount,
                            items = [];
                        let sortValue = self.getSort();
                        var searchValue = self.view.getSearchValue();
                        if (searchValue) {
                            if (self.hasMoreItemsToLoad()) {
                                try {
                                    items = await self.drive.fetchFiles(searchValue, self.CURRENT_FILE_LOAD, sortValue);
                                } catch (e) {
                                    throw new Error(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-fetching-files")));
                                }
                                ((loadedCount = (items = self._sortFilesByMimeType(items)).length), self._updateCurrentFileLoad(loadedCount));
                            }
                            (items.forEach((item) => {
                                ((item._rootPath = "/ ".concat(self._getFullPathNames(item).join(" / "))),
                                    self.addFile(item),
                                    self.drive.itemRequiresLazyUpdate(item).then((needsUpdate) => {
                                        needsUpdate &&
                                            self.drive.getItemLazyUpdate(item).then((updatedItem) => {
                                                self.addFile(updatedItem, false, false, true);
                                            });
                                    }));
                            }),
                                full && self._buildFolder(includeFolders));
                        } else {
                            if (self.hasMoreItemsToLoad() && !self._showExampleFiles) {
                                try {
                                    ((await self.drive.getPreviousSelectedFolder()) || (success = false),
                                        (loadedCount = (items = await self.drive.fetchFiles(null, self.CURRENT_FILE_LOAD, sortValue)).length),
                                        self.isSaveMode() || self._isDashboard || (items = items.concat(await self.drive.loadExampleFiles())),
                                        (items = self._sortFilesByMimeType(items)));
                                } catch (e) {
                                    if (
                                        (console.error(e),
                                        !(e instanceof GDrive.default.CloudException && e.code === GDrive.default.ExceptionCode.InvalidCredentials))
                                    ) {
                                        const errorMessage =
                                            e && e.message
                                                ? e.message
                                                : GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-fetching-files"));
                                        throw new AppError.default(errorMessage);
                                    }
                                    (await self.setCloudDrive(nativeCloudOption),
                                        (loadedCount = (items = await self.drive.fetchFiles(null, self.CURRENT_FILE_LOAD, sortValue)).length),
                                        self.isSaveMode() || self._isDashboard || (items = items.concat(await self.drive.loadExampleFiles())),
                                        (items = self._sortFilesByMimeType(items)));
                                }
                                self._updateCurrentFileLoad(loadedCount);
                            }
                            if (
                                (await self._displayRecentFiles(),
                                full &&
                                    ((self._showEmptyPanel =
                                        !self._showExampleFiles &&
                                        !!self.drive.getDefaultEmptyMessage() &&
                                        self.isRootFolder() &&
                                        !self._showRecentFiles &&
                                        0 === loadedCount &&
                                        !((await self.drive.hasFolders()) && !self.isRootFolder())),
                                    self._showExampleFiles && (items = await self.drive.loadExampleFiles()),
                                    0 === items.length && (self._showEmptyPanel = false),
                                    self._buildFolder(includeFolders)),
                                self.view.removeExampleFiles(),
                                items.forEach((item) => {
                                    ((self.drive.isItemAllowedToBeRendered(item) || self._showExampleFiles) &&
                                        self.addFile(item, false, self._showExampleFiles || self._showEmptyPanel),
                                        self.drive.itemRequiresLazyUpdate(item).then((needsUpdate) => {
                                            needsUpdate &&
                                                self.drive.getItemLazyUpdate(item).then((updatedItem) => {
                                                    self.addFile(updatedItem, false, self._showExampleFiles, true);
                                                });
                                        }));
                                }),
                                self.view.toggleRecentFiles(self._showRecentFiles),
                                self.view.toggleExampleFiles(self._showExampleFiles),
                                1 === self.SELECTION.length && full)
                            )
                                self.view.scrollToSelectedElement(self.SELECTION[0]) || self.view.resetSelection();
                        }
                        self.view.updateControls(full);
                    } catch (e) {
                        return (
                            console.error(e),
                            GSystemDialog.default.alert(
                                ""
                                    .concat(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed")), ":<br />")
                                    .concat((e && e.message) || e || "")
                            ),
                            self.view.toggleLoading(false),
                            Promise.reject()
                        );
                    }
                    return (
                        self.view.toggleLoading(false),
                        self.view.shouldFilesBeRequested() && self.hasMoreItemsToLoad() && (await loadPage(false)),
                        Promise.resolve(success)
                    );
                }
                if ((this.view.toggleLoading(true), this.hasMoreItemsToLoad())) {
                    this.BUILD_IN_PROGRESS = true;
                    try {
                        const success = await loadPage(full);
                        if ((self.view.toggleFolders(self._hasFolders && !self._showExampleFiles), includeFolders && success)) {
                            var previousFolder = await self.drive.getPreviousSelectedFolder();
                            previousFolder &&
                                !self.drive.isRootFolder(previousFolder) &&
                                (await self.view.navigateToFolder(previousFolder).catch(() => self.view.navigateToFolder(self.drive.getRootFolder())));
                        }
                    } finally {
                        this.BUILD_IN_PROGRESS = false;
                    }
                }
                this.view.toggleLoading(false);
            }),
            (GFilesPanel.prototype._buildFolder = function (includeFolders) {
                if (!includeFolders) return;
                if (this._showExampleFiles) return;
                this.addFolder(this.drive.getRootFolder(), null);
                const folders = [this.drive.getRootFolder()];
                if (!this.isSaveMode()) {
                    const sharedFolder = this._getSharedWithMeFolder();
                    sharedFolder && this.addCustomFolder(sharedFolder, null);
                }
                this._hasFolders = !!folders && folders.length > 0;
            }),
            (GFilesPanel.prototype._getSharedWithMeFolder = function () {
                return null;
            }),
            (GFilesPanel.prototype._updateCurrentFileLoad = function (count) {
                let newValue;
                ((newValue = count > 0 ? (count < this.getQueryLimit() ? -1 : this.CURRENT_FILE_LOAD + count) : -1), (this.CURRENT_FILE_LOAD = newValue));
            }),
            (GFilesPanel.prototype.getCloudSettingsById = function (settingId) {
                return this.CLOUD_SETTINGS.find((setting) => {
                    let { id } = setting;
                    return id === settingId;
                });
            }),
            (GFilesPanel.prototype.updateCloudItemForUserPermission = function (item) {
                return gDesigner.getApplicationManager().isOnlyFileOpenFromCloudEnabled() && item && item instanceof CloudFile
                    ? (item.setPermissions(Object.values(CloudFile.Permission), false), item.setPermission(CloudFile.Permission.Open), item)
                    : item;
            }),
            (GFilesPanel.prototype.getDefaultCloudSettings = function () {
                return this.CLOUD_SETTINGS.find((setting) => !!setting.default);
            }),
            (GFilesPanel.prototype.getCloudSettings = function () {
                return this.CLOUD_SETTINGS;
            }),
            (GFilesPanel.prototype.getCurrentDriveId = function () {
                return this._currentDriveId;
            }),
            (GFilesPanel.prototype.getCurrentDriveSettings = function () {
                return this.getCloudSettingsById(this.getCurrentDriveId());
            }),
            (GFilesPanel.prototype.setCloudDrive = async function (cloudSetting) {
                let persist = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (!cloudSetting) throw new Error(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-incorrect-cloud-drive-settings")));
                this.view && this.view.toggleLoading(true);
                const optionConfig = allCloudOptions.find((option) => option.type === cloudSetting.type);
                if (optionConfig.pro && !gDesigner.isEnabledProFeatures()) return void gDesigner.handlePROFeatureInterruption();
                const previousDrive = this.drive,
                    previousSetting = this.getCurrentDriveId() ? this.getCloudSettingsById(this.getCurrentDriveId()) : null;
                try {
                    switch (cloudSetting.type) {
                        case "googledrive":
                            ((this.drive = new cloudDrives.GGoogleDrive(void 0, cloudSetting.id)),
                                await this.drive.install(),
                                await this.drive.signIn(),
                                (this.view = new filesPanelView.GFilesPanelViewNative(this.panel, this)),
                                this.view.setPermission(filesPanelView.GFilesPanelViewBase.Permission.CreateFolder, false));
                            break;
                        default:
                            ((this.drive = cloudDrives.GCloudDrive.getInstance()), (this.view = new filesPanelView.GFilesPanelViewNative(this.panel, this)));
                    }
                    this._currentDriveId = cloudSetting.id;
                    const activeSettings = { activeSettingsId: cloudSetting.id };
                    if (
                        (persist && gContainer.setProperty(GFilesPanel.DriveAccountsActiveSettingsName, activeSettings),
                        this.drive.setQueryLimit(this.getQueryLimit()),
                        this.drive.setDriveSettings(this._driveSettings),
                        this.view.relayout(),
                        this.updateFilesList(),
                        this.drive.hasUserProfile())
                    ) {
                        var user = await this.drive.getUser();
                        user && this.view.updateUserDetails(user);
                    }
                    (previousDrive && previousDrive.removeEventListener(GDrive.default.DriveEvent, this._handleDriveEvent, this),
                        this.drive.addEventListener(GDrive.default.DriveEvent, this._handleDriveEvent, this));
                } catch (error) {
                    var appError;
                    throw (
                        error && error instanceof AppError.default && (appError = error),
                        await this._setCorrectCloud(previousDrive, previousSetting),
                        this.view && this.view.toggleLoading(false),
                        appError || Error(error.message || GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed")))
                    );
                }
            }),
            (GFilesPanel.prototype._setCorrectCloud = async function (previousDrive, previousSetting) {
                previousDrive ? await this.setCloudDrive(previousSetting) : await this.setCloudDrive(nativeCloudOption);
            }),
            (GFilesPanel.prototype._handleDriveEvent = async function (event) {
                if (event.type === GDrive.default.DriveEvent.Type.UserUpdated) {
                    if (this.drive.hasUserProfile()) {
                        var user = await this.drive.getUser();
                        user && this.view.updateUserDetails(user);
                    }
                } else if (event.type === GDrive.default.DriveEvent.Type.FolderSwitchRequired) {
                    const { folder } = event.data;
                    this.drive.isRootFolder(folder)
                        ? (this.isRootFolder() || this.navigateToRoot(false), this.updateFilesList(true, true))
                        : (this.drive.setCurrentFolder(folder), this.updateFilesList(true, true), this.view.navigateToFolder(folder));
                }
            }),
            (GFilesPanel.prototype.getCreateCloudAccountOptions = async function () {
                await this.updateCloudSettings();
                return this.getCloudSettings().some((setting) => "googledrive" === setting.type) ? cloudOptions.filter((setting) => "googledrive" !== setting.type) : cloudOptions;
            }),
            (GFilesPanel.prototype.updateCloudSettings = function () {
                var self = this;
                return gContainer.getProperty(self.accountSettingsKey).then(function (settingsString) {
                    let accounts = settingsString ? self._stringToSettings(settingsString) : [];
                    return (
                        accounts instanceof Array || (accounts = []),
                        (accounts = accounts.filter((account) => {
                            var option = allCloudOptions.find((option) => account.type === option.type);
                            return (option.pro && gDesigner.isEnabledProFeatures()) || !option.pro;
                        })),
                        (self.CLOUD_SETTINGS = accounts.concat([nativeCloudOption])),
                        true
                    );
                });
            }),
            (GFilesPanel.prototype.getDefaultExtensionForSave = function () {
                return this.drive.getDefaultFileFormat().ext.toUpperCase();
            }),
            (GFilesPanel.prototype.updateFilesList = async function () {
                let full = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                    includeFolders = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                const operationId = Math.random();
                this.CURRENT_UPDATE_OPERATION_ID = operationId;
                const searchValue = this.view.getSearchValue();
                if ((await this._waitForBuildToFinish(), operationId === this.CURRENT_UPDATE_OPERATION_ID && searchValue === this.view.getSearchValue())) {
                    (full && includeFolders ? this.view.clearFilesAndFolders() : this.view.clearFiles(),
                        (this.CURRENT_FILE_LOAD = 0),
                        this.view.toggleEmptyPanel(false));
                    try {
                        await this.buildDepth(full, includeFolders);
                    } catch (error) {
                        return void console.warn(error);
                    }
                    (this.view.toggleEmptyPanel(this._showEmptyPanel),
                        this.view.toggleExampleFiles(this._showExampleFiles || this._showEmptyPanel),
                        this.view.toggleRecentFiles(this._showRecentFiles),
                        full && this.view.updateLayout());
                } else full && this.view.updateLayout();
            }),
            (GFilesPanel.prototype._waitForBuildToFinish = async function () {
                for (; this.BUILD_IN_PROGRESS; ) await (0, Utils.sleep)(200);
            }),
            (GFilesPanel.prototype.search = function () {
                this.updateFilesList(false, false);
            }),
            (GFilesPanel.prototype.addToSelection = function (item) {
                if (
                    (0 === this.SELECTION.length && this.TEMP_SELECTION.length > 0 && (this._newClipBoard = true),
                    this.SELECTION.indexOf(item) < 0)
                ) {
                    if (this.SELECTION.length)
                        for (var t = 0; t < this.SELECTION.length; t++)
                            this.SELECTION[t].getId() === item.getId() && this.SELECTION.splice(t, 1);
                    this.SELECTION.push(item);
                }
            }),
            (GFilesPanel.prototype.selectionHasFiles = function () {
                for (var e = 0, t = this.SELECTION.length; e < t; e++) if (this.drive.isFileSupported(this.SELECTION[e])) return true;
                return false;
            }),
            (GFilesPanel.prototype.removeFromSelection = function (item) {
                var index = this.SELECTION.indexOf(item);
                (index > -1 && this.SELECTION.splice(index, 1), 0 === this.SELECTION.length && this._newClipBoard && (this._newClipBoard = false));
            }),
            (GFilesPanel.prototype.resetSelection = function () {
                ((this.SELECTION = []), (this._newClipBoard = false));
            }),
            (GFilesPanel.prototype._resetViewSelection = function () {
                this.view.resetSelection();
            }),
            (GFilesPanel.prototype.isMultiSelectionEnabled = function () {
                return true;
            }),
            (GFilesPanel.prototype._addToClipboard = function () {
                (this._newClipBoard &&
                    (this.resetClipboard(filePanelConstants.GFilesPanelClipboardModes.COPY),
                    this.resetClipboard(filePanelConstants.GFilesPanelClipboardModes.CUT),
                    (this._newClipBoard = false)),
                    (this.TEMP_SELECTION = this.TEMP_SELECTION.concat(this.SELECTION)),
                    this.view.addToClipboard(this.MODE));
            }),
            (GFilesPanel.prototype.resetClipboard = function (mode) {
                ((this.TEMP_SELECTION = []), (this._newClipBoard = false), this.view.resetClipboard(mode || this.MODE));
            }),
            (GFilesPanel.prototype.performCopyPaste = function (mode) {
                var self = this;
                this.isClipboardModeCopy(mode)
                    ? (gDesigner.stats("filespanel_paste-from-copy_cloud"),
                      this.view.toggleLoading(true),
                      this.SELECTION[0] && this.drive.setCurrentFolder(this.SELECTION[0]),
                      this.drive
                          .copyPaste(this.TEMP_SELECTION)
                          .then(() => {
                              const previousMode = this.MODE;
                              ((this.MODE = filePanelConstants.GFilesPanelClipboardModes.DEFAULT),
                                  self.view.resetSelection(),
                                  self.resetClipboard(previousMode),
                                  self.updateFilesList());
                          })
                          .catch((error) => {
                              let errorMessage = GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-moving"));
                              (error && error.cloud && error.message && error.message.trim() && (errorMessage = error.message),
                                  GSystemDialog.default.alert(errorMessage),
                                  this.view.toggleLoading(false),
                                  console.error(error));
                          }))
                    : (this.logStatsForCurrentFilesSelection("filespanel_copy_cloud", "filespanel_copy_cloud-multiple"),
                      (this.MODE = filePanelConstants.GFilesPanelClipboardModes.COPY),
                      this._addToClipboard());
            }),
            (GFilesPanel.prototype.performCutPaste = function (mode) {
                var self = this;
                this.isClipboardModeCut(mode)
                    ? (gDesigner.stats("filespanel_paste-from-cut_cloud"),
                      this.view.toggleLoading(true),
                      this.SELECTION[0] && this.drive.setCurrentFolder(this.SELECTION[0]),
                      this.drive
                          .cutPaste(this.TEMP_SELECTION)
                          .then(() => {
                              const previousMode = this.MODE;
                              ((this.MODE = filePanelConstants.GFilesPanelClipboardModes.DEFAULT),
                                  self.view.resetSelection(),
                                  self.resetClipboard(previousMode),
                                  self.updateFilesList());
                          })
                          .catch((error) => {
                              let errorMessage = GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-moving"));
                              (error && error.cloud && error.message && error.message.trim() && (errorMessage = error.message),
                                  GSystemDialog.default.alert(errorMessage),
                                  this.view.toggleLoading(false),
                                  console.error(error));
                          }))
                    : (this.logStatsForCurrentFilesSelection("filespanel_cut_cloud", "filespanel_cut_cloud-multiple"),
                      (this.MODE = filePanelConstants.GFilesPanelClipboardModes.CUT),
                      this._addToClipboard());
            }),
            (GFilesPanel.prototype.performFileMove = function (item, targetFolder) {
                (this.view.toggleLoading(true),
                    gDesigner.stats("filespanel_move"),
                    this.drive
                        .fileMove(item, targetFolder)
                        .then(() => {
                            (this.view.toggleLoading(false), this.view.resetSelection(), this.updateFilesList());
                        })
                        .catch((error) => {
                            let errorMessage = GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-moving"));
                            (error && error.cloud && error.message && error.message.trim() && (errorMessage = error.message),
                                GSystemDialog.default.alert(errorMessage),
                                this.view.toggleLoading(false),
                                console.error(error));
                        }));
            }),
            (GFilesPanel.prototype.deleteSelection = function () {
                var self = this;
                return (
                    this.view.toggleLoading(true),
                    (async function () {
                        try {
                            for (var t = 0; t < self.SELECTION.length; ++t) {
                                var n = self.SELECTION[t];
                                (await self.drive.deleteItem(n),
                                    gDesigner.hasEventListeners(GDrive.default.DriveEvent) &&
                                        gDesigner.trigger(new GDrive.default.DriveEvent(null, GDrive.default.DriveEvent.Type.FileDeleted, n)));
                            }
                        } catch (error) {
                            return (
                                GSystemDialog.default.alert(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-deleting"))),
                                self.view.toggleLoading(false),
                                void console.error(error)
                            );
                        }
                        if (self.SELECTION[0].getType && self.SELECTION[0].getType() === CloudFile.Type.Folder) {
                            let parentFolderNode = null;
                            if (
                                (self.SELECTION[0].getParentId() &&
                                    self.panel.find(".g-gravit-folder").each((n, element) => {
                                        const node = $(element).data("node");
                                        node.id === self.SELECTION[0].getParentId() && (parentFolderNode = node);
                                    }),
                                !parentFolderNode)
                            ) {
                                let firstFolderElement = $(self.panel.find(".g-gravit-folder")[0]);
                                parentFolderNode = firstFolderElement && firstFolderElement.data("node");
                            }
                            parentFolderNode && self.drive.setCurrentFolder(parentFolderNode);
                        }
                        (self._triggerFileDeleted(self.SELECTION), self.view.toggleLoading(false), self.view.resetSelection(), self.updateFilesList());
                    })()
                );
            }),
            (GFilesPanel.prototype.sort = function () {
                this.updateFilesList();
            }),
            (GFilesPanel.prototype._minimizeWindow = function () {
                (this.view.minimizeWindow(), gContainer && gContainer.setProperty("GFilesPanel.maximized", false), this.view.updateLayout());
            }),
            (GFilesPanel.prototype._maximizeWindow = function (full) {
                (this.view.maximizeWindow(),
                    gContainer && gContainer.setProperty("GFilesPanel.maximized", true),
                    this.hasMoreItemsToLoad() && this.view.shouldFilesBeRequested()
                        ? this.buildDepth(full, false).catch((e) => {})
                        : this.view.updateLayout());
            }),
            (GFilesPanel.prototype.toCardView = function () {
                (this.view.toCardView(), gContainer && gContainer.setProperty("GFilesPanel.isFilesListStyle", false));
            }),
            (GFilesPanel.prototype.toListView = function () {
                (this.view.toListView(), gContainer && gContainer.setProperty("GFilesPanel.isFilesListStyle", true));
            }),
            (GFilesPanel.prototype.getCurrentFolder = function () {
                return this.drive.getCurrentFolder();
            }),
            (GFilesPanel.prototype.isRootFolder = function () {
                return this.drive.isRootFolder();
            }),
            (GFilesPanel.prototype.getFolders = function () {
                return this.drive.getFolders();
            }),
            (GFilesPanel.prototype.isItemSelected = function (item) {
                if (this.SELECTION.length < 1) return false;
                for (let t = 0, count = this.SELECTION.length; t < count; ++t) {
                    if (this.SELECTION[t].id === item.id) return true;
                }
                return false;
            }),
            (GFilesPanel.prototype.isItemInClipboard = function (item) {
                if (this.TEMP_SELECTION.length < 1) return false;
                for (let t = 0, count = this.TEMP_SELECTION.length; t < count; ++t) {
                    if (this.TEMP_SELECTION[t].id === item.id) return true;
                }
                return false;
            }),
            (GFilesPanel.prototype.isSaveMode = function () {
                return this._isSaveMode;
            }),
            (GFilesPanel.prototype.getSelection = function () {
                return this.SELECTION;
            }),
            (GFilesPanel.prototype.getTempSelection = function () {
                return this.TEMP_SELECTION;
            }),
            (GFilesPanel.prototype.getDocumentToSave = function () {
                return this._documentToSave;
            }),
            (GFilesPanel.prototype.getSortType = function () {
                return this.drive.getSortType();
            }),
            (GFilesPanel.prototype.setSortType = function (sortType) {
                return (this.drive.setSortType(sortType), this);
            }),
            (GFilesPanel.prototype.getSelectedFilterForFileTypes = function () {
                return this.drive.getSelectedFilterForFileTypes();
            }),
            (GFilesPanel.prototype.addFileTypeToSelectedFilter = function (filterType) {
                const t = this.drive.getAvailableFileTypesFilter().find((t) => t.type === filterType);
                (gDesigner.stats("filespanel_format-filter_on", t.id), this.drive.addFileTypeToSelectedFilter(filterType));
            }),
            (GFilesPanel.prototype.clearAllFileTypesFromSelectedFilter = function () {
                (gDesigner.stats("filespanel_format-filter_clear"),
                    this.view.clearFileTypeFilterState(),
                    this.drive.clearAllFileTypesFromSelectedFilter());
            }),
            (GFilesPanel.prototype.deleteFileTypeFromSelectedFilter = function (filterType) {
                const t = this.drive.getAvailableFileTypesFilter().find((t) => t.type === filterType);
                (gDesigner.stats("filespanel_format-filter_off", t.id), this.drive.deleteFileTypeFromSelectedFilter(filterType));
            }),
            (GFilesPanel.prototype.getAvailableFileTypesFilter = function () {
                return this.drive.getAvailableFileTypesFilter();
            }),
            (GFilesPanel.prototype.getSortDirection = function () {
                return this.drive.getSortDirection();
            }),
            (GFilesPanel.prototype.setSortDirection = function (direction) {
                return (this.drive.setSortDirection(direction), this);
            }),
            (GFilesPanel.prototype.getClipboardMode = function () {
                return this.MODE;
            }),
            (GFilesPanel.prototype.isClipboardModeCopy = function (mode) {
                return mode ? mode === filePanelConstants.GFilesPanelClipboardModes.COPY : this.MODE === filePanelConstants.GFilesPanelClipboardModes.COPY;
            }),
            (GFilesPanel.prototype.isClipboardModeCut = function (mode) {
                return mode ? mode === filePanelConstants.GFilesPanelClipboardModes.CUT : this.MODE === filePanelConstants.GFilesPanelClipboardModes.CUT;
            }),
            (GFilesPanel.prototype.setDefaultClipboardMode = function () {
                return ((this.MODE = filePanelConstants.GFilesPanelClipboardModes.DEFAULT), this);
            }),
            (GFilesPanel.prototype.getUser = function () {
                return this.USER;
            }),
            (GFilesPanel.prototype.getDefaultFilename = function () {
                return this.DEFAULT_FILENAME;
            }),
            (GFilesPanel.prototype.getPossibleExtensions = function () {
                return this.drive.getSupportedExtensions().map((ext) => ext.toUpperCase());
            }),
            (GFilesPanel.prototype.getAvailableExtensions = function () {
                for (var mixedFormats = false, matchedFormat = null, n = 0; n < this.SELECTION.length && !mixedFormats; ++n) {
                    var o = this.SELECTION[n],
                        i = this.drive.getSupportedFileFormats().find((formatEntry) => o.type === formatEntry.type);
                    i && i.secondary && (matchedFormat ? (mixedFormats = matchedFormat.type !== i.type) : (matchedFormat = i));
                }
                return matchedFormat
                    ? mixedFormats
                        ? [GCloudDrive.DEFAULT_TYPE.ext.toUpperCase()]
                        : [GCloudDrive.DEFAULT_TYPE.ext.toUpperCase(), matchedFormat.ext.toUpperCase()]
                    : this.SELECTION.length
                      ? GCloudDrive.FILE_EXTENSIONS
                      : [];
            }),
            (GFilesPanel.prototype.fileRequiresSourceDownload = function (file) {
                return !this.drive.getSupportedFileFormats().some((format) => {
                    var mimeType = file instanceof CloudFile ? file.getMimeType() : file.type;
                    const extension = file.extension || file.ext || null;
                    return format.type === mimeType || (extension && format.ext.toLowerCase() === extension.toLowerCase());
                });
            }),
            (GFilesPanel.prototype.getUISettings = function () {
                return this._GUISettings;
            }),
            (GFilesPanel.prototype._canDownload = function () {
                return true;
            }),
            (GFilesPanel.prototype._isContextMenuAvailableForFile = function (file) {
                return true;
            }),
            (GFilesPanel.prototype.logStatsForCurrentFilesSelection = function (singleStatName, multipleStatName, statParam) {
                gDesigner.stats(1 === this.getSelection().length ? singleStatName : multipleStatName, statParam);
            }),
            (GFilesPanel.prototype.getCurrentAscend = function () {
                return this.drive.getSortDirection();
            }),
            (GFilesPanel.prototype.getCurrentSortType = function () {
                return this.drive.getSortType();
            }),
            (GFilesPanel.prototype.getQueryLimit = () => 20),
            (GFilesPanel.prototype.getSupportedVersions = function () {
                return [];
            }),
            (GFilesPanel.prototype.getFooterSaveDescriptionForFileExtension = function (extension) {
                return GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.info-".concat(extension.toLowerCase())));
            }),
            (GFilesPanel.prototype.toString = function () {
                return "[Object GFilesPanel]";
            }),
            (GFilesPanel.prototype._stringToSettings = function (encoded) {
                return JSON.parse((0, Utils.base64StringToString)(encoded));
            }),
            (GFilesPanel.prototype._settingsToString = function (settings) {
                return (0, Utils.stringToBase64String)(JSON.stringify(settings));
            }),
            (GFilesPanel.prototype.manageOpenFolder = function (element, folder, n) {
                this.view.manageOpenFolder(element, folder, n);
            }),
            (module.exports = GFilesPanel));
    };
