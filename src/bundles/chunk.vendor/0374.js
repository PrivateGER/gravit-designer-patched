module.exports = function (module, exports, require) {
            "use strict";
            const n = {
                    SharePoint: "sharepoint",
                    GoogleDrive: "googledrive",
                },
                r = [
                    {
                        name: "SharePoint",
                        code: n.SharePoint,
                    },
                    {
                        name: "Google Drive",
                        code: n.GoogleDrive,
                    },
                ];
            module.exports = {
                supportedApps: n,
                externalApps: r,
                REQUEST_NEW_FEATURE_URL: "https://corelvector.ideas.aha.io/",
                SUPPORT_URL: "https://www.coreldraw.com/support/",
                // The original documentation.corelvector.com is dead, but a full
                // mirror of it is self-hosted under public/docs — point the
                // Help > Learn > User Guide entry (and friends) at it.
                DOCUMENTATION_URL: "/docs/",
                DISCUSS_BETA_URL: "https://gravit.plasmatrap.com",
                PRIVACY_URL: "https://corel.com/privacy",
                PRODUCT_VECTOR_URL: "https://coreldraw.com/vector",
                TRIAL_MESSAGE_WEB_CONTENT_URL_TEMPLATE: "https://ipm.corel.com/products/vtr/2022/trial/%lang.html",
                UPGRADE_SCREEN_WEB_CONTENT_URL_TEMPLATE: "https://ipm.corel.com/products/vtr/2022/trial/%lang.html",
                IMPORT_EXPORT_DOCUMENTATION: "/docs/import-export/",
                VECTOR_PRODUCT_PAGE: "https://www.coreldraw.com/vector",
                CORELDRAW_PAGE: "https://www.coreldraw.com",
            };
        };
