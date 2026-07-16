module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLVibranceEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLVibranceEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        amount: 0.5,
                    },
                    sh: "GGLVibranceShader",
                }),
                (a.RANGES = {
                    amount: [-1, 1],
                }),
                (module.exports = a));
        };
