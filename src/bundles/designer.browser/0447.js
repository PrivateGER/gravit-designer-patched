module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(3), require(4), require(13));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            SaveOptionsUtils = require(1247),
            designerConfig = require(10),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31),
            GSaveAsAction = require(445),
            GGravitCloudAction = require(448),
            GDocumentStatus = require(86),
            GCommonNames = require(119),
            SaveChooserDialog = require(1510),
            GWarnLinkedImageDialog = require(1511);
        const GSystemDialog = require(44),
            FileSystemAccessStorage = require(1512);
        var GContainer = require(85),
            defaultFileExtension = "." + designerConfig.FILE_FORMATS.find((format) => format.default).ext;
        function GSaveAction() {
            GSaveAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "tooltip-description")),
                    shortcut: GSaveAction.SHORTCUT,
                    learnMore: "/docs/basics/working-with-files/save-and-open-files/#save",
                }),
            };
        }
        (GObject.GObject.inherit(GSaveAction, GAction),
            (GSaveAction.ID = "file.save"),
            (GSaveAction.TITLE = new GObject.GLocaleKey("GSaveAction", "title")),
            (GSaveAction.SHORTCUT = [GPlatform.GKey.Constant.META, "S"]),
            (GSaveAction.TOOLTIP_CONFIG = null),
            (GSaveAction.prototype.getId = function () {
                return GSaveAction.ID;
            }),
            (GSaveAction.prototype.getTitle = function () {
                return GSaveAction.TITLE;
            }),
            (GSaveAction.prototype.getIcon = function () {
                return "gravit-icon-save";
            }),
            (GSaveAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (GSaveAction.prototype.getGroup = function () {
                return "file";
            }),
            (GSaveAction.prototype.getShortcut = function () {
                return GSaveAction.SHORTCUT;
            }),
            (GSaveAction.prototype.isShortcutGlobal = function () {
                return true;
            }),
            (GSaveAction.prototype.isEnabled = function (document) {
                return (
                    !!gDesigner.getApplicationManager().isEditingEnabled() &&
                    !(!(document = document || gDesigner.getActiveDocument()) || (!document.isModified() && !document.isNew())) &&
                    !document.isSynchronizing() &&
                    (!(document.isNew() || !document.getStorageItem() || !document.getStorageItem().getStorage().canSave()) ||
                        gDesigner.canExecuteAction(GSaveAsAction.ID + defaultFileExtension, [null, document], void 0, true))
                );
            }),
            (GSaveAction.prototype.execute = function (document, callback, forceCloud) {
                const targetDocument = document || gDesigner.getActiveDocument();
                if (targetDocument && targetDocument.isCommercialProductFile()) return (targetDocument.openPaywall(this.getId()), false);
                (gContainer.getRuntime() === GContainer.Runtime.IPad && (forceCloud = true), this._save(targetDocument, callback, forceCloud));
            }),
            (GSaveAction.prototype._performSave = async function (document, callback) {
                (await document.isUpdateAvailable())
                    ? Utils.buildDialogDocumentHasUpdates.call(
                          this,
                          document,
                          function () {
                              document.reload();
                          },
                          function () {
                              GCommonNames.performSave(document, callback);
                          }
                      )
                    : GCommonNames.performSave(document, callback);
            }),
            (GSaveAction.prototype._save = async function (document, callback, forceCloud) {
                if (gDesigner.getDefaultStorage().canSave()) {
                    if (!document.getScene().hasLinkedFiles()) return this._saveDesktop(document, callback, forceCloud);
                    new GWarnLinkedImageDialog(() => {
                        this._saveDesktop(document, callback, forceCloud);
                    }).open();
                } else {
                    if (document.isNew()) return this._saveToCloud(document, callback);
                    if (document.isCloudFile() && document.getId()) {
                        if (!(await document.canSaveToCloud())) return this._saveToCloud(document, callback);
                        await this._performSave(document, callback);
                    } else if (document.isExternalFile()) document.storeToCloud(document.getScene(), callback);
                    else {
                        if (!document.hasCloudReference()) return this._saveToCloud(document, callback);
                        if (!document.isCloudSyncOn()) return gDesigner.executeAction(GSaveAsAction.ID + defaultFileExtension, [null, document, callback], void 0, true);
                        if (!(await document.canSaveToCloud())) return this._saveToCloud(document, callback);
                        document.chooseLatestDocument(
                            document.getScene(),
                            (latestScene) => {
                                latestScene !== document.getScene() ? (document.setScene(latestScene), callback && callback()) : document.storeToCloud(document.getScene(), callback);
                            },
                            () => this._saveToCloud(document, callback),
                            (current, candidate) => candidate.lastModifiedDate().getTime() > current.lastModifiedDate().getTime(),
                            () => {
                                callback && callback();
                            }
                        );
                    }
                }
            }),
            (GSaveAction.prototype._saveDesktop = async function (document, callback) {
                let forceCloud = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if (document.isNew()) {
                    if (forceCloud) return this._saveToCloud(document, callback);
                    new SaveChooserDialog(
                        async function (choice) {
                            if (choice === SaveChooserDialog.file()) {
                                if (await GGravitCloudAction.prototype._hasUnsupported.call(this, document)) return;
                                return gDesigner.executeAction(GSaveAsAction.ID + defaultFileExtension, [null, document, callback], void 0, true);
                            }
                            if (choice === SaveChooserDialog.cloud()) return this._saveToCloud(document, callback);
                        }.bind(this),
                        {
                            closeCallback: (cancelled) => cancelled && callback && callback({ documentStatus: GDocumentStatus.SaveCancelled }),
                        }
                    ).open();
                } else if (document.isCloudFile()) {
                    if (!(await document.canSaveToCloud())) return this._saveToCloud(document, callback);
                    await this._performSave(document, callback);
                } else if (document.hasCloudReference())
                    if (document.isCloudSyncOn()) {
                        if (!(await document.canSaveToCloud())) return this._saveToCloud(document, callback);
                        document.chooseLatestDocument(
                            document.getScene(),
                            (latestScene) => {
                                latestScene !== document.getScene()
                                    ? (document.setScene(latestScene),
                                      document.store(document.getStorageItem(), callback, null, {
                                          lastModifiedDate: latestScene.getLastSavedTime(),
                                      }))
                                    : document.store(document.getStorageItem(), () => {
                                          document.storeToCloud(document.getScene(), callback);
                                      });
                            },
                            (error) => {
                                error && 404 === error.status ? document.store(document.getStorageItem(), callback) : GSystemDialog.alert(designerConfig.gApi.formatError(error));
                            },
                            (current, candidate) => candidate.lastModifiedDate().getTime() > current.lastModifiedDate().getTime()
                        );
                    } else document.isExternalFile() ? document.storeToCloud(document.getScene(), callback) : document.store(document.getStorageItem(), callback);
                else if (document.isExternalFile()) document.storeToCloud(document.getScene(), callback);
                else {
                    const storageItem = document.getStorageItem();
                    let saveOptions = {};
                    (storageItem instanceof FileSystemAccessStorage.Item && (saveOptions = (0, SaveOptionsUtils.updateSaveOptions)(saveOptions, document, storageItem)), document.store(storageItem, callback, null, saveOptions));
                }
            }),
            (GSaveAction.prototype._saveToCloud = function (document, callback) {
                return gDesigner.executeAction(
                    GGravitCloudAction.ID + ".save-as",
                    [
                        document,
                        (status) => {
                            status === GDocumentStatus.Loaded
                                ? gDesigner.removeDocument(document, null, true)
                                : status === GDocumentStatus.Saved
                                  ? callback && callback({ documentStatus: GDocumentStatus.Saved })
                                  : status === GDocumentStatus.SaveCancelled && callback && callback({ documentStatus: GDocumentStatus.SaveCancelled });
                        },
                    ],
                    void 0,
                    true
                );
            }),
            (GSaveAction.prototype.getTooltipConfig = function (area) {
                return (area && GSaveAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GSaveAction.prototype.toString = function () {
                return "[Object GSaveAction]";
            }),
            (module.exports = GSaveAction));
    };
