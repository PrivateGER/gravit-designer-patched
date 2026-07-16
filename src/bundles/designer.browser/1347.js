module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function i(e, t) {
            ((this.type = e), (this.data = t));
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.Type = { OpenInAppLink: 1 }),
            (i.prototype.type = null),
            (i.prototype.data = null),
            (module.exports = i));
    };
