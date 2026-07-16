module.exports = function (module, exports, require) {
            "use strict";
            module.exports = function (e) {
                e.QA = {
                    isEnabled: () =>
                        e
                            .GET("/qa")
                            .then(() => true)
                            .catch(() => false),
                    listUsers: (t) => e.GET("/qa/users", t),
                    insertAccount: (t) =>
                        e.fetchJSON("/qa/user", {
                            method: "PUT",
                            body: t,
                        }),
                    deleteAccount: (t) =>
                        e.fetchJSON("/qa/user/" + t, {
                            method: "DELETE",
                        }),
                };
            };
        };
