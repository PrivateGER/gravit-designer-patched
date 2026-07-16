module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(3));
        var GObject = require(1);
        const i = require(606),
            a = require(394),
            r = require(78),
            s = require(291),
            l = require(217),
            c = require(86);
        require(1348);
        function d() {}
        (GObject.GObject.inherit(d, i),
            (d.ID = "document-notifications-panel"),
            (d.prototype._htmlElement = null),
            (d.prototype._isModified = false),
            (d.prototype._documentEvent = function (e) {
                if (!e.document.isLockedByVersionHistory())
                    switch (e.type) {
                        case r.Type.Activated:
                            (this._deactivate(),
                                (this._document = e.document),
                                gDesigner.addEventListener(s, this._networkAvailabilityChangedEvent, this),
                                this._document.addEventListener(l, this._handleDocumentStatusEvent, this),
                                this._update(true));
                            break;
                        case r.Type.Deactivated:
                            e.document === this._document && (this._deactivate(), this._update(true));
                            break;
                        case r.Type.UpdateAvailable:
                            this._document === e.document && this._update(false);
                    }
            }),
            (d.prototype._deactivate = function () {
                this._document &&
                    (gDesigner.removeEventListener(s, this._networkAvailabilityChangedEvent, this),
                    this._document.removeEventListener(l, this._handleDocumentStatusEvent, this),
                    (this._document = null));
            }),
            (d.prototype._handleDocumentStatusEvent = function (e) {
                e.status === c.Loaded && this._update(true);
            }),
            (d.prototype._networkAvailabilityChangedEvent = function (e) {
                this._htmlElement.toggleClass("offline", !e.connected);
            }),
            (d.prototype._update = async function () {
                let e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                if (
                    !this.isEnabled() ||
                    !this._document ||
                    this._document.isIgnoringCurrentUpdate() ||
                    this._document.getStatus() === c.Loading
                )
                    return void this._close(true);
                let t = !e || (await this._document.isUpdateAvailable());
                (t ? this._showUpdatePanel() : this._close(), this.trigger(a.UPDATE_EVENT));
            }),
            (d.prototype._close = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                (this._htmlElement.css("display", "none"), e && this.trigger(a.UPDATE_EVENT));
            }),
            (d.prototype._showUpdatePanel = function () {
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
            (d.prototype.init = function (e) {
                ((this._htmlElement = e),
                    this._htmlElement.addClass("g-document-notification-panel").css("display", "none"),
                    gDesigner.addEventListener(r, this._documentEvent, this));
            }),
            (d.prototype.isEnabled = function () {
                return !!this._document && !this._document.isCollaborativeTextEditing();
            }),
            (d.prototype.toString = function () {
                return "[Object GDocumentNotificationsPanel]";
            }),
            (d.prototype.getId = function () {
                return d.ID;
            }),
            (module.exports = d));
    };
