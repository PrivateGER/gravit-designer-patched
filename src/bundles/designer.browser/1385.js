module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var GObject = require(1),
            designerConfig = require(10),
            GDocument = require(237),
            GCommonNames = require(220),
            s = require(40 /* GSaveAction */).decrypt;
        require(173);
        function l() {}
        (GObject.GObject.inherit(l, GDocument),
            (l.prototype.canPromptOpen = function () {
                return false;
            }),
            (l.prototype.canPromptSave = function (e) {
                return false;
            }),
            (l.prototype.canSave = function () {
                return false;
            }),
            (l.prototype.canDownload = function () {
                return false;
            }),
            (l.Item = function (e, t, n, o) {
                GCommonNames.CommercialProduct.call(this, e, t, n, o);
            }),
            GObject.GObject.inherit(l.Item, GCommonNames.CommercialProduct),
            (l.Item.prototype.getPrice = async function () {
                return Promise.resolve(this._file.price);
            }),
            (l.Item.prototype.getName = function () {
                return this._filename ? this._filename : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.image"));
            }),
            (l.Item.prototype.getFullName = function () {
                return this._filename ? this._filename : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.image"));
            }),
            (l.Item.prototype.getFormattedPrice = async function () {
                const e = await this.getPrice(),
                    t = GObject.GLocale.toLocaleCurrency(e, "USD");
                return new Promise((e) => e(t));
            }),
            (l.Item.prototype.setFile = function (e) {
                if (!e) throw new Error("File can not be null");
                ((this._file = e), (this._id = e.id), (this._name = e.name));
            }),
            (l.Item.prototype.getFile = function () {
                return this._file;
            }),
            (l.Item.prototype.read = async function (e, t, n) {
                var o = await designerConfig.gApi.getProviderContentFile(this._file.hash);
                return e(new TextEncoder().encode(s(o)));
            }),
            (l.Item.prototype.getExtension = function () {
                return this._file.extension && this._file.extension.toUpperCase();
            }),
            (module.exports = l));
    };
