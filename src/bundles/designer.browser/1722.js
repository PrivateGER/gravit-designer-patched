module.exports = function (module, exports, require) {
        "use strict";
        require(57);
        var GPlatform = require(15),
            openOverlays = [],
            closeOverlaysOnOutsideEvent = function (event) {
                var closedOverlay = false;
                if (openOverlays.length > 0)
                    for (var n = openOverlays.length - 1; n >= 0; --n) {
                        var o = $(openOverlays[n]),
                            a = o.closest(".g-overlay"),
                            r = $(event.target).closest("body > *"),
                            s = false;
                        (a.parent().length > 0 &&
                            a.parent().hasClass("g-dialog-container") &&
                            0 === $(event.target).closest(".g-overlay").length &&
                            (s = true),
                            ($(r).index() < a.index() || s) && ((closedOverlay = true), o.gOverlay("close", event, n)));
                    }
                return closedOverlay;
            };
        (document.addEventListener(
            "mousedown",
            function (event) {
                closeOverlaysOnOutsideEvent(event);
            },
            true
        ),
            document.addEventListener(
                "keydown",
                function (event) {
                    var keyCode = event.which || event.keyCode;
                    if (27 === keyCode) closeOverlaysOnOutsideEvent(event) && event.stopPropagation();
                    else if (13 === keyCode && openOverlays.length > 0)
                        for (var n = openOverlays.length - 1; n >= 0; --n) {
                            var o = $(openOverlays[n]).data("goverlay"),
                                r = o && o.options;
                            r.enterCallback && r.enterCallback(event);
                        }
                },
                true
            ),
            window.addEventListener("resize", function () {
                for (var e = 0; e < openOverlays.length; ++e) {
                    $(openOverlays[e]).gOverlay("relayout");
                }
            }));
        var handleModifiersChanged = function (event) {
                event.changed.escapeKey && (event.isImmediatePropagationStopped = true);
            },
            methods = {
                init: function (options) {
                    return (
                        (options = $.extend(
                            {
                                modal: false,
                                padding: true,
                                releaseOnClose: false,
                                clazz: "",
                                enterCallback: null,
                                offsetX: 0,
                                offsetY: 0,
                                bottomOffsetY: 0,
                                customRight: null,
                                bottomClazz: null,
                                rightClazz: null,
                                closeCallback: null,
                                disableDarkShadow: false,
                                middle: false,
                                side: false,
                                sideClazz: "g-overlay-side",
                                flipHorizontal: false,
                            },
                            options
                        )),
                        this.each(function () {
                            $(this)
                                .data("goverlay", { options: options, target: null })
                                .wrap(
                                    $("<div></div>")
                                        .addClass("g-overlay")
                                        .addClass(options.clazz)
                                        .toggleClass("no-padding", !options.padding)
                                        .css("position", "absolute")
                                );
                        })
                    );
                },
                relayout: function () {
                    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    options = $.extend({ preserveTop: false }, options);
                    var element = $(this),
                        overlayData = element.data("goverlay");
                    if (!overlayData || (!overlayData.target && !overlayData.isPoint)) return;
                    let targetElement;
                    var overlayContainer = element.closest(".g-overlay"),
                        windowElement = $(window),
                        windowWidth = windowElement.width(),
                        windowHeight = windowElement.height(),
                        overlayWidth = overlayContainer.outerWidth(),
                        overlayHeight = overlayContainer.outerHeight(),
                        targetOffset = {};
                    overlayData.yTop && overlayData.xLeft ? ((targetOffset.top = overlayData.yTop), (targetOffset.left = overlayData.xLeft)) : ((targetElement = $(overlayData.target)), (targetOffset = targetElement.offset()));
                    var finalLeft,
                        finalTop,
                        topEdge = targetOffset.top,
                        halfWidth = overlayData.isPoint ? 0 : targetElement.outerWidth() / 2,
                        centerX = targetOffset.left + halfWidth,
                        leftEdge = overlayData.options.middle ? centerX : targetOffset.left,
                        targetWidth = overlayData.isPoint ? 0 : targetElement.outerWidth(),
                        rightEdge = overlayData.options.middle ? centerX : targetOffset.left + targetWidth,
                        targetHeight = overlayData.isPoint ? 0 : targetElement.outerHeight(),
                        bottomEdge = targetOffset.top + targetHeight;
                    (overlayData.options.side
                        ? (element.addClass(overlayData.options.sideClazz),
                          (finalLeft = rightEdge + overlayData.options.offsetX) + overlayWidth > windowWidth && ((finalLeft = leftEdge - overlayWidth - overlayData.options.offsetX), element.addClass("g-overlay-left-side")),
                          (finalTop = topEdge + overlayData.options.offsetY) + overlayHeight > windowHeight && ((finalTop = bottomEdge - overlayHeight - overlayData.options.offsetY), element.addClass("g-overlay-valign-bottom")))
                        : ((finalLeft = null !== overlayData.options.customRight ? windowWidth - rightEdge + overlayData.options.customRight : leftEdge + overlayData.options.offsetX) + overlayWidth > windowWidth
                              ? ((finalLeft = rightEdge - overlayWidth - overlayData.options.offsetX), overlayData.options.rightClazz && element.addClass(overlayData.options.rightClazz))
                              : overlayData.options.flipHorizontal && (finalLeft = leftEdge - overlayWidth - overlayData.options.offsetX),
                          finalLeft + overlayWidth > windowWidth && (finalLeft = windowWidth - overlayWidth),
                          (finalTop = bottomEdge + overlayData.options.offsetY) + overlayHeight > windowHeight &&
                              ((finalTop = topEdge - overlayHeight - parseInt(overlayData.options.bottomOffsetY)), overlayData.options.bottomClazz && element.addClass(overlayData.options.bottomClazz)),
                          finalTop + overlayHeight > windowHeight && (finalTop = windowHeight - overlayHeight - parseInt(overlayData.options.bottomOffsetY))),
                        finalLeft < 0 && (finalLeft = 0),
                        finalTop < 0 && (finalTop = 0));
                    let canPreserveTop = false;
                    if (options.preserveTop) {
                        const containerOffset = overlayContainer.offset(),
                            containerTop = containerOffset && containerOffset.top;
                        canPreserveTop = "number" == typeof containerTop && containerTop + overlayHeight < windowHeight;
                    }
                    (canPreserveTop || overlayContainer.css("top", finalTop + "px"), null === overlayData.options.customRight ? overlayContainer.css("left", finalLeft + "px") : overlayContainer.css("right", finalLeft + "px"));
                },
                open: function (target, contextElement, callback) {
                    var element = $(this);
                    const isPoint = target && "number" == typeof target.x && "number" == typeof target.y;
                    var overlayData = element.data("goverlay"),
                        options = overlayData && overlayData.options;
                    (target &&
                        !options.disableDarkShadow &&
                        ($(target).closest(".sidebar-inspector").addClass("sidebar-overlay"),
                        $(".g-touch-toolbar").addClass("sidebar-overlay"),
                        $(target).is(":input") && $(target).closest(".content").addClass("overlay")),
                        overlayData && ((overlayData.target = target), (overlayData.isPoint = isPoint), (overlayData.xLeft = target.x), (overlayData.yTop = target.y)));
                    var container,
                        overlayWrapper = element.closest(".g-overlay");
                    if ((contextElement && (container = $(contextElement).closest(".g-dialog-container.visible")), !container || !container.length)) {
                        var visibleDialogs = $(".g-dialog-container.visible");
                        container = visibleDialogs.length > 0 ? visibleDialogs[visibleDialogs.length - 1] : $("body");
                    }
                    return (
                        options && options.modal ? $("<div></div>").addClass("g-overlay-modal").append(overlayWrapper).appendTo(container) : overlayWrapper.appendTo(container),
                        GPlatform.GPlatform.addEventListener(GPlatform.GModifiersChangedEvent, handleModifiersChanged, this[0], null, true),
                        methods.relayout.call(this),
                        openOverlays.push(this[0]),
                        element.trigger("open"),
                        callback && callback(),
                        this
                    );
                },
                close: function (event, index) {
                    var element = $(this),
                        overlayData = element.data("goverlay");
                    if (openOverlays.length && openOverlays[index >= 0 ? index : openOverlays.length - 1] === this[0]) {
                        var prevented = false;
                        const preventClose = function () {
                            prevented = true;
                        };
                        if ((element.trigger("close", [preventClose, event]), prevented)) return;
                        var options;
                        (GPlatform.GPlatform.removeEventListener(GPlatform.GModifiersChangedEvent, handleModifiersChanged, this[0]),
                            overlayData &&
                                (overlayData.target &&
                                    ($(".sidebar-inspector").removeClass("sidebar-overlay"),
                                    $(".g-touch-toolbar").removeClass("sidebar-overlay"),
                                    $(".content.overlay").removeClass("overlay")),
                                (overlayData.target = null),
                                (options = overlayData.options)));
                        var modalWrapper = element.closest(".g-overlay-modal");
                        (!options || options.releaseOnClose ? element.closest(".g-overlay").remove() : element.closest(".g-overlay").detach(),
                            modalWrapper.remove(),
                            openOverlays.pop(),
                            options && options.closeCallback && options.closeCallback());
                    }
                    return this;
                },
                isOpenned: function (target) {
                    var overlayData = $(this).data("goverlay");
                    return target ? overlayData && overlayData.target && overlayData.target.get(0) === target.get(0) : overlayData && overlayData.target;
                },
            };
        $.fn.gOverlay = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
