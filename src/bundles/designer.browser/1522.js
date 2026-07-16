module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(8 /* Symbol */), require(20), require(3), require(34));
        var designerConfig = require(10),
            GObject = require(1),
            r = o(require(78));
        const GSystemDialog = require(44),
            l = require(863),
            c = require(85),
            d = require(805),
            u = require(292),
            { bypassEmailVerification: p } = designerConfig.defaultUserSettings;
        function g(e) {
            this._htmlElement = e;
        }
        (GObject.GObject.inherit(g, GObject.GObject),
            (g.prototype._interval = null),
            (g.prototype._needToShow = false),
            (g.prototype.init = function () {
                (this.update(),
                    gDesigner.addEventListener(d, this._userPropertiesChangedEvent, this),
                    gDesigner.addEventListener(u, this._userLoggedEvent, this),
                    gDesigner.addEventListener(r.default, this._documentEvent, this));
            }),
            (g.prototype.update = async function () {
                return gDesigner.getUser().then((e) => this._updateInfo(e));
            }),
            (g.prototype._userPropertiesChangedEvent = function (e) {
                this._updateInfo(e.user);
            }),
            (g.prototype._togglePanel = function (e) {
                "boolean" == typeof e && ((!e && !this._needToShow) || e) && gDesigner.setPartVisible(l.Info, e);
            }),
            (g.prototype._userLoggedEvent = function (e) {
                this._updateInfo(e.user);
            }),
            (g.prototype._documentEvent = function (e) {
                (this._togglePanel(false), this._updateSaveInfo(e), this._updateDocumentSubscription(e));
            }),
            (g.prototype._updateSaveInfo = function () {}),
            (g.prototype._updateDocumentSubscription = function () {}),
            (g.prototype._updateInfo = function (e) {
                if (
                    (this._togglePanel(false),
                    this._interval && clearInterval(this._interval),
                    !p &&
                        gDesigner.isEnabledSubscriptions() &&
                        !gDesigner.getLicense().isGuest() &&
                        e &&
                        !e.isEmailVerified() &&
                        !e.isAnonymous())
                ) {
                    ((this._interval = setInterval(this.update.bind(this), designerConfig.DateAPI.daysToMilliseconds(1))),
                        designerConfig.gApi.listen("/confirmation", () => this.update(), true));
                    let t = new Date(e.created);
                    e.email_expire && (t = new Date(e.email_expire));
                    let n = GObject.GLocale.get(new GObject.GLocaleKey("GInfo", "text.title")).replace("%date", GObject.GLocale.toLocaleDate(t));
                    (this._htmlElement
                        .empty()
                        .append($("<span></span>").text(n))
                        .append(
                            $("<span/>")
                                .addClass("link")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GInfo", "text.resend-email")))
                                .on("click", () => {
                                    let t, n;
                                    if (gContainer.getRuntime() === c.Runtime.Electron) {
                                        const e = gContainer.getPlatform();
                                        (("darwin" !== e && "win32" !== e) || (t = "designer://"), (n = gDesigner.getAssetsURL()));
                                    } else n = location.origin;
                                    return (
                                        designerConfig.gApi
                                            .resendEmailConfirmation({
                                                appUrl: t,
                                                webUrl: n,
                                                email: e.email,
                                                force: true,
                                                origin: location.origin,
                                            })
                                            .then(() => {
                                                GSystemDialog.custom({
                                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GInfo", "text.email-sent")),
                                                    subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GInfo", "text.email-sent-submessage")),
                                                    icon: "ok",
                                                });
                                            })
                                            .catch((e) => {
                                                GSystemDialog.custom({
                                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GInfo", "text.something-went-wrong")),
                                                    subtitle: designerConfig.gApi.formatError(e),
                                                });
                                            }),
                                        false
                                    );
                                })
                        ),
                        this._togglePanel(true));
                }
            }),
            (g.prototype.toString = function () {
                return "[Object GInfo]";
            }),
            (module.exports = g));
    };
