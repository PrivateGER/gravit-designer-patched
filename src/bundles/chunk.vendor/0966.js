module.exports = function (e, t, i) {
            "use strict";
            e.exports = (e) => {
                e.file = {
                    registerAccess: (t) =>
                        e.fetchJSON("/file/" + t + "/access", {
                            method: "POST",
                        }),
                };
            };
        };
