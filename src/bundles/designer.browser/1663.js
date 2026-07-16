module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19),
            require(168 /* PDFFetchStream */),
            require(30 /* polyfill:Object */),
            require(57),
            require(8 /* Symbol */),
            require(20 /* polyfill:RegExp */),
            require(34),
            require(134 /* polyfill:String */),
            require(91 /* polyfill:String */),
            require(4),
            require(41),
            require(13),
            require(32),
            require(38),
            require(169 /* PDFNetworkStream */),
            require(1175),
            require(33),
            require(26),
            require(125),
            require(126 /* polyfill:URL */),
            require(114));
        var GImporters = require(1201),
            GObject = require(1),
            GPlatform = require(15),
            designerConfig = require(10),
            GLibraryElements = _interopRequireDefault(require(1664 /* GLibraryElements */)),
            GMessageDialog = require(219),
            GClipAction = require(809),
            { debounce, stringToBase64String } = require(40 /* Utils */);
        const categories = GLibraryElements.default.getElements();
        module.exports = class {
            constructor(container) {
                ((this._parent = container),
                    (this._CURRENT_SKIP_COUNT = 0),
                    (this._IMAGE_PAGE_COUNT = 1),
                    (this._CURRENT_CATEGORY = null),
                    (this._CURRENT_ROOT_CATEGORY = null),
                    (this._IMAGE_ASSET_DRAINED = false),
                    (this._LOADING = false),
                    (this._wrapperWidth = 250),
                    (this._debouncedResizeHandler = debounce(
                        function () {
                            var visibleWrappers = Array.from(this._parent.find(".assets-wrapper")).filter((visibleWrappers) => $(visibleWrappers).children().length),
                                width = $(visibleWrappers).css("width") ? parseInt($(visibleWrappers).css("width").split("px")[0]) : 250;
                            Math.abs(width - this._wrapperWidth) > 50 &&
                                ((this._wrapperWidth = width), this._initMasonryLayoutColumns($(visibleWrappers), null, null, true));
                        }.bind(this),
                        200
                    )));
                var libraryPanel = $("<div/>").addClass("g-library-panel").appendTo(container);
                ((this._libraryPanel = libraryPanel), this._createSearch(libraryPanel), this._initElements(libraryPanel));
            }
            _updateUI(wrapper, category, assets, o, append) {
                var self = this,
                    childCategories = append ? [] : category.children || [],
                    imagesWrapper = wrapper.find(".images");
                if (childCategories.length > 0 && 0 === wrapper.find("select").length) {
                    var categorySelect = $("<select/>")
                        .addClass("selector")
                        .on("change", function () {
                            var statsLabel,
                                selectedCategory = $(this).find("option:selected").data("category");
                            ((self._CURRENT_SKIP_COUNT = 0),
                                (self._IMAGE_PAGE_COUNT = 1),
                                wrapper.find(".asset-container").remove(),
                                selectedCategory
                                    ? ((self._CURRENT_CATEGORY = selectedCategory),
                                      (statsLabel =
                                          (self._CURRENT_ROOT_CATEGORY && (self._CURRENT_ROOT_CATEGORY.name || self._CURRENT_ROOT_CATEGORY.path)) ||
                                          self._CURRENT_ROOT_CATEGORY ||
                                          "") && (statsLabel += "-"),
                                      (statsLabel +=
                                          (self._CURRENT_CATEGORY && (self._CURRENT_CATEGORY.name || self._CURRENT_CATEGORY.path)) ||
                                          self._CURRENT_CATEGORY ||
                                          ""))
                                    : ((self._CURRENT_CATEGORY = category),
                                      (self._CURRENT_ROOT_CATEGORY = category),
                                      (statsLabel =
                                          (self._CURRENT_CATEGORY && (self._CURRENT_CATEGORY.name || self._CURRENT_CATEGORY.path)) ||
                                          self._CURRENT_CATEGORY ||
                                          "") && (statsLabel += "-"),
                                      (statsLabel += "All")),
                                gDesigner.stats("librarypanel_change_category", statsLabel),
                                self._loadAssets(wrapper, self._CURRENT_CATEGORY, self._updateUI.bind(self)));
                        });
                    "element.image" === category.path && categorySelect.addClass("full-width");
                    var parentElement = wrapper.parent();
                    parentElement.find(".selector-container").remove();
                    var indicator = parentElement.find(".indicator");
                    ($("<div/>").addClass("selector-container").append(categorySelect).insertAfter(indicator),
                        $("<option/>")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "element.all")))
                            .appendTo(categorySelect));
                    for (var p = 0; p < childCategories.length; ++p) {
                        var g = "element.child.name." + childCategories[p].name.toLowerCase().trim().replace(/\s+/g, "-");
                        $("<option/>")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", g), childCategories[p].name))
                            .data("category", childCategories[p])
                            .appendTo(categorySelect);
                    }
                }
                !(function (items) {
                    var imageAssets = [];
                    append || wrapper.find(".asset").remove();
                    for (var o = 0; o < items.length; ++o) {
                        let asset = items[o],
                            isImageAsset = asset.path && asset.path.startsWith("element.image");
                        var a = self._getPreviewURI(asset);
                        if (isImageAsset) imageAssets.push(asset);
                        else {
                            var s = $("<div/>")
                                    .addClass("asset-container")
                                    .attr("data-title", asset.name || ""),
                                c = $("<img/>")
                                    .on("dragstart", function () {
                                        return false;
                                    })
                                    .attr("draggable", false)
                                    .attr("src", a)
                                    .on("mousedown", function (event) {
                                        self._onItemDragStartHandler(asset, event);
                                    })
                                    .addClass("asset");
                            (s.append(c), wrapper.append(s));
                        }
                    }
                    if (imageAssets) {
                        var targetWrapper = imagesWrapper.length ? imagesWrapper : wrapper;
                        self._initMasonryLayoutColumns(targetWrapper, imageAssets, append);
                    }
                })(assets);
            }
            _initMasonryLayoutColumns(wrapper, items, append, relayout) {
                if ((relayout && wrapper && (items = wrapper.find(".column").children()).unwrap(), 0 === items.length)) return;
                this._wrapperWidth = wrapper.css("width") ? parseInt(wrapper.css("width").split("px")[0]) : 250;
                var columnWidth,
                    columns = [],
                    columnCount = 2,
                    columnWidthStyle = null;
                if (
                    ((columnCount = Math.max(Math.ceil(this._wrapperWidth / 200), columnCount)),
                    (columnWidth = this._wrapperWidth / columnCount - 4 * (columnCount - 1)),
                    (columnWidthStyle = columnCount > 2 ? (columnWidth / this._wrapperWidth) * 100 + "%" : "calc(50% - 4px)"),
                    append)
                )
                    columns = wrapper.find(".column").toArray();
                else
                    for (var c = 0; c < columnCount; c++) {
                        var d = $("<div/>").addClass("column").css("width", columnWidthStyle);
                        (c > 0 && d.css("margin-left", "4px"), columns.push(d));
                    }
                const columnHeights = columns.map(this._getChildrenHeight.bind(this)),
                    columnItems = [];
                for (var g = 0; g < items.length; g++) {
                    var itemElement;
                    if (relayout) itemElement = items[g];
                    else {
                        let item = items[g];
                        var f = this._getPreviewURI(item),
                            m = $("<img/>")
                                .addClass("asset")
                                .attr("draggable", false)
                                .attr("src", f)
                                .on("dragstart", function () {
                                    return false;
                                });
                        (gDesigner.isTouchDevice()
                            ? m.on("click", () => {
                                  this._addAsset(item);
                              })
                            : m.on("mousedown", (event) => {
                                  this._onItemDragStartHandler(item, event);
                              }),
                            (itemElement = $("<div/>")
                                .addClass("asset-container image-asset")
                                .css("margin-bottom", "4px")
                                .data("asset", item)
                                .append(
                                    $("<span/>")
                                        .text(item.user.name)
                                        .attr("draggable", false)
                                        .on("click", function (event) {
                                            event.preventDefault();
                                            var profileUrl = new URL(item.user.profile);
                                            (profileUrl.searchParams.append("utm_source", encodeURIComponent(designerConfig.DESIGNER.TITLE)),
                                                profileUrl.searchParams.append("utm_medium", "referral"),
                                                gContainer.openExternalLink(event, profileUrl));
                                        })
                                )).append(m));
                    }
                    const columnIndex = this._getSmallestColumnIndex(columnHeights),
                        asset = $(itemElement).data("asset"),
                        thumbnailHeight = this._getThumbnailSize(asset).getHeight();
                    columnHeights[columnIndex] = (columnHeights[columnIndex] || 0) + thumbnailHeight;
                    const columnEntries = columnItems[columnIndex] || [];
                    (columnEntries.push(itemElement), (columnItems[columnIndex] = columnEntries));
                }
                (columns.forEach((column, columnPosition) => {
                    $(column).append(columnItems[columnPosition]);
                }),
                    append || wrapper.append(columns));
            }
            _addAsset(asset, position) {
                var self = this;
                !(async function () {
                    if (asset.content)
                        (position && (position.center = true),
                            gDesigner
                                .getActiveDocument()
                                .placeOrImport(new Blob([asset.content], { type: asset.type || "image/svg+xml" }), position, false, true));
                    else if (asset.path.startsWith("element.ui."))
                        try {
                            var svgText = await fetch(asset.url).then((response) => {
                                    if (!response.ok) throw new Error();
                                    return response.text();
                                }),
                                xmlDoc = $.parseXML(svgText);
                            xmlDoc &&
                                "svg" === xmlDoc.documentElement.nodeName &&
                                gDesigner.getActiveDocument().placeOrImport(new Blob([svgText], { type: "image/svg+xml" }), position, false, true);
                        } catch (e) {}
                    else if (asset.path.startsWith("element.image.")) {
                        var photoId = asset.id;
                        try {
                            var optionKeyPressed = GPlatform.GPlatform.modifiers.optionKey,
                                photoUrl = await designerConfig.gApi.getUnsplashPhotoUrl({
                                    id: photoId,
                                    size: "regular",
                                }),
                                photoBlob = await fetch(photoUrl).then((response) => {
                                    if (!response.ok) throw new Error();
                                    return response.blob();
                                });
                            GImporters.GBitmapImport.import(photoBlob, (error, url, width, height) => {
                                if (error) new GMessageDialog(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.image-too-big"))).open();
                                else {
                                    var activeDocument = gDesigner.getActiveDocument(),
                                        scene = activeDocument.getScene(),
                                        editor = activeDocument.getEditor(),
                                        page = scene.getActivePage(),
                                        selectedElement = editor.hasSelection() && editor.getSelection()[0],
                                        imageName = GObject.GLocale.get(new GObject.GLocaleKey("GImage", "name.unsplash")),
                                        actionName = GObject.GLocale.get(new GObject.GLocaleKey("GEditor", "action.insert-image"));
                                    editor.beginTransaction();
                                    try {
                                        if (!selectedElement || selectedElement instanceof GObject.GImage) {
                                            let image = new GObject.GImage();
                                            (image.setProperties(["name", "iw", "ih", "url"], [imageName, width, height, url]),
                                                self._transformNode(image, position),
                                                page.appendChild(image),
                                                gDesigner.stats("librarypanel_download_image"));
                                        } else if (optionKeyPressed) {
                                            var selectionTransform = editor.getSelection()[0].getTransform(),
                                                translation = selectionTransform && selectionTransform.getTranslation();
                                            let image = new GObject.GImage();
                                            (image.setProperties(["name", "iw", "ih", "url"], [imageName, width, height, url]),
                                                !position && translation && (position = { x: translation.getX(), y: translation.getY() }),
                                                self._transformNode(image, position),
                                                page.appendChild(image),
                                                editor.updateSelection(true, [image]),
                                                gDesigner.executeAction(GClipAction.ID, void 0, void 0, true),
                                                gDesigner.stats("librarypanel_download_image", "clip"));
                                        } else {
                                            var paintLayers = editor.getSelection()[0].getPaintLayers();
                                            if (paintLayers) {
                                                var texturePattern = new GObject.GTexturePattern(url);
                                                (texturePattern.setSizeMode(GObject.GTexturePattern.SizeMode.Cover), texturePattern.setScene(scene));
                                                var fillPaintLayer = new GObject.GStylable.FillPaintLayer(texturePattern);
                                                paintLayers.appendChild(fillPaintLayer);
                                            }
                                            ((actionName = GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.change-properties"))),
                                                gDesigner.stats("librarypanel_download_image", "fill"));
                                        }
                                    } finally {
                                        editor.commitTransaction(actionName);
                                    }
                                }
                            });
                        } catch (e) {}
                    } else {
                        var assetUrl = asset.url,
                            targetDocument = gDesigner.getActiveDocument(),
                            documentEditor = targetDocument.getEditor(),
                            activePage = targetDocument.getScene().getActivePage(),
                            svgWidth = null,
                            svgHeight = null,
                            pageBBox = activePage.getGeometryBBox(),
                            pageWidth = pageBBox && activePage.isFixedSized() ? pageBBox.getWidth() : 800,
                            pageHeight = pageBBox && activePage.isFixedSized() ? pageBBox.getHeight() : 800;
                        if (asset.path.startsWith("element.line.tile")) svgHeight = (svgWidth = 0.4 * pageWidth) / 10;
                        else {
                            ((svgWidth = asset.width), (svgHeight = asset.height));
                            var aspectRatio = svgWidth / svgHeight;
                            if (((svgWidth = pageWidth / 3) > 300 && (svgWidth = 300), (svgHeight = svgWidth / aspectRatio), (svgWidth = Math.round(svgWidth)), (svgHeight = Math.round(svgHeight)) > pageHeight)) {
                                var prevHeight = svgHeight;
                                ((svgHeight = pageHeight / 3) > 300 && (svgHeight = 300), (svgWidth = (svgWidth / prevHeight) * svgHeight), (svgWidth = Math.round(svgWidth)), (svgHeight = Math.round(svgHeight)));
                            }
                        }
                        var xhr = new XMLHttpRequest();
                        (xhr.open("GET", assetUrl),
                            (xhr.onload = () => {
                                GImporters.GSVGImport.import(
                                    xhr.responseText,
                                    { baseWidth: svgWidth, baseHeight: svgHeight, forceBaseSize: true },
                                    gDesigner.getActiveDocument().getScene()._workspace.getFontManager(),
                                    (error, importedElement) => {
                                        if (importedElement) {
                                            documentEditor.beginTransaction();
                                            try {
                                                if (asset.path.startsWith("element.line.tile")) {
                                                    var tileX,
                                                        tileY,
                                                        texturePattern = new GObject.GTexturePattern(importedElement, GObject.GTexturePattern.RepeatMode.Horizontal);
                                                    (texturePattern.setPosition(GObject.GTexturePattern.PositionMode.Center),
                                                        position ? ((tileX = position.x - svgWidth / 2), (tileY = position.y - svgHeight / 2)) : ((tileX = 0.3 * pageWidth), (tileY = (pageHeight - svgHeight) / 2)));
                                                    var tileRectangle = new GObject.GRectangle();
                                                    (tileRectangle.setProperty("trf", new GObject.GTransform(svgWidth / 2, 0, 0, svgHeight / 2, tileX + svgWidth / 2, tileY + svgHeight / 2)),
                                                        tileRectangle.setProperty("isLine", true, true, false),
                                                        activePage.appendChild(tileRectangle),
                                                        tileRectangle.getPaintLayers().insertChild(new GObject.GStylable.FillPaintLayer(texturePattern)),
                                                        gDesigner.getActiveDocument().getEditor().updateSelection(false, [tileRectangle]));
                                                } else (self._transformNode(importedElement, position), targetDocument.insertElement(importedElement, !position, true, false));
                                            } finally {
                                                documentEditor.commitTransaction("Add Element");
                                            }
                                        }
                                    }
                                );
                            }),
                            xhr.send());
                    }
                })();
            }
            _transformNode(element, position) {
                if (position && element.hasMixin(GObject.GElement.Transform)) {
                    var bbox = element.getGeometryBBox(),
                        x = bbox && bbox.getX() ? bbox.getX() : 0,
                        y = bbox && bbox.getY() ? bbox.getY() : 0;
                    (bbox && ((x += bbox.getWidth() / 2), (y += bbox.getHeight() / 2)),
                        element.transform(new GObject.GTransform(1, 0, 0, 1, position.x - x, position.y - y), true));
                }
            }
            _createScrollEvent() {
                ($(".library-container").unbind("scroll"),
                    $($(".library-container")).scroll(
                        function (event) {
                            var scrollContainer = $(event.currentTarget);
                            scrollContainer.scrollTop() > 50
                                ? 0 === $(scrollContainer).find(".library-scroll-top").length &&
                                  $("<div/>")
                                      .addClass("library-scroll-top")
                                      .append(
                                          $("<div/>")
                                              .addClass("container")
                                              .append(
                                                  $("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.back-to-top")))
                                              )
                                              .append($("<span/>").addClass("gravit-icon-back-to-top"))
                                      )
                                      .on("click", function () {
                                          (gDesigner.stats("librarypanel_click_backtotop"),
                                              $(".library-container").animate({ scrollTop: 0 }, "slow"));
                                      })
                                      .appendTo(scrollContainer)
                                : $(scrollContainer).find(".library-scroll-top").remove();
                        }.bind(this)
                    ));
            }
            _createSearch(container) {
                var searchBar = $("<div/>"),
                    resultsPanel = $("<div/>"),
                    self = this,
                    performSearch = function (query) {
                        (self._libraryPanel.find(".category-row").find(".category").removeClass("active"),
                            self._libraryPanel.find(".assets").css("display", "none"),
                            (self._CURRENT_SKIP_COUNT = 0),
                            (self._IMAGE_PAGE_COUNT = 1),
                            (self._CURRENT_CATEGORY = query),
                            (self._CURRENT_ROOT_CATEGORY = null),
                            searchBar.find("span").toggleClass("gravit-icon-search", !query || !query.trim()),
                            searchBar.find("span").toggleClass("gravit-icon-close", !!query && !!query.trim()));
                        var resultsWrapper = resultsPanel.find(".assets-wrapper").first();
                        (resultsWrapper.empty(),
                            resultsWrapper.append($("<div></div>").addClass("assets-wrapper images")),
                            query &&
                                query.trim() &&
                                (resultsPanel.css("display", "block"),
                                self._createScrollEvent(null, resultsPanel, true),
                                self._loadAssets(resultsWrapper, query, self._updateUI.bind(self), true)));
                    };
                (searchBar
                    .addClass("library-search")
                    .append(
                        $("<input/>")
                            .attr("type", "text")
                            .addClass("g-input")
                            .attr("placeholder", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "element.search")) + "...")
                            .on("keypress", function (event) {
                                13 === event.keyCode && performSearch($(this).val());
                            })
                    )
                    .append(
                        $("<span/>")
                            .addClass("gravit-icon-search")
                            .on("click", function () {
                                var searchIcon = $(this);
                                (gDesigner.stats("librarypanel_click_search", searchIcon.prev("input").val()),
                                    $(resultsPanel).is(":visible")
                                        ? (resultsPanel.find(".assets-wrapper").empty(),
                                          resultsPanel.css("display", "none"),
                                          searchIcon.prev("input").val(""),
                                          searchIcon.removeClass("gravit-icon-close"),
                                          searchIcon.addClass("gravit-icon-search"))
                                        : performSearch(searchIcon.prev("input").val()));
                            })
                    )
                    .appendTo(container),
                    resultsPanel
                        .addClass("assets")
                        .css("display", "none")
                        .append(
                            $("<div></div>")
                                .addClass("assets-content")
                                .append([
                                    $("<div/>").addClass("indicator"),
                                    $("<div/>").addClass("assets-wrapper").append($("<div/>").addClass("assets-wrapper images")),
                                ])
                        )
                        .append(this._loadMoreButton(resultsPanel, true))
                        .appendTo(container));
            }
            _loadMoreButton(panel, isSearch) {
                return $("<div/>")
                    .addClass("button-wrapper")
                    .addClass("hidden")
                    .append(
                        $("<button/>")
                            .addClass("load-more")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.library-load-more")))
                            .on("click", () => {
                                (this._loadAssets(
                                    panel.find(".assets-wrapper").first(),
                                    this._CURRENT_CATEGORY,
                                    this._updateUI.bind(this),
                                    isSearch,
                                    true
                                ),
                                    this._toggleShowMoreButton(true, true));
                            })
                    );
            }
            _initElements(container) {
                for (var self = this, n = 0; n < categories.length; ++n) {
                    let category = categories[n];
                    if (n > 0 && n % 3 == 0) {
                        let assetsPanel = $("<div/>")
                            .addClass("assets")
                            .css("display", "none")
                            .append(
                                $("<div/>")
                                    .addClass("assets-content")
                                    .append([$("<div/>").addClass("indicator"), $("<div/>").addClass("assets-wrapper")])
                            )
                            .appendTo(container);
                        assetsPanel.append(this._loadMoreButton(assetsPanel, false));
                    }
                    var o = this._libraryPanel.find(".category-row:last-child");
                    (0 !== o.length && 3 !== o.children().length) || (o = $("<div/>").addClass("category-row")).appendTo(container);
                    let categoryButton = $("<div/>")
                        .addClass("category")
                        .on("click", function () {
                            var statsLabel = category.name || category.path || category || "";
                            (statsLabel && (statsLabel += "-"), (statsLabel += "All"), gDesigner.stats("librarypanel_search_category", statsLabel));
                            var clickedButton = $(this),
                                o = clickedButton.closest(".category-row"),
                                buttonIndex = o.children().index(this),
                                assetsPanel = o.next(".assets"),
                                wasActive = clickedButton.hasClass("category") && clickedButton.hasClass("active");
                            (o.closest(".g-library-panel").find(".category").removeClass("active"), clickedButton.addClass("active"));
                            var otherPanels = o.closest(".g-library-panel").find(".assets").not(o.next(".assets"));
                            (otherPanels.removeClass("first second third"),
                                $(".library-search").find("span").removeClass("gravit-icon-close"),
                                $(".library-search").find("span").addClass("gravit-icon-search"),
                                otherPanels.css("display", "none"));
                            var wrapperElement = assetsPanel.find(".assets-wrapper");
                            ("auto" !== wrapperElement.css("height") && wrapperElement.css("height", "auto"),
                                assetsPanel.find(".selector-container").remove(),
                                wrapperElement.empty(),
                                otherPanels.find(".assets-wrapper").empty());
                            var togglePanelPosition = function (positionClass) {
                                let wasOpen = assetsPanel.hasClass(positionClass);
                                (assetsPanel.removeClass("first second third"),
                                    wasOpen
                                        ? (assetsPanel.css("display", "none"), clickedButton.removeClass("active"))
                                        : (assetsPanel.addClass(positionClass), assetsPanel.css("display", ""), clickedButton.addClass("active")));
                            };
                            togglePanelPosition(0 === buttonIndex ? "first" : 1 === buttonIndex ? "second" : "third");
                            var assetsContent = assetsPanel.find(".assets-content");
                            ((wrapperElement = assetsPanel.find(".assets-wrapper")),
                                assetsContent.removeClass(),
                                assetsContent.addClass("assets-content"),
                                assetsContent.addClass("asset-" + category.path.slice(8).replace(/\./g, "-")),
                                self._createScrollEvent(categoryButton, assetsPanel),
                                (self._CURRENT_SKIP_COUNT = 0),
                                (self._IMAGE_PAGE_COUNT = 1),
                                (self._CURRENT_CATEGORY = category),
                                (self._CURRENT_ROOT_CATEGORY = category),
                                wasActive || self._loadAssets(wrapperElement, category, self._updateUI));
                        })
                        .appendTo(o);
                    var i = $("<div/>").addClass("content").appendTo(categoryButton);
                    ($("<img/>").addClass("icon").attr("src", category.url).appendTo(i),
                        $("<span/>")
                            .addClass("title")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", category.path.replace(/\.$/, "")), category.name))
                            .appendTo(i));
                }
                let trailingPanel = $("<div/>")
                    .addClass("assets")
                    .css("display", "none")
                    .append(
                        $("<div/>")
                            .addClass("assets-content")
                            .append([$("<div/>").addClass("indicator"), $("<div/>").addClass("assets-wrapper")])
                    )
                    .appendTo(container);
                trailingPanel.append(this._loadMoreButton(trailingPanel, false));
            }
            _loadAssets(wrapper, category, callback, isSearch, append) {
                (this._toggleShowMoreButton(false, false), this._toggleLoading(true), this._doLoadAssets(wrapper, category, callback, isSearch, append));
            }
            async _doLoadAssets(wrapper, category, callback, isSearch, append) {
                let fetchedAssets = [],
                    marketCount = 0,
                    unsplashCount = 0;
                try {
                    if (isSearch) {
                        let unsplashResults = [];
                        if (GLibraryElements.default.isUnsplashIntegrationEnabled()) {
                            if (!this._IMAGE_ASSET_DRAINED)
                                try {
                                    unsplashResults = await designerConfig.gApi.searchUnsplashPhotos({
                                        query: category,
                                        page: this._IMAGE_PAGE_COUNT,
                                    });
                                } catch (error) {
                                    console.warn("Unsplash search failed", error);
                                }
                            ((unsplashCount = (unsplashResults || []).length), unsplashCount || (this._IMAGE_ASSET_DRAINED = true));
                        }
                        ((fetchedAssets = []),
                            -1 !== this._CURRENT_SKIP_COUNT &&
                                (fetchedAssets = await designerConfig.gApi.listMarket({
                                    q: category,
                                    path: "element.",
                                    limit: "90",
                                    skip: this._CURRENT_SKIP_COUNT + "",
                                    sort: "name",
                                })),
                            (marketCount = (fetchedAssets || []).length),
                            (fetchedAssets = fetchedAssets.concat(unsplashResults)));
                    } else if (category.path && category.path.startsWith("element.image"))
                        GLibraryElements.default.isUnsplashIntegrationEnabled() &&
                            ((fetchedAssets = category.tag
                                ? await designerConfig.gApi.searchUnsplashPhotos({
                                      query: category.tag,
                                      page: this._IMAGE_PAGE_COUNT,
                                  })
                                : await designerConfig.gApi.getUnsplashPhotos({
                                      page: this._IMAGE_PAGE_COUNT,
                                  })),
                            (unsplashCount = (fetchedAssets || []).length));
                    else {
                        var categoryPath = category.path;
                        ((fetchedAssets = await designerConfig.gApi.listMarket({
                            path: "element.line" === categoryPath ? "element.line.tile" : categoryPath,
                            tag: category.tag,
                            limit: "90",
                            skip: this._CURRENT_SKIP_COUNT + "",
                            sort: "name",
                        })),
                            (marketCount = (fetchedAssets || []).length));
                    }
                    (marketCount < 90 && 0 === unsplashCount ? this._toggleShowMoreButton(false, false) : this._toggleShowMoreButton(true, false),
                        fetchedAssets.length < 90
                            ? ((this._CURRENT_SKIP_COUNT = -1), this._IMAGE_PAGE_COUNT++)
                            : ((this._CURRENT_SKIP_COUNT += 90), this._IMAGE_PAGE_COUNT++));
                } catch (e) {}
                (this._toggleLoading(false), callback.call(this, wrapper, category, fetchedAssets, isSearch, append));
            }
            _toggleLoading(isLoading) {
                isLoading ? this._libraryPanel.find(".assets").addClass("loading") : this._libraryPanel.find(".assets").removeClass("loading");
            }
            _toggleShowMoreButton(hasMore, loading) {
                let buttonWrapper = this._libraryPanel.find(".assets").find(".button-wrapper");
                (buttonWrapper.find(".load-more")[loading ? "addClass" : "removeClass"]("hidden"),
                    buttonWrapper[loading ? "addClass" : "removeClass"]("loading"),
                    buttonWrapper[hasMore ? "removeClass" : "addClass"]("hidden"));
            }
            _getPreviewURI(asset) {
                return asset.content && !asset.url_t
                    ? "data:".concat(asset.type || "image/svg+xml", ";base64,").concat(stringToBase64String(asset.content))
                    : asset.url_t || asset.url || asset.image.thumb;
            }
            _onItemDragStartHandler(asset, event, targetElement) {
                var rect;
                ((this._clickCheckTime = Date.now()), (rect = targetElement ? targetElement.get(0).getBoundingClientRect() : event.target.getBoundingClientRect()));
                var width = asset.width || rect.width || 50,
                    height = asset.height || rect.height || 50,
                    page = gDesigner.getActiveDocument().getScene().getActivePage();
                if (asset.path.startsWith("element.line.tile"))
                    height = (width = page.getGeometryBBox() && page.isFixedSized() ? 0.4 * page.getGeometryBBox().getWidth() : 320) / 10;
                else {
                    var pageBBox = page.getGeometryBBox(),
                        pageWidth = pageBBox && page.isFixedSized() ? pageBBox.getWidth() : 800,
                        pageHeight = pageBBox && page.isFixedSized() ? pageBBox.getHeight() : 800;
                    if (!asset.path.startsWith("element.ui") && !asset.path.startsWith("element.icons")) {
                        var aspectRatio = width / height;
                        if (((width = pageWidth / 3) > 300 && (width = 300), (height = width / aspectRatio), (width = Math.round(width)), (height = Math.round(height)) > pageHeight)) {
                            var prevHeight = height;
                            ((height = pageHeight / 3) > 300 && (height = 300), (width = (width / asset.height) * prevHeight), (width = Math.round(width)), (height = Math.round(height)));
                        }
                    }
                    ((height *= gDesigner.getWindows().getActiveWindow().getView().getZoom()),
                        (width *= gDesigner.getWindows().getActiveWindow().getView().getZoom()));
                }
                if (!this._dragging) {
                    var centerX = rect.left + rect.width / 2,
                        centerY = rect.top + rect.height / 2;
                    ((this._dragOffset = { x: centerX - event.clientX, y: centerY - event.clientY }),
                        (this._dragging = true),
                        (this._currentElement = event.target),
                        (this._currentItem = asset),
                        (this._previewSize = { w: width, h: height }),
                        asset.path.startsWith("element.line.tile")
                            ? (this.dragPreview = $("<div/>")
                                  .css("background", 'url("' + asset.url + '")')
                                  .css("background-repeat", "repeat-x")
                                  .css("background-position", Math.round(height / 2) + "px 0px")
                                  .css("position", "absolute")
                                  .css("height", height / 2 + "px")
                                  .css("width", width / 2 + "px")
                                  .css("display", "none")
                                  .appendTo("body"))
                            : (asset.content && !asset.url
                                  ? (this.dragPreview = $(asset.content))
                                  : (this.dragPreview = $("<img/>").attr("src", asset.url || (asset.image && asset.image.thumb))),
                              this.dragPreview
                                  .css("position", "absolute")
                                  .css("height", height + "px")
                                  .css("width", width + "px")
                                  .css("display", "none")
                                  .on("dragstart", function () {
                                      return false;
                                  })
                                  .attr("draggable", false)
                                  .appendTo("body")));
                    var clientX = event.clientX,
                        clientY = event.clientY;
                    ($(this.dragPreview).css("left", clientX + "px"),
                        $(this.dragPreview).css("top", clientY + "px"),
                        (this._itemDragListener = this._onItemDrag.bind(this)),
                        (this._itemDragEndListener = this._onItemDragEndHandler.bind(this)),
                        document.addEventListener("mousemove", this._itemDragListener),
                        document.addEventListener("touchmove", this._itemDragListener),
                        document.addEventListener("mouseup", this._itemDragEndListener),
                        document.addEventListener("touchend", this._itemDragEndListener));
                }
            }
            _onItemDragEndHandler(event) {
                if (($(this.dragPreview).remove(), Date.now() - this._clickCheckTime <= 200 || !this._dragMoved))
                    return (
                        (this._dragMoved = false),
                        document.removeEventListener("mousemove", this._itemDragListener),
                        document.removeEventListener("touchmove", this._itemDragListener),
                        document.removeEventListener("mouseup", this._itemDragEndListener),
                        document.removeEventListener("touchend", this._itemDragEndListener),
                        (this._dragging = false),
                        (this._currentElement.style.visibility = "visible"),
                        void this._addAsset(this._currentItem)
                    );
                if (((this._dragMoved = false), this._dragging)) {
                    var activeDocument = gDesigner.getActiveDocument();
                    (document.removeEventListener("mousemove", this._itemDragListener),
                        document.removeEventListener("touchmove", this._itemDragListener),
                        document.removeEventListener("mouseup", this._itemDragEndListener),
                        document.removeEventListener("touchend", this._itemDragEndListener));
                    var clientX = event.clientX,
                        clientY = event.clientY;
                    if (gDesigner.positionIsOnCanvas(clientX, clientY)) {
                        var view = activeDocument.getActiveWindow().getView(),
                            dragEvent = {};
                        (Object.assign(dragEvent, event),
                            (dragEvent.clientX = clientX),
                            (dragEvent.clientY = clientY),
                            (dragEvent.offsetX = event.offsetX + (this._dragOffset && this._dragOffset.x)),
                            (dragEvent.offsetY = event.offsetY + (this._dragOffset && this._dragOffset.y)),
                            (dragEvent.pageX = event.pageX + (this._dragOffset && this._dragOffset.x)),
                            (dragEvent.pageY = event.pageY + (this._dragOffset && this._dragOffset.y)));
                        var dropPosition = view._convertClientPositionFromMousePosition(dragEvent),
                            scenePosition = view.getViewTransform(activeDocument.scene).mapPoint(dropPosition);
                        ((dropPosition = { x: scenePosition._x, y: scenePosition._y }), this._addAsset(this._currentItem, dropPosition));
                    }
                    ((this._dragging = false), (this._currentElement.style.visibility = "visible"));
                }
            }
            _onItemDrag(event) {
                ((this._dragMoved = true), (this._currentElement.style.visibility = "hidden"));
                var left = event.clientX + (this._dragOffset ? this._dragOffset.x : 0),
                    top = event.clientY + (this._dragOffset ? this._dragOffset.y : 0);
                ((left -= this._previewSize.w / 2),
                    (top -= this._previewSize.h / 2),
                    $(this.dragPreview).css("left", left + "px"),
                    $(this.dragPreview).css("top", top + "px"),
                    $(this.dragPreview).css("display", ""));
            }
            resize() {
                this._debouncedResizeHandler();
            }
            _getSmallestColumnIndex(heights) {
                return heights.indexOf(Math.min.apply(null, heights)) || 0;
            }
            _getThumbnailSize(asset) {
                const scale = 200 / asset.image.width,
                    height = parseInt(asset.image.height * scale) + 4;
                return new GObject.GRect(0, 0, 200, height);
            }
            _getChildrenHeight(column) {
                return $(column)
                    .children()
                    .toArray()
                    .reduce((sum, child) => sum + $(child).height(), 0);
            }
        };
    };
