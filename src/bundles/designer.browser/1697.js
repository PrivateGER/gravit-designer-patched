module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(4), require(13), require(26));
        var GObject = require(1),
            cornerTypeConfigs = null;
        function getIconForCornerType(cornerType) {
            for (var t = 0; t < cornerTypeConfigs.length; ++t) if (cornerTypeConfigs[t].type === cornerType) return cornerTypeConfigs[t].icon;
            return null;
        }
        function updateActiveButtons(cornerType) {
            for (var t = 0; t < cornerTypeConfigs.length; ++t) $('button[data-corner-type="' + cornerTypeConfigs[t].type + '"]').toggleClass("g-active", cornerTypeConfigs[t].type === cornerType);
        }
        var methods = {
            init: function (options) {
                return (
                    (options = $.extend({ rotate: 0 }, options)),
                    cornerTypeConfigs ||
                        (cornerTypeConfigs = [
                            {
                                type: GObject.GPathBase.CornerType.Rounded,
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "corner.rounded")),
                                icon: "gravit-icon-corner-rounded",
                            },
                            {
                                type: GObject.GPathBase.CornerType.InverseRounded,
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "corner.inverse-rounded")),
                                icon: "gravit-icon-corner-inverse-rounded",
                            },
                            {
                                type: GObject.GPathBase.CornerType.Bevel,
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "corner.bevel")),
                                icon: "gravit-icon-corner-bevel",
                            },
                            {
                                type: GObject.GPathBase.CornerType.Inset,
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "corner.inset")),
                                icon: "gravit-icon-corner-inset",
                            },
                            {
                                type: GObject.GPathBase.CornerType.Fancy,
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "corner.fancy")),
                                icon: "gravit-icon-corner-fancy",
                            },
                        ]),
                    this.each(function () {
                        var element = this,
                            jqElement = $(this).data("gcornertype", {
                                cornerType: null,
                                notOverlay: options.notOverlay,
                                rotate: options.rotate,
                            }),
                            openPicker = function () {
                                for (var columns = [], percentWidth = 100 / cornerTypeConfigs.length, l = 0; l < cornerTypeConfigs.length; ++l)
                                    columns.push({
                                        width: Math.round(percentWidth) + "%",
                                        content: $("<button></button>")
                                            .addClass("g-flat")
                                            .toggleClass("g-active", cornerTypeConfigs[l].type === jqElement.data("gcornertype").cornerType)
                                            .attr("data-corner-type", cornerTypeConfigs[l].type)
                                            .attr("data-title", cornerTypeConfigs[l].title)
                                            .append(
                                                $("<span></span>")
                                                    .addClass(cornerTypeConfigs[l].icon)
                                                    .css("transform", "rotate(" + options.rotate + "deg)")
                                            )
                                            .on("click", function () {
                                                var selectedType = $(this).attr("data-corner-type");
                                                (methods.value.call(element, selectedType), jqElement.trigger("cornertypechange", selectedType));
                                                var typeName = "unkn",
                                                    typeKeys = Object.keys(GObject.GPathBase.CornerType);
                                                for (var l of typeKeys)
                                                    if (selectedType === GObject.GPathBase.CornerType[l]) {
                                                        typeName = l;
                                                        break;
                                                    }
                                                (gDesigner.stats("cornertypes_click_change", typeName), options.notOverlay || pickerElement.gOverlay("close"));
                                            }),
                                    });
                                var pickerElement = $("<div></div>")
                                    .css("width", options.notOverlay ? "100%" : "200px")
                                    .gPropertyRow({ columns: columns });
                                options.notOverlay
                                    ? jqElement.append(pickerElement)
                                    : pickerElement
                                          .on("open", function () {
                                              jqElement.trigger("open");
                                          })
                                          .on("close", function () {
                                              jqElement.trigger("close");
                                          })
                                          .gOverlay({
                                              releaseOnClose: true,
                                              clazz: "corner-picker-overlay",
                                          })
                                          .gOverlay("open", element);
                            };
                        options.notOverlay
                            ? openPicker()
                            : jqElement.append("<span></span>").on("click", function () {
                                  (gDesigner.stats("cornertypes_click_open"), openPicker());
                              });
                    })
                );
            },
            value: function (cornerType) {
                var element = $(this),
                    pickerData = element.data("gcornertype");
                return arguments.length
                    ? ((pickerData.cornerType = cornerType),
                      pickerData.notOverlay
                          ? (element.find("." + getIconForCornerType(pickerData.cornerType)), updateActiveButtons(pickerData.cornerType))
                          : element
                                .find("span")
                                .attr("class", getIconForCornerType(pickerData.cornerType))
                                .css("transform", "rotate(" + pickerData.rotate + "deg)"),
                      this)
                    : pickerData.cornerType;
            },
            update: function (cornerType) {
                updateActiveButtons(cornerType);
            },
        };
        $.fn.gCornerTypePicker = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
