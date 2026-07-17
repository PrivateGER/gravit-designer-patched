module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GCategory = require(18),
            GElementAction = require(106);
        require(811 /* GGroupAction */);
        function GConvertToImageAction() {}
        (GObject.GObject.inherit(GConvertToImageAction, GElementAction),
            (GConvertToImageAction.USE_DPI = true),
            (GConvertToImageAction.ID = "modify.path2bmp"),
            (GConvertToImageAction.TITLE = new GObject.GLocaleKey("GConvertToImageAction", "title")),
            (GConvertToImageAction.prototype.getId = function () {
                return GConvertToImageAction.ID;
            }),
            (GConvertToImageAction.prototype.getTitle = function () {
                return GConvertToImageAction.TITLE;
            }),
            (GConvertToImageAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-flatten" : "";
            }),
            (GConvertToImageAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (GConvertToImageAction.prototype.getGroup = function () {
                return "structure-bitmap";
            }),
            (GConvertToImageAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.F7];
            }),
            (GConvertToImageAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var selection = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null;
                if (selection)
                    for (var t = 0; t < selection.length; ++t)
                        if (selection[t] instanceof GObject.GElement && selection[t].getPaintBBox() && !selection[t].getPaintBBox().isEmpty()) return true;
                return false;
            }),
            (GConvertToImageAction.prototype.execute = function () {
                var document = gDesigner.getActiveDocument(),
                    editor = document ? document.getEditor() : null,
                    selection = editor ? GObject.GNode.order(editor.getIndividualSelection().slice()) : null,
                    elements = [];
                if (selection)
                    for (var a = 0; a < selection.length; ++a)
                        selection[a] instanceof GObject.GElement && selection[a].getPaintBBox() && !selection[a].getPaintBBox().isEmpty() && elements.push(selection[a]);
                if (elements.length) {
                    (editor.beginTransaction(), editor.clearSelection());
                    try {
                        var group = this._groupStuff(elements);
                        if (group) {
                            var parent = group.getParent(),
                                next = group.getNext(),
                                image = this._convertToImage(group);
                            image && (parent.insertChild(image, next), parent.removeChild(group), editor.updateSelection(false, [image]));
                        }
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (GConvertToImageAction.prototype._groupStuff = function (elements) {
                if (elements && 1 === elements.length) return elements[0];
                for (
                    var document = gDesigner.getActiveDocument(), editor = document ? document.getEditor() : null, group = new GObject.GGroup(), validElements = [], s = 0;
                    s < elements.length;
                    ++s
                ) {
                    (element = elements[s]).validateInsertion(group) && validElements.push(element);
                }
                if (validElements.length > 0) {
                    var parentsSet,
                        lastElement = validElements[validElements.length - 1],
                        parent = lastElement.getParent(),
                        next = lastElement.getNext();
                    if (!parent.isLocked() && group.validateInsertion(parent)) {
                        parent.insertChild(group, next);
                        var scene = gDesigner.getActiveDocument().getScene();
                        try {
                            parentsSet = new Set();
                            for (s = 0; s < validElements.length; ++s) parentsSet.add(validElements[s].getParent());
                            (0, Utils.blockChanges)(editor, parentsSet, scene, group);
                            for (s = 0; s < validElements.length; ++s) {
                                var element;
                                ((element = validElements[s]).getParent().removeChild(element), group.appendChild(element));
                            }
                        } finally {
                            (0, Utils.releaseChanges)(editor, parentsSet, scene, group);
                        }
                    }
                }
                return group;
            }),
            (GConvertToImageAction.prototype._convertToImage = function (element) {
                var dpi, scene;
                (element instanceof GObject.GImage || (dpi = GObject.GPaintCanvas.getScreenDPI() * GObject.GLength.DPI),
                    element instanceof GObject.GElement && (scene = element.getScene()),
                    element instanceof GObject.GImage || (dpi = Math.max(dpi || GObject.GLength.DPI, (scene && scene.getProperty("dpi")) || GObject.GLength.DPI)));
                var bitmap = element.toBitmap(null, null, null, null, null, dpi),
                    image = new GObject.GImage(),
                    scale = 1;
                element instanceof GObject.GImage || (scale /= dpi / GObject.GLength.DPI);
                var topLeft = element.getPaintBBox().getSide(GObject.GRect.Side.TOP_LEFT),
                    transform = new GObject.GTransform().scaled(scale, scale).translated(topLeft.getX(), topLeft.getY());
                return (
                    image.setProperties(
                        ["iw", "ih", "url", "trf", "itrf"],
                        [bitmap.getWidth(), bitmap.getHeight(), bitmap.toImageDataUrl(GObject.GBitmap.ImageType.PNG), transform, transform]
                    ),
                    image
                );
            }),
            (GConvertToImageAction.prototype.toString = function () {
                return "[Object GConvertToImageAction]";
            }),
            (module.exports = GConvertToImageAction));
    };
