module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLDotScreenEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.isAffectedByChildren = function () {
                    return true;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLDotScreenEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        centerX: 50,
                        centerY: 50,
                        angle: 0,
                        size: 10,
                    },
                    sh: "GGLDotScreenShader",
                }),
                (a.RANGES = {
                    centerX: [0, 100],
                    centerY: [0, 100],
                    size: [0, 20],
                    angle: [0, Math.PI / 2],
                }),
                (module.exports = a));
        };
