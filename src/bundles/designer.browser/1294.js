module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(57), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(3), require(4), require(13));
        var editorModule = require(53),
            GObject = require(1),
            richTooltipModule = require(67),
            touchToolModule = _interopRequireDefault(require(340)),
            GAlignAction = require(866),
            GDistributeAction = require(867),
            GProperties = require(123),
            GSettingChangedEvent = (require(173), require(135)),
            iconClasses = require(257),
            GSnapUnitAction = require(1295);
        function GDimensionProperties() {
            this._elements = [];
        }
        (GObject.GObject.inherit(GDimensionProperties, GProperties),
            (GDimensionProperties._keepRatioName = "designer.settings.dimension.preserveratio"),
            (GDimensionProperties.prototype._panel = null),
            (GDimensionProperties.prototype._toolbar = null),
            (GDimensionProperties.prototype._transformButton = null),
            (GDimensionProperties.prototype._document = null),
            (GDimensionProperties.prototype._elements = null),
            (GDimensionProperties.prototype._elementsBBox = null),
            (GDimensionProperties.prototype._anchorsPanel = null),
            (GDimensionProperties.prototype._firstElementsBBox = null),
            (GDimensionProperties.prototype.init = function (panel, toolbar) {
                ((this._panel = panel),
                    (this._toolbar = toolbar),
                    this._panel.addClass("dimension-panel"),
                    this.setTouchTools([
                        new touchToolModule.default({
                            id: "dimension.align",
                            icon: "gravit-icon-align",
                            panelWidth: "370px",
                            panel: this._toolbar,
                        }),
                        new touchToolModule.default({
                            id: "dimension.dimension",
                            icon: "gravit-icon-touch-transform",
                            toolbar: ".advanced-transform-toolbar",
                            panelWidth: "395px",
                            panel: [this._panel, ".advanced-transform-properties"],
                        }),
                    ]));
                var createDimensionField = function (dimensionKey, tooltipConfig) {
                    var self = this;
                    if ("keep-ratio" == dimensionKey)
                        return $("<span></span>")
                            .addClass(editorModule.GEditorOptions.preserveAspectRatio ? "gravit-icon-linked" : "gravit-icon-unlinked")
                            .css("text-align", "center")
                            .css("cursor", "pointer")
                            .on("click", function (e) {
                                var ratioToggle = $(this);
                                "yes" === ratioToggle.attr("data-ratio")
                                    ? (ratioToggle.attr("data-ratio", "no").attr("class", "gravit-icon-unlinked"),
                                      self._setAspectRatioBehavior(false),
                                      gDesigner.stats("dimension_toggle_preserveratio", "disabled"))
                                    : (ratioToggle.attr("data-ratio", "yes").attr("class", "gravit-icon-linked"),
                                      self._setAspectRatioBehavior(true),
                                      gDesigner.stats("dimension_toggle_preserveratio", "enabled"));
                            })
                            .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.keep-ratio")))
                            .attr("data-ratio", editorModule.GEditorOptions.preserveAspectRatio ? "yes" : "no")
                            .gRichTooltip(tooltipConfig);
                    if ("x" === dimensionKey || "y" === dimensionKey || "w" === dimensionKey || "h" === dimensionKey) {
                        var label = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "property-".concat(dimensionKey.toLowerCase())), dimensionKey);
                        return $("<div/>")
                            .append(
                                $("<input>")
                                    .attr("type", "text")
                                    .attr("data-dimension", dimensionKey)
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats("dimension_set_positionOrSize"),
                                                this._assignDimension(dimensionKey, $(event.target).gInputBox("value")));
                                        }.bind(this)
                                    )
                                    .gInputBox({ minValue: "w" === dimensionKey || "h" === dimensionKey ? 0 : null })
                            )
                            .gInputLabel({ label: label, autoPadding: label.length > 1 })
                            .gRichTooltip(tooltipConfig);
                    }
                    return "rotate" === dimensionKey
                        ? $("<div/>")
                              .append(
                                  $("<input>")
                                      .attr("type", "text")
                                      .attr("data-dimension", dimensionKey)
                                      .on(
                                          "change",
                                          function (event) {
                                              (gDesigner.stats("dimension_set_rotation"),
                                                  this._assignDimension(dimensionKey, $(event.target).gInputBox("value")));
                                          }.bind(this)
                                      )
                                      .gInputBox({ postfix: "°" })
                              )
                              .gInputLabel({ label: "R" })
                              .gRichTooltip(tooltipConfig)
                        : void 0;
                }.bind(this);
                function createAlignButton(alignType) {
                    var actionId = GAlignAction.ID + "." + alignType,
                        action = gDesigner.getAction(actionId);
                    const tooltipConfig = action.getTooltipConfig(richTooltipModule.TOOLTIP_AREA.SIDEBAR),
                        iconElement = $("<span></span>");
                    return (
                        iconClasses.icon ? (iconElement.addClass("icon"), iconElement.addClass(action.getIcon())) : iconElement.append(action.getIcon()),
                        iconElement.css("stroke", "transparent"),
                        tooltipConfig && iconElement.gRichTooltip(tooltipConfig),
                        $("<button></button>")
                            .attr("data-title", GObject.GLocale.get(action.getTitle()))
                            .attr("data-action", actionId)
                            .addClass("svg-button")
                            .append(iconElement.addClass("normal"))
                            .append($("<span/>").addClass("gravit-icon-touch-".concat(alignType, " touch")))
                            .on("click", function () {
                                gDesigner.executeAction(actionId, void 0, "dimensionproperties");
                            })
                    );
                }
                function createDistributeButton(distributeType) {
                    var actionId = GDistributeAction.ID + "." + distributeType,
                        action = gDesigner.getAction(actionId);
                    const tooltipConfig = action.getTooltipConfig(richTooltipModule.TOOLTIP_AREA.SIDEBAR),
                        iconElement = $("<span></span>").append(action.getIcon());
                    return (
                        tooltipConfig && iconElement.gRichTooltip(tooltipConfig),
                        $("<button></button>")
                            .attr("data-title", GObject.GLocale.get(action.getTitle()))
                            .attr("data-action", actionId)
                            .addClass("svg-button")
                            .append(iconElement.addClass("normal"))
                            .append($("<span/>").addClass("gravit-icon-touch-".concat(distributeType, " touch")))
                            .on("click", function () {
                                var gapValue = $(".".concat(distributeType, "Input")).find("input").val();
                                ((gapValue = "Auto" == gapValue ? void 0 : parseInt(gapValue)),
                                    gDesigner.executeAction(actionId, [void 0, void 0, gapValue], "dimensionproperties"));
                            })
                    );
                }
                function createDistributeInput(distributeType) {
                    var selectElement = $("<div></div>")
                            .addClass(distributeType + "Input")
                            .gInputSelect({ list: ["Auto", "0", 1, 10, 20, 30, 50, 100] }),
                        numberPattern = /^-?[0-9]+.?[0-9]*$/;
                    return (
                        selectElement
                            .find("input")
                            .val("Auto")
                            .off("change")
                            .on("change", function () {
                                numberPattern.test($(this).val()) || $(this).val("Auto");
                            }),
                        selectElement
                    );
                }
                (toolbar
                    .addClass("main-toolbar")
                    .append(createDistributeButton(GDistributeAction.Type.Horizontal).addClass("primary normalDistribute"))
                    .append(createDistributeButton(GDistributeAction.Type.Vertical).addClass("primary normalDistribute"))
                    .append($("<span></span>").addClass("divider"))
                    .append(createAlignButton(editorModule.GEditor.ArrangeAlignType.AlignLeft).addClass("secondary"))
                    .append(createAlignButton(editorModule.GEditor.ArrangeAlignType.AlignCenter).addClass("secondary"))
                    .append(createAlignButton(editorModule.GEditor.ArrangeAlignType.AlignRight).addClass("secondary"))
                    .append($("<span></span>").addClass("divider"))
                    .append($("<p/>").addClass("interval"))
                    .append(createAlignButton(editorModule.GEditor.ArrangeAlignType.AlignTop).addClass("secondary"))
                    .append(createAlignButton(editorModule.GEditor.ArrangeAlignType.AlignMiddle).addClass("secondary"))
                    .append(createAlignButton(editorModule.GEditor.ArrangeAlignType.AlignBottom).addClass("secondary"))
                    .append($("<p/>").addClass("lineBreak"))
                    .append(createDistributeButton(GDistributeAction.Type.Horizontal).addClass("primary touchDistribute"))
                    .append(createDistributeInput(GDistributeAction.Type.Horizontal).addClass("touchDistribute"))
                    .append($("<p/>").addClass("interval"))
                    .append(createDistributeButton(GDistributeAction.Type.Vertical).addClass("primary touchDistribute"))
                    .append(createDistributeInput(GDistributeAction.Type.Vertical).addClass("touchDistribute")),
                    (this._advancedFillPanel = $("<div></div>").gOverlay({
                        releaseOnClose: false,
                    })),
                    this._advancedFillPanel.parent().addClass("settingBox"),
                    $("<div></div>")
                        .addClass("alignSettings")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "100%",
                                    content: $("<div></div>")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.sameHeight")))
                                        .prepend($("<span></span>").addClass("gravit-icon-sameHeight"))
                                        .on("click", () => {
                                            (new GAlignAction(editorModule.GEditor.ArrangeAlignType.AlignJustifyVertical).execute(),
                                                this._advancedFillPanel.gOverlay("close"));
                                        }),
                                },
                            ],
                        })
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "100%",
                                    content: $("<div></div>")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.sameWidth")))
                                        .prepend($("<span></span>").addClass("gravit-icon-sameWidth"))
                                        .on("click", () => {
                                            (new GAlignAction(editorModule.GEditor.ArrangeAlignType.AlignJustifyHorizontal).execute(),
                                                this._advancedFillPanel.gOverlay("close"));
                                        }),
                                },
                            ],
                        })
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "100%",
                                    content: $("<div></div>")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.fullUnit")))
                                        .prepend($("<span></span>").addClass("gravit-icon-fullUnit"))
                                        .on("click", () => {
                                            (new GSnapUnitAction(GSnapUnitAction.Type.FullUnit).execute(), this._advancedFillPanel.gOverlay("close"));
                                        }),
                                },
                            ],
                        })
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "100%",
                                    content: $("<div></div>")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.halfUnit")))
                                        .prepend($("<span></span>").addClass("gravit-icon-HalfUnit"))
                                        .on("click", () => {
                                            (new GSnapUnitAction(GSnapUnitAction.Type.HalfUnit).execute(), this._advancedFillPanel.gOverlay("close"));
                                        }),
                                },
                            ],
                        })
                        .appendTo(this._advancedFillPanel),
                    $("<p/>").addClass("lineBreak").prependTo(toolbar),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.setting")))
                        .addClass("align-settings")
                        .append($("<span></span>").addClass("gravit-icon-touch-settings"))
                        .on(
                            "click",
                            function (event) {
                                this._advancedFillPanel.gOverlay("open", $(event.target).closest("button"));
                            }.bind(this)
                        )
                        .prependTo(toolbar),
                    $("<label></label>")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.alignTitle")))
                        .prependTo(toolbar));
                const positionTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.property-x-y-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.property-x-y-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/property-panel/#objects-position",
                    }),
                    sizeTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.property-w-h-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.property-w-h-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/property-panel/#objects-size",
                    }),
                    keepRatioTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.keep-ratio-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.keep-ratio-tooltip-description")),
                    }),
                    transformTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.transform-button-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.transform-button-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/transform-panel/",
                    }),
                    rotateTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.rotate-angle-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.rotate-angle-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/property-panel/#objects-angle",
                    });
                ($("<div/>")
                    .addClass("transform-titile")
                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.transform-title")))
                    .appendTo(this._panel),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.position")),
                            columns: [{ width: "44%", content: createDimensionField("x", positionTooltip) }, { width: "12%" }, { width: "44%", content: createDimensionField("y", positionTooltip) }],
                        })
                        .appendTo(panel),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.size")),
                            columns: [
                                { width: "44%", content: createDimensionField("w", sizeTooltip) },
                                { width: "12%", content: createDimensionField("keep-ratio", keepRatioTooltip) },
                                { width: "44%", content: createDimensionField("h", sizeTooltip) },
                            ],
                        })
                        .appendTo(panel),
                    (this._transformButton = $(
                        "<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.transform")) + "</button>"
                    )
                        .addClass("transform-button")
                        .on("click", this._toggleTransformMode.bind(this))
                        .gRichTooltip(transformTooltip)),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.angle")),
                            columns: [
                                { width: "44%", content: createDimensionField("rotate", rotateTooltip) },
                                { width: "12%" },
                                { width: "44%", content: this._transformButton },
                            ],
                        })
                        .appendTo(panel),
                    (this._anchorsPanel = $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.anchors")),
                            columns: [
                                {
                                    width: "44%",
                                    content: $("<div/>")
                                        .addClass("anchor-buttons")
                                        .append(
                                            $("<div/>")
                                                .append($("<span/>").addClass("gravit-icon-anchor-left"))
                                                .addClass("g-button")
                                                .addClass("g-group-start")
                                                .addClass("hacr-start")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.anchor-left"))
                                                )
                                                .on(
                                                    "click",
                                                    function () {
                                                        gDesigner.stats("dimension_set_anchors-horizontalstart");
                                                        var currentValue = this._getHorizontalAnchorValue(),
                                                            newValue = this._defineAnchorProperty("hacr", GObject.GElement.Anchor.AnchorType.Start, currentValue);
                                                        this._defineAnchorButtonState(null, newValue);
                                                    }.bind(this)
                                                )
                                                .gRichTooltip(
                                                    richTooltipModule.GRichTooltipConfig.from({
                                                        title: GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GDimensionProperties", "text.anchor-left-tooltip-title")
                                                        ),
                                                        description: GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GDimensionProperties", "text.anchor-left-tooltip-description")
                                                        ),
                                                        learnMore: "/docs/design-aids/anchoring/",
                                                    })
                                                )
                                        )
                                        .append(
                                            $("<div/>")
                                                .append($("<span/>").addClass("gravit-icon-anchor-center"))
                                                .addClass("g-button")
                                                .addClass("g-group-element")
                                                .addClass("hacr-middle")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.anchor-center"))
                                                )
                                                .on(
                                                    "click",
                                                    function () {
                                                        gDesigner.stats("dimension_set_anchors-horizontalmiddle");
                                                        var currentValue = this._getHorizontalAnchorValue(),
                                                            newValue = this._defineAnchorProperty("hacr", GObject.GElement.Anchor.AnchorType.Middle, currentValue);
                                                        this._defineAnchorButtonState(null, newValue);
                                                    }.bind(this)
                                                )
                                                .gRichTooltip(
                                                    richTooltipModule.GRichTooltipConfig.from({
                                                        title: GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GDimensionProperties", "text.anchor-center-tooltip-title")
                                                        ),
                                                        description: GObject.GLocale.get(
                                                            new GObject.GLocaleKey(
                                                                "GDimensionProperties",
                                                                "text.anchor-center-tooltip-description"
                                                            )
                                                        ),
                                                        learnMore: "/docs/design-aids/anchoring/",
                                                    })
                                                )
                                        )
                                        .append(
                                            $("<div/>")
                                                .append($("<span/>").addClass("gravit-icon-anchor-right"))
                                                .addClass("g-button")
                                                .addClass("g-group-end")
                                                .addClass("hacr-end")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.anchor-right"))
                                                )
                                                .on(
                                                    "click",
                                                    function () {
                                                        gDesigner.stats("dimension_set_anchors-horizontalend");
                                                        var currentValue = this._getHorizontalAnchorValue(),
                                                            newValue = this._defineAnchorProperty("hacr", GObject.GElement.Anchor.AnchorType.End, currentValue);
                                                        this._defineAnchorButtonState(null, newValue);
                                                    }.bind(this)
                                                )
                                                .gRichTooltip(
                                                    richTooltipModule.GRichTooltipConfig.from({
                                                        title: GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GDimensionProperties", "text.anchor-right-tooltip-title")
                                                        ),
                                                        description: GObject.GLocale.get(
                                                            new GObject.GLocaleKey(
                                                                "GDimensionProperties",
                                                                "text.anchor-right-tooltip-description"
                                                            )
                                                        ),
                                                        learnMore: "/docs/design-aids/anchoring/",
                                                    })
                                                )
                                        ),
                                },
                                { width: "12%" },
                                {
                                    width: "44%",
                                    content: $("<div>")
                                        .addClass("anchor-buttons")
                                        .append(
                                            $("<div/>")
                                                .append($("<span/>").addClass("gravit-icon-anchor-top"))
                                                .addClass("g-button")
                                                .addClass("g-group-start")
                                                .addClass("vacr-start")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.anchor-top"))
                                                )
                                                .on(
                                                    "click",
                                                    function () {
                                                        gDesigner.stats("dimension_set_anchors-verticalstart");
                                                        var currentValue = this._getVerticalAnchorValue(),
                                                            newValue = this._defineAnchorProperty("vacr", GObject.GElement.Anchor.AnchorType.Start, currentValue);
                                                        this._defineAnchorButtonState(newValue, null);
                                                    }.bind(this)
                                                )
                                                .gRichTooltip(
                                                    richTooltipModule.GRichTooltipConfig.from({
                                                        title: GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GDimensionProperties", "text.anchor-top-tooltip-title")
                                                        ),
                                                        description: GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GDimensionProperties", "text.anchor-top-tooltip-description")
                                                        ),
                                                        learnMore: "/docs/design-aids/anchoring/",
                                                    })
                                                )
                                        )
                                        .append(
                                            $("<div/>")
                                                .append($("<span/>").addClass("gravit-icon-anchor-middle"))
                                                .addClass("g-button")
                                                .addClass("g-group-element")
                                                .addClass("vacr-middle")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.anchor-middle"))
                                                )
                                                .on(
                                                    "click",
                                                    function () {
                                                        gDesigner.stats("dimension_set_anchors-verticalmiddle");
                                                        var currentValue = this._getVerticalAnchorValue(),
                                                            newValue = this._defineAnchorProperty("vacr", GObject.GElement.Anchor.AnchorType.Middle, currentValue);
                                                        this._defineAnchorButtonState(newValue, null);
                                                    }.bind(this)
                                                )
                                                .gRichTooltip(
                                                    richTooltipModule.GRichTooltipConfig.from({
                                                        title: GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GDimensionProperties", "text.anchor-middle-tooltip-title")
                                                        ),
                                                        description: GObject.GLocale.get(
                                                            new GObject.GLocaleKey(
                                                                "GDimensionProperties",
                                                                "text.anchor-middle-tooltip-description"
                                                            )
                                                        ),
                                                        learnMore: "/docs/design-aids/anchoring/",
                                                    })
                                                )
                                        )
                                        .append(
                                            $("<div/>")
                                                .append($("<span/>").addClass("gravit-icon-anchor-bottom"))
                                                .addClass("g-button")
                                                .addClass("g-group-end")
                                                .addClass("vacr-end")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.anchor-bottom"))
                                                )
                                                .on(
                                                    "click",
                                                    function () {
                                                        gDesigner.stats("dimension_set_anchors-verticalend");
                                                        var currentValue = this._getVerticalAnchorValue(),
                                                            newValue = this._defineAnchorProperty("vacr", GObject.GElement.Anchor.AnchorType.End, currentValue);
                                                        this._defineAnchorButtonState(newValue, null);
                                                    }.bind(this)
                                                )
                                                .gRichTooltip(
                                                    richTooltipModule.GRichTooltipConfig.from({
                                                        title: GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GDimensionProperties", "text.anchor-bottom-tooltip-title")
                                                        ),
                                                        description: GObject.GLocale.get(
                                                            new GObject.GLocaleKey(
                                                                "GDimensionProperties",
                                                                "text.anchor-bottom-tooltip-description"
                                                            )
                                                        ),
                                                        learnMore: "/docs/design-aids/anchoring/",
                                                    })
                                                )
                                        ),
                                },
                            ],
                        })
                        .addClass("anchor-panel")
                        .appendTo(panel)));
            }),
            (GDimensionProperties.prototype._setAspectRatioBehavior = function (preserveRatio) {
                ((editorModule.GEditorOptions.preserveAspectRatio = preserveRatio),
                    (editorModule.GEditorOptions.allowTextRatioPreservation = preserveRatio),
                    gContainer.setProperty(GDimensionProperties._keepRatioName, preserveRatio));
            }),
            (GDimensionProperties.prototype.isAvailable = function (transformActive) {
                return (
                    this._transformButton.toggleClass("g-active", transformActive),
                    gDesigner.isTouchEnabled() &&
                        (transformActive
                            ? (this._transformButton.text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "close"))),
                              $(".advanced-transform-toolbar > label").text(
                                  GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.transform-advanced"))
                              ),
                              this._anchorsPanel.toggleClass("down", true),
                              this._panel.toggleClass("have-anchor", false),
                              $(".advanced-transform-properties").toggleClass("have-anchor", true))
                            : (this._transformButton.text(GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.transform"))),
                              this._anchorsPanel.toggleClass("down", false),
                              this._panel.toggleClass("have-anchor", true),
                              $(".advanced-transform-properties").toggleClass("have-anchor", false),
                              this._panel.addClass("have-anchor")),
                        this._changeSideBarContinerZIndex(transformActive)),
                    true
                );
            }),
            (GDimensionProperties.prototype._changeSideBarContinerZIndex = function (active) {
                gDesigner.isTouchEnabled() &&
                    (active
                        ? gDesigner.getRightSidebars().addClassName("more-z-index")
                        : gDesigner.getRightSidebars().removeClassName("more-z-index"));
            }),
            (GDimensionProperties.prototype.update = function (document, elements) {
                if (
                    (this._document &&
                        (this._document.getScene().removeEventListener(GObject.GElement.GeometryChangeEvent, this._geometryChange, this),
                        this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        this._document.getEditor().removeEventListener(editorModule.GEditor.EdGeometryChangeEvent, this._edGeometryChange, this),
                        gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged),
                        (this._document = null)),
                    (this._elements = []),
                    $(this._panel).find(".anchor-panel").css("display", "none"),
                    document)
                ) {
                    for (var n = 0; n < elements.length; ++n)
                        !elements[n].hasMixin(GObject.GElement.Transform) || elements[n] instanceof GObject.GPage || this._elements.push(elements[n]);
                    if (this._elements.length && this._elements.length === elements.length)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._document.getScene().addEventListener(GObject.GElement.GeometryChangeEvent, this._geometryChange, this),
                            this._document.getEditor().addEventListener(editorModule.GEditor.EdGeometryChangeEvent, this._edGeometryChange, this),
                            gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                            this._updateDimensions(),
                            this._updateToolbar(),
                            this._showAnchor() &&
                                ($(this._panel).find(".anchor-panel").css("display", ""),
                                this._defineAnchorButtonState(this._getVerticalAnchorValue(), this._getHorizontalAnchorValue())),
                            true
                        );
                }
                return false;
            }),
            (GDimensionProperties.prototype._toggleTransformMode = function () {
                gDesigner.stats("dimension_change_transform-mode");
                var toolManager = gDesigner.getToolManager();
                ((toolManager.getActiveTool() && toolManager.getActiveTool() instanceof editorModule.GSelectTool) || toolManager.activateTool(editorModule.GPointerTool),
                    toolManager.getActiveTool() instanceof editorModule.GSelectTool &&
                        toolManager
                            .getActiveTool()
                            .setEditMode(
                                toolManager.getActiveTool().getEditMode() === editorModule.GSelectTool.EditMode.Transform
                                    ? editorModule.GSelectTool.EditMode.Select
                                    : editorModule.GSelectTool.EditMode.Transform
                            ));
            }),
            (GDimensionProperties.prototype._geometryChange = function (event) {
                (event.type !== GObject.GElement.GeometryChangeEvent.Type.After && event.type !== GObject.GElement.GeometryChangeEvent.Type.Child) ||
                    (this._elements.indexOf(event.element) >= 0 && this._updateDimensions());
            }),
            (GDimensionProperties.prototype._edGeometryChange = function (event) {
                this._updateDimensions(false, true);
            }),
            (GDimensionProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary &&
                    this._elements &&
                    this._elements.indexOf(event.node) >= 0 &&
                    this._showAnchor() &&
                    this._defineAnchorButtonState(this._getVerticalAnchorValue(), this._getHorizontalAnchorValue());
            }),
            (GDimensionProperties.prototype._settingChanged = function (event) {
                "decimals_num" === event.key && this._updateDimensions();
            }),
            (GDimensionProperties.prototype._getCurrentDimensions = function (skipRecalculate, duringTransform) {
                var result = null,
                    angle = 0;
                if (!skipRecalculate) {
                    ((this._elementsBBox = null), (this._firstElementsBBox = null));
                    for (var r = 0; r < this._elements.length; ++r) {
                        var s = this._elements[r];
                        if (s.hasMixin(GObject.GElement.Transform)) {
                            var l = null;
                            if (duringTransform) {
                                var c = editorModule.GElementEditor.getEditor(s);
                                c && c.getElement() && (l = c.getPEGeometryBBox());
                            } else l = s.getGeometryBBox();
                            l &&
                                ((this._elementsBBox = this._elementsBBox ? this._elementsBBox.united(l) : l),
                                this._firstElementsBBox ||
                                    ((this._firstElementsBBox = l), (angle = duringTransform && c ? c.getRotationAngle() : s.getAngle())));
                        }
                    }
                    this._elementsBBox || ((this._elementsBBox = null), (this._firstElementsBBox = this._elementsBBox));
                }
                if (this._firstElementsBBox) {
                    var multiple = this._elements.length > 1,
                        delta = this._getDelta();
                    if (multiple) {
                        var groupAngle = 0;
                        if (duringTransform) {
                            var selectionEditor = this._document.getEditor().getSelectionEditor();
                            selectionEditor && (groupAngle = selectionEditor.getRotationAngle());
                        }
                        result = {
                            x: this._elementsBBox.getX() - delta.getX(),
                            y: this._elementsBBox.getY() - delta.getY(),
                            w: this._elementsBBox.getWidth(),
                            h: this._elementsBBox.getHeight(),
                            angle: groupAngle,
                        };
                    } else
                        result = {
                            x: this._firstElementsBBox.getX() - delta.getX(),
                            y: this._firstElementsBBox.getY() - delta.getY(),
                            w: this._firstElementsBBox.getWidth(),
                            h: this._firstElementsBBox.getHeight(),
                            angle: angle,
                        };
                }
                return result;
            }),
            (GDimensionProperties.prototype._updateDimensions = function (skipRecalculate, duringTransform) {
                var updateField = (key, value) => {
                        var text = "";
                        if (null !== value)
                            switch (key) {
                                case "x":
                                case "y":
                                case "w":
                                case "h":
                                    text = this._document.getScene().pointToString(value, this._document.getScene().getOptimalDecimalsCount());
                                    break;
                                case "rotate":
                                    text = GObject.GUtil.formatNumber(GObject.GMath.toDegrees(value), 1);
                            }
                        this._panel
                            .find('input[data-dimension="' + key + '"]')
                            .gInputBox("value", text)
                            .prop("disabled", null === value);
                    },
                    dimensions = this._getCurrentDimensions(skipRecalculate, duringTransform);
                dimensions
                    ? (this._panel.find("[data-ratio]").css("display", ""),
                      updateField("x", dimensions.x),
                      updateField("y", dimensions.y),
                      updateField("w", dimensions.w),
                      updateField("h", dimensions.h),
                      updateField("rotate", dimensions.angle))
                    : (this._panel.find("[data-ratio]").css("display", "none"),
                      updateField("x", null),
                      updateField("y", null),
                      updateField("w", null),
                      updateField("h", null),
                      updateField("rotate", 0));
            }),
            (GDimensionProperties.prototype._updateToolbar = function () {
                (this._toolbar.find("[data-action]").each(
                    function (index, element) {
                        var button = $(element);
                        button.prop("disabled", !gDesigner.canExecuteAction(button.attr("data-action")));
                    }.bind(this)
                ),
                    this._toolbar.find(".touchDistribute>input").each(
                        function (index, element) {
                            $(element).prop("disabled", !gDesigner.canExecuteAction("arrange.distribute.horizontal"));
                        }.bind(this)
                    ),
                    this._toolbar.find(".touchDistribute>button").each(
                        function (index, element) {
                            $(element).prop("disabled", !gDesigner.canExecuteAction("arrange.distribute.horizontal"));
                        }.bind(this)
                    ));
            }),
            (GDimensionProperties.prototype._assignDimension = function (dimensionKey, value) {
                if (this._document) {
                    var newValue = null,
                        oldValue = null,
                        actionName = "",
                        current = this._getCurrentDimensions(false, false);
                    switch (dimensionKey) {
                        case "x":
                        case "y":
                            ((actionName = "Move"), (newValue = this._document.getScene().stringToPoint(value)), (oldValue = current ? ("x" == dimensionKey ? current.x : current.y) : null));
                            break;
                        case "w":
                        case "h":
                            ((actionName = GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.change-size"))),
                                (newValue = this._document.getScene().stringToPoint(value)),
                                (oldValue = current ? ("w" == dimensionKey ? current.w : current.h) : null));
                            break;
                        case "rotate":
                            ((actionName = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.rotate"))),
                                (newValue = GObject.GLength.parseEquationValue(value)),
                                (oldValue = current ? current.angle : null));
                    }
                    if (null === newValue || "number" != typeof newValue || (("w" == dimensionKey || "h" == dimensionKey) && newValue <= 0) || newValue === oldValue) this._updateDimensions();
                    else {
                        if ("x" === dimensionKey || "y" === dimensionKey) {
                            var delta = this._getDelta();
                            switch (dimensionKey) {
                                case "x":
                                    newValue += delta.getX();
                                    break;
                                case "y":
                                    newValue += delta.getY();
                            }
                        }
                        var buildTransform = function (bbox, keepRatio, angle) {
                                if ("w" === dimensionKey || "h" === dimensionKey) {
                                    if (("w" === dimensionKey && bbox.getWidth() <= 0) || ("h" === dimensionKey && bbox.getHeight() <= 0)) return new GObject.GTransform();
                                    var scaleX = 1,
                                        scaleY = 1;
                                    switch (dimensionKey) {
                                        case "w":
                                            ((scaleX = newValue / bbox.getWidth()), keepRatio && (scaleY = scaleX));
                                            break;
                                        case "h":
                                            ((scaleY = newValue / bbox.getHeight()), keepRatio && (scaleX = scaleY));
                                    }
                                    return new GObject.GTransform().translated(-bbox.getX(), -bbox.getY()).scaled(scaleX, scaleY).translated(bbox.getX(), bbox.getY());
                                }
                                if ("x" === dimensionKey) return new GObject.GTransform().translated(newValue - bbox.getX(), 0);
                                if ("y" === dimensionKey) return new GObject.GTransform().translated(0, newValue - bbox.getY());
                                if ("rotate" === dimensionKey) {
                                    var center = bbox.getSide(GObject.GRect.Side.CENTER);
                                    angle = angle || 0;
                                    return new GObject.GTransform()
                                        .translated(-center.getX(), -center.getY())
                                        .rotated(angle - GObject.GMath.toRadians(newValue))
                                        .translated(center.getX(), center.getY());
                                }
                            },
                            multiple = this._elements.length > 1,
                            preserveRatio = "yes" === this._panel.find("[data-ratio]").attr("data-ratio"),
                            editor = this._document.getEditor();
                        editor.beginTransaction();
                        try {
                            for (
                                var applyElementTransform = function (targetElement, transform, linked, settings) {
                                        if ((targetElement = linked.length && linked.indexOf(targetElement) >= 0 ? null : targetElement)) {
                                            var applyFullContent =
                                                    (targetElement instanceof GObject.GSymbol && ("x" === dimensionKey || "y" === dimensionKey)) ||
                                                    "rotate" === dimensionKey ||
                                                    (settings && settings.fullContentTransform),
                                                elementEditor = editorModule.GElementEditor.openEditor(targetElement);
                                            elementEditor ? (elementEditor._setTransform(transform), elementEditor.applyTransform(targetElement, applyFullContent, linked)) : targetElement.transform(transform, applyFullContent, linked);
                                        }
                                    },
                                    linkedElements = [],
                                    f = 0;
                                f < this._elements.length;
                                ++f
                            ) {
                                var m = this._elements[f];
                                linkedElements = linkedElements.concat(editor.getLinkedElementsInSelection(m, this._elements));
                            }
                            if (multiple) {
                                if (this._elementsBBox) {
                                    var bboxTransform = buildTransform(this._elementsBBox, preserveRatio);
                                    for (f = 0; f < this._elements.length; ++f) applyElementTransform(this._elements[f], bboxTransform, linkedElements, editor.getEdTransformSettings());
                                }
                            } else
                                for (f = 0; f < this._elements.length; ++f) {
                                    var v = this._elements[f].getGeometryBBox();
                                    if (v)
                                        (bboxTransform = buildTransform(v, preserveRatio, "rotate" === dimensionKey ? this._elements[f].getAngle() : null)) &&
                                            !bboxTransform.isIdentity() &&
                                            applyElementTransform(this._elements[f], bboxTransform, linkedElements, editor.getEdTransformSettings());
                                }
                        } finally {
                            editor.commitTransaction(actionName);
                        }
                    }
                }
            }),
            (GDimensionProperties.prototype._showAnchor = function () {
                for (var elements = this._elements, canShow = true, n = 0; n < elements.length; ++n)
                    if (!elements[n].getParent() || !elements[n].getParent().hasMixin(GObject.GElement.Layout)) {
                        canShow = false;
                        break;
                    }
                return canShow;
            }),
            (GDimensionProperties.prototype._getHorizontalAnchorValue = function () {
                for (var elements = this._elements, value = elements[0].getProperty("hacr") ? elements[0].getProperty("hacr") : 0, n = 0; n < elements.length; ++n)
                    if (elements[n].getProperty("hacr") !== value) {
                        value = 0;
                        break;
                    }
                return value;
            }),
            (GDimensionProperties.prototype._getVerticalAnchorValue = function () {
                for (var elements = this._elements, value = elements[0].getProperty("vacr") ? elements[0].getProperty("vacr") : 0, n = 0; n < elements.length; ++n)
                    if (elements[n].getProperty("vacr") !== value) {
                        value = 0;
                        break;
                    }
                return value;
            }),
            (GDimensionProperties.prototype._defineAnchorButtonState = function (verticalValue, horizontalValue) {
                (null !== verticalValue &&
                    ($(this._panel)
                        .find(".vacr-middle")
                        .addClass(verticalValue === GObject.GElement.Anchor.AnchorType.Middle ? "g-active" : ""),
                    $(this._panel)
                        .find(".vacr-start")
                        .addClass(verticalValue === GObject.GElement.Anchor.AnchorType.Stretch || verticalValue === GObject.GElement.Anchor.AnchorType.Start ? "g-active" : ""),
                    $(this._panel)
                        .find(".vacr-end")
                        .addClass(verticalValue === GObject.GElement.Anchor.AnchorType.Stretch || verticalValue === GObject.GElement.Anchor.AnchorType.End ? "g-active" : ""),
                    $(this._panel)
                        .find(".vacr-middle")
                        .removeClass(verticalValue !== GObject.GElement.Anchor.AnchorType.Middle ? "g-active" : ""),
                    $(this._panel)
                        .find(".vacr-start")
                        .removeClass(
                            verticalValue !== GObject.GElement.Anchor.AnchorType.Start && verticalValue !== GObject.GElement.Anchor.AnchorType.Stretch ? "g-active" : ""
                        ),
                    $(this._panel)
                        .find(".vacr-end")
                        .removeClass(
                            verticalValue !== GObject.GElement.Anchor.AnchorType.End && verticalValue !== GObject.GElement.Anchor.AnchorType.Stretch ? "g-active" : ""
                        )),
                    null !== horizontalValue &&
                        ($(this._panel)
                            .find(".hacr-middle")
                            .addClass(horizontalValue === GObject.GElement.Anchor.AnchorType.Middle ? "g-active" : ""),
                        $(this._panel)
                            .find(".hacr-start")
                            .addClass(
                                horizontalValue === GObject.GElement.Anchor.AnchorType.Stretch || horizontalValue === GObject.GElement.Anchor.AnchorType.Start ? "g-active" : ""
                            ),
                        $(this._panel)
                            .find(".hacr-end")
                            .addClass(
                                horizontalValue === GObject.GElement.Anchor.AnchorType.Stretch || horizontalValue === GObject.GElement.Anchor.AnchorType.End ? "g-active" : ""
                            ),
                        $(this._panel)
                            .find(".hacr-middle")
                            .removeClass(horizontalValue !== GObject.GElement.Anchor.AnchorType.Middle ? "g-active" : ""),
                        $(this._panel)
                            .find(".hacr-start")
                            .removeClass(
                                horizontalValue !== GObject.GElement.Anchor.AnchorType.Start && horizontalValue !== GObject.GElement.Anchor.AnchorType.Stretch ? "g-active" : ""
                            ),
                        $(this._panel)
                            .find(".hacr-end")
                            .removeClass(
                                horizontalValue !== GObject.GElement.Anchor.AnchorType.End && horizontalValue !== GObject.GElement.Anchor.AnchorType.Stretch ? "g-active" : ""
                            )));
            }),
            (GDimensionProperties.prototype._defineAnchorProperty = function (propertyKey, targetType, currentValue) {
                var newValue = targetType;
                return (
                    targetType === currentValue
                        ? (newValue = 0)
                        : targetType !== GObject.GElement.Anchor.AnchorType.Middle &&
                          (currentValue === GObject.GElement.Anchor.AnchorType.Stretch
                              ? (newValue =
                                    targetType === GObject.GElement.Anchor.AnchorType.End
                                        ? GObject.GElement.Anchor.AnchorType.Start
                                        : GObject.GElement.Anchor.AnchorType.End)
                              : currentValue === GObject.GElement.Anchor.AnchorType.Start
                                ? (newValue = targetType === GObject.GElement.Anchor.AnchorType.End ? GObject.GElement.Anchor.AnchorType.Stretch : 0)
                                : currentValue === GObject.GElement.Anchor.AnchorType.End &&
                                  (newValue = targetType === GObject.GElement.Anchor.AnchorType.Start ? GObject.GElement.Anchor.AnchorType.Stretch : 0)),
                    this._assignAnchorProperty([propertyKey], [newValue]),
                    newValue
                );
            }),
            (GDimensionProperties.prototype._assignAnchorProperty = function (propertyKeys, values) {
                if (this._document) {
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        for (var o = 0; o < this._elements.length; ++o) {
                            var r = this._elements[o];
                            if (r.getParent().hasMixin(GObject.GElement.Layout)) {
                                var s = editorModule.GElementEditor.getEditor(this._elements[o]);
                                (s && s.applyPropertiesToParts(propertyKeys, values)) || this._elements[o].setProperties(propertyKeys, values);
                            }
                        }
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.change-anchor")));
                    }
                } else console.warn("GDimensionProperties: empty _document property");
            }),
            (GDimensionProperties.prototype._getDelta = function () {
                return new GObject.GPoint(0, 0);
            }),
            (GDimensionProperties.prototype.toString = function () {
                return "[Object GDimensionProperties]";
            }),
            (module.exports = GDimensionProperties));
    };
