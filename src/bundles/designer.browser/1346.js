module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        function i() {}
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.prototype.message = null),
            (i.prototype.toString = function () {
                return "[Object GUnloadEvent]";
            }),
            (module.exports = i));
    };
