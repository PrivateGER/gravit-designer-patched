module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34));
        var designerConfig = require(10),
            GObject = require(1),
            r = _interopRequireDefault(require(78));
        const GSystemDialog = require(44),
            l = require(863),
            GContainer = require(85),
            d = require(805),
            u = require(292),
            { bypassEmailVerification } = designerConfig.defaultUserSettings;
        function g(htmlElement) {
            this._htmlElement = htmlElement;
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
                return gDesigner.getUser().then((user) => this._updateInfo(user));
            }),
            (g.prototype._userPropertiesChangedEvent = function (event) {
                this._updateInfo(event.user);
            }),
            (g.prototype._togglePanel = function (visible) {
                "boolean" == typeof visible && ((!visible && !this._needToShow) || visible) && gDesigner.setPartVisible(l.Info, visible);
            }),
            (g.prototype._userLoggedEvent = function (event) {
                this._updateInfo(event.user);
            }),
            (g.prototype._documentEvent = function (event) {
                (this._togglePanel(false), this._updateSaveInfo(event), this._updateDocumentSubscription(event));
            }),
            (g.prototype._updateSaveInfo = function () {}),
            (g.prototype._updateDocumentSubscription = function () {}),
            (g.prototype._updateInfo = function (user) {
                if (
                    (this._togglePanel(false),
                    this._interval && clearInterval(this._interval),
                    !bypassEmailVerification &&
                        gDesigner.isEnabledSubscriptions() &&
                        !gDesigner.getLicense().isGuest() &&
                        user &&
                        !user.isEmailVerified() &&
                        !user.isAnonymous())
                ) {
                    ((this._interval = setInterval(this.update.bind(this), designerConfig.DateAPI.daysToMilliseconds(1))),
                        designerConfig.gApi.listen("/confirmation", () => this.update(), true));
                    let expireDate = new Date(user.created);
                    user.email_expire && (expireDate = new Date(user.email_expire));
                    let titleText = GObject.GLocale.get(new GObject.GLocaleKey("GInfo", "text.title")).replace("%date", GObject.GLocale.toLocaleDate(expireDate));
                    (this._htmlElement
                        .empty()
                        .append($("<span></span>").text(titleText))
                        .append(
                            $("<span/>")
                                .addClass("link")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GInfo", "text.resend-email")))
                                .on("click", () => {
                                    let appUrl, webUrl;
                                    if (gContainer.getRuntime() === GContainer.Runtime.Electron) {
                                        const platform = gContainer.getPlatform();
                                        (("darwin" !== platform && "win32" !== platform) || (appUrl = "designer://"), (webUrl = gDesigner.getAssetsURL()));
                                    } else webUrl = location.origin;
                                    return (
                                        designerConfig.gApi
                                            .resendEmailConfirmation({
                                                appUrl: appUrl,
                                                webUrl: webUrl,
                                                email: user.email,
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
                                            .catch((error) => {
                                                GSystemDialog.custom({
                                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GInfo", "text.something-went-wrong")),
                                                    subtitle: designerConfig.gApi.formatError(error),
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
