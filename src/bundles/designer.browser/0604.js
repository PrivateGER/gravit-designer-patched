module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(8 /* Symbol */), require(71 /* polyfill:String */), require(4), require(13), require(38));
        var GObject = require(1);
        const GPurchasePanel = require(1507),
            GAccountPanel = require(1508),
            GChangePasswordPanel = require(1509),
            GUserPropertiesChangedEvent = (require(1158), require(805)),
            { gApi } = (require(177 /* GUser */), require(10 /* designerConfig */));
        function GProfileDialog(user, initialTab) {
            let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            ((this._user = user), (this._options = options), this._init(initialTab, options));
        }
        (GObject.GObject.inherit(GProfileDialog, GObject.GObject),
            (GProfileDialog.prototype._options = null),
            (GProfileDialog.prototype._avatar = null),
            (GProfileDialog.Tabs = {
                Account: "account",
                Purchase: "purchase",
                ChangePassword: "change-password",
            }),
            (GProfileDialog.prototype._init = async function (initialTab) {
                var self = this;
                let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const { closeable: closeable = true, tabs } = options;
                gDesigner.getLicense();
                ((this._dialog = $("<div></div>").gDialog({
                    closeCallback: () => this._close(),
                    releaseOnClose: true,
                    className: "g-profile-dialog",
                })),
                    closeable &&
                        $("<div></div>")
                            .addClass("g-btn-close")
                            .append($("<span></span>").addClass("gravit-icon-close"))
                            .on("click", this.close.bind(this))
                            .appendTo(this._dialog));
                let leftSidebar = $("<div></div>").addClass("left-sidebar").appendTo(this._dialog),
                    rightSidebar = $("<div></div>").addClass("right-sidebar").appendTo(this._dialog);
                ((this._avatar = $("<div></div>")
                    .addClass("avatar")
                    .append(
                        $("<span></span>")
                            .addClass("btn gravit-icon-avatar")
                            .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.avatar-tooltip")))
                            .on("click", this._updateAvatar.bind(this))
                    )),
                    $("<div></div>").addClass("picture").append(this._avatar).appendTo(leftSidebar));
                let header = $("<div></div>")
                    .addClass("header")
                    .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.details"))))
                    .appendTo(rightSidebar);
                ((this._messageHandler = function (message) {
                    let messageType = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "error";
                    (self._dialog.find(".message").remove(),
                        message &&
                            $("<div></div>")
                                .addClass("message " + messageType)
                                .append($("<span></span>").html(message))
                                .on("click", (event) => $(event.target).closest(".message").remove())
                                .insertAfter(header));
                }),
                    (this._tabs = $("<ul></ul>").addClass("tabs").appendTo(leftSidebar)),
                    (this._panels = $("<div></div>").addClass("tab-panels").appendTo(rightSidebar)));
                const createTab = (label, iconClass, content, tabId) => {
                        let panel = $("<div></div>").addClass("tab-panel").append(content).appendTo(this._panels);
                        $("<li></li>")
                            .attr("id", tabId)
                            .addClass("tab")
                            .append($("<span></span>").addClass(iconClass))
                            .append($("<span></span>").text(label))
                            .on("click", function (event) {
                                let silent = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                    tabElement = $(event.target).closest(".tab");
                                (silent || self._messageHandler(void 0),
                                    self._tabs.find(".tab.g-selected").removeClass("g-selected"),
                                    self._panels.find(".tab-panel.g-selected").removeClass("g-selected"),
                                    panel.addClass("g-selected"),
                                    tabElement.addClass("g-selected"),
                                    header.find("span").text(label),
                                    gDesigner.stats("profile-dialog_tab_".concat(tabElement.attr("id"))));
                            })
                            .appendTo(this._tabs);
                    },
                    isTabVisible = function (tabId) {
                        let defaultValue = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                        return tabs && tabs.length ? tabs.includes(tabId) : defaultValue;
                    };
                if (
                    (isTabVisible(GProfileDialog.Tabs.Account) &&
                        createTab(
                            GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.details")),
                            "gravit-icon-account",
                            new GAccountPanel(this._user, this._messageHandler.bind(this), this, options).getHTMLElement(),
                            GProfileDialog.Tabs.Account
                        ),
                    isTabVisible(GProfileDialog.Tabs.ChangePassword, false) &&
                        createTab(
                            GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.change-password")),
                            "gravit-icon-change-password",
                            new GChangePasswordPanel(this._user, this._messageHandler.bind(this), this, options).getHTMLElement(),
                            GProfileDialog.Tabs.ChangePassword
                        ),
                    isTabVisible(GProfileDialog.Tabs.Purchase))
                ) {
                    (await gApi.hasPurchases({ issued: "true" }).catch(() => false)) &&
                        createTab(
                            GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.purchases")),
                            "gravit-icon-purchase",
                            new GPurchasePanel(this._user, this._messageHandler.bind(this), options).getHTMLElement(),
                            GProfileDialog.Tabs.Purchase
                        );
                }
                (this._tabs.find(".tab:first-child").trigger("click", [true]),
                    initialTab && (gDesigner.stats("profile-dialog_tab_".concat(initialTab)), this._tabs.find("#".concat(initialTab)).trigger("click", [true])),
                    this._updateUI(this._user));
            }),
            (GProfileDialog.prototype._updateAvatar = function () {
                gDesigner.stats("profile-dialog_click_update-avatar");
                let avatarElement = this._dialog.find(".avatar");
                function t(t) {
                    avatarElement.removeClass("g-loading");
                    let errorMessage = GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.error"));
                    (t && t.message ? (errorMessage = t.message) : t && t.errors && (errorMessage = t.errors.map((entry) => entry[1]).join("<br>")),
                        this._messageHandler(errorMessage));
                }
                gDesigner.getDefaultStorage().openPrompt(
                    [
                        { ext: "png", mime: "image/png" },
                        { ext: "jpg", mime: "image/jpeg" },
                        { ext: "jpeg", mime: "image/jpeg" },
                    ],
                    (file) => {
                        (avatarElement.addClass("g-loading"),
                            file.read((bytes) => {
                                if (bytes.byteLength > 102400)
                                    return void t.call(this, {
                                        message: GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.avatar-size-too-big")),
                                    });
                                let extension = file.getExtension().toLowerCase();
                                "jpg" === extension && (extension = "jpeg");
                                let avatarFile = new File([new Blob([bytes], { type: "image/" + extension })], file.getFullName());
                                (this._messageHandler(void 0),
                                    gDesigner
                                        .getCloudCommunicationManager()
                                        .updateAvatar(avatarFile)
                                        .then((response) => {
                                            (avatarElement.removeClass("g-loading"),
                                                avatarElement.find(".picture").css("background-image", "url(".concat(response.avatar, ")")),
                                                avatarElement.find(".picture").removeClass("g-profile-top-avatar"),
                                                avatarElement.find(".picture").css({ "background-color": "transparent" }),
                                                avatarElement.find(".picture").text(""),
                                                gDesigner.getUser());
                                        })
                                        .catch(t));
                            }));
                    },
                    false
                );
            }),
            (GProfileDialog.prototype._userPropertiesChangedEvent = function (event) {
                this._updateUI(event.user);
            }),
            (GProfileDialog.prototype._updateUI = function (user) {
                this._avatar &&
                    (this._avatar.find(".picture").remove(),
                    user.hasOwnPictureAvatar()
                        ? this._avatar.append($("<div/>").addClass("picture").css("background-image", "url(".concat(user.avatar, ")")))
                        : this._avatar.append(
                              $("<div/>")
                                  .addClass("picture")
                                  .addClass("g-profile-top-avatar")
                                  .css({ "background-color": user.getUserColor() })
                                  .text(user.getUserNameInitials())
                          ));
            }),
            (GProfileDialog.prototype.open = function () {
                (gDesigner.addEventListener(GUserPropertiesChangedEvent, this._userPropertiesChangedEvent, this),
                    this._dialog.gDialog("open", this._options.closeable));
            }),
            (GProfileDialog.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (GProfileDialog.prototype._close = function () {
                gDesigner.removeEventListener(GUserPropertiesChangedEvent, this._userPropertiesChangedEvent, this);
            }),
            (module.exports = GProfileDialog));
    };
