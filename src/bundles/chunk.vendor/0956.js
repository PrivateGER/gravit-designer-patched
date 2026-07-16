module.exports = function (module, exports, require) {
            "use strict";
            module.exports = function (e) {
                e.fetchSync = function () {
                    let {
                        path: t = "",
                        method: i = "GET",
                        withCredentials: n = true,
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    const r = {
                            token: e.token,
                        },
                        o = new XMLHttpRequest();
                    return (o.open(i, e.getUrl(e.url + t, r), false), (o.withCredentials = n), o.send(null), o);
                };
            };
        };
