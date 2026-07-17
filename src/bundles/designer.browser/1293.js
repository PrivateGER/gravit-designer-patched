module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(13));
        var GObject = require(1);
        const { FILE_FORMATS, CLOUD_SYNC_FEATURE: { NEW_LAYOUT } = {} } = require(10 /* designerConfig */),
            GCategory = require(18),
            GAction = require(31),
            GCommonNames = require(119),
            GGravitCloudAction = require(448),
            DocumentStatus = require(86),
            GDocument = require(163),
            GSaveAsAction = require(445),
            GSystemDialog = require(44),
            defaultExt = FILE_FORMATS.find((format) => format.default).ext;
        function GCloudSynchronizationAction() {}
        (GObject.GObject.inherit(GCloudSynchronizationAction, GAction),
            (GCloudSynchronizationAction.ID = "sync"),
            (GCloudSynchronizationAction.prototype.getId = function () {
                return GCloudSynchronizationAction.ID;
            }),
            (GCloudSynchronizationAction.prototype._getSyncInformation = function (document) {
                if (document.getScene()) {
                    const lastModified = document.getScene().lastModifiedDate();
                    return lastModified
                        ? GObject.GLocale.get(new GObject.GLocaleKey("GCloudSynchronizationAction", "text.last-synced-at")).replace(
                              "%date",
                              GObject.GLocale.toLocaleDate(lastModified, {
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
            (GCloudSynchronizationAction.prototype.isAvailable = function () {
                return !!NEW_LAYOUT;
            }),
            (GCloudSynchronizationAction.prototype.getTitle = function () {
                const document = gDesigner.getActiveDocument();
                if (document) {
                    if (document.isSynchronizing()) return new GObject.GLocaleKey("GCloudSynchronizationAction", "text.syncing");
                    if (document.isCloudFile()) return this._getSyncInformation(document);
                    if (document.isCloudSyncOn()) return new GObject.GLocaleKey("GCloudSynchronizationAction", "text.unsync-from-cloud");
                }
                return new GObject.GLocaleKey("GCloudSynchronizationAction", "text.sync-to-cloud");
            }),
            (GCloudSynchronizationAction.prototype.getIcon = function () {
                const document = gDesigner.getActiveDocument();
                if (document) {
                    if (document.isSynchronizing()) return "gravit-icon-cloud-syncing";
                    if (document.isCloudSyncOn() || document.isCloudFile()) return "gravit-icon-cloud-synced";
                }
                return "gravit-icon-cloud-unsynced";
            }),
            (GCloudSynchronizationAction.prototype.getInfo = function () {
                const document = gDesigner.getActiveDocument();
                return document && document.isCloudSyncOn() && !document.isSynchronizing() ? this._getSyncInformation(document) : null;
            }),
            (GCloudSynchronizationAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (GCloudSynchronizationAction.prototype.getGroup = function () {
                return "file";
            }),
            (GCloudSynchronizationAction.prototype.isVisible = function () {
                const document = gDesigner.getActiveDocument();
                return (
                    !!document && !document.isWebFile() && !document.isExternalFile() && !document.isNew() && (!document.isCloudSyncOn() || document.isCloudSynchronismAvailable())
                );
            }),
            (GCloudSynchronizationAction.prototype.isEnabled = function () {
                const document = gDesigner.getActiveDocument();
                return (
                    !!document &&
                    !document.isCloudFile() &&
                    ((!document.getScene().getProperty("cfs") && !document.getScene().getProperty("cid")) || document.getScene().isCloudSynchronization())
                );
            }),
            (GCloudSynchronizationAction.prototype._performCloudSync = function (document) {
                gDesigner.getDefaultStorage().canSave()
                    ? document.isNew()
                        ? GCommonNames.createFile(document, (file) => {
                              (document.getScene().setCloudSynchronization(file.id),
                                  gDesigner.executeAction(
                                      GSaveAsAction.ID + "." + defaultExt,
                                      [
                                          null,
                                          document,
                                          () => {
                                              GCommonNames.renameFile(file, document.getTitle(), () => {
                                                  document.storeToCloud(document.getScene());
                                              });
                                          },
                                      ],
                                      void 0,
                                      true
                                  ));
                          })
                        : document.isCloudFile()
                          ? gDesigner.executeAction(GSaveAsAction.ID + "." + defaultExt, void 0, void 0, true)
                          : GCommonNames.createFile(document, (file) => {
                                (document.getScene().setCloudSynchronization(file.id),
                                    document.storeToCloud(document.getScene(), () => {
                                        document.store(null, null, null, {
                                            lastModifiedDate: document.getScene().getLastSavedTime(),
                                        });
                                    }));
                            })
                    : document.isCloudFile()
                      ? gDesigner.executeAction(GSaveAsAction.ID + "." + defaultExt, void 0, void 0, true)
                      : gDesigner.executeAction(
                            GGravitCloudAction.ID + ".save-as",
                            [
                                document,
                                (status) => {
                                    status === DocumentStatus.Loaded && gDesigner.removeDocument(document, null, true);
                                },
                                true,
                            ],
                            void 0,
                            true
                        );
            }),
            (GCloudSynchronizationAction.prototype._toggleCloudSync = function (document) {
                const enableSync = !document.isCloudSyncOn(),
                    scene = document.getScene();
                (scene.setProperty("cfs", enableSync),
                    scene.getProperty("cfs")
                        ? document.chooseLatestDocument(
                              scene,
                              function (chosenScene, isDifferent) {
                                  if (chosenScene !== scene || isDifferent) {
                                      const newDocument = new GDocument(document.getStorageItem());
                                      (newDocument.setScene(chosenScene), gDesigner.replaceDocument(document, newDocument));
                                  } else
                                      document.storeToCloud(chosenScene, () => {
                                          gDesigner.getDefaultStorage().canSave() &&
                                              document.store(null, null, null, {
                                                  lastModifiedDate: scene.getLastSavedTime(),
                                              });
                                      });
                              },
                              function () {
                                  GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.sync-to-cloud-error")));
                              },
                              function (local, incoming) {
                                  return incoming.lastModifiedDate().getTime() > local.lastModifiedDate().getTime();
                              }
                          )
                        : document.isCloudFile() ||
                          (gDesigner.getDefaultStorage().canSave()
                              ? document.store()
                              : gDesigner.executeAction(GSaveAsAction.ID + "." + defaultExt, void 0, void 0, true)));
            }),
            (GCloudSynchronizationAction.prototype.statsValue = function () {
                return gDesigner.getActiveDocument().isCloudSyncOn() ? GCloudSynchronizationAction.ID + ".unsync-from-cloud" : GCloudSynchronizationAction.ID + ".sync-to-cloud";
            }),
            (GCloudSynchronizationAction.prototype.execute = function (document) {
                (document = document || gDesigner.getActiveDocument()) && (document.hasCloudReference() ? this._toggleCloudSync(document) : this._performCloudSync(document));
            }),
            (GCloudSynchronizationAction.prototype.toString = function () {
                return "[Object GCloudSynchronizationAction]";
            }),
            (module.exports = GCloudSynchronizationAction));
    };
