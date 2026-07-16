module.exports = function (module, exports, require) {
            var n = require(195),
                r = require(59),
                o = require(7),
                a = require(63),
                s = require(6);
            module.exports = function (e) {
                ((e.VertexSource = function (e) {
                    this.source = e;
                }),
                    (e.VertexSource.prototype.source = null),
                    (e.VertexSource.prototype._markerSource = null),
                    (e.VertexSource.prototype._bbox = null),
                    (e.VertexSource.prototype._update = function (e) {
                        if (!this._markerSource) {
                            var t = (e.fontSize || 20) / 4;
                            ((this._markerSource = new a(this.source, new o(t, 0, 0, t, 0, 0))),
                                (this._bbox = r.calculateBounds(this._markerSource, true)));
                        }
                    }),
                    (e.VertexSource.prototype.measure = function (e) {
                        this._update(e);
                        var t = this._bbox || new s(),
                            i = n.measure(" ", e);
                        return {
                            width: t.getWidth(),
                            ascent: i ? i.ascent : t.getHeight(),
                            descent: i ? i.descent : 0,
                        };
                    }),
                    (e.VertexSource.prototype.draw = function (e, t, i, r, l, h, A) {
                        this._update(A);
                        var c = this._bbox || new s(),
                            p = new a(this._markerSource, new o(1, 0, 0, 1, -c.getX(), 0));
                        n.drawMarker(e, p, A, t, i);
                    }));
            };
        };
