module.exports = function (module, exports, require) {
        "use strict";
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.REARRANGE_TAB_SELECTOR = exports.REARRANGE_TAB_CLASS = void 0),
            (exports.allowRearrangeTabs = function (container) {
                ($(".tabs").sortable({
                    axis: "x",
                    containment: $("#header"),
                    revert: 150,
                    activate: function (event, ui) {
                        ($(ui.item[0]).trigger("click"), $(ui.placeholder[0]).css({ height: "1px" }));
                        var itemTop = ui.item.offset().top;
                        $(".tabs")
                            .children()
                            .map(function () {
                                $(this).hasClass("ui-sortable-placeholder") || ($(this).offset().top > itemTop && $(this).addClass("hide"));
                            });
                    },
                    beforeStop: function () {
                        $(".tabs").children().removeClass("hide");
                    },
                }),
                    $("#mainframe").on("click", function () {
                        $(".more-button").hasClass("active") && $(".more-button").removeClass("active");
                    }),
                    $("<div></div>")
                        .addClass("more-button")
                        .append($("<div></div>").addClass("more-symbol"))
                        .append($("<div></div>").addClass("moreTab"))
                        .on("click", function () {
                            (gDesigner.stats("header_click_more-button", $(".more-button").hasClass("active") ? "Close" : "Open"),
                                $(".more-button").hasClass("active")
                                    ? $(".more-button").removeClass("active")
                                    : setTimeout(function () {
                                          $(".more-button").addClass("active");
                                      }, 10),
                                updateTabsInterface());
                        })
                        .appendTo(container));
            }),
            (exports.toggleRearrangeTabsVisibility = function (container, visible) {
                $(container)
                    .find(tabSelector)
                    .css("display", visible ? "" : "none");
            }),
            (exports.updateTabsInterface = updateTabsInterface),
            require(4),
            require(13),
            require(38),
            require(1518 /* lib:jquery-ui-sortable */));
        const tabClass = (exports.REARRANGE_TAB_CLASS = "more-button"),
            tabSelector = (exports.REARRANGE_TAB_SELECTOR = ".".concat(tabClass));
        function updateTabsInterface() {
            var width = 0,
                overflowIndex = 0;
            ($(".moreTab").empty(),
                $(".moreTab").append($(".tabs").children().clone(true)),
                $(".moreTab").children().children().prepend($("<span/>").addClass("select")),
                $(".moreTab").css({
                    left: -$(".moreTab").width(),
                    maxHeight: $("body").height() - 50,
                }),
                $(".moreTab").children().off("contextmenu"),
                $(".tabs")
                    .children()
                    .each(function (index) {
                        if (overflowIndex);
                        else if ((width += $(this).outerWidth() + 7.5) > $(".section.windows").outerWidth()) return (overflowIndex = index);
                    }),
                setTimeout(function () {
                    (overflowIndex &&
                        $(".tabs>div").index($(".tab.g-active")) >= overflowIndex &&
                        $(".tabs")
                            .find(".tab.g-active")
                            .insertBefore(
                                $(".tabs")
                                    .children()
                                    .eq(overflowIndex - 1)
                            ),
                        $(".moreTab")
                            .children()
                            .eq($(".tabs>div").index($(".tab.g-active")))
                            .children()
                            .children(".select")
                            .addClass("more-tab-icon"));
                }, 100));
        }
    };
