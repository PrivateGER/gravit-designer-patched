module.exports = function (module, exports, require) {
            var n = require(264),
                r = require(2),
                o = require(187),
                a = require(87),
                s = require(60),
                l = require(179),
                IsFiniteNonNegativeNumber = require(0),
                A = require(54),
                c = require(48),
                p = require(59),
                u = require(335),
                d = require(99);

            function g() {
                u.call(this);
            }
            (IsFiniteNonNegativeNumber.inherit(g, u),
                (g.prototype._willMerge = true),
                (g.prototype._mouseDown = function (e) {
                    u.prototype._mouseDown.call(this, e);
                    var t = this._view.getViewTransform(this._view.getScene().getActivePage()).mapPoint(e.client);
                    (this._editor.getGuides().beginMap(this._editor.getMappingScopes()),
                        (t = this._editor.getGuides().mapPoint(t, d.DetailMap.Mode.DetailOnFilterOn)),
                        this._editor.getGuides().finishMap(),
                        (this._willMerge = false));
                    var i = this._startingSelection;
                    if (i)
                        for (var n = 0; n < i.length; n++)
                            if (i[n].hasMixin(a)) {
                                var r = i[n],
                                    o = r.getGeometryBBox();
                                if (o && o.containsPoint(t) && p.hitTest(t.getX(), t.getY(), r, 0, true)) {
                                    this._willMerge = true;
                                    break;
                                }
                            }
                }),
                (g.prototype._finalizeDrawing = function () {
                    this._doTheClip();
                }),
                (g.prototype._doTheClip = function () {
                    var e = null;
                    if (this._closeIfNeeded()) ((e = this._newPath), this._correctFillVisibility());
                    else {
                        var t = (e = this._newPath.clone()).getAnchorPoints(),
                            i = t.getFirstChild(),
                            n = new s.AnchorPoint();
                        (n.setProperties(["x", "y"], [i.$x, i.$y]), t.appendChild(n), e.correctClosedAttribute());
                    }
                    var h = this._startingSelection;
                    if (h) {
                        for (var p = [], u = [], d = new o(), g = false, f = 0; f < h.length; f++)
                            if (h[f].hasMixin(a)) {
                                for (var m = o.redistributeVertexSource(h[f]), y = m.containers.length, _ = [], v = 0; v < y; v++)
                                    for (var b = m.containers[v], C = 0; C < b.length; C++) {
                                        var w = b[C],
                                            E = new c(),
                                            B = new c(),
                                            x = false;
                                        if (w.rewindVertices(0) && w.readVertex(E) && w.readVertex(B)) {
                                            for (; w.readVertex(B); );
                                            (B.command === c.Command.Close || (B.x === E.x && B.y === E.y)) &&
                                                (_.push(w), (x = true), d.intersect(e, w, false, true, null, m.polys[v][C]) && (g = true));
                                        }
                                        x || u.push(w);
                                    }
                                _.length &&
                                    p.push({
                                        item: h[f],
                                        sub: false,
                                        splitted: _,
                                    });
                            }
                        if (p.length) {
                            var P,
                                S = [];
                            for (f = 0; f < p.length; f++) S = S.concat(p[f].splitted);
                            (!g && this._willMerge
                                ? e.isClockWise() || (this._willMerge = false)
                                : g || (e.isClockWise() && (this._willMerge = true)),
                                (P = (P = this._willMerge ? this._doTheMerge(S, [e]) : this._doTheSub(S, [e])).concat(u)));
                            var T = A.mergeVertexSources(P),
                                I = l.createPathFromVertexSource(T);
                            if (I) {
                                var F = (w = p[0].item).$trf;
                                ((w.$trf = null), I.assignFrom(w), (w.$trf = F));
                            }
                            for (f = 0; f < p.length; f++) {
                                (R = p[f].item.getParent()) && R.removeChild(p[f].item);
                            }
                            for (f = 0; f < u.length; f++) {
                                var R;
                                (R = u[f].item.getParent()) && R.removeChild(u[f].item);
                            }
                            (I && this._newPath.getParent().insertChild(I, this._newPath),
                                this._newPath.getParent().removeChild(this._newPath),
                                I && ((this._newPath = I), this._editor.updateSelection(false, [I])));
                        } else this._newPath.setFlag(r.Flag.Selected);
                    } else this._newPath.setFlag(r.Flag.Selected);
                }),
                (g.prototype._doTheMerge = function (e, t) {
                    var i = new n(n.PIP_CHECK_ODDEVEN, n.AUTO),
                        r = A.mergeVertexSources(e),
                        o = A.mergeVertexSources(t);
                    return i.initializeSources(r, o) ? i.clipOp(n.OR) : e.concat(t);
                }),
                (g.prototype._doTheSub = function (e, t) {
                    var i = new n(n.PIP_CHECK_ODDEVEN, n.AUTO),
                        r = A.mergeVertexSources(e),
                        o = A.mergeVertexSources(t);
                    return i.initializeSources(r, o) ? i.clipOp(n.SUB) : e;
                }),
                (g.prototype.toString = function () {
                    return "[Object GMagicTool]";
                }),
                (module.exports = g));
        };
