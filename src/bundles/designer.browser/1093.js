module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(3), require(34), require(4), require(13), require(26));
        var designerConfig = require(10),
            GObject = require(1),
            featureFlags = require(10 /* designerConfig */);
        const GContainer = require(85),
            GSystemDialog = require(44),
            GUser = require(177);
        function GLoginDialog(callback) {
            let initialForm = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : GLoginDialog.Forms.SignIn;
            ((this._callback = callback), this._init(initialForm));
        }
        (GObject.GObject.inherit(GLoginDialog, GObject.GObject),
            (GLoginDialog.Forms = {
                SignIn: "sign-in",
                SignUp: "sign-up",
                ResetPassword: "reset-password",
                Thanks: "thanks",
            }),
            (GLoginDialog.prototype._init = async function (initialForm) {
                ((this._dialog = $("<div></div>").gDialog({
                    releaseOnClose: true,
                    className: "g-login-dialog",
                })),
                    (this._container = $("<div></div>").addClass("container").appendTo(this._dialog)),
                    this._buildSignIn(),
                    await this._buildSignUp(),
                    this._buildResetPassword(),
                    this._activatePanel(initialForm));
            }),
            (GLoginDialog.prototype._buildSignIn = function () {
                let panel = $("<div></div>")
                        .addClass("panel " + GLoginDialog.Forms.SignIn)
                        .appendTo(this._container),
                    header = $("<div></div>").addClass("header").appendTo(panel);
                ($("<div></div>").addClass("logo").appendTo(header),
                    $("<div></div>")
                        .addClass("text")
                        .text(
                            GObject.GLocale.get(
                                gDesigner.getStoreVendor()
                                    ? new GObject.GLocaleKey("GLoginDialog", "text.login-dialog-title")
                                    : new GObject.GLocaleKey("GLoginDialog", "text.sign-in")
                            )
                        )
                        .appendTo(header));
                let body = $("<div></div>").addClass("body").appendTo(panel);
                $("<div></div>")
                    .addClass("title")
                    .addClass("simple")
                    .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.sign-in-title"))))
                    .appendTo(body);
                let subtitle = $("<div></div>").addClass("subtitle").appendTo(body);
                gDesigner.getStoreVendor() &&
                    subtitle.append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.not-register")))).append(
                        $("<span></span>")
                            .addClass("link")
                            .addClass("panel")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.sign-up")))
                            .on("click", () => {
                                (gDesigner.stats("login-signup_create-account_open"), this._activatePanel(GLoginDialog.Forms.SignUp));
                            })
                    );
                let messageContainer = $("<div></div>").addClass("message").append($("<span></span>")).appendTo(body);
                const showMessage = this._createMessageHandler(messageContainer);
                let form = $("<form></form>").attr("id", "signin-form").appendTo(body);
                (form.on("submit", (event) => {
                    (gDesigner.stats("login-signup_login_login"), showMessage(""), event.preventDefault());
                    const targetForm = $(event.target),
                        email = targetForm.find('input[data-property="email"]').val(),
                        password = targetForm.find('input[data-property="password"]').val();
                    return (
                        designerConfig.gApi
                            .signin({ email: email, password: password, app: "designer" })
                            .then(() => {
                                designerConfig.gApi
                                    .getUser()
                                    .then((user) => {
                                        (this.close(), this._callback(new GUser(user)));
                                    })
                                    .catch((error) => this._handlerError(error, showMessage));
                            })
                            .catch((error) => this._handlerError(error, showMessage)),
                        false
                    );
                }),
                    featureFlags.HAS_ENTERPRISE
                        ? $("<label>")
                              .addClass("label")
                              .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.placeholder-sign-in-login")))
                              .appendTo(form)
                        : $("<label>")
                              .addClass("label")
                              .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.sign-in-login")))
                              .appendTo(form),
                    $("<input>").attr("type", "text").attr("data-property", "email").attr("required", true).appendTo(form),
                    $("<label>")
                        .addClass("label")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.sign-in-password")))
                        .appendTo(form));
                let passwordInput = this._createPasswordInput(),
                    forgotPasswordLink = $("<span></span>")
                        .addClass("forgot-password")
                        .append(
                            $("<span></span>")
                                .addClass("txt")
                                .addClass("link")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.forgot-password")))
                                .on("click", () => {
                                    (gDesigner.stats("login-signup_login_forgot-password"),
                                        featureFlags.FORGOT_PWD_LINK
                                            ? gContainer.openExternalLink(null, "https://idp.corel.com/idp/accountForgotPwd.jsp")
                                            : this._activatePanel(GLoginDialog.Forms.ResetPassword));
                                })
                        ),
                    signInButton = $("<button></button>")
                        .addClass("sign-in")
                        .attr("type", "submit")
                        .append(
                            $("<span></span>").text(
                                GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", featureFlags.HAS_ENTERPRISE ? "text.sign-in-button" : "text.sign-in"))
                            )
                        )
                        .appendTo(form);
                featureFlags.HAS_ENTERPRISE
                    ? (forgotPasswordLink.appendTo(form), passwordInput.appendTo(form), signInButton.appendTo(form))
                    : (passwordInput.appendTo(form), $("<div>").addClass("login-button-row").append(forgotPasswordLink).append(signInButton).appendTo(form));
                let oauthButtons = $("<div></div>").addClass("oauth-buttons");
                if (featureFlags.HAS_ENTERPRISE) {
                    let enterpriseContainer = $("<div></div>").addClass("enterprise-sign-in").appendTo(body),
                        content = $("<div></div>").addClass("content").appendTo(enterpriseContainer);
                    (content.append(
                        $("<div></div>")
                            .addClass("header")
                            .append(
                                $("<div><div/>")
                                    .addClass("subtitle")
                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.enterprise-sign-in-message")))
                            )
                    ),
                        oauthButtons
                            .append(
                                this._createGoogleButton(new GObject.GLocaleKey("GLoginDialog", "text.enterprise-sign-google")).attr(
                                    "tabindex",
                                    1
                                )
                            )
                            .append(
                                this._createMicrosoftButton(new GObject.GLocaleKey("GLoginDialog", "text.enterprise-sign-microsoft")).attr(
                                    "tabindex",
                                    2
                                )
                            )
                            .appendTo(content),
                        oauthButtons.appendTo(content),
                        $("<div></div>")
                            .addClass("footer")
                            .append(
                                $("<span></span>")
                                    .addClass("message")
                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.enterprise-login-message-1")))
                            )
                            .append(
                                $("<span></span>")
                                    .addClass("message")
                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.enterprise-login-message-2")))
                            )
                            .appendTo(content));
                } else {
                    (gContainer.getRuntime() !== GContainer.Runtime.Chrome &&
                        ($("<div></div>")
                            .addClass("sep")
                            .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.or"))))
                            .appendTo(body),
                        oauthButtons
                            .append(this._createFacebookButton(new GObject.GLocaleKey("GLoginDialog", "text.sign-facebook")).attr("tabindex", 1))
                            .append(this._createGoogleButton(new GObject.GLocaleKey("GLoginDialog", "text.sign-google")).attr("tabindex", 2))
                            .appendTo(body)),
                        gDesigner.getStoreVendor() &&
                            $("<footer></footer>")
                                .append(
                                    $("<span></span>")
                                        .addClass("link")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.continue-without-loggin-in")))
                                        .on("click", () => {
                                            (this.close(), this._callback(null));
                                        })
                                )
                                .appendTo(panel));
                }
                return panel;
            }),
            (GLoginDialog.prototype._createGoogleButton = function (labelKey) {
                return $("<button></button>")
                    .addClass("sign-google oauth column-layout")
                    .append($("<span></span>").addClass("icon").addClass("gravit-icon-google"))
                    .append($("<span></span>").addClass("txt").text(GObject.GLocale.get(labelKey)))
                    .on("click", () => {
                        let statForm = this._getStatMappedForm();
                        (gDesigner.stats("login-signup_".concat(statForm, "_login-google")), this._oauth("google"));
                    });
            }),
            (GLoginDialog.prototype._createFacebookButton = function (labelKey) {
                return $("<button></button>")
                    .addClass("sign-facebook oauth column-layout")
                    .append($("<span></span>").addClass("icon").addClass("gravit-icon-facebook"))
                    .append($("<span></span>").addClass("txt").text(GObject.GLocale.get(labelKey)))
                    .on("click", () => {
                        let statForm = this._getStatMappedForm();
                        (gDesigner.stats("login-signup_".concat(statForm, "_login-facebook")), this._oauth("facebook"));
                    });
            }),
            (GLoginDialog.prototype._createMicrosoftButton = function (labelKey) {
                return $("<button></button>")
                    .addClass("sign-microsoft oauth column-layout")
                    .append($("<span></span>").addClass("icon").addClass("gravit-icon-microsoft"))
                    .append($("<span></span>").addClass("txt").text(GObject.GLocale.get(labelKey)))
                    .on("click", () => {
                        let statForm = this._getStatMappedForm();
                        (gDesigner.stats("login-signup_".concat(statForm, "_login-microsoft")), this._oauth("microsoft"));
                    });
            }),
            (GLoginDialog.prototype._buildSignUp = async function () {
                let panel = $("<div></div>")
                        .addClass("panel " + GLoginDialog.Forms.SignUp)
                        .appendTo(this._container),
                    header = $("<div></div>").addClass("header").appendTo(panel);
                ($("<div></div>").addClass("logo").appendTo(header),
                    $("<div></div>")
                        .addClass("text")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.login-dialog-title")))
                        .appendTo(header));
                let body = $("<div></div>").addClass("body").appendTo(panel);
                ($("<div></div>")
                    .addClass("title")
                    .addClass("simple")
                    .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.sign-up-title"))))
                    .appendTo(body),
                    $("<div></div>")
                        .addClass("subtitle")
                        .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.already-registered"))))
                        .append(
                            $("<span></span>")
                                .addClass("link")
                                .addClass("panel")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.login-here")))
                                .on("click", () => {
                                    (gDesigner.stats("login-signup_create-account_back-to-login"), this._activatePanel(GLoginDialog.Forms.SignIn));
                                })
                        )
                        .appendTo(body));
                let messageContainer = $("<div></div>").addClass("message").append($("<span></span>")).appendTo(body);
                const showMessage = this._createMessageHandler(messageContainer),
                    isElectron = gContainer.getRuntime() === GContainer.Runtime.Electron;
                let form = $("<form></form>").attr("id", "signup-form").appendTo(body);
                const recaptchaEnabled = void 0 !== window.grecaptcha && /^(prod|trunk)/.test("production") && "localhost" !== location.hostname && !isElectron,
                    submitSignUp = async (inputToken) => {
                        const email = form.find('input[data-property="email"]').val(),
                            name = form.find('input[data-property="firstname"]').val() + " " + form.find('input[data-property="lastname"]').val(),
                            password = form.find('input[data-property="password"]').val();
                        var recaptchaToken = inputToken;
                        const newsletter = form.find('input[data-property="newsletter"]').is(":checked");
                        let appUrl, webUrl;
                        if ((isElectron && (recaptchaToken = await gContainer.generateGoogleRecaptchaToken()), gContainer.getRuntime() === GContainer.Runtime.Electron)) {
                            const platform = gContainer.getPlatform();
                            (("darwin" !== platform && "win32" !== platform) || (appUrl = "designer://"), (webUrl = gDesigner.getAssetsURL()));
                        } else webUrl = location.origin;
                        designerConfig.gApi
                            .signup({
                                email: email,
                                name: name,
                                password: password,
                                app: "designer",
                                recaptcha: recaptchaToken,
                                newsletter: newsletter,
                                appUrl: appUrl,
                                webUrl: webUrl,
                            })
                            .then(() => {
                                designerConfig.gApi
                                    .getUser()
                                    .then((user) => {
                                        ((user = new GUser(user)),
                                            this._buildThanksSignup(user),
                                            this._activatePanel(GLoginDialog.Forms.Thanks),
                                            this._callback(user));
                                    })
                                    .catch((error) => this._handlerError(error, showMessage));
                            })
                            .catch((error) => {
                                if (error && error.errors) {
                                    const errorMap = new Map(error.errors);
                                    showMessage(Array.from(errorMap.values()).join("<br>"));
                                } else showMessage(error.message || "");
                                recaptchaEnabled && grecaptcha.reset(this._recaptchaWidget);
                            });
                    };
                (form.on(
                    "submit",
                    (event) => (
                        gDesigner.stats("login-signup_create-account_create-account"),
                        showMessage(""),
                        event.preventDefault(),
                        recaptchaEnabled ? grecaptcha.execute(this._recaptchaWidget) : submitSignUp(),
                        false
                    )
                ),
                    $("<label>")
                        .addClass("label")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.placeholder-sign-up-email")))
                        .appendTo(form),
                    $("<input>")
                        .attr("type", "email")
                        .attr("data-property", "email")
                        .attr("autofocus", true)
                        .attr("required", true)
                        .attr("title", GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.placeholder-sign-up-email")))
                        .appendTo(form));
                let inputGroup = $("<div></div>").addClass("input-group").appendTo(form);
                ($("<span>")
                    .append(
                        $("<label>")
                            .addClass("label")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.placeholder-sign-up-first-name")))
                    )
                    .append(
                        $("<input>")
                            .attr("type", "text")
                            .attr("data-property", "firstname")
                            .attr("required", true)
                            .attr("title", GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.placeholder-sign-up-first-name")))
                    )
                    .appendTo(inputGroup),
                    $("<span>")
                        .append(
                            $("<label>")
                                .addClass("label")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.placeholder-sign-up-last-name")))
                        )
                        .append(
                            $("<input>")
                                .attr("type", "text")
                                .attr("data-property", "lastname")
                                .attr("required", true)
                                .attr("title", GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.placeholder-sign-up-last-name")))
                        )
                        .appendTo(inputGroup),
                    $("<label>")
                        .addClass("label")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.placeholder-sign-up-password")))
                        .appendTo(form),
                    this._createPasswordInput().appendTo(form),
                    $("<label></label>")
                        .append(
                            $("<input>")
                                .attr("type", "checkbox")
                                .on("change", (event) => {
                                    let checked = $(event.target).is(":checked");
                                    (gDesigner.stats("login-signup_create-account_i-agree", checked),
                                        form.find('button[type="submit"]').prop("disabled", !checked).toggleClass("g-disabled", !checked));
                                })
                        )
                        .append(
                            $("<div></div>")
                                .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.agree"))))
                                .append(
                                    $("<span></span>")
                                        .addClass("link")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.terms-use")))
                                        .on(
                                            "click",
                                            (event) => (
                                                gDesigner.stats("login-signup_create-account_terms-of-use"),
                                                gContainer.openExternalLink(event, "https://www.corel.com/en/terms-of-use"),
                                                false
                                            )
                                        )
                                )
                                .append($("<span></span>").text("&"))
                                .append(
                                    $("<span></span>")
                                        .addClass("link")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.privacy-policy")))
                                        .on(
                                            "click",
                                            (event) => (
                                                gDesigner.stats("login-signup_create-account_privacy-policy"),
                                                gContainer.openExternalLink(event, "https://www.corel.com/en/corel-privacy-policy"),
                                                false
                                            )
                                        )
                                )
                        )
                        .appendTo(form),
                    $("<label></label>")
                        .append($("<input>").attr("type", "checkbox").attr("data-property", "newsletter").prop("checked", false))
                        .on("change", (event) => {
                            gDesigner.stats("login-signup_create-account_subscribe", $(event.target).is(":checked"));
                        })
                        .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.newsletter"))))
                        .appendTo(form));
                let recaptchaSiteKey = await designerConfig.gApi.recaptchaKey();
                if (recaptchaEnabled) {
                    let recaptchaContainer = $(grecaptchaWidget);
                    this._recaptchaWidget = grecaptcha.render(recaptchaContainer[0], {
                        sitekey: recaptchaSiteKey,
                        callback: submitSignUp,
                        size: "invisible",
                    });
                }
                ($("<button></button>")
                    .attr("type", "submit")
                    .addClass("sign-in")
                    .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.sign-up-now"))))
                    .addClass("g-disabled")
                    .prop("disabled", true)
                    .appendTo(form),
                    gContainer.getRuntime() !== GContainer.Runtime.Chrome &&
                        ($("<div></div>")
                            .addClass("sep")
                            .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.or"))))
                            .appendTo(body),
                        $("<div></div>")
                            .addClass("oauth-buttons")
                            .append(this._createFacebookButton(new GObject.GLocaleKey("GLoginDialog", "text.sign-facebook")))
                            .append(this._createGoogleButton(new GObject.GLocaleKey("GLoginDialog", "text.sign-google")))
                            .appendTo(body)));
                let continueLink = $("<span></span>").addClass("link");
                return (
                    gDesigner.getStoreVendor() &&
                        continueLink.text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.continue-without-loggin-in"))).on("click", () => {
                            (this.close(), this._callback(null));
                        }),
                    $("<footer></footer>").append(continueLink).append(continueLink).appendTo(panel),
                    panel
                );
            }),
            (GLoginDialog.prototype._buildResetPassword = function () {
                let panel = $("<div></div>")
                        .addClass("panel " + GLoginDialog.Forms.ResetPassword)
                        .appendTo(this._container),
                    header = $("<div></div>").addClass("header").appendTo(panel);
                ($("<div></div>").addClass("logo").appendTo(header),
                    $("<div></div>")
                        .addClass("text")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.reset-password-header-title")))
                        .appendTo(header));
                let body = $("<div></div>").addClass("body").appendTo(panel);
                $("<div></div>")
                    .addClass("title")
                    .addClass("simple")
                    .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.reset-password-title"))))
                    .appendTo(body);
                let messageContainer = $("<div></div>").addClass("message").append($("<span></span>")).appendTo(body);
                const showMessage = this._createMessageHandler(messageContainer);
                let form = $("<form></form>").attr("id", "reset-password-form").appendTo(body);
                return (
                    form.on("submit", (event) => {
                        (gDesigner.stats("login-signup_forgot-password_send-request"), showMessage(""), event.preventDefault());
                        const email = form.find('input[data-property="email"]').val(),
                            redirectUrl = location.href;
                        let appUrl, webUrl;
                        if (gContainer.getRuntime() === GContainer.Runtime.Electron) {
                            const platform = gContainer.getPlatform();
                            (("darwin" !== platform && "win32" !== platform) || (appUrl = "designer://"), (webUrl = gDesigner.getAssetsURL()));
                        } else webUrl = location.origin;
                        return (
                            designerConfig.gApi
                                .resetPassword({ email: email, redirect: redirectUrl, appUrl: appUrl, webUrl: webUrl })
                                .then((response) => {
                                    showMessage(response && response.message, "info");
                                })
                                .catch((error) => this._handlerError(error, showMessage)),
                            false
                        );
                    }),
                    $("<label>")
                        .addClass("label")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.sign-in-login")))
                        .appendTo(form),
                    $("<input>")
                        .attr("type", "email")
                        .attr("data-property", "email")
                        .attr("autofocus", true)
                        .attr("required", true)
                        .attr("title", GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.placeholder-reset-password-email")))
                        .appendTo(form),
                    $("<div>")
                        .addClass("login-button-row")
                        .append(
                            $("<span></span>")
                                .addClass("link")
                                .text("‹ " + GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.back-sign-in")))
                                .on("click", () => {
                                    (gDesigner.stats("login-signup_forgot-password_back-to-login"), this._activatePanel(GLoginDialog.Forms.SignIn));
                                })
                        )
                        .append(
                            $("<button></button>")
                                .attr("type", "submit")
                                .append(
                                    $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.reset-password-send")))
                                )
                        )
                        .appendTo(form),
                    panel
                );
            }),
            (GLoginDialog.prototype._buildThanksSignup = function (user) {
                let panel = $("<div></div>")
                        .addClass("panel " + GLoginDialog.Forms.Thanks)
                        .appendTo(this._container),
                    header = $("<div></div>").addClass("header").appendTo(panel);
                ($("<div></div>").addClass("logo").appendTo(header),
                    $("<div></div>")
                        .addClass("text")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.login-dialog-title")))
                        .appendTo(header));
                let body = $("<div></div>").addClass("body").appendTo(panel);
                return (
                    $("<div></div>")
                        .addClass("title")
                        .append(
                            $("<span></span>").html(
                                GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.sign-up-thanks")).replace("%email", user.getEmail())
                            )
                        )
                        .appendTo(body),
                    $("<button></button>")
                        .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.ok"))))
                        .on("click", this.close.bind(this))
                        .appendTo(body),
                    panel
                );
            }),
            (GLoginDialog.prototype._createMessageHandler = function (messageContainer) {
                return function (message) {
                    let type = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "error";
                    (messageContainer.removeClass("error info show"), message && messageContainer.addClass("show").addClass(type).find("span").text(message));
                };
            }),
            (GLoginDialog.prototype._activatePanel = function (panelName) {
                ((this._activePanel = panelName),
                    this._container.find(".panel.g-active").removeClass("g-active"),
                    this._container.find(".panel." + panelName).addClass("g-active"));
            }),
            (GLoginDialog.prototype._oauth = function (provider, showMessage) {
                designerConfig.gApi
                    .popup("/auth/" + provider)
                    .then((result) => {
                        (this.close(), this._callback(result));
                    })
                    .catch((error) => this._handlerError(error, showMessage));
            }),
            (GLoginDialog.prototype._handlerError = function (error, showMessage) {
                showMessage((error && error.message) || (error && error.errors.toString()) || "");
            }),
            (GLoginDialog.prototype._createPasswordInput = function () {
                let container = $("<div></div>").addClass("input-field"),
                    passwordField = $("<input>").attr("type", "password").attr("required", true).attr("data-property", "password").appendTo(container);
                return (
                    $("<span></span>")
                        .addClass("icon")
                        .addClass("gravit-icon-hide")
                        .on("click", (event) => {
                            $(event.target).closest("span").toggleClass("gravit-icon-display gravit-icon-hide").hasClass("gravit-icon-hide")
                                ? passwordField.attr("type", "password")
                                : passwordField.attr("type", "text");
                        })
                        .appendTo(container),
                    container
                );
            }),
            (GLoginDialog.prototype._getStatMappedForm = function () {
                let statForm = null;
                switch (this._activePanel) {
                    case GLoginDialog.Forms.SignIn:
                        statForm = "login";
                        break;
                    case GLoginDialog.Forms.SignUp:
                        statForm = "create-account";
                        break;
                    case GLoginDialog.Forms.ResetPassword:
                        statForm = "forgot-password";
                        break;
                    case GLoginDialog.Forms.Thanks:
                        statForm = "account-created";
                        break;
                    default:
                        statForm = "login";
                }
                return statForm;
            }),
            (GLoginDialog.prototype.open = function () {
                gDesigner.isOfflineAsync().then((isOffline) => {
                    isOffline ? GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GLoginDialog", "text.you-are-offline"))) : this._dialog.gDialog("open", false);
                });
            }),
            (GLoginDialog.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (module.exports = GLoginDialog));
    };
