module.exports = function (module, exports, require) {
            "use strict";
            (require(20 /* polyfill:RegExp */), require(151), require(34), require(247), require(91 /* polyfill:String */), require(4), require(41), require(13), require(38));
            const { GLocale, GLocaleKey } = require(209 /* GLocale */),
                o = Object.values(require(287 /* GShareRoles */))
                    .filter((e) => !!e.mentionName)
                    .map((e) => e.mentionName),
                {
                    externalApps,
                    supportedApps,
                    REQUEST_NEW_FEATURE_URL,
                    DOCUMENTATION_URL,
                    SUPPORT_URL,
                    DISCUSS_BETA_URL,
                    PRODUCT_VECTOR_URL,
                } = require(374 /* SUPPORT_URL */);
            ((exports.getUserEmail = function (e) {
                return !e.email && e.login && e.login.match(/^[^,\s"'<>@]+@[^,.\s"'<>@]+(?:\.[^,."'<>\s@]+)*$/) ? e.login : e.email;
            }),
                (exports.getRequestNewFeatureUrl = function () {
                    return REQUEST_NEW_FEATURE_URL;
                }),
                (exports.getSupportUrl = function () {
                    return SUPPORT_URL;
                }),
                (exports.getDocumentationUrl = function () {
                    return DOCUMENTATION_URL;
                }),
                (exports.getDiscussBetaUrl = function () {
                    return DISCUSS_BETA_URL;
                }),
                (exports.getProductVectorUrl = function () {
                    return PRODUCT_VECTOR_URL;
                }));
            const u = (e) => {
                let t = (e = e.replace(/^[@\s]+/, "")).indexOf("@");
                return (t >= 0 && (e = e.substr(0, t)), (t = o.indexOf(e.toLowerCase())), t >= 0 && (e += "-1"), e);
            };
            exports.getUserName = function (e, t) {
                if (e.name && e.name.trim()) {
                    let t = e.name.trim().split(/\s/)[0];
                    return u(t);
                }
                return u(e.login || e.email || (t ? GLocale.get(new GLocaleKey("GCommonNames", "text.unknown-user")) : "Unknown"));
            };
            const d = (e) => "string" == typeof e && 0 === e.indexOf("sharepoint_"),
                g = (e) => "string" == typeof e && 0 === e.indexOf("googledrive_"),
                f = (e) => e.app && e.app === supportedApps.SharePoint;
            ((exports.isSharePointFileId = d),
                (exports.isGoogleDriveFileId = g),
                (exports.isSharePointFile = f),
                (exports.isGoogleDriveFile = (e) => e.app && e.app === supportedApps.GoogleDrive),
                (exports.isExternalFile = (e) => f(e) || g(e)),
                (exports.isExternalFileId = (e) => g(e) || d(e)),
                (exports.sanitizeName = u),
                (exports.sameDomain = (e, t) => e && t && e.email && t.email && e.email.split("@")[1] === t.email.split("@")[1]),
                (exports.getExternalAppCodes = () => externalApps.map((e) => e.code)),
                (exports.getAppFromFileId = (e) => (d(e) ? supportedApps.SharePoint : g(e) ? supportedApps.GoogleDrive : null)),
                (exports.coalesceString = function () {
                    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                    return t.find((e) => {
                        if (e && "string" == typeof e) return e;
                    });
                }),
                (exports.buildQueryParams = function () {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    var t = "",
                        i = Object.keys(e);
                    if (i.length > 0) {
                        var n = i.map((t) => t + "=" + e[t]);
                        t = "?" + n.join("&");
                    }
                    return t;
                }),
                (exports.getUrlWithQueryParams = function (e) {
                    let i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return e + exports.buildQueryParams(i);
                }),
                (exports.getSubscriptionUrl = function () {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return exports.getUrlWithQueryParams("https://gravit.plasmatrap.com", e);
                }),
                (exports.getYearlySubscriptionUrl = function () {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return exports.getUrlWithQueryParams("https://gravit.plasmatrap.com", e);
                }));
        };
