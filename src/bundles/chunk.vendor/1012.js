module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLBloomEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return this.$shp.blurRadius;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLBloomEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        bloomIntensity: 1.25,
                        baseIntensity: 1,
                        bloomSaturation: 1,
                        baseSaturation: 1,
                        blurRadius: 4,
                        bloomThreshold: 0.25,
                    },
                    sh: "GGLBloomShader",
                }),
                (a.RANGES = {
                    bloomIntensity: [0, 2],
                    baseIntensity: [0, 2],
                    bloomSaturation: [0, 2],
                    baseSaturation: [0, 2],
                    blurRadius: [0, 50],
                    bloomThreshold: [0, 0.99],
                }),
                (module.exports = a));
        };
