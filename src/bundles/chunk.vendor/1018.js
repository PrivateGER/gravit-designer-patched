module.exports = function (module, exports, require) {
            var GNode = require(2),
                GWebGLEffect = require(51),
                GRGBColor = require(17),
                GLocaleKey = require(47),
                String = require(9);

            function GGLStrokeLayerEffect() {
                (GWebGLEffect.call(this), this._setDefaultProperties(GGLStrokeLayerEffect.GeometryProperties));
            }
            (GNode.inherit("GGLStrokeLayerEffect", GGLStrokeLayerEffect, GWebGLEffect),
                (GGLStrokeLayerEffect.prototype.getEffectPadding = function () {
                    return 0 == this.$shp.placement.value
                        ? this.$shp.width + 1
                        : 1 == this.$shp.placement.value
                          ? 1
                          : 1 + Math.ceil(this.$shp.width / 2);
                }),
                (GGLStrokeLayerEffect.prototype.propertyTransform = function (propertyName, value) {
                    switch (propertyName) {
                        case "width":
                            return GWebGLEffect.polynomialTransform(value, 2, GGLStrokeLayerEffect.RANGES.width);
                        case "softness":
                            return GWebGLEffect.polynomialTransform(value, 2, GGLStrokeLayerEffect.RANGES.softness);
                    }
                    return value;
                }),
                (GGLStrokeLayerEffect.prototype.getNodeNameTranslated = function () {
                    return String.getValue("GGLStrokeLayerEffect", "name", this.getNodeName());
                }),
                (GGLStrokeLayerEffect.prototype.propertyInverseTransform = function (propertyName, value) {
                    switch (propertyName) {
                        case "width":
                            return GWebGLEffect.polynomialInverseTransform(value, 2, GGLStrokeLayerEffect.RANGES.width);
                        case "softness":
                            return GWebGLEffect.polynomialInverseTransform(value, 2, GGLStrokeLayerEffect.RANGES.softness);
                    }
                    return value;
                }),
                (GGLStrokeLayerEffect.GeometryProperties = {
                    shp: {
                        width: 5,
                        softness: 0.5,
                        shape: 0.7071,
                        color: GRGBColor.WHITE.getValue(),
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
                (GGLStrokeLayerEffect.RANGES = {
                    width: [0, 100],
                    softness: [0.01, 1],
                    shape: [0, 2],
                    placement: [
                        new GLocaleKey("GGLStrokeLayerEffect", "text.outside"),
                        new GLocaleKey("GGLStrokeLayerEffect", "text.inside"),
                        new GLocaleKey("GGLStrokeLayerEffect", "text.center"),
                    ],
                }),
                (module.exports = GGLStrokeLayerEffect));
        };
