module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var GObject = require(1),
            designerConfig = require(10),
            GDocument = require(237),
            r = (require(220), require(40 /* GSaveAction */).decrypt);
        require(173);
        function s() {}
        (GObject.GObject.inherit(s, GDocument),
            (s.prototype.canPromptOpen = function () {
                return false;
            }),
            (s.prototype.canPromptSave = function (e) {
                return true;
            }),
            (s.prototype.canSave = function () {
                return true;
            }),
            (s.prototype.canDownload = function () {
                return true;
            }),
            (s.Item = function (e, t, n, o, i) {
                (GDocument.Item.call(this, e), (this._filename = n), (this._id = t), (this._file = o), (this._hash = i));
            }),
            GObject.GObject.inherit(s.Item, GDocument.Item),
            (s.Item.prototype.getName = function () {
                return this._filename ? this._filename : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.image"));
            }),
            (s.Item.prototype.getFullName = function () {
                return this._filename ? this._filename : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.image"));
            }),
            (s.Item.prototype.setFile = function (e) {
                if (!e) throw new Error("File can not be null");
                ((this._file = e), (this._id = e.id), (this._name = e.name));
            }),
            (s.Item.prototype.getFile = function () {
                return this._file;
            }),
            (s.Item.prototype.read = async function (e, t, n) {
                try {
                    var o = await designerConfig.gApi.getProviderExternalAsset(this._hash || this._file.hash);
                    return e(new TextEncoder().encode(r(o)));
                } catch (e) {
                    return t(e);
                }
            }),
            (s.Item.prototype.getExtension = function () {
                return this._file.extension && this._file.extension.toUpperCase();
            }),
            (module.exports = s));
    };
