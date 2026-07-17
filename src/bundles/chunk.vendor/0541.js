module.exports = function (module, exports, require) {
            var GSystem = require(64),
                modifiersChangedEvent = require(150),
                GGuide = require(99),
                GNode = require(2),
                IsFiniteNonNegativeNumber = require(0),
                GPathEditor = require(127),
                GCursor = require(52),
                GPathBase = require(45),
                GElementEditor = require(36),
                GMouseEvent = require(77),
                GPoint = require(5),
                editorOptions = require(24),
                GCompoundPathEditor = require(235),
                GItemTool = require(332),
                GPath = require(60),
                GKeyEvent = require(167),
                GKey = require(164),
                GBaseEditor = require(39),
                AnnotationPaint = require(81),
                GRGBColor = require(17),
                GMath = require(12),
                GElement = require(22),
                GEditor = require(82),
                GPathBaseEditor = require(155),
                String = require(9),
                GLocaleKey = require(47);

            function GPathTool() {
                GItemTool.call(this);
            }
            (IsFiniteNonNegativeNumber.inherit(GPathTool, GItemTool),
                (GPathTool.prototype._getRelatedItemClass = function () {
                    return GPath;
                }),
                (GPathTool.prototype._pathRef = null),
                (GPathTool.prototype._dpathRef = null),
                (GPathTool.prototype._newPoint = null),
                (GPathTool.prototype._editPt = null),
                (GPathTool.prototype._refPt = null),
                (GPathTool.prototype._pathEditor = null),
                (GPathTool.prototype._compoundPathEditor = null),
                (GPathTool.prototype._released = true),
                (GPathTool.prototype._dragStarted = false),
                (GPathTool.prototype._dragStartPt = null),
                (GPathTool.prototype._firstAlt = false),
                (GPathTool.Transaction = {
                    NoTransaction: 0,
                    InsertPoint: 1,
                    AppendPoint: 2,
                    MovePoint: 3,
                    DeletePoint: 4,
                    ModifyPointProperties: 5,
                    ModifyPathProperties: 6,
                    InsertElement: 7,
                    JoinPaths: 8,
                }),
                (GPathTool.prototype._transactionType = GPathTool.Transaction.NoTransaction),
                (GPathTool.Mode = {
                    Append: 0,
                    Prepend: 1,
                    Edit: 2,
                }),
                (GPathTool.prototype._mode = GPathTool.Mode.Append),
                (GPathTool.prototype._mDownTime = 0),
                Object.defineProperty(GPathTool, "DBLCLICKTM", {
                    get: function () {
                        return editorOptions.pathDbClickTime || 300;
                    },
                }),
                (GPathTool.prototype._cursor = null),
                (GPathTool.prototype._lastMouseEvent = null),
                (GPathTool.prototype._deactivationAllowed = true),
                (GPathTool.prototype._cached = null),
                (GPathTool.prototype._sideConnectPoints = null),
                (GPathTool.prototype.getCursor = function () {
                    return this._cursor;
                }),
                (GPathTool.prototype.catchesContextMenu = function (e) {
                    return !e;
                }),
                (GPathTool.prototype.activate = function (view, temporary) {
                    (GItemTool.prototype.activate.call(this, view, temporary),
                        temporary ||
                            (view.addEventListener(GMouseEvent.Down, this._mouseDown, this),
                            view.addEventListener(GMouseEvent.Release, this._mouseRelease, this),
                            view.addEventListener(GKeyEvent.Down, this._keyDown, this),
                            GSystem.addEventListener(modifiersChangedEvent, this._modifiersChanged, this),
                            this._editor.addEventListener(GEditor.MODIFIED_EVENT, this._sceneModified, this)),
                        (this._cursor = GCursor.PenStart),
                        (this._transactionType = GPathTool.Transaction.NoTransaction),
                        this._editor.setPathResize(false, true),
                        this._initialSelectCorrection(),
                        this._findSideConnectPoints(),
                        (this._lightDeactivationHandled = false));
                }),
                (GPathTool.prototype.deactivate = function (view, temporary) {
                    (this._pathEditor &&
                        this._pathEditor instanceof GPathEditor &&
                        !temporary &&
                        this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Off),
                        this._pathEditor &&
                            (this._newPoint || this._dpathRef) &&
                            (this._pathEditor.requestInvalidation(),
                            this._pathEditor.releasePathPreview(),
                            this._pathEditor.requestInvalidation()),
                        this._finishTransaction(),
                        this._allowDeactivation(),
                        this._reset(),
                        this._editor &&
                            (this._editor.getGuides().invalidate(),
                            this._editor.removeEventListener(GEditor.MODIFIED_EVENT, this._sceneModified),
                            temporary || this._lightDeactivationHandled || this._editor.setPathResize(true)),
                        GItemTool.prototype.deactivate.call(this, view, temporary),
                        view.removeEventListener(GMouseEvent.Down, this._mouseDown),
                        view.removeEventListener(GMouseEvent.Release, this._mouseRelease),
                        view.removeEventListener(GKeyEvent.Down, this._keyDown),
                        GSystem.removeEventListener(modifiersChangedEvent, this._modifiersChanged),
                        (this._lightDeactivationHandled = temporary));
                }),
                (GPathTool.prototype.isDeactivatable = function () {
                    return this._deactivationAllowed;
                }),
                (GPathTool.prototype.paint = function (context) {
                    if (this._cached && this._cached.middlePoint) {
                        var centerHandleConfig = editorOptions.annotationHandles.path.center;
                        AnnotationPaint.paintAnnotation(
                            context,
                            this._view.getWorldTransform(this._view.getScene().getActivePage()),
                            this._cached.middlePoint,
                            centerHandleConfig.type,
                            false,
                            centerHandleConfig.size,
                            GRGBColor.WHITE,
                            context.annotationColor
                        );
                    }
                }),
                (GPathTool.prototype._allowDeactivation = function () {
                    this._deactivationAllowed = true;
                }),
                (GPathTool.prototype._blockDeactivation = function () {
                    this._deactivationAllowed = false;
                }),
                (GPathTool.prototype._checkPathEditor = function () {
                    var pathSelection = this._editor.getPathSelection();
                    pathSelection &&
                        ((this._pathEditor = GElementEditor.openEditor(pathSelection)),
                        this._pathEditor.setFlag(GBaseEditor.Flag.Detail),
                        this._pathEditor instanceof GCompoundPathEditor ? (this._compoundPathEditor = this._pathEditor) : (this._compoundPathEditor = null));
                }),
                (GPathTool.prototype._checkMode = function () {
                    if ((this._checkPathEditor(), this._pathEditor))
                        if (this._compoundPathEditor)
                            ((this._mode = GPathTool.Mode.Edit),
                                this._compoundPathEditor.getElement().getWorkspace() ||
                                    (this._pathRef = this._compoundPathEditor = this._pathEditor = null));
                        else if (this._pathEditor.getPath().getWorkspace())
                            if (((this._pathRef = this._pathEditor.getPath()), this._pathRef.getProperty("closed")))
                                this._mode = GPathTool.Mode.Edit;
                            else {
                                var selectionType = this._pathEditor.getPointsSelectionType();
                                selectionType == GPathEditor.PointsSelectionType.No || selectionType == GPathEditor.PointsSelectionType.Several || selectionType == GPathEditor.PointsSelectionType.Middle
                                    ? (this._mode = GPathTool.Mode.Edit)
                                    : selectionType == GPathEditor.PointsSelectionType.Last
                                      ? (this._mode = GPathTool.Mode.Append)
                                      : selectionType == GPathEditor.PointsSelectionType.First && (this._mode = GPathTool.Mode.Prepend);
                            }
                        else ((this._mode = GPathTool.Mode.Append), (this._pathRef = this._compoundPathEditor = this._pathEditor = null));
                    else ((this._mode = GPathTool.Mode.Append), (this._pathRef = null));
                }),
                (GPathTool.prototype._initialSelectCorrection = function () {
                    if ((this._checkPathEditor(), this._pathEditor && this._pathEditor instanceof GPathEditor))
                        if (((this._pathRef = this._pathEditor.getPath()), this._pathRef.getProperty("closed")))
                            this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Off);
                        else if (this._pathEditor.getActiveExtendingMode()) {
                            var selectionType = this._pathEditor.getPointsSelectionType();
                            (selectionType != GPathEditor.PointsSelectionType.Last &&
                                selectionType != GPathEditor.PointsSelectionType.First &&
                                this._pathEditor.selectOnePoint(
                                    this._pathEditor.getActiveExtendingMode() == GPathBaseEditor.ExtendingMode.Beginning
                                        ? this._pathRef.getAnchorPoints().getFirstChild()
                                        : this._pathRef.getAnchorPoints().getLastChild()
                                ),
                                (this._cursor = GCursor.Pen));
                        }
                }),
                (GPathTool.prototype._renewPreviewLink = function () {
                    this._pathEditor ? (this._dpathRef = this._pathEditor.getPathPreview()) : (this._dpathRef = null);
                }),
                (GPathTool.prototype._updatePoint = function (point) {
                    var resultPoint = null;
                    return (
                        this._pathRef &&
                            this._editPt &&
                            ((resultPoint =
                                this._mode != GPathTool.Mode.Edit
                                    ? this._constrainIfNeeded(
                                          point,
                                          this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                          this._pathRef
                                      )
                                    : this._constrainIfNeeded(
                                          point,
                                          this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                          this._pathRef,
                                          this._dpathRef.getAnchorPoints().getPreviousPoint(this._editPt)
                                      )),
                            this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                            (resultPoint = this._view
                                .getWorldTransform(this._view.getScene().getActivePage())
                                .mapPoint(
                                    this._editor
                                        .getGuides()
                                        .mapPoint(
                                            this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(resultPoint),
                                            GGuide.DetailMap.Mode.DetailOnFilterOn
                                        )
                                )),
                            this._editor.getGuides().finishMap(),
                            this._pathEditor.movePoint(
                                this._editPt,
                                resultPoint,
                                this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                this._dragStartPt
                            )),
                        resultPoint
                    );
                }),
                (GPathTool.prototype._addPoint = function (point, preview, skipTransform, noSelect) {
                    if (this._pathEditor && !skipTransform) {
                        var transform = this._pathRef && this._pathRef.getTransform();
                        if (transform) {
                            var localPoint = new GPoint(point.getProperty("x"), point.getProperty("y"));
                            ((localPoint = transform.inverted().mapPoint(localPoint)), point.setProperties(["x", "y"], [localPoint.getX(), localPoint.getY()]));
                        }
                    }
                    preview
                        ? this._pathEditor
                            ? (this._pathEditor.requestInvalidation(),
                              this._mode == GPathTool.Mode.Append
                                  ? (noSelect || this._dpathRef.getAnchorPoints().getLastChild().removeFlag(GNode.Flag.Selected),
                                    this._dpathRef.getAnchorPoints().appendChild(point),
                                    noSelect || point.setFlag(GNode.Flag.Selected),
                                    (this._editPt = this._dpathRef.getAnchorPoints().getLastChild()),
                                    (this._newPoint = true),
                                    this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.End))
                                  : this._mode == GPathTool.Mode.Prepend &&
                                    (noSelect || this._dpathRef.getAnchorPoints().getFirstChild().removeFlag(GNode.Flag.Selected),
                                    this._dpathRef.getAnchorPoints().insertChild(point, this._dpathRef.getAnchorPoints().getFirstChild()),
                                    noSelect || point.setFlag(GNode.Flag.Selected),
                                    this._pathEditor.shiftPreviewTable(1),
                                    (this._editPt = this._dpathRef.getAnchorPoints().getFirstChild()),
                                    (this._newPoint = true),
                                    this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Beginning)),
                              this._pathEditor.requestInvalidation())
                            : (this._startTransaction(GPathTool.Transaction.InsertElement),
                              this._createAndAppendPath(point),
                              this._pathEditor
                                  ? (this._findSideConnectPoints(),
                                    this._pathEditor.selectOnePoint(point),
                                    this._checkMode(),
                                    this._renewPreviewLink(),
                                    (this._editPt = this._dpathRef.getAnchorPoints().getLastChild()),
                                    this._pathEditor.requestInvalidation(),
                                    this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.End))
                                  : this._finishTransaction())
                        : this._pathEditor
                          ? (this._pathEditor.requestInvalidation(),
                            this._mode == GPathTool.Mode.Append
                                ? (this._dpathRef &&
                                      (this._dpathRef.getAnchorPoints().removeChild(point),
                                      (this._dpathRef = null),
                                      point.hasFlag(GNode.Flag.Selected) && point.removeFlag(GNode.Flag.Selected)),
                                  this._pathEditor.releasePathPreview(),
                                  this._pathEditor.requestInvalidation(),
                                  this._startTransaction(GPathTool.Transaction.AppendPoint),
                                  this._pathRef.getAnchorPoints().appendChild(point),
                                  this._pathEditor.selectOnePoint(point),
                                  this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.End))
                                : this._mode == GPathTool.Mode.Prepend &&
                                  (this._dpathRef &&
                                      (this._dpathRef.getAnchorPoints().removeChild(point),
                                      (this._dpathRef = null),
                                      point.hasFlag(GNode.Flag.Selected) && point.removeFlag(GNode.Flag.Selected)),
                                  this._pathEditor.releasePathPreview(),
                                  this._pathEditor.requestInvalidation(),
                                  this._startTransaction(GPathTool.Transaction.AppendPoint),
                                  this._pathRef.getAnchorPoints().insertChild(point, this._pathRef.getAnchorPoints().getFirstChild()),
                                  this._pathEditor.selectOnePoint(point),
                                  this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Beginning)),
                            this._pathEditor.requestInvalidation())
                          : (this._startTransaction(GPathTool.Transaction.InsertElement),
                            this._createAndAppendPath(point),
                            this._findSideConnectPoints(),
                            this._pathEditor.selectOnePoint(point),
                            this._checkMode(),
                            this._renewPreviewLink(),
                            this._pathEditor.requestInvalidation(),
                            this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.End));
                }),
                (GPathTool.prototype._commitChanges = function () {
                    (this._pathEditor.requestInvalidation(),
                        this._pathEditor.releasePathPreview(),
                        this._pathEditor.requestInvalidation(),
                        this._reset());
                }),
                (GPathTool.prototype._createAndAppendPath = function (point) {
                    var pagePoint = new GPoint(point.$x, point.$y),
                        oldPage = this._view.getScene().getActivePage(),
                        viewPoint = this._view.getWorldTransform(oldPage).mapPoint(pagePoint);
                    this._editor.updateByMousePosition(viewPoint, this._view.getWorldTransform(this._scene), false, this._view.getViewConfiguration());
                    var newPage = this._view.getScene().getActivePage();
                    oldPage !== newPage && ((pagePoint = this._view.getViewTransform(newPage).mapPoint(viewPoint)), point.setProperties(["x", "y"], [pagePoint.getX(), pagePoint.getY()]));
                    var path = new (this._getRelatedItemClass())();
                    (path.getAnchorPoints().appendChild(point),
                        path.setFlag(GNode.Flag.Selected),
                        this._editor.insertElements([path], false, true, true),
                        point.setFlag(GNode.Flag.Selected),
                        this._checkPathEditor());
                }),
                (GPathTool.prototype._mouseDown = function (event) {
                    ((this._released = false), this._pathEditor && this._pathEditor.blockRemoval());
                }),
                (GPathTool.prototype._mouseDblClick = function (event) {
                    ((this._lastMouseEvent = null),
                        this._checkMode(),
                        this._pathEditor &&
                            (this._pathEditor.updatePartSelection(false),
                            this._pathEditor instanceof GPathEditor && this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Off),
                            this._commitChanges()),
                        (this._mode = GPathTool.Mode.Edit),
                        this._setCursorForPosition(null, event.client));
                }),
                (GPathTool.prototype._mouseRelease = function (event) {
                    ((this._released = true),
                        (this._dragStarted = false),
                        (this._dragStartPt = null),
                        this._pathEditor && this._pathEditor.allowRemoval(),
                        this._editor.getGuides().invalidate());
                }),
                (GPathTool.prototype._mouseMove = function (event) {}),
                (GPathTool.prototype._reset = function () {
                    if (
                        (this._compoundPathEditor
                            ? this._compoundPathEditor.removeFlag(GBaseEditor.Flag.Detail)
                            : this._pathEditor && this._pathEditor.removeFlag(GBaseEditor.Flag.Detail),
                        (this._dpathRef = null),
                        (this._pathRef = null),
                        (this._pathEditor = null),
                        (this._newPoint = false),
                        (this._editPt = null),
                        (this._dragStartPt = null),
                        (this._refPt = null),
                        (this._compoundPathEditor = null),
                        this._cached)
                    ) {
                        var rect = this._getPaintRect();
                        ((this._cached = null), rect && this.invalidateArea(rect));
                    }
                }),
                (GPathTool.prototype._keyDown = function (event) {
                    (GItemTool.prototype._keyDown.call(this, event),
                        event.key === GKey.Constant.ESC
                            ? ((this._lastMouseEvent = null), this._escAction())
                            : event.key === GKey.Constant.ENTER && ((this._lastMouseEvent = null), this._enterAction()));
                }),
                (GPathTool.prototype._modifiersChanged = function (event) {
                    event.changed.shiftKey && this._lastMouseEvent
                        ? this._released
                            ? this._mouseMove(this._lastMouseEvent)
                            : this._mouseDrag(this._lastMouseEvent)
                        : event.changed.optionKey &&
                          ((this._firstAlt = false),
                          this._released ||
                              (GSystem.modifiers.optionKey && (this._firstAlt = !this._dragStarted),
                              this._lastMouseEvent && this._mouseDrag(this._lastMouseEvent)));
                }),
                (GPathTool.prototype._escAction = function () {
                    this._released &&
                        (this._checkMode(),
                        this._pathEditor &&
                            (this._pathEditor.updatePartSelection(false),
                            this._pathEditor instanceof GPathEditor &&
                                (this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Off),
                                this._pathRef && this._pathRef.removeFlag(GNode.Flag.Selected)),
                            this._commitChanges()),
                        this._setCursorForPosition(GCursor.PenStart),
                        this._manager.notifyJobDone(this));
                }),
                (GPathTool.prototype._enterAction = function () {
                    this._released &&
                        (this._checkMode(),
                        this._pathEditor &&
                            (this._pathEditor instanceof GPathEditor && this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Off),
                            this._commitChanges()),
                        this._manager.activateSubSelect());
                }),
                (GPathTool.prototype._constrainIfNeeded = function (point, transform, path, referencePoint) {
                    var result = point;
                    if (GSystem.modifiers.shiftKey) {
                        var anchor = null;
                        (referencePoint
                            ? (anchor = referencePoint)
                            : path &&
                              (this._mode == GPathTool.Mode.Append
                                  ? (anchor = path.getAnchorPoints().getLastChild())
                                  : this._mode == GPathTool.Mode.Prepend && (anchor = path.getAnchorPoints().getFirstChild())),
                            anchor && (result = this._pathEditor.constrainPosition(point, transform, anchor)));
                    }
                    return result;
                }),
                (GPathTool.prototype._makePointMajor = function (point) {
                    (this._compoundPathEditor &&
                        (this._compoundPathEditor.updatePartSelection(false),
                        this._compoundPathEditor.releasePathPreview(),
                        this._compoundPathEditor.requestInvalidation()),
                        this._pathEditor.selectOnePoint(point),
                        (this._dpathRef = null),
                        this._pathEditor.releasePathPreview(),
                        this._pathEditor.requestInvalidation(),
                        (this._dpathRef = this._pathEditor.getPathPreview(false, point)));
                }),
                (GPathTool.prototype._startTransaction = function (transactionType) {
                    (this._transactionType == GPathTool.Transaction.NoTransaction && this._editor.beginTransaction(), (this._transactionType = transactionType));
                }),
                (GPathTool.prototype._finishTransaction = function () {
                    try {
                        switch (this._transactionType) {
                            case GPathTool.Transaction.AppendPoint:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathTool", "action.append-point")));
                                break;
                            case GPathTool.Transaction.InsertElement:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathTool", "action.insert-elements")));
                                break;
                            case GPathTool.Transaction.InsertPoint:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathTool", "action.insert-point")));
                                break;
                            case GPathTool.Transaction.MovePoint:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathTool", "action.move-point")));
                                break;
                            case GPathTool.Transaction.DeletePoint:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathTool", "action.delete-point")));
                                break;
                            case GPathTool.Transaction.ModifyPointProperties:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathTool", "action.modify-point-properties")));
                                break;
                            case GPathTool.Transaction.ModifyPathProperties:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathTool", "action.modify-path-properties")));
                                break;
                            case GPathTool.Transaction.JoinPaths:
                                this._editor.commitTransaction(String.get(new GLocaleKey("GPathTool", "action.join-paths")));
                        }
                    } finally {
                        this._transactionType = GPathTool.Transaction.NoTransaction;
                    }
                }),
                (GPathTool.prototype._isSegmentMiddle = function (partInfo) {
                    return partInfo.data.type == GPathEditor.SegmentData.HitRes && partInfo.data.hitRes.outline && 0.5 === partInfo.data.hitRes.slope;
                }),
                (GPathTool.prototype._mouseDownOnEdit = function (event, callback) {
                    var position = event.client;
                    if (this._pathEditor && this._pathEditor.getElement().getWorkspace()) {
                        (this._pathEditor.requestInvalidation(),
                            this._pathEditor.releasePathPreview(),
                            this._pathEditor.requestInvalidation());
                        var partInfo = this._getPartInfo(position);
                        if (
                            (partInfo && ((this._pathEditor = partInfo.editor), (this._pathRef = this._pathEditor.getPath())),
                            partInfo && partInfo.id.type == GPathEditor.PartType.Point)
                        ) {
                            var point = partInfo.id.point;
                            this._pathRef.getProperty("closed") || point !== this._pathRef.getAnchorPoints().getLastChild()
                                ? this._pathRef.getProperty("closed") || point !== this._pathRef.getAnchorPoints().getFirstChild()
                                    ? ((this._refPt = point),
                                      (null !== this._refPt.getProperty("hlx") && null !== this._refPt.getProperty("hly")) ||
                                      (null !== this._refPt.getProperty("hrx") && null !== this._refPt.getProperty("hry"))
                                          ? this._setCursorForPosition(GCursor.PenModify)
                                          : this._setCursorForPosition(GCursor.PenMinus))
                                    : ((this._mode = GPathTool.Mode.Prepend), this._makePointMajor(point))
                                : ((this._mode = GPathTool.Mode.Append), this._makePointMajor(point));
                        } else if (partInfo && partInfo.id.type == GPathEditor.PartType.Segment && partInfo.data.type == GPathEditor.SegmentData.HitRes) {
                            if (GSystem.modifiers.shiftKey && this._cached && this._cached.middlePoint) {
                                partInfo.data.hitRes.slope = 0.5;
                                var rect = this._getPaintRect();
                                ((this._cached = null), this.invalidateArea(rect));
                            }
                            if (
                                (this._isSegmentMiddle(partInfo)
                                    ? this._setCursorForPosition(GCursor.PenPlusMiddle)
                                    : this._setCursorForPosition(GCursor.PenPlus),
                                this._startTransaction(GPathTool.Transaction.InsertPoint),
                                (point = this._pathRef.insertHitPoint(partInfo.data.hitRes)))
                            ) {
                                if (event.button == GMouseEvent.BUTTON_RIGHT && GSystem.modifiers.optionKey)
                                    point.getProperty("tp") == GPathBase.AnchorPoint.Type.Asymmetric &&
                                        point.setProperty("tp", GPathBase.AnchorPoint.Type.Connector);
                                (callback && callback(point),
                                    this._makePointMajor(point),
                                    (this._refPt = point),
                                    (this._editPt = this._pathEditor.getPathPointPreview(point)),
                                    this._pathEditor.requestInvalidation(),
                                    (this._mode = GPathTool.Mode.Edit));
                            } else (this._finishTransaction(), this._reset(), (this._mode = GPathTool.Mode.Append));
                        } else
                            (this._setCursorForPosition(GCursor.PenStart),
                                this._pathEditor.updatePartSelection(false),
                                this._commitChanges(),
                                (this._mode = GPathTool.Mode.Append));
                    }
                }),
                (GPathTool.prototype._mouseNoDragReleaseOnEdit = function (position) {
                    this._refPt &&
                        (null != this._refPt.getProperty("hlx") ||
                        null != this._refPt.getProperty("hly") ||
                        null != this._refPt.getProperty("hrx") ||
                        null != this._refPt.getProperty("hry")
                            ? (this._transactionType == GPathTool.Transaction.NoTransaction &&
                                  this._startTransaction(GPathTool.Transaction.ModifyPointProperties),
                              this._refPt.setProperties(["ah", "hlx", "hly", "hrx", "hry"], [false, null, null, null, null]),
                              this._makePointMajor(this._refPt),
                              this._setCursorForPosition(GCursor.PenMinus))
                            : (this._pathRef.getAnchorPoints().getFirstChild() != this._pathRef.getAnchorPoints().getLastChild() &&
                                  (this._transactionType == GPathTool.Transaction.NoTransaction
                                      ? this._startTransaction(GPathTool.Transaction.DeletePoint)
                                      : (this._transactionType = GPathTool.Transaction.DeletePoint),
                                  this._pathRef.getAnchorPoints().removeChild(this._refPt)),
                              this._setCursorForPosition(null, position)),
                        (this._refPt = null),
                        this._commitChanges());
                }),
                (GPathTool.prototype._setCursorForPosition = function (cursor, position) {
                    if (null !== cursor) this._cursor = cursor;
                    else if (position)
                        if ((this._pathEditor || this._checkPathEditor(), this._pathEditor)) {
                            var partInfo = this._getPartInfo(position);
                            if (partInfo && partInfo.id.type == GPathEditor.PartType.Point) {
                                var point = partInfo.id.point,
                                    path = partInfo.editor.getPath();
                                path.getProperty("closed") ||
                                (point !== path.getAnchorPoints().getFirstChild() && point !== path.getAnchorPoints().getLastChild())
                                    ? this._mode == GPathTool.Mode.Edit
                                        ? (null !== point.getProperty("hlx") && null !== point.getProperty("hly")) ||
                                          (null !== point.getProperty("hrx") && null !== point.getProperty("hry"))
                                            ? (this._cursor = GCursor.PenModify)
                                            : (this._cursor = GCursor.PenMinus)
                                        : (this._cursor = GCursor.Pen)
                                    : (this._mode == GPathTool.Mode.Append && point === path.getAnchorPoints().getFirstChild()) ||
                                        (this._mode == GPathTool.Mode.Prepend && point === path.getAnchorPoints().getLastChild())
                                      ? (this._cursor = GCursor.PenEnd)
                                      : (this._mode == GPathTool.Mode.Append && point === path.getAnchorPoints().getLastChild()) ||
                                          (this._mode == GPathTool.Mode.Prepend && point === path.getAnchorPoints().getFirstChild())
                                        ? (this._cursor = GCursor.PenModify)
                                        : (this._cursor = GCursor.Pen);
                            } else
                                this._mode == GPathTool.Mode.Edit
                                    ? partInfo && partInfo.id.type == GPathEditor.PartType.Segment
                                        ? GSystem.modifiers.shiftKey || this._isSegmentMiddle(partInfo)
                                            ? (this._cursor = GCursor.PenPlusMiddle)
                                            : (this._cursor = GCursor.PenPlus)
                                        : (this._cursor = GCursor.PenStart)
                                    : (this._cursor = GCursor.Pen);
                        } else this._cursor = GCursor.PenStart;
                    else this._cursor = GCursor.PenStart;
                    this.updateCursor();
                }),
                (GPathTool.prototype._getPartInfo = function (position) {
                    var partInfo = null;
                    if (this._pathEditor)
                        if (this._cached && this._cached.point == position) {
                            if (((partInfo = this._cached.partInfo), !GSystem.modifiers.shiftKey && this._cached.middlePoint)) {
                                var rect = this._getPaintRect();
                                ((this._cached.middlePoint = null), (this._cached.segmentNo = null), this.invalidateArea(rect));
                            }
                        } else {
                            partInfo = this._pathEditor.getPartInfoAt(
                                position,
                                this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                null,
                                editorOptions.pickDistance
                            );
                            var middlePoint = null,
                                segmentNo = null;
                            (this._cached &&
                            null !== this._cached.segmentNo &&
                            GSystem.modifiers.shiftKey &&
                            (!partInfo ||
                                (partInfo.id.type == GPathEditor.PartType.Segment &&
                                    partInfo.data.type == GPathEditor.SegmentData.HitRes &&
                                    partInfo.data.hitRes.outline &&
                                    partInfo.data.hitRes.segment === this._cached.segmentNo))
                                ? ((segmentNo = this._cached.segmentNo), (middlePoint = this._cached.middlePoint))
                                : this._cached && this._cached.middlePoint && this.invalidateArea(this._getPaintRect()),
                                (this._cached = {
                                    point: position,
                                    partInfo: partInfo,
                                    segmentNo: segmentNo,
                                    middlePoint: middlePoint,
                                }));
                        }
                    return partInfo;
                }),
                (GPathTool.prototype._highlightMiddle = function (position) {
                    if (this._pathEditor) {
                        var partInfo = this._getPartInfo(position);
                        if (
                            !this._cached.middlePoint &&
                            partInfo &&
                            partInfo.id.type == GPathEditor.PartType.Segment &&
                            partInfo.data.type == GPathEditor.SegmentData.HitRes &&
                            partInfo.data.hitRes.outline
                        ) {
                            var middlePoint = partInfo.editor.getElement().getSegmentMiddle(partInfo.data.hitRes.segment);
                            middlePoint &&
                                ((this._cached.segmentNo = partInfo.data.hitRes.segment),
                                (this._cached.middlePoint = middlePoint),
                                this.invalidateArea(this._getPaintRect()));
                        }
                    }
                }),
                (GPathTool.prototype._getPaintRect = function () {
                    if (this._cached && this._cached.middlePoint) {
                        var centerHandleConfig = editorOptions.annotationHandles.path.center;
                        return AnnotationPaint.getAnnotationBBox(
                            this._view.getWorldTransform(this._view.getScene().getActivePage()),
                            this._cached.middlePoint,
                            centerHandleConfig.size,
                            true
                        );
                    }
                    return null;
                }),
                (GPathTool.prototype._sceneModified = function (event) {
                    this._findSideConnectPoints();
                }),
                (GPathTool.prototype._findSideConnectPoints = function () {
                    var activePage = this._scene.getActivePage();
                    ((this._sideConnectPoints = null), this._checkPathEditor());
                    var excludePath = this._pathRef
                        ? this._pathRef
                        : this._pathEditor && this._pathEditor instanceof GPathEditor
                          ? this._pathEditor.getPath()
                          : null;
                    activePage.accept(
                        function (node) {
                            if (node instanceof GPath && !node.hasFlag(GElement.Flag.FullLocked) && !node.getProperty("closed") && node != excludePath) {
                                var anchorPoints = node.getAnchorPoints(),
                                    point = new GPoint(anchorPoints.getFirstChild().getProperty("x"), anchorPoints.getFirstChild().getProperty("y")),
                                    transform = node.getProperty("trf"),
                                    connectPoint = {
                                        node: node,
                                        pt: (point = transform ? transform.mapPoint(point) : point),
                                        end: 1,
                                    };
                                (this._sideConnectPoints ? this._sideConnectPoints.push(connectPoint) : (this._sideConnectPoints = [connectPoint]),
                                    anchorPoints.getFirstChild() != anchorPoints.getLastChild() &&
                                        ((point = new GPoint(anchorPoints.getLastChild().getProperty("x"), anchorPoints.getLastChild().getProperty("y"))),
                                        (point = transform ? transform.mapPoint(point) : point),
                                        this._sideConnectPoints.push({
                                            node: node,
                                            pt: point,
                                            end: 2,
                                        })));
                            }
                            return true;
                        }.bind(this),
                        false,
                        true
                    );
                }),
                (GPathTool.prototype._hitSideConnectPoints = function (point) {
                    if (this._sideConnectPoints)
                        for (var t = 0; t < this._sideConnectPoints.length; ++t) {
                            var i = this._sideConnectPoints[t];
                            if (GMath.isEqualEps(i.pt.getX(), point.getX()) && GMath.isEqualEps(i.pt.getY(), point.getY())) return i;
                        }
                    return null;
                }),
                (GPathTool.prototype._connectPaths = function (connectPoint) {
                    if (this._pathRef) {
                        var transform = this._pathRef.getProperty("trf"),
                            nodeTransform = connectPoint.node.getProperty("trf"),
                            combinedTransform = null;
                        if (null != transform || null != nodeTransform) {
                            combinedTransform = nodeTransform || null;
                            var inverseTransform = transform ? transform.inverted() : null;
                            inverseTransform && (combinedTransform = combinedTransform ? combinedTransform.multiplied(inverseTransform) : inverseTransform);
                        }
                        var newPath = new GPath();
                        (newPath.getAnchorPoints().deserialize(connectPoint.node.getAnchorPoints().serialize(combinedTransform)),
                            2 == connectPoint.end && newPath.reverseOrder(),
                            this._pathEditor.requestInvalidation(),
                            this._pathEditor.releasePathPreview(),
                            this._startTransaction(GPathTool.Transaction.JoinPaths),
                            this._pathRef && this._mode == GPathTool.Mode.Prepend && this._pathRef.reverseOrder(),
                            connectPoint.node.getParent().removeChild(connectPoint.node),
                            (this._refPt = null));
                        for (var anchorPoint = newPath.getAnchorPoints().getFirstChild(); null != anchorPoint; anchorPoint = newPath.getAnchorPoints().getFirstChild())
                            (newPath.getAnchorPoints().removeChild(anchorPoint),
                                this._pathRef.getAnchorPoints().appendChild(anchorPoint),
                                this._refPt || (this._refPt = anchorPoint));
                        (this._makePointMajor(this._refPt),
                            this._pathEditor.setActiveExtendingMode(GPathBaseEditor.ExtendingMode.Off),
                            this._finishTransaction(),
                            (this._mode = GPathTool.Mode.Edit),
                            (this._editPt = this._pathEditor.getPathPointPreview(this._refPt)),
                            this._findSideConnectPoints());
                    }
                }),
                (GPathTool.prototype.toString = function () {
                    return "[Object GPathTool]";
                }),
                (module.exports = GPathTool));
        };
