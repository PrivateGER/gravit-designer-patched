module.exports = function (module, exports, require) {
            var GEditor = require(82),
                IsFiniteNonNegativeNumber = require(0),
                o = require(233),
                a = require(63),
                s = require(128),
                l = require(36),
                h = require(141),
                A = require(22),
                c = require(39),
                p = require(24),
                String = require(9),
                d = require(47);

            function g(e) {
                s.call(this, e);
            }
            (IsFiniteNonNegativeNumber.inherit(g, s),
                l.exports(g, o),
                (g.prototype.setBooleanOp = function (e, t) {
                    var i = GEditor.getEditor(this.getElement().getScene());
                    if (!i) return false;
                    if (!this._editors || !this._editors.length) return false;
                    for (var r = false, o = 0; o < this._editors.length; ++o) {
                        (a = this._editors[o]) instanceof s && (r = true);
                    }
                    if (!r) return false;
                    i.beginTransaction();
                    try {
                        for (o = 0; o < this._editors.length; ++o) {
                            var a;
                            (a = this._editors[o]) instanceof s && a.getElement().setProperty("bool", e);
                        }
                    } finally {
                        i.commitTransaction(String.get(new d("GCompoundShapeEditor", "action.drop-pattern")));
                    }
                    return true;
                }),
                (g.prototype._paintOutline = function (e, t, i, n, r) {
                    var o,
                        s = this.getPaintElement(),
                        l = new a(s, e);
                    (o = new h(l)) &&
                        (t.canvas.putVertices(o, false),
                        t.canvas.strokeVertices(
                            n || (this.hasFlag(c.Flag.Highlighted) ? t.highlightOutlineColor : t.selectionOutlineColor),
                            p.outlineWidth
                        ));
                }),
                (g.prototype.getBox = function () {
                    return this.getPaintElement().getGeometryBBox();
                }),
                (g.prototype.getBoxTransform = function () {
                    return null;
                }),
                (g.prototype.edTransform = function (e, t, i, n) {
                    for (var r = this.getElement().getFirstChild(); null != r; r = r.getNext())
                        if (r instanceof A) {
                            var o = l.openEditor(r);
                            o && o.edTransform(e, null, null, n);
                        }
                    s.prototype.edTransform.call(this, e, t, i, n);
                }),
                (g.prototype.resetTransform = function () {
                    for (var e = this._editors ? this._editors.length : 0; e > 0; --e) {
                        var t = this._editors[e - 1];
                        t && t instanceof l && t.resetTransform();
                    }
                    s.prototype.resetTransform.call(this);
                }),
                (g.prototype.toString = function () {
                    return "[Object GCompoundShapeEditor]";
                }),
                (module.exports = g));
        };
