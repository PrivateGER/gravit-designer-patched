module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(32), require(33));
        var GObject = require(1),
            GAction = (require(15 /* GPlatform */), require(18 /* GCategory */), require(31 /* GAction */));
        require(1313 /* GPaste */);
        function GPasteHereAction() {
            this._targetPosition = null;
        }
        (GObject.GObject.inherit(GPasteHereAction, GAction),
            (GPasteHereAction.ID = "edit.paste.here"),
            (GPasteHereAction.TITLE = new GObject.GLocaleKey("GPasteHereAction", "title")),
            (GPasteHereAction.prototype._targetPosition = null),
            (GPasteHereAction.prototype.getId = function () {
                return GPasteHereAction.ID;
            }),
            (GPasteHereAction.prototype.getTitle = function () {
                return GPasteHereAction.TITLE;
            }),
            (GPasteHereAction.prototype.getIcon = function () {
                return null;
            }),
            (GPasteHereAction.prototype.getCategory = function () {
                return null;
            }),
            (GPasteHereAction.prototype.getGroup = function () {
                return null;
            }),
            (GPasteHereAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-paste-here" : null;
            }),
            (GPasteHereAction.prototype.getShortcut = function () {
                return null;
            }),
            (GPasteHereAction.prototype.isAvailable = function (context) {
                return !!context && "context.menu" == context;
            }),
            (GPasteHereAction.prototype.isEnabled = function () {
                if (document.queryCommandSupported("paste")) return true;
                var mimeTypes = gDesigner.getClipboardMimeTypes();
                return !!(mimeTypes && mimeTypes.indexOf(GObject.GNode.MIME_TYPE) >= 0) && !!gDesigner.getActiveDocument();
            }),
            (GPasteHereAction.prototype.execute = function () {
                (gDesigner.getPaste().assignCallback(this._paste.bind(this)),
                    document.execCommand("paste") ||
                        (gDesigner.getPaste().assignCallback(null),
                        this._paste(GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)))));
            }),
            (GPasteHereAction.prototype.setPosition = function (point) {
                this._targetPosition = gDesigner
                    .getWindows()
                    .getActiveWindow()
                    .getView()
                    .getViewTransform(gDesigner.getActiveDocument().getScene().getActivePage())
                    .mapPoint(point);
            }),
            (GPasteHereAction.prototype._paste = function (clipboardItems, t) {
                if (clipboardItems && clipboardItems.length > 0) {
                    for (var pastedElements = [], i = 0; i < clipboardItems.length; ++i) clipboardItems[i] instanceof GObject.GElement && pastedElements.push(clipboardItems[i]);
                    if ((pastedElements = gDesigner.getActiveDocument().filterUnrestrictedCommercialFileElements(pastedElements)).length > 0) {
                        var editor = gDesigner.getActiveDocument().getEditor();
                        (pastedElements.forEach((element) => {
                            element instanceof GObject.GText &&
                                !element.getProperty("content") &&
                                (editor.insertElements([element], false, true, true), element.getParent().removeChild(element));
                        }),
                            editor.beginTransaction());
                        try {
                            var bbox;
                            (editor.insertElements(pastedElements, !t, true, true, true),
                                pastedElements.forEach((element) => {
                                    var elementBBox = element.getGeometryBBox();
                                    elementBBox && (bbox = bbox ? bbox.united(elementBBox) : elementBBox);
                                }));
                            var pastedX = bbox ? bbox.getX() : null,
                                pastedY = bbox ? bbox.getY() : null,
                                offsetTransform = null;
                            if (
                                (!this._targetPosition ||
                                    null === pastedX ||
                                    (GObject.GMath.isEqualEps(this._targetPosition.getX(), pastedX) &&
                                        GObject.GMath.isEqualEps(this._targetPosition.getY(), pastedY)) ||
                                    (offsetTransform = new GObject.GTransform(1, 0, 0, 1, this._targetPosition.getX() - pastedX, this._targetPosition.getY() - pastedY)),
                                offsetTransform)
                            )
                                for (i = 0; i < pastedElements.length; ++i) {
                                    var d = pastedElements[i];
                                    d.hasMixin(GObject.GElement.Transform) && d.transform(offsetTransform, true);
                                }
                        } finally {
                            editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste")));
                        }
                    }
                }
            }),
            (GPasteHereAction.prototype.toString = function () {
                return "[Object GPasteHereAction]";
            }),
            (module.exports = GPasteHereAction));
    };
