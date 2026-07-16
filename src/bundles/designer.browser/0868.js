module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i(e) {
            this.type = e;
        }
        (GObject.GObject.inherit(i, GObject.GEvent), (i.prototype.type = null), (i.Type = { Updated: 0 }), (module.exports = i));
    };
