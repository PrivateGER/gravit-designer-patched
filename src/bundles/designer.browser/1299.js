module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16),
            GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(813));
        function s() {}
        (GObject.GObject.inherit(s, r.default),
            (s.ID = "".concat(r.default.ID, ".safari")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.ALT_LEFT, "O"];
            }),
            (s.prototype.isAvailable = function () {
                return GPlatform.GPlatform.webBrowser === GPlatform.GPlatform.constructor.WebBrowser.Safari;
            }),
            (module.exports = s));
    };
