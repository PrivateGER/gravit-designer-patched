module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i(e) {
            this.fullscreen = e;
        }
        (GObject.GObject.inherit(i, GObject.GEvent), (i.prototype.fullscreen = false), (module.exports = i));
    };
