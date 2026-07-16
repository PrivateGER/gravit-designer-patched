module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(8 /* Symbol */), require(3), require(4), require(41));
        var GObject = require(1),
            a = o(require(18 /* GCategory */)),
            r = o(require(163 /* GDocument */)),
            s = o(require(85)),
            l = o(require(106));
        function c(e) {
            this._source = e;
        }
        (GObject.GObject.inherit(c, l.default),
            (c.getId = function (e) {
                return "file.import-image-from-ios-".concat(e);
            }),
            (c.Source = { FILES: "files", PHOTOS: "photos" }),
            (c.prototype._source = null),
            (c.prototype.getId = function () {
                return c.getId(this._source);
            }),
            (c.prototype.getTitle = function () {
                return new GObject.GLocaleKey("GImportImageFromIOSAction", "text.ios-".concat(this._source));
            }),
            (c.prototype.getCategory = function () {
                return a.default.CATEGORY_FILE_IMPORT_IMAGE;
            }),
            (c.prototype.getGroup = function () {
                return "import/image-type/".concat(this._source);
            }),
            (c.prototype.isAvailable = function () {
                return gContainer.getRuntime() === s.default.Runtime.IPad;
            }),
            (c.prototype.isEnabled = function (e) {
                if (!l.default.prototype.isEnabled.call(this)) return false;
                const t = gDesigner.getActiveDocument();
                return (
                    !!t &&
                    !!(e = e || t.getStorage() || gDesigner.getDefaultStorage()) &&
                    e.canPromptOpen() &&
                    gDesigner.getApplicationManager().isImportResourcesEnabled()
                );
            }),
            (c.prototype.execute = async function (e, t) {
                const n = gDesigner.getActiveDocument();
                if (!n) return false;
                e = e || n.getStorage() || gDesigner.getDefaultStorage();
                const o = r.default.FileTypes.filter((e) => e.import_image);
                try {
                    let i;
                    ((i = this._source === c.Source.FILES ? await e.openFromFiles(o) : await e.openFromPhotos(o)),
                        n.placeOrImport(i),
                        t && t());
                } catch (e) {
                    console.warn("GImportImageFromIOSAction.prototype.execute", e);
                }
            }),
            (c.prototype.toString = function () {
                return "[Object GImportImageFromIOSAction]";
            }),
            (module.exports = c));
    };
