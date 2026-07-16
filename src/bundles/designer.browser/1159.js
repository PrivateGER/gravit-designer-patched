module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i(e, t) {
            ((this.type = e), (this.fileId = t));
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.Type = { Enable: 1, Disable: 0, Close: 2 }),
            (i.prototype.fileId = null),
            (i.prototype.type = null),
            (module.exports = i));
    };
