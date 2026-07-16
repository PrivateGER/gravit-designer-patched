module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLEdgeWorkEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.isAffectedByChildren = function () {
                    return true;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLEdgeWorkEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        radius: 10,
                    },
                    sh: "GGLEdgeWorkShader",
                }),
                (a.RANGES = {
                    radius: [1, 200],
                }),
                (module.exports = a));
        };
