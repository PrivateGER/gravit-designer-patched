module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(13), require(32), require(33), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            GRegex = require(263),
            Utils = require(40);
        const { gApi, GLoginDialog, DESIGNER: { TITLE } = {} } = require(10 /* designerConfig */),
            GContainer = require(85),
            CrossFrame = require(1252),
            runtimeCodeUtil = require(859),
            signWithProvider = function (provider) {
                return gContainer.signWithOAuth(provider);
            };
        function dialogImpl(closeCallback) {
            this._closeCallback = closeCallback;
        }
        function GEmbeddedLogin(callback) {
            ((this._callback = callback), (this._loginConfiguration = {}));
        }
        (GObject.GObject.inherit(dialogImpl, GLoginDialog.Impl),
            (dialogImpl.prototype.openOAuth = function (options) {
                let { dialog, provider } = options;
                signWithProvider(provider)
                    .then((user) => dialog._postLogin(user))
                    .catch((error) => dialog._handleError(error));
            }),
            (dialogImpl.prototype.openPurchaseFlow = async function (options) {
                let { dialog: dialog, options: purchaseOptions = {} } = options;
                (await gDesigner.openPaymentDialog(null, purchaseOptions).catch(() => null), dialog.close());
            }),
            (dialogImpl.prototype.openExternalLink = function (options) {
                let { link } = options;
                gContainer.openExternalLink(null, link);
            }),
            (dialogImpl.prototype.close = function () {
                this._closeCallback();
            }),
            (dialogImpl.prototype.getLanguage = function () {
                return GObject.GLocale.getLanguage();
            }),
            GObject.GObject.inherit(GEmbeddedLogin, GObject.GObject),
            (GEmbeddedLogin.prototype._callback = null),
            (GEmbeddedLogin.prototype._newTitle = null),
            (GEmbeddedLogin.prototype._oldTitle = null),
            (GEmbeddedLogin.prototype._loginConfiguration = null),
            (GEmbeddedLogin.prototype._popupInfo = null),
            (GEmbeddedLogin.prototype.open = function () {
                var self = this;
                let config = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const runtimeCode = runtimeCodeUtil.getRuntimeCode();
                this._loginConfiguration = Object.assign({ runtime: runtimeCode }, config);
                const { anonymous: anonymous = false, animate: animate = false, version: version = "", options: loginOptions = {} } = config;
                let loginFrame;
                if (
                    ((this._oldTitle = document.title),
                    (this._newTitle = GObject.GLocale.get(new GObject.GLocaleKey("GEmbeddedLogin", "text.title"))),
                    (document.title = this._newTitle),
                    gDesigner.isOffline())
                ) {
                    this._frame = $("<div></div>").addClass("cross-frame").toggleClass("g-anonymous", anonymous).appendTo($("body"));
                    const dialog = new dialogImpl(() => this.close());
                    new GLoginDialog({
                        impl: dialog,
                        gApi: gApi,
                        origin: location.origin,
                        anonymous: anonymous,
                        version: version,
                        options: loginOptions,
                        runtime: runtimeCode,
                    }).open(this._frame);
                } else {
                    const loginUrl = this._buildURL(this._loginConfiguration);
                    ((this._crossFrame = new CrossFrame({
                        className: anonymous ? "g-anonymous" : "",
                        oauth: (oauthRequest) =>
                            signWithProvider(oauthRequest.provider)
                                .then((user) => this._crossFrame.postMessage({ cmd: "postLogin", user: user }, "*"))
                                .catch((error) => this._handleOAuthError(oauthRequest.provider, error)),
                        close: function () {
                            let { token } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return self.close(token);
                        },
                    }).open(loginUrl)),
                        animate && ((loginFrame = this._crossFrame.getFrame()), loginFrame.css({ position: "fixed", height: "300%" }), loginFrame.on("load", onFrameLoad)));
                }
                function onFrameLoad() {
                    loginFrame && (loginFrame.animate({ height: "100%" }, "slow"), loginFrame.off("load", onFrameLoad));
                }
            }),
            (GEmbeddedLogin.prototype._handleOAuthError = function (provider, error) {
                error && error.code === gApi.ERROR_CODES.ERR_POPUP_HAS_BEEN_BLOCKED
                    ? this._showPopupInfo(provider)
                    : this._crossFrame.postMessage({ cmd: "error", error: error }, "*");
            }),
            (GEmbeddedLogin.prototype._showPopupInfo = function (provider) {
                this._popupInfo && this._popupInfo.remove();
                const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
                ((this._popupInfo = $("<div/>")
                    .addClass("g-embedded-login")
                    .addClass("popup-info")
                    .append(
                        $("<div/>")
                            .addClass("container")
                            .append(
                                $("<div/>")
                                    .addClass("message")
                                    .html(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GEmbeddedLogin", "text.pop-has-been-blocked"))
                                            .replace("%provider", providerName)
                                            .replace("%app", TITLE)
                                    )
                            )
                            .append(
                                $("<img/>")
                                    .addClass("close-button")
                                    .attr("src", "assets/icon/login/close.svg")
                                    .on("click", () => {
                                        this._popupInfo.remove();
                                    })
                            )
                    )),
                    this._popupInfo.find("a").on("click", (event) => {
                        (event.preventDefault(),
                            this._popupInfo.remove(),
                            signWithProvider(provider)
                                .then((user) => {
                                    this._crossFrame.postMessage({ cmd: "postLogin", user: user }, "*");
                                })
                                .catch((error) => {
                                    this._crossFrame.postMessage({ cmd: "error", error: error }, "*");
                                }));
                    }),
                    this._popupInfo.appendTo($("body")));
            }),
            (GEmbeddedLogin.prototype._buildURL = function () {
                let config = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const { anonymous: anonymous = false, signup: signup = false, closeable: closeable = true, flow, options: urlOptions = {}, runtime } = config;
                let appUrl, webUrl, token, dParam;
                if (gContainer.getRuntime() === GContainer.Runtime.Electron) {
                    const platform = gContainer.getPlatform();
                    (("darwin" !== platform && "win32" !== platform) || (appUrl = window.btoa("designer://")),
                        (webUrl = (0, Utils.stringToBase64String)(gDesigner.getAssetsURL())));
                } else webUrl = (0, Utils.stringToBase64String)(location.origin);
                const loginUrl = new URL("".concat(gApi.url, "/pro/login")),
                    searchParams = loginUrl.searchParams,
                    signupOptions = gDesigner.getSignupOptions();
                (signupOptions &&
                    Object.entries(signupOptions).forEach((entry) => {
                        let [key, value] = entry;
                        value && searchParams.set(key, value);
                    }),
                    webUrl && searchParams.set("webUrl", webUrl),
                    appUrl && searchParams.set("appUrl", appUrl),
                    (gDesigner.showCreateAccount() || signup || signupOptions) && searchParams.set("newuser", true),
                    gDesigner.enterpriseLoginForm() && searchParams.set("enterprise", "1"),
                    anonymous && searchParams.set("anonymous", anonymous),
                    closeable || searchParams.set("closeable", closeable),
                    flow && searchParams.set("flow", flow),
                    gContainer.shouldBypassEmailVerification() && searchParams.set("bypassEmailVerification", true),
                    runtime && searchParams.set("runtime", runtime));
                var currentUrl = new URL(window.location.href);
                if (currentUrl.searchParams) ((token = currentUrl.searchParams.get("token")), (dParam = currentUrl.searchParams.get("d")));
                else {
                    for (var match, queryParams = {}; (match = GRegex.GRegex.URLQuery.NextParameter.exec(window.location.href)); ) queryParams[match[1]] = match[2];
                    ((token = queryParams.token), (dParam = queryParams.d));
                }
                return (
                    token && searchParams.set("token", token),
                    dParam && searchParams.set("d", dParam),
                    Object.keys(urlOptions).forEach((key) => {
                        searchParams.set(key, urlOptions[key]);
                    }),
                    searchParams.set("lang", GObject.GLocale.getLanguage()),
                    loginUrl.toString()
                );
            }),
            (GEmbeddedLogin.prototype.close = async function (token) {
                token && gApi.setAuthorizationToken && gApi.setAuthorizationToken(token);
                const user = await gDesigner.getUser();
                user &&
                    (this._isDeactivatedUser(user)
                        ? this._handleDeactivatedUser(user)
                        : (document.title === this._newTitle && (document.title = this._oldTitle),
                          this._crossFrame ? this._crossFrame.close() : this._frame && this._frame.remove(),
                          this._callback && this._callback(user)));
            }),
            (GEmbeddedLogin.prototype._isDeactivatedUser = function (user) {
                return (!this._loginConfiguration.anonymous || !gContainer.shouldBypassEmailVerification()) && user.isDeactivated();
            }),
            (GEmbeddedLogin.prototype._handleDeactivatedUser = function (user) {
                if (this._crossFrame) {
                    const { flow: flowValue } = this._loginConfiguration;
                    if ("purchase_flow_new" === flowValue) {
                        const url = this._buildURL(Object.assign(this._loginConfiguration, { flow: void 0 }));
                        this._crossFrame.getFrame().attr("src", url);
                    }
                }
                gDesigner.openDeactivatedUserDialog(user);
            }),
            (module.exports = GEmbeddedLogin));
    };
