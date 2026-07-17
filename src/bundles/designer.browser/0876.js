module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41), require(32), require(38), require(33));
        var GObject = require(1),
            GPlatform = require(15);
        const GCategory = require(18),
            GElementAction = require(106);
        function GPasteAndReplaceAction() {}
        (GObject.GObject.inherit(GPasteAndReplaceAction, GElementAction),
            (GPasteAndReplaceAction.ID = "edit.paste.replace"),
            (GPasteAndReplaceAction.TITLE = new GObject.GLocaleKey("GPasteAndReplaceAction", "title")),
            (GPasteAndReplaceAction.prototype.getId = function () {
                return GPasteAndReplaceAction.ID;
            }),
            (GPasteAndReplaceAction.prototype.getTitle = function () {
                return GPasteAndReplaceAction.TITLE;
            }),
            (GPasteAndReplaceAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-paste-and-replace" : null;
            }),
            (GPasteAndReplaceAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_PASTE;
            }),
            (GPasteAndReplaceAction.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (GPasteAndReplaceAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.COMMAND, "V"];
            }),
            (GPasteAndReplaceAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                const activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument && activeDocument.getEditor(),
                    selection = editor && editor.getSelection();
                if (selection && selection.length > 0) {
                    if (document.queryCommandSupported("paste")) return true;
                    const mimeTypes = gDesigner.getClipboardMimeTypes();
                    if (mimeTypes && mimeTypes.indexOf(GObject.GNode.MIME_TYPE) >= 0) return true;
                }
                return false;
            }),
            (GPasteAndReplaceAction.prototype.execute = function () {
                (gDesigner.getPaste().assignCallback(this._paste.bind(this)),
                    (!gDesigner.isTouchDevice() && document.execCommand("paste")) ||
                        (gDesigner.getPaste().assignCallback(null),
                        this._paste(GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)))));
            }),
            (GPasteAndReplaceAction.prototype._paste = function (elements) {
                if (elements && elements.length > 0) {
                    const activeDocument = gDesigner.getActiveDocument();
                    if (!activeDocument) return;
                    const editor = activeDocument && activeDocument.getEditor();
                    if (!editor || !editor.hasSelection()) return;
                    const filteredElements = activeDocument.filterUnrestrictedCommercialFileElements(elements.filter((node) => node instanceof GObject.GElement));
                    if (filteredElements.length > 0) {
                        editor.beginTransaction();
                        try {
                            let insertedElements = [];
                            const selectedElements = editor.getSelection().slice();
                            (this._fixTexts(filteredElements),
                                selectedElements.forEach((selectedElement) => {
                                    const replacements = this._replace(selectedElement, filteredElements);
                                    replacements && replacements.length > 0 && (insertedElements = insertedElements.concat(replacements));
                                }),
                                editor.insertElements(insertedElements, true, true, false, true));
                        } finally {
                            editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                        }
                    }
                }
            }),
            (GPasteAndReplaceAction.prototype._fixTexts = function (elements) {
                const activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument && activeDocument.getEditor();
                editor &&
                    elements.forEach((element) => {
                        element.accept((node) => {
                            if (node instanceof GObject.GText) return (editor.insertElements([element], true, true, false), element.getParent().removeChild(element), false);
                        });
                    });
            }),
            (GPasteAndReplaceAction.prototype._replace = function (element, pastedElements) {
                const boundingBox = this._getBoundingBox(pastedElements);
                if (!boundingBox) return;
                const elementBBox = element.getGeometryBBox(),
                    transform = new GObject.GTransform(1, 0, 0, 1, elementBBox.getX() - boundingBox.getX(), elementBBox.getY() - boundingBox.getY()),
                    clonedElements = this._clone(pastedElements);
                return (
                    clonedElements.forEach((clonedElement) => {
                        clonedElement.hasMixin(GObject.GElement.Transform) && clonedElement.transform(transform, true);
                    }),
                    element.getParent().removeChild(element),
                    clonedElements
                );
            }),
            (GPasteAndReplaceAction.prototype._clone = function (elements) {
                return elements.map((element) => element.clone());
            }),
            (GPasteAndReplaceAction.prototype._getBoundingBox = function (elements) {
                let boundingBox;
                return (
                    elements.forEach((element) => {
                        const elementBBox = element.getGeometryBBox();
                        elementBBox && !elementBBox.isEmpty() && (boundingBox = boundingBox ? boundingBox.united(elementBBox) : elementBBox);
                    }),
                    boundingBox
                );
            }),
            (GPasteAndReplaceAction.prototype.toString = function () {
                return "[Object GPasteAndReplaceAction]";
            }),
            (module.exports = GPasteAndReplaceAction));
    };
