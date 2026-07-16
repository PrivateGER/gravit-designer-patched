module.exports = function (module, exports, require) {
            var n = require(473),
                r = require(2),
                GStylable = require(28),
                IsFiniteNonNegativeNumber = require(0),
                s = require(14),
                l = require(166);

            function h() {
                (GStylable.Effect.call(this), this._setDefaultProperties(h.GeometryProperties), (this._defaultBlending = void 0));
            }
            (r.inheritAndMix("GWebGLEffect", h, GStylable.Effect, [n]),
                (h.prototype._useCroppedRendering = false),
                (h.equals = function (e, t) {
                    if (e instanceof h && t instanceof h) {
                        var i = IsFiniteNonNegativeNumber.getTypeId(e);
                        if (i === IsFiniteNonNegativeNumber.getTypeId(t)) {
                            if (null === i) return true;
                            var n = r.getClassFromId(i);
                            return e.arePropertiesEqual(t, Object.keys(n.GeometryProperties));
                        }
                    }
                    return false;
                }),
                (h.GeometryProperties = {
                    shp: null,
                    sh: null,
                }),
                (h.polynomialTransform = function (e, t, i) {
                    var n = i[0],
                        r = i[1],
                        o = (e - n) / (r - n);
                    return Math.pow(o, t) * (r - n) + n;
                }),
                (h.polynomialInverseTransform = function (e, t, i) {
                    var n = i[0],
                        r = i[1];
                    return Math.pow((e - n) / (r - n), 1 / t) * (r - n) + n;
                }),
                (h.prototype.getShaderClass = function () {
                    var e = null;
                    if ("function" != typeof (e = require(817)("./" + this.$sh.toLowerCase().substr(1)))) throw new Error("shader not found");
                    return e;
                }),
                (h.prototype.propertyTransform = function (e, t) {
                    return t;
                }),
                (h.prototype.propertyInverseTransform = function (e, t) {
                    return t;
                }),
                (h.prototype.getEffectType = function () {
                    return GStylable.Effect.Type.Filter;
                }),
                (h.prototype.getEffectPadding = function () {
                    throw "Not implemented";
                }),
                (h.prototype.isFullCanvasEffect = function () {
                    return this._useCroppedRendering;
                }),
                (h.prototype.isAffectedByGLBug = function () {
                    if (this._isAffectedByGLBug) return true;
                    var e = this.getEffectPadding();
                    return "number" == typeof e ? e > 0 : !!e.length && Math.max.apply(0, e) > 0;
                }),
                (h.prototype.render = function (e, t, i, n, r, o, a) {
                    if (this.canApplyNativeEffect())
                        return (
                            this.applyNativeEffect(e, null, null, n),
                            e.drawCanvas(e, 0, 0, 1, s.CompositeOperator.Copy),
                            this.removeNativeEffect(e),
                            e
                        );
                    if (this.$sh && !this.prepareShader()) return false;
                    var h = t || e;
                    t && t.drawCanvas(e, 0, 0, 1, this._defaultBlending);
                    var A = this.drawShader(h, this.$shp, n, 0, 0, r, o, a);
                    return (this.$sh && l.DELETE_EFFECT_TEXTURES_AFTER_DRAW && this.destroy(), A);
                }),
                (h.prototype._handleChange = function (e, t) {
                    if (e === r._Change.Store) this.storeProperties(t.blob, h.GeometryProperties);
                    else if (e === r._Change.Restore) this.restoreProperties(t.blob, h.GeometryProperties);
                    else if (e === r._Change.WorkspaceAttached) {
                        (i = this.getScene()) && i.addDestroyable(this);
                    } else if (e === r._Change.WorkspaceDetach) {
                        var i;
                        (i = this.getScene()) && i.destroy([this]);
                    }
                    (this._handleGeometryChangeForProperties(e, t, h.GeometryProperties),
                        GStylable.Effect.prototype._handleChange.call(this, e, t));
                }),
                (h.prototype.destroy = function () {
                    this._destroy();
                }),
                (h.prototype.toString = function () {
                    return "[Object GWebGLEffect]";
                }),
                (module.exports = h));
        };
