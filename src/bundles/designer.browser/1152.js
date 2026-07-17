module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(3));
        var GObject = require(1),
            cdrSaveUtils = require(847),
            GSharePointClient = _interopRequireDefault(require(1239 /* GSharePointClient */)),
            GExternalStorage = _interopRequireDefault(require(388 /* GExternalStorage */)),
            SPBasePermissions = _interopRequireDefault(require(1481)),
            designerConfig = require(10),
            GError = _interopRequireDefault(require(594));
        const StorageItemStatus = require(86),
            StorageItemEvent = require(336),
            CollaborativeFileMixin = require(436),
            GDocumentEvent = require(78),
            CloudFile = require(156),
            progressPrepared = 10,
            progressBlobReady = 50,
            progressUploaded = 80,
            progressDone = 100;
        function GSharePointStorage() {}
        (GObject.GObject.inherit(GSharePointStorage, GExternalStorage.default),
            (GSharePointStorage.Item = function (id, file) {
                let token = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                (GExternalStorage.default.Item.call(this, id, file),
                    (this._ext = null),
                    (this._token = token),
                    this._setExtension(),
                    CollaborativeFileMixin.call(this, designerConfig.FILE_ID_PREFIX.SHAREPOINT));
            }),
            GObject.GObject.inheritAndMix(GSharePointStorage.Item, GExternalStorage.default.Item, [CollaborativeFileMixin]),
            (GSharePointStorage.Item.prototype._app = designerConfig.FILE_ID_PREFIX.SHAREPOINT),
            (GSharePointStorage.Item.prototype.getId = function () {
                const sharepointId = this._getSharepointId();
                return sharepointId ? "".concat(this._app, "_").concat(sharepointId) : null;
            }),
            (GSharePointStorage.Item.prototype.setFile = function (file) {
                (file &&
                    ((file.storage = CloudFile.Storage.SharePoint),
                    !file.relativeUrl &&
                        file instanceof CloudFile &&
                        (file.relativeUrl = file.parent && file.parent.relativeUrl + "/" + file.getNameWithExtension())),
                    GExternalStorage.default.Item.prototype.setFile.call(this, file));
            }),
            (GSharePointStorage.Item.prototype._getSharepointId = function () {
                return this._id ? this._id : null;
            }),
            (GSharePointStorage.Item.prototype.getCollaborativeFile = async function () {
                return (
                    (this._collaborativeFile = await gDesigner
                        .getCloudCommunicationManager()
                        .getExternalFile(this.getId())
                        .catch(() => null)),
                    this._collaborativeFile
                );
            }),
            (GSharePointStorage.Item.prototype.setCollaborativeFileStatus = async function (status) {
                const collaborativeFile = this._collaborativeFile;
                if (collaborativeFile && collaborativeFile.status !== status) {
                    var oldStatus = collaborativeFile.status;
                    ((collaborativeFile.status = status),
                        gDesigner.hasEventListeners(StorageItemEvent.FileStatusUpdate) && gDesigner.trigger(new StorageItemEvent.FileStatusUpdate(this, oldStatus, status)));
                }
            }),
            (GSharePointStorage.Item.prototype.getOrCreateCollaborativeFile = async function () {
                var collaborativeFile = await this.getCollaborativeFile();
                return (collaborativeFile || (await this.createShadowFile(), (collaborativeFile = await this.getCollaborativeFile())), collaborativeFile);
            }),
            (GSharePointStorage.Item.prototype.read = function (onSuccess, onError) {
                const file = this.getFile();
                if (this._rawData) {
                    var rawData = this._rawData;
                    return ((this._rawData = null), onSuccess(rawData));
                }
                return function attemptRead() {
                    let alreadyRetried = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    return this._getClient()
                        .getFile(file)
                        .then(async (rawFileData) => {
                            const cloudItem = GSharePointClient.default.convertFileToCloudItem(await this._getClient().getFileDetails(this.getFile()));
                            ((cloudItem.status = file.status),
                                (cloudItem.checkOutStatus = file.checkOutStatus),
                                this.setFile(cloudItem),
                                this._setExtension(),
                                await this.syncShadowFile(),
                                onSuccess(rawFileData));
                        })
                        .catch((error) => {
                            const { id } = file;
                            return !alreadyRetried && error && error.status && 404 === error.status && id
                                ? this._getClient()
                                      .findFileById(id)
                                      .then((foundFile) => {
                                          let { relativeUrl, name, type } = foundFile;
                                          const mergedFile = Object.assign(file, {
                                              name: name,
                                              relativeUrl: relativeUrl,
                                              type: type,
                                          });
                                          return (this.setFile(mergedFile), this._setExtension(), this.updateShadowFile(), attemptRead.call(this, true));
                                      })
                                      .catch(handleError)
                                : handleError();
                            function handleError() {
                                if (!onError) throw error;
                                onError(error);
                            }
                        });
                }.call(this);
            }),
            (GSharePointStorage.Item.prototype.isVersionNewerThan = function (otherItem) {
                if (
                    otherItem instanceof GSharePointStorage.Item &&
                    this.getFile().id === otherItem.getFile().id &&
                    new Date(this.getFile().updated) > new Date(otherItem.getFile().updated)
                )
                    return true;
                const file = this.getFile(),
                    otherFile = otherItem.getFile();
                return new Date(file.getModificationTime()).getTime() > new Date(otherFile.getModificationTime()).getTime();
            }),
            (GSharePointStorage.Item.prototype.hasVersionControl = function () {
                return true;
            }),
            (GSharePointStorage.Item.prototype.hasUpdates = async function () {
                const file = this.getFile();
                if (!this.getId() || !file || (!file.updated && !file.getModificationTime())) return false;
                const latestFileInfo = await this.getLatestFileInfo();
                return new GSharePointStorage.Item(this.getStorage(), latestFileInfo).isVersionNewerThan(this);
            }),
            (GSharePointStorage.Item.prototype.getLatestFileVersion = async function () {
                let client = this._getClient();
                const file = this.getFile(),
                    latestFileInfo = await this.getLatestFileInfo(),
                    latestItem = new GSharePointStorage.Item(
                        this.getStorage(),
                        Object.assign(latestFileInfo, {
                            settings: file.settings,
                            relativeUrl: file.relativeUrl,
                        })
                    );
                return ((latestItem._rawData = await client.getFile(file)), latestItem.setCloudClient(client), latestItem);
            }),
            (GSharePointStorage.Item.prototype.getLatestFileInfo = async function () {
                const file = this.getFile(),
                    fileQuery = { relativeUrl: file.relativeUrl };
                if (!fileQuery.relativeUrl) {
                    const parent = file.getParent();
                    parent instanceof CloudFile && (fileQuery.relativeUrl = "".concat(parent.relativeUrl, "/").concat(file.getNameWithExtension()));
                }
                const fileDetails = await this._getClient().getFileDetails(fileQuery);
                return GSharePointClient.default.convertFileToCloudItem(fileDetails);
            }),
            (GSharePointStorage.Item.prototype.exists = async function () {
                const file = this.getFile();
                return this._getClient().fileExists(file.getNameWithExtension(), file.getParent());
            }),
            (GSharePointStorage.Item.prototype._setFileSizeAfterSaved = async function (file) {
                return this._getClient()
                    .getFileDetails(file)
                    .then((fileDetails) => {
                        this._fileSizeAfterSaved = fileDetails.size;
                    });
            }),
            (GSharePointStorage.Item.prototype.write = async function (document, onSuccess, onError, onProgress, options) {
                if (this._writing) return;
                this._writing = true;
                let savePoint = null;
                try {
                    (gContainer.verifyEnoughMemoryToSave(document), (savePoint = document.getEditor().markSavePoint()));
                    const statusOptions = {};
                    document.updateStatus(StorageItemStatus.Saving, statusOptions);
                    const progressHandler = onProgress || statusOptions.progress,
                        reportProgress = (percent) => {
                            progressHandler && progressHandler(percent);
                        },
                        isNewFile = document.isNew();
                    (reportProgress(progressPrepared), GObject.GUtil.prepareForSaving(document.getScene(), this.getExtension()));
                    const documentBlob = await this._getDocumentBlob(document, onProgress, options);
                    (reportProgress(progressBlobReady),
                        this._verifyFileNotTooSmall(documentBlob.size, document),
                        this._setFileSizeBeforeSaved(documentBlob.size),
                        await this._createOrUpdateFile(documentBlob),
                        reportProgress(progressUploaded),
                        isNewFile && (await this.createShadowFile()));
                    try {
                        (await this._setFileSizeAfterSaved(this.getFile()).catch((error) => {
                            console.error(error);
                        }),
                            this._verifyFileSizeAfterSaved());
                    } catch (error) {
                        console.error(error);
                    }
                    (document.updateStatus(StorageItemStatus.Saved),
                        gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.StorageItemUpdated, document)),
                        await this._updateModificationTime(),
                        reportProgress(progressDone),
                        onSuccess && onSuccess(this.getFile()));
                } catch (error) {
                    (document.updateStatus(StorageItemStatus.SaveFailed), savePoint && savePoint.rollback(), onError && onError(error));
                } finally {
                    this._writing = false;
                }
            }),
            (GSharePointStorage.Item.prototype._getDocumentBlob = async function (document, onProgress, saveOptions) {
                let blob = null;
                if ("CDR" === this.getExtension() || "DES" === this.getExtension()) {
                    var cdrOptions = { progress: onProgress, ext: this.getExtension().toLowerCase() };
                    blob = await this._exportDocumentToCDR(document, cdrOptions, saveOptions);
                } else {
                    var scene = document.getScene(),
                        serializedScene = GObject.GNode.serialize(scene, GObject.GUtil.extend({ save: true }, saveOptions));
                    blob = new Blob([serializedScene]);
                }
                return blob;
            }),
            (GSharePointStorage.Item.prototype._checkHttpResponseAndThrowIfNecessary = function (response) {
                if (response.status >= designerConfig.HTTP_STATUS_CODES.BAD_REQUEST) {
                    if (response.status === designerConfig.HTTP_STATUS_CODES.BAD_REQUEST)
                        throw Error("Invalid this.response, probably corrupted upload: " + response.status);
                    throw Error("Invalid response status: " + response.status);
                }
            }),
            (GSharePointStorage.Item.prototype._updateFileWithCreatedResponse = function (response) {
                const cloudItem = GSharePointClient.default.convertFileToCloudItem(response);
                ((cloudItem.settings = CloudFile.GCloudSettings.from(this._getClient().getSettings())), this.setFile(Object.assign(this.getFile(), cloudItem)));
            }),
            (GSharePointStorage.Item.prototype._updateModificationTime = async function () {
                const client = this._getClient();
                if (this.getFile().relativeUrl) {
                    const cloudItem = GSharePointClient.default.convertFileToCloudItem(await client.getFileDetails(this.getFile()));
                    (this.getFile().setModificationTime(cloudItem.updated), this.setFile(Object.assign(this.getFile(), { updated: cloudItem.updated })));
                }
            }),
            (GSharePointStorage.Item.prototype.createOrUpdateFileWithMetadata = async function (data) {
                if (!this._writing) {
                    this._writing = true;
                    try {
                        await this._createOrUpdateFile(data);
                    } finally {
                        this._writing = false;
                    }
                }
            }),
            (GSharePointStorage.Item.prototype._createOrUpdateFile = async function (data) {
                let response;
                const client = this._getClient(),
                    blob = data instanceof Blob ? data : new Blob([data]);
                (this._getSharepointId()
                    ? ((response = await client.updateFileContentById(this._getSharepointId(), blob)), this._checkHttpResponseAndThrowIfNecessary(response))
                    : ((response = await client.createFile(this.getFile(), blob)),
                      this._checkHttpResponseAndThrowIfNecessary(response),
                      this._updateFileWithCreatedResponse(await response.json())),
                    await async function () {
                        const file = this.getFile(),
                            client = this._getClient();
                        let updatedFile = Object.assign(file, {
                            settings: CloudFile.GCloudSettings.from(client.getSettings()),
                        });
                        file.relativeUrl || (file.relativeUrl = file.parent && file.parent.relativeUrl + "/" + file.getNameWithExtension());
                        if (file.relativeUrl) {
                            const fileDetails = await client.getFileDetails(file),
                                cloudItem = GSharePointClient.default.convertFileToCloudItem(fileDetails);
                            Object.assign(updatedFile, cloudItem);
                        }
                        this.setFile(updatedFile);
                    }.call(this));
            }),
            (GSharePointStorage.Item.prototype.getToken = function () {
                return this._token;
            }),
            (GSharePointStorage.Item.prototype.checkOut = async function () {
                try {
                    const file = this.getFile(),
                        checkOutStatus = await this._getAndUpdateCheckOutFileStatus();
                    if (this.isCheckedOutByMe()) return;
                    if (checkOutStatus === GSharePointClient.default.FILE_STATUS.LOCKED)
                        throw new GError.default(GObject.GLocale.get(new GObject.GLocaleKey("GSharePointStorage", "text.error-failed-check-out-file")));
                    (await this._getClient().checkOutFile(file), this._setCheckOutStatus(GSharePointClient.default.FILE_STATUS.LOCKED_BY_ME));
                } catch (error) {
                    throw error instanceof GError.default
                        ? error
                        : new GError.default(GObject.GLocale.get(new GObject.GLocaleKey("GSharePointStorage", "text.error-failed-check-out-file")));
                }
            }),
            (GSharePointStorage.Item.prototype.checkIn = async function (comment, checkinType) {
                try {
                    const file = this.getFile();
                    (await this._getClient().checkInFile(file, comment, checkinType),
                        await this._updateModificationTime(),
                        this._setCheckOutStatus(GSharePointClient.default.FILE_STATUS.AVAILABLE),
                        this._triggerStorageItemEvent(StorageItemEvent.Type.FileCheckIn));
                } catch (error) {
                    throw (
                        console.error("Error checking in", error),
                        error instanceof GError.default
                            ? error
                            : new GError.default(
                                  GObject.GLocale.get(
                                      GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.error-could-not-check-in"))
                                  )
                              )
                    );
                }
            }),
            (GSharePointStorage.Item.prototype._setCheckOutStatus = function (status) {
                const file = this.getFile();
                (status === GSharePointClient.default.FILE_STATUS.AVAILABLE
                    ? (file.checkedOut = false)
                    : (status !== GSharePointClient.default.FILE_STATUS.LOCKED_BY_ME && status !== GSharePointClient.default.FILE_STATUS.LOCKED) || (file.checkedOut = true),
                    (file.checkOutStatus = status),
                    this._triggerStorageItemEvent(StorageItemEvent.Type.FileUpdated));
            }),
            (GSharePointStorage.Item.prototype.refreshCheckOutStatus = async function () {
                return (
                    this._refreshCheckOutPromise ||
                        ((this.getFile().checkOutStatus = GSharePointClient.default.FILE_STATUS.LOADING),
                        (this._refreshCheckOutPromise = this._getAndUpdateCheckOutFileStatus().finally(() => {
                            delete this._refreshCheckOutPromise;
                        }))),
                    this._refreshCheckOutPromise
                );
            }),
            (GSharePointStorage.Item.prototype.isCheckedOutByMe = function () {
                return this.getFile().checkOutStatus === GSharePointClient.default.FILE_STATUS.LOCKED_BY_ME;
            }),
            (GSharePointStorage.Item.prototype.isCheckedOutLoading = function () {
                return this.getFile().checkOutStatus === GSharePointClient.default.FILE_STATUS.LOADING;
            }),
            (GSharePointStorage.Item.prototype.isEditingEnabled = function () {
                return !designerConfig.msTeamsMode || this.isCheckedOutByMe();
            }),
            (GSharePointStorage.Item.prototype._getAndUpdateCheckOutFileStatus = async function () {
                const status = await this._getCheckOutFileStatus();
                return (this._setCheckOutStatus(status), this.getFile().checkOutStatus);
            }),
            (GSharePointStorage.Item.prototype._triggerStorageItemEvent = async function (eventType) {
                gDesigner.hasEventListeners(StorageItemEvent) && gDesigner.trigger(new StorageItemEvent(eventType, this));
            }),
            (GSharePointStorage.Item.prototype._getCheckOutFileStatus = async function () {
                const file = this.getFile();
                return file.checkOutStatus && file.checkOutStatus !== GSharePointClient.default.FILE_STATUS.LOADING
                    ? file.checkOutStatus
                    : this._getClient().getCheckOutFileStatus(file);
            }),
            (GSharePointStorage.Item.prototype.getMimeType = function () {
                return this.getFile().type;
            }),
            (GSharePointStorage.Item.prototype.isEmailFromCorporateDomain = async function (email) {
                const client = this._getClient();
                return !!(await client.getAccountByEmail(email).catch(() => null));
            }),
            (GSharePointStorage.Item.prototype._exportDocumentToCDR = function (document, cdrOptions) {
                let extraOptions = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return new Promise(async (resolve, reject) => {
                    (0, cdrSaveUtils.prepareCDRforSaving)(
                        document,
                        function (error) {
                            return reject(error);
                        },
                        cdrOptions,
                        extraOptions,
                        function (blobData) {
                            return resolve(new Blob([blobData]));
                        }
                    );
                });
            }),
            (GSharePointStorage.Item.prototype._getClient = function () {
                let client = this.getCloudClient();
                const file = this.getFile();
                return (!client && file && file.settings && ((client = GSharePointClient.default.getInstance(file.settings)), this.setCloudClient(client)), client);
            }),
            (GSharePointStorage.Item.prototype._setExtension = function (fileOverride) {
                const file = fileOverride || this.getFile();
                file &&
                    file.type &&
                    (["application/vnd.corel-draw", "application/cdr"].includes(file.type)
                        ? (this._ext = "CDR")
                        : "application/des" === file.type && (this._ext = "DES"));
            }),
            (GSharePointStorage.Item.prototype.getMyPermissionsList = async function () {
                const client = this._getClient(),
                    file = this.getFile(),
                    { High, Low } = await client.getFileEffectiveBasePermissions(file).catch(() => ({ High: 0, Low: 0 }));
                if (new SPBasePermissions.default(High, Low).hasPermission(SPBasePermissions.default.Permissions.EditListItems)) {
                    const user = await client._getUser(),
                        creator = await client.getFileCreator(file);
                    return [
                        { email: user.getEmail(), role: designerConfig.ShareRoles.ContentEditor.id },
                        { email: creator.getEmail(), role: designerConfig.ShareRoles.Owner.id },
                    ];
                }
                return [];
            }),
            (GSharePointStorage.Item.prototype.toString = function () {
                return "[Object GSharePointStorage.Item]";
            }),
            (module.exports = GSharePointStorage));
    };
