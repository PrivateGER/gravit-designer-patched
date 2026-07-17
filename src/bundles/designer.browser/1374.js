module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(19), require(96 /* polyfill:JSON */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(4), require(13), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var IsFiniteNonNegativeNumber = require(0),
            String = require(9),
            GLocaleKey = require(47),
            GContainer = require(85),
            GBrowserStorage = require(1195);
        const GMarketingFileStorageItem = require(1378);
        var FontsProviderManager = require(255),
            GoogleFontsProvider = require(1379),
            GBrowserFontsProvider = require(1380),
            GImportedFontsProvider = require(1118),
            GLocalFontsProvider = require(1199),
            GCloudStorage = require(220),
            GStoreStorage = require(1385),
            GExternalAssetStorage = require(1386),
            GCommonNames = require(119),
            GDocument = require(163),
            DocumentStatus = require(86),
            GPresets = require(1153),
            GSystemDialog = require(44),
            localFontsApiEnabled = require(10 /* designerConfig */).LOCAL_FONTS_API_ENABLED;
        const downloadMixin = require(1482),
            { base64StringToString } = require(40 /* Utils */);
        function GBrowserContainer() {
            ((this._storage = new GBrowserStorage()),
                "serviceWorker" in navigator &&
                    setTimeout(function () {
                        navigator.serviceWorker.register("/cacher.js").then(function (registration) {
                            registration.update && registration.update();
                        });
                    }, 15e3));
        }
        (IsFiniteNonNegativeNumber.inheritAndMix(GBrowserContainer, GContainer, [downloadMixin]),
            (GBrowserContainer.prototype.getRuntime = function () {
                return window.matchMedia("(display-mode: standalone)").matches ? GContainer.Runtime.PWA : GContainer.Runtime.Browser;
            }),
            (GBrowserContainer.prototype.getStorage = function () {
                return this._storage;
            }),
            (GBrowserContainer.prototype.getSystemFontsProvider = function () {
                return GBrowserFontsProvider;
            }),
            (GBrowserContainer.prototype.supportsLocalFonts = function () {
                return localFontsApiEnabled;
            }),
            (GBrowserContainer.prototype.registerFontProviders = function () {
                if ((GContainer.prototype.registerFontProviders.call(this), FontsProviderManager.registerProvider(GImportedFontsProvider), FontsProviderManager.registerProvider(GoogleFontsProvider), this.supportsLocalFonts()))
                    try {
                        FontsProviderManager.registerProvider(GLocalFontsProvider);
                    } catch (e) {
                        console.error("Local Fonts Access API is not available");
                    }
                window.GSystemFontsProvider = GBrowserFontsProvider;
            }),
            (GBrowserContainer.prototype.openExternalLink = function (event, url) {
                (event && event.preventDefault(), window.open(url, "_blank"));
            }),
            (GBrowserContainer.prototype.start = function () {
                var linkType,
                    directLinkValue,
                    match,
                    currentUrl = new URL(window.location.href),
                    openFileRequest = null;
                if (currentUrl.searchParams) {
                    if (currentUrl.searchParams.get("token") && currentUrl.searchParams.get("d"))
                        openFileRequest = new GContainer.OpenFileRequest(
                            GContainer.OpenFileRequest.Type.DocumentOrToken,
                            JSON.stringify({
                                token: currentUrl.searchParams.get(GContainer.OpenFileRequest.Type.Token),
                                doc: currentUrl.searchParams.get("d"),
                            })
                        );
                    else if (currentUrl.searchParams.get("token"))
                        openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.Token, currentUrl.searchParams.get(GContainer.OpenFileRequest.Type.Token));
                    else if (currentUrl.searchParams.get("d")) openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.Document, currentUrl.searchParams.get("d"));
                    else if (currentUrl.searchParams.get("storeContent"))
                        openFileRequest = new GContainer.OpenFileRequest(
                            GContainer.OpenFileRequest.Type.StoreContent,
                            currentUrl.searchParams.get(GContainer.OpenFileRequest.Type.StoreContent)
                        );
                    else if (currentUrl.searchParams.get(GContainer.OpenFileRequest.Type.ExternalAsset))
                        openFileRequest = new GContainer.OpenFileRequest(
                            GContainer.OpenFileRequest.Type.ExternalAsset,
                            currentUrl.searchParams.get(GContainer.OpenFileRequest.Type.ExternalAsset)
                        );
                    else if (currentUrl.searchParams.get("directlink")) {
                        directLinkValue = currentUrl.searchParams.get("directlink");
                        try {
                            (linkType = JSON.parse(base64StringToString(decodeURIComponent(directLinkValue))).type) === GContainer.OpenFileRequest.Type.Preset
                                ? (openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.Preset, directLinkValue))
                                : linkType === GContainer.OpenFileRequest.Type.Template && (openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.Template, directLinkValue));
                        } catch (e) {
                            "function" == typeof gdb_showScene && console.warn("Invalid parameters.");
                        }
                    }
                } else {
                    for (
                        var queryParamPattern =
                                /[&\?]((?:[\0-"\$-<>-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)=((?:[\0-"\$%'-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)/g,
                            queryParams = {};
                        (match = queryParamPattern.exec(window.location.href));

                    )
                        queryParams[match[1]] = match[2];
                    if (queryParams.token && queryParams.d)
                        openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.DocumentOrToken, {
                            token: queryParams[GContainer.OpenFileRequest.Type.Token],
                            doc: queryParams.d,
                        });
                    else if (queryParams.token) openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.Token, queryParams[GContainer.OpenFileRequest.Type.Token]);
                    else if (queryParams.d) openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.Document, queryParams.d);
                    else if (queryParams.storeContent)
                        openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.StoreContent, queryParams[GContainer.OpenFileRequest.Type.StoreContent]);
                    else if (queryParams[GContainer.OpenFileRequest.Type.ExternalAsset])
                        openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.StoreContent, queryParams[GContainer.OpenFileRequest.Type.ExternalAsset]);
                    else if (queryParams.directlink) {
                        directLinkValue = queryParams.directlink;
                        try {
                            (linkType = JSON.parse(base64StringToString(decodeURIComponent(directLinkValue))).type) === GContainer.OpenFileRequest.Type.Preset
                                ? (openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.Preset, directLinkValue))
                                : linkType === GContainer.OpenFileRequest.Type.Template && (openFileRequest = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.Template, directLinkValue));
                        } catch (e) {
                            "function" == typeof gdb_showScene && console.warn("Invalid parameters.");
                        }
                    }
                }
                return openFileRequest;
            }),
            (GBrowserContainer.prototype.copyToClipboard = function (text) {
                if (navigator.clipboard) return navigator.clipboard.writeText(text);
                try {
                    var savedRange = (function () {
                            if (window.getSelection) {
                                var selection = window.getSelection();
                                if (selection.getRangeAt && selection.rangeCount) return selection.getRangeAt(0);
                            } else if (document.selection && document.selection.createRange) return document.selection.createRange();
                        })(),
                        textArea = document.createElement("textArea");
                    return (
                        (textArea.value = text),
                        document.body.appendChild(textArea),
                        textArea.select(),
                        document.execCommand("copy"),
                        document.body.removeChild(textArea),
                        (function (previousRange) {
                            if (previousRange)
                                if (window.getSelection) {
                                    var selection = window.getSelection();
                                    (selection.removeAllRanges(), selection.addRange(previousRange));
                                } else document.selection && previousRange.select && previousRange.select();
                        })(savedRange),
                        Promise.resolve()
                    );
                } catch (error) {
                    return Promise.reject(error);
                }
            }),
            (GBrowserContainer.prototype.openStorageFile = function (targetDocument, request, callback) {
                GBrowserContainer.openStorageFile(targetDocument, request, callback, this._storage);
            }),
            (GBrowserContainer.openStorageFile = function (targetDocument, request, callback, storage) {
                var loadingData = { progress: null };
                (targetDocument.updateStatus(DocumentStatus.Loading, loadingData),
                    (async function () {
                        try {
                            let loadedData,
                                requestType = request.getType(),
                                requestContent = request.getContent();
                            if (requestType === GContainer.OpenFileRequest.Type.StoreContent)
                                ((loadedData = await gApi.getProviderContentDetails(requestContent)), loadedData && callback(new GStoreStorage.Item(storage, loadedData.id, loadedData.name, loadedData), { loadingData: loadingData }));
                            else if (requestType === GContainer.OpenFileRequest.Type.ExternalAsset)
                                ((loadedData = await gApi.getProviderContentDetails(requestContent)),
                                    loadedData && callback(new GExternalAssetStorage.Item(storage, loadedData.id, loadedData.name, loadedData, requestContent), { loadingData: loadingData }));
                            else if (requestType === GContainer.OpenFileRequest.Type.Preset) {
                                let presetContent = JSON.parse(base64StringToString(decodeURIComponent(requestContent))),
                                    presetMatch =
                                        presetContent &&
                                        (function (presetId) {
                                            let presetCategories = GPresets.getPresets(),
                                                matchedCategoryName = null,
                                                matchedLayout = null;
                                            for (let category of presetCategories) {
                                                let layout = category.layouts.find((layout) => (layout.template ? layout.template === presetId : layout.id === presetId));
                                                if (layout) {
                                                    ((matchedCategoryName = category.name), (matchedLayout = layout));
                                                    break;
                                                }
                                            }
                                            return { presetCategory: matchedCategoryName, presetLayout: matchedLayout };
                                        })(presetContent.id);
                                presetMatch &&
                                    presetMatch.presetLayout &&
                                    (presetMatch.presetLayout.template
                                        ? ((loadedData = await gApi.getPresetTemplate({ type: presetMatch.presetLayout.template }).catch(() => null)),
                                          loadedData &&
                                              callback(new GMarketingFileStorageItem(storage, loadedData.data, "".concat(presetContent.id, ".gvdesign"), loadedData.id), {
                                                  content: presetContent,
                                                  file: loadedData,
                                                  preset: presetMatch,
                                                  loadingData: loadingData,
                                              }))
                                        : callback(presetMatch, {
                                              content: presetContent,
                                              category: presetMatch.presetCategory,
                                              loadingData: loadingData,
                                          }));
                            } else if (requestType === GContainer.OpenFileRequest.Type.Template) {
                                let templateContent = JSON.parse(base64StringToString(decodeURIComponent(requestContent))),
                                    { file, data } = await GCommonNames.loadDesignData(templateContent.id),
                                    extension = GDocument.FileTypes.find((fileType) => fileType.mime === file.type).ext;
                                file &&
                                    data &&
                                    callback(new GMarketingFileStorageItem(storage, data, "".concat(file.name, ".").concat(extension), file.id), {
                                        content: templateContent,
                                        file: file,
                                        category: file.path,
                                        loadingData: loadingData,
                                    });
                            } else {
                                let shareToken;
                                if (requestType === GContainer.OpenFileRequest.Type.DocumentOrToken) {
                                    let linkPayload = JSON.parse(requestContent);
                                    ((loadedData = await gApi.getShare(linkPayload.token, true).catch(() => null)),
                                        loadedData ? (shareToken = linkPayload.token) : (loadedData = await gApi.getFile(linkPayload.doc).catch(() => null)));
                                } else
                                    requestType === GContainer.OpenFileRequest.Type.Document
                                        ? (loadedData = await gApi.getFile(requestContent).catch(() => null))
                                        : requestType === GContainer.OpenFileRequest.Type.Token &&
                                          ((shareToken = requestContent), (loadedData = await gApi.getShare(shareToken, true).catch(() => null)));
                                if (loadedData)
                                    callback(new GCloudStorage.Item(storage, loadedData.id, loadedData.name, loadedData, null, shareToken, loadedData.autosave), {
                                        loadingData: loadingData,
                                    });
                                else {
                                    ((loadingData.text = String.get(new GLocaleKey("GContainer", "text.load-failed"))),
                                        targetDocument.updateStatus(DocumentStatus.LoadFailed, loadingData),
                                        targetDocument.setFailedDocumentIdOrToken(requestContent),
                                        callback(null));
                                    var buttons = [];
                                    (gDesigner.getShareManager().isPermissionRequestEnabled() &&
                                        buttons.push({
                                            label: String.get(new GLocaleKey("GShareManager", "text.file-request-access")),
                                            onclick: (dialogElement) => {
                                                (gDesigner.stats("permission-dialog_no-access_request-access"),
                                                    gApi
                                                        .requestPermission(requestContent, {
                                                            access: true,
                                                            isToken: requestType === GContainer.OpenFileRequest.Type.Token,
                                                        })
                                                        .then(() => {
                                                            (dialogElement.gDialog("close"),
                                                                GSystemDialog.alert(String.get(new GLocaleKey("GShareManager", "text.sent-request-email"))));
                                                        })
                                                        .catch(() => {
                                                            GSystemDialog.error(String.get(new GLocaleKey("GShareManager", "text.cannot-request-access")));
                                                        }));
                                            },
                                        }),
                                        buttons.push({
                                            label: String.get(new GLocaleKey("GLocale", "ok")),
                                            onclick: (dialogElement) => {
                                                (gDesigner.stats("permission-dialog_no-access_click-ok"), dialogElement.gDialog("close"));
                                            },
                                            highlighted: true,
                                        }),
                                        GSystemDialog.custom({
                                            icon: "error",
                                            className: "g-file-can-not-be-found-dialog",
                                            closeable: false,
                                            closeCallback: () => gDesigner.removeDocument(targetDocument, null, true),
                                            title: String.get(new GLocaleKey("GShareManager", "text.file-can-not-be-accessed-title")),
                                            subtitle: String.get(new GLocaleKey("GShareManager", "text.file-can-not-be-accessed-info")),
                                            buttons: buttons,
                                        }));
                                }
                            }
                        } catch (error) {
                            (console.log(error),
                                setTimeout(function () {
                                    targetDocument.updateStatus(DocumentStatus.LoadFailed, loadingData);
                                }, 10),
                                targetDocument.updateStatus(DocumentStatus.LoadFailed, loadingData),
                                callback(null));
                        }
                    })());
            }),
            (GBrowserContainer.prototype.handleDeepLinking = function (url) {
                const deepLinkResult = GContainer.prototype.handleDeepLinking.call(this, url),
                    excludedLinkTypes = [GContainer.DeepLinking.DirectLink, GContainer.DeepLinking.FocusAnnot, GContainer.DeepLinking.CreateShare];
                return (deepLinkResult && !excludedLinkTypes.includes(deepLinkResult.link) && window.history.pushState(null, null, window.location.pathname), deepLinkResult);
            }),
            (GBrowserContainer.prototype.toString = function () {
                return "[Object GBrowserContainer]";
            }),
            (module.exports = GBrowserContainer));
    };
