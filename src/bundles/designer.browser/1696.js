module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(32), require(33));
        var GObject = require(1);
        var methods = {
            init: function (settings) {
                settings = $.extend({}, settings);
                const blendModeGroups = [
                    {
                        group: null,
                        options: [
                            {
                                type: GObject.GPaintCanvas.BlendMode.Normal,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.normal"),
                                isCompatible: true,
                            },
                        ],
                    },
                    {
                        group: GObject.GLocale.getValue("GAppearanceProperties", "text.darken-image"),
                        options: [
                            {
                                type: GObject.GPaintCanvas.BlendMode.Darken,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.darken"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Multiply,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.multiply"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.ColorBurn,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.colorburn"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Subtract,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.subtract"),
                                isCompatible: false,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.LinearBurn,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.linearburn"),
                                isCompatible: false,
                            },
                        ],
                    },
                    {
                        group: GObject.GLocale.getValue("GAppearanceProperties", "text.lighten-image"),
                        options: [
                            {
                                type: GObject.GPaintCanvas.BlendMode.Lighten,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.lighten"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Screen,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.screen"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.ColorDodge,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.colordodge"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.LinearDodge,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.lineardodge"),
                                isCompatible: false,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Add,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.add"),
                                isCompatible: false,
                            },
                        ],
                    },
                    {
                        group: GObject.GLocale.getValue("GAppearanceProperties", "text.boost-contrast"),
                        options: [
                            {
                                type: GObject.GPaintCanvas.BlendMode.Overlay,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.overlay"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.SoftLight,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.softlight"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.HardLight,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.hardlight"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.VividLight,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.vividlight"),
                                isCompatible: false,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.LinearLight,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.linearlight"),
                                isCompatible: false,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.PinLight,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.pinlight"),
                                isCompatible: false,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.HardMix,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.hardmix"),
                                isCompatible: false,
                            },
                        ],
                    },
                    {
                        group: GObject.GLocale.getValue("GAppearanceProperties", "text.adjust-colors"),
                        options: [
                            {
                                type: GObject.GPaintCanvas.BlendMode.Hue,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.hue"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Saturation,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.saturation"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Color,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.color"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Luminosity,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.luminosity"),
                                isCompatible: true,
                            },
                        ],
                    },
                    {
                        group: GObject.GLocale.getValue("GAppearanceProperties", "text.invert-colors"),
                        options: [
                            {
                                type: GObject.GPaintCanvas.BlendMode.Difference,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.difference"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Exclusion,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.exclusion"),
                                isCompatible: true,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Divide,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.divide"),
                                isCompatible: false,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Power,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.power"),
                                isCompatible: false,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Harmonic,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.harmonic"),
                                isCompatible: false,
                            },
                            {
                                type: GObject.GPaintCanvas.BlendMode.Sin,
                                name: GObject.GLocale.getValue("GPaintCanvas", "blend.sin"),
                                isCompatible: false,
                            },
                        ],
                    },
                ];
                return this.each(function () {
                    const element = $(this);
                    for (let n = 0; n < blendModeGroups.length; ++n) {
                        let target = element;
                        const { group, options } = blendModeGroups[n];
                        (group && ((target = $('<optgroup label="' + group + '"></optgroup>')), element.append(target)),
                            options.forEach((option) => {
                                let { type, name, isCompatible } = option;
                                target.append(
                                    $("<option></option>")
                                        .attr("value", type)
                                        .text("".concat(name).concat(isCompatible ? "" : " *"))
                                );
                            }));
                    }
                });
            },
        };
        $.fn.gBlendMode = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
