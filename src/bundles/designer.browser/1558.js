module.exports = function (module, exports, require) {
        "use strict";
        (require(168 /* PDFFetchStream */), require(57), require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(4), require(41), require(13), require(32), require(38), require(169 /* PDFNetworkStream */), require(1175), require(33));
        var GObject = require(1),
            designerConfig = require(10),
            GCommonNames = require(119),
            GDocument = require(163);
        const { debounce } = require(40 /* Utils */),
            defaultFileFormat = designerConfig.FILE_FORMATS.find((format) => format.default);
        var presetsCache = {},
            onTemplateSelect = null;
        const activeCategories = designerConfig.CATEGORIES.filter((category) => category.active);
        class GTemplatesPanel {
            constructor(selectCallback) {
                ((this._templatesPanel = $("<div/>").addClass("g-templates-panel").appendTo($("body"))),
                    this._templatesPanel.gDialog({
                        closeTimeout: 0,
                        releaseOnClose: true,
                        className: "g-templates-panel-container",
                        alwaysCloseable: true,
                    }),
                    this._templatesPanel.gDialog("open", true),
                    (onTemplateSelect = selectCallback),
                    (this._breadcrumbs = [
                        {
                            key: GTemplatesPanel.DefaultBreadcrumbs.Welcome,
                            name: GObject.GLocale.getValue("GCloudTemplates", "text.welcome"),
                            click: (event) => {
                                (event.stopPropagation(), this._templatesPanel.gDialog("close"));
                            },
                            tooltip: GObject.GLocale.getValue("GFilesPanel", "action.close-window"),
                        },
                    ]),
                    this._initTopBar(this._templatesPanel),
                    this._loadHeader(),
                    (this._contentPanel = $("<div/>").addClass("templates").appendTo(this._templatesPanel)),
                    this._initCategories(),
                    this._initResizeHandler());
            }
            _initResizeHandler() {
                ((this._debouncedResizeHandler = debounce(
                    function () {
                        this._initMasonryLayoutColumns(null, null, null, true);
                    }.bind(this),
                    200
                )),
                    $(window).resize(
                        function () {
                            this._debouncedResizeHandler();
                        }.bind(this)
                    ));
            }
            _openPreset(preset) {
                return GCommonNames
                    .loadDesignData(preset.id)
                    .then((response) => {
                        var newDocument = new GDocument();
                        return (
                            gDesigner.addDocument(newDocument),
                            newDocument.loadFromData(response.data),
                            designerConfig.gApi.usage(preset.id).catch((error) => {
                                console.error("gApi.usage error", error);
                            })
                        );
                    })
                    .catch((error) => {
                        error && console.log(error);
                    })
                    .finally(() => {
                        this._templatesPanel.gDialog("close");
                    });
            }
            _getActivePresetCategory() {
                if (this._currentSubcategory || this._currentCategory)
                    return this._currentSubcategory ? this._currentSubcategory : this._currentCategory;
            }
            _initLoadPage(item, assetType) {
                ((presetsCache = {}),
                    assetType === GTemplatesPanel.AssetType.Category
                        ? ((this._currentCategory = item),
                          this._breadcrumbs.push({
                              key: GTemplatesPanel.DefaultBreadcrumbs.Templates,
                              name: GObject.GLocale.getValue("GCloudTemplates", "text.templates"),
                              click: (event) => {
                                  (event.stopPropagation(),
                                      gDesigner.stats("cloudtemplates_click_backbutton", item ? item.name : ""),
                                      this._initCategories());
                              },
                          }))
                        : assetType === GTemplatesPanel.AssetType.Subcategory &&
                          ((this._currentSubcategory = item),
                          this._breadcrumbs.push({
                              key: this._currentCategory.key,
                              name: GObject.GLocale.getValue("GCommonNames", this._currentCategory.key),
                              click: (event) => {
                                  (event.stopPropagation(),
                                      gDesigner.stats("cloudtemplates_click_backbutton", item ? item.name : ""),
                                      (this._breadcrumbs = this._breadcrumbs.filter((breadcrumb) => breadcrumb.key !== this._currentCategory.key)),
                                      this._initSubcategories());
                              },
                          })),
                    this._loadBreadcrumbs(),
                    this._loadHeader(),
                    assetType === GTemplatesPanel.AssetType.Category && this._currentCategory.subcategories
                        ? this._initSubcategories()
                        : ((this._presetsCount = 0), (this._presetsCurrentSkip = 0), (this._presetsLoadMore = true), this._loadPresets(false)));
            }
            _loadPresets(isLoadMore) {
                (this._toggleLoadMoreButton(false), this._toggleLoading(true), this._doLoadPresets(isLoadMore));
            }
            async _doLoadPresets(isLoadMore) {
                var self = this;
                this._presetsLoadMore &&
                    (async function (done) {
                        try {
                            var result = await designerConfig.gApi.listMarketV2({
                                path: self._getActivePresetCategory().path,
                                type: defaultFileFormat.type,
                                sort: "-usages",
                                limit: designerConfig.PRESET_LIMIT,
                                skip: self._presetsCurrentSkip,
                            });
                            (presetsCache[self._getActivePresetCategory().key] || (presetsCache[self._getActivePresetCategory().key] = []),
                                (presetsCache[self._getActivePresetCategory().key] = presetsCache[self._getActivePresetCategory().key].concat(result.data)),
                                result.count && (self._presetsCount = result.count),
                                presetsCache[self._getActivePresetCategory().key].length == self._presetsCount
                                    ? (self._presetsLoadMore = false)
                                    : (self._presetsCurrentSkip += designerConfig.PRESET_LIMIT),
                                done(result.data, isLoadMore));
                        } catch (error) {
                            (done(presetsCache[self._getActivePresetCategory().key], false), console.error(error));
                        }
                    })(function (presets, isLoadMore) {
                        (isLoadMore || self._contentPanel.empty(),
                            self._initMasonryLayoutColumns(presets, GTemplatesPanel.AssetType.Preset, isLoadMore),
                            self._loadMoreButton(),
                            self._toggleLoading(false));
                    });
            }
            _loadMoreButton() {
                (this._contentPanel.find(".button-wrapper").remove(),
                    this._presetsLoadMore && (this._doLoadMoreButton(), this._toggleLoadMoreButton(true)));
            }
            _doLoadMoreButton() {
                this._contentPanel.append(
                    $("<div/>")
                        .addClass("button-wrapper")
                        .addClass("hidden")
                        .append(
                            $("<div/>")
                                .addClass("g-button")
                                .addClass("cloud-button")
                                .addClass("load-more")
                                .on("click", () => {
                                    this._loadPresets(true);
                                })
                                .append(
                                    $("<span/>")
                                        .addClass("label")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.library-load-more")))
                                )
                        )
                );
            }
            _initSubcategories() {
                (this._contentPanel.empty(),
                    (this._currentSubcategory = null),
                    this._loadHeader(),
                    this._loadBreadcrumbs(),
                    this._initMasonryLayoutColumns(this._currentCategory.subcategories, GTemplatesPanel.AssetType.Subcategory));
            }
            _initCategories() {
                (this._contentPanel.empty(),
                    (this._currentCategory = null),
                    (this._currentSubcategory = null),
                    this._loadHeader(),
                    this._loadBreadcrumbs(true),
                    this._initMasonryLayoutColumns(activeCategories, GTemplatesPanel.AssetType.Category));
            }
            _initMasonryLayoutColumns(items, assetType, isLoadMore, isResize) {
                var wrapper = this._contentPanel.find(".assets-wrapper");
                if (
                    (0 === wrapper.length && (wrapper = $("<div/>").addClass("assets-wrapper")).appendTo(this._contentPanel),
                    isResize && (items = wrapper.find(".column").children()).unwrap(),
                    0 === items.length)
                )
                    return;
                this._wrapperWidth = wrapper.css("width") ? parseInt(wrapper.css("width").split("px")[0]) : 235;
                var columnWidth,
                    columns = [],
                    columnCount = 1,
                    columnWidthCss = null;
                if (
                    ((columnCount = Math.max(Math.ceil(this._wrapperWidth / 235), columnCount)),
                    (columnWidth = this._wrapperWidth / columnCount - (32 / columnCount) * (columnCount - 1)),
                    (columnWidthCss = 1 == columnCount || columnCount > 2 ? (columnWidth / this._wrapperWidth) * 100 + "%" : "calc(50% - 32px)"),
                    isLoadMore)
                )
                    columns = wrapper.find(".column").toArray();
                else
                    for (var g = 0; g < columnCount; g++) {
                        var h = $("<div/>").addClass("column").css("width", columnWidthCss);
                        (g > 0 && h.css({ "margin-left": "32px" }), columns.push(h));
                    }
                const columnHeights = columns.map(this._getChildrenHeight.bind(this)),
                    columnItems = [];
                for (var y = 0; y < items.length; y++) {
                    var assetContainer;
                    if (isResize) assetContainer = items[y];
                    else if (assetType === GTemplatesPanel.AssetType.Preset) {
                        let preset = items[y];
                        var _ = $("<img/>")
                            .addClass("asset")
                            .attr("src", preset.url_t)
                            .css("width", preset.width || "235px")
                            .on(
                                "click",
                                function () {
                                    (onTemplateSelect && onTemplateSelect(),
                                        gDesigner.stats(
                                            "cloudtemplates_add_" +
                                                (this._getActivePresetCategory() ? this._getActivePresetCategory().name : "default"),
                                            preset.name
                                        ),
                                        gDesigner.getAmplitudeHelper().logEvent(designerConfig.AmplitudeData.Events.DOCUMENT_CREATED, {
                                            DOCUMENT_CATEGORY: this._getActivePresetCategory().name,
                                            DOCUMENT_TYPE: preset.name,
                                            DOCUMENT_TEMPLATE_ID: preset.id,
                                        }),
                                        designerConfig.IS_TRUNK && console.log("Template ID: ", preset.id),
                                        this._openPreset(preset));
                                }.bind(this)
                            );
                        (assetContainer = $("<div/>").addClass("asset-container preset-container").css("margin-bottom", "32px").data("asset", preset)).append(
                            _
                        );
                    } else {
                        let item = items[y];
                        _ = $("<div/>")
                            .addClass("asset")
                            .css("width", item.width + "px")
                            .append(
                                $("<img/>")
                                    .attr("src", item.url)
                                    .on("click", () => {
                                        (gDesigner.stats("cloudtemplates_load_template", item.name), this._initLoadPage(item, assetType));
                                    })
                            )
                            .append(
                                $("<div/>")
                                    .addClass("template-info")
                                    .append(
                                        $("<div/>")
                                            .addClass("template-name")
                                            .html(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", item.key)))
                                    )
                            );
                        (assetContainer = $("<div/>")
                            .addClass("asset-container category-container")
                            .css("margin-bottom", "32px")
                            .data("asset", item)).append(_);
                    }
                    const columnIndex = this._getSmallestColumnIndex(columnHeights),
                        asset = $(assetContainer).data("asset"),
                        thumbnailHeight = this._getThumbnailSize(asset).getHeight();
                    columnHeights[columnIndex] = (columnHeights[columnIndex] || 0) + thumbnailHeight;
                    const columnBucket = columnItems[columnIndex] || [];
                    (columnBucket.push(assetContainer), (columnItems[columnIndex] = columnBucket));
                }
                (columns.forEach((column, index) => {
                    $(column).append(columnItems[index]);
                }),
                    isLoadMore || wrapper.append(columns),
                    this._removeEmptyColumns());
            }
            _removeEmptyColumns() {
                const columns = this._contentPanel.find(".assets-wrapper").children(".column");
                columns.each((index, columnElement) => {
                    columnElement.children.length || columns[index].remove();
                });
            }
            _getThumbnailSize(asset) {
                const scale = 235 / asset.width,
                    height = parseInt(asset.height * scale) + 32;
                return new GObject.GRect(0, 0, 235, height);
            }
            _getChildrenHeight(columnElement) {
                return $(columnElement)
                    .children()
                    .toArray()
                    .reduce((sum, child) => sum + $(child).height(), 0);
            }
            _getSmallestColumnIndex(heights) {
                return heights.indexOf(Math.min.apply(null, heights)) || 0;
            }
            _loadHeader() {
                const header = this._templatesPanel.find(".header");
                (0 === header.length && $("<div/>").addClass("header").appendTo(this._templatesPanel),
                    header.empty(),
                    header.append(
                        $("<span/>")
                            .addClass("title")
                            .html(
                                this._getActivePresetCategory()
                                    ? GObject.GLocale.getValue("GCommonNames", this._getActivePresetCategory().key)
                                    : GObject.GLocale.getValue("GCloudTemplates", "text.templates")
                            )
                    ));
            }
            _initTopBar(container) {
                ((this.topBar = $("<div />")
                    .addClass("top-bar")
                    .append($("<div />").addClass("breadcrumbs"))
                    .append(
                        $("<div />")
                            .addClass("top-buttons")
                            .append(
                                $("<div/>")
                                    .addClass("g-button")
                                    .addClass("cloud-button")
                                    .addClass("close-button")
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.close-window")))
                                    .on("click", (event) => {
                                        (event.stopPropagation(), this._templatesPanel.gDialog("close"));
                                    })
                                    .append($("<span/>").addClass("icon").addClass("gravit-icon-close"))
                            )
                    )
                    .appendTo(container)),
                    this._loadBreadcrumbs());
            }
            _loadBreadcrumbs(resetToWelcome) {
                resetToWelcome && (this._breadcrumbs = this._breadcrumbs.filter((breadcrumb) => breadcrumb.key == GTemplatesPanel.DefaultBreadcrumbs.Welcome));
                const list = this.topBar.find(".breadcrumbs");
                (list.empty(),
                    this._breadcrumbs.forEach((breadcrumb) => {
                        var tooltip;
                        list.append(
                            $("<span/>")
                                .addClass("g-breadcrumb")
                                .append(
                                    $("<span/>")
                                        .addClass("breadcrumb-name")
                                        .html(breadcrumb.name)
                                        .on("click", breadcrumb.click)
                                        .attr(
                                            "data-title",
                                            null !== (tooltip = breadcrumb.tooltip) && void 0 !== tooltip
                                                ? tooltip
                                                : GObject.GLocale.getValue("GFilesPanel", "action.back-tooltip")
                                        )
                                )
                                .append($("<span/>").addClass("breadcrumb-divider").html("›"))
                        );
                    }));
            }
            _toggleLoading(isLoading) {
                this._templatesPanel.toggleClass("loading", isLoading);
            }
            _toggleLoadMoreButton(visible) {
                let button = this._contentPanel.find(".button-wrapper");
                button && button[visible ? "removeClass" : "addClass"]("hidden");
            }
        }
        ((GTemplatesPanel.AssetType = {
            Category: "CATEGORY",
            Subcategory: "SUBCATEGORY",
            Preset: "PRESET",
        }),
            (GTemplatesPanel.DefaultBreadcrumbs = { Welcome: "welcome", Templates: "templates" }),
            (module.exports = GTemplatesPanel));
    };
