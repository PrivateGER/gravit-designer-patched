module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41));
        require(53);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GDocument = require(163),
            s = (require(449 /* GFitAllAction */), require(31));
        function l() {}
        (GObject.GObject.inherit(l, s),
            (l.ID = "file.new.clipboard"),
            (l.TITLE = new GObject.GLocaleKey("GNewClipboardAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (l.prototype.getGroup = function () {
                return "document";
            }),
            (l.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.CONTROL, GPlatform.GKey.Constant.OPTION, "N"];
            }),
            (l.prototype.isEnabled = function () {
                return (
                    !!gDesigner.getApplicationManager().isCopyPasteEnabled() &&
                    !!gDesigner.getActiveDocument() &&
                    !!gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)
                );
            }),
            (l.prototype.execute = function () {
                var e = GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE));
                if (e && e.length > 0) {
                    var t = e.filter(function (e) {
                        return e instanceof GObject.GItem || e instanceof GObject.GLayer;
                    });
                    if (t.length > 0) {
                        var n = gDesigner.createScene();
                        (n.getActivePage().setProperties(["bck", "w", "h"], [GObject.GRGBColor.WHITE, 0, 0]), gDesigner.addDocument(new GDocument(n)));
                        var i = gDesigner.getActiveDocument().getEditor();
                        i.beginTransaction();
                        try {
                            i.insertElements(t, true, true, true);
                        } finally {
                            (i.commitTransaction("Paste"), gDesigner.setClipboardContent(GObject.GNode.MIME_TYPE, null));
                        }
                        gDesigner.getActiveDocument().getActiveWindow().centerAndZoom();
                    }
                }
            }),
            (l.prototype._getBBox = function (e) {
                var t = null;
                return (
                    GObject.GUtil.each(e, function (e, n) {
                        var i = n.getPaintBBox();
                        i &&
                            i.getWidth() + i.getHeight() > 0 &&
                            (t = t ? t.united(i) : new GObject.GRect(i.getX(), i.getY(), i.getWidth(), i.getHeight()));
                    }),
                    t
                );
            }),
            (l.prototype.toString = function () {
                return "[Object GNewClipboardAction]";
            }),
            (module.exports = l));
    };
