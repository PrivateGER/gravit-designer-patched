module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GElementAction = require(106);
        function GPasteStyleAction() {}
        (GObject.GObject.inherit(GPasteStyleAction, GElementAction),
            (GPasteStyleAction.ID = "edit.paste.style"),
            (GPasteStyleAction.TITLE = new GObject.GLocaleKey("GPasteStyleAction", "title")),
            (GPasteStyleAction.prototype.getId = function () {
                return GPasteStyleAction.ID;
            }),
            (GPasteStyleAction.prototype.getTitle = function () {
                return GPasteStyleAction.TITLE;
            }),
            (GPasteStyleAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_PASTE;
            }),
            (GPasteStyleAction.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (GPasteStyleAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-paste-style" : null;
            }),
            (GPasteStyleAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.F4];
            }),
            (GPasteStyleAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var mimeTypes = gDesigner.getClipboardMimeTypes();
                if (mimeTypes && mimeTypes.indexOf(GObject.GNode.MIME_TYPE) >= 0) {
                    var activeDocument = gDesigner.getActiveDocument();
                    if (activeDocument) {
                        var individualSelection = activeDocument.getEditor().getIndividualSelection();
                        if (individualSelection) for (var i = 0; i < individualSelection.length; ++i) if (individualSelection[i].hasMixin(GObject.GStylable)) return true;
                    }
                }
                return false;
            }),
            (GPasteStyleAction.prototype.execute = function () {
                var elements = GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE));
                if ((elements = gDesigner.getActiveDocument().filterUnrestrictedCommercialFileElements(elements)) && elements.length > 0) {
                    for (var styleSource = null, n = 0; n < elements.length; ++n)
                        if (elements[n].hasMixin(GObject.GStylable)) {
                            styleSource = elements[n];
                            break;
                        }
                    if (!styleSource) return;
                    var editor = gDesigner.getActiveDocument().getEditor(),
                        selection = editor.getIndividualSelection();
                    (styleSource instanceof GObject.GText && gDesigner.getActiveDocument().getScene().getActivePage().appendChild(styleSource), editor.beginTransaction());
                    try {
                        for (n = 0; n < selection.length; ++n) {
                            var r = selection[n];
                            r.hasMixin(GObject.GStylable) && r.assignStyleFrom(styleSource);
                        }
                    } finally {
                        (editor.commitTransaction(GObject.GLocale.get(this.getTitle())),
                            styleSource instanceof GObject.GText && gDesigner.getActiveDocument().getScene().getActivePage().removeChild(styleSource));
                    }
                }
            }),
            (GPasteStyleAction.prototype.toString = function () {
                return "[Object GPasteStyleAction]";
            }),
            (module.exports = GPasteStyleAction));
    };
