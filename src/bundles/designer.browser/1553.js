module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(96 /* polyfill:JSON */), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(4), require(13), require(32), require(38), require(33));
        var GObject = require(1),
            GDocument = _interopRequireDefault(require(163 /* GDocument */)),
            GDocumentEvent = _interopRequireDefault(require(78)),
            DocumentStatus = _interopRequireDefault(require(86)),
            GDrive = _interopRequireDefault(require(802)),
            AppError = _interopRequireDefault(require(355));
        const QueryBuilder = require(1554),
            SearchQuery = require(1301),
            GGoogleDrive = require(556 /* GGoogleDriveStorage */),
            CloudItem = require(156),
            ResultsPage = require(1555),
            GGoogleDriveClient = require(848),
            TokenIssuer = require(595),
            SecurityLevel = require(520),
            GCommonNames = require(119),
            { gApi, CloudIntegration } = require(10 /* designerConfig */),
            { decrypt } = require(40 /* Utils */),
            GSystemDialog = require(44);
        let instance;
        function GGoogleDriveStorage() {
            let settings = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                accountId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            (GDrive.default.call(this, settings), (this._accountId = accountId));
            const { clientId: clientId = null, apiKey: apiKey = null, appId: appId = null, accessToken, expires, corporate: corporate = false } = this._settings;
            if (
                ((this._settings = Object.assign(this._settings, {
                    clientId: clientId,
                    apiKey: apiKey,
                    appId: appId,
                    accessToken: accessToken,
                    expires: expires,
                    corporate: corporate,
                })),
                this._settings.corporate && (this._securityLevel = SecurityLevel.SecurityLevel.Highest),
                accessToken &&
                    (this._googleDriveClient = this._buildGoogleClient({
                        accessToken: accessToken,
                        expires: expires,
                        corporate: corporate,
                        accountId: accountId,
                    })),
                (this._clientId = clientId),
                (this._apiKey = apiKey),
                (this._appId = appId),
                (this._folders = {}),
                this.isLowestSecurityLevel())
            ) {
                const e = async (e) =>
                    this._googlePickerLoaded
                        ? this._openFilePicker(e).catch(() =>
                              GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed")))
                          )
                        : gContainer
                              .getGoogleAPI()
                              .loadFilePicker()
                              .then(() => {
                                  this._googlePickerLoaded = true;
                              })
                              .then(() => this._openFilePicker(e))
                              .catch((error) => {
                                  (console.log("[GGoogleDrive error - Google Drive Picker]", error),
                                      GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed"))));
                              });
                (this.addAction({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "text.add-files")),
                    icon: "gravit-icon-add-files",
                    execute: e,
                }),
                    this.setDefaultEmptyMessage({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "text.you-have-not-added")),
                        buttons: [
                            {
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "text.add-additional-files")),
                                execute: e,
                            },
                        ],
                    }),
                    this.addEventListener(GDrive.default.DriveEvent, (event) => {
                        if (event.type === GDrive.default.DriveEvent.Type.Added) {
                            const dialogElement = $("<div/>")
                                .gDialog({
                                    className: "g-googledrive-warning-dialog",
                                    releaseOnClose: true,
                                })
                                .append(
                                    $("<div></div>")
                                        .addClass("g-btn-close")
                                        .append($("<span></span>").addClass("gravit-icon-close"))
                                        .on("click", () => dialogElement.gDialog("close"))
                                )
                                .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "text.warning-message"))))
                                .append(
                                    $("<div/>")
                                        .addClass("buttons")
                                        .append(
                                            $("<button/>")
                                                .addClass("g-highlight-button")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                                                .on("click", () => dialogElement.gDialog("close"))
                                        )
                                        .append(
                                            $("<button/>")
                                                .addClass("g-highlight-button highlighted")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "text.add-additional-files")))
                                                .on("click", () => {
                                                    (e(event.source), dialogElement.gDialog("close"));
                                                })
                                        )
                                )
                                .gDialog("open", false);
                        }
                    }));
            }
        }
        (GObject.GObject.inherit(GGoogleDriveStorage, GDrive.default),
            (GGoogleDriveStorage.LAST_TEAM_DRIVE_ID_PROP_NAME =
                (CloudIntegration && CloudIntegration.cloudOptions && (CloudIntegration.cloudOptions.find((option) => "googledrive" === option.type) || {}).lastTeamDrivePropName) || null),
            (GGoogleDriveStorage.prototype._securityLevel = SecurityLevel.SecurityLevel.Lowest),
            (GGoogleDriveStorage.prototype._googlePickerLoaded = false),
            (GGoogleDriveStorage.prototype._googleDriveClient = null),
            (GGoogleDriveStorage.prototype.CURRENT_FOLDER_PROP = "designer.filespanel.google-drive.current-folder"),
            (GGoogleDriveStorage.getInstance = function () {
                return (instance || (instance = new GGoogleDriveStorage()), instance);
            }),
            (GGoogleDriveStorage.prototype.setCorporateStorage = function (corporateStorage) {
                if ((GDrive.default.prototype.setCorporateStorage.call(this, corporateStorage), GGoogleDriveStorage.LAST_TEAM_DRIVE_ID_PROP_NAME)) {
                    let t = null;
                    (corporateStorage && ({ id: t } = corporateStorage), this.saveLastTeamDriveId(GGoogleDriveStorage.LAST_TEAM_DRIVE_ID_PROP_NAME, t));
                }
            }),
            (GGoogleDriveStorage.prototype.getPreviousSelectedFolder = function () {
                return GDrive.default.prototype.getPreviousSelectedFolder.apply(this, arguments).then((folder) => (folder ? CloudItem.from(folder) : folder));
            }),
            (GGoogleDriveStorage.prototype._openFilePicker = function (panelView) {
                const self = this;
                async function resolveParentFolder(docs) {
                    const rootFolder = self.getRootFolder();
                    let o,
                        folderDetails,
                        showMessage = false;
                    if ((({ parentId: o } = docs[0]), o !== rootFolder.id))
                        try {
                            folderDetails = await self._googleDriveClient.getFileDetails(o);
                        } catch (e) {
                            ((o = rootFolder.id), (showMessage = true));
                        }
                    return (folderDetails || (folderDetails = rootFolder), { folder: folderDetails, showMessage: showMessage });
                }
                async function o(docs, o) {
                    for (let n = 0; n < docs.length; n++) {
                        let doc = docs[n];
                        const { id, type } = doc;
                        "folder" !== type &&
                            (await self._googleDriveClient.updateFileDetails(id, {
                                viewedByMeTime: new Date().toISOString(),
                            }));
                    }
                    const { showMessage, folder } = await resolveParentFolder(docs);
                    (showMessage &&
                        GSystemDialog.messageWithInfo({
                            mainMessage: GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "text.selected-files-folder-not-added")),
                            infoMessage: GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "text.selected-files-folder-not-added-additional")),
                        }),
                        self.trigger(new GDrive.default.DriveEvent(null, GDrive.default.DriveEvent.Type.FolderSwitchRequired, { folder: folder })),
                        o());
                }
                return new Promise((resolve, reject) => {
                    if (!this.isSignedIn() || !this._googlePickerLoaded) return reject();
                    gContainer.getGoogleAPI().openFilePicker((pickerResult) => {
                        if ((panelView.toggleLoading(true), 1 === pickerResult.length)) {
                            const firstDoc = pickerResult[0],
                                { id: id, type: type } = firstDoc;
                            "folder" !== type
                                ? (resolveParentFolder(pickerResult).then((resolution) => {
                                      let { showMessage: showMessage } = resolution;
                                      showMessage &&
                                          GSystemDialog.messageWithInfo({
                                              mainMessage: GObject.GLocale.get(
                                                  new GObject.GLocaleKey("GGoogleDrive", "text.selected-file-folder-not-added")
                                              ),
                                              infoMessage: GObject.GLocale.get(
                                                  new GObject.GLocaleKey("GGoogleDrive", "text.selected-files-folder-not-added-additional")
                                              ),
                                          });
                                  }),
                                  this.getFile(id)
                                      .then((result) => this._convertToCloudItems(result).then((result) => result[0]))
                                      .then(
                                          (convertedItem) =>
                                              new Promise((resolve, reject) => {
                                                  if (this.isFileSupported(convertedItem)) return resolve(convertedItem);
                                                  GSystemDialog.alert(
                                                      GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.unsupported-file-extension")),
                                                      reject
                                                  );
                                              })
                                      )
                                      .then((item) => this.openFile(item))
                                      .then(() => panelView.close())
                                      .then(resolve)
                                      .catch(reject)
                                      .finally(() => panelView.toggleLoading(false)))
                                : o(pickerResult, resolve);
                        } else o(pickerResult, resolve);
                    }, reject);
                });
            }),
            (GGoogleDriveStorage.prototype.hasUserProfile = function () {
                return true;
            }),
            (GGoogleDriveStorage.prototype.isRootFolder = function (folder) {
                folder = void 0 !== folder ? folder : this.getCurrentFolder();
                var rootFolder = this.getRootFolder();
                return "string" == typeof folder ? folder === rootFolder.id : !folder || (folder && !folder.id) || folder === rootFolder || folder.id === rootFolder.id;
            }),
            (GGoogleDriveStorage.prototype.getRootFolder = function () {
                return this.getCorporateStorage()
                    ? this.getCorporateStorage()
                    : CloudItem.from({
                          id: "root",
                          name: GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.my-cloud")),
                      });
            }),
            (GGoogleDriveStorage.prototype.uninstall = async function () {
                return new Promise(
                    async (resolve) => (
                        GDrive.default.prototype.uninstall.call(this),
                        this.isLowestSecurityLevel() && this.isSignedIn() && (await this.signOut()),
                        resolve()
                    )
                );
            }),
            (GGoogleDriveStorage.prototype.getUser = async function () {
                return new Promise(async (resolve, reject) => {
                    try {
                        var user;
                        if (this._settings.corporate) user = await gDesigner.getUser();
                        else {
                            if (!gContainer.getGoogleAPI().isLoaded()) return reject("Google Drive Client not loaded!");
                            user = await gContainer.getGoogleAPI().getBasicProfile();
                        }
                        return resolve(user);
                    } catch (error) {
                        reject(error);
                    }
                });
            }),
            (GGoogleDriveStorage.prototype.install = function (e) {
                return this.isInstalled()
                    ? Promise.resolve()
                    : this.isLowestSecurityLevel()
                      ? gContainer
                            .getGoogleAPI()
                            .install(e)
                            .then(() => this._loadClient())
                            .then(() => (this._driveInstalled = true))
                      : ((this._driveInstalled = true), Promise.resolve());
            }),
            (GGoogleDriveStorage.prototype.isLowestSecurityLevel = function () {
                return this._securityLevel === SecurityLevel.SecurityLevel.Lowest;
            }),
            (GGoogleDriveStorage.prototype._loadClient = function () {
                return new Promise(async (resolve, reject) => {
                    const scope = this.isLowestSecurityLevel()
                        ? "https://www.googleapis.com/auth/drive.file         https://www.googleapis.com/auth/userinfo.email"
                        : "https://www.googleapis.com/auth/drive";
                    var apiKey, clientId, appId;
                    try {
                        if (this._apiKey && this._clientId) ((clientId = this._clientId), (apiKey = this._apiKey), (appId = this._appId));
                        else {
                            var clientConfig = await gApi.cloudServices.googleDrive.getClientConfiguration();
                            const {
                                GOOGLE_DRIVE_PUBLIC_CLIENT_ID,
                                GOOGLE_DRIVE_PUBLIC_API_KEY,
                                GOOGLE_DRIVE_APP_ID,
                            } = JSON.parse(decrypt(clientConfig));
                            ((clientId = GOOGLE_DRIVE_PUBLIC_CLIENT_ID), (apiKey = GOOGLE_DRIVE_PUBLIC_API_KEY), (appId = GOOGLE_DRIVE_APP_ID), (this._apiKey = apiKey), (this._clientId = clientId), (this._appId = appId));
                        }
                    } catch (e) {
                        return reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed")));
                    }
                    gContainer
                        .getGoogleAPI()
                        .init({
                            appId: appId,
                            apiKey: apiKey,
                            clientId: clientId,
                            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                            scope: scope,
                        })
                        .then(
                            () => {
                                resolve();
                            },
                            (error) => {
                                reject(error);
                            }
                        );
                });
            }),
            (GGoogleDriveStorage.prototype.isSignedIn = async function () {
                return (
                    gContainer.getGoogleAPI().isLoaded() || console.error("Google Drive Client not loaded!"),
                    gContainer.getGoogleAPI().isSignedIn()
                );
            }),
            (GGoogleDriveStorage.prototype.signIn = function () {
                return new Promise(async (resolve, reject) =>
                    gContainer.getGoogleAPI().isLoaded()
                        ? (await this.isSignedIn())
                            ? ((this._googleDriveClient = await this._buildGoogleClient()), resolve())
                            : gContainer
                                  .getGoogleAPI()
                                  .signIn()
                                  .then(async () => {
                                      ((this._googleDriveClient = await this._buildGoogleClient()), resolve());
                                  })
                                  .catch((error) =>
                                      error && "popup_blocked_by_browser" === error.error
                                          ? reject(
                                                new AppError.default(
                                                    GObject.GLocale.get(
                                                        new GObject.GLocaleKey("GExternalStorage", "text.error-window-blocked-alternative")
                                                    )
                                                )
                                            )
                                          : reject(error)
                                  )
                        : reject("Google Drive Client not loaded!")
                );
            }),
            (GGoogleDriveStorage.prototype.signOut = function () {
                if (!gContainer.getGoogleAPI().isLoaded()) throw Error("Google Drive Client not loaded!");
                return gContainer.getGoogleAPI().signOut();
            }),
            (GGoogleDriveStorage.prototype.fetchFolders = async function (sortOrder, parentFolder) {
                let limit = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : -1;
                var parent = parentFolder ? this._getParentReference(parentFolder) : this._getParentContext();
                return this._search(
                    SearchQuery.from({
                        type: CloudItem.Type.Folder,
                        limit: limit > 0 ? limit : 1e3,
                        orderBy: GGoogleDriveStorage.SearchEngine.SortMap[sortOrder],
                        parent: parent,
                    })
                ).then(async (resultsPage) => {
                    this._currentPage = resultsPage;
                    let items = resultsPage.getItems();
                    return (
                        this.isRootFolder(parentFolder) &&
                            !this.PREVIOUS_SELECTED_FOLDER_PATH.length &&
                            ((this._rootFolderID = items && items.length && "root" === items[0].getParentId() ? items[0].parents[0] : null),
                            await this.generatePreviousSelectedFolderPath()),
                        items
                    );
                });
            }),
            (GGoogleDriveStorage.prototype._buildSearchQuery = function (query) {
                const queryBuilder = new QueryBuilder();
                var type = query.hasValue("type") && query.type;
                const isFolder = type === CloudItem.Type.Folder,
                    isFile = type === CloudItem.Type.File;
                return (
                    isFolder
                        ? queryBuilder.add("mimeType", "=", GGoogleDriveClient.MimeType.Folder)
                        : isFile &&
                          (queryBuilder.group((group) => {
                              (this.getSupportedExtensions().forEach((extension) => group.or("fileExtension", "=", extension)),
                                  this.getSupportedMIMETypes().forEach((mimeType) => group.or("mimeType", "=", mimeType)));
                          }),
                          this.shouldOnlyListOwnedFiles() && queryBuilder.in("me", "owners")),
                    query.hasValue("parent") ? "*" !== query.parent && queryBuilder.in(query.parent, "parents") : queryBuilder.in("root", "parents"),
                    query.hasValue("name") && queryBuilder.add("name", "contains", query.name),
                    query.hasValue("exactname") && queryBuilder.add("name", "=", query.exactname),
                    query.hasValue("fileExtension") && queryBuilder.add("fileExtension", "=", query.fileExtension.toLowerCase()),
                    queryBuilder.add("trashed", "=", new QueryBuilder.RawValue(false)),
                    queryBuilder.build()
                );
            }),
            (GGoogleDriveStorage.prototype._getParentContext = function () {
                return this._getParentReference(this.getCurrentFolder()) || this._getParentReference(this.getCorporateStorage());
            }),
            (GGoogleDriveStorage.prototype.getFolders = function () {
                var result = {},
                    parentContext = this._getParentContext();
                return (parentContext && (result[parentContext] = { folder: { name: null, id: null, parent: null } }), result);
            }),
            (GGoogleDriveStorage.prototype._search = async function (query, page) {
                var limit = (query.hasKey("limit") && query.getAsInt("limit")) || this.getQueryLimit();
                page = page || new ResultsPage({ query: query });
                return new Promise(async (resolve, reject) => {
                    try {
                        var requestParams = {
                                q: this._buildSearchQuery(query),
                                pageSize: limit - page.getSize(),
                                fields: "nextPageToken, files( id, driveId, parents, name, fileExtension, fullFileExtension, hasThumbnail, thumbnailLink, size, contentHints(thumbnail(image, mimeType)), description, mimeType, version, createdTime, modifiedTime, webContentLink, capabilities(canDownload, canEdit) )",
                                pageToken: (query.hasValue("nextPageToken") && query.nextPageToken) || "",
                            },
                            corporateStorage = this.getCorporateStorage();
                        (corporateStorage &&
                            (requestParams = Object.assign(requestParams, {
                                includeItemsFromAllDrives: true,
                                corpora: "drive",
                                supportsAllDrives: true,
                                driveId: corporateStorage.id,
                            })),
                            query.hasValue("orderBy") && (requestParams.orderBy = query.orderBy));
                        const response = await this._googleDriveClient.searchFiles(requestParams);
                        var { files, nextPageToken } = response;
                        if (!files.length) return resolve(page);
                        files = page.getSize() + files.length > limit ? files.slice(0, Math.max(limit - page.getSize(), 0)) : files;
                        var items = await this._convertToCloudItems(files);
                        return (
                            query.hasValue("parent") &&
                                items.forEach((item) => {
                                    item.parent = query.parent;
                                }),
                            page.update({ nextPageToken: nextPageToken, items: items }),
                            page.getSize() < limit && nextPageToken && (page = await this._search(query, page)),
                            resolve(page)
                        );
                    } catch (e) {
                        reject();
                    }
                });
            }),
            (GGoogleDriveStorage.prototype._convertToCloudItems = async function (items) {
                return (items = items instanceof Array ? items : [items]).map((item) => GGoogleDrive.convertToCloudItem(item));
            }),
            (GGoogleDriveStorage.prototype.navigateToParentFolder = function () {
                var parentId = this._currentFolder.parent ? this._currentFolder.parent : null;
                return (this.setCurrentFolder(this._getParentReference(parentId)), this);
            }),
            (GGoogleDriveStorage.prototype._getParentReference = function (folderOrId) {
                return folderOrId && "object" == typeof folderOrId ? folderOrId._id || folderOrId.id : folderOrId;
            }),
            (GGoogleDriveStorage.prototype.getFile = function (fileId) {
                return this._googleDriveClient.getFileDetails(fileId, this.getCorporateStorage() ? { supportsAllDrives: true } : {});
            }),
            (GGoogleDriveStorage.prototype.getFolder = async function (folderOrId) {
                const fileDetails = await this._googleDriveClient.getFileDetails(
                    folderOrId.id || folderOrId,
                    this.getCorporateStorage() ? { supportsAllDrives: true } : {}
                );
                return this._convertToCloudItems(fileDetails).then((items) => items[0]);
            }),
            (GGoogleDriveStorage.prototype.supportsSaveCollisionFlow = function () {
                return true;
            }),
            (GGoogleDriveStorage.prototype.fileExists = async function (name, extension, parentFolder) {
                var parent = parentFolder ? this._getParentReference(parentFolder) : this._getParentContext();
                return this._search(
                    SearchQuery.from({
                        type: CloudItem.Type.File,
                        parent: parent,
                        exactname: "".concat(name, ".").concat(extension),
                        fileExtension: extension,
                    })
                ).then((resultsPage) => !!resultsPage.getItems().length);
            }),
            (GGoogleDriveStorage.prototype.folderExists = function (name, parentFolder) {
                var parent = parentFolder ? this._getParentReference(parentFolder) : this._getParentContext();
                return this._search(SearchQuery.from({ type: CloudItem.Type.Folder, parent: parent, exactname: name })).then((resultsPage) => !!resultsPage.getItems().length);
            }),
            (GGoogleDriveStorage.prototype.getRawFile = function (file, signal, downloadOptions) {
                return this._googleDriveClient.getFile(
                    file.id,
                    this.getCorporateStorage() ? { supportsAllDrives: true } : {},
                    signal,
                    downloadOptions && downloadOptions.progress
                );
            }),
            (GGoogleDriveStorage.prototype._createStorageItem = async function (itemData, blob, token) {
                const rawData = blob && (await GCommonNames.createUint8ArrayFromBlob(blob));
                return new GGoogleDrive.Item(gDesigner.getDefaultStorage(), itemData, rawData, token);
            }),
            (GGoogleDriveStorage.prototype.openFile = async function (item, windowId) {
                return new Promise(
                    async function (resolve, reject) {
                        try {
                            const itemData = Object.assign(item, {
                                settings: this._googleDriveClient.getTokenIssuerSettings(),
                            });
                            var storageItem = await this._createStorageItem(itemData, await this.getRawFile(item));
                            (storageItem.setCloudClient(this._googleDriveClient),
                                gDesigner.openDocument(storageItem, windowId),
                                await this._googleDriveClient.updateFileDetails(
                                    storageItem.getUniqueId(),
                                    { viewedByMeTime: new Date().toISOString() },
                                    { supportsAllDrives: true }
                                ),
                                resolve());
                        } catch (error) {
                            reject(error);
                        }
                    }.bind(this)
                );
            }),
            (GGoogleDriveStorage.prototype.saveNewFile = function (document, title) {
                let fileExtension = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    saveOptions = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    onStatusChange = arguments.length > 4 ? arguments[4] : void 0;
                return new Promise(async (resolve, reject) => {
                    const handleSaveError = function (error, newDoc, originalDoc) {
                        console.log(error);
                        const header = gDesigner.getHeader(),
                            newDocTab = header.getWindowTab(gDesigner.getWindows().getWindow(newDoc)),
                            originalDocTab = header.getWindowTab(gDesigner.getWindows().getWindow(originalDoc));
                        (newDocTab && originalDocTab
                            ? (originalDoc.updateStatus(DocumentStatus.default.SaveFailed),
                              gDesigner.removeDocument(originalDoc, function () {
                                  newDoc.updateStatus(DocumentStatus.default.SaveFailed);
                              }))
                            : newDocTab
                              ? newDoc.updateStatus(DocumentStatus.default.SaveFailed)
                              : originalDoc.updateStatus(DocumentStatus.default.SaveFailed),
                            reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-saving-file"))));
                    };
                    var newDocument = new GDocument.default();
                    try {
                        fileExtension = fileExtension || this.getDefaultFileFormat().ext.toUpperCase();
                        var scene = document.getScene();
                        (scene.getActivePage().getGeometryBBox() ||
                            reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas"))),
                            (saveOptions = document.updateSaveOptionsLastModifiedDate(saveOptions)));
                        const mimeType = (this.findFileFormatByExtension(fileExtension) || this.getDefaultFileFormat()).mime,
                            itemData = {
                                name: title,
                                mimeType: mimeType,
                                fileExtension: fileExtension,
                                parent: this._getParentContext(),
                                settings: this._settings,
                            },
                            formatChanged = mimeType !== this.getDefaultFileFormat().mime,
                            corporateStorage = this.getCorporateStorage();
                        corporateStorage && (itemData.driveId = corporateStorage.id);
                        var storageItem = await this._createStorageItem(itemData);
                        (storageItem.setCloudClient(this._googleDriveClient),
                            gDesigner.addDocument(newDocument),
                            newDocument.setSynchronizing(true),
                            newDocument.setTitle(title),
                            newDocument.updateStatus(DocumentStatus.default.Saving));
                        const serializedNode = GObject.GNode.store(scene, saveOptions);
                        serializedNode.cfs = false;
                        const serializedData = JSON.stringify(serializedNode);
                        return newDocument
                            .deserializeData(serializedData)
                            .then(async () => {
                                (document.getFileFormatVersion() && newDocument.setFileFormatVersion(document.getFileFormatVersion()),
                                    onStatusChange && onStatusChange(DocumentStatus.default.Loaded),
                                    (saveOptions = newDocument.updateSaveOptionsLastModifiedDate(saveOptions)),
                                    storageItem.write(
                                        newDocument,
                                        async () => {
                                            (document && document.getEditor() && gDesigner.removeDocument(document, null, true),
                                                newDocument.setStorageItem(storageItem),
                                                await newDocument.saveAnnotations(formatChanged, true),
                                                newDocument.setSynchronizing(false),
                                                onStatusChange && onStatusChange(DocumentStatus.default.Saved),
                                                gDesigner.hasEventListeners(GDocumentEvent.default) &&
                                                    (gDesigner.trigger(new GDocumentEvent.default(GDocumentEvent.default.Type.Modified, newDocument)),
                                                    gDesigner.trigger(new GDocumentEvent.default(GDocumentEvent.default.Type.Activated, newDocument))),
                                                gDesigner.addToRecentFiles(storageItem),
                                                newDocument.updateStatus(DocumentStatus.default.Saved),
                                                resolve());
                                        },
                                        () => {
                                            (console.error(">>>saveNewFile write error", arguments),
                                                newDocument.setSynchronizing(false),
                                                onStatusChange && onStatusChange(DocumentStatus.default.SaveFailed),
                                                reject());
                                        },
                                        null,
                                        saveOptions
                                    ));
                            })
                            .catch((error) => handleSaveError(error, newDocument, document));
                    } catch (error) {
                        handleSaveError(error, newDocument, document);
                    }
                });
            }),
            (GGoogleDriveStorage.prototype.fetchRecentFiles = function () {
                return this._fetchFiles(null, 0, "-viewed", "*", this._currentRecentFilesPage).then(
                    (resultsPage) => ((this._currentRecentFilesPage = resultsPage), resultsPage.getItems())
                );
            }),
            (GGoogleDriveStorage.prototype.fetchFiles = async function (searchText, loadedCount, sortOrder) {
                var currentFolder = this.getCurrentFolder(),
                    parentRef = currentFolder && this._getParentReference(currentFolder);
                this._currentFilesPage &&
                    ((this._currentFilesPage.__parent === parentRef &&
                        this._currentFilesPage.__search === searchText &&
                        this._currentFilesPage.__sort === sortOrder) ||
                        (this._currentFilesPage = null));
                return await this._fetchFiles(searchText, loadedCount, sortOrder, currentFolder, this._currentFilesPage).then(
                    (page) => (
                        (this._currentFilesPage = page),
                        (this._currentFilesPage.__search = searchText),
                        (this._currentFilesPage.__sort = sortOrder),
                        (this._currentFilesPage.__parent = parentRef),
                        page.getItems()
                    )
                );
            }),
            (GGoogleDriveStorage.prototype._fetchFiles = async function (searchText, loadedCount, sortOrder) {
                let parent = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                    page = arguments.length > 4 ? arguments[4] : void 0;
                var parentRef = parent ? this._getParentReference(parent) : this._getParentContext();
                if (loadedCount && page && !page.nextPageToken) {
                    var emptyPage = ResultsPage.from(page);
                    return ((emptyPage.items = []), emptyPage);
                }
                return this._search(
                    SearchQuery.from({
                        type: CloudItem.Type.File,
                        limit: this.getQueryLimit(),
                        orderBy: GGoogleDriveStorage.SearchEngine.SortMap[sortOrder],
                        nextPageToken: loadedCount ? page && page.nextPageToken : "",
                        parent: parentRef,
                        name: searchText,
                    })
                );
            }),
            (GGoogleDriveStorage.prototype.isItemAllowedToBeRendered = function (item) {
                return item.hasPermission(CloudItem.Permission.Download);
            }),
            (GGoogleDriveStorage.prototype.isFileAllowedToBeOpened = function (item) {
                return item.hasPermission(CloudItem.Permission.Download);
            }),
            (GGoogleDriveStorage.prototype.supportsCorporateStorage = function () {
                return true;
            }),
            (GGoogleDriveStorage.prototype.getCorporateStorages = function () {
                let query = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new SearchQuery(),
                    page = arguments.length > 1 ? arguments[1] : void 0;
                if (this.shouldOnlyListOwnedFiles()) return Promise.resolve([]);
                var limit = (query.hasKey("limit") && query.getAsInt("limit")) || this.getQueryLimit();
                return (
                    (page = page || new ResultsPage({ query: query })),
                    new Promise(async (resolve, reject) => {
                        try {
                            const requestParams = {
                                    pageSize: limit - page.getSize(),
                                    fields: "*",
                                    nextPageToken: query.hasValue("nextPageToken") && query.nextPageToken,
                                },
                                response = await this._googleDriveClient.searchTeamDrives(requestParams);
                            var { drives, nextPageToken: nextPageToken } = response;
                            if (!drives.length) return resolve(page);
                            drives = page.getSize() + drives.length > limit ? drives.slice(0, Math.max(limit - page.getSize(), 0)) : drives;
                            var items = await this._convertToCloudItems(drives);
                            return (
                                page.update({ nextPageToken: nextPageToken, items: items }),
                                page.getSize() < limit && nextPageToken && (page = await this.getStorages(query, page)),
                                resolve(page.getItems())
                            );
                        } catch (e) {
                            reject();
                        }
                    })
                );
            }),
            (GGoogleDriveStorage.prototype._buildGoogleClient = async function (tokenConfig) {
                if (!tokenConfig) {
                    if (!gContainer.getGoogleAPI().isLoaded()) throw Error("Google Drive Client not loaded!");
                    tokenConfig = await gContainer.getGoogleAPI().getTokenConfiguration({
                        corporate: false,
                        accountId: this._accountId,
                    });
                }
                return new GGoogleDriveClient(new TokenIssuer(tokenConfig));
            }),
            (GGoogleDriveStorage.prototype.getSupportedFileFormats = function () {
                return GGoogleDrive.getSupportedFileFormats();
            }),
            (GGoogleDriveStorage.prototype.generatePreviousSelectedFolderPath = async function () {
                const currentFolder = this.getCurrentFolder();
                if (this.isRootFolder(currentFolder)) return ((this.PREVIOUS_SELECTED_FOLDER_PATH = []), this.PREVIOUS_SELECTED_FOLDER_PATH);
                this.PREVIOUS_SELECTED_FOLDER_PATH.push(currentFolder.id);
                let parentId = currentFolder.getParentId() ? currentFolder.getParentId() : currentFolder.parents ? currentFolder.parents[0] : null;
                if (parentId && parentId !== this._rootFolderID) {
                    let parentFolder = await this.getFolder(parentId).catch(() => null);
                    for (; parentFolder; )
                        (this.PREVIOUS_SELECTED_FOLDER_PATH.push(parentFolder.id),
                            (parentId = parentFolder.getParentId() ? parentFolder.getParentId() : parentFolder.parents ? parentFolder.parents[0] : null),
                            (parentFolder = parentId && parentId !== this._rootFolderID ? await this.getFolder(parentId).catch(() => null) : null));
                }
                return this.PREVIOUS_SELECTED_FOLDER_PATH;
            }),
            (GGoogleDriveStorage.SearchEngine = {
                SortMap: {
                    "-updated": "".concat(GGoogleDriveClient.SearchEngine.OrderBy.ModifiedTime, " ").concat(GGoogleDriveClient.SearchEngine.Sorts.Descending),
                    updated: "".concat(GGoogleDriveClient.SearchEngine.OrderBy.ModifiedTime, " ").concat(GGoogleDriveClient.SearchEngine.Sorts.Ascending),
                    "-created": "".concat(GGoogleDriveClient.SearchEngine.OrderBy.CreatedTime, " ").concat(GGoogleDriveClient.SearchEngine.Sorts.Descending),
                    created: "".concat(GGoogleDriveClient.SearchEngine.OrderBy.CreatedTime, " ").concat(GGoogleDriveClient.SearchEngine.Sorts.Ascending),
                    "-name": "".concat(GGoogleDriveClient.SearchEngine.OrderBy.Name, " ").concat(GGoogleDriveClient.SearchEngine.Sorts.Descending),
                    name: "".concat(GGoogleDriveClient.SearchEngine.OrderBy.Name, " ").concat(GGoogleDriveClient.SearchEngine.Sorts.Ascending),
                    "-viewed": "".concat(GGoogleDriveClient.SearchEngine.OrderBy.ViewedByMeTime, " ").concat(GGoogleDriveClient.SearchEngine.Sorts.Descending),
                    viewed: "".concat(GGoogleDriveClient.SearchEngine.OrderBy.ViewedByMeTime, " ").concat(GGoogleDriveClient.SearchEngine.Sorts.Ascending),
                },
            }),
            (module.exports = GGoogleDriveStorage));
    };
