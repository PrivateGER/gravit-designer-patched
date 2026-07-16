module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i(e, t) {
            ((this.status = e), (this.data = t));
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.prototype.status = null),
            (i.prototype.data = null),
            (i.prototype.toString = function () {
                return "[Object GDocumentStatusEvent]";
            }),
            (module.exports = i));
    };
