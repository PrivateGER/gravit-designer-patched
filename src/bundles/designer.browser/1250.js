module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i(e, t) {
            ((this.oldPersona = e), (this.newPersona = t));
        }
        (GObject.GObject.inherit(i, GObject.GEvent), (i.prototype.oldPersona = null), (i.prototype.newPersona = null), (module.exports = i));
    };
