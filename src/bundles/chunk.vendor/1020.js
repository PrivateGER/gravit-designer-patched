module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLUnsharpMaskEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLUnsharpMaskEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        radius: 0,
                        strength: 0,
                    },
                    sh: "GGLUnsharpMaskShader",
                }),
                (a.RANGES = {
                    radius: [0, 200],
                    strength: [0, 5],
                }),
                (module.exports = a));
        };
