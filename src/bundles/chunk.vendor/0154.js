module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(63),
                o = require(36),
                a = require(66),
                s = require(141),
                l = require(22),
                h = require(6),
                A = require(87),
                c = require(39),
                p = require(24),
                u = require(11),
                d = require(7),
                g = require(69);

            function f(e) {
                (o.call(this, e),
                    e.getProperty("plkt") & g.ProgramLck.NoSizeChanges && (this._flags = this._flags & ~a.Flag.ResizeAll),
                    e.getProperty("plkt") & g.ProgramLck.NoMove &&
                        (this._flags = this._flags & ~(a.Flag.RotateCorners | a.Flag.RotateHandle)));
            }
            (IsFiniteNonNegativeNumber.inherit(f, o),
                (f.LabelHolder = function () {}),
                (f.LabelHolder.LABEL_PART_ID = u.uuid()),
                (f.LabelHolder.prototype._getLabelBBox = function (e) {
                    var t = this.getElement()._getLabelGeometryBBox(),
                        i = null;
                    if (t) {
                        var n = this.getElement().getScene(),
                            r = this.getElement().isScaleLabel() ? e.getScaleFactor() : this.getElement().getScaleLabelFactor(),
                            o = n.getLabelBBox(r).getHeight();
                        if (((i = new h(t.getX(), t.getY() - o - 1, t.getWidth(), o + 1)), e)) return e.mapRect(i);
                    }
                    return i;
                }),
                (f.prototype._usePaintElement = false),
                (f.prototype.createElementPreview = function () {}),
                (f.prototype.getBox = function () {
                    var e = this._usePaintElement ? this.getPaintElement() : this._element,
                        t = e.getSourceBBox();
                    return ((t && !t.isEmpty()) || (t = e.getGeometryBBox()), t);
                }),
                (f.prototype.getBoxTransform = function () {
                    var e = this._usePaintElement ? this.getPaintElement() : this._element,
                        t = e.getSourceBBox();
                    return e.hasMixin(l.Transform) && t && !t.isEmpty() ? e.getTransform() : null;
                }),
                (f.prototype.transformBox = function (e, t) {
                    var i = this._element.getSourceBBox();
                    if (i && !i.isEmpty()) {
                        (this.createElementPreview(), t && (this._storedMoveData = t.storedMoveData));
                        var n = this.getPaintElement();
                        (this._setPreTransform(e), n.assignPreTransformFrom(e, this._element), this.requestInvalidation());
                    } else this.edTransform(e, null, null, t);
                }),
                (f.prototype.paint = function (e, t) {
                    var i = this._usePaintElement;
                    ((this._usePaintElement = true), a.prototype.paint.call(this, e, t), (this._usePaintElement = i));
                }),
                (f.prototype._setPreTransform = function (e) {
                    d.equals(this._preTransform, e) ||
                        (this.hasFlag(c.Flag.Outline) ? this.requestInvalidation() : this.setOutlineTmpFlag(),
                        (this._preTransform = e),
                        this.requestInvalidation());
                }),
                (f.prototype.resetTransform = function () {
                    ((this._preTransform = null), o.prototype.resetTransform.call(this));
                }),
                (f.prototype._applyPartMove = function (e, t, i, n) {
                    ((e !== a.RESIZE_HANDLE_PART_ID && e !== a.ROTATION_HANDLE_PART_ID) ||
                        (this.canApplyTransform()
                            ? (this._prepareApplyTransform(this._element),
                              this._applyTransform(this._element, e === a.ROTATION_HANDLE_PART_ID, n, i))
                            : this.resetTransform()),
                        o.prototype._applyPartMove.call(this, e, t, i, n));
                }),
                (f.prototype._showEditor = function () {
                    return a.prototype._showEditor.call(this) || this.hasFlag(c.Flag.Highlighted);
                }),
                (f.prototype._showOutline = function () {
                    return true;
                }),
                (f.prototype._paintOutline = function (e, t, i, n, h) {
                    var u = this.getPaintElement(),
                        d = null,
                        g = o.getEditor(this._element.getScene()),
                        f = !!g && g.isTransformBoxActive();
                    if (!u.hasMixin(A) || i || (!f && this._element.hasFlag(l.Flag.Hidden)))
                        a.prototype._paintOutline.call(this, e, t, true, n, h);
                    else {
                        var m = new r(u, e);
                        (d = new s(m)) &&
                            (t.canvas.putVertices(d, false),
                            t.canvas.strokeVertices(
                                n || (this.hasFlag(c.Flag.Highlighted) ? t.highlightOutlineColor : t.selectionOutlineColor),
                                p.outlineWidth
                            ));
                    }
                }),
                (f.prototype.toString = function () {
                    return "[Object GBlockEditor]";
                }),
                (module.exports = f));
        };
