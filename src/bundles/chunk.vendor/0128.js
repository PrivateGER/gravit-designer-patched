module.exports = function (module, exports, require) {
            var GEditor = require(82),
                r = require(50),
                IsFiniteNonNegativeNumber = require(0),
                GStylable = require(28),
                s = require(56),
                l = require(36),
                h = require(70),
                A = require(268),
                c = require(95),
                p = require(274),
                u = require(7),
                d = require(39),
                g = require(24),
                f = (require(11), require(9 /* String */)),
                m = require(47);

            function y(e) {
                p.call(this, e);
            }
            (IsFiniteNonNegativeNumber.inherit(y, p),
                (y.prototype.initialSetup = function (e) {
                    var t = this.getDefaultStyle();
                    if (
                        (!(e && e instanceof s) ||
                            e instanceof c ||
                            (this.getElement() instanceof A && !(e instanceof A)) ||
                            (!(this.getElement() instanceof h) && e instanceof h) ||
                            (t = e),
                        t)
                    ) {
                        var i,
                            n,
                            r,
                            o,
                            l,
                            p,
                            u = this.getElement(),
                            d = [],
                            g = [],
                            f = t.getProperty("ps") || [GStylable.PropertySet.Style],
                            m = ["geometryProperties", "visualProperties"];
                        for (i = 0; i < f.length; i++)
                            for (p = f[i], l = GStylable.PropertySetInfo[p], n = 0; n < m.length; n++)
                                if ((o = l[m[n]])) for (r in o) (d.push(r), g.push(t.getProperty(r)));
                        u.setProperties(d, g);
                        var y = t.getPaintLayers();
                        if (y)
                            for (var _ = y.getFirstChild(); _; _ = _.getNext()) {
                                var v = _ instanceof GStylable.BorderPaintLayer ? new GStylable.BorderPaintLayer() : new GStylable.FillPaintLayer();
                                (v.assignFrom(_), u.getPaintLayers().appendChild(v));
                            }
                        var b = t.getEffects();
                        if (b) for (var C = b.getFirstChild(); C; C = C.getNext()) u.getEffects().appendChild(C.clone());
                    }
                }),
                (y.prototype.acceptDrop = function (e, t, i, o) {
                    if (l.prototype.acceptDrop.call(this, e, t, i, o)) return true;
                    if (i instanceof r && o instanceof s.HitResult) {
                        var h = GEditor.getEditor(this.getElement().getScene());
                        h.beginTransaction();
                        try {
                            switch (o.type) {
                                case s.HitResult.Type.Stroke:
                                    (this.getElement().getPaintLayers().clearBorderLayers(),
                                        this.getElement().getPaintLayers().appendChild(new GStylable.BorderPaintLayer(i)));
                                    break;
                                default:
                                    (this.getElement().getPaintLayers().clearFillLayers(),
                                        this.getElement().getPaintLayers().appendChild(new GStylable.FillPaintLayer(i)));
                            }
                        } finally {
                            h.commitTransaction(f.get(new m("GShapeEditor", "action.drop-pattern")));
                        }
                        return true;
                    }
                    return false;
                }),
                (y.prototype.getDefaultStyle = function () {
                    var e = this.getElement(),
                        t = IsFiniteNonNegativeNumber.getTypeId(e),
                        i = e.getScene()
                            ? e
                                  .getScene()
                                  .getStyles()
                                  .querySingle('style[_sdf="' + t + '"]')
                            : null;
                    return (
                        i ||
                            (i = e.getScene()
                                ? e
                                      .getScene()
                                      .getStyles()
                                      .querySingle('style[_sdf="' + IsFiniteNonNegativeNumber.getTypeId(s) + '"]')
                                : null),
                        i
                    );
                }),
                (y.prototype._hasCenterCross = function () {
                    return false;
                }),
                (y.prototype._postPaint = function (e, t) {
                    if (this.hasFlag(d.Flag.Selected) && this.hasFlag(d.Flag.Detail) && this._hasCenterCross() && g.centerCrossSize > 0) {
                        var i = this.getPaintElement(),
                            n = i.getTransform(),
                            r = n || new u(1, 0, 0, 1, 0, 0);
                        r = e ? r.multiplied(e) : r;
                        var o = i.getCenter(false);
                        if (o) {
                            o = r.mapPoint(o);
                            var a = 2 * g.centerCrossSize,
                                s = r.getMatrix();
                            if (Math.abs(s[0]) * i.getOrigHalfWidth() > a && Math.abs(s[3]) * i.getOrigHalfHeight() > a) {
                                var l = Math.floor(o.getX()) + 0.5,
                                    h = Math.floor(o.getY()) + 0.5;
                                g.outlineWidth % 2 != 0 && ((l += 0.5), (h += 0.5));
                                var A = g.centerCrossSize / 2;
                                (t.canvas.strokeLine(l - A, h - A, l + A, h + A, g.outlineWidth, t.selectionOutlineColor),
                                    t.canvas.strokeLine(l + A, h - A, l - A, h + A, g.outlineWidth, t.selectionOutlineColor));
                            }
                        }
                    }
                    p.prototype._postPaint.call(this, e, t);
                }),
                (y.prototype._getTransformFromPreview = function () {
                    var e = null;
                    if (this._elementPreview) {
                        var t = this._element.getTransform(),
                            i = this._elementPreview.getTransform();
                        ((e = t && !t.isIdentity() ? t.inverted() : null), i && !i.isIdentity() && (e = e ? e.multiplied(i) : i));
                    }
                    return e;
                }),
                (y.prototype.toString = function () {
                    return "[Object GShapeEditor]";
                }),
                (module.exports = y));
        };
