module.exports = function (module, exports, require) {
        "use strict";
        (require(58), require(8 /* Symbol */), require(71), require(4), require(13), require(38));
        var GObject = require(1);
        const GPurchasePanel = require(1507),
            GAccountPanel = require(1508),
            GChangePasswordPanel = require(1509),
            s = (require(1158), require(805)),
            { gApi } = (require(177), require(10 /* designerConfig */));
        function c(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            ((this._user = e), (this._options = n), this._init(t, n));
        }
        (GObject.GObject.inherit(c, GObject.GObject),
            (c.prototype._options = null),
            (c.prototype._avatar = null),
            (c.Tabs = {
                Account: "account",
                Purchase: "purchase",
                ChangePassword: "change-password",
            }),
            (c.prototype._init = async function (e) {
                var t = this;
                let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const { closeable: s = true, tabs } = n;
                gDesigner.getLicense();
                ((this._dialog = $("<div></div>").gDialog({
                    closeCallback: () => this._close(),
                    releaseOnClose: true,
                    className: "g-profile-dialog",
                })),
                    s &&
                        $("<div></div>")
                            .addClass("g-btn-close")
                            .append($("<span></span>").addClass("gravit-icon-close"))
                            .on("click", this.close.bind(this))
                            .appendTo(this._dialog));
                let u = $("<div></div>").addClass("left-sidebar").appendTo(this._dialog),
                    p = $("<div></div>").addClass("right-sidebar").appendTo(this._dialog);
                ((this._avatar = $("<div></div>")
                    .addClass("avatar")
                    .append(
                        $("<span></span>")
                            .addClass("btn gravit-icon-avatar")
                            .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.avatar-tooltip")))
                            .on("click", this._updateAvatar.bind(this))
                    )),
                    $("<div></div>").addClass("picture").append(this._avatar).appendTo(u));
                let g = $("<div></div>")
                    .addClass("header")
                    .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.details"))))
                    .appendTo(p);
                ((this._messageHandler = function (e) {
                    let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "error";
                    (t._dialog.find(".message").remove(),
                        e &&
                            $("<div></div>")
                                .addClass("message " + n)
                                .append($("<span></span>").html(e))
                                .on("click", (e) => $(e.target).closest(".message").remove())
                                .insertAfter(g));
                }),
                    (this._tabs = $("<ul></ul>").addClass("tabs").appendTo(u)),
                    (this._panels = $("<div></div>").addClass("tab-panels").appendTo(p)));
                const h = (e, n, o, i) => {
                        let a = $("<div></div>").addClass("tab-panel").append(o).appendTo(this._panels);
                        $("<li></li>")
                            .attr("id", i)
                            .addClass("tab")
                            .append($("<span></span>").addClass(n))
                            .append($("<span></span>").text(e))
                            .on("click", function (n) {
                                let o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                    i = $(n.target).closest(".tab");
                                (o || t._messageHandler(void 0),
                                    t._tabs.find(".tab.g-selected").removeClass("g-selected"),
                                    t._panels.find(".tab-panel.g-selected").removeClass("g-selected"),
                                    a.addClass("g-selected"),
                                    i.addClass("g-selected"),
                                    g.find("span").text(e),
                                    gDesigner.stats("profile-dialog_tab_".concat(i.attr("id"))));
                            })
                            .appendTo(this._tabs);
                    },
                    f = function (e) {
                        let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                        return tabs && tabs.length ? tabs.includes(e) : t;
                    };
                if (
                    (f(c.Tabs.Account) &&
                        h(
                            GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.details")),
                            "gravit-icon-account",
                            new GAccountPanel(this._user, this._messageHandler.bind(this), this, n).getHTMLElement(),
                            c.Tabs.Account
                        ),
                    f(c.Tabs.ChangePassword, false) &&
                        h(
                            GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.change-password")),
                            "gravit-icon-change-password",
                            new GChangePasswordPanel(this._user, this._messageHandler.bind(this), this, n).getHTMLElement(),
                            c.Tabs.ChangePassword
                        ),
                    f(c.Tabs.Purchase))
                ) {
                    (await gApi.hasPurchases({ issued: "true" }).catch(() => false)) &&
                        h(
                            GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.purchases")),
                            "gravit-icon-purchase",
                            new GPurchasePanel(this._user, this._messageHandler.bind(this), n).getHTMLElement(),
                            c.Tabs.Purchase
                        );
                }
                (this._tabs.find(".tab:first-child").trigger("click", [true]),
                    e && (gDesigner.stats("profile-dialog_tab_".concat(e)), this._tabs.find("#".concat(e)).trigger("click", [true])),
                    this._updateUI(this._user));
            }),
            (c.prototype._updateAvatar = function () {
                gDesigner.stats("profile-dialog_click_update-avatar");
                let e = this._dialog.find(".avatar");
                function t(t) {
                    e.removeClass("g-loading");
                    let n = GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.error"));
                    (t && t.message ? (n = t.message) : t && t.errors && (n = t.errors.map((e) => e[1]).join("<br>")),
                        this._messageHandler(n));
                }
                gDesigner.getDefaultStorage().openPrompt(
                    [
                        { ext: "png", mime: "image/png" },
                        { ext: "jpg", mime: "image/jpeg" },
                        { ext: "jpeg", mime: "image/jpeg" },
                    ],
                    (n) => {
                        (e.addClass("g-loading"),
                            n.read((i) => {
                                if (i.byteLength > 102400)
                                    return void t.call(this, {
                                        message: GObject.GLocale.get(new GObject.GLocaleKey("GProfileDialog", "text.avatar-size-too-big")),
                                    });
                                let a = n.getExtension().toLowerCase();
                                "jpg" === a && (a = "jpeg");
                                let r = new File([new Blob([i], { type: "image/" + a })], n.getFullName());
                                (this._messageHandler(void 0),
                                    gDesigner
                                        .getCloudCommunicationManager()
                                        .updateAvatar(r)
                                        .then((t) => {
                                            (e.removeClass("g-loading"),
                                                e.find(".picture").css("background-image", "url(".concat(t.avatar, ")")),
                                                e.find(".picture").removeClass("g-profile-top-avatar"),
                                                e.find(".picture").css({ "background-color": "transparent" }),
                                                e.find(".picture").text(""),
                                                gDesigner.getUser());
                                        })
                                        .catch(t));
                            }));
                    },
                    false
                );
            }),
            (c.prototype._userPropertiesChangedEvent = function (e) {
                this._updateUI(e.user);
            }),
            (c.prototype._updateUI = function (e) {
                this._avatar &&
                    (this._avatar.find(".picture").remove(),
                    e.hasOwnPictureAvatar()
                        ? this._avatar.append($("<div/>").addClass("picture").css("background-image", "url(".concat(e.avatar, ")")))
                        : this._avatar.append(
                              $("<div/>")
                                  .addClass("picture")
                                  .addClass("g-profile-top-avatar")
                                  .css({ "background-color": e.getUserColor() })
                                  .text(e.getUserNameInitials())
                          ));
            }),
            (c.prototype.open = function () {
                (gDesigner.addEventListener(s, this._userPropertiesChangedEvent, this),
                    this._dialog.gDialog("open", this._options.closeable));
            }),
            (c.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (c.prototype._close = function () {
                gDesigner.removeEventListener(s, this._userPropertiesChangedEvent, this);
            }),
            (module.exports = c));
    };
