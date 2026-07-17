module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.GGoogleAPI = exports.GDefaultGoogleAPI = void 0), require(19), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(26));
        var designerConfig = require(10),
            GObject = require(1);
        class GoogleAPIBase {
            isLoaded() {
                return true;
            }
            init() {
                let {
                    appId,
                    apiKey,
                    clientId,
                    discoveryDocs,
                    scope,
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                throw "Not implemented";
            }
            isSignedIn() {
                throw "Not implemented";
            }
            listenSignInStateChanges(callback) {}
            install(parentElement) {}
            signIn() {
                throw "Not implemented";
            }
            signOut() {
                throw "Not implemented";
            }
            getTokenConfiguration(result) {
                throw "Not implemented";
            }
            loadFilePicker() {
                throw "Not implemented";
            }
            openFilePicker(onPicked, onError) {
                throw "Not implemented";
            }
            getBasicProfile() {
                throw "Not implemented";
            }
            getAccessToken() {
                throw "Not implemented";
            }
            getRefreshToken() {
                throw "Not implemented";
            }
        }
        exports.GGoogleAPI = GoogleAPIBase;
        exports.GDefaultGoogleAPI = new (class extends GoogleAPIBase {
            isLoaded() {
                return !!window.gapi;
            }
            async init() {
                let {
                    appId: appId,
                    apiKey: apiKey,
                    clientId: clientId,
                    discoveryDocs: discoveryDocs,
                    scope: scope,
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return (
                    (this._appId = appId),
                    (this._apiKey = apiKey),
                    (this._clientId = clientId),
                    (this._discoveryDocs = discoveryDocs),
                    (this._scope = scope),
                    await new Promise((resolve, reject) => {
                        gapi.load("client", { callback: resolve, onerror: reject });
                    }),
                    await gapi.client.init({ apiKey: apiKey, discoveryDocs: discoveryDocs }),
                    new Promise(async (resolve, reject) => {
                        try {
                            const emailHint = await gContainer.getProperty("googleapi_auth_email_hint");
                            ((this._tokenClient = google.accounts.oauth2.initTokenClient({
                                client_id: clientId,
                                scope: scope,
                                prompt: "",
                                callback: "",
                                hint: emailHint || "",
                                error_callback: () => location.reload(),
                            })),
                                resolve());
                        } catch (e) {
                            reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed")));
                        }
                    })
                );
            }
            async isSignedIn() {
                if (this.isLoaded()) {
                    const authKey = await gContainer.getProperty("googleapi_auth_key");
                    return fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=".concat(authKey && authKey.access_token))
                        .then((response) => response.json())
                        .then((tokenInfo) => !!tokenInfo.email)
                        .catch(() => false);
                }
                return false;
            }
            install(parentElement) {
                const scriptPromises = [],
                    loadScript = (url) =>
                        new Promise((resolve, reject) => {
                            let scriptElement = document.createElement("script");
                            ((scriptElement.async = true),
                                (scriptElement.src = url),
                                (scriptElement.onload = resolve),
                                (scriptElement.onerror = reject),
                                (parentElement || document.getElementsByTagName("head")[0]).appendChild(scriptElement));
                        });
                return (
                    scriptPromises.push(loadScript("https://apis.google.com/js/api.js")),
                    scriptPromises.push(loadScript("https://accounts.google.com/gsi/client")),
                    Promise.all(scriptPromises)
                );
            }
            async signIn() {
                return (
                    await gContainer.setProperty("googleapi_auth_key", null),
                    new Promise(async (resolve, reject) => {
                        try {
                            const emailHint = await gContainer.getProperty("googleapi_auth_email_hint");
                            ((this._tokenClient.callback = async (tokenResponse) => {
                                tokenResponse.error && reject();
                                const token = gapi.client.getToken(),
                                    authKey = {
                                        access_token: token.access_token,
                                        expires_at: 1e3 * token.expires_in + Date.now(),
                                    };
                                (await gContainer.setProperty("googleapi_auth_key", authKey), resolve());
                            }),
                                this._tokenClient.requestAccessToken({
                                    prompt: "",
                                    hint: emailHint || "",
                                }));
                        } catch (e) {
                            reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed")));
                        }
                    })
                );
            }
            async signOut() {
                this._picker && delete this._picker;
                const authKey = await gContainer.getProperty("googleapi_auth_key");
                (await google.accounts.oauth2.revoke(authKey && authKey.access_token),
                    gapi.client.setToken(null),
                    gContainer.setProperty("googleapi_auth_key", null),
                    gContainer.setProperty("googleapi_auth_email_hint", null));
            }
            async getTokenConfiguration() {
                let result = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const authKey = await gContainer.getProperty("googleapi_auth_key");
                return Object.assign(result, {
                    accessToken: authKey.access_token,
                    expires: authKey.expires_at,
                    corporate: false,
                });
            }
            async loadFilePicker() {
                return new Promise((resolve, reject) => {
                    gapi.load("picker", {
                        timeout: 2e4,
                        callback: resolve,
                        ontimeout: () => reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed"))),
                        onerror: () => reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed"))),
                    });
                });
            }
            async openFilePicker(onPicked, onError) {
                try {
                    (await this.isSignedIn()) || (await this.signIn());
                    const accessToken = (await gContainer.getProperty("googleapi_auth_key")).access_token;
                    (this._picker && delete this._picker,
                        (this._picker = (0, designerConfig.GooglePickerBuilder)({
                            appId: this._appId,
                            apiKey: this._apiKey,
                            accessToken: accessToken,
                            language: GObject.GLocale.getLanguage(),
                        })),
                        this._picker.setCallback((pickerData) => {
                            pickerData.action === google.picker.Action.PICKED && onPicked(pickerData.docs);
                        }),
                        this._picker.setVisible(true));
                } catch (error) {
                    onError && onError(error);
                }
            }
            async getBasicProfile() {
                (await this.isSignedIn()) || (await this.signIn());
                const authKey = await gContainer.getProperty("googleapi_auth_key");
                return fetch("https://www.googleapis.com/oauth2/v3/userinfo?access_token=".concat(authKey && authKey.access_token))
                    .then((response) => response.json())
                    .then(
                        (profile) => (
                            profile.email && gContainer.setProperty("googleapi_auth_email_hint", profile.email),
                            { email: profile.email, imageUrl: profile.picture, name: profile.name }
                        )
                    )
                    .catch(() => reject(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading-failed"))));
            }
            async getAccessToken() {
                (await this.isSignedIn()) || (await this.signIn());
                const authKey = await gContainer.getProperty("googleapi_auth_key");
                return { expires: authKey.expires_at, accessToken: authKey.access_token };
            }
        })();
    };
