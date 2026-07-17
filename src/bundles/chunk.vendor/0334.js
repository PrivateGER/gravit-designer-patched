module.exports = function (module, exports, require) {
            var GNode = require(2),
                r = require(76),
                util = require(11),
                GRect = require(6),
                GMouseEvent = require(77),
                GPoint = require(5),
                GGroup = require(104),
                GPage = require(83),
                GKeyEvent = require(167),
                GLayer = require(159),
                EditorBase = require(39),
                GSymbol = require(216),
                GModifiers = require(64),
                GModifiersChangedEvent = require(150),
                IsFiniteNonNegativeNumber = require(0),
                y = (require(17), require(72)),
                GCursor = require(52),
                GSlice = require(289),
                GSceneEditor = require(545),
                settings = require(24),
                GPath = require(60),
                E = require(113),
                B = require(162),
                x = require(385),
                P = require(276),
                GKey = require(164),
                T = require(75),
                GTransformBox = require(546),
                GShape = require(56),
                GUITool = require(211),
                VertexContainer = require(54),
                GElement = require(22),
                G = require(122),
                GEditor = require(82),
                M = require(99),
                GPathEditor = require(127),
                GCompoundPathEditor = require(235),
                V = require(233),
                GElementEditor = require(36),
                L = require(154),
                Y = require(275),
                GGuides = require(210),
                GBoxEditor = require(66),
                GImageEditor = require(329),
                PathCommand = require(48),
                z = require(59),
                VertexIntersector = require(187),
                GImage = require(95),
                GText = require(70),
                K = require(45),
                $ = (require(73), require(87)),
                GTransform = require(7),
                GImageGrid = require(534),
                MOVE_MASTER = require(331),
                VertexPixelAligner = require(141),
                VertexTransformer = require(63),
                MathUtil = require(12),
                GLocale = (require(132), require(128), require(9 /* String */)),
                GLocaleKey = require(47),
                QuadTree = require(140),
                he = require(69),
                AnnotationMixin = require(84),
                ce = require(333);

            function pe(areaSelector) {
                (GUITool.call(this),
                    ce.call(this),
                    (this._selectFilterFunc = this._selectFilter.bind(this)),
                    (this._selectAcceptorFunc = this._selectAcceptor.bind(this)),
                    (this._areaSelector = areaSelector || new pe._AreaSelector()));
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(pe, GUITool, [T, ce]),
                (pe.EditMode = {
                    Select: 0,
                    Transform: 1,
                    Edit: 2,
                }),
                (pe._DblClick = {
                    Disabled: null,
                    EditModeSwitch: "edit",
                    SubSelectSwitch: "subselect",
                }),
                (pe._DistanceHelperBehaviour = {
                    Default: null,
                    Click: "click",
                }),
                (pe._Mode = {
                    Select: 1,
                    Move: 2,
                    Moving: 3,
                    Transforming: 4,
                    Editing: 5,
                    MoveGuideLine: 6,
                }),
                (pe.DBLCLICKTM = 250),
                (pe.InteractionMode = {
                    Default: 0,
                    Mixed: 1,
                }),
                (pe.Event = function (type, args) {
                    ((this.type = type), (this.args = args));
                }),
                IsFiniteNonNegativeNumber.inherit(pe.Event, y),
                (pe.Event.Type = {
                    EditModeChanged: 0,
                }),
                (pe.Event.type = null),
                (pe.Event.args = null),
                (pe.Event.prototype.toString = function () {
                    return "[Event GSelectTool.Event]";
                }),
                (pe._AreaSelector = function () {
                    this._vertexContainer = new VertexContainer();
                }),
                (pe._AreaSelector.prototype._vertexContainer = null),
                (pe._AreaSelector.prototype._pixelTransformer = null),
                (pe._AreaSelector.prototype._selectionColor = null),
                (pe._AreaSelector.prototype.hasSelectArea = function () {
                    return !!this._areaLastPos;
                }),
                (pe._AreaSelector.prototype.clearArea = function () {
                    (this._vertexContainer.clearVertices(),
                        (this._pixelTransformer = null),
                        (this._areaStartedPos = null),
                        (this._areaLastPos = null),
                        (this._trf = null),
                        (this._selectionColor = null));
                }),
                (pe._AreaSelector.prototype.hasAreaStarted = function () {
                    return !!this._areaStartedPos;
                }),
                (pe._AreaSelector.prototype.startArea = function (point) {
                    (this.clearArea(),
                        (this._areaStartedPos = point),
                        (this._areaLastPos = point),
                        this._vertexContainer.addVertex(PathCommand.Command.Move, point.getX(), point.getY()));
                }),
                (pe._AreaSelector.prototype.translate = function (delta) {
                    this._areaLastPos &&
                        ((this._trf = new GTransform().translated(delta.getX(), delta.getY())),
                        (this._pixelTransformer = new VertexTransformer(this._vertexContainer, this._trf)));
                }),
                (pe._AreaSelector.prototype.moveToPoint = function (point) {
                    if (this._areaLastPos) {
                        var delta = point.subtract(this._areaLastPos);
                        ((this._trf = new GTransform().translated(delta.getX(), delta.getY())),
                            (this._pixelTransformer = new VertexTransformer(this._vertexContainer, this._trf)));
                    }
                }),
                (pe._AreaSelector.prototype.expandToPoint = function (point) {
                    (this._vertexContainer.clearVertices(),
                        this._areaStartedPos || (this._areaStartedPos = point),
                        this._trf &&
                            ((this._areaStartedPos = this._trf.mapPoint(this._areaStartedPos)),
                            (this._trf = null),
                            (this._pixelTransformer = null)),
                        (this._areaLastPos = point));
                    var startX = this._areaStartedPos.getX(),
                        startY = this._areaStartedPos.getY(),
                        endX = this._areaLastPos.getX(),
                        endY = this._areaLastPos.getY();
                    (this._vertexContainer.addVertex(PathCommand.Command.Move, startX, startY),
                        (MathUtil.isEqualEps(startX, endX) && MathUtil.isEqualEps(startY, endY)) ||
                            (this._vertexContainer.addVertex(PathCommand.Command.Line, endX, startY),
                            this._vertexContainer.addVertex(PathCommand.Command.Line, endX, endY),
                            this._vertexContainer.addVertex(PathCommand.Command.Line, startX, endY),
                            this._vertexContainer.addVertex(PathCommand.Command.Close, 0, 0)));
                }),
                (pe._AreaSelector.prototype.getAreaPaintRect = function (skipOutlineExpand) {
                    var rect = null;
                    if (this._pixelTransformer || this._areaLastPos) {
                        var vertexSource = new VertexPixelAligner(this._pixelTransformer ? this._pixelTransformer : this._vertexContainer);
                        rect = z.calculateBounds(vertexSource, false);
                    }
                    return (skipOutlineExpand || (rect = rect ? rect.expanded(settings.outlineWidth, settings.outlineWidth, settings.outlineWidth, settings.outlineWidth) : null), rect);
                }),
                (pe._AreaSelector.prototype.getCollisionArea = function (transform) {
                    var area = null;
                    return (
                        (this._pixelTransformer || this._areaLastPos) &&
                            (area = new VertexTransformer(this._pixelTransformer ? this._pixelTransformer : this._vertexContainer, transform)),
                        area
                    );
                }),
                (pe._AreaSelector.prototype.paint = function (context) {
                    var rect = this.getAreaPaintRect(true);
                    if (rect && (rect.getWidth() || rect.getHeight())) {
                        var height = rect.getHeight();
                        height = height > 0 ? Math.ceil(height) - 1 : 0;
                        var width = rect.getWidth();
                        ((width = width > 0 ? Math.ceil(width) - 1 : 0),
                            (rect = new GRect(Math.floor(rect.getX()) + 0.5, Math.floor(rect.getY()) + 0.5, width, height)),
                            this._selectionColor ||
                                (this._selectionColor = EditorBase.getOutlineColor(
                                    context,
                                    this._areaStartedPos.getX(),
                                    this._areaStartedPos.getY(),
                                    context.selectionOutlineColor
                                )),
                            context.canvas.fillRect(rect.getX(), rect.getY(), rect.getWidth(), rect.getHeight(), this._selectionColor, 0.1),
                            context.canvas.strokeRect(rect.getX(), rect.getY(), rect.getWidth(), rect.getHeight(), settings.outlineWidth, this._selectionColor));
                    }
                }),
                (pe.prototype._interactionMode = pe.InteractionMode.Default),
                (pe.prototype._selectFilterFunc = null),
                (pe.prototype._handlingDragEnd = null),
                (pe.prototype._selectAcceptorFunc = null),
                (pe.prototype._areaSelector = null),
                (pe.prototype._releaseOnlySelection = false),
                (pe.prototype._mode = null),
                (pe.prototype._clickedElement = null),
                (pe.prototype._clickGoDown = true),
                (pe.prototype._selectionDone = false),
                (pe.prototype._elementUnderMouse = null),
                (pe.prototype._editorUnderMouseInfo = null),
                (pe.prototype._editorMovePartInfo = null),
                (pe.prototype._guideLineUnderMouse = null),
                (pe.prototype._shiftConstraining = false),
                (pe.prototype._keyDelta = null),
                (pe.prototype._moveStart = null),
                (pe.prototype._moveStartTransformed = null),
                (pe.prototype._moveCurrent = null),
                (pe.prototype._dragHandling = false),
                (pe.prototype._visuals = null),
                (pe.prototype._visualsArea = null),
                (pe.prototype._editMode = pe.EditMode.Select),
                (pe.prototype._itemsToAddToImageMask = null),
                (pe.prototype._itemsToAddToPage = null),
                (pe.prototype._pageCandidates = null),
                (pe.prototype._allowDistanceHelper = false),
                (pe.prototype._elementMeasurementsToggle = false),
                (pe.prototype._mDownTime1 = null),
                (pe.prototype._mDownTime2 = null),
                (pe.prototype._lastMouseEvent = null),
                (pe.prototype._clickToDragTimeout = null),
                (pe.prototype._styleEdManager = null),
                (pe.prototype._isBackgroundSelectEnabled = true),
                (pe.prototype._selectIgnoreBackgroundElements = null),
                (pe.prototype._backgroundSelectShouldBeEnabled = false),
                (pe.prototype.supportsElementClick = function () {
                    return true;
                }),
                (pe.prototype.clearClickedElement = function () {
                    this._clickedElement = null;
                }),
                (pe.prototype.setInteractionMode = function (mode) {
                    this._interactionMode = mode;
                }),
                (pe.prototype.getEditMode = function () {
                    return this._editMode;
                }),
                (pe.prototype.setEditMode = function (mode) {
                    if (this._editMode !== mode) {
                        var previousMode = this._editMode;
                        switch (this._editMode) {
                            case pe.EditMode.Edit:
                                (this._editor.setSelectionDetail(false),
                                    this._editor.setPathResize(this._hasPathResize()),
                                    this._editor.setSelectionEdit(false));
                                break;
                            case pe.EditMode.Transform:
                                (this._closeTransformBox(),
                                    void 0 !== settings.scaleBorderWidth
                                        ? this._scene.setBorderScale(settings.scaleBorderWidth)
                                        : this._scene.setBorderScale(null),
                                    void 0 !== settings.scaleCorners
                                        ? this._scene.setCornersScale(settings.scaleCorners)
                                        : this._scene.setCornersScale(null),
                                    this._editor.setFullContentTransform(false));
                        }
                        switch (((this._editMode = mode), this._editMode)) {
                            case pe.EditMode.Edit:
                                (this._editor.setSelectionDetail(true), this._editor.setPathResize(false), this._editor.setSelectionEdit(true));
                                break;
                            case pe.EditMode.Transform:
                                (this._openTransformBox(), this._editor.setFullContentTransform(true));
                        }
                        this.hasEventListeners(pe.Event) &&
                            this.trigger(
                                new pe.Event(pe.Event.Type.EditModeChanged, {
                                    mode: this._editMode,
                                    previousMode: previousMode,
                                })
                            );
                    }
                }),
                (pe.prototype.getCursor = function () {
                    if (
                        GModifiers.modifiers.optionKey &&
                        this._mode == pe._Mode.Moving &&
                        (!this._editorMovePartInfo || !this._editorMovePartInfo.isolated)
                    )
                        return GCursor.SelectPlus;
                    if (this._editorUnderMouseInfo) {
                        var cursor = this._editorUnderMouseInfo.editor.getCursor(this._editorUnderMouseInfo.id, this._editorUnderMouseInfo.data);
                        return (cursor || (cursor = GCursor.SelectDot), cursor);
                    }
                    return this._guideLineUnderMouse
                        ? this._guideLineUnderMouse.isVertical
                            ? GCursor.SelectResizeHoriz
                            : GCursor.SelectResizeVert
                        : this._elementUnderMouse
                          ? GCursor.SelectDot
                          : GCursor.Select;
                }),
                (pe.prototype.activate = function (view, temporary) {
                    (GUITool.prototype.activate.call(this, view, temporary),
                        (this._mDownTime1 = null),
                        (this._mDownTime2 = null),
                        temporary ||
                            (view.addEventListener(GMouseEvent.DragStart, this._mouseDragStart, this),
                            view.addEventListener(GMouseEvent.Drag, this._mouseDrag, this),
                            view.addEventListener(GMouseEvent.DragEnd, this._mouseDragEnd, this),
                            view.addEventListener(GMouseEvent.Down, this._mouseDown, this),
                            view.addEventListener(GMouseEvent.Release, this._mouseRelease, this),
                            view.addEventListener(GMouseEvent.Move, this._mouseMove, this),
                            view.addEventListener(GMouseEvent.DblClick, this._mouseDblClick, this),
                            view.addEventListener(GKeyEvent.Down, this._keyDown, this),
                            view.addEventListener(GKeyEvent.Release, this._keyRelease, this),
                            GModifiers.addEventListener(GModifiersChangedEvent, this._modifiersChanged, this),
                            this._editor.addEventListener(GEditor.SelectionChangedEvent, this._selectionChanged, this)),
                        this._editor.setPathResize(this._hasPathResize(), true),
                        (this._shiftConstraining = false),
                        this._view.setRightDrag(true),
                        (this._releaseOnlySelection = false),
                        (this._lastMouseEvent = null));
                }),
                (pe.prototype.deactivate = function (view, temporary) {
                    (this._elementUnderMouse && this._elementUnderMouse.removeFlag(GNode.Flag.Highlighted),
                        this._visualsArea && (this.invalidateArea(this._visualsArea), (this._visualsArea = null)),
                        (this._lastMouseEvent = null),
                        this._allowDistanceHelper &&
                            this._editor &&
                            this._editor.getDistanceHelper().isActivated() &&
                            this._editor.getDistanceHelper().deactivateMeasurement(),
                        !temporary && this._editor && this._editor.setPathResize(true),
                        this._editor && this._editor.removeEventListener(GEditor.SelectionChangedEvent, this._selectionChanged, this),
                        this.updateInlineHint(null),
                        view.removeEventListener(GMouseEvent.DragStart, this._mouseDragStart),
                        view.removeEventListener(GMouseEvent.Drag, this._mouseDrag),
                        view.removeEventListener(GMouseEvent.DragEnd, this._mouseDragEnd),
                        view.removeEventListener(GMouseEvent.Down, this._mouseDown),
                        view.removeEventListener(GMouseEvent.Release, this._mouseRelease),
                        view.removeEventListener(GMouseEvent.Move, this._mouseMove),
                        view.removeEventListener(GMouseEvent.DblClick, this._mouseDblClick),
                        view.removeEventListener(GKeyEvent.Down, this._keyDown),
                        view.removeEventListener(GKeyEvent.Release, this._keyRelease),
                        GModifiers.removeEventListener(GModifiersChangedEvent, this._modifiersChanged),
                        this._view && this._view.setRightDrag(false),
                        GUITool.prototype.deactivate.call(this, view, temporary));
                }),
                (pe.prototype.isDeactivatable = function () {
                    if (this._editor) {
                        var inlineNode = this._editor.getCurrentInlineEditorNode();
                        return (!this._mode && !inlineNode) || this._mode === pe._Mode.Transforming;
                    }
                }),
                (pe.prototype.hasSelectedArea = function () {
                    return this._mode === pe._Mode.Select && !!this._areaSelector && this._areaSelector.hasSelectArea();
                }),
                (pe.prototype.paint = function (context) {
                    if (
                        (this._mode == pe._Mode.Select && this._areaSelector.hasSelectArea() && this._areaSelector.paint(context), this._visuals)
                    ) {
                        for (var t, i = 0; i < this._visuals.length; ++i) {
                            var n = (t = this._visuals[i])[0],
                                r = t[1],
                                o = 0;
                            (settings.outlineWidth % 2 != 0 && (o = 0.5),
                                context.canvas.strokeLine(
                                    Math.floor(n.getX()) + o,
                                    Math.floor(n.getY()) + o,
                                    Math.floor(r.getX()) + o,
                                    Math.floor(r.getY()) + o,
                                    settings.outlineWidth,
                                    settings.guideOutlineColor
                                ));
                        }
                        this._visuals = null;
                    }
                }),
                (pe.prototype._selectionChanged = function () {
                    if (this._mode == pe._Mode.Transforming) {
                        var selection = this._editor.getIndividualSelection();
                        selection && selection.length ? this.setEditMode(pe.EditMode.Transform, true) : this.setEditMode(pe.EditMode.Select);
                    }
                }),
                (pe.prototype._hasPathResize = function () {
                    return true;
                }),
                (pe.prototype._mouseMove = function (event) {
                    if (
                        ((this._lastMouseEvent = event),
                        this._allowDistanceHelper &&
                            this._editor.getDistanceHelper().isActivated() &&
                            !GModifiers.modifiers.optionKey &&
                            this._editor.getDistanceHelper().deactivateMeasurement(),
                        !this._editor.getCurrentInlineEditorNode())
                    ) {
                        var editor = GElementEditor.getEditor(this._scene);
                        (editor && editor.isTransformBoxActive() && this._mode != pe._Mode.MoveGuideLine && this._updateMode(pe._Mode.Transforming),
                            this._editor.updateByMousePosition(
                                event.client,
                                this._view.getWorldTransform(this._scene),
                                true,
                                this._view.getViewConfiguration()
                            ),
                            this._updateEditorUnderMouse(event.client));
                    }
                }),
                (pe.prototype._mouseDown = function (event) {
                    ((this._mDownTime1 = this._mDownTime2),
                        (this._mDownTime2 = new Date().getTime()),
                        (this._lastMouseEvent = event),
                        this._allowDistanceHelper &&
                            this._editor.getDistanceHelper().isActivated() &&
                            !GModifiers.modifiers.optionKey &&
                            this._editor.getDistanceHelper().deactivateMeasurement());
                    var inlineNode = this._editor.getCurrentInlineEditorNode();
                    if (inlineNode) {
                        var bbox = inlineNode.getPaintBBox();
                        if (bbox && !bbox.isEmpty()) {
                            bbox = this._view.getWorldTransform(this._view.getScene().getActivePage()).mapRect(bbox);
                            var pickDistance = settings.pickDistance;
                            bbox.expanded(pickDistance, pickDistance, pickDistance, pickDistance).containsPoint(event.client) || this._editor.closeInlineEditor();
                        }
                    } else {
                        ((this._clickedElement = null), (this._selectionDone = false));
                        var metaSelect = GModifiers.modifiers.metaKey && null == this._manager.getTemporaryActiveTool(),
                            toggleSelect = GModifiers.modifiers.shiftKey && !this._shiftConstraining,
                            tboxEditor = GElementEditor.getEditor(this._scene);
                        if (tboxEditor && tboxEditor.isTransformBoxActive())
                            (this._mode != pe._Mode.Transforming && this._updateMode(pe._Mode.Transforming),
                                (this._editorMovePartInfo = tboxEditor.getTBoxPartInfoAt(
                                    event.client,
                                    this._view.getWorldTransform(this._scene),
                                    settings.pickDistance,
                                    this._view.getViewConfiguration().multiPageView
                                )),
                                !this._guideLineUnderMouse ||
                                (this._editorMovePartInfo.id !== GTransformBox.OUTSIDE &&
                                    this._editorMovePartInfo.id !== GTransformBox.INSIDE &&
                                    this._editorMovePartInfo.id !== GTransformBox.FAR_OUTSIDE)
                                    ? this._editorMovePartInfo.id === GTransformBox.FAR_OUTSIDE && this.setEditMode(pe.EditMode.Select)
                                    : (this._updateMode(pe._Mode.MoveGuideLine), (this._selectionDone = true)));
                        else if ((this._updateMode(pe._Mode.Select), !metaSelect)) {
                            var editor = GElementEditor.getEditor(this._scene);
                            if (editor) {
                                var targetPage =
                                        util.find(this._scene.getChildren(), function (child) {
                                            if (child instanceof GPage && child.hasFlag(GNode.Flag.Highlighted)) return child;
                                        }) || this._scene.getActivePage(),
                                    partInfo = editor.getPartInfoAt(
                                        event.client,
                                        this._view.getWorldTransform(targetPage),
                                        function (part) {
                                            if (part.allowPartSelection()) {
                                                if (!part.isRelativeToPage()) return true;
                                                if (GEditor.getEditorPage(part) === targetPage) return true;
                                            }
                                            return false;
                                        }.bind(this),
                                        settings.pickDistance,
                                        this._view.getViewConfiguration().multiPageView
                                    );
                                if (
                                    partInfo &&
                                    (this._editor.hasSelectionDetail() || this._editor.hasSelectionEdit() || !this._isLineSegment(partInfo))
                                ) {
                                    var partEditor = partInfo.editor,
                                        partId = partInfo.id,
                                        selectable =
                                            partInfo.selectable ||
                                            (event.button === GMouseEvent.BUTTON_RIGHT && partInfo.data && partInfo.data.rightButton && partInfo.data.rightButton.selectable);
                                    if (toggleSelect || (!partEditor.isPartSelected(partId) && selectable)) {
                                        var ownedCount = 0;
                                        if (partInfo.data && partInfo.data.ownerEditor)
                                            (toggleSelect && selectable && partEditor.isPartSelected(partId) && (ownedCount = partInfo.data.ownerEditor.getOwnedPartsSelectionLength()),
                                                ((selectable && 1 !== ownedCount) || (!selectable && toggleSelect)) && partInfo.data.ownerEditor.updateOwnedPartsSelection(toggleSelect, [partInfo]));
                                        else if (
                                            (toggleSelect && selectable && partEditor.isPartSelected(partId) && (ownedCount = partEditor.getPartsSelectionLength()),
                                            (selectable && 1 !== ownedCount) || (!selectable && toggleSelect))
                                        ) {
                                            var newPartInfo = partEditor.updatePartSelection(toggleSelect, selectable ? [partId] : null);
                                            (newPartInfo &&
                                                newPartInfo instanceof EditorBase.PartInfo &&
                                                ((partId = (partInfo = newPartInfo).id),
                                                (selectable =
                                                    partInfo.selectable ||
                                                    (event.button === GMouseEvent.BUTTON_RIGHT &&
                                                        partInfo.data &&
                                                        partInfo.data.rightButton &&
                                                        partInfo.data.rightButton.selectable))),
                                                !this._editor.hasEventListeners(GEditor.SelectionChangedEvent) ||
                                                    (partInfo.data && partInfo.data.noEditorSelectionChangedEvent) ||
                                                    this._editor.trigger(GEditor.SELECTION_CHANGED_EVENT));
                                        }
                                        this._selectionDone = true;
                                    }
                                    ((selectable && !partEditor.isPartSelected(partId) && partId !== L.LabelHolder.LABEL_PART_ID) || (this._editorMovePartInfo = partInfo),
                                        this._updateMode(pe._Mode.Move),
                                        partId === L.LabelHolder.LABEL_PART_ID &&
                                            this._editor.updateByMousePosition(
                                                event.client,
                                                this._view.getWorldTransform(this._scene),
                                                false,
                                                this._view.getViewConfiguration()
                                            ));
                                }
                            }
                        }
                        this._mode === pe._Mode.Select &&
                            (this._editor.updateByMousePosition(
                                event.client,
                                this._view.getWorldTransform(this._scene),
                                false,
                                this._view.getViewConfiguration()
                            ),
                            this._guideLineUnderMouse && (this._updateMode(pe._Mode.MoveGuideLine), (this._selectionDone = true)),
                            this._selectionDone ||
                                (this._isBackgroundSelectEnabled
                                    ? (this._clickedElement = this._getSelectableForPosition(event.client, true, event.button === GMouseEvent.BUTTON_RIGHT))
                                    : (this._selectIgnoreBackgroundElements = this._getAllHitTestedElems(event.client)),
                                (this._clickedToggle = toggleSelect),
                                this._clickedElement
                                    ? (inlineNode && this._clickedElement !== inlineNode && this._editor.closeInlineEditor(),
                                      this._scene.updateActivePageForElem(this._clickedElement),
                                      this._scene.updateActiveLayerForElem(this._clickedElement))
                                    : (this._releaseOnlySelection || this._updateSelection(this._clickedToggle, []),
                                      inlineNode && this._editor.closeInlineEditor())));
                    }
                }),
                (pe.prototype._getSelectableForPosition = function (point, isMouseDown, isRightClick) {
                    var underMouseElement = this._checkSelectedUnderMouse(point);
                    if (underMouseElement && (!this._clickGoDown || isMouseDown || isRightClick)) return underMouseElement;
                    var hitResults,
                        metaSelect = GModifiers.modifiers.metaKey && null == this._manager.getTemporaryActiveTool(),
                        zonesEnabled = GGuides.options.zones && !metaSelect,
                        zoneFilter = function (candidate) {
                            return !(candidate instanceof G || candidate instanceof GLayer) && this._selectAcceptor(candidate);
                        }.bind(this),
                        runHitTest = function (includeAnnotations) {
                            return this._scene.hitTest(
                                point,
                                this._view.getWorldTransform(this._scene),
                                zoneFilter,
                                metaSelect,
                                -1,
                                settings.pickDistance,
                                zonesEnabled,
                                this._selectFilterFunc,
                                true,
                                false,
                                this._view.getViewConfiguration().multiPageView,
                                includeAnnotations
                            );
                        }.bind(this);
                    this._interactionMode === pe.InteractionMode.Mixed
                        ? ((hitResults = runHitTest(false)) && hitResults.length) || (hitResults = runHitTest(true))
                        : (hitResults = runHitTest(this._view.getViewConfiguration().isElementAnnotationsVisible()));
                    var selectedTarget = null,
                        selectableElements = null;
                    if (hitResults && !(hitResults[0] instanceof GPage)) {
                        for (var elements = [], m = 0; m < hitResults.length; ++m) elements.push(hitResults[m].element);
                        selectableElements = this._getSelectableElements(elements, true);
                    }
                    if (!selectableElements || !selectableElements.length) return null;
                    if (metaSelect && selectableElements.length > 0) {
                        var selectedIndex = null;
                        for (m = 0; m < selectableElements.length; ++m) selectableElements[m].hasFlag(GNode.Flag.Selected) && (selectedIndex = m);
                        selectedTarget = null == selectedIndex || selectedIndex + 1 >= selectableElements.length ? selectableElements[0] : selectableElements[selectedIndex + 1];
                    } else if (selectableElements.length > 0)
                        if (this._clickGoDown) {
                            var topElement = selectableElements[0];
                            if (topElement.hasFlag(GNode.Flag.Selected)) selectedTarget = topElement;
                            else if (settings.visualGroupSelect)
                                if (topElement instanceof GLayer || topElement instanceof GPage) selectedTarget = topElement;
                                else {
                                    for (var fallbackGroup = null, ancestor = topElement.getParent(); null != ancestor && !selectedTarget; ancestor = ancestor.getParent()) {
                                        if (ancestor.hasFlag(GNode.Flag.Selected)) selectedTarget = topElement;
                                        else
                                            !ancestor.acceptChildren(
                                                function (child) {
                                                    return !(child instanceof GGroup && child.hasFlag(GNode.Flag.Selected));
                                                },
                                                false,
                                                false
                                            ) && ancestor instanceof GGroup
                                                ? (selectedTarget = topElement)
                                                : ancestor instanceof GGroup && (fallbackGroup = ancestor);
                                    }
                                    !selectedTarget && fallbackGroup && (selectedTarget = fallbackGroup);
                                }
                            else
                                for (ancestor = topElement.getParent(); null != ancestor && !selectedTarget; ancestor = ancestor.getParent()) {
                                    if ((ancestor.hasFlag(GNode.Flag.Selected) && ((isRightClick || isMouseDown) && ancestor instanceof GGroup && (selectedTarget = ancestor), isMouseDown || isRightClick || (selectedTarget = topElement)), !selectedTarget))
                                        (!ancestor.acceptChildren(
                                            function (child) {
                                                return !(child instanceof GGroup && child.hasFlag(GNode.Flag.Selected));
                                            },
                                            false,
                                            false
                                        ) && (selectedTarget = topElement),
                                            !selectedTarget && !ancestor.hasFlag(GNode.Flag.Selected) && ancestor instanceof GGroup && !ancestor.getProperty("clk") && (topElement = ancestor));
                                }
                            selectedTarget || (selectedTarget = topElement);
                        } else selectedTarget = selectableElements[0];
                    return selectedTarget;
                }),
                (pe.prototype._checkSelectedUnderMouse = function (point) {
                    var metaSelect = GModifiers.modifiers.metaKey && null == this._manager.getTemporaryActiveTool(),
                        toggleSelect = GModifiers.modifiers.shiftKey && !this._shiftConstraining;
                    GGuides.options.zones;
                    if (!this._selectionDone && !metaSelect && !toggleSelect && this._editor.getSelection() && this._editor.getSelection().length) {
                        var hitResults = this._scene.hitTest(
                            point,
                            this._view.getWorldTransform(this._scene),
                            this._selectAcceptorFunc,
                            true,
                            -1,
                            0,
                            true,
                            this._selectFilterFunc,
                            true,
                            false,
                            this._view.getViewConfiguration().multiPageView,
                            this._view.getViewConfiguration().isElementAnnotationsVisible()
                        );
                        if (
                            ((hitResults && hitResults.length) ||
                                (hitResults = this._scene.hitTest(
                                    point,
                                    this._view.getWorldTransform(this._scene),
                                    this._selectAcceptorFunc,
                                    true,
                                    -1,
                                    settings.pickDistance,
                                    true,
                                    this._selectFilterFunc,
                                    true,
                                    false,
                                    this._view.getViewConfiguration().multiPageView,
                                    this._view.getViewConfiguration().isElementAnnotationsVisible()
                                )),
                            hitResults)
                        ) {
                            for (var selectedList = [], a = 0; a < hitResults.length; ++a) {
                                var s = null;
                                (s = settings.pageCollisionTransform ? hitResults[a].element : hitResults[a].element || hitResults[a]).hasFlag(GNode.Flag.Selected) &&
                                    !settings.pageCollisionTransform &&
                                    s instanceof GPage &&
                                    selectedList.push(s);
                            }
                            if (selectedList.length) return (selectedList = GNode.order(selectedList))[selectedList.length - 1];
                        }
                    }
                    return null;
                }),
                (pe.prototype._mouseRelease = function (event) {
                    function finishRelease() {
                        this._lastMouseEvent = event;
                        var hadHighlight = false;
                        if (
                            (this._elementUnderMouse &&
                                (this._elementUnderMouse.removeFlag(GNode.Flag.Highlighted), (this._elementUnderMouse = null), (hadHighlight = true)),
                            this._backgroundSelectShouldBeEnabled &&
                                ((this._backgroundSelectShouldBeEnabled = false),
                                (this._isBackgroundSelectEnabled = true),
                                (this._selectIgnoreBackgroundElements = null)),
                            this._mode == pe._Mode.Select && !this._selectionDone)
                        )
                            if (this._clickedElement) {
                                if (
                                    !this._isDistanceHelperActivatedByClick() &&
                                    ((this._clickedElement = this._getSelectableForPosition(event.client, false, event.button === GMouseEvent.BUTTON_RIGHT)),
                                    this._clickedElement instanceof GPage &&
                                        this._scene.getActivePage() === this._clickedElement &&
                                        !hadHighlight &&
                                        (this._clickedElement = null),
                                    this._clickedElement)
                                ) {
                                    var toggle = this._clickedToggle;
                                    (GModifiers.modifiers.shiftKey &&
                                        this._clickedElement instanceof GText &&
                                        this._editor.getCurrentInlineEditorNode() &&
                                        (toggle = false),
                                        this._updateSelectionWithElement(toggle, this._clickedElement, false),
                                        (this._selectionDone = true));
                                }
                            } else
                                (this._releaseOnlySelection && (this._updateSelection(this._clickedToggle, []), (this._selectionDone = true)),
                                    this._isDistanceHelperActivated() &&
                                        this._isDistanceHelperClickBehaviour() &&
                                        this._editor.getDistanceHelper().invalidate());
                        if (
                            event.button === GMouseEvent.BUTTON_LEFT &&
                            this._mode == pe._Mode.Move &&
                            this._editorMovePartInfo &&
                            this._editorMovePartInfo.editor instanceof GPathEditor &&
                            this._editorMovePartInfo.id &&
                            this._editorMovePartInfo.id.type == GPathEditor.PartType.Segment &&
                            this._editorMovePartInfo.data &&
                            this._editorMovePartInfo.data.type == GPathEditor.SegmentData.HitRes
                        ) {
                            var partEditor = this._editorMovePartInfo.editor,
                                element = partEditor.getElement();
                            this._editor.beginTransaction();
                            try {
                                var insertedPoint = element.insertHitPoint(this._editorMovePartInfo.data.hitRes);
                            } finally {
                                this._editor.commitTransaction(GLocale.get(new GLocaleKey("GSelectTool", "action.insert-path-point")));
                            }
                            insertedPoint &&
                                (!GModifiers.modifiers.shiftKey &&
                                    partEditor._parentEditor &&
                                    partEditor._parentEditor instanceof GCompoundPathEditor &&
                                    partEditor._parentEditor.updatePartSelection(false, null),
                                partEditor.updatePartSelection(GModifiers.modifiers.shiftKey, [
                                    {
                                        type: GPathEditor.PartType.Point,
                                        point: insertedPoint,
                                    },
                                ]));
                        }
                        ((this._editorMovePartInfo = null),
                            (this._moveStart = null),
                            (this._moveStartTransformed = null),
                            (this._moveCurrent = null),
                            (this._selectionDone = false),
                            this._mode != pe._Mode.Transforming && (this._updateMode(null), this.updateCursor()),
                            this._updateEditorUnderMouse(event.client),
                            this._isDistanceHelperActivatedByClick() &&
                                this._editor.getSelection() &&
                                this._editor.getSelection().length &&
                                this._updateDistanceHelper(true));
                    }
                    this._handlingDragEnd
                        ? this._handlingDragEnd.then(
                              function () {
                                  (finishRelease.call(this), (this._handlingDragEnd = null));
                              }.bind(this)
                          )
                        : finishRelease.call(this);
                }),
                (pe.prototype._updateSelectionWithElement = function (toggle, element, preserveSelected) {
                    var parents;
                    if ((element.hasFlag(GNode.Flag.Selected) || this.setEditMode(pe.EditMode.Select), toggle)) {
                        ((element.hasMixin(GNode.Container) ? element.getInternalSelectedNodes() : null) && this._editor.clearInternalSelection(element),
                            (parents = []),
                            (element.hasFlag(GNode.Flag.Selected) && preserveSelected) || parents.push(element));
                        for (var ancestor = element.getParent(); null != ancestor; ancestor = ancestor.getParent()) ancestor.hasFlag(GNode.Flag.Selected) && parents.push(ancestor);
                        this._updateSelection(true, parents);
                    } else element.hasFlag(GNode.Flag.Selected) || this._updateSelection(false, [element]);
                }),
                (pe.prototype._mouseDragStart = function (event) {
                    if (
                        ((this._lastMouseEvent = event),
                        (this._mode != pe._Mode.Select && this._mode != pe._Mode.Move && this._mode != pe._Mode.Transforming) ||
                            (this._editorMovePartInfo && this._editorMovePartInfo.editor instanceof x) ||
                            this.beginPan(),
                        this._allowDistanceHelper &&
                            this._editor.getDistanceHelper().isActivated() &&
                            this._editor.getDistanceHelper().deactivateMeasurement(),
                        this._elementUnderMouse &&
                            (this._elementUnderMouse.removeFlag(GNode.Flag.Highlighted), (this._elementUnderMouse = null)),
                        !this._styleEdManager ||
                            !this._styleEdManager.getActiveEditor() ||
                            (this._editorMovePartInfo && this._editorMovePartInfo.editor instanceof x) ||
                            this._styleEdManager.deactivateEditor(),
                        this._visualsArea && (this.invalidateArea(this._visualsArea), (this._visualsArea = null)),
                        this._mode == pe._Mode.Select &&
                            !this._editor.getCurrentInlineEditorNode() &&
                            (this._areaSelector.clearArea(), !this._selectionDone))
                    )
                        if (this._releaseOnlySelection) {
                            var hasPathLikeSelected = false;
                            if ((o = this._editor.getSelection()) && o.length)
                                for (var i = 0; i < o.length && !hasPathLikeSelected; ++i) {
                                    var r = o[i];
                                    (r instanceof GPath || r instanceof E || r instanceof B) && (hasPathLikeSelected = true);
                                }
                            !this._clickedElement ||
                            this._clickedElement instanceof GPath ||
                            this._clickedElement instanceof E ||
                            this._clickedElement instanceof B
                                ? hasPathLikeSelected ||
                                  (this._clickedElement &&
                                      (!this._clickedElement ||
                                          this._clickedElement.hasFlag(GNode.Flag.Selected) ||
                                          !(
                                              this._clickedElement instanceof GPath ||
                                              this._clickedElement instanceof E ||
                                              this._clickedElement instanceof B
                                          ))) ||
                                  this._updateSelection(this._clickedToggle, [])
                                : (this._clickedElement.hasFlag(GNode.Flag.Selected) ||
                                      hasPathLikeSelected ||
                                      this._updateSelectionWithElement(this._clickedToggle, this._clickedElement, true),
                                  this._clickedElement.hasFlag(GNode.Flag.Selected) &&
                                      (this._updateMode(pe._Mode.Move), (this._selectionDone = true)));
                        } else
                            this._clickedElement &&
                                (this._updateSelectionWithElement(this._clickedToggle, this._clickedElement, true),
                                (this._selectionDone = true),
                                this._updateMode(pe._Mode.Move));
                    if (this._mode == pe._Mode.Move) {
                        var o;
                        if (
                            ((this._moveStart = event.client),
                            (this._moveStartTransformed = this._view
                                .getViewTransform(this._view.getScene().getActivePage())
                                .mapPoint(this._moveStart)),
                            this.catchesContextMenu() || event.button === GMouseEvent.BUTTON_LEFT)
                        )
                            if (
                                ((this._dragHandling = true),
                                (this._clickToDragTimeout = setTimeout(
                                    function () {
                                        this._updateMode(pe._Mode.Moving);
                                    }.bind(this),
                                    33
                                )),
                                this._editorMovePartInfo)
                            )
                                if (
                                    (this._editorMovePartInfo.isolated && event.button === GMouseEvent.BUTTON_LEFT) ||
                                    (event.button === GMouseEvent.BUTTON_RIGHT &&
                                        this._editorMovePartInfo.data &&
                                        this._editorMovePartInfo.data.rightButton &&
                                        this._editorMovePartInfo.data.rightButton.isolated)
                                )
                                    this._editorMovePartInfo = this._editorMovePartInfo.editor.selectToolDragStartAction(
                                        this._editorMovePartInfo,
                                        event.button == GMouseEvent.BUTTON_RIGHT
                                    );
                                else if ((o = this._editor.getSelection()) && o.length)
                                    for (i = 0; i < o.length; ++i) {
                                        var a = GElementEditor.getEditor(o[i]);
                                        if (a) {
                                            var l = a.selectToolDragStartAction(this._editorMovePartInfo, event.button == GMouseEvent.BUTTON_RIGHT);
                                            if (l) {
                                                this._editorMovePartInfo = l;
                                                break;
                                            }
                                        }
                                    }
                        GModifiers.modifiers.optionKey && this.updateCursor();
                    } else if (this._mode == pe._Mode.Transforming) {
                        ((this._moveStart = event.client),
                            (this._moveStartTransformed = this._view
                                .getViewTransform(this._view.getScene().getActivePage())
                                .mapPoint(this._moveStart)));
                        var tboxEditor = GElementEditor.getEditor(this._scene);
                        tboxEditor && tboxEditor.isTransformBoxActive() && tboxEditor.startTBoxTransform(this._editorMovePartInfo);
                    } else
                        this._mode === pe._Mode.MoveGuideLine &&
                            this._view.startMoveGuideLine(this._guideLineUnderMouse.isVertical, this._guideLineUnderMouse.guideIndex);
                }),
                (pe.prototype._mouseDrag = function (event) {
                    if (
                        ((this._lastMouseEvent = event),
                        this.isPanning() && this.panView(event.client, event.clientDelta),
                        this._mode == pe._Mode.Moving || this._mode == pe._Mode.Transforming)
                    )
                        ((this._moveCurrent = event.client), this._updateSelectionTransform());
                    else if (this._mode != pe._Mode.Select || event.button == GMouseEvent.BUTTON_RIGHT || this._editor.getCurrentInlineEditorNode())
                        this._mode === pe._Mode.MoveGuideLine && this._view.moveGuideLine(event.client);
                    else {
                        if (this._areaSelector.hasSelectArea()) {
                            var paintRect = this._areaSelector.getAreaPaintRect();
                            if (this.isPanning())
                                (panMovement = this.getLastPanMovement()) &&
                                    (paintRect = this._calculateInvalidationPanAreaForRect(panMovement.inverted().mapRect(paintRect), settings.outlineWidth));
                            this.invalidateArea(paintRect);
                        }
                        if (this._areaSelector.hasAreaStarted())
                            if (GModifiers.modifiers.spaceKey) this._areaSelector.moveToPoint(event.client);
                            else {
                                var panMovement;
                                if ((panMovement = this.getLastPanMovement())) {
                                    var translation = panMovement.inverted().getTranslation();
                                    this._areaSelector.translate(translation);
                                }
                                this._areaSelector.expandToPoint(event.client);
                            }
                        else this._areaSelector.startArea(event.clientStart);
                        if (this._areaSelector.hasSelectArea()) {
                            this._processElementsUnderCollision(true);
                            paintRect = this._areaSelector.getAreaPaintRect();
                            (this.isPanning() && (paintRect = this._calculateInvalidationPanAreaForRect(paintRect)), this.invalidateArea(paintRect));
                        } else this._editor.clearHighlighted();
                    }
                }),
                (pe.prototype._mouseDragEnd = function (event) {
                    function t(t) {
                        if (this._mode == pe._Mode.Moving) {
                            var actionName;
                            this._dragHandling &&
                                setTimeout(
                                    function () {
                                        this._dragHandling = false;
                                    }.bind(this),
                                    0
                                );
                            var editorData = null;
                            this._editor.beginTransaction();
                            try {
                                this._editor.getGuides().invalidate();
                                var hasImageMaskItems = !(!this._itemsToAddToImageMask || !this._itemsToAddToImageMask.length),
                                    hasPageItems = !(!this._itemsToAddToPage || !this._itemsToAddToPage.length),
                                    isCloneDrag =
                                        (!this._editorMovePartInfo || this._editorMovePartInfo.id === L.LabelHolder.LABEL_PART_ID) &&
                                        GModifiers.modifiers.optionKey;
                                if (this._editorMovePartInfo && this._editorMovePartInfo.isolated && !isCloneDrag) {
                                    var linkedElements = [];
                                    if (
                                        this._editorMovePartInfo.id === GBoxEditor.RESIZE_HANDLE_PART_ID ||
                                        this._editorMovePartInfo.id === GBoxEditor.ROTATION_HANDLE_PART_ID
                                    ) {
                                        var selection = this._editor.getSelection();
                                        if (selection && selection.length)
                                            for (var u = 0; u < selection.length; ++u) {
                                                var d = selection[u];
                                                linkedElements = linkedElements.concat(this._editor.getLinkedElementsInSelection(d, selection));
                                            }
                                    }
                                    (this._editorMovePartInfo.editor.applyPartMove(
                                        this._editorMovePartInfo.id,
                                        this._editorMovePartInfo.data,
                                        null,
                                        linkedElements
                                    ),
                                        this._editorMovePartInfo.editor instanceof P &&
                                            (editorData = this._editorMovePartInfo.editor.getEditorData()));
                                    var objectName = this._editorMovePartInfo.editor.getObjectNameModified();
                                    (objectName || (objectName = GLocale.get(new GLocaleKey("GSelectTool", "text.element"))),
                                        (actionName = GLocale.get(new GLocaleKey("GSelectTool", "action.modify-element")).replace("%element", objectName)));
                                } else
                                    (this._editor.applySelectionTransform(isCloneDrag, true, isCloneDrag && (hasImageMaskItems || hasPageItems), true),
                                        (actionName = isCloneDrag
                                            ? GLocale.get(new GLocaleKey("GSelectTool", "action.transform-clone-selection"))
                                            : GLocale.get(new GLocaleKey("GSelectTool", "action.transform-selection"))));
                                if (hasImageMaskItems) {
                                    var imageMaskItems = this._itemsToAddToImageMask,
                                        targets = imageMaskItems.map(function (item) {
                                            return item.target;
                                        });
                                    util.uniqueObj(targets);
                                    var sources = targets.map(function (target) {
                                        return imageMaskItems
                                            .filter(function (entry) {
                                                return entry.target === target;
                                            })
                                            .map(function (entry) {
                                                return {
                                                    src: entry.source,
                                                    box: entry.sourceBox,
                                                };
                                            });
                                    });
                                    false;
                                    for (u = 0; u < sources.length; u++) {
                                        var v = sources[u],
                                            b = targets[u];
                                        v.forEach(function (entry) {
                                            var sourceElement = entry.src;
                                            (sourceElement.getParent().removeChild(sourceElement), b instanceof GImageGrid ? b.addImage(sourceElement, entry.box) : b.appendChild(sourceElement));
                                        });
                                    }
                                    (this._editor.updateSelection(false, targets), (actionName = "Create image mask"), (this._itemsToAddToImageMask = null));
                                } else if (hasPageItems) {
                                    ((imageMaskItems = this._itemsToAddToPage),
                                        (targets = imageMaskItems.map(function (item) {
                                            return item.target;
                                        })));
                                    util.uniqueObj(targets);
                                    sources = targets.map(function (target) {
                                        return imageMaskItems
                                            .filter(function (entry) {
                                                return entry.target === target;
                                            })
                                            .map(function (entry) {
                                                return entry.source;
                                            });
                                    });
                                    var isPageSwitch = false;
                                    (imageMaskItems[0].source instanceof GPage && (isPageSwitch = true),
                                        this._scene.startBlockReferenceChanges(),
                                        isPageSwitch
                                            ? ((actionName += " & Switch Pages"),
                                              MOVE_MASTER.SWITCH_ORDER && this._editor.clearSelection(),
                                              this._scene.beginUpdate())
                                            : (actionName += " & Move to Page"));
                                    for (u = 0; u < sources.length; u++) {
                                        var E = sources[u];
                                        b = targets[u];
                                        (E.forEach(
                                            function (source) {
                                                var oldIndex,
                                                    newIndex,
                                                    parent = source.getParent();
                                                if (b.getScene() && parent !== b)
                                                    if (
                                                        (isPageSwitch && ((oldIndex = this._scene.getIndexOfChild(source)), (newIndex = this._scene.getIndexOfChild(b))),
                                                        isPageSwitch)
                                                    )
                                                        (source.getParent().removeChild(source),
                                                            MOVE_MASTER.SWITCH_ORDER &&
                                                                (b._requestInvalidation(),
                                                                oldIndex < newIndex
                                                                    ? b.getNext()
                                                                        ? this._scene.insertChild(source, b.getNext())
                                                                        : this._scene.appendChild(source)
                                                                    : this._scene.insertChild(source, b),
                                                                b._requestInvalidation()));
                                                    else {
                                                        if (source instanceof GPage && b instanceof GPage)
                                                            return void console.warn("tried to insert page into page, aborting");
                                                        (source.getParent().removeChild(source), b.appendChild(source));
                                                        var sourcePage = GEditor.getElementPage(parent),
                                                            targetPage = GEditor.getElementPage(b);
                                                        if (sourcePage && targetPage && source.hasMixin(GElement.Transform)) {
                                                            var sourcePos = sourcePage.getPosition(true),
                                                                targetPos = targetPage.getPosition(true),
                                                                offset = sourcePos.subtract(targetPos);
                                                            source.transform(new GTransform(1, 0, 0, 1, offset.getX(), offset.getY()), true);
                                                        }
                                                    }
                                            }.bind(this)
                                        ),
                                            b.removeFlag(GNode.Flag.Highlighted));
                                    }
                                    (isPageSwitch
                                        ? (this._scene.endUpdate(),
                                          this._editor.updateSelection(
                                              false,
                                              imageMaskItems.map(function (item) {
                                                  return item.source;
                                              })
                                          ))
                                        : MOVE_MASTER.SWITCH_ORDER
                                          ? this._scene.setActivePage(targets[0])
                                          : this._editor.updateSelection(
                                                false,
                                                imageMaskItems.map(function (item) {
                                                    return item.source;
                                                })
                                            ),
                                        this._scene.endBlockReferenceChanges(),
                                        (this._itemsToAddToPage = null));
                                }
                            } finally {
                                (this.updateInlineHint(null), this._editor.commitTransaction(actionName, editorData));
                            }
                            settings.pagesCollisionTransform &&
                                this._editor.updateByMousePosition(
                                    event.client,
                                    this._view.getWorldTransform(this._scene),
                                    false,
                                    this._view.getViewConfiguration()
                                );
                        } else if (this._mode == pe._Mode.Select && event.button != GMouseEvent.BUTTON_RIGHT) {
                            if ((this._editor.clearHighlighted(), this._areaSelector.hasSelectArea())) {
                                (this._isDistanceHelperActivatedByClick() || this._processElementsUnderCollision(false),
                                    (this._selectionDone = true));
                                var paintRect = this._areaSelector.getAreaPaintRect();
                                (this._areaSelector.clearArea(), this.invalidateArea(paintRect));
                            }
                        } else if (this._mode == pe._Mode.Transforming) {
                            var tboxEditor = GElementEditor.getEditor(this._scene);
                            (tboxEditor && tboxEditor.isTransformBoxActive() && (tboxEditor.applyTBoxTransform(), this.invalidateArea()), this.updateInlineHint(null));
                        } else this._mode === pe._Mode.MoveGuideLine && this._view.finishMoveGuideLine();
                        t && t();
                    }
                    ((this._lastMouseEvent = event),
                        this._clickToDragTimeout && clearTimeout(this._clickToDragTimeout),
                        (this._clickToDragTimeout = null),
                        this.isPanning()
                            ? (this._handlingDragEnd = new Promise(
                                  function (resolve) {
                                      this.endPan(
                                          function () {
                                              t.call(this, resolve);
                                          }.bind(this)
                                      );
                                  }.bind(this)
                              ))
                            : t.call(this));
                }),
                (pe.prototype._processElementsUnderCollision = function (highlightOnly) {
                    var elements,
                        collisionArea = this._areaSelector.getCollisionArea(this._view.getViewTransform(this._view.getScene())),
                        collisionFlags = this._getCollisionFlags(),
                        useSelection = false;
                    if (collisionFlags) {
                        elements = this._scene.getCollisions(
                            collisionArea,
                            collisionFlags,
                            null,
                            this._selectFilterFunc,
                            function (element) {
                                return !(element instanceof GShape);
                            },
                            this._view.getViewConfiguration().multiPageView,
                            this._view.getViewConfiguration().isElementAnnotationsVisible()
                        );
                    } else ((elements = this._editor.getSelection()), (useSelection = true));
                    var selectableElements = this._getSelectableElements(elements);
                    (!this._isBackgroundSelectEnabled &&
                        this._selectIgnoreBackgroundElements &&
                        this._selectIgnoreBackgroundElements.length > 0 &&
                        (selectableElements = selectableElements.filter(
                            function (element) {
                                return !this._selectIgnoreBackgroundElements.some(function (ignored) {
                                    return util.equals(element, ignored);
                                });
                            }.bind(this)
                        )),
                        (selectableElements = selectableElements.filter(this._selectAcceptorFunc)),
                        highlightOnly
                            ? this._editor.highlightSelectablesUnderCollision(
                                  GModifiers.modifiers.shiftKey,
                                  selectableElements,
                                  collisionArea,
                                  this._view.getViewConfiguration().multiPageView,
                                  useSelection
                              )
                            : this._editor.updateSelectionUnderCollision(
                                  GModifiers.modifiers.shiftKey,
                                  selectableElements,
                                  collisionArea,
                                  this._view.getViewConfiguration().multiPageView,
                                  useSelection
                              ));
                }),
                (pe.prototype._getCollisionFlags = function () {
                    var flags = GElement.CollisionFlag.GeometryBBox;
                    return (
                        ((!GModifiers.modifiers.optionKey && !settings.invertSelectionMode) || (GModifiers.modifiers.optionKey && settings.invertSelectionMode)) &&
                            (flags |= GElement.CollisionFlag.Partial),
                        flags
                    );
                }),
                (pe.prototype._mouseDblClick = function (event) {
                    this._lastMouseEvent = event;
                    var isSlowDblClick = null != this._mDownTime1 && null != this._mDownTime2 && this._mDownTime2 - this._mDownTime1 > pe.DBLCLICKTM;
                    if (((this._mDownTime1 = null), (this._mDownTime2 = null), isSlowDblClick)) return true;
                    if (this._editor.getCurrentInlineEditorNode()) return true;
                    var handled = false;
                    if (
                        (this._clickedElement && (handled = this._editor.openInlineEditor(this._clickedElement, this._view, event.client)),
                        handled || settings.selectDoubleClickBehavior === pe._DblClick.Disabled)
                    )
                        handled && this._handleInlineEditingStart();
                    else if (this._editorUnderMouseInfo && this._editorUnderMouseInfo.editor.hasFlag(EditorBase.Flag.Selected)) {
                        if (this._editorUnderMouseInfo.editor.canHandleDblClick()) {
                            this._editor.beginTransaction();
                            try {
                                handled = this._editorUnderMouseInfo.editor.handleDblClick(
                                    this._editorUnderMouseInfo.id,
                                    this._editorUnderMouseInfo.data
                                );
                            } finally {
                                ((objectName = this._editorUnderMouseInfo.editor.getObjectNameModified()) ||
                                    (objectName = GLocale.get(new GLocaleKey("GSelectTool", "text.element"))),
                                    this._editor.commitTransaction(
                                        GLocale.get(new GLocaleKey("GSelectTool", "action.modify-element")).replace("%element", objectName)
                                    ));
                            }
                        }
                    } else if (this._clickedElement) {
                        var editor = GElementEditor.getEditor(this._clickedElement);
                        if (editor && editor.canHandleDblClick()) {
                            this._editor.beginTransaction();
                            try {
                                handled = editor.handleDblClick();
                            } finally {
                                var objectName;
                                ((objectName = editor.getObjectNameModified()) || (objectName = GLocale.get(new GLocaleKey("GSelectTool", "text.element"))),
                                    this._editor.commitTransaction(
                                        GLocale.get(new GLocaleKey("GSelectTool", "action.modify-element")).replace("%element", objectName)
                                    ));
                            }
                        }
                    }
                    return handled;
                }),
                (pe.prototype.catchesContextMenu = function (e) {
                    return (
                        !!this._isDistanceHelperActivatedByClick() ||
                        this._dragHandling ||
                        GUITool.prototype.catchesContextMenu.call(this) ||
                        (this._editorUnderMouseInfo && this._editorUnderMouseInfo.id != GImageEditor.IMAGEINTERNAL_PART_ID)
                    );
                }),
                (pe.prototype.isCropContext = function () {
                    return this._editorUnderMouseInfo && this._editorUnderMouseInfo.id == GImageEditor.IMAGEINTERNAL_PART_ID;
                }),
                (pe.prototype._handleInlineEditingStart = function () {
                    for (var ancestor = this._clickedElement.getParent(), selectionRemaining = this._editor.getSelection(), chain = [this._clickedElement]; ancestor && selectionRemaining; ) {
                        if (((selectionRemaining = selectionRemaining.concat()), ancestor instanceof G || ancestor instanceof V))
                            for (var n = 0; n < selectionRemaining.length; n++)
                                if (selectionRemaining[n] === ancestor) {
                                    (chain.push(ancestor), selectionRemaining.splice(n, 1));
                                    break;
                                }
                        ancestor = ancestor.getParent();
                    }
                    this._updateSelection(false, chain);
                }),
                (pe.prototype._keyDown = function (event) {
                    if ((GUITool.prototype._keyDown.call(this, event), !this._editor.getCurrentInlineEditorNode())) {
                        if (
                            (event.key !== GKey.Constant.X || GModifiers.modifiers.metaKey || this._disableBackgroundSelect(),
                            event.key === GKey.Constant.UP || event.key === GKey.Constant.DOWN || event.key === GKey.Constant.LEFT || event.key === GKey.Constant.RIGHT)
                        ) {
                            if (GModifiers.modifiers.spaceKey) return;
                            if (this._editor.hasSelection() && (!this._mode || this._mode === pe._Mode.Moving)) {
                                this._mode !== pe._Mode.Moving && this._updateMode(pe._Mode.Moving);
                                var step = GModifiers.modifiers.shiftKey ? settings.cursorDistanceBig : settings.cursorDistanceSmall,
                                    dx = 0,
                                    dy = 0;
                                switch (event.key) {
                                    case GKey.Constant.UP:
                                        GModifiers.modifiers.plusKey || GModifiers.modifiers.minusKey
                                            ? (this._editorMovePartInfo ||
                                                  (this._editorMovePartInfo = new EditorBase.PartInfo(this._editor, GBoxEditor.RESIZE_HANDLE_PART_ID, {
                                                      side: GRect.Side.TOP_CENTER,
                                                  })),
                                              (dy = GModifiers.modifiers.plusKey ? dy - step : dy + step))
                                            : (dy -= step);
                                        break;
                                    case GKey.Constant.DOWN:
                                        GModifiers.modifiers.plusKey || GModifiers.modifiers.minusKey
                                            ? (this._editorMovePartInfo ||
                                                  (this._editorMovePartInfo = new EditorBase.PartInfo(this._editor, GBoxEditor.RESIZE_HANDLE_PART_ID, {
                                                      side: GRect.Side.BOTTOM_CENTER,
                                                  })),
                                              (dy = GModifiers.modifiers.plusKey ? dy + step : dy - step))
                                            : (dy += step);
                                        break;
                                    case GKey.Constant.LEFT:
                                        GModifiers.modifiers.plusKey || GModifiers.modifiers.minusKey
                                            ? (this._editorMovePartInfo ||
                                                  (this._editorMovePartInfo = new EditorBase.PartInfo(this._editor, GBoxEditor.RESIZE_HANDLE_PART_ID, {
                                                      side: GRect.Side.LEFT_CENTER,
                                                  })),
                                              (dx = GModifiers.modifiers.plusKey ? dx - step : dx + step))
                                            : (dx -= step);
                                        break;
                                    case GKey.Constant.RIGHT:
                                        GModifiers.modifiers.plusKey || GModifiers.modifiers.minusKey
                                            ? (this._editorMovePartInfo ||
                                                  (this._editorMovePartInfo = new EditorBase.PartInfo(this._editor, GBoxEditor.RESIZE_HANDLE_PART_ID, {
                                                      side: GRect.Side.RIGHT_CENTER,
                                                  })),
                                              (dx = GModifiers.modifiers.plusKey ? dx + step : dx - step))
                                            : (dx += step);
                                }
                                ((this._keyDelta = this._keyDelta ? this._keyDelta.add(new GPoint(dx, dy)) : new GPoint(dx, dy)),
                                    (GModifiers.modifiers.plusKey || GModifiers.modifiers.minusKey) &&
                                    this._editorMovePartInfo &&
                                    this._editorMovePartInfo.id === GBoxEditor.RESIZE_HANDLE_PART_ID
                                        ? this._editor.resizeSelection(
                                              this._editorMovePartInfo.data.side,
                                              this._keyDelta,
                                              this._view.getViewConfiguration().multiPageView
                                          )
                                        : this._editor.moveSelection(
                                              this._keyDelta,
                                              false,
                                              null,
                                              null,
                                              null,
                                              null,
                                              this._view.getViewConfiguration().multiPageView,
                                              GModifiers.modifiers.metaKey
                                          ),
                                    GModifiers.modifiers.optionKey &&
                                        this._allowDistanceHelper &&
                                        this._editor.getDistanceHelper().isActivated() &&
                                        this._editor.getSelection() &&
                                        this._editor.getSelection().length &&
                                        this._updateDistanceHelper());
                            }
                        } else if (
                            event.key === GKey.Constant.ENTER &&
                            this._editor.hasSelection() &&
                            !this._view.getViewConfiguration().isElementAnnotationsVisible() &&
                            (!this._mode || this._mode === pe._Mode.Select)
                        ) {
                            if (this._editor.getCurrentInlineEditorNode()) return;
                            var selection = this._editor.getSelection();
                            if (selection && selection.length) {
                                for (var opened = false, s = 0; s < selection.length && !opened; ++s) {
                                    var h = GElementEditor.getEditor(selection[s]);
                                    h &&
                                        h.canInlineEdit() &&
                                        (event.preventDefault(), event.stopPropagation(), (opened = this._editor.openInlineEditor(selection[s], this._view)));
                                }
                                opened || this._manager.activateSubSelect();
                            }
                        }
                        if (this._editor && this._editor.hasSelection()) {
                            var textElements = this._editor.getSelection().filter(function (element) {
                                return element instanceof GText;
                            });
                            textElements.length &&
                                textElements.forEach(
                                    function (textElement) {
                                        var editor = GElementEditor.getEditor(textElement);
                                        editor.canHandleKeyEvents() && editor.handleKeyEvent(event);
                                    }.bind(this)
                                );
                        }
                    }
                }),
                (pe.prototype._keyRelease = function (event) {
                    this._editor.getCurrentInlineEditorNode() ||
                        (event.key === GKey.Constant.X && this._enableBackgroundSelect(),
                        (event.key !== GKey.Constant.UP && event.key !== GKey.Constant.DOWN && event.key !== GKey.Constant.LEFT && event.key !== GKey.Constant.RIGHT) ||
                            (this._applyKeyTransformation(),
                            GModifiers.modifiers.optionKey &&
                                this._allowDistanceHelper &&
                                this._editor.getDistanceHelper().isActivated() &&
                                this._editor.getSelection() &&
                                this._editor.getSelection().length &&
                                this._updateDistanceHelper()));
                }),
                (pe.prototype._modifiersChanged = function (event) {
                    var tboxEditor = GElementEditor.getEditor(this._scene);
                    if (
                        (tboxEditor && tboxEditor.isTransformBoxActive() && this._mode != pe._Mode.MoveGuideLine
                            ? this._mode != pe._Mode.Transforming && this._updateMode(pe._Mode.Transforming)
                            : this._mode == pe._Mode.Transforming && this._updateMode(null),
                        this._keyDelta && (event.changed.metaKey || event.changed.tabKey))
                    )
                        this._applyKeyTransformation();
                    else if (
                        !(event.changed.shiftKey || event.changed.optionKey || event.changed.metaKey) ||
                        (this._mode !== pe._Mode.Moving && this._mode != pe._Mode.Transforming)
                    )
                        if (event.changed.escapeKey && GModifiers.modifiers.escapeKey) {
                            this._editor.closeInlineEditor() ? this._view.focus() : this._manager.notifyJobDone(this);
                        } else
                            (event.changed.shiftKey || event.changed.optionKey) &&
                                this._mode == pe._Mode.Select &&
                                event.button != GMouseEvent.BUTTON_RIGHT &&
                                !this._editor.getCurrentInlineEditorNode() &&
                                this._areaSelector.hasSelectArea() &&
                                (this._processElementsUnderCollision(true), this.invalidateArea(this._areaSelector.getAreaPaintRect()));
                    else
                        (event.changed.shiftKey && GModifiers.modifiers.shiftKey && (this._shiftConstraining = true),
                            this._updateSelectionTransform(),
                            event.changed.optionKey && this._mode === pe._Mode.Moving && this.updateCursor());
                    (this._allowDistanceHelper &&
                        event.changed.optionKey &&
                        (GModifiers.modifiers.optionKey && null == this._mode
                            ? this._editor.activateDistanceHelper(GKey.Constant.OPTION) &&
                              this._lastMouseEvent &&
                              this._updateEditorUnderMouse(this._lastMouseEvent.client)
                            : GModifiers.modifiers.optionKey || this._editor.getDistanceHelper().deactivateMeasurement()),
                        event.changed.shiftKey &&
                            (!GModifiers.modifiers.shiftKey ||
                                (GModifiers.modifiers.shiftKey && this._mode !== pe._Mode.Moving && this._mode !== pe._Mode.Transforming)) &&
                            (this._shiftConstraining = false),
                        event.changed.metaKey &&
                            this._lastMouseEvent &&
                            (this._editor.updateByMousePosition(
                                this._lastMouseEvent.client,
                                this._view.getWorldTransform(this._scene),
                                true,
                                this._view.getViewConfiguration()
                            ),
                            this._updateEditorUnderMouse(this._lastMouseEvent.client)));
                }),
                (pe.prototype._updateSelection = function (toggle, elements) {
                    (this.setEditMode(pe.EditMode.Select), this._editor.updateSelection(toggle, elements), (this._elementMeasurementsToggle = false));
                }),
                (pe.prototype._getAllHitTestedElems = function (point) {
                    var acceptFn = function (candidate) {
                            return !(candidate instanceof G || candidate instanceof GLayer) && this._selectAcceptor(candidate);
                        }.bind(this),
                        worldTransform = this._view.getWorldTransform(this._scene),
                        viewConfig = this._view.getViewConfiguration(),
                        annotationsVisible = viewConfig.isElementAnnotationsVisible(),
                        hitResults = this._scene.hitTest(point, worldTransform, acceptFn, true, -1, 0, false, this._selectFilterFunc, true, true, viewConfig.multiPageView, annotationsVisible);
                    (hitResults && hitResults.length) ||
                        (hitResults = this._scene.hitTest(point, worldTransform, acceptFn, true, -1, settings.pickDistance, false, this._selectFilterFunc, true, true, viewConfig.multiPageView, annotationsVisible));
                    var elements = [];
                    return (
                        hitResults &&
                            hitResults.length &&
                            (elements = hitResults.map(
                                function (hit) {
                                    return this._getSelectableElement(hit.element, true);
                                }.bind(this)
                            )),
                        elements
                    );
                }),
                (pe.prototype._getTopMostHit = function (event, useAcceptor, includeAnnotations) {
                    var acceptFn;
                    acceptFn = useAcceptor
                        ? this._selectAcceptorFunc
                        : function (candidate) {
                              return !(candidate instanceof G) && this._selectAcceptor(candidate);
                          }.bind(this);
                    var hitResults = this._scene.hitTest(
                        event.client,
                        this._view.getWorldTransform(this._scene),
                        acceptFn,
                        !!includeAnnotations,
                        -1,
                        0,
                        false,
                        this._selectFilterFunc,
                        true,
                        !!includeAnnotations,
                        this._view.getViewConfiguration().multiPageView,
                        this._view.getViewConfiguration().isElementAnnotationsVisible()
                    );
                    (hitResults && hitResults.length) ||
                        (hitResults = this._scene.hitTest(
                            event.client,
                            this._view.getWorldTransform(this._scene),
                            acceptFn,
                            !!includeAnnotations,
                            -1,
                            settings.pickDistance,
                            false,
                            this._selectFilterFunc,
                            true,
                            !!includeAnnotations,
                            this._view.getViewConfiguration().multiPageView,
                            this._view.getViewConfiguration().isElementAnnotationsVisible()
                        ));
                    var result = null;
                    if (hitResults && hitResults.length) for (var a = 0; a < hitResults.length && !result; ++a) result = this._getSelectableElement(hitResults[a].element, true);
                    return result;
                }),
                (pe.prototype._applyKeyTransformation = function () {
                    this._keyDelta &&
                        (this._editorMovePartInfo && this._editorMovePartInfo.id === GBoxEditor.RESIZE_HANDLE_PART_ID
                            ? (this._editor.applyResizeSelection(this._editorMovePartInfo.id, this._editorMovePartInfo.data),
                              (this._editorMovePartInfo = null))
                            : this._editor.applySelectionTransform(false, false, false, true),
                        (this._keyDelta = null),
                        this._updateMode(null));
                }),
                (pe.prototype._openTransformBox = function () {
                    var tboxEditor = GElementEditor.openEditor(this._scene);
                    return (
                        !(!tboxEditor || tboxEditor.isTransformBoxActive() || this._editor.getCurrentInlineEditorNode()) &&
                        (tboxEditor.setTransformBoxActive(true),
                        this._updateMode(pe._Mode.Transforming),
                        this.invalidateArea(),
                        this.updateCursor(),
                        true)
                    );
                }),
                (pe.prototype._closeTransformBox = function () {
                    var tboxEditor = GElementEditor.getEditor(this._scene);
                    return tboxEditor && tboxEditor.isTransformBoxActive()
                        ? (tboxEditor.setTransformBoxActive(false), this._updateMode(null), this.invalidateArea(), this.updateCursor(), true)
                        : (this._updateMode(null), this.invalidateArea(), this.updateCursor(), false);
                }),
                (pe.prototype._updateSelectionTransform = function () {
                    if (this._mode == pe._Mode.Moving) {
                        var currentPoint = this._moveCurrent;
                        if (!currentPoint) return;
                        if (this._editorMovePartInfo && this._editorMovePartInfo.isolated) {
                            var selection = this._editor.getSelection();
                            if (
                                this._editorMovePartInfo.id === GBoxEditor.RESIZE_HANDLE_PART_ID &&
                                selection &&
                                this._editorMovePartInfo.editor instanceof GElementEditor
                            ) {
                                selection = (selection = []).concat(this._editor.getSelection());
                                for (var targetElement = this._editorMovePartInfo.editor.getElement(), r = 0; r < selection.length && targetElement != selection[r]; ++r);
                                r < selection.length && targetElement == selection[r] && (selection = selection.splice(r, 1));
                            }
                            var preserveAspect = GModifiers.modifiers.shiftKey;
                            if (
                                !preserveAspect &&
                                settings.preserveAspectRatio &&
                                (this._editor.getSelection().length > 1 ||
                                    !(this._editor.getSelection()[0] instanceof GText) ||
                                    settings.allowTextRatioPreservation)
                            ) {
                                var cornerSides = [GRect.Side.TOP_LEFT, GRect.Side.TOP_RIGHT, GRect.Side.BOTTOM_LEFT, GRect.Side.BOTTOM_RIGHT];
                                preserveAspect = !!this._editorMovePartInfo.data && -1 !== cornerSides.indexOf(this._editorMovePartInfo.data.side);
                            }
                            (this._editor.getGuides().useExclusions(this._editor.getAlignExclusions(false, selection)),
                                this._editor.getGuides().beginMap(this._editor.getMappingScopes()));
                            var resizeResult = this._editorMovePartInfo.editor.movePart(
                                this._editorMovePartInfo.id,
                                this._editorMovePartInfo.data,
                                currentPoint,
                                this._view.getViewTransform(this._view.getScene().getActivePage()),
                                this._editor.getGuides(),
                                preserveAspect,
                                GModifiers.modifiers.optionKey,
                                this._view.getViewConfiguration().multiPageView
                            );
                            (this._editor.getGuides().finishMap(),
                                this._editor.hasEventListeners(GEditor.EdGeometryChangeEvent) &&
                                    this._editor.trigger(new GEditor.EdGeometryChangeEvent()),
                                this._updateResizeHint(resizeResult));
                        } else {
                            if (GModifiers.modifiers.shiftKey) {
                                var moveStart = this._moveStart;
                                ((currentPoint =
                                    this._editorMovePartInfo &&
                                    ((this._editorMovePartInfo.editor instanceof GPathEditor &&
                                        this._editorMovePartInfo.id.type == GPathEditor.PartType.Point) ||
                                        (this._editorMovePartInfo.editor instanceof Y &&
                                            (this._editorMovePartInfo.id.type == Y.PartType.Point ||
                                                this._editorMovePartInfo.id.type == Y.PartType.Anchor)))
                                        ? this._editorMovePartInfo.editor.constrainPosition(
                                              currentPoint,
                                              this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                              this._editorMovePartInfo.id.point
                                          )
                                        : GEditor.convertToConstrain(moveStart.getX(), moveStart.getY(), currentPoint.getX(), currentPoint.getY(), settings.cursorConstraint)),
                                    (this._shiftConstraining = true));
                            }
                            var viewPoint = this._view.getViewTransform(this._view.getScene()).mapPoint(currentPoint);
                            currentPoint = this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(currentPoint);
                            var moveDelta = null,
                                tooltipPoint = null;
                            if (
                                this._editorMovePartInfo &&
                                ((this._editorMovePartInfo.editor instanceof GPathEditor &&
                                    this._editorMovePartInfo.id &&
                                    (this._editorMovePartInfo.id.type == GPathEditor.PartType.Point ||
                                        this._editorMovePartInfo.id.type == GPathEditor.PartType.Segment)) ||
                                    (this._editorMovePartInfo.editor instanceof Y &&
                                        this._editorMovePartInfo.id &&
                                        (this._editorMovePartInfo.id.type == Y.PartType.Point ||
                                            this._editorMovePartInfo.id.type == Y.PartType.Anchor ||
                                            this._editorMovePartInfo.id.type == Y.PartType.Segment)))
                            ) {
                                if (!this._shiftConstraining && !this._view.getViewConfiguration().isElementAnnotationsVisible()) {
                                    if ((selection = this._editor.getSelection())) {
                                        selection = (selection = []).concat(this._editor.getSelection());
                                        targetElement = this._editorMovePartInfo.editor.getElement();
                                        this._editorMovePartInfo.data &&
                                            this._editorMovePartInfo.data.ownerEditor &&
                                            (targetElement = this._editorMovePartInfo.data.ownerEditor.getElement());
                                        for (r = 0; r < selection.length && targetElement != selection[r]; ++r);
                                        r < selection.length && targetElement == selection[r] && selection.splice(r, 1);
                                    }
                                    if (
                                        (this._editor.getGuides().useExclusions(this._editor.getAlignExclusions(false, selection)),
                                        this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                                        (this._editorMovePartInfo.editor instanceof GPathEditor &&
                                            this._editorMovePartInfo.id.type == GPathEditor.PartType.Segment) ||
                                            (this._editorMovePartInfo.editor instanceof Y &&
                                                this._editorMovePartInfo.id.type == Y.PartType.Segment))
                                    ) {
                                        var anchorLeft = this._editorMovePartInfo.editor.getPointCoord(this._editorMovePartInfo.id.apLeft),
                                            anchorRight = this._editorMovePartInfo.editor.getPointCoord(this._editorMovePartInfo.id.apRight),
                                            segmentRect = GRect.fromPoints(anchorLeft, anchorRight);
                                        if (segmentRect) {
                                            moveDelta = currentPoint.subtract(this._moveStartTransformed);
                                            var translatedRect = segmentRect.translated(moveDelta.getX(), moveDelta.getY());
                                            translatedRect = this._editor.getGuides().mapRect(translatedRect);
                                            var refCorner = segmentRect.getSide(GRect.Side.TOP_LEFT);
                                            moveDelta = translatedRect.getSide(GRect.Side.TOP_LEFT).subtract(refCorner);
                                        }
                                    } else
                                        currentPoint = this._editor
                                            .getGuides()
                                            .mapPoint(
                                                currentPoint,
                                                this._editor.hasSelectionDetail() ||
                                                    (this._editorMovePartInfo.editor instanceof GPathEditor &&
                                                        this._editorMovePartInfo.editor.getElement().isLine() &&
                                                        settings.simpleLineMode)
                                                    ? M.DetailMap.Mode.DetailOnFilterOn
                                                    : M.DetailMap.Mode.DetailOffFilterOn
                                            );
                                    this._editor.getGuides().finishMap();
                                }
                                if (
                                    ((moveDelta = null !== moveDelta ? moveDelta : currentPoint.subtract(this._moveStartTransformed)),
                                    (this._editorMovePartInfo.editor instanceof GPathEditor &&
                                        this._editorMovePartInfo.id.type == GPathEditor.PartType.Point) ||
                                        (this._editorMovePartInfo.editor instanceof Y &&
                                            (this._editorMovePartInfo.id.type == Y.PartType.Point ||
                                                this._editorMovePartInfo.id.type == Y.PartType.Anchor)))
                                ) {
                                    var pointCoord = this._editorMovePartInfo.editor.getPointCoord(this._editorMovePartInfo.id.point);
                                    moveDelta = currentPoint.subtract(pointCoord);
                                }
                                (this._editor.moveSelection(
                                    moveDelta,
                                    false,
                                    this._editorMovePartInfo ? this._editorMovePartInfo.id : null,
                                    this._editorMovePartInfo ? this._editorMovePartInfo.data : null,
                                    null,
                                    null,
                                    this._view.getViewConfiguration().multiPageView,
                                    GModifiers.modifiers.metaKey
                                ),
                                    (tooltipPoint = currentPoint));
                            } else
                                moveDelta = this._editor.moveSelection(
                                    currentPoint.subtract(this._moveStartTransformed),
                                    true,
                                    this._editorMovePartInfo ? this._editorMovePartInfo.id : null,
                                    this._editorMovePartInfo ? this._editorMovePartInfo.data : null,
                                    this._moveStartTransformed,
                                    GModifiers.modifiers.optionKey,
                                    this._view.getViewConfiguration().multiPageView,
                                    GModifiers.modifiers.metaKey
                                );
                            if (settings.showTooltips && (settings.coordinatesTooltip || settings.bboxPositionTooltip)) {
                                if (
                                    settings.coordinatesTooltip &&
                                    this._editorMovePartInfo &&
                                    ((this._editorMovePartInfo.editor instanceof GPathEditor &&
                                        this._editorMovePartInfo.id.type == GPathEditor.PartType.Segment) ||
                                        (this._editorMovePartInfo.editor instanceof Y &&
                                            this._editorMovePartInfo.id.type == Y.PartType.Segment))
                                ) {
                                    ((anchorLeft = this._editorMovePartInfo.editor.getPointCoord(this._editorMovePartInfo.id.apLeft)),
                                        (anchorRight = this._editorMovePartInfo.editor.getPointCoord(this._editorMovePartInfo.id.apRight)));
                                    tooltipPoint = anchorLeft.getX() < anchorRight.getX() || (anchorLeft.getX() == anchorRight.getX() && anchorLeft.getY() < anchorRight.getY()) ? anchorLeft.add(moveDelta) : anchorRight.add(moveDelta);
                                } else if (settings.bboxPositionTooltip) {
                                    if (!tooltipPoint) {
                                        var individualSelection = this._editor.getIndividualSelection();
                                        if (individualSelection) {
                                            var groupBBox = GEditor.getGroupGeometryBBox(individualSelection, this._view.getViewConfiguration().multiPageView);
                                            if (groupBBox)
                                                ((refCorner = (refCorner = groupBBox.getSide(GRect.Side.TOP_LEFT)).add(moveDelta)),
                                                    this._view.getViewConfiguration().multiPageView &&
                                                        (refCorner = refCorner.subtract(this._scene.getActivePage().getPosition(true))),
                                                    (tooltipPoint = refCorner));
                                        }
                                    }
                                } else tooltipPoint = null;
                                if (tooltipPoint) {
                                    var tooltipX = this._scene.pointToString(tooltipPoint.getX(), settings.tooltipDecimalPlaces),
                                        tooltipY = this._scene.pointToString(tooltipPoint.getY(), settings.tooltipDecimalPlaces);
                                    this.updateInlineHint(tooltipX + ", " + tooltipY, tooltipPoint, GRect.Side.BOTTOM_RIGHT);
                                }
                            }
                        }
                        if (
                            (!this._editorMovePartInfo ||
                                (this._editorMovePartInfo && this._editorMovePartInfo.id === L.LabelHolder.LABEL_PART_ID)) &&
                            this._editor.getSelection() &&
                            this._editor.getSelection().length
                        ) {
                            if (this._view.getViewConfiguration().multiPageView && viewPoint) {
                                var testRect = new GRect(viewPoint.getX(), viewPoint.getY(), 0, 0),
                                    candidatePages = this._scene.retrieveChildrenInPaintBBox(testRect, QuadTree.RETRIEVE_MODE_INTERSECT).filter(function (child) {
                                        var childPos = child.getPosition(true);
                                        return child.getGeometryBBox().translated(childPos.getX(), childPos.getY()).containsPoint(viewPoint);
                                    });
                                if (candidatePages.indexOf(this._scene.getActivePage()) < 0) {
                                    (candidatePages.sort(function (pageA, pageB) {
                                        return pageB.getElementIndex() - pageA.getElementIndex();
                                    }),
                                        candidatePages.length && (candidatePages = [candidatePages[0]]),
                                        (this._itemsToAddToPage = this._gatherItemsForAdd(
                                            function (e) {
                                                return true;
                                            },
                                            function (element) {
                                                return element instanceof GPage;
                                            },
                                            function (visit) {
                                                for (var t = 0; t < candidatePages.length; t++) visit(candidatePages[t]);
                                            },
                                            viewPoint,
                                            GPage
                                        )));
                                    var nonPageItems = this._itemsToAddToPage.filter(function (item) {
                                        return !(item.source instanceof GPage);
                                    });
                                    nonPageItems.length && (this._itemsToAddToPage = nonPageItems);
                                }
                            }
                            ((this._itemsToAddToImageMask = []),
                                (this._itemsToAddToPage && this._itemsToAddToPage.length) ||
                                    (this._itemsToAddToImageMask = this._gatherItemsForAdd(
                                        function (element) {
                                            return element instanceof GImage;
                                        },
                                        function (element) {
                                            if (!(element instanceof GImage)) {
                                                if (element instanceof GImageGrid) return true;
                                                if (element.hasMixin(GNode.Container))
                                                    return GModifiers.modifiers.metaKey && (element instanceof K || element.hasMixin($));
                                            }
                                            return false;
                                        },
                                        null,
                                        viewPoint
                                    )),
                                this._cleanupTargetHighlights(this._itemsToAddToPage, this._scene.iteratePages.bind(this._scene)),
                                this._cleanupTargetHighlights(this._itemsToAddToImageMask));
                        }
                    } else if (this._mode == pe._Mode.Transforming) {
                        var tboxEditor = GElementEditor.getEditor(this._scene);
                        if (tboxEditor && tboxEditor.isTransformBoxActive() && this._moveStart) {
                            var viewTransform = this._view.getViewTransform(this._view.getScene().getActivePage()),
                                mappedCurrent = viewTransform.mapPoint(this._moveCurrent),
                                transformResult = tboxEditor.transformTBox(
                                    this._moveStartTransformed,
                                    mappedCurrent,
                                    viewTransform,
                                    GModifiers.modifiers.optionKey,
                                    GModifiers.modifiers.shiftKey,
                                    void 0,
                                    this._view.getViewConfiguration().multiPageView
                                );
                            (this.invalidateArea(), this._updateResizeHint(transformResult));
                        }
                    }
                }),
                (pe.prototype._cleanupTargetHighlights = function (items, iterateFn) {
                    if (items) {
                        var targets = items.map(function (item) {
                            return item.target;
                        });
                        (iterateFn || this._scene.acceptChildren.bind(this._scene))(function (element) {
                            element.hasFlag(GNode.Flag.Highlighted) && targets.indexOf(element) < 0 && element.removeFlag(GNode.Flag.Highlighted);
                        });
                    }
                }),
                (pe.prototype._gatherItemsForAdd = function (selectionFilterFn, targetAcceptFn, customVisitor, point, targetType) {
                    var result = [],
                        selection = this._editor.getSelection();
                    if (!selection) return result;
                    if (!selection.every(selectionFilterFn)) return result;
                    for (
                        var collectReferences = function (element) {
                                var refs = [],
                                    isSymbol = element instanceof GSymbol;
                                if (element instanceof r)
                                    return (
                                        this._scene.visitReferences(element, function (ref) {
                                            if (ref instanceof GElement && ref.getScene() && !(isSymbol && ref instanceof GSymbol)) {
                                                for (var ancestor = ref.getParent(); ancestor && ancestor !== selection[p]; ) ancestor = ancestor.getParent();
                                                ancestor || refs.push(ref);
                                            }
                                        }),
                                        refs
                                    );
                            }.bind(this),
                            toSceneRect = function (element, rect) {
                                for (var node = element; node && !(node instanceof GPage); ) node = node.getParent();
                                if (node) {
                                    var pagePos = node.getPosition(this._view.getViewConfiguration().multiPageView);
                                    return new GTransform(1, 0, 0, 1, pagePos.getX(), pagePos.getY()).mapRect(rect);
                                }
                                return rect;
                            }.bind(this),
                            p = 0;
                        p < selection.length;
                        p++
                    ) {
                        var u = selection[p];
                        if (
                            u.getPaintBBox() &&
                            (settings.pageCollisionTransform || !(u instanceof GPage)) &&
                            ((u instanceof GSymbol && u.isMaster()) || !u.hasMixin(GNode.Reference) || !this._scene.hasLinks(u))
                        ) {
                            var g = GElementEditor.getEditor(u),
                                f = new GTransform(),
                                m = g.getBBox(f),
                                y = toSceneRect(u, m),
                                _ = new VertexContainer();
                            (_.addVertex(PathCommand.Command.Move, m.getX(), m.getY()),
                                _.addVertex(PathCommand.Command.Line, m.getX() + m.getWidth(), m.getY()),
                                _.addVertex(PathCommand.Command.Line, m.getX() + m.getWidth(), m.getY() + m.getHeight()),
                                _.addVertex(PathCommand.Command.Line, m.getX(), m.getY() + m.getHeight()),
                                _.addVertex(PathCommand.Command.Close, 0, 0));
                            var v = new VertexIntersector(),
                                b = null;
                            (customVisitor || this._scene.acceptChildren.bind(this._scene))(
                                function (candidate) {
                                    if (u !== candidate && targetAcceptFn(candidate)) {
                                        var node = u;
                                        do {
                                            node = node.getParent();
                                        } while (node && node !== candidate);
                                        if (null === node) {
                                            var box = toSceneRect(candidate, candidate.getGeometryBBox());
                                            if (box) {
                                                if (box.containsRect(y, true))
                                                    return (
                                                        candidate.setFlag(GNode.Flag.Highlighted),
                                                        result.push({
                                                            target: candidate,
                                                            source: u,
                                                            sourceBox: y,
                                                        }),
                                                        collectReferences(u).forEach(function (refItem) {
                                                            result.push({
                                                                target: candidate,
                                                                source: refItem,
                                                                sourceBox: y,
                                                            });
                                                        }),
                                                        false
                                                    );
                                                if (
                                                    ((point && box.containsPoint(point)) || (targetType && candidate !== u && candidate instanceof targetType && u instanceof targetType)) &&
                                                    box.intersectsRect(y, true)
                                                ) {
                                                    if (!candidate.hasMixin($) || v.intersect(_, candidate, false, true, b))
                                                        return (
                                                            candidate.setFlag(GNode.Flag.Highlighted),
                                                            result.push({
                                                                target: candidate,
                                                                source: u,
                                                                sourceBox: y,
                                                            }),
                                                            collectReferences(u).forEach(function (refItem) {
                                                                result.push({
                                                                    target: candidate,
                                                                    source: refItem,
                                                                    sourceBox: y,
                                                                });
                                                            }),
                                                            false
                                                        );
                                                    b = v._polyLine0;
                                                }
                                            }
                                        }
                                    }
                                }.bind(this)
                            );
                        }
                    }
                    return result;
                }),
                (pe.prototype._updateResizeHint = function (transform) {
                    var box = null,
                        side = null,
                        angle = null;
                    if (this._moveCurrent && settings.showTooltips) {
                        if (transform && this._editorMovePartInfo && this._editorMovePartInfo.editor instanceof GBoxEditor)
                            if (this._editorMovePartInfo.id === GBoxEditor.RESIZE_HANDLE_PART_ID) {
                                box = transform.mapRect(this._editorMovePartInfo.editor.getBox());
                                var boxTransform = this._editorMovePartInfo.editor.getBoxTransform(this._view.getViewConfiguration().multiPageView);
                                (boxTransform && (box = boxTransform.mapRect(box)), (side = this._editorMovePartInfo.data.side));
                            } else
                                this._editorMovePartInfo.id === GBoxEditor.ROTATION_HANDLE_PART_ID &&
                                    ((angle = (180 * this._editorMovePartInfo.editor.getRotationAngle()) / Math.PI),
                                    (settings.snapRotate || GModifiers.modifiers.shiftKey) && (angle = Math.round(angle)));
                        if (this._mode == pe._Mode.Transforming && transform) {
                            var tboxEditor = GElementEditor.getEditor(this._scene);
                            tboxEditor &&
                                tboxEditor.isTransformBoxActive() &&
                                this._moveStart &&
                                (tboxEditor.getTBoxMode() === GSceneEditor.TBoxMode.RESIZE
                                    ? (box = tboxEditor.getTransformBox()._calculateGeometryBBox())
                                    : tboxEditor.getTBoxMode() === GSceneEditor.TBoxMode.ROTATE &&
                                      ((angle = (180 * transform.decomposed().rotate.getRotationFactor()) / Math.PI),
                                      (settings.snapRotate || GModifiers.modifiers.shiftKey) && (angle = Math.round(angle))));
                        }
                        if ((settings.angleTooltip || null === angle) && (settings.sizeTooltip || !box) && (null !== angle || box)) {
                            this._scene.getProperty("ut");
                            var width,
                                height,
                                currentViewPoint = this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(this._moveCurrent);
                            box && ((width = box.getWidth()), (height = box.getHeight()));
                            var selection = this._editor.getSelection();
                            if (1 === selection.length && selection[0] instanceof GPath && selection[0].isLine() && box) {
                                var lengthStr = this._scene.pointToString(Math.sqrt(width * width + height * height), settings.tooltipDecimalPlaces);
                                this.updateInlineHint(lengthStr, currentViewPoint, GRect.Side.BOTTOM_LEFT);
                            } else if (box) {
                                var sizeStr = "";
                                (side !== GRect.Side.TOP_CENTER &&
                                    side !== GRect.Side.BOTTOM_CENTER &&
                                    (sizeStr = this._scene.pointToString(width, settings.tooltipDecimalPlaces)),
                                    side !== GRect.Side.LEFT_CENTER &&
                                        side !== GRect.Side.RIGHT_CENTER &&
                                        (sizeStr && (sizeStr += " × "), (sizeStr += this._scene.pointToString(height, settings.tooltipDecimalPlaces))),
                                    sizeStr && this.updateInlineHint(sizeStr, currentViewPoint, GRect.Side.BOTTOM_LEFT));
                            } else this.updateInlineHint(util.formatNumber(angle, settings.tooltipDecimalPlaces) + "°", currentViewPoint, GRect.Side.BOTTOM_LEFT);
                        }
                    }
                }),
                (pe.prototype._updateMode = function (mode) {
                    mode !== this._mode && (this._mode = mode);
                }),
                (pe.prototype._updateEditorUnderMouse = function (point) {
                    this._visuals = null;
                    var pageTransform = this._view.getScene() ? this._view.getWorldTransform(this._view.getScene().getActivePage()) : null,
                        sceneTransform = this._view.getScene() ? this._view.getWorldTransform(this._view.getScene()) : null;
                    if (sceneTransform && pageTransform) {
                        var guideHit = null;
                        if ((!this._mode || this._mode == pe._Mode.Transforming) && this._view.getViewConfiguration().guideLinesVisible) {
                            var px = point.getX(),
                                py = point.getY(),
                                hGuides = this._scene.getProperty("hgl"),
                                vGuides = this._scene.getProperty("vgl");
                            if (hGuides && hGuides.length)
                                for (var p = 0; p < hGuides.length; ++p) {
                                    var u = sceneTransform.mapPoint(new GPoint(0, hGuides[p])).getY();
                                    if (u >= py - settings.pickDistance / 2 && u <= py + settings.pickDistance / 2) {
                                        guideHit = {
                                            isVertical: false,
                                            guideIndex: p,
                                        };
                                        break;
                                    }
                                }
                            if (!guideHit && vGuides && vGuides.length)
                                for (p = 0; p < vGuides.length; ++p) {
                                    var d = sceneTransform.mapPoint(new GPoint(vGuides[p], 0)).getX();
                                    if (d >= px - settings.pickDistance / 2 && d <= px + settings.pickDistance / 2) {
                                        guideHit = {
                                            isVertical: true,
                                            guideIndex: p,
                                        };
                                        break;
                                    }
                                }
                        }
                        if (this._mode == pe._Mode.Transforming) {
                            var tboxEditor = GElementEditor.getEditor(this._scene);
                            if (tboxEditor && tboxEditor.isTransformBoxActive()) {
                                this._editorUnderMouseInfo && (this._editorUnderMouseInfo = null);
                                var tboxHit = tboxEditor.updateTBoxUnderMouse(point, sceneTransform, this._view);
                                if (((this._editorUnderMouseInfo = tboxHit.partInfo), tboxHit.newPInfo || guideHit || (!guideHit && this._guideLineUnderMouse))) {
                                    var partId = tboxHit.partInfo.id;
                                    (!guideHit || (partId != GTransformBox.INSIDE && partId != GTransformBox.OUTSIDE && partId != GTransformBox.FAR_OUTSIDE)
                                        ? (this._guideLineUnderMouse && (this._guideLineUnderMouse = null), (guideHit = null))
                                        : ((this._guideLineUnderMouse = guideHit), (this._editorUnderMouseInfo = null)),
                                        this.updateCursor());
                                }
                            } else this._updateMode(null);
                        }
                        var partInfo = null;
                        if (!this._mode) {
                            var partHandled = false,
                                elementHandled = false,
                                elementEditor = GElementEditor.getEditor(this._scene);
                            if (
                                (elementEditor &&
                                    ((partInfo = elementEditor.getPartInfoAt(
                                        point,
                                        pageTransform,
                                        function (part) {
                                            return part.allowPartSelection();
                                        }.bind(this),
                                        settings.pickDistance,
                                        this._view.getViewConfiguration().multiPageView
                                    )) &&
                                        !this._editor.hasSelectionDetail() &&
                                        !this._editor.hasSelectionEdit() &&
                                        this._isLineSegment(partInfo) &&
                                        (partInfo = null),
                                    partInfo !== this._editorUnderMouseInfo &&
                                        (!this._editorUnderMouseInfo ||
                                            !this._editorUnderMouseInfo.editor.highlightPart ||
                                            (partInfo && partInfo.editor == this._editorUnderMouseInfo.editor) ||
                                            this._editorUnderMouseInfo.editor.requestInvalidation(),
                                        (this._editorUnderMouseInfo = partInfo),
                                        (partHandled = true),
                                        this._editorUnderMouseInfo &&
                                            this._editorUnderMouseInfo.editor.highlightPart &&
                                            this._editorUnderMouseInfo.editor.highlightPart(
                                                this._editorUnderMouseInfo.id,
                                                this._editorUnderMouseInfo.data
                                            ),
                                        this.updateCursor())),
                                !partHandled && this._editorUnderMouseInfo && ((this._editorUnderMouseInfo = null), this.updateCursor()),
                                !partHandled && guideHit && ((this._guideLineUnderMouse = guideHit), this.updateCursor()),
                                !guideHit && this._guideLineUnderMouse && ((this._guideLineUnderMouse = null), this.updateCursor()),
                                !partHandled && !guideHit)
                            ) {
                                var hoverTarget = this._getSelectableForPosition(point, false);
                                !hoverTarget ||
                                    hoverTarget.hasFlag(GNode.Flag.Selected) ||
                                    (hoverTarget instanceof GPage && this._scene.getActivePage() === hoverTarget) ||
                                    (this._elementUnderMouse &&
                                        this._elementUnderMouse !== hoverTarget &&
                                        this._elementUnderMouse.removeFlag(GNode.Flag.Highlighted),
                                    (this._elementUnderMouse = hoverTarget),
                                    settings.highlightOnHover && this._elementUnderMouse.setFlag(GNode.Flag.Highlighted),
                                    (elementHandled = true),
                                    this.updateCursor());
                            }
                            (!elementHandled &&
                                this._elementUnderMouse &&
                                (this._elementUnderMouse.removeFlag(GNode.Flag.Highlighted),
                                (this._elementUnderMouse = null),
                                this.updateCursor()),
                                this._allowDistanceHelper &&
                                    this._editor.getDistanceHelper().isActivated() &&
                                    this._editor.getSelection() &&
                                    this._editor.getSelection().length &&
                                    settings.distanceHelperBehaviour !== pe._DistanceHelperBehaviour.Click &&
                                    this._updateDistanceHelper());
                        }
                        var snapRect = null;
                        this._visuals = null;
                        var metaSelect = GModifiers.modifiers.metaKey && null == this._manager.getTemporaryActiveTool(),
                            zonesEnabled = GGuides.options.zones && !metaSelect;
                        if (((!this._mode && !partInfo) || this._mode == pe._Mode.Select) && !metaSelect && zonesEnabled) {
                            var S,
                                selection = this._editor.getSelection();
                            metaSelect = false;
                            if (
                                (selection &&
                                    1 == selection.length &&
                                    selection[0] instanceof GGroup &&
                                    selection[0].hitTest(
                                        point,
                                        pageTransform,
                                        this._selectAcceptorFunc,
                                        metaSelect,
                                        -1,
                                        settings.pickDistance,
                                        zonesEnabled,
                                        null,
                                        true,
                                        false,
                                        this._view.getViewConfiguration().multiPageView
                                    ) &&
                                    (S = selection[0]),
                                S && (snapRect = S.getGeometryBBox()) && !snapRect.isEmpty())
                            ) {
                                snapRect = pageTransform.mapRect(snapRect);
                                var snapZones = this._editor.getGuides().getBBoxSnapZones(snapRect, point);
                                snapZones && snapZones.length && (this._visuals = snapZones);
                            }
                        }
                        var visualsRect = this._visuals ? snapRect.expanded(2, 2, 2, 2) : null;
                        (this._visualsArea || visualsRect) &&
                            (this._visualsArea && this.invalidateArea(this._visualsArea),
                            visualsRect && this.invalidateArea(visualsRect),
                            (this._visualsArea = visualsRect));
                    }
                }),
                (pe.prototype._updateDistanceHelper = function (forceToggle) {
                    var box = null,
                        element = this._editor.getSelection()[0],
                        page = GEditor.getElementPage(element),
                        otherBox = null,
                        isRotated = false,
                        hasSize = false,
                        selectionEditor = this._editor.getSelectionEditor();
                    if (selectionEditor && !selectionEditor.hasFlag(EditorBase.Flag.HideEditor)) box = selectionEditor.getBox(true);
                    else if (1 == this._editor.getSelection().length) {
                        var editor = GElementEditor.getEditor(element);
                        box = element.hasMixin(GElement.Transform) && editor ? editor.getPEGeometryBBox() : element.getGeometryBBox();
                        var angle = element.getAngle();
                        ((null == (angle = angle ? Math.abs(angle) : angle) ||
                            MathUtil.isEqualEps(angle, 0, 1e-4) ||
                            MathUtil.isEqualEps(angle, Math.PI, 1e-4) ||
                            MathUtil.isEqualEps(angle, MathUtil.PIHALF, 1e-4)) &&
                            editor &&
                            editor._showResizeBox()) ||
                            (isRotated = true);
                    }
                    if (box) {
                        var comparePage = page,
                            useHoverElement = !forceToggle || this._elementMeasurementsToggle,
                            hasHoverTarget = this._elementUnderMouse && !this._elementUnderMouse.hasFlag(GNode.Flag.Selected);
                        (useHoverElement && hasHoverTarget
                            ? ((otherBox = this._elementUnderMouse.getGeometryBBox()), (comparePage = GEditor.getElementPage(this._elementUnderMouse)), (hasSize = true))
                            : comparePage && ((otherBox = comparePage.getGeometryBBox()), comparePage.getProperty("h") || comparePage.getProperty("w") || (hasSize = true)),
                            forceToggle && hasHoverTarget && (this._elementMeasurementsToggle = !this._elementMeasurementsToggle),
                            otherBox && comparePage == page && this._editor.getDistanceHelper().refreshVisuals(box, otherBox, isRotated, hasSize));
                    }
                }),
                (pe.prototype._selectFilter = function (element) {
                    return (
                        !(element instanceof GSlice && !this._view.getViewConfiguration().slices) &&
                        !(element.hasMixin(AnnotationMixin) && !this._view.getViewConfiguration().isElementAnnotationsVisible(element)) &&
                        !element.hasFlag(GElement.Flag.FullLocked) &&
                        !(element instanceof he && element.getProperty("plkt") & he.ProgramLck.NoSelect)
                    );
                }),
                (pe.prototype._selectAcceptor = function (element) {
                    return !(element instanceof GPage);
                }),
                (pe.prototype._getSelectableElements = function (elements, includeChildren) {
                    for (var result = [], n = 0; n < elements.length; ++n) {
                        var r = this._getSelectableElement(elements[n], includeChildren);
                        r && result.indexOf(r, includeChildren) < 0 && result.push(r);
                    }
                    return (result = this._pageFilterRule(result));
                }),
                (pe.prototype._getSelectableElement = function (element, includeChildren) {
                    for (var node = element; null !== node; node = node.getParent())
                        if ((node instanceof GGroup || node instanceof GPage) && (includeChildren || !node.getParent() || !(node.getParent() instanceof GGroup))) return node;
                    return null;
                }),
                (pe.prototype._pageFilterRule = function (elements) {
                    return elements.every(function (element) {
                        return element instanceof GPage;
                    })
                        ? elements
                        : elements.filter(function (element) {
                              return !(element instanceof GPage);
                          });
                }),
                (pe.prototype._switchToMoveFilter = function (elements) {
                    return elements.filter(function (element) {
                        return !(element instanceof GPage);
                    });
                }),
                (pe.prototype._isLineSegment = function (partInfo) {
                    return (
                        partInfo.editor instanceof GPathEditor &&
                        (!partInfo.data || !(partInfo.data.ownerEditor instanceof GCompoundPathEditor)) &&
                        partInfo.id.type == GPathEditor.PartType.Segment &&
                        partInfo.editor.getElement().isLine()
                    );
                }),
                (pe.prototype._isDistanceHelperClickBehaviour = function () {
                    return settings.distanceHelperBehaviour === pe._DistanceHelperBehaviour.Click;
                }),
                (pe.prototype._isDistanceHelperActivated = function () {
                    return this._allowDistanceHelper && this._editor.getDistanceHelper().isActivated();
                }),
                (pe.prototype._isDistanceHelperActivatedByClick = function () {
                    return (
                        !!(this._isDistanceHelperActivated() && this._isDistanceHelperClickBehaviour() && GModifiers.modifiers.optionKey) &&
                        this._editor.hasSelection()
                    );
                }),
                (pe.prototype._disableBackgroundSelect = function () {
                    this._isBackgroundSelectEnabled = false;
                }),
                (pe.prototype._enableBackgroundSelect = function () {
                    this._mode === pe._Mode.Select
                        ? (this._backgroundSelectShouldBeEnabled = true)
                        : ((this._isBackgroundSelectEnabled = true), (this._selectIgnoreBackgroundElements = null));
                }),
                (pe.prototype.toString = function () {
                    return "[Object GSelectTool]";
                }),
                (module.exports = pe));
        };
