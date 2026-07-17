module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(3));
        var GObject = require(1);
        const GPanel = require(606),
            GView = require(394),
            GDocumentEvent = require(78),
            GNetworkAvailabilityChangedEvent = require(291),
            GDocumentStatusEvent = require(217),
            GDocumentStatus = require(86);
        require(1348 /* CollaborativeTextController */);
        function GDocumentNotificationsPanel() {}
        (GObject.GObject.inherit(GDocumentNotificationsPanel, GPanel),
            (GDocumentNotificationsPanel.ID = "document-notifications-panel"),
            (GDocumentNotificationsPanel.prototype._htmlElement = null),
            (GDocumentNotificationsPanel.prototype._isModified = false),
            (GDocumentNotificationsPanel.prototype._documentEvent = function (event) {
                if (!event.document.isLockedByVersionHistory())
                    switch (event.type) {
                        case GDocumentEvent.Type.Activated:
                            (this._deactivate(),
                                (this._document = event.document),
                                gDesigner.addEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this),
                                this._document.addEventListener(GDocumentStatusEvent, this._handleDocumentStatusEvent, this),
                                this._update(true));
                            break;
                        case GDocumentEvent.Type.Deactivated:
                            event.document === this._document && (this._deactivate(), this._update(true));
                            break;
                        case GDocumentEvent.Type.UpdateAvailable:
                            this._document === event.document && this._update(false);
                    }
            }),
            (GDocumentNotificationsPanel.prototype._deactivate = function () {
                this._document &&
                    (gDesigner.removeEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this),
                    this._document.removeEventListener(GDocumentStatusEvent, this._handleDocumentStatusEvent, this),
                    (this._document = null));
            }),
            (GDocumentNotificationsPanel.prototype._handleDocumentStatusEvent = function (event) {
                event.status === GDocumentStatus.Loaded && this._update(true);
            }),
            (GDocumentNotificationsPanel.prototype._networkAvailabilityChangedEvent = function (event) {
                this._htmlElement.toggleClass("offline", !event.connected);
            }),
            (GDocumentNotificationsPanel.prototype._update = async function () {
                let checkForUpdate = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                if (
                    !this.isEnabled() ||
                    !this._document ||
                    this._document.isIgnoringCurrentUpdate() ||
                    this._document.getStatus() === GDocumentStatus.Loading
                )
                    return void this._close(true);
                let updateAvailable = !checkForUpdate || (await this._document.isUpdateAvailable());
                (updateAvailable ? this._showUpdatePanel() : this._close(), this.trigger(GView.UPDATE_EVENT));
            }),
            (GDocumentNotificationsPanel.prototype._close = function () {
                let notify = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                (this._htmlElement.css("display", "none"), notify && this.trigger(GView.UPDATE_EVENT));
            }),
            (GDocumentNotificationsPanel.prototype._showUpdatePanel = function () {
                (this._htmlElement.empty().append(
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
                                        .addClass("secondary")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.cancel")))
                                        .on("click", () => {
                                            (this._document.ignoreCurrentUpdate(), this._close(true));
                                        })
                                )
                                .append(
                                    $("<button/>")
                                        .addClass("g-highlight-button")
                                        .addClass("highlighted")
                                        .addClass("online-action")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCollaborativeTextPanel", "text.update-now")))
                                        .on("click", () => {
                                            (this._close(true), this._document.reload());
                                        })
                                )
                        )
                ),
                    this._htmlElement.css("display", ""));
            }),
            (GDocumentNotificationsPanel.prototype.init = function (htmlElement) {
                ((this._htmlElement = htmlElement),
                    this._htmlElement.addClass("g-document-notification-panel").css("display", "none"),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this));
            }),
            (GDocumentNotificationsPanel.prototype.isEnabled = function () {
                return !!this._document && !this._document.isCollaborativeTextEditing();
            }),
            (GDocumentNotificationsPanel.prototype.toString = function () {
                return "[Object GDocumentNotificationsPanel]";
            }),
            (GDocumentNotificationsPanel.prototype.getId = function () {
                return GDocumentNotificationsPanel.ID;
            }),
            (module.exports = GDocumentNotificationsPanel));
    };
