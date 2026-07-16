module.exports = function (module, exports, require) {
            var IsFiniteNonNegativeNumber = require(0),
                r = require(293),
                o = require(197),
                a = function (e) {
                    if ((o.call(this), null != e.opacity && null != e.operation)) {
                        var t = Math.min(1, e.opacity);
                        (e.operation & r.OPERATIONFLAG_FILL && this.put("/ca", t),
                            e.operation & r.OPERATIONFLAG_STROKE && this.put("/CA", t));
                    }
                    if (e.blendMode) {
                        var i = a.BlendMode[e.blendMode.toUpperCase().replace(/-/g, "")];
                        i
                            ? i !== a.BlendMode.NORMAL && this.put("/BM", "/" + i)
                            : console.log("WARN: Unsupported blend mode: " + e.blendMode);
                    }
                    (e.smask && this.put("/SMask", e.smask),
                        e.type && this.put("/Type", "/" + e.type),
                        (this._origin = e.origin && !e.origin.isIdentity() ? e.origin : null));
                };
            (IsFiniteNonNegativeNumber.inherit(a, o),
                (a.BlendMode = {
                    NORMAL: "Normal",
                    MULTIPLY: "Multiply",
                    SCREEN: "Screen",
                    OVERLAY: "Overlay",
                    DARKEN: "Darken",
                    LIGHTEN: "Lighten",
                    COLORDODGE: "ColorDodge",
                    COLORBURN: "ColorBurn",
                    HARDLIGHT: "HardLight",
                    SOFTLIGHT: "SoftLight",
                    DIFFERENCE: "Difference",
                    EXCLUSION: "Exclusion",
                    HUE: "Hue",
                    SATURATION: "Saturation",
                    COLOR: "Color",
                    LUMINOSITY: "Luminosity",
                }),
                (module.exports = a));
        };
