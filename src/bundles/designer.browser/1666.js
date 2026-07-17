module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(13));
        var GObject = require(1);
        const {
                DESIGNER: { TITLE },
            } = require(10 /* designerConfig */),
            GPanel = require(606),
            GView = require(394),
            GNotificationEvent = require(1321),
            GDocumentEvent = require(78),
            GEmbeddedLogin = require(860),
            GNotificationBuilder = require(1667);
        function GNotificationPanel() {}
        (GObject.GObject.inherit(GNotificationPanel, GPanel),
            (GNotificationPanel.ID = "notification-panel"),
            (GNotificationPanel.prototype._htmlElement = null),
            (GNotificationPanel.prototype._lastNotification = null),
            (GNotificationPanel.prototype._closeCallback = null),
            (GNotificationPanel.prototype.init = function (htmlElement) {
                ((this._htmlElement = htmlElement),
                    this._htmlElement
                        .addClass("g-hide")
                        .addClass("g-notification-panel")
                        .on("click", function () {
                            ($(this).toggleClass("bring-to-front", true), gDesigner.sendSideBarAndAssistBarToBack());
                        }),
                    $("<div></div>")
                        .addClass("g-btn-close")
                        .append($("<span></span>").addClass("gravit-icon-close"))
                        .on("click", () => {
                            this._close(true);
                        })
                        .appendTo(this._htmlElement),
                    gDesigner.addEventListener(GNotificationEvent, this._notificationEvent, this),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this));
            }),
            (GNotificationPanel.prototype.isEnabled = function () {
                return !this._htmlElement.hasClass("g-hide");
            }),
            (GNotificationPanel.prototype._documentEvent = function (event) {
                if (!event.document.isLockedByVersionHistory() && this._lastNotification && this._lastNotification.document)
                    switch (event.type) {
                        case GDocumentEvent.Type.Activated: {
                            let documentChanged = event.document !== this._lastNotification.document;
                            (this._htmlElement.toggleClass("g-hide", documentChanged),
                                this._htmlElement.toggleClass("bring-to-front", documentChanged),
                                documentChanged && gDesigner.sendSideBarAndAssistBarToBack());
                            break;
                        }
                        case GDocumentEvent.Type.Removed:
                            event.document === this._lastNotification.document && this._close();
                    }
            }),
            (GNotificationPanel.prototype._notificationEvent = async function (event) {
                if (
                    ((this._lastNotification = event.notification),
                    (this._closeCallback = event.notification.closeCallback),
                    this._htmlElement.removeClass("g-hide"),
                    this._htmlElement.toggleClass("bring-to-front", true),
                    gDesigner.sendSideBarAndAssistBarToBack(),
                    this._htmlElement.toggleClass("popup", !!event.notification.popup && !event.notification.anonymous),
                    event.notification.anonymous)
                ) {
                    const activeDocument = gDesigner.getActiveDocument(),
                        isSharedTemplate = activeDocument && activeDocument.isDocumentFromTemplate() && activeDocument.isShared(),
                        handleAuthenticated = (user) => {
                            user && !user.isAnonymous() && ((this._lastNotification = null), this._htmlElement.addClass("g-hide"));
                        };
                    let introMessage = isSharedTemplate
                        ? GObject.GLocale.get(new GObject.GLocaleKey("GNotificationPanel", "text.create-account-template"))
                        : GObject.GLocale.get(new GObject.GLocaleKey("GNotificationPanel", "text.create-account"));
                    const panelElement = $("<div/>")
                        .addClass("anonymous")
                        .append($("<div/>").addClass("logo"))
                        .append(
                            $("<div/>")
                                .addClass("content")
                                .append(
                                    $("<span/>")
                                        .addClass("title")
                                        .text(
                                            GObject.GLocale.get(new GObject.GLocaleKey("GNotificationPanel", "text.title-welcome")).replace("%app", TITLE)
                                        )
                                )
                                .append(
                                    $("<span/>")
                                        .text(event.notification.message)
                                        .css("display", event.notification.message && !isSharedTemplate ? "" : "none")
                                )
                                .append(
                                    $("<span/>").html(
                                        introMessage
                                            .replace("%signup", () =>
                                                $("<span/>")
                                                    .attr("id", "signup-link")
                                                    .addClass("link")
                                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GNotificationPanel", "text.sign-up")))
                                                    .prop("outerHTML")
                                            )
                                            .replace("%signin", () =>
                                                $("<span/>")
                                                    .attr("id", "signin-link")
                                                    .addClass("link")
                                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GNotificationPanel", "text.sign-in")))
                                                    .prop("outerHTML")
                                            )
                                    )
                                )
                                .append(
                                    $("<span/>")
                                        .addClass("footer")
                                        .html(
                                            GObject.GLocale.get(new GObject.GLocaleKey("GNotificationPanel", "text.footer")).replace("%app", () =>
                                                $("<span/>").attr("id", "learnmore-link").addClass("link").text(TITLE).prop("outerHTML")
                                            )
                                        )
                                )
                        );
                    (panelElement.find("#signup-link").on("click", () => {
                        (gDesigner.stats("open-shared_click_create-account"), new GEmbeddedLogin(handleAuthenticated).open({ anonymous: true, signup: true, animate: true }));
                    }),
                        panelElement.find("#signin-link").on("click", () => {
                            (gDesigner.stats("open-shared_click_login"), new GEmbeddedLogin(handleAuthenticated).open({ anonymous: true, animate: true }));
                        }),
                        panelElement.find("#learnmore-link").on("click", (event) => {
                            (gDesigner.stats("open-shared_click_learn-more"),
                                gContainer.openExternalLink(event, "https://gravit.linusrath.de/?utm_campaign=gdsharedfile"));
                        }),
                        this._updateContent(panelElement));
                } else if (event.notification.custom) {
                    if (
                        ((this._closeCallback = event.notification.closeCallback),
                        this._htmlElement.addClass([event.notification.class, event.notification.enter]),
                        this._updateContent(event.notification.content),
                        event.notification.timeout)
                    ) {
                        let self = this;
                        new Promise(function (resolve) {
                            setTimeout(function () {
                                (self._htmlElement.removeClass(event.notification.enter), self._htmlElement.addClass(event.notification.exit), resolve(true));
                            }, event.notification.timeout);
                        }).then(function () {
                            setTimeout(function () {
                                (self._htmlElement.removeClass(event.notification.exit), self._close(false));
                            }, 600);
                        });
                    }
                } else
                    event.builder instanceof GNotificationBuilder
                        ? (event.builder.addEventListener(GNotificationBuilder.Event, (event) => {
                              event.type === GNotificationBuilder.Event.Type.Close && this._close();
                          }),
                          this._updateContent(
                              $("<div></div>")
                                  .addClass("message")
                                  .append(await event.builder.build())
                          ))
                        : this._updateContent($("<div></div>").addClass("message").append(event.notification.message));
                this.trigger(GView.UPDATE_EVENT);
            }),
            (GNotificationPanel.prototype._updateContent = function (content) {
                (this._htmlElement.find(".content").remove(), this._htmlElement.append($("<div></div>").addClass("content").append(content)));
            }),
            (GNotificationPanel.prototype._close = function (invokeCallback) {
                ((this._lastNotification = null),
                    this._htmlElement.addClass("g-hide"),
                    this._closeCallback && invokeCallback && this._closeCallback(),
                    this.trigger(GView.UPDATE_EVENT));
            }),
            (GNotificationPanel.prototype.toString = function () {
                return "[Object GNotificationPanel]";
            }),
            (GNotificationPanel.prototype.getId = function () {
                return GNotificationPanel.ID;
            }),
            (module.exports = GNotificationPanel));
    };
