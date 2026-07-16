module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLToonEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLToonEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        threshold: 0.2,
                        quantization: 10,
                    },
                    sh: "GGLToonShader",
                }),
                (a.RANGES = {
                    threshold: [0, 2],
                    quantization: [0, 20],
                }),
                (module.exports = a));
        };
