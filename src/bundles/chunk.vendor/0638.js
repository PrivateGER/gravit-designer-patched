module.exports = function (module, exports, require) {
            var n = require(891);

            function r(e, t, i, n) {
                ((this.project = e), (this.type = t), (this.content = i), (this.data = n));
            }
            (require(261).inherit(r, n),
                (r.Type = {
                    Warning: "Warning",
                }),
                (r.prototype.type = null),
                (r.prototype.content = null),
                (r.prototype.toString = function () {
                    return "[Object GTranslationNotificationEvent]";
                }),
                (module.exports = r));
        };
