module.exports = function (module, exports, require) {
        "use strict";
        function Collapsible() {}
        (require(4),
            require(13),
            (Collapsible.Orientation = { Vertical: "vertical", Horizontal: "horizontal" }),
            (function ($) {
                const methods = {
                    _toggleTransitions: function (enableTransitions) {
                        return ($(this).toggleClass("g-transitions-off", !enableTransitions), this);
                    },
                    _toggleVisibilty: function (expand) {
                        const element = $(this);
                        if (element.hasClass("expanded") !== expand)
                            return (
                                element.toggleClass("collapsed", !expand).toggleClass("expanded", expand),
                                element.hasClass(Collapsible.Orientation.Vertical)
                                    ? element
                                          .children(".g-collapsible-button:first")
                                          .find("span")
                                          .toggleClass("gravit-icon-touch-arrow-up", !expand)
                                          .toggleClass("gravit-icon-touch-arrow-down", expand)
                                    : element
                                          .siblings(".g-collapsible-button:first")
                                          .find("span")
                                          .toggleClass("gravit-icon-touch-arrow-right", !expand)
                                          .toggleClass("gravit-icon-touch-arrow-left", expand),
                                this
                            );
                    },
                    init: function (options) {
                        options = $.extend({ orientation: Collapsible.Orientation.Vertical }, options);
                        const self = this;
                        return this.each(function () {
                            const container = $(this).addClass("g-collapsible g-transitions-off expanded").addClass(options.orientation);
                            "vertical" === options.orientation
                                ? container.prepend(
                                      $("<div/>")
                                          .addClass("g-collapsible-button")
                                          .append($("<span/>").addClass("gravit-icon-touch-arrow-down"))
                                          .on("click", () => {
                                              const isExpanded = container.hasClass("expanded");
                                              (methods._toggleTransitions.call(self, true),
                                                  methods._toggleVisibilty.call(self, !isExpanded),
                                                  container.trigger("visibilitychanged", [!isExpanded]));
                                          })
                                  )
                                : container.before(
                                      $("<div/>")
                                          .addClass("g-collapsible-button")
                                          .append($("<span/>").addClass("gravit-icon-touch-arrow-left"))
                                          .on("click", () => {
                                              const isExpanded = container.hasClass("expanded");
                                              (methods._toggleTransitions.call(self, true),
                                                  methods._toggleVisibilty.call(self, !isExpanded, true),
                                                  container.trigger("visibilitychanged", [!isExpanded]));
                                          })
                                  );
                        });
                    },
                    collapse: function () {
                        return methods._toggleVisibilty.call(this, false);
                    },
                    expand: function () {
                        return methods._toggleVisibilty.call(this, true);
                    },
                };
                $.fn.gCollapsible = function (method) {
                    return methods[method]
                        ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                        : "object" != typeof method && method
                          ? void $.error("Method " + method + " does not exist on jQuery.gCollapsible")
                          : methods.init.apply(this, arguments);
                };
            })(jQuery),
            (module.exports = Collapsible));
    };
