module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(13));
        var GObject = require(1);
        const GPanel = require(606),
            GView = require(394),
            PwaUpdateEvents = require(1188),
            GContainer = require(85),
            GSystemDialog = require(44),
            { SOFTWARE_UPDATE, DateAPI } = require(10 /* designerConfig */);
        function GSoftwareUpdatePanel() {}
        (GObject.GObject.inherit(GSoftwareUpdatePanel, GPanel),
            (GSoftwareUpdatePanel.ID = "software-update-panel"),
            (GSoftwareUpdatePanel.prototype._mustBeOpened = null),
            (GSoftwareUpdatePanel.prototype.init = function (htmlElement) {
                ((this._htmlElement = htmlElement),
                    this._htmlElement.addClass("software-update-panel"),
                    $("<div></div>")
                        .addClass("g-btn-close")
                        .append($("<span></span>").addClass("gravit-icon-close"))
                        .on("click", () => this._hide())
                        .appendTo(this._htmlElement),
                    this._updatePanelState(false));
            }),
            (GSoftwareUpdatePanel.prototype._hide = function () {
                this._updatePanelState(false);
            }),
            (GSoftwareUpdatePanel.prototype._changePanelVisibility = function (visible) {
                visible ? this._htmlElement.removeClass("g-hide") : this._htmlElement.addClass("g-hide");
            }),
            (GSoftwareUpdatePanel.prototype._updatePanelState = function (mustBeOpened) {
                mustBeOpened !== this._mustBeOpened && (this._changePanelVisibility(mustBeOpened), (this._mustBeOpened = mustBeOpened), this.trigger(GView.UPDATE_EVENT));
            }),
            (GSoftwareUpdatePanel.prototype._updateContent = function (content) {
                (this._htmlElement.find(".content").remove(), this._htmlElement.append($("<div></div>").addClass("content").append(content)));
            }),
            (GSoftwareUpdatePanel.prototype.activate = function () {
                this._addEventListeners();
            }),
            (GSoftwareUpdatePanel.prototype.deactivate = function () {
                this._removeEventListeners();
            }),
            (GSoftwareUpdatePanel.prototype._addEventListeners = function () {
                (gDesigner.addEventListener(PwaUpdateEvents.AfterUpdate, this._handleAfterUpdate, this),
                    gDesigner.addEventListener(PwaUpdateEvents.DownloadComplete, this._handleDownloadComplete, this),
                    gDesigner.addEventListener(PwaUpdateEvents.Downloading, this._handleDownloadInProgress, this),
                    gDesigner.addEventListener(PwaUpdateEvents.UpdateAvailable, this._handleUpdateAvailable, this),
                    gDesigner.addEventListener(PwaUpdateEvents.UpdateError, this._handleUpdateError, this),
                    gDesigner.addEventListener(PwaUpdateEvents.UpdateNotAvailable, this._handleUpdateNotAvailable, this));
            }),
            (GSoftwareUpdatePanel.prototype._handleAfterUpdate = function (event) {
                if (!this._shouldShowMessages(event)) return;
                const currentVersion = event.currentVersion,
                    message = GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.after-update")).replace("%currentVersion", currentVersion);
                (this._updateContent(
                    $("<div></div>")
                        .addClass("message")
                        .addClass("featured")
                        .append(message)
                        .append(
                            SOFTWARE_UPDATE.SHOW_CHANGE_LOG
                                ? $("<a></a>")
                                      .text(GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.see-release-notes")))
                                      .click((clickEvent) => {
                                          gContainer.openExternalLink(clickEvent, gDesigner.getSoftwareUpdateManager().getReleaseNotesLink());
                                      })
                                : ""
                        )
                ),
                    this._updatePanelState(true));
            }),
            (GSoftwareUpdatePanel.prototype._handleUpdateNotAvailable = function (event) {
                if (!this._shouldShowMessages(event)) return;
                const currentVersion = event.currentVersion,
                    message = GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.update-not-available")).replace("%currentVersion", currentVersion);
                (this._updateContent($("<div></div>").addClass("message").append(message)), this._updatePanelState(true));
            }),
            (GSoftwareUpdatePanel.prototype._handleDownloadComplete = function (event) {
                if (!this._shouldShowMessages(event)) return;
                const newVersion = event.newVersion,
                    forceUpdate = event.forceUpdate,
                    message = GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.download-ready")).replace("%newVersion", newVersion);
                var installing = false;
                (this._updateContent(
                    $("<div></div>")
                        .addClass("message")
                        .addClass("featured")
                        .html(message)
                        .click(async () => {
                            installing ||
                                ((await gContainer.canUnload(gDesigner.hasModifiedDocuments(), gDesigner.hasSynchronizingDocuments())) &&
                                    ((installing = true),
                                    gDesigner.getSoftwareUpdateManager().installUpdate(),
                                    this._updateContent(
                                        $("<div></div>")
                                            .addClass("message")
                                            .addClass("featured")
                                            .append(
                                                $("<span/>").addClass("gravit-icon-rotate-right-flat").addClass("icon").addClass("spin")
                                            )
                                            .append(GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.updating")))
                                    )));
                        })
                ),
                    this._updatePanelState(true),
                    forceUpdate && this._createForceUpdateMessageDialog());
            }),
            (GSoftwareUpdatePanel.prototype._handleDownloadInProgress = function (event) {
                if (!this._shouldShowMessages(event)) return;
                const percent = event.percent,
                    newVersion = event.newVersion;
                var progressContent = this._htmlElement.find(".progress-content");
                const message = GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.download-progress")).replace("%newVersion", newVersion);
                progressContent.length ||
                    (this._updateContent(
                        $("<div></div>")
                            .addClass("message")
                            .text(message)
                            .append(
                                $("<div></div>")
                                    .addClass("progress-content")
                                    .append($("<div></div>").addClass("progress-element").append($("<div></div>").addClass("progress-bar")))
                                    .append($("<div></div>").addClass("percent"))
                            )
                    ),
                    (progressContent = this._htmlElement.find(".progress-content")));
                (progressContent.find(".progress-bar").css({ width: "".concat(percent, "%") }), progressContent.find(".percent").text(percent));
            }),
            (GSoftwareUpdatePanel.prototype._shouldShowMessages = function (event) {
                return !event.isSilent;
            }),
            (GSoftwareUpdatePanel.prototype._handleUpdateAvailable = function (event) {
                if (!this._shouldShowMessages(event)) return;
                const currentVersion = event.currentVersion,
                    newVersion = event.newVersion,
                    forceUpdate = event.forceUpdate;
                if (event.isSilent && !forceUpdate) return;
                !forceUpdate ||
                    (gContainer.getRuntime() !== GContainer.Runtime.Browser && gContainer.getRuntime() !== GContainer.Runtime.PWA) ||
                    this._createForceUpdateMessageDialog();
                const message = GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.update-available"))
                        .replace("%newVersion", newVersion)
                        .replace("%currentVersion", currentVersion),
                    icon = $("<span/>").addClass("gravit-icon-rotate-right-flat").addClass("icon");
                (this._updateContent(
                    $("<div></div>")
                        .addClass("message")
                        .addClass("featured")
                        .append(icon)
                        .append(message)
                        .append(
                            $("<a></a>")
                                .append(GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.update-now")))
                                .click(() => {
                                    (icon.addClass("spin"), this._installAfterDocumentUnload());
                                })
                        )
                ),
                    this._updatePanelState(true));
            }),
            (GSoftwareUpdatePanel.prototype._installAfterDocumentUnload = async function () {
                if (await gContainer.canUnload(gDesigner.hasModifiedDocuments(), gDesigner.hasSynchronizingDocuments()))
                    switch (gContainer.getRuntime()) {
                        case GContainer.Runtime.Browser:
                        case GContainer.Runtime.PWA:
                            gDesigner.getSoftwareUpdateManager().installUpdate();
                            break;
                        case GContainer.Runtime.Electron:
                            gDesigner.getSoftwareUpdateManager().downloadUpdate();
                    }
                else GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.dialog-unsaved-documents")));
            }),
            (GSoftwareUpdatePanel.prototype._createForceUpdateMessageDialog = function () {
                let dialog,
                    closed = false;
                const countdownDuration = DateAPI.minutesToMilliseconds(5),
                    closeDialog = () => {
                        closed ||
                            ((closed = true),
                            dialog.gDialog("close"),
                            gDesigner.createCountdown(() => {
                                gDesigner.getSoftwareUpdateManager().installUpdate();
                            }, countdownDuration));
                    };
                ((dialog = $("<div></div>").gDialog({
                    releaseOnClose: true,
                    className: "g-force-update-app-dialog",
                    closeCallback: closeDialog,
                })),
                    $("<div></div>")
                        .addClass("g-btn-close")
                        .append($("<span></span>").addClass("gravit-icon-close"))
                        .on("click", () => closeDialog())
                        .appendTo(dialog),
                    $("<div></div>").addClass("logo").appendTo(dialog),
                    $("<div></div>")
                        .addClass("content")
                        .append(
                            $("<span></span>")
                                .addClass("title")
                                .html(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.force-new-version-available")).replace(
                                        "%newVersion",
                                        gDesigner.getSoftwareUpdateManager().getNewVersion()
                                    )
                                )
                        )
                        .append(
                            $("<span></span>")
                                .addClass("subtitle")
                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.force-message-avoid-losing-progress")))
                        )
                        .append(
                            $("<span></span>")
                                .addClass("update-information")
                                .html(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.force-update-information-time")).replace(
                                        "%minutes",
                                        5
                                    )
                                )
                        )
                        .append(
                            $("<div></div>")
                                .addClass("buttons")
                                .append(
                                    $("<button></button>")
                                        .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.ok"))))
                                        .on("click", () => closeDialog())
                                )
                        )
                        .appendTo(dialog),
                    dialog.gDialog("open", false));
            }),
            (GSoftwareUpdatePanel.prototype._handleUpdateError = function (event) {
                if (!this._shouldShowMessages(event)) return;
                const message = GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "text.update-error"));
                (this._updateContent($("<div></div>").addClass("message").append(message)), this._updatePanelState(true));
            }),
            (GSoftwareUpdatePanel.prototype._removeEventListeners = function () {
                (gDesigner.removeEventListener(PwaUpdateEvents.AfterUpdate, this._handleAfterUpdate),
                    gDesigner.removeEventListener(PwaUpdateEvents.DownloadComplete, this._handleDownloadComplete),
                    gDesigner.removeEventListener(PwaUpdateEvents.Downloading, this._handleDownloadInProgress),
                    gDesigner.removeEventListener(PwaUpdateEvents.UpdateAvailable, this._handleUpdateAvailable),
                    gDesigner.removeEventListener(PwaUpdateEvents.UpdateError, this._handleUpdateError),
                    gDesigner.removeEventListener(PwaUpdateEvents.UpdateNotAvailable, this._handleUpdateNotAvailable));
            }),
            (GSoftwareUpdatePanel.prototype.getTitle = function () {
                return GObject.GLocale.get(new GObject.GLocaleKey("GSoftwareUpdatePanel", "title"));
            }),
            (GSoftwareUpdatePanel.prototype.isEnabled = function () {
                return !!this._mustBeOpened;
            }),
            (GSoftwareUpdatePanel.prototype.toString = function () {
                return "[Object GSoftwareUpdatePanel]";
            }),
            (GSoftwareUpdatePanel.prototype.getId = function () {
                return GSoftwareUpdatePanel.ID;
            }),
            (module.exports = GSoftwareUpdatePanel));
    };
