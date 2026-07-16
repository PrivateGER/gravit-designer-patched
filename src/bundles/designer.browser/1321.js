module.exports = function (module, exports, require) {
        "use strict";
        (require(30 /* polyfill:Object */), require(3));
        var GObject = require(1);
        function i(e, t) {
            ((this.notification = Object.assign({ popup: false, annonymous: false }, e || {})), (this.builder = t));
        }
        (GObject.GObject.inherit(i, GObject.GEvent),
            (i.prototype.notification = null),
            (i.prototype.toString = function () {
                return "GEvent [GNotificationEvent]";
            }),
            (module.exports = i));
    };
