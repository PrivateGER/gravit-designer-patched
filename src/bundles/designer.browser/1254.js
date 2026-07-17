module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1);
        const GCategory = require(18),
            GAction = require(31),
            GSystemDialog = require(44),
            GDocument = require(163),
            GContainer = require(85),
            c = require(1255);
        function d() {}
        (GObject.GObject.inherit(d, GAction),
            (d.ID = "file.share.opensharedfile"),
            (d.TITLE = new GObject.GLocaleKey("GOpenSharedFileAction", "title")),
            (d.prototype.getId = function () {
                return d.ID;
            }),
            (d.prototype.getTitle = function () {
                return d.TITLE;
            }),
            (d.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE_SHARE;
            }),
            (d.prototype.getGroup = function () {
                return "file-share/opensharedfile";
            }),
            (d.prototype.isVisible = function () {
                return true;
            }),
            (d.prototype.execute = function () {
                GSystemDialog.prompt(
                    GObject.GLocale.get(new GObject.GLocaleKey("GOpenSharedFileAction", "text.prompt-text")),
                    (e) => {
                        if (void 0 !== e)
                            try {
                                var t = new URL(e).searchParams.get(GContainer.OpenFileRequest.Type.Token);
                                if (t) {
                                    let e = new GContainer.OpenFileRequest(GContainer.OpenFileRequest.Type.Token, t);
                                    gApi.setToken({ token: t });
                                    let n = new GDocument();
                                    (n.setTitle(e.getContent()), gDesigner.addDocument(n), c.handleOpenFileRequest(n, e));
                                } else GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GOpenSharedFileAction", "invalid-link")));
                            } catch (e) {
                                (console.error(e), GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GOpenSharedFileAction", "invalid-link"))));
                            }
                    },
                    null,
                    GObject.GLocale.get(new GObject.GLocaleKey("GOpenSharedFileAction", "text.cancel")),
                    GObject.GLocale.get(new GObject.GLocaleKey("GOpenSharedFileAction", "text.open")),
                    "open-shared-file-dialog"
                );
            }),
            (d.prototype.toString = function () {
                return "[Object GOpenSharedFileAction]";
            }),
            (module.exports = d));
    };
