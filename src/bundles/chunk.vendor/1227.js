module.exports = function (module, exports, require) {
            var n = require(391),
                IsFiniteNonNegativeNumber = require(0),
                o = require(11),
                a = require(182),
                s = require(1146),
                l = require(1416),
                h = require(1417),
                A = function (e, t) {
                    if (t && t.transform && t.doc) {
                        var i = t.doc,
                            r = t.transform._ty,
                            A = t.transform._tx;
                        if (
                            ((this.transform = t.transform),
                            (this.transform = this.transform.translated(-A, -r).scaled(1, -1).translated(A, i.relativeY(r))),
                            this.isValid())
                        ) {
                            var c = t.colorSpace || t.doc.getColorSpace();
                            (s.call(this, e, c), (this._gradient = t.color));
                            var p = new a(),
                                u = new a(),
                                d = new a(),
                                g = this._gradient._stops2.slice().sort(function (e, t) {
                                    return e.stop - t.stop;
                                }),
                                f = g[0];
                            (0 !== f.stop && (((f = o.extend({}, f)).stop = 0), g.unshift(f)),
                                o.each(
                                    g,
                                    function (e, t) {
                                        var r = e < g.length - 1 ? e + 1 : e,
                                            o = c.parseColor(g[e].color),
                                            a = c.parseColor(g[r].color);
                                        (o.hasTransparency() || a.hasTransparency()) && (this._hasTransparency = true);
                                        var s = new h();
                                        (s.put("/C0", o.asArray()), s.put("/C1", a.asArray()), s.put("/N", 1));
                                        var l = i.getIndirectObject(s);
                                        (i.addIndirectObject(l), d.push(new n(l)), e > 0 && p.push(t.stop), u.push(0), u.push(1));
                                    }.bind(this)
                                ));
                            var m = i.getIndirectObject(new l(u, p, d));
                            i.addIndirectObject(m);
                            var y = new a();
                            (y.push(true),
                                y.push(true),
                                this.put("/Coords", t.coords),
                                this.put("/Extend", y),
                                this.put("/Function", new n(m)));
                        }
                    }
                };
            (IsFiniteNonNegativeNumber.inherit(A, s),
                (A.prototype.isValid = function () {
                    return !!this.transform && this.transform.invertible();
                }),
                (A.prototype.getGradient = function () {
                    return this._gradient;
                }),
                (A.prototype.equals = function (e) {
                    return e instanceof A && this._gradient == e._gradient;
                }),
                (module.exports = A));
        };
