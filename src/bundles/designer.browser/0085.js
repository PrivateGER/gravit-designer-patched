module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(19), require(168 /* PDFFetchStream */), require(96 /* polyfill:JSON */), require(8 /* Symbol */), require(3), require(71 /* polyfill:String */), require(4), require(13), require(169 /* PDFNetworkStream */), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            GGoogleAPI = require(1036),
            designerConfig = require(10),
            s = _interopRequireDefault(require(734)),
            l = (_interopRequireDefault(require(355)), _interopRequireDefault(require(1037 /* GTranslationLoader */))),
            c = require(255),
            d = require(590),
            GCategory = require(18),
            p = require(843),
            g = require(257),
            h = require(219),
            GSystemDialog = require(44),
            m = require(78);
        function y() {}
        (GObject.GObject.inherit(y, GObject.GEventTarget),
            (y.OpenFileRequest = function (e, t) {
                ((this._type = e), (this._content = t));
            }),
            (y.OpenFileRequest.prototype.getType = function () {
                return this._type;
            }),
            (y.OpenFileRequest.prototype.getContent = function () {
                return this._content;
            }),
            (y.OpenFileRequest.Type = {
                Document: "document",
                Token: "token",
                DocumentOrToken: "documentOrToken",
                StoreContent: "storeContent",
                ExternalAsset: "externalAsset",
                Template: "template",
                Preset: "preset",
                MSTeamsDeepLink: "msteamsdeeplink",
            }),
            (y.DeepLinking = {
                ProCoupon: "procoupon",
                PurchaseFlow: "purchase_flow",
                PurchaseFlowNew: "purchase_flow_new",
                Purchase: "purchase",
                ResetPassword: designerConfig.PasswordlessAuthenticationActions.ResetPassword,
                SetPassword: designerConfig.PasswordlessAuthenticationActions.SetPassword,
                PasswordlessToken: designerConfig.PasswordlessAuthenticationActions.PasswordlessToken,
                ConfirmEmail: "confirm_email",
                Account: "account",
                Purchases: "purchases",
                EnterpriseLogIn: "enterprise",
                DirectLink: "directlink",
                ResetTrial: "reset_trial",
                PWADialog: "pwainstall",
                FocusAnnot: "annot",
                CreateShare: "create_share",
                ActivateTrial: "activate_trial",
            }),
            (y.Runtime = {
                Browser: "browser",
                Chrome: "chrome",
                WebWorker: "webworker",
                Phonegap: "phonegap",
                Electron: "electron",
                PWA: "pwa",
                IPad: "ipad",
            }),
            (y.GravitLanguages = [...GObject.GLocale.getAvailableLanguages()]),
            (y.prototype._recentDocuments = null),
            (y.prototype._deepLinking = null),
            (y.prototype.getRuntime = function () {
                throw new Error("Not implemented.");
            }),
            (y.prototype.getStorage = function () {
                throw new Error("Not implemented.");
            }),
            (y.prototype.getRootPath = function () {
                return "";
            }),
            (y.prototype.registerFontProviders = function () {
                c.registerProvider(d);
            }),
            (y.prototype.getSystemFontsProvider = function () {
                return null;
            }),
            (y.prototype.supportsLocalFonts = function () {
                return false;
            }),
            (y.prototype.getProperty = function (e) {
                return new Promise((t) => {
                    var n = window.localStorage.getItem(e) || null;
                    t(n ? JSON.parse(n) : null);
                });
            }),
            (y.prototype.setProperty = function (e, t) {
                window.localStorage.setItem(e, JSON.stringify(t));
            }),
            (y.prototype.removeProperty = function (e) {
                window.localStorage.removeItem(e);
            }),
            (y.prototype.getPropertyKeyByIndex = function (e) {
                return window.localStorage.key(e);
            }),
            (y.prototype.getStorageLength = function () {
                return window.localStorage.length;
            }),
            (y.prototype.setCookie = function (e) {
                let { name, value } = e;
                return navigator.cookieEnabled
                    ? ((document.cookie = "".concat(name, "=").concat(value, "; path=/")),
                      (document.cookie = "".concat(name, "=").concat(value, "; path=/; domain=").concat(designerConfig.DOMAIN)),
                      Promise.resolve())
                    : Promise.reject();
            }),
            (y.prototype.handleDeepLinking = function (e) {
                const t = new URL(e || window.location.href).searchParams,
                    n = Object.keys(y.DeepLinking).find((e) => t.has(y.DeepLinking[e]));
                if (n) {
                    const e = {
                        link: y.DeepLinking[n],
                        options: Array.from(t.entries()).reduce((e, t) => ((e[t[0]] = t[1]), e), {}),
                    };
                    return ((this._deepLinking = e), this._deepLinking);
                }
                return null;
            }),
            (y.prototype.shouldBypassEmailVerification = function () {
                return this._deepLinking && this._deepLinking.link === y.DeepLinking.DirectLink;
            }),
            (y.prototype.init = function (e) {
                return (window.gDesigner && gDesigner.addEventListener(m, this._documentEvent, this), e(this));
            }),
            (y.prototype._documentEvent = function (e) {
                (e.type !== m.Type.Activated && e.type !== m.Type.StorageItemUpdated) || this._updateClientAPI(e.document);
            }),
            (y.prototype._updateClientAPI = function (e) {
                const t = e && e.getToken();
                if (t) {
                    const n = gDesigner.getActiveDocument();
                    (!n || e === n) && designerConfig.gApi.setToken({ token: t });
                }
            }),
            (y.prototype.start = function () {}),
            (y.prototype.preLogin = async function () {}),
            (y.prototype.signWithMagicLink = function (e, t, n) {
                return designerConfig.gApi.magicLink.authenticate(e, t, n);
            }),
            (y.prototype.canUnload = function (e, t) {
                let n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                var o = !e && !t;
                return n ? Promise.resolve(o) : o;
            }),
            (y.prototype.openExternalLink = function () {}),
            (y.prototype.copyToClipboard = function () {
                return Promise.resolve();
            }),
            (y.prototype.initLanguage = function (e, t) {
                const n = () =>
                    this.getProperty("designer.settings").then(async (e) => {
                        if (e && e.hasOwnProperty("language")) {
                            const t = e.language;
                            if (y.GravitLanguages.indexOf(t) >= 0) await l.default.setLanguage(t);
                            else {
                                let e = GObject.GSystem.language && GObject.GLocale.lookupLanguage(GObject.GSystem.language);
                                e && y.GravitLanguages.includes(e)
                                    ? await l.default.setLanguage(e)
                                    : await l.default.setLanguage(GObject.GLocaleLanguage.English);
                            }
                        }
                    });
                if (t)
                    return new Promise(async (i) => {
                        try {
                            (await o(t), e && e(), i());
                        } catch (t) {
                            (await n(), e && e(), i());
                        }
                    });
                async function o(e) {
                    const t = GObject.GLocale.lookupLanguage(e);
                    null !== t &&
                        (y.GravitLanguages.indexOf(t) >= 0
                            ? ("undefined" != typeof gDesigner && gDesigner.setSetting("language", t), await l.default.setLanguage(t))
                            : await l.default.setLanguage(GObject.GLocaleLanguage.English));
                }
                designerConfig.gApi
                    .getUser()
                    .then(async (t) => {
                        (t && !t.anonymous ? await o(t.locale) : await n(), e && e());
                    })
                    .catch(async () => {
                        (await n(), e && e());
                    });
            }),
            (y.prototype.newDocumentActionPerformed = function (e) {
                e && e();
            }),
            (y.prototype.getRecentDocuments = function () {
                return this._recentDocuments || [];
            }),
            (y.prototype.isRecentDocument = function (e) {
                return (
                    !!(e && this._recentDocuments && this._recentDocuments.length) && !!this._recentDocuments.find((t) => t._id === e._id)
                );
            }),
            (y.prototype.updateRecentDocumentsAction = function (e) {
                var t;
                this._recentDocuments = e;
                const n = gDesigner.getMainMenu();
                if (n) {
                    const e = (t = n.findItem(GObject.GLocale.get(GCategory.CATEGORY_FILE.label)));
                    if (e && e.getMenu()) {
                        const n = e.getMenu().findItem(GObject.GLocale.get(GCategory.CATEGORY_FILE_OPEN_RECENT.label).split("/")[1]);
                        n && (t = n.getMenu());
                    }
                }
                if (t)
                    if ((t.clearItems(), e.length > 0))
                        for (var o = e[0] instanceof this._storage.constructor.Item, a = 0; a < e.length; ++a) {
                            let n = e[a];
                            n instanceof this._storage.constructor.Item || !o || (gDesigner.addMenuSeparator(t), (o = false));
                            const i = this.getRecentDocumentIconClass(n),
                                r = n.getName() + "." + n.getExtension().toLowerCase();
                            gDesigner.addMenuItem(t, r, i, null, null, function () {
                                try {
                                    gDesigner.openDocument(n);
                                } catch (e) {
                                    if (!(e instanceof s.default)) throw e;
                                    GSystemDialog.externalFileError(true);
                                }
                            });
                        }
                    else {
                        var r = gDesigner.addMenuItem(t);
                        gDesigner.updateMenuItem(r, GObject.GLocale.get(p.TITLE), false, false);
                    }
            }),
            (y.prototype.getRecentDocumentIconClass = function (e) {
                return e instanceof this._storage.constructor.Item
                    ? null
                    : "[Object GGoogleDriveStorage.Item]" === e.toString()
                      ? "gravit-icon-googledrive-logo"
                      : "[Object GSharePointStorage.Item]" === e.toString()
                        ? "gravit-icon-sharepoint-logo"
                        : "[Object GOneDriveBusinessStorage.Item]" === e.toString()
                          ? "gravit-icon-onedrivebusiness-logo"
                          : g["gravit-icon-cloud-logo"];
            }),
            (y.prototype.triggerClose = function () {}),
            (y.prototype.getGoogleAPI = function () {
                return GGoogleAPI.GDefaultGoogleAPI;
            }),
            (y.prototype.signWithOAuth = function (e) {
                return new Promise((t, n) => {
                    designerConfig.gApi
                        .popup("/auth/" + e)
                        .then((e) => {
                            e ? t(e) : n();
                        })
                        .catch((e) => {
                            let t;
                            ("string" == typeof e && (t = e),
                                !t && e && e.message && (t = e.message),
                                !t && e && e.errors && (t = e.errors.toString()),
                                !t && e && (t = e),
                                n(t));
                        });
                });
            }),
            (y.prototype.isMemoryInfoAvailable = function () {
                return false;
            }),
            (y.prototype.getMemoryInfo = function () {
                return null;
            }),
            (y.prototype._getJsHeapLimitSize = function () {
                return window.performance.memory ? window.performance.memory.jsHeapSizeLimit : designerConfig.JS_HEAP_SIZE_LIMIT_POYFILL;
            }),
            (y.prototype._estimatingMemoryUsage = function () {
                return (
                    gDesigner
                        .getDocuments()
                        .reduce((e, t) => (e + (t && t.getStorageItem()) ? t.getStorageItem().documentRealFileSize : 0), 0) *
                        designerConfig.FILE_SIZE_TO_RAM_COEFFCIENT +
                    designerConfig.MIN_JS_HEAP_SIZE
                );
            }),
            (y.prototype.verifyEnoughMemoryToSave = function (e) {
                try {
                    if (e && e.getStorageItem()) {
                        var t = this._estimatingMemoryUsage(),
                            n =
                                this._getJsHeapLimitSize() -
                                (t += e.getStorageItem().documentRealFileSize * designerConfig.FILE_SIZE_TO_SAVING_RAM_COEFFCIENT);
                        if (2 * e.getStorageItem().documentRealFileSize > n) {
                            var o = GObject.GLocale.get(new GObject.GLocaleKey("GContainer", "text.not-memary-enough"));
                            new h(o).open();
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            }),
            (y.prototype.minimizeWindow = function () {}),
            (y.prototype.maximizeWindow = function () {}),
            (y.prototype.closeWindow = function () {}),
            (y.prototype.getStorageDestinations = function () {
                return [];
            }),
            (y.prototype.getDefaultStorageDestination = function (e) {
                const t = this.getStorageDestinations();
                return t ? t.find((t) => t.isSupported(e)) : null;
            }),
            (y.prototype.getSharepointAuthenticator = function () {
                return null;
            }),
            (y.prototype.toString = function () {
                return "[Object GContainer]";
            }),
            (y.prototype.nativeShareLink = function (e, t, n) {
                return this._getNativeShareLinkInstance().share(e, t, n);
            }),
            (y.prototype.isNativeShareLinkSupported = function () {
                return !!this._getNativeShareLinkInstance() && this._getNativeShareLinkInstance().isSupported();
            }),
            (y.prototype._getNativeShareLinkInstance = function () {
                return null;
            }),
            (module.exports = y));
    };
