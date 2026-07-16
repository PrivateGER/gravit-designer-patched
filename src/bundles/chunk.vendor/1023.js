module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLLensBlurEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return this.$shp.radius;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLLensBlurEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        radius: 10,
                        brightness: 0,
                        angle: 0,
                    },
                    sh: "GGLLensBlurShader",
                }),
                (a.RANGES = {
                    radius: [0, 50],
                    brightness: [-1, 1],
                    angle: [-Math.PI, Math.PI],
                }),
                (module.exports = a));
        };
