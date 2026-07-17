module.exports = function (module, exports, require) {
        "use strict";
        (require(32), require(33));
        var _interopRequireDefault = require(16),
            i = _interopRequireDefault(require(1504));
        (require(58 /* polyfill:Array */), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(271 /* polyfill:String */), require(71 /* polyfill:String */), require(34), require(4), require(41), require(13), require(38));
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GSaveOptions = _interopRequireDefault(require(1248)),
            designerConfig = require(10);
        function d(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                (t &&
                    (o = o.filter(function (t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    })),
                    n.push.apply(n, o));
            }
            return n;
        }
        function u(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2
                    ? d(Object(n), true).forEach(function (t) {
                          (0, i.default)(e, t, n[t]);
                      })
                    : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                      : d(Object(n)).forEach(function (t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                        });
            }
            return e;
        }
        var GDocument = require(163),
            GCategory = require(18),
            GAction = require(31),
            GLoginPanel = require(446),
            DocumentStatus = require(86);
        const GSystemDialog = require(44),
            GFileTypes = require(389);
        var nativeFileExtensions = designerConfig.FILE_FORMATS.map((format) => format.ext);
        const defaultFileExt = designerConfig.FILE_FORMATS.find((format) => format.default).ext;
        function SaveAsAction(fileExtension) {
            let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            ((this._fileExt = fileExtension), (this._isNativeExt = !!nativeFileExtensions.includes(this._fileExt)));
            var fileTypeInfo = GDocument.FileTypes.filter((fileType) => fileType.ext === fileExtension)[0];
            ((this._title = fileTypeInfo.title || fileTypeInfo.name),
                (this._mime = fileTypeInfo.mime),
                (this._options = options),
                (SaveAsAction.TOOLTIP_CONFIG = {
                    [GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON]: GRichTooltipConfig.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAsAction", "text.try-this-feature-pro-tooltip-title")),
                        learnMore: "/docs/import-export/export/#quick-exporting",
                        upgradeToProStatsValue: "file.save-as.pdf.300",
                        middle: false,
                        side: true,
                    }),
                }));
        }
        (GObject.GObject.inherit(SaveAsAction, GAction),
            (SaveAsAction.ID = "file.save-as"),
            (SaveAsAction.TOOLTIP_CONFIG = null),
            (SaveAsAction.DEFAULT_SAVE_OPTIONS = {}),
            (SaveAsAction.prototype._fileExt = null),
            (SaveAsAction.prototype._isNativeExt = false),
            (SaveAsAction.prototype._title = null),
            (SaveAsAction.prototype._mime = null),
            (SaveAsAction.prototype._options = null),
            (SaveAsAction.prototype.getId = function () {
                if ("pdf" === this._fileExt) {
                    const dpi = this._options && this._options.dpi;
                    if (dpi && 72 !== dpi) return SaveAsAction.ID + "." + this._fileExt + "." + dpi;
                }
                return SaveAsAction.ID + "." + this._fileExt;
            }),
            (SaveAsAction.prototype.getTitle = function () {
                if (this._isNativeExt)
                    return gDesigner.getDefaultStorage().canSave()
                        ? GObject.GLocale.get(this._title)
                        : GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "title.download-" + this._fileExt));
                if ("pdf" === this._fileExt) {
                    var dpi = this._options.dpi ? this._options.dpi : 72;
                    return GObject.GLocale.get(new GObject.GLocaleKey("GSaveAsAction", "text.dpi-value"))
                        .replace("%dpiValue", dpi)
                        .replace("%dpiString", GObject.GLocale.get(new GObject.GLocaleKey("GSaveAsAction", "text.dpi")));
                }
                {
                    const { dpi: dpi = 72 } = this._options;
                    return GObject.GLocale.get(new GObject.GLocaleKey("GSaveAsAction", "pdf" === this._fileExt ? "text.save-pdf" : "text.save-common"))
                        .replace("%title", GObject.GLocale.get(this._title))
                        .replace("%fileExtension", this._fileExt)
                        .replace("%dpiValue", dpi)
                        .replace("%dpiString", GObject.GLocale.get(new GObject.GLocaleKey("GSaveAsAction", "text.dpi")));
                }
            }),
            (SaveAsAction.prototype.getCategory = function () {
                return this._isNativeExt ? GCategory.CATEGORY_FILE : "pdf" === this._fileExt ? GCategory.CATEGORY_FILE_EXPORT_PDF : GCategory.CATEGORY_FILE_EXPORT;
            }),
            (SaveAsAction.prototype.getGroup = function () {
                return this._isNativeExt ? "file" : "pdf" === this._fileExt ? "export/file-type/" + this._fileExt : "export/file-type";
            }),
            (SaveAsAction.prototype.isPro = function () {
                return "pdf" === this._fileExt && 300 === this._options.dpi;
            }),
            (SaveAsAction.prototype.getTooltipArea = function () {
                return GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON;
            }),
            (SaveAsAction.prototype.getTooltipConfig = function (area) {
                return ("file.save-as.pdf.300" === this.getId() && area && SaveAsAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (SaveAsAction.prototype.getShortcut = function () {
                return this._isNativeExt ? [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "S"] : null;
            }),
            (SaveAsAction.prototype.isEnabled = function (storage, document) {
                return (
                    !!gDesigner.getApplicationManager().isFileFormatEnabledForSaveAs({ ext: this._fileExt }) &&
                    !!gDesigner.getApplicationManager().isSavingAsEnabled() &&
                    !!(document = document || gDesigner.getActiveDocument()) &&
                    ((storage = storage || (document.getStorageItem() ? document.getStorageItem().getStorage() : gDesigner.getDefaultStorage())).canPromptSave() ||
                        storage.canDownload())
                );
            }),
            (SaveAsAction.prototype.execute = function (storage, document, callback) {
                let saveOptions = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : SaveAsAction.DEFAULT_SAVE_OPTIONS,
                    filename = arguments.length > 4 ? arguments[4] : void 0;
                const targetDocument = document || gDesigner.getActiveDocument();
                if (targetDocument && targetDocument.isCommercialProductFile()) return (targetDocument.openPaywall(this.getId()), false);
                new GLoginPanel(
                    () => {
                        this._performSave(storage, targetDocument, callback, saveOptions, filename);
                    },
                    () => {
                        gDesigner.stats("action_cancelled_anonymous", this.getId());
                    }
                );
            }),
            (SaveAsAction.prototype._performSave = async function (storage, document, callback) {
                let saveOptions = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    initialFilename = arguments.length > 4 ? arguments[4] : void 0,
                    filename = initialFilename;
                if (
                    (document.isCloudFile() &&
                        (this._fileExt === defaultFileExt && document.getScene().setCloudSynchronization(document.getStorageItem().getId()),
                        (saveOptions.lastModifiedDate = document.isModified() ? void 0 : document.getScene().getLastSavedTime())),
                    (storage = storage || (document.getStorageItem() ? document.getStorageItem().getStorage() : gDesigner.getDefaultStorage())),
                    !(await this._checkWriteAccess(storage)))
                )
                    return;
                saveOptions.referer = this.getId();
                const useSavePrompt = !storage.canDownload() || this._fileExt !== GFileTypes.PDF.ext;
                if (storage.canPromptSave() && useSavePrompt) {
                    const storageItem = document.getStorageItem();
                    (!filename && storageItem && (filename = storageItem.getName()),
                        filename || (filename = document.getTitle()),
                        filename && !filename.endsWith(this._fileExt) && (filename += ".".concat(this._fileExt.toLowerCase())),
                        storage.savePrompt(
                            filename,
                            this._getFileTypes(document, storage),
                            async (selectedItem) => {
                                nativeFileExtensions.includes((selectedItem.getExtension() || "").toLowerCase()) && document.setStorageItem(selectedItem);
                                let shouldSaveAnnotations = this._fileExt !== defaultFileExt || !document.isCloudFile();
                                (await document.saveAnnotations(shouldSaveAnnotations),
                                    (saveOptions = document.updateSaveOptionsLastModifiedDate(saveOptions)),
                                    (saveOptions.singleton = !document.isCloudFile()),
                                    (saveOptions = this._updateSaveOptions(saveOptions, document, selectedItem)),
                                    document.store(selectedItem, callback, this._showError, saveOptions instanceof GSaveOptions.default ? saveOptions : Object.assign({}, this._options, saveOptions)));
                            },
                            () => {
                                callback && callback({ documentStatus: DocumentStatus.SaveCancelled });
                            }
                        ));
                } else if (storage.canDownload()) {
                    if (
                        (filename || (document.getStorageItem() && (filename = document.getStorageItem().getName())),
                        (filename = filename || document.getTitle() || "Design"),
                        !this._isNativeExt && document.hasPagesWithInfiniteEmptyCanvas())
                    )
                        return void GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.error-emtpy-infinite-canvas")));
                    ((saveOptions = document.updateSaveOptionsLastModifiedDate(saveOptions)),
                        (saveOptions.singleton = !document.isCloudFile()),
                        (saveOptions = u(u({}, SaveAsAction.DEFAULT_SAVE_OPTIONS), saveOptions)),
                        storage.download(filename + "." + this._fileExt, (downloadItem) => {
                            downloadItem && document.store(downloadItem, callback, this._showError, Object.assign({}, this._options, saveOptions, { filename: filename }));
                        }));
                }
            }),
            (SaveAsAction.prototype._checkWriteAccess = async function (storage) {
                const destination = gContainer.getDefaultStorageDestination(this._fileExt);
                if (destination) {
                    const permission = await storage.getWritePermission(destination),
                        isAuthorized = permission.isAuthorized();
                    return (!isAuthorized && permission.getStatusText() && this._showError(permission.getStatusText()), isAuthorized);
                }
                return true;
            }),
            (SaveAsAction.prototype._showError = function (message) {
                message && GSystemDialog.error(message, { showTitle: false });
            }),
            (SaveAsAction.prototype._getFileTypes = function () {
                return [{ ext: this._fileExt, mime: this._mime }];
            }),
            (SaveAsAction.prototype._updateSaveOptions = function (options) {
                return options;
            }),
            (SaveAsAction.prototype.toString = function () {
                return "[Object GSaveAsAction]";
            }),
            (module.exports = SaveAsAction));
    };
