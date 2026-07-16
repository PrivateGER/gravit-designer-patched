module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLHexagonalEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.isAffectedByChildren = function () {
                    return true;
                }),
                (a.GeometryProperties = {
                    shp: {
                        centerX: 50,
                        centerY: 50,
                        scale: 1,
                    },
                    sh: "GGLHexagonalShader",
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLHexagonalEffect", "name", this.getNodeName());
                }),
                (a.RANGES = {
                    centerX: [0, 100],
                    centerY: [0, 100],
                    scale: [0, 100],
                }),
                (module.exports = a));
        };
