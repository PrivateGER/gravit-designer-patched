module.exports = function (module, exports, require) {
        "use strict";
        (require(193), require(3), require(4), require(13));
        var GObject = require(1);
        function GInputSlider() {}
        GInputSlider.prototype.OPACITY_DEFAULT = {
            min: 0,
            max: 100,
            custom: true,
            cssClass: "opacity",
        };
        var valueToPercent = function (element, value) {
                var min = $(element).data("options").min;
                return ((value - min) / ($(element).data("options").max - min)) * 100;
            },
            triggerEvent = function (element, eventName) {
                $(element).trigger(eventName);
            },
            setValueFromPosition = function (element, position, updateThumb) {
                var computedValue = (function (element, position, updateThumb) {
                    var min = $(element).data("options").min,
                        max = $(element).data("options").max,
                        track = $(element).find(".g-input-slider-track"),
                        thumb = $(element).find(".g-input-slider-thumb"),
                        trackWidth = track.width();
                    position || (position = thumb.offset().left - track.offset().left);
                    var percent = (100 * position) / trackWidth;
                    (percent < 0 ? (percent = 0) : percent > 100 && (percent = 100), updateThumb && thumb.css("left", percent + "%"));
                    var value = (percent * (max - min)) / 100 + min;
                    return (value > max ? (value = max) : value < min && (value = min), value);
                })(element, position, updateThumb);
                ($(element).attr("value", computedValue), updateBackground(element, valueToPercent(element, computedValue)), triggerEvent(element, "input"));
            },
            updateBackground = function (element, percent) {
                $(element).data("options").generic &&
                    ($(element).find(".g-input-slider-track .g-input-slider-background").remove(),
                    $(element)
                        .find(".g-input-slider-track")
                        .append(
                            $("<div/>")
                                .addClass("g-input-slider-background")
                                .css({ width: percent + "%" })
                        ));
            };
        var methods = {
            init: function (options, target) {
                return this.each(function () {
                    target || (target = this);
                    var stepValue,
                        min = options.min,
                        max = options.max;
                    ((options.generic = !options.background && !options.custom),
                        !options.maxDecimal &&
                            options.step &&
                            (options.maxDecimal = ((stepValue = options.step), Math.floor(stepValue) === stepValue ? 0 : stepValue.toString().split(".")[1].length || 0)));
                    var initialValue = 50;
                    initialValue < min ? (initialValue = min) : initialValue > max && (initialValue = max);
                    var thumbOffset = options.generic ? 10 : 8;
                    ($(target)
                        .addClass("g-input-slider")
                        .addClass(options.generic ? "generic" : "custom")
                        .addClass(options.cssClass ? options.cssClass : "")
                        .attr("value", initialValue)
                        .attr("min", min)
                        .attr("max", max)
                        .data("options", options),
                        options.generic || $(target).css("background", options.background));
                    var track = $("<div></div>")
                            .addClass("g-input-slider-track")
                            .addClass(options.generic ? "generic" : "custom"),
                        thumb = $("<div></div>")
                            .addClass("g-input-slider-thumb")
                            .addClass(options.generic ? "generic" : "custom");
                    (options.richTooltipConfig && thumb.gRichTooltip(options.richTooltipConfig), track.append(thumb));
                    var isDragging = false,
                        updatePosition = function (event) {
                            if ("disabled" !== $(target).attr("disabled")) {
                                var clientX = event.clientX,
                                    offsetLeft = $(target).offset().left;
                                setValueFromPosition(target, (clientX = clientX - offsetLeft - thumbOffset / 2), true);
                            }
                        };
                    ($(track).on("mousedown", function (event) {
                        1 == event.which && ((isDragging = true), $(thumb).addClass("active"), event.isTrusted && updatePosition(event));
                    }),
                        $(target).on("mousedown", function (event) {
                            1 == event.which && ((isDragging = true), $(thumb).addClass("active"), event.isTrusted && updatePosition(event));
                        }));
                    let mouseDownOnThumb = false;
                    $(thumb).on("mousedown", () => {
                        mouseDownOnThumb = true;
                    });
                    let touchMoved = false;
                    ($(target).on("touchstart", () => {
                        touchMoved = false;
                    }),
                        $(target).on("touchmove", () => {
                            touchMoved = true;
                        }),
                        $(window)
                            .on("mousemove", function (event) {
                                isDragging && (event.isTrusted || mouseDownOnThumb) && (updatePosition(event), event.preventDefault());
                            })
                            .mouseup(function (event) {
                                ((mouseDownOnThumb = false),
                                    isDragging &&
                                        (touchMoved || ((event) => !event.originalEvent.cancelable)(event) || updatePosition(event),
                                        (isDragging = false),
                                        "disabled" !== $(target).attr("disabled") &&
                                            (function (element) {
                                                ($(element)
                                                    .find(".g-input-slider-thumb")
                                                    .css("left", valueToPercent(element, $(element).attr("value")) + "%"),
                                                    triggerEvent(element, "change"));
                                            })(target),
                                        $(thumb).removeClass("active")));
                            }),
                        $(target).append(track));
                });
            },
            value: function (value) {
                var element = $(this);
                if (element.data("options")) {
                    var min = element.data("options").min,
                        max = element.data("options").max,
                        decimals = element.data("options").maxDecimal ? element.data("options").maxDecimal : 0;
                    if (void 0 === value)
                        return isNaN(element.attr("value")) ? parseFloat(element.attr("value")) : GObject.GUtil.formatNumber(element.attr("value"), decimals);
                    (isNaN(value) || (value = GObject.GUtil.formatNumber(value, decimals)), value > max ? (value = max) : value < min && (value = min));
                    var percent = valueToPercent(this, value);
                    (element.find(".g-input-slider-thumb").css("left", percent + "%"), updateBackground(this, percent), element.attr("value", value));
                }
                return this;
            },
            minValue: function () {
                return $(this).data("options").min;
            },
            maxValue: function () {
                return $(this).data("options").max;
            },
            disabled: function () {
                return arguments.length ? $(this).attr("disabled", arguments[0]) : $(this).attr("disabled");
            },
        };
        ((module.exports = GInputSlider),
            ($.fn.gInputSlider = function (method) {
                return methods[method]
                    ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof method && method
                      ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                      : methods.init.apply(this, arguments);
            }));
    };
