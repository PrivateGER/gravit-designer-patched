module.exports = function (module, exports, require) {
            "use strict";
            module.exports = function (e) {
                e.realtime = {
                    getCollaborators: function (t) {
                        let i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return e.GET("/realtime/".concat(t, "/collaborators"), i);
                    },
                    publishFile: (t, i, n, r, o) =>
                        e.fetchJSON("/realtime/".concat(t, "/publish"), {
                            method: "POST",
                            body: {
                                metadata: i,
                                secondaryFormat: n,
                                collabTextUpdate: r,
                                sendEmail: o,
                            },
                        }),
                };
            };
        };
