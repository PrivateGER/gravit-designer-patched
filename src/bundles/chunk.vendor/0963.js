module.exports = function (module, exports, require) {
            "use strict";
            module.exports = function (e) {
                e.tokenIssuer = {
                    getWebCDR: (t, i) =>
                        e.fetchJSON("/tokenissuer/webcdr", {
                            method: "POST",
                            body: {
                                fileId: t,
                                data: i,
                            },
                        }),
                };
            };
        };
