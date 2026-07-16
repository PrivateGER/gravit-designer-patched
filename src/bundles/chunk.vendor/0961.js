module.exports = function (module, exports, require) {
            "use strict";
            (require(19),
                require(26),
                (module.exports = function (e) {
                    e.microsoftStoreServices = {
                        getAccessToken: () => e.GET("/microsoft/store/services/token").then((e) => e.token),
                        updateB2BKeys: (t) => {
                            let { accessToken, keys } = t;
                            return e.fetchJSON("/microsoft/store/services/b2b/keys", {
                                method: "POST",
                                body: {
                                    accessToken: accessToken,
                                    keys: keys,
                                },
                            });
                        },
                        syncLicense: () =>
                            e.fetchJSON("/microsoft/store/services/license/sync", {
                                method: "POST",
                            }),
                    };
                }));
        };
