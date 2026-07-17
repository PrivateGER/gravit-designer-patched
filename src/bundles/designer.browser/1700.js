module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(4), require(13));
        var GObject = require(1),
            Utils = require(40),
            FontsProviderManager = require(255),
            GImportedFontsProvider = require(1118),
            GLocalFontsProvider = require(1199),
            GContainer = require(85),
            GSystemDialog = require(44);
        const { GPlatform } = require(15 /* GPlatform */);
        function GLocalFontsAccess() {}
        (GObject.GObject.inheritAndMix(GLocalFontsAccess, GObject.GObject),
            (GLocalFontsAccess.DISABLE_LOCAL_FONTS_ACCESS_WARING = "disable-local-fonts-access-warning"),
            (GLocalFontsAccess._showLocalFontsAccessDialog = async function () {
                if (gDesigner.getSetting(GLocalFontsAccess.DISABLE_LOCAL_FONTS_ACCESS_WARING, false)) return false;
                if (!window.queryLocalFonts)
                    return (GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GLocalFontsProvider", "text.current-browser-unsupported"))), false);
                if ("denied" === (await navigator.permissions.query({ name: "local-fonts" })).state) {
                    const buttons = [
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "close")),
                            highlighted: true,
                            shortcut: GSystemDialog.Shortcut.Enter,
                            closeOnClick: true,
                        },
                    ];
                    let subtitle = GObject.GLocale.get(new GObject.GLocaleKey("GLocalFontsProvider", "text.permission-required-subtitle-others"));
                    (GPlatform.webBrowser === GPlatform.constructor.WebBrowser.Edge &&
                        (subtitle = GObject.GLocale.get(new GObject.GLocaleKey("GLocalFontsProvider", "text.permission-required-subtitle-edge"))),
                        GSystemDialog.custom({
                            icon: "error",
                            className: "g-local-fonts-warning-dialog",
                            closeable: true,
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GLocalFontsProvider", "text.permission-required-title")),
                            subtitle: subtitle,
                            buttons: buttons,
                            dontShowAgainCb: (dontShowAgain) => {
                                gDesigner.setSetting(GLocalFontsAccess.DISABLE_LOCAL_FONTS_ACCESS_WARING, !!dontShowAgain);
                            },
                        }));
                }
                return false;
            }));
        var isNativeRuntime = function () {
                return (
                    gContainer.getRuntime() !== GContainer.Runtime.Browser &&
                    gContainer.getRuntime() !== GContainer.Runtime.Chrome &&
                    gContainer.getRuntime() !== GContainer.Runtime.PWA
                );
            },
            createProviderTab = function (labelKey, providerClass) {
                let proFeature = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                var tabLink = $("<a></a>")
                        .data("provider", providerClass)
                        .addClass("tablinks")
                        .append(GObject.GLocale.get(labelKey))
                        .on(
                            "click",
                            Utils.watchDog.trap(
                                function (event) {
                                    proFeature
                                        ? gDesigner.stats("fonts_click_protab", GObject.GLocale.get(labelKey, void 0, GObject.GLocaleLanguage.English))
                                        : gDesigner.stats("fonts_click_tab", GObject.GLocale.get(labelKey, void 0, GObject.GLocaleLanguage.English));
                                    var $target = $(event.target),
                                        tabContainer = $target.closest(".tab");
                                    (tabContainer.find(".tablinks").removeClass("active"), $target.addClass("active"));
                                    var provider = $target.data("provider");
                                    if (provider) (provider == GLocalFontsProvider && GLocalFontsAccess._showLocalFontsAccessDialog(), FontsProviderManager.enableProviders([provider]));
                                    else {
                                        var disabledProviders = [];
                                        if (
                                            (tabContainer.find(".tablinks:not(.active)").each(function () {
                                                var tabProvider = $(this).data("provider");
                                                tabProvider && disabledProviders.push(tabProvider);
                                            }),
                                            !isNativeRuntime())
                                        ) {
                                            var systemFontsProvider = gContainer.getSystemFontsProvider();
                                            systemFontsProvider || disabledProviders.push(systemFontsProvider);
                                        }
                                        disabledProviders.length && FontsProviderManager.disableProviders(disabledProviders);
                                    }
                                },
                                () => !proFeature,
                                (event) => {
                                    gDesigner.stats("fonts_nonprotriespro_protab", GObject.GLocale.get(labelKey));
                                },
                                proFeature
                            )
                        ),
                    tabListItem = $("<li></li>").addClass("tablink").gPro({ pro: !!proFeature, feature: proFeature }).append(tabLink);
                return tabListItem;
            },
            searchFontList = function (inputElement, query) {
                if (inputElement) {
                    var buttonState = inputElement.data("gfontsbutton");
                    buttonState && buttonState.fontList && buttonState.fontList.gFontsPanel("search", query, inputElement.val());
                }
            };
        const closeFontsOverlay = function () {
            const buttonState = $(this).data("gfontsbutton");
            buttonState &&
                (buttonState.fontListContainer && buttonState.fontListContainer.gOverlay("close", this),
                buttonState.options && buttonState.options.closeCallback && buttonState.options.closeCallback.call(this));
        };
        var buildFontList = function (element) {
                var $button = $(element),
                    buttonState = $button.data("gfontsbutton");
                if (!buttonState.fontList) {
                    var previewHeader = $("<div></div>").addClass("header");
                    buttonState.fontList = $("<div></div>")
                        .on("mousedown", function (event) {
                            buttonState.mouseMoved = false;
                        })
                        .on("mousemove", function (event) {
                            buttonState.mouseMoved || (buttonState.mouseMoved = true);
                        })
                        .on("mouseup", function (event) {
                            "_SPECIAL_" === event.target.name || "g-fonts-panel" === event.target.className || buttonState.mouseMoved
                                ? (buttonState.mouseMoved = false)
                                : gDesigner.isTouchEnabled() || closeFontsOverlay.call(element);
                        })
                        .gFontsPanel({
                            preview: previewHeader,
                            changeCallback: function (selectedFont) {
                                $button.val(selectedFont.displayName || selectedFont.family);
                                var buttonState = $button.data("gfontsbutton");
                                ((buttonState.tempFontFamily = selectedFont.displayName || selectedFont.family),
                                    buttonState.options.assignFontCallback("" === selectedFont.family ? null : selectedFont.family, $button),
                                    setTimeout(function () {
                                        element.select();
                                    }, 1),
                                    gDesigner.isTouchEnabled() && closeFontsOverlay.call(element));
                            },
                        });
                    var fontsPanelBody = $("<div></div>")
                        .addClass("g-fonts-panel")
                        .addClass("no-overflow")
                        .append(
                            (function (e) {
                                var tabList = $("<ul></ul>")
                                    .addClass("tab")
                                    .append(createProviderTab(new GObject.GLocaleKey("GFontsButton", "text.web-fonts")));
                                if (
                                    (tabList.append(createProviderTab(new GObject.GLocaleKey("GFontsButton", "text.imported-fonts"), GImportedFontsProvider, "font.import")),
                                    gContainer.supportsLocalFonts() &&
                                        tabList.append(createProviderTab(new GObject.GLocaleKey("GFontsButton", "text.system-fonts"), GLocalFontsProvider)),
                                    isNativeRuntime())
                                ) {
                                    var systemFontsProvider = gContainer.getSystemFontsProvider();
                                    systemFontsProvider && tabList.append(createProviderTab(new GObject.GLocaleKey("GFontsButton", "text.system-fonts"), systemFontsProvider));
                                }
                                return (tabList.find(".tablinks:first").trigger("click"), tabList);
                            })()
                        );
                    ((buttonState.fontListContainer = $("<div></div>")), buttonState.fontListContainer.append(fontsPanelBody));
                    buttonState.fontListContainer
                        .append(buttonState.fontList)
                        .gOverlay({
                            releaseOnClose: false,
                            padding: false,
                            enterCallback: function (event) {
                                $(".g-fonts-panel").trigger("keydown", [event.which || event.keyCode]);
                            },
                            clazz: "g-font-list-overlay",
                        })
                        .on(
                            "close",
                            function (e, preventClose, n) {
                                FontsProviderManager.getInstance() && FontsProviderManager.getInstance().getLock() && preventClose();
                            }.bind(element)
                        );
                }
            },
            gFontsButtonMethods = {
                getFontList: function () {
                    var buttonState = $(this).data("gfontsbutton");
                    return buttonState ? (buttonState.fontList || buildFontList(this), buttonState.fontList) : null;
                },
                init: function (options) {
                    return (
                        this.each(function () {
                            var buttonElement = this,
                                $button = $(this);
                            ((options = $.extend(
                                {
                                    closeCallback: function () {},
                                    assignFontCallback: function () {},
                                },
                                options
                            )),
                                $button
                                    .data("gfontsbutton", {
                                        options: options,
                                        tempFontName: void 0,
                                        tempFontFamily: void 0,
                                        fontList: void 0,
                                        fontContainer: void 0,
                                        mouseMoved: false,
                                    })
                                    .on("focusin", function (event) {
                                        $button.attr("type", "text");
                                    })
                                    .on("focusout", function (event) {
                                        $button.attr("type", "button");
                                        var tempFontName = $button.data("gfontsbutton").tempFontName;
                                        tempFontName && tempFontName.length && !$button.val().length && $button.val(tempFontName);
                                    })
                                    .on("input", function (event) {
                                        searchFontList($button, $button.val());
                                    })
                                    .on("keydown", function (event) {
                                        var buttonState = $button.data("gfontsbutton");
                                        if (buttonState && buttonState.fontList) {
                                            var fontList = buttonState.fontList,
                                                fontListContainer = buttonState.fontListContainer,
                                                keyCode = event.which || event.keyCode;
                                            40 === keyCode
                                                ? fontList.gFontsPanel("selectLower")
                                                : 38 === keyCode
                                                  ? fontList.gFontsPanel("selectUpper")
                                                  : 13 === keyCode &&
                                                    fontListContainer &&
                                                    (fontListContainer.gOverlay("close", buttonElement), $button.data("gfontsbutton").options.closeCallback.call(buttonElement));
                                        }
                                    })
                                    .on("click", function (event) {
                                        (gDesigner.stats("fonts_expand_textfield"),
                                            searchFontList($button, ""),
                                            "text" !== $button.attr("type") && ($button.attr("type", "text"), buttonElement.select()),
                                            ($button.data("gfontsbutton").tempFontFamily = $button.val()));
                                        var fontList = $button.data("gfontsbutton").fontList,
                                            fontListContainer = $button.data("gfontsbutton").fontListContainer;
                                        fontList
                                            ? (fontListContainer.gOverlay("open", buttonElement, buttonElement), fontList.gFontsPanel("refresh", true))
                                            : (buildFontList(this),
                                              (fontList = $button.data("gfontsbutton").fontList),
                                              (fontListContainer = $button.data("gfontsbutton").fontListContainer).gOverlay("open", buttonElement, buttonElement),
                                              fontList.gFontsPanel("refresh"));
                                        var selectCurrentFont = function () {
                                            (fontList.gFontsPanel("selection", $button.val()), fontList.gFontsPanel("focusCurrent"), $button.select());
                                        };
                                        0 === fontList.gFontsPanel("fontsLength")
                                            ? setTimeout(function () {
                                                  selectCurrentFont();
                                              }, 100)
                                            : selectCurrentFont();
                                    }));
                        }),
                        this
                    );
                },
            };
        ((module.exports = GLocalFontsAccess),
            ($.fn.gFontsButton = function (methodName) {
                return gFontsButtonMethods[methodName]
                    ? gFontsButtonMethods[methodName].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof methodName && methodName
                      ? void $.error("Method " + methodName + " does not exist on jQuery.myPlugin")
                      : gFontsButtonMethods.init.apply(this, arguments);
            }));
    };
