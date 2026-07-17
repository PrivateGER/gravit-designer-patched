module.exports = function (module, exports, require) {
            var GPattern = require(50),
                GNode = require(2),
                GMouseEvent = require(77),
                GSceneWidget = require(363),
                GSystem = require(64),
                GModifiersChangedEvent = require(150),
                GEditorPaintConfiguration = require(777),
                GScenePaintConfiguration = require(133),
                GEditorOptions = require(24),
                GBBoxGuide = require(153),
                IsFiniteNonNegativeNumber = require(0),
                GRect = require(6),
                GElement = require(22),
                GTransform = require(7),
                GEditor = require(82),
                GFullPixelsGuide = require(544),
                GElementEditor = require(36),
                GPoint = require(5),
                GPage = require(83),
                GToolManager = require(553),
                GCanvas = require(14),
                GGuides = require(210),
                GDistanceHelper = require(540),
                GUtil = require(11),
                GRGBColor = require(17),
                GGradient = require(138),
                GSymbol = require(216),
                String = require(9),
                GLocaleKey = require(47),
                GSceneOptions = require(207);

            function GEditorWidget(editor) {
                var args = Array.prototype.slice.call(arguments);
                ((args[0] = editor.getScene()),
                    (this._editor = editor),
                    (this._viewConfiguration = new GEditorPaintConfiguration()),
                    (this._viewConfiguration.enableFxCache = !GSceneWidget.WORKER_RENDERING_ENABLED),
                    GSceneWidget.apply(this, args),
                    (this._htmlElement.className += " g-editor-widget"));
                var guides = this._editor.getGuides();
                guides && (guides.setView(this), guides.addEventListener(GGuides.InvalidationRequestEvent, this._editorHelpersInvalidationRequest, this));
                var distanceHelper = this._editor.getDistanceHelper();
                (distanceHelper && (distanceHelper.setView(this), distanceHelper.addEventListener(GDistanceHelper.InvalidationRequestEvent, this._editorHelpersInvalidationRequest, this)),
                    (this._dragEventerEvent = function (event) {
                        (event.preventDefault(), event.stopPropagation());
                    }.bind(this)),
                    (this._dragOverEvent = function (event) {
                        (event.preventDefault(), event.stopPropagation(), (event.dataTransfer.dropEffect = "move"));
                    }.bind(this)),
                    (this._dropEvent = function (event) {
                        return (event.preventDefault(), event.stopPropagation(), this.handleDropEvent(event), false);
                    }.bind(this)),
                    this._inputHtmlElement.addEventListener("dragenter", this._dragEventerEvent),
                    this._inputHtmlElement.addEventListener("dragover", this._dragOverEvent),
                    this._inputHtmlElement.addEventListener("drop", this._dropEvent),
                    this._editor.addEventListener(GEditor.InvalidationRequestEvent, this._editorInvalidationRequest, this, void 0, void 0, true),
                    this._scene.addEventListener(GNode.AfterPropertiesChangeEvent, this._afterPropertiesChanged, this, void 0, void 0, true),
                    this._scene
                        .getWorkspace()
                        .getToolManager()
                        .addEventListener(GToolManager.InvalidationRequestEvent, this._toolInvalidationRequest, this));
            }
            (IsFiniteNonNegativeNumber.inherit(GEditorWidget, GSceneWidget),
                (GEditorWidget.prototype._editor = null),
                (GEditorWidget.prototype._guideLineDiv = null),
                (GEditorWidget.prototype._guideLineViewPoint = null),
                (GEditorWidget.prototype._guideLinePosition = null),
                (GEditorWidget.prototype._guideLineInfo = null),
                (GEditorWidget.prototype._lastFocus = null),
                (GEditorWidget.prototype._inputListener = null),
                (GEditorWidget.prototype._inputListenerCompStart = null),
                (GEditorWidget.prototype._inputListenerCompEnd = null),
                (GEditorWidget.prototype._inputListenerCompUpd = null),
                (GEditorWidget.prototype.setRulers = function (enabled) {
                    enabled && !this._horizontalRuler
                        ? (GSceneWidget.prototype.setRulers.call(this, enabled),
                          this._horizontalRuler.addEventListener(GMouseEvent.Down, this._rulerDownLister, this),
                          this._verticalRuler.addEventListener(GMouseEvent.Down, this._rulerDownLister, this))
                        : !enabled &&
                          this._horizontalRuler &&
                          (this._horizontalRuler.removeEventListener(GMouseEvent.Down, this._rulerDownLister, this),
                          this._verticalRuler.removeEventListener(GMouseEvent.Down, this._rulerDownLister, this),
                          GSceneWidget.prototype.setRulers.call(this, enabled));
                }),
                (GEditorWidget.prototype.getHtmlElement = function () {
                    return this._htmlElement;
                }),
                (GEditorWidget.prototype.startMoveGuideLine = function (isVertical, guideIndex) {
                    this._guideLineInfo = {
                        isVertical: isVertical,
                        guideIndex: guideIndex,
                    };
                    var propertyName = isVertical ? "vgl" : "hgl",
                        guideLines = this._editor.getScene().getProperty(propertyName),
                        position = guideIndex >= 0 ? guideLines[guideIndex] : 0,
                        point = new GPoint(position, position),
                        viewPoint = this.getWorldTransform().mapPoint(point);
                    ((this._guideLinePosition = point),
                        (this._guideLineDiv = document.createElement("div")),
                        (this._guideLineDiv.style.position = "absolute"),
                        (this._guideLineDiv.style.backgroundColor = GEditorOptions.guideLineHintColor),
                        guideIndex < 0 && (this._guideLineDiv.style.visibility = "hidden"),
                        this._htmlElement.insertBefore(this._guideLineDiv, this._inlineHintDiv),
                        isVertical
                            ? ((this._guideLineDiv.style.top = "0px"),
                              (this._guideLineDiv.style.bottom = "0px"),
                              (this._guideLineDiv.style.width = "1px"),
                              (this._guideLineDiv.style.left = viewPoint.getX() + "px"))
                            : ((this._guideLineDiv.style.left = "0px"),
                              (this._guideLineDiv.style.right = "0px"),
                              (this._guideLineDiv.style.height = "1px"),
                              (this._guideLineDiv.style.top = viewPoint.getY() + "px")),
                        GSystem.addEventListener(GModifiersChangedEvent, this._guideMoveModifierChangeListener, this));
                }),
                (GEditorWidget.prototype.moveGuideLine = function (viewPoint) {
                    if (this._guideLineInfo) {
                        this._guideLineViewPoint = viewPoint;
                        var scenePoint = this.getViewTransform().mapPoint(viewPoint);
                        (this._editor.getGuides().beginMap(),
                            (scenePoint = this._editor.getGuides().mapPoint(scenePoint, null, [GBBoxGuide.ID, GFullPixelsGuide.ID])),
                            this._editor.getGuides().finishMap(),
                            (viewPoint = this.getWorldTransform().mapPoint(scenePoint)),
                            (this._guideLinePosition = scenePoint));
                        var dpi = GCanvas.getScreenDPI();
                        if (this._guideLineInfo.isVertical) {
                            this._guideLineDiv.style.left = viewPoint.getX() / dpi + "px";
                            var rulerBottom = this._horizontalRuler
                                ? this._horizontalRuler.getY() + this._horizontalRuler.getHeight()
                                : this._viewOffset[1];
                            this.updateInlineHint(
                                this._editor.getScene().pointToString(scenePoint.getX(), 1) + this._editor.getScene().getProperty("ut"),
                                new GPoint(viewPoint.getX(), dpi * rulerBottom + 3),
                                GRect.Side.TOP_CENTER
                            );
                        } else {
                            this._guideLineDiv.style.top = viewPoint.getY() / dpi + "px";
                            var rulerRight = this._verticalRuler ? this._verticalRuler.getX() + this._verticalRuler.getWidth() : this._viewOffset[0];
                            this.updateInlineHint(
                                this._editor.getScene().pointToString(scenePoint.getY(), 1) + this._editor.getScene().getProperty("ut"),
                                new GPoint(dpi * rulerRight + 3, viewPoint.getY()),
                                GRect.Side.LEFT_CENTER
                            );
                        }
                        this._guideLineDiv.style.visibility = "";
                    }
                }),
                (GEditorWidget.prototype.finishMoveGuideLine = function () {
                    if (this._guideLineInfo) {
                        (GSystem.removeEventListener(GModifiersChangedEvent, this._guideMoveModifierChangeListener, this), this._editor.getGuides().invalidate());
                        var isVertical = this._guideLineInfo.isVertical,
                            guideIndex = this._guideLineInfo.guideIndex,
                            propertyName = isVertical ? "vgl" : "hgl",
                            guideLines = this._editor.getScene().getProperty(propertyName);
                        guideLines = guideLines ? guideLines.slice() : [];
                        var rulerRight = this._verticalRuler
                                ? this._verticalRuler.getX() + this._verticalRuler.getWidth()
                                : this._viewOffset[0] + GEditorOptions.pickDistance,
                            rulerBottom = this._horizontalRuler
                                ? this._horizontalRuler.getY() + this._horizontalRuler.getHeight()
                                : this._viewOffset[1] + GEditorOptions.pickDistance,
                            rulerLeft = this._verticalRuler ? this._verticalRuler.getX() : -100,
                            rulerTop = this._horizontalRuler ? this._horizontalRuler.getY() : -100;
                        if (
                            (!isVertical && this._guideLineDiv.offsetTop >= rulerTop && this._guideLineDiv.offsetTop <= rulerBottom) ||
                            (isVertical && this._guideLineDiv.offsetLeft >= rulerLeft && this._guideLineDiv.offsetLeft <= rulerRight)
                        ) {
                            if (guideIndex >= 0) {
                                (guideLines.splice(guideIndex, 1), this._editor.beginTransaction());
                                try {
                                    this._editor.getScene().setProperties([propertyName], [guideLines]);
                                } finally {
                                    this._editor.commitTransaction(String.get(new GLocaleKey("GEditorWidget", "action.remove-guide-line")));
                                }
                            }
                        } else {
                            var newPosition = isVertical ? this._guideLinePosition.getX() : this._guideLinePosition.getY();
                            if (guideIndex < 0 || (guideIndex >= 0 && guideLines[guideIndex] !== newPosition)) {
                                (guideIndex >= 0 ? (guideLines[guideIndex] = newPosition) : guideLines.push(newPosition), this._editor.beginTransaction());
                                try {
                                    this._editor.getScene().setProperties([propertyName], [guideLines]);
                                } finally {
                                    this._editor.commitTransaction(
                                        guideIndex >= 0
                                            ? String.get(new GLocaleKey("GEditorWidget", "action.change-guide-line"))
                                            : String.get(new GLocaleKey("GEditorWidget", "action.add-guide-line"))
                                    );
                                }
                            }
                        }
                        (this._htmlElement.removeChild(this._guideLineDiv),
                            (this._guideLineDiv = null),
                            (this._guideLinePosition = null),
                            (this._guideLineViewPoint = null),
                            (this._guideLineInfo = null),
                            this.updateInlineHint(null));
                    }
                }),
                (GEditorWidget.prototype.getEditor = function () {
                    return this._editor;
                }),
                (GEditorWidget.prototype.hasFocus = function () {
                    return !(!this._fakeTextBox || document.activeElement !== this._fakeTextBox) || GSceneWidget.prototype.hasFocus.call(this);
                }),
                (GEditorWidget.prototype.focus = function () {
                    return "none" !== this._fakeTextDiv.style.display ? (this._fakeTextBox.focus(), true) : GSceneWidget.prototype.focus.call(this);
                }),
                (GEditorWidget.prototype.isCapturingInput = function () {
                    return !!this._inputListener;
                }),
                (GEditorWidget.prototype.startCaptureInput = function (inputListener, compositionStartListener, compositionEndListener, compositionUpdateListener) {
                    if (!this.isCapturingInput()) {
                        if (this._inputRecorder) return;
                        ((this._lastFocus = document.activeElement),
                            (this._fakeTextDiv.style.display = ""),
                            (this._fakeTextBox.value = ""),
                            this._fakeTextBox.addEventListener("input", inputListener),
                            this._fakeTextBox.addEventListener("keydown", inputListener),
                            this._fakeTextBox.addEventListener("paste", this._preventListener),
                            this._fakeTextBox.addEventListener("copy", this._preventListener),
                            this._fakeTextBox.addEventListener("cut", this._preventListener),
                            compositionStartListener && this._fakeTextBox.addEventListener("compositionstart", compositionStartListener),
                            compositionEndListener && this._fakeTextBox.addEventListener("compositionend", compositionEndListener),
                            compositionUpdateListener && this._fakeTextBox.addEventListener("compositionupdate", compositionUpdateListener),
                            this._fakeTextBox.focus(),
                            (this._inputListener = inputListener),
                            (this._inputListenerCompStart = compositionStartListener),
                            (this._inputListenerCompEnd = compositionEndListener),
                            (this._inputListenerCompUpd = compositionUpdateListener));
                    }
                }),
                (GEditorWidget.prototype.endCaptureInput = function () {
                    this.isCapturingInput() &&
                        ((document.activeElement = this._lastFocus),
                        (this._fakeTextDiv.style.display = "none"),
                        this._fakeTextBox.removeEventListener("input", this._inputListener),
                        this._fakeTextBox.removeEventListener("keydown", this._inputListener),
                        this._fakeTextBox.removeEventListener("keypress", this._inputListener),
                        this._fakeTextBox.removeEventListener("paste", this._preventListener),
                        this._fakeTextBox.removeEventListener("copy", this._preventListener),
                        this._fakeTextBox.removeEventListener("cut", this._preventListener),
                        this._inputListenerCompEnd && this._fakeTextBox.removeEventListener("compositionend", this._inputListenerCompEnd),
                        this._inputListenerCompStart &&
                            this._fakeTextBox.removeEventListener("compositionstart", this._inputListenerCompStart),
                        this._inputListenerCompUpd &&
                            this._fakeTextBox.removeEventListener("compositionupdate", this._inputListenerCompUpd),
                        (this._lastFocus = null),
                        (this._inputListener = null));
                }),
                (GEditorWidget.prototype._preventListener = function (event) {
                    event.preventDefault();
                }),
                (GEditorWidget.prototype.updateInputBox = function (x, y) {
                    if (!isNaN(x) && !isNaN(y)) {
                        var point = new GPoint(x, y),
                            viewPoint = this.getWorldTransform().mapPoint(point),
                            dpi = GCanvas.getScreenDPI();
                        ((this._fakeTextDiv.style.left = viewPoint.getX() / dpi + "px"), (this._fakeTextDiv.style.top = viewPoint.getY() / dpi + "px"));
                    }
                }),
                (GEditorWidget.prototype.resetInputBoxCursor = function () {
                    this._fakeTextBox &&
                        "function" == typeof this._fakeTextBox.setSelectionRange &&
                        this._fakeTextBox.selectionStart !== this._fakeTextBox.value.length &&
                        this._fakeTextBox.setSelectionRange(this._fakeTextBox.value.length, this._fakeTextBox.value.length);
                }),
                (GEditorWidget.prototype.resetInputBoxContent = function () {
                    this._fakeTextBox && (this._fakeTextBox.value = "");
                }),
                (GEditorWidget.prototype.release = function () {
                    (this._inputHtmlElement.removeEventListener("dragenter", this._dragEventerEvent),
                        this._inputHtmlElement.removeEventListener("dragover", this._dragOverEvent),
                        this._inputHtmlElement.removeEventListener("drop", this._dropEvent),
                        this._editor.removeEventListener(GEditor.InvalidationRequestEvent, this._editorInvalidationRequest, this),
                        this._editor
                            .getGuides()
                            .removeEventListener(GGuides.InvalidationRequestEvent, this._editorHelpersInvalidationRequest, this),
                        this._editor
                            .getDistanceHelper()
                            .removeEventListener(GDistanceHelper.InvalidationRequestEvent, this._editorHelpersInvalidationRequest, this),
                        this._scene.removeEventListener(GNode.AfterPropertiesChangeEvent, this._afterPropertiesChanged, this),
                        this._scene
                            .getWorkspace()
                            .getToolManager()
                            .removeEventListener(GToolManager.InvalidationRequestEvent, this._toolInvalidationRequest, this),
                        GSceneWidget.prototype.release.call(this));
                }),
                (GEditorWidget.prototype._afterPropertiesChanged = function (event) {
                    !event.temporary &&
                        ((event.node === this._scene &&
                            GUtil.containsOneOf(event.properties, ["w", "h", "gx", "gy", "gm", "ga1", "ga2", "vgl", "hgl", "gaw", "gah"])) ||
                            (event.node instanceof GPage && GUtil.containsOneOf(event.properties, this._viewConfiguration.pageDecoration.margin))) &&
                        this.invalidate();
                }),
                (GEditorWidget.prototype._editorHelpersInvalidationRequest = function (event) {
                    event.area && this.invalidate(this.getWorldTransform().mapRect(event.area));
                }),
                (GEditorWidget.prototype._editorInvalidationRequest = function (event) {
                    if (event.editor) {
                        var invalidArea;
                        if (event.args && event.args.pageTransform && this.getViewConfiguration().multiPageView) {
                            var transform = this.getWorldTransform(this.getScene()).preMultiplied(event.args.pageTransform);
                            invalidArea = event.editor.invalidate(transform, null);
                        } else if (this.getViewConfiguration().multiPageView)
                            invalidArea = event.editor.invalidate(this.getWorldTransform(event.getEditorPage() || this.getScene()), event.args);
                        else {
                            var scene = this.getScene(),
                                page = event.getEditorPage(),
                                activePage = scene ? scene.getActivePage() : null;
                            (page && page !== scene && page !== activePage) || (invalidArea = event.editor.invalidate(this.getWorldTransform(page || scene), event.args));
                        }
                        invalidArea && this.invalidate(invalidArea);
                    }
                }),
                (GEditorWidget.prototype._toolInvalidationRequest = function (event) {
                    this.invalidate(event.area);
                }),
                (GEditorWidget.prototype._rulerDownLister = function (event) {
                    var isVertical = event.sender === this._verticalRuler;
                    if (!(isVertical && event.client.getX() <= 2 * GCanvas.getScreenDPI())) {
                        (event.stopPropagation(), this.startMoveGuideLine(isVertical, -1));
                        var moveListener = function (event) {
                                this.moveGuideLine(event.client);
                            },
                            releaseListener = function (e) {
                                (this.removeEventListener(GMouseEvent.Move, moveListener, this),
                                    this.removeEventListener(GMouseEvent.Release, releaseListener, this),
                                    this.finishMoveGuideLine());
                            };
                        (this.addEventListener(GMouseEvent.Move, moveListener, this), this.addEventListener(GMouseEvent.Release, releaseListener, this));
                    }
                }),
                (GEditorWidget.prototype._guideMoveModifierChangeListener = function (event) {
                    event.changed.metaKey && this.moveGuideLine(this._guideLineViewPoint);
                }),
                (GEditorWidget.prototype._paintElement = function (worldTransform, viewTransform, i, n) {
                    if (
                        ((worldTransform = worldTransform || this.getWorldTransform()),
                        (viewTransform = viewTransform || this.getViewTransform()),
                        this._viewConfiguration.pageDecoration.chessboard ||
                            (this._viewConfiguration.pageDecoration.shadow > 0 && this._scene.isFixedSized()))
                    )
                        if (this._viewConfiguration.multiPageView) {
                            var self = this;
                            this._scene.iteratePages(function (page) {
                                self._renderPageBackground.call(self, page, worldTransform);
                            });
                        } else this._renderPageBackground(this._scene.getActivePage(), worldTransform);
                    GSceneWidget.prototype._paintElement.call(this, worldTransform, viewTransform, i, n);
                    var editor = GElementEditor.getEditor(this._scene);
                    if (
                        (editor && editor.paint(worldTransform, this._elementPaintContext),
                        this._scene.getWorkspace().getToolManager().paint(this._elementPaintContext),
                        this._viewConfiguration.pageDecoration.margin && this._scene.isFixedSized())
                    )
                        if (this._viewConfiguration.multiPageView) {
                            self = this;
                            this._scene.iteratePages(function (page) {
                                self._renderPageMargin.call(self, page, worldTransform);
                            });
                        } else this._renderPageMargin(this._scene.getActivePage(), worldTransform);
                    var revertTransform = null;
                    if (this._elementPaintContext.dirtyMatcher) {
                        var savedViewTransform = viewTransform;
                        (this._elementPaintContext.dirtyMatcher.transform(viewTransform), savedViewTransform && (revertTransform = savedViewTransform.inverted()));
                    }
                    this._editor.getGuides().paint(worldTransform, this._elementPaintContext);
                    var distanceHelper = this._editor.getDistanceHelper();
                    (distanceHelper && distanceHelper.isActivated() && distanceHelper.paint(worldTransform, this._elementPaintContext),
                        revertTransform && this._elementPaintContext.dirtyMatcher.transform(revertTransform));
                }),
                (GEditorWidget.prototype._updateViewTransforms = function (e, t) {
                    GSceneWidget.prototype._updateViewTransforms.apply(this, arguments);
                    var pageDecoration = this._viewConfiguration.pageDecoration;
                    if (pageDecoration.shadow > 0) {
                        var shadowOffsetX = pageDecoration.shadowOffsetX || 0,
                            shadowOffsetY = pageDecoration.shadowOffsetY || 0,
                            shadowSize = 1 + 2 * pageDecoration.shadow,
                            viewTransform = this.getViewTransform(),
                            scaleFactor = viewTransform.getScaleFactor(),
                            left = shadowSize + Math.max(0, -shadowOffsetX),
                            top = shadowSize + Math.max(0, -shadowOffsetY),
                            right = shadowSize + Math.max(0, shadowOffsetX),
                            bottom = shadowSize + Math.max(0, shadowOffsetY);
                        ((left *= scaleFactor), (top *= scaleFactor), (right *= scaleFactor), (bottom *= scaleFactor), this._scene.setShadowExpandArea(left, top, right, bottom));
                    } else this._scene.setShadowExpandArea(null);
                    this._editor.updateInlineEditorForView(this);
                }));
            var chessboardPattern = null,
                shadowWarningShown = false;
            ((GEditorWidget.prototype._renderPageBackground = function (page, worldTransform) {
                var pageDecoration = this._viewConfiguration.pageDecoration,
                    pagePosition = page.getPosition(this._viewConfiguration.multiPageView),
                    pageTransform = worldTransform.preMultiplied(new GTransform(1, 0, 0, 1, pagePosition.getX(), pagePosition.getY())),
                    bbox = page.isFixedSized() ? page.getGeometryBBox() : page.getPaintBBox(null, true);
                if (bbox) {
                    var bounds = pageTransform.mapRect(bbox),
                        boundsX = bounds.getX(),
                        boundsY = bounds.getY(),
                        boundsWidth = bounds.getWidth(),
                        boundsHeight = bounds.getHeight(),
                        dirtyMatcher = this._elementPaintContext.dirtyMatcher,
                        isFirefoxOnWindows =
                            "undefined" != typeof navigator &&
                            navigator &&
                            0 == navigator.userAgent.indexOf("Mozilla") &&
                            0 == navigator.platform.indexOf("Win") &&
                            navigator.userAgent.indexOf("Edge") < 0 &&
                            navigator.userAgent.indexOf("Chrome") < 0 &&
                            navigator.userAgent.indexOf("Safari") < 0;
                    isFirefoxOnWindows &&
                        pageDecoration.shadow > 0 &&
                        !shadowWarningShown &&
                        ((shadowWarningShown = true), console.warn("Due to browser bug (Firefox), shadow under canvas isn't displayed."));
                    var drawShadow = pageDecoration.shadow > 0 && !isFirefoxOnWindows && !(GSceneOptions.pagesCanOverlap && this._viewConfiguration.multiPageView),
                        shadowOffsetX = pageDecoration.shadowOffsetX || 0,
                        shadowOffsetY = pageDecoration.shadowOffsetY || 0;
                    if (dirtyMatcher) {
                        var shadowSize = 1 + 2 * pageDecoration.shadow,
                            expandedBounds = bounds.expanded(shadowSize + Math.max(0, -shadowOffsetX), shadowSize + Math.max(0, -shadowOffsetY), shadowSize + Math.max(0, shadowOffsetX), shadowSize + Math.max(0, shadowOffsetY));
                        if (!dirtyMatcher.isDirty(expandedBounds)) return;
                        if (drawShadow) {
                            drawShadow = false;
                            var subtractedRects = expandedBounds.subtracted(bounds, true);
                            subtractedRects instanceof GRect && (subtractedRects = [subtractedRects]);
                            for (var C = 0; C < subtractedRects.length; C++) {
                                var E = subtractedRects[C];
                                if (dirtyMatcher.isDirty(E)) {
                                    drawShadow = true;
                                    break;
                                }
                            }
                        }
                        if (
                            !drawShadow &&
                            this._viewConfiguration.paintMode !== GScenePaintConfiguration.PaintMode.Outline &&
                            !this._sceneCanvas.isMasked() &&
                            1 == page.getProperty("bop")
                        ) {
                            var background = page.getProperty("bck");
                            if (background instanceof GRGBColor) return;
                            if (
                                background instanceof GGradient &&
                                background.getStops().every(function (stop) {
                                    return 1 == stop.opacity;
                                })
                            )
                                return;
                        }
                    }
                    var fillStyle = pageDecoration.background || "white";
                    pageDecoration.chessboard &&
                        (chessboardPattern || (chessboardPattern = GCanvas.createChessboard(8, "white", "rgb(205, 205, 205)")), (fillStyle = this._elementCanvas.createTexture(chessboardPattern)));
                    try {
                        if (
                            (drawShadow &&
                                ((this._elementCanvas._canvasContext.shadowColor = pageDecoration.shadowBackground || "rgba(0,0,0,0.5)"),
                                (this._elementCanvas._canvasContext.shadowBlur = pageDecoration.shadow),
                                (this._elementCanvas._canvasContext.shadowOffsetX = shadowOffsetX),
                                (this._elementCanvas._canvasContext.shadowOffsetY = shadowOffsetY)),
                            dirtyMatcher && isFirefoxOnWindows)
                        ) {
                            var pageRect = new GRect(Math.ceil(boundsX), Math.ceil(boundsY), Math.floor(boundsWidth), Math.floor(boundsHeight)),
                                dirtyRects = dirtyMatcher.getNonIntersectingDirtyRectangles();
                            for (C = 0; C < dirtyRects.length; ++C) {
                                var F = dirtyRects[C];
                                ((F = F.intersected(pageRect)), this._elementCanvas.fillRect(F.getX(), F.getY(), F.getWidth(), F.getHeight(), fillStyle));
                            }
                        } else this._elementCanvas.fillRect(Math.ceil(boundsX), Math.ceil(boundsY), Math.floor(boundsWidth), Math.floor(boundsHeight), fillStyle);
                    } finally {
                        drawShadow &&
                            ((this._elementCanvas._canvasContext.shadowBlur = 0),
                            (this._elementCanvas._canvasContext.shadowColor = "transparent"));
                    }
                }
            }),
                (GEditorWidget.prototype._renderPageMargin = function (page, worldTransform) {
                    var pagePosition = page.getPosition(this._viewConfiguration.multiPageView),
                        pageTransform = worldTransform.preMultiplied(new GTransform(1, 0, 0, 1, pagePosition.getX(), pagePosition.getY())),
                        bbox = page.getGeometryBBox();
                    if (bbox) {
                        var offset = 0;
                        GEditorOptions.outlineWidth % 2 != 0 && (offset = 0.5);
                        var marginBBox = bbox.expanded(-page.getProperty("ml"), -page.getProperty("mt"), -page.getProperty("mr"), -page.getProperty("mb")),
                            marginRect = pageTransform.mapRect(marginBBox).translated(offset, offset).toAlignedRect(),
                            dirtyMatcher = this._elementPaintContext.dirtyMatcher,
                            halfOutlineWidth = Math.ceil(GEditorOptions.outlineWidth / 2);
                        if ((!dirtyMatcher || dirtyMatcher.isDirty(marginRect.expanded(halfOutlineWidth, halfOutlineWidth, halfOutlineWidth, halfOutlineWidth))) && !GRect.equals(bbox, marginBBox)) {
                            var x = marginRect.getX(),
                                y = marginRect.getY(),
                                width = marginRect.getWidth(),
                                height = marginRect.getHeight();
                            this._elementPaintContext.canvas.strokeRect(x, y, width, height, GEditorOptions.outlineWidth, new GRGBColor([255, 0, 255]));
                        }
                    }
                }),
                (GEditorWidget.prototype.handleDropEvent = function (event) {
                    var clientPosition = this._convertClientPositionFromMousePosition(event);
                    this._handleDrop(clientPosition, event.dataTransfer);
                }),
                (GEditorWidget.prototype._handleSymbolDrop = function (symbol) {
                    var symbols = this._scene.getSymbols();
                    if (symbols) {
                        for (var found = false, n = 0; n < symbols.length && !found; n++)
                            symbols[n].getMultireferenceId() !== symbol.getMultireferenceId() || symbols[n].getParent() || ((symbol = symbols[n]), (found = true));
                        if (!found) {
                            var masterMultiRef = symbol.getProperty("masterMultiRef");
                            for (n = 0; n < symbols.length && !found; n++) symbols[n].getProperty("masterMultiRef") === masterMultiRef && (found = true);
                            found
                                ? console.log("inserting:found")
                                : ((symbol._master = true),
                                  (symbol.getProperty("masterRef") === symbol.getReferenceId() &&
                                      symbol.getProperty("masterMultiRef") === symbol.getMultireferenceId()) ||
                                      console.log("inserting: making non master a master"),
                                  symbol.setProperties(["masterRef", "masterMultiRef"], [symbol.getReferenceId(), symbol.getMultireferenceId()]));
                        }
                    }
                    return symbol;
                }),
                (GEditorWidget.prototype._handleDrop = function (clientPosition, dataTransfer) {
                    var scenePoint = this.getViewTransform(this._scene).mapPoint(clientPosition),
                        pagePoint = this.getViewTransform(this._scene.getActivePage()).mapPoint(clientPosition);
                    if (dataTransfer.files && dataTransfer.files.length > 0) {
                        if (this._editor.hasEventListeners(GEditor.FileDropEvent))
                            for (var a = 0; a < dataTransfer.files.length; ++a) this._editor.trigger(new GEditor.FileDropEvent(dataTransfer.files[a], pagePoint));
                    } else if (dataTransfer.types && dataTransfer.types.length > 0) {
                        var matches = [],
                            handled = false;
                        for (a = 0; a < dataTransfer.types.length; ++a) {
                            var h = dataTransfer.types[a],
                                A = dataTransfer.getData(h);
                            if (A) {
                                var p = null,
                                    u = null;
                                switch (h) {
                                    case GPattern.MIME_TYPE:
                                        ((p = GElementEditor.DropType.Pattern), (u = GPattern.deserialize(A)));
                                        break;
                                    case GNode.MIME_TYPE:
                                        ((p = GElementEditor.DropType.Node), (u = GNode.deserialize(A)) instanceof GSymbol && (u = this._handleSymbolDrop(u)));
                                        break;
                                    case GElementEditor.DROP_MIME_TYPE_FONT_FAMILY:
                                        ((p = GElementEditor.DropType.FontFamily), (u = A));
                                        break;
                                    case GElementEditor.DROP_MIME_TYPE_CUSTOM:
                                        this._editor.hasEventListeners(GEditor.CustomDropEvent) &&
                                            this._editor.trigger(new GEditor.CustomDropEvent(A, pagePoint));
                                        break;
                                    case "text/plain":
                                        ((p = GElementEditor.DropType.Text), (u = A));
                                        break;
                                    default:
                                        continue;
                                }
                                if (
                                    (matches.push({
                                        type: p,
                                        source: u,
                                    }),
                                    null !== p)
                                ) {
                                    var d = this._scene.hitTest(
                                        clientPosition,
                                        this.getWorldTransform(this._scene),
                                        null,
                                        true,
                                        -1,
                                        GEditorOptions.pickDistance,
                                        true,
                                        this._dropHitFilter,
                                        false,
                                        false,
                                        this._viewConfiguration.multiPageView
                                    );
                                    if (d && d.length > 0)
                                        for (var y = 0; y < d.length; ++y) {
                                            var v = d[y],
                                                C = GElementEditor.createEditor(v.element);
                                            if (C) {
                                                for (var w = null, E = v.element; E; ) {
                                                    if (E instanceof GPage) {
                                                        w = this.getViewTransform(E).mapPoint(clientPosition);
                                                        break;
                                                    }
                                                    E = E.getParent();
                                                }
                                                if (w && C.acceptDrop(w, p, u, v.data)) {
                                                    handled = true;
                                                    break;
                                                }
                                            }
                                        }
                                }
                            }
                        }
                        if (!handled)
                            for (a = 0; a < matches.length; ++a) {
                                ((p = matches[a].type), (u = matches[a].source));
                                if (p === GElementEditor.DropType.Node && u instanceof GElement) {
                                    if (u instanceof GSymbol) {
                                        var B = u.getGeometryBBox();
                                        if (B) {
                                            var x = B.getX(),
                                                P = B.getY();
                                            u.transform(new GTransform(1, 0, 0, 1, -x + pagePoint.getX(), -P + pagePoint.getY()), true);
                                        }
                                    } else u.transform(new GTransform(1, 0, 0, 1, pagePoint.getX(), pagePoint.getY()), true);
                                    this._editor.updateByMousePosition(scenePoint, null, false, this._viewConfiguration);
                                    var S = [],
                                        R = [],
                                        D = u.accept(
                                            function (child) {
                                                return (
                                                    !!(child instanceof GSymbol && child.isMaster()) && (S.push(child.getMultireferenceId()), R.push(child), true)
                                                );
                                            },
                                            false,
                                            true
                                        );
                                    (D && this._editor.beginTransaction(),
                                        this._editor.insertElements([u], true, D, true),
                                        D &&
                                            (this._scene.acceptChildren(
                                                function (child) {
                                                    if (child instanceof GSymbol && !child.isMaster()) {
                                                        var masterIndex = S.indexOf(child.getProperty("masterMultiRef"));
                                                        if (masterIndex >= 0) {
                                                            var masterElement = R[masterIndex];
                                                            (this._scene.link(masterElement, child), child.setProperty("masterRef", masterElement.getReferenceId()));
                                                        }
                                                    }
                                                }.bind(this)
                                            ),
                                            this._editor.commitTransaction(String.get(new GLocaleKey("GEditorWidget", "action.insert-master-symbol")))),
                                        (handled = true));
                                }
                            }
                    }
                }),
                (GEditorWidget.prototype._dropHitFilter = function (element) {
                    return !element.hasFlag(GElement.Flag.FullLocked);
                }),
                (GEditorWidget.prototype.toString = function () {
                    return "[Object GEditorWidget]";
                }),
                (module.exports = GEditorWidget));
        };
