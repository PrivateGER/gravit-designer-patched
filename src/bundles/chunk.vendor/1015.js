module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                GStylable = require(28),
                String = require(9);

            function s() {
                (r.call(this), this._setDefaultProperties(s.GeometryProperties));
            }
            (n.inherit("GGLOuterGlowEffect", s, r),
                (s.prototype.getEffectType = function () {
                    return GStylable.Effect.Type.PostEffect;
                }),
                (s.prototype.getEffectPadding = function () {
                    return this.$shp.radius;
                }),
                (s.prototype.propertyTransform = function (e, t) {
                    switch (e) {
                        case "radius":
                            return r.polynomialTransform(t, 2, s.RANGES.radius);
                    }
                    return t;
                }),
                (s.prototype.propertyInverseTransform = function (e, t) {
                    switch (e) {
                        case "radius":
                            return r.polynomialInverseTransform(t, 2, s.RANGES.radius);
                    }
                    return t;
                }),
                (s.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLOuterGlowEffect", "name", this.getNodeName());
                }),
                (s.GeometryProperties = {
                    shp: {
                        radius: 5,
                        intensity: 1,
                        color: [255, 255, 224],
                        opacity: {
                            type: "opacity",
                            value: 1,
                        },
                    },
                    sh: "GGLOuterGlowShader",
                }),
                (s.RANGES = {
                    radius: [0, 50],
                    intensity: [0, 2],
                }),
                (module.exports = s));
        };
