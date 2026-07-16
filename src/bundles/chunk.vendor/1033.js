module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLDrunkEffect", a, r),
                (a.prototype.getEffectPadding = function () {
                    return 0;
                }),
                (a.prototype.getAbsoluteEffectPadding = function () {
                    var e = this.$shp.radius,
                        t = Math.abs(this.$shp.strengthX),
                        i = Math.abs(this.$shp.strengthY);
                    return [t * e, i * e, t * e, i * e];
                }),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLDrunkEffect", "name", this.getNodeName());
                }),
                (a.prototype.isAffectedByChildren = function () {
                    return true;
                }),
                (a.GeometryProperties = {
                    shp: {
                        strengthX: 0.5,
                        strengthY: 0,
                        radius: 50,
                    },
                    sh: "GGLDrunkShader",
                }),
                (a.RANGES = {
                    strengthX: [-1, 1],
                    strengthY: [-1, 1],
                    radius: [0, 100],
                }),
                (module.exports = a));
        };
