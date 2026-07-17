module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(32), require(33));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31),
            s = require(106);
        function GPasteInPlaceAction() {}
        (GObject.GObject.inherit(GPasteInPlaceAction, GAction),
            (GPasteInPlaceAction.ID = "edit.paste.in-place"),
            (GPasteInPlaceAction.TITLE = new GObject.GLocaleKey("GPasteInPlaceAction", "title")),
            (GPasteInPlaceAction.prototype.getId = function () {
                return GPasteInPlaceAction.ID;
            }),
            (GPasteInPlaceAction.prototype.getTitle = function () {
                return GPasteInPlaceAction.TITLE;
            }),
            (GPasteInPlaceAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_PASTE;
            }),
            (GPasteInPlaceAction.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (GPasteInPlaceAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "V"];
            }),
            (GPasteInPlaceAction.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument && activeDocument.getEditor().getSelection()) {
                    if (document.queryCommandSupported("paste")) return true;
                    var mimeTypes = gDesigner.getClipboardMimeTypes();
                    if (mimeTypes && mimeTypes.indexOf(GObject.GNode.MIME_TYPE) >= 0) return !!gDesigner.getActiveDocument();
                }
                return false;
            }),
            (GPasteInPlaceAction.prototype.execute = function () {
                (gDesigner.getPaste().assignCallback(this._paste.bind(this)),
                    (!gDesigner.isTouchDevice() && document.execCommand("paste")) ||
                        (gDesigner.getPaste().assignCallback(null),
                        this._paste(GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)))));
            }),
            (GPasteInPlaceAction.prototype._paste = function (elements, useElementEditors) {
                if (elements && elements.length > 0) {
                    for (var pasteElements = [], i = 0; i < elements.length; ++i) elements[i] instanceof GObject.GElement && pasteElements.push(elements[i]);
                    if ((pasteElements = gDesigner.getActiveDocument().filterUnrestrictedCommercialFileElements(pasteElements)).length > 0) {
                        var editor = gDesigner.getActiveDocument().getEditor();
                        pasteElements.forEach((element) => {
                            element instanceof GObject.GText &&
                                !element.getProperty("content") &&
                                (editor.insertElements([element], false, true, true), element.getParent().removeChild(element));
                        });
                        var selectionX = null,
                            selectionY = null,
                            selectionBBox = editor.getSelectionBBox(true);
                        (selectionBBox && ((selectionX = selectionBBox.getX()), (selectionY = selectionBBox.getY())), editor.beginTransaction());
                        try {
                            editor.insertElements(pasteElements, !useElementEditors, true, true, true);
                            var pastedBBox = null;
                            pasteElements.forEach((element) => {
                                var geometryBBox = element.getGeometryBBox();
                                geometryBBox && (pastedBBox = pastedBBox ? pastedBBox.united(geometryBBox) : geometryBBox);
                            });
                            var pastedX = pastedBBox ? pastedBBox.getX() : null,
                                pastedY = pastedBBox ? pastedBBox.getY() : null,
                                transform = null;
                            if (
                                (null === selectionX ||
                                    null === pastedX ||
                                    (GObject.GMath.isEqualEps(selectionX, pastedX) && GObject.GMath.isEqualEps(selectionY, pastedY)) ||
                                    (transform = new GObject.GTransform(1, 0, 0, 1, selectionX - pastedX, selectionY - pastedY)),
                                transform)
                            )
                                for (i = 0; i < pasteElements.length; ++i) {
                                    var g = pasteElements[i];
                                    g.hasMixin(GObject.GElement.Transform) && g.transform(transform, true);
                                }
                        } finally {
                            editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                        }
                    }
                }
            }),
            (GPasteInPlaceAction.prototype.toString = function () {
                return "[Object GPasteInPlaceAction]";
            }),
            (module.exports = GPasteInPlaceAction));
    };
