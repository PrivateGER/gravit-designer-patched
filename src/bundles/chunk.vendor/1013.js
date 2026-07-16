module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLTrueBlurEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return this.$shp.radius;
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLTrueBlurEffect", "name", this.getNodeName());
                }),
                (a.GeometryProperties = {
                    shp: {
                        radius: 5,
                    },
                    sh: "GGLTrueBlurShader",
                }),
                (a.RANGES = {
                    radius: [0, 50],
                }),
                (module.exports = a));
        };
