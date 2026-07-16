module.exports = function (module, exports, require) {
            "use strict";
            const {
                getRequestNewFeatureUrl,
                getSupportUrl,
                getDocumentationUrl,
                getDiscussBetaUrl,
                getSubscriptionUrl,
                getProductVectorUrl,
            } = require(254);
            module.exports = function (e) {
                e.link = {
                    getRequestNewFeatureUrl: getRequestNewFeatureUrl,
                    getSupportUrl: getSupportUrl,
                    getDocumentationUrl: getDocumentationUrl,
                    getDiscussBetaUrl: getDiscussBetaUrl,
                    getSubscriptionUrl: getSubscriptionUrl,
                    getProductVectorUrl: getProductVectorUrl,
                };
            };
        };
