module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(851), require(4), require(41), require(13), require(26));
        var GObject = require(1),
            Utils = require(40),
            gFontUtils = require(1200),
            FontsProviderManager = require(255);
        function resetAndRenderFonts(queryResult, scrollToFamily) {
            var panel = $(this);
            (panel.empty(), (panel.data("g-fonts-panel").lastPreviewPosition = 0), renderFontRows.call(this, queryResult, scrollToFamily));
        }
        function renderFontRows(queryResult, scrollToFamily) {
            var panel = $(this),
                element = this,
                panelState = panel.data("g-fonts-panel"),
                faces = queryResult.faces;
            if (faces) {
                var onRowActivate = function (event, target, font) {
                        if (target && "_SPECIAL_" === target.getAttribute("name")) event.stopPropagation();
                        else {
                            if ((target && !font && (font = $(target).closest(".fonts-row").data("font")), font.special))
                                return (gDesigner.stats("fontspanel_click_deletefont", font.family), void event.stopPropagation());
                            (gDesigner.stats("fontspanel_click_setfont", font.family),
                                methods.selection.call(element, font.family),
                                panelState.options.changeCallback && panelState.options.changeCallback(font),
                                event.preventDefault());
                        }
                    },
                    scrollTarget = null;
                scrollToFamily && scrollToFamily.length && (scrollTarget = scrollToFamily);
                var rows = [],
                    pendingPreviewFonts = [];
                for (let e = 0; e < faces.length; ++e) {
                    const face = faces[e];
                    var h = $("<div></div>")
                        .addClass("fonts-row")
                        .data("font", face)
                        .on("mousedown", function (event) {
                            (gDesigner.isTouchEnabled() && !event.originalEvent.isTrusted) || onRowActivate(event, event.target);
                        })
                        .on("click", (event) => {
                            gDesigner.isTouchEnabled() && onRowActivate(event, event.target);
                        })
                        .append(
                            $("<div></div>")
                                .addClass("info")
                                .text(face.displayname || face.family)
                        );
                    (rows.push(h),
                        face.cachedPreview
                            ? ($("<div></div>").addClass("preview").append(face.cachedPreview).appendTo(h), (panelState.lastPreviewPosition += 22))
                            : face.addPreviewCallback && ((face.row = h), pendingPreviewFonts.push(face)));
                }
                var firstPreviewIndex = 0;
                if (scrollTarget)
                    for (let e = 0; e < pendingPreviewFonts.length; e++) {
                        const previewFont = pendingPreviewFonts[e];
                        if ((previewFont.displayname || previewFont.family).localeCompare(scrollTarget) >= 0) {
                            firstPreviewIndex = e;
                            break;
                        }
                    }
                ((0, Utils.iterateAroundIndex)(pendingPreviewFonts, firstPreviewIndex, (font) => {
                    font.addPreviewCallback.call(
                        font,
                        function (preview) {
                            this.cachedPreview ||
                                ((preview instanceof Element || preview instanceof jQuery) &&
                                    ((this.cachedPreview = preview),
                                    (panelState.lastPreviewPosition += 22),
                                    (function (previewElement, target) {
                                        null === previewFlushTimer &&
                                            (previewFlushTimer = setTimeout(function () {
                                                for (var e of pendingPreviews) e.where.append(e.what);
                                                ((pendingPreviews = []), (previewFlushTimer = null));
                                            }));
                                        pendingPreviews.push({ what: previewElement, where: target });
                                    })($("<div></div>").addClass("preview").append(preview), this.row)));
                        }.bind(font)
                    );
                }),
                    panel.append(rows),
                    panel.on("keydown", function (event, keyCode) {
                        if (13 === (keyCode || event.which || event.keyCode)) {
                            var hoveredFont = $(".g-fonts-panel").find(".fonts-row:hover").data("font");
                            hoveredFont && hoveredFont.family && onRowActivate(event, null, hoveredFont);
                        }
                    }));
            }
        }
        var previewFlushTimer = null,
            pendingPreviews = [];
        function queryAndRender(searchText, scrollToFamily) {
            var panel = this,
                panelState = $(this).data("g-fonts-panel"),
                manager = panelState.manager;
            searchText !== panelState.previousQuery &&
                ((panelState.previousQuery = searchText),
                manager.query((queryResult) => {
                    resetAndRenderFonts.call(panel, queryResult, scrollToFamily);
                }, searchText));
        }
        var methods = {
            init: function (options) {
                return (
                    (options = $.extend({ search: null, preview: null, changeCallback: null }, options)),
                    this.each(function () {
                        var panel = this,
                            defaultFamily = gDesigner.getWorkspace().getFontManager().getDefaultFont().getFamily(),
                            manager = FontsProviderManager.getInstance(),
                            element = $(this)
                                .empty()
                                .addClass("g-fonts-panel")
                                .data("g-fonts-panel", {
                                    options: options,
                                    lastPreviewPosition: 0,
                                    search: options.search || null,
                                    changeCallback: options.changeCallback || null,
                                    manager: manager,
                                });
                        (manager.addEventListener(FontsProviderManager.ResetEvent, () => {
                            (element.addClass("g-loading"),
                                manager.query((queryResult) => {
                                    (resetAndRenderFonts.call(panel, queryResult, defaultFamily), element.removeClass("g-loading"), (defaultFamily = void 0));
                                }, "%"));
                        }),
                            element
                                .on("scroll", function () {
                                    var scrollTop = element.scrollTop(),
                                        panelState = element.data("g-fonts-panel"),
                                        lastPreviewPosition = panelState.lastPreviewPosition,
                                        panelHeight = element.height(),
                                        manager = panelState.manager;
                                    manager.isLoading() ||
                                        (scrollTop / Math.max(1, lastPreviewPosition - panelHeight) > 0.7 &&
                                            manager.loadMore((queryResult) => {
                                                renderFontRows.call(panel, queryResult, "Open Sans");
                                            }, panelState.search));
                                })
                                .on("focusin", function (event) {
                                    event.preventDefault();
                                }));
                    })
                );
            },
            selection: function (family) {
                var panel = this,
                    element = $(this),
                    panelState = element.data("g-fonts-panel");
                if (!arguments.length) {
                    var selectedRow = element.find(".fonts-row.g-selected");
                    return selectedRow.length ? selectedRow.data("font").family : null;
                }
                return (
                    element.find(".fonts-row").each(function (index, rowElement) {
                        var row = $(rowElement),
                            isMatch = row.data("font").family === family;
                        if ((row.toggleClass("g-selected", isMatch), isMatch)) {
                            var manager = panelState.manager;
                            if (!row.data("font").cachedPreview || (index > 0 && !$(element.find(".fonts-row")[index - 1]).data("font").cachedPreview))
                                for (var loadedCount = manager.loadMore(renderFontRows.bind(panel), panelState.search); 0 !== loadedCount && loadedCount < index; ) {
                                    if (loadedCount >= (loadedCount = manager.loadMore(renderFontRows.bind(panel), panelState.search))) break;
                                }
                        }
                    }),
                    this
                );
            },
            selectUpper: function () {
                var element = $(this),
                    panelState = element.data("g-fonts-panel"),
                    targetFont = element.find(".fonts-row.g-selected").prev().data("font");
                (targetFont ||
                    (targetFont = element
                        .find(".fonts-row")
                        .filter(function () {
                            return $(this).position().top <= $(this).outerHeight();
                        })
                        .data("font")),
                    targetFont &&
                        (methods.selection.call(this, targetFont.family),
                        methods.focusCurrent.call(this),
                        panelState.options.changeCallback && panelState.options.changeCallback(targetFont)));
            },
            selectLower: function () {
                var element = $(this),
                    panelState = element.data("g-fonts-panel"),
                    targetFont = element.find(".fonts-row.g-selected").next().data("font");
                (targetFont ||
                    (targetFont = element
                        .find(".fonts-row")
                        .filter(function () {
                            return $(this).position().top <= $(this).outerHeight();
                        })
                        .data("font")),
                    targetFont &&
                        (methods.selection.call(this, targetFont.family),
                        methods.focusCurrent.call(this),
                        panelState.options.changeCallback && panelState.options.changeCallback(targetFont)));
            },
            search: function (searchText, scrollToFamily) {
                var element = $(this),
                    panelState = element.data("g-fonts-panel");
                return arguments.length ? (searchText !== panelState.search && ((panelState.search = searchText), methods.refresh.call(this, false, scrollToFamily)), this) : panelState.search;
            },
            focusCurrent: function () {
                var selectedIndex,
                    panel = $(this),
                    selectedRow = panel.find(".fonts-row.g-selected"),
                    offsetTop = 0;
                selectedRow &&
                    selectedRow.position() &&
                    (selectedRow.position().top > panel.height() - selectedRow.outerHeight()
                        ? ((selectedIndex = selectedRow.index()),
                          panel.find(".fonts-row:lt(" + selectedIndex + ")").each(function () {
                              offsetTop += $(this).outerHeight(true);
                          }),
                          panel.scrollTop(offsetTop - panel.height() + selectedRow.outerHeight(true)))
                        : selectedRow.position().top < 0 &&
                          ((selectedIndex = selectedRow.index()),
                          panel.find(".fonts-row:lt(" + selectedIndex + ")").each(function () {
                              offsetTop += $(this).outerHeight(true);
                          }),
                          panel.scrollTop(offsetTop)));
            },
            reload: function (scrollToFamily) {
                (($(this).data("g-fonts-panel").previousQuery = null), methods.refresh.call(this, false, scrollToFamily));
            },
            refresh: function (resetSearch, scrollToFamily) {
                var element = $(this),
                    panelState = element.data("g-fonts-panel"),
                    searchPattern = panelState.search ? panelState.search + "%" : "%";
                searchPattern !== panelState.previousQuery &&
                    (element.empty(),
                    (panelState.lastPreviewPosition = 0),
                    element.text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.loading")) + "..."),
                    resetSearch && (panelState.search = null),
                    queryAndRender.call(this, searchPattern, scrollToFamily));
            },
            stylesForFont: function (family, callback) {
                var styles = null,
                    manager = $(this).data("g-fonts-panel").manager;
                if (manager.isCacheEmpty()) return void (callback && manager.query(callback, "%", true));
                let fontFamily = (0, gFontUtils.getFontFamily)(family, manager.searchFamilyInCache.bind(manager));
                if (fontFamily && fontFamily.fonts && fontFamily.fonts.length) {
                    styles = [];
                    for (var r = 0; r < fontFamily.fonts.length; r++) styles.push(fontFamily.fonts[r].style);
                }
                return styles;
            },
            stylesForWeight: function (weight, family, callback, matchFamily) {
                var styles = null,
                    manager = $(this).data("g-fonts-panel").manager;
                if (manager.isCacheEmpty()) return void (callback && manager.query(callback, "%", true));
                let fontFamily = (0, gFontUtils.getFontFamily)(family, manager.searchFamilyInCache.bind(manager));
                if (fontFamily && fontFamily.fonts && fontFamily.fonts.length) {
                    styles = [];
                    for (var l = 0; l < fontFamily.fonts.length; l++)
                        fontFamily.fonts[l].weight === weight &&
                            (matchFamily && fontFamily.fonts[l].hasOwnProperty("family")
                                ? fontFamily.fonts[l].family === family && styles.push(fontFamily.fonts[l].style)
                                : styles.push(fontFamily.fonts[l].style));
                }
                return styles;
            },
            subfamiliesForWeight: function (weight, family, callback) {
                var subfamilies = null,
                    manager = $(this).data("g-fonts-panel").manager;
                if (manager.isCacheEmpty()) return void (callback && manager.query(callback, "%", true));
                let fontFamily = (0, gFontUtils.getFontFamily)(family, manager.searchFamilyInCache.bind(manager));
                if (fontFamily && fontFamily.fonts && fontFamily.fonts.length) {
                    subfamilies = [];
                    for (var s = 0; s < fontFamily.fonts.length; s++)
                        fontFamily.fonts[s].weight === weight &&
                            subfamilies.push({
                                realName: fontFamily.fonts[s].family || fontFamily.family,
                                subFamily: fontFamily.fonts[s].subfamily,
                            });
                }
                return subfamilies;
            },
            weightsForFont: async function (family, callback, matchFamily) {
                var weights = null,
                    manager = $(this).data("g-fonts-panel").manager;
                if (manager.isCacheEmpty()) return void (callback && manager.query(callback, "%", true));
                let fontFamily = (0, gFontUtils.getFontFamily)(family, manager.searchFamilyInCache.bind(manager));
                if (
                    (fontFamily.isLocalFont && ((fontFamily.fonts = await (0, gFontUtils.parseNativeFonts)(fontFamily.fonts)), delete fontFamily.isLocalFont),
                    fontFamily && fontFamily.fonts && fontFamily.fonts.length)
                ) {
                    weights = [];
                    for (var s = 0; s < fontFamily.fonts.length; s++)
                        (matchFamily && fontFamily.fonts[s].hasOwnProperty("family") && fontFamily.fonts[s].family === family && weights.push(fontFamily.fonts[s].weight),
                            weights.push(fontFamily.fonts[s].weight));
                }
                return weights;
            },
            fontDisplayName: function (family, callback) {
                var manager = $(this).data("g-fonts-panel").manager;
                if (manager.isCacheEmpty()) return void (callback && manager.query(callback, "%", true));
                let fontFamily = (0, gFontUtils.getFontFamily)(family, manager.searchFamilyInCache.bind(manager));
                return (fontFamily && (fontFamily.displayname || fontFamily.family)) || family;
            },
            fontsLength: function () {
                return $(this).find(".fonts-row").length;
            },
        };
        $.fn.gFontsPanel = function (methodName) {
            return methods[methodName]
                ? methods[methodName].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof methodName && methodName
                  ? void $.error("Method " + methodName + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
