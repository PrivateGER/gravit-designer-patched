module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(744),
                o = require(5),
                a = require(14),
                s = (require(12), require(17), require(6)),
                l = require(2),
                h = (require(83), require(69), require(9 /* String */)),
                A = require(47),
                c = require(140);

            function p(e) {
                r.call(this, e);
            }
            (IsFiniteNonNegativeNumber.inherit(p, r),
                (p.ID = "guide.pagelabel"),
                (p.prototype._pageFilter = function (e, t, i) {
                    if (!t.configuration.multiPageView && !e.hasFlag(l.Flag.Active)) return false;
                    if (this._scene.getActivePage() !== e) {
                        var n = (e.getProperty("off") || e.getTransform()).getTranslation(),
                            r = n.getX(),
                            o = n.getY(),
                            p = this._scene.getLabelBBox(e.getScaleLabelFactor()).getHeight(),
                            u = e.isScaleLabel() ? i.getScaleFactor() : 1;
                        u *= a.getScreenDPI();
                        var d = this._scene.$lbs * u;
                        d /= i.getScaleFactor();
                        for (
                            var g = t.canvas.measureText(e.$name || h.get(new A("GPage", "name")), d).width,
                                f = new s(r, o - p, g, p),
                                m = e.getElementIndex(),
                                y = this._scene.retrieveChildrenInPaintBBox(f, c.RETRIEVE_MODE_INTERSECT),
                                _ = 0;
                            _ < y.length;
                            _++
                        )
                            if (y[_] !== e) {
                                if (y[_].getElementIndex() > m) return false;
                                if (y[_].hasFlag(l.Flag.Active)) return false;
                            }
                    }
                    return true;
                }),
                (p.prototype.getId = function () {
                    return p.ID;
                }),
                (p.prototype._gatherLabels = function (e, t) {
                    var i = null;
                    if (t.configuration.pageLabelsVisible) {
                        var n = t.canvas,
                            a = t.dirtyMatcher.getDirtyRectangles(),
                            p = [],
                            u = this._scene.getActivePage().isScaleLabel() ? e.getScaleFactor() : 1,
                            d = this._scene.getLabelBBox(u).getHeight();
                        i = [];
                        var g = e.inverted().mapRect(new s(0, 0, n.getWidth(), n.getHeight()));
                        ((g = g.expanded(0, d, 0, d)), (p = this._scene.retrieveChildrenInPaintBBox(g, c.RETRIEVE_MODE_INTERSECT)));
                        var f = this;
                        p = p.filter(function (i) {
                            return f._pageFilter(i, t, e);
                        });
                        for (var m = 0; m < a.length; ++m)
                            for (var y = a[m], _ = p.length - 1; _ >= 0; _--) {
                                var v = p[_],
                                    b = null;
                                if (t.configuration.multiPageView || v.hasFlag(l.Flag.Active)) {
                                    b = v.getGeometryBBox();
                                    var C = v.getPosition(t.configuration.multiPageView);
                                    if (b) {
                                        (0 === C.getX() && 0 === C.getY()) || (b = b.translated(C.getX(), C.getY()));
                                        var w = new s(b.getX(), b.getY() - d, b.getWidth(), d);
                                        if (y.containsRect(w) || w.intersectsRect(y)) {
                                            var E = e.mapRect(b),
                                                B = v.$name || h.get(new A("GPage", "name")),
                                                x = this._scene.$lbc || t.labelColor;
                                            (v.hasFlag(l.Flag.Selected)
                                                ? (x = t.selectionShapeOutlineColor)
                                                : v.hasFlag(l.Flag.Highlighted) && (x = t.highlightOutlineColor),
                                                i.push(new r.LabelItem(new o(E.getX(), E.getY()), E.getWidth(), B, x, v.isScaleLabel())),
                                                p.splice(_, 1));
                                        }
                                    }
                                }
                            }
                    }
                    return i;
                }),
                (p.prototype.toString = function () {
                    return "[Object GPageLabelGuide]";
                }),
                (module.exports = p));
        };
