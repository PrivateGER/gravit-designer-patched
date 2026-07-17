module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34), require(91 /* polyfill:String */), require(4), require(13));
        var designerConfig = require(10),
            GObject = require(1);
        function GChangePasswordPanel(user, messageHandler, parent) {
            let options = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            ((this._user = user), (this._messageHandler = messageHandler), (this._parent = parent), (this._options = options));
            const createField = function (label, property, inputElement) {
                    let tip = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
                    return $("<div></div>")
                        .addClass("input-field")
                        .attr("data-property", property)
                        .append($("<span></span>").append($("<label></label>").text(label)).append($("<label></label>").text(tip)))
                        .append(inputElement);
                },
                createPasswordField = (label, value, property, type, placeholder, tip) => {
                    let field = createField(
                        label,
                        property,
                        $("<input>")
                            .attr("type", type || "text")
                            .attr("placeholder", placeholder || "")
                            .val(value || ""),
                        tip
                    );
                    return (
                        "password" === type &&
                            field.append(
                                $("<span></span>")
                                    .addClass("gravit-icon-hide btn-display")
                                    .on("click", (event) => {
                                        let toggleButton = $(event.target).closest(".btn-display").toggleClass("gravit-icon-hide gravit-icon-display"),
                                            visible = !toggleButton.data("visible");
                                        (toggleButton.data("visible", visible), field.find("input").attr("type", visible ? "text" : "password"));
                                    })
                            ),
                        field
                    );
                };
            this._container = $("<div></div>").addClass("g-change-password-panel");
            const {
                changePasswordOptions: {
                    autoClose,
                    title: title = GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.change-password")),
                    info: info = GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.reset-password-info")),
                } = {},
            } = options;
            let section = $("<div></div>")
                .addClass("section")
                .append(
                    $("<div></div>")
                        .addClass("header")
                        .append($("<span></span>").text(title.replace("%name", user.email)))
                )
                .appendTo(this._container);
            ($("<footer></footer>")
                .append(
                    $("<button></button>")
                        .addClass("highlight")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.assign")))
                        .on("click", () => {
                            const { token } = this._options,
                                newPassword = this._container.find('[data-property="new_password"] > input').val().trim(),
                                confirmPassword = this._container.find('[data-property="confirm_password"] > input').val().trim();
                            (gDesigner.stats("profile-dialog_change-password-panel_change-password"),
                                designerConfig.gApi
                                    .updatePassword({ password: newPassword, confirm_password: confirmPassword }, token)
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
                                    .catch((error) => this._messageHandler(designerConfig.gApi.formatError(error))));
                        })
                )
                .appendTo(this._container),
                createPasswordField(
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.new-password")),
                    "",
                    "new_password",
                    "password",
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.placeholder-new-password")),
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.new-password-tip"))
                        .replace("%min-number", designerConfig.PasswordRules.PasswordLength.Minimum)
                        .replace("%max-number", designerConfig.PasswordRules.PasswordLength.Maximum)
                ).appendTo(section),
                createPasswordField(
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.confirm-password")),
                    "",
                    "confirm_password",
                    "password",
                    GObject.GLocale.get(new GObject.GLocaleKey("GChangePasswordPanel", "text.placeholder-confirm-password"))
                ).appendTo(section),
                this._messageHandler(info, "important"));
        }
        (GObject.GObject.inherit(GChangePasswordPanel, GObject.GObject),
            (GChangePasswordPanel.prototype.getHTMLElement = function () {
                return this._container;
            }),
            (GChangePasswordPanel.prototype._toggleLoading = function (loading) {
                loading ? this._container.addClass("g-loading") : this._container.removeClass("g-loading");
            }),
            (GChangePasswordPanel.prototype.toString = function () {
                return "[Object GChangePasswordPanel]";
            }),
            (module.exports = GChangePasswordPanel));
    };
