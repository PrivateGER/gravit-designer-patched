module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(290), require(57), require(4), require(13));
        var hideTimeout,
            showTimeout,
            openTooltip,
            GPlatform = require(15),
            GObject = require(1),
            UuidUtils = _interopRequireDefault(require(11)),
            designerConfig = require(10),
            GRichTooltipConfig = require(67),
            EnhancedTooltipsAction = _interopRequireDefault(require(1342)),
            plugin = {
                init: function (config) {
                    if (config) {
                        if (!(config instanceof GRichTooltipConfig.GRichTooltipConfig)) throw new Error("Not a Tooltip Config");
                        return (
                            (config = $.extend(
                                {
                                    title: "No title",
                                    isPro: false,
                                    shortcut: null,
                                    video: null,
                                    pic: null,
                                    description: null,
                                    videoTimeout: 2e3,
                                    middle: true,
                                    marginLeft: 0,
                                    side: false,
                                    learnMore: null,
                                    upgradeToProStatsValue: null,
                                    forceShow: false,
                                    flipHorizontal: false,
                                },
                                config.getConfig()
                            )),
                            designerConfig.IS_COREL && !config.forceShow
                                ? this
                                : this.each(function () {
                                      const element = $(this);
                                      ((config._id = UuidUtils.default.uuid(7)),
                                          element.data("g-rich-tooltip", config),
                                          element.on("mouseover", function (event) {
                                              (hideTimeout && (clearTimeout(hideTimeout), (hideTimeout = null)), showTimeout && (clearTimeout(showTimeout), (showTimeout = null)));
                                              var showTooltipFn = function () {
                                                  (element.data("g-rich-tooltip-container-hovered", true), plugin.showTooltip.call(element, event));
                                              };
                                              openTooltip ? showTooltipFn() : (showTimeout = setTimeout(showTooltipFn, 500));
                                          }),
                                          element.on("mouseout", function (event) {
                                              (showTimeout && (clearTimeout(showTimeout), (showTimeout = null)),
                                                  element.data("g-rich-tooltip-container-hovered", false),
                                                  plugin.hideTooltip.call(element, event));
                                          }),
                                          element.on("mousedown", function () {
                                              showTimeout && (clearTimeout(showTimeout), (showTimeout = null));
                                          }));
                                  })
                        );
                    }
                },
                showTooltip: function () {
                    const element = $(this),
                        config = element.data("g-rich-tooltip");
                    if (openTooltip) {
                        if (openTooltip.data("g-rich-tooltip-id") === config._id) return;
                        plugin.close.call(element);
                    }
                    gContainer.getProperty(EnhancedTooltipsAction.default.StoragePropertyName).then((enhanced) => {
                        ((config.enhanced = "boolean" != typeof enhanced || enhanced),
                            (openTooltip = plugin.createTooltip(config)).on("mouseover", function () {
                                (hideTimeout && (clearTimeout(hideTimeout), (hideTimeout = null)), element.data("g-rich-tooltip-self-tooltip-hovered", true));
                            }),
                            openTooltip.on("mouseout", function () {
                                (element.data("g-rich-tooltip-self-tooltip-hovered", false), plugin.hideTooltip.call(element));
                            }),
                            openTooltip.on("click", function () {
                                plugin.close.call(element);
                            }),
                            openTooltip.gOverlay("open", element));
                    });
                },
                hideTooltip: function () {
                    const element = $(this);
                    hideTimeout = setTimeout(() => {
                        element.data("g-rich-tooltip-container-hovered") || element.data("g-rich-tooltip-self-tooltip-hovered") || plugin.close.call(element);
                    }, 100);
                },
                createTooltip: function (config) {
                    var offsetX = 0,
                        offsetY = 4;
                    return (
                        config.side ? ((offsetX = 0), (offsetY = -6)) : config.middle && (offsetX = -13),
                        config.marginLeft && (offsetX += parseInt(config.marginLeft)),
                        config.flipHorizontal && (offsetX = 0 - offsetX),
                        $("<div />")
                            .addClass("g-rich-tooltip-container")
                            .data("g-rich-tooltip-id", config._id)
                            .append(plugin.createTooltipContent(config))
                            .gOverlay({
                                padding: true,
                                releaseOnClose: true,
                                bottomClazz: "from-bottom",
                                rightClazz: "from-right",
                                offsetY: offsetY,
                                offsetX: offsetX,
                                bottomOffsetY: 6,
                                clazz: "g-tooltip-content-overlay " + (config.flipHorizontal ? "flip-horizontal" : ""),
                                disableDarkShadow: true,
                                middle: config.middle,
                                side: config.side,
                                flipHorizontal: config.flipHorizontal,
                            })
                    );
                },
                createTooltipContent: function (config) {
                    const {
                        title,
                        isPro,
                        shortcut,
                        video,
                        pic,
                        description,
                        videoTimeout,
                        enhanced,
                        learnMore,
                        upgradeToProStatsValue,
                    } = config;
                    let descriptionHtml = description;
                    const license = gDesigner.getLicense(),
                        isExpiredLicense = (license.isPro() || license.isTrial()) && license.isExpired(),
                        learnMoreLink = learnMore
                            ? '<a href="'
                                  .concat(learnMore, '" target="_blank">')
                                  .concat(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.learn-more")), "</a>")
                            : "";
                    descriptionHtml = descriptionHtml ? "".concat(descriptionHtml, " ").concat(learnMoreLink) : learnMoreLink;
                    const wrapper = $("<div />")
                        .addClass("g-tooltip-content-wrapper")
                        .toggleClass("g-pro", isPro)
                        .append(
                            $("<div />")
                                .addClass("g-tooltip-content-header")
                                .toggleClass("simple", !enhanced)
                                .append(
                                    shortcut && shortcut.length
                                        ? $("<div />").addClass("g-tooltip-content-shortcut").text(GPlatform.GKey.shortcutToString(shortcut))
                                        : ""
                                )
                                .append(
                                    $("<div />")
                                        .toggleClass("limit-width", !(!shortcut || !shortcut.length))
                                        .addClass("g-tooltip-content-title")
                                        .text(title)
                                )
                        )
                        .append(enhanced && descriptionHtml ? $("<div />").addClass("g-tooltip-content-description").html(descriptionHtml) : "")
                        .append(enhanced && video && video.length ? $("<div />").addClass("g-tooltip-content-video loading") : "")
                        .append(
                            enhanced && pic && pic.length
                                ? $("<div />")
                                      .addClass("g-tooltip-content-picture")
                                      .append($("<img />").attr("width", 298).attr("height", 160).attr("src", pic))
                                : ""
                        )
                        .append(
                            enhanced && isPro && isExpiredLicense
                                ? $("<div />")
                                      .addClass("g-tooltip-content-footer")
                                      .append(
                                          $("<div />")
                                              .addClass("g-tooltip-footer-pro-badge")
                                              .append(
                                                  $("<div />")
                                                      .addClass("g-tooltip-pro-text")
                                                      .text(
                                                          GObject.GLocale.get(
                                                              new GObject.GLocaleKey("GCommonNames", "text.try-this-feature-pro-tooltip-text")
                                                          )
                                                      )
                                              )
                                      )
                                      .on("click", () => {
                                          (gDesigner.openPaymentDialog(), gDesigner.stats("action_tooltips_upgradetopro", upgradeToProStatsValue));
                                      })
                                : ""
                        );
                    return (
                        enhanced &&
                            video &&
                            setTimeout(() => {
                                const videoContainer = wrapper.find(".g-tooltip-content-video");
                                if (videoContainer.length) {
                                    const videoElement = $("<video />")
                                        .attr("width", 298)
                                        .attr("height", 160)
                                        .attr("src", video)
                                        .attr("autoplay", true)
                                        .attr("loop", true);
                                    (videoElement.on("loadeddata", function () {
                                        videoContainer.removeClass("loading");
                                    }),
                                        videoContainer.append(videoElement));
                                }
                            }, videoTimeout),
                        wrapper
                    );
                },
                close: function () {
                    openTooltip && (openTooltip.gOverlay("close"), (openTooltip = void 0));
                },
            };
        $.fn.gRichTooltip = function (methodOrConfig) {
            return plugin[methodOrConfig]
                ? plugin[methodOrConfig].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof methodOrConfig && methodOrConfig
                  ? void $.error("Method " + methodOrConfig + " does not exist on jQuery.myPlugin")
                  : plugin.init.apply(this, arguments);
        };
    };
