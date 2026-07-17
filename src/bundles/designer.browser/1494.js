module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = void 0), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(271 /* polyfill:String */), require(34), require(134 /* polyfill:String */), require(38));
        const { isBeta } = require(803);
        var gaEventPaths = require(1495);
        let lastStatTime = 0,
            lastGaCallTime = 0;
        const Analytics = {
            pageStats: (event, value, user, skipGaTracking, forceLog) => {
                if (
                    (skipGaTracking ||
                        (function (event, value, n) {
                            const isString = (value) => "string" == typeof value;
                            function sanitizeIdentifier(text) {
                                return (text || "")
                                    .split("/")
                                    .map(function (segment) {
                                        return (function (segment) {
                                            if (!segment) return "";
                                            let sanitized = String(segment)
                                                .replace(
                                                    /^(?:[\0-\/:-@\[-`\{-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*|(?:[\0-\/:-@\[-`\{-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*$/g,
                                                    "$"
                                                )
                                                .replace(
                                                    /(?:[\0-\/:-@\[-`\{-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/g,
                                                    "$"
                                                )
                                                .replace(/([a-z])([A-Z])/g, function (match, lower, upper) {
                                                    return lower + "$" + upper;
                                                })
                                                .toLowerCase()
                                                .replace(/(\$)([0-9A-Z_a-z]?)/g, function (match, dollarSign, char) {
                                                    return char.toUpperCase();
                                                });
                                            return (segment.startsWith("!") && (sanitized = "!" + sanitized), sanitized);
                                        })(segment);
                                    })
                                    .join("/");
                            }
                            if ("undefined" == typeof _GLOBAL_GA_EVENTS) return;
                            if (!n && Date.now() - lastGaCallTime <= 100) return;
                            var eventParts = event.split("_"),
                                eventName = eventParts[0],
                                category = eventParts[1],
                                actionValue = (eventParts[2] || "") + ("string" == typeof value || "number" == typeof value || value instanceof String ? ":" + value : "");
                            if ("undefined" != typeof dataLayer) {
                                var gaPath = (function (rawEventName, rawCategory, rawActionValue) {
                                    var actionValueParts = rawActionValue ? rawActionValue.split(":") : "",
                                        eventName = rawEventName,
                                        category = rawCategory,
                                        action = actionValueParts[0] || "",
                                        value = actionValueParts[1] || "";
                                    if (!eventName) return null;
                                    var path = "";
                                    if (isString(gaEventPaths[eventName])) path = gaEventPaths[eventName];
                                    else if (category && isString(gaEventPaths[eventName][category])) path = gaEventPaths[eventName][category];
                                    else if (category && action && isString(gaEventPaths[eventName][category][action])) path = gaEventPaths[eventName][category][action];
                                    else {
                                        if (!(category && action && value && isString(gaEventPaths[eventName][category][action][value]))) return null;
                                        path = gaEventPaths[eventName][category][action][value];
                                    }
                                    return (
                                        (path = (path = (path = (path = path.replace("$EVENTNAME", sanitizeIdentifier(eventName))).replace("$CATEGORY", sanitizeIdentifier(category))).replace(
                                            "$ACTION",
                                            sanitizeIdentifier(action)
                                        )).replace("$VALUE", sanitizeIdentifier(value))) &&
                                            !path.startsWith("/") &&
                                            (path = "/" + path),
                                        path
                                    );
                                })(eventName, category, actionValue);
                                (gaPath && Analytics.pageTracking(gaPath), (lastGaCallTime = Date.now()));
                            }
                        })(event, value),
                    user &&
                        (("function" == typeof gdb_loaddesign || isBeta) && console.log("updating stats:" + event + " value: " + (value || "null")),
                        "undefined" != typeof _GLOBAL_GA_EVENTS && "undefined" != typeof ga))
                ) {
                    var userEventCounts = user;
                    if ((!userEventCounts && user.isAnonymous() && (userEventCounts = {}), userEventCounts)) {
                        var eventKey = value ? event + "_" + value : event;
                        if ((userEventCounts.hasOwnProperty(eventKey) && "number" == typeof userEventCounts[eventKey] ? userEventCounts[eventKey]++ : (userEventCounts[eventKey] = 1), forceLog || Date.now() - lastStatTime > 100)) {
                            var statEventParts = event.split("_"),
                                gaLabel =
                                    (statEventParts[2] || "unknown") +
                                    ("string" == typeof value || "number" == typeof value || value instanceof String ? ":" + value : "");
                            (ga(_GLOBAL_GA_EVENTS, "event", statEventParts[0], statEventParts[1] || "unknown", gaLabel), (lastStatTime = Date.now()));
                        }
                    }
                }
            },
            pageTracking: async function (path, subPath) {
                "undefined" != typeof _GLOBAL_GA_EVENTS &&
                    (Date.now() - lastGaCallTime <= 100 ||
                        (path.startsWith("/") || (path = "/" + path),
                        path.endsWith("/") && (path = path.slice(0, path.length - 1)),
                        subPath && (subPath.startsWith("/") ? (path += subPath) : (path = path + "/" + subPath)),
                        (path = Analytics.modifyPageStatsForUserLicense(path)),
                        (path = await Analytics.modifyPageStatsForAppMode(path)),
                        ("function" == typeof gdb_loaddesign || isBeta) && console.log("pagestats: " + path),
                        window.ga(_GLOBAL_GA_EVENTS, "pageview", path),
                        (lastGaCallTime = Date.now())));
            },
            modifyPageStatsForUserLicense: function (path) {
                return path;
            },
            modifyPageStatsForAppMode: function (path) {
                return path;
            },
        };
        exports.default = Analytics;
    };
