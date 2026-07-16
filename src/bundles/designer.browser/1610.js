module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1),
            GDocument = require(237);
        function a() {}
        (GObject.GObject.inherit(a, GDocument),
            (a.Item = function (e) {
                (GDocument.Item.call(this, new a()), (this._extension = e));
            }),
            GObject.GObject.inherit(a.Item, GDocument.Item),
            (a.Item.prototype._extension = null),
            (a.Item.prototype.getExtension = function () {
                return this._extension;
            }),
            (a.Item.prototype.read = function (e, t, n) {
                return e(this._data);
            }),
            (a.Item.prototype.write = function (e, t, n, o) {
                ((this._data = e), t && t());
            }),
            (module.exports = a));
    };
