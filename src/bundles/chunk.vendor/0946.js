module.exports = function (module, exports, require) {
            "use strict";

            function n() {}
            ((n.prototype.toDate = function (e) {
                return "string" == typeof e || "number" == typeof e ? new Date(e) : e;
            }),
                (n.prototype.format = function (e, t, i) {
                    i = i || {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    };
                    return this.toDate(e).toLocaleDateString(t, i);
                }),
                (module.exports = new n()));
        };
