module.exports = function (module, exports, require) {
        "use strict";
        (require(19),
            require(180),
            require(181 /* polyfill:ArrayBuffer */),
            require(8 /* Symbol */),
            require(20 /* polyfill:RegExp */),
            require(107 /* polyfill:RegExp */),
            require(34),
            require(134 /* polyfill:String */),
            require(218),
            require(189),
            require(190),
            require(191),
            require(192),
            require(4),
            require(41),
            require(13),
            require(38),
            require(26),
            require(125),
            require(126 /* polyfill:URL */),
            require(114));
        var designerConfig = require(10),
            GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GCloudFileSync = require(845);
        const GCloudItem = require(1092);
        var GDocumentEvent = require(78),
            GSystemDialog = require(44);
        const GLoginDialog = require(1093);
        var GRuntime = require(85),
            GNoticeDialog = require(219),
            GAnnotationsApi = require(358);
        const DocumentStatus = require(86),
            GOfflineDialog = (require(156), require(256 /* GOfflineDialog */)),
            GLicenseApi = require(337),
            md5 = require(435),
            pako = require(165 /* PDFNodeStream */);
        var defaultFileFormat = designerConfig.FILE_FORMATS.find((format) => format.default),
            secondaryFileFormats = designerConfig.FILE_FORMATS.filter((format) => format.secondary),
            folderFormat = designerConfig.FOLDER_FORMAT;
        const GProgressUtil = require(555),
            SAVE_PROGRESS_START = 10,
            SAVE_PROGRESS_UPLOAD_END = 80,
            SAVE_PROGRESS_SAVED = 90,
            SAVE_PROGRESS_DONE = 100;
        class GCloudUtil {
            static convertToCloudItem(input) {
                const convert = (item) => GCloudItem.createFrom(item);
                return input instanceof Array ? input.map(convert) : convert(input);
            }
            static _getAuthorizationToken() {
                return null;
            }
            static syncCloudImages(document, t, saveOptions, a) {
                return new Promise((resolve, reject) => {
                    try {
                        var scene = document.getScene(),
                            dictionaryEntries = scene.getDictionary().getEntries(),
                            imageEntries = [];
                        scene.acceptChildren((node) => {
                            node instanceof GObject.GImage &&
                                imageEntries.push({
                                    name: node.getProperty("name"),
                                    url: node.getProperty("url"),
                                });
                        });
                        const authToken = GCloudUtil._getAuthorizationToken();
                        var apiUrl = designerConfig.gApi.url;
                        (0, GCloudFileSync.syncImagesToCloud)(
                            (e) => (0, GCloudFileSync.listFilesFn)(e, authToken, apiUrl),
                            GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.untitled-image")),
                            imageEntries,
                            dictionaryEntries,
                            async (e, t) => (0, GCloudFileSync.createFileAndGetSignedPutUrlsFn)(e, t, apiUrl, authToken),
                            async (e, t, n) => (0, GCloudFileSync.updateFileFn)(e, t, n, apiUrl, authToken, designerConfig.COMPUTE_SHA256_FOR_FILES, Utils.getFileSHA256Digest),
                            (mergedEntries) => {
                                try {
                                    var previousEntries = scene.getDictionary().merge(mergedEntries);
                                    try {
                                        var serializedData = GObject.GNode.serialize(scene, GObject.GUtil.extend({ save: true }, saveOptions));
                                    } finally {
                                        scene.getDictionary().merge(previousEntries);
                                    }
                                    resolve([serializedData]);
                                } catch (e) {
                                    reject(e);
                                }
                            },
                            t,
                            a
                        );
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            static resolveImage(imageRequest, targetDocument) {
                function shouldResolve(imageRequest, t) {
                    let url = imageRequest.url,
                        scene = imageRequest.scene;
                    if (scene && scene.isReleased()) return false;
                    let cachedEntry = scene && scene.getDictionary() && scene.getDictionary().getEntry(url);
                    return (
                        !cachedEntry ||
                        !/^data:.{0,255};base64,/i.exec(cachedEntry.value) ||
                        (cachedEntry.value.length > GPlatform.GPlatform.maxImgDataUrlLength &&
                            new GNoticeDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-in-design-too-big"))).open(),
                        imageRequest.resolved(cachedEntry.value),
                        false)
                    );
                }
                !(async function () {
                    let url = imageRequest.url,
                        cachedEntry = imageRequest.scene && imageRequest.scene.getDictionary() && imageRequest.scene.getDictionary().getEntry(url);
                    if (shouldResolve(imageRequest))
                        if ("string" == typeof url && url.startsWith("123rf://")) {
                            var itemId = url.slice(8),
                                apiKey = "ec23d185aa5ffb6495e02635803bb081";
                            (function (resourceId) {
                                var requestUrl = "https://www.123rfapis.com/?method=download&id=" + resourceId;
                                requestUrl += "&dl_type=png";
                                const timestamp = Math.floor(Date.now() / 1e3);
                                requestUrl += "&current_time=" + timestamp;
                                var signature = (function (id, mediaType, ts) {
                                    return md5(apiKey + "759561ac90761219f6415da66f18a154" + id + mediaType + ts);
                                })(resourceId, "png", timestamp);
                                return (
                                    (requestUrl += "&sign=" + signature),
                                    (requestUrl += "&api_key=" + apiKey),
                                    new Promise((resolve, reject) => {
                                        var xhr = new XMLHttpRequest();
                                        (xhr.open("GET", requestUrl),
                                            (xhr.onload = function () {
                                                if (this.status >= 200 && this.status < 300) {
                                                    var responseData = JSON.parse(this.response);
                                                    resolve(responseData.download_url);
                                                } else reject();
                                            }),
                                            xhr.send());
                                    })
                                );
                            })(itemId).then(
                                (downloadUrl) => {
                                    if (downloadUrl) {
                                        var xhr = new XMLHttpRequest();
                                        (xhr.open("GET", downloadUrl),
                                            (xhr.responseType = "arraybuffer"),
                                            (xhr.onload = function () {
                                                if (this.status < 200 || this.status >= 400)
                                                    alert("There was a problem downloading requested image");
                                                else {
                                                    var blob = new Blob([this.response], { type: "image" });
                                                    if (blob.size > GPlatform.GPlatform.maxPngDataSize)
                                                        new GNoticeDialog(
                                                            GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-in-design-too-big"))
                                                        ).open();
                                                    else {
                                                        var reader = new FileReader();
                                                        ((reader.onload = function () {
                                                            if (this.result.length > GPlatform.GPlatform.maxImgDataUrlLength)
                                                                return void new GNoticeDialog(
                                                                    GObject.GLocale.get(
                                                                        new GObject.GLocaleKey("GDocument", "text.image-in-design-too-big")
                                                                    )
                                                                ).open();
                                                            let existingEntry =
                                                                imageRequest.scene &&
                                                                imageRequest.scene.getDictionary() &&
                                                                imageRequest.scene.getDictionary().getEntry(imageRequest.url);
                                                            (existingEntry && targetDocument && ((existingEntry.cloud = existingEntry.value), (existingEntry.value = this.result)),
                                                                imageRequest.resolved(this.result));
                                                        }),
                                                            (reader.onerror = function () {
                                                                new GNoticeDialog(
                                                                    GObject.GLocale.get(
                                                                        new GObject.GLocaleKey("GDocument", "text.image-in-design-too-big")
                                                                    )
                                                                ).open();
                                                            }),
                                                            reader.readAsDataURL(blob));
                                                    }
                                                }
                                            }),
                                            xhr.send());
                                    } else alert("There was a problem downloading the image selected");
                                },
                                () => {
                                    alert("There was a problem downloading requested image");
                                }
                            );
                        } else if (
                            /^(dictionary|gravit|document|asset|magenta)/.test(url) &&
                            (url.startsWith(GObject.GDictionary.PROTOCOL) &&
                                ((url = imageRequest.scene && imageRequest.scene.getDictionary() ? imageRequest.scene.getDictionary().getValue(imageRequest.url) : null),
                                "string" == typeof url &&
                                    url.startsWith(GObject.GDictionary.CLOUD_PROTOCOL) &&
                                    (cachedEntry = imageRequest.scene && imageRequest.scene.getDictionary() && imageRequest.scene.getDictionary().getEntry(imageRequest.url))),
                            "string" == typeof url)
                        ) {
                            const user = await gDesigner.getUser(),
                                isMagenta = url.startsWith("magenta"),
                                storageItem = imageRequest.scene && targetDocument.getScene() !== imageRequest.scene ? targetDocument.getTempCloudStorageItem() : targetDocument.getStorageItem();
                            var storageItemId = storageItem && storageItem.getId();
                            if (!user.isAnonymous() && !storageItemId && targetDocument) {
                                ((storageItemId = (await designerConfig.gApi.createFile({ trashed: null })).id), targetDocument.setReservedId(storageItemId));
                            }
                            const pathPart = url.slice(url.indexOf("://") + 3),
                                params = new URLSearchParams(pathPart);
                            let width,
                                height,
                                fileId = pathPart;
                            if (params.has("id")) ((fileId = params.get("id")), (width = params.get("width")), (height = params.get("height")));
                            else if (params.has("url")) {
                                const pathSegments = new URL(params.get("url")).pathname.slice(1).split("/");
                                fileId = "public" == pathSegments[0] ? pathSegments[2] : pathSegments[1];
                            } else fileId = url.slice(url.indexOf("://") + 3);
                            return gDesigner.isAnonymous() && isMagenta
                                ? designerConfig.gApi.getFile(fileId).then((fileInfo) => {
                                      loadImage(
                                          fileInfo.url,
                                          width,
                                          height,
                                          (dataUrl) => {
                                              (cachedEntry && targetDocument && ((cachedEntry.cloud = cachedEntry.value), (cachedEntry.value = dataUrl)), imageRequest.resolved(dataUrl));
                                          },
                                          true
                                      );
                                  })
                                : designerConfig.gApi.resolveUrls(storageItemId, fileId).then((resolvedUrls) => {
                                      loadImage(
                                          resolvedUrls[0][1],
                                          width,
                                          height,
                                          (dataUrl) => {
                                              (cachedEntry && targetDocument && ((cachedEntry.cloud = cachedEntry.value), (cachedEntry.value = dataUrl)), imageRequest.resolved(dataUrl));
                                          },
                                          isMagenta
                                      );
                                  });
                        }
                    function loadImage(url, maxWidth, maxHeight, onResolved, shouldResize) {
                        if (!shouldResolve(imageRequest)) return;
                        const img = new Image();
                        img.crossOrigin = "Anonymous";
                        (maxWidth && (img.width = maxWidth),
                            maxHeight && (img.height = maxHeight),
                            (img.onload = function () {
                                if (!shouldResolve(imageRequest)) return void (img.onload = null);
                                const canvas = document.createElement("CANVAS"),
                                    ctx = canvas.getContext("2d");
                                shouldResize &&
                                    ([img.width, img.height] = (function (img, maxWidth, maxHeight) {
                                        const widthRatio = img.width / maxWidth,
                                            heightRatio = img.height / maxHeight;
                                        return widthRatio < 1 || heightRatio < 1
                                            ? [img.width, img.height]
                                            : widthRatio > heightRatio
                                              ? [maxWidth, (maxWidth * img.height) / img.width]
                                              : [(maxHeight * img.width) / img.height, maxHeight];
                                    })(img, maxWidth || 1080, maxHeight || 1080));
                                let tooLarge = false;
                                ((img.width > GPlatform.GPlatform.maxImgLinearDimension ||
                                    img.height > GPlatform.GPlatform.maxImgLinearDimension ||
                                    img.width * img.height > GPlatform.GPlatform.maxImgAreaDots) &&
                                    (new GNoticeDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-in-design-too-big"))).open(), (tooLarge = true)),
                                    (canvas.width = img.width),
                                    (canvas.height = img.height),
                                    ctx.drawImage(img, 0, 0, img.width, img.height));
                                var dataUrl = canvas.toDataURL();
                                (dataUrl.length > GPlatform.GPlatform.maxImgDataUrlLength &&
                                    !tooLarge &&
                                    (new GNoticeDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-in-design-too-big"))).open(), (tooLarge = true)),
                                    (img.onload = null),
                                    onResolved(dataUrl));
                            }),
                            (img.src = url));
                    }
                })();
            }
            static createFolder(name, parent) {
                return new Promise((resolve, reject) => {
                    var self = this;
                    !(async function () {
                        try {
                            var parentPath = self.definePath(parent);
                            (await designerConfig.gApi.createFile({
                                name: name,
                                type: folderFormat,
                                parent: parentPath,
                                trashed: false,
                            }),
                                resolve());
                        } catch (e) {
                            reject(e);
                        }
                    })();
                });
            }
            static definePath(parent) {
                return parent ? parent.id : null;
            }
            static fileExists(fileId) {
                return designerConfig.gApi
                    .getFile(fileId)
                    .then(() => true)
                    .catch((e) => {
                        if (e.status === designerConfig.HTTP_STATUS_CODES.NOT_FOUND) return false;
                        throw e;
                    });
            }
            static changePathTree(items, targetParent) {
                return new Promise((resolve, reject) => {
                    !(async function () {
                        try {
                            for (var a = 0; a < items.length; ++a) {
                                var r = items[a],
                                    s = r.parent;
                                targetParent !== s && r.id !== targetParent && (await designerConfig.gApi.updateFile(r.id, { parent: targetParent }));
                            }
                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                    })();
                });
            }
            static performSignup() {
                return this.performLogin(GLoginDialog.Forms.SignUp);
            }
            static performLogin(form) {
                return new Promise((resolve, reject) => {
                    try {
                        const openLoginDialog = () => {
                            new GLoginDialog((user) => {
                                (gDesigner.getUser(), resolve(user));
                            }, form).open();
                        };
                        gDesigner
                            .getUser()
                            .then((user) => {
                                !user || gDesigner.isAnonymous() ? openLoginDialog() : resolve(user);
                            })
                            .catch(() => {
                                openLoginDialog();
                            });
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            static createFile(document, callback) {
                !(async function () {
                    var fileOrId = null;
                    let bbox = document.getScene().getActivePage().getGeometryBBox(),
                        width = 0,
                        height = 0;
                    bbox && ((width = bbox.getWidth()), (height = bbox.getHeight()));
                    const fileData = {
                        name: document.getTitle(),
                        parent: null,
                        type: defaultFileFormat.type,
                        app: "designer",
                        unit: document.getScene().getProperty("ut"),
                        width: width,
                        height: height,
                        trashed: null,
                    };
                    (document.getReservedId()
                        ? (await designerConfig.gApi.updateFile(document.getReservedId(), fileData), (fileOrId = document.getReservedId()))
                        : (fileOrId = await designerConfig.gApi.createFile(fileData)),
                        callback(fileOrId));
                })();
            }
            static loadDesignData(fileId, forEdit, version, shareId, file, checkAutoSave) {
                return new Promise(async (resolve, reject) => {
                    try {
                        let originalUrl;
                        if (fileId && checkAutoSave) {
                            let url = (file = await designerConfig.gApi.getFile(fileId)).url;
                            if (version) {
                                url = (await designerConfig.gApi.getAutoSave(fileId, version)).url;
                            } else file.autosave && (url = file.autosave_url);
                            ((originalUrl = file.url), (file.url = url));
                        } else if (fileId && !file)
                            if (shareId) file = await designerConfig.gApi.getShare(shareId);
                            else {
                                var versionSuffix = version ? "/version/" + version : "";
                                file = forEdit ? await designerConfig.gApi.getFile(fileId + versionSuffix + "?edit") : await designerConfig.gApi.getFile(fileId + versionSuffix);
                            }
                        else if (forEdit) {
                            const targetFileId = file ? file.id : fileId;
                            targetFileId &&
                                (await designerConfig.gApi.file.registerAccess(targetFileId).catch((e) => {
                                    console.error("Could not register access", e);
                                }));
                        }
                        const fetchBlob = (url) =>
                            fetch(url).then(function (response) {
                                if (!response.ok) throw new Error("failed to download, status = " + response.status);
                                return response.blob();
                            });
                        var blob = await fetchBlob(file.url).catch((e) => {
                                if (!originalUrl) throw e;
                                return fetchBlob(originalUrl);
                            }),
                            reader = new FileReader();
                        ((reader.onload = function () {
                            resolve({ data: new Uint8Array(this.result), file: file });
                        }),
                            (reader.onerror = reject),
                            reader.readAsArrayBuffer(new Blob([blob], { type: "application/octet-stream" })));
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            static getDesigneDataSize(fileId) {
                return new Promise(async (resolve, reject) => {
                    try {
                        var file = await designerConfig.gApi.getFile(fileId);
                        return await fetch(file.url, { method: "HEAD" }).then(function (response) {
                            var contentLength = response.headers.get("Content-Length");
                            resolve(contentLength);
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            static renameFile(file, newName, callback) {
                !(async function () {
                    try {
                        (await designerConfig.gApi.updateFile(file.id, { name: newName }), callback(true));
                    } catch (e) {
                        (console.error(e), callback(false));
                    }
                })();
            }
            static _checkSecondaryFormatSanity() {
                return true;
            }
            static performSave(document, callback, onFail, initialSaveOptions, targetStorageItem) {
                let silent = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
                if (document.hasPagesWithInfiniteEmptyCanvas())
                    return void (onFail
                        ? onFail({
                              code: 507,
                              message: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas")),
                              noFailCall: true,
                          })
                        : GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas"))));
                var saveOptions = initialSaveOptions;
                function trySave() {
                    let failCalled = false;
                    if (document.isCommercialProductFile()) return void document.openPaywall();
                    var storageItem = targetStorageItem || document.getStorageItem();
                    const secondaryFormat = storageItem && secondaryFileFormats.length && secondaryFileFormats.find((format) => format.ext.toUpperCase() === storageItem.getExtension());
                    if (secondaryFormat && !GCloudUtil._checkSecondaryFormatSanity(document)) return void (onFail && onFail());
                    const savePoint = document.getEditor().markSavePoint();
                    var handleSaveFailure = function (error) {
                        (savePoint.rollback(),
                            silent ||
                                (error && 507 === error.code
                                    ? GSystemDialog.alert(error.message)
                                    : GSystemDialog.confirm(
                                          GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.save-to-cloud-failed")),
                                          function (confirmed) {
                                              confirmed
                                                  ? (gDesigner.stats("savealert_save-failed_click-save-local"),
                                                    gDesigner.executeAction("file.save-as.".concat(defaultFileFormat.ext), [null, document], void 0, true))
                                                  : (gDesigner.stats("savealert_save-failed_dont-save-local"),
                                                    "function" != typeof onFail || failCalled ? "function" == typeof callback && callback(false) : ((failCalled = true), onFail()));
                                          },
                                          GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "no")),
                                          GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "yes"))
                                      )),
                            error && console.log(error),
                            document.updateStatus(DocumentStatus.SaveFailed),
                            document.setSynchronizing(false),
                            document.setErrored(true),
                            gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.SynchronismUpdateFailed, document)),
                            onFail && !failCalled && ((failCalled = true), onFail()));
                    };
                    try {
                        const statusOptions = {};
                        (document.setSynchronizing(true), document.updateStatus(DocumentStatus.Saving, statusOptions));
                        const { progress } = statusOptions,
                            reportProgress = (percent) => {
                                progress && progress(percent);
                            };
                        !(async function (done) {
                            var error = null;
                            try {
                                let fileData = {
                                    unit: document.getScene().getProperty("ut"),
                                    width: 0,
                                    height: 0,
                                };
                                if (designerConfig.HAS_ANNOTATIONS)
                                    if (secondaryFormat) {
                                        let t = true;
                                        await GAnnotationsApi.saveDocumentAnnotations(document, t);
                                        saveOptions = document.updateSaveOptionsLastModifiedDate(saveOptions);
                                    } else
                                        try {
                                            let annotationsCollection = (await GAnnotationsApi.getCloudAnnotationsForDocument(document)).annotationsCollection;
                                            (document.getScene().iteratePages((page) => {
                                                !!GAnnotationsApi.findAnnotationsListForPage(page, annotationsCollection) || annotationsCollection.push(GObject.GNode.store(page.getAnnotations()));
                                            }, true),
                                                (fileData.annotations = annotationsCollection));
                                        } catch (e) {
                                            console.warn("Annotations couldn't be updated on server");
                                        }
                                let bbox = document.getScene().getActivePage().getGeometryBBox();
                                (bbox && ((fileData.width = bbox.getWidth()), (fileData.height = bbox.getHeight())), await designerConfig.gApi.updateFile(storageItem._id, fileData));
                            } catch (e) {
                                error = e;
                            }
                            done(error);
                        })(function (updateError) {
                            (reportProgress(SAVE_PROGRESS_START),
                                updateError
                                    ? handleSaveFailure(updateError)
                                    : storageItem.write(
                                          document,
                                          function () {
                                              (reportProgress(SAVE_PROGRESS_SAVED),
                                                  document.setSynchronizing(false),
                                                  document.setErrored(false),
                                                  gDesigner.hasEventListeners(GDocumentEvent) && gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.Modified, document)));
                                              var result = (result, fileData) => {
                                                  try {
                                                      result &&
                                                          (document.updateStatus(DocumentStatus.Saved, saveOptions),
                                                          gDesigner.updateRecentDocumentsAction(),
                                                          document.getStorageItem().setFileAutoSaveLastModifiedDate(new Date(fileData.autosave_updated)),
                                                          document.getStorageItem().setFileLastModifiedDate(new Date(fileData.updated)));
                                                  } finally {
                                                      (reportProgress(SAVE_PROGRESS_DONE), callback && callback());
                                                  }
                                              };
                                              designerConfig.gApi
                                                  .getFile(storageItem._id + "?edit")
                                                  .then((fileData) => result(true, fileData))
                                                  .catch(result);
                                          },
                                          function (error) {
                                              handleSaveFailure(error);
                                          },
                                          (percent) => {
                                              reportProgress(GProgressUtil.calculateProgress(SAVE_PROGRESS_START, SAVE_PROGRESS_UPLOAD_END, percent / 100));
                                          },
                                          saveOptions
                                      ));
                        });
                    } catch (e) {
                        handleSaveFailure(e);
                    }
                }
                const ensureLoginThenSave = () => {
                    gDesigner.getUser().then((user) => {
                        !user || gDesigner.isAnonymous() ? GCloudUtil.performLogin().then(trySave) : trySave();
                    });
                };
                gDesigner.isOffline() ? GOfflineDialog.openUnavailableFeature(ensureLoginThenSave) : ensureLoginThenSave();
            }
            static async updateFileThumbnail(fileId, data, contentType, commit) {
                var signedUrls = await designerConfig.gApi.signedPutUrls(fileId, { type_t: contentType, commit: commit }),
                    xhr = new XMLHttpRequest();
                xhr.open("PUT", signedUrls.url_t);
                var headers = {
                    "Content-Type": contentType,
                    "Cache-Control": "public,max-age=31600000",
                };
                for (var l in headers) xhr.setRequestHeader(l, headers[l]);
                xhr.send(data);
            }
            static async saveDocumentAnnotations(document, t, n) {
                return (
                    !!designerConfig.HAS_ANNOTATIONS &&
                    (gDesigner.isOffline()
                        ? (console.warn("Failed to record annotations"), false)
                        : gDesigner.getUser().then((user) => !(!user || gDesigner.isAnonymous()) && GAnnotationsApi.saveDocumentAnnotations(document, t, void 0, n)))
                );
            }
            static async getCloudAnnotations(e) {
                if (designerConfig.HAS_ANNOTATIONS) {
                    if (!gDesigner.isOffline())
                        return gDesigner.getUser().then((user) => {
                            user && gDesigner.isAnonymous();
                        });
                    console.warn("Failed to get annotations");
                }
            }
            static isOnline() {
                return "undefined" != typeof window && void 0 !== window.gApi && window.gApi.url;
            }
            static getRecentStorageItems() {
                let fileFormats = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : designerConfig.FILE_FORMATS;
                var self = this;
                return new Promise((resolve, reject) => {
                    !(async function () {
                        const typesQuery = fileFormats.map((format) => format.type).join("|");
                        try {
                            if (self.isOnline()) {
                                var files = await designerConfig.gApi.listFiles({
                                    type: typesQuery,
                                    accessed: "true",
                                    sort: "-accessed",
                                    parent: "*",
                                    limit: "10",
                                });
                                resolve(files);
                            }
                        } catch (e) {}
                        reject([]);
                    })();
                });
            }
            static unzipData(data) {
                var result = null;
                try {
                    result = pako.ungzip(data, { to: "string" });
                } catch (a) {
                    if ("undefined" == typeof TextDecoder && data.length > 1e7) {
                        for (var chunks = [], length = data.length, i = 0; i < length; i += 32768)
                            chunks.push(String.fromCharCode.apply(null, data.subarray(i, i + 32768)));
                        result = chunks.join("");
                    } else
                        try {
                            result =
                                "undefined" == typeof TextDecoder
                                    ? new FakeTextEncoding.TextDecoder("utf-8").decode(data)
                                    : new TextDecoder("utf-8").decode(data);
                        } catch (e) {
                            console.warn("Couldn't unzip data. Data corrupted?");
                        }
                }
                return result;
            }
            static resendEmailConfirmation(user) {
                let appUrl, webUrl;
                if (gContainer.getRuntime() === GRuntime.Runtime.Electron) {
                    const platform = gContainer.getPlatform();
                    (("darwin" !== platform && "win32" !== platform) || (appUrl = "designer://"), (webUrl = gDesigner.getAssetsURL()));
                } else webUrl = location.origin;
                return designerConfig.gApi
                    .resendEmailConfirmation({
                        appUrl: appUrl,
                        webUrl: webUrl,
                        email: user.getEmail(),
                        force: true,
                        origin: location.origin,
                    })
                    .then(() => {
                        let deferred = {},
                            t = new Promise((t) => (deferred.resolve = t));
                        return (
                            GSystemDialog.custom({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.email-sent-title")),
                                subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.email-sent-info")),
                                icon: "ok",
                                closeCallback: () => deferred.resolve(),
                            }),
                            t
                        );
                    })
                    .catch((e) =>
                        GSystemDialog.custom({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.something-wrong")),
                            subtitle: designerConfig.gApi.formatError(e),
                        })
                    );
            }
            static createUint8ArrayFromBlob(blob) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    ((reader.onload = function () {
                        resolve(new Uint8Array(this.result));
                    }),
                        (reader.onerror = reject),
                        reader.readAsArrayBuffer(blob));
                });
            }
            static getFileDataForVersionOrAutoSave(fileId, version, isAutoSave) {
                return version && !isAutoSave ? designerConfig.gApi.getFile(fileId, false, version) : designerConfig.gApi.getFile(fileId);
            }
            static async activateCoupon(couponCode) {
                try {
                    const result = await designerConfig.gApi.coupon.activate(couponCode);
                    (await GLicenseApi.checkLicense(), gDesigner.addNotification({ message: result.message }));
                } catch (error) {
                    if (!error.ok && error.code)
                        switch (error.code) {
                            case designerConfig.gApi.ERROR_CODES.ERR_SUBSCRIPTION_COULD_NOT_BE_DEACTIVATED:
                                const linkElement = $(
                                    "<div>".concat(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GCloudUtil", "text.err-subscription-could-not-be-deactivated")),
                                        "</div>"
                                    )
                                );
                                return (
                                    linkElement
                                        .find("a")
                                        .addClass("link")
                                        .attr("href", "javascript:void(0)")
                                        .on("click", (event) => (event.preventDefault(), gDesigner.runDeepLink("purchases"), false)),
                                    GSystemDialog.alert(linkElement)
                                );
                            case designerConfig.gApi.ERROR_CODES.ERR_SUBSCRIPTION_IS_ACTIVE:
                                const { nextBillingDate } = await designerConfig.gApi.subscription.getNextBillingDate();
                                return GSystemDialog.alert(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GCloudUtil", "text.err-subscription-is-active")).replace(
                                        "%date",
                                        designerConfig.DateAPI.format(nextBillingDate)
                                    )
                                );
                            case designerConfig.gApi.ERROR_CODES.ERR_SUBSCRIPTION_IS_NOT_EXPIRED:
                                return GSystemDialog.alert(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GCloudUtil", "text.err-subscription-is-not-expired")).replace(
                                        "%date",
                                        designerConfig.DateAPI.format(gDesigner.getLicense().getExpirationDate())
                                    )
                                );
                            case designerConfig.gApi.ERROR_CODES.ERR_SUBSCRIPTION_IS_LIFETIME:
                                return GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCloudUtil", "text.err-subscription-is-lifetime")));
                        }
                    gDesigner.addNotification({ message: designerConfig.gApi.formatError(error) });
                }
            }
        }
        module.exports = GCloudUtil;
    };
