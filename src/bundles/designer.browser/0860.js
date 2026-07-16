module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(30), require(8 /* Symbol */), require(20), require(3), require(34), require(4), require(13), require(32), require(33), require(26), require(125), require(126), require(114));
        var GObject = require(1),
            GRegex = require(263),
            GSaveAction = require(40);
        const { gApi, GLoginDialog, DESIGNER: { TITLE } = {} } = require(10 /* designerConfig */),
            c = require(85),
            d = require(1252),
            u = require(859),
            p = function (e) {
                return gContainer.signWithOAuth(e);
            };
        function g(e) {
            this._closeCallback = e;
        }
        function h(e) {
            ((this._callback = e), (this._loginConfiguration = {}));
        }
        (GObject.GObject.inherit(g, GLoginDialog.Impl),
            (g.prototype.openOAuth = function (e) {
                let { dialog, provider } = e;
                p(provider)
                    .then((e) => dialog._postLogin(e))
                    .catch((e) => dialog._handleError(e));
            }),
            (g.prototype.openPurchaseFlow = async function (e) {
                let { dialog: t, options: n = {} } = e;
                (await gDesigner.openPaymentDialog(null, n).catch(() => null), t.close());
            }),
            (g.prototype.openExternalLink = function (e) {
                let { link } = e;
                gContainer.openExternalLink(null, link);
            }),
            (g.prototype.close = function () {
                this._closeCallback();
            }),
            (g.prototype.getLanguage = function () {
                return GObject.GLocale.getLanguage();
            }),
            GObject.GObject.inherit(h, GObject.GObject),
            (h.prototype._callback = null),
            (h.prototype._newTitle = null),
            (h.prototype._oldTitle = null),
            (h.prototype._loginConfiguration = null),
            (h.prototype._popupInfo = null),
            (h.prototype.open = function () {
                var e = this;
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const n = u.getRuntimeCode();
                this._loginConfiguration = Object.assign({ runtime: n }, t);
                const { anonymous: i = false, animate: a = false, version: l = "", options: c = {} } = t;
                let h;
                if (
                    ((this._oldTitle = document.title),
                    (this._newTitle = GObject.GLocale.get(new GObject.GLocaleKey("GEmbeddedLogin", "text.title"))),
                    (document.title = this._newTitle),
                    gDesigner.isOffline())
                ) {
                    this._frame = $("<div></div>").addClass("cross-frame").toggleClass("g-anonymous", i).appendTo($("body"));
                    const e = new g(() => this.close());
                    new GLoginDialog({
                        impl: e,
                        gApi: gApi,
                        origin: location.origin,
                        anonymous: i,
                        version: l,
                        options: c,
                        runtime: n,
                    }).open(this._frame);
                } else {
                    const t = this._buildURL(this._loginConfiguration);
                    ((this._crossFrame = new d({
                        className: i ? "g-anonymous" : "",
                        oauth: (e) =>
                            p(e.provider)
                                .then((e) => this._crossFrame.postMessage({ cmd: "postLogin", user: e }, "*"))
                                .catch((t) => this._handleOAuthError(e.provider, t)),
                        close: function () {
                            let { token } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return e.close(token);
                        },
                    }).open(t)),
                        a && ((h = this._crossFrame.getFrame()), h.css({ position: "fixed", height: "300%" }), h.on("load", f)));
                }
                function f() {
                    h && (h.animate({ height: "100%" }, "slow"), h.off("load", f));
                }
            }),
            (h.prototype._handleOAuthError = function (e, t) {
                t && t.code === gApi.ERROR_CODES.ERR_POPUP_HAS_BEEN_BLOCKED
                    ? this._showPopupInfo(e)
                    : this._crossFrame.postMessage({ cmd: "error", error: t }, "*");
            }),
            (h.prototype._showPopupInfo = function (e) {
                this._popupInfo && this._popupInfo.remove();
                const t = e.charAt(0).toUpperCase() + e.slice(1);
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
                                            .replace("%provider", t)
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
                    this._popupInfo.find("a").on("click", (t) => {
                        (t.preventDefault(),
                            this._popupInfo.remove(),
                            p(e)
                                .then((e) => {
                                    this._crossFrame.postMessage({ cmd: "postLogin", user: e }, "*");
                                })
                                .catch((e) => {
                                    this._crossFrame.postMessage({ cmd: "error", error: e }, "*");
                                }));
                    }),
                    this._popupInfo.appendTo($("body")));
            }),
            (h.prototype._buildURL = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const { anonymous: t = false, signup: n = false, closeable: s = true, flow, options: d = {}, runtime } = e;
                let p, g, h, f;
                if (gContainer.getRuntime() === c.Runtime.Electron) {
                    const e = gContainer.getPlatform();
                    (("darwin" !== e && "win32" !== e) || (p = window.btoa("designer://")),
                        (g = (0, GSaveAction.stringToBase64String)(gDesigner.getAssetsURL())));
                } else g = (0, GSaveAction.stringToBase64String)(location.origin);
                const m = new URL("".concat(gApi.url, "/pro/login")),
                    y = m.searchParams,
                    v = gDesigner.getSignupOptions();
                (v &&
                    Object.entries(v).forEach((e) => {
                        let [t, n] = e;
                        n && y.set(t, n);
                    }),
                    g && y.set("webUrl", g),
                    p && y.set("appUrl", p),
                    (gDesigner.showCreateAccount() || n || v) && y.set("newuser", true),
                    gDesigner.enterpriseLoginForm() && y.set("enterprise", "1"),
                    t && y.set("anonymous", t),
                    s || y.set("closeable", s),
                    flow && y.set("flow", flow),
                    gContainer.shouldBypassEmailVerification() && y.set("bypassEmailVerification", true),
                    runtime && y.set("runtime", runtime));
                var _ = new URL(window.location.href);
                if (_.searchParams) ((h = _.searchParams.get("token")), (f = _.searchParams.get("d")));
                else {
                    for (var b, w = {}; (b = GRegex.GRegex.URLQuery.NextParameter.exec(window.location.href)); ) w[b[1]] = b[2];
                    ((h = w.token), (f = w.d));
                }
                return (
                    h && y.set("token", h),
                    f && y.set("d", f),
                    Object.keys(d).forEach((e) => {
                        y.set(e, d[e]);
                    }),
                    y.set("lang", GObject.GLocale.getLanguage()),
                    m.toString()
                );
            }),
            (h.prototype.close = async function (e) {
                e && gApi.setAuthorizationToken && gApi.setAuthorizationToken(e);
                const t = await gDesigner.getUser();
                t &&
                    (this._isDeactivatedUser(t)
                        ? this._handleDeactivatedUser(t)
                        : (document.title === this._newTitle && (document.title = this._oldTitle),
                          this._crossFrame ? this._crossFrame.close() : this._frame && this._frame.remove(),
                          this._callback && this._callback(t)));
            }),
            (h.prototype._isDeactivatedUser = function (e) {
                return (!this._loginConfiguration.anonymous || !gContainer.shouldBypassEmailVerification()) && e.isDeactivated();
            }),
            (h.prototype._handleDeactivatedUser = function (e) {
                if (this._crossFrame) {
                    const { flow: e } = this._loginConfiguration;
                    if ("purchase_flow_new" === e) {
                        const e = this._buildURL(Object.assign(this._loginConfiguration, { flow: void 0 }));
                        this._crossFrame.getFrame().attr("src", e);
                    }
                }
                gDesigner.openDeactivatedUserDialog(e);
            }),
            (module.exports = h));
    };
