module.exports = function (module, exports, require) {
            "use strict";
            module.exports = function (e) {
                e.marketing = {
                    listFiles: function () {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return e.GET("/marketing/api/v1/list", t);
                    },
                };
            };
        };
