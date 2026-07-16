module.exports = function (module, exports, require) {
            var GStylable = require(28),
                r = require(2),
                o = require(51),
                String = require(9);

            function s() {
                (o.call(this), this._setDefaultProperties(s.GeometryProperties));
            }
            (r.inherit("GGLInnerGlowEffect", s, o),
                (s.prototype.getEffectType = function () {
                    return GStylable.Effect.Type.Filter;
                }),
                (s.prototype.getEffectPadding = function () {
                    return 1;
                }),
                (s.prototype.propertyTransform = function (e, t) {
                    switch (e) {
                        case "radius":
                            return o.polynomialTransform(t, 2, s.RANGES.radius);
                    }
                    return t;
                }),
                (s.prototype.propertyInverseTransform = function (e, t) {
                    switch (e) {
                        case "radius":
                            return o.polynomialInverseTransform(t, 2, s.RANGES.radius);
                    }
                    return t;
                }),
                (s.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLInnerGlowEffect", "name", this.getNodeName());
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
                    sh: "GGLInnerGlowShader",
                }),
                (s.RANGES = {
                    radius: [0, 50],
                    intensity: [0, 2],
                }),
                (module.exports = s));
        };
