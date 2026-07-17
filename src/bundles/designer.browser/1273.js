module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */),
            require(19),
            require(168 /* PDFFetchStream */),
            require(328 /* polyfill:Array */),
            require(96 /* polyfill:JSON */),
            require(193),
            require(57),
            require(8 /* Symbol */),
            require(20 /* polyfill:RegExp */),
            require(3),
            require(71 /* polyfill:String */),
            require(247),
            require(134 /* polyfill:String */),
            require(4),
            require(322),
            require(41),
            require(13),
            require(32),
            require(38),
            require(169 /* PDFNetworkStream */),
            require(97),
            require(33),
            require(26));
        var editors = require(53),
            GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            richTooltip = require(67 /* GRichTooltipConfig */),
            GProperties = require(123),
            FontsProviderManager = require(255),
            DefaultFontsProvider = require(590),
            GSettingChangedEvent = require(135),
            GSystemDialog = require(44);
        const FormattingUtils = require(148),
            { toCapitalize } = require(40 /* Utils */),
            { LISTS_FEATURE } = require(10 /* designerConfig */);
        var valueSeparator = "#2635#";
        const markerTypeOptions = {
            None: {
                get label() {
                    return GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.marker-none"));
                },
                value: "none",
            },
            Bullet: {
                get label() {
                    return GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.marker-bulleted"));
                },
                value: "bulleted",
                types: [
                    { icon: "gravit-icon-bullets-1", value: GObject.GText.Markers.Bullet },
                    { icon: "gravit-icon-bullets-2", value: GObject.GText.Markers.Check },
                    { icon: "gravit-icon-bullets-3", value: GObject.GText.Markers.Square },
                ],
            },
            Number: {
                get label() {
                    return GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.marker-numbered"));
                },
                value: "numbered",
                types: [
                    { icon: "gravit-icon-numbers-1", value: GObject.GText.Markers.RomanDot },
                    {
                        icon: "gravit-icon-numbers-2",
                        value: GObject.GText.Markers.RomanBracket,
                    },
                    { icon: "gravit-icon-numbers-3", value: GObject.GText.Markers.Number },
                ],
            },
        };
        function GTextProperties() {
            ((this._text = []), (this._weightsAvailable = []));
        }
        (GObject.GObject.inherit(GTextProperties, GProperties),
            (GTextProperties.prototype._panel = null),
            (GTextProperties.prototype._document = null),
            (GTextProperties.prototype._text = null),
            (GTextProperties.prototype._ownChange = false),
            (GTextProperties.prototype._chooserElem = null),
            (GTextProperties.prototype._openingInlineEditor = false),
            (GTextProperties.prototype._weightsAvailable = null),
            (GTextProperties.prototype._advancedSettings = null),
            (GTextProperties.prototype._listTypeSettings = null),
            (GTextProperties.prototype._advancedSettingsButton = null),
            (GTextProperties.prototype._scriptBlock = null),
            (GTextProperties.prototype._sizingBlock = null),
            (GTextProperties.prototype._autoScrollBlock = null),
            (GTextProperties.prototype.init = function (panel, toolbar) {
                ((this._panel = panel.addClass("text-properties-panel")),
                    (this._advancedSettings = this._getAdvancedSettingsOverlayDiv()),
                    (this._listTypeSettings = $("<div></div>")
                        .addClass("list-type-settings")
                        .append(
                            $("<div></div>")
                                .addClass("list-type-options")
                                .append(
                                    Object.values(markerTypeOptions).map((e) => {
                                        let { label, value, types } = e;
                                        return $("<div></div>")
                                            .addClass("list-type-group")
                                            .attr("value", value)
                                            .append(
                                                $("<div/>")
                                                    .addClass("list-type-group-header")
                                                    .append($("<span/>").addClass("gravit-icon-check"))
                                                    .append($("<span/>").text(label))
                                            )
                                            .on("click", types ? null : () => this._assignMarker(null))
                                            .append(
                                                $("<div/>")
                                                    .addClass("list-type-group-container")
                                                    .append(
                                                        types
                                                            ? types.map((e) => {
                                                                  let { value: t, icon } = e;
                                                                  return $("<div></div>")
                                                                      .addClass("list-type-option")
                                                                      .attr("value", t)
                                                                      .append($("<div/>").addClass(icon))
                                                                      .on("click", (e) => {
                                                                          const t = $(e.target).closest(".list-type-option").attr("value");
                                                                          (gDesigner.stats("textproperties_change_list-type", t),
                                                                              this._assignMarker(t));
                                                                      });
                                                              })
                                                            : ""
                                                    )
                                            );
                                    })
                                )
                        )
                        .gOverlay({
                            releaseOnClose: false,
                            clazz: "list-type-settings-overlay",
                        })));
                var createControl = function (property) {
                    var self = this;
                    if ("_pm" === property)
                        return $("<div></div>")
                            .attr("data-property", property)
                            .addClass("g-select")
                            .append($("<span/>"))
                            .on(
                                "click",
                                Utils.watchDog.trap(
                                    (event) => {
                                        this._listTypeSettings.gOverlay("open", $(event.target));
                                    },
                                    null,
                                    (event) => gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property)
                                )
                            );
                    if (0 === property.indexOf("typography")) {
                        const typographyKey = property.substr("typography-".length);
                        return $("<button></button>")
                            .addClass("g-button")
                            .addClass("typography-button")
                            .attr("data-property", property)
                            .on(
                                "click",
                                Utils.watchDog.trap(
                                    (event) => {
                                        (gDesigner.stats("textproperties_change_typography", typographyKey), self._toggleFormatting(typographyKey));
                                    },
                                    null,
                                    (event) => gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property)
                                )
                            )
                            .append($("<span></span>").addClass("gravit-icon-text-typography-".concat(typographyKey)));
                    }
                    if (0 === property.indexOf("_ttsc")) {
                        const scriptType = property.substr("_ttsc-".length);
                        return $("<button></button>")
                            .addClass("g-button")
                            .addClass("script-button")
                            .attr("data-property", property)
                            .on(
                                "click",
                                Utils.watchDog.trap(
                                    (event) => {
                                        (gDesigner.stats("textproperties_change_typography", scriptType),
                                            self._assignProperty("_ttsc", $(event.target).closest("button").hasClass("g-active") ? null : scriptType));
                                    },
                                    null,
                                    (event) => gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property)
                                )
                            )
                            .append($("<span></span>").addClass("gravit-icon-text-typography-".concat(scriptType, "script")));
                    }
                    if ("_tlsc" === property) {
                        var languageScriptSelect = $("<select></select>").attr("data-property", "_tlsc");
                        return (
                            languageScriptSelect.append(
                                $("<option></option>")
                                    .attr("value", "auto")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.auto")))
                            ),
                            languageScriptSelect.on("change", function (event) {
                                (gDesigner.stats("textproperties_change_language-script", $(event.target).val()),
                                    self._assignProperty("_tlsc", $(event.target).val()));
                            }),
                            languageScriptSelect
                        );
                    }
                    if ("_tv" === property)
                        return $("<select />")
                            .attr("data-property", "_tv")
                            .on(
                                "change",
                                Utils.watchDog.trap(
                                    (event) => {
                                        var variationLabel = $(event.target).text();
                                        (gDesigner.stats("textproperties_change_variation", variationLabel),
                                            self._assignProperty("_tv", $(event.target).val()));
                                    },
                                    null,
                                    (event) => gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property)
                                )
                            );
                    if (0 === property.indexOf("_ttrf-")) {
                        var iconClass = "",
                            transformType = property.substr("_ttrf-".length);
                        switch (transformType) {
                            case GObject.GStylable.TextTransformation.Uppercase:
                                iconClass = "gravit-icon-text-transform-uppercase";
                                break;
                            case GObject.GStylable.TextTransformation.Lowercase:
                                iconClass = "gravit-icon-text-transform-lowercase";
                                break;
                            case GObject.GStylable.TextTransformation.Capitalize:
                                iconClass = "gravit-icon-text-transform-capitalize";
                                break;
                            case GObject.GStylable.TextTransformation.SmallCaps:
                                iconClass = "gravit-icon-text-transform-smallcaps";
                        }
                        var transformName = Object.keys(GObject.GStylable.TextTransformation).find((key) => GObject.GStylable.TextTransformation[key] === transformType);
                        return $("<button></button>")
                            .addClass("g-button")
                            .addClass("transformation-button")
                            .attr("data-property", property)
                            .on(
                                "click",
                                Utils.watchDog.trap(
                                    (event) => {
                                        (gDesigner.stats("textproperties_change_transformation", transformName ? transformName.toLowerCase() : ""),
                                            self._assignProperty("_ttrf", $(event.target).closest("button").hasClass("g-active") ? null : transformType));
                                    },
                                    null,
                                    (event) => gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property)
                                )
                            )
                            .append($("<span></span>").addClass(iconClass));
                    }
                    if (0 === property.indexOf("va-")) {
                        iconClass = "";
                        switch ((alignValue = property.substr("va-".length))) {
                            case GObject.GText.VerticalAlign.Top:
                                iconClass = "gravit-icon-text-align-top";
                                break;
                            case GObject.GText.VerticalAlign.Middle:
                                iconClass = "gravit-icon-text-align-middle";
                                break;
                            case GObject.GText.VerticalAlign.Bottom:
                                iconClass = "gravit-icon-text-align-bottom";
                        }
                        return $("<button></button>")
                            .addClass("g-button")
                            .addClass("vertical-align")
                            .attr("data-property", property)
                            .on("click", function () {
                                (gDesigner.stats(
                                    "textproperties_change_vertical-align",
                                    alignValue === GObject.GText.VerticalAlign.Top ? "top" : GObject.GText.VerticalAlign.Middle ? "middle" : "bottom"
                                ),
                                    self._assignProperty("va", $(this).hasClass("g-active") ? null : alignValue));
                            })
                            .append($("<span></span>").addClass(iconClass));
                    }
                    if (0 === property.indexOf("_pal-")) {
                        var alignValue;
                        iconClass = "";
                        switch ((alignValue = property.substr("_pal-".length))) {
                            case GObject.GStylable.ParagraphAlignment.Left:
                                iconClass = "gravit-icon-text-align-left";
                                break;
                            case GObject.GStylable.ParagraphAlignment.Center:
                                iconClass = "gravit-icon-text-align-center";
                                break;
                            case GObject.GStylable.ParagraphAlignment.Right:
                                iconClass = "gravit-icon-text-align-right";
                                break;
                            case GObject.GStylable.ParagraphAlignment.Justify:
                                iconClass = "gravit-icon-text-justify";
                        }
                        return $("<button></button>")
                            .addClass("g-button")
                            .addClass("alignment-button")
                            .attr("data-property", property)
                            .on("click", function () {
                                (gDesigner.stats(
                                    "textproperties_change_paragraph-align",
                                    alignValue === GObject.GStylable.ParagraphAlignment.Left
                                        ? "left"
                                        : alignValue === GObject.GStylable.ParagraphAlignment.Right
                                          ? "right"
                                          : alignValue === GObject.GStylable.ParagraphAlignment.Justify
                                            ? "justify"
                                            : alignValue === GObject.GStylable.ParagraphAlignment.Center
                                              ? "center"
                                              : "unkn"
                                ),
                                    self._assignProperty("_pal", $(this).hasClass("g-active") ? null : alignValue));
                            })
                            .append($("<span></span>").addClass(iconClass));
                    }
                    if ("aw" === property || "ah" === property)
                        return $("<div></div>")
                            .attr("data-property", property)
                            .append(
                                $("<button></button>")
                                    .addClass("sizing-button-auto")
                                    .addClass("g-group-start g-button")
                                    .on("click", () => {
                                        (gDesigner.stats("textproperties_change_auto-widthheight", "auto"), self._assignProperty(property, true));
                                    })
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.auto")))
                            )
                            .append(
                                $("<button></button>")
                                    .addClass("sizing-button-fixed")
                                    .addClass("g-group-end g-button")
                                    .on("click", () => {
                                        (gDesigner.stats("textproperties_change_auto-widthheight", "fixed"), self._assignProperty(property, false));
                                    })
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.fix")))
                            );
                    if ("_fc" === property)
                        return $("<div></div>")
                            .prop("disabled", true)
                            .attr("data-property", "_fc")
                            .attr("id", "text-color")
                            .gPatternChooser({ types: [GObject.GColor], hasOpacity: false })
                            .on("chooseropen", function () {
                                (self._document.getEditor().hideSelection(), (self._chooserElem = $(this)));
                            })
                            .on("chooserclose", function (event, cancelClose, triggerEvent) {
                                (self._document && self._document.getEditor().resetHideSelection(), (self._chooserElem = null));
                            })
                            .on(
                                "patternchange",
                                function (event, colorValue, opacity, temporary, fromChooser) {
                                    for (var targets = [], l = 0; l < this._text.length; l++) {
                                        var c = editors.GElementEditor.getEditor(this._text[l]);
                                        targets.push(c || this._text[l]);
                                    }
                                    var chooserOptions = null;
                                    fromChooser && (chooserOptions = { chooserOn: true, textPattern: true });
                                    var fontColor = this._getProperty("_fc", targets);
                                    (fontColor || (fontColor = this._getFontColor(targets)), self._assignProperty("_fc", colorValue, temporary, chooserOptions));
                                }.bind(this)
                            );
                    if ("_tff" === property)
                        return $("<input/>")
                            .addClass("g-select")
                            .attr("data-property", property)
                            .attr("type", "button")
                            .gFontsButton({
                                closeCallback: function () {
                                    self._document && self._document.getActiveWindow().getView().focus();
                                },
                                assignFontCallback: function (fontFamily) {
                                    self._assignFont(fontFamily);
                                },
                            });
                    if ("_tfi" === property)
                        return $("<div></div>").append(
                            $("<input>")
                                .attr("type", "text")
                                .attr("data-property", property)
                                .addClass("g-select")
                                .addClass("text-size")
                                .on("change", function () {
                                    gDesigner.stats("textproperties_change_size");
                                    var unitValue = $(this).gUnitBox("value"),
                                        pointValue = unitValue ? unitValue.toUnit(GObject.GLength.Unit.PT) : null;
                                    null === pointValue || ("number" == typeof pointValue && pointValue >= 0) ? self._assignProperty(property, pointValue) : self._updateProperties();
                                })
                                .gUnitBox({ source: "text" })
                        );
                    if ("_tws" === property || "_tcs" === property)
                        return $("<input>")
                            .attr("type", "text")
                            .attr("data-property", property)
                            .on("change", function () {
                                "_tws" === property
                                    ? gDesigner.stats("textproperties_change_wordspacing")
                                    : gDesigner.stats("textproperties_change_charspacing");
                                var document = self._document;
                                if (document) {
                                    var pointValue = document.getScene().stringToPoint($(this).val());
                                    null === pointValue || "number" == typeof pointValue ? self._assignProperty(property, pointValue) : self._updateProperties();
                                }
                            })
                            .gInputBox();
                    if ("style" === property)
                        return $("<select></select>")
                            .attr("data-property", property)
                            .on("change", function () {
                                gDesigner.stats("textproperties_choose_fontstyle");
                                var selectedValue = $(this).val() || null;
                                if (selectedValue) {
                                    var defaultFont = gDesigner.getWorkspace().getFontManager().getDefaultFont(),
                                        parts = selectedValue.split(valueSeparator);
                                    parts[0] = parseInt(parts[0]) || 400;
                                    var weightStyle = [parts[0], parts[1]],
                                        propertyKeys = ["_tfw", "_tfs"];
                                    (parts[2] && parts[2].length && parts[2] !== defaultFont.getFamily() && (propertyKeys.push("_tff"), weightStyle.push(parts[2])),
                                        self._assignProperties(propertyKeys, weightStyle));
                                }
                                self._document.getActiveWindow().getView().focus();
                            });
                    if (0 !== property.indexOf("tpth")) {
                        if ("_plh" === property)
                            return $("<div>")
                                .addClass("text-line-height")
                                .append(
                                    $("<input>")
                                        .attr("type", "text")
                                        .attr("data-property", property)
                                        .addClass("value")
                                        .on("change", function () {
                                            gDesigner.stats("textproperties_change_line-height");
                                            var lineHeightInput = $(this).val(),
                                                scene = self._document.getScene(),
                                                unitLabel = self._panel.find('button[data-property="_plh_unit"]').text();
                                            if ("%" !== unitLabel) {
                                                let parsedLength = GObject.GLength.parseEquation(lineHeightInput, scene.getProperty("ut"));
                                                parsedLength && (lineHeightInput = parsedLength.toUnit(GObject.GLength.Unit.PX));
                                            } else lineHeightInput = GObject.GUtil.parseNumber(lineHeightInput);
                                            null === lineHeightInput || lineHeightInput > 0 || ("%" !== unitLabel && 0 === lineHeightInput)
                                                ? ("number" == typeof lineHeightInput && ("%" === unitLabel ? (lineHeightInput /= 100) : (lineHeightInput = String(lineHeightInput))),
                                                  self._assignProperty(property, lineHeightInput))
                                                : self._updateProperties();
                                        })
                                        .gInputBox()
                                )
                                .append(
                                    $("<button>")
                                        .addClass("g-flat")
                                        .attr("data-property", "_plh_unit")
                                        .addClass("text-unit")
                                        .text("%")
                                        .on("click", function () {
                                            gDesigner.stats("textproperties_change_size");
                                            var clickedUnitLabel = $(this).text(),
                                                scene = self._document.getScene(),
                                                lineHeightRaw = self._panel.find('input[data-property="_plh"]').val(),
                                                editor = self._document.getEditor();
                                            if ("%" !== clickedUnitLabel) {
                                                let parsedLength = GObject.GLength.parseEquation(lineHeightRaw, scene.getProperty("ut"));
                                                parsedLength && (lineHeightRaw = parsedLength.toUnit(GObject.GLength.Unit.PX));
                                            } else lineHeightRaw = GObject.GUtil.parseNumber(lineHeightRaw);
                                            if (null !== lineHeightRaw && "%" === clickedUnitLabel) {
                                                var unitType = scene.getProperty("ut") || "px";
                                                if (($(this).text(unitType), "number" == typeof lineHeightRaw))
                                                    try {
                                                        editor.beginTransaction();
                                                        for (var c = 0; c < self._text.length; c++) {
                                                            var d = editors.GElementEditor.getEditor(self._text[c]) || self._text[c],
                                                                u = (
                                                                    ((lineHeightRaw / 100) * (p = self._getProperty("_tfi", [d]) || 20) * 4) /
                                                                    3
                                                                ).toString();
                                                            d.setProperties([property], [u]);
                                                        }
                                                    } finally {
                                                        editor.commitTransaction(
                                                            GObject.GLocale.get(
                                                                new GObject.GLocaleKey("GTextProperties", "action.modify-text-properties")
                                                            )
                                                        );
                                                    }
                                            } else if (null !== lineHeightRaw && ($(this).text("%"), "number" == typeof lineHeightRaw))
                                                try {
                                                    editor.beginTransaction();
                                                    for (c = 0; c < self._text.length; c++) {
                                                        d = editors.GElementEditor.getEditor(self._text[c]) || self._text[c];
                                                        var p = self._getProperty("_tfi", [d]) || 20;
                                                        u = Math.round(100 * Math.max(lineHeightRaw / ((4 * p) / 3), 0.01)) / 100;
                                                        d.setProperties([property], [u]);
                                                    }
                                                } finally {
                                                    editor.commitTransaction(
                                                        GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "action.modify-text-properties"))
                                                    );
                                                }
                                        })
                                );
                        if ("fontSet" === property)
                            return $("<input/>")
                                .attr("type", "checkbox")
                                .attr("data-property", property)
                                .on("change", function (event) {
                                    gDesigner.stats("textproperties_change_set-of-fonts");
                                    var checked = $(this).prop("checked");
                                    gDesigner.setSetting("font-set", checked);
                                    var systemFontsProvider = gContainer.getSystemFontsProvider();
                                    checked ? FontsProviderManager.enableProviders([systemFontsProvider]) : FontsProviderManager.disableProviders([systemFontsProvider]);
                                });
                        if ("sc" === property)
                            return $("<label></label>")
                                .append(
                                    $("<input>")
                                        .addClass("auto-scale-checkbox")
                                        .attr("type", "checkbox")
                                        .attr("data-property", property)
                                        .on(
                                            "change",
                                            function (event) {
                                                (gDesigner.stats("textproperties_scale_content"),
                                                    self._assignProperty("sc", $(event.target).is(":checked")));
                                            }.bind(this)
                                        )
                                )
                                .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.scale-content"))));
                        if (0 === property.indexOf("decoration-")) {
                            var decorationType = property.substr("decoration-".length);
                            return $("<button></button>")
                                .addClass("g-button")
                                .addClass("decoration-buttons")
                                .attr("data-property", property)
                                .attr("data-title", toCapitalize(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.decoration-".concat(decorationType)))))
                                .on("click", function () {
                                    (gDesigner.stats("textproperties_change_decoration", decorationType), self._toggleFormatting(decorationType));
                                })
                                .append($("<span></span>").addClass("gravit-icon-text-decoration-".concat(decorationType)));
                        }
                        if ("_pas" === property)
                            return $("<div></div>")
                                .addClass("text-paragraph-spacing")
                                .append(
                                    $("<input>")
                                        .attr("type", "text")
                                        .addClass("value")
                                        .attr("data-property", property)
                                        .on(
                                            "click",
                                            Utils.watchDog.trap(null, null, (event) => {
                                                (event.stopPropagation(),
                                                    event.preventDefault(),
                                                    gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property));
                                            })
                                        )
                                        .on(
                                            "change",
                                            Utils.watchDog.trap(
                                                (event) => {
                                                    const document = self._document;
                                                    if (!document) return;
                                                    gDesigner.stats("textproperties_change_paragraph-spacing");
                                                    const unitLabel = self._advancedSettings.find('button[data-property="_pas_unit"]').text();
                                                    let parsedValue = null;
                                                    if ("%" !== unitLabel) {
                                                        let parsedLength = GObject.GLength.parseEquation(
                                                            $(event.target).closest("input").val(),
                                                            document.getScene().getProperty("ut")
                                                        );
                                                        parsedLength && (parsedValue = parsedLength.toUnit(GObject.GLength.Unit.PX));
                                                    } else parsedValue = GObject.GUtil.parseNumber($(event.target).closest("input").val());
                                                    null === parsedValue || ("number" == typeof parsedValue && parsedValue >= 0)
                                                        ? ("number" == typeof parsedValue && ("%" === unitLabel ? (parsedValue /= 100) : (parsedValue = String(parsedValue))),
                                                          self._assignProperty(property, parsedValue))
                                                        : self._updateProperties();
                                                },
                                                null,
                                                (event) => gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property)
                                            )
                                        )
                                        .gInputBox({ minValue: 0, allowEmptyValue: false })
                                )
                                .append(
                                    $("<button>")
                                        .addClass("g-flat")
                                        .addClass("unit")
                                        .attr("data-property", "_pas_unit")
                                        .text("px")
                                        .on(
                                            "click",
                                            Utils.watchDog.trap(
                                                (event) => {
                                                    const document = self._document;
                                                    if (!document) return;
                                                    const scene = document.getScene(),
                                                        unitLabel = $(event.target).text(),
                                                        newUnit = "%" === unitLabel ? scene.getProperty("ut") || "px" : "%";
                                                    (gDesigner.stats("textproperties_change_paragraph-spacing-unit", newUnit),
                                                        $(event.target).text(newUnit));
                                                    let parsedValue = null;
                                                    if ("%" !== unitLabel) {
                                                        let parsedLength = GObject.GLength.parseEquation(
                                                            self._advancedSettings.find('input[data-property="_pas"]').val(),
                                                            scene.getProperty("ut")
                                                        );
                                                        parsedLength && (parsedValue = parsedLength.toUnit(GObject.GLength.Unit.PX));
                                                    } else
                                                        parsedValue = GObject.GUtil.parseNumber(
                                                            self._advancedSettings.find('input[data-property="_pas"]').val()
                                                        );
                                                    if (!isNaN(parsedValue)) {
                                                        const targets = self._text.map((targets) => editors.GElementEditor.getEditor(targets) || targets),
                                                            fontSize = self._getProperty("_tfi", targets) || 20;
                                                        let spacingValue;
                                                        ((spacingValue =
                                                            "%" === newUnit
                                                                ? Math.round(100 * parseFloat(parsedValue / ((4 * fontSize) / 3))) / 100
                                                                : String(((parsedValue / 100) * fontSize * 4) / 3)),
                                                            self._assignProperties(["_pas"], [spacingValue]));
                                                    }
                                                },
                                                null,
                                                (event) => gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property)
                                            )
                                        )
                                );
                        if ("_pai" === property)
                            return $("<input>")
                                .attr("type", "text")
                                .attr("data-property", property)
                                .on(
                                    "click",
                                    Utils.watchDog.trap(null, null, (event) => {
                                        (event.stopPropagation(),
                                            event.preventDefault(),
                                            gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property));
                                    })
                                )
                                .on(
                                    "change",
                                    Utils.watchDog.trap(
                                        (event) => {
                                            const document = self._document;
                                            if (!document) return;
                                            gDesigner.stats("textproperties_change_paragraph-indent");
                                            const indentValue = document.getScene().stringToPoint($(event.target).closest("input").val());
                                            null === indentValue || ("number" == typeof indentValue && indentValue >= 0)
                                                ? self._assignProperty(property, indentValue)
                                                : self._updateProperties();
                                        },
                                        null,
                                        (event) => gDesigner.stats("textproperties_nonprotriespro_advanced-settings", property)
                                    )
                                )
                                .gInputBox({ minValue: 0, allowEmptyValue: false });
                        if ("dir" === property)
                            return $("<select></select>")
                                .attr("data-property", "dir")
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GTLDirectionTextTransformer.LTR)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.orientation-ltr")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GTLDirectionTextTransformer.RTL)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.orientation-rtl")))
                                )
                                .append(
                                    $("<option></option>")
                                        .attr("value", GObject.GTLDirectionTextTransformer.TTB)
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.orientation-ttb")))
                                )
                                .on("change", function (event) {
                                    var directionCode = "";
                                    switch (parseInt($(event.target).val())) {
                                        case GObject.GTLDirectionTextTransformer.LTR:
                                            directionCode = "ltr";
                                            break;
                                        case GObject.GTLDirectionTextTransformer.RTL:
                                            directionCode = "rtl";
                                            break;
                                        case GObject.GTLDirectionTextTransformer.TTB:
                                            directionCode = "ttb";
                                            break;
                                        case GObject.GTLDirectionTextTransformer.BTT:
                                            directionCode = "btt";
                                    }
                                    (gDesigner.stats("textproperties_change_orientation", directionCode),
                                        self._assignProperty("dir", parseInt($(event.target).val())));
                                });
                        if ("_tlocl" === property) return this._createLanguageSelector();
                        if ("_tstyls" === property) return this._createStylisticSetSelector();
                        throw new Error("Unknown input property: " + property);
                    }
                    return "tpthd" === property
                        ? $("<label></label>")
                              .addClass("g-switch")
                              .append(
                                  $("<input>")
                                      .attr("type", "checkbox")
                                      .attr("data-property", property)
                                      .on("change", function () {
                                          (gDesigner.stats("textproperties_change_path-attachment", "direction"),
                                              self._assignProperty(
                                                  property,
                                                  $(this).is(":checked")
                                                      ? GObject.GTLPathTextTransformer.DIRECTION_OUTWARDS
                                                      : GObject.GTLPathTextTransformer.DIRECTION_INWARDS
                                              ));
                                      })
                              )
                              .append($("<div></div>"))
                        : "tpths" === property
                          ? $("<label></label>")
                                .addClass("g-switch")
                                .append(
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .attr("data-property", property)
                                        .on("change", function () {
                                            (gDesigner.stats("textproperties_change_path-attachment", "insideoutside"),
                                                self._assignProperty(
                                                    property,
                                                    $(this).is(":checked")
                                                        ? GObject.GTLPathTextTransformer.OUTSIDE
                                                        : GObject.GTLPathTextTransformer.INSIDE
                                                ));
                                        })
                                )
                                .append($("<div></div>"))
                          : "tptho" === property
                            ? $("<input>")
                                  .attr("type", "text")
                                  .attr("data-property", property)
                                  .on("change", function () {
                                      gDesigner.stats("textproperties_change_path-attachment", "offset");
                                      var pointValue = self._document.getScene().stringToPoint($(this).val());
                                      null === pointValue || "number" == typeof pointValue ? self._assignProperty(property, pointValue) : self._updateProperties();
                                  })
                                  .gInputBox()
                            : void 0;
                }.bind(this);
                ($("<div></div>")
                    .addClass("typography-properties")
                    .gPropertyRow({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.typography")),
                        columns: [
                            {
                                width: "100%",
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.typography")),
                                content: $("<div></div>")
                                    .addClass("typography")
                                    .append(
                                        createControl("_ttsc-" + GObject.GStylable.TypographyScript.Subscript)
                                            .addClass("g-group-start")
                                            .attr(
                                                "data-title",
                                                GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.typography-subscript"))
                                            )
                                    )
                                    .append(
                                        createControl("_ttsc-" + GObject.GStylable.TypographyScript.Superscript)
                                            .addClass("g-group-end")
                                            .attr(
                                                "data-title",
                                                GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.typography-superscript"))
                                            )
                                    )
                                    .append(
                                        createControl("typography-ligatures").attr(
                                            "data-title",
                                            GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.typography-ligatures"))
                                        )
                                    )
                                    .append(
                                        createControl("typography-fractions").attr(
                                            "data-title",
                                            GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.typography-fractions"))
                                        )
                                    ),
                            },
                        ],
                    })
                    .appendTo(this._advancedSettings),
                    $("<div></div>")
                        .addClass("transform-properties")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.transform")),
                            columns: [
                                {
                                    width: "100%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.transform")),
                                    content: $("<div></div>")
                                        .append(
                                            createControl("_ttrf-" + GObject.GStylable.TextTransformation.Uppercase)
                                                .addClass("g-group-start")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.transform-uppercase"))
                                                )
                                        )
                                        .append(
                                            createControl("_ttrf-" + GObject.GStylable.TextTransformation.Capitalize)
                                                .addClass("g-group-element")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.transform-capitalize"))
                                                )
                                        )
                                        .append(
                                            createControl("_ttrf-" + GObject.GStylable.TextTransformation.Lowercase)
                                                .addClass("g-group-element")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.transform-lowercase"))
                                                )
                                        )
                                        .append(
                                            createControl("_ttrf-" + GObject.GStylable.TextTransformation.SmallCaps)
                                                .addClass("g-group-end")
                                                .attr(
                                                    "data-title",
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.transform-smallcaps"))
                                                )
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._advancedSettings),
                    LISTS_FEATURE &&
                        ($("<div></div>")
                            .addClass("list-type-properties")
                            .gPropertyRow({
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.list-type")),
                                columns: [
                                    {
                                        width: "100%",
                                        label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.list-type")),
                                        content: createControl("_pm"),
                                    },
                                ],
                            })
                            .appendTo(this._advancedSettings),
                        $("<hr/>").appendTo(this._advancedSettings)),
                    $("<div></div>")
                        .addClass("paragraph-properties")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.paragraph")),
                            columns: [
                                {
                                    width: "50%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.paragraph-indent")),
                                    content: createControl("_pai"),
                                },
                                {
                                    width: "50%",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.paragraph-spacing")),
                                    content: createControl("_pas"),
                                },
                            ],
                        })
                        .appendTo(this._advancedSettings),
                    $("<hr/>").appendTo(this._advancedSettings),
                    $("<div></div>")
                        .addClass("language-properties")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.language")),
                            columns: [{ width: "100%", content: createControl("_tlocl") }],
                        })
                        .appendTo(this._advancedSettings),
                    $("<hr/>").appendTo(this._advancedSettings),
                    $("<div></div>")
                        .addClass("stylistic-set-properties")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.stylisticset")),
                            columns: [{ width: "100%", content: createControl("_tstyls") }],
                        })
                        .appendTo(this._advancedSettings),
                    (this._advancedSettingsButton = this._getAdvancedSettingsButton().appendTo(toolbar)));
                var colorFontContainer = $("<div/>").addClass("color-font").appendTo(panel);
                ($("<div></div>")
                    .addClass("font-color-properties")
                    .gPropertyRow({
                        columns: [
                            { clazz: "color-picker-button", padding: false, content: createControl("_fc") },
                            { width: "auto", content: createControl("_tff") },
                        ],
                    })
                    .appendTo(colorFontContainer),
                    $("<div></div>")
                        .addClass("font-style-properties")
                        .gPropertyRow({
                            columns: [
                                {
                                    clazz: "color-title-label",
                                    content: $(
                                        "<span>".concat(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.color")), "</span>")
                                    ).addClass("color-title"),
                                },
                                {
                                    width: "auto",
                                    content: createControl("style"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.weight")),
                                },
                                {
                                    width: "25%",
                                    content: createControl("_tfi"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.size")),
                                },
                            ],
                        })
                        .appendTo(colorFontContainer),
                    $("<hr/>").appendTo(panel),
                    $("<div></div>")
                        .addClass("decoration-properties")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.decoration")),
                            columns: [
                                { width: "25%", content: createControl("decoration-bold") },
                                { width: "25%", content: createControl("decoration-italic") },
                                { width: "25%", content: createControl("decoration-underline") },
                                { width: "25%", content: createControl("decoration-strikeout") },
                            ],
                        })
                        .appendTo(panel),
                    $("<hr/>").appendTo(panel),
                    $("<div></div>")
                        .addClass("alignment-properties")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.alignment")),
                            columns: [
                                {
                                    width: "100%",
                                    content: $("<div></div>")
                                        .append(
                                            createControl("_pal-" + GObject.GStylable.ParagraphAlignment.Left)
                                                .addClass("g-group-start")
                                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "title.align-left")))
                                        )
                                        .append(
                                            createControl("_pal-" + GObject.GStylable.ParagraphAlignment.Center)
                                                .addClass("g-group-element")
                                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "title.align-center")))
                                        )
                                        .append(
                                            createControl("_pal-" + GObject.GStylable.ParagraphAlignment.Right)
                                                .addClass("g-group-element")
                                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "title.align-right")))
                                        )
                                        .append(
                                            createControl("_pal-" + GObject.GStylable.ParagraphAlignment.Justify)
                                                .addClass("g-group-end")
                                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "action.justify")))
                                        ),
                                },
                            ],
                        })
                        .appendTo(panel),
                    $("<div></div>")
                        .addClass("vertical-properties")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.vertical")),
                            columns: [
                                {
                                    width: "auto",
                                    content: $("<div></div>")
                                        .append(
                                            createControl("va-" + GObject.GText.VerticalAlign.Top)
                                                .addClass("g-group-start")
                                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "title.align-top")))
                                        )
                                        .append(
                                            createControl("va-" + GObject.GText.VerticalAlign.Middle)
                                                .addClass("g-group-element")
                                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "title.align-middle")))
                                        )
                                        .append(
                                            createControl("va-" + GObject.GText.VerticalAlign.Bottom)
                                                .addClass("g-group-end")
                                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAlignAction", "title.align-bottom")))
                                        ),
                                },
                            ],
                        })
                        .appendTo(panel),
                    $("<div></div>")
                        .addClass("spacing-properties")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.spacing")),
                            columns: [
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.char")),
                                    width: "30%",
                                    content: createControl("_tcs"),
                                },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.word")),
                                    width: "30%",
                                    content: createControl("_tws"),
                                },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.line")),
                                    width: "40%",
                                    content: createControl("_plh"),
                                },
                            ],
                        })
                        .appendTo(panel),
                    $("<hr/>").appendTo(panel),
                    (this._sizingBlock = $("<div></div>")
                        .addClass("sizing-properties")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.sizing")),
                            columns: [
                                {
                                    width: "50%",
                                    content: createControl("aw"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.width")),
                                },
                                {
                                    width: "50%",
                                    content: createControl("ah"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.height")),
                                },
                            ],
                        })
                        .appendTo(panel)),
                    (this._scriptBlock = $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.script")),
                            columns: [
                                { width: "50%", content: createControl("dir") },
                                { width: "50%", content: createControl("_tlsc") },
                            ],
                        })
                        .appendTo(this._panel)),
                    (this._autoScrollBlock = $("<div></div>")
                        .addClass("auto-scale-font")
                        .attr("major-item-only", true)
                        .gPropertyRow({ columns: [{ width: "auto", content: createControl("sc") }] })
                        .appendTo(this._panel)),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.on-path")),
                            columns: [
                                {
                                    width: "30%",
                                    content: createControl("tpths"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.outside")),
                                },
                                {
                                    width: "30%",
                                    content: createControl("tpthd"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.reverse")),
                                },
                                {
                                    width: "40%",
                                    content: createControl("tptho"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.distance")),
                                },
                            ],
                        })
                        .appendTo(panel),
                    panel.find("button").each(function (e, button) {
                        $(button).attr("tabindex", -1);
                    }),
                    this._reInitLayout(),
                    gDesigner.addEventListener(GSettingChangedEvent, this._touchChanged, this));
            }),
            (GTextProperties.prototype._createLanguageSelector = function () {
                return $("<select/>")
                    .attr("data-property", "_tlocl")
                    .gPro()
                    .on("mousedown", Utils.watchDog.trap())
                    .on(
                        "change",
                        Utils.watchDog.trap((event) => {
                            const localeValue = $(event.target).closest("select").val();
                            (this._assignProperties(["_tlocl"], [localeValue || null]), gDesigner.stats("textproperties_change_language"));
                        })
                    );
            }),
            (GTextProperties.prototype._createStylisticSetSelector = function () {
                return $("<select/>")
                    .attr("data-property", "_tstyls")
                    .gPro()
                    .on("mousedown", Utils.watchDog.trap())
                    .on(
                        "change",
                        Utils.watchDog.trap((event) => {
                            const stylisticSetValue = $(event.target).closest("select").val();
                            (this._assignProperties(["_tstyls"], [stylisticSetValue || null]), gDesigner.stats("textproperties_change_stylistic-set"));
                        })
                    );
            }),
            (GTextProperties.prototype.openEyeDropper = function (pageX, pageY) {
                this._panel.find('[data-property="_fc"]').gPatternChooser("openEyeDropper", pageX, pageY);
            }),
            (GTextProperties.prototype._getAdvancedSettingsOverlayDiv = function () {
                return $("<div></div>").gOverlay({
                    releaseOnClose: false,
                    clazz: gDesigner.isEnabledProFeatures()
                        ? "g-overlay-advanced-setting"
                        : "dialog-expired-pro g-overlay-advanced-setting",
                });
            }),
            (GTextProperties.prototype._getAdvancedSettingsButton = function () {
                var license = gDesigner.getLicense();
                return $("<button></button>")
                    .attr("data-action", "text-settings")
                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.advanced-text-settings")))
                    .append($("<span></span>").addClass("gravit-icon-settings"))
                    .on("click", (event) => {
                        (gDesigner.stats("textproperties_open_advanced-settings"),
                            this._advancedSettings.gOverlay("open", $(event.target).closest("button")));
                    })
                    .gPro()
                    .gRichTooltip(
                        richTooltip.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.advanced-properties-icon-tooltip-title")),
                            description: GObject.GLocale.get(
                                new GObject.GLocaleKey("GTextProperties", "text.advanced-properties-icon-tooltip-description")
                            ),
                            isPro: !gDesigner.isEnabledProFeatures() || !(license.isPro() && !license.isExpired()),
                            learnMore: "/docs/working-with-text/advanced-text-properties/",
                        })
                    );
            }),
            (GTextProperties.prototype.update = function (document, elements, n) {
                if (this._ownChange) return true;
                if (
                    (this._chooserElem && this._chooserElem.gPatternChooser("close"),
                    this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        this._document.getEditor().removeEventListener(editors.GEditor.InlineEditorEvent, this._inlineEditorEvent),
                        this._document.getEditor().removeEventListener(editors.GEditor.HotkeyEvent, this._hotKeyEvent, this),
                        gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged),
                        (this._document = null)),
                    (this._text = []),
                    document)
                ) {
                    for (var hasStyleMatch = false, r = 0; r < elements.length; ++r)
                        elements[r] instanceof GObject.GText
                            ? this._text.push(elements[r])
                            : elements[r] instanceof GObject.GStyle &&
                              elements[r].getProperty("_sdf") === GObject.GObject.getTypeId(GObject.GText) &&
                              (this._text.push(elements[r]), (hasStyleMatch = true));
                    if ((this._text.length && this._text.length === elements.length) || hasStyleMatch)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._document.getEditor().addEventListener(editors.GEditor.InlineEditorEvent, this._inlineEditorEvent, this),
                            this._document.getEditor().addEventListener(editors.GEditor.HotkeyEvent, this._hotKeyEvent, this),
                            gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                            this._updateProperties(n),
                            this._advancedSettingsButton.css("display", ""),
                            true
                        );
                }
                return (this._advancedSettingsButton.css("display", "none"), false);
            }),
            (GTextProperties.prototype._settingChanged = function (event) {
                if ("font-set" === event.key) {
                    var fontSetCheckbox = this._panel.find('input[data-property="fontSet"]');
                    fontSetCheckbox.length && fontSetCheckbox.prop("checked") !== !!event.newValue && fontSetCheckbox.prop("checked", !!event.newValue);
                } else "decimals_num" === event.key && this._updateProperties();
            }),
            (GTextProperties.prototype._touchChanged = function (event) {
                "touch" === event.key && this._reInitLayout();
            }),
            (GTextProperties.prototype._reInitLayout = function () {
                gDesigner.isTouchEnabled()
                    ? (this._autoScrollBlock.insertAfter(this._sizingBlock),
                      this._autoScrollBlock.find(".auto-scale-checkbox").gCheckboxSlider())
                    : (this._autoScrollBlock.insertAfter(this._scriptBlock),
                      this._autoScrollBlock.find(".auto-scale-checkbox").gCheckboxSlider("unmount"));
            }),
            (GTextProperties.prototype._afterPropertiesChange = function (event) {
                const lastElement = this._text.length > 0 && this._text[this._text.length - 1];
                !event.temporary &&
                    lastElement &&
                    (lastElement === event.node || lastElement instanceof GObject.GStyle || (lastElement instanceof GObject.GText && lastElement.getContent() === event.node)) &&
                    (this._updateProperties(),
                    lastElement instanceof GObject.GText && lastElement.hasEmbeddedFonts() && this._document.getEditor().closeInlineEditor());
            }),
            (GTextProperties.prototype._hotKeyEvent = function (event) {
                const decorationKeyMap = { B: "bold", I: "italic", U: "underline", S: "strikeout" },
                    [modifierKey, key, ...rest] = event.keys;
                !modifierKey ||
                    modifierKey !== GPlatform.GKey.Constant.CONTROL ||
                    !(key in decorationKeyMap) ||
                    (rest && rest.length) ||
                    gDesigner.stats("textproperties_hotkey_change-decoration", decorationKeyMap[key]);
            }),
            (GTextProperties.prototype._inlineEditorEvent = function (event) {
                switch (event.type) {
                    case editors.GEditor.InlineEditorEvent.Type.AfterOpen:
                    case editors.GEditor.InlineEditorEvent.Type.AfterClose:
                    case editors.GEditor.InlineEditorEvent.Type.SelectionChanged:
                        this._updateProperties();
                        break;
                    case editors.GEditor.InlineEditorEvent.Type.TryOpen:
                        this._tryOpenInlineEditor();
                        break;
                    case editors.GEditor.InlineEditorEvent.Type.BeforeClose:
                    case editors.GEditor.InlineEditorEvent.Type.TextEdited:
                        this._tryModifyingInitialFont(event.type, event.data && event.data.wasModifiedBefore);
                }
            }),
            (GTextProperties.prototype._tryModifyingInitialFont = function (eventType, wasModifiedBefore) {
                if (this._document && this._text && 1 === this._text.length) {
                    var textElement = this._text[0];
                    if (!textElement.getProperty("_we")) {
                        var tlCore = textElement instanceof GObject.GText && textElement.getTLCore();
                        if (
                            tlCore &&
                            ((eventType === editors.GEditor.InlineEditorEvent.Type.BeforeClose && tlCore.getWasEdited()) ||
                                (eventType === editors.GEditor.InlineEditorEvent.Type.TextEdited && !wasModifiedBefore))
                        ) {
                            var plainText = tlCore.getDocumentRange().plainText(),
                                defaultFamily = FontsProviderManager.getProviderInstance(DefaultFontsProvider).getDefaultFamilyForString(plainText),
                                currentDefaultFamily =
                                    gDesigner.getWorkspace() &&
                                    gDesigner.getWorkspace().getFontManager() &&
                                    gDesigner.getWorkspace().getFontManager().getDefaultFont() &&
                                    gDesigner.getWorkspace().getFontManager().getDefaultFont().getFamily();
                            if (defaultFamily && currentDefaultFamily && currentDefaultFamily !== defaultFamily) {
                                var textDirection = GObject.GOpenTypeFont.getDirectionForString(plainText);
                                textDirection !== GObject.GTLDirectionTextTransformer.LTR
                                    ? textElement.setProperties(["_tff", "dir"], [defaultFamily, textDirection])
                                    : textElement.setProperty("_tff", defaultFamily);
                            }
                        }
                    }
                }
            }),
            (GTextProperties.prototype._tryOpenInlineEditor = function () {
                if (this._document && this._text && 1 === this._text.length && !this._openingInlineEditor) {
                    var textElement = this._text[0];
                    textElement.isFakeText() &&
                        GSystemDialog.confirm(
                            GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.edit")),
                            (confirmed) => {
                                if (confirmed) {
                                    (editors.GEditor.tryRunTransaction(
                                        textElement,
                                        () => {
                                            textElement.replaceFonts(
                                                gDesigner.getWorkspace().getFontManager().getDefaultFont(),
                                                textElement.hasEmbeddedFonts()
                                            );
                                        },
                                        "Replace fonts"
                                    ),
                                        (this._openingInlineEditor = true));
                                    try {
                                        this._document.getEditor().openInlineEditor(textElement, this._document.getActiveWindow().getView());
                                    } finally {
                                        this._openingInlineEditor = false;
                                    }
                                }
                            },
                            GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "no")),
                            GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "yes"))
                        );
                }
            }),
            (GTextProperties.prototype._intersectArrays = function (arrayA, arrayB) {
                return null === arrayA
                    ? arrayB
                    : null === arrayB
                      ? arrayA
                      : arrayA.filter(function (value) {
                            return -1 !== arrayB.indexOf(value);
                        });
            }),
            (GTextProperties.prototype._getFormatting = function (key, targets) {
                const count = targets.length;
                if (0 === count) return null;
                const getValue = function (target) {
                    let element;
                    if ((target instanceof editors.GTextEditor ? (element = target.getElement()) : target instanceof GObject.GText && (element = target), element)) {
                        const tlCore = element.getTLCore();
                        if (tlCore) {
                            let range;
                            const elementEditor = editors.GElementEditor.getEditor(element);
                            if (((range = elementEditor && elementEditor.isInlineEdit() ? tlCore.selectedRange() : tlCore.getDocumentRange()), range)) return range.getFormatting()[key];
                        }
                    }
                    return null;
                };
                let firstValue = getValue(targets[0]);
                for (let e = 1; e < count; e++) if (getValue(targets[e]) !== firstValue) return null;
                return firstValue;
            }),
            (GTextProperties.prototype._getProperty = function (property, elements, defaultValue) {
                var count = elements.length;
                if (0 == count) return null;
                for (var firstValue = elements[0].getProperty(property), a = 1; a < count; a++) if (elements[a].getProperty(property) !== firstValue) return null;
                return firstValue || !isNaN(firstValue) ? firstValue : 3 === arguments.length ? defaultValue : firstValue;
            }),
            (GTextProperties.prototype._getFontColor = function (targets) {
                var element = targets[0] instanceof editors.GElementEditor ? targets[0].getElement() : targets[0];
                if (!(element && element instanceof GObject.GText)) return null;
                var richContent = element.getTLCore().getRichContent();
                return richContent && richContent.length ? element._getGravitValue("fontColor", richContent[0].fontColor) : null;
            }),
            (GTextProperties.prototype._updateProperties = async function (e) {
                var targets,
                    defaultFont = (ye = gDesigner.getWorkspace().getFontManager()).getDefaultFont(),
                    a = null,
                    r = null;
                if (!defaultFont) return;
                targets = [];
                for (var s = 0; s < this._text.length; s++) {
                    var l = editors.GElementEditor.getEditor(this._text[s]);
                    targets.push(l || this._text[s]);
                }
                var fontSetCheckbox = this._panel.find('input[data-property="fontSet"]');
                fontSetCheckbox.length && fontSetCheckbox.prop("checked", gDesigner.getSetting("font-set"), false);
                var underline = this._getFormatting("underline", targets) || null,
                    strikeout = this._getFormatting("strikeout", targets) || null,
                    fractions = this._getFormatting("fractions", targets) || false,
                    listMarker = this._getFormatting("listMarker", targets) || null,
                    paragraphIndent = this._getProperty("_pai", targets, GObject.GStylable.PropertySetInfo.P.geometryProperties._pai),
                    paragraphSpacing = this._getProperty("_pas", targets, GObject.GStylable.PropertySetInfo.P.geometryProperties._pas),
                    languageScript = (this._getProperty("_tv", targets), this._getProperty("_tlsc", targets)),
                    typographyScript = this._getProperty("_ttsc", targets),
                    textTransform = this._getProperty("_ttrf", targets) || null,
                    fontWeight = this._getProperty("_tfw", targets) || "",
                    fontStyle = this._getProperty("_tfs", targets) || "",
                    autoWidth = this._getProperty("aw", targets) || false,
                    autoHeight = this._getProperty("ah", targets) || false,
                    scaleContent = this._getProperty("sc", targets) || false,
                    verticalAlign = this._getProperty("va", targets) || "",
                    fontSize = this._getProperty("_tfi", targets),
                    fontColor = this._getProperty("_fc", targets),
                    wordSpacing = this._getProperty("_tws", targets),
                    charSpacing = this._getProperty("_tcs", targets),
                    paragraphAlign = (this._getProperty("_fop", targets), this._getProperty("_pal", targets)),
                    lineHeight = this._getProperty("_plh", targets),
                    pathHeadingDirection = this._getProperty("tpthd", targets),
                    pathHeadingInsideOutside = this._getProperty("tpths", targets),
                    pathHeadingOffset = this._getProperty("tptho", targets),
                    textDirection = this._getProperty("dir", targets),
                    languageLocale = this._getProperty("_tlocl", targets),
                    stylisticSet = this._getProperty("_tstyls", targets),
                    ligatures = this._getFormatting("ligatures", targets);
                ((ligatures = "auto" === ligatures ? !charSpacing : !!ligatures), fontColor || (fontColor = this._getFontColor(targets)));
                var editor = this._document && this._document.getEditor(),
                    isInlineEditingText = editor && editor.isInlineEditing() && editor.getCurrentInlineEditorNode() instanceof GObject.GText,
                    hasPathAttached = targets.every(function (textElement) {
                        return textElement.hasPathAttached && textElement.hasPathAttached();
                    });
                (this._advancedSettings.find('[data-property^="_ttsc"]').each(function (index, button) {
                    var buttonElement = $(button),
                        scriptType = buttonElement.attr("data-property").substr("_ttsc-".length);
                    buttonElement.toggleClass("g-active", typographyScript === scriptType);
                }),
                    this._advancedSettings.find('[data-property^="_ttrf"]').each(function (index, button) {
                        var buttonElement = $(button),
                            transformType = buttonElement.attr("data-property").substr("_ttrf-".length);
                        buttonElement.toggleClass("g-active", textTransform === transformType);
                    }),
                    this._advancedSettings
                        .find('[data-property="_pai"]')
                        .gInputBox(
                            "value",
                            null !== paragraphIndent
                                ? this._document.getScene().pointToString(paragraphIndent, this._document.getScene().getOptimalDecimalsCount())
                                : ""
                        ));
                const paragraphSpacingUnitButton = this._advancedSettings.find('button[data-property="_pas_unit"]');
                if ("number" == typeof paragraphSpacing)
                    (paragraphSpacingUnitButton.text("%"),
                        this._advancedSettings
                            .find('[data-property="_pas"]')
                            .val(GObject.GUtil.formatNumber(100 * paragraphSpacing, this._document.getScene().getOptimalDecimalsCount())));
                else if ("string" == typeof paragraphSpacing) {
                    const scene = this._document.getScene();
                    (paragraphSpacingUnitButton.text(scene.getProperty("ut") || "px"),
                        this._advancedSettings.find('[data-property="_pas"]').val(scene.pointToString(paragraphSpacing, scene.getOptimalDecimalsCount())));
                } else this._advancedSettings.find('[data-property="_pas"]').val("");
                var verticalAlignValue = verticalAlign || GObject.GText.VerticalAlign.Top,
                    verticalAlignButtons = this._panel.find('button[data-property^="va"]');
                (verticalAlignButtons.each(function (index, button) {
                    var buttonElement = $(button);
                    buttonElement.prop("disabled", isInlineEditingText || hasPathAttached).toggleClass("g-active", buttonElement.attr("data-property") === "va-" + verticalAlignValue);
                }),
                    verticalAlignButtons.closest(".g-property-row").css("display", hasPathAttached || autoHeight || isInlineEditingText ? "none" : ""),
                    this._panel.find('[data-property="ah"] button').each((index, button) => {
                        var buttonElement = $(button);
                        buttonElement.prop("disabled", isInlineEditingText).toggleClass("g-active", buttonElement.is(":first-child") === autoHeight);
                    }));
                var autoWidthButtons = this._panel.find('[data-property="aw"] button');
                autoWidthButtons.each((index, button) => {
                    var buttonElement = $(button);
                    buttonElement.prop("disabled", isInlineEditingText).toggleClass("g-active", buttonElement.is(":first-child") === autoWidth);
                });
                var directionSelect = this._panel.find('select[data-property="dir"]');
                (directionSelect.prop("disabled", isInlineEditingText),
                    isInlineEditingText || directionSelect.val(textDirection),
                    this._panel.find('[data-property="sc"]').prop("checked", scaleContent),
                    autoWidthButtons.closest(".g-property-row").css("display", hasPathAttached ? "none" : ""),
                    this._panel.find('input[data-property="tpthd"]').prop("checked", pathHeadingDirection === GObject.GTLPathTextTransformer.DIRECTION_OUTWARDS),
                    this._panel.find('input[data-property="tpths"]').prop("checked", pathHeadingInsideOutside === GObject.GTLPathTextTransformer.OUTSIDE),
                    this._panel
                        .find('input[data-property="tptho"]')
                        .val(pathHeadingOffset)
                        .closest(".g-property-row")
                        .css("display", hasPathAttached ? "" : "none"));
                var retryUpdate = function () {
                        setTimeout(this._updateProperties.bind(this), 1);
                    }.bind(this),
                    fontFamilyInput = this._panel.find('input[data-property="_tff"]'),
                    fontList = fontFamilyInput.gFontsButton("getFontList"),
                    pendingFontFamily = null,
                    ee = true,
                    te = true;
                let ne, oe;
                for (s = 0; s < targets.length; s++) {
                    const target = targets[s];
                    let targetFonts;
                    if (((targetFonts = target instanceof editors.GTextEditor ? target.getFonts() : [target.getProperty("_tff")]), 1 == targets.length)) {
                        var ie = target instanceof editors.GTextEditor ? target.getElement() : target;
                        if (ie instanceof GObject.GText) {
                            var ae = ie.hasFontsToResolve();
                            if (ae && ae.length && ie.isFakeText()) {
                                var re = ae[0].getFamily();
                                re && (pendingFontFamily = re);
                            }
                        }
                    }
                    for (var se = 0; se < targetFonts.length; se++) {
                        let e,
                            t = targetFonts[se];
                        if (
                            (t
                                ? t === defaultFont.getFamily()
                                    ? (e = t)
                                    : ((e = fontList.gFontsPanel("fontDisplayName", t, retryUpdate)), void 0 === e && ((retryUpdate = null), (e = t)))
                                : ((t = ""), (e = t)),
                            void 0 === ne)
                        )
                            ne = e;
                        else if (ne !== e) {
                            ((ne = ""), (ee = false), (te = false));
                            break;
                        }
                        void 0 === oe ? (oe = t) : oe !== t && ((te = false), (oe = ""));
                    }
                }
                for (s = 0; s < targets.length; s++) {
                    var le = null,
                        ce = null;
                    let e;
                    e = targets[s] instanceof editors.GTextEditor ? targets[s].getFonts() : [targets[s].getProperty("_tff") || defaultFont.getFamily()];
                    for (se = 0; se < e.length; se++) {
                        var de = e[se];
                        let t;
                        (de === defaultFont.getFamily()
                            ? ((le = ye.getDefaultFontWeights()),
                              (le = GObject.GUtil.unique(le)),
                              (ce = le.map(function (e) {
                                  return {
                                      weight: e,
                                      styles: ye.getDefaultFontStyles().map((e) => e + valueSeparator + (ee ? defaultFont.getFamily() : "") + valueSeparator),
                                  };
                              })))
                            : fontList &&
                              (void 0 === (le = await fontList.gFontsPanel("weightsForFont", de, retryUpdate)) && (retryUpdate = null),
                              (le = le || []),
                              (le = GObject.GUtil.unique(le)),
                              (ce = le.map(function (e) {
                                  for (
                                      var t = fontList.gFontsPanel("stylesForWeight", e, de),
                                          n = fontList.gFontsPanel("subfamiliesForWeight", e, de),
                                          o = 0;
                                      o < n.length;
                                      o++
                                  )
                                      t[o] = t[o] + valueSeparator + (ee ? n[o].realName : "") + valueSeparator + (n[o].subFamily || "");
                                  return { weight: e, styles: t };
                              }))),
                            (a = GObject.GUtil.unique(this._intersectArrays(a, le))),
                            r
                                ? ((t = r),
                                  (t = t.filter((e) => {
                                      if (a.indexOf(e.weight) >= 0) {
                                          var t = ce.find((t) => t.weight === e.weight);
                                          if (!t) return false;
                                          var n = [];
                                          if (
                                              ((e.styles = e.styles.filter((e) => {
                                                  var o = e.split(valueSeparator)[0];
                                                  if (o && o.length) {
                                                      var i = t.styles.find((e) => {
                                                          if (e.startsWith(o)) return true;
                                                      });
                                                      if (i) return i !== e ? (n.push(o + valueSeparator + valueSeparator), true) : (n.push(e), true);
                                                  }
                                              })),
                                              (e.styles = n),
                                              e.styles.length)
                                          )
                                              return true;
                                      }
                                      return false;
                                  })))
                                : (t = ce.filter((e) => a.indexOf(e.weight) >= 0)),
                            (r = t));
                    }
                }
                (pendingFontFamily ? fontFamilyInput.val(pendingFontFamily) : fontFamilyInput.val(ne),
                    fontFamilyInput[0] === document.activeElement && fontFamilyInput[0].select(),
                    this._panel
                        .find('input[data-property="_tfi"]')
                        .gUnitBox({
                            unit:
                                this._document && this._document.getScene().$ut === GObject.GLength.Unit.PX
                                    ? GObject.GLength.Unit.PX
                                    : GObject.GLength.Unit.PT,
                            list: [6, 7, 8, 9, 10, 11, 12, 14, 18, 21, 24, 36, 48, 60, 72],
                            source: "text",
                        })
                        .gUnitBox("value", null !== fontSize ? new GObject.GLength(fontSize, GObject.GLength.Unit.PT) : null),
                    this._panel.find('[data-property="_fc"]').gPatternChooser("value", fontColor));
                var ue = this._panel.find('select[data-property="style"]');
                (ue.empty(), (r && r.length) || (r = [{ weight: 400, styles: [GObject.GFont.Style.Normal] }]), (a && a.length) || (a = [400]));
                for (s = 100; s <= 900; s += 100)
                    if (a.indexOf(s) >= 0) {
                        for (var pe = null, ge = 0; ge < r.length; ge++)
                            if (r[ge].weight === s) {
                                pe = r[ge].styles;
                                break;
                            }
                        for (ge = 0; pe && ge < pe.length; ge++) {
                            let e;
                            var he = pe[ge].split(valueSeparator);
                            ((e =
                                he[0] === GObject.GFont.Style.Italic
                                    ? GObject.GLocale.get(GObject.GFont.WeightNameItalic[s])
                                    : GObject.GLocale.get(GObject.GFont.WeightName[s])),
                                he[2] && he[2].length && 0 != e.indexOf(he[2]) && (e = he[2] + " " + e));
                            var fe = s.toString() + valueSeparator + he[0] + valueSeparator + (he[1] || "");
                            $("<option></option>").attr("value", fe).text(e).appendTo(ue);
                        }
                    }
                (this._advancedSettings
                    .find('[data-property="_ttrf-'.concat(GObject.GStylable.TextTransformation.SmallCaps, '"]'))
                    .prop("disabled", false),
                    this._advancedSettings.find('[data-property="typography-fractions"]').prop("disabled", false),
                    this._advancedSettings.find('[data-property="typography-ligatures"]').toggleClass("g-active", true === ligatures),
                    this._advancedSettings.find('[data-property="typography-fractions"]').toggleClass("g-active", true === fractions));
                var me = this._panel.find('select[data-property="_tlsc"]');
                (me.empty(),
                    me.append(
                        $("<option></option>")
                            .attr("value", "auto")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.auto")))
                    ));
                var ye,
                    ve = (ye = gDesigner.getWorkspace().getFontManager()).getFont(
                        (te && targets[0] && targets[0].getProperty("_tff")) || defaultFont.getFamily(),
                        fontStyle,
                        fontWeight
                    );
                if (ve.isResolved()) {
                    ve.hasFeature(GObject.GFont.Features.SmallCaps) ||
                        this._advancedSettings
                            .find('[data-property="_ttrf-'.concat(GObject.GStylable.TextTransformation.SmallCaps, '"]'))
                            .prop("disabled", true);
                    var _e = ve.getAvailableScripts();
                    for (s = 0; s < _e.length; s++) {
                        var be = _e[s];
                        if (be) {
                            var we = be.toLowerCase().split("");
                            ((we[0] = we[0].toUpperCase()),
                                (be = we.join("")),
                                me.append(
                                    $("<option></option>")
                                        .attr("value", _e[s])
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.".concat(be.toLowerCase())), be))
                                ));
                        }
                    }
                }
                ([
                    ...new Set(
                        targets
                            .map((e) => {
                                let t = [],
                                    n = e.getProperty("_tff"),
                                    a = e.getProperty("_tfs"),
                                    r = e.getProperty("_tfw");
                                if (e instanceof editors.GTextEditor && !n) {
                                    const o = e.getElement().getContent();
                                    if (o) {
                                        const s = GObject.GText.PropertyMapping._tff,
                                            l = GObject.GText.PropertyMapping._tfs,
                                            c = GObject.GText.PropertyMapping._tfw;
                                        t = o
                                            .map(
                                                (t) => (
                                                    (n = e.getElement()._getGravitValue(s, t[s])),
                                                    (a = e.getElement()._getGravitValue(l, t[l])),
                                                    (r = e.getElement()._getGravitValue(c, t[c])),
                                                    n && a && r ? ye.getFont(n, a, r, false) : null
                                                )
                                            )
                                            .filter((e) => !!e);
                                    }
                                } else n && a && r && (t = [ye.getFont(n, a, r, false)]);
                                return t;
                            })
                            .reduce((e, t) => e.concat(t), [])
                    ),
                ].every((e) => e && e.isResolved() && e.hasFeature(GObject.GFont.Features.Fractions)) ||
                    this._advancedSettings.find('[data-property="typography-fractions"]').prop("disabled", true),
                    me.val(languageScript));
                let Ce = ue.val();
                (ue.val(fontWeight + valueSeparator + fontStyle + valueSeparator + (te ? (targets[0] || defaultFont).getProperty("_tff") || defaultFont.getFamily() : "")), ue.val()) ||
                    (this._text.some(
                        (e) =>
                            e instanceof GObject.GText &&
                            (FormattingUtils.multipleValues === e.getTLCore().getDocumentRange().getFormatting()[GObject.GText.PropertyMapping._tfw] ||
                                FormattingUtils.multipleValues === e.getTLCore().getDocumentRange().getFormatting()[GObject.GText.PropertyMapping._tfs])
                    )
                        ? ($("<option></option>")
                              .attr("value", "mixed")
                              .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.mixed")))
                              .appendTo(ue),
                          ue.val("mixed"))
                        : ue.val(Ce));
                let xe = a.indexOf(GObject.GFont.Weight.Bold) >= 0;
                ((fontWeight && parseInt(fontWeight) === GObject.GFont.Weight.Bold) ||
                    (fontStyle &&
                        fontStyle === GObject.GFont.Style.Italic &&
                        (xe = r.some((e) => {
                            let { weight, styles } = e;
                            return weight === GObject.GFont.Weight.Bold && styles.some((e) => 0 === e.indexOf(GObject.GFont.Style.Italic));
                        }))),
                    this._panel
                        .find('[data-property="decoration-bold"]')
                        .toggleClass("g-active", xe && !!fontWeight && parseInt(fontWeight) === GObject.GFont.Weight.Bold)
                        .prop("disabled", !xe));
                const Se = r.some((e) => {
                    let { weight: t, styles: n } = e;
                    return t === parseInt(fontWeight || GObject.GFont.Weight.Regular) && n.some((e) => 0 === e.indexOf(GObject.GFont.Style.Italic));
                });
                (this._panel
                    .find('[data-property="decoration-italic"]')
                    .toggleClass("g-active", Se && !!fontStyle && fontStyle === GObject.GFont.Style.Italic)
                    .prop("disabled", !Se),
                    this._panel.find('[data-property="decoration-underline"]').toggleClass("g-active", 1 == underline),
                    this._panel.find('[data-property="decoration-strikeout"]').toggleClass("g-active", 1 == strikeout),
                    this._panel
                        .find('input[data-property="_tws"]')
                        .val(
                            null !== wordSpacing
                                ? this._document.getScene().pointToString(wordSpacing, this._document.getScene().getOptimalDecimalsCount())
                                : "0"
                        ),
                    this._panel
                        .find('input[data-property="_tcs"]')
                        .val(
                            null !== charSpacing
                                ? this._document.getScene().pointToString(charSpacing, this._document.getScene().getOptimalDecimalsCount())
                                : "0"
                        ));
                var paragraphAlignValue = paragraphAlign || GObject.GStylable.ParagraphAlignment.Left,
                    paragraphAlignButtons = this._panel.find('button[data-property^="_pal"]');
                (paragraphAlignButtons.each(function (index, button) {
                    var buttonElement = $(button);
                    buttonElement.toggleClass("g-active", buttonElement.attr("data-property") === "_pal-" + paragraphAlignValue);
                }),
                    paragraphAlignButtons.closest(".g-property-row").css("display", hasPathAttached ? "none" : ""));
                var lineHeightValue = lineHeight,
                    lineHeightUnitButton = this._panel.find('button[data-property="_plh_unit"]');
                if ("number" == typeof lineHeightValue)
                    (lineHeightUnitButton.text("%"), this._panel.find('input[data-property="_plh"]').val(GObject.GUtil.formatNumber(100 * lineHeightValue)));
                else if ("string" == typeof lineHeightValue || lineHeightValue instanceof String) {
                    const scene = this._document.getScene();
                    var unitType = scene.getProperty("ut");
                    (lineHeightUnitButton.text(unitType || "px"),
                        this._panel.find('input[data-property="_plh"]').val(scene.pointToString(lineHeight, scene.getOptimalDecimalsCount())));
                } else this._panel.find('input[data-property="_plh"]').val("");
                if (
                    (e &&
                        (e.evtType == editors.GEditor.ModifiedEvent.Type.Undo || e.evtType == editors.GEditor.ModifiedEvent.Type.Redo) &&
                        e.chooserOn &&
                        e.textPattern &&
                        this._panel.find('[data-property="_fc"]').find(".preview").trigger("click"),
                    (this._weightsAvailable = a),
                    this._listTypeSettings.find(".list-type-group.g-selected").removeClass("g-selected"),
                    this._listTypeSettings.find(".list-type-option.g-selected").removeClass("g-selected"),
                    this._advancedSettings.find('[data-property="_pm"] > span').text(""),
                    "string" == typeof listMarker)
                ) {
                    const markerOption = Object.values(markerTypeOptions).find((markerOption) => {
                        let { types: markerTypes = [] } = markerOption;
                        return markerTypes.find((typeOption) => {
                            let { value: value } = typeOption;
                            return value === listMarker;
                        });
                    });
                    (markerOption && this._advancedSettings.find('[data-property="_pm"] > span').text(markerOption.label),
                        this._listTypeSettings
                            .find('.list-type-option[value="'.concat(listMarker, '"]'))
                            .addClass("g-selected")
                            .closest(".list-type-group")
                            .addClass("g-selected"));
                } else
                    null == listMarker &&
                        (this._advancedSettings.find('[data-property="_pm"] > span').text(markerTypeOptions.None.label),
                        this._listTypeSettings.find('.list-type-group[value="'.concat(markerTypeOptions.None.value, '"]')).addClass("g-selected"));
                (this._updateLanguageSelector(ve, languageScript, languageLocale), this._updateStylisticSetSelector(ve, languageScript, stylisticSet));
            }),
            (GTextProperties.prototype._updateLanguageSelector = function (font, script, selectedValue) {
                const selectElement = this._advancedSettings.find('select[data-property="_tlocl"]').empty().attr("disabled", true).addClass("g-disabled");
                if (!font.isResolved() || !font.hasFeature(GObject.GFont.Features.LocalizedForm)) return;
                let scriptTag = null;
                script && "auto" !== script && (scriptTag = GObject.GOpenTypeFont.scriptNameToOpenTypeScriptTagString(script));
                const availableTags = font.getAvailableLanguageSystemTags(scriptTag);
                if (availableTags && 0 !== availableTags.length)
                    if (
                        (selectElement.attr("disabled", false).removeClass("g-disabled"),
                        selectElement.append(
                            $("<option/>")
                                .attr("value", "")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.default")))
                        ),
                        selectElement.append(
                            availableTags
                                .map((tag) => {
                                    const bcp47Tag = GObject.GOpenTypeFont.openTypeLanguageSystemTagStringToBCP47(tag);
                                    return {
                                        name: GObject.GLocale.get(new GObject.GLocaleKey("GBCP47LanguageTags", "text.lang.".concat(bcp47Tag))),
                                        tag: tag,
                                    };
                                })
                                .sort((optionA, optionB) => optionA.name.localeCompare(optionB.name))
                                .map((option) => {
                                    let { name, tag } = option;
                                    return $("<option/>").attr("value", tag).text(name);
                                })
                        ),
                        selectedValue)
                    )
                        selectElement.val(selectedValue);
                    else {
                        this._hasMultipleLanguages() &&
                            (selectElement.append(
                                $("<option/>")
                                    .attr("value", "mixed")
                                    .attr("hidden", true)
                                    .attr("disabled", true)
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.mixed")))
                            ),
                            selectElement.val("mixed"));
                    }
            }),
            (GTextProperties.prototype._updateStylisticSetSelector = function (font, script, selectedValue) {
                const selectElement = this._advancedSettings
                    .find('select[data-property="_tstyls"]')
                    .empty()
                    .attr("disabled", true)
                    .addClass("g-disabled");
                if (!font.isResolved() || !font.hasFeature(GObject.GFont.Features.StylisticSet)) return;
                let scriptTag = null;
                script && "auto" !== script && (scriptTag = GObject.GOpenTypeFont.scriptNameToOpenTypeScriptTagString(script));
                const availableSets = font.getAvailableStylisticSets(scriptTag);
                if (availableSets && 0 !== availableSets.length)
                    if (
                        (selectElement.attr("disabled", false).removeClass("g-disabled"),
                        selectElement.append(
                            $("<option/>")
                                .attr("value", "")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.none")))
                        ),
                        selectElement.append(availableSets.map((stylisticSet) => $("<option/>").attr("value", stylisticSet).text(stylisticSet.toUpperCase()))),
                        selectedValue)
                    )
                        selectElement.val(selectedValue);
                    else {
                        this._hasMultipleStylisticSets() &&
                            (selectElement.append(
                                $("<option/>")
                                    .attr("value", "mixed")
                                    .attr("hidden", true)
                                    .attr("disabled", true)
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "text.mixed")))
                            ),
                            selectElement.val("mixed"));
                    }
            }),
            (GTextProperties.prototype._hasMultipleLanguages = function () {
                return this._hasMultipleValues(GObject.GText.PropertyMapping._tlocl);
            }),
            (GTextProperties.prototype._hasMultipleStylisticSets = function () {
                return this._hasMultipleValues(GObject.GText.PropertyMapping._tstyls);
            }),
            (GTextProperties.prototype._hasMultipleValues = function (propertyKey) {
                return this._text.some((textElement) => {
                    if (textElement instanceof GObject.GText) {
                        const formattingValue = textElement.getTLCore().getDocumentRange().getFormatting()[propertyKey];
                        return FormattingUtils.multipleValues === formattingValue;
                    }
                });
            }),
            (GTextProperties.prototype._correctStyleAndWeight = async function (fontFamily, styleBox, weightBox) {
                var availableWeights = null,
                    weightStyleOptions = null,
                    fontManager = gDesigner.getWorkspace().getFontManager(),
                    defaultFont = fontManager.getDefaultFont(),
                    fontList = this._panel.find('input[data-property="_tff"]').gFontsButton("getFontList"),
                    corrected = false;
                if (
                    (fontFamily === defaultFont.getFamily()
                        ? (weightStyleOptions =
                              (availableWeights = fontManager.getDefaultFontWeights()) &&
                              availableWeights.map(function (weight) {
                                  return { weight: weight, styles: fontManager.getDefaultFontStyles() };
                              }))
                        : fontList &&
                          (weightStyleOptions =
                              (availableWeights = await fontList.gFontsPanel(
                                  "weightsForFont",
                                  fontFamily,
                                  function () {
                                      console.warn("textproperties: Unexpected callback");
                                  },
                                  true
                              )) &&
                              availableWeights.map(function (weight) {
                                  return {
                                      weight: weight,
                                      styles: fontList.gFontsPanel(
                                          "stylesForWeight",
                                          weight,
                                          fontFamily,
                                          function () {
                                              console.warn("textproperties: Unexpected callback");
                                          },
                                          true
                                      ),
                                  };
                              })),
                    availableWeights && availableWeights.indexOf(weightBox[0]) < 0)
                ) {
                    for (var closestIndex = 0, u = 0; u < availableWeights.length; u++) Math.abs(weightBox[0] - availableWeights[u]) < Math.abs(weightBox[0] - availableWeights[closestIndex]) && (closestIndex = u);
                    ((weightBox[0] = availableWeights[closestIndex]), (corrected = true));
                }
                var matchingWeightStyles =
                    (weightStyleOptions || []).filter(function (style) {
                        if (style.weight === weightBox[0]) return true;
                    }) || [];
                return (
                    matchingWeightStyles.length &&
                        matchingWeightStyles[0].styles.indexOf(styleBox[0]) < 0 &&
                        (styleBox[0] === GObject.GFont.Style.Normal && matchingWeightStyles[0].styles.length
                            ? (styleBox[0] = GObject.GFont.Style.Italic)
                            : (styleBox[0] = GObject.GFont.Style.Normal),
                        (corrected = true)),
                    corrected
                );
            }),
            (GTextProperties.prototype._toggleFormatting = function (formattingKey) {
                if (this._text && this._text.length) {
                    const targets = this._text.map((element) => editors.GElementEditor.getEditor(element) || element),
                        underline = this._getFormatting("underline", targets) || null,
                        strikeout = this._getFormatting("strikeout", targets) || null;
                    var ligatures = this._getFormatting("ligatures", targets);
                    const formattingState = {
                            underline: underline,
                            strikeout: strikeout,
                            ligatures: (ligatures = "auto" === ligatures ? !this._getProperty("_tcs", targets) : !!ligatures),
                            fractions: this._getFormatting("fractions", targets),
                        },
                        fontWeight = this._getProperty("_tfw", targets) || "",
                        fontStyle = this._getProperty("_tfs", targets) || "";
                    if ("bold" === formattingKey) {
                        let weight;
                        (parseInt(fontWeight) === GObject.GFont.Weight.Bold
                            ? ((weight =
                                  this._weightsAvailable.indexOf(GObject.GFont.Weight.Regular) >= 0
                                      ? GObject.GFont.Weight.Regular
                                      : Math.min.apply(null, this._weightsAvailable)),
                              (weight = weight || GObject.GFont.Style.Regular))
                            : (weight = GObject.GFont.Weight.Bold),
                            this._assignProperties(["_tfw"], [weight]));
                    } else if ("italic" === formattingKey)
                        this._assignProperties(["_tfs"], [fontStyle === GObject.GFont.Style.Italic ? GObject.GFont.Style.Normal : GObject.GFont.Style.Italic]);
                    else {
                        const editor = this._document.getEditor();
                        try {
                            (editor.beginTransaction(),
                                this._text.forEach((textElement) => {
                                    if ((textElement instanceof editors.GTextEditor && (textElement = textElement.getElement()), textElement instanceof GObject.GText)) {
                                        const tlCore = textElement.getTLCore();
                                        if (tlCore) {
                                            let range;
                                            const elementEditor = editors.GElementEditor.getEditor(textElement);
                                            ((range = elementEditor && elementEditor.isInlineEdit() ? tlCore.selectedRange() : tlCore.getDocumentRange()),
                                                range && range.setFormatting(formattingKey, 1 != formattingState[formattingKey]));
                                        }
                                    }
                                }));
                        } finally {
                            editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "action.modify-text-properties")));
                        }
                    }
                    this._updateProperties();
                }
            }),
            (GTextProperties.prototype._assignFont = async function (fontFamily) {
                if (gDesigner.getWorkspace().getFontManager().getDefaultFont().getFamily() !== fontFamily) {
                    var fontList = this._panel.find('input[data-property="_tff"]').gFontsButton("getFontList");
                    if (
                        void 0 ===
                        (await fontList.gFontsPanel("weightsForFont", fontFamily, () => {
                            this._assignFontMain(fontFamily);
                        }))
                    )
                        return;
                }
                this._assignFontMain(fontFamily);
            }),
            (GTextProperties.prototype._assignMarker = function (marker) {
                if (!this._document) return;
                const editor = this._document.getEditor();
                ((this._ownChange = true), editor.beginTransaction());
                try {
                    this._text.forEach((textElement) => {
                        if ((textElement instanceof editors.GTextEditor && (textElement = textElement.getElement()), textElement instanceof GObject.GText)) {
                            const tlCore = textElement.getTLCore();
                            if (tlCore) {
                                let range;
                                const elementEditor = editors.GElementEditor.getEditor(textElement);
                                ((range = elementEditor && elementEditor.isInlineEdit() ? tlCore.selectedRange() : tlCore.getDocumentRange()), range && range.toggleList(marker));
                            }
                        }
                    });
                } finally {
                    (editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "action.modify-text-properties"))),
                        (this._ownChange = false));
                }
            }),
            (GTextProperties.prototype._assignFontMain = async function (fontFamily) {
                var t,
                    n,
                    fontManager = gDesigner.getWorkspace().getFontManager();
                fontManager.getDefaultFont();
                if (this._document) {
                    var editor = this._document.getEditor();
                    if (this._text.length) {
                        editor.beginTransaction();
                        try {
                            for (var s = 0; s < this._text.length; ++s) {
                                var l = editors.GElementEditor.getEditor(this._text[s]);
                                if (this._text[s] instanceof GObject.GText && this._text[s].isFakeText()) {
                                    var c = this._text[s].getContent(),
                                        d = {};
                                    c &&
                                        c.forEach((t) => {
                                            d[t.fontFamily] = fontFamily;
                                        });
                                    var u = this._text[s].getProperty("_tff");
                                    ((d[u] = fontFamily), this._text[s].replaceFonts(d, true));
                                } else {
                                    var p = l || this._text[s],
                                        g = ["_tff"],
                                        h = [fontFamily],
                                        f = this._text[s] instanceof GObject.GText && this._text[s].getTLCore();
                                    if (f) {
                                        let o;
                                        o = l && l.isInlineEdit() ? f.selectedRange() : f.getDocumentRange();
                                        for (
                                            var m = o.save(),
                                                y = GObject.GText.PropertyMapping._tfs,
                                                v = GObject.GText.PropertyMapping._tfw,
                                                _ = (GObject.GText.PropertyMapping._tff, false),
                                                b = false,
                                                w = 0;
                                            w < m.length;
                                            w++
                                        ) {
                                            var C = "italic" === m[w][y] ? GObject.GFont.Style.Italic : GObject.GFont.Style.Normal,
                                                x = ~~m[w][v];
                                            if (((t = [C]), (n = [x]), await this._correctStyleAndWeight(fontFamily, t, n))) {
                                                var S = g.indexOf("_tfs"),
                                                    E = g.indexOf("_tfw");
                                                if (C !== t[0]) {
                                                    if ((S < 0 && ((S = g.length), g.push("_tfs"), h.push("")), b)) {
                                                        ((h[E] = n[0]), (h[S] = t[0]));
                                                        break;
                                                    }
                                                    ((h[S] = t[0]), (_ = true));
                                                }
                                                if (x !== n[0]) {
                                                    if ((E < 0 && ((E = g.length), g.push("_tfw"), h.push("")), _)) {
                                                        ((h[S] = t[0]), (h[E] = n[0]));
                                                        break;
                                                    }
                                                    ((h[E] = n[0]), (b = true));
                                                }
                                            }
                                        }
                                    } else {
                                        if (
                                            ((t = [p.getProperty("_tfs") || GObject.GFont.Style.Normal]),
                                            (n = [p.getProperty("_tfw") || GObject.GFont.Weight.Regular]),
                                            await this._correctStyleAndWeight(fontFamily, t, n),
                                            !fontManager.getFont(fontFamily, t[0], n[0]))
                                        )
                                            continue;
                                        (Array.prototype.push.apply(g, ["_tfs", "_tfw"]), Array.prototype.push.apply(h, [t[0], n[0]]));
                                    }
                                    p.setProperties(g, h);
                                }
                                if (l) {
                                    var A = l.getDefaultStyle();
                                    A && A.assignStyleFrom(this._text[s]);
                                }
                                this._text[s] instanceof GObject.GStyle && this._updateProperties();
                            }
                        } finally {
                            editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "action.modify-text-properties")));
                        }
                    }
                }
            }),
            (GTextProperties.prototype._assignProperty = function (property, value, silent, options) {
                this._assignProperties([property], [value], silent, options);
            }),
            (GTextProperties.prototype._assignProperties = function (properties, values, silent, options) {
                if (this._document) {
                    var editor = this._document.getEditor();
                    silent || ((this._ownChange = true), editor.beginTransaction());
                    try {
                        for (var s = 0; s < this._text.length; ++s) {
                            (l = editors.GElementEditor.getEditor(this._text[s]))
                                ? l.setProperties(properties, values, silent)
                                : this._text[s].setProperties(properties, values, false, false, silent);
                        }
                    } finally {
                        silent ||
                            (editor.commitTransaction(
                                GObject.GLocale.get(new GObject.GLocaleKey("GTextProperties", "action.modify-text-properties")),
                                options || null
                            ),
                            (this._ownChange = false));
                    }
                    if (properties.includes("sc"))
                        for (s = 0; s < this._text.length; ++s) {
                            var l;
                            (l = editors.GElementEditor.getEditor(this._text[s])) && l.requestInvalidation();
                        }
                }
            }),
            (GTextProperties.prototype.toString = function () {
                return "[Object GTextProperties]";
            }),
            (module.exports = GTextProperties));
    };
