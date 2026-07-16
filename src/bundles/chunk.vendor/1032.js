module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                String = require(9);

            function a() {
                (r.call(this), this._setDefaultProperties(a.GeometryProperties));
            }
            (n.inherit("GGLBendEffect", a, r),
                (a.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLBendEffect", "name", this.getNodeName());
                }),
                (a.prototype.getEffectPadding = function () {
                    var e = this.$shp.radius * Math.sin((this.$shp.strengthX * Math.PI) / 2),
                        t = this.$shp.radius * Math.sin((this.$shp.strengthY * Math.PI) / 2);
                    return [Math.max(e, 0), Math.max(t, 0), Math.max(-e, 0), Math.max(-t, 0)];
                }),
                (a.prototype.getAbsoluteEffectPadding = function () {
                    var e = Math.abs(this.$shp.radius * Math.sin((this.$shp.strengthX * Math.PI) / 2)),
                        t = Math.abs(this.$shp.radius * Math.sin((this.$shp.strengthY * Math.PI) / 2));
                    return [e, t, e, t];
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
                    sh: "GGLBendShader",
                }),
                (a.RANGES = {
                    strengthX: [-1, 1],
                    strengthY: [-1, 1],
                    radius: [0, 100],
                }),
                (module.exports = a));
        };
