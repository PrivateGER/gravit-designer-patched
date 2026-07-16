module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLInkEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.GeometryProperties = {
                    shp: {
                        strength: 0.5,
                    },
                    sh: "GGLInkShader",
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLInkEffect", "name", this.getNodeName());
                }),
                (a.RANGES = {
                    strength: [0, 1],
                }),
                (module.exports = a));
        };
