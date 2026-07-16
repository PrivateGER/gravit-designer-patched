module.exports = function (module, exports, require) {
            var n = require(2),
                IsFiniteNonNegativeNumber = require(0),
                o = require(127),
                a = require(128),
                s = require(36),
                l = require(66),
                h = require(60),
                A = require(22),
                c = require(113),
                p = require(39),
                GEditor = require(82),
                d = require(24);

            function g(e) {
                a.call(this, e);
            }
            (IsFiniteNonNegativeNumber.inherit(g, a),
                s.exports(g, c),
                (g.prototype.edTransform = function (e, t, i, n) {
                    ((this._transform = e), this.hasFlag(p.Flag.Outline) ? this.requestInvalidation() : this.setOutlineTmpFlag());
                    var r = this.hasPathPartSelection();
                    this._iterateChildPathsEditors(
                        function (n) {
                            (r && !n.getPartSelection()) || n.edTransform(e, t, i);
                        }.bind(this)
                    );
                }),
                (g.prototype.resetTransform = function (e) {
                    ((this._transform = null),
                        this._iterateChildPathsEditors(
                            function (t) {
                                e ? t._setTransform(null) : t.resetTransform();
                            }.bind(this)
                        ),
                        this.removeOutlineTmpFlag());
                }),
                (g.prototype.canApplyTransform = function () {
                    var e = false;
                    return (
                        this._iterateChildPathsEditors(
                            function (t) {
                                if (t.canApplyTransform()) return ((e = true), true);
                            }.bind(this)
                        ),
                        e
                    );
                }),
                (g.prototype._applyTransform = function (e, t, i, n) {
                    var r = !this.hasPathPartSelection() || this.hasFlag(l.Flag.ResizeAll);
                    (e.beginUpdate(),
                        e._beginBlockEvents([A.GeometryChangeEvent]),
                        r
                            ? a.prototype._applyTransform.call(this, e, t, i, n)
                            : this._iterateChildPathsEditors(
                                  function (e) {
                                      e.canApplyTransform() && e.applyTransform(e._element, false, null, n);
                                  }.bind(this)
                              ),
                        this.resetTransform(r),
                        e._endBlockEvents([A.GeometryChangeEvent]),
                        e.endUpdate());
                }),
                (g.prototype.getBBox = function (e) {
                    var t = a.prototype.getBBox.call(this, e);
                    if (
                        ((this.hasFlag(p.Flag.Selected) || this.hasFlag(p.Flag.Highlighted)) &&
                            this._iterateChildPathsEditors(
                                function (i) {
                                    var n = i.getBBox(e);
                                    n && (t = t ? t.united(n) : n);
                                }.bind(this)
                            ),
                        t && this.hasFlag(l.Flag.ResizeAll) && !t.isEmpty())
                    ) {
                        var i = this.getBBoxMargin();
                        t = t.expanded(i, i, i, i);
                    }
                    return t;
                }),
                (g.prototype.getElementSelectionBBox = function () {
                    var e = null;
                    return (
                        this._iterateChildPathsEditors(
                            function (t) {
                                var i = null;
                                (t.getPartsSelectionLength() && (i = t.getElementSelectionBBox()), i && (e = e ? e.united(i) : i));
                            }.bind(this)
                        ),
                        e || (e = this._element.getGeometryBBox()),
                        e
                    );
                }),
                (g.prototype._attach = function () {
                    var e = this._element.getScene();
                    null != e && e.addEventListener(A.GeometryChangeEvent, this._geometryChange, this);
                }),
                (g.prototype._detach = function () {
                    for (var e = this._element.getPaths().getFirstChild(); null != e; e = e.getNext()) e.removeFlag(n.Flag.Selected);
                    var t = this._element.getScene();
                    (null != t && t.removeEventListener(A.GeometryChangeEvent, this._geometryChange, this), a.prototype._detach.call(this));
                }),
                (g.prototype.getPartInfoAt = function (e, t, i, n) {
                    var r = a.prototype.getPartInfoAt.call(this, e, t, i, n);
                    return r ? (r.data || (r.data = {}), (r.data.ownerEditor = this), r) : null;
                }),
                (g.prototype._getPartInfoAt = function (e, t, i) {
                    if (!this.hasFlag(l.Flag.ResizeAll))
                        for (var n = null, r = this._element.getPaths().getFirstChild(); null != r; r = r.getNext()) {
                            var o = s.openEditor(r);
                            if ((o.removeFlag(l.Flag.ResizeAll), o.setCatchHandle(false), (n = o._getPartInfoAt(e, t, i))))
                                return (n.data || (n.data = {}), (n.data.ownerEditor = this), n);
                        }
                    return (n = a.prototype._getPartInfoAt.call(this, e, t, i))
                        ? (n.data || (n.data = {}), (n.data.ownerEditor = this), n)
                        : null;
                }),
                (g.prototype._partIdAreEqual = function (e, t) {
                    var i = e.type === t.type;
                    return (
                        i && e.type == o.PartType.Point
                            ? (i = e.point === t.point)
                            : i && e.type == o.PartType.Segment && (i = e.apLeft === t.apLeft && e.apRight == t.apRight),
                        i
                    );
                }),
                (g.prototype.updatePartSelection = function (e, t) {
                    (this._partSelection && (this._partSelection = null),
                        !t &&
                            this.hasFlag(p.Flag.Selected) &&
                            this._editors &&
                            this._iterateChildPathsEditors(
                                function (t) {
                                    t.updatePartSelection(e, null);
                                }.bind(this)
                            ));
                }),
                (g.prototype._paintChildren = function (e, t, i) {
                    this._editors && this._editors.length <= d.maxNumberOfEditorsToDraw && a.prototype._paintChildren.call(this, e, t, i);
                }),
                (g.prototype.updateOwnedPartsSelection = function (e, t) {
                    if (t && t.length) {
                        for (var i = null, n = 0; n < t.length; ++n) {
                            var r = t[n];
                            r.data.ownerEditor === this && (e ? r.editor.updatePartSelection(e, [r.id]) : (i = r));
                        }
                        i && (this.updatePartSelection(false), i.editor.updatePartSelection(false, [i.id]));
                    }
                }),
                (g.prototype.getActiveExtendingMode = function () {
                    return null;
                }),
                (g.prototype.isPartSelectionUnderCollisionAllowed = function () {
                    return true;
                }),
                (g.prototype.updatePartSelectionUnderCollision = function (e, t, i) {
                    for (var n = false, r = this._element.getPaths().getFirstChild(); null != r; r = r.getNext()) {
                        var o = s.openEditor(r);
                        (o.removeFlag(l.Flag.ResizeAll), o.setCatchHandle(false), o.updatePartSelectionUnderCollision(e, t, i) && (n = true));
                    }
                    return n;
                }),
                (g.prototype.isDeletePartsAllowed = function () {
                    var e = false;
                    if (this.hasFlag(p.Flag.Selected) && this._editors) {
                        var t = true,
                            i = false;
                        (this._iterateChildPathsEditors(
                            function (n) {
                                (e = e || n.isDeletePartsAllowed()) || (n.hasAllPointsSelected() ? (i = true) : (t = false));
                            }.bind(this)
                        ),
                            e || !i || t || (e = true));
                    }
                    return e;
                }),
                (g.prototype.deletePartsSelected = function () {
                    if (this.hasFlag(p.Flag.Selected) && this._editors) {
                        var e = [];
                        if (
                            (this._iterateChildPathsEditors(
                                function (t) {
                                    t.isDeletePartsAllowed()
                                        ? t.deletePartsSelected()
                                        : t instanceof o && t.hasAllPointsSelected() && e.push(t);
                                }.bind(this)
                            ),
                            e.length)
                        ) {
                            for (var t = this._element, i = 0; i < e.length; ++i) {
                                e[i].deletePartsSelected();
                                var r = e[i].getPath();
                                (r.hasFlag(n.Flag.Selected) && r.removeFlag(n.Flag.Selected), t.getPaths().removeChild(r));
                            }
                            if (this._element.getPaths().getFirstChild() == this._element.getPaths().getLastChild()) {
                                var a = t.getPaths().getFirstChild();
                                GEditor.getEditor(t.getScene()).exchangeElements(t, [a], true);
                            }
                        }
                    }
                }),
                (g.prototype.isAlignPartsAllowed = function () {
                    var e = false;
                    return (
                        this.hasFlag(p.Flag.Selected) &&
                            this._editors &&
                            this._iterateChildPathsEditors(
                                function (t) {
                                    if (t.isAlignPartsAllowed()) return (e = true);
                                }.bind(this)
                            ),
                        e
                    );
                }),
                (g.prototype.alignParts = function (e, t, i) {
                    this.hasFlag(p.Flag.Selected) &&
                        this._editors &&
                        (this._element.beginUpdate(),
                        this._iterateChildPathsEditors(
                            function (n) {
                                n.isAlignPartsAllowed() && n.alignParts(e, t, i);
                            }.bind(this)
                        ),
                        this._element.endUpdate());
                }),
                (g.prototype._geometryChange = function (e) {
                    if (e.type == A.GeometryChangeEvent.Type.Before || e.type == A.GeometryChangeEvent.Type.After) {
                        var t = e.element == this._element;
                        if (!t && e.element instanceof h)
                            for (var i = this._element.getPaths().getFirstChild(); null != i && !t; i = i.getNext())
                                i == e.element && (t = true);
                        t && (e.type == A.GeometryChangeEvent.Type.After && this.releasePathPreview(), this.requestInvalidation());
                    }
                }),
                (g.prototype.setFlag = function (e) {
                    if (0 == (this._flags & e)) {
                        (this.requestInvalidation(), (this._flags = this._flags | e));
                        for (var t = this._element.getPaths().getFirstChild(); null != t; t = t.getNext()) {
                            var i = s.openEditor(t);
                            (i.setCatchHandle(false),
                                (e & l.Flag.ResizeAll) != l.Flag.ResizeAll && i && !i.hasFlag(e) && i.setFlag(e),
                                this.hasFlag(l.Flag.ResizeAll) && i && !i.hasFlag(p.Flag.Outline) && i.setFlag(p.Flag.Outline),
                                i && i.hasFlag(l.Flag.ResizeAll) && i.removeFlag(l.Flag.ResizeAll));
                        }
                        this.requestInvalidation();
                    }
                }),
                (g.prototype.removeFlag = function (e) {
                    0 != (this._flags & e) &&
                        (this.requestInvalidation(),
                        this._editors &&
                            this._iterateChildPathsEditors(
                                function (t) {
                                    (e & l.Flag.ResizeAll) == l.Flag.ResizeAll
                                        ? t.removeFlag(p.Flag.Outline)
                                        : ((e & p.Flag.Outline) == p.Flag.Outline &&
                                              (this._flags & l.Flag.ResizeAll) == l.Flag.ResizeAll) ||
                                          t.removeFlag(e);
                                }.bind(this)
                            ),
                        (this._flags = this._flags & ~e),
                        this.requestInvalidation());
                }),
                (g.prototype._paintOutline = function (e, t, i, n, r) {
                    this._editors && this._editors.length > d.maxNumberOfEditorsToDraw
                        ? l.prototype._paintOutline.call(this, e, t, i, n)
                        : !this.hasFlag(p.Flag.Selected) &&
                          this.hasFlag(p.Flag.Outline) &&
                          this._editors &&
                          this._iterateChildPathsEditors(
                              function (o) {
                                  o._paintOutline(e, t, i, n, r);
                              }.bind(this)
                          );
                }),
                (g.prototype.releasePathPreview = function () {
                    for (var e = this._element.getPaths().getFirstChild(); null != e; e = e.getNext()) {
                        var t = s.getEditor(e);
                        t && t.releasePathPreview();
                    }
                }),
                (g.prototype.hasPathPartSelection = function () {
                    var e = false;
                    return (
                        this._editors &&
                            this._iterateChildPathsEditors(
                                function (t) {
                                    if (t.getPartSelection()) return ((e = true), true);
                                }.bind(this)
                            ),
                        e
                    );
                }),
                (g.prototype._iterateChildPathsEditors = function (e) {
                    if (this._editors && this._element.getPaths().getFirstChild() && s.getEditor(this._element.getPaths().getFirstChild()))
                        for (var t = false, i = this._element.getPaths().getFirstChild(); null != i && !t; i = i.getNext()) {
                            var n = s.getEditor(i);
                            if (n) true === e(n) && (t = true);
                        }
                }),
                (g.prototype.toString = function () {
                    return "[Object GCompoundPathEditor]";
                }),
                (module.exports = g));
        };
