module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1),
            methods = {
                init: function (options) {
                    var units = [
                        {
                            unit: GObject.GLength.Unit.PX,
                            name: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.px")),
                            short: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.px.short"), void 0, GObject.GLocaleLanguage.English),
                        },
                        {
                            unit: GObject.GLength.Unit.MM,
                            name: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.mm")),
                            short: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.mm.short"), void 0, GObject.GLocaleLanguage.English),
                        },
                        {
                            unit: GObject.GLength.Unit.CM,
                            name: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.cm")),
                            short: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.cm.short"), void 0, GObject.GLocaleLanguage.English),
                        },
                        {
                            unit: GObject.GLength.Unit.IN,
                            name: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.in")),
                            short: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.in.short"), void 0, GObject.GLocaleLanguage.English),
                        },
                        {
                            unit: GObject.GLength.Unit.PC,
                            name: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.pc")),
                            short: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.pc.short"), void 0, GObject.GLocaleLanguage.English),
                        },
                        {
                            unit: GObject.GLength.Unit.PT,
                            name: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.pt")),
                            short: GObject.GLocale.get(new GObject.GLocaleKey("GLength", "unit.pt.short"), void 0, GObject.GLocaleLanguage.English),
                        },
                    ];
                    return (
                        (options = $.extend({ short: false }, options)),
                        this.each(function () {
                            var element = $(this);
                            if (element.is("select"))
                                for (var o = 0; o < units.length; ++o)
                                    element.append(
                                        $("<option></option>")
                                            .attr("value", units[o].unit)
                                            .text(options.short ? units[o].short : units[o].name)
                                    );
                        })
                    );
                },
            };
        $.fn.gUnit = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
