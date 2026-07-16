module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(4), require(13));
        var GObject = require(1),
            Utils = require(40),
            a = require(255),
            r = require(1118),
            s = require(1199),
            l = require(85),
            GSystemDialog = require(44);
        const { GPlatform } = require(15 /* GPlatform */);
        function u() {}
        (GObject.GObject.inheritAndMix(u, GObject.GObject),
            (u.DISABLE_LOCAL_FONTS_ACCESS_WARING = "disable-local-fonts-access-warning"),
            (u._showLocalFontsAccessDialog = async function () {
                if (gDesigner.getSetting(u.DISABLE_LOCAL_FONTS_ACCESS_WARING, false)) return false;
                if (!window.queryLocalFonts)
                    return (GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GLocalFontsProvider", "text.current-browser-unsupported"))), false);
                if ("denied" === (await navigator.permissions.query({ name: "local-fonts" })).state) {
                    const e = [
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "close")),
                            highlighted: true,
                            shortcut: GSystemDialog.Shortcut.Enter,
                            closeOnClick: true,
                        },
                    ];
                    let t = GObject.GLocale.get(new GObject.GLocaleKey("GLocalFontsProvider", "text.permission-required-subtitle-others"));
                    (GPlatform.webBrowser === GPlatform.constructor.WebBrowser.Edge &&
                        (t = GObject.GLocale.get(new GObject.GLocaleKey("GLocalFontsProvider", "text.permission-required-subtitle-edge"))),
                        GSystemDialog.custom({
                            icon: "error",
                            className: "g-local-fonts-warning-dialog",
                            closeable: true,
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GLocalFontsProvider", "text.permission-required-title")),
                            subtitle: t,
                            buttons: e,
                            dontShowAgainCb: (e) => {
                                gDesigner.setSetting(u.DISABLE_LOCAL_FONTS_ACCESS_WARING, !!e);
                            },
                        }));
                }
                return false;
            }));
        var p = function () {
                return (
                    gContainer.getRuntime() !== l.Runtime.Browser &&
                    gContainer.getRuntime() !== l.Runtime.Chrome &&
                    gContainer.getRuntime() !== l.Runtime.PWA
                );
            },
            g = function (e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                var r = $("<a></a>")
                        .data("provider", t)
                        .addClass("tablinks")
                        .append(GObject.GLocale.get(e))
                        .on(
                            "click",
                            Utils.watchDog.trap(
                                function (t) {
                                    n
                                        ? gDesigner.stats("fonts_click_protab", GObject.GLocale.get(e, void 0, GObject.GLocaleLanguage.English))
                                        : gDesigner.stats("fonts_click_tab", GObject.GLocale.get(e, void 0, GObject.GLocaleLanguage.English));
                                    var i = $(t.target),
                                        r = i.closest(".tab");
                                    (r.find(".tablinks").removeClass("active"), i.addClass("active"));
                                    var l = i.data("provider");
                                    if (l) (l == s && u._showLocalFontsAccessDialog(), a.enableProviders([l]));
                                    else {
                                        var c = [];
                                        if (
                                            (r.find(".tablinks:not(.active)").each(function () {
                                                var e = $(this).data("provider");
                                                e && c.push(e);
                                            }),
                                            !p())
                                        ) {
                                            var d = gContainer.getSystemFontsProvider();
                                            d || c.push(d);
                                        }
                                        c.length && a.disableProviders(c);
                                    }
                                },
                                () => !n,
                                (t) => {
                                    gDesigner.stats("fonts_nonprotriespro_protab", GObject.GLocale.get(e));
                                },
                                n
                            )
                        ),
                    l = $("<li></li>").addClass("tablink").gPro({ pro: !!n, feature: n }).append(r);
                return l;
            },
            h = function (e, t) {
                if (e) {
                    var n = e.data("gfontsbutton");
                    n && n.fontList && n.fontList.gFontsPanel("search", t, e.val());
                }
            };
        const f = function () {
            const e = $(this).data("gfontsbutton");
            e &&
                (e.fontListContainer && e.fontListContainer.gOverlay("close", this),
                e.options && e.options.closeCallback && e.options.closeCallback.call(this));
        };
        var m = function (e) {
                var t = $(e),
                    n = t.data("gfontsbutton");
                if (!n.fontList) {
                    var i = $("<div></div>").addClass("header");
                    n.fontList = $("<div></div>")
                        .on("mousedown", function (e) {
                            n.mouseMoved = false;
                        })
                        .on("mousemove", function (e) {
                            n.mouseMoved || (n.mouseMoved = true);
                        })
                        .on("mouseup", function (t) {
                            "_SPECIAL_" === t.target.name || "g-fonts-panel" === t.target.className || n.mouseMoved
                                ? (n.mouseMoved = false)
                                : gDesigner.isTouchEnabled() || f.call(e);
                        })
                        .gFontsPanel({
                            preview: i,
                            changeCallback: function (n) {
                                t.val(n.displayName || n.family);
                                var o = t.data("gfontsbutton");
                                ((o.tempFontFamily = n.displayName || n.family),
                                    o.options.assignFontCallback("" === n.family ? null : n.family, t),
                                    setTimeout(function () {
                                        e.select();
                                    }, 1),
                                    gDesigner.isTouchEnabled() && f.call(e));
                            },
                        });
                    var l = $("<div></div>")
                        .addClass("g-fonts-panel")
                        .addClass("no-overflow")
                        .append(
                            (function (e) {
                                var t = $("<ul></ul>")
                                    .addClass("tab")
                                    .append(g(new GObject.GLocaleKey("GFontsButton", "text.web-fonts")));
                                if (
                                    (t.append(g(new GObject.GLocaleKey("GFontsButton", "text.imported-fonts"), r, "font.import")),
                                    gContainer.supportsLocalFonts() &&
                                        t.append(g(new GObject.GLocaleKey("GFontsButton", "text.system-fonts"), s)),
                                    p())
                                ) {
                                    var n = gContainer.getSystemFontsProvider();
                                    n && t.append(g(new GObject.GLocaleKey("GFontsButton", "text.system-fonts"), n));
                                }
                                return (t.find(".tablinks:first").trigger("click"), t);
                            })()
                        );
                    ((n.fontListContainer = $("<div></div>")), n.fontListContainer.append(l));
                    n.fontListContainer
                        .append(n.fontList)
                        .gOverlay({
                            releaseOnClose: false,
                            padding: false,
                            enterCallback: function (e) {
                                $(".g-fonts-panel").trigger("keydown", [e.which || e.keyCode]);
                            },
                            clazz: "g-font-list-overlay",
                        })
                        .on(
                            "close",
                            function (e, t, n) {
                                a.getInstance() && a.getInstance().getLock() && t();
                            }.bind(e)
                        );
                }
            },
            y = {
                getFontList: function () {
                    var e = $(this).data("gfontsbutton");
                    return e ? (e.fontList || m(this), e.fontList) : null;
                },
                init: function (e) {
                    return (
                        this.each(function () {
                            var t = this,
                                n = $(this);
                            ((e = $.extend(
                                {
                                    closeCallback: function () {},
                                    assignFontCallback: function () {},
                                },
                                e
                            )),
                                n
                                    .data("gfontsbutton", {
                                        options: e,
                                        tempFontName: void 0,
                                        tempFontFamily: void 0,
                                        fontList: void 0,
                                        fontContainer: void 0,
                                        mouseMoved: false,
                                    })
                                    .on("focusin", function (e) {
                                        n.attr("type", "text");
                                    })
                                    .on("focusout", function (e) {
                                        n.attr("type", "button");
                                        var t = n.data("gfontsbutton").tempFontName;
                                        t && t.length && !n.val().length && n.val(t);
                                    })
                                    .on("input", function (e) {
                                        h(n, n.val());
                                    })
                                    .on("keydown", function (e) {
                                        var o = n.data("gfontsbutton");
                                        if (o && o.fontList) {
                                            var i = o.fontList,
                                                a = o.fontListContainer,
                                                r = e.which || e.keyCode;
                                            40 === r
                                                ? i.gFontsPanel("selectLower")
                                                : 38 === r
                                                  ? i.gFontsPanel("selectUpper")
                                                  : 13 === r &&
                                                    a &&
                                                    (a.gOverlay("close", t), n.data("gfontsbutton").options.closeCallback.call(t));
                                        }
                                    })
                                    .on("click", function (e) {
                                        (gDesigner.stats("fonts_expand_textfield"),
                                            h(n, ""),
                                            "text" !== n.attr("type") && (n.attr("type", "text"), t.select()),
                                            (n.data("gfontsbutton").tempFontFamily = n.val()));
                                        var o = n.data("gfontsbutton").fontList,
                                            i = n.data("gfontsbutton").fontListContainer;
                                        o
                                            ? (i.gOverlay("open", t, t), o.gFontsPanel("refresh", true))
                                            : (m(this),
                                              (o = n.data("gfontsbutton").fontList),
                                              (i = n.data("gfontsbutton").fontListContainer).gOverlay("open", t, t),
                                              o.gFontsPanel("refresh"));
                                        var a = function () {
                                            (o.gFontsPanel("selection", n.val()), o.gFontsPanel("focusCurrent"), n.select());
                                        };
                                        0 === o.gFontsPanel("fontsLength")
                                            ? setTimeout(function () {
                                                  a();
                                              }, 100)
                                            : a();
                                    }));
                        }),
                        this
                    );
                },
            };
        ((module.exports = u),
            ($.fn.gFontsButton = function (e) {
                return y[e]
                    ? y[e].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof e && e
                      ? void $.error("Method " + e + " does not exist on jQuery.myPlugin")
                      : y.init.apply(this, arguments);
            }));
    };
