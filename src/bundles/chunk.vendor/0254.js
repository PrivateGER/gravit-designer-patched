module.exports = function (module, exports, require) {
            "use strict";
            (require(20), require(151), require(34), require(247), require(91), require(4), require(41), require(13), require(38));
            const { GLocale: n, GLocaleKey: r } = require(209 /* GLocale */),
                o = Object.values(require(287 /* GShareRoles */))
                    .filter((e) => !!e.mentionName)
                    .map((e) => e.mentionName),
                {
                    externalApps: a,
                    supportedApps: s,
                    REQUEST_NEW_FEATURE_URL: l,
                    DOCUMENTATION_URL: h,
                    SUPPORT_URL: A,
                    DISCUSS_BETA_URL: c,
                    PRODUCT_VECTOR_URL: p,
                } = require(374 /* SUPPORT_URL */);
            ((exports.getUserEmail = function (e) {
                return !e.email && e.login && e.login.match(/^[^,\s"'<>@]+@[^,.\s"'<>@]+(?:\.[^,."'<>\s@]+)*$/) ? e.login : e.email;
            }),
                (exports.getRequestNewFeatureUrl = function () {
                    return l;
                }),
                (exports.getSupportUrl = function () {
                    return A;
                }),
                (exports.getDocumentationUrl = function () {
                    return h;
                }),
                (exports.getDiscussBetaUrl = function () {
                    return c;
                }),
                (exports.getProductVectorUrl = function () {
                    return p;
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
                return u(e.login || e.email || (t ? n.get(new r("GCommonNames", "text.unknown-user")) : "Unknown"));
            };
            const d = (e) => "string" == typeof e && 0 === e.indexOf("sharepoint_"),
                g = (e) => "string" == typeof e && 0 === e.indexOf("googledrive_"),
                f = (e) => e.app && e.app === s.SharePoint;
            ((exports.isSharePointFileId = d),
                (exports.isGoogleDriveFileId = g),
                (exports.isSharePointFile = f),
                (exports.isGoogleDriveFile = (e) => e.app && e.app === s.GoogleDrive),
                (exports.isExternalFile = (e) => f(e) || g(e)),
                (exports.isExternalFileId = (e) => g(e) || d(e)),
                (exports.sanitizeName = u),
                (exports.sameDomain = (e, t) => e && t && e.email && t.email && e.email.split("@")[1] === t.email.split("@")[1]),
                (exports.getExternalAppCodes = () => a.map((e) => e.code)),
                (exports.getAppFromFileId = (e) => (d(e) ? s.SharePoint : g(e) ? s.GoogleDrive : null)),
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
