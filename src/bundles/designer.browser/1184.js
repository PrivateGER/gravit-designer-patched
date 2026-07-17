module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(4), require(32), require(33), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = (require(53), require(18 /* GCategory */)),
            GElementAction = require(106);
        function GPasteInsideAction() {}
        (GObject.GObject.inherit(GPasteInsideAction, GElementAction),
            (GPasteInsideAction.ID = "edit.paste.inside"),
            (GPasteInsideAction.TITLE = new GObject.GLocaleKey("GPasteInsideAction", "title")),
            (GPasteInsideAction.prototype.getId = function () {
                return GPasteInsideAction.ID;
            }),
            (GPasteInsideAction.prototype.getTitle = function () {
                return GPasteInsideAction.TITLE;
            }),
            (GPasteInsideAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_PASTE;
            }),
            (GPasteInsideAction.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (GPasteInsideAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-paste-inside" : null;
            }),
            (GPasteInsideAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "V"];
            }),
            (GPasteInsideAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getSelection();
                    if (selection) {
                        if (document.queryCommandSupported("paste")) return true;
                        var mimeTypes = gDesigner.getClipboardMimeTypes();
                        if (mimeTypes && mimeTypes.indexOf(GObject.GNode.MIME_TYPE) >= 0)
                            for (var i = 0; i < selection.length; ++i) if (selection[i].hasMixin(GObject.GNode.Container)) return true;
                    }
                }
                return false;
            }),
            (GPasteInsideAction.prototype.execute = function () {
                (gDesigner.getPaste().assignCallback(this._paste.bind(this)),
                    (!gDesigner.isTouchDevice() && document.execCommand("paste")) ||
                        (gDesigner.getPaste().assignCallback(null),
                        this._paste(GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)))));
            }),
            (GPasteInsideAction.prototype._paste = function (elements, isTextPaste) {
                if (elements && elements.length > 0) {
                    for (var filteredElements = [], i = 0; i < elements.length; ++i) elements[i] instanceof GObject.GElement && filteredElements.push(elements[i]);
                    if ((filteredElements = gDesigner.getActiveDocument().filterUnrestrictedCommercialFileElements(filteredElements)).length > 0) {
                        var editor = gDesigner.getActiveDocument().getEditor(),
                            selectedElements = [...editor.getSelection()];
                        (filteredElements.forEach((element) => {
                            element instanceof GObject.GText &&
                                !element.getProperty("content") &&
                                (editor.insertElements([element], false, true, true), element.getParent().removeChild(element));
                        }),
                            editor.beginTransaction());
                        try {
                            for (i = 0; i < selectedElements.length; ++i) {
                                var s = selectedElements[i];
                                if (s.hasMixin(GObject.GNode.Container) && !s.isLocked()) {
                                    for (var l = [], c = 0; c < filteredElements.length; ++c) filteredElements[c].validateInsertion(s) && l.push(filteredElements[c].clone());
                                    editor.insertElements(l, !isTextPaste, true, false, true, s);
                                    var d = s instanceof GObject.GElement ? s.getGeometryBBox() : null;
                                    if (d) {
                                        var u = d.getX(),
                                            p = d.getY(),
                                            g = null;
                                        l.forEach((clonedElement) => {
                                            var elementBBox = clonedElement.getGeometryBBox();
                                            elementBBox && (g = g ? g.united(elementBBox) : elementBBox);
                                        });
                                        var h = g ? g.getX() : null,
                                            f = g ? g.getY() : null,
                                            m = null;
                                        if (
                                            (null === u ||
                                                null === h ||
                                                (GObject.GMath.isEqualEps(u, h) && GObject.GMath.isEqualEps(p, f)) ||
                                                (m = new GObject.GTransform(1, 0, 0, 1, u - h, p - f)),
                                            m)
                                        )
                                            for (c = 0; c < l.length; ++c) {
                                                var y = l[c];
                                                y.hasMixin(GObject.GElement.Transform) && y.transform(m, true);
                                            }
                                    }
                                }
                            }
                        } finally {
                            editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                        }
                    }
                }
            }),
            (GPasteInsideAction.prototype.toString = function () {
                return "[Object GPasteInsideAction]";
            }),
            (module.exports = GPasteInsideAction));
    };
