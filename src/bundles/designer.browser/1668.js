module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1);
        const GPanel = require(606),
            GView = require(394),
            GApplicationStateChangedEvent = require(392),
            GCollaborationEvent = require(393),
            GDocumentEvent = require(78),
            GNetworkAvailabilityChangedEvent = require(291),
            GUnloadEvent = require(1346),
            CollaborativeTextController = require(1348),
            GSystemDialog = require(44),
            GUser = require(177),
            { DateAPI, ShareRoles } = require(10 /* designerConfig */);
        function GCollaborativeTextPanel() {}
        (GObject.GObject.inherit(GCollaborativeTextPanel, GPanel),
            (GCollaborativeTextPanel.ID = "collaborative-text-panel"),
            (GCollaborativeTextPanel.prototype._htmlElement = null),
            (GCollaborativeTextPanel.prototype._requestLockDialog = null),
            (GCollaborativeTextPanel.prototype._lastRequestLockTime = 0),
            (GCollaborativeTextPanel.prototype._isModified = false),
            (GCollaborativeTextPanel.prototype._applicationStateChangedEvent = function (event) {
                event.document === this._document && this._update();
            }),
            (GCollaborativeTextPanel.prototype._documentEvent = function (event) {
                if (!event.document.isLockedByVersionHistory())
                    switch (event.type) {
                        case GDocumentEvent.Type.Activated:
                            (this._deactivate(),
                                (this._document = event.document),
                                this._document.addEventListener(CollaborativeTextController.StatusChangedEvent, this._update, this),
                                this._document.addEventListener(CollaborativeTextController.LockUpdateEvent, this._update, this),
                                this._document.addEventListener(GCollaborationEvent, this._collaborationEvent, this),
                                gDesigner.addEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this),
                                this._update());
                            break;
                        case GDocumentEvent.Type.Deactivated:
                            event.document === this._document && (this._deactivate(), this._htmlElement.css("display", "none"));
                            break;
                        case GDocumentEvent.Type.Modified:
                            if (!this.isEnabled()) return;
                            if (event.document === this._document && this._document.isCollaborativeTextEditing()) {
                                const isModified = this._document.isModified();
                                this._isModified !== isModified && ((this._isModified = isModified), this._update());
                            }
                    }
            }),
            (GCollaborativeTextPanel.prototype._deactivate = function () {
                this._document &&
                    (this._document.removeEventListener(CollaborativeTextController.StatusChangedEvent, this._update, this),
                    this._document.removeEventListener(CollaborativeTextController.LockUpdateEvent, this._update, this),
                    this._document.removeEventListener(GCollaborationEvent, this._collaborationEvent, this),
                    gDesigner.removeEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this));
            }),
            (GCollaborativeTextPanel.prototype._collaborationEvent = function (event) {
                event.type === GCollaborationEvent.Type.LockRequest && this._requestLock(event.data.from && event.data.from.name);
            }),
            (GCollaborativeTextPanel.prototype._networkAvailabilityChangedEvent = function (event) {
                this._htmlElement.toggleClass("offline", !event.connected);
            }),
            (GCollaborativeTextPanel.prototype._update = async function () {
                if ((this._htmlElement.css("display", this.isEnabled() ? "" : "none"), this.isEnabled())) {
                    const controller = this._document.getCollaborativeTextController();
                    if (controller)
                        if (controller.getStatus() === CollaborativeTextController.Status.UpdateAvailable) (this._document.lock(), this._showUpdatePanel());
                        else if (controller.getStatus() === CollaborativeTextController.Status.Updating) this._showUpdatingPanel();
                        else if (gDesigner.getApplicationManager().hasRole(ShareRoles.Owner)) this._showOwnerPanel();
                        else if (await controller.canLock())
                            switch (controller.getStatus()) {
                                case CollaborativeTextController.Status.Initial:
                                case CollaborativeTextController.Status.Editing:
                                    this._showEditPanel();
                                    break;
                                case CollaborativeTextController.Status.Finished:
                                case CollaborativeTextController.Status.Previewed:
                                    this._showFinishedPanel();
                                    break;
                                case CollaborativeTextController.Status.Previewing:
                                    this._showPreviewPanel();
                                    break;
                                case CollaborativeTextController.Status.Sending:
                                    this._showSendingPanel();
                            }
                        else this._showRequestPanel();
                }
                this.trigger(GView.UPDATE_EVENT);
            }),
            (GCollaborativeTextPanel.prototype._showOwnerPanel = function () {
                this._htmlElement.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .addClass("owner-panel")
                        .append(
                            $("<span/>")
                                .addClass("message")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.owner-message")))
                        )
                );
            }),
            (GCollaborativeTextPanel.prototype._showUpdatePanel = function () {
                this._htmlElement.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .addClass("update-panel")
                        .append(
                            $("<span/>")
                                .addClass("message")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.update-available-message")))
                        )
                        .append(
                            $("<div/>")
                                .addClass("buttons")
                                .append(
                                    $("<button/>")
                                        .addClass("g-highlight-button")
                                        .addClass("highlighted")
                                        .addClass("online-action")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.update-now")))
                                        .on("click", () => {
                                            (gDesigner.stats("collabtextpanel_bottom-bar_file-update"),
                                                this._document.getCollaborativeTextController().reloadDocument());
                                        })
                                )
                        )
                );
            }),
            (GCollaborativeTextPanel.prototype._showUpdatingPanel = function () {
                this._htmlElement.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .addClass("updating-panel")
                        .append($("<div>").addClass("g-loading"))
                        .append(
                            $("<span/>")
                                .addClass("message")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.updating")))
                        )
                );
            }),
            (GCollaborativeTextPanel.prototype._showEditPanel = function () {
                this._htmlElement.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .addClass("edit-panel")
                        .append(
                            $("<span/>")
                                .addClass("message")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.finish-editing-message")))
                        )
                        .append(
                            $("<button/>")
                                .addClass("g-highlight-button")
                                .addClass("highlighted")
                                .addClass("online-action")
                                .prop("disabled", !this._document.isModified())
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.finish-editing")))
                                .on("click", () => {
                                    (gDesigner.stats("collabtextpanel_bottom-bar_finish-editing"),
                                        this._document.getCollaborativeTextController().finishTextEditing());
                                })
                        )
                );
            }),
            (GCollaborativeTextPanel.prototype._showFinishedPanel = function () {
                this._htmlElement.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .addClass("finish-panel")
                        .append(
                            $("<button/>")
                                .prop("disabled", this._document.getCollaborativeTextController().getStatus() === CollaborativeTextController.Status.Previewed)
                                .addClass("g-highlight-button")
                                .addClass("outlined")
                                .addClass("online-action")
                                .append($("<span/>").addClass("icon").addClass("gravit-icon-co-text-editing-display"))
                                .append(
                                    $("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.preview-changes")))
                                )
                                .on("click", () => {
                                    (gDesigner.stats("collabtextpanel_bottom-bar_preview-changes"),
                                        this._document.getCollaborativeTextController().previewChanges());
                                })
                        )
                        .append(
                            $("<span/>")
                                .addClass("message")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.send-changes-message")))
                        )
                        .append(
                            $("<div/>")
                                .addClass("buttons")
                                .append(
                                    $("<button/>")
                                        .addClass("g-highlight-button")
                                        .addClass("secondary")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.back-to-editing")))
                                        .on("click", () => {
                                            (gDesigner.stats("collabtextpanel_bottom-bar_back-to-editing"),
                                                this._document.getCollaborativeTextController().backToTextEditing());
                                        })
                                )
                                .append(
                                    $("<button/>")
                                        .addClass("g-highlight-button")
                                        .addClass("highlighted")
                                        .addClass("online-action")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.send-changes")))
                                        .on("click", () => {
                                            (gDesigner.stats("collabtextpanel_bottom-bar_send-changes"),
                                                GSystemDialog.confirm(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.send-to-owner")),
                                                    (confirmed) => {
                                                        confirmed &&
                                                            this._document
                                                                .getCollaborativeTextController()
                                                                .sendChanges()
                                                                .then(() => {
                                                                    GSystemDialog.alert(
                                                                        GObject.GLocale.get(
                                                                            new GObject.GLocaleKey(
                                                                                "GCollaborativeTextPanel",
                                                                                "text.your-changes-were-applied"
                                                                            )
                                                                        )
                                                                    );
                                                                })
                                                                .catch(() => {
                                                                    GSystemDialog.alert(
                                                                        GObject.GLocale.get(
                                                                            new GObject.GLocaleKey(
                                                                                "GCollaborativeTextPanel",
                                                                                "text.send-changes-failed"
                                                                            )
                                                                        )
                                                                    );
                                                                });
                                                    }
                                                ));
                                        })
                                )
                        )
                );
            }),
            (GCollaborativeTextPanel.prototype._showPreviewPanel = function () {
                this._htmlElement.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .addClass("preview-panel")
                        .append($("<div>").addClass("g-loading"))
                        .append(
                            $("<span/>")
                                .addClass("message")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.rendering-preview")))
                        )
                );
            }),
            (GCollaborativeTextPanel.prototype._showSendingPanel = function () {
                this._htmlElement.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .addClass("sending-panel")
                        .append($("<div>").addClass("g-loading"))
                        .append(
                            $("<span/>")
                                .addClass("message")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.sending-changes")))
                        )
                );
            }),
            (GCollaborativeTextPanel.prototype._showRequestPanel = async function () {
                const lock = await this._document.getCollaborativeTextController().getCurrentLock();
                if (!lock) return this._document.getCollaborativeTextController().resetTextEditing();
                const user = new GUser(lock.user);
                this._htmlElement.empty().append(
                    $("<div/>")
                        .addClass("container")
                        .addClass("request-access-panel")
                        .append(
                            $("<span/>")
                                .addClass("message")
                                .text(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.request-access-message")).replace(
                                        "%name",
                                        user.getFullUserName()
                                    )
                                )
                        )
                        .append(
                            $("<button/>")
                                .addClass("g-highlight-button")
                                .addClass("highlighted")
                                .addClass("online-action")
                                .prop("disabled", this._document.getCollaborativeTextController().hasAlreadyRequestedAccess())
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.request-access")))
                                .on("click", (event) => {
                                    (gDesigner.stats("collabtextpanel_bottom-bar_request-access"),
                                        gDesigner.toggleLoading(true),
                                        this._document
                                            .getCollaborativeTextController()
                                            .requestAccess()
                                            .then(() => {
                                                ($(event.target).closest("button").attr("disabled", true),
                                                    GSystemDialog.alert(
                                                        GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GCollaborativeTextPanel", "text.request-has-been-sent")
                                                        ).replace("%name", user.getFullUserName())
                                                    ));
                                            })
                                            .catch((error) => {
                                                error.status && error.status !== gApi.HTTP_STATUS_CODES.NOT_FOUND && GSystemDialog.error(error);
                                            })
                                            .finally(() => {
                                                (this._update(), gDesigner.toggleLoading(false));
                                            }));
                                })
                        )
                );
            }),
            (GCollaborativeTextPanel.prototype._requestLock = function (userName) {
                if (!this.isEnabled()) return;
                if (this._requestLockDialog) return;
                const now = DateAPI.now(),
                    cooldownMs = DateAPI.minutesToMilliseconds(5);
                (this._lastRequestLockTime && now - this._lastRequestLockTime < cooldownMs) ||
                    ((this._lastRequestLockTime = now),
                    (this._requestLockDialog = GSystemDialog.custom({
                        className: "g-request-lock-dialog",
                        closeCallback: () => (this._requestLockDialog = null),
                        closeable: false,
                        subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.wants-to-take-over")).replace(
                            /%name/g,
                            userName || GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.unknown-user"))
                        ),
                        buttons: [
                            {
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.save-my-edits-and-allow")),
                                onclick: (dialogElement) => {
                                    (dialogElement.gDialog("close"),
                                        this._document
                                            .getCollaborativeTextController()
                                            .sendChanges()
                                            .catch(() => {
                                                GSystemDialog.alert(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.send-changes-failed"))
                                                );
                                            }));
                                },
                            },
                            {
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.discard-my-edits-and-allow")),
                                onclick: (dialogElement) => {
                                    (dialogElement.addClass("g-loading"),
                                        this._document
                                            .getCollaborativeTextController()
                                            .releaseLock()
                                            .catch((error) => {
                                                GSystemDialog.error(error);
                                            })
                                            .finally(() => {
                                                dialogElement.gDialog("close");
                                            }));
                                },
                            },
                            {
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.decline")),
                                highlighted: true,
                                onclick: (dialogElement) => {
                                    dialogElement.gDialog("close");
                                },
                            },
                        ],
                    })));
            }),
            (GCollaborativeTextPanel.prototype.init = function (element) {
                ((this._htmlElement = element),
                    this._htmlElement.addClass("g-collaborative-text-panel").css("display", "none"),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this),
                    gDesigner.addEventListener(GUnloadEvent, this._unloadEvent, this),
                    gDesigner.addEventListener(GApplicationStateChangedEvent, this._applicationStateChangedEvent, this));
            }),
            (GCollaborativeTextPanel.prototype._unloadEvent = function (event) {
                if (this._document)
                    try {
                        gApi.lock.releaseSync(this._document.getId());
                    } catch (e) {}
            }),
            (GCollaborativeTextPanel.prototype.isEnabled = function () {
                return !!this._document && this._document.isCollaborativeTextEditing();
            }),
            (GCollaborativeTextPanel.prototype.toString = function () {
                return "[Object GCollaborativeTextPanel]";
            }),
            (GCollaborativeTextPanel.prototype.getId = function () {
                return GCollaborativeTextPanel.ID;
            }),
            (module.exports = GCollaborativeTextPanel));
    };
