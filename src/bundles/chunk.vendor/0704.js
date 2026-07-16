module.exports = function (module, exports, require) {
            "use strict";
            require(3);
            var n = require(947);

            function r(e, t, i, n) {
                ((this.project = e), (this.type = t), (this.content = i), (this.data = n));
            }
            (require(269).inherit(r, n),
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
