module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13));
        var GObject = require(1),
            methods = {
                value: function (value) {
                    var unit = methods.options.call(this).unit;
                    if (arguments.length > 0) {
                        if (value) {
                            var document = gDesigner.getActiveDocument(),
                                scene = document ? document.getScene() : null;
                            $(this).gInputBox("value", GObject.GUtil.formatNumber(value.toUnit(unit), scene ? scene.getOptimalDecimalsCount(unit) : 2));
                        } else $(this).val("");
                        return this;
                    }
                    var parsedLength = GObject.GLength.parseEquation($(this).val(), unit);
                    return parsedLength ? parsedLength.convert(unit) : new GObject.GLength(0, unit);
                },
                list: function (list) {
                    methods.options.call(this).list = list;
                },
                options: function () {
                    return $(this).data("ginputbox").options;
                },
                init: function (options) {
                    return (
                        ((options = $.extend({ unit: GObject.GLength.Unit.PX, created: false }, options)).postfix = options.unit),
                        this.each(function () {
                            var element = $(this),
                                domElement = this;
                            ($(this).hasClass("g-unitbox") ? (options.created = true) : element.addClass("g-unitbox").attr("type", "text"),
                                element.gInputBox("isInit") || element.gInputBox(options));
                            var highlightSelectedOption = function () {
                                let currentValue = element.gInputBox("value"),
                                    optionItems = $(".g-unitbox.option-list").find(".option-item");
                                if ((optionItems.removeClass("g-selected"), currentValue))
                                    for (let t = 0; t < optionItems.length; ++t) {
                                        let optionItem = optionItems[t];
                                        $(optionItem).data("value") == currentValue && $(optionItem).addClass("g-selected");
                                    }
                            };
                            (element.on("change", function () {
                                highlightSelectedOption();
                            }),
                                options.list &&
                                    (element.unbind("click"),
                                    element.on("click", function (event) {
                                        gDesigner.stats("unitbox_" + (options.source || "") + "_button");
                                        for (
                                            var optionList = $("<div></div>").addClass("g-unitbox").addClass("option-list"),
                                                overlay = $("<div></div>"),
                                                c = 0;
                                            c < options.list.length;
                                            c++
                                        )
                                            $("<div></div>")
                                                .addClass("option-item")
                                                .text(options.list[c] + " " + options.postfix)
                                                .data("value", options.list[c])
                                                .on("mousedown", function () {
                                                    (methods.value.call(domElement, new GObject.GLength($(this).data("value"), options.unit)),
                                                        element.trigger("change"),
                                                        overlay.gOverlay("close"));
                                                })
                                                .appendTo(optionList);
                                        (overlay.append(optionList).gOverlay({
                                            releaseOnClose: true,
                                            padding: false,
                                            enterCallback: function () {
                                                var hoveredItem = $(".g-unitbox.option-list").find(".option-item:hover");
                                                (hoveredItem.length > 0 &&
                                                    (methods.value.call(domElement, new GObject.GLength($(hoveredItem).data("value"), options.unit)), element.trigger("change")),
                                                    overlay.gOverlay("close"));
                                            },
                                        }),
                                            overlay.css("min-width", element.outerWidth()),
                                            overlay.gOverlay("open", domElement),
                                            highlightSelectedOption(),
                                            element.gInputBox("requestFocus"));
                                    })));
                        }),
                        this
                    );
                },
            };
        $.fn.gUnitBox = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
