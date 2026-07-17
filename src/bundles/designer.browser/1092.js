module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13));
        const CloudFile = require(156),
            designerConfig = require(10);
        module.exports = class {
            static createFrom(e) {
                let t = false;
                e instanceof CloudFile && (t = true);
                var n = CloudFile.from(e);
                (n.setItemType(CloudFile.Type.File),
                    t ||
                        n.setPermissions([
                            CloudFile.Permission.Open,
                            CloudFile.Permission.Copy,
                            CloudFile.Permission.Editing,
                            CloudFile.Permission.Rename,
                            CloudFile.Permission.CutPaste,
                            CloudFile.Permission.Delete,
                            CloudFile.Permission.Download,
                        ]),
                    n.autosave
                        ? (n.setPreviewURL(n.autosave_url_t), n.setModificationTime(e.autosave_updated))
                        : (n.setPreviewURL(n.url_t || n.url_s), n.setModificationTime(e.updated)));
                const a = designerConfig.FILE_FORMATS.find((e) => {
                    const t = n.getMimeType();
                    return !(!t || e.type.toLowerCase() !== t.toLowerCase()) || e.ext.toLowerCase() === n.getExtension();
                });
                return (n.setMimeType(a.type), (n.ext = a.ext), (n.extension = a.ext), (n.storage = CloudFile.Storage.Gravit), n);
            }
        };
    };
