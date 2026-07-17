module.exports = function (module, exports, require) {
            "use strict";
            (require(58 /* polyfill:Array */),
                require(19),
                require(30 /* polyfill:Object */),
                require(57),
                require(8 /* Symbol */),
                require(20 /* polyfill:RegExp */),
                require(527),
                require(107 /* polyfill:RegExp */),
                require(71 /* polyfill:String */),
                require(151),
                require(34),
                require(91 /* polyfill:String */),
                require(4),
                require(41),
                require(13),
                require(26),
                require(125),
                require(126 /* polyfill:URL */),
                require(114));
            const i18n = require(170),
                LocKey = require(325),
                $ = require(171),
                trackEvent = require(375),
                campaignUtils = (require(373), require(354)),
                Runtimes = require(582),
                { PasswordLength } = require(581),
                Recaptcha = require(978),
                { Events } = (require(584), require(431)),
                { learnmore } = require(253),
                GCloudUiOfflineDialog = require(980),
                { PRIVACY_URL, SUPPORT_URL, IMPORT_EXPORT_DOCUMENTATION, VECTOR_PRODUCT_PAGE, CORELDRAW_PAGE } = require(374 /* SUPPORT_URL */),
                { getSupportUrl, getSubscriptionUrl, getUrlWithQueryParams } = require(254),
                xmasCouponRegex = (require(430), /xmas/),
                handleSpaceKeydown = (event) => {
                    32 === (event.which || event.keyCode) && (event.preventDefault(), $(event.target).click());
                },
                safeDecodeURIComponent = (value) => {
                    try {
                        return decodeURIComponent(value);
                    } catch (error) {
                        console.warn(error);
                    }
                    return value;
                },
                isSafari =
                    (navigator.vendor && /apple/i.test(navigator.vendor)) ||
                    !!window.safari ||
                    (-1 != navigator.userAgent.indexOf("safari") &&
                        !(-1 != navigator.userAgent.indexOf("chrome") && -1 != navigator.userAgent.indexOf("version/")));
            $(document).on("keydown", (event) => {
                if (9 === (event.which || event.keyCode)) {
                    const focusedElement = $(":focus"),
                        focusableElements = $(document.body).find("a, button, :input, [tabindex]").filter(":visible:not(:disabled)");
                    if (isSafari) {
                        event.preventDefault();
                        let focusedIndex = 0;
                        (focusableElements.each(function (e) {
                            if ($(this).closest(focusedElement)[0]) return ((focusedIndex = ++e), false);
                        }),
                            focusedIndex >= focusableElements.length && (focusedIndex = 0),
                            focusableElements.eq(focusedIndex).focus());
                    } else (focusedElement[0] && !focusableElements.last().closest(focusedElement)[0]) || (event.preventDefault(), focusableElements.first().focus());
                }
            });
            const buildPasswordField = () => {
                let field = $("<div></div>").addClass("input-field"),
                    passwordInput = $("<input>").attr("type", "password").attr("required", true).attr("data-property", "password").appendTo(field);
                return (
                    $("<span></span>")
                        .addClass("g-cloud-icon-hide")
                        .on("click", (event) => {
                            $(event.target).closest("span").toggleClass("g-cloud-icon-display g-cloud-icon-hide").hasClass("g-cloud-icon-hide")
                                ? passwordInput.attr("type", "password")
                                : passwordInput.attr("type", "text");
                        })
                        .appendTo(field),
                    field
                );
            };

            function GCloudUiLoginDialog(config) {
                let { impl, gApi, anonymous, version, runtime, options: configOptions = {}, flow, query: query = {} } = config;
                ((this._impl = impl),
                    (this._gApi = gApi),
                    (this._anonymous = !!anonymous),
                    (this._version = version),
                    (this._runtimeCode = runtime),
                    (this._options = configOptions),
                    (this._closeable = true),
                    (this._flow = flow),
                    (this._query = query),
                    i18n.setLanguage(this._impl.getLanguage()),
                    this._gApi.setLanguage(this._impl.getLanguage()));
                let webUrl,
                    appUrl,
                    isNewUser = false,
                    isCloseable = true,
                    currentUrl = new URL(window.location.href);
                if (currentUrl.searchParams) {
                    ((webUrl = currentUrl.searchParams.get("webUrl")), (appUrl = currentUrl.searchParams.get("appUrl")));
                    let newUserParam = currentUrl.searchParams.get("newuser"),
                        closeableParam = currentUrl.searchParams.get("closeable");
                    ((isNewUser = newUserParam && "false" != newUserParam), (isCloseable = !closeableParam || "false" != closeableParam));
                } else {
                    for (var match, queryRegex = /[?&]([^=#]+)=([^&#]*)/g, queryParams = {}; (match = queryRegex.exec(window.location.href)); ) queryParams[match[1]] = match[2];
                    ((webUrl = queryParams.webUrl), (appUrl = queryParams.appUrl), (isNewUser = queryParams.newUser && "false" != queryParams.newUser), (isCloseable = !queryParams.closeable || "false" != queryParams.closeable));
                }
                if (webUrl)
                    try {
                        webUrl = window.atob(webUrl);
                    } catch (e) {
                        webUrl = "";
                    }
                if (appUrl)
                    try {
                        appUrl = window.atob(appUrl);
                    } catch (e) {
                        appUrl = "";
                    }
                ((this._webUrl = webUrl),
                    (this._appUrl = appUrl),
                    (this._newUser = isNewUser),
                    (this._closeable = isCloseable),
                    (this._dialog = $("<div/>").addClass("g-dialog-content")),
                    (this._modal = $("<div/>").addClass("g-dialog-modal hide")),
                    (this._overlay = $("<div/>").addClass("g-dialog-overlay hide")),
                    (this._closeButton = $("<div></div>")
                        .css("display", "none")
                        .addClass("g-cloud-ui-btn-close")
                        .append($("<span></span>").addClass("g-cloud-icon-close"))
                        .on("click", this.close.bind(this))
                        .appendTo(this._dialog)));
                let headerElement = $("<header></header>").appendTo(this._dialog);
                ((this._title = $("<span></span>")
                    .addClass("title")
                    .append($("<label></label>").text(i18n.get(new LocKey("GLoginDialog", "text.title-discontinued"))))
                    .appendTo(headerElement)),
                    (this._container = $("<div></div>").addClass("container").appendTo(this._dialog)),
                    (this._helpTip = $("<div></div>")
                        .addClass("help-tip")
                        .append(
                            $("<span></span>").html(
                                i18n
                                    .get(new LocKey("GLoginDialog", "text.tooltip-trouble-login"))
                                    .replace("%support-link", '<span class="support-link">'.concat(getSupportUrl(), "</span>"))
                            )
                        )),
                    this._helpTip.find(".support-link").on(
                        "click",
                        function () {
                            let formName = this._getStatMappedForm();
                            (trackEvent("login-signup_".concat(formName, "_support"), null, false),
                                this._impl.openExternalLink({
                                    dialog: this,
                                    link: getUrlWithQueryParams(getSupportUrl(), this._getUTMCampaignParams()),
                                }));
                        }.bind(this)
                    ),
                    this._dialog.on("click", (event) => {
                        var target = $(event.target);
                        target.hasClass("g-cloud-icon-question") ||
                            target.hasClass("help-tip") ||
                            target.parent().hasClass("help-tip") ||
                            !this._helpTip.hasClass("visible") ||
                            this._helpTip.removeClass("visible");
                    }));
            }
            ((GCloudUiLoginDialog.Forms = {
                SignIn: "sign-in",
                SignUp: "sign-up",
                ResetPassword: "reset-password",
                Thanks: "thanks",
            }),
                (GCloudUiLoginDialog.prototype._getOptions = function () {
                    let defaults = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return Object.assign({}, defaults, this._options);
                }),
                (GCloudUiLoginDialog.prototype._runtimeCode = null),
                (GCloudUiLoginDialog.prototype._query = null),
                (GCloudUiLoginDialog.prototype._flow = null),
                (GCloudUiLoginDialog.prototype._anonymous = false),
                (GCloudUiLoginDialog.prototype._formContent = null),
                (GCloudUiLoginDialog.prototype._title = null),
                (GCloudUiLoginDialog.prototype._dialog = null),
                (GCloudUiLoginDialog.prototype._callback = null),
                (GCloudUiLoginDialog.prototype._coupon = null),
                (GCloudUiLoginDialog.prototype._activePanel = GCloudUiLoginDialog.Forms.SignIn),
                (GCloudUiLoginDialog.prototype._shouldBypassEmailVerification = function () {
                    const bypassEmailVerification = this._query && this._query.bypassEmailVerification;
                    return !!this._anonymous && "string" == typeof bypassEmailVerification && "false" !== bypassEmailVerification;
                }),
                (GCloudUiLoginDialog.prototype._isNewPurchaseFlow = function () {
                    return !!this._flow && ("purchase_flow_new" === this._flow || "purchase" === this._flow);
                }),
                (GCloudUiLoginDialog.prototype.open = function (targetElement) {
                    const couponMatch = (document.cookie || "").match(/_gcoupon=[^;]+/);
                    ((this._coupon = couponMatch ? couponMatch[0].slice("_gcoupon=".length) : null),
                        this._coupon &&
                            xmasCouponRegex.test(this._coupon) &&
                            this._title
                                .empty()
                                .append($("<label></label>").text(i18n.get(new LocKey("GLoginDialog", "text.title-xmas-title"))))
                                .append($("<br>"))
                                .append($("<label></label>").text(i18n.get(new LocKey("GLoginDialog", "text.title-xmas-subtitle")))),
                        this._buildForm().appendTo(this._container),
                        this._isNewPurchaseFlow() || this._buildProInfo().appendTo(this._container),
                        $("<span></span>").addClass("version").html(this._getFormattedVersion()).appendTo(this._dialog),
                        $("<footer></footer>").appendTo(this._dialog),
                        trackEvent("login-signup_login_open", null, true),
                        this._activatePanel(GCloudUiLoginDialog.Forms.SignIn),
                        this._anonymous && this._closeable && this._closeButton.css("display", ""),
                        targetElement
                            .addClass("g-cloud-ui g-cloud-ui-embedded g-cloud-ui-login")
                            .toggleClass("g-anonymous", this._anonymous)
                            .toggleClass("g-new-purchase-flow", this._isNewPurchaseFlow())
                            .append(
                                $("<div></div>")
                                    .addClass("background")
                                    .append($("<div></div>").addClass("left"))
                                    .append($("<div></div>").addClass("right"))
                            )
                            .append($("<div></div>").addClass("g-cloud-ui-login-dialog").append(this._dialog))
                            .append(this._modal)
                            .append(this._overlay),
                        learnmore || targetElement.addClass("g-cloud-ui-no-learn-more"),
                        this.focus());
                }),
                (GCloudUiLoginDialog.prototype._getFormattedVersion = function () {
                    const runtimeInfo = this._getRuntime(),
                        runtimeAbbr = runtimeInfo ? " ".concat(runtimeInfo.abbr) : "";
                    return i18n.get(new LocKey("GLoginDialog", "text.version")).replace("%version", this._version) + runtimeAbbr;
                }),
                (GCloudUiLoginDialog.prototype._getRuntime = function () {
                    if (this._runtimeCode) {
                        return Object.values(Runtimes).find((item) => item.code === this._runtimeCode);
                    }
                    return null;
                }),
                (GCloudUiLoginDialog.prototype.close = function () {
                    (this._toggleLoading(true),
                        this._impl.close({
                            dialog: this,
                        }));
                }),
                (GCloudUiLoginDialog.prototype.openPurchaseFlow = function () {
                    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (this._toggleLoading(true),
                        this._impl.openPurchaseFlow({
                            dialog: this,
                            options: this._getOptions(options),
                        }));
                }),
                (GCloudUiLoginDialog.prototype._buildForm = function () {
                    let content = $("<div></div>").addClass("content");
                    return (
                        $("<div></div>")
                            .addClass("column-layout sparse header")
                            .append($("<span></span>").addClass("title text-left").attr("id", "form-title"))
                            .append(
                                $("<span></span>")
                                    .append(
                                        $("<span></span>")
                                            .addClass("g-cloud-icon-question")
                                            .on(
                                                "click",
                                                function () {
                                                    let formName = this._getStatMappedForm();
                                                    (trackEvent("login-signup_".concat(formName, "_help"), null, true), this._helpTip.toggleClass("visible"));
                                                }.bind(this)
                                            )
                                    )
                                    .append(this._helpTip)
                            )
                            .appendTo(content),
                        $("<div></div>").addClass("message").append($("<span></span>")).appendTo(content),
                        this._buildSignin().appendTo(content),
                        this._buildSignup().appendTo(content),
                        this._buildResetPassword().appendTo(content),
                        (this._formContent = content),
                        $("<div></div>").addClass("form-panel").append(content)
                    );
                }),
                (GCloudUiLoginDialog.prototype._onResetPasswordSubmit = async function (emailForm, recaptchaToken) {
                    try {
                        const response = await this._gApi.resetPassword({
                            email: emailForm.find('input[data-property="email"]').val(),
                            appUrl: this._appUrl,
                            webUrl: this._webUrl,
                            recaptcha: recaptchaToken,
                        });
                        this._showMessage(response && response.message, "info");
                    } catch (error) {
                        this._handleError(error);
                    }
                    Recaptcha.isAvailable() && grecaptcha.reset(this._resetPasswordRecaptchaWidget);
                }),
                (GCloudUiLoginDialog.prototype._buildResetPassword = function () {
                    let panel = $("<div></div>")
                            .addClass("panel")
                            .attr("id", "reset-password")
                            .attr("data-title", i18n.get(new LocKey("GLoginDialog", "text.forgot-password"))),
                        form = $("<form></form>").appendTo(panel);
                    if (Recaptcha.isAvailable()) {
                        const recaptchaContainer = $("<div></div>").addClass("g-recaptcha").appendTo(form);
                        this._gApi.recaptchaKey().then((siteKey) => {
                            this._resetPasswordRecaptchaWidget = grecaptcha.render(recaptchaContainer[0], {
                                sitekey: siteKey,
                                callback: (token) => this._onResetPasswordSubmit(form, token),
                                size: "invisible",
                            });
                        });
                    }
                    return (
                        form.on(
                            "submit",
                            (event) => (
                                trackEvent("login-signup_forgot-password_send-request", null, true),
                                this._showMessage(),
                                event.preventDefault(),
                                Recaptcha.isAvailable()
                                    ? navigator.onLine
                                        ? grecaptcha.execute(this._resetPasswordRecaptchaWidget)
                                        : GCloudUiOfflineDialog.openRetryConnection(null, () => {
                                              grecaptcha.execute(this._resetPasswordRecaptchaWidget);
                                          })
                                    : this._onResetPasswordSubmit(form),
                                false
                            )
                        ),
                        $("<label></label>")
                            .text(i18n.get(new LocKey("GLoginDialog", "text.sign-up-email")))
                            .appendTo(form),
                        $("<input>")
                            .attr("type", "email")
                            .attr("data-property", "email")
                            .attr("autofocus", true)
                            .attr("required", true)
                            .appendTo(form),
                        $("<button></button>")
                            .attr("type", "submit")
                            .addClass("fit")
                            .append($("<span></span>").text(i18n.get(new LocKey("GLoginDialog", "text.reset-password-send"))))
                            .appendTo(form),
                        $("<div></div>").addClass("spacer").appendTo(panel),
                        $("<footer></footer>")
                            .append(
                                $("<span></span>")
                                    .addClass("link")
                                    .attr("tabindex", 0)
                                    .text(i18n.get(new LocKey("GLoginDialog", "text.sign-up-go-back")))
                                    .keydown(handleSpaceKeydown)
                                    .on("click", () => {
                                        (trackEvent("login-signup_forgot-password_back-to-login", null, true), this._activatePanel(GCloudUiLoginDialog.Forms.SignIn));
                                    })
                            )
                            .appendTo(panel),
                        panel
                    );
                }),
                (GCloudUiLoginDialog.prototype._buildSignup = function () {
                    let panel = $("<div></div>")
                        .addClass("panel")
                        .attr("id", "sign-up")
                        .attr(
                            "data-title",
                            i18n.get(new LocKey("GLoginDialog", "text.title-create-account")).replace("%days", window.__TRIAL_DAYS__ || 15)
                        );
                    $("<div></div>")
                        .addClass("column-layout normal subheader")
                        .append($("<span></span>").text(i18n.get(new LocKey("GLoginDialog", "text.sign-up-already"))))
                        .append(
                            $("<span></span>")
                                .addClass("link")
                                .attr("tabindex", 0)
                                .text(i18n.get(new LocKey("GLoginDialog", "text.sign-up-go-back")))
                                .keydown(handleSpaceKeydown)
                                .on("click enter", () => {
                                    (trackEvent("login-signup_create-account_back-to-login", null, true), this._activatePanel(GCloudUiLoginDialog.Forms.SignIn));
                                })
                        )
                        .appendTo(panel);
                    let form = $("<form></form>").appendTo(panel);
                    const recaptchaAvailable = Recaptcha.isAvailable(),
                        handleSignupSubmit = (recaptchaToken) => {
                            const email = form.find('input[data-property="email"]').val(),
                                password = form.find('input[data-property="password"]').val(),
                                recaptcha = recaptchaToken,
                                newsletterChecked = form.find('input[data-property="newsletter"]').is(":checked"),
                                firstName = form.find('input[data-property="firstname"]').val().trim(),
                                lastName = form.find('input[data-property="lastname"]').val().trim(),
                                appUrl = this._appUrl,
                                webUrl = this._webUrl,
                                flow = this._flow;
                            (this._toggleLoading(true),
                                this._gApi
                                    .signup({
                                        email: email,
                                        password: password,
                                        app: "designer",
                                        recaptcha: recaptcha,
                                        newsletter: newsletterChecked,
                                        name: firstName,
                                        last_name: lastName,
                                        appUrl: appUrl,
                                        webUrl: webUrl,
                                        flow: flow,
                                    })
                                    .then((response) =>
                                        this._postLogin(
                                            Object.assign(response, {
                                                new: true,
                                            })
                                        )
                                    )
                                    .catch((error) => {
                                        (this._toggleLoading(false), this._handleError(error), recaptchaAvailable && grecaptcha.reset(this._recaptchaWidget));
                                    }));
                        };
                    form.on(
                        "submit",
                        (event) => (
                            trackEvent("login-signup_create-account_create-account", null, true),
                            this._showMessage(),
                            event.preventDefault(),
                            recaptchaAvailable
                                ? navigator.onLine
                                    ? grecaptcha.execute(this._recaptchaWidget)
                                    : GCloudUiOfflineDialog.openRetryConnection(null, () => {
                                          grecaptcha.execute(this._recaptchaWidget);
                                      })
                                : handleSignupSubmit(),
                            false
                        )
                    );
                    const { firstName: prefillFirstName = "", lastName: prefillLastName = "", email: prefillEmail = "" } = this._query || {};
                    if (
                        ($("<label></label>")
                            .text(i18n.get(new LocKey("GLoginDialog", "text.sign-up-email")))
                            .appendTo(form),
                        $("<input>")
                            .attr("type", "email")
                            .attr("data-property", "email")
                            .attr("autofocus", true)
                            .attr("required", true)
                            .val(safeDecodeURIComponent(prefillEmail))
                            .appendTo(form),
                        $("<div></div>")
                            .addClass("column-layout text-left top normal")
                            .append(
                                $("<div></div>")
                                    .addClass("row-layout")
                                    .append($("<label></label>").text(i18n.get(new LocKey("GLoginDialog", "text.first-name"))))
                                    .append(
                                        $("<input>").attr("type", "text").attr("data-property", "firstname").attr("required", true).val(safeDecodeURIComponent(prefillFirstName))
                                    )
                            )
                            .append(
                                $("<div></div>")
                                    .addClass("row-layout")
                                    .append($("<label></label>").text(i18n.get(new LocKey("GLoginDialog", "text.last-name"))))
                                    .append(
                                        $("<input>").attr("type", "text").attr("data-property", "lastname").attr("required", true).val(safeDecodeURIComponent(prefillLastName))
                                    )
                            )
                            .appendTo(form),
                        $("<label></label>")
                            .addClass("column-layout sparse")
                            .append($("<span></span>").text(i18n.get(new LocKey("GLoginDialog", "text.sign-up-password"))))
                            .append(
                                $("<span></span>").text(
                                    i18n
                                        .get(new LocKey("GLoginDialog", "text.sign-up-password-min-max"))
                                        .replace("%min-number", PasswordLength.Minimum)
                                        .replace("%max-number", PasswordLength.Maximum)
                                )
                            )
                            .appendTo(form),
                        buildPasswordField().appendTo(form),
                        $("<label></label>")
                            .addClass("column-layout normal")
                            .append(
                                $("<input>")
                                    .attr("type", "checkbox")
                                    .on("change", (event) => {
                                        let isChecked = $(event.target).is(":checked");
                                        (trackEvent("login-signup_create-account_i-agree", isChecked, true),
                                            form.find('button[type="submit"]').prop("disabled", !isChecked).toggleClass("g-disabled", !isChecked));
                                    })
                            )
                            .append(
                                $("<span></span>")
                                    .append(
                                        $("<span></span>").html(
                                            i18n
                                                .get(new LocKey("GLoginDialog", "text.agreement"))
                                                .replace(
                                                    "%terms-of-use",
                                                    $("<span/>")
                                                        .addClass("link")
                                                        .addClass("terms-of-use")
                                                        .attr("tabindex", 0)
                                                        .text(i18n.get(new LocKey("GLoginDialog", "text.terms-use")))
                                                        .prop("outerHTML")
                                                )
                                                .replace(
                                                    "%end-user-license-agreement",
                                                    $("<span/>")
                                                        .addClass("link")
                                                        .addClass("end-user-license-agreement")
                                                        .attr("tabindex", 0)
                                                        .text(i18n.get(new LocKey("GLoginDialog", "text.eula")))
                                                        .prop("outerHTML")
                                                ) + " "
                                        )
                                    )
                                    .append($("<span></span>").text(i18n.get(new LocKey("GLoginDialog", "text.privacy-statement"))))
                                    .append(
                                        $("<span></span>")
                                            .addClass("link")
                                            .attr("tabindex", 0)
                                            .text(i18n.get(new LocKey("GLoginDialog", "text.privacy-statement-link")))
                                            .keydown(handleSpaceKeydown)
                                            .on(
                                                "click",
                                                () => (
                                                    trackEvent("login-signup_create-account_privacy-policy", null, true),
                                                    this._impl.openExternalLink({
                                                        dialog: this,
                                                        link: getUrlWithQueryParams(PRIVACY_URL, this._getUTMCampaignParams()),
                                                    }),
                                                    false
                                                )
                                            )
                                    )
                            )
                            .appendTo(form),
                        form
                            .find(".terms-of-use")
                            .keydown(handleSpaceKeydown)
                            .on(
                                "click",
                                () => (
                                    trackEvent("login-signup_create-account_terms-of-use", null, true),
                                    this._impl.openExternalLink({
                                        dialog: this,
                                        link: getUrlWithQueryParams("https://www.corel.com/terms/", this._getUTMCampaignParams()),
                                    }),
                                    false
                                )
                            ),
                        form
                            .find(".end-user-license-agreement")
                            .keydown(handleSpaceKeydown)
                            .on(
                                "click",
                                () => (
                                    trackEvent("login-signup_create-account_eula", null, true),
                                    this._impl.openExternalLink({
                                        dialog: this,
                                        link: getUrlWithQueryParams("https://www.corel.com/eula", this._getUTMCampaignParams()),
                                    }),
                                    false
                                )
                            ),
                        $("<label></label>")
                            .addClass("normal")
                            .append($("<span></span>").text(i18n.get(new LocKey("GLoginDialog", "text.info-privacy-statement"))))
                            .appendTo(form),
                        $("<label></label>")
                            .addClass("column-layout normal")
                            .append($("<input>").attr("type", "checkbox").attr("data-property", "newsletter").prop("checked", false))
                            .on("change", (event) => {
                                trackEvent("login-signup_create-account_subscribe", $(event.target).is(":checked"), true);
                            })
                            .append($("<span></span>").text(i18n.get(new LocKey("GLoginDialog", "text.newsletter"))))
                            .appendTo(form),
                        recaptchaAvailable)
                    ) {
                        let recaptchaContainer = $("<div></div>").addClass("g-recaptcha").appendTo(form);
                        this._gApi.recaptchaKey().then((siteKey) => {
                            this._recaptchaWidget = grecaptcha.render(recaptchaContainer[0], {
                                sitekey: siteKey,
                                callback: handleSignupSubmit,
                                size: "invisible",
                            });
                        });
                    }
                    ($("<button></button>")
                        .attr("type", "submit")
                        .addClass("fit")
                        .append(
                            $("<span></span>").text(
                                this._isNewPurchaseFlow()
                                    ? ((destination) => {
                                          if (!destination) return i18n.get(new LocKey("GLoginDialog", "text.continue"));
                                          return (
                                              i18n.get(new LocKey("GLoginDialog", "text.continue-to-".concat(destination))) ||
                                              i18n.get(new LocKey("GLoginDialog", "text.continue"))
                                          ).replace("%days", window.__TRIAL_DAYS__ || 15);
                                      })(this._query && this._query.to)
                                    : i18n.get(new LocKey("GLoginDialog", "text.sign-up-now"))
                            )
                        )
                        .addClass("g-disabled")
                        .prop("disabled", true)
                        .appendTo(form),
                        $("<div></div>")
                            .addClass("column-layout separator")
                            .append($("<hr>"))
                            .append(
                                $("<span></span>")
                                    .text(i18n.get(new LocKey("GLoginDialog", "text.or")))
                                    .addClass("or-element")
                            )
                            .append($("<hr>"))
                            .appendTo(panel),
                        $("<div></div>")
                            .addClass("column-layout oauth-buttons")
                            .append(this._createFacebookButton(new LocKey("GLoginDialog", "text.sign-facebook")))
                            .append(this._createGoogleButton(new LocKey("GLoginDialog", "text.sign-google")))
                            .appendTo(panel),
                        $("<div></div>").addClass("spacer").appendTo(panel));
                    let footerElement = $("<footer></footer>").appendTo(panel);
                    return (
                        $("<span></span>")
                            .addClass("info")
                            .html(i18n.getValue("GLoginDialog", "text.create-account-info").replace("%privacy-link", PRIVACY_URL))
                            .appendTo(footerElement)
                            .find("a")
                            .on("click", (event) => {
                                (event.preventDefault(), event.stopImmediatePropagation());
                                const href = $(event.target).closest("a").attr("href"),
                                    linkType = href.includes("terms") ? "terms-of-use" : "privacy-policy";
                                return (
                                    trackEvent("login-signup_create-account_".concat(linkType), null, true),
                                    this._impl.openExternalLink({
                                        dialog: this,
                                        link: getUrlWithQueryParams(href, this._getUTMCampaignParams()),
                                    }),
                                    false
                                );
                            }),
                        panel
                    );
                }),
                (GCloudUiLoginDialog.prototype._createGoogleButton = function (labelKey) {
                    return $("<button></button>")
                        .addClass("sign-google oauth column-layout")
                        .append($("<span></span>").addClass("icon").addClass("g-cloud-icon-google"))
                        .append($("<span></span>").addClass("txt").text(i18n.get(labelKey)))
                        .on("click", () => {
                            let formName = this._getStatMappedForm();
                            (trackEvent("login-signup_".concat(formName, "_login-google"), null, true), this._oauth("google"));
                        });
                }),
                (GCloudUiLoginDialog.prototype._createFacebookButton = function (labelKey) {
                    return $("<button></button>")
                        .addClass("sign-facebook oauth column-layout")
                        .append($("<span></span>").addClass("icon").addClass("g-cloud-icon-facebook"))
                        .append($("<span></span>").addClass("txt").text(i18n.get(labelKey)))
                        .on("click", () => {
                            let formName = this._getStatMappedForm();
                            (trackEvent("login-signup_".concat(formName, "_login-facebook"), null, true), this._oauth("facebook"));
                        });
                }),
                (GCloudUiLoginDialog.prototype._buildThanks = function (userData) {
                    const existingThanksPanel = $("#thanks");
                    if (existingThanksPanel.length) return existingThanksPanel;
                    this._closeButton.css("display", "none");
                    let thanksPanel = $("<div></div>").addClass("panel").attr("id", "thanks");
                    $("<header></header>")
                        .append($("<span></span>").html(i18n.get(new LocKey("GLoginDialog", "text.account-created"))))
                        .appendTo(thanksPanel);
                    let mainElement = $("<main></main>").appendTo(thanksPanel);
                    return (
                        this._title
                            .empty()
                            .append($("<label></label>").text(i18n.get(new LocKey("GLoginDialog", "text.title-title-account-created")))),
                        userData.trial_created ||
                            (trackEvent("login-signup_account-created_trial-activated", null, true),
                            this._gApi.license
                                .activateTrial()
                                .then(() => {
                                    (userData.email_verified || this._shouldBypassEmailVerification()) && this.close();
                                })
                                .catch((error) => this._handleError(error))),
                        userData.email_verified ||
                            ($("<span></span>")
                                .addClass("title")
                                .html(i18n.get(new LocKey("GLoginDialog", "text.confirmation-account-created")).replace("%email", userData.email))
                                .appendTo(mainElement),
                            $("<span></span>")
                                .addClass("subtitle")
                                .html(
                                    i18n
                                        .get(new LocKey("GLoginDialog", "text.confirmation-account-created-subtitle"))
                                        .replace("%days", window.__TRIAL_DAYS__ || 15)
                                )
                                .appendTo(mainElement)),
                        userData.email_verified ||
                            $("<footer></footer>")
                                .append(
                                    $("<span></span>")
                                        .addClass("font-11-px")
                                        .text(i18n.get(new LocKey("GLoginDialog", "text.email-not-received-part-1")))
                                )
                                .append(
                                    $("<span></span>")
                                        .addClass("link")
                                        .attr("tabindex", 0)
                                        .text(i18n.get(new LocKey("GLoginDialog", "text.email-not-received-part-2")))
                                        .keydown(handleSpaceKeydown)
                                        .on("click", async () => {
                                            (trackEvent("login-signup_account-created_send-activation-email", null, true),
                                                thanksPanel.css("min-height", ""),
                                                this._showMessage(),
                                                this._toggleLoading(true));
                                            try {
                                                const webUrl = this._webUrl,
                                                    appUrl = this._appUrl;
                                                this._gApi
                                                    .resendEmailConfirmation({
                                                        email: userData.email,
                                                        force: true,
                                                        webUrl: webUrl,
                                                        appUrl: appUrl,
                                                    })
                                                    .then((response) => {
                                                        (this._showMessage(response && response.message, "info"), thanksPanel.css("min-height", "446px"));
                                                    })
                                                    .catch((error) => this._handleError(error));
                                            } finally {
                                                this._toggleLoading(false);
                                            }
                                        })
                                )
                                .appendTo(thanksPanel),
                        thanksPanel
                    );
                }),
                (GCloudUiLoginDialog.prototype._buildSignin = function () {
                    let panel = $("<div></div>")
                            .addClass("panel")
                            .attr("id", "sign-in")
                            .attr("data-title", i18n.get(new LocKey("GLoginDialog", "text.sign-in-title"))),
                        form = $("<form></form>").appendTo(panel);
                    ($("<div></div>")
                        .html("<p>⚠︎ ".concat(i18n.get(new LocKey("GLoginDialog", "text.title-discontinued-notice")), "</p>"))
                        .css("color", "#e3006e")
                        .appendTo(form),
                        form.on("submit", (event) => {
                            (trackEvent("login-signup_login_login", null, true), this._showMessage(), event.preventDefault());
                            const target = $(event.target),
                                login = target.find('input[data-property="login"]').val(),
                                password = target.find('input[data-property="password"]').val(),
                                flow = this._flow;
                            return (
                                this._toggleLoading(true),
                                this._gApi
                                    .signin({
                                        login: login,
                                        password: password,
                                        app: "designer",
                                        flow: flow,
                                    })
                                    .then((response) => this._postLogin(response))
                                    .catch((error) => this._handleError(error)),
                                false
                            );
                        }),
                        $("<label></label>")
                            .text(i18n.get(new LocKey("GLoginDialog", "text.sign-in-login")))
                            .appendTo(form),
                        $("<input>").attr("type", "text").attr("data-property", "login").attr("required", true).appendTo(form),
                        $("<label></label>")
                            .text(i18n.get(new LocKey("GLoginDialog", "text.sign-in-password")))
                            .appendTo(form),
                        buildPasswordField(new LocKey("GLoginDialog", "text.placeholder-sign-in-password")).appendTo(form),
                        $("<div></div>")
                            .addClass("column-layout login")
                            .append(
                                $("<button></button>")
                                    .attr("type", "submit")
                                    .append($("<span></span>").text(i18n.get(new LocKey("GLoginDialog", "text.sign-in-button"))))
                            )
                            .appendTo(form),
                        $("<div></div>")
                            .addClass("link text-left")
                            .attr("tabindex", 0)
                            .text(i18n.get(new LocKey("GLoginDialog", "text.forgot-password")))
                            .keydown(handleSpaceKeydown)
                            .on("click", () => {
                                (trackEvent("login-signup_login_forgot-password", null, true), this._activatePanel(GCloudUiLoginDialog.Forms.ResetPassword));
                            })
                            .appendTo(form),
                        $("<div></div>")
                            .addClass("column-layout separator")
                            .append($("<hr>"))
                            .append(
                                $("<span></span>")
                                    .text(i18n.get(new LocKey("GLoginDialog", "text.or")))
                                    .addClass("or-element")
                            )
                            .append($("<hr>"))
                            .appendTo(panel),
                        $("<div></div>")
                            .addClass("column-layout oauth-buttons")
                            .append(this._createGoogleButton(new LocKey("GLoginDialog", "text.sign-google")))
                            .appendTo(panel),
                        $("<div></div>").addClass("spacer").appendTo(panel));
                    let footerElement = $("<footer></footer>").appendTo(panel);
                    footerElement.append($("<br />"));
                    return (
                        $("<span></span>")
                            .addClass("info")
                            .html(i18n.getValue("GLoginDialog", "text.create-account-info").replace("%privacy-link", PRIVACY_URL))
                            .appendTo(footerElement)
                            .find("a")
                            .on("click", (event) => {
                                (event.preventDefault(), event.stopImmediatePropagation());
                                const href = $(event.target).closest("a").attr("href"),
                                    linkType = href.includes("terms") ? "terms-of-use" : "privacy-policy";
                                return (
                                    trackEvent("login-signup_login_".concat(linkType), null, true),
                                    this._impl.openExternalLink({
                                        dialog: this,
                                        link: getUrlWithQueryParams(href, this._getUTMCampaignParams()),
                                    }),
                                    false
                                );
                            }),
                        panel
                    );
                }),
                (GCloudUiLoginDialog.prototype._buildProInfo = function () {
                    const proInfoItems = [
                            {
                                title: i18n.get(new LocKey("GLoginDialog", "text.title-discontinued-eol-date")),
                                content: i18n
                                    .get(new LocKey("GLoginDialog", "text.title-discontinued-eol-date-details"))
                                    .replace("%support-link", SUPPORT_URL),
                            },
                            {
                                title: i18n.get(new LocKey("GLoginDialog", "text.title-discontinued-avoid-losing-work")),
                                content: i18n.get(new LocKey("GLoginDialog", "text.title-discontinued-avoid-losing-work-details")),
                                action: {
                                    text: i18n.get(new LocKey("GLoginDialog", "text.title-discontinued-export-your-files")),
                                    link: IMPORT_EXPORT_DOCUMENTATION,
                                },
                            },
                            {
                                title: i18n.get(new LocKey("GLoginDialog", "text.title-discontinued-sign-up-closed")),
                                content: i18n
                                    .get(new LocKey("GLoginDialog", "text.title-discontinued-sign-up-closed-details"))
                                    .replace("%product-link", CORELDRAW_PAGE),
                                action: {
                                    text: i18n.get(new LocKey("GLoginDialog", "text.title-discontinued-sign-up-closed-learn-more")),
                                    link: VECTOR_PRODUCT_PAGE,
                                },
                            },
                        ],
                        xmasTopics = [
                            i18n.get(new LocKey("GLoginDialog", "text.xmas-topic-1")),
                            i18n.get(new LocKey("GLoginDialog", "text.xmas-topic-2")),
                            i18n.get(new LocKey("GLoginDialog", "text.xmas-topic-3")),
                        ],
                        isXmasCoupon = this._coupon && xmasCouponRegex.test(this._coupon),
                        headerElement = $("<header></header>"),
                        mainElement = $("<main></main>");
                    if (isXmasCoupon) {
                        (headerElement.html(i18n.get(new LocKey("GLoginDialog", "text.xmas-header"))),
                            mainElement.append($("<header></header>").text(i18n.get(new LocKey("GLoginDialog", "text.xmas-header-2")))),
                            mainElement.append(
                                xmasTopics.map((topic, index) =>
                                    $("<div></div>")
                                        .append(
                                            $("<div></div>")
                                                .addClass("number")
                                                .text(index + 1)
                                        )
                                        .append($("<span></span>").addClass("content").text(topic))
                                )
                            ));
                        let footerElement = $("<footer></footer>");
                        (mainElement.append(footerElement),
                            this._gApi
                                .getPrice({
                                    coupon: this._coupon,
                                })
                                .then((priceInfo) => {
                                    let { price, listPrice, locale, currency } = priceInfo,
                                        discountPercent = "";
                                    price && listPrice && (discountPercent = 5 * parseInt(Math.floor((100 * (1 - price / listPrice)) / 5)) + "%");
                                    const currencyFormatOptions = {
                                        style: "currency",
                                        currency: currency,
                                    };
                                    price &&
                                        Math.round(price) === price &&
                                        Object.assign(currencyFormatOptions, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        });
                                    const formattedPrice = price ? price.toLocaleString(locale || i18n.getLocaleLanguageTag(navigator.language), currencyFormatOptions) : "";
                                    formattedPrice &&
                                        discountPercent &&
                                        footerElement.html(
                                            i18n.get(new LocKey("GLoginDialog", "text.xmas-discount")).replace("%discount", discountPercent).replace("%price", formattedPrice)
                                        );
                                }));
                    } else
                        (headerElement.html(i18n.get(new LocKey("GLoginDialog", "text.title-discontinued-thanks"))),
                            mainElement.append(
                                proInfoItems.map((item) => {
                                    let { title, content, action } = item;
                                    const topicElement = $("<div></div>")
                                        .addClass("topic")
                                        .append($("<div></div>").text(title).css("font-size", "12pt").css("font-weight", "bold"))
                                        .append($("<div></div>").html(content).css("font-size", "12pt"));
                                    return (
                                        action &&
                                            topicElement.append(
                                                $("<button></button>")
                                                    .addClass("buynow round-corner")
                                                    .text(action.text)
                                                    .on("click", () => {
                                                        this._impl.openExternalLink({
                                                            dialog: this,
                                                            link: action.link,
                                                        });
                                                    })
                                                    .css("width", "fit-content")
                                                    .css("text-transform", "none")
                                                    .css("margin-top", "6px")
                                            ),
                                        topicElement
                                    );
                                })
                            ));
                    return $("<div></div>")
                        .addClass("pro-panel" + (isXmasCoupon ? " xmas" : ""))
                        .append(headerElement)
                        .append(mainElement);
                }),
                (GCloudUiLoginDialog.prototype._activatePanel = function (panelId) {
                    ((this._activePanel = panelId), this._showMessage(), this._dialog.find(".panel.g-active").removeClass("g-active"));
                    let panelTitle = this._dialog
                        .find(".panel#" + panelId)
                        .addClass("g-active")
                        .attr("data-title");
                    (this._dialog
                        .find("#form-title")
                        .text(panelTitle || "")
                        .parent()
                        .css("display", panelTitle ? "" : "none"),
                        this.focus());
                }),
                (GCloudUiLoginDialog.prototype.focus = function () {
                    $(document.body).find("a, button, :input, [tabindex]").filter(":visible:not(:disabled)").first().focus();
                }),
                (GCloudUiLoginDialog.prototype._oauth = function (provider) {
                    this._impl.openOAuth({
                        dialog: this,
                        provider: provider,
                    });
                }),
                (GCloudUiLoginDialog.prototype._postLogin = async function (userData) {
                    try {
                        await this._gApi.license.get();
                        (userData.new &&
                            void 0 !== window.dataLayer &&
                            (dataLayer.push({
                                userId: userData.id,
                            }),
                            dataLayer.push({
                                userEmail: userData.email,
                            }),
                            dataLayer.push({
                                userName: userData.name || "",
                            }),
                            dataLayer.push({
                                userLogin: userData.login,
                            }),
                            dataLayer.push({
                                event: "USER_SIGN_UP_EVENT",
                            })),
                            this._toggleLoading(true));
                        const { flags: { welcomeMessage } = {} } = await this._gApi.getUserSettings().catch(() => Object.create({}));
                        if (
                            !welcomeMessage &&
                            userData.new &&
                            (await this._gApi.updateUserSettings({
                                flags: {
                                    welcomeMessage: true,
                                },
                            }),
                            !(this._isNewPurchaseFlow() || (userData.trial_created && userData.email_verified)))
                        )
                            return (
                                this._buildThanks(userData).insertBefore(this._dialog.find(".message")),
                                void this._activatePanel(GCloudUiLoginDialog.Forms.Thanks)
                            );
                        if (this._isNewPurchaseFlow())
                            return void this.openPurchaseFlow({
                                immediatePurchase: true,
                            });
                        this.close();
                    } finally {
                        this._toggleLoading(false);
                    }
                }),
                (GCloudUiLoginDialog.prototype._toggleLoading = function (isLoading) {
                    (this._formContent.toggleClass("g-cloud-ui-loading", isLoading),
                        this._welcomeback && this._welcomeback.toggleClass("g-cloud-ui-loading", isLoading));
                }),
                (GCloudUiLoginDialog.prototype._handleError = async function (error) {
                    if ((this._toggleLoading(false), navigator.onLine)) this._showMessage(this._gApi.formatError(error));
                    else {
                        let user = await this._gApi.getUser().catch(() => null);
                        GCloudUiOfflineDialog.openRetryConnection(user);
                    }
                }),
                (GCloudUiLoginDialog.prototype._showMessage = function (message) {
                    let type = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "error",
                        messageElement = this._dialog.find(".message").removeClass("error info show");
                    message && messageElement.addClass("show").addClass(type).find("span").html(message);
                }),
                (GCloudUiLoginDialog.prototype._showVerifyEmailAlert = function (userData) {
                    let leftElement = $("<div/>").addClass("left"),
                        rightElement = $("<div/>").addClass("right"),
                        okIcon = $("<span/>").addClass("icon g-cloud-icon-ok");
                    (leftElement.append(okIcon),
                        rightElement
                            .append(
                                $("<p/>")
                                    .addClass("account-created")
                                    .append($("<b/>").text(i18n.get(new LocKey("GLoginDialog", "text.account-created"))))
                            )
                            .append(
                                $("<div/>")
                                    .addClass("confirmation-account-created")
                                    .html(i18n.get(new LocKey("GLoginDialog", "text.confirmation-account-created")).replace("%email", userData.email))
                            )
                            .append(
                                $("<div/>")
                                    .addClass("confirmation-account-created-subtitle")
                                    .text(
                                        i18n
                                            .get(new LocKey("GLoginDialog", "text.confirmation-account-created-subtitle"))
                                            .replace("%days", window.__TRIAL_DAYS__ || 15)
                                    )
                            )
                            .append(
                                $("<div/>")
                                    .addClass("email-not-received")
                                    .text(i18n.get(new LocKey("GLoginDialog", "text.email-not-received-part-1")) + " ")
                                    .append(
                                        $("<span/>")
                                            .addClass("link")
                                            .text(i18n.get(new LocKey("GLoginDialog", "text.email-not-received-part-2")))
                                            .on("click", async () => {
                                                (trackEvent("login-signup_account-created_send-activation-email", null, true),
                                                    this._showMessage(),
                                                    this._toggleLoading(true));
                                                try {
                                                    const webUrl = this._webUrl,
                                                        appUrl = this._appUrl;
                                                    this._gApi
                                                        .resendEmailConfirmation({
                                                            email: userData.email,
                                                            force: true,
                                                            webUrl: webUrl,
                                                            appUrl: appUrl,
                                                        })
                                                        .then((response) => this._showMessage(response && response.message, "info"))
                                                        .catch((error) => this._handleError(error));
                                                } finally {
                                                    this._toggleLoading(false);
                                                }
                                            })
                                    )
                            ),
                        this._modal.append(leftElement).append(rightElement),
                        this._modal.removeClass("hide"),
                        this._overlay.removeClass("hide"));
                }),
                (GCloudUiLoginDialog.prototype._getStatMappedForm = function () {
                    let formName = null;
                    switch (this._activePanel) {
                        case GCloudUiLoginDialog.Forms.SignIn:
                            formName = "login";
                            break;
                        case GCloudUiLoginDialog.Forms.SignUp:
                            formName = "create-account";
                            break;
                        case GCloudUiLoginDialog.Forms.ResetPassword:
                            formName = "forgot-password";
                            break;
                        case GCloudUiLoginDialog.Forms.Thanks:
                            formName = "account-created";
                            break;
                        default:
                            formName = "login";
                    }
                    return formName;
                }),
                (GCloudUiLoginDialog.prototype._getUTMCampaignParams = function () {
                    return this._getOptions(campaignUtils.buildStoreCampaignParams(campaignUtils.StoreCampaign.WelcomeScreen));
                }),
                (GCloudUiLoginDialog.prototype.getHTMLElement = function () {
                    return this._dialog;
                }),
                (GCloudUiLoginDialog.__i18n__ = "GLoginDialog"),
                (GCloudUiLoginDialog.Impl = class {
                    openOAuth() {
                        throw new Error("Not implemented");
                    }
                    openPurchaseFlow() {
                        throw new Error("Not implemented");
                    }
                    openExternalLink() {
                        throw new Error("Not implemented");
                    }
                    close() {
                        throw new Error("Not implemented");
                    }
                    getLanguage() {
                        throw new Error("Not implemented");
                    }
                }),
                (module.exports = GCloudUiLoginDialog));
        };
