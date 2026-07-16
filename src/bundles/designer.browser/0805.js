module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i(e) {
            this.user = e;
        }
        (GObject.GObject.inherit(i, GObject.GEvent), (i.prototype.user = null), (module.exports = i));
    };
