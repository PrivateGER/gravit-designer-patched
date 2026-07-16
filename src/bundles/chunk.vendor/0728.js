module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                o = require(14),
                a = require(12),
                String = require(9);

            function l() {
                (r.call(this), this._setDefaultProperties(l.GeometryProperties));
            }
            (n.inherit("GGLSepiaEffect", l, r),
                (l.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLSepiaEffect", "name", this.getNodeName());
                }),
                (l.GeometryProperties = {
                    shp: {
                        amount: 0.5,
                    },
                    sh: "GGLSepiaShader",
                }),
                (l.RANGES = {
                    amount: [0, 1],
                }),
                (l.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (l.prototype.canApplyNativeEffect = function () {
                    return o.hasFilters();
                }),
                (l.prototype.applyNativeEffect = function (e, t, i, n) {
                    e.setFilter(o.Filter.Sepia, a.clamp(0, this.$shp.amount, 1));
                }),
                (l.prototype.removeNativeEffect = function (e, t, i) {
                    e.setFilter(o.Filter.Sepia, null);
                }),
                (module.exports = l));
        };
