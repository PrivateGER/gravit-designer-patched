module.exports = function (module, exports, require) {
            var GPathUtil = require(179),
                GNode = require(2),
                GShapeTool = require(236),
                IsFiniteNonNegativeNumber = require(0),
                GPath = require(60),
                GPathsGraph = require(162),
                GShape = require(56),
                GCursor = require(52),
                GText = (require(73), require(70)),
                GPoint = require(5),
                GEditorOptions = require(24),
                GRect = require(6),
                GTLPathTextTransformer = require(215),
                GCompoundPath = require(113),
                GTransform = require(7),
                GPathBase = require(45),
                GPointerTool = require(548),
                GImage = require(95),
                String = require(9),
                GLocaleKey = require(47),
                GTextMeasure = require(416),
                GFont = require(108);

            function GTextTool() {
                GShapeTool.call(this, true, true);
            }
            (require(387 /* GTextEditor */),
                IsFiniteNonNegativeNumber.inherit(GTextTool, GShapeTool),
                (GTextTool.prototype._textUnderMouse = null),
                (GTextTool.prototype._pathUnderMouse = null),
                (GTextTool.prototype._pathHit = null),
                (GTextTool.prototype._justCreatedText = null),
                (GTextTool.prototype._defaultMeasure = null),
                (GTextTool.prototype.deactivate = function (view, t) {
                    (GShapeTool.prototype.deactivate.call(this, view, t),
                        this._pathUnderMouse && (this._pathUnderMouse.removeFlag(GNode.Flag.Highlighted), (this._pathUnderMouse = null)));
                }),
                (GTextTool.prototype.getCursor = function () {
                    return this._textUnderMouse ? GCursor.Text : this._shape ? GShapeTool.prototype.getCursor.call(this) : GCursor.Cross;
                }),
                (GTextTool.prototype._getRelatedItemClass = function () {
                    return GText;
                }),
                (GTextTool.prototype._mouseRelease = function (event) {
                    var editor = this._editor,
                        view = this._view;
                    if ((editor.getGuides().invalidate(), this._textUnderMouse))
                        (this._manager.activateTool(GPointerTool),
                            this._textUnderMouse.hasFlag(GNode.Flag.Selected) ||
                                (GPointerTool.prototype._mouseDown.call(this._manager.getActiveTool(), event),
                                GPointerTool.prototype._mouseRelease.call(this._manager.getActiveTool(), event)),
                            editor.openInlineEditor(this._textUnderMouse, view, event.client));
                    else if (
                        (GShapeTool.prototype._mouseRelease.call(this, event),
                        this._pathUnderMouse && (this._pathUnderMouse.removeFlag(GNode.Flag.Highlighted), (this._pathUnderMouse = null)),
                        this._justCreatedText)
                    ) {
                        var createdText = this._justCreatedText;
                        ((this._justCreatedText = null),
                            setTimeout(function () {
                                editor.openInlineEditor(createdText, view);
                            }, 10));
                    }
                }),
                (GTextTool.prototype._mouseMove = function (event) {
                    if (
                        (this._textUnderMouse && ((this._textUnderMouse = null), this.updateCursor()),
                        this._pathUnderMouse && (this._pathUnderMouse.removeFlag(GNode.Flag.Highlighted), (this._pathUnderMouse = null)),
                        !this._shape)
                    ) {
                        var hitResult = this._scene.hitTest(
                            event.client,
                            this._view.getWorldTransform(this._scene),
                            null,
                            false,
                            -1,
                            0,
                            false,
                            null,
                            false,
                            false,
                            this._view.getViewConfiguration().multiPageView
                        );
                        ((hitResult && hitResult.length && hitResult[0].element instanceof GText && hitResult[0].element instanceof GPath) ||
                            (hitResult = this._scene.hitTest(
                                event.client,
                                this._view.getWorldTransform(this._scene),
                                null,
                                false,
                                -1,
                                GEditorOptions.pickDistance,
                                false,
                                null,
                                false,
                                false,
                                this._view.getViewConfiguration().multiPageView
                            )),
                            hitResult &&
                                hitResult.length &&
                                (hitResult[0].element instanceof GText
                                    ? ((this._textUnderMouse = hitResult[0].element), this.updateCursor())
                                    : !(hitResult[0].element instanceof GShape) ||
                                      hitResult[0].element instanceof GImage ||
                                      hitResult[0].element instanceof GCompoundPath ||
                                      hitResult[0].element instanceof GPathsGraph ||
                                      null === hitResult[0].data.vertex.x ||
                                      ((this._pathUnderMouse = hitResult[0].element),
                                      (this._pathHit = new GPoint(hitResult[0].data.vertex.x, hitResult[0].data.vertex.y)),
                                      this._pathUnderMouse.setFlag(GNode.Flag.Highlighted))));
                    }
                }),
                (GTextTool.prototype._createShape = function () {
                    var textShape = new GText();
                    return (textShape.setProperties(["w", "h", "aw", "ah"], [1, 1, false, false]), textShape);
                }),
                (GTextTool.prototype._updateShape = function (element, area, i, useAreaRect) {
                    return (
                        !!area &&
                        (useAreaRect
                            ? element.setProperty("trf", new GTransform(area.getWidth(), 0, 0, area.getHeight(), area.getX(), area.getY()))
                            : element.setProperty(
                                  "trf",
                                  new GTransform(
                                      area.getWidth() / 2,
                                      0,
                                      0,
                                      area.getHeight() / 2,
                                      area.getX() + area.getWidth() / 2,
                                      area.getY() + area.getHeight() / 2
                                  )
                              ),
                        true)
                    );
                }),
                (GTextTool.prototype._insertShape = function (element, preview) {
                    var inserted = false;
                    if (preview) element && ((this._fakeShape = element), GShapeTool.prototype._insertShape.call(this, element, false, true));
                    else {
                        if (this._fakeShape) {
                            var parent = this._fakeShape.getParent();
                            (parent && parent.removeChild(this._fakeShape), (this._fakeShape = null));
                        }
                        var textShape = new GText(),
                            transform = element && element.getProperty("trf");
                        if (transform) {
                            var minHeight = 0,
                                measure = this._getDefaultMeasure(textShape);
                            measure && (minHeight = measure.height);
                            var matrix = transform.getMatrix(),
                                autoWidth = matrix[0] < 4,
                                autoHeight = matrix[3] <= minHeight;
                            (textShape.setProperties(["aw", "ah"], [autoWidth, autoHeight]), textShape.transformSourceBBox(transform, !autoWidth, !autoHeight));
                        } else textShape.setProperties(["aw", "ah"], [false, false]);
                        (textShape.setText(String.get(new GLocaleKey("GTextTool", "your-text-here")), 1, 1),
                            (inserted = this._insertText(textShape)),
                            (this._justCreatedText = textShape));
                    }
                    return inserted;
                }),
                (GTextTool.prototype._showMousePositionInlineHint = function () {
                    return true;
                }),
                (GTextTool.prototype._showAreaInlineHint = function () {
                    return true;
                }),
                (GTextTool.prototype._hasCenterCross = function () {
                    return true;
                }),
                (GTextTool.prototype._createShapeManually = function (point) {
                    var textShape = new GText(),
                        transform = new GTransform(1, 0, 0, 1, point.getX(), point.getY());
                    (textShape.transformSourceBBox(transform), textShape.setText(String.get(new GLocaleKey("GTextTool", "your-text-here")), 1, 1));
                    try {
                        if ((this._editor.beginTransaction(), this._insertText(textShape, true), this._pathUnderMouse)) {
                            var path = null;
                            if (this._pathUnderMouse instanceof GPathBase) path = this._pathUnderMouse;
                            else if ((path = GPathUtil.createPathFromVertexSource(this._pathUnderMouse)) instanceof GPath) {
                                var sourcePath = this._pathUnderMouse,
                                    pathTransform = sourcePath.$trf;
                                ((sourcePath.$trf = null),
                                    path.assignFrom(sourcePath),
                                    sourcePath instanceof GPathBase && ((path.$evenodd = sourcePath.getProperty("evenodd")), (path.$closed = sourcePath.getProperty("closed"))),
                                    (sourcePath.$trf = pathTransform));
                                var pathParent = sourcePath.getParent(),
                                    nextSibling = sourcePath.getNext(true);
                                (pathParent.removeChild(sourcePath), pathParent.insertChild(path, nextSibling));
                            } else path = null;
                            if (path) {
                                var clonedPath = path.clone();
                                this._scene.link(textShape, path);
                                var pathTransformer = new GTLPathTextTransformer(null, clonedPath);
                                pathTransformer.getMatrix(0, 0, new GRect());
                                var hitPoint = this._view
                                        .getWorldTransform(this._view.getScene().getActivePage())
                                        .inverted()
                                        .mapPoint(this._pathHit),
                                    translation = GTransform.getNativeRectTransformation(path.getGeometryBBox()).getTranslation(),
                                    pathOffset = pathTransformer.inverseTransform(hitPoint.subtract(translation));
                                textShape.setProperties(["tpthl", "tpths"], [pathOffset.getX(), GTLPathTextTransformer.OUTSIDE]);
                            }
                        }
                    } finally {
                        this._editor.commitTransaction(String.get(new GLocaleKey("GTextTool", "action.insert-text")));
                    }
                    this._justCreatedText = textShape;
                }),
                (GTextTool.prototype._insertText = function (element, skipTransaction) {
                    return GShapeTool.prototype._insertShape.call(this, element, false, skipTransaction, String.get(new GLocaleKey("GTextTool", "action.insert-text")));
                }),
                (GTextTool.prototype._getDefaultMeasure = function (element) {
                    if (!this._defaultMeasure) {
                        var workspace = this._scene && this._scene.getWorkspace(),
                            fontManager = workspace && workspace.getFontManager();
                        if (fontManager) {
                            var fontParts = [];
                            (fontParts.push(element.getProperty("_tfs") === GFont.Style.Normal ? "normal" : "italic"),
                                fontParts.push(element.getProperty("_tfw")),
                                fontParts.push(element.getProperty("_tfi") + "px"),
                                fontParts.push(element.getProperty("_tff")));
                            var fontCss = "font: " + fontParts.join(" ");
                            this._defaultMeasure = new GTextMeasure(String.get(new GLocaleKey("GTextTool", "your-text-here")), fontCss, null, fontManager);
                        }
                    }
                    return this._defaultMeasure;
                }),
                (GTextTool.prototype.toString = function () {
                    return "[Object GTextTool]";
                }),
                (module.exports = GTextTool));
        };
