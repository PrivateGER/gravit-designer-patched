module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(20 /* polyfill:RegExp */), require(3), require(34), require(91 /* polyfill:String */), require(4), require(13), require(38));
        var designerConfig = require(10),
            GObject = require(1);
        const { bypassEmailVerification } = designerConfig.defaultUserSettings,
            GSystemDialog = require(44),
            parseResponse = function (response) {
                return response.json().then(function (body) {
                    return Promise[response.status >= 400 ? "reject" : "resolve"](body);
                });
            };
        function GAccountPanel(user, messageHandler, parent) {
            let options = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            ((this._user = user), (this._messageHandler = messageHandler), (this._parent = parent), (this._options = options), this._init());
        }
        (GObject.GObject.inherit(GAccountPanel, GObject.GObject),
            (GAccountPanel.prototype._openAccountDeletionConfirmationDialog = function () {
                let titleHtml = "<span>"
                    .concat(
                        GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.delete-account-title")),
                        '</span>\n    <mark style="min-width: 100px;\n        background: #F23C3C;\n        border-radius: 3px;\n        padding: 3px 30px;\n        color: white;\n        margin-top: 2px;\n        margin-bottom: 2px;\n        display: block;\n        text-align: center;">\n        '
                    )
                    .concat(
                        GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.delete-account-sub-title")),
                        '\n    </mark>\n    <ul style="list-style-type: disc; transform: translateX(30px); margin-bottom: 10px;">\n        <li>'
                    )
                    .concat(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.delete-account-list-1")), "</li>\n        <li>")
                    .concat(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.delete-account-list-2")), "</li>\n        <li>")
                    .concat(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.delete-account-list-3")), "</li>\n    </ul>\n    <span>")
                    .concat(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.delete-account-action-cant-undone")), "</span>");
                GSystemDialog.custom({
                    title: titleHtml,
                    styles: { buttons: { "justify-content": "flex-end" } },
                    buttons: [
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")),
                            closeOnClick: true,
                        },
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")),
                            highlighted: true,
                            onclick: (event) => {
                                (event.gDialog("close"), this._deleteAccount());
                            },
                        },
                    ],
                });
            }),
            (GAccountPanel.prototype._deleteAccount = function () {
                return (
                    this._toggleLoading(true),
                    fetch(designerConfig.gApi.url + "/user/" + this._user.id, {
                        method: "DELETE",
                        credentials: "include",
                        headers: { "Content-Type": "application/json", Accept: "json" },
                    })
                        .then(parseResponse)
                        .then(() => {
                            (this._parent.close(), gDesigner.stats("profile-dialog_account-panel_delete"), gDesigner.signout(true));
                        })
                        .catch((error) => {
                            this._messageHandler((error && error.message) || (error && error.errors.toString()) || "");
                        })
                        .finally(() => {
                            this._toggleLoading(false);
                        })
                );
            }),
            (GAccountPanel.prototype._getFooter = function () {
                const footer = $("<footer></footer>").append(
                    $("<div></div>")
                        .addClass("buttons")
                        .append(
                            $("<button></button>")
                                .addClass("highlight")
                                .attr("type", "submit")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.save")))
                        )
                        .append(
                            $("<button></button>")
                                .attr("type", "button")
                                .attr("data-property", "delete-account")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.delete")))
                                .on("click", (event) => (event.preventDefault(), this._openAccountDeletionConfirmationDialog(), false))
                        )
                );
                return (
                    designerConfig.gApi.hasPurchases({ issued: true }).then((hasPurchases) => {
                        (hasPurchases &&
                            $("<div/>")
                                .addClass("info")
                                .append(
                                    $(
                                        "<span>"
                                            .concat(
                                                GObject.GLocale.get(
                                                    new GObject.GLocaleKey("GAccountPanel", "text.contact-partner-billing-alternative")
                                                ),
                                                "</span>"
                                            )
                                            .replace(
                                                "%partner%",
                                                $("<a/>")
                                                    .addClass("cb-link")
                                                    .text(
                                                        GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GAccountPanel", "text.contact-partner-cleverbridge")
                                                        )
                                                    )
                                                    .prop("outerHTML")
                                            )
                                    )
                                )
                                .appendTo(footer),
                            this._container.find(".cb-link").on("click", (event) => {
                                (gDesigner.stats("profile-dialog_account-panel_cleverbridge-link"),
                                    gContainer.openExternalLink(event, designerConfig.LINKS.CLEVERBRIDGE_SUPPORT_URL));
                            }));
                    }),
                    footer
                );
            }),
            (GAccountPanel.prototype._init = function () {
                this._container = $("<div></div>").addClass("g-account-panel");
                const form = $("<form></form>")
                        .appendTo(this._container)
                        .on(
                            "submit",
                            (event) => (event.preventDefault(), gDesigner.stats("profile-dialog_account-panel_save"), this._updateUser(), false)
                        ),
                    section = $("<div></div>")
                        .addClass("section")
                        .append(
                            $("<div></div>")
                                .addClass("header")
                                .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.contact"))))
                        )
                        .appendTo(form),
                    footer = this._getFooter();
                footer && footer.appendTo(form);
                const createField = (label, value, property, type, placeholder) => {
                        const input = $("<input>")
                                .attr("type", type || "text")
                                .attr("placeholder", placeholder || "")
                                .attr("value", value || ""),
                            field = wrapField(label, property, input);
                        return (
                            "password" === type &&
                                field.append(
                                    $("<span></span>")
                                        .addClass("gravit-icon-hide btn-display")
                                        .on("click", (event) => {
                                            const toggleButton = $(event.target)
                                                    .closest(".btn-display")
                                                    .toggleClass("gravit-icon-hide gravit-icon-display"),
                                                visible = !toggleButton.data("visible");
                                            (toggleButton.data("visible", visible), field.find("input").attr("type", visible ? "text" : "password"));
                                        })
                                ),
                            field
                        );
                    },
                    wrapField = (label, property, content) =>
                        $("<div></div>").addClass("input-field").attr("data-property", property).append($("<label></label>").text(label)).append(content);
                let firstName = this._user.getFirstName(),
                    lastName = this._user.getLastName();
                if (!lastName) {
                    let { first, last } = ((fullName) => {
                        let parts = (fullName || "").split(" "),
                            firstPart = parts.slice(0, parts.length - 1).join(" "),
                            lastPart = parts.slice(-1).join("");
                        return (firstPart.trim().length || ((firstPart = lastPart), (lastPart = "")), { first: firstPart, last: lastPart });
                    })(firstName);
                    ((firstName = first), (lastName = last || ""));
                }
                let groupSection = $("<div></div>").addClass("group-section").appendTo(section);
                (createField(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.first-name")), firstName, "name")
                    .appendTo(groupSection)
                    .find("input")
                    .attr("required", true),
                    createField(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.last-name")), lastName, "last_name")
                        .appendTo(groupSection)
                        .find("input")
                        .attr("required", true),
                    createField(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.email")), this._user.getEmail(), "email").appendTo(section),
                    createField(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.old-password")), "", "old_password", "password").appendTo(section),
                    createField(
                        GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.new-password")),
                        "",
                        "new_password",
                        "password",
                        GObject.GLocale.get(new GObject.GLocaleKey("GPurchasePanel", "text.placeholder-password"))
                            .replace("%min-number", designerConfig.PasswordRules.PasswordLength.Minimum)
                            .replace("%max-number", designerConfig.PasswordRules.PasswordLength.Maximum)
                    ).appendTo(section));
            }),
            (GAccountPanel.prototype._updateUser = async function () {
                this._toggleLoading(true);
                const handleError = (handleError) => {
                    let errorMessage = GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.error"));
                    (handleError && handleError.message ? (errorMessage = handleError.message) : handleError && handleError.errors && (errorMessage = handleError.errors.map((entry) => entry[1]).join("<br>")),
                        this._messageHandler(errorMessage),
                        this._toggleLoading(false));
                };
                let payload = { webUrl: gDesigner.getWebURL() },
                    self = this;
                (this._container.find(".input-field > input").each(function () {
                    let input = $(this),
                        property = input.closest(".input-field").attr("data-property");
                    (("login" !== property && "email" !== property) || self._user[property] !== input.val().trim()) && (payload[property] = input.val());
                }),
                    this._container.find(".input-field > select").each(function () {
                        let select = $(this),
                            property = select.closest(".input-field").attr("data-property"),
                            value = select.find("option:selected").attr("value");
                        payload[property] = value;
                    }),
                    this._messageHandler(void 0));
                try {
                    await gDesigner
                        .getCloudCommunicationManager()
                        .updateUser(payload)
                        .then(() => this._messageHandler(GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.success")), "success"))
                        .then(() => {
                            payload.email &&
                                this._user.getEmail() !== payload.email &&
                                !bypassEmailVerification &&
                                GSystemDialog.alert(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GAccountPanel", "text.user-email-message")).replace("%email", payload.email)
                                );
                        })
                        .then(async () => (this._user = await gDesigner.getUser()))
                        .catch(handleError);
                } finally {
                    this._toggleLoading(false);
                }
            }),
            (GAccountPanel.prototype.getHTMLElement = function () {
                return this._container;
            }),
            (GAccountPanel.prototype._toggleLoading = function (loading) {
                loading ? this._container.addClass("g-loading") : this._container.removeClass("g-loading");
            }),
            (module.exports = GAccountPanel));
    };
