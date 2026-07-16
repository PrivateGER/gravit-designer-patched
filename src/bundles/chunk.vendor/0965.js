module.exports = function (module, exports, require) {
            "use strict";
            module.exports = (e) => {
                e.signupGuestUser = (t) =>
                    e.fetchJSON("/signupguestuser", {
                        method: "POST",
                        body: t,
                    });
            };
        };
