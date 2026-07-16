module.exports = function (module, exports) {
            function i() {}
            ((i.prototype.toDate = function (e) {
                return "string" == typeof e || "number" == typeof e ? new Date(e) : e;
            }),
                (i.prototype.format = function (e, t, i) {
                    i = i || {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    };
                    return this.toDate(e).toLocaleDateString(t, i);
                }),
                (module.exports = new i()));
        };
