module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(3));
        var GObject = require(1);
        const GStorage = require(237),
            CloudFile = require(156);
        function GExternalStorage() {}
        (GObject.GObject.inherit(GExternalStorage, GStorage),
            (GExternalStorage.Item = function (id, file) {
                (GStorage.Item.call(this, id), this.setFile(file));
            }),
            GObject.GObject.inherit(GExternalStorage.Item, GStorage.Item),
            (GExternalStorage.Item.prototype._app = null),
            (GExternalStorage.Item.prototype._filename = null),
            (GExternalStorage.Item.prototype._ext = null),
            (GExternalStorage.Item.prototype._id = null),
            (GExternalStorage.Item.prototype._file = null),
            (GExternalStorage.Item.prototype.isRegistrable = function () {
                return !!this.getId();
            }),
            (GExternalStorage.Item.prototype.getId = function () {
                return this._id;
            }),
            (GExternalStorage.Item.prototype.setId = function (id) {
                return ((this._id = id), this);
            }),
            (GExternalStorage.Item.prototype.getFullName = function () {
                return this._filename;
            }),
            (GExternalStorage.Item.prototype.getName = function () {
                return this._filename;
            }),
            (GExternalStorage.Item.prototype.setFileName = function (filename) {
                return ((this._filename = filename), this);
            }),
            (GExternalStorage.Item.prototype.getExtension = function () {
                return (this._ext && this._ext.toUpperCase()) || "CDRAPP";
            }),
            (GExternalStorage.Item.prototype.setFile = function (file) {
                if (!file) throw new Error(GObject.GLocale.get(new GObject.GLocaleKey("GExternalStorage", "text.error-file-cant-be-null")));
                ((file = CloudFile.createOrReturnSelfInstance(file)), (this._file = file), (this._id = file.id), (this._filename = file.name));
            }),
            (GExternalStorage.Item.prototype.getFile = function () {
                const file = this._file;
                return (!file.settings && this._client && (file.settings = this._client.getSettings()), file);
            }),
            (GExternalStorage.Item.prototype.hasFileSettings = function () {
                return this._file && this._file.settings;
            }),
            (GExternalStorage.Item.prototype.getUniqueId = function () {
                return this._id;
            }),
            (GExternalStorage.Item.prototype.getVersion = function () {
                throw Error("Not implemented!");
            }),
            (GExternalStorage.Item.prototype.getMimeType = function () {
                throw Error("Not implemented!");
            }),
            (GExternalStorage.Item.prototype.hasVersionControl = function () {
                return false;
            }),
            (GExternalStorage.Item.prototype.hasUpdates = async function () {
                throw Error("Not implemented!");
            }),
            (GExternalStorage.Item.prototype.getLatestFileVersion = async function () {
                throw Error("Not implemented!");
            }),
            (GExternalStorage.Item.prototype.getLatestFileInfo = async function () {
                throw Error("Not implemented!");
            }),
            (GExternalStorage.Item.prototype.exists = async function () {
                throw Error("Not implemented!");
            }),
            (GExternalStorage.Item.prototype.isVersionNewerThan = function () {
                throw Error("Not implemented!");
            }),
            (GExternalStorage.Item.prototype.setCloudClient = function (client) {
                this._client = client;
            }),
            (GExternalStorage.Item.prototype.getCloudClient = function () {
                return this._client;
            }),
            (GExternalStorage.Item.prototype.supportsSharing = function () {
                return this._getClient().isCorporate();
            }),
            (GExternalStorage.Item.prototype.getCorporateProviderName = function () {
                throw Error("Not implemented!");
            }),
            (GExternalStorage.Item.prototype.isEmailFromCorporateDomain = function () {
                throw Error("Not implemented!");
            }),
            (GExternalStorage.Item.prototype.toString = function () {
                return "[Object GExternalStorage.Item]";
            }),
            (module.exports = GExternalStorage));
    };
