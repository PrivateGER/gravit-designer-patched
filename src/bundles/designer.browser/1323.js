module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i(e, t) {
            ((this.document = e), (this.state = t));
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.prototype.document = null),
            (i.prototype.state = null),
            (i.prototype.toString = function () {
                return "Object [GShareStateChangedEvent]";
            }),
            (module.exports = i));
    };
