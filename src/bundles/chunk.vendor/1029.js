module.exports = function (module, exports, require) {
            var n = require(50),
                r = require(2),
                GStylable = require(28),
                a = require(17),
                s = require(14),
                l = require(6),
                h = require(1030),
                A = require(315),
                c = require(7),
                p = require(12),
                u = require(5),
                String = require(9);

            function g() {
                (GStylable.Effect.call(this), this._setDefaultProperties(g.GeometryProperties, g.VisualProperties), (this._bend = new h()));
            }
            (r.inherit("curvedShadowEffect", g, GStylable.Effect),
                (g.prototype._bend = null),
                (g.equals = function (e, t) {
                    return (
                        e instanceof g &&
                        t instanceof g &&
                        e.arePropertiesEqual(t, Object.keys(g.GeometryProperties).concat(Object.keys(g.VisualProperties)))
                    );
                }),
                (g.GeometryProperties = {
                    s: 1,
                    b: 10,
                    a: 270,
                    l: 5,
                    c: 0.8,
                }),
                (g.VisualProperties = {
                    pat: a.BLACK,
                    opc: 0.65,
                }),
                (g.prototype.getEffectType = function () {
                    return GStylable.Effect.Type.PreEffect;
                }),
                (g.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GCurvedShadowEffect", "name", this.getNodeName());
                }),
                (g.prototype.isOverlayEffect = function () {
                    return true;
                }),
                (g.prototype._updateGLProperties = function () {
                    var e = this._bend.$shp;
                    ((e.softness = this.$s), (e.bend = this.$b), (e.radius = this.$l), (e.cov = this.$c));
                }),
                (g.prototype.getEffectPadding = function () {
                    return (this._updateGLProperties(), this._bend.getEffectPadding());
                }),
                (g.prototype.render = function (e, t, i, n, r, o) {
                    if (this.$pat && this.$opc > 0) {
                        var a,
                            h = t
                                .getTransform(false)
                                .inverted()
                                .mapRect(new l(0, 0, t.getWidth(), t.getHeight())),
                            d = t.createPatternPaint(this.$pat, h);
                        d &&
                            (d.transform
                                ? ((a = t.setTransform(t.getTransform(true).preMultiplied(d.transform))),
                                  t.fillRect(0, 0, 1, 1, d.paint, this.$opc),
                                  t.setTransform(a))
                                : t.fillRect(h.getX(), h.getY(), h.getWidth(), h.getHeight(), d.paint, this.$opc));
                        var g = this.$l * A.RADIUS_TO_BLUR,
                            f = new u(g, 0),
                            m = p.toRadians(this.$a);
                        f = f.rotated(m);
                        var y = new c().translated(f.getX(), f.getY());
                        (t.drawCanvas(e, 0, 0, 1, s.CompositeOperator.DestinationIn, false),
                            this._updateGLProperties(),
                            (a = t.setTransform(t.getTransform(true).preMultiplied(y))),
                            this._bend.render(t, null, null, n, r, o),
                            t.setTransform(a),
                            t.drawCanvas(e, 0, 0, 1, s.CompositeOperator.DestinationOut));
                    }
                }),
                (g.prototype._handleChange = function (e, t) {
                    (e === r._Change.Store
                        ? (this.storeProperties(t.blob, g.GeometryProperties),
                          this.storeProperties(t.blob, g.VisualProperties, function (e, t) {
                              return t && "pat" === e ? n.serialize(t) : t;
                          }))
                        : e === r._Change.Restore &&
                          (this.restoreProperties(t.blob, g.GeometryProperties),
                          this.restoreProperties(t.blob, g.VisualProperties, function (e, t) {
                              return t && "pat" === e && t ? n.deserialize(t) : t;
                          })),
                        this._handleGeometryChangeForProperties(e, t, g.GeometryProperties),
                        this._handleVisualChangeForProperties(e, t, g.VisualProperties),
                        GStylable.Effect.prototype._handleChange.call(this, e, t));
                }),
                (g.prototype.toString = function () {
                    return "[Object GCurvedShadowEffect]";
                }),
                (g.prototype.destroy = function () {
                    this._bend && this._bend.destroy();
                }),
                (module.exports = g));
        };
