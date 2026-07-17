module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(328 /* polyfill:Array */), require(3), require(26));
        var GObject = require(1),
            Utils = require(40),
            GCategory = require(18),
            GAction = require(106);
        function GVectorizeImageAction() {}
        (GObject.GObject.inherit(GVectorizeImageAction, GAction),
            (GVectorizeImageAction.ID = "modify.bmp2path"),
            (GVectorizeImageAction.TITLE = new GObject.GLocaleKey("GVectorizeImageAction", "title")),
            (GVectorizeImageAction.prototype.getId = function () {
                return GVectorizeImageAction.ID;
            }),
            (GVectorizeImageAction.prototype.getTitle = function () {
                return GVectorizeImageAction.TITLE;
            }),
            (GVectorizeImageAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (GVectorizeImageAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (GVectorizeImageAction.prototype.isEnabled = function () {
                if (!GAction.prototype.isEnabled.call(this)) return false;
                var selection = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null;
                if (selection) for (var t = 0; t < selection.length; ++t) if (selection[t] instanceof GObject.GImage && !selection[t].getStatus()) return true;
                return false;
            }),
            (GVectorizeImageAction.prototype.execute = function () {
                var activeDocument = gDesigner.getActiveDocument(),
                    editor = activeDocument ? activeDocument.getEditor() : null,
                    individualSelection = editor ? editor.getIndividualSelection() : null,
                    images = [];
                if (individualSelection) for (var r = 0; r < individualSelection.length; ++r) individualSelection[r] instanceof GObject.GImage && !individualSelection[r].getStatus() && images.push(individualSelection[r]);
                if (images.length) {
                    editor.beginTransaction();
                    try {
                        var parentSet,
                            vectorizedImages = [];
                        parentSet = new Set();
                        for (r = 0; r < images.length; ++r) {
                            var c = images[r].getParent();
                            c && parentSet.add(c);
                        }
                        try {
                            (0, Utils.blockChanges)(editor, parentSet);
                            for (r = 0; r < images.length; ++r) {
                                var d = images[r],
                                    u = d.getParent(),
                                    p = d.getNext(),
                                    g = this._vectorize(d);
                                (g && (u.insertChild(g, p), vectorizedImages.push(g)), u.removeChild(d));
                            }
                        } finally {
                            ((0, Utils.releaseChanges)(editor, parentSet), vectorizedImages.length && editor.updateSelection(false, vectorizedImages));
                        }
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (GVectorizeImageAction.prototype._vectorize = function (image) {
                new GObject.GVertexContainer();
                var t,
                    n,
                    imageCanvas = image.getImageCanvas(),
                    imageTracer = new GObject.GImageTracer(),
                    imgData = imageTracer.getImgdata(imageCanvas),
                    imgWidth = imgData.width,
                    imgHeight = imgData.height,
                    tracedata = imageTracer.imagedataToTracedata(imgData, {
                        ltres: 1,
                        qtres: Math.min(imgWidth / 4, imgHeight / 4, 10),
                        numberofcolors: 8,
                        blurradius: 2,
                        colorquantcycles: 5,
                        pathomit: Math.min(0.25 * imgWidth, 0.25 * imgHeight, 20),
                    }),
                    palette = tracedata.palette,
                    pixelMap = [];
                for (t in tracedata.layers)
                    if (tracedata.layers.hasOwnProperty(t))
                        for (n = 0; n < tracedata.layers[t].length; n++)
                            pixelMap[tracedata.layers[t][n][0].y1 * imgWidth + tracedata.layers[t][n][0].x1] = {
                                l: "" + t,
                                p: "" + n,
                            };
                var layerKey,
                    pathIndex,
                    sortedKeys = Object.keys(pixelMap);
                sortedKeys.sort(function (keyA, keyB) {
                    return keyA - keyB;
                });
                var nextLayerKey,
                    vertexContainer,
                    group = new GObject.GGroup(),
                    previousLayerKey = -1;
                for (t = 0; t < sortedKeys.length; t++)
                    if (((layerKey = pixelMap[sortedKeys[t]].l), (nextLayerKey = t + 1 < sortedKeys.length ? pixelMap[sortedKeys[t + 1]].l : -1), (pathIndex = pixelMap[sortedKeys[t]].p), 0 !== palette[layerKey].a)) {
                        var _ = new GObject.GRGBColor([palette[layerKey].r, palette[layerKey].g, palette[layerKey].b]),
                            b = tracedata.layers[layerKey];
                        layerKey !== previousLayerKey && (vertexContainer = new GObject.GVertexContainer());
                        var w = b[pathIndex];
                        vertexContainer.addVertex(GObject.GVertex.Command.Move, w[0].x1, w[0].y1);
                        for (var C = 0; C < w.length; C++) {
                            var x = w[C];
                            "L" === x.type
                                ? vertexContainer.addVertex(GObject.GVertex.Command.Line, x.x2, x.y2)
                                : (vertexContainer.addVertex(GObject.GVertex.Command.Curve, x.x3, x.y3), vertexContainer.addVertex(GObject.GVertex.Command.Curve, x.x2, x.y2));
                        }
                        if (layerKey !== nextLayerKey) {
                            vertexContainer = new GObject.GVertexSimplifier(vertexContainer).simplify(0.4, false, true);
                            var S = GObject.GPathUtil.createPathFromVertexSource(vertexContainer);
                            S &&
                                (S.getPaintLayers().appendChild(new GObject.GStylable.FillPaintLayer(_)),
                                S.setProperty("name", _.getClosestCSSName()),
                                group.appendChild(S));
                        }
                        previousLayerKey = layerKey;
                    }
                return group;
            }),
            (GVectorizeImageAction.prototype.toString = function () {
                return "[Object GVectorizeImageAction]";
            }),
            (module.exports = GVectorizeImageAction));
    };
