module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var i = _interopRequireDefault(require(1195 /* GBrowserStorage */));
        function a(e, t, n, o) {
            (i.default.Item.call(this, e, t, n), (this._fileId = o));
        }
        (require(1 /* GObject */).GObject.inheritAndMix(a, i.default.Item),
            (a.prototype.isRegistrable = function () {
                return !!this.getId();
            }),
            (a.prototype.getId = function () {
                return this._fileId;
            }),
            (a.prototype.toString = function () {
                return "[Object GMarketingFileStorageItem]";
            }),
            (module.exports = a));
    };
