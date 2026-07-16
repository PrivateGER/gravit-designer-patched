module.exports = function (module, exports, require) {
            "use strict";
            const n = require(579);
            module.exports = function (e) {
                e.lock = {
                    acquire: (t) =>
                        e
                            .fetchJSON("/lock/file/" + t, {
                                method: "PUT",
                            })
                            .then((e) => new n(e)),
                    release: (t) =>
                        e.fetchJSON("/lock/file/" + t, {
                            method: "DELETE",
                        }),
                    get: (t) => e.GET("/lock/file/" + t).then((e) => new n(e)),
                    request: (t) =>
                        e.fetchJSON("/lock/file/" + t + "/request", {
                            method: "POST",
                        }),
                    releaseSync: (t) =>
                        e.fetchSync({
                            method: "DELETE",
                            path: "/lock/file/" + t,
                        }),
                    releaseAllSync: () =>
                        e.fetchSync({
                            method: "DELETE",
                            path: "/lock",
                        }),
                };
            };
        };
