module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                o = require(206),
                a = require(365),
                s = require(226),
                l = require(14),
                String = require(9);

            function A() {
                (r.call(this), this._setDefaultProperties(A.GeometryProperties));
            }
            (n.inherit("GGLBlurEffect", A, r),
                (A.prototype._blurShader = null),
                (A.prototype._clipBlurShader = null),
                (A.prototype.setAffectedByGLBug = function (e) {
                    this._isAffectedByGLBug = e;
                }),
                (A.prototype.getEffectPadding = function () {
                    return this.$shp.clip ? 0 : this.$shp.radius;
                }),
                (A.prototype.getAbsoluteEffectPadding = function () {
                    return this.$shp.radius;
                }),
                (A.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLBlurEffect", "name", this.getNodeName());
                }),
                (A.prototype.canApplyNativeEffect = function () {
                    return this.$shp.radius && !this.$shp.clip && l.hasFilters();
                }),
                (A.prototype.applyNativeEffect = function (e, t, i, n) {
                    e.setFilter(l.Filter.Blur, this.$shp.radius * n);
                }),
                (A.prototype.removeNativeEffect = function (e, t, i) {
                    e.setFilter(l.Filter.Blur, null);
                }),
                (A.prototype.prepareShader = function () {
                    return (
                        !!s.getGLContext() &&
                        (this.$shp.clip
                            ? (this._clipBlurShader || (this._clipBlurShader = new a(this)),
                              this.shaderInstance instanceof a || (this.shaderInstance = this._clipBlurShader))
                            : (this._blurShader || (this._blurShader = new o(this)),
                              this.shaderInstance instanceof o || (this.shaderInstance = this._blurShader)),
                        r.prototype.prepareShader.call(this))
                    );
                }),
                (A.prototype.getShaderClass = function () {
                    return this.$shp.clip ? a : o;
                }),
                (A.prototype._destroy = function () {
                    (this._blurShader && (this._blurShader.destroy(), (this._blurShader = null)),
                        this._clipBlurShader && (this._clipBlurShader.destroy(), (this._clipBlurShader = null)),
                        (this.shaderInstance = null),
                        r.prototype._destroy.call(this));
                }),
                (A.GeometryProperties = {
                    shp: {
                        radius: 5,
                        clip: false,
                    },
                    sh: "GGLBlurShader",
                }),
                (A.RANGES = {
                    radius: [0, 50],
                }),
                (module.exports = A));
        };
