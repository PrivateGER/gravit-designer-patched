module.exports = function (module, exports, require) {
            var n = require(2),
                r = require(51),
                o = require(17),
                a = require(47),
                String = require(9);

            function l() {
                (r.call(this), this._setDefaultProperties(l.GeometryProperties));
            }
            (n.inherit("GGLStrokeLayerEffect", l, r),
                (l.prototype.getEffectPadding = function () {
                    return 0 == this.$shp.placement.value
                        ? this.$shp.width + 1
                        : 1 == this.$shp.placement.value
                          ? 1
                          : 1 + Math.ceil(this.$shp.width / 2);
                }),
                (l.prototype.propertyTransform = function (e, t) {
                    switch (e) {
                        case "width":
                            return r.polynomialTransform(t, 2, l.RANGES.width);
                        case "softness":
                            return r.polynomialTransform(t, 2, l.RANGES.softness);
                    }
                    return t;
                }),
                (l.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLStrokeLayerEffect", "name", this.getNodeName());
                }),
                (l.prototype.propertyInverseTransform = function (e, t) {
                    switch (e) {
                        case "width":
                            return r.polynomialInverseTransform(t, 2, l.RANGES.width);
                        case "softness":
                            return r.polynomialInverseTransform(t, 2, l.RANGES.softness);
                    }
                    return t;
                }),
                (l.GeometryProperties = {
                    shp: {
                        width: 5,
                        softness: 0.5,
                        shape: 0.7071,
                        color: o.WHITE.getValue(),
                        opacity: {
                            type: "opacity",
                            value: 1,
                        },
                        ellyptical: false,
                        placement: {
                            type: "dropdown",
                            value: 0,
                        },
                    },
                    sh: "GGLStrokeLayerShader",
                }),
                (l.RANGES = {
                    width: [0, 100],
                    softness: [0.01, 1],
                    shape: [0, 2],
                    placement: [
                        new a("GGLStrokeLayerEffect", "text.outside"),
                        new a("GGLStrokeLayerEffect", "text.inside"),
                        new a("GGLStrokeLayerEffect", "text.center"),
                    ],
                }),
                (module.exports = l));
        };
