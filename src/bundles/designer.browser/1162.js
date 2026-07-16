module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(57), require(4), require(13), require(26));
        var GPlatform = require(15),
            editorModule = require(53),
            GObject = require(1),
            richTooltipModule = require(67),
            touchToolModule = _interopRequireDefault(require(340)),
            sidebarEventModule = _interopRequireDefault(require(807)),
            appConstants = _interopRequireDefault(require(198 /* SidebarsIds */)),
            dragIconHelper = require(1161),
            dragModeModule = _interopRequireDefault(require(565)),
            designerConfig = require(10),
            h = require(123),
            contextMenuContexts = require(450);
        const mouseOverContexts = require(607),
            GSystemDialog = require(44);
        function GBorderPaintLayerProperties() {}
        (GObject.GObject.inherit(GBorderPaintLayerProperties, h),
            (GBorderPaintLayerProperties.prototype._panel = null),
            (GBorderPaintLayerProperties.prototype._toolbar = null),
            (GBorderPaintLayerProperties.prototype._elements = null),
            (GBorderPaintLayerProperties.prototype._document = null),
            (GBorderPaintLayerProperties.prototype._advancedStrokePanel = null),
            (GBorderPaintLayerProperties.prototype._styleEditorChange = false),
            (GBorderPaintLayerProperties.prototype._styleEdOn = false),
            (GBorderPaintLayerProperties.prototype._ownChange = false),
            (GBorderPaintLayerProperties.prototype._chooserElem = null),
            (GBorderPaintLayerProperties.prototype.init = function (panelElement, toolbarElement) {
                ((this._panel = panelElement.addClass("border-properties-panel")),
                    (this._toolbar = toolbarElement),
                    this.setTouchTools([
                        new touchToolModule.default({
                            id: "border",
                            icon: "gravit-icon-touch-border",
                            panel: this._panel,
                            toolbar: this._toolbar,
                            panelWidth: "368px",
                        }),
                    ]),
                    $("<label></label>")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "title")))
                        .appendTo(toolbarElement));
                var self = this;
                ((this._advancedStrokePanel = $("<div></div>").css("width", "280px").gOverlay({ releaseOnClose: false })),
                    this._advancedStrokePanel.parent().addClass("border-settings"));
                var assignSelectedOrLast = function (properties, values, all) {
                        var paintLayer = this._getSelectedPaintLayer();
                        (paintLayer || (paintLayer = $(this._panel).find(".border-block:last").data("paintLayer")), paintLayer && this._assign(paintLayer, properties, values, all));
                    }.bind(this),
                    assignSelectedOrAll = function (properties, values, all) {
                        this._getSelectedPaintLayer()
                            ? this._assign(this._getSelectedPaintLayer(), properties, values, all)
                            : this._panel.find(".border-block").each(
                                  function (index, element) {
                                      var paintLayer = $(element).data("paintLayer");
                                      paintLayer && this._assign(paintLayer, properties, values, all);
                                  }.bind(this)
                              );
                    }.bind(this),
                    createAdvancedInput = function (propertyKey) {
                        var self = this;
                        if ("_bw" === propertyKey || "_bml" === propertyKey)
                            return $("<input>")
                                .attr("type", "text")
                                .attr("data-property", propertyKey)
                                .on("change", function () {
                                    var paintLayer = self._getSelectedPaintLayer();
                                    if (
                                        (paintLayer || (paintLayer = $(self._panel).find(".border-block:last").data("paintLayer")),
                                        self._getProperty(paintLayer, "_blj") === GObject.GPaintCanvas.LineJoin.Miter)
                                    ) {
                                        var value = GObject.GLength.parseEquationValue($(this).val());
                                        (gDesigner.stats("border_change_miterlimit", value),
                                            null !== value && value > 0 ? assignSelectedOrLast(["_vs", propertyKey], [true, value]) : self._updateProperties());
                                    }
                                })
                                .gInputBox();
                        if ("_bds" === propertyKey)
                            return $("<input>")
                                .attr("type", "text")
                                .attr("data-property", propertyKey)
                                .on("change", function () {
                                    var dashValues = [];
                                    (gDesigner.stats("border_change_dash"),
                                        $(this)
                                            .closest(".columns")
                                            .find('[data-property="_bds"]')
                                            .each(function (index, element) {
                                                var value = GObject.GLength.parseEquationValue($(this).val());
                                                null !== value && value >= 0 && dashValues.push(value);
                                            }),
                                        assignSelectedOrAll(["_vs", propertyKey], [true, dashValues]));
                                })
                                .gInputBox();
                        if (0 === propertyKey.indexOf("_ba-")) {
                            var iconClass = "",
                                tooltipText = "",
                                alignmentKey = propertyKey.substr("_ba-".length);
                            switch (alignmentKey) {
                                case GObject.GStylable.BorderAlignment.Inside:
                                    ((iconClass = "gravit-icon-line-stroke-inside"),
                                        (tooltipText = GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-alignment.inside"))));
                                    break;
                                case GObject.GStylable.BorderAlignment.Center:
                                    ((iconClass = "gravit-icon-line-stroke-center"),
                                        (tooltipText = GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-alignment.center"))));
                                    break;
                                case GObject.GStylable.BorderAlignment.Outside:
                                    ((iconClass = "gravit-icon-line-stroke-outside"),
                                        (tooltipText = GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-alignment.outside"))));
                            }
                            return $("<button></button>")
                                .addClass("g-icon g-flat")
                                .css("width", "33.3%")
                                .attr("data-property", propertyKey)
                                .attr("data-title", tooltipText)
                                .on("click", function () {
                                    var alignmentName = alignmentKey,
                                        alignmentKeys = Object.keys(GObject.GStylable.BorderAlignment);
                                    for (var n of alignmentKeys)
                                        if (alignmentKey === GObject.GStylable.BorderAlignment[n]) {
                                            alignmentName = n;
                                            break;
                                        }
                                    (gDesigner.stats("border_change_align", alignmentName), assignSelectedOrAll(["_vs", "_ba"], [true, alignmentKey]));
                                })
                                .append($("<span></span>").addClass(iconClass));
                        }
                        if (0 === propertyKey.indexOf("_blc-")) {
                            ((iconClass = ""), (tooltipText = ""));
                            var lineCapKey = propertyKey.substr("_blc-".length);
                            switch (lineCapKey) {
                                case GObject.GPaintCanvas.LineCap.Butt:
                                    ((iconClass = "gravit-icon-line-cap-butt"),
                                        (tooltipText = GObject.GLocale.get(new GObject.GLocaleKey("GPaintCanvas", "linecap.butt"))));
                                    break;
                                case GObject.GPaintCanvas.LineCap.Round:
                                    ((iconClass = "gravit-icon-line-cap-round"),
                                        (tooltipText = GObject.GLocale.get(new GObject.GLocaleKey("GPaintCanvas", "linecap.round"))));
                                    break;
                                case GObject.GPaintCanvas.LineCap.Square:
                                    ((iconClass = "gravit-icon-line-cap-square"),
                                        (tooltipText = GObject.GLocale.get(new GObject.GLocaleKey("GPaintCanvas", "linecap.square"))));
                            }
                            return $("<button></button>")
                                .addClass("g-icon g-flat")
                                .css("width", "33.3%")
                                .attr("data-title", tooltipText)
                                .attr("data-property", propertyKey)
                                .on("click", function () {
                                    (gDesigner.stats("border_change_cap", lineCapKey), assignSelectedOrAll(["_vs", "_blc"], [true, lineCapKey]));
                                })
                                .append($("<span></span>").addClass(iconClass));
                        }
                        if (0 === propertyKey.indexOf("_blj-")) {
                            ((iconClass = ""), (tooltipText = ""));
                            var lineJoinKey = propertyKey.substr("_blj-".length);
                            switch (lineJoinKey) {
                                case GObject.GPaintCanvas.LineJoin.Bevel:
                                    ((iconClass = "gravit-icon-line-join-bevel"),
                                        (tooltipText = GObject.GLocale.get(new GObject.GLocaleKey("GPaintCanvas", "linejoin.bevel"))));
                                    break;
                                case GObject.GPaintCanvas.LineJoin.Round:
                                    ((iconClass = "gravit-icon-line-join-round"),
                                        (tooltipText = GObject.GLocale.get(new GObject.GLocaleKey("GPaintCanvas", "linejoin.round"))));
                                    break;
                                case GObject.GPaintCanvas.LineJoin.Miter:
                                    ((iconClass = "gravit-icon-line-join-miter"),
                                        (tooltipText = GObject.GLocale.get(new GObject.GLocaleKey("GPaintCanvas", "linejoin.miter"))));
                            }
                            return $("<button></button>")
                                .addClass("g-icon g-flat")
                                .css("width", "33.3%")
                                .attr("data-title", tooltipText)
                                .attr("data-property", propertyKey)
                                .on("click", function () {
                                    (gDesigner.stats("border_change_join", lineJoinKey), assignSelectedOrAll(["_vs", "_blj"], [true, lineJoinKey]));
                                })
                                .append($("<span></span>").addClass(iconClass));
                        }
                        if ("_bhmo" === propertyKey || "_btmo" === propertyKey)
                            return $("<label></label>")
                                .addClass("g-switch")
                                .append(
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .attr("data-property", propertyKey)
                                        .on("change", function (event) {
                                            (gDesigner.stats(
                                                "border_toggle_markersoutline",
                                                $(this).prop("checked") ? "enable" : "disable"
                                            ),
                                                assignSelectedOrAll([propertyKey], [$(this).prop("checked")]));
                                        })
                                )
                                .append($("<div></div>"));
                        if ("_bhmi" === propertyKey || "_btmi" === propertyKey)
                            return $("<div/>")
                                .attr("data-property", propertyKey)
                                .gInputSlider({ type: "range", min: 0, max: 100, step: 1 })
                                .on("mousedown", function () {
                                    var editor = self._document.getEditor();
                                    (editor.hideSelection(),
                                        $(document).one("mouseup", function () {
                                            editor.resetHideSelection();
                                        }));
                                })
                                .on("input", function (event) {
                                    var target = $(event.target),
                                        value = parseInt(target.gInputSlider("value")) / 100;
                                    assignSelectedOrAll([propertyKey], [value]);
                                })
                                .on("change", function (event) {
                                    (gDesigner.stats("border_change_markersposition"),
                                        assignSelectedOrAll([propertyKey], [parseInt($(this).gInputSlider("value")) / 100]));
                                });
                        if ("_bhms" === propertyKey || "_btms" === propertyKey)
                            return $("<input>")
                                .attr("type", "text")
                                .attr("data-property", propertyKey)
                                .on("change", function () {
                                    (gDesigner.stats("border_change_tailmarkerscalation"),
                                        assignSelectedOrAll([propertyKey], [GObject.GLength.parseEquationValue($(this).gInputBox("value")) / 100]));
                                })
                                .gInputBox({ minValue: 1, incrementValue: 1, postfix: "%" });
                        if ("_bhm" === propertyKey || "_btm" === propertyKey)
                            return $("<select></select>")
                                .attr("data-property", propertyKey)
                                .append(
                                    $("<option></option>")
                                        .attr("value", "")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.none")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.Circle)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.circle")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.Bullet)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.bullet")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.Diamond)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.diamond")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.Line)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.line")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.LineDouble)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.linedouble")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.Arrow)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.arrow")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.ArrowFat)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.arrowfat")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.ArrowLine)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.arrowline")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.ArrowDoubleLine)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.arrowdoubleline")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.ArrowLineBar)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.arrowlinebar")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GStylable.BorderMarker.ArrowPointer)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-marker.arrowpointer")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", "#")
                                        .prop("disabled", true)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "option.custom")))
                                )
                                .on("change", function (event) {
                                    var markerValue = $(this).val(),
                                        markerKeys = Object.keys(GObject.GStylable.BorderMarker);
                                    for (var a of markerKeys)
                                        if (markerValue === GObject.GStylable.BorderMarker[a]) {
                                            markerValue = a;
                                            break;
                                        }
                                    (gDesigner.stats("border_change_headmarker", markerValue), assignSelectedOrAll([propertyKey], [$(this).val() || null]));
                                });
                        if (0 === propertyKey.indexOf("arrow-paste-")) {
                            var pastePropertyKey = propertyKey.substr("arrow-paste-".length);
                            return $("<button></button>")
                                .addClass("g-flat g-icon")
                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPasteAction", "title")))
                                .append($("<span></span>").addClass("gravit-icon-paste"))
                                .on(
                                    "click",
                                    function () {
                                        gDesigner.stats("border_click_paste");
                                        var pasted = false,
                                            nodes = GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE));
                                        if (nodes && nodes.length)
                                            for (var n = 0; n < nodes.length; ++n)
                                                if (nodes[n].hasMixin(GObject.GVertexSource)) {
                                                    var o = nodes[n],
                                                        a = GObject.GVertexInfo.calculateBounds(o, true);
                                                    if (a) {
                                                        var s = a.getSide(GObject.GRect.Side.BOTTOM_CENTER);
                                                        (assignSelectedOrAll(
                                                            [pastePropertyKey],
                                                            [
                                                                new GObject.GVertexContainer(
                                                                    new GObject.GVertexTransformer(
                                                                        o,
                                                                        new GObject.GTransform(1, 0, 0, -1, -s.getX(), -s.getY())
                                                                    )
                                                                ),
                                                            ]
                                                        ),
                                                            (pasted = true));
                                                        break;
                                                    }
                                                }
                                        pasted || alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "arrow-paste.alert")));
                                    }.bind(this)
                                );
                        }
                        throw new Error("Unknown input property: " + propertyKey);
                    }.bind(this);
                ($("<div></div>")
                    .gPropertyRow({
                        justified: true,
                        columns: [
                            {
                                width: "50%",
                                content: $("<div></div>")
                                    .addClass("border-property-wrapper")
                                    .append(
                                        $("<div />")
                                            .addClass("border-property-label")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.ends")))
                                    )
                                    .append(
                                        $("<div />")
                                            .addClass("border-property-content")
                                            .append(createAdvancedInput("_blc-" + GObject.GPaintCanvas.LineCap.Butt).addClass("g-group-start"))
                                            .append(createAdvancedInput("_blc-" + GObject.GPaintCanvas.LineCap.Round).addClass("g-group-element"))
                                            .append(createAdvancedInput("_blc-" + GObject.GPaintCanvas.LineCap.Square).addClass("g-group-end"))
                                    ),
                            },
                            {
                                width: "50%",
                                content: $("<div></div>")
                                    .addClass("border-property-wrapper")
                                    .append(
                                        $("<div />")
                                            .addClass("border-property-label")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.position")))
                                    )
                                    .append(
                                        $("<div />")
                                            .addClass("border-property-content")
                                            .append(createAdvancedInput("_ba-" + GObject.GStylable.BorderAlignment.Inside).addClass("g-group-start"))
                                            .append(createAdvancedInput("_ba-" + GObject.GStylable.BorderAlignment.Center).addClass("g-group-element"))
                                            .append(createAdvancedInput("_ba-" + GObject.GStylable.BorderAlignment.Outside).addClass("g-group-end"))
                                    ),
                            },
                        ],
                    })
                    .appendTo(this._advancedStrokePanel),
                    $("<div></div>")
                        .gPropertyRow({
                            justified: true,
                            columns: [
                                {
                                    width: "50%",
                                    content: $("<div></div>")
                                        .addClass("border-property-wrapper")
                                        .append(
                                            $("<div />")
                                                .addClass("border-property-label")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.joins")))
                                        )
                                        .append(
                                            $("<div />")
                                                .addClass("border-property-content")
                                                .append(createAdvancedInput("_blj-" + GObject.GPaintCanvas.LineJoin.Bevel).addClass("g-group-start"))
                                                .append(createAdvancedInput("_blj-" + GObject.GPaintCanvas.LineJoin.Miter).addClass("g-group-element "))
                                                .append(createAdvancedInput("_blj-" + GObject.GPaintCanvas.LineJoin.Round).addClass("g-group-end"))
                                        ),
                                },
                                {
                                    width: "50%",
                                    content: $("<div />")
                                        .addClass("border-property-wrapper")
                                        .append(
                                            $("<div />")
                                                .addClass("border-property-label")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.miter-limit")))
                                        )
                                        .append($("<div />").addClass("border-property-content top-2px").append(createAdvancedInput("_bml")))
                                        .gRichTooltip(
                                            richTooltipModule.GRichTooltipConfig.from({
                                                title: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.miter-limit")),
                                                video: designerConfig.gApi.getRichTooltipVideoURL("Miter_Limit.mp4"),
                                                description: GObject.GLocale.get(
                                                    new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.miter-limit-tooltip-description")
                                                ),
                                                learnMore:
                                                    "/docs/colors-gradients-textures/borders/#miter-limit",
                                            })
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._advancedStrokePanel),
                    $("<hr />").css("margin-bottom", "10px").appendTo(this._advancedStrokePanel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "25%",
                                    content: createAdvancedInput("_bds"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.dash")),
                                },
                                {
                                    width: "25%",
                                    content: createAdvancedInput("_bds"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.gap")),
                                },
                                {
                                    width: "25%",
                                    content: createAdvancedInput("_bds"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.dash")),
                                },
                                {
                                    width: "25%",
                                    content: createAdvancedInput("_bds"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.gap")),
                                },
                            ],
                        })
                        .appendTo(this._advancedStrokePanel),
                    $("<hr/>").appendTo(this._advancedStrokePanel),
                    $("<p/>").appendTo(this._advancedStrokePanel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "45%",
                                    padding: false,
                                    content: $("<div></div>").html(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.start-arrow"))
                                    ),
                                },
                                { width: "10%" },
                                {
                                    width: "45%",
                                    padding: false,
                                    content: $("<div></div>").html(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.end-arrow"))
                                    ),
                                },
                            ],
                        })
                        .appendTo(this._advancedStrokePanel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                { width: "37%", content: createAdvancedInput("_bhm") },
                                { width: "8%", content: createAdvancedInput("arrow-paste-_bhm") },
                                { width: "10%" },
                                { width: "37%", content: createAdvancedInput("_btm") },
                                { width: "8%", content: createAdvancedInput("arrow-paste-_btm") },
                            ],
                        })
                        .appendTo(this._advancedStrokePanel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                { width: "45%", padding: false, content: createAdvancedInput("_bhms") },
                                { width: "10%" },
                                { width: "45%", padding: false, content: createAdvancedInput("_btms") },
                            ],
                        })
                        .appendTo(this._advancedStrokePanel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "45%",
                                    prefix: {
                                        label: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.outline")),
                                        width: "50px",
                                    },
                                    padding: false,
                                    content: createAdvancedInput("_bhmo"),
                                },
                                { width: "10%" },
                                {
                                    width: "45%",
                                    prefix: {
                                        label: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.outline")),
                                        width: "50px",
                                    },
                                    padding: false,
                                    content: createAdvancedInput("_btmo"),
                                },
                            ],
                        })
                        .appendTo(this._advancedStrokePanel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "45%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.marker-position")),
                                    padding: false,
                                    content: createAdvancedInput("_bhmi"),
                                },
                                { width: "10%" },
                                {
                                    width: "45%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.marker-position")),
                                    padding: false,
                                    content: createAdvancedInput("_btmi"),
                                },
                            ],
                        })
                        .appendTo(this._advancedStrokePanel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "auto",
                                    content: $("<label></label>")
                                        .append(
                                            $("<input />")
                                                .addClass("gravit-icon-touch-check-small")
                                                .attr("type", "checkbox")
                                                .attr("data-property", "_bs")
                                                .on("change", function () {
                                                    (gDesigner.stats(
                                                        "border_change_autoscale",
                                                        $(this).prop("checked") ? "enabled" : "disabled"
                                                    ),
                                                        assignSelectedOrAll(["_bs"], [$(this).prop("checked")]));
                                                })
                                        )
                                        .append(
                                            $("<span></span>").text(
                                                GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.autoscale-borders"))
                                            )
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._advancedStrokePanel),
                    this._toolbar.addClass("list-toolbar border-toolbar"),
                    $("<button></button>")
                        .attr("data-action", "stroke-settings")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.advanced-stroke-settings")))
                        .append($("<span></span>").addClass("gravit-icon-settings"))
                        .append($("<span></span>").addClass("gravit-icon-touch-settings"))
                        .on(
                            "click",
                            function (event) {
                                (gDesigner.stats("border_open_advancedstrokepanel"),
                                    this._updateAdvancedSettings(),
                                    this._advancedStrokePanel.gOverlay("open", $(event.target).closest("button")));
                            }.bind(this)
                        )
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.advanced-stroke-settings-tooltip-title")
                                ),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.advanced-stroke-settings-tooltip-description")
                                ),
                                learnMore:
                                    "/docs/colors-gradients-textures/borders/#advanced-stroke-settings",
                            })
                        )
                        .appendTo(this._toolbar),
                    $("<button></button>")
                        .attr("data-action", "remove")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "action.remove-selected-border")))
                        .append($("<span></span>").addClass("gravit-icon-trash"))
                        .append($("<span></span>").addClass("gravit-icon-touch-trash"))
                        .on("click", function (event) {
                            (gDesigner.stats("border_remove_border"), event.stopPropagation());
                            var selectedLayer = self._getSelectedPaintLayer();
                            selectedLayer &&
                                editorModule.GEditor.tryRunTransaction(
                                    self._elements[0],
                                    function () {
                                        var layers = [];
                                        (self._iterateEqualPaintLayer(selectedLayer, function (layer) {
                                            layers.push(layer);
                                        }),
                                            GObject.GUtil.each(layers, function (index, layer) {
                                                layer.getParent().removeChild(layer);
                                            }));
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "action.remove-border"))
                                );
                            const inspectorSidebar = gDesigner.getRightSidebars().getSidebar(appConstants.default.SidebarsIds.GInspectorSidebar);
                            inspectorSidebar.trigger(new sidebarEventModule.default(sidebarEventModule.default.Type.ChildRemoved, inspectorSidebar));
                        })
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.remove-border-tooltip-title")),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.remove-border-tooltip-description")
                                ),
                                learnMore: "/docs/colors-gradients-textures/borders/",
                            })
                        )
                        .appendTo(this._toolbar),
                    $("<button></button>")
                        .attr("data-action", "add")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "action.add-border")))
                        .append($("<span></span>").addClass("gravit-icon-plus"))
                        .append($("<span></span>").addClass("gravit-icon-touch-plus"))
                        .on(
                            "click",
                            function (event) {
                                (gDesigner.stats("border_add_border"),
                                    editorModule.GEditor.tryRunTransaction(
                                        self._elements[0],
                                        function () {
                                            const scene = self._document && self._document.getScene(),
                                                colorMode = scene && scene.getProperty("cm"),
                                                color = GObject.GColorHelper.convertColor(GObject.GRGBColor.BLACK, colorMode || GObject.GColor.ColorModes.RGB);
                                            for (var i = 0; i < self._elements.length; ++i) {
                                                var a = self._elements[i],
                                                    s = new GObject.GStylable.BorderPaintLayer();
                                                (a instanceof GObject.GText
                                                    ? s.setProperty("_ba", GObject.GStylable.BorderAlignment.Outside)
                                                    : a instanceof GObject.GShape
                                                      ? a instanceof GObject.GEllipse && a.$etp === GObject.GEllipse.Type.Arc
                                                          ? s.setProperty("_ba", GObject.GStylable.BorderAlignment.Center)
                                                          : s.setProperty("_ba", GObject.GStylable.BorderAlignment.Inside)
                                                      : a instanceof GObject.GPath &&
                                                        !a.$closed &&
                                                        s.setProperty("_ba", GObject.GStylable.BorderAlignment.Center),
                                                    s.setProperty("_pt", color),
                                                    a.getPaintLayers().appendChild(s));
                                                const inspectorSidebar = gDesigner.getRightSidebars().getSidebar(appConstants.default.SidebarsIds.GInspectorSidebar);
                                                inspectorSidebar.trigger(new sidebarEventModule.default(sidebarEventModule.default.Type.ChildAdded, inspectorSidebar));
                                            }
                                        },
                                        GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "action.add-border"))
                                    ),
                                    $(this._toolbar).gAccordion("toggleOpen", true),
                                    $(this._toolbar).gAccordion("init", $(this._panel)));
                            }.bind(this)
                        )
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.add-border-tooltip-title")),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.add-border-tooltip-description")
                                ),
                                learnMore: "/docs/colors-gradients-textures/borders/",
                            })
                        )
                        .appendTo(this._toolbar),
                    gDesigner
                        .getWorkspace()
                        .getStyleEdManager()
                        .addEventListener(editorModule.GStyleEdManager.EditorEvent, this._styleEditorEventHandler, this),
                    this._panel.data("contextmenu", true),
                    this._panel.on("mouseenter", (event) => {
                        (gDesigner.setMouseOverContext(
                            mouseOverContexts.BorderPropertiesPanel,
                            event,
                            function (event) {
                                var copyInfoOverlay = this._panel.find(".copy-info-overlay").eq(0),
                                    selectedBlock = this._panel.find(".border-block.g-selected") || null,
                                    top = (selectedBlock && selectedBlock.position().top) || 0,
                                    overlay = $("<span/>")
                                        .addClass("copy-info-overlay")
                                        .css({ top: top })
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.copy-border")));
                                (copyInfoOverlay && copyInfoOverlay.remove(),
                                    this._panel.append(overlay),
                                    setTimeout(() => {
                                        overlay.animate({ opacity: 0, top: "+=20" }, 500, overlay.remove);
                                    }, 1e3));
                            }.bind(this)
                        ),
                            this._panel.on("mousemove.check-context", (event) => {
                                var panelHeight = this._panel.outerHeight(),
                                    panelOffset = this._panel.offset();
                                event.clientY > panelOffset.top + panelHeight - 2 &&
                                    (gDesigner.setMouseOverContext(null, null, null), this._panel.off("mousemove.check-context"));
                            }));
                    }),
                    this._panel.on("mouseleave", () => {
                        (this._panel.off("mousemove.check-context"), gDesigner.setMouseOverContext(null, null, null));
                    }));
            }),
            (GBorderPaintLayerProperties.prototype.update = function (document, elements, options) {
                const hadStyleEditorChange = this._styleEditorChange;
                if ((this._styleEditorChange && (this._styleEditorChange = false), this._ownChange)) return true;
                if (
                    (this._chooserElem && this._chooserElem.gPatternChooser("close"),
                    this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterInsertEvent, this._afterInsert, this),
                        this._document.getScene().removeEventListener(GObject.GNode.BeforeRemoveEvent, this._beforeRemove, this),
                        this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        (this._document = null)),
                    (this._elements = []),
                    document)
                ) {
                    for (var i = 0; i < elements.length; ++i) {
                        var s = elements[i],
                            l = function (e, t) {
                                t.hasMixin(GObject.GStylable) &&
                                    t.getStylePropertySets().indexOf(GObject.GStylable.PropertySet.FillPaintLayers) >= 0 &&
                                    this._elements.push(t);
                            }.bind(this),
                            c = editorModule.GElementEditor.getEditor(s);
                        c && c.getStylableParts() ? GObject.GUtil.each(c.getStylableParts(), l) : l(null, s);
                    }
                    if (this._elements.length)
                        return (
                            (this._document = document),
                            this._document.getScene().addEventListener(GObject.GNode.AfterInsertEvent, this._afterInsert, this),
                            this._document.getScene().addEventListener(GObject.GNode.BeforeRemoveEvent, this._beforeRemove, this),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            hadStyleEditorChange || this._updateProperties(options),
                            true
                        );
                }
                return false;
            }),
            (GBorderPaintLayerProperties.prototype.openPatternChooser = function () {
                this._panel.find(".border-block:first-child").find('[data-property="_pt"]').find(".g-button").click();
            }),
            (GBorderPaintLayerProperties.prototype.openEyeDropper = function (e, t) {
                this._panel.find(".border-block:first-child").find('[data-property="_pt"]').gPatternChooser("openEyeDropper", e, t);
            }),
            (GBorderPaintLayerProperties.prototype._styleEditorEventHandler = function (event) {
                this._styleEdOn && event.type == editorModule.GStyleEdManager.EditorEventType.PrepareModifiedEvent && (this._styleEditorChange = true);
            }),
            (GBorderPaintLayerProperties.prototype._updateProperties = function (extra) {
                if (this._elements && this._elements.length) {
                    this._panel.find(".border-block").remove();
                    var borderLayers = this._elements[0].getPaintLayers().getBorderLayers();
                    (GObject.GUtil.each(
                        borderLayers,
                        function (index, layer) {
                            layer && this._insertPaintLayer(layer, extra);
                        }.bind(this)
                    ),
                        this._updateToolbar());
                } else console.warn("GBorderPaintLayerProperties: empty _elements array");
            }),
            (GBorderPaintLayerProperties.prototype._updateToolbar = function () {
                var hasBlocks = this._panel.find(".border-block").length > 0;
                (this._toolbar.toggleClass("empty-list", !hasBlocks),
                    this._toolbar.find("[data-action=stroke-settings]").css("display", hasBlocks ? "" : "none"),
                    this._toolbar.find("[data-action=arrow-settings]").css("display", hasBlocks ? "" : "none"),
                    this._toolbar.find("[data-action=remove]").css("display", hasBlocks ? "" : "none"));
            }),
            (GBorderPaintLayerProperties.prototype._insertPaintLayer = function (paintLayer, extra) {
                var self = this,
                    canDrag = false,
                    draggedLayer = null,
                    dragImage = null,
                    isOverDeleteIcon = null,
                    panelOffset = null,
                    panelHeight = null,
                    offsetX = 0,
                    offsetY = 0,
                    isValidDropTarget = function (element) {
                        if (draggedLayer) {
                            var targetLayer = $(element).data("paintLayer");
                            if (targetLayer && (targetLayer !== draggedLayer || GPlatform.GPlatform.modifiers.shiftKey)) return draggedLayer.getParent() === targetLayer.getParent();
                        }
                        return false;
                    },
                    assignProperty = function (properties, values, all, extra) {
                        this._assign(paintLayer, properties, values, all, extra);
                    }.bind(this),
                    createLayerControl = function (propertyKey) {
                        if ("_pt" === propertyKey)
                            return $("<div></div>")
                                .attr("data-property", "_pt")
                                .gPatternChooser({
                                    types: [
                                        GObject.GColor,
                                        GObject.GLinearGradient,
                                        GObject.GRadialGradient,
                                        GObject.GAngularGradient,
                                        GObject.GBackground,
                                        GObject.GTexturePattern,
                                    ],
                                })
                                .on("chooseropen", function () {
                                    (self._document.getEditor().hideSelection(),
                                        gDesigner.getWorkspace().getStyleEdManager().updateEditor(paintLayer, "_pt", false),
                                        self._setSelectedPaintLayer(paintLayer),
                                        (self._styleEdOn = true),
                                        (self._chooserElem = $(this)));
                                })
                                .on("chooserclose", function (event, deferClose, overlayId) {
                                    if (gDesigner.getWorkspace().getStyleEdManager().getOverlayLock(overlayId)) deferClose();
                                    else if (
                                        ((self._styleEdOn = false),
                                        gDesigner.getWorkspace().getStyleEdManager().deactivateEditor(),
                                        self._document && (self._document.getEditor().resetHideSelection(), self._document.hasCDR()))
                                    ) {
                                        var pattern = gPatternChooser.getPattern();
                                        !pattern || pattern instanceof GObject.GRGBColor || GSystemDialog.showCDRUnsupportedObjectWarning();
                                    }
                                    self._chooserElem = null;
                                })
                                .on("patternchange", function (event, pattern, opacity, applyToAll, chooserOn, activeStopIdx) {
                                    var properties = ["_vs"],
                                        values = [true];
                                    (void 0 !== pattern && (properties.push("_pt"), values.push(pattern)), "number" == typeof opacity && (properties.push("_op"), values.push(opacity)));
                                    var extra = null;
                                    (chooserOn && ((extra = { chooserOn: true }), null != activeStopIdx && (extra.activeStopIdx = activeStopIdx)), assignProperty(properties, values, applyToAll, extra));
                                });
                        if ("_bl" == propertyKey)
                            return $("<select></select>")
                                .gBlendMode()
                                .gRichTooltip(
                                    richTooltipModule.GRichTooltipConfig.from({
                                        title: GObject.GLocale.getValue("GAppearanceProperties", "text.blend-tooltip-title"),
                                        description: GObject.GLocale.getValue("GAppearanceProperties", "text.blend-tooltip-description"),
                                        middle: false,
                                        forceShow: true,
                                        learnMore: designerConfig.LINKS.BLENDING_MODES_DOCUMENTATION_URL,
                                    })
                                )
                                .attr("data-property", "_bl")
                                .on("change", function (event) {
                                    (gDesigner.stats("border_change_blendmode", $(event.target).val()), assignProperty(["_bl"], [$(event.target).val()]));
                                });
                        if ("_op" === propertyKey)
                            return $("<input>")
                                .addClass("border-op")
                                .attr("data-property", "_op")
                                .attr("type", "text")
                                .on("change", function (event, value) {
                                    (gDesigner.stats("border_change_opacity"),
                                        assignProperty(["_vs", "_op"], [true, (value || GObject.GLength.parseEquationValue($(this).gInputBox("value"))) / 100]),
                                        $(event.target)
                                            .parents(".touch")
                                            .find($(".transparency"))
                                            .gInputSlider("value", GObject.GLength.parseEquationValue($(this).gInputBox("value"))));
                                })
                                .gInputBox({
                                    minValue: 0,
                                    maxValue: 100,
                                    incrementValue: gDesigner.getOpacityIncrement(),
                                    postfix: "%",
                                });
                        if ("_bw" === propertyKey)
                            return $("<input>")
                                .attr("data-property", propertyKey)
                                .on("change", function () {
                                    gDesigner.stats("border_change_width");
                                    var unitValue = $(this).gUnitBox("value"),
                                        pxValue = unitValue ? unitValue.toUnit(GObject.GLength.Unit.PX) : null;
                                    null !== pxValue && pxValue >= 0 ? assignProperty(["_vs", propertyKey], [true, pxValue]) : self._updateProperties();
                                })
                                .gUnitBox({ minValue: 0, source: "border" })
                                .gRichTooltip(
                                    richTooltipModule.GRichTooltipConfig.from({
                                        title: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.border-width-tooltip-title")
                                        ),
                                        description: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.border-width-tooltip-description")
                                        ),
                                        learnMore: "/docs/colors-gradients-textures/borders/",
                                    })
                                );
                        if ("_vs" === propertyKey)
                            return $("<span></span>")
                                .attr("data-property", "_vs")
                                .addClass("border-action border-visibility gravit-icon-touch-show")
                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility")))
                                .on("click", function (event) {
                                    (gDesigner.stats("border_hide_border"), event.stopPropagation());
                                    var isHidden = $(this).hasClass("gravit-icon-touch-hide");
                                    ($(this).removeClass("gravit-icon-touch-" + (isHidden ? "hide" : "show")),
                                        $(this).addClass("gravit-icon-touch-" + (isHidden ? "show" : "hide")),
                                        assignProperty(["_vs"], [isHidden]));
                                });
                        if ("_ra" === propertyKey)
                            return $("<div/>")
                                .addClass("transparency gravit-icon-touch-rectangle")
                                .gInputSlider({ type: "range", min: 0, max: 100, step: 1 })
                                .on("input", function (event) {
                                    var target = $(event.target),
                                        value = parseInt(target.gInputSlider("value"));
                                    target.parents(".touch").find($(".border-op")).trigger("change", [value]);
                                });
                        throw new Error("Unknown input property: " + propertyKey);
                    },
                    dropIndicator = $("<div/>").addClass("g-drop-indicator"),
                    blockElement = $("<div></div>")
                        .addClass("border-block")
                        .addClass("g-cursor-hand-open")
                        .attr("data-drag-mode", dragModeModule.default.PRESS_AND_HOLD)
                        .data("paintLayer", paintLayer)
                        .attr("draggable", "true")
                        .on("mousedown", function (event) {
                            ((canDrag =
                                gDesigner.isTouchEnabled() && event.originalEvent && event.originalEvent.target
                                    ? !!$(event.originalEvent.target).closest(".drag-indicator").length
                                    : $(event.target).hasClass("border-block") ||
                                      $(event.target).hasClass("gravit-icon-drag-indicator") ||
                                      $(event.target).hasClass("columns") ||
                                      $(event.target).hasClass("column")),
                                $(event.target).closest(".border-block").toggleClass("g-draggable-disabled", !canDrag));
                        })
                        .on("dragstart", function (event) {
                            if (!canDrag) return (event.preventDefault(), void event.stopPropagation());
                            var draggedBlock = $(event.target).closest(".border-block"),
                                blockOffset = draggedBlock.offset(),
                                originalEvent = event.originalEvent;
                            ((dragImage = window.gDragImage()).addClass("drag-delete gravit-icon-trash"),
                                (panelOffset = self._panel.offset()),
                                (panelHeight = self._panel.outerHeight()),
                                (offsetX = event.clientX - blockOffset.left),
                                (offsetY = event.clientY - blockOffset.top),
                                originalEvent.stopPropagation(),
                                (draggedLayer = draggedBlock.data("paintLayer")),
                                (originalEvent.dataTransfer.effectAllowed = "move"),
                                originalEvent.dataTransfer.setData("text/plain", "dummy_data"),
                                self._panel.find(".border-block").each(function (index, block) {
                                    $(block).append(
                                        $("<div></div>")
                                            .addClass("grid-drag-overlay")
                                            .on("dragenter", function () {
                                                var layer = $(this.parentNode).data("paintLayer");
                                                if (isValidDropTarget(this.parentNode)) {
                                                    if (draggedLayer && layer && draggedLayer.getParent() === layer.getParent()) {
                                                        var parent = draggedLayer.getParent(),
                                                            draggedIndex = parent.getIndexOfChild(draggedLayer),
                                                            targetIndex = parent.getIndexOfChild(layer);
                                                        draggedIndex !== targetIndex &&
                                                            (draggedIndex < targetIndex ? dropIndicator.insertBefore(this.parentNode) : dropIndicator.insertAfter(this.parentNode));
                                                    }
                                                } else dropIndicator.remove();
                                            })
                                            .on("dragleave", function () {
                                                isValidDropTarget(this.parentNode) && $(this).parent().find(".g-drop-indicator").remove();
                                            })
                                            .on("dragover", function (event) {
                                                var originalEvent = event.originalEvent;
                                                isValidDropTarget(this.parentNode) &&
                                                    (originalEvent.preventDefault(), originalEvent.stopPropagation(), (originalEvent.dataTransfer.dropEffect = "move"));
                                            })
                                            .on("drop", function (event) {
                                                var targetLayer = $(this.parentNode).data("paintLayer");
                                                if (
                                                    (self._panel.find(".g-drop-indicator").remove(),
                                                    self._panel.find(".grid-drag-overlay").remove(),
                                                    draggedLayer && targetLayer && draggedLayer.getParent() === targetLayer.getParent())
                                                ) {
                                                    var parent = draggedLayer.getParent(),
                                                        draggedIndex = parent.getIndexOfChild(draggedLayer),
                                                        targetIndex = parent.getIndexOfChild(targetLayer);
                                                    (editorModule.GEditor.tryRunTransaction(
                                                        parent,
                                                        function () {
                                                            if (GPlatform.GPlatform.modifiers.shiftKey) {
                                                                var clonedLayer = draggedLayer.clone();
                                                                parent.insertChild(clonedLayer, draggedIndex < targetIndex ? targetLayer.getNext() : targetLayer);
                                                            } else draggedIndex !== targetIndex && (parent.removeChild(draggedLayer), parent.insertChild(draggedLayer, draggedIndex < targetIndex ? targetLayer.getNext() : targetLayer));
                                                        },
                                                        GPlatform.GPlatform.modifiers.shiftKey
                                                            ? GObject.GLocale.get(
                                                                  new GObject.GLocaleKey("GBorderPaintLayerProperties", "action.duplicate-border")
                                                              )
                                                            : GObject.GLocale.get(
                                                                  new GObject.GLocaleKey("GBorderPaintLayerProperties", "action.move-border")
                                                              )
                                                    ),
                                                        self._updateProperties(),
                                                        self._setSelectedPaintLayer(draggedLayer));
                                                }
                                                draggedLayer = null;
                                            })
                                    );
                                }));
                        })
                        .on("drag", function (event) {
                            isOverDeleteIcon = (0, dragIconHelper.handleDragForDeleteIcon)(event, dragImage, panelOffset, panelHeight, offsetX, offsetY);
                        })
                        .on("dragend", function (event) {
                            var originalEvent = event.originalEvent,
                                targetLayer = $(event.target).closest(".border-block").closest(".border-block").data("paintLayer");
                            if (
                                (self._panel.find(".g-drop-indicator").remove(),
                                self._panel.find(".grid-drag-overlay").remove(),
                                draggedLayer && targetLayer && draggedLayer.getParent() === targetLayer.getParent())
                            ) {
                                var parent = draggedLayer.getParent(),
                                    draggedIndex = parent.getIndexOfChild(draggedLayer),
                                    targetIndex = parent.getIndexOfChild(targetLayer);
                                (editorModule.GEditor.tryRunTransaction(
                                    parent,
                                    function () {
                                        if (GPlatform.GPlatform.modifiers.shiftKey) {
                                            var clonedLayer = draggedLayer.clone();
                                            parent.insertChild(clonedLayer, draggedIndex < targetIndex ? targetLayer.getNext() : targetLayer);
                                        } else draggedIndex !== targetIndex && (parent.removeChild(draggedLayer), parent.insertChild(draggedLayer, draggedIndex < targetIndex ? targetLayer.getNext() : targetLayer.getPrevious()));
                                    },
                                    GPlatform.GPlatform.modifiers.shiftKey
                                        ? GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.duplicate"))
                                        : GObject.GLocale.get(new GObject.GLocaleKey("GFillPaintLayerProperties", "action.move"))
                                ),
                                    self._updateProperties(),
                                    self._setSelectedPaintLayer(draggedLayer));
                            }
                            (draggedLayer &&
                                isOverDeleteIcon &&
                                editorModule.GEditor.tryRunTransaction(
                                    self._elements[0],
                                    function () {
                                        var layers = [];
                                        (self._iterateEqualPaintLayer(draggedLayer, function (layer) {
                                            layers.push(layer);
                                        }),
                                            GObject.GUtil.each(layers, function (index, layer) {
                                                layer.getParent().removeChild(layer);
                                            }));
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "action.remove-border"))
                                ),
                                dragImage && dragImage.css("display", "none"),
                                (dragImage = null),
                                originalEvent.stopPropagation(),
                                (draggedLayer = null));
                        })
                        .on("click", function () {
                            (gDesigner.stats("border_set_border"), self._setSelectedPaintLayer(paintLayer));
                        })
                        .gPropertyRow({
                            columns: [
                                {
                                    clazz: "drag-indicator",
                                    content: $("<div></div>").addClass(
                                        "gravit-icon-drag-indicator g-cursor-hand-open gravit-icon-touch-drag-indicator"
                                    ),
                                },
                                { width: "40px", clazz: "color-preview", content: createLayerControl("_pt") },
                                { width: "40px", content: createLayerControl("_bw").addClass("normal") },
                                { width: "auto", content: createLayerControl("_bl").addClass("normal") },
                                { width: "45px", content: createLayerControl("_op").addClass("normal") },
                                {
                                    width: "20px",
                                    content: $("<span></span>")
                                        .attr("data-property", "_vs")
                                        .addClass("border-action border-visibility gravit-icon-display normal")
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility")))
                                        .on("click", function (event) {
                                            (gDesigner.stats("border_hide_border"), event.stopPropagation());
                                            var isHidden = $(this).hasClass("gravit-icon-hide");
                                            ($(this).removeClass("gravit-icon-" + (isHidden ? "hide" : "display")),
                                                $(this).addClass("gravit-icon-" + (isHidden ? "display" : "hide")),
                                                assignProperty(["_vs"], [isHidden]));
                                        }),
                                },
                                {
                                    width: "auto",
                                    content: $("<div/>")
                                        .addClass("touch")
                                        .gPropertyRow({
                                            columns: [
                                                { width: "40px", content: createLayerControl("_bw") },
                                                { width: "auto", content: createLayerControl("_bl") },
                                                { width: "60px", content: createLayerControl("_vs") },
                                            ],
                                        })
                                        .gPropertyRow({
                                            columns: [
                                                { width: "auto", content: createLayerControl("_ra") },
                                                { width: "60px", content: createLayerControl("_op") },
                                            ],
                                        }),
                                },
                            ],
                        })
                        .prependTo(this._panel);
                (blockElement.find(".columns").addClass("g-cursor-hand-open"),
                    blockElement.find(".column").addClass("g-cursor-hand-open"),
                    blockElement.find(".touch").parents(".column").addClass("g-touch"),
                    blockElement.find(".normal").parents(".column").addClass("g-normal"),
                    blockElement.find('[data-property="_pt"]').parents(".column").addClass("g-color"),
                    blockElement.find(".transparency").parents(".touch div:last-child>div").addClass("g-transparency"),
                    blockElement.find(".touch")
                        .find("select")
                        .addClass("g-select")
                        .parent()
                        .append($("<span/>").addClass("gravit-icon-touch-arrowDown")),
                    blockElement.contextmenu({ context: contextMenuContexts.BorderPropertyPanel }, function (event) {
                        event.preventDefault();
                        var layer = $(this).data("paintLayer");
                        (self._setSelectedPaintLayer(layer),
                            $(gDesigner.getWindows().getHtmlElement()).trigger("contextmenu", {
                                previousEvent: event,
                                data: {
                                    openAdvancedSettings: function () {
                                        (self._updateAdvancedSettings(),
                                            self._advancedStrokePanel.gOverlay("open", self._toolbar.find("[data-action=stroke-settings]")));
                                    },
                                    paintLayer: layer,
                                },
                            }));
                    }),
                    this._setSelectedPaintLayer(paintLayer),
                    this._updatePaintLayer(paintLayer, extra),
                    blockElement.find(".transparency").each(function (index, element) {
                        $(element).gInputSlider("value", parseInt($(this).parents(".touch").find(".border-op").val()));
                    }));
            }),
            (GBorderPaintLayerProperties.prototype._removePaintLayer = function (paintLayer) {
                this._panel.find(".border-block").each(function (index, element) {
                    var row = $(element);
                    if (row.data("paintLayer") === paintLayer) return (row.remove(), false);
                });
            }),
            (GBorderPaintLayerProperties.prototype._updatePaintLayer = function (paintLayer, options) {
                var self = this;
                paintLayer &&
                    (this._panel.find(".border-block").each(function (blockIndex, row) {
                        var rowElement = $(row);
                        if (rowElement.data("paintLayer") === paintLayer) {
                            rowElement.find('[data-property="_pt"]')
                                .gPatternChooser("setPattern", paintLayer.getProperty("_pt", false, false, true))
                                .gPatternChooser("value", paintLayer.getProperty("_pt", false, false, true))
                                .gPatternChooser("opacity", paintLayer.getProperty("_op", false, false, true));
                            var width = self._getProperty(paintLayer, "_bw", false, null);
                            (rowElement.find('[data-property="_bw"]').each(function (index, element) {
                                $(element)
                                    .gUnitBox({
                                        unit:
                                            self._document.getScene().getProperty("ut") === GObject.GLength.Unit.PX
                                                ? GObject.GLength.Unit.PX
                                                : GObject.GLength.Unit.PT,
                                        minValue: 0,
                                    })
                                    .gUnitBox("value", null !== width ? new GObject.GLength(width, GObject.GLength.Unit.PX) : null);
                            }),
                                rowElement.find('[data-property="_op"]').each(function (index, element) {
                                    $(element).gInputBox("value", GObject.GUtil.formatOpacity(100 * paintLayer.getProperty("_op", false, false, true)));
                                }),
                                rowElement.find('[data-property="_bl"]').val(paintLayer.getProperty("_bl")));
                            var visible = paintLayer.getProperty("_vs");
                            rowElement.find('[data-property="_vs"]')
                                .removeClass("gravit-icon-" + (visible ? "hide" : "display"))
                                .addClass("gravit-icon-" + (visible ? "display" : "hide"));
                        }
                    }),
                    this._updateAdvancedSettings(),
                    options &&
                        (options.evtType == editorModule.GEditor.ModifiedEvent.Type.Undo || options.evtType == editorModule.GEditor.ModifiedEvent.Type.Redo) &&
                        options.chooserOn &&
                        null != options.borderLayerIndex &&
                        paintLayer.getParent().getIndexOfChild(paintLayer) == options.borderLayerIndex &&
                        $element.find(".preview").trigger("click", null != options.activeStopIdx ? options.activeStopIdx : null));
            }),
            (GBorderPaintLayerProperties.prototype._assign = function (paintLayer, properties, values, all, extra) {
                if (all)
                    this._iterateEqualPaintLayer(paintLayer, function (layer) {
                        layer.setProperties(properties, values, false, false, true);
                    });
                else if (this._document) {
                    var extraInfo = null;
                    if (extra) {
                        var borderLayerIndex = paintLayer.getParent().getIndexOfChild(paintLayer);
                        extraInfo = $.extend({ borderLayerIndex: borderLayerIndex }, extra);
                    }
                    this._ownChange = true;
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        this._iterateEqualPaintLayer(paintLayer, function (layer, element) {
                            var elementEditor = editorModule.GElementEditor.getEditor(element);
                            (elementEditor && elementEditor.applyPropertiesToParts(properties, values)) || layer.setProperties(properties, values);
                        });
                    } finally {
                        (editor.commitTransaction(
                            GObject.GLocale.get(new GObject.GLocaleKey("GBorderPaintLayerProperties", "action.change-border-properties")),
                            extraInfo
                        ),
                            (this._ownChange = false));
                    }
                }
            }),
            (GBorderPaintLayerProperties.prototype._getProperty = function (paintLayer, propertyName, useDefault, defaultValue) {
                return paintLayer ? paintLayer.getProperty(propertyName) : null;
            }),
            (GBorderPaintLayerProperties.prototype._afterInsert = function (event) {
                event.node instanceof GObject.GStylable.BorderPaintLayer &&
                    event.node.getOwnerStylable() === this._elements[0] &&
                    (this._insertPaintLayer(event.node), this._updateToolbar());
            }),
            (GBorderPaintLayerProperties.prototype._beforeRemove = function (event) {
                if (event.node instanceof GObject.GStylable.BorderPaintLayer && event.node.getOwnerStylable() === this._elements[0]) {
                    this._removePaintLayer(event.node);
                    for (var sibling = event.node.getPrevious(); sibling && !(sibling instanceof GObject.GStylable.BorderPaintLayer); ) sibling = sibling.getPrevious();
                    if (!(sibling instanceof GObject.GStylable.BorderPaintLayer))
                        for (sibling = event.node.getNext(); sibling && !(sibling instanceof GObject.GStylable.BorderPaintLayer); ) sibling = sibling.getNext();
                    (this._setSelectedPaintLayer(sibling), this._updateToolbar());
                }
            }),
            (GBorderPaintLayerProperties.prototype._afterPropertiesChange = function (event) {
                event.node instanceof GObject.GStylable.BorderPaintLayer &&
                    event.node.getOwnerStylable() === this._elements[0] &&
                    this._updatePaintLayer(event.node);
            }),
            (GBorderPaintLayerProperties.prototype._updateAdvancedSettings = function () {
                var self = this,
                    layer = function (layer) {
                        var dashPattern = this._getProperty(layer, "_bds", false, null),
                            panel = this._advancedStrokePanel;
                        (panel.find('[data-property="_bds"]').each(function (index, element) {
                            $(element).val(dashPattern && dashPattern.length > index ? dashPattern[index] : "");
                        }),
                            panel.find('[data-property^="_ba"]').each(function (index, element) {
                                var jqElement = $(element),
                                    alignmentKey = jqElement.attr("data-property").substr("_ba-".length);
                                if (alignmentKey === GObject.GStylable.BorderAlignment.Inside || alignmentKey === GObject.GStylable.BorderAlignment.Outside) {
                                    for (var s, l, c = false, d = false, u = 0, p = self._elements.length; u < p; u++) {
                                        var g = self._elements[u];
                                        (g instanceof GObject.GPath && !g.$closed) || (g instanceof GObject.GEllipse && g.$etp === GObject.GEllipse.Type.Arc)
                                            ? (c = true)
                                            : (d = true);
                                    }
                                    switch (alignmentKey) {
                                        case GObject.GStylable.BorderAlignment.Inside:
                                            l = GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-alignment.inside"));
                                            break;
                                        case GObject.GStylable.BorderAlignment.Outside:
                                            l = GObject.GLocale.get(new GObject.GLocaleKey("GStylable", "border-alignment.outside"));
                                    }
                                    (c ? jqElement.attr("disabled", true) : jqElement.attr("disabled", false),
                                        (s =
                                            c && d
                                                ? GObject.GLocale.get(
                                                      new GObject.GLocaleKey("GBorderPaintLayerProperties", "text.border-alignment.disabled")
                                                  ) +
                                                  ": " +
                                                  l
                                                : l),
                                        jqElement.attr("data-title", s));
                                }
                                jqElement.toggleClass("g-active", self._getProperty(layer, "_ba", true) === alignmentKey);
                            }),
                            panel.find('[data-property^="_blc"]').each(function (index, element) {
                                var jqElement = $(element),
                                    lineCapKey = jqElement.attr("data-property").substr("_blc-".length);
                                jqElement.toggleClass("g-active", self._getProperty(layer, "_blc", true) === lineCapKey);
                            }),
                            panel.find('[data-property^="_blj"]').each(function (index, element) {
                                var jqElement = $(element),
                                    lineJoinKey = jqElement.attr("data-property").substr("_blj-".length);
                                jqElement.toggleClass("g-active", self._getProperty(layer, "_blj", true) === lineJoinKey);
                            }));
                        var miterLimitInput = panel.find('[data-property="_bml"]');
                        (miterLimitInput.gInputBox("value", GObject.GUtil.formatNumber(this._getProperty(layer, "_bml", true))),
                            this._getProperty(layer, "_blj") !== GObject.GPaintCanvas.LineJoin.Miter
                                ? miterLimitInput.attr("disabled", true)
                                : miterLimitInput.removeAttr("disabled"));
                        var headMarker = this._getProperty(layer, "_bhm", false, null);
                        panel.find('[data-property="_bhm"]').val(headMarker instanceof GObject.GVertexContainer ? "#" : headMarker || "");
                        var tailMarker = this._getProperty(layer, "_btm", false, null);
                        (panel.find('[data-property="_btm"]').val(tailMarker instanceof GObject.GVertexContainer ? "#" : tailMarker || ""),
                            panel
                                .find('[data-property="_bhms"]')
                                .gInputBox("value", GObject.GUtil.formatNumber(100 * this._getProperty(layer, "_bhms", false, 1), 0)),
                            panel
                                .find('[data-property="_btms"]')
                                .gInputBox("value", GObject.GUtil.formatNumber(100 * this._getProperty(layer, "_btms", false, 1), 0)),
                            panel.find('[data-property="_bhmo"]').prop("checked", this._getProperty(layer, "_bhmo", false, false)),
                            panel.find('[data-property="_bhmi"]').gInputSlider("value", 100 * this._getProperty(layer, "_bhmi")),
                            panel.find('[data-property="_btmo"]').prop("checked", this._getProperty(layer, "_btmo", false, false)),
                            panel.find('[data-property="_btmi"]').gInputSlider("value", 100 * this._getProperty(layer, "_btmi")),
                            panel.find('[data-property="_bs"]').prop("checked", this._getProperty(layer, "_bs", false, false)));
                    }.bind(this);
                if (this._getSelectedPaintLayer()) layer(this._getSelectedPaintLayer());
                else {
                    var lastPaintLayer = $(this._panel).find(".border-block:last").data("paintLayer");
                    lastPaintLayer && layer(lastPaintLayer);
                }
            }),
            (GBorderPaintLayerProperties.prototype._setSelectedPaintLayer = function (paintLayer) {
                (this._panel.find(".border-block").each(function (index, element) {
                    var row = $(element);
                    row.toggleClass("g-selected", row.data("paintLayer") === paintLayer);
                }),
                    this._document && this._document.updateActiveStylesList("Border", paintLayer));
            }),
            (GBorderPaintLayerProperties.prototype._getSelectedPaintLayer = function () {
                return this._panel.find(".border-block.g-selected").data("paintLayer");
            }),
            (GBorderPaintLayerProperties.prototype._iterateEqualPaintLayer = function (paintLayer, callback) {
                if (paintLayer)
                    for (var layerIndex = paintLayer.getParent().getBorderLayers().indexOf(paintLayer), o = 0; o < this._elements.length; ++o) {
                        var i = this._elements[o].getPaintLayers().getBorderLayers();
                        GObject.GUtil.each(
                            i,
                            function (index, layer) {
                                ((layer && layer === paintLayer) || (layer.constructor === paintLayer.constructor && index === layerIndex)) && callback(layer, this._elements[o]);
                            }.bind(this)
                        );
                    }
            }),
            (module.exports = GBorderPaintLayerProperties));
    };
