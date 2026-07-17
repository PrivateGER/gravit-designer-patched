module.exports = function (module, exports, require) {
        "use strict";
        require(57);
        var showTimeoutId,
            idleTimeoutId,
            hoverTarget = null,
            tooltipElement = null,
            recentlyShown = false;
        class GTooltip {
            static _getTooltipElement() {
                return tooltipElement;
            }
            static _getBodyWidth() {
                return $("body").width();
            }
            static _getBodyHeight() {
                return $("body").height();
            }
            static showTooltip(target) {
                showTimeoutId = void 0;
                let tooltip = GTooltip._getTooltipElement();
                if (hoverTarget || target) {
                    var titleElement = $(hoverTarget || target).closest("[data-title]");
                    if (titleElement.length) {
                        var rect = titleElement[0].getBoundingClientRect(),
                            titleText = titleElement.attr("data-title"),
                            leftOffset = parseInt(titleElement.attr("data-custom-left-offset") || 0),
                            wrap = !!parseInt(titleElement.attr("data-wrap") || 0);
                        if (rect && titleText) {
                            tooltip.addClass("visible").toggleClass("wrap", wrap).text(titleText);
                            var left = rect.left + rect.width / 2 - tooltip.outerWidth() / 2 + "px",
                                top = rect.top + rect.height + "px";
                            (tooltip.css({ left: left, top: top }),
                                tooltip.offset().top + rect.height > GTooltip._getBodyHeight() && tooltip.css("top", rect.top - rect.height + "px"));
                            const bodyWidth = GTooltip._getBodyWidth();
                            if (leftOffset + tooltip.offset().left + tooltip.outerWidth() > bodyWidth) {
                                let adjustedLeft = tooltip.offset().left - (tooltip.offset().left + tooltip.outerWidth() - bodyWidth) + leftOffset;
                                tooltip.css("left", adjustedLeft + "px");
                            }
                            (GTooltip.resetIdle(), (recentlyShown = true), (idleTimeoutId = setTimeout(GTooltip.resetIdle, 500)));
                        }
                    }
                }
            }
            static resetIdle() {
                (void 0 !== idleTimeoutId && clearTimeout(idleTimeoutId), (recentlyShown = false));
            }
            static resetTooltip() {
                (void 0 !== showTimeoutId && (clearTimeout(showTimeoutId), (showTimeoutId = void 0)), tooltipElement.removeClass("visible").text("").css({ left: "", top: "" }));
            }
            static documentOverListener(event) {
                GTooltip.resetTooltip();
                let titleElement = $(event.target).closest("[data-title]"),
                    richTooltip = titleElement.data("gRichTooltip") || titleElement.parent().data("gRichTooltip") || titleElement.children().eq(0).data("gRichTooltip");
                titleElement.length > 0 && !richTooltip && ((hoverTarget = event.target), recentlyShown ? GTooltip.showTooltip() : (showTimeoutId = setTimeout(GTooltip.showTooltip, 500)));
            }
            static documentOutListener() {
                (GTooltip.resetTooltip(), (hoverTarget = null));
            }
            static init() {
                ((tooltipElement = $("<div></div>").addClass("g-tooltip").appendTo($("body"))),
                    document.addEventListener("mouseover", GTooltip.documentOverListener),
                    document.addEventListener("mouseout", GTooltip.documentOutListener));
            }
        }
        module.exports = GTooltip;
        var methods = {
            show: function () {
                (GTooltip.showTooltip($(this)),
                    document.addEventListener("click", GTooltip.resetTooltip, {
                        once: true,
                        capture: true,
                    }));
            },
        };
        $.fn.gTooltip = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
