module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(30 /* polyfill:Object */), require(57), require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(356 /* polyfill:RegExp */), require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(41), require(13), require(97));
        var GObject = require(1),
            Utils = require(40),
            CDRSaveHelper = _interopRequireDefault(require(847)),
            GGoogleDriveClient = _interopRequireDefault(require(848 /* GGoogleDriveClient */)),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            designerConfig = require(10),
            GoogleToCloudRoleMap = _interopRequireDefault(require(787)),
            CloudToGoogleRoleMap = _interopRequireDefault(require(789)),
            ProgressCalculator = _interopRequireDefault(require(555));
        const GExternalStorage = require(388),
            GCommonNames = require(119),
            GAccessToken = require(595),
            GStorageEvent = require(336),
            GCollaborativeFileMixin = require(436),
            GDocumentEvent = require(78),
            CloudFile = require(156),
            GFileTypes = require(389),
            FileStatus = require(86),
            DocumentMetadata = require(790),
            ThumbnailImage = require(554),
            { FILE_FORMATS } = require(10 /* designerConfig */),
            defaultFileFormat = Object.values(FILE_FORMATS).find((fileFormat) => fileFormat.default),
            PROGRESS_START = 10,
            PROGRESS_SERIALIZED = 50,
            PROGRESS_UPLOAD_END = 80,
            PROGRESS_COMPLETE = 100;
        function GGoogleDriveStorage() {}
        (GObject.GObject.inherit(GGoogleDriveStorage, GExternalStorage),
            (GGoogleDriveStorage.getSupportedFileFormats = function () {
                return GFileTypes.getFileTypesArray().filter((fileType) => fileType.load);
            }),
            (GGoogleDriveStorage.convertToCloudItem = function (googleFile) {
                var cloudFile = CloudFile.from(googleFile);
                if (
                    ((cloudFile.updated = googleFile.modifiedTime),
                    (cloudFile.created = googleFile.createdTime),
                    (cloudFile.storage = CloudFile.Storage.GoogleDrive),
                    !cloudFile.kind || (cloudFile.kind !== GGoogleDriveClient.default.Kind.TeamDrive && cloudFile.kind !== GGoogleDriveClient.default.Kind.Drive)
                        ? cloudFile.mimeType === GGoogleDriveClient.default.MimeType.Folder
                            ? cloudFile.setItemType(CloudFile.Type.Folder)
                            : (cloudFile.setItemType(CloudFile.Type.File), cloudFile.setVersion(googleFile.version), cloudFile.setModificationTime(googleFile.modifiedTime))
                        : cloudFile.setItemType(CloudFile.Type.CorporateStorage),
                    cloudFile.mimeType && (cloudFile.type = cloudFile.mimeType),
                    cloudFile.fileExtension)
                ) {
                    ((cloudFile.extension = cloudFile.fileExtension), (cloudFile.name = googleFile.name.replace(new RegExp(".(".concat(cloudFile.extension, ")$"), "i"), "")));
                    const matchedFormat = GGoogleDriveStorage.getSupportedFileFormats().find((format) => format.ext.toLowerCase() === cloudFile.fileExtension.toLowerCase());
                    matchedFormat && ((cloudFile.type = matchedFormat.type || matchedFormat.mime), cloudFile.setMimeType(cloudFile.type));
                }
                return (
                    cloudFile.capabilities &&
                        (cloudFile.capabilities.canDownload && (cloudFile.setPermission(CloudFile.Permission.Download), cloudFile.setPermission(CloudFile.Permission.Open)),
                        cloudFile.capabilities.canEdit && cloudFile.setPermission(CloudFile.Permission.Editing)),
                    cloudFile.parent || (cloudFile.parent = null),
                    cloudFile.hasThumbnail && cloudFile.setPreviewURL(cloudFile.thumbnailLink),
                    cloudFile.size && cloudFile.setSize(cloudFile.size),
                    cloudFile
                );
            }),
            (GGoogleDriveStorage.Item = function (storage, file, rawData) {
                let token = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                (GExternalStorage.Item.call(this, storage, file),
                    (this._rawData = rawData),
                    (this._token = token),
                    file && (this._setExtension(), file.version && (this._version = file.version)));
            }),
            GObject.GObject.inheritAndMix(GGoogleDriveStorage.Item, GExternalStorage.Item, [GCollaborativeFileMixin]),
            (GGoogleDriveStorage.Item.prototype._version = null),
            (GGoogleDriveStorage.Item.prototype._writing = false),
            (GGoogleDriveStorage.Item.prototype.setFile = function (file) {
                if (!file) throw "File is incorrect";
                file instanceof CloudFile || (file = GGoogleDriveStorage.convertToCloudItem(file));
                const client = this._getOrCreateClient(),
                    tokenSettings = client && client.getTokenIssuerSettings();
                (!file.settings && tokenSettings && (file = Object.assign(file, { settings: tokenSettings })),
                    GExternalStorage.Item.prototype.setFile.call(this, file),
                    this._setExtension(),
                    this._setVersion(file.version));
            }),
            (GGoogleDriveStorage.Item.prototype.isVersionNewerThan = function (other) {
                if (other instanceof GGoogleDriveStorage.Item && this.getUniqueId() === other.getUniqueId()) {
                    var versionIsNewer = this.getVersion() > other.getVersion(),
                        otherFile = other.getFile();
                    const thisFile = this.getFile();
                    if (versionIsNewer && isDateAfter(thisFile.modifiedTime, otherFile.modifiedTime)) return true;
                    const fileVersionIsNewer = thisFile.getVersion() > otherFile.getVersion(),
                        modificationTimeIsNewer = isDateAfter(thisFile.getModificationTime(), otherFile.getModificationTime());
                    if (fileVersionIsNewer && modificationTimeIsNewer) return true;
                }
                return false;
                function isDateAfter(dateA, dateB) {
                    return new Date(dateA).getTime() > new Date(dateB).getTime();
                }
            }),
            (GGoogleDriveStorage.Item.prototype.supportsShadowFile = function () {
                const client = this._getOrCreateClient();
                return !!client && client.isCorporate();
            }),
            (GGoogleDriveStorage.Item.prototype.getCollaborativeFile = async function () {
                if (!this.supportsShadowFile()) throw "Not the collaborative mode";
                return (
                    (this._collaborativeFile = await gDesigner
                        .getCloudCommunicationManager()
                        .getExternalFile(this.getId())
                        .catch(() => null)),
                    this._collaborativeFile
                );
            }),
            (GGoogleDriveStorage.Item.prototype.setCollaborativeFileStatus = async function (newStatus) {
                if (!this.supportsShadowFile()) throw "Not the collaborative mode";
                const collaborativeFile = this._collaborativeFile ? this._collaborativeFile : await this.getCollaborativeFile();
                if (collaborativeFile && Number(collaborativeFile.status) !== Number(newStatus)) {
                    var oldStatus = collaborativeFile.status;
                    ((collaborativeFile.status = newStatus),
                        gDesigner.hasEventListeners(GStorageEvent.FileStatusUpdate) && gDesigner.trigger(new GStorageEvent.FileStatusUpdate(this, oldStatus, newStatus)));
                }
            }),
            (GGoogleDriveStorage.Item.prototype.getOrCreateCollaborativeFile = async function () {
                if (!this.supportsShadowFile()) throw "Not the collaborative mode";
                var collaborativeFile = await this.getCollaborativeFile();
                return (collaborativeFile || (await this.createShadowFile(), (collaborativeFile = await this.getCollaborativeFile())), collaborativeFile);
            }),
            (GGoogleDriveStorage.Item.prototype._app = designerConfig.FILE_ID_PREFIX.GOOGLEDRIVE),
            (GGoogleDriveStorage.Item.prototype.getId = function () {
                const googleId = this._getGoogleId();
                return googleId ? CloudFile.getCollaborativeFileId(googleId, CloudFile.Storage.GoogleDrive) : null;
            }),
            (GGoogleDriveStorage.Item.prototype._getGoogleId = function () {
                return this._id || null;
            }),
            (GGoogleDriveStorage.Item.prototype._setExtension = function () {
                const file = this.getFile();
                file &&
                    (file.fileExtension
                        ? (this._ext = file.fileExtension)
                        : ["application/vnd.corel-draw", "application/cdr"].includes(file.mimeType)
                          ? (this._ext = "CDR")
                          : "application/des" === file.mimeType && (this._ext = "DES"));
            }),
            (GGoogleDriveStorage.Item.prototype._setFileSizeAfterSaved = async function () {
                return this._getOrCreateClient()
                    .getFileDetails(this.getUniqueId())
                    .then((fileDetails) => {
                        this._fileSizeAfterSaved = fileDetails.Length;
                    });
            }),
            (GGoogleDriveStorage.Item.prototype.write = async function (document, onSuccess, onError, onProgress, options) {
                gContainer.verifyEnoughMemoryToSave(document);
                try {
                    if (this._writing) return;
                    if (document.hasPagesWithInfiniteEmptyCanvas())
                        return void (onError
                            ? onError({
                                  code: 507,
                                  noFailCall: true,
                                  message: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas")),
                              })
                            : GSystemDialog.default.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas"))));
                    this._writing = true;
                    const savePoint = document.getEditor().markSavePoint(),
                        rollbackAndFail = (error) => {
                            (savePoint.rollback(), onError && onError(error));
                        };
                    try {
                        const statusData = {};
                        document.updateStatus(FileStatus.Saving, statusData);
                        const progressCallback = onProgress || statusData.progress,
                            reportProgress = (percent) => {
                                progressCallback && progressCallback(percent);
                            };
                        let fileBlob;
                        var extension = this.getExtension();
                        const isNewDocument = document.isNew();
                        if ((reportProgress(PROGRESS_START), GObject.GUtil.prepareForSaving(document.getScene(), extension), "CDR" === extension || "DES" === extension)) {
                            var cdrOptions = { progress: onProgress, ext: extension.toLowerCase() };
                            fileBlob = await this._exportDocumentToCDR(document, cdrOptions, options);
                        } else {
                            var scene = document.getScene(),
                                serializedScene = GObject.GNode.serialize(scene, GObject.GUtil.extend({ save: true }, options));
                            fileBlob = new Blob([serializedScene]);
                        }
                        (reportProgress(PROGRESS_SERIALIZED), this._verifyFileNotTooSmall(fileBlob.size, document), this._setFileSizeBeforeSaved(fileBlob.size));
                        const metadata = await this._buildGoogleMetadataForDoc(document),
                            onUploadProgress = (uploadFraction) => {
                                reportProgress(ProgressCalculator.default.calculateProgress(PROGRESS_SERIALIZED, PROGRESS_UPLOAD_END, uploadFraction));
                            };
                        var googleFileId = this._id ? this._id : null;
                        await this._getOrCreateClient()
                            .upload(googleFileId, fileBlob, metadata, GGoogleDriveClient.default.DefaultUploadType, onUploadProgress)
                            .then(async (uploadResponse) => {
                                this._updateInternalFileWithGoogleResponse(uploadResponse);
                                try {
                                    (await this._setFileSizeAfterSaved(), this._verifyFileSizeAfterSaved());
                                } catch (error) {
                                    console.error(error);
                                }
                                if ((document.updateStatus(FileStatus.Saved), isNewDocument && this.supportsShadowFile()))
                                    return this.createShadowFile().then(() => {
                                        (gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.StorageItemUpdated, document)),
                                            onSuccess && onSuccess());
                                    });
                                (gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.StorageItemUpdated, document)), reportProgress(PROGRESS_COMPLETE), onSuccess && onSuccess());
                            })
                            .catch((error) => {
                                (document.updateStatus(FileStatus.SaveFailed), rollbackAndFail(error));
                            })
                            .finally(() => {
                                this._writing = false;
                            });
                    } catch (error) {
                        rollbackAndFail(error);
                    }
                } catch (error) {
                    return (document.updateStatus(FileStatus.SaveFailed), (this._writing = false), onError && onError(error));
                }
            }),
            (GGoogleDriveStorage.Item.prototype.createOrUpdateFileWithMetadata = async function (fileData, docMetadata) {
                try {
                    if (this._writing) return;
                    this._writing = true;
                    const googleMetadata = await this._buildGoogleMetadata(docMetadata),
                        uploadResponse = await this._getOrCreateClient().upload(this._getGoogleId(), new Blob([fileData]), googleMetadata);
                    this._updateInternalFileWithGoogleResponse(uploadResponse);
                } finally {
                    this._writing = false;
                }
            }),
            (GGoogleDriveStorage.Item.prototype._updateInternalFileWithGoogleResponse = function (googleResponse) {
                this.setFile(
                    Object.assign(GGoogleDriveStorage.convertToCloudItem(googleResponse), {
                        settings: this._getOrCreateClient().getTokenIssuerSettings(),
                    })
                );
            }),
            (GGoogleDriveStorage.Item.prototype._getOrCreateClient = function () {
                let client = this.getCloudClient();
                return (!client && this._file && ((client = new GGoogleDriveClient.default(new GAccessToken(this._file.settings))), this.setCloudClient(client)), client);
            }),
            (GGoogleDriveStorage.Item.prototype._getClient = function () {
                return this._getOrCreateClient();
            }),
            (GGoogleDriveStorage.Item.prototype._exportDocumentToCDR = function (document, cdrOptions) {
                let extraOptions = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return new Promise(async (resolve, reject) => {
                    CDRSaveHelper.default.prepareCDRforSaving(
                        document,
                        function (error) {
                            return reject(error);
                        },
                        cdrOptions,
                        extraOptions,
                        function (data) {
                            return resolve(new Blob([data]));
                        }
                    );
                });
            }),
            (GGoogleDriveStorage.Item.prototype._setVersion = function (version) {
                this._version = version;
            }),
            (GGoogleDriveStorage.Item.prototype.getVersion = function () {
                return parseInt(this._version);
            }),
            (GGoogleDriveStorage.Item.prototype.read = async function (onData, onError) {
                if (this._rawData) {
                    var rawData = this._rawData;
                    return ((this._rawData = null), onData(rawData));
                }
                await this._getOrCreateClient()
                    .getFile(this.getUniqueId(), this._getQuery())
                    .then(async (fileBlob) => {
                        const fileDetails = await this._getOrCreateClient().getFileDetails(this.getUniqueId(), this._getQuery());
                        (this.setFile(fileDetails),
                            this.supportsShadowFile() && (await this.syncShadowFile()),
                            onData(await GCommonNames.createUint8ArrayFromBlob(fileBlob)));
                    })
                    .catch((error) => onError(error));
            }),
            (GGoogleDriveStorage.Item.prototype.getToken = function () {
                return this._token;
            }),
            (GGoogleDriveStorage.Item.prototype.getMimeType = function () {
                return this.getFile().mimeType;
            }),
            (GGoogleDriveStorage.Item.prototype.getPermissionsList = function () {
                return this._getOrCreateClient().getFilePermissions(this.getUniqueId());
            }),
            (GGoogleDriveStorage.Item.prototype.rolesMatch = function (googleRole, cloudRole) {
                return GoogleToCloudRoleMap.default[googleRole] === cloudRole || CloudToGoogleRoleMap.default[cloudRole] === googleRole;
            }),
            (GGoogleDriveStorage.Item.prototype.getShareRole = async function (targetEmail) {
                return this._getOrCreateClient()
                    .getFilePermissions(this.getUniqueId())
                    .then((permissionsResponse) => {
                        let foundRole = null;
                        return (
                            permissionsResponse &&
                                permissionsResponse.permissions &&
                                permissionsResponse.permissions.length &&
                                permissionsResponse.permissions.some((permission) => {
                                    let { email, role } = permission;
                                    if (targetEmail === email) return ((foundRole = role), true);
                                }),
                            foundRole
                        );
                    });
            }),
            (GGoogleDriveStorage.Item.prototype.requestExternalShare = function (email, shareRole) {
                let isCorporate = false;
                try {
                    isCorporate = this._getOrCreateClient().isCorporate();
                } catch (e) {}
                return isCorporate
                    ? email
                        ? this._shareWithUser(email, shareRole.getRole())
                        : this._shareWithDomain(shareRole.getRole())
                    : Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.only-for-corporate")));
            }),
            (GGoogleDriveStorage.Item.prototype.requestExternalUnShare = async function (email, shareRole) {
                let isCorporate = false;
                try {
                    isCorporate = this._getOrCreateClient().isCorporate();
                } catch (e) {}
                if (!isCorporate) return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.only-for-corporate")));
                if (shareRole && shareRole.is(designerConfig.ShareRoles.NoAccess)) return Promise.resolve();
                const shareIds = await this._getOrCreateClient().getShareIdForEmail(this.getUniqueId(), email);
                for (let e = 0, t = shareIds.length; e < t; e++)
                    try {
                        const removeResult = await this._getOrCreateClient().removeShare(this.getUniqueId(), shareIds[e]);
                        if (removeResult.status !== designerConfig.gApi.HTTP_STATUS_CODES.OK && removeResult.status !== designerConfig.gApi.HTTP_STATUS_CODES.NO_CONTENT) {
                            const errorMessage =
                                (removeResult && removeResult.error && removeResult.error.message) ||
                                GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.google-api-error"));
                            return Promise.reject(errorMessage);
                        }
                    } catch (error) {
                        return Promise.reject(error);
                    }
                return Promise.resolve();
            }),
            (GGoogleDriveStorage.Item.prototype._shareWithUser = async function (email, role) {
                return this._getOrCreateClient().createOrUpdateUserShare(this.getUniqueId(), { role: role, emailAddress: email });
            }),
            (GGoogleDriveStorage.Item.prototype.isEmailFromCorporateDomain = async function (email) {
                const syncUser = gDesigner.getSyncUser();
                let isCorporateDomain = true;
                if (await this._getOrCreateClient().supportsEmailDomainCheck()) {
                    (await this._getOrCreateClient()
                        .getAccountByEmail(email)
                        .catch(() => false)) || (isCorporateDomain = false);
                } else designerConfig.gApi.sameDomain(syncUser, { email: email }) || (isCorporateDomain = false);
                return isCorporateDomain;
            }),
            (GGoogleDriveStorage.Item.prototype._shareWithDomain = async function (role) {
                const user = await gDesigner.getUser(),
                    domain = user && user.email.split("@")[1];
                return this._getOrCreateClient().createDomainShare(this.getUniqueId(), {
                    role: role,
                    domain: domain,
                });
            }),
            (GGoogleDriveStorage.Item.prototype._setId = function (id) {
                ((this._id = id), this._file && (this._file.id = id));
            }),
            (GGoogleDriveStorage.Item.prototype._buildGoogleMetadataForDoc = async function (document) {
                const metadata = new DocumentMetadata();
                metadata.thumbnail = await ThumbnailImage.fromBlob(await document.buildPreview());
                const scene = document.getScene();
                metadata.unit = scene.getProperty("ut");
                const activePage = scene.getActivePage(),
                    bbox = activePage && activePage.getGeometryBBox();
                return (bbox && ((metadata.width = bbox.getWidth()), (metadata.height = bbox.getHeight())), this._buildGoogleMetadata(metadata));
            }),
            (GGoogleDriveStorage.Item.prototype._buildGoogleMetadata = async function (metadata) {
                const extension = this._file.getExtension() || defaultFileFormat.ext.toUpperCase(),
                    mimeType =
                        this._file.getMimeType() ||
                        ((lookupExtension = extension),
                        Object.values(FILE_FORMATS).find((format) => {
                            let { ext } = format;
                            return !!ext && ext.toLowerCase() === lookupExtension.toLowerCase();
                        }) || defaultFileFormat).type;
                var lookupExtension;
                const thumbnailBlob = metadata.thumbnail.getImageAsBlob(),
                    thumbnailBase64 = await this._buildSafeEncodedBase64ForBlob(thumbnailBlob),
                    requestBody = {
                        name: this._file.getNameWithExtension(),
                        mimeType: mimeType,
                        contentHints: {
                            thumbnail: { mimeType: metadata.thumbnail.getMimeType(), image: thumbnailBase64 },
                        },
                        appProperties: {
                            type: mimeType,
                            app: "designer",
                            unit: metadata.unit,
                            width: metadata.width,
                            height: metadata.height,
                            trashed: null,
                        },
                        viewedByMeTime: new Date().toISOString(),
                    };
                return (
                    this._file.parent && !this.getUniqueId() && (requestBody.parents = [this._file.getParentId()]),
                    this._isFromGSuite() && (requestBody.driveId = this._getTeamDriveId()),
                    requestBody
                );
            }),
            (GGoogleDriveStorage.Item.prototype._buildSafeEncodedBase64ForBlob = function (blob) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    ((reader.onload = (event) => {
                        const dataUrl = event.target.result,
                            base64Data = dataUrl.substr(dataUrl.indexOf(",") + 1),
                            encodedData = (0, Utils.base64URLSafeEncode)(base64Data);
                        resolve(encodedData);
                    }),
                        (reader.onerror = function () {
                            reject(reader.error);
                        }),
                        reader.readAsDataURL(blob));
                });
            }),
            (GGoogleDriveStorage.Item.prototype.hasVersionControl = function () {
                return true;
            }),
            (GGoogleDriveStorage.Item.prototype.hasUpdates = async function () {
                if (!this.getUniqueId() || !this.getVersion()) return false;
                const fileDetails = await this._getOrCreateClient().getFileDetails(this.getUniqueId(), this._getQuery());
                return new GGoogleDriveStorage.Item(this.getStorage(), fileDetails).isVersionNewerThan(this);
            }),
            (GGoogleDriveStorage.Item.prototype._getQuery = function () {
                return this._isFromGSuite() ? { supportsAllDrives: true } : {};
            }),
            (GGoogleDriveStorage.Item.prototype._isFromGSuite = function () {
                return !!this._getTeamDriveId();
            }),
            (GGoogleDriveStorage.Item.prototype._getTeamDriveId = function () {
                const driveId = this._file.driveId;
                if (driveId) return driveId;
                const parentDriveId = this._file.parent && this._file.parent.driveId;
                return parentDriveId || null;
            }),
            (GGoogleDriveStorage.Item.prototype.getLatestFileVersion = async function () {
                const client = this._getOrCreateClient(),
                    fileInfo = await this.getLatestFileInfo(),
                    fileBlob = await client.getFile(this.getUniqueId(), this._getQuery()),
                    fileData = await GCommonNames.createUint8ArrayFromBlob(fileBlob),
                    item = new GGoogleDriveStorage.Item(this._storage, fileInfo, fileData);
                return (item.setCloudClient(client), item);
            }),
            (GGoogleDriveStorage.Item.prototype.getLatestFileInfo = async function () {
                const fileDetails = await this._getOrCreateClient().getFileDetails(this.getUniqueId(), this._getQuery());
                return GGoogleDriveStorage.convertToCloudItem(fileDetails);
            }),
            (GGoogleDriveStorage.Item.prototype.exists = function () {
                return this._getOrCreateClient().fileExists(this.getUniqueId(), this._getQuery());
            }),
            (GGoogleDriveStorage.Item.prototype.toString = function () {
                return "[Object GGoogleDriveStorage.Item]";
            }),
            (module.exports = GGoogleDriveStorage));
    };
