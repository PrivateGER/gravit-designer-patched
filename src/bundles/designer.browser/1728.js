module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(290), require(57), require(4), require(13));
        var i,
            a,
            r,
            GPlatform = require(15),
            GObject = require(1),
            c = o(require(11)),
            designerConfig = require(10),
            u = require(67),
            p = o(require(1342)),
            g = {
                init: function (e) {
                    if (e) {
                        if (!(e instanceof u.GRichTooltipConfig)) throw new Error("Not a Tooltip Config");
                        return (
                            (e = $.extend(
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
                                e.getConfig()
                            )),
                            designerConfig.IS_COREL && !e.forceShow
                                ? this
                                : this.each(function () {
                                      const t = $(this);
                                      ((e._id = c.default.uuid(7)),
                                          t.data("g-rich-tooltip", e),
                                          t.on("mouseover", function (e) {
                                              (i && (clearTimeout(i), (i = null)), a && (clearTimeout(a), (a = null)));
                                              var n = function () {
                                                  (t.data("g-rich-tooltip-container-hovered", true), g.showTooltip.call(t, e));
                                              };
                                              r ? n() : (a = setTimeout(n, 500));
                                          }),
                                          t.on("mouseout", function (e) {
                                              (a && (clearTimeout(a), (a = null)),
                                                  t.data("g-rich-tooltip-container-hovered", false),
                                                  g.hideTooltip.call(t, e));
                                          }),
                                          t.on("mousedown", function () {
                                              a && (clearTimeout(a), (a = null));
                                          }));
                                  })
                        );
                    }
                },
                showTooltip: function () {
                    const e = $(this),
                        t = e.data("g-rich-tooltip");
                    if (r) {
                        if (r.data("g-rich-tooltip-id") === t._id) return;
                        g.close.call(e);
                    }
                    gContainer.getProperty(p.default.StoragePropertyName).then((n) => {
                        ((t.enhanced = "boolean" != typeof n || n),
                            (r = g.createTooltip(t)).on("mouseover", function () {
                                (i && (clearTimeout(i), (i = null)), e.data("g-rich-tooltip-self-tooltip-hovered", true));
                            }),
                            r.on("mouseout", function () {
                                (e.data("g-rich-tooltip-self-tooltip-hovered", false), g.hideTooltip.call(e));
                            }),
                            r.on("click", function () {
                                g.close.call(e);
                            }),
                            r.gOverlay("open", e));
                    });
                },
                hideTooltip: function () {
                    const e = $(this);
                    i = setTimeout(() => {
                        e.data("g-rich-tooltip-container-hovered") || e.data("g-rich-tooltip-self-tooltip-hovered") || g.close.call(e);
                    }, 100);
                },
                createTooltip: function (e) {
                    var t = 0,
                        n = 4;
                    return (
                        e.side ? ((t = 0), (n = -6)) : e.middle && (t = -13),
                        e.marginLeft && (t += parseInt(e.marginLeft)),
                        e.flipHorizontal && (t = 0 - t),
                        $("<div />")
                            .addClass("g-rich-tooltip-container")
                            .data("g-rich-tooltip-id", e._id)
                            .append(g.createTooltipContent(e))
                            .gOverlay({
                                padding: true,
                                releaseOnClose: true,
                                bottomClazz: "from-bottom",
                                rightClazz: "from-right",
                                offsetY: n,
                                offsetX: t,
                                bottomOffsetY: 6,
                                clazz: "g-tooltip-content-overlay " + (e.flipHorizontal ? "flip-horizontal" : ""),
                                disableDarkShadow: true,
                                middle: e.middle,
                                side: e.side,
                                flipHorizontal: e.flipHorizontal,
                            })
                    );
                },
                createTooltipContent: function (e) {
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
                    } = e;
                    let g = description;
                    const h = gDesigner.getLicense(),
                        f = (h.isPro() || h.isTrial()) && h.isExpired(),
                        m = learnMore
                            ? '<a href="'
                                  .concat(learnMore, '" target="_blank">')
                                  .concat(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.learn-more")), "</a>")
                            : "";
                    g = g ? "".concat(g, " ").concat(m) : m;
                    const y = $("<div />")
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
                        .append(enhanced && g ? $("<div />").addClass("g-tooltip-content-description").html(g) : "")
                        .append(enhanced && video && video.length ? $("<div />").addClass("g-tooltip-content-video loading") : "")
                        .append(
                            enhanced && pic && pic.length
                                ? $("<div />")
                                      .addClass("g-tooltip-content-picture")
                                      .append($("<img />").attr("width", 298).attr("height", 160).attr("src", pic))
                                : ""
                        )
                        .append(
                            enhanced && isPro && f
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
                                const e = y.find(".g-tooltip-content-video");
                                if (e.length) {
                                    const t = $("<video />")
                                        .attr("width", 298)
                                        .attr("height", 160)
                                        .attr("src", video)
                                        .attr("autoplay", true)
                                        .attr("loop", true);
                                    (t.on("loadeddata", function () {
                                        e.removeClass("loading");
                                    }),
                                        e.append(t));
                                }
                            }, videoTimeout),
                        y
                    );
                },
                close: function () {
                    r && (r.gOverlay("close"), (r = void 0));
                },
            };
        $.fn.gRichTooltip = function (e) {
            return g[e]
                ? g[e].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof e && e
                  ? void $.error("Method " + e + " does not exist on jQuery.myPlugin")
                  : g.init.apply(this, arguments);
        };
    };
