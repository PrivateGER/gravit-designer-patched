module.exports = function (module, exports, require) {
            "use strict";
            module.exports = (e) => {
                e.file = {
                    registerAccess: (t) =>
                        e.fetchJSON("/file/" + t + "/access", {
                            method: "POST",
                        }),
                };
            };
        };
