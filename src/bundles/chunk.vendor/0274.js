module.exports = function (module, exports, require) {
            var n = require(154),
                IsFiniteNonNegativeNumber = require(0),
                o = require(11),
                a = require(56),
                s = require(24),
                l = (require(22), require(113)),
                h = require(7),
                A = require(39),
                c = require(81),
                p = require(17),
                u = (require(104), require(5));

            function d(e) {
                n.call(this, e);
            }
            (IsFiniteNonNegativeNumber.inherit(d, n),
                (d.CATCH_HANDLE_PART_ID = o.uuid()),
                (d.prototype._getPartInfoAt = function (e, t, i) {
                    if (
                        this.hasFlag(A.Flag.Selected) &&
                        !(this.getPaintElement().getParent() instanceof l.Paths) &&
                        this.getPaintElement().findParent(function (e) {
                            return e instanceof a;
                        })
                    ) {
                        var r = this._getCatchPartInfoAt(e, t, i);
                        if (r) return r;
                    }
                    return n.prototype._getPartInfoAt.call(this, e, t, i);
                }),
                (d.prototype._getCatchPartInfoAt = function (e, t, i) {
                    var n = this.getPaintElement(),
                        r = n.getTransform(),
                        o = n.getCenter(false);
                    return (
                        (o = r ? r.mapPoint(o || new u(0, 0)) : o),
                        c
                            .getAnnotationBBox(t, o, s.annotationHandles.catch.size, false)
                            .expanded(s.annotPickDistance, s.annotPickDistance, s.annotPickDistance, s.annotPickDistance)
                            .containsPoint(e)
                            ? new A.PartInfo(
                                  this,
                                  d.CATCH_HANDLE_PART_ID,
                                  {
                                      point: o,
                                  },
                                  false,
                                  false
                              )
                            : null
                    );
                }),
                (d.prototype._postPaint = function (e, t) {
                    if (
                        this.hasFlag(A.Flag.Selected) &&
                        this._catchHandleAllowed() &&
                        this.getPaintElement().findParent(function (e) {
                            return e instanceof a;
                        })
                    ) {
                        var i = this.getPaintElement(),
                            n = i.getTransform(),
                            r = n || new h(1, 0, 0, 1, 0, 0);
                        r = e ? r.multiplied(e) : r;
                        var o = i.getCenter(false),
                            l = o ? r.mapPoint(o) : null;
                        if (l) {
                            var u = s.annotationHandles.catch;
                            c.paintAnnotation(t, null, l, u.type, true, u.size, p.WHITE, t.selectionOutlineColor);
                        }
                    }
                }),
                (d.prototype._catchHandleAllowed = function () {
                    return true;
                }),
                (d.prototype.toString = function () {
                    return "[Object GItemEditor]";
                }),
                (module.exports = d));
        };
