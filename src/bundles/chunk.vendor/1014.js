module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLDenoiseEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.isAffectedByChildren = function () {
                    return true;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLDenoiseEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        exponent: 10,
                    },
                    sh: "GGLDenoiseShader",
                }),
                (a.RANGES = {
                    exponent: [0, 50],
                }),
                (module.exports = a));
        };
