module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLVignetteEffect", a, r),
                (a.prototype.getEffectPadding = function (e) {
                    return 0;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLVignetteEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        size: 0.2,
                        amount: 0.5,
                    },
                    sh: "GGLVignetteShader",
                }),
                (a.RANGES = {
                    size: [0, 1],
                    amount: [0, 1],
                }),
                (module.exports = a));
        };
