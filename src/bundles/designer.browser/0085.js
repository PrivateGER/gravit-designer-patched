module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(19), require(168 /* PDFFetchStream */), require(96 /* polyfill:JSON */), require(8 /* Symbol */), require(3), require(71 /* polyfill:String */), require(4), require(13), require(169 /* PDFNetworkStream */), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            GGoogleAPI = require(1036),
            designerConfig = require(10),
            ExternalFileSettingsError = _interopRequireDefault(require(734)),
            translationLoader = (_interopRequireDefault(require(355)), _interopRequireDefault(require(1037 /* GTranslationLoader */))),
            fontsProviderManager = require(255 /* FontsProviderManager */),
            defaultFontsProvider = require(590 /* DefaultFontsProvider */),
            GCategory = require(18),
            GOpenRecentAction = require(843),
            iconClassMap = require(257),
            MessageDialog = require(219),
            GSystemDialog = require(44),
            GDocumentEvent = require(78);
        function GContainer() {}
        (GObject.GObject.inherit(GContainer, GObject.GEventTarget),
            (GContainer.OpenFileRequest = function (type, content) {
                ((this._type = type), (this._content = content));
            }),
            (GContainer.OpenFileRequest.prototype.getType = function () {
                return this._type;
            }),
            (GContainer.OpenFileRequest.prototype.getContent = function () {
                return this._content;
            }),
            (GContainer.OpenFileRequest.Type = {
                Document: "document",
                Token: "token",
                DocumentOrToken: "documentOrToken",
                StoreContent: "storeContent",
                ExternalAsset: "externalAsset",
                Template: "template",
                Preset: "preset",
                MSTeamsDeepLink: "msteamsdeeplink",
            }),
            (GContainer.DeepLinking = {
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
            (GContainer.Runtime = {
                Browser: "browser",
                Chrome: "chrome",
                WebWorker: "webworker",
                Phonegap: "phonegap",
                Electron: "electron",
                PWA: "pwa",
                IPad: "ipad",
            }),
            (GContainer.GravitLanguages = [...GObject.GLocale.getAvailableLanguages()]),
            (GContainer.prototype._recentDocuments = null),
            (GContainer.prototype._deepLinking = null),
            (GContainer.prototype.getRuntime = function () {
                throw new Error("Not implemented.");
            }),
            (GContainer.prototype.getStorage = function () {
                throw new Error("Not implemented.");
            }),
            (GContainer.prototype.getRootPath = function () {
                return "";
            }),
            (GContainer.prototype.registerFontProviders = function () {
                fontsProviderManager.registerProvider(defaultFontsProvider);
            }),
            (GContainer.prototype.getSystemFontsProvider = function () {
                return null;
            }),
            (GContainer.prototype.supportsLocalFonts = function () {
                return false;
            }),
            (GContainer.prototype.getProperty = function (key) {
                return new Promise((resolve) => {
                    var rawValue = window.localStorage.getItem(key) || null;
                    resolve(rawValue ? JSON.parse(rawValue) : null);
                });
            }),
            (GContainer.prototype.setProperty = function (key, value) {
                window.localStorage.setItem(key, JSON.stringify(value));
            }),
            (GContainer.prototype.removeProperty = function (key) {
                window.localStorage.removeItem(key);
            }),
            (GContainer.prototype.getPropertyKeyByIndex = function (index) {
                return window.localStorage.key(index);
            }),
            (GContainer.prototype.getStorageLength = function () {
                return window.localStorage.length;
            }),
            (GContainer.prototype.setCookie = function (cookieOptions) {
                let { name, value } = cookieOptions;
                return navigator.cookieEnabled
                    ? ((document.cookie = "".concat(name, "=").concat(value, "; path=/")),
                      (document.cookie = "".concat(name, "=").concat(value, "; path=/; domain=").concat(designerConfig.DOMAIN)),
                      Promise.resolve())
                    : Promise.reject();
            }),
            (GContainer.prototype.handleDeepLinking = function (url) {
                const searchParams = new URL(url || window.location.href).searchParams,
                    matchedKey = Object.keys(GContainer.DeepLinking).find((key) => searchParams.has(GContainer.DeepLinking[key]));
                if (matchedKey) {
                    const deepLinkInfo = {
                        link: GContainer.DeepLinking[matchedKey],
                        options: Array.from(searchParams.entries()).reduce((acc, entry) => ((acc[entry[0]] = entry[1]), acc), {}),
                    };
                    return ((this._deepLinking = deepLinkInfo), this._deepLinking);
                }
                return null;
            }),
            (GContainer.prototype.shouldBypassEmailVerification = function () {
                return this._deepLinking && this._deepLinking.link === GContainer.DeepLinking.DirectLink;
            }),
            (GContainer.prototype.init = function (callback) {
                return (window.gDesigner && gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this), callback(this));
            }),
            (GContainer.prototype._documentEvent = function (event) {
                (event.type !== GDocumentEvent.Type.Activated && event.type !== GDocumentEvent.Type.StorageItemUpdated) || this._updateClientAPI(event.document);
            }),
            (GContainer.prototype._updateClientAPI = function (document) {
                const token = document && document.getToken();
                if (token) {
                    const activeDocument = gDesigner.getActiveDocument();
                    (!activeDocument || document === activeDocument) && designerConfig.gApi.setToken({ token: token });
                }
            }),
            (GContainer.prototype.start = function () {}),
            (GContainer.prototype.preLogin = async function () {}),
            (GContainer.prototype.signWithMagicLink = function (e, t, n) {
                return designerConfig.gApi.magicLink.authenticate(e, t, n);
            }),
            (GContainer.prototype.canUnload = function (e, t) {
                let asPromise = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                var canUnloadResult = !e && !t;
                return asPromise ? Promise.resolve(canUnloadResult) : canUnloadResult;
            }),
            (GContainer.prototype.openExternalLink = function () {}),
            (GContainer.prototype.copyToClipboard = function () {
                return Promise.resolve();
            }),
            (GContainer.prototype.initLanguage = function (callback, preferredLanguage) {
                const applySavedLanguage = () =>
                    this.getProperty("designer.settings").then(async (settings) => {
                        if (settings && settings.hasOwnProperty("language")) {
                            const savedLanguage = settings.language;
                            if (GContainer.GravitLanguages.indexOf(savedLanguage) >= 0) await translationLoader.default.setLanguage(savedLanguage);
                            else {
                                let systemLanguage = GObject.GSystem.language && GObject.GLocale.lookupLanguage(GObject.GSystem.language);
                                systemLanguage && GContainer.GravitLanguages.includes(systemLanguage)
                                    ? await translationLoader.default.setLanguage(systemLanguage)
                                    : await translationLoader.default.setLanguage(GObject.GLocaleLanguage.English);
                            }
                        }
                    });
                if (preferredLanguage)
                    return new Promise(async (resolve) => {
                        try {
                            (await applyLanguage(preferredLanguage), callback && callback(), resolve());
                        } catch (t) {
                            (await applySavedLanguage(), callback && callback(), resolve());
                        }
                    });
                async function applyLanguage(languageCode) {
                    const resolvedLanguage = GObject.GLocale.lookupLanguage(languageCode);
                    null !== resolvedLanguage &&
                        (GContainer.GravitLanguages.indexOf(resolvedLanguage) >= 0
                            ? ("undefined" != typeof gDesigner && gDesigner.setSetting("language", resolvedLanguage), await translationLoader.default.setLanguage(resolvedLanguage))
                            : await translationLoader.default.setLanguage(GObject.GLocaleLanguage.English));
                }
                designerConfig.gApi
                    .getUser()
                    .then(async (user) => {
                        (user && !user.anonymous ? await applyLanguage(user.locale) : await applySavedLanguage(), callback && callback());
                    })
                    .catch(async () => {
                        (await applySavedLanguage(), callback && callback());
                    });
            }),
            (GContainer.prototype.newDocumentActionPerformed = function (callback) {
                callback && callback();
            }),
            (GContainer.prototype.getRecentDocuments = function () {
                return this._recentDocuments || [];
            }),
            (GContainer.prototype.isRecentDocument = function (document) {
                return (
                    !!(document && this._recentDocuments && this._recentDocuments.length) && !!this._recentDocuments.find((recentDocument) => recentDocument._id === document._id)
                );
            }),
            (GContainer.prototype.updateRecentDocumentsAction = function (documents) {
                var targetMenu;
                this._recentDocuments = documents;
                const mainMenu = gDesigner.getMainMenu();
                if (mainMenu) {
                    const fileMenuItem = (targetMenu = mainMenu.findItem(GObject.GLocale.get(GCategory.CATEGORY_FILE.label)));
                    if (fileMenuItem && fileMenuItem.getMenu()) {
                        const openRecentMenuItem = fileMenuItem.getMenu().findItem(GObject.GLocale.get(GCategory.CATEGORY_FILE_OPEN_RECENT.label).split("/")[1]);
                        openRecentMenuItem && (targetMenu = openRecentMenuItem.getMenu());
                    }
                }
                if (targetMenu)
                    if ((targetMenu.clearItems(), documents.length > 0))
                        for (var pendingSeparator = documents[0] instanceof this._storage.constructor.Item, a = 0; a < documents.length; ++a) {
                            let recentDocument = documents[a];
                            recentDocument instanceof this._storage.constructor.Item || !pendingSeparator || (gDesigner.addMenuSeparator(targetMenu), (pendingSeparator = false));
                            const iconClass = this.getRecentDocumentIconClass(recentDocument),
                                label = recentDocument.getName() + "." + recentDocument.getExtension().toLowerCase();
                            gDesigner.addMenuItem(targetMenu, label, iconClass, null, null, function () {
                                try {
                                    gDesigner.openDocument(recentDocument);
                                } catch (error) {
                                    if (!(error instanceof ExternalFileSettingsError.default)) throw error;
                                    GSystemDialog.externalFileError(true);
                                }
                            });
                        }
                    else {
                        var menuItem = gDesigner.addMenuItem(targetMenu);
                        gDesigner.updateMenuItem(menuItem, GObject.GLocale.get(GOpenRecentAction.TITLE), false, false);
                    }
            }),
            (GContainer.prototype.getRecentDocumentIconClass = function (item) {
                return item instanceof this._storage.constructor.Item
                    ? null
                    : "[Object GGoogleDriveStorage.Item]" === item.toString()
                      ? "gravit-icon-googledrive-logo"
                      : "[Object GSharePointStorage.Item]" === item.toString()
                        ? "gravit-icon-sharepoint-logo"
                        : "[Object GOneDriveBusinessStorage.Item]" === item.toString()
                          ? "gravit-icon-onedrivebusiness-logo"
                          : iconClassMap["gravit-icon-cloud-logo"];
            }),
            (GContainer.prototype.triggerClose = function () {}),
            (GContainer.prototype.getGoogleAPI = function () {
                return GGoogleAPI.GDefaultGoogleAPI;
            }),
            (GContainer.prototype.signWithOAuth = function (provider) {
                return new Promise((resolve, reject) => {
                    designerConfig.gApi
                        .popup("/auth/" + provider)
                        .then((user) => {
                            user ? resolve(user) : reject();
                        })
                        .catch((error) => {
                            let errorMessage;
                            ("string" == typeof error && (errorMessage = error),
                                !errorMessage && error && error.message && (errorMessage = error.message),
                                !errorMessage && error && error.errors && (errorMessage = error.errors.toString()),
                                !errorMessage && error && (errorMessage = error),
                                reject(errorMessage));
                        });
                });
            }),
            (GContainer.prototype.isMemoryInfoAvailable = function () {
                return false;
            }),
            (GContainer.prototype.getMemoryInfo = function () {
                return null;
            }),
            (GContainer.prototype._getJsHeapLimitSize = function () {
                return window.performance.memory ? window.performance.memory.jsHeapSizeLimit : designerConfig.JS_HEAP_SIZE_LIMIT_POYFILL;
            }),
            (GContainer.prototype._estimatingMemoryUsage = function () {
                return (
                    gDesigner
                        .getDocuments()
                        .reduce((acc, doc) => (acc + (doc && doc.getStorageItem()) ? doc.getStorageItem().documentRealFileSize : 0), 0) *
                        designerConfig.FILE_SIZE_TO_RAM_COEFFCIENT +
                    designerConfig.MIN_JS_HEAP_SIZE
                );
            }),
            (GContainer.prototype.verifyEnoughMemoryToSave = function (document) {
                try {
                    if (document && document.getStorageItem()) {
                        var estimatedMemory = this._estimatingMemoryUsage(),
                            availableMemory =
                                this._getJsHeapLimitSize() -
                                (estimatedMemory += document.getStorageItem().documentRealFileSize * designerConfig.FILE_SIZE_TO_SAVING_RAM_COEFFCIENT);
                        if (2 * document.getStorageItem().documentRealFileSize > availableMemory) {
                            var message = GObject.GLocale.get(new GObject.GLocaleKey("GContainer", "text.not-memary-enough"));
                            new MessageDialog(message).open();
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }),
            (GContainer.prototype.minimizeWindow = function () {}),
            (GContainer.prototype.maximizeWindow = function () {}),
            (GContainer.prototype.closeWindow = function () {}),
            (GContainer.prototype.getStorageDestinations = function () {
                return [];
            }),
            (GContainer.prototype.getDefaultStorageDestination = function (fileExt) {
                const destinations = this.getStorageDestinations();
                return destinations ? destinations.find((destination) => destination.isSupported(fileExt)) : null;
            }),
            (GContainer.prototype.getSharepointAuthenticator = function () {
                return null;
            }),
            (GContainer.prototype.toString = function () {
                return "[Object GContainer]";
            }),
            (GContainer.prototype.nativeShareLink = function (title, description, url) {
                return this._getNativeShareLinkInstance().share(title, description, url);
            }),
            (GContainer.prototype.isNativeShareLinkSupported = function () {
                return !!this._getNativeShareLinkInstance() && this._getNativeShareLinkInstance().isSupported();
            }),
            (GContainer.prototype._getNativeShareLinkInstance = function () {
                return null;
            }),
            (module.exports = GContainer));
    };
