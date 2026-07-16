module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLSketchEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLSketchEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        strength: 0.5,
                    },
                    sh: "GGLSketchShader",
                }),
                (a.RANGES = {
                    strength: [0, 2],
                }),
                (module.exports = a));
        };
