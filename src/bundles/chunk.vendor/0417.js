module.exports = function (module, exports, require) {
            "use strict";
            (require(58 /* polyfill:Array */),
                require(19),
                require(96 /* polyfill:JSON */),
                require(30 /* polyfill:Object */),
                require(8 /* Symbol */),
                require(20 /* polyfill:RegExp */),
                require(107 /* polyfill:RegExp */),
                require(3),
                require(151),
                require(34),
                require(4),
                require(322),
                require(32),
                require(33),
                require(26),
                require(125),
                require(126 /* polyfill:URL */),
                require(114));
            const api = exports,
                SharingStatistics = require(938),
                GFile = require(574),
                providerIds = require(577),
                errorCodes = require(952);
            require(824);
            const {
                    getUserName,
                    isSharePointFileId,
                    isGoogleDriveFileId,
                    isSharePointFile,
                    isGoogleDriveFile,
                    isExternalFile,
                    isExternalFileId,
                    sameDomain,
                    buildQueryParams,
                } = require(254),
                { providers } = require(253);
            if (
                ((api.version = "v1"),
                Object({
                    NODE_ENV: "production",
                    APP_VERSION: "3.15.0",
                    APP_VERSION_FRIENDLY: "PlasmaTrap-patched",
                    IS_BETA: false,
                    BUILD_NUM: "8795",
                    COMMIT_SHA: "566771f4dff3952a55c0d9d3c130f7e787dfdfa7",
                    STORE_VENDOR: "",
                    IS_COREL: false,
                    IS_TRUNK: false,
                    IS_PROD: true,
                }).INCLUDE_POLYFILL_ON_CLIENT_API &&
                    "undefined" != typeof window &&
                    (!window.hasOwnProperty("URLSearchParams") || !window.hasOwnProperty("fetch") || !Array.hasOwnProperty("from")))
            ) {
                var polyfillScript = document.createElement("script");
                ((polyfillScript.src = "https://cdn.polyfill.io/v2/polyfill.min.js?features=default,URL,fetch"),
                    document.body.insertBefore(polyfillScript, document.body.firstChild));
            }
            let onlineQueue = [];
            "undefined" != typeof window &&
                window.addEventListener &&
                window.addEventListener("online", () => {
                    for (; onlineQueue.length; ) onlineQueue.pop().call(null);
                });
            const cookiesEnabled = navigator.cookieEnabled;
            let httpGet,
                httpHead,
                fetchJSON,
                hooks = {
                    beforeSendRequest: (request) => {
                        let { url, query } = request;
                    },
                    onError: (e, t, i) => {},
                };
            ((api.setHooks = function () {
                let hooksOverride = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return Object.assign(hooks, hooksOverride);
            }),
                (api.setToken = function () {
                    let authParams = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    ((httpGet = function (path) {
                        let queryParams = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            timeout = arguments.length > 2 ? arguments[2] : void 0;
                        return rawFetch(
                            buildUrl(
                                api.url + path,
                                Object.assign({}, authParams, queryParams, {
                                    lang: api.lang,
                                })
                            ),
                            {},
                            timeout
                        ).then(handleResponse);
                    }),
                        (httpHead = function (path) {
                            let queryParams = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                timeout = arguments.length > 2 ? arguments[2] : void 0;
                            return rawFetch(
                                buildUrl(
                                    api.url + path,
                                    Object.assign({}, authParams, queryParams, {
                                        lang: api.lang,
                                    })
                                ),
                                {
                                    method: "HEAD",
                                },
                                timeout
                            );
                        }),
                        (fetchJSON = function (path, requestOptions) {
                            let queryParams = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                timeout = arguments.length > 3 ? arguments[3] : void 0;
                            return rawFetch(
                                buildUrl(
                                    api.url + path,
                                    Object.assign({}, authParams, queryParams, {
                                        lang: api.lang,
                                    })
                                ),
                                requestOptions,
                                timeout
                            ).then(handleResponse);
                        }));
                }));
            const getQueryParam = (paramName) => new URL(location.href).searchParams.get(paramName),
                tokenParam = getQueryParam("token"),
                ewosuParam = getQueryParam("EWOSU"),
                directLinkParam = getQueryParam("directlink");
            (api.setToken({
                token: tokenParam,
                EWOSU: ewosuParam,
                directlink: directLinkParam,
            }),
                Object.assign(api, {
                    GET: httpGet,
                    HEAD: httpHead,
                    fetchJSON: fetchJSON,
                    token: tokenParam,
                    getUrl: buildUrl,
                }));
            const rawFetch = (url, requestOptions, timeout) => {
                    var parsedUrl = new URL(url);
                    let signal;
                    if ((parsedUrl.searchParams.get("lang") || (parsedUrl.searchParams.append("lang", api.getLanguage()), (url = parsedUrl.href)), timeout)) {
                        const controller = new AbortController();
                        ((signal = controller.signal), setTimeout(() => controller.abort(), timeout));
                    }
                    return fetch(url, {
                        method: requestOptions.method || "GET",
                        body:
                            (window.File && requestOptions.body instanceof window.File) || (window.FormData && requestOptions.body instanceof window.FormData)
                                ? requestOptions.body
                                : requestOptions.body && JSON.stringify(requestOptions.body),
                        credentials: "include",
                        headers: Object.assign(
                            !requestOptions || !requestOptions.body || (window.FormData && requestOptions.body instanceof window.FormData)
                                ? {}
                                : {
                                      "Content-Type": "application/json",
                                  },
                            {
                                Accept: "json",
                            },
                            !cookiesEnabled && {
                                Authorization: tokenStore.gApiToken || "",
                            },
                            requestOptions.headers
                        ),
                        signal: signal,
                    })
                        .then((response) => {
                            if (false === response.ok) {
                                const { onError } = hooks || {};
                                onError && onError.call(null, response, url, requestOptions);
                            }
                            return response;
                        })
                        .catch((error) => {
                            const { onError: onErrorHandler } = hooks || {};
                            return (onErrorHandler && onErrorHandler.call(null, error, url, requestOptions), error);
                        });
                },
                handleResponse = (response) => {
                    if (204 == response.status) {
                        if (response.text) return;
                        return Promise.accept({
                            status: response.status,
                            cloud: true,
                        });
                    }
                    return response.status < 400
                        ? response.json
                            ? response.json()
                            : Promise.accept({
                                  status: response.status,
                                  cloud: true,
                              })
                        : response.json
                          ? response.json().then((errorBody) =>
                                Promise.reject(
                                    Object.assign(errorBody, {
                                        status: response.status,
                                        cloud: true,
                                    })
                                )
                            )
                          : Promise.reject({
                                status: response.status || response.message,
                                cloud: true,
                            });
                };

            function buildUrl(url, query) {
                ((query = query || {}).lang || (query.lang = api.getLanguage()),
                    hooks &&
                        "function" == typeof hooks.beforeSendRequest &&
                        hooks.beforeSendRequest({
                            url: url,
                            query: query,
                        }));
                var searchParams = new URLSearchParams();
                for (var r in query) ("string" != typeof query[r] && "number" != typeof query[r] && "boolean" != typeof query[r]) || searchParams.set(r, query[r]);
                var queryString = searchParams + "",
                    separator = url.indexOf("?") >= 0 ? "&" : "?";
                return url + (queryString && separator + queryString);
            }
            let tokenStore = {};
            if (window.chrome && chrome.storage && chrome.storage.local)
                (console.log("Chrome app detected"),
                    chrome.storage.local.get("gApiToken", function (storedItems) {
                        ((tokenStore._token = storedItems),
                            Object.defineProperty(tokenStore, "token", {
                                set(value) {
                                    (chrome.storage.local.set({
                                        gApiToken: value,
                                    }),
                                        (tokenStore._token = value));
                                },
                                get: () => tokenStore._token,
                            }));
                    }));
            else
                try {
                    tokenStore = window.localStorage;
                } catch (e) {
                    console.log(e);
                }
            ((api.managementUrl = "https://cloud-management.corel.com"),
                /trunk|bleed|^localhost$/.test(location.hostname)
                    ? ((api.url = "https://gravit.plasmatrap.com"),
                      (api.websocketURL = "wss://gravit.plasmatrap.com"),
                      (api.managementUrl = "https://cloud-management-trunk.corel.com"))
                    : /rc/.test(location.hostname) || /staging/.test(location.hostname)
                      ? ((api.url = "https://gravit.plasmatrap.com"),
                        (api.websocketURL = "wss://gravit.plasmatrap.com"),
                        (api.managementUrl = "https://cloud-management-trunk.corel.com"))
                      : /beta/.test(location.hostname) || /preview/.test(location.hostname)
                        ? ((api.url = "https://gravit.plasmatrap.com"), (api.websocketURL = "wss://gravit.plasmatrap.com"))
                        : ((api.url = "https://gravit.plasmatrap.com"), (api.websocketURL = "wss://gravit.plasmatrap.com")),
                (api.setLanguage = (language) => (api.lang = language)),
                (api.getLanguage = () => api.lang),
                (api.lang = 0),
                (api.getAppStatus = (statusId) =>
                    rawFetch("".concat(api.managementUrl, "/api/v1/status/").concat(statusId), {
                        method: "GET",
                    }).then((response) => handleResponse(response))),
                (api.self = () => ((api.url = location.origin), api)),
                (api.diagnostic = (report) =>
                    rawFetch("".concat(api.url, "/report/diagnostic"), {
                        method: "POST",
                        body: report,
                    })),
                (api.getUserSettings = () => httpGet("/user/settings")),
                (api.updateUserSettings = (settingsData, nonPublic) =>
                    fetchJSON("/user/settings", {
                        method: "PUT",
                        body: Object.assign(
                            {},
                            {
                                data: settingsData,
                            },
                            {
                                nonPublic: nonPublic,
                            }
                        ),
                    })),
                (api.getPrice = function () {
                    let {
                        productId,
                        coupon,
                        currency,
                        country,
                        provider,
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    const priceProvider = providers[provider || providerIds.Cleverbridge];
                    return priceProvider
                        ? priceProvider.getPrice({
                              productId: productId,
                              coupon: coupon,
                              currency: currency,
                              country: country,
                          })
                        : Promise.resolve({});
                }),
                (api.getProduct = function (queryParams) {
                    let provider = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : providerIds.Cleverbridge;
                    return httpGet("/payment/".concat(provider, "/product"), queryParams).then((product) =>
                        product.productId ? api.getPrice(product).then((priceInfo) => Object.assign(product, priceInfo)) : product
                    );
                }),
                (api.subscription = {}),
                (api.subscription.getNextBillingDate = () => httpGet("/subscription/nextbillingdate")),
                (api.subscription.isLifetime = () =>
                    httpGet("/subscription/lifetime").then((result) => {
                        let { lifetime } = result;
                        return !!lifetime;
                    })),
                (api.activateSubscription = function (subscriptionId) {
                    let provider = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : providerIds.Cleverbridge;
                    return httpGet("/subscription/".concat(provider, "/activate/").concat(subscriptionId));
                }),
                (api.deactivateSubscription = function (subscriptionId) {
                    let provider = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : providerIds.Cleverbridge;
                    return httpGet("/subscription/".concat(provider, "/deactivate/").concat(subscriptionId));
                }),
                (api.isEnabledSubscriptions = () => httpGet("/subscription/test").then((response) => 1 == response.status)),
                (api.confirmEmail = (confirmationToken) => httpGet("/confirm-email/".concat(confirmationToken))),
                (api.resendEmailConfirmation = (body) =>
                    fetchJSON("/resend-confirm-email", {
                        method: "POST",
                        body: body,
                    })),
                (api.quota = () => httpGet("/quota").then((response) => response.quota)),
                (api.listen = function (eventName, callback) {
                    let once = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    const socket = new api.WebSocketClient(),
                        handler = (message) => {
                            try {
                                callback(message.data);
                            } finally {
                                once && socket.close();
                            }
                        };
                    return (socket.connect(eventName), socket.on(eventName.substr(1), handler), socket);
                }),
                (api.license = {
                    get: () => httpGet("/license"),
                    listen: (callback) => api.listen("/license", callback, false),
                    activateTrial: (licenseCode) =>
                        rawFetch("".concat(api.url, "/activate-trial/").concat(licenseCode || ""), {
                            method: "POST",
                        }),
                    resetTrial: () =>
                        rawFetch(api.url + "/reset-trial", {
                            method: "POST",
                        }),
                    everSubscribed: () => httpGet("/ever-subscribed"),
                    totalSubscriptionDays: () => httpGet("/total-subscription-days"),
                }),
                (api.checkout = function (url, target) {
                    let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    const deferred = {},
                        promise = new Promise((resolve) =>
                            Object.assign(deferred, {
                                resolve: resolve,
                            })
                        ),
                        payloadListener = api.listen("/payload", (payload) => deferred.resolve(payload), true);
                    if (target instanceof HTMLElement) {
                        let iframe = document.createElement("iframe"),
                            { events } = options;
                        (events && Object.keys(events).forEach((eventName) => iframe.addEventListener(eventName, events[eventName], false)), target.appendChild(iframe), iframe.setAttribute("src", url));
                    } else {
                        let childWindow;
                        if ("_blank" === target) childWindow = window.open(url, "Checkout");
                        else {
                            var screenLeft = null != window.screenLeft ? window.screenLeft : screen.left,
                                screenTop = null != window.screenTop ? window.screenTop : screen.top,
                                viewportWidth = window.innerWidth
                                    ? window.innerWidth
                                    : document.documentElement.clientWidth
                                      ? document.documentElement.clientWidth
                                      : screen.width,
                                viewportHeight = window.innerHeight
                                    ? window.innerHeight
                                    : document.documentElement.clientHeight
                                      ? document.documentElement.clientHeight
                                      : screen.height,
                                popupWidth = 1e3,
                                popupHeight = 680,
                                popupLeft = viewportWidth / 2 - popupWidth / 2 + screenLeft,
                                popupTop = viewportHeight / 2 - popupHeight / 2 + screenTop;
                            childWindow = window.open(url, "Checkout", "scrollbars=yes, width=" + popupWidth + ", height=" + popupHeight + ", top=" + popupTop + ", left=" + popupLeft);
                        }
                        window.focus && childWindow.focus();
                    }
                    return {
                        promise: promise,
                        cancel: () => payloadListener.close(),
                    };
                }),
                (api.coupon = {}),
                (api.coupon.activate = (couponCode) => httpGet("/coupon/activate/" + couponCode)),
                (api.coupon.getReport = function () {
                    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return fetchJSON(buildUrl("/coupon/report", options), {
                        method: "GET",
                    });
                }),
                (api.coupon.getGeneralReport = function () {
                    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return fetchJSON(buildUrl("/coupon/report/general", options), {
                        method: "GET",
                    });
                }),
                (api.coupon.create = (body) =>
                    fetchJSON("/coupon/create", {
                        method: "PUT",
                        body: body,
                    })),
                (api.coupon.export = function () {
                    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return httpGet("/coupon/report/export", options);
                }),
                (api.coupon.exportLink = function () {
                    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return buildUrl("".concat(api.url, "/coupon/report/export"), options);
                }),
                (api.coupon.revokeUsage = (couponId) =>
                    fetchJSON("/coupon/usage/" + couponId + "/revoke", {
                        method: "POST",
                    })),
                (api.coupon.batch = {}),
                (api.coupon.batch.removeUnusedCoupons = function () {
                    let coupons = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return fetchJSON("/coupon/unused", {
                        method: "DELETE",
                        body: {
                            coupons: coupons,
                        },
                    });
                }),
                (api.coupon.batch.deleteCoupons = function () {
                    let coupons = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return fetchJSON("/coupon", {
                        method: "DELETE",
                        body: {
                            coupons: coupons,
                        },
                    });
                }),
                (api.coupon.batch.revokeCoupons = function () {
                    let coupons = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return fetchJSON("/coupon/revoke", {
                        method: "POST",
                        body: {
                            coupons: coupons,
                        },
                    });
                }),
                (api.coupon.batch.removeUnusedCouponsByGroups = function () {
                    let groups = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return fetchJSON("/coupon/group/unused", {
                        method: "DELETE",
                        body: {
                            groups: groups,
                        },
                    });
                }),
                (api.coupon.batch.deleteCouponsByGroups = function () {
                    let groups = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return fetchJSON("/coupon/group", {
                        method: "DELETE",
                        body: {
                            groups: groups,
                        },
                    });
                }),
                (api.coupon.batch.revokeCouponsByGroups = function () {
                    let groups = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return fetchJSON("/coupon/group/revoke", {
                        method: "POST",
                        body: {
                            groups: groups,
                        },
                    });
                }),
                (api.getPurchase = (purchaseId) => httpGet("/purchase/" + purchaseId)),
                (api.listPurchases = (options) => httpGet("/purchases", options)),
                (api.hasPurchases = (options) =>
                    httpHead(
                        "/purchases",
                        Object.assign(options || {}, {
                            limit: 1,
                        })
                    ).then((response) => 204 !== response.status && response.status < 400)),
                (api.listPurchasedProducts = (options) => httpGet("/purchase/products", options)),
                (api.getPurchasedFile = (purchaseId) => httpGet("/purchase/product/" + purchaseId + "/file")),
                (api.getPurchasedProduct = (purchaseId) => httpGet("/purchase/product/" + purchaseId)),
                (api.hasPurchasedProduct = (e) => httpHead("/purchase/product/" + e).then((e) => 204 !== e.status && e.status < 400)),
                (api.getProviderContentDetails = (contentId) => httpGet("/store/v1/content/details/".concat(contentId))),
                (api.getProviderContentFile = (contentId) => httpGet("/store/v1/content/file/".concat(contentId))),
                (api.getProviderExternalAsset = (assetId) => httpGet("/provider/v1/asset/".concat(assetId))),
                (api.software = {
                    getRelease: function () {
                        let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return httpGet("/software/release", options);
                    },
                }),
                (api.getSubscriptionByPurchase = function (purchaseId) {
                    let provider = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : providerIds.Cleverbridge;
                    return httpGet("/subscription/".concat(provider, "/purchase/").concat(purchaseId));
                }),
                (api.getLocation = () => httpGet("/geo/me")),
                (api.isNewsletterRequired = () => httpGet("/newsletter/required").then((result) => 1 == result.result)),
                (api.getUser = (userId, isPublic) => httpGet("/user".concat(userId ? "/" + userId : "", "?public=").concat(isPublic ? 1 : 0))),
                (api.updateUser = (userData) =>
                    fetchJSON("/user", {
                        method: "PUT",
                        body: userData,
                    })),
                (api.updateAvatar = (file) =>
                    fetchJSON("/user/me/avatar", {
                        method: "PUT",
                        body: file,
                        headers: {
                            "Content-Type": file.type,
                        },
                    })),
                (api.listUsers = (options) => httpGet("/users", options)),
                (api.listFiles = (options) => httpGet("/file", options)),
                (api.listMarket = (options) => httpGet("/market", options)),
                (api.listMarketV2 = (options) => httpGet("/v2/market", options)),
                (api.listVersions = (fileId, versionType) =>
                    versionType && versionType.split("").every((type) => ["t", "s", "r", "f"].includes(type))
                        ? httpGet("/file/" + fileId + "/versions/type/" + versionType)
                        : httpGet("/file/" + fileId + "/versions")),
                (api.getFile = (file, full, version, type) => {
                    var typeSegment = "";
                    return (
                        type && ["t", "s", "r"].indexOf(type) >= 0 && (typeSegment = "/type/" + type),
                        "string" == typeof file
                            ? httpGet("/file/" + file + (full ? "/full" : "") + (version ? "/version/" + version + typeSegment : ""))
                            : file.token
                              ? httpGet("/share/" + file.token + (full ? "/full" : ""))
                              : httpGet("/file/" + file.id + (full ? "/full" : "") + (version ? "/version/" + version + typeSegment : ""))
                    );
                }),
                (api.getFileExtended = (e) => api.getFile(e, true).then((e) => new GFile(e))),
                (api.getCollaborators = (fileId) => httpGet("/file/" + fileId + "/collaborators")),
                (api.getExternalFile = (e) => httpGet("/file/external/".concat(e)).then((e) => new GFile(e))),
                (api.annotations = {}),
                (api.annotations.getHistory = (fileId) => httpGet("/file/" + fileId + "/annotations/history")),
                (api.annotations.getDesignHistory = (fileId) => httpGet("/file/" + fileId + "/annotations/history/design")),
                (api.resolveUrls = (fileId, urlType) => httpGet("/file/" + fileId + "/urls/" + urlType)),
                (api.createFile = (fileData) =>
                    fetchJSON("/file", {
                        method: "POST",
                        body: fileData,
                    })),
                (api.updateFile = (fileId, fileData) =>
                    fetchJSON("/file/" + fileId, {
                        method: "PUT",
                        body: fileData,
                    })),
                (api.updateFilePassword = (fileId, password) =>
                    fetchJSON("/file/" + fileId + "/password", {
                        method: "PUT",
                        body: password,
                    })),
                (api.updateFileData = (fileId, fileData) =>
                    fetchJSON("/file/" + fileId + "/data", {
                        method: "PUT",
                        body: fileData,
                    })),
                (api.updateAnnotations = (fileId, annotations, token) =>
                    token
                        ? fetchJSON(
                              "/file/" + fileId + "/annotations",
                              {
                                  method: "PUT",
                                  body: annotations,
                              },
                              {
                                  token: token,
                              }
                          )
                        : fetchJSON("/file/" + fileId + "/annotations", {
                              method: "PUT",
                              body: annotations,
                          })),
                (api.getAnnotations = (fileId, token) =>
                    token
                        ? httpGet("/file/" + fileId + "/annotations", {
                              token: token,
                          })
                        : httpGet("/file/" + fileId + "/annotations")),
                (api.updateStatus = (fileId, status) =>
                    fetchJSON("/file/" + fileId + "/status", {
                        method: "POST",
                        body: {
                            status: status,
                        },
                    })),
                (api.signedPutUrls = (fileId, urls) =>
                    fetchJSON("/file/" + fileId + "/urls", {
                        method: "PUT",
                        body: urls,
                    })),
                (api.deleteFile = (fileId) =>
                    fetchJSON("/file/" + fileId, {
                        method: "DELETE",
                    })),
                (api.copyFile = (fileId, fileData) =>
                    fetchJSON("/file/" + fileId, {
                        method: "COPY",
                        body: fileData,
                    })),
                (api.shareWithUser = (fileId, userId, permission) =>
                    fetchJSON("/file/" + fileId + "/user/" + userId, {
                        method: "PUT",
                        body: permission,
                    })),
                (api.unshareWithUser = (fileId, userId) =>
                    fetchJSON("/file/" + fileId + "/user/" + userId, {
                        method: "DELETE",
                    })),
                (api.createShare = (fileId, shareOptions, annotations) =>
                    fetchJSON("/file/" + fileId + "/share", {
                        method: "POST",
                        body: Object.assign(
                            {
                                annots: annotations,
                            },
                            shareOptions
                        ),
                    })),
                (api.updateShare = (shareId, shareData) =>
                    fetchJSON("/share/" + shareId, {
                        method: "PUT",
                        body: shareData,
                    })),
                (api.deleteShare = (shareId) =>
                    fetchJSON("/share/" + shareId, {
                        method: "DELETE",
                    })),
                (api.getShare = (shareId, full) => httpGet("/share/" + shareId + (full ? "/full" : ""))),
                (api.checkEnterpriseToken = (token) => httpGet("/share/checkenterprise/" + token)),
                (api.getSharingStatistics = () => httpGet("/sharing/statistics").then((stats) => new SharingStatistics(stats))),
                (api.share = {}),
                (api.share.sendInvitationEmails = function (shareId) {
                    let emails = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                    return fetchJSON("/share/" + shareId + "/send-invitation-emails", {
                        method: "POST",
                        body: {
                            emails: emails,
                        },
                    });
                }),
                (api.requestPermission = (shareId, permission) =>
                    fetchJSON("/request/permission/" + shareId, {
                        method: "POST",
                        body: permission,
                    })),
                (api.usage = (fileId, usage) =>
                    fetchJSON("/file/" + fileId + "/usage", {
                        method: "PUT",
                        body: usage,
                    })),
                (api.updateFileFormat = (fileId, format) =>
                    fetchJSON("/file/" + fileId + "/fileformat", {
                        method: "POST",
                        body: format,
                    })),
                (api.listComments = (fileId, options) => httpGet("/file/" + fileId + "/comment", options)),
                (api.updateComment = (commentId, commentData) =>
                    fetchJSON("/comment/" + commentId, {
                        method: "PUT",
                        body: commentData,
                    })),
                (api.deleteComment = (commentId) =>
                    fetchJSON("/comment/" + commentId, {
                        method: "DELETE",
                    })),
                (api.createComment = (fileId, commentData) =>
                    fetchJSON("/file/" + fileId + "/comment", {
                        method: "POST",
                        body: commentData,
                    })),
                (api.createReply = (commentId, replyData) =>
                    fetchJSON("/comment/" + commentId + "/reply", {
                        method: "POST",
                        body: replyData,
                    })),
                (api.listAnonymousTokens = () =>
                    fetchJSON("/anonymous/token", {
                        method: "GET",
                    })),
                (api.createAnonymousToken = () =>
                    fetchJSON("/anonymous/token", {
                        method: "PUT",
                    })),
                (api.deleteAnonymousToken = (tokenId) =>
                    fetchJSON("/anonymous/token/" + tokenId, {
                        method: "DELETE",
                    })),
                (api.popup = (url, newtab) =>
                    (function (url, newtab) {
                        url = buildUrl(
                            url,
                            Object.assign(
                                {},
                                {
                                    origin: location.origin,
                                }
                            )
                        );
                        var targetUrl = new URL(api.url + url);
                        const popupOptions = {
                            newtab: newtab,
                            name: "Sign in - Gravit",
                            url: targetUrl.toString(),
                        };
                        if (!newtab) {
                            var screenLeft = null != window.screenLeft ? window.screenLeft : screen.left,
                                screenTop = null != window.screenTop ? window.screenTop : screen.top,
                                viewportWidth = window.innerWidth
                                    ? window.innerWidth
                                    : document.documentElement.clientWidth
                                      ? document.documentElement.clientWidth
                                      : screen.width,
                                viewportHeight = window.innerHeight
                                    ? window.innerHeight
                                    : document.documentElement.clientHeight
                                      ? document.documentElement.clientHeight
                                      : screen.height,
                                popupLeft = viewportWidth / 2 - 230 + screenLeft,
                                popupTop = viewportHeight / 2 - 340 + screenTop;
                            Object.assign(popupOptions, {
                                w: 460,
                                h: 680,
                                top: popupTop,
                                left: popupLeft,
                            });
                        }
                        var popupWindow = popupFactory.call(null, popupOptions);
                        if (!popupWindow)
                            return Promise.reject({
                                code: errorCodes.ERR_POPUP_HAS_BEEN_BLOCKED,
                            });
                        return new Promise(function (resolve, reject) {
                            window.addEventListener("message", function messageListener(event) {
                                const { data: { token } = {} } = event;
                                if (token) {
                                    if (event.source != popupWindow && !popupWindow && event.origin.indexOf("chrome-extension:") < 0)
                                        return (console.warn("Token was rejected because there is an invalid source", event.source), reject());
                                    (popupWindow && popupWindow.close(), window.removeEventListener("message", messageListener), resolve(event.data));
                                }
                            });
                        });
                    })((url || "").replace(/^(?!\/)/, "/"), newtab).then(function (authResult) {
                        let { token: authToken, userSignup } = authResult;
                        return (
                            cookiesEnabled || (tokenStore.gApiToken = authToken),
                            api.getUser().then((user) =>
                                Object.assign(user, {
                                    new: "true" == userSignup,
                                })
                            )
                        );
                    })),
                (api.signin = (credentials) =>
                    rawFetch(api.url + "/signin", {
                        method: "POST",
                        body: credentials,
                    }).then((response) => (cookiesEnabled || (tokenStore.gApiToken = response.headers.get("Authorization")), handleResponse(response)))),
                (api.signup = (credentials) =>
                    rawFetch(api.url + "/signup", {
                        method: "POST",
                        body: Object.assign(
                            {
                                locale:
                                    navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage,
                            },
                            credentials
                        ),
                    }).then((response) => (cookiesEnabled || (tokenStore.gApiToken = response.headers.get("Authorization")), handleResponse(response)))),
                (api.recaptchaKey = () => httpGet("/recaptchakey")),
                (api.initRecaptcha = (useIframe, targetWindow) => {
                    if (((targetWindow = targetWindow || window), useIframe)) {
                        var iframe = document.createElement("iframe");
                        ((iframe.src = api.url + "/recaptcha"),
                            targetWindow.document.body.appendChild(iframe),
                            iframe.addEventListener("load", function () {
                                targetWindow.grecaptcha = {
                                    render: iframe.contentWindow.window.grecaptcha.render,
                                    reset: iframe.contentWindow.window.grecaptcha.reset,
                                    execute: iframe.contentWindow.window.grecaptcha.execute,
                                };
                            }));
                    } else {
                        var widgetElement = null;
                        Object.defineProperty(window, "grecaptchaWidget", {
                            get: () => (
                                widgetElement && document.body.removeChild(widgetElement),
                                (widgetElement = document.createElement("div")).setAttribute("class", "g-recaptcha"),
                                document.body.appendChild(widgetElement),
                                widgetElement
                            ),
                        });
                        var scriptElement = document.createElement("script");
                        (scriptElement.setAttribute("src", "https://www.google.com/recaptcha/api.js?render=explicit"),
                            scriptElement.setAttribute("async", ""),
                            scriptElement.setAttribute("defer", ""));
                    }
                }),
                (api.resetPassword = (email) =>
                    fetchJSON("/reset-password", {
                        method: "POST",
                        body: email,
                    })),
                (api.updatePassword = (passwordData, resetToken) =>
                    fetchJSON("/reset-password/".concat(resetToken), {
                        method: "POST",
                        body: passwordData,
                    })),
                (api.signout = api.logout = () => httpGet("/signout")),
                (api.formatError = (error) => {
                    let message;
                    if (("string" == typeof error && (message = error), !message && error && error.message && (message = error.message), !message && error && error.errors)) {
                        const errorsMap = new Map(error.errors);
                        message = Array.from(errorsMap.values()).join("<br>");
                    }
                    return (!message && error && (message = error), message);
                }),
                (api.getLinkLearnMorePro = function () {
                    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        platform = navigator.userAgent.match(/Electron/) ? "desktop" : "web";
                    return (
                        location.origin && 0 === location.origin.indexOf("chrome") && (platform = "chrome"),
                        Object.assign(options, {
                            platform: platform,
                        }),
                        api.url + "/get-pro/learnmore" + buildQueryParams(options)
                    );
                }));
            const openPopupWindow = (options) => {
                let { newtab, top, left, w: width, h: height, url: url, name } = options;
                var windowRef;
                return (
                    (windowRef = newtab
                        ? window.open(url, name)
                        : window.open(url, name, "scrollbars=yes, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left)) &&
                        windowRef.focus &&
                        windowRef.focus(),
                    windowRef
                );
            };
            let popupFactory = openPopupWindow;
            ((api.setOAuthFactory = (factory) => {
                popupFactory = factory || openPopupWindow;
            }),
                (api.getPresetTemplate = (options) => httpGet("/assets/templates/pod", options)),
                (api.getUnsplashPhotos = (options) => httpGet("/unsplash/featured", options)),
                (api.searchUnsplashPhotos = (query) => httpGet("/unsplash/search/photos", query)),
                (api.getUnsplashPhotoUrl = (options) => httpGet("/unsplash/download/photo", options)),
                (api.getExampleFiles = (options) => httpGet("/example-files", options)),
                (api.getUserName = (user) => getUserName(user, true)),
                (api.listAutoSaves = (fileId) => httpGet("/file/".concat(fileId, "/autosave/versions"))),
                (api.getAutoSave = (fileId, version) => httpGet("/file/".concat(fileId, "/autosave").concat(version ? "/version/".concat(version) : ""))),
                (api.getAutoSaveThumbnail = (fileId, version) => httpGet("/file/".concat(fileId, "/autosave/thumbnail").concat(version ? "/version/".concat(version) : ""))),
                (api.uploadAutoSave = (fileId, md5) =>
                    fetchJSON("/file/".concat(fileId, "/autosave"), {
                        method: "PUT",
                        body: {
                            md5: md5,
                        },
                    })),
                (api.commitAutoSaveFileUpdate = (fileId) =>
                    fetchJSON("/file/".concat(fileId, "/autosave/commit"), {
                        method: "POST",
                    })),
                (api.commitManualFileUpdate = function (fileId) {
                    let types = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                    return fetchJSON("/file/".concat(fileId, "/manual/commit"), {
                        method: "POST",
                        body: {
                            types: types,
                        },
                    });
                }),
                (api.isSharePointFileId = isSharePointFileId),
                (api.isGoogleDriveFileId = isGoogleDriveFileId),
                (api.isSharePointFile = isSharePointFile),
                (api.isGoogleDriveFile = isGoogleDriveFile),
                (api.sameDomain = sameDomain),
                (api.isExternalFileId = isExternalFileId),
                (api.isExternalFile = isExternalFile),
                (api.getRichTooltipVideoURL = (videoId) => "".concat(api.url, "/rich-tooltip-video/").concat(videoId)),
                (api.fetchTranslationsURL = (lang, key) => httpGet("/i18n-url/".concat(lang, "/").concat(key))),
                (api.cloudServices = {
                    googleDrive: {
                        getAccessToken: () => httpGet("/cloudservices/googledrive/access"),
                        getClientConfiguration: () => httpGet("/cloudservices/googledrive/configuration"),
                        openFilePicker: (fileId) => {
                            const screenLeft = null != window.screenLeft ? window.screenLeft : screen.left,
                                screenTop = null != window.screenTop ? window.screenTop : screen.top,
                                popupLeft =
                                    (window.innerWidth
                                        ? window.innerWidth
                                        : document.documentElement.clientWidth
                                          ? document.documentElement.clientWidth
                                          : screen.width) /
                                        2 -
                                    512 +
                                    screenLeft,
                                popupTop =
                                    (window.innerHeight
                                        ? window.innerHeight
                                        : document.documentElement.clientHeight
                                          ? document.documentElement.clientHeight
                                          : screen.height) /
                                        2 -
                                    384 +
                                    screenTop,
                                pickerUrl = "".concat(api.url, "/googleapi/picker/").concat(encodeURIComponent(fileId), "?lang=").concat(api.getLanguage()),
                                pickerWindow = window.open(pickerUrl, "Google Picker", "scrollbars=yes, width=1024, height=768, top=" + popupTop + ", left=" + popupLeft);
                            return (window.focus && pickerWindow.focus(), pickerWindow);
                        },
                    },
                    googleAPI: {
                        getToken: (code) => httpGet("/googleapi/token?code=".concat(code)),
                        getRefreshToken: (refreshToken) => httpGet("/googleapi/token?refresh_token=".concat(refreshToken)),
                        getTokenInfo: (accessToken) =>
                            rawFetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=".concat(accessToken), {
                                method: "GET",
                            }).then(handleResponse),
                        getUserInfo: (accessToken) =>
                            rawFetch("https://www.googleapis.com/oauth2/v3/userinfo?access_token=".concat(accessToken), {
                                method: "GET",
                            }).then(handleResponse),
                        revokeToken: (token) =>
                            rawFetch("https://accounts.google.com/o/oauth2/revoke?token=".concat(token), {
                                method: "GET",
                                headers: {
                                    "Content-type": "application/x-www-form-urlencoded",
                                },
                            }),
                    },
                }),
                (api.client = {
                    getConfiguration: () => httpGet("/client/configuration"),
                }),
                (api.HTTP_STATUS_CODES = require(578)),
                (api.ERROR_CODES = errorCodes),
                (api.COLLABORATION_EVENTS = require(953)),
                (api.AUTHENTICATION_EVENTS = require(954)),
                (api.PAYMENT_EVENTS = require(955)),
                require(956)(api),
                require(957)(api),
                require(959)(api),
                require(960)(api),
                require(961)(api),
                require(962)(api),
                require(963)(api),
                require(964)(api),
                require(965)(api),
                require(966)(api),
                require(967)(api),
                require(968)(api),
                require(969)(api),
                require(970)(api));
        };
