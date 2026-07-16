module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLFisheyeEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 100;
                }),
                (a.prototype.getAbsoluteEffectPadding = function () {
                    return this.$shp.strength < -50 ? 100 + Math.abs(this.$shp.strength + 50) : 100;
                }),
                (a.prototype.isAffectedByChildren = function () {
                    return true;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLFisheyeEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        strength: 50,
                    },
                    sh: "GGLFishEyeShader",
                }),
                (a.RANGES = {
                    strength: [-100, 100],
                }),
                (module.exports = a));
        };
