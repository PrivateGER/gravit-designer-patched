module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41));
        require(53);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GDocument = require(163),
            GAction = (require(449 /* GFitAllAction */), require(31 /* GAction */));
        function GNewClipboardAction() {}
        (GObject.GObject.inherit(GNewClipboardAction, GAction),
            (GNewClipboardAction.ID = "file.new.clipboard"),
            (GNewClipboardAction.TITLE = new GObject.GLocaleKey("GNewClipboardAction", "title")),
            (GNewClipboardAction.prototype.getId = function () {
                return GNewClipboardAction.ID;
            }),
            (GNewClipboardAction.prototype.getTitle = function () {
                return GNewClipboardAction.TITLE;
            }),
            (GNewClipboardAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (GNewClipboardAction.prototype.getGroup = function () {
                return "document";
            }),
            (GNewClipboardAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.CONTROL, GPlatform.GKey.Constant.OPTION, "N"];
            }),
            (GNewClipboardAction.prototype.isEnabled = function () {
                return (
                    !!gDesigner.getApplicationManager().isCopyPasteEnabled() &&
                    !!gDesigner.getActiveDocument() &&
                    !!gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)
                );
            }),
            (GNewClipboardAction.prototype.execute = function () {
                var clipboardNodes = GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE));
                if (clipboardNodes && clipboardNodes.length > 0) {
                    var pastableNodes = clipboardNodes.filter(function (node) {
                        return node instanceof GObject.GItem || node instanceof GObject.GLayer;
                    });
                    if (pastableNodes.length > 0) {
                        var scene = gDesigner.createScene();
                        (scene.getActivePage().setProperties(["bck", "w", "h"], [GObject.GRGBColor.WHITE, 0, 0]), gDesigner.addDocument(new GDocument(scene)));
                        var editor = gDesigner.getActiveDocument().getEditor();
                        editor.beginTransaction();
                        try {
                            editor.insertElements(pastableNodes, true, true, true);
                        } finally {
                            (editor.commitTransaction("Paste"), gDesigner.setClipboardContent(GObject.GNode.MIME_TYPE, null));
                        }
                        gDesigner.getActiveDocument().getActiveWindow().centerAndZoom();
                    }
                }
            }),
            (GNewClipboardAction.prototype._getBBox = function (elements) {
                var bbox = null;
                return (
                    GObject.GUtil.each(elements, function (index, element) {
                        var elementBBox = element.getPaintBBox();
                        elementBBox &&
                            elementBBox.getWidth() + elementBBox.getHeight() > 0 &&
                            (bbox = bbox ? bbox.united(elementBBox) : new GObject.GRect(elementBBox.getX(), elementBBox.getY(), elementBBox.getWidth(), elementBBox.getHeight()));
                    }),
                    bbox
                );
            }),
            (GNewClipboardAction.prototype.toString = function () {
                return "[Object GNewClipboardAction]";
            }),
            (module.exports = GNewClipboardAction));
    };
