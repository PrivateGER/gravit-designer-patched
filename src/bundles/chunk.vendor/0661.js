module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLNoiseEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLNoiseEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        amount: 0.5,
                    },
                    sh: "GGLNoiseShader",
                }),
                (a.RANGES = {
                    amount: [0, 1],
                }),
                (module.exports = a));
        };
