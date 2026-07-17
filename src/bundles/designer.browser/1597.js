module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            Utils = require(40),
            GCategory = require(18),
            GElementAction = require(106);
        function GConnectLinesAction() {}
        (GObject.GObject.inherit(GConnectLinesAction, GElementAction),
            (GConnectLinesAction.ID = "modify.connect-lines"),
            (GConnectLinesAction.TITLE = new GObject.GLocaleKey("GConnectLinesAction", "title")),
            (GConnectLinesAction.prototype.getId = function () {
                return GConnectLinesAction.ID;
            }),
            (GConnectLinesAction.prototype.getTitle = function () {
                return GConnectLinesAction.TITLE;
            }),
            (GConnectLinesAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (GConnectLinesAction.prototype.getGroup = function () {
                return "structure/path";
            }),
            (GConnectLinesAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var selection = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null;
                if (selection) for (var t = 0; t < selection.length; ++t) if (selection[t] instanceof GObject.GPath) return true;
                return false;
            }),
            (GConnectLinesAction.prototype.execute = function () {
                var activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument ? activeDocument.getEditor() : null,
                    selection = editor ? editor.getSelection() : null,
                    paths = [],
                    parent = null;
                if (selection)
                    for (var s = 0; s < selection.length; ++s) {
                        var l = selection[s];
                        l instanceof GObject.GPath && (parent ? parent === l.getParent() && paths.push(l) : (parent = l.getParent()) && paths.push(l));
                    }
                if (paths.length) {
                    editor.beginTransaction();
                    try {
                        if (1 == paths.length) paths[0].setProperty("closed", true);
                        else
                            try {
                                (0, Utils.blockChanges)(editor, null, null, parent);
                                var segment,
                                    lastPath = (paths = GObject.GNode.order(paths))[paths.length - 1],
                                    transform = lastPath.getProperty("trf"),
                                    inverseTransform = transform ? transform.inverted() : null,
                                    nextSibling = lastPath.getNext(),
                                    anchorPoints = [];
                                for (s = 0; s < paths.length - 1; ++s)
                                    ((segment = paths[s]).removeFlag(GObject.GNode.Flag.Selected),
                                        segment.setProperty("closed", false),
                                        parent.removeChild(segment),
                                        (transform = (transform = segment.getProperty("trf")) ? (inverseTransform ? transform.multiplied(inverseTransform) : transform) : inverseTransform),
                                        (anchorPoints = anchorPoints.concat(segment.getAnchorPoints().serialize(transform))));
                                (lastPath.removeFlag(GObject.GNode.Flag.Selected), parent.removeChild(lastPath), (anchorPoints = anchorPoints.concat(lastPath.getAnchorPoints().serialize())));
                                var mergedPath = new GObject.GPath();
                                (mergedPath.getAnchorPoints().deserialize(anchorPoints), mergedPath.assignFrom(lastPath), parent.insertChild(mergedPath, nextSibling));
                            } finally {
                                ((0, Utils.releaseChanges)(editor, null, null, parent), editor.updateSelection(false, [mergedPath]));
                            }
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (GConnectLinesAction.prototype.toString = function () {
                return "[Object GConnectLinesAction]";
            }),
            (module.exports = GConnectLinesAction));
    };
