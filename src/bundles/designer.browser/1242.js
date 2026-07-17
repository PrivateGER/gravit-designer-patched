module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(96 /* polyfill:JSON */), require(30 /* polyfill:Object */), require(8 /* Symbol */));
        var GObject = require(1),
            cloudConfig = require(1479),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            TeamsAuthModule = _interopRequireDefault(require(443)),
            TeamsConstants = require(1243),
            Utils = require(40);
        const { getAuthenticator, getTeamsContext } = TeamsAuthModule.default;
        function MSTeamsAuthenticator() {}
        ((MSTeamsAuthenticator.Error = {
            NOT_REGISTERED: 1,
            ONEDRIVE_BUSINESS_ERROR: 2,
            SHAREPOINT_ERROR: 3,
            SHAREPOINT_ONEDRIVE_BUSINESS_ERROR: 4,
            OFFLINE: 5,
            FAILED_TO_OPEN_WINDOW: 6,
            CANCELLED_BY_USER: 7,
        }),
            (MSTeamsAuthenticator.COMMANDS = {
                ONE_DRIVE_BUSINESS_COMMAND: TeamsConstants.ONE_DRIVE_BUSINESS_COMMAND,
                SHAREPOINT_COMMAND: TeamsConstants.SHAREPOINT_COMMAND,
                MS_TEAMS_COMMAND: TeamsConstants.MS_TEAMS_COMMAND,
            }),
            (MSTeamsAuthenticator.FAIL_REASONS = {
                POPUP_WINDOW_BLOCKED: "FailedToOpenWindow",
                CANCELLED_BY_USER: "CancelledByUser",
            }),
            (MSTeamsAuthenticator._instance = null),
            (MSTeamsAuthenticator.CACHED_TOKENS_PROPERTY_NAME = "msteams.authentication.tokens"),
            (MSTeamsAuthenticator.getInstance = () => (MSTeamsAuthenticator._instance || (MSTeamsAuthenticator._instance = new MSTeamsAuthenticator()), MSTeamsAuthenticator._instance)),
            (MSTeamsAuthenticator.prototype._loaded = false),
            (MSTeamsAuthenticator.prototype._loading = false),
            (MSTeamsAuthenticator.prototype._authenticated = false),
            (MSTeamsAuthenticator.prototype._tokens = null),
            (MSTeamsAuthenticator.prototype.authenticate = async function () {
                let commands = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [TeamsConstants.MS_TEAMS_COMMAND];
                if (!(commands instanceof Array)) return this._connectDrives(commands);
                if (this._authenticated) return true;
                const self = this;
                return new Promise(
                    async (resolve, reject) => (
                        await self._authenticateCommand(commands),
                        self
                            ._authWithCorelCloud(await self.getOrFetchMSTeamsAccessToken())
                            .then((success) => {
                                success ? ((self._authenticated = true), resolve(true)) : reject();
                            })
                            .catch(() => {
                                reject();
                            })
                    )
                );
            }),
            (MSTeamsAuthenticator.prototype._connectDrives = async function (command) {
                return this._tokens[command] && this.isTokenValid(this._tokens[command])
                    ? Promise.resolve(this._tokens[command])
                    : (await this._authenticateCommand([command]), this._tokens[command]);
            }),
            (MSTeamsAuthenticator.prototype.isTokenValid = function (token) {
                return !(!token || !token.expires || token.expires <= Date.now() / 1e3);
            }),
            (MSTeamsAuthenticator.prototype.isAuthenticated = function () {
                const token = (this._tokens && this._tokens[TeamsConstants.MS_TEAMS_COMMAND]) || null;
                return !(!token || !this.isTokenValid(token)) || ((this._authenticated = false), false);
            }),
            (MSTeamsAuthenticator.prototype._authenticateCommand = async function (commands) {
                const self = this,
                    cachedTokens = await this._getValidCachedTokens(),
                    tokens = {};
                let missingCommands = [];
                if (!cachedTokens || !Object.values(cachedTokens).length) return this._processAuthenticationCommands(commands);
                for (let t = 0, a = commands.length; t < a; t++) cachedTokens[commands[t]] ? (tokens[commands[t]] = cachedTokens[commands[t]]) : missingCommands.push(commands[t]);
                return 0 === missingCommands.length ? (await self.setTokens(tokens, false), tokens) : this._processAuthenticationCommands(commands, tokens);
            }),
            (MSTeamsAuthenticator.prototype._processAuthenticationCommands = function (commands) {
                let existingTokens = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const self = this;
                return new Promise((resolve, reject) => {
                    getAuthenticator()
                        .then((authenticator) =>
                            authenticator.authenticate({
                                url: ""
                                    .concat(window.location.origin, "/msteams-sp.html#")
                                    .concat(TeamsConstants.COMMAND_QUERY_PARAM, "=")
                                    .concat(commands.join(",")),
                                width: 600,
                                height: 535,
                                successCallback: async function (rawTokens) {
                                    const parsedTokens = {};
                                    for (let command in rawTokens) {
                                        const { expires, accessToken } = rawTokens[command];
                                        parsedTokens[command] = { token: accessToken, expires: Number(expires) };
                                    }
                                    (await self.setTokens(Object.assign(existingTokens, parsedTokens)), resolve(parsedTokens));
                                },
                                failureCallback: function (reason) {
                                    reason === MSTeamsAuthenticator.FAIL_REASONS.POPUP_WINDOW_BLOCKED
                                        ? self._handleError(
                                              MSTeamsAuthenticator.Error.FAILED_TO_OPEN_WINDOW,
                                              GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.authenticate")),
                                              (event) => {
                                                  (console.log("target", event.target),
                                                      self
                                                          ._processAuthenticationCommands(commands)
                                                          .then((tokens) => {
                                                              resolve(tokens);
                                                          })
                                                          .catch((error) => {
                                                              (console.error(">>>reautherror", error), reject(error));
                                                          }));
                                              }
                                          )
                                        : reason === MSTeamsAuthenticator.FAIL_REASONS.CANCELLED_BY_USER
                                          ? (self._handleError(
                                                MSTeamsAuthenticator.Error.CANCELLED_BY_USER,
                                                GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.try-again")),
                                                () => window.location.reload()
                                            ),
                                            reject())
                                          : (self._handleError({ message: reason }), reject());
                                },
                            })
                        )
                        .catch((error) => {
                            reject(error);
                        });
                });
            }),
            (MSTeamsAuthenticator.prototype._getValidCachedTokens = async function () {
                const cachedTokens = this._getCachedTokens();
                if (!cachedTokens) return null;
                const context = await getTeamsContext(),
                    validTokens = {};
                if (cachedTokens.userId !== context.loginHint) return validTokens;
                const keys = Object.keys(cachedTokens);
                for (let t = 0, i = keys.length; t < i; t++) {
                    const token = cachedTokens[keys[t]];
                    this.isTokenValid(token) && (validTokens[keys[t]] = token);
                }
                return validTokens;
            }),
            (MSTeamsAuthenticator.prototype._getCachedTokens = function () {
                const raw = window.localStorage.getItem(MSTeamsAuthenticator.CACHED_TOKENS_PROPERTY_NAME);
                if (!raw) return null;
                let parsed = null;
                try {
                    parsed = JSON.parse((0, Utils.base64StringToString)(raw));
                } catch (e) {
                    console.error("Cant decode cache tokens");
                }
                return parsed;
            }),
            (MSTeamsAuthenticator.prototype.setTokens = async function (newTokens) {
                let persist = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                const loginHint = (await getTeamsContext()).loginHint,
                    cachedTokens = await this._getValidCachedTokens();
                ((this._tokens = Object.assign({ userId: loginHint }, cachedTokens, newTokens)),
                    persist && localStorage.setItem(MSTeamsAuthenticator.CACHED_TOKENS_PROPERTY_NAME, (0, Utils.stringToBase64String)(JSON.stringify(this._tokens))));
            }),
            (MSTeamsAuthenticator.prototype.getOrFetchMSTeamsAccessToken = async function () {
                const token = (this._tokens && this._tokens[TeamsConstants.MS_TEAMS_COMMAND]) || null;
                return (
                    (token && this.isTokenValid(token)) || ((this._authenticated = false), await this.authenticate()),
                    (this._tokens && this._tokens[TeamsConstants.MS_TEAMS_COMMAND] && this._tokens[TeamsConstants.MS_TEAMS_COMMAND].token) || null
                );
            }),
            (MSTeamsAuthenticator.prototype._handleError = function (errorCode, buttonLabel, callback) {
                let text = null;
                switch (errorCode) {
                    case MSTeamsAuthenticator.Error.OFFLINE:
                        text = GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.offline"));
                        break;
                    case MSTeamsAuthenticator.Error.ONEDRIVE_BUSINESS_ERROR:
                        text = GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.onedrive-business-error"));
                        break;
                    case MSTeamsAuthenticator.Error.SHAREPOINT_ERROR:
                        text = GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.sharepoint-error"));
                        break;
                    case MSTeamsAuthenticator.Error.SHAREPOINT_ONEDRIVE_BUSINESS_ERROR:
                        text = GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.sharepoint-onedrive-business-error"));
                        break;
                    case MSTeamsAuthenticator.Error.NOT_REGISTERED:
                        text = GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.not_registered"));
                        break;
                    case MSTeamsAuthenticator.Error.FAILED_TO_OPEN_WINDOW:
                        text = GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.failed-to-open-window"));
                        break;
                    case MSTeamsAuthenticator.Error.CANCELLED_BY_USER:
                        text = GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.cancelled-by-user"));
                        break;
                    default:
                        text = errorCode && errorCode.message ? errorCode.message : GObject.GLocale.get(new GObject.GLocaleKey("GMSTeamsAuthenticator", "text.unknown"));
                }
                GSystemDialog.default.splashScreenError(text, buttonLabel, callback);
            }),
            (MSTeamsAuthenticator.prototype._validateAuthenticatedUser = async function () {
                const user = await this.getUser();
                return !user || user.reload || user.deactivated
                    ? (this._handleError(MSTeamsAuthenticator.Error.NOT_REGISTERED), false)
                    : user && user.microsoft_corporate_config
                      ? user.microsoft_corporate_config.client_id
                          ? !!user.microsoft_corporate_config.odb_client_id || (this._handleError(MSTeamsAuthenticator.Error.ONEDRIVE_BUSINESS_ERROR), false)
                          : (this._handleError(MSTeamsAuthenticator.Error.SHAREPOINT_ERROR), false)
                      : (this._handleError(MSTeamsAuthenticator.Error.SHAREPOINT_ONEDRIVE_BUSINESS_ERROR), false);
            }),
            (MSTeamsAuthenticator.prototype._authWithCorelCloud = async function (accessToken) {
                if (this._loaded || this._loading) return false;
                this._loading = true;
                if (await cloudConfig.gApi.isOffline({ includeCredentials: false }))
                    return ((this._loading = false), this._handleError(MSTeamsAuthenticator.Error.OFFLINE), null);
                const response = await cloudConfig.gApi
                    .authenticateMsTeamsUser(accessToken)
                    .catch((error) => (console.error(">>>authenticateMsTeamsUser error", error), this._handleError(MSTeamsAuthenticator.Error.NOT_REGISTERED), null));
                if (!response || !response.ok) return (this._handleError(MSTeamsAuthenticator.Error.NOT_REGISTERED), (this._loading = false), false);
                return (await response.json().catch(() => null))
                    ? ((this._loaded = true), (this._loading = false), this._validateAuthenticatedUser())
                    : (this._handleError(MSTeamsAuthenticator.Error.NOT_REGISTERED), (this._loading = false), false);
            }),
            (MSTeamsAuthenticator.prototype.getUser = async function () {
                if (this._user) return this._user;
                const fetchedUser = await gDesigner.getUser();
                return fetchedUser ? ((this._user = fetchedUser), this._user) : null;
            }),
            (module.exports = MSTeamsAuthenticator));
    };
