module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(3), require(4), require(13));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            r = require(1247),
            designerConfig = require(10),
            l = require(67),
            GCategory = require(18),
            d = require(31),
            GSaveAsAction = require(445),
            p = require(448),
            g = require(86),
            GCommonNames = require(119),
            f = require(1510),
            GWarnLinkedImageDialog = require(1511);
        const GSystemDialog = require(44),
            v = require(1512);
        var _ = require(85),
            b = "." + designerConfig.FILE_FORMATS.find((e) => e.default).ext;
        function w() {
            w.TOOLTIP_CONFIG = {
                [l.TOOLTIP_AREA.TOOLBAR]: l.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GSaveAction", "tooltip-description")),
                    shortcut: w.SHORTCUT,
                    learnMore: "/docs/basics/working-with-files/save-and-open-files/#save",
                }),
            };
        }
        (GObject.GObject.inherit(w, d),
            (w.ID = "file.save"),
            (w.TITLE = new GObject.GLocaleKey("GSaveAction", "title")),
            (w.SHORTCUT = [GPlatform.GKey.Constant.META, "S"]),
            (w.TOOLTIP_CONFIG = null),
            (w.prototype.getId = function () {
                return w.ID;
            }),
            (w.prototype.getTitle = function () {
                return w.TITLE;
            }),
            (w.prototype.getIcon = function () {
                return "gravit-icon-save";
            }),
            (w.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (w.prototype.getGroup = function () {
                return "file";
            }),
            (w.prototype.getShortcut = function () {
                return w.SHORTCUT;
            }),
            (w.prototype.isShortcutGlobal = function () {
                return true;
            }),
            (w.prototype.isEnabled = function (e) {
                return (
                    !!gDesigner.getApplicationManager().isEditingEnabled() &&
                    !(!(e = e || gDesigner.getActiveDocument()) || (!e.isModified() && !e.isNew())) &&
                    !e.isSynchronizing() &&
                    (!(e.isNew() || !e.getStorageItem() || !e.getStorageItem().getStorage().canSave()) ||
                        gDesigner.canExecuteAction(GSaveAsAction.ID + b, [null, e], void 0, true))
                );
            }),
            (w.prototype.execute = function (e, t, n) {
                const o = e || gDesigner.getActiveDocument();
                if (o && o.isCommercialProductFile()) return (o.openPaywall(this.getId()), false);
                (gContainer.getRuntime() === _.Runtime.IPad && (n = true), this._save(o, t, n));
            }),
            (w.prototype._performSave = async function (e, t) {
                (await e.isUpdateAvailable())
                    ? Utils.buildDialogDocumentHasUpdates.call(
                          this,
                          e,
                          function () {
                              e.reload();
                          },
                          function () {
                              GCommonNames.performSave(e, t);
                          }
                      )
                    : GCommonNames.performSave(e, t);
            }),
            (w.prototype._save = async function (e, t, n) {
                if (gDesigner.getDefaultStorage().canSave()) {
                    if (!e.getScene().hasLinkedFiles()) return this._saveDesktop(e, t, n);
                    new GWarnLinkedImageDialog(() => {
                        this._saveDesktop(e, t, n);
                    }).open();
                } else {
                    if (e.isNew()) return this._saveToCloud(e, t);
                    if (e.isCloudFile() && e.getId()) {
                        if (!(await e.canSaveToCloud())) return this._saveToCloud(e, t);
                        await this._performSave(e, t);
                    } else if (e.isExternalFile()) e.storeToCloud(e.getScene(), t);
                    else {
                        if (!e.hasCloudReference()) return this._saveToCloud(e, t);
                        if (!e.isCloudSyncOn()) return gDesigner.executeAction(GSaveAsAction.ID + b, [null, e, t], void 0, true);
                        if (!(await e.canSaveToCloud())) return this._saveToCloud(e, t);
                        e.chooseLatestDocument(
                            e.getScene(),
                            (n) => {
                                n !== e.getScene() ? (e.setScene(n), t && t()) : e.storeToCloud(e.getScene(), t);
                            },
                            () => this._saveToCloud(e, t),
                            (e, t) => t.lastModifiedDate().getTime() > e.lastModifiedDate().getTime(),
                            () => {
                                t && t();
                            }
                        );
                    }
                }
            }),
            (w.prototype._saveDesktop = async function (e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if (e.isNew()) {
                    if (n) return this._saveToCloud(e, t);
                    new f(
                        async function (n) {
                            if (n === f.file()) {
                                if (await p.prototype._hasUnsupported.call(this, e)) return;
                                return gDesigner.executeAction(GSaveAsAction.ID + b, [null, e, t], void 0, true);
                            }
                            if (n === f.cloud()) return this._saveToCloud(e, t);
                        }.bind(this),
                        {
                            closeCallback: (e) => e && t && t({ documentStatus: g.SaveCancelled }),
                        }
                    ).open();
                } else if (e.isCloudFile()) {
                    if (!(await e.canSaveToCloud())) return this._saveToCloud(e, t);
                    await this._performSave(e, t);
                } else if (e.hasCloudReference())
                    if (e.isCloudSyncOn()) {
                        if (!(await e.canSaveToCloud())) return this._saveToCloud(e, t);
                        e.chooseLatestDocument(
                            e.getScene(),
                            (n) => {
                                n !== e.getScene()
                                    ? (e.setScene(n),
                                      e.store(e.getStorageItem(), t, null, {
                                          lastModifiedDate: n.getLastSavedTime(),
                                      }))
                                    : e.store(e.getStorageItem(), () => {
                                          e.storeToCloud(e.getScene(), t);
                                      });
                            },
                            (n) => {
                                n && 404 === n.status ? e.store(e.getStorageItem(), t) : GSystemDialog.alert(designerConfig.gApi.formatError(n));
                            },
                            (e, t) => t.lastModifiedDate().getTime() > e.lastModifiedDate().getTime()
                        );
                    } else e.isExternalFile() ? e.storeToCloud(e.getScene(), t) : e.store(e.getStorageItem(), t);
                else if (e.isExternalFile()) e.storeToCloud(e.getScene(), t);
                else {
                    const n = e.getStorageItem();
                    let o = {};
                    (n instanceof v.Item && (o = (0, r.updateSaveOptions)(o, e, n)), e.store(n, t, null, o));
                }
            }),
            (w.prototype._saveToCloud = function (e, t) {
                return gDesigner.executeAction(
                    p.ID + ".save-as",
                    [
                        e,
                        (n) => {
                            n === g.Loaded
                                ? gDesigner.removeDocument(e, null, true)
                                : n === g.Saved
                                  ? t && t({ documentStatus: g.Saved })
                                  : n === g.SaveCancelled && t && t({ documentStatus: g.SaveCancelled });
                        },
                    ],
                    void 0,
                    true
                );
            }),
            (w.prototype.getTooltipConfig = function (e) {
                return (e && w.TOOLTIP_CONFIG[e]) || null;
            }),
            (w.prototype.toString = function () {
                return "[Object GSaveAction]";
            }),
            (module.exports = w));
    };
