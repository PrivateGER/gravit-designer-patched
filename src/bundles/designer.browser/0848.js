module.exports = function (module, exports, require) {
        "use strict";
        require(557);
        var _interopRequireDefault = require(16);
        (require(19), require(96 /* polyfill:JSON */), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(41), require(38), require(97), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            Utils = require(40),
            cloudUtils = require(593),
            GoogleToCloudRoleMap = _interopRequireDefault(require(787)),
            CloudToGoogleRoleMap = (function (e, t) {
                if ("function" == typeof WeakMap)
                    var n = new WeakMap(),
                        o = new WeakMap();
                return (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    var i,
                        a,
                        r = { __proto__: null, default: e };
                    if (null === e || ("object" != typeof e && "function" != typeof e)) return r;
                    if ((i = t ? o : n)) {
                        if (i.has(e)) return i.get(e);
                        i.set(e, r);
                    }
                    for (const t in e)
                        "default" !== t &&
                            {}.hasOwnProperty.call(e, t) &&
                            ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (a.get || a.set)
                                ? i(r, t, a)
                                : (r[t] = e[t]));
                    return r;
                })(e, t);
            })(require(789)),
            GError = _interopRequireDefault(require(594));
        const MediaUploader = require(1108),
            TokenIssuer = require(595),
            { HTTP_STATUS_CODES } = require(10 /* designerConfig */);
        function GoogleDriveClient(tokenIssuer) {
            this.setTokenIssuer(tokenIssuer);
        }
        ((GoogleDriveClient.TRIAL_UNTIL_FAIL = 3),
            (GoogleDriveClient.isUsageLimitError = function (errorBody) {
                return !(!errorBody || !errorBody.error) && Number(errorBody.error.code) === HTTP_STATUS_CODES.FORBIDDEN && errorBody.error.errors.some((error) => "usageLimits" === error.domain);
            }),
            (GoogleDriveClient.ExceptionCode = { LoginAborted: 1 }));
        class GoogleDriveException extends GError.default {
            constructor(message, code) {
                (super(message), (this.code = code), (this.__proto__ = GoogleDriveException.prototype), (this.name = "GoogleDriveException"));
            }
            toString() {
                return "[Object GoogleDriveException]";
            }
        }
        ((GoogleDriveClient.GoogleDriveException = GoogleDriveException),
            (GoogleDriveClient.prototype.setTokenIssuer = function (tokenIssuer) {
                this._tokenIssuer = tokenIssuer;
            }),
            (GoogleDriveClient.prototype.getTokenIssuerSettings = function () {
                return this._tokenIssuer ? this._tokenIssuer.getSettings() : null;
            }),
            (GoogleDriveClient.prototype.getSettings = function () {
                return this.getTokenIssuerSettings();
            }),
            (GoogleDriveClient.prototype.getAccessToken = async function () {
                return (this._tokenIssuer && (this._accessToken = await this._tokenIssuer.get()), this._accessToken);
            }),
            (GoogleDriveClient.prototype.upload = function (fileId, file, metadata) {
                let uploadType = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : GoogleDriveClient.DefaultUploadType,
                    onProgress = arguments.length > 4 ? arguments[4] : void 0;
                switch (uploadType) {
                    case GoogleDriveClient.UploadType.Simple:
                        return this._simpleUpload(fileId, file, metadata);
                    case GoogleDriveClient.UploadType.Resumable:
                        return this._resumableUpload(fileId, file, metadata, onProgress);
                }
            }),
            (GoogleDriveClient.prototype.isCorporate = function () {
                if (!this.getTokenIssuerSettings()) throw "No Token Issuer for Google";
                return this.getTokenIssuerSettings().corporate;
            }),
            (GoogleDriveClient.prototype.getCorporateProviderName = function () {
                return "google";
            }),
            (GoogleDriveClient.prototype.getFilePermissions = async function (fileId) {
                let raw = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (!this.getTokenIssuerSettings() || !this.getTokenIssuerSettings().corporate)
                    return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.only-for-corporate")));
                if (!fileId) return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.no-file-found")));
                let collectedPermissions = [];
                const accessToken = await this.getAccessToken(),
                    queryParams = { fields: "*", supportsAllDrives: true, pageSize: 50 };
                return new Promise((resolve, reject) => {
                    !(function fetchPage(pageToken) {
                        const url = new URL("https://www.googleapis.com/drive/v3/files/".concat(fileId, "/permissions")),
                            params = Object.assign({}, queryParams);
                        pageToken && (params.pageToken = pageToken);
                        for (var p in params) url.searchParams.append(p, params[p]);
                        return fetch(url.toString(), {
                            method: "GET",
                            headers: new Headers({ Authorization: "Bearer ".concat(accessToken) }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                const { permissions, nextPageToken } = data;
                                (permissions.length && (collectedPermissions = collectedPermissions.concat(permissions)),
                                    nextPageToken
                                        ? setTimeout(function () {
                                              fetchPage(nextPageToken);
                                          })
                                        : resolve(
                                              raw
                                                  ? collectedPermissions
                                                  : collectedPermissions.map((permission) => {
                                                        let { emailAddress, role } = permission;
                                                        return {
                                                            email: emailAddress,
                                                            role: GoogleToCloudRoleMap.default[role],
                                                            externalRole: role,
                                                        };
                                                    })
                                          ));
                            })
                            .catch((error) => reject(error));
                    })();
                });
            }),
            (GoogleDriveClient.prototype.createOrUpdateUserShare = async function (fileId, shareOptions) {
                if (!fileId) return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.no-file-found")));
                if (!this.getTokenIssuerSettings() || !this.getTokenIssuerSettings().corporate)
                    return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.only-for-corporate")));
                const { role: role, emailAddress: email } = shareOptions;
                if (!role || !email) return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.not-enough-parameters")));
                const existingShares = await this.getShareIdForEmail(fileId, email).catch(() => []),
                    shareRequest = { type: "user", emailAddress: email, role: CloudToGoogleRoleMap.default[role.id] };
                if (existingShares && existingShares.length > 0) {
                    const removeResult = await this.removeShare(fileId, existingShares[0]);
                    if (removeResult.error) {
                        const {
                            error: {
                                errors: [{ message }],
                            },
                        } = removeResult;
                        return Promise.reject(message);
                    }
                    if (shareRequest.role === CloudToGoogleRoleMap.NoAccessId) return removeResult;
                }
                return this._createShare(fileId, shareRequest).then((result) => {
                    if (result.error) {
                        const {
                            error: {
                                errors: [{ message: message }],
                            },
                        } = result;
                        return Promise.reject(message);
                    }
                    return result;
                });
            }),
            (GoogleDriveClient.prototype.createDomainShare = function (fileId, shareOptions) {
                if (!fileId) return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.no-file-found")));
                if (!this.getTokenIssuerSettings() || !this.getTokenIssuerSettings().corporate)
                    return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.only-for-corporate")));
                const { role: role, domain } = shareOptions;
                if (!role || !domain) return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.not-enough-parameters")));
                const shareRequest = {
                    type: "domain",
                    domain: domain,
                    role: CloudToGoogleRoleMap.default[role.id],
                    allowFileDiscovery: true,
                };
                return this._createShare(fileId, shareRequest);
            }),
            (GoogleDriveClient.prototype._createShare = async function (fileId, shareBody) {
                if (!this.getTokenIssuerSettings() || !this.getTokenIssuerSettings().corporate)
                    return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.only-for-corporate")));
                const url = new URL("https://www.googleapis.com/drive/v3/files/".concat(fileId, "/permissions")),
                    accessToken = await this.getAccessToken(),
                    queryParams = { fields: "*", supportsAllDrives: true, sendNotificationEmail: false };
                for (var r in queryParams) url.searchParams.append(r, queryParams[r]);
                return fetch(url.toString(), {
                    method: "POST",
                    headers: new Headers({
                        Authorization: "Bearer ".concat(accessToken),
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify(shareBody),
                }).then((response) => response.json());
            }),
            (GoogleDriveClient.prototype.getShareIdForEmail = async function (fileId, email) {
                return this.getTokenIssuerSettings() && this.getTokenIssuerSettings().corporate
                    ? (await this.getFilePermissions(fileId, true)).filter((permission) => {
                          let { emailAddress: permissionEmail } = permission;
                          return permissionEmail === email;
                      })
                    : Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.only-for-corporate")));
            }),
            (GoogleDriveClient.prototype.removeShare = async function (fileId, share) {
                let { id } = share;
                if (!this.getTokenIssuerSettings() || !this.getTokenIssuerSettings().corporate)
                    return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GGoogleDrive", "error.only-for-corporate")));
                const url = new URL("https://www.googleapis.com/drive/v3/files/".concat(fileId, "/permissions/").concat(id)),
                    accessToken = await this.getAccessToken(),
                    queryParams = { fields: "*", supportsAllDrives: true };
                for (var s in queryParams) url.searchParams.append(s, queryParams[s]);
                return fetch(url.toString(), {
                    method: "DELETE",
                    headers: new Headers({ Authorization: "Bearer ".concat(accessToken) }),
                }).then((response) => (204 !== response.status ? response.json() : response));
            }),
            (GoogleDriveClient.prototype._simpleUpload = async function (fileId, file, metadata) {
                const accessToken = await this.getAccessToken();
                return new Promise((resolve, reject) => {
                    var formData = new FormData();
                    (formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" })), formData.append("file", file));
                    var url = new URL("https://www.googleapis.com/upload/drive/v3/files/".concat(fileId || "")),
                        params = { uploadType: "multipart", fields: "*" };
                    for (var c in (metadata.hasOwnProperty("driveId") && (params.supportsAllDrives = true), params)) url.searchParams.append(c, params[c]);
                    fetch(url.toString(), {
                        method: fileId ? "PATCH" : "POST",
                        headers: new Headers({ Authorization: "Bearer ".concat(accessToken) }),
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((error) => {
                            (console.error(error), reject(error));
                        });
                });
            }),
            (GoogleDriveClient.prototype._resumableUpload = async function (fileId, file, metadata, onProgress) {
                const accessToken = await this.getAccessToken();
                return new Promise((resolve, reject) => {
                    var contentType = metadata.mimeType || "application/octet-stream";
                    const params = { fields: "*" };
                    (metadata.hasOwnProperty("driveId") && (params.supportsAllDrives = true),
                        new MediaUploader({
                            file: file,
                            fileId: fileId,
                            token: accessToken,
                            contentType: contentType,
                            metadata: metadata,
                            params: params,
                            onComplete: function (response) {
                                var parsedResponse;
                                try {
                                    parsedResponse = "string" == typeof response ? JSON.parse(response) : response;
                                } catch (n) {
                                    parsedResponse = response;
                                }
                                resolve(parsedResponse);
                            },
                            onError: function (error) {
                                reject(error);
                            },
                            onProgress: function (progressEvent) {
                                onProgress && onProgress(progressEvent.loaded / progressEvent.total);
                            },
                        }).upload());
                });
            }),
            (GoogleDriveClient.prototype._request = async function (url, options, signal, o) {
                o = "number" == typeof o ? o : 0;
                const accessToken = await this.getAccessToken(),
                    headers = { Authorization: "Bearer ".concat(accessToken) },
                    mergedHeaders = options.headers ? Object.assign(headers, options.headers) : headers;
                return (
                    delete options.headers,
                    fetch(url, Object.assign({ headers: new Headers(mergedHeaders), signal: signal }, options)).then(async (response) => {
                        if (!response.ok) {
                            var errorBody = await response.json();
                            return response.status === HTTP_STATUS_CODES.UNAUTHORIZED && (await gContainer.getGoogleAPI().signIn(), 0 === o)
                                ? this._request(url, options, signal, ++o)
                                : response.status === HTTP_STATUS_CODES.FORBIDDEN && GoogleDriveClient.isUsageLimitError(errorBody) && o < GoogleDriveClient.TRIAL_UNTIL_FAIL
                                  ? (await (0, Utils.sleep)(1e3 * Math.pow(1 + o, 2)), this._request(url, options, signal, ++o))
                                  : Promise.reject(errorBody);
                        }
                        return response;
                    })
                );
            }),
            (GoogleDriveClient.prototype._requestWithProgress = async function (url, options, signal, onProgress, i) {
                i = "number" == typeof i ? i : 0;
                const accessToken = await this.getAccessToken(),
                    headers = { Authorization: "Bearer ".concat(accessToken) },
                    mergedHeaders = options.headers ? Object.assign(headers, options.headers) : headers;
                delete options.headers;
                const response = await fetch(url, Object.assign({ headers: new Headers(mergedHeaders), signal: signal }, options));
                if (!response.ok) {
                    var errorBody = await response.json();
                    return response.status === HTTP_STATUS_CODES.UNAUTHORIZED && (await gContainer.getGoogleAPI().signIn(), 0 === i)
                        ? this._requestWithProgress(url, options, signal, onProgress, ++i)
                        : response.status === HTTP_STATUS_CODES.FORBIDDEN && GoogleDriveClient.isUsageLimitError(errorBody) && i < GoogleDriveClient.TRIAL_UNTIL_FAIL
                          ? (await (0, Utils.sleep)(1e3 * Math.pow(1 + i, 2)), this._requestWithProgress(url, options, signal, onProgress, ++i))
                          : Promise.reject(errorBody);
                }
                return (0, cloudUtils.readResponseWithProgress)(response, onProgress, true);
            }),
            (GoogleDriveClient.prototype.getFile = function (fileId, queryParams, signal, onProgress) {
                var url = new URL("https://www.googleapis.com/drive/v3/files/".concat(fileId, "?alt=media"));
                for (var a in queryParams) url.searchParams.append(a, queryParams[a]);
                return this._requestWithProgress(url.toString(), { method: "GET" }, signal, onProgress).then((response) => response.blob());
            }),
            (GoogleDriveClient.prototype.getFileDetails = function (fileId) {
                let queryParams = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                var url = new URL("https://www.googleapis.com/drive/v3/files/".concat(fileId, "?fields=*"));
                for (var o in queryParams) url.searchParams.append(o, queryParams[o]);
                return this._request(url.toString(), { method: "GET" }).then((response) =>
                    response.ok ? response.json() : response.json().then((errorBody) => Promise.reject(errorBody))
                );
            }),
            (GoogleDriveClient.prototype.fileExists = function (fileId) {
                let queryParams = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return this.getFileDetails(fileId, queryParams)
                    .then(() => true)
                    .catch((error) => {
                        if (error.error) {
                            if (error.error.code === HTTP_STATUS_CODES.NOT_FOUND) return false;
                            const wrappedError = new Error(error.error.message);
                            throw ((wrappedError.code = error.error.code), wrappedError);
                        }
                        throw new Error();
                    });
            }),
            (GoogleDriveClient.prototype.updateFileDetails = function (fileId) {
                let updates = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    queryParams = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                if (Object.keys(updates).length < 1) return Promise.resolve();
                var url = new URL("https://www.googleapis.com/drive/v3/files/".concat(fileId));
                for (var i in queryParams) url.searchParams.append(i, queryParams[i]);
                return this._request(url.toString(), {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updates),
                });
            }),
            (GoogleDriveClient.prototype.searchFiles = function (queryParams) {
                var url = new URL("https://www.googleapis.com/drive/v3/files");
                for (var n in queryParams) url.searchParams.append(n, queryParams[n]);
                return this._request(url.toString(), { method: "GET" }).then((response) => response.json());
            }),
            (GoogleDriveClient.prototype.searchTeamDrives = function (queryParams) {
                var url = new URL("https://www.googleapis.com/drive/v3/drives");
                for (var n in queryParams) url.searchParams.append(n, queryParams[n]);
                return this._request(url.toString(), { method: "GET" }).then((response) => response.json());
            }),
            (GoogleDriveClient.prototype.getAccountByEmail = function (email) {
                if (!email || email.indexOf("@") <= 0)
                    return Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.invalid-email")).replace("%email", email));
                var url = new URL("https://www.googleapis.com/admin/directory/v1/users/".concat(email, "?viewType=domain_public"));
                return this._request(url.toString(), { method: "GET" }).then((response) => response.json());
            }),
            (GoogleDriveClient.prototype.supportsEmailDomainCheck = async function () {
                const tokenInfo = await this.getTokenInfo().catch(() => null);
                if (!tokenInfo) return false;
                const { scope } = tokenInfo;
                return Array.isArray(scope) ? scope.some((scopeEntry) => hasAdminDirectoryScope(scopeEntry)) : hasAdminDirectoryScope(scope);
                function hasAdminDirectoryScope(scopeValue) {
                    return scopeValue.indexOf("admin.directory.user") >= 0;
                }
            }),
            (GoogleDriveClient.prototype.getTokenInfo = async function () {
                var url = new URL("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=".concat(await this.getAccessToken()));
                return this._request(url.toString(), { method: "GET" }).then((response) => response.json());
            }),
            (GoogleDriveClient.MimeType = { Folder: "application/vnd.google-apps.folder" }),
            (GoogleDriveClient.Kind = { TeamDrive: "drive#teamDrive", Drive: "drive#drive" }),
            (GoogleDriveClient.UploadType = { Simple: "simple", Resumable: "resumeable" }),
            (GoogleDriveClient.DefaultUploadType = GoogleDriveClient.UploadType.Resumable),
            (GoogleDriveClient.CloudToGoogleRoleMap = CloudToGoogleRoleMap.default),
            (GoogleDriveClient.GoogleToCloudRoleMap = GoogleToCloudRoleMap.default),
            (GoogleDriveClient.SearchEngine = {
                Sorts: { Ascending: "", Descending: "desc" },
                OrderBy: {
                    CreatedTime: "createdTime",
                    ModifiedTime: "modifiedTime",
                    Name: "name",
                    ViewedByMeTime: "viewedByMeTime",
                },
            }),
            (GoogleDriveClient.build = function (tokenConfig) {
                if (!tokenConfig) {
                    if (!gContainer.getGoogleAPI().isLoaded()) throw Error("Google Drive Client not loaded!");
                    tokenConfig = gContainer.getGoogleAPI().getTokenConfiguration({
                        corporate: false,
                        accountId: this._accountId,
                    });
                }
                return new GoogleDriveClient(new TokenIssuer(tokenConfig));
            }),
            (module.exports = GoogleDriveClient));
    };
