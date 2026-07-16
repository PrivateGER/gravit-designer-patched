module.exports = function (module, exports, require) {
        "use strict";
        (require(20), require(3), require(34), require(4), require(13));
        var GObject = require(1);
        const { FILE_FORMATS, CLOUD_SYNC_FEATURE: { NEW_LAYOUT } = {} } = require(10 /* designerConfig */),
            GCategory = require(18),
            s = require(31),
            GCommonNames = require(119),
            c = require(448),
            d = require(86),
            GDocument = require(163),
            GSaveAsAction = require(445),
            GSystemDialog = require(44),
            h = FILE_FORMATS.find((e) => e.default).ext;
        function f() {}
        (GObject.GObject.inherit(f, s),
            (f.ID = "sync"),
            (f.prototype.getId = function () {
                return f.ID;
            }),
            (f.prototype._getSyncInformation = function (e) {
                if (e.getScene()) {
                    const t = e.getScene().lastModifiedDate();
                    return t
                        ? GObject.GLocale.get(new GObject.GLocaleKey("GCloudSynchronizationAction", "text.last-synced-at")).replace(
                              "%date",
                              GObject.GLocale.toLocaleDate(t, {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  second: "numeric",
                              })
                          )
                        : GObject.GLocale.get(new GObject.GLocaleKey("GDocumentChooser", "text.unavailable"));
                }
            }),
            (f.prototype.isAvailable = function () {
                return !!NEW_LAYOUT;
            }),
            (f.prototype.getTitle = function () {
                const e = gDesigner.getActiveDocument();
                if (e) {
                    if (e.isSynchronizing()) return new GObject.GLocaleKey("GCloudSynchronizationAction", "text.syncing");
                    if (e.isCloudFile()) return this._getSyncInformation(e);
                    if (e.isCloudSyncOn()) return new GObject.GLocaleKey("GCloudSynchronizationAction", "text.unsync-from-cloud");
                }
                return new GObject.GLocaleKey("GCloudSynchronizationAction", "text.sync-to-cloud");
            }),
            (f.prototype.getIcon = function () {
                const e = gDesigner.getActiveDocument();
                if (e) {
                    if (e.isSynchronizing()) return "gravit-icon-cloud-syncing";
                    if (e.isCloudSyncOn() || e.isCloudFile()) return "gravit-icon-cloud-synced";
                }
                return "gravit-icon-cloud-unsynced";
            }),
            (f.prototype.getInfo = function () {
                const e = gDesigner.getActiveDocument();
                return e && e.isCloudSyncOn() && !e.isSynchronizing() ? this._getSyncInformation(e) : null;
            }),
            (f.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (f.prototype.getGroup = function () {
                return "file";
            }),
            (f.prototype.isVisible = function () {
                const e = gDesigner.getActiveDocument();
                return (
                    !!e && !e.isWebFile() && !e.isExternalFile() && !e.isNew() && (!e.isCloudSyncOn() || e.isCloudSynchronismAvailable())
                );
            }),
            (f.prototype.isEnabled = function () {
                const e = gDesigner.getActiveDocument();
                return (
                    !!e &&
                    !e.isCloudFile() &&
                    ((!e.getScene().getProperty("cfs") && !e.getScene().getProperty("cid")) || e.getScene().isCloudSynchronization())
                );
            }),
            (f.prototype._performCloudSync = function (e) {
                gDesigner.getDefaultStorage().canSave()
                    ? e.isNew()
                        ? GCommonNames.createFile(e, (t) => {
                              (e.getScene().setCloudSynchronization(t.id),
                                  gDesigner.executeAction(
                                      GSaveAsAction.ID + "." + h,
                                      [
                                          null,
                                          e,
                                          () => {
                                              GCommonNames.renameFile(t, e.getTitle(), () => {
                                                  e.storeToCloud(e.getScene());
                                              });
                                          },
                                      ],
                                      void 0,
                                      true
                                  ));
                          })
                        : e.isCloudFile()
                          ? gDesigner.executeAction(GSaveAsAction.ID + "." + h, void 0, void 0, true)
                          : GCommonNames.createFile(e, (t) => {
                                (e.getScene().setCloudSynchronization(t.id),
                                    e.storeToCloud(e.getScene(), () => {
                                        e.store(null, null, null, {
                                            lastModifiedDate: e.getScene().getLastSavedTime(),
                                        });
                                    }));
                            })
                    : e.isCloudFile()
                      ? gDesigner.executeAction(GSaveAsAction.ID + "." + h, void 0, void 0, true)
                      : gDesigner.executeAction(
                            c.ID + ".save-as",
                            [
                                e,
                                (t) => {
                                    t === d.Loaded && gDesigner.removeDocument(e, null, true);
                                },
                                true,
                            ],
                            void 0,
                            true
                        );
            }),
            (f.prototype._toggleCloudSync = function (e) {
                const t = !e.isCloudSyncOn(),
                    n = e.getScene();
                (n.setProperty("cfs", t),
                    n.getProperty("cfs")
                        ? e.chooseLatestDocument(
                              n,
                              function (t, o) {
                                  if (t !== n || o) {
                                      const n = new GDocument(e.getStorageItem());
                                      (n.setScene(t), gDesigner.replaceDocument(e, n));
                                  } else
                                      e.storeToCloud(t, () => {
                                          gDesigner.getDefaultStorage().canSave() &&
                                              e.store(null, null, null, {
                                                  lastModifiedDate: n.getLastSavedTime(),
                                              });
                                      });
                              },
                              function () {
                                  GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.sync-to-cloud-error")));
                              },
                              function (e, t) {
                                  return t.lastModifiedDate().getTime() > e.lastModifiedDate().getTime();
                              }
                          )
                        : e.isCloudFile() ||
                          (gDesigner.getDefaultStorage().canSave()
                              ? e.store()
                              : gDesigner.executeAction(GSaveAsAction.ID + "." + h, void 0, void 0, true)));
            }),
            (f.prototype.statsValue = function () {
                return gDesigner.getActiveDocument().isCloudSyncOn() ? f.ID + ".unsync-from-cloud" : f.ID + ".sync-to-cloud";
            }),
            (f.prototype.execute = function (e) {
                (e = e || gDesigner.getActiveDocument()) && (e.hasCloudReference() ? this._toggleCloudSync(e) : this._performCloudSync(e));
            }),
            (f.prototype.toString = function () {
                return "[Object GCloudSynchronizationAction]";
            }),
            (module.exports = f));
    };
