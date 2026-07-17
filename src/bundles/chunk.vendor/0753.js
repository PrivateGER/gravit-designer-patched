module.exports = function (module, exports, require) {
            var GSystem = require(64),
                modifiersChangedEvent = require(150),
                GPGAnchor = require(657),
                GGuide = require(99),
                GNode = require(2),
                IsFiniteNonNegativeNumber = require(0),
                editorOptions = require(24),
                GCursor = require(52),
                GPathsGraphEditor = require(275),
                GElementEditor = require(36),
                GMouseEvent = require(77),
                GPoint = require(5),
                GKey = require(164),
                GBoxEditor = require(66),
                GItemTool = require(332),
                GKeyEvent = require(167),
                GPathsGraph = require(162),
                GPathBase = require(45),
                GBaseEditor = require(39),
                String = require(9),
                GLocaleKey = require(47),
                GPathBaseEditor = require(155);

            function GPathsGraphTool() {
                GItemTool.call(this);
            }
            (IsFiniteNonNegativeNumber.inherit(GPathsGraphTool, GItemTool),
                (GPathsGraphTool.prototype._pathsGraphRef = null),
                (GPathsGraphTool.prototype._dpathRef = null),
                (GPathsGraphTool.prototype._pathBaseRef = null),
                (GPathsGraphTool.prototype._newPoint = null),
                (GPathsGraphTool.prototype._editPt = null),
                (GPathsGraphTool.prototype._refPt = null),
                (GPathsGraphTool.prototype._mouseDownPartInfo = null),
                (GPathsGraphTool.prototype._graphEditor = null),
                (GPathsGraphTool.prototype._released = true),
                (GPathsGraphTool.prototype._dragStarted = false),
                (GPathsGraphTool.prototype._dragStartPt = null),
                (GPathsGraphTool.prototype._firstAlt = false),
                (GPathsGraphTool.Transaction = {
                    NoTransaction: 0,
                    InsertPoint: 1,
                    AppendPoint: 2,
                    MovePoint: 3,
                    DeletePoint: 4,
                    ModifyPointProperties: 5,
                    ModifyPathProperties: 6,
                    InsertElement: 7,
                }),
                (GPathsGraphTool.prototype._transactionType = GPathsGraphTool.Transaction.NoTransaction),
                (GPathsGraphTool.Mode = {
                    Append: 0,
                    Edit: 1,
                }),
                (GPathsGraphTool.prototype._mode = GPathsGraphTool.Mode.Append),
                (GPathsGraphTool.prototype._mDownTime = 0),
                Object.defineProperty(GPathsGraphTool, "DBLCLICKTM", {
                    get: function () {
                        return editorOptions.pathDbClickTime || 300;
                    },
                }),
                (GPathsGraphTool.prototype._cursor = null),
                (GPathsGraphTool.prototype._lastMouseEvent = null),
                (GPathsGraphTool.prototype._deactivationAllowed = true),
                (GPathsGraphTool.prototype._cached = null),
                (GPathsGraphTool.prototype._getRelatedItemClass = function () {
                    return GPathsGraph;
                }),
                (GPathsGraphTool.prototype.getCursor = function () {
                    return this._cursor;
                }),
                (GPathsGraphTool.prototype.catchesContextMenu = function (e) {
                    return !e;
                }),
                (GPathsGraphTool.prototype.activate = function (view, temporary) {
                    (GItemTool.prototype.activate.call(this, view, temporary),
                        temporary ||
                            (view.addEventListener(GMouseEvent.Down, this._mouseDown, this),
                            view.addEventListener(GMouseEvent.Release, this._mouseRelease, this),
                            view.addEventListener(GKeyEvent.Down, this._keyDown, this),
                            view.addEventListener(GMouseEvent.Drag, this._mouseDrag, this),
                            view.addEventListener(GMouseEvent.Move, this._mouseMove, this),
                            GSystem.addEventListener(modifiersChangedEvent, this._modifiersChanged, this)),
                        (this._cursor = GCursor.PenStart),
                        (this._transactionType = GPathsGraphTool.Transaction.NoTransaction),
                        this._editor.setPathResize(false, true));
                }),
                (GPathsGraphTool.prototype.deactivate = function (view, temporary) {
                    (this._checkMode(),
                        this._graphEditor &&
                            (this._newPoint || this._dpathRef) &&
                            (this._graphEditor.requestInvalidation(),
                            this._graphEditor.releasePreview(),
                            this._graphEditor.requestInvalidation()),
                        this._finishTransaction(),
                        this._allowDeactivation(),
                        this._reset(),
                        this._editor && (this._editor.getGuides().invalidate(), temporary || this._editor.setPathResize(true)),
                        GItemTool.prototype.deactivate.call(this, view, temporary),
                        view.removeEventListener(GMouseEvent.Down, this._mouseDown),
                        view.removeEventListener(GMouseEvent.Release, this._mouseRelease),
                        view.removeEventListener(GKeyEvent.Down, this._keyDown),
                        view.removeEventListener(GMouseEvent.Drag, this._mouseDrag),
                        view.removeEventListener(GMouseEvent.Move, this._mouseMove),
                        GSystem.removeEventListener(modifiersChangedEvent, this._modifiersChanged));
                }),
                (GPathsGraphTool.prototype.isDeactivatable = function () {
                    return this._deactivationAllowed;
                }),
                (GPathsGraphTool.prototype._allowDeactivation = function () {
                    this._deactivationAllowed = true;
                }),
                (GPathsGraphTool.prototype._blockDeactivation = function () {
                    this._deactivationAllowed = false;
                }),
                (GPathsGraphTool.prototype._checkPathsGraphEditor = function () {
                    var selection = this._editor.getSelection(),
                        pathsGraph = null;
                    (selection && 1 == selection.length && selection[0] instanceof GPathsGraph && (pathsGraph = selection[0]),
                        pathsGraph &&
                            ((this._graphEditor = GElementEditor.openEditor(pathsGraph)),
                            this._graphEditor.setFlag(GBaseEditor.Flag.Detail),
                            this._graphEditor.removeFlag(GBoxEditor.Flag.ResizeAll),
                            this._pathBaseRef || (this._pathBaseRef = this._graphEditor.getPathBaseInEdit())));
                }),
                (GPathsGraphTool.prototype._checkMode = function () {
                    (this._checkPathsGraphEditor(),
                        this._graphEditor
                            ? this._graphEditor.getGraph().getWorkspace()
                                ? ((this._graphRef = this._graphEditor.getGraph()),
                                  this._graphEditor.getActiveExtendingMode() ? (this._mode = GPathsGraphTool.Mode.Append) : (this._mode = GPathsGraphTool.Mode.Edit))
                                : ((this._mode = GPathsGraphTool.Mode.Append), (this._graphRef = null), (this._graphEditor = null))
                            : ((this._mode = GPathsGraphTool.Mode.Append), (this._graphRef = null)));
                }),
                (GPathsGraphTool.prototype._renewPreviewLink = function () {
                    if (this._graphEditor) {
                        var pathBasePreview = this._graphEditor.getPathBasePreview();
                        if (this._editPt) {
                            var lastPoint = null;
                            (this._mode == GPathsGraphTool.Mode.Append && pathBasePreview && (lastPoint = pathBasePreview.getAnchorPoints().getLastChild()),
                                this._editPt != lastPoint && ((this._newPoint = false), (this._editPt = null)));
                        }
                        this._dpathRef = pathBasePreview;
                    } else ((this._editPt = null), (this._newPoint = false), (this._dpathRef = null));
                }),
                (GPathsGraphTool.prototype._addPoint = function (point, t, skipTransform, noSelect) {
                    if (this._graphEditor && !skipTransform) {
                        var transform = this._graphRef.getTransform();
                        if (transform) {
                            var localPoint = new GPoint(point.getProperty("x"), point.getProperty("y"));
                            ((localPoint = transform.inverted().mapPoint(localPoint)), point.setProperties(["x", "y"], [localPoint.getX(), localPoint.getY()]));
                        }
                    }
                    if (t)
                        if (this._graphEditor) {
                            if ((this._graphEditor.requestInvalidation(), this._mode == GPathsGraphTool.Mode.Append)) {
                                if (this._dpathRef)
                                    (noSelect || this._dpathRef.getAnchorPoints().getLastChild().removeFlag(GNode.Flag.Selected),
                                        this._dpathRef.getAnchorPoints().appendChild(point),
                                        noSelect || point.setFlag(GNode.Flag.Selected),
                                        (this._newPoint = true));
                                else {
                                    var pathBase = new GPathBase();
                                    (pathBase.setProperty("fpt", null),
                                        pathBase.getAnchorPoints().appendChild(point),
                                        pathBase.setFlag(GNode.Flag.Selected),
                                        (this._pathBaseRef = pathBase));
                                    var anchor = new GPGAnchor();
                                    (anchor.setProperties(["x", "y"], [point.getProperty("x"), point.getProperty("y")]),
                                        this._transactionType == GPathsGraphTool.Transaction.NoTransaction &&
                                            this._startTransaction(GPathsGraphTool.Transaction.InsertPoint),
                                        this._graphEditor.getElement().addAnchor(anchor),
                                        this._finishTransaction(),
                                        this._graphEditor.setOutgoingPathBase(anchor, this._pathBaseRef),
                                        this._graphEditor.selectOnePoint(point),
                                        this._checkMode(),
                                        this._renewPreviewLink());
                                }
                                (this._dpathRef &&
                                    ((this._editPt = this._dpathRef.getAnchorPoints().getLastChild()),
                                    this._graphEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.End)),
                                    this._graphEditor.requestInvalidation());
                            }
                        } else {
                            if ((this._createPathsGraph(point), !this._graphEditor || !this._pathBaseRef)) return;
                            (this._graphEditor.selectOnePoint(point),
                                this._checkMode(),
                                this._renewPreviewLink(),
                                (this._editPt = this._dpathRef.getAnchorPoints().getLastChild()),
                                this._graphEditor.requestInvalidation(),
                                this._graphEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.End));
                        }
                    else
                        this._graphEditor &&
                            (this._graphEditor.requestInvalidation(),
                            this._mode == GPathsGraphTool.Mode.Append &&
                                (this._dpathRef &&
                                    (this._dpathRef.getAnchorPoints().removeChild(point),
                                    (this._dpathRef = null),
                                    point.hasFlag(GNode.Flag.Selected) && point.removeFlag(GNode.Flag.Selected)),
                                this._graphEditor.releasePreview(),
                                this._graphEditor.requestInvalidation(),
                                this._pathBaseRef.getAnchorPoints().appendChild(point),
                                this._graphEditor.selectOnePoint(point),
                                this._graphEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.End),
                                this._graphEditor.requestInvalidation()));
                }),
                (GPathsGraphTool.prototype._commitChanges = function () {
                    (this._graphEditor.requestInvalidation(),
                        this._graphEditor.releasePreview(),
                        this._graphEditor.requestInvalidation(),
                        this._reset());
                }),
                (GPathsGraphTool.prototype._createPathsGraph = function (point) {
                    var pathBase = new GPathBase();
                    (pathBase.setProperty("fpt", null),
                        pathBase.getAnchorPoints().appendChild(point),
                        pathBase.setFlag(GNode.Flag.Selected),
                        (this._pathBaseRef = pathBase),
                        this._startTransaction(GPathsGraphTool.Transaction.InsertElement));
                    var pathsGraph = new GPathsGraph(),
                        anchor = new GPGAnchor();
                    (anchor.setProperties(["x", "y"], [point.getProperty("x"), point.getProperty("y")]),
                        pathsGraph.addAnchor(anchor),
                        this._editor.updateByMousePosition(
                            new GPoint(point.getProperty("x"), point.getProperty("y")),
                            null,
                            false,
                            this._view.getViewConfiguration()
                        ),
                        this._editor.insertElements([pathsGraph], false, true, true),
                        pathsGraph.setFlag(GNode.Flag.Selected),
                        point.setFlag(GNode.Flag.Selected),
                        this._finishTransaction(),
                        this._checkPathsGraphEditor(),
                        this._graphEditor && this._graphEditor.setOutgoingPathBase(anchor, this._pathBaseRef));
                }),
                (GPathsGraphTool.prototype._mouseDown = function (event) {
                    var now = new Date().getTime();
                    if (now - this._mDownTime < GPathsGraphTool.DBLCLICKTM)
                        "edit" == editorOptions.selectDoubleClickBehavior ? this._manager.notifyJobDone(this) : this._mouseDblClick(event);
                    else {
                        var newPoint = null;
                        if (
                            ((this._lastMouseEvent = event),
                            (this._dragStarted = false),
                            (this._dragStartPt = null),
                            this._mouseMove(event),
                            (this._mDownTime = now),
                            (this._released = false),
                            GSystem.modifiers.optionKey && (this._firstAlt = true),
                            this._blockDeactivation(),
                            this._checkMode(),
                            this._graphEditor && this._graphEditor.blockRemoval(),
                            this._mode == GPathsGraphTool.Mode.Edit && this._mouseDownOnEdit(event),
                            this._mode == GPathsGraphTool.Mode.Append)
                        )
                            if ((this._renewPreviewLink(), this._newPoint && this._graphEditor)) {
                                this._firstAlt && this._editPt.setProperties(["ah", "tp"], [true, GPathBase.AnchorPoint.Type.Symmetric]);
                                var partInfo = this._getPartInfo(event.client);
                                if (partInfo)
                                    if (((this._mouseDownPartInfo = partInfo), this._mouseDownPartInfo.id.type == GPathsGraphEditor.PartType.Anchor)) {
                                        var position = this._mouseDownPartInfo.id.point.getPoint(),
                                            transform = this._graphRef.getTransform();
                                        (transform && (position = transform.mapPoint(position)),
                                            this._graphEditor.movePoint(
                                                this._editPt,
                                                this._view.getWorldTransform(this._view.getScene().getActivePage()).mapPoint(position),
                                                this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                                null
                                            ));
                                    } else this._updatePoint(event.client);
                                else this._updatePoint(event.client);
                                var previousPoint = this._editPt.getPrevious();
                                (previousPoint && (previousPoint.removeFlag(GNode.Flag.Selected), this._editPt.setFlag(GNode.Flag.Selected)),
                                    this._graphEditor.requestInvalidation());
                            } else if (this._mouseDownPartInfo)
                                ((this._mouseDownPartInfo = null),
                                    (this._editPt = this._dpathRef.getAnchorPoints().getLastChild()),
                                    (this._mode = GPathsGraphTool.Mode.Edit));
                            else {
                                position = this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(event.client);
                                (this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                                    (position = this._editor.getGuides().mapPoint(position, GGuide.DetailMap.Mode.DetailOnFilterOn)),
                                    this._editor.getGuides().finishMap(),
                                    (newPoint = this._constructNewPoint(event, position)),
                                    this._addPoint(newPoint, true, false));
                            }
                    }
                }),
                (GPathsGraphTool.prototype._constructNewPoint = function (event, position) {
                    var point = new GPathBase.AnchorPoint();
                    return (
                        point.setProperties(["x", "y", "ah"], [position.getX(), position.getY(), true]),
                        GSystem.modifiers.optionKey && point.setProperties(["ah", "tp"], [true, GPathBase.AnchorPoint.Type.Symmetric]),
                        point
                    );
                }),
                (GPathsGraphTool.prototype._graphHitAction = function () {}),
                (GPathsGraphTool.prototype._mouseMove = function (event) {
                    if (!(new Date().getTime() - this._mDownTime < GPathsGraphTool.DBLCLICKTM) && this._released) {
                        var newPoint;
                        if (((this._lastMouseEvent = event), this._checkMode(), this._mode == GPathsGraphTool.Mode.Append)) {
                            this._renewPreviewLink();
                            var position = event.client;
                            if (!this._newPoint && this._graphEditor) {
                                position = this._constrainIfNeeded(
                                    event.client,
                                    this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                    this._graphRef
                                );
                                var worldPoint = this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(position);
                                (this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                                    (worldPoint = this._editor.getGuides().mapPoint(worldPoint, GGuide.DetailMap.Mode.DetailOnFilterOn)),
                                    this._editor.getGuides().finishMap(),
                                    (position = this._view.getWorldTransform(this._view.getScene().getActivePage()).mapPoint(worldPoint)),
                                    (newPoint = this._constructNewPoint(event, worldPoint)),
                                    this._addPoint(newPoint, true, false, true),
                                    this._setCursorForPosition(null, position));
                            } else if (this._editPt)
                                (this._graphEditor.requestInvalidation(),
                                    (position = this._updatePoint(event.client)),
                                    this._graphEditor.requestInvalidation(),
                                    this._setCursorForPosition(null, event.client));
                            else {
                                worldPoint = this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(position);
                                (this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                                    (worldPoint = this._editor.getGuides().mapPoint(worldPoint, GGuide.DetailMap.Mode.DetailOnFilterOn)),
                                    this._editor.getGuides().finishMap(),
                                    (position = this._view.getWorldTransform(this._view.getScene().getActivePage()).mapPoint(worldPoint)),
                                    this._setCursorForPosition(null, position));
                            }
                        } else {
                            worldPoint = this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(event.client);
                            (this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                                (worldPoint = this._editor.getGuides().mapPoint(worldPoint, GGuide.DetailMap.Mode.DetailOnFilterOn)),
                                this._editor.getGuides().finishMap());
                            position = this._view.getWorldTransform(this._view.getScene().getActivePage()).mapPoint(worldPoint);
                            this._setCursorForPosition(null, position);
                        }
                    }
                }),
                (GPathsGraphTool.prototype._updatePoint = function (position) {
                    var constrainedPosition = null;
                    return (
                        this._pathBaseRef &&
                            this._editPt &&
                            ((constrainedPosition =
                                this._mode != GPathsGraphTool.Mode.Edit
                                    ? this._constrainIfNeeded(
                                          position,
                                          this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                          this._pathBaseRef
                                      )
                                    : this._constrainIfNeeded(
                                          position,
                                          this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                          this._pathBaseRef,
                                          this._dpathRef.getAnchorPoints().getPreviousPoint(this._editPt)
                                      )),
                            this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                            (constrainedPosition = this._view
                                .getWorldTransform(this._view.getScene().getActivePage())
                                .mapPoint(
                                    this._editor
                                        .getGuides()
                                        .mapPoint(
                                            this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(constrainedPosition),
                                            GGuide.DetailMap.Mode.DetailOnFilterOn
                                        )
                                )),
                            this._editor.getGuides().finishMap(),
                            this._graphEditor.movePoint(
                                this._editPt,
                                constrainedPosition,
                                this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                this._dragStartPt
                            )),
                        constrainedPosition
                    );
                }),
                (GPathsGraphTool.prototype._updateHandles = function (position) {
                    var handleX,
                        handleY,
                        pointType = this._editPt.getProperty("tp"),
                        pointX = this._editPt.getProperty("x"),
                        pointY = this._editPt.getProperty("y");
                    if (
                        this._graphEditor.hitAnchorPoint(
                            this._editPt,
                            position,
                            this._view.getWorldTransform(this._view.getScene().getActivePage()),
                            0
                        )
                    )
                        pointType == GPathBase.AnchorPoint.Type.Symmetric
                            ? this._editPt.setProperties(
                                  ["tp", "hlx", "hly", "hrx", "hry"],
                                  [GPathBase.AnchorPoint.Type.Asymmetric, null, null, null, null]
                              )
                            : this._editPt.setProperties(["hrx", "hry"], [null, null]);
                    else {
                        var localPoint = this._graphEditor
                            .getTransformFromNative(this._view.getWorldTransform(this._view.getScene().getActivePage()))
                            .inverted()
                            .mapPoint(position);
                        if (
                            this._newPoint ||
                            !GSystem.modifiers.optionKey ||
                            !this._firstAlt ||
                            pointType == GPathBase.AnchorPoint.Type.Connector ||
                            (null == this._editPt.getPrevious() && null == this._editPt.getNext())
                        ) {
                            this._editPt.setProperty("ah", false);
                            var localX = localPoint.getX(),
                                localY = localPoint.getY();
                            if (GSystem.modifiers.optionKey)
                                this._editPt.setProperties(["tp", "hrx", "hry"], [GPathBase.AnchorPoint.Type.Asymmetric, localX, localY]);
                            else {
                                var symmetricType = GPathBase.AnchorPoint.Type.Symmetric,
                                    isEndpoint =
                                        (null == this._editPt.getPrevious() && null != this._editPt.getNext()) ||
                                        (null != this._editPt.getPrevious() && null == this._editPt.getNext());
                                if (this._mode != GPathsGraphTool.Mode.Edit && !this._newPoint && isEndpoint)
                                    this._editPt.setProperties(["tp", "hrx", "hry"], [symmetricType, localX, localY]);
                                else {
                                    var mirrorX = pointX + pointX - localX,
                                        mirrorY = pointY + pointY - localY;
                                    this._editPt.setProperties(["tp", "hrx", "hry", "hlx", "hly"], [symmetricType, localX, localY, mirrorX, mirrorY]);
                                }
                            }
                        } else {
                            var deltaX = localPoint.getX() - pointX,
                                deltaY = localPoint.getY() - pointY;
                            this._editPt.setProperty("ah", false);
                            var startHandleX = this._dragStartPt.getProperty("hrx");
                            handleX = null != startHandleX ? startHandleX + deltaX : localPoint.getX();
                            var startHandleY = this._dragStartPt.getProperty("hry");
                            ((handleY = null != startHandleY ? startHandleY + deltaY : localPoint.getY()),
                                this._editPt.setProperty("ah", false),
                                this._editPt.setProperties(["tp", "hrx", "hry"], [GPathBase.AnchorPoint.Type.Asymmetric, handleX, handleY]));
                        }
                    }
                    this._graphEditor.requestInvalidation();
                }),
                (GPathsGraphTool.prototype._updatePointProperties = function (position) {
                    var updatedPosition;
                    return (
                        this._graphEditor.requestInvalidation(),
                        (updatedPosition = this._constrainIfNeeded(
                            position,
                            this._view.getWorldTransform(this._view.getScene().getActivePage()),
                            this._pathBaseRef,
                            this._dragStartPt
                        )),
                        this._updateHandles(updatedPosition),
                        updatedPosition
                    );
                }),
                (GPathsGraphTool.prototype._mouseDrag = function (event) {
                    !this._released &&
                        this._editPt &&
                        ((this._lastMouseEvent = event),
                        this._setCursorForPosition(GCursor.PenDrag),
                        this._dragStartPt ||
                            ((this._dragStartPt = this._refPt ? this._refPt : this._editPt),
                            this._editPt.setProperties(["ah", "tp"], [false, GPathBase.AnchorPoint.Type.Symmetric]),
                            this._editPt.getPrevious() && this._editPt.getPrevious().setProperty("ah", false)),
                        (this._dragStarted = true),
                        this._updatePointProperties(event.client));
                }),
                (GPathsGraphTool.prototype._mouseDblClick = function (event) {
                    ((this._lastMouseEvent = null),
                        this._checkMode(),
                        this._graphEditor && (this._graphEditor.updatePartSelection(false), this._commitChanges()),
                        (this._mode = GPathsGraphTool.Mode.Edit),
                        this._setCursorForPosition(null, event.client));
                }),
                (GPathsGraphTool.prototype._mouseRelease = function (event) {
                    if ((this._graphEditor && this._graphEditor.allowRemoval(), this._editor.getGuides().invalidate(), !this._released))
                        try {
                            if (
                                (this._editor.updateByMousePosition(
                                    event.client,
                                    this._view.getWorldTransform(this._scene),
                                    false,
                                    this._view.getViewConfiguration()
                                ),
                                (this._released = true),
                                this._graphEditor && this._mode == GPathsGraphTool.Mode.Edit)
                            )
                                this._dragStarted || !this._refPt || this._editPt
                                    ? this._dragStarted
                                        ? (this._updatePointProperties(event.client),
                                          this._transactionType,
                                          GPathsGraphTool.Transaction.NoTransaction,
                                          this._graphEditor.applyTransform(this._pathBaseRef),
                                          this._commitChanges(),
                                          this._setCursorForPosition(null, event.client))
                                        : (this._commitChanges(), this._setCursorForPosition(null, event.client))
                                    : this._mouseNoDragReleaseOnEdit(event.client);
                            else if (this._dpathRef) {
                                event.client;
                                if ((this._dragStarted && this._updatePointProperties(event.client), this._newPoint)) {
                                    var lastPoint =
                                        this._dragStarted && this._pathBaseRef && this._pathBaseRef.getAnchorPoints().getLastChild()
                                            ? this._pathBaseRef.getAnchorPoints().getLastChild()
                                            : null;
                                    (this._addPoint(this._editPt, false, true),
                                        lastPoint && lastPoint.setProperty("ah", false),
                                        this._graphEditor.requestInvalidation());
                                }
                                var anchor = null;
                                (this._mouseDownPartInfo &&
                                    ((this._graphEditor = this._mouseDownPartInfo.editor),
                                    (this._graphRef = this._graphEditor.getGraph()),
                                    this._mouseDownPartInfo.id.type == GPathsGraphEditor.PartType.Anchor
                                        ? (anchor = this._mouseDownPartInfo.id.point)
                                        : (this._startTransaction(GPathsGraphTool.Transaction.InsertPoint),
                                          (anchor = this._graphEditor.splitEdge(this._mouseDownPartInfo, true)),
                                          this._finishTransaction())),
                                    (this._mouseDownPartInfo = null),
                                    anchor
                                        ? (this._graphEditor.updatePartSelection(false),
                                          this._graphEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Off),
                                          this._startTransaction(GPathsGraphTool.Transaction.InsertElement),
                                          this._graphEditor.insertOutgoingPathBase(anchor),
                                          this._finishTransaction(),
                                          this._commitChanges(),
                                          this._setCursorForPosition(null, event.client))
                                        : (this._commitChanges(), this._setCursorForPosition(GCursor.Pen)));
                            }
                            this._refPt = null;
                        } finally {
                            this._finishTransaction();
                        }
                    ((this._released = true),
                        (this._dragStarted = false),
                        (this._dragStartPt = null),
                        (this._lastMouseEvent = null),
                        (this._firstAlt = false),
                        this._allowDeactivation());
                }),
                (GPathsGraphTool.prototype._reset = function () {
                    (this._graphEditor && this._graphEditor.removeFlag(GBaseEditor.Flag.Detail),
                        (this._dpathRef = null),
                        (this._graphRef = null),
                        (this._graphEditor = null),
                        (this._newPoint = false),
                        (this._editPt = null),
                        (this._dragStartPt = null),
                        (this._refPt = null),
                        (this._mouseDownPartInfo = null));
                }),
                (GPathsGraphTool.prototype._keyDown = function (event) {
                    (GItemTool.prototype._keyDown.call(this, event),
                        event.key === GKey.Constant.ESC
                            ? ((this._lastMouseEvent = null), this._escAction())
                            : event.key === GKey.Constant.ENTER && ((this._lastMouseEvent = null), this._enterAction()));
                }),
                (GPathsGraphTool.prototype._modifiersChanged = function (event) {
                    event.changed.shiftKey && this._lastMouseEvent
                        ? this._released
                            ? this._mouseMove(this._lastMouseEvent)
                            : this._mouseDrag(this._lastMouseEvent)
                        : event.changed.optionKey &&
                          ((this._firstAlt = false),
                          this._released
                              ? this._newPoint &&
                                (this._editPt.setProperties(
                                    ["tp"],
                                    [GSystem.modifiers.optionKey ? GPathBase.AnchorPoint.Type.Symmetric : GPathBase.AnchorPoint.Type.Asymmetric]
                                ),
                                this._graphEditor.requestInvalidation())
                              : (GSystem.modifiers.optionKey && (this._firstAlt = !this._dragStarted), this._mouseDrag(this._lastMouseEvent)));
                }),
                (GPathsGraphTool.prototype._escAction = function () {
                    this._released &&
                        (this._checkMode(),
                        this._graphEditor &&
                            (this._graphEditor.updatePartSelection(false),
                            this._graphEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Off),
                            this._startTransaction(GPathsGraphTool.Transaction.InsertElement),
                            this._graphEditor.insertOutgoingPathBase(),
                            this._finishTransaction(),
                            this._commitChanges()),
                        this._setCursorForPosition(GCursor.PenStart));
                }),
                (GPathsGraphTool.prototype._enterAction = function () {
                    this._released &&
                        (this._checkMode(),
                        this._graphEditor && (this._graphEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Off), this._commitChanges()),
                        this._manager.activateSubSelect());
                }),
                (GPathsGraphTool.prototype._constrainIfNeeded = function (position, transform, pathBase, referencePoint) {
                    var result = position;
                    if (GSystem.modifiers.shiftKey) {
                        var anchor = null;
                        (referencePoint
                            ? (anchor = referencePoint)
                            : pathBase &&
                              (anchor = this._mode == GPathsGraphTool.Mode.Append ? pathBase.getAnchorPoints().getLastChild() : pathBase.getAnchorPoints().getFirstChild()),
                            anchor && (result = this._graphEditor.constrainPosition(position, transform, anchor)));
                    }
                    return result;
                }),
                (GPathsGraphTool.prototype._makePointMajor = function (point) {
                    (this._graphEditor.selectOnePoint(point),
                        (this._dpathRef = null),
                        this._graphEditor.releasePreview(),
                        this._graphEditor.requestInvalidation(),
                        (this._dpathRef = this._graphEditor.getPathBasePreview(point)));
                }),
                (GPathsGraphTool.prototype._startTransaction = function (transactionType) {
                    (this._transactionType == GPathsGraphTool.Transaction.NoTransaction && this._editor.beginTransaction(), (this._transactionType = transactionType));
                }),
                (GPathsGraphTool.prototype._finishTransaction = function () {
                    try {
                        switch (this._transactionType) {
                            case GPathsGraphTool.Transaction.AppendPoint:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathsGraphTool", "action.append-point")));
                                break;
                            case GPathsGraphTool.Transaction.InsertElement:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathsGraphTool", "action.insert-elements")));
                                break;
                            case GPathsGraphTool.Transaction.InsertPoint:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathsGraphTool", "action.insert-point")));
                                break;
                            case GPathsGraphTool.Transaction.MovePoint:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathsGraphTool", "action.move-point")));
                                break;
                            case GPathsGraphTool.Transaction.DeletePoint:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathsGraphTool", "action.delete-point")));
                                break;
                            case GPathsGraphTool.Transaction.ModifyPointProperties:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathsGraphTool", "action.modify-point-properties")));
                                break;
                            case GPathsGraphTool.Transaction.ModifyPathProperties:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathsGraphTool", "action.modify-path-properties")));
                        }
                    } finally {
                        this._transactionType = GPathsGraphTool.Transaction.NoTransaction;
                    }
                }),
                (GPathsGraphTool.prototype._isSegmentMiddle = function (partInfo) {
                    return partInfo.data.type == GPathsGraphEditor.SegmentData.HitRes && partInfo.data.hitRes.outline && 0.5 === partInfo.data.hitRes.slope;
                }),
                (GPathsGraphTool.prototype._mouseDownOnEdit = function (event, t) {
                    var position = event.client;
                    if (this._graphEditor.getElement().getWorkspace()) {
                        (this._graphEditor.requestInvalidation(),
                            this._graphEditor.releasePreview(),
                            this._graphEditor.requestInvalidation());
                        var anchor = null,
                            partInfo = this._getPartInfo(position);
                        if (
                            (partInfo &&
                                ((this._graphEditor = partInfo.editor),
                                (this._graphRef = this._graphEditor.getGraph()),
                                partInfo.id.type == GPathsGraphEditor.PartType.Anchor
                                    ? (anchor = partInfo.id.point)
                                    : (this._transactionType == GPathsGraphTool.Transaction.NoTransaction &&
                                          this._startTransaction(GPathsGraphTool.Transaction.InsertPoint),
                                      (anchor = this._graphEditor.splitEdge(partInfo)),
                                      this._finishTransaction())),
                            anchor)
                        ) {
                            var point = anchor.getPoint(),
                                newPoint = this._constructNewPoint(event, point);
                            ((this._pathBaseRef = new GPathBase()),
                                this._pathBaseRef.setProperty("fpt", null),
                                this._pathBaseRef.getAnchorPoints().appendChild(newPoint),
                                this._pathBaseRef.setFlag(GNode.Flag.Selected),
                                this._graphEditor.setOutgoingPathBase(anchor, this._pathBaseRef),
                                this._graphEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.End),
                                this._graphEditor.selectOnePoint(newPoint),
                                this._renewPreviewLink(),
                                (this._mode = GPathsGraphTool.Mode.Append),
                                (this._editPt = this._dpathRef.getAnchorPoints().getLastChild()),
                                (this._mouseDownPartInfo = partInfo));
                        } else
                            (this._setCursorForPosition(GCursor.PenStart),
                                this._graphEditor.updatePartSelection(false),
                                (this._pathBaseRef = null),
                                this._renewPreviewLink(),
                                (this._mode = GPathsGraphTool.Mode.Append));
                    }
                }),
                (GPathsGraphTool.prototype._mouseNoDragReleaseOnEdit = function (position) {
                    this._refPt &&
                        ((null == this._refPt.getProperty("hlx") &&
                            null == this._refPt.getProperty("hly") &&
                            null == this._refPt.getProperty("hrx") &&
                            null == this._refPt.getProperty("hry")) ||
                            (this._transactionType == GPathsGraphTool.Transaction.NoTransaction &&
                                this._startTransaction(GPathsGraphTool.Transaction.ModifyPointProperties),
                            this._refPt.setProperties(["ah", "hlx", "hly", "hrx", "hry"], [false, null, null, null, null]),
                            this._finishTransaction(),
                            this._makePointMajor(this._refPt),
                            this._setCursorForPosition(GCursor.PenMinus)),
                        (this._refPt = null),
                        this._commitChanges());
                }),
                (GPathsGraphTool.prototype._setCursorForPosition = function (cursorOverride, position) {
                    if (null !== cursorOverride) this._cursor = cursorOverride;
                    else if (position)
                        if ((this._graphEditor || this._checkPathsGraphEditor(), this._graphEditor)) {
                            var partInfo = this._getPartInfo(position);
                            this._mode == GPathsGraphTool.Mode.Edit
                                ? partInfo
                                    ? partInfo.id.type == GPathsGraphEditor.PartType.Anchor
                                        ? (this._cursor = GCursor.PenEnd)
                                        : partInfo.id.type == GPathsGraphEditor.PartType.Point
                                          ? (this._cursor = GCursor.PenModify)
                                          : (this._cursor = GCursor.PenPlus)
                                    : (this._cursor = GCursor.PenStart)
                                : partInfo
                                  ? partInfo.id.type == GPathsGraphEditor.PartType.Anchor
                                      ? (this._cursor = GCursor.PenEnd)
                                      : partInfo.id.type == GPathsGraphEditor.PartType.Point
                                        ? (this._cursor = GCursor.PenModify)
                                        : (this._cursor = GCursor.PenPlus)
                                  : (this._cursor = GCursor.Pen);
                        } else this._cursor = GCursor.PenStart;
                    this.updateCursor();
                }),
                (GPathsGraphTool.prototype._getPartInfo = function (position) {
                    var partInfo = null;
                    return (
                        this._graphEditor &&
                            (this._cached && this._cached.point == position
                                ? (partInfo = this._cached.partInfo)
                                : ((partInfo = this._graphEditor.getPartInfoAt(
                                      position,
                                      this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                      null,
                                      editorOptions.pickDistance
                                  )) &&
                                      partInfo.id.type == GPathsGraphEditor.PartType.Facet &&
                                      (partInfo = null),
                                  (this._cached = {
                                      point: position,
                                      partInfo: partInfo,
                                  }))),
                        partInfo
                    );
                }),
                (GPathsGraphTool.prototype.toString = function () {
                    return "[Object GPathsGraphTool]";
                }),
                (module.exports = GPathsGraphTool));
        };
