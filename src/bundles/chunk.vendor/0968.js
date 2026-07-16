module.exports = function (module, exports, require) {
            "use strict";
            const {
                getRequestNewFeatureUrl: n,
                getSupportUrl: r,
                getDocumentationUrl: o,
                getDiscussBetaUrl: a,
                getSubscriptionUrl: s,
                getProductVectorUrl: l,
            } = require(254);
            module.exports = function (e) {
                e.link = {
                    getRequestNewFeatureUrl: n,
                    getSupportUrl: r,
                    getDocumentationUrl: o,
                    getDiscussBetaUrl: a,
                    getSubscriptionUrl: s,
                    getProductVectorUrl: l,
                };
            };
        };
