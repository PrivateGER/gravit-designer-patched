module.exports = function (module, exports, require) {
        "use strict";
        (require(20), require(3), require(34), require(91), require(4), require(13));
        var designerConfig = require(10),
            GObject = require(1);
        function a(e, t, n) {
            let a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            ((this._user = e), (this._messageHandler = t), (this._parent = n), (this._options = a));
            const r = function (e, t, n) {
                    let o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
                    return $("<div></div>")
                        .addClass("input-field")
                        .attr("data-property", t)
                        .append($("<span></span>").append($("<label></label>").text(e)).append($("<label></label>").text(o)))
                        .append(n);
                },
                s = (e, t, n, o, i, a) => {
                    let s = r(
                        e,
                        n,
                        $("<input>")
                            .attr("type", o || "text")
                            .attr("placeholder", i || "")
                            .val(t || ""),
                        a
                    );
                    return (
                        "password" === o &&
                            s.append(
                                $("<span></span>")
                                    .addClass("gravit-icon-hide btn-display")
                                    .on("click", (e) => {
                                        let t = $(e.target).closest(".btn-display").toggleClass("gravit-icon-hide gravit-icon-display"),
                                            n = !t.data("visible");
                                        (t.data("visible", n), s.find("input").attr("type", n ? "text" : "password"));
                                    })
                            ),
                        s
                    );
                };
            this._container = $("<div></div>").addClass("g-change-password-panel");
            const {
                changePasswordOptions: {
                    autoClose,
                    title: c = GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.change-password")),
                    info: d = GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.reset-password-info")),
                } = {},
            } = a;
            let u = $("<div></div>")
                .addClass("section")
                .append(
                    $("<div></div>")
                        .addClass("header")
                        .append($("<span></span>").text(c.replace("%name", e.email)))
                )
                .appendTo(this._container);
            ($("<footer></footer>")
                .append(
                    $("<button></button>")
                        .addClass("highlight")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.assign")))
                        .on("click", () => {
                            const { token } = this._options,
                                t = this._container.find('[data-property="new_password"] > input').val().trim(),
                                n = this._container.find('[data-property="confirm_password"] > input').val().trim();
                            (gDesigner.stats("profile-dialog_change-password-panel_change-password"),
                                designerConfig.gApi
                                    .updatePassword({ password: t, confirm_password: n }, token)
                                    .then(() =>
                                        this._messageHandler(
                                            GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.reset-password-done")),
                                            "success"
                                        )
                                    )
                                    .then(() => this._toggleLoading(false))
                                    .then(() => {
                                        autoClose && this._parent.close();
                                    })
                                    .catch((e) => this._messageHandler(designerConfig.gApi.formatError(e))));
                        })
                )
                .appendTo(this._container),
                s(
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.new-password")),
                    "",
                    "new_password",
                    "password",
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.placeholder-new-password")),
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.new-password-tip"))
                        .replace("%min-number", designerConfig.PasswordRules.PasswordLength.Minimum)
                        .replace("%max-number", designerConfig.PasswordRules.PasswordLength.Maximum)
                ).appendTo(u),
                s(
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.confirm-password")),
                    "",
                    "confirm_password",
                    "password",
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.placeholder-confirm-password"))
                ).appendTo(u),
                this._messageHandler(d, "important"));
        }
        (GObject.GObject.inherit(a, GObject.GObject),
            (a.prototype.getHTMLElement = function () {
                return this._container;
            }),
            (a.prototype._toggleLoading = function (e) {
                e ? this._container.addClass("g-loading") : this._container.removeClass("g-loading");
            }),
            (a.prototype.toString = function () {
                return "[Object GChangePasswordPanel]";
            }),
            (module.exports = a));
    };
