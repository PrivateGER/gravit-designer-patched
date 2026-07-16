module.exports = function (module, exports, require) {
            var n = require(99),
                GPathTool = require(541),
                IsFiniteNonNegativeNumber = require(0),
                a = require(52),
                s = require(77),
                l = require(5),
                h = require(24),
                A = require(60),
                c = require(45),
                p = require(64),
                u = require(155),
                d = require(333);

            function g() {
                GPathTool.call(this);
            }
            (IsFiniteNonNegativeNumber.inheritAndMix(g, GPathTool, [d]),
                (g.prototype.activate = function (e, t) {
                    (GPathTool.prototype.activate.call(this, e, t),
                        t ||
                            (e.addEventListener(s.Drag, this._mouseDrag, this),
                            e.addEventListener(s.Move, this._mouseMove, this),
                            e.addEventListener(s.DragStart, this._mouseDragStart, this),
                            e.addEventListener(s.DragEnd, this._mouseDragEnd, this)),
                        this._checkMode());
                }),
                (g.prototype.deactivate = function (e, t) {
                    (this._checkMode(),
                        GPathTool.prototype.deactivate.call(this, e, t),
                        e.removeEventListener(s.Drag, this._mouseDrag),
                        e.removeEventListener(s.Move, this._mouseMove),
                        e.removeEventListener(s.DragStart, this._mouseDragStart, this),
                        e.removeEventListener(s.DragEnd, this._mouseDragEnd, this));
                }),
                (g.prototype._mouseDragStart = function (e) {
                    this.beginPan();
                }),
                (g.prototype._mouseDragEnd = function (e) {
                    this.endPan();
                }),
                (g.prototype._mouseDown = function (e) {
                    var t = new Date().getTime();
                    if (t - this._mDownTime < GPathTool.DBLCLICKTM)
                        "edit" == h.selectDoubleClickBehavior ? this._manager.notifyJobDone(this) : this._mouseDblClick(e);
                    else {
                        ((this._mDownTime = t), (this._lastMouseEvent = e));
                        var i,
                            o = null;
                        if (
                            (this._editor.updateByMousePosition(
                                e.client,
                                this._view.getWorldTransform(this._scene),
                                false,
                                this._view.getViewConfiguration()
                            ),
                            (this._dragStarted = false),
                            (this._dragStartPt = null),
                            (this._newPoint = null),
                            (this._editPt = null),
                            e.button == s.BUTTON_LEFT || (e.button == s.BUTTON_RIGHT && p.modifiers.optionKey))
                        ) {
                            if (((this._released = false), this._blockDeactivation(), this._checkMode(), this._mode == GPathTool.Mode.Edit)) {
                                this._mouseDownOnEdit(e, function (e) {
                                    p.modifiers.optionKey &&
                                        e.getProperty("tp") != c.AnchorPoint.Type.Connector &&
                                        e.setProperty("tp", c.AnchorPoint.Type.Symmetric);
                                });
                            }
                            var l;
                            if (this._mode != GPathTool.Mode.Edit)
                                if (
                                    (this._renewPreviewLink(),
                                    (i = this._constrainIfNeeded(
                                        e.client,
                                        this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                        this._pathRef
                                    )),
                                    this._pathEditor &&
                                        (l =
                                            this._mode == GPathTool.Mode.Append
                                                ? this._pathRef.getAnchorPoints().getFirstChild()
                                                : this._pathRef.getAnchorPoints().getLastChild()),
                                    l &&
                                        this._pathEditor.hitAnchorPoint(
                                            l,
                                            i,
                                            this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                            h.annotDropDistance
                                        ))
                                )
                                    (this._setCursorForPosition(a.PenEnd),
                                        this._startTransaction(GPathTool.Transaction.ModifyPathProperties),
                                        this._pathRef.setProperty("closed", true),
                                        this._makePointMajor(l),
                                        this._pathEditor.setActiveExtendingMode(u.ExtendingMode.Off),
                                        (this._mode = GPathTool.Mode.Edit),
                                        (this._editPt = this._pathEditor.getPathPointPreview(l)),
                                        this._pathEditor.requestInvalidation());
                                else {
                                    var A = this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(i);
                                    (this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                                        (A = this._editor.getGuides().mapPoint(A, n.DetailMap.Mode.DetailOnFilterOn)),
                                        this._editor.getGuides().finishMap());
                                    var d,
                                        g = this._pathEditor ? this._hitSideConnectPoints(A) : null;
                                    if (g) this._connectPaths(g);
                                    else
                                        (this._setCursorForPosition(a.Pen),
                                            this._pathEditor &&
                                                (d =
                                                    this._mode == GPathTool.Mode.Append
                                                        ? this._pathRef.getAnchorPoints().getLastChild()
                                                        : this._pathRef.getAnchorPoints().getFirstChild()),
                                            d &&
                                            this._pathEditor.hitAnchorPoint(
                                                d,
                                                i,
                                                this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                                h.annotDropDistance
                                            )
                                                ? (this._makePointMajor(d),
                                                  (this._editPt = this._pathEditor.getPathPointPreview(d)),
                                                  this._pathEditor.requestInvalidation())
                                                : ((o = this._constructNewPoint(e, A)), this._addPoint(o, true, false)));
                                }
                            this._pathEditor && this._pathEditor.blockRemoval();
                        }
                    }
                }),
                (g.prototype._mouseMove = function (e) {
                    if (this._released) {
                        this._lastMouseEvent = e;
                        var t = true;
                        if (
                            (this._mode == GPathTool.Mode.Edit &&
                                p.modifiers.shiftKey &&
                                (this._setCursorForPosition(null, e.client),
                                this._cursor == a.PenPlusMiddle && (t = false),
                                this._highlightMiddle(e.client)),
                            t)
                        ) {
                            var i = this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(e.client);
                            if (
                                (this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                                (i = this._editor.getGuides().mapPoint(i, n.DetailMap.Mode.DetailOnFilterOn)),
                                this._editor.getGuides().finishMap(),
                                this._pathEditor &&
                                    this._pathEditor.getActiveExtendingMode() &&
                                    (this._mode == GPathTool.Mode.Append || this._mode == GPathTool.Mode.Prepend) &&
                                    this._hitSideConnectPoints(i))
                            )
                                this._setCursorForPosition(a.PenEnd);
                            else {
                                var o = this._view.getWorldTransform(this._view.getScene().getActivePage()).mapPoint(i);
                                this._setCursorForPosition(null, o);
                            }
                        }
                    } else e.button == s.BUTTON_RIGHT && p.modifiers.optionKey && this._mouseDrag(e);
                }),
                (g.prototype._mouseDrag = function (e) {
                    if (
                        (this.isPanning() && this.panView(e.client, e.clientDelta),
                        this._refPt &&
                            !this._released &&
                            (this._makePointMajor(this._refPt),
                            (this._editPt = this._pathEditor.getPathPointPreview(this._refPt)),
                            (this._dragStartPt = this._refPt),
                            this._pathEditor.requestInvalidation(),
                            (this._refPt = null)),
                        this._editPt && !this._released)
                    ) {
                        ((this._lastMouseEvent = e), (this._dragStarted = true), this._pathEditor.requestInvalidation());
                        var t,
                            i = this._updatePoint(e.client);
                        (this._newPoint || this._pathRef.getAnchorPoints().getFirstChild() != this._pathRef.getAnchorPoints().getLastChild()
                            ? (this._editPt == this._dpathRef.getAnchorPoints().getLastChild()
                                  ? (t = this._pathRef.getAnchorPoints().getFirstChild())
                                  : this._editPt == this._dpathRef.getAnchorPoints().getFirstChild() &&
                                    (t = this._pathRef.getAnchorPoints().getLastChild()),
                              t &&
                              this._pathEditor.hitAnchorPoint(
                                  t,
                                  i,
                                  this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                  h.annotDropDistance
                              )
                                  ? this._setCursorForPosition(a.PenEnd)
                                  : this._setCursorForPosition(a.Pen))
                            : this._setCursorForPosition(a.Pen),
                            this._pathEditor.requestInvalidation());
                    }
                }),
                (g.prototype._constructNewPoint = function (e, t) {
                    var i = new A.AnchorPoint();
                    return (
                        i.setProperties(["x", "y", "ah"], [t.getX(), t.getY(), true]),
                        e.button == s.BUTTON_LEFT
                            ? p.modifiers.optionKey && i.setProperty("tp", c.AnchorPoint.Type.Symmetric)
                            : i.setProperty("tp", c.AnchorPoint.Type.Connector),
                        i
                    );
                }),
                (g.prototype._closeIfNeeded = function () {
                    if (
                        this._pathRef &&
                        (this._newPoint ||
                            this._pathRef.getAnchorPoints().getFirstChild() != this._pathRef.getAnchorPoints().getLastChild()) &&
                        (this._mode == GPathTool.Mode.Append || this._mode == GPathTool.Mode.Prepend)
                    ) {
                        var e, t;
                        this._mode == GPathTool.Mode.Append
                            ? ((e = this._dpathRef.getAnchorPoints().getLastChild()), (t = this._pathRef.getAnchorPoints().getFirstChild()))
                            : ((e = this._dpathRef.getAnchorPoints().getFirstChild()),
                              (t = this._pathRef.getAnchorPoints().getLastChild()));
                        var i = new l(e.getProperty("x"), e.getProperty("y")),
                            n = this._pathRef.getTransform();
                        ((i = n ? n.mapPoint(i) : i),
                            t &&
                                this._pathEditor.hitAnchorPoint(
                                    t,
                                    this._view.getWorldTransform(this._view.getScene().getActivePage()).mapPoint(i),
                                    this._view.getWorldTransform(this._view.getScene().getActivePage()),
                                    h.annotDropDistance
                                ) &&
                                (this._transactionType == GPathTool.Transaction.NoTransaction
                                    ? this._startTransaction(GPathTool.Transaction.ModifyPathProperties)
                                    : (this._transactionType = GPathTool.Transaction.ModifyPathProperties),
                                this._pathRef.beginUpdate(),
                                this._pathEditor.selectOnePoint(t),
                                p.modifiers.optionKey && t.setProperties(["ah", "tp"], [false, c.AnchorPoint.Type.Asymmetric]),
                                t.getProperty("ah") || t.setProperties(["hlx", "hly"], [e.getProperty("hlx"), e.getProperty("hly")]),
                                this._dpathRef.getAnchorPoints().removeChild(e),
                                this._newPoint ||
                                    ((e =
                                        this._mode == GPathTool.Mode.Append
                                            ? this._pathRef.getAnchorPoints().getLastChild()
                                            : this._pathRef.getAnchorPoints().getFirstChild()),
                                    this._pathRef.getAnchorPoints().removeChild(e)),
                                this._dpathRef.setProperty("closed", true),
                                this._pathRef.setProperty("closed", true),
                                this._pathRef.endUpdate(),
                                this._pathEditor.requestInvalidation(),
                                this._pathEditor.setActiveExtendingMode(u.ExtendingMode.Off),
                                (this._newPoint = false)));
                    }
                }),
                (g.prototype._mouseRelease = function (e) {
                    if ((this._pathEditor && this._pathEditor.allowRemoval(), this._editor.getGuides().invalidate(), !this._released))
                        try {
                            if (((this._released = true), this._mode == GPathTool.Mode.Append || this._mode == GPathTool.Mode.Prepend)) {
                                var t = this._updatePoint(e.client);
                                (this._closeIfNeeded(),
                                    this._pathRef && this._pathRef.getProperty("closed")
                                        ? (this._setCursorForPosition(a.PenMinus), (this._mode = GPathTool.Mode.Edit))
                                        : this._newPoint
                                          ? (this._addPoint(this._editPt, false, true), this._setCursorForPosition(a.Pen))
                                          : this._editPt &&
                                            this._pathRef &&
                                            (this._transactionType == GPathTool.Transaction.NoTransaction &&
                                                this._startTransaction(GPathTool.Transaction.MovePoint),
                                            this._pathEditor.applyTransform(this._pathRef),
                                            this._setCursorForPosition(a.PenEnd),
                                            this._pathEditor.setActiveExtendingMode(
                                                this._mode == GPathTool.Mode.Prepend ? u.ExtendingMode.Beginning : u.ExtendingMode.End
                                            )),
                                    this._commitChanges());
                            } else if (this._mode == GPathTool.Mode.Edit && (this._editPt || this._refPt))
                                if (this._dragStarted && this._editPt && this._pathRef) {
                                    t = this._updatePoint(e.client);
                                    (this._transactionType == GPathTool.Transaction.NoTransaction &&
                                        this._startTransaction(GPathTool.Transaction.MovePoint),
                                        this._pathEditor.applyTransform(this._pathRef),
                                        this._setCursorForPosition(null, t),
                                        this._commitChanges());
                                } else this._editPt ? this._commitChanges() : this._mouseNoDragReleaseOnEdit(e.client);
                            ((this._dragStarted = false), (this._dragStartPt = null));
                        } finally {
                            this._finishTransaction();
                        }
                    ((this._lastMouseEvent = null), this._allowDeactivation());
                }),
                (g.prototype.toString = function () {
                    return "[Object GBezigonTool]";
                }),
                (module.exports = g));
        };
