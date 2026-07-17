module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GEditor = require(53),
            GObject = require(1),
            Utils = require(40),
            GCategory = require(18),
            GAction = require(106);
        function GSplitLineAction() {}
        (GObject.GObject.inherit(GSplitLineAction, GAction),
            (GSplitLineAction.ID = "modify.split-line"),
            (GSplitLineAction.TITLE = new GObject.GLocaleKey("GSplitLineAction", "title")),
            (GSplitLineAction.prototype.getId = function () {
                return GSplitLineAction.ID;
            }),
            (GSplitLineAction.prototype.getTitle = function () {
                return GSplitLineAction.TITLE;
            }),
            (GSplitLineAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (GSplitLineAction.prototype.getGroup = function () {
                return "structure/path";
            }),
            (GSplitLineAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-break-curve" : null;
            }),
            (GSplitLineAction.prototype.isEnabled = function () {
                if (!GAction.prototype.isEnabled.call(this)) return false;
                var selection = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null,
                    enabled = false;
                if (selection) for (var n = 0; !enabled && n < selection.length; ++n) selection[n] instanceof GObject.GPath && (enabled = this._isPathSplittable(selection[n]));
                return enabled;
            }),
            (GSplitLineAction.prototype.execute = function () {
                var activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument ? activeDocument.getEditor() : null,
                    selection = editor ? editor.getSelection() : null,
                    splittablePaths = [];
                if (selection)
                    for (var r = 0; r < selection.length; ++r) {
                        var s = selection[r];
                        s instanceof GObject.GPath && this._isPathSplittable(s) && splittablePaths.push(s);
                    }
                if (splittablePaths.length) {
                    editor.beginTransaction();
                    try {
                        var parentSet,
                            newPaths = [];
                        parentSet = new Set();
                        for (r = 0; r < splittablePaths.length; ++r) parentSet.add(splittablePaths[r].getParent());
                        try {
                            (0, Utils.blockChanges)(editor, parentSet);
                            for (r = 0; r < splittablePaths.length; ++r) {
                                var point,
                                    u = splittablePaths[r],
                                    p = u.getParent(),
                                    g = u.getNext(),
                                    h = u.getAnchorPoints(),
                                    f = false;
                                if (u.getProperty("closed"))
                                    for (point = h.getFirstChild(); null !== point && !point.hasFlag(GObject.GNode.Flag.Selected); point = point.getNext());
                                else (point = h.getFirstChild()).hasFlag(GObject.GNode.Flag.Selected) || (f = true);
                                var m = point,
                                    y = m,
                                    v = m ? m.getNext() || m.getPrevious() : null,
                                    _ = false;
                                for (
                                    u.getProperty("closed") && (_ = true);
                                    null !== m && (m.hasFlag(GObject.GNode.Flag.Selected) || f) && null !== v;

                                ) {
                                    var clonedPoint,
                                        w = new GObject.GPath(),
                                        C = w.getAnchorPoints();
                                    if (((f = false), w.assignFrom(u), p.insertChild(w, g), newPaths.push(w), (point = h.getNextPoint(m)), _))
                                        ((clonedPoint = new GObject.GPathBase.AnchorPoint()).deserialize(m.serialize()), (m = clonedPoint), (_ = false));
                                    else h.removeChild(m);
                                    for (C.appendChild(m); null !== point && !point.hasFlag(GObject.GNode.Flag.Selected) && h.getFirstChild(); )
                                        ((v = h.getNextPoint(point)), h.removeChild(point), C.appendChild(point), (point = v));
                                    if (null !== point && point.hasFlag(GObject.GNode.Flag.Selected) && h.getFirstChild())
                                        ((clonedPoint = new GObject.GPathBase.AnchorPoint()).deserialize(point.serialize()),
                                            C.appendChild(clonedPoint),
                                            (v = (m = point) === y ? null : h.getNextPoint(point)));
                                    else v = null;
                                    w.isLine() &&
                                        (w.getPaintLayers().getBorderLayers(true).length ||
                                            (u.getPaintLayers().getFillLayers(true).length
                                                ? w.getPaintLayers().appendChild(new GObject.GStylable.BorderPaintLayer(GObject.GRGBColor.BLACK))
                                                : w.getPaintLayers().appendChild(u.getPaintLayers().getFillLayers(true)[0])));
                                }
                                p.removeChild(u);
                            }
                        } finally {
                            ((0, Utils.releaseChanges)(editor, parentSet), newPaths.length && editor.updateSelection(false, newPaths.slice(-1)));
                        }
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (GSplitLineAction.prototype._isPathSplittable = function (path) {
                var splittable = false,
                    editor = GEditor.GElementEditor.getEditor(path),
                    partSelection = editor ? editor.getPartSelection() : null;
                if (partSelection && partSelection.length)
                    for (var a = 0; !splittable && a < partSelection.length; ++a)
                        partSelection[a].type == GEditor.GPathEditor.PartType.Point &&
                            (path.getProperty("closed") ||
                                (partSelection[a].point != path.getAnchorPoints().getFirstChild() && partSelection[a].point != path.getAnchorPoints().getLastChild())) &&
                            (splittable = true);
                return splittable;
            }),
            (GSplitLineAction.prototype.toString = function () {
                return "[Object GSplitLineAction]";
            }),
            (module.exports = GSplitLineAction));
    };
