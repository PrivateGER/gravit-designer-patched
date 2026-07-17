module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GCategory = require(18),
            GAction = require(106);
        function GConvertToRawPathAction() {}
        (GObject.GObject.inherit(GConvertToRawPathAction, GAction),
            (GConvertToRawPathAction.ID = "modify.converttorawpath"),
            (GConvertToRawPathAction.TITLE = new GObject.GLocaleKey("GConvertToRawPathAction", "title")),
            (GConvertToRawPathAction.prototype.getId = function () {
                return GConvertToRawPathAction.ID;
            }),
            (GConvertToRawPathAction.prototype.getTitle = function () {
                return GConvertToRawPathAction.TITLE;
            }),
            (GConvertToRawPathAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (GConvertToRawPathAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (GConvertToRawPathAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-convert-to-raw-path" : null;
            }),
            (GConvertToRawPathAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.SHIFT, "R"];
            }),
            (GConvertToRawPathAction.prototype._isValidElement = function (element) {
                if (element instanceof GObject.GPath || element instanceof GObject.GCompoundPath) {
                    var paths = [];
                    if (element instanceof GObject.GCompoundPath) for (var path = element.getPaths().getFirstChild(); null !== path; path = path.getNext()) paths.push(path);
                    else paths = [element];
                    for (var i = 0; i < paths.length; i++)
                        for (var a = paths[i].getAnchorPoints().getFirstChild(); a; ) {
                            if (GObject.GPathBase.isCornerType(a.getProperty("tp"))) return true;
                            a = a.getNext();
                        }
                    return false;
                }
                return !(!element.hasMixin(GObject.GVertexSource) || element instanceof GObject.GImage || element instanceof GObject.GPathsGraph);
            }),
            (GConvertToRawPathAction.prototype.isEnabled = function () {
                if (!GAction.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getSelection();
                    if (selection) for (var n = 0; n < selection.length; ++n) if (this._isValidElement(selection[n])) return true;
                }
                return false;
            }),
            (GConvertToRawPathAction.prototype.execute = function () {
                var newPaths,
                    activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument ? activeDocument.getEditor() : null,
                    individualSelection = editor ? editor.getIndividualSelection() : null,
                    validElements = [],
                    parentSet = new Set();
                if (individualSelection)
                    for (var l = 0; l < individualSelection.length; ++l) {
                        var c = individualSelection[l];
                        this._isValidElement(c) && (validElements.push(c), parentSet.add(c.getParent()));
                    }
                editor.beginTransaction();
                try {
                    try {
                        ((0, Utils.blockChanges)(editor, parentSet), (newPaths = []));
                        for (l = 0; l < validElements.length; ++l) {
                            var d = validElements[l],
                                u = d.getParent(),
                                p = d.getNext(),
                                g = GObject.GPathUtil.createPathFromVertexSource(d);
                            (g && (GObject.GElement.prototype.assignFrom.call(g, d), u.insertChild(g, p), newPaths.push(g)), u.removeChild(d));
                        }
                    } finally {
                        ((0, Utils.releaseChanges)(editor, parentSet), newPaths.length && editor.updateSelection(false, newPaths));
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                }
            }),
            (GConvertToRawPathAction.prototype.toString = function () {
                return "[Object GConvertToRawPathAction]";
            }),
            (module.exports = GConvertToRawPathAction));
    };
