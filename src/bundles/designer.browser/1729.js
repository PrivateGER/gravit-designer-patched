module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13));
        var setCollapsedState = function (element, collapsed) {
                var $element = $(element);
                ($element.addClass(collapsed ? "collapsed" : "expanded"), $element.removeClass(collapsed ? "expanded" : "collapsed"));
                var $icon = $($element.find(".gravit-icon-down,.gravit-icon-right")[0]);
                ($icon.removeClass(collapsed ? "gravit-icon-down" : "gravit-icon-right"), $icon.addClass(collapsed ? "gravit-icon-right" : "gravit-icon-down"));
            },
            methods = {
                init: function (contentSelector, anchorSelector, insertBeforeFlag, statName) {
                    return this.each(function () {
                        var $content = $(this).next(contentSelector);
                        if (!$(this).hasClass("accordion")) {
                            var $iconSpan = $("<span></span>").addClass($(this).hasClass("collapsed") ? "gravit-icon-right" : "gravit-icon-down"),
                                $button = $("<button></button>")
                                    .addClass("g-accordion")
                                    .on(
                                        "click",
                                        function () {
                                            $content.toggle();
                                            var isCollapsed = "none" === $content.css("display");
                                            (setCollapsedState(this, isCollapsed),
                                                statName && gDesigner.stats("".concat(statName, "_toggle_page"), isCollapsed ? "Collapse" : "Expand"),
                                                $(this).trigger("change"));
                                        }.bind(this)
                                    )
                                    .append($iconSpan),
                                $ghost = $("<div/>").addClass("g-accordion-ghost");
                            if (anchorSelector) {
                                var $target = $(this).find(anchorSelector + ":first");
                                (insertBeforeFlag ? $($button).insertBefore($target) : ($($button).insertAfter($target), $($ghost).insertAfter($button)),
                                    $target
                                        .on("click", function () {
                                            $button.trigger("click");
                                        })
                                        .on("mouseover", function () {
                                            $button.toggleClass("hovered");
                                        })
                                        .on("mouseout", function () {
                                            $button.toggleClass("hovered");
                                        }));
                            } else ($(this).append($button), $(this).append($ghost));
                            $(this).addClass("accordion");
                        }
                        $content.css("display", $(this).hasClass("collapsed") ? "none" : "");
                    });
                },
                toggleOpen: function (open) {
                    setCollapsedState(this, !open);
                },
            };
        $.fn.gAccordion = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
