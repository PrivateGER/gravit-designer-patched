module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(19), require(193), require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(20 /* polyfill:RegExp */), require(34), require(4), require(13), require(26));
        var GObject = require(1);
        const { gApi, AUTO_SAVE_ENABLED, AUTOSAVE_INTERVAL_DEFAULT, CloudIntegration, DESIGNER, EXTERNAL_APP } = require(10 /* designerConfig */),
            { buildDialogDocumentHasUpdates } = require(40 /* Utils */),
            GContainer = require(85),
            GSystemDialog = require(44),
            GGoogleDriveStorage = require(556),
            GGravitCloudAction = require(448),
            GDocumentEvent = require(78),
            GSettingChangedEvent = require(135),
            GNetworkAvailabilityChangedEvent = require(291),
            AutoSaveModel = require(1530),
            GQueue = require(1534),
            GDocumentStatus = require(86),
            GDocumentStatusEvent = require(217),
            { SETUP, CODES } = require(591 /* COMMAND_SAVE */),
            SettingsAction = require(1277);
        function GAutoSaveManager() {
            if (
                ((this._pendingSyncDialog = new Set()),
                (this._pendingFormatNotSupportDialog = new Set()),
                (this._pendingEntriesNotCreatedWarning = new Set()),
                (this._documentsMap = new Map()),
                (this._savingQueue = new GQueue()),
                this._savingQueue.onNext(this._processDocumentSave.bind(this)),
                GAutoSaveManager._instance && console.warn("[GAutoSaveManager] Already initiated"),
                (this._autoSaveWorker = new Worker("./autosave.worker.js")),
                !this._autoSaveWorker)
            )
                return (console.warn("[GAutoSaveManager] Worker initiation failed"), Promise.reject());
            (this._autoSaveWorker.postMessage({
                cmd: SETUP.ENDPOINT,
                data: { url: gApi.url },
            }),
                (this._autoSaveModel = new AutoSaveModel(this._autoSaveWorker)),
                this._updateStatus(gDesigner.getSetting(GAutoSaveManager.AUTO_SAVE_SETTING) ? GAutoSaveManager.Status.Stopped : GAutoSaveManager.Status.Disabled),
                this._setInterval(gDesigner.getSetting(GAutoSaveManager.AUTO_SAVE_INTERVAL_SETTING)),
                gContainer.getProperty(GAutoSaveManager.AUTO_SAVE_WARN_DIALOG_SHOWN).then((shown) => {
                    this._warnDialogShown = !!shown;
                }),
                gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this),
                gDesigner.addEventListener(GSettingChangedEvent, this._settingsChangedEvent, this),
                gDesigner.addEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this));
        }
        ((GAutoSaveManager.ALTERNATE_STRINGS = [
            new GObject.GLocaleKey("GAutoSave", "text.notification-message-1"),
            new GObject.GLocaleKey("GAutoSave", "text.notification-message-2"),
            new GObject.GLocaleKey("GAutoSave", "text.notification-message-3"),
        ]),
            (GAutoSaveManager.DISABLE_EXTERNAL_FILE_NO_ENTRIES_CREATED_WARING = "disable-external-file-no-entries-created-waring"),
            (GAutoSaveManager.DISABLE_WARNING_SETTING_NAME = "autosave-prompt-for-local-files-disabled"),
            (GAutoSaveManager.REMINDER_FOR_CDR_DES_FILE = "autosave-prompt-for-reminding-not-support-cdr-des"),
            (GAutoSaveManager.AUTO_SAVE_SETTING = "auto_save"),
            (GAutoSaveManager.AUTO_SAVE_INTERVAL_SETTING = "auto_save_interval"),
            (GAutoSaveManager.AUTO_SAVE_WARN_DIALOG_SHOWN = "designer.settings.auto-save-warn-dialog-shown"),
            (GAutoSaveManager.AUTO_SAVE_HIDE_NOTIFICATION_PROP_NAME = "designer.settings.auto-save-hide-notification"),
            (GAutoSaveManager.Status = { Stopped: -1, Enabled: 0, Disabled: 1 }),
            (GAutoSaveManager._instance = null),
            (GAutoSaveManager.prototype._timerId = null),
            (GAutoSaveManager.prototype._warnDialogShown = false),
            (GAutoSaveManager.prototype._fileUpdatedWarningShowing = false),
            (GAutoSaveManager.prototype._warnDialogTimer = null),
            (GAutoSaveManager.prototype._status = GAutoSaveManager.Status.Stopped),
            (GAutoSaveManager.prototype._documentsMap = null),
            (GAutoSaveManager.prototype._pendingSyncDialog = null),
            (GAutoSaveManager.prototype._pendingFormatNotSupportDialog = null),
            (GAutoSaveManager.prototype._pendingEntriesNotCreatedWarning = null),
            (GAutoSaveManager.prototype._savingQueue = null),
            (GAutoSaveManager.prototype._syncDialogShown = {}),
            (GAutoSaveManager.prototype._formatNotSupportDialogShown = {}),
            (GAutoSaveManager.prototype._noEntriesCreatedWaringShown = {}),
            (GAutoSaveManager.prototype._offlineAlert = null),
            (GAutoSaveManager.prototype._interval = null),
            (GAutoSaveManager.prototype._autoSaveWorker = null),
            (GAutoSaveManager.getInstance = function () {
                return (GAutoSaveManager._instance || (GAutoSaveManager._instance = new GAutoSaveManager()), GAutoSaveManager._instance);
            }),
            (GAutoSaveManager.prototype._updateStatus = function (status) {
                this._status = status;
            }),
            (GAutoSaveManager.prototype.getStatus = function () {
                return this._status;
            }),
            (GAutoSaveManager.prototype._setInterval = function (value) {
                const minutes = parseFloat(value) || AUTOSAVE_INTERVAL_DEFAULT;
                this._interval = 60 * minutes * 1e3;
            }),
            (GAutoSaveManager.prototype._shouldHandle = async function (document) {
                return !document.isCloudFile() || (await document.canSaveToCloud()) || document.isExternalFile();
            }),
            (GAutoSaveManager.prototype._processDocumentSave = async function (document) {
                if (!(await this._shouldHandle(document))) return;
                if (!this._warnDialogShown) {
                    this._warnDialogTimer && clearTimeout(this._warnDialogTimer);
                    if (!(await this._showWarnDialog())) return;
                }
                if ((this._resetDocumentTimeout(document, this.getStatus() === GAutoSaveManager.Status.Enabled), gDesigner.isOffline()))
                    return (this._toggleOfflineAlert(true), Promise.reject(CODES.AUTOSAVE_OFFLINE_NOT_AVAILABLE));
                this._offlineAlert && this._toggleOfflineAlert(false);
                const isBusy = [GDocumentStatus.Saving, GDocumentStatus.Syncing, GDocumentStatus.Loading].includes(document.getStatus());
                return this._autoSaveModel.has(document) || isBusy
                    ? CODES.AUTOSAVE_ALREADY_SAVING
                    : document.isCloudFile() || document.isExternalFile()
                      ? this._isCDRFile(document)
                          ? (this._executeDocumentFormatNotSupportedDialog(document), CODES.AUTOSAVE_CLOUD_SYNCHRONIZM_NOT_AVAILABLE)
                          : document.isWebFile() || document.isCloudSyncOn() || document.isExternalFile()
                            ? document.isExternalFile() && !(await this._executeExternalFileWarningDialog(document))
                                ? CODES.AUTOSAVE_CLOUD_SYNCHRONIZM_NOT_AVAILABLE
                                : document.isModified()
                                  ? (await document.isUpdateAvailable())
                                      ? (this._executeDocumentConflictResolutionDialog(document), CODES.AUTOSAVE_FILE_CONFLICT)
                                      : this._runAndScheduleAutoSave(document)
                                  : CODES.AUTOSAVE_NOT_MODIFIED
                            : CODES.AUTOSAVE_LOCAL_FILES_WITHOUT_CID_NOT_AVAILABLE
                      : (this._executeDocumentSyncDialog(document), CODES.AUTOSAVE_CLOUD_SYNCHRONIZM_NOT_AVAILABLE);
            }),
            (GAutoSaveManager.prototype._executeDocumentSyncDialog = function (document) {
                this._syncDialogShown[document.sessionId] ||
                    (gDesigner.isActiveDocument(document) ? this._showSyncDialog(document) : this._pendingSyncDialog.add(document));
            }),
            (GAutoSaveManager.prototype._executeDocumentFormatNotSupportedDialog = function (document) {
                this._formatNotSupportDialogShown[document.sessionId] ||
                    (gDesigner.isActiveDocument(document) ? this._showFormatNotSupportedDialog(document) : this._pendingFormatNotSupportDialog.add(document));
            }),
            (GAutoSaveManager.prototype._executeDocumentConflictResolutionDialog = function (document) {
                gDesigner.isActiveDocument(document) &&
                    (this._dialogResolveDocumentConflicts &&
                        this._dialogResolveDocumentConflicts.gDialog("isOpen") &&
                        this._dialogResolveDocumentConflicts.gDialog("close"),
                    (this._dialogResolveDocumentConflicts = buildDialogDocumentHasUpdates.call(
                        this,
                        document,
                        function (document) {
                            document.reload();
                        }.bind(this),
                        function (document) {
                            this._runAndScheduleAutoSave(document);
                        }.bind(this)
                    )));
            }),
            (GAutoSaveManager.prototype._executeExternalFileWarningDialog = async function (document) {
                return document.getStorageItem() && (await document.getStorageItem().hasUpdates()) && !this._fileUpdatedWarningShowing
                    ? this._showExternalFileUpdatedOutAppWarningDialog(document)
                    : !!this._noEntriesCreatedWaringShown[document.sessionId] ||
                          (gDesigner.isActiveDocument(document)
                              ? this._showNoEntriesCreatedInVersionHistoryForExternalFileWarningDialog(document)
                              : (this._pendingEntriesNotCreatedWarning.add(document), false));
            }),
            (GAutoSaveManager.prototype._runAndScheduleAutoSave = function (document) {
                return this._handleAutoSave(document).finally(() => {
                    this._resetDocumentTimeout(document, this.getStatus() === GAutoSaveManager.Status.Enabled);
                });
            }),
            (GAutoSaveManager.prototype._handleAutoSave = function (document) {
                return (
                    gDesigner.isActiveDocument(document) && this._showNotification(),
                    this._autoSaveModel.save(document).catch((error) => {
                        (console.warn("[GAutoSaveManager][Failed to auto save]", error),
                            gDesigner.isActiveDocument(document) && this._showNotification(true));
                    })
                );
            }),
            (GAutoSaveManager.prototype._resetDocumentTimeout = function (document) {
                let shouldSchedule = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                const entry = this._documentsMap.get(document);
                (entry.timeoutId && (clearTimeout(entry.timeoutId), (entry.timeoutId = null)),
                    shouldSchedule &&
                        (entry.timeoutId = setTimeout(() => {
                            this._savingQueue.has(document) || (this._savingQueue.add(document), this._savingQueue.process());
                        }, this._interval)),
                    this._documentsMap.set(document, entry));
            }),
            (GAutoSaveManager.prototype._resetAllDocumentsTimeout = function () {
                let shouldSchedule = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                for (let entry of this._documentsMap.values()) this._resetDocumentTimeout(entry.doc, shouldSchedule);
            }),
            (GAutoSaveManager.prototype.disable = function () {
                this.getStatus() !== GAutoSaveManager.Status.Disabled && (this._resetAllDocumentsTimeout(false), this._updateStatus(GAutoSaveManager.Status.Disabled));
            }),
            (GAutoSaveManager.prototype.enable = function () {
                AUTO_SAVE_ENABLED &&
                    this.getStatus() !== GAutoSaveManager.Status.Enabled &&
                    !gDesigner.isOffline() &&
                    gDesigner.getSetting(GAutoSaveManager.AUTO_SAVE_SETTING) &&
                    (this._resetAllDocumentsTimeout(), this._updateStatus(GAutoSaveManager.Status.Enabled));
            }),
            (GAutoSaveManager.prototype._removeDocument = function (document) {
                this._documentsMap.has(document) &&
                    (this._resetDocumentTimeout(document, false),
                    this._savingQueue.delete(document),
                    this._documentsMap.delete(document),
                    this._syncDialogShown[document.sessionId] && delete this._syncDialogShown[document.sessionId],
                    this._formatNotSupportDialogShown[document.sessionId] && delete this._formatNotSupportDialogShown[document.sessionId],
                    this._noEntriesCreatedWaringShown[document.sessionId] && delete this._noEntriesCreatedWaringShown[document.sessionId]);
            }),
            (GAutoSaveManager.prototype._addDocument = function (document) {
                this._documentsMap.has(document) ||
                    (this._documentsMap.set(document, { doc: document }),
                    this._resetDocumentTimeout(document, this.getStatus() === GAutoSaveManager.Status.Enabled),
                    (this._syncDialogShown[document.sessionId] = false),
                    (this._formatNotSupportDialogShown[document.sessionId] = false),
                    (this._noEntriesCreatedWaringShown[document.sessionId] = false));
            }),
            (GAutoSaveManager.prototype._documentEvent = function (event) {
                if (!event.document.isLockedByVersionHistory())
                    switch (event.type) {
                        case GDocumentEvent.Type.Added:
                            (this._addDocument(event.document),
                                event.document.addEventListener(GDocumentStatusEvent, this._handleDocumentStatusEvent, this, void 0, void 0, true),
                                this.enable());
                            break;
                        case GDocumentEvent.Type.Removed:
                            (this._removeDocument(event.document), event.document.removeEventListener(GDocumentStatusEvent, this._handleDocumentStatusEvent, this));
                            break;
                        case GDocumentEvent.Type.SynchronismUpdated: {
                            let shouldAdd = true;
                            (event.document.isWebFile() ||
                                (event.document.isCloudSyncOn() ? this.enable() : ((shouldAdd = false), this._removeDocument(event.document))),
                                shouldAdd && this._addDocument(event.document));
                            break;
                        }
                        case GDocumentEvent.Type.Activated:
                            (this._documentsMap.has(event.document) ||
                                (this._addDocument(event.document),
                                event.document.addEventListener(GDocumentStatusEvent, this._handleDocumentStatusEvent, this, void 0, void 0, true),
                                this.enable()),
                                event.document.isCloudSynchronismAvailable() ||
                                    this._syncDialogShown[event.document.sessionId] ||
                                    !this._pendingSyncDialog.has(event.document) ||
                                    (this._showSyncDialog(event.document), this._pendingSyncDialog.delete(event.document)),
                                !this._noEntriesCreatedWaringShown[event.document.sessionId] &&
                                    this._pendingEntriesNotCreatedWarning.has(event.document) &&
                                    (this._processDocumentSave(event.document), this._pendingEntriesNotCreatedWarning.delete(event.document)),
                                this._shouldFormatNotSupportedDialogAppearForUser(event.document) &&
                                    (this._showFormatNotSupportedDialog(event.document),
                                    this._pendingFormatNotSupportDialog.delete(event.document)),
                                this._warnDialogTimer && clearTimeout(this._warnDialogTimer),
                                this._shouldWarningDialogAppearForUser() &&
                                    (this._warnDialogTimer = setTimeout(() => {
                                        this._showWarnDialog(true).then((accepted) => {
                                            accepted && this._savingQueue.process();
                                        });
                                    }, this._interval)));
                            break;
                        case GDocumentEvent.Type.BeforeReload:
                            this._removeDocument(event.document);
                    }
            }),
            (GAutoSaveManager.prototype._shouldWarningDialogAppearForUser = function () {
                return !this._warnDialogShown && !gDesigner.getLicense().isGuest() && !gDesigner.isAnonymous();
            }),
            (GAutoSaveManager.prototype._shouldFormatNotSupportedDialogAppearForUser = function (document) {
                return (
                    !gDesigner.getLicense().isGuest() &&
                    !gDesigner.isAnonymous() &&
                    this._pendingFormatNotSupportDialog.has(document) &&
                    document.isCloudFile() &&
                    this._isCDRFile(document) &&
                    !this._formatNotSupportDialogShown[document.sessionId]
                );
            }),
            (GAutoSaveManager.prototype._handleDocumentStatusEvent = function (event) {
                event.status === GDocumentStatus.Loaded && this._addDocument(event.sender);
            }),
            (GAutoSaveManager.prototype._settingsChangedEvent = function (event) {
                event.previousValue !== event.newValue &&
                    (event.key === GAutoSaveManager.AUTO_SAVE_SETTING
                        ? event.newValue
                            ? this.enable()
                            : this.disable()
                        : event.key === GAutoSaveManager.AUTO_SAVE_INTERVAL_SETTING &&
                          (this._setInterval(event.newValue), this._resetAllDocumentsTimeout(this.getStatus() === GAutoSaveManager.Status.Enabled)));
            }),
            (GAutoSaveManager.prototype._networkAvailabilityChangedEvent = function (event) {
                event.connected ? (this._toggleOfflineAlert(false), this.enable()) : (this._toggleOfflineAlert(true), this.disable());
            }),
            (GAutoSaveManager.prototype._toggleOfflineAlert = function (show) {
                if (show) {
                    let message = GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.alert-offline"));
                    (gContainer.getRuntime() === GContainer.Runtime.Electron &&
                        GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.alert-offline-desktop")),
                        this._offlineAlert ||
                            (this._offlineAlert = GSystemDialog.alert(message, () => {
                                this._offlineAlert = null;
                            })));
                } else
                    (this._offlineAlert && 0 !== this._offlineAlert.length && this._offlineAlert.gDialog("close"),
                        (this._offlineAlert = null));
            }),
            (GAutoSaveManager.prototype._showWarnDialog = function () {
                let isReminder = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return this._warnDialogShown || (isReminder && this.getStatus() === GAutoSaveManager.Status.Enabled)
                    ? Promise.resolve()
                    : this.getStatus() === GAutoSaveManager.Status.Enabled
                      ? Promise.resolve(true)
                      : new Promise((resolve) => {
                            GSystemDialog.custom({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.dialog-inform-warn-feature.title")),
                                subtitle: $("<span />")
                                    .text(
                                        "".concat(GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.dialog-inform-warn-feature.text")), " ")
                                    )
                                    .append(
                                        $("<a />")
                                            .attr(
                                                "href",
                                                "/docs/basics/working-with-files/save-and-open-files/#auto-save"
                                            )
                                            .attr("target", "_blank")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.learn-more")))
                                    ),
                                className: "g-auto-save-warn-dialog",
                                icon: "autosave",
                                closeable: false,
                                buttons: [
                                    {
                                        label: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GAutoSave", "text.dialog-inform-warn-feature.cancel-button")
                                        ),
                                        closeOnClick: true,
                                        shortcut: GSystemDialog.Shortcut.Esc,
                                        onclick: () => {
                                            (gDesigner.setSetting(GAutoSaveManager.AUTO_SAVE_SETTING, false),
                                                (this._warnDialogShown = true),
                                                gContainer.setProperty(GAutoSaveManager.AUTO_SAVE_WARN_DIALOG_SHOWN, true),
                                                gDesigner.stats("settings_toggle_auto-save-disabled"),
                                                resolve(false));
                                        },
                                    },
                                    {
                                        label: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GAutoSave", "text.dialog-inform-warn-feature.enable-button")
                                        ),
                                        className: "primary",
                                        closeOnClick: true,
                                        shortcut: GSystemDialog.Shortcut.Enter,
                                        onclick: () => {
                                            (gDesigner.setSetting(GAutoSaveManager.AUTO_SAVE_SETTING, true),
                                                (this._warnDialogShown = true),
                                                gContainer.setProperty(GAutoSaveManager.AUTO_SAVE_WARN_DIALOG_SHOWN, true),
                                                gDesigner.stats("settings_toggle_auto-save-enabled"),
                                                resolve(true));
                                        },
                                    },
                                ],
                            });
                        });
            }),
            (GAutoSaveManager.prototype._showFormatNotSupportedDialog = function (document) {
                gDesigner.getSetting(GAutoSaveManager.REMINDER_FOR_CDR_DES_FILE, true) &&
                    (GSystemDialog.custom({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.dialog-auto-save-is-not-available-for-cdr-and-des.text")),
                        className: "g-auto-save-format-not-support-warn-dialog",
                        icon: "info",
                        closeable: false,
                        buttons: [
                            {
                                label: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GAutoSave", "text.dialog-auto-save-is-not-available-for-cdr-and-des.save-as-button")
                                ),
                                closeOnClick: true,
                                onclick: () => {
                                    gDesigner.executeAction(GGravitCloudAction.getIdForAction(GGravitCloudAction.Actions.SaveAs), document);
                                },
                            },
                            {
                                label: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GAutoSave", "text.dialog-auto-save-is-not-available-for-cdr-and-des.keep-cdr-button")
                                ),
                                closeOnClick: true,
                                className: "primary",
                                shortcut: GSystemDialog.Shortcut.Enter,
                            },
                        ],
                        dontShowAgainCb: (checked) => {
                            (gDesigner.setSetting(GAutoSaveManager.REMINDER_FOR_CDR_DES_FILE, !checked),
                                gDesigner.stats("settings_toggle_auto-save-not-support-for-cdr-des-reminder-enabled", !checked));
                        },
                    }),
                    (this._formatNotSupportDialogShown[document.sessionId] = true));
            }),
            (GAutoSaveManager.prototype._showSyncDialog = function (document) {
                if (gDesigner.getSetting(GAutoSaveManager.DISABLE_WARNING_SETTING_NAME)) return;
                let title, subtitle, buttons;
                (document.hasCloudReference()
                    ? ((title = GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.alert-cloud-reference-sync"))),
                      (subtitle = GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.alert-cloud-reference-sync-sub-text"))),
                      (buttons = [
                          {
                              label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")),
                              closeOnClick: true,
                              shortcut: GSystemDialog.Shortcut.Enter,
                          },
                      ]))
                    : ((title = GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.alert-sync"))),
                      (subtitle = GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.alert-sync-sub-text"))),
                      (buttons = [
                          {
                              label: GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.alert-button.cancel")),
                              closeOnClick: true,
                              shortcut: GSystemDialog.Shortcut.Esc,
                          },
                          {
                              label: GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.alert-button.save-to-cloud")),
                              className: "primary",
                              closeOnClick: true,
                              shortcut: GSystemDialog.Shortcut.Enter,
                              onclick: () => {
                                  gDesigner.executeAction(GGravitCloudAction.getIdForAction(GGravitCloudAction.Actions.SaveAs), document);
                              },
                          },
                      ])),
                    (this._syncDialogShown[document.sessionId] = true),
                    GSystemDialog.custom({
                        title: title.replace("%title", document.getTitle()),
                        subtitle: subtitle.replace("%title", document.getTitle()),
                        className: "g-auto-save-sync-dialog",
                        icon: "info",
                        closeable: false,
                        buttons: buttons,
                        dontShowAgainCb: (checked) => {
                            (gDesigner.setSetting(GAutoSaveManager.DISABLE_WARNING_SETTING_NAME, !!checked),
                                gDesigner.stats("settings_toggle_auto-save-warning-enabled", !checked));
                        },
                    }));
            }),
            (GAutoSaveManager.prototype._showNoEntriesCreatedInVersionHistoryForExternalFileWarningDialog = function (document) {
                return new Promise((resolve) => {
                    gDesigner.getSetting(GAutoSaveManager.DISABLE_EXTERNAL_FILE_NO_ENTRIES_CREATED_WARING, false)
                        ? resolve(true)
                        : ((this._noEntriesCreatedWaringShown[document.sessionId] = true),
                          GSystemDialog.custom({
                              title: GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.dialog-no-entries-created-waring.title")).replace(
                                  "%storage",
                                  this._getExternalStorageName(document)
                              ),
                              subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.dialog-no-entries-created-waring.subtitle")),
                              className: "g-auto-save-no-entries-created-in-version-history-warn-dialog",
                              icon: "info",
                              closeable: false,
                              buttons: [
                                  {
                                      label: GObject.GLocale.get(
                                          new GObject.GLocaleKey("GAutoSave", "text.dialog-no-entries-created-waring.go-settings")
                                      ),
                                      closeOnClick: true,
                                      onclick: () => {
                                          (gDesigner.executeAction(SettingsAction.ID), resolve(false));
                                      },
                                  },
                                  {
                                      label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")),
                                      closeOnClick: true,
                                      className: "primary",
                                      shortcut: GSystemDialog.Shortcut.Enter,
                                      onclick: () => {
                                          resolve(true);
                                      },
                                  },
                              ],
                              dontShowAgainCb: (checked) => {
                                  (gDesigner.setSetting(GAutoSaveManager.DISABLE_EXTERNAL_FILE_NO_ENTRIES_CREATED_WARING, !!checked),
                                      gDesigner.stats("settings_toggle_auto-save-no-entries-created-warning-enabled", !checked));
                              },
                          }));
                });
            }),
            (GAutoSaveManager.prototype._showExternalFileUpdatedOutAppWarningDialog = function (document) {
                return (
                    GSystemDialog.custom({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.dialog-file-updated-out-app-waring.title"))
                            .replace("%file-name", document.getTitle() + "." + document.getExtension().toLowerCase())
                            .replace("%app-name", DESIGNER.TITLE),
                        className: "g-auto-save-file-updated-out-app-warn-dialog",
                        icon: "info",
                        closeable: false,
                        buttons: [
                            {
                                label: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GAutoSave", "text.dialog-file-updated-out-app-waring.do-not-reload")
                                ),
                                closeOnClick: true,
                                onclick: () => {
                                    this._fileUpdatedWarningShowing = false;
                                },
                            },
                            {
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.dialog-file-updated-out-app-waring.reload")),
                                closeOnClick: true,
                                className: "primary",
                                shortcut: GSystemDialog.Shortcut.Enter,
                                onclick: () => {
                                    ((this._fileUpdatedWarningShowing = false), document.reload());
                                },
                            },
                        ],
                    }),
                    (this._fileUpdatedWarningShowing = true),
                    false
                );
            }),
            (GAutoSaveManager.prototype._getExternalStorageName = function (document) {
                if (!document) return "";
                const storageItem = document.getStorageItem();
                return storageItem && storageItem instanceof GGoogleDriveStorage.Item ? CloudIntegration.cloudOptions.find((option) => option.type === EXTERNAL_APP.GOOGLEDRIVE).name : "";
            }),
            (GAutoSaveManager.prototype._shouldHideNotifications = function () {
                return gContainer.getProperty(GAutoSaveManager.AUTO_SAVE_HIDE_NOTIFICATION_PROP_NAME);
            }),
            (GAutoSaveManager.prototype._showNotification = async function (failed) {
                if (this._autoSaveModel.isSaving() || (await this._shouldHideNotifications())) return;
                let message = "";
                message = failed
                    ? GObject.GLocale.get(new GObject.GLocaleKey("GAutoSave", "text.failed-auto-saving"))
                    : GObject.GLocale.get(GAutoSaveManager.ALTERNATE_STRINGS[Math.floor(Math.random() * GAutoSaveManager.ALTERNATE_STRINGS.length)]);
                let notification = {
                    custom: true,
                    class: "g-auto-save-notification",
                    enter: "enter",
                    exit: "exit",
                    timeout: 5e3,
                    content: [
                        failed
                            ? null
                            : $("<div/>")
                                  .addClass("spinner")
                                  .append([
                                      $("<div/>"),
                                      $("<div/>"),
                                      $("<div/>"),
                                      $("<div/>"),
                                      $("<div/>"),
                                      $("<div/>"),
                                      $("<div/>"),
                                      $("<div/>"),
                                  ]),
                        $("<div/>").addClass("message").text(message),
                    ],
                    closeCallback: function () {
                        gContainer.setProperty(GAutoSaveManager.AUTO_SAVE_HIDE_NOTIFICATION_PROP_NAME, true);
                    },
                };
                gDesigner.addNotification(notification);
            }),
            (GAutoSaveManager.prototype._isCDRFile = function (document) {
                return false;
            }),
            (module.exports = GAutoSaveManager));
    };
