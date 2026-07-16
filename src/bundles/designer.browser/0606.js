module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = require(394);
        function a() {
            i.call(this);
        }
        (GObject.GObject.inherit(a, i),
            (a.prototype.init = function (e) {}),
            (a.prototype.activate = function () {}),
            (a.prototype.deactivate = function () {}),
            (a.prototype.isEnabled = function () {
                return true;
            }),
            (a.prototype.toString = function () {
                return "[Object GPanel]";
            }),
            (module.exports = a));
    };
