module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLColorHalfToneEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLColorHalfToneEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        centerX: 50,
                        centerY: 50,
                        angle: 0,
                        size: 50,
                    },
                    sh: "GGLColorHalfToneShader",
                }),
                (a.RANGES = {
                    centerX: [0, 100],
                    centerY: [0, 100],
                    angle: [0, Math.PI / 2],
                    size: [3, 20],
                }),
                (module.exports = a));
        };
