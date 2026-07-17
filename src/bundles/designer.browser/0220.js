module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(96 /* polyfill:JSON */), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(4), require(41), require(13), require(26));
        var GObject = require(1),
            designerConfig = require(10),
            GStorageEvent = _interopRequireDefault(require(336)),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            Utils = require(40),
            GThumbnail = _interopRequireDefault(require(554)),
            GProgress = _interopRequireDefault(require(555)),
            GStorage = require(237),
            GCommonNames = require(119);
        const CollaborativeFileMixin = require(436),
            FileStatus = require(86);
        var defaultFileFormat = designerConfig.FILE_FORMATS.find((format) => format.default),
            alternateFileFormats = designerConfig.FILE_FORMATS.filter((format) => !format.default);
        const Md5 = require(435),
            pako = require(165 /* PDFNodeStream */);
        function reportErrorToServer(errorInfo) {
            return fetch(designerConfig.gApi.url + "/error", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.assign(errorInfo, { ua: window.navigator.userAgent })),
            });
        }
        function GCloudStorage() {}
        (GObject.GObject.inherit(GCloudStorage, GStorage),
            (GCloudStorage.ProgressStages = {
                Preparing: 0,
                SyncingImages: 50,
                UploadingFile: 100,
            }),
            (GCloudStorage.from = async function (type, source, filenameOverride, versionId, isAutoSave) {
                let fileData = source;
                return (
                    "string" == typeof source && (fileData = await GCommonNames.getFileDataForVersionOrAutoSave(source, versionId, isAutoSave)),
                    fileData ? new GCloudStorage.Item(type, fileData.id, filenameOverride || fileData.name, fileData, versionId || fileData.version, null, isAutoSave) : null
                );
            }),
            (GCloudStorage.Item = function (type, id, filename, fileData, versionId, token, isAutoSave) {
                if (
                    (GStorage.Item.call(this, type),
                    (this._filename = filename),
                    (this._id = id),
                    (this._file = fileData && GCommonNames.convertToCloudItem(fileData)),
                    (this._versionId = versionId),
                    (this._token = token),
                    (this._isAutoSave = "boolean" == typeof isAutoSave ? isAutoSave : !(!fileData || !fileData.autosave)),
                    (this._fileLastModifiedDate = fileData && new Date(fileData.updated || fileData.created)),
                    (this._fileAutoSaveLastModifiedDate = fileData && new Date(fileData.autosave_updated)),
                    fileData && alternateFileFormats.length)
                ) {
                    var matchedFormat = null;
                    (fileData.type
                        ? (matchedFormat = alternateFileFormats.find((format) => format.type === this._file.getMimeType()))
                        : this._file.getExtension() && (matchedFormat = alternateFileFormats.find((format) => format.ext === this._file.getExtension())),
                        matchedFormat && ((this._ext = matchedFormat.ext.toUpperCase()), (this._type = matchedFormat.type)));
                }
            }),
            GObject.GObject.inheritAndMix(GCloudStorage.Item, GStorage.Item, [CollaborativeFileMixin]),
            (GCloudStorage.Item.prototype._filename = null),
            (GCloudStorage.Item.prototype._ext = null),
            (GCloudStorage.Item.prototype._type = null),
            (GCloudStorage.Item.prototype._id = null),
            (GCloudStorage.Item.prototype._file = null),
            (GCloudStorage.Item.prototype._versionId = null),
            (GCloudStorage.Item.prototype._token = null),
            (GCloudStorage.Item.prototype._isAutoSave = null),
            (GCloudStorage.Item.prototype.isRegistrable = function () {
                return !!this.getId();
            }),
            (GCloudStorage.Item.prototype.getId = function () {
                return this._id;
            }),
            (GCloudStorage.Item.prototype.isVersionAutoSave = function () {
                return this._isAutoSave;
            }),
            (GCloudStorage.Item.prototype.getToken = function () {
                return this._token;
            }),
            (GCloudStorage.Item.prototype.getFullName = function () {
                return this._filename;
            }),
            (GCloudStorage.Item.prototype.getName = function () {
                return GObject.GUtil.xss(this._filename);
            }),
            (GCloudStorage.Item.prototype.getVersionId = function () {
                return this._versionId || null;
            }),
            (GCloudStorage.Item.prototype.setVersionId = function (versionId) {
                this._versionId = versionId;
            }),
            (GCloudStorage.Item.prototype.storeFileFormatVersion = function (fileFormatVersion) {
                return (
                    (this._fileFormatVersion = fileFormatVersion),
                    this.supportsSharing()
                        ? designerConfig.gApi.updateFileFormat(this.getId(), {
                              fileFormat: this._fileFormatVersion,
                          })
                        : Promise.resolve()
                );
            }),
            (GCloudStorage.Item.prototype.setCollaborativeFileStatus = async function (status) {
                if (this._file.status !== status) {
                    var oldStatus = this._file.status;
                    ((this._file.status = status),
                        gDesigner.hasEventListeners(GStorageEvent.default.FileStatusUpdate) &&
                            gDesigner.trigger(new GStorageEvent.default.FileStatusUpdate(this, oldStatus, status)));
                }
            }),
            (GCloudStorage.Item.prototype.getCollaborativeFile = async function () {
                return this._file;
            }),
            (GCloudStorage.Item.prototype.setFileName = function (filename) {
                this._filename = filename;
            }),
            (GCloudStorage.Item.prototype.getOrCreateCollaborativeFile = async function () {
                return gDesigner.getCloudCommunicationManager().getFileExtended(this.getId());
            }),
            (GCloudStorage.Item.prototype.getExtension = function () {
                return this._ext || defaultFileFormat.ext.toUpperCase();
            }),
            (GCloudStorage.Item.prototype.getType = function () {
                return this._type || defaultFileFormat.type;
            }),
            (GCloudStorage.Item.prototype.setFile = function (file) {
                if (!file) throw new Error("File can not be null");
                const oldStatus = this._file && this._file.status,
                    fileExtended = new designerConfig.FileExtended(file);
                ((this._file = GCommonNames.convertToCloudItem(file)),
                    (this._id = file.id),
                    (this._name = file.name),
                    (this._versionId = file.version),
                    (this._fileLastModifiedDate = new Date(file.updated)),
                    (this._fileAutoSaveLastModifiedDate = new Date(file.autosave_updated)),
                    (this._isAutoSave = !!fileExtended.isAutoSave()),
                    this._file.status !== oldStatus &&
                        null != oldStatus &&
                        gDesigner.hasEventListeners(GStorageEvent.default.FileStatusUpdate) &&
                        gDesigner.trigger(new GStorageEvent.default.FileStatusUpdate(this, oldStatus, this._file.status)));
            }),
            (GCloudStorage.Item.prototype.getFile = function () {
                return this._file;
            }),
            (GCloudStorage.Item.prototype.read = async function (onSuccess, onError) {
                if (!this._file.url) {
                    const fileData = await GCommonNames.getFileDataForVersionOrAutoSave(this._id, this._versionId, this._isAutoSave);
                    this._file.url = fileData.url;
                }
                GCommonNames.loadDesignData(this._id, true, this._versionId, this._token, this._file, this._isAutoSave)
                    .then((result) => {
                        onSuccess(result.data);
                    })
                    .catch(onError);
            }),
            (GCloudStorage.Item.prototype.supportsSharing = function () {
                let result = true;
                return (this._id || (result = false), result);
            }),
            (GCloudStorage.Item.prototype._canPerformExtensionSpecificWrite = function () {
                return false;
            }),
            (GCloudStorage.Item.prototype._performExtensionSpecificWrite = async function () {}),
            (GCloudStorage.Item.prototype._syncPreviewThumbnailWithCloud = async function (previewBlob) {
                if (previewBlob)
                    try {
                        const thumbnail = await GThumbnail.default.fromBlob(previewBlob);
                        await this._uploadThumbnail(thumbnail, false);
                    } catch (error) {
                        console.warn("GCloudStorage.Item.prototype._performDefaultWrite", "_uploadThumbnail", error);
                    }
            }),
            (GCloudStorage.Item.prototype._performDefaultWrite = async function (doc, onSuccess, onError, onProgress, isAutoSave) {
                doc.updateStatus(FileStatus.Saving);
                const reportProgress = (progress) => {
                    onProgress && onProgress(progress);
                };
                return GCommonNames
                    .syncCloudImages(doc, this._id, isAutoSave, (progress) => {
                        reportProgress(GProgress.default.calculateProgress(GCloudStorage.ProgressStages.Preparing, GCloudStorage.ProgressStages.SyncingImages, progress));
                    })
                    .then((result) => {
                        let [scene] = result;
                        return (async () => {
                            if (!scene)
                                return (
                                    reportErrorToServer({
                                        message: "[cloud] scene is null",
                                        stack: "id: ".concat(this._id, "\nscene: ").concat(scene),
                                    }),
                                    (this._writing = false),
                                    onError && onError("scene is null")
                                );
                            try {
                                const compressedScene = pako.gzip(scene, { level: 9 }),
                                    compressedSize = compressedScene.hasOwnProperty("size") ? compressedScene.size : compressedScene.length;
                                if (compressedSize <= 0)
                                    return (
                                        reportErrorToServer({
                                            message: "[cloud] empty scene/blob",
                                            stack: "id: ".concat(this._id, "\nscene: ").concat(scene),
                                        }),
                                        (this._writing = false),
                                        onError && onError("empty blob")
                                    );
                                const decompressedScene = pako.ungzip(compressedScene, { to: "string" });
                                if ((this._verifyFileNotTooSmall(compressedSize, doc), !decompressedScene))
                                    return (
                                        reportErrorToServer({
                                            message: "[cloud] invalid Scene",
                                            stack: "id: ".concat(this._id, "\nscene original: ").concat(scene, "\nscene parsed: ").concat(decompressedScene),
                                        }),
                                        (this._writing = false),
                                        onError &&
                                            onError(
                                                "Scene invalid, sending error, please try again or submit a bug issue on https://discuss.gravit.io"
                                            )
                                    );
                                var contentMd5 = Md5.base64(compressedScene);
                                const previewBlob = await doc.buildPreview().catch(() => null),
                                    putUrlResponse = await designerConfig.gApi.signedPutUrls(this._id, {
                                        type: defaultFileFormat.type,
                                        md5: contentMd5,
                                        commit: false,
                                    }),
                                    uploadResponse = await this._uploadWithProgress(putUrlResponse.url, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": defaultFileFormat.type,
                                            "Content-Encoding": "gzip",
                                            "Cache-Control": "public,max-age=31536000",
                                            "Content-MD5": contentMd5,
                                        },
                                        body: compressedScene,
                                        onProgress: (progress) => {
                                            reportProgress(
                                                GProgress.default.calculateProgress(
                                                    GCloudStorage.ProgressStages.SyncingImages,
                                                    GCloudStorage.ProgressStages.UploadingFile,
                                                    progress
                                                )
                                            );
                                        },
                                    });
                                if (uploadResponse.status >= 400)
                                    return (
                                        doc.updateStatus(FileStatus.SaveFailed),
                                        (this._writing = false),
                                        400 === uploadResponse.status
                                            ? onError && onError("Invalid response, probably corrupted upload: " + uploadResponse.status)
                                            : onError && onError("Invalid response status: " + uploadResponse.status)
                                    );
                                await this._syncPreviewThumbnailWithCloud(previewBlob);
                                const sha256Digest = designerConfig.COMPUTE_SHA256_FOR_FILES ? await (0, Utils.getFileSHA256Digest)(compressedScene) : null;
                                (await designerConfig.gApi.commitManualFileUpdate(this._id, [designerConfig.FileTypes.MainFile, designerConfig.FileTypes.ThumbnailPreview]),
                                    await designerConfig.gApi.updateFile(this._id, { trashed: false, sha256: sha256Digest }),
                                    this.setVersionId(null),
                                    gDesigner.hasEventListeners(GStorageEvent.default) &&
                                        gDesigner.trigger(new GStorageEvent.default(GStorageEvent.default.Type.VersionUpdate, this)),
                                    doc.updateStatus(FileStatus.Saved, isAutoSave),
                                    onSuccess && onSuccess(),
                                    (this._writing = false));
                            } catch (error) {
                                ((this._writing = false), doc.updateStatus(FileStatus.SaveFailed), onError && onError(error));
                            }
                        })();
                    })
                    .catch((error) => {
                        (onError(error), (this._writing = false));
                    });
            }),
            (GCloudStorage.Item.prototype.write = async function (doc, onSuccess, onError, onProgress, isAutoSave) {
                if ((gContainer.verifyEnoughMemoryToSave(doc), !this._writing)) {
                    if (!doc.hasPagesWithInfiniteEmptyCanvas()) {
                        this._writing = true;
                        try {
                            await this._checkUserQuotaLimit();
                        } catch (error) {
                            return (onError && onError(error), void (this._writing = false));
                        }
                        return this._canPerformExtensionSpecificWrite()
                            ? this._performExtensionSpecificWrite(doc, onSuccess, onError, onProgress, isAutoSave)
                            : this._performDefaultWrite(doc, onSuccess, onError, onProgress, isAutoSave);
                    }
                    onError
                        ? onError({
                              code: 507,
                              noFailCall: true,
                              message: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas")),
                          })
                        : GSystemDialog.default.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas")));
                }
            }),
            (GCloudStorage.Item.prototype.createOrUpdateFileWithMetadata = async function (fileData, options) {
                if (!this._writing) {
                    this._writing = true;
                    try {
                        (await this._checkUserQuotaLimit(),
                            await this._createFileInCaseNew(),
                            await this._uploadBinary(fileData),
                            await this._uploadThumbnail(options.thumbnail),
                            await this._makeFileVisibleUpdateInternalVersionAndHash(fileData),
                            await this._updateFileAfterSave());
                    } finally {
                        this._writing = false;
                    }
                }
            }),
            (GCloudStorage.Item.prototype._makeFileVisibleUpdateInternalVersionAndHash = async function (fileData) {
                const sha256Digest = designerConfig.COMPUTE_SHA256_FOR_FILES ? await (0, Utils.getFileSHA256Digest)(fileData) : null,
                    updateParams = { trashed: false };
                sha256Digest && (updateParams.sha256 = sha256Digest);
                const updatedFile = await designerConfig.gApi.updateFile(this.getId(), updateParams);
                this.setVersionId(updatedFile.versionId);
            }),
            (GCloudStorage.Item.prototype._updateFileAfterSave = async function () {
                const file = await designerConfig.gApi.getFile(this._id);
                ((this._fileLastModifiedDate = new Date(file.updated)), (this._file = GCommonNames.convertToCloudItem(file)));
            }),
            (GCloudStorage.Item.prototype._isNewFile = function () {
                return !this.getId();
            }),
            (GCloudStorage.Item.prototype._createFileInCaseNew = async function () {
                if (this._isNewFile()) {
                    const createdFile = await designerConfig.gApi.createFile({
                            name: this.getName(),
                            parent: this._file.getParentId(),
                            type: this.getType(),
                            app: "designer",
                            trashed: null,
                        }),
                        fileInfo = await designerConfig.gApi.getFile(createdFile.id, true);
                    ((this._id = this._file.id = createdFile.id),
                        (this._fileLastModifiedDate = new Date(fileInfo.updated || fileInfo.created)),
                        this._file.setModificationTime(new Date(fileInfo.updated || fileInfo.created)));
                }
            }),
            (GCloudStorage.Item.prototype._uploadBinary = async function (fileData) {
                let extraHeaders = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const contentMd5 = Md5.base64(fileData),
                    putUrlResponse = await designerConfig.gApi.signedPutUrls(this.getId(), {
                        type: this.getType(),
                        md5: contentMd5,
                    }),
                    response = await fetch(putUrlResponse.url, {
                        method: "PUT",
                        headers: Object.assign(
                            {
                                "Content-Type": this.getType(),
                                "Cache-Control": "public,max-age=31536000",
                                "Content-MD5": contentMd5,
                            },
                            extraHeaders
                        ),
                        body: fileData,
                    });
                if (response.status >= 400) {
                    if (400 === response.status) throw new Error("Invalid response, probably corrupted upload: " + response.status);
                    throw new Error("Invalid response status: " + response.status);
                }
            }),
            (GCloudStorage.Item.prototype._uploadThumbnail = async function (thumbnail, commit) {
                if (thumbnail) return GCommonNames.updateFileThumbnail(this.getId(), thumbnail.getImageAsBlob(), thumbnail.getMimeType(), commit);
            }),
            (GCloudStorage.Item.prototype._checkUserQuotaLimit = async function () {
                const { pro, free } = gDesigner.getLicense().getQuotas(),
                    quotaLimit = gDesigner.isEnabledProFeatures() ? pro : free;
                if (quotaLimit > 0) {
                    if ((await designerConfig.gApi.quota()) > quotaLimit) {
                        const quotaError = new Error(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.running-out-of-cloud-space")));
                        throw ((quotaError.code = 507), quotaError);
                    }
                }
            }),
            require(1100)(GCloudStorage),
            (GCloudStorage.Item.prototype.getUniqueId = function () {
                return this._id;
            }),
            (GCloudStorage.Item.prototype.hasUpdates = async function () {
                if (!this.getUniqueId()) return false;
                let latestFileInfo = await this.getLatestFileInfo();
                const latestModifiedTime = latestFileInfo.getModificationTime() || latestFileInfo.updated || latestFileInfo.created,
                    localModifiedTime = this._file.getModificationTime() || this._file.updated || this._file.created;
                ((this._fileLastModifiedDate && !isNaN(this._fileLastModifiedDate.getTime())) || (this._fileLastModifiedDate = new Date(localModifiedTime)),
                    (this._fileAutoSaveLastModifiedDate && !isNaN(this._fileAutoSaveLastModifiedDate.getTime())) ||
                        (this._fileAutoSaveLastModifiedDate = new Date(this._file.autosave_updated)));
                return (
                    (latestFileInfo.autosave ? Math.max(new Date(latestModifiedTime).getTime(), new Date(latestFileInfo.autosave_updated).getTime()) : new Date(latestModifiedTime).getTime()) >
                    (this._file.autosave
                        ? Math.max(this._fileLastModifiedDate.getTime(), this._fileAutoSaveLastModifiedDate.getTime())
                        : this._fileLastModifiedDate.getTime())
                );
            }),
            (GCloudStorage.Item.prototype.getLatestFileInfo = async function () {
                const file = await gDesigner.getCloudCommunicationManager().getFile(this._id);
                return GCommonNames.convertToCloudItem(file);
            }),
            (GCloudStorage.Item.prototype.exists = async function () {
                return GCommonNames.fileExists(this._id);
            }),
            (GCloudStorage.Item.prototype._uploadWithProgress = function (url, options) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    if ((xhr.open(options.method || "PUT", url), options.headers)) for (let headerName in options.headers) xhr.setRequestHeader(headerName, options.headers[headerName]);
                    ((xhr.onload = () => resolve(xhr)),
                        (xhr.onerror = () => reject(xhr)),
                        xhr.upload &&
                            options.onProgress &&
                            (xhr.upload.onprogress = (progressEvent) => {
                                options.onProgress(progressEvent.loaded / progressEvent.total);
                            }),
                        xhr.send(options.body));
                });
            }),
            (module.exports = GCloudStorage));
    };
