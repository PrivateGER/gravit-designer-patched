module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1),
            i = {
                init: function (e) {
                    var t = [
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
                        (e = $.extend({ short: false }, e)),
                        this.each(function () {
                            var n = $(this);
                            if (n.is("select"))
                                for (var o = 0; o < t.length; ++o)
                                    n.append(
                                        $("<option></option>")
                                            .attr("value", t[o].unit)
                                            .text(e.short ? t[o].short : t[o].name)
                                    );
                        })
                    );
                },
            };
        $.fn.gUnit = function (e) {
            return i[e]
                ? i[e].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof e && e
                  ? void $.error("Method " + e + " does not exist on jQuery.myPlugin")
                  : i.init.apply(this, arguments);
        };
    };
