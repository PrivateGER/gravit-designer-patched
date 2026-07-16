module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i(e) {
            this.paintMode = e;
        }
        (GObject.GObject.inherit(i, GObject.GEvent), (i.prototype.paintMode = null), (module.exports = i));
    };
