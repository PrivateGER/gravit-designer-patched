module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            Utils = require(40),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GElementAction = require(106);
        function GVectorizeBorderAction() {
            GVectorizeBorderAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GVectorizeBorderAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GVectorizeBorderAction", "tooltip-description")),
                    learnMore: "/docs/basics/modify-paths/#vectorize-borders",
                }),
            };
        }
        (GObject.GObject.inherit(GVectorizeBorderAction, GElementAction),
            (GVectorizeBorderAction.ID = "modify.vectorize"),
            (GVectorizeBorderAction.TITLE = new GObject.GLocaleKey("GVectorizeBorderAction", "title")),
            (GVectorizeBorderAction.TOOLTIP_CONFIG = null),
            (GVectorizeBorderAction.prototype.getId = function () {
                return GVectorizeBorderAction.ID;
            }),
            (GVectorizeBorderAction.prototype.getTitle = function () {
                return GVectorizeBorderAction.TITLE;
            }),
            (GVectorizeBorderAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (GVectorizeBorderAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (GVectorizeBorderAction.prototype.getIcon = function () {
                return "gravit-icon-vectorize-border";
            }),
            (GVectorizeBorderAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var selection = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null,
                    hasBorderLayers = false;
                if (selection)
                    for (var n = 0; !hasBorderLayers && n < selection.length; ++n)
                        if (!(selection[n] instanceof GObject.GImage) && selection[n].hasMixin(GObject.GVertexSource) && selection[n].hasMixin(GObject.GStylable)) {
                            var i = selection[n].getPaintLayers(),
                                a = i ? i.getBorderLayers(true) : null;
                            hasBorderLayers = a && a.length >= 1;
                        }
                return hasBorderLayers;
            }),
            (GVectorizeBorderAction.prototype.execute = function () {
                var affectedParents,
                    document = gDesigner.getActiveDocument(),
                    editor = document ? document.getEditor() : null,
                    selection = (document && document.getScene(), editor ? editor.getIndividualSelection() : null),
                    elements = [];
                if (selection)
                    for (var s = 0; s < selection.length; ++s) {
                        var l = selection[s];
                        !l.hasMixin(GObject.GVertexSource) || l instanceof GObject.GImage || !l.hasMixin(GObject.GStylable) || elements.push(l);
                    }
                if (elements.length) {
                    var appendSubPaths = function (targetPath, sourcePath) {
                        if (sourcePath instanceof GObject.GPath) targetPath.getPaths().appendChild(sourcePath);
                        else
                            for (var next, clonedPaths = sourcePath.cloneSubPaths(), child = clonedPaths.getFirstChild(); null !== child; child = next)
                                ((next = child.getNext()), clonedPaths.removeChild(child), targetPath.getPaths().appendChild(child));
                    };
                    editor.beginTransaction();
                    try {
                        var sourceElement,
                            resultElements = [],
                            vectorizeBorderLayer = function (borderLayer) {
                                var alignment = borderLayer.getProperty("_ba"),
                                    width = borderLayer.getProperty("_bw");
                                width = width || 1;
                                var resultPath,
                                    offset = alignment == GObject.GStylable.BorderAlignment.Center ? 0.5 * width : width,
                                    offsetter = new GObject.GVertexOffsetter(
                                        GObject.GPathUtil.makeClockWise(sourceElement),
                                        offset,
                                        alignment != GObject.GStylable.BorderAlignment.Outside,
                                        alignment != GObject.GStylable.BorderAlignment.Inside,
                                        0,
                                        borderLayer.getProperty("_blc"),
                                        borderLayer.getProperty("_bml")
                                    );
                                if (alignment == GObject.GStylable.BorderAlignment.Center) resultPath = GObject.GPathUtil.createPathFromVertexSource(offsetter);
                                else {
                                    var outerPath = GObject.GPathUtil.createPathFromVertexSource(sourceElement),
                                        innerPath = GObject.GPathUtil.createPathFromVertexSource(offsetter);
                                    outerPath && ((resultPath = new GObject.GCompoundPath()), appendSubPaths(resultPath, outerPath), innerPath && appendSubPaths(resultPath, innerPath));
                                }
                                return (
                                    resultPath &&
                                        (GObject.GElement.prototype.assignFrom.call(resultPath, sourceElement),
                                        resultPath.getPaintLayers().clearLayers(),
                                        borderLayer.$_pt && resultPath.getPaintLayers().appendChild(new GObject.GStylable.FillPaintLayer(borderLayer.$_pt))),
                                    resultPath
                                );
                            };
                        affectedParents = new Set();
                        for (s = 0; s < elements.length; ++s) {
                            var g = elements[s].getParent();
                            g && affectedParents.add(g);
                        }
                        try {
                            (0, Utils.blockChanges)(editor, affectedParents);
                            for (s = 0; s < elements.length; ++s) {
                                var h = (sourceElement = elements[s]).getParent(),
                                    f = sourceElement.getNext(),
                                    m = null,
                                    y = sourceElement.getPaintLayers().getBorderLayers(true);
                                if (y.length > 1)
                                    GObject.GUtil.each(y, function (index, borderLayer) {
                                        var builtPath = vectorizeBorderLayer(borderLayer);
                                        builtPath && (m || (m = new GObject.GGroup()), m.appendChild(builtPath));
                                    });
                                else if (1 == y.length) {
                                    var v = y.pop();
                                    m = vectorizeBorderLayer(v);
                                }
                                m ? (h.insertChild(m, f), resultElements.push(m), h.removeChild(sourceElement)) : resultElements.push(sourceElement);
                            }
                        } finally {
                            ((0, Utils.releaseChanges)(editor, affectedParents), resultElements.length && editor.updateSelection(false, resultElements));
                        }
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (GVectorizeBorderAction.prototype.getTooltipConfig = function (area) {
                return (area && GVectorizeBorderAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GVectorizeBorderAction.prototype.toString = function () {
                return "[Object GVectorizeBorderAction]";
            }),
            (module.exports = GVectorizeBorderAction));
    };
