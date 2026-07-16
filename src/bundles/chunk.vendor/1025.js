module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLRecolourEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.GeometryProperties = {
                    shp: {
                        hue: 1,
                        saturation: 1,
                    },
                    sh: "GGLRecolourShader",
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLRecolourEffect", "name", this.getNodeName());
                }),
                (a.RANGES = {
                    hue: [0, 1],
                    saturation: [0, 1],
                }),
                (module.exports = a));
        };
