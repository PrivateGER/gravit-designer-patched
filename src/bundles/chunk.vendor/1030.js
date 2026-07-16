module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                o = require(315),
                String = require(9);

            function s() {
                (r.call(this), this._setDefaultProperties(s.GeometryProperties));
            }
            (n.inherit("GGLBendBlurEffect", s, r),
                (s.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLBendBlurEffect", "name", this.getNodeName());
                }),
                (s.prototype.getEffectPadding = function () {
                    var e = this.$shp.bend,
                        t = this.$shp.softness,
                        i = this.$shp.radius;
                    t <= 0 && (t = 0.001);
                    var n = i,
                        r = 0,
                        a = 0,
                        s = i,
                        l = t * (o.MAX_BLUR2 + i);
                    return (
                        e < 0 ? ((s += l), (n += -e + l)) : ((n += l), (s += e + l)),
                        (n += i * o.RADIUS_TO_BLUR),
                        (s += i * o.RADIUS_TO_BLUR),
                        [(r += l + i * o.RADIUS_TO_BLUR), n, (a += l + i * o.RADIUS_TO_BLUR), s]
                    );
                }),
                (s.prototype.getAbsoluteEffectPadding = function () {
                    var e = this.$shp.bend,
                        t = this.$shp.softness,
                        i = this.$shp.radius;
                    t <= 0 && (t = 0.001);
                    var n = i,
                        r = 0,
                        a = 0,
                        s = i,
                        l = t * (o.MAX_BLUR2 + i);
                    return (
                        (s = n = Math.abs(e) + l),
                        (n += i * o.RADIUS_TO_BLUR),
                        (s += i * o.RADIUS_TO_BLUR),
                        [(r += l + i * o.RADIUS_TO_BLUR), n, (a += l + i * o.RADIUS_TO_BLUR), s]
                    );
                }),
                (s.prototype.isAffectedByChildren = function () {
                    return true;
                }),
                (s.GeometryProperties = {
                    shp: {
                        radius: 50,
                        softness: 1,
                        bend: 50,
                        cov: 0.8,
                    },
                    sh: "GGLBendBlurShader",
                }),
                (s.RANGES = {
                    radius: [0, 100],
                    softness: [0, 50],
                    bend: [0, 50],
                    cov: [0, 1],
                }),
                (module.exports = s));
        };
