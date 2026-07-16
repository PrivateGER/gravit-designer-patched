module.exports = function (module, exports, require) {
            var n = require(138),
                r = require(50),
                o = require(17),
                a = require(12),
                s = require(364),
                l = require(473),
                h = require(6),
                A = require(5),
                DUMP_IMAGES = require(103),
                p = require(14),
                u = require(166),
                d = require(118);

            function g(e, t, i, r, o, a) {
                (n.call(this, e, t, i, r, a),
                    (this._scale = "number" == typeof t ? t : 0.5),
                    (this._a0 = "number" == typeof o ? o : -Math.PI));
            }
            (r.inheritAndMix("A", g, n, [l, d]),
                (g.prototype._isAffectedByGLBug = true),
                (g.equals = function (e, t, i) {
                    return !(!(e instanceof g && t instanceof g) || (!i && e._a0 !== t._a0)) && n.equals(e, t, i);
                }),
                (g.prototype.getShaderClass = function () {
                    return s;
                }),
                (g.prototype.asCSSBackground = function (e, t, i) {
                    if (DUMP_IMAGES.isDebug()) return o.WHITE.asCSSBackground();
                    if (DUMP_IMAGES.isRenderPhase()) throw new Error("Cannot get CSS background, renderer is busy.");
                    var n = this.getGradient(e || 1, new h(0, 0, t || 20, i || 20));
                    return n ? "url(" + n._canvasContext.canvas.toDataURL() + ")" : o.WHITE.asCSSBackground();
                }),
                (g.prototype.clone = function () {
                    return new g(this.getClonedStops(), this._scale, this._fx, this._fy, this._a0, this._transform);
                }),
                (g.prototype.destroy = function () {
                    this._destroy();
                }),
                (g.prototype._serializeToBlob = function () {
                    var e = n.prototype._serializeToBlob.call(this);
                    return (e && (a.isEqualEps(this._a0, 0) || (e.a0 = this._a0)), e);
                }),
                (g.prototype.getGradient = function (e, t) {
                    if (!t || t.isEmpty()) return null;
                    var i = null;
                    if (this.prepareShader()) {
                        ((i = new p()).resize(Math.round(t.getWidth()), Math.round(t.getHeight())),
                            i.prepare(),
                            i.setOrigin(new A(0, 0)),
                            i.setOffset(new A(0, 0)));
                        var n = this._getRGBStops();
                        (this.drawShader(
                            i,
                            {
                                cx: this._fx,
                                cy: this._fy,
                                a0: this._a0,
                                a1: this._a0 + a.PI2,
                                stops: n,
                                opacity: e,
                            },
                            this._scale,
                            t.getWidth(),
                            t.getHeight()
                        ),
                            u.DELETE_BLEND_AND_GRADIENT_TEXTURES_AFTER_DRAW && this.destroy());
                    }
                    return i;
                }),
                (g.prototype._deserializeFromBlob = function (e) {
                    if (
                        (n.prototype._deserializeFromBlob.call(this, e),
                        (this._a0 = e.hasOwnProperty("a0") ? e.a0 : 0),
                        e.hasOwnProperty("a1"))
                    ) {
                        for (var t = (e.a1 - this._a0) / a.PI2, i = 0; i < this._stops.length; ++i) this._stops[i].position *= t;
                        var r = this._stops[this._stops.length - 1];
                        r.position < 0.999999 &&
                            (this._stops.push({
                                position: r.position + 1e-6,
                                color: r.color,
                                opacity: 0,
                            }),
                            this._stops.push({
                                position: 1,
                                color: r.color,
                                opacity: 0,
                            }));
                    }
                }),
                (g.prototype.isWebGL = function () {
                    return true;
                }),
                (g.prototype.toString = function () {
                    return "[Object GAngularGradient]";
                }),
                (g.prototype._getRGBStops = function () {
                    var e = this.getClonedStops();
                    return (
                        e.forEach((e) => {
                            e.color instanceof o || (e.color = new o(e.color.toScreen()));
                        }),
                        e
                    );
                }),
                (module.exports = g));
        };
