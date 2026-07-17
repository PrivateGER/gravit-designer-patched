module.exports = function (module, exports, require) {
            var GEditor = require(82),
                TextUtil = require(161),
                GNode = require(2),
                IsFiniteNonNegativeNumber = require(0),
                GRGBColor = require(17),
                GColor = require(68),
                GUtil = require(11),
                GShape = require(56),
                GBlock = require(69),
                GInlineTextEditor = require(752),
                GShapeEditor = require(128),
                GElementEditor = require(36),
                GText = require(70),
                GPoint = require(5),
                EditorConfig = require(24),
                GBoxEditor = require(66),
                GRect = require(6),
                GTransform = require(7),
                GMath = require(12),
                GRectangle = require(73),
                GBaseEditor = require(39),
                AnnotationPaint = require(81),
                GElement = (require(52), require(22)),
                GKeyEvent = require(167),
                GSystem = require(64),
                GFont = require(108),
                PathTransformer = require(215),
                KeyConstant = require(164),
                GLocale = require(9 /* String */),
                LocaleKey = require(47),
                GPlatform = require(176);

            function GTextEditor(element) {
                ((this._inlineEditEnabled = true), GShapeEditor.call(this, element));
            }
            (IsFiniteNonNegativeNumber.inherit(GTextEditor, GShapeEditor),
                GElementEditor.exports(GTextEditor, GText),
                (GTextEditor.DISTANCE_HANDLER_ID = GUtil.uuid()),
                (GTextEditor.prototype._inlineEditor = null),
                (GTextEditor.prototype._dontSetContent = false),
                (GTextEditor.prototype._currentRangeFormatting = null),
                (GTextEditor.prototype._fullContentsTransform = false),
                (GTextEditor.prototype._view = null),
                (GTextEditor.prototype._inlineEditEnabled = true),
                (GTextEditor.prototype._toggles = {
                    B: "fontWeight",
                    I: "fontStyle",
                }),
                (GTextEditor.prototype.getProperty = function (property, custom, defaultValue, useTemporary) {
                    return this.getElement().getProperty(property, custom, defaultValue, useTemporary, this.isInlineEdit());
                }),
                (GTextEditor.prototype.setProperties = function (properties, values, temporary) {
                    var hasPath = this.getElement().hasPathAttached(),
                        trfIndex = (this.getElement().getProperty("trf"), properties.indexOf("trf"));
                    (hasPath && trfIndex >= 0 && (properties.splice(trfIndex, 1), values.splice(trfIndex, 1), !properties.length)) ||
                        this.getElement().setProperties(properties, values, false, false, temporary, this.isInlineEdit(), false);
                }),
                (GTextEditor.prototype.getFonts = function () {
                    var fonts = [];
                    if (((fontProperty = this.getProperty("_tff")), fontProperty)) fonts.push(fontProperty);
                    else {
                        var tffKey = GText.PropertyMapping._tff,
                            content = this.getElement().getContent();
                        if (content) {
                            for (var n = 0; n < content.length; n++) fonts.push(this.getElement()._getGravitValue(tffKey, content[n][tffKey]));
                            fonts = GUtil.unique(fonts);
                        }
                    }
                    return fonts;
                }),
                (GTextEditor.prototype.setProperty = function (property, value, temporary) {
                    this.setProperties([property], [value], temporary);
                }),
                (GTextEditor.prototype.hasPathAttached = function () {
                    return this.getElement().hasPathAttached();
                }),
                (GTextEditor.prototype.initialSetup = function (e) {
                    GShapeEditor.prototype.initialSetup.call(this, null);
                }),
                (GTextEditor.prototype.acceptDrop = function (position, dropType, data, event) {
                    if (GShapeEditor.prototype.acceptDrop.call(this, position, dropType, data, event)) return true;
                    if (dropType === GElementEditor.DropType.FontFamily) {
                        var editor = GEditor.getEditor(this.getElement().getScene());
                        if (editor) {
                            editor.beginTransaction();
                            try {
                                this.getElement().setProperty("_tff", data);
                            } finally {
                                editor.commitTransaction(GLocale.get(new LocaleKey("GTextEditor", "action.drop-font")));
                            }
                        }
                        return true;
                    }
                    return false;
                }),
                (GTextEditor.prototype._detach = function () {
                    if (this.isInlineEdit()) {
                        var element = this.getElement();
                        if (!element) return;
                        var editor = GEditor.getEditor(element.getScene());
                        editor && editor.closeInlineEditor();
                    }
                }),
                (GTextEditor.prototype.handleKeyEvent = function (event) {
                    if (!this.isInlineEdit() && event instanceof GKeyEvent.Down) {
                        var key = event.key,
                            metaModifier = GSystem.modifiers.metaKey,
                            shiftModifier = GSystem.modifiers.shiftKey,
                            tlCore = this.getElement().getTLCore(),
                            editor = GEditor.getEditor(this.getElement().getScene()),
                            toggleProperty = this._toggles[key];
                        if (metaModifier && !shiftModifier && toggleProperty) {
                            var style,
                                weight,
                                newValue,
                                canApply,
                                currentValue = tlCore.getDocumentRange().getFormatting()[toggleProperty],
                                fontManager = this.getElement().getWorkspace().getFontManager(),
                                fontFamily = this.getProperty("_tff"),
                                fontVariants = fontManager.queryFontFamily(fontFamily);
                            ("fontWeight" === toggleProperty
                                ? ((style = this.getProperty("_tfs")),
                                  (canApply =
                                      (newValue = weight = parseInt(currentValue) == GFont.Weight.Bold ? GFont.Weight.Regular : GFont.Weight.Bold) === GFont.Weight.Normal ||
                                      void 0 === fontVariants ||
                                      fontVariants.filter(function (variant) {
                                          return variant.style === style && variant.weight === weight;
                                      }).length > 0) &&
                                      (editor.beginTransaction(),
                                      this.setProperties(["_tfw"], [newValue]),
                                      editor.commitTransaction(GLocale.get(new LocaleKey("GTextEditor", "action.modify-text-properties")))))
                                : "fontStyle" === toggleProperty &&
                                  ((weight = this.getProperty("_tfw")),
                                  (canApply =
                                      (newValue = style = "italic" == currentValue ? GFont.Style.Normal : GFont.Style.Italic) === GFont.Style.Normal ||
                                      void 0 === fontVariants ||
                                      fontVariants.filter(function (variant) {
                                          return variant.style === style && variant.weight === weight;
                                      }).length > 0) &&
                                      (editor.beginTransaction(),
                                      this.setProperties(["_tfs"], [newValue]),
                                      editor.commitTransaction(GLocale.get(new LocaleKey("GTextEditor", "action.modify-text-properties"))))),
                                canApply && this.triggerHotkeyEvent([KeyConstant.Constant.CONTROL, key]));
                        }
                    }
                }),
                (GTextEditor.prototype._attach = function () {
                    var element = this.getElement();
                    ((element.deferredLoadHandler = function () {
                        this._triggerSelectionChanged();
                    }.bind(this)),
                        element.contentChangedHandler(
                            function (temporary) {
                                var textElement = this.getElement();
                                if (textElement) {
                                    var richContent,
                                        serializedContent,
                                        editor,
                                        wasEdited,
                                        tlCore = textElement.getTLCore();
                                    if (
                                        ((editor = GEditor.getEditor(textElement.getScene())),
                                        (richContent = tlCore.getRichContent()),
                                        (serializedContent = JSON.stringify(richContent)),
                                        (wasEdited = tlCore.getWasEdited()),
                                        serializedContent !== textElement.getProperty("content"))
                                    ) {
                                        !temporary && editor && editor.beginTransaction();
                                        try {
                                            (textElement.setProperties(["content"], [serializedContent], false, false, false, false, false, this._dontSetContent),
                                                textElement.getProperty("afs") && textElement.adaptFontSizeToFitBBox());
                                        } finally {
                                            (!temporary && editor && editor.commitTransaction(GLocale.get(new LocaleKey("GTextEditor", "action.edit-text"))),
                                                editor &&
                                                    this.isInlineEdit() &&
                                                    setTimeout(
                                                        function () {
                                                            this._triggerTextEdited({
                                                                wasModifiedBefore: wasEdited,
                                                            });
                                                        }.bind(this)
                                                    ),
                                                this.requestInvalidation());
                                        }
                                    } else console.log("same content tried set");
                                }
                            }.bind(this),
                            true
                        ));
                }),
                (GTextEditor.prototype.getDefaultStyle = function () {
                    var element = this.getElement();
                    return element.getScene()
                        ? element
                              .getScene()
                              .getStyles()
                              .querySingle('style[_sdf="' + IsFiniteNonNegativeNumber.getTypeId(GText) + '"]')
                        : null;
                }),
                (GTextEditor.prototype._getPartInfoAt = function (point, transform, tolerance) {
                    if (this._element.hasPathAttached()) {
                        var handlePosition = this._getDistHandlePosition(transform);
                        if (
                            AnnotationPaint.getAnnotationBBox(null, handlePosition, EditorConfig.annotationHandles.textOnPath.size, false)
                                .expanded(EditorConfig.annotPickDistance, EditorConfig.annotPickDistance, EditorConfig.annotPickDistance, EditorConfig.annotPickDistance)
                                .containsPoint(point)
                        ) {
                            var partInfo = new GBaseEditor.PartInfo(this, GTextEditor.DISTANCE_HANDLER_ID, null, true, true);
                            if (partInfo) return partInfo;
                        }
                    }
                    return GShapeEditor.prototype._getPartInfoAt.call(this, point, transform, tolerance);
                }),
                (GTextEditor.prototype.createElementPreview = function () {
                    if (!this._elementPreview && !this.getElement().hasPathAttached()) {
                        var sourceBBox = this._element.getSourceBBox();
                        sourceBBox &&
                            (this._setElementPreview(new GRectangle(sourceBBox.getX(), sourceBBox.getY(), sourceBBox.getWidth(), sourceBBox.getHeight())),
                            this._elementPreview.transferProperties(this._element, [GShape.GeometryProperties]));
                    }
                }),
                (GTextEditor.prototype.canApplyTransform = function () {
                    if (this.hasPathAttached()) {
                        if (this._elementPreview) return false;
                        if (this._transform) {
                            var translation = this._transform.getTranslation();
                            if (this._transform.translated(-translation.getX(), -translation.getY()).isIdentity()) return true;
                        }
                        return false;
                    }
                    return this._elementPreview || GShapeEditor.prototype.canApplyTransform.call(this);
                }),
                (GTextEditor.prototype._applyTransform = function (element, deep, exclusions, n) {
                    ((this._fullContentsTransform = element.getProperty("sc")),
                        GShapeEditor.prototype._applyTransform.call(this, element.hasPathAttached() ? element._attachedPath : element, deep, exclusions, n));
                }),
                (GTextEditor.prototype.resetTransform = function () {
                    ((this._fullContentsTransform = false), GShapeEditor.prototype.resetTransform.call(this));
                }),
                (GTextEditor.prototype.edTransform = function (transform, partId, partInfo, editOptions) {
                    ((this._fullContentsTransform = (editOptions && !!editOptions.fullContentsTransform) || this.getElement().getProperty("sc")),
                        GBoxEditor.prototype.edTransform.call(this, transform, partId, partInfo, editOptions));
                }),
                (GTextEditor.prototype.getPEGeometryBBox = function () {
                    var bbox = null;
                    if (this.hasFlag(GBaseEditor.Flag.Selected) || this.hasFlag(GBaseEditor.Flag.Highlighted) || this.hasFlag(GBaseEditor.Flag.Outline)) {
                        var element = this.getElement();
                        bbox = element.getSourceBBox();
                        var elementTransform = element.getTransform(),
                            combinedTransform = null;
                        (this._preTransform && (combinedTransform = this._preTransform),
                            elementTransform && (combinedTransform = combinedTransform ? combinedTransform.multiplied(elementTransform) : elementTransform),
                            this._transform && (combinedTransform = combinedTransform ? combinedTransform.multiplied(this._transform) : this._transform),
                            bbox && combinedTransform && (bbox = combinedTransform.mapRect(bbox)));
                    }
                    return bbox;
                }),
                (GTextEditor.prototype.movePart = function (partId, partInfo, viewPoint, transform, guides, shift, option, multiPage) {
                    var result = GShapeEditor.prototype.movePart.call(this, partId, partInfo, viewPoint, transform, guides, shift, option);
                    if (partId === GTextEditor.DISTANCE_HANDLER_ID) {
                        var tlCore = this._element.getTLCore();
                        if (!tlCore || !tlCore.getTransformer()) return 0;
                        var transformer = tlCore.getTransformer(PathTransformer.TYPE),
                            boxOrigin = transformer.getBoxOrigin();
                        if (!boxOrigin) return 0;
                        var scenePoint = transform.mapPoint(viewPoint),
                            elementTransform = this._element.getProperty("trf");
                        elementTransform && elementTransform.invertible() && (scenePoint = elementTransform.inverted().mapPoint(scenePoint));
                        var localOffset = transformer.inverseTransform(scenePoint.subtract(boxOrigin), true);
                        (this._element.setProperty("tpthl", localOffset.getX() + (this._element.$tpthl || 0), null, false, true),
                            this.requestInvalidation());
                    }
                    return result;
                }),
                (GTextEditor.prototype._applyPartMove = function (partId, partInfo, editOptions, linkedElements) {
                    if (partId === GBoxEditor.RESIZE_HANDLE_PART_ID || partId === GBoxEditor.ROTATION_HANDLE_PART_ID)
                        if (this.canApplyTransform()) {
                            var scaleContent = this._element.getProperty("sc");
                            if (
                                ((this._fullContentsTransform = scaleContent && partInfo.side !== GRect.Side.BOTTOM_RIGHT),
                                this._element &&
                                    this._elementPreview &&
                                    !this._element.isFakeText() &&
                                    partId === GBoxEditor.RESIZE_HANDLE_PART_ID &&
                                    !this._fullContentsTransform)
                            ) {
                                var newFontSize,
                                    newContent,
                                    resetProps = [],
                                    resetValues = [],
                                    previewTransform = this._elementPreview.getProperty("trf"),
                                    elementTransform = this._element.getProperty("trf"),
                                    inverseElementTransform = elementTransform ? elementTransform.inverted() : null;
                                if (previewTransform) {
                                    if (scaleContent && partInfo.side === GRect.Side.BOTTOM_RIGHT) {
                                        var scaleFactor = (inverseElementTransform ? inverseElementTransform.multiplied(previewTransform) : previewTransform).getScaleFactor(),
                                            currentFontSize = this._element.getProperty("_tfi");
                                        if (currentFontSize) newFontSize = parseInt(currentFontSize * scaleFactor);
                                        else if (this._element.getTLCore()) {
                                            var content = this._element.getContent();
                                            content &&
                                                ((content = content.map(function (run) {
                                                    return ((run.fontSize = scaleFactor * run.fontSize), run);
                                                })),
                                                (newContent = JSON.stringify(content, GText._serializeContent)));
                                        }
                                    }
                                    inverseElementTransform && (previewTransform = previewTransform.multiplied(inverseElementTransform));
                                }
                                (this._element.beginUpdate(),
                                    partInfo.side !== GRect.Side.RIGHT_CENTER &&
                                        partInfo.side !== GRect.Side.LEFT_CENTER &&
                                        this._element.getProperty("ah") &&
                                        !this._element.hasPathAttached() &&
                                        (resetProps.push("ah"), resetValues.push(false)),
                                    partInfo.side !== GRect.Side.TOP_CENTER &&
                                        partInfo.side !== GRect.Side.BOTTOM_CENTER &&
                                        this._element.getProperty("aw") &&
                                        !this._element.hasPathAttached() &&
                                        (resetProps.push("aw"), resetValues.push(false)),
                                    resetProps.length && this._element.setProperties(resetProps, resetValues, false, false, false),
                                    this._element.transformSourceBBox(previewTransform),
                                    void 0 !== newFontSize
                                        ? this._element.setProperties(["_tfi"], [newFontSize])
                                        : void 0 !== newContent && this._element.setProperties(["content"], [newContent]),
                                    this._preTransform &&
                                        !this._preTransform.isIdentity() &&
                                        GElement.Transform.prototype.preTransform.call(this._element, this._preTransform, false, linkedElements),
                                    this._element.endUpdate(),
                                    this.resetTransform());
                            } else
                                (this._element && this._element.isFakeText() && partId === GBoxEditor.RESIZE_HANDLE_PART_ID) ||
                                    (GShapeEditor.prototype._prepareApplyTransform(this, this._element),
                                    GShapeEditor.prototype._applyTransform.call(this, this._element, partId === GBoxEditor.ROTATION_HANDLE_PART_ID, linkedElements, editOptions));
                        } else this.resetTransform();
                    else
                        partId === GTextEditor.DISTANCE_HANDLER_ID && (this._element.setProperty("tpthl", this._element.$tpthl), this.resetPartMove(partId, partInfo));
                    GElementEditor.prototype._applyPartMove.call(this, partId, partInfo, editOptions, linkedElements);
                }),
                (GTextEditor.prototype.processPaste = function (data) {
                    var content = null;
                    if (!this.isInlineEdit()) return false;
                    if (
                        (data instanceof GText
                            ? (content = data.getContent())
                            : (data instanceof String || "string" == typeof data) &&
                              (GPlatform.OperatingSystem.Windows && (data = GUtil.replaceMicrosoftLineFeed(data)), (content = data)),
                        !content)
                    )
                        return false;
                    var tlCore = this._element.getTLCore();
                    return tlCore
                        ? (this.requestInvalidation(),
                          this.contentSetEnabled(0),
                          tlCore.insert(this._element._shorten(content)),
                          this.invalidateTextWidth(),
                          this.contentSetEnabled(1),
                          true)
                        : 0;
                }),
                (GTextEditor.prototype.invalidateTextWidth = function () {
                    var element = this._element;
                    if (element.$aw && !element.hasPathAttached()) {
                        var rightEdge,
                            pageWidth,
                            bbox = element.getGeometryBBox(),
                            pageBBox = element.getPage().getGeometryBBox(),
                            elementTransform = element.getTransform(),
                            width = element._getWidth();
                        if (elementTransform && elementTransform.getMatrix()[0] < 0) {
                            if (bbox.getX() < 0 && bbox.getX() + bbox.getWidth() > 50) {
                                element.setProperties(["aw", "w"], [false, width]);
                                var scale = (bbox.getWidth() + bbox.getX()) / bbox.getWidth();
                                ((scaleTransform = (scaleTransform = new GTransform()).scaled(scale, 1)), element.transformSourceBBox(scaleTransform));
                            }
                        } else if ((rightEdge = bbox.getX() + bbox.getWidth()) > (pageWidth = pageBBox.getWidth())) {
                            var scaleTransform = new GTransform(),
                                overflow = rightEdge - pageWidth;
                            if (bbox.getWidth() - overflow > 50) {
                                element.setProperties(["aw", "w"], [false, width]);
                                scale = (bbox.getWidth() - overflow) / bbox.getWidth();
                                ((scaleTransform = scaleTransform.scaled(scale, 1)), element.transformSourceBBox(scaleTransform));
                            }
                        }
                    }
                }),
                (GTextEditor.prototype.handleKeyDown = function (event) {
                    return !!this.isInlineEdit() && this._inlineEditor.handleDomKeyDown(event);
                }),
                (GTextEditor.prototype.contentSetEnabled = function (enabled) {
                    this._dontSetContent = !enabled;
                }),
                (GTextEditor.prototype.canHandleDblClick = function () {
                    return true;
                }),
                (GTextEditor.prototype.handleDblClick = function (partId, partInfo) {
                    return (
                        partId === GBoxEditor.RESIZE_HANDLE_PART_ID &&
                        (partInfo.side === GRect.Side.RIGHT_CENTER
                            ? this._element.setProperty("aw", !this._element.getProperty("aw"))
                            : partInfo.side === GRect.Side.BOTTOM_CENTER && this._element.setProperty("ah", !this._element.getProperty("ah")),
                        true)
                    );
                }),
                (GTextEditor.prototype._getVerticalOffset = function () {
                    var tlCore = this._element.getTLCore();
                    if (!tlCore) return 0;
                    var sourceBBox = this._element.getSourceBBox(),
                        sourceHeight = (sourceBBox && sourceBBox.getHeight()) || 0,
                        tlCoreHeight = tlCore.getHeight();
                    return tlCoreHeight < sourceHeight ? 0.5 * (this._element._getHeight() - tlCoreHeight) : 0;
                }),
                (GTextEditor.prototype.getBBox = function (transform) {
                    if (this.hasPathAttached() && (this.hasFlag(GBaseEditor.Flag.Selected) || this.hasFlag(GBaseEditor.Flag.Highlighted))) {
                        var effectiveTransform = transform;
                        this._transform && (effectiveTransform = this._transform.multiplied(transform));
                        var tlCore = this._element.getTLCore();
                        if (tlCore) {
                            var mapTransform = effectiveTransform,
                                boxTransform = this.getBoxTransform();
                            boxTransform && (mapTransform = boxTransform.multiplied(effectiveTransform));
                            var boxes = tlCore.getBoxes(tlCore.getDocumentRange());
                            if (!boxes) return null;
                            var minX,
                                minY,
                                maxX,
                                maxY,
                                mergedRects = this._mergeRectangles(boxes);
                            ((minX = minY = Number.POSITIVE_INFINITY), (maxX = maxY = Number.NEGATIVE_INFINITY));
                            for (var c = 0; c < mergedRects.length; c++)
                                for (var p = mergedRects[c], d = 0; d < p.length; d++) {
                                    var g = p[d],
                                        f = g.getX(),
                                        m = g.getY();
                                    ((minX = Math.min(minX, f)), (maxX = Math.max(maxX, f)), (minY = Math.min(minY, m)), (maxY = Math.max(maxY, m)));
                                }
                            if (isFinite(minX) && isFinite(maxX) && isFinite(maxY) && isFinite(minY)) {
                                var unionRect = new GRect(minX, minY, maxX - minX, maxY - minY),
                                    margin = this.getBBoxMargin();
                                return mapTransform.mapRect(unionRect).expanded(margin, margin, margin, margin);
                            }
                            return null;
                        }
                    }
                    return GShapeEditor.prototype.getBBox.call(this, transform);
                }),
                (GTextEditor.prototype.getBBoxMargin = function () {
                    var baseMargin = GShapeEditor.prototype.getBBoxMargin.call(this);
                    if (this.getElement().hasPathAttached()) {
                        var caretBox = this.isInlineEdit() && this._inlineEditor.getCaretBox(),
                            margin = this.hasFlag(GBaseEditor.Flag.Selected) ? AnnotationPaint.getAnnotationPaintMargin(EditorConfig.annotationHandles.textOnPath.size) : 0;
                        return (caretBox && (margin = Math.max(caretBox.box.getWidth(), caretBox.box.getHeight())), Math.max(margin, baseMargin));
                    }
                    return baseMargin;
                }),
                (GTextEditor.prototype._getBBox = function (transform, applyOwnTransform) {
                    if (!this._fullContentsTransform && this._transform) {
                        var effectiveTransform = this._transform && applyOwnTransform ? this._transform.multiplied(transform) : transform,
                            boxParams = this._getBoxParams(effectiveTransform);
                        if (boxParams.bbox) {
                            var bbox = boxParams.bbox;
                            if (boxParams.trf) return (bbox = boxParams.trf.mapRect(bbox));
                        }
                    }
                    return null;
                }),
                (GTextEditor.prototype._paintResizeHandles = function (transform, context) {
                    var resizeConfig = EditorConfig.annotationHandles.resize;
                    this._iterateResizeHandles(
                        function (point, side, segment) {
                            var inverted = resizeConfig.inverted;
                            (EditorConfig.annotationHandles.text.showAutoSize &&
                                ((side === GRect.Side.RIGHT_CENTER && this._element.getProperty("aw")) ||
                                    (side === GRect.Side.BOTTOM_CENTER && this._element.getProperty("ah"))) &&
                                (inverted = !inverted),
                                side === GRect.Side.BOTTOM_RIGHT && this._element.getProperty("sc")
                                    ? AnnotationPaint.paintAnnotation(context, transform, point, resizeConfig.type, inverted, resizeConfig.size, EditorConfig.annotationHandles.text.blResizeColor, GRGBColor.WHITE)
                                    : AnnotationPaint.paintAnnotation(context, transform, point, resizeConfig.type, inverted, resizeConfig.size, this.getColor() || context.selectionOutlineColor, GRGBColor.WHITE));
                        }.bind(this),
                        transform
                    );
                }),
                (GTextEditor.prototype._showResizeHandles = function () {
                    return !this.getElement().hasPathAttached() && GShapeEditor.prototype._showResizeHandles.call(this);
                }),
                (GTextEditor.prototype._drawBBox = function (context, transform, box, color, opacity, isCaret, strokeOnly) {
                    var points,
                        rect = box.box || box,
                        renderTransform = transform;
                    if (isCaret) {
                        box.transform && (renderTransform = renderTransform.preMultiplied(box.transform));
                        var width = 0,
                            height = 0;
                        (1 == rect.getWidth() ? (height = rect.getHeight()) : (width = rect.getWidth()),
                            (points = [renderTransform.mapPoint(new GPoint(rect.getX() + 0.5, rect.getY())), renderTransform.mapPoint(new GPoint(rect.getX() + width + 0.5, rect.getY() + height))]));
                    } else
                        rect instanceof GRect
                            ? (points = renderTransform.mapQuadrilateral(rect))
                            : rect.length &&
                              (points = rect.map(function (point) {
                                  return renderTransform.mapPoint(point);
                              }));
                    var roundedPoints = null;
                    (points &&
                        points.length &&
                        (roundedPoints = points.map(function (point) {
                            return new GPoint(Math.floor(point.getX()) + 0.5, Math.floor(point.getY()) + 0.5);
                        })),
                        roundedPoints &&
                            (context.canvas.putVertices(roundedPoints, true),
                            2 == roundedPoints.length
                                ? context.canvas.strokeVertices(color, Math.sqrt(renderTransform.getScaleFactor()) || 1, null, null, null, null, opacity)
                                : strokeOnly
                                  ? context.canvas.strokeVertices(color, 1, null, null, null, null, opacity)
                                  : context.canvas.fillVertices(color, opacity)));
                }),
                (GTextEditor.prototype._mergeRectangles = function (boxEntries) {
                    for (var t = 0, merged = []; t < boxEntries.length; ) {
                        var n = boxEntries[t].box,
                            r = boxEntries[t].transform;
                        if (r) {
                            for (
                                var o = r.mapQuadrilateral(n),
                                    a = (p = GMath.getTurnAngle(o[0], o[1], o[1], o[2]) <= 0) ? [o[0], o[1]] : [o[1], o[0]],
                                    s = p ? [o[3], o[2]] : [o[2], o[3]],
                                    l = null,
                                    h = t + 1;
                                h < boxEntries.length;
                                h++
                            ) {
                                var A = boxEntries[h].box;
                                if (
                                    !(
                                        A.getX() <= n.getX() + n.getWidth() &&
                                        A.getX() + A.getWidth() >= n.getX() &&
                                        A.getY() <= n.getY() + n.getHeight() &&
                                        A.getY() + A.getHeight() >= n.getY()
                                    )
                                )
                                    break;
                                if ((r = boxEntries[h].transform)) {
                                    l = r.mapQuadrilateral(A);
                                    var cornerPoint;
                                    cornerPoint = GMath.getIntersectionPoint(
                                        l[0].getX(),
                                        l[0].getY(),
                                        l[1].getX(),
                                        l[1].getY(),
                                        o[0].getX(),
                                        o[0].getY(),
                                        o[1].getX(),
                                        o[1].getY()
                                    );
                                    var p = GMath.getTurnAngle(l[0], l[1], l[1], l[2]) <= 0;
                                    cornerPoint ? (a.pop(), p ? a.push(cornerPoint, l[1]) : a.push(cornerPoint, l[0])) : p ? a.push(l[0], l[1]) : a.push(l[1], l[0]);
                                    var u = null,
                                        d = GMath.normalizePoint(l[2].subtract(l[3]));
                                    if (!(GMath.normalizePoint(o[2].subtract(o[3])).dot(d) > 0.999)) {
                                        var g = [];
                                        (u = GMath.getIntersectionPoint(
                                            l[2].getX(),
                                            l[2].getY(),
                                            l[3].getX(),
                                            l[3].getY(),
                                            o[2].getX(),
                                            o[2].getY(),
                                            o[3].getX(),
                                            o[3].getY(),
                                            g
                                        )) &&
                                            g[0] * g[1] > 0 &&
                                            Math.abs(g[0]) + Math.abs(g[1]) > 2 &&
                                            (u = null);
                                    }
                                    (cornerPoint
                                        ? p
                                            ? s.push(l[3], l[2])
                                            : s.push(l[2], l[3])
                                        : (s.pop(), u && s.push(u), p ? s.push(l[2]) : s.push(l[3])),
                                        (n = A),
                                        (o = l));
                                }
                            }
                            var f = a.concat(s.reverse());
                            (merged.push(f), (t = h));
                        } else t++;
                    }
                    return merged;
                }),
                (GTextEditor.prototype._paintOutline = function (transform, context, i, color, r) {
                    if (!this.getElement().hasPathAttached()) {
                        var paintBaseOutline = true;
                        (this.isInlineEdit() && (paintBaseOutline = !this.getElement().getProperty("ah") || !this.getElement().getProperty("aw")),
                            paintBaseOutline && GBoxEditor.prototype._paintOutline.call(this, transform, context, true, color));
                    }
                    var caretBox,
                        selectionBoxes,
                        mergedBoxes,
                        renderTransform = transform,
                        boxTransform = this.getBoxTransform();
                    if (
                        ((renderTransform = boxTransform ? boxTransform.multiplied(renderTransform) : renderTransform),
                        this.isInlineEdit() && ((caretBox = this._inlineEditor.getCaretBox()), (selectionBoxes = this._inlineEditor.getSelectionBoxes())),
                        caretBox)
                    ) {
                        for (
                            var element = this.getElement(),
                                tlCore = element.getTLCore(),
                                firstEffect = element.getEffects().getFirstChild(),
                                brightnessEffect = (firstEffect && firstEffect.getProperty("GGLBrightnessContrastEffect&shp")) || null,
                                brightness = firstEffect && brightnessEffect ? brightnessEffect.brightness : 0,
                                stopOpacity = element.getProperty("_stop"),
                                richContent = tlCore.getRichContent(),
                                selection = tlCore.getSelection(),
                                selectionStart = selection ? selection.start : 0,
                                runIndex = 0,
                                charCount = 0,
                                x = 0,
                                runCount = richContent.length;
                            x < runCount;
                            x++
                        ) {
                            if (selectionStart <= (charCount += richContent[x].text.length)) {
                                runIndex = x;
                                break;
                            }
                        }
                        var fontColor = richContent.length ? richContent[runIndex].fontColor : color;
                        (brightness && ((hsv = GColor.rgbToHSV(GRGBColor.parseCSSColor(fontColor))), (hsv[2] += brightness), (fontColor = GColor.rgbToHtmlHex(GColor.hsvToRGB(hsv)))),
                            this._drawBBox(context, renderTransform, caretBox, fontColor, stopOpacity, true));
                    } else if (selectionBoxes && selectionBoxes.length)
                        if (selectionBoxes[0].transform) {
                            mergedBoxes = this._mergeRectangles(selectionBoxes);
                            for (x = 0; x < mergedBoxes.length; x++)
                                this._drawBBox(
                                    context,
                                    renderTransform,
                                    mergedBoxes[x],
                                    color || (this.hasFlag(GBaseEditor.Flag.Highlighted) ? context.highlightOutlineColor : context.selectionOutlineColor),
                                    0.3,
                                    false
                                );
                        } else
                            for (x = 0; x < selectionBoxes.length; x++)
                                this._drawBBox(
                                    context,
                                    renderTransform,
                                    selectionBoxes[x],
                                    color || (this.hasFlag(GBaseEditor.Flag.Highlighted) ? context.highlightOutlineColor : context.selectionOutlineColor),
                                    0.3,
                                    false
                                );
                    else if (this.getElement().hasPathAttached() && !this.isInlineEdit()) {
                        if (!(tlCore = this.getElement().getTLCore())) return;
                        var pathBoxes = tlCore.getBoxes(tlCore.getDocumentRange());
                        if (pathBoxes) {
                            mergedBoxes = this._mergeRectangles(pathBoxes);
                            for (x = 0; x < mergedBoxes.length; x++)
                                this._drawBBox(
                                    context,
                                    renderTransform,
                                    mergedBoxes[x],
                                    color || (this.hasFlag(GBaseEditor.Flag.Highlighted) ? context.highlightOutlineColor : context.selectionOutlineColor),
                                    0.3,
                                    false,
                                    true
                                );
                        }
                    }
                }),
                (GTextEditor.prototype._paintResizeBoxOutline = function (transform, context, i, color, lineWidth) {
                    if (!this._fullContentsTransform && this._transform) {
                        var boxParams = this._getBoxParams(transform);
                        boxParams.bbox && this._paintTransformedQuadrilateral(boxParams.trf, boxParams.bbox, context, color, lineWidth);
                    } else GBoxEditor.prototype._paintResizeBoxOutline.call(this, transform, context, i, color, lineWidth);
                }),
                (GTextEditor.prototype._getBoxParams = function (transform) {
                    var box = this.getBox(),
                        boxTransform = this.getBoxTransform();
                    if (box && transform) {
                        var mappedTransform = transform,
                            inverseBoxTransform = boxTransform ? boxTransform.inverted() : null,
                            boxOrigin = this._element.getSourceBBox() || new GPoint(0, 0);
                        (inverseBoxTransform && (mappedTransform = new GTransform(1, 0, 0, 1, boxOrigin.getX(), boxOrigin.getY()).multiplied(boxTransform).multiplied(mappedTransform).multiplied(inverseBoxTransform)), (boxTransform = boxTransform || new GTransform()));
                        var matrix = mappedTransform.getMatrix(),
                            translation = boxTransform.getTranslation(),
                            rect = new GRect(translation.getX(), translation.getY(), box.getWidth(), box.getHeight()),
                            quad = mappedTransform.mapQuadrilateral(rect),
                            width = Math.max(1, Math.abs(quad[0].getX() - quad[1].getX())),
                            height = Math.max(1, Math.abs(quad[0].getY() - quad[3].getY())),
                            mappedTranslation = mappedTransform.getTranslation();
                        ((boxTransform = boxTransform.preMultiplied(new GTransform(matrix[0] < 0 ? -1 : 1, 0, 0, matrix[3] < 0 ? -1 : 1, mappedTranslation.getX(), mappedTranslation.getY()))),
                            (box = new GRect(0, 0, width, height)));
                    }
                    return {
                        bbox: box,
                        trf: boxTransform,
                    };
                }),
                (GTextEditor.prototype._getDistHandlePosition = function (transform) {
                    if (!this._element.hasPathAttached()) return null;
                    var tlCore = this.getElement().getTLCore();
                    if (!tlCore || !tlCore.getTransformer()) return null;
                    var origin = new GPoint(0, 0),
                        unitRect = new GRect(origin.getX(), -tlCore.getVShift() + origin.getY(), 1, 1),
                        matrix = tlCore.getTransformer().getMatrix(0, 0, unitRect) || new GTransform(),
                        renderBounds = tlCore.getRenderBounds(),
                        boundsOffset = new GTransform(1, 0, 0, 1, -renderBounds.getX(), -renderBounds.getY()),
                        appliedTransform = transform || new GTransform();
                    return (transform = matrix
                        .multiplied(boundsOffset)
                        .multiplied(this._element.$trf || new GTransform())
                        .multiplied(appliedTransform)).mapPoint(origin);
                }),
                (GTextEditor.prototype._postPaint = function (transform, context) {
                    if ((GShapeEditor.prototype._postPaint.call(this, transform, context), this._element.hasFlag(GNode.Flag.Selected))) {
                        var handlePosition = this._getDistHandlePosition(transform);
                        if (handlePosition) {
                            var textOnPathConfig = EditorConfig.annotationHandles.textOnPath;
                            AnnotationPaint.paintAnnotation(context, null, handlePosition, textOnPathConfig.type, false, textOnPathConfig.size, GRGBColor.WHITE, context.annotationColor);
                        }
                    }
                }),
                (GTextEditor.prototype._triggerSelectionChanged = function () {
                    var editor = GEditor.getEditor(this.getElement().getScene());
                    editor &&
                        editor.hasEventListeners(GEditor.InlineEditorEvent) &&
                        editor.trigger(new GEditor.InlineEditorEvent(this, GEditor.InlineEditorEvent.Type.SelectionChanged));
                }),
                (GTextEditor.prototype._triggerTextEdited = function (data) {
                    var editor = GEditor.getEditor(this.getElement().getScene());
                    editor &&
                        editor.hasEventListeners(GEditor.InlineEditorEvent) &&
                        editor.trigger(new GEditor.InlineEditorEvent(this, GEditor.InlineEditorEvent.Type.TextEdited, data));
                }),
                (GTextEditor.prototype.triggerHotkeyEvent = function (hotkey) {
                    var editor = GEditor.getEditor(this.getElement().getScene());
                    editor && editor.hasEventListeners(GEditor.HotkeyEvent) && editor.trigger(new GEditor.HotkeyEvent(hotkey));
                }),
                (GTextEditor.prototype._nextCaretToggle = 0),
                (GTextEditor.prototype._caretUpdate = function () {
                    var tlCore, now;
                    this.isInlineEdit() &&
                        (this._inlineEditor.hasFocus()
                            ? (now = new Date().getTime()) > this._nextCaretToggle &&
                              ((tlCore = this._element.getTLCore()),
                              (this._nextCaretToggle = now + 500),
                              tlCore && tlCore.toggleCaret() && this.getElement().repaint(true))
                            : (tlCore = this._element.getTLCore()) && tlCore.isCaretVisible() && tlCore.toggleCaret());
                }),
                (GTextEditor.prototype.adjustInlineEditForView = function (view, cursor) {
                    var tlCore = this.getElement().getTLCore();
                    tlCore && !this.getElement().getProperty("_we") ? tlCore.selectAll() : cursor && this._inlineEditor.setCursor(cursor);
                }),
                (GTextEditor.prototype.canInlineEdit = function () {
                    if (
                        EditorConfig.inlineEditText &&
                        this._inlineEditEnabled &&
                        this.getElement().getTLCore() &&
                        this._element.getWorkspace().getFontManager().getDefaultFont() &&
                        !this._element.isFakeText() &&
                        this._element.$_ed
                    )
                        return true;
                    return false;
                }),
                (GTextEditor.prototype.isInlineEdit = function () {
                    return null !== this._inlineEditor && this._inlineEditor.isActivated();
                }),
                (GTextEditor.prototype.beginInlineEdit = function (view) {
                    var tlCore = this.getElement().getTLCore();
                    tlCore &&
                        this._element.getWorkspace().getFontManager().getDefaultFont() &&
                        !this._element.isFakeText() &&
                        (this.removeFlag(GBoxEditor.Flag.ResizeAll),
                        this._inlineEditor ||
                            ((this._inlineEditor = new GInlineTextEditor(this)),
                            tlCore.selectionChanged(
                                function (event) {
                                    if (!this.getParentEditor()) return TextUtil.UNSUBSCRIBE;
                                    (this._triggerSelectionChanged(), this.getElement().repaint());
                                }.bind(this),
                                true
                            )),
                        (this._nextCaretToggle = new Date().getTime()),
                        this._inlineEditor.activate(view),
                        this.getElement().repaint(true));
                }),
                (GTextEditor.prototype.isSelectionHit = function (position) {
                    return !!this.isInlineEdit() && this._inlineEditor.isSelectionHit(position);
                }),
                (GTextEditor.prototype.isDeletePartsAllowed = function () {
                    return this.isInlineEdit();
                }),
                (GTextEditor.prototype.deletePartsSelected = function () {
                    this.isInlineEdit() && this._inlineEditor.deleteSelected();
                }),
                (GTextEditor.prototype.finishInlineEdit = function () {
                    this._inlineEditor._view;
                    (this._inlineEditor.deactivate(),
                        this.getElement().repaint(false),
                        this.getElement().getProperty("plkt") & GBlock.ProgramLck.NoSizeChanges || this.setFlag(GBoxEditor.Flag.ResizeAll));
                    var tlCore = this.getElement().getTLCore();
                    if (
                        tlCore &&
                        (this.getElement().setProperty("_we", this.getElement().getProperty("_we") || tlCore.getWasEdited(), false, false, false),
                        tlCore.getLength() <= 1)
                    ) {
                        var editor = GEditor.getEditor(this.getElement().getScene());
                        editor && editor.deleteSelection(true);
                    }
                    return "Modify Text Content";
                }),
                (GTextEditor.prototype.canHandleKeyEvents = function () {
                    return true;
                }),
                (GTextEditor.prototype.setInlineEditEnabled = function (enabled) {
                    this._inlineEditEnabled = enabled;
                }),
                (GTextEditor.prototype.toString = function () {
                    return "[Object GTextEditor]";
                }),
                (module.exports = GTextEditor));
        };
