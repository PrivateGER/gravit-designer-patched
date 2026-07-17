module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(193), require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            GPlatform = require(15);
        require(1259);
        var scrubbingFeature = _interopRequireDefault(require(1278)),
            methods = {
                value: function (newValue) {
                    var element = $(this),
                        state = element.data("ginputbox");
                    function stripPostfix(text) {
                        if (state) {
                            var documentUnit = null;
                            "undefined" != typeof gDesigner &&
                                gDesigner.getActiveDocument() &&
                                (documentUnit = gDesigner.getActiveDocument().getScene().getProperty("ut"));
                            var postfix = state.options && state.options.postfix !== documentUnit ? state.options.postfix : null;
                            if (text && text.length && state && postfix) {
                                var postfixIndex = text.lastIndexOf(postfix);
                                postfixIndex >= 0 && (text = text.substr(0, postfixIndex));
                            }
                        }
                        return text;
                    }
                    function clampValue(rawText) {
                        if (state) {
                            var isEmpty = "" === (rawText = stripPostfix(rawText)),
                                parsedValue = isEmpty ? null : GObject.GLength.parseEquationValue(rawText),
                                minValue = state.options ? state.options.minValue : null,
                                maxValue = state.options ? state.options.maxValue : null;
                            ("number" != typeof minValue && "number" != typeof maxValue) ||
                                (("number" == typeof parsedValue && isFinite(parsedValue)) || (isEmpty && state.options.allowEmptyValue)
                                    ? "number" == typeof minValue && null !== parsedValue && parsedValue < minValue
                                        ? (rawText = minValue.toString())
                                        : "number" == typeof maxValue && null !== parsedValue && parsedValue > maxValue && (rawText = maxValue.toString())
                                    : (rawText = "number" == typeof minValue ? minValue.toString() : maxValue.toString()));
                        }
                        return rawText;
                    }
                    function setValue(value) {
                        if (((value || 0 === value) && (value = (value = value.toString()).replace(",", ".")), state)) {
                            if (
                                ((value = clampValue(value)),
                                state.options.allowEmptyValue || value || (value = "0"),
                                state.options.replace && null !== state.options.replace.oldValue && value === state.options.replace.oldValue)
                            )
                                return element.val(state.options.replace.newValue);
                            var documentUnit = null;
                            "undefined" != typeof gDesigner &&
                                gDesigner.getActiveDocument() &&
                                (documentUnit = gDesigner.getActiveDocument().getScene().getProperty("ut"));
                            var postfix = state.options && state.options.postfix !== documentUnit ? state.options.postfix : null;
                            value && value.length && postfix && value.substr(value.length - postfix.length) !== postfix && (value += postfix);
                        }
                        var inputElement = element[0];
                        return (inputElement && (inputElement.value = value), element);
                    }
                    if (arguments.length) return setValue(newValue);
                    var rawValue = element.val();
                    rawValue = stripPostfix(rawValue);
                    var noValue = "" === rawValue,
                        numericValue = noValue ? null : GObject.GLength.parseEquationValue(rawValue);
                    return ((rawValue = clampValue(rawValue)), (state && (state.options.allowEmptyValue || (rawValue && null !== numericValue && isFinite(numericValue)))) || (rawValue = "0"), rawValue);
                },
                increment: function (fastKey, slowKey, decrement) {
                    var element = $(this),
                        state = element.data("ginputbox"),
                        currentValue = parseFloat(GObject.GUtil.parseNumber(methods.value.call(this)));
                    if ("number" == typeof currentValue && !isNaN(currentValue) && state) {
                        var documentUnit,
                            incrementAmount = fastKey
                                ? state.options.fastIncrementValue
                                : slowKey && "%" !== state.options.postfix
                                  ? state.options.slowIncrementValue
                                  : state.options.incrementValue,
                            decimals = 2;
                        ("undefined" != typeof gDesigner &&
                            gDesigner.getActiveDocument() &&
                            ((documentUnit = gDesigner.getActiveDocument().getScene().getProperty("ut")),
                            (decimals = gDesigner.getActiveDocument().getScene().getOptimalDecimalsCount())),
                            (documentUnit !== GObject.GLength.Unit.IN && documentUnit !== GObject.GLength.Unit.CM) ||
                                (state.options.postfix !== documentUnit && null !== state.options.postfix) ||
                                state.fixedIncrement ||
                                (incrementAmount *= 0.1),
                            incrementAmount < 1 && 0 == decimals && (incrementAmount = 1),
                            decrement ? (currentValue -= incrementAmount) : (currentValue += incrementAmount),
                            methods.value.call(this, GObject.GUtil.formatNumber(currentValue, decimals)),
                            element.change());
                    }
                },
                mousemoveIncrement: function (fastKey, slowKey, currentValue, delta) {
                    var element = $(this),
                        state = element.data("ginputbox");
                    if ("number" == typeof currentValue && !isNaN(currentValue) && state) {
                        var documentUnit,
                            incrementAmount = fastKey
                                ? state.options.fastIncrementValue * delta
                                : slowKey && "%" !== state.options.postfix
                                  ? delta * state.options.slowIncrementValue
                                  : delta,
                            decimals = 2;
                        ("undefined" != typeof gDesigner &&
                            gDesigner.getActiveDocument() &&
                            ((documentUnit = gDesigner.getActiveDocument().getScene().getProperty("ut")),
                            (decimals = gDesigner.getActiveDocument().getScene().getOptimalDecimalsCount())),
                            (documentUnit !== GObject.GLength.Unit.IN && documentUnit !== GObject.GLength.Unit.CM) ||
                                (state.options.postfix !== documentUnit && null !== state.options.postfix) ||
                                state.fixedIncrement ||
                                (incrementAmount *= 0.1),
                            incrementAmount < 1 && 0 == decimals && (incrementAmount = 1));
                        var newValue = currentValue + incrementAmount;
                        return (methods.value.call(this, GObject.GUtil.formatNumber(newValue, decimals)), element.change(), newValue);
                    }
                },
                onFocusIn: function () {
                    var element = $(this);
                    ((element.data("ginputbox").receivingFocus = true), element.css("border", "1px solid rgba(215, 46, 99, 0.3)"));
                },
                onFocusOut: function () {
                    var element = $(this);
                    ((element.data("ginputbox").insideClicked = false), (element.data("ginputbox").leftMouseMoved = false), element.css("border", ""));
                },
                requestFocus: function () {
                    var element = $(this),
                        state = element.data("ginputbox");
                    state.receivingFocus && (state.options.selectOnFocus && element.select(), (state.receivingFocus = false));
                },
                onMouseEnter: function () {
                    var element = $(this),
                        state = element.data("ginputbox");
                    !state.insideClicked &&
                        state.options.mousemoveIncrement &&
                        (element.css("cursor", "url(assets/cursor/cursor-scrub.svg) 16 16, auto"),
                        element.css("border", "1px solid rgba(215, 46, 99, 0.3)"));
                },
                onMouseLeave: function () {
                    var element = $(this),
                        state = element.data("ginputbox");
                    state.leftMouseMoved || state.insideClicked || !state.options.mousemoveIncrement || (element.css("cursor", ""), element.css("border", ""));
                },
                leftMouseDown: function (event) {
                    var element = $(this),
                        state = element.data("ginputbox");
                    if (((state.strValue = element.val()), !state.insideClicked && state.options.mousemoveIncrement)) {
                        (element.css("border", "1px solid rgba(215, 46, 99, 0.3)"), (state.leftMouseMoved = false));
                        var currentValue = parseFloat(GObject.GUtil.parseNumber(methods.value.call(this)));
                        "" === state.strValue && isNaN(currentValue) && (currentValue = 0);
                        var lastPageY = null,
                            scrollParent = element.scrollParent();
                        "undefined" != typeof gDesigner && scrollParent && gDesigner.isTouchDevice() && scrollParent.css("overflow-y", "hidden");
                        var onMouseMove = function (event) {
                                event.originalEvent.cancelable && event.preventDefault();
                                var delta = 0,
                                    pageY =
                                        event.pageY ||
                                        (event.originalEvent.changedTouches &&
                                            event.originalEvent.changedTouches[0] &&
                                            event.originalEvent.changedTouches[0].pageY);
                                (null === lastPageY
                                    ? ($("html").css("cursor", "url(assets/cursor/cursor-scrub.svg) 16 16, auto"),
                                      $("html").css("user-select", "none"),
                                      $("body").css("pointer-events", "none"),
                                      (state.leftMouseMoved = true),
                                      (lastPageY = pageY))
                                    : ((delta = lastPageY - pageY), (lastPageY = pageY)),
                                    (currentValue = methods.mousemoveIncrement.call(
                                        element[0],
                                        GPlatform.GPlatform.modifiers.shiftKey || event.shiftKey,
                                        GPlatform.GPlatform.modifiers.optionKey || event.altKey,
                                        currentValue,
                                        delta
                                    )));
                            },
                            onMouseUp = function (event) {
                                ($("body").css("pointer-events", ""),
                                    $("html").css("cursor", ""),
                                    $("html").css("user-select", ""),
                                    $("html").unbind("mousemove", onMouseMove),
                                    $("html").unbind("mouseup", onMouseUp),
                                    element.off("touchmove", onMouseMove),
                                    "undefined" != typeof gDesigner && !gDesigner.isTouchDevice() && state.leftMouseMoved && element.blur(),
                                    "undefined" != typeof gDesigner &&
                                        gDesigner.isTouchDevice() &&
                                        (scrollParent && scrollParent.css("overflow-y", "auto"), element.is(":focus") || element.css("border", "")));
                            };
                        (element.on("touchmove", onMouseMove), $("html").bind("mousemove", onMouseMove), $("html").bind("mouseup", onMouseUp));
                    }
                },
                leftMouseUp: function () {
                    var element = $(this),
                        state = element.data("ginputbox");
                    state.options.mousemoveIncrement &&
                        (state.leftMouseMoved || ((state.insideClicked = true), element.css("cursor", "")),
                        "undefined" != typeof gDesigner &&
                            gDesigner.isTouchDevice() &&
                            state.leftMouseMoved &&
                            state.strValue === element.val() &&
                            element.trigger("focus"));
                },
                isInit: function () {
                    return !!$(this).data("ginputbox");
                },
                init: function (options) {
                    return (
                        this.each(function () {
                            var element = this,
                                jqElement = $(this);
                            ((options = $.extend(
                                {
                                    selectOnFocus: true,
                                    triggerChangeOnEnter: true,
                                    keyIncrement: true,
                                    wheelIncrement: true,
                                    mousemoveIncrement: true,
                                    incrementValue: 1,
                                    fastIncrementValue: 10,
                                    slowIncrementValue: 0.1,
                                    fixedIncrement: false,
                                    minValue: null,
                                    maxValue: null,
                                    postfix: null,
                                },
                                options
                            )),
                                jqElement
                                    .data("ginputbox", {
                                        options: options,
                                        receivingFocus: false,
                                        enterKeyValue: void 0,
                                        insideClicked: false,
                                        leftMouseMoved: false,
                                        strValue: void 0,
                                    })
                                    .prop("draggable", false),
                                options.created ||
                                    jqElement
                                        .on("change", function (event) {
                                            methods.value.call(element, jqElement.val());
                                        })
                                        .on("focusin", function (event) {
                                            methods.onFocusIn.call(element);
                                        })
                                        .on("focusout", function (event) {
                                            methods.onFocusOut.call(element);
                                        })
                                        .on("click", function (event) {
                                            methods.requestFocus.call(element);
                                        })
                                        .on("wheel", function (event) {
                                            if (jqElement.data("ginputbox").options.wheelIncrement && jqElement.is(":focus")) {
                                                event.preventDefault();
                                                var delta = 0 != event.originalEvent.deltaX ? event.originalEvent.deltaX : event.originalEvent.deltaY;
                                                methods.increment.call(
                                                    element,
                                                    GPlatform.GPlatform.modifiers.shiftKey || event.shiftKey,
                                                    GPlatform.GPlatform.modifiers.optionKey || event.altKey,
                                                    delta > 0
                                                );
                                            }
                                        })
                                        .on("keydown", function (event) {
                                            var state = jqElement.data("ginputbox");
                                            ((38 != event.keyCode && 40 !== event.keyCode) ||
                                                !state.options.keyIncrement ||
                                                (event.preventDefault(),
                                                methods.increment.call(
                                                    element,
                                                    GPlatform.GPlatform.modifiers.shiftKey || event.shiftKey,
                                                    GPlatform.GPlatform.modifiers.optionKey || event.altKey,
                                                    40 === event.keyCode
                                                ),
                                                jqElement.trigger("focus")),
                                                13 === event.keyCode && state.options.triggerChangeOnEnter && jqElement.blur());
                                        })
                                        .on("mouseenter", function (event) {
                                            scrubbingFeature.default.isEnabled() && (event.preventDefault(), methods.onMouseEnter.call(element));
                                        })
                                        .on("mouseleave", function (event) {
                                            scrubbingFeature.default.isEnabled() && methods.onMouseLeave.call(element);
                                        })
                                        .on("mousedown", function (event) {
                                            scrubbingFeature.default.isEnabled() &&
                                                1 === event.which &&
                                                (methods.leftMouseDown.call(element, event), $(this).parents(".properties-panel").addClass("noscroll"));
                                        })
                                        .on("mouseup", function (event) {
                                            scrubbingFeature.default.isEnabled() &&
                                                1 === event.which &&
                                                (methods.leftMouseUp.call(element), $(this).parents(".properties-panel").removeClass("noscroll"));
                                        }));
                        }),
                        this
                    );
                },
            };
        $.fn.gInputBox = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
