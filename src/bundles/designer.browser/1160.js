module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(30 /* polyfill:Object */), require(193), require(57), require(3), require(4), require(13), require(26));
        var editorModule = require(53),
            GObject = require(1),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            touchToolModule = _interopRequireDefault(require(340)),
            propertiesPanelBase = require(123),
            inputSliderModule = require(857 /* GInputSlider */);
        require(173);
        const GSettingChangedEvent = require(135);
        function GAppearanceProperties() {
            this._elements = [];
        }
        (GObject.GObject.inherit(GAppearanceProperties, propertiesPanelBase),
            (GAppearanceProperties.prototype._panel = null),
            (GAppearanceProperties.prototype._document = null),
            (GAppearanceProperties.prototype._elements = null),
            (GAppearanceProperties.prototype._getBlendingProperties = function () {
                var self = this;
                return $("<select></select>")
                    .attr("data-property", "_sbl")
                    .gBlendMode()
                    .append(
                        $('<optgroup label="' + GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "text.masking")) + '"></optgroup>')
                            .append(
                                $("<option></option>")
                                    .attr("value", "m")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "blending.mask")))
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", "!m")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "blending.inverse-mask")))
                            )
                    )
                    .gRichTooltip(
                        richTooltipModule.GRichTooltipConfig.from({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "text.blend-tooltip-title")),
                            description: GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "text.blend-tooltip-description")),
                            middle: false,
                            learnMore: "/docs/colors-gradients-textures/blending-modes/",
                        })
                    )
                    .on("change", function (event) {
                        (gDesigner.stats("appearance_change_blending", $(event.target).val()),
                            self._assignProperty(
                                "_sbl",
                                $(event.target).val(),
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.change-blending-mode"))
                            ));
                    });
            }),
            (GAppearanceProperties.prototype.init = function (panel, t) {
                ((this._panel = panel), this.setTouchTools([touchToolModule.default.APPEARANCE_TOUCH_TOOL]));
                var createControl = function (controlType) {
                    var self = this;
                    if ("evenodd" === controlType)
                        return $("<select></select>")
                            .attr("data-property", "evenodd")
                            .append(
                                $("<option></option>")
                                    .attr("value", "0")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "evenodd.non-zero")))
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", "1")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "evenodd.non-odd")))
                            )
                            .on("change", function () {
                                (gDesigner.stats("appearance_toggle_evenodd", "1" === $(this).val() ? "activate" : "deactivate"),
                                    self._assignProperty(
                                        "evenodd",
                                        "1" === $(this).val(),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.change-fill-rule"))
                                    ));
                            });
                    if ("_sbl" === controlType) return self._getBlendingProperties();
                    if ("opacity-slider" === controlType)
                        return $("<div/>")
                            .attr("data-property", "_stop")
                            .addClass("gravit-icon-touch-transparency")
                            .gInputSlider(
                                Object.assign({}, inputSliderModule.prototype.OPACITY_DEFAULT, {
                                    richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                        title: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GAppearanceProperties", "text.opacity-slider-tooltip-title")
                                        ),
                                        description: GObject.GLocale.get(
                                            new GObject.GLocaleKey("GAppearanceProperties", "text.opacity-slider-tooltip-description")
                                        ),
                                    }),
                                })
                            )
                            .on("mousedown", function () {
                                (self._document.getEditor().hideSelection(),
                                    $(document).one("mouseup", function () {
                                        self._document.getEditor().resetHideSelection();
                                    }));
                            })
                            .on("input", function (event) {
                                for (
                                    var target = $(event.target), propertyName = target.attr("data-property"), value = parseInt(target.gInputSlider("value")) / 100, r = 0;
                                    r < self._elements.length;
                                    ++r
                                )
                                    self._elements[r].setProperty(propertyName, value, false, false, true);
                                self._panel
                                    .find('[type="text"][data-property="' + propertyName + '"]')
                                    .gInputBox("value", GObject.GUtil.formatOpacity(100 * value));
                            })
                            .on("change", function (e) {
                                (gDesigner.stats("appearance_change_opacity"),
                                    self._assignProperty(
                                        $(this).attr("data-property"),
                                        parseFloat($(this).gInputSlider("value")) / 100,
                                        "Change opacity"
                                    ));
                            });
                    if ("opacity-input" === controlType)
                        return $("<input>")
                            .attr("type", "text")
                            .attr("data-property", "_stop")
                            .on("change", function (e) {
                                (gDesigner.stats("appearance_change_opacity"),
                                    self._assignProperty(
                                        $(this).attr("data-property"),
                                        GObject.GLength.parseEquationValue($(this).gInputBox("value")) / 100,
                                        "Change opacity"
                                    ));
                            })
                            .gInputBox({
                                minValue: 0,
                                maxValue: 100,
                                incrementValue: gDesigner.getOpacityIncrement(),
                                postfix: "%",
                            });
                    throw new Error("Unknown input property: " + controlType);
                }.bind(this);
                ($("<div></div>")
                    .addClass("appearance-opacity-property")
                    .gPropertyRow({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.opacity")),
                        columns: [
                            {
                                width: "auto",
                                clazz: "opacity-slider-col",
                                content: createControl("opacity-slider"),
                            },
                            { width: "5px" },
                            { clazz: "opacity-input-col", content: createControl("opacity-input") },
                        ],
                    })
                    .appendTo(this._panel),
                    $("<div></div>")
                        .addClass("appearance-blending-property")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.blending")),
                            columns: [{ width: "100%", content: createControl("_sbl") }],
                        })
                        .appendTo(this._panel));
                var panelInstance = this,
                    license = gDesigner.getLicense();
                $("<div/>")
                    .addClass("g-property-row appearance-style-property")
                    .append(
                        $("<label/>")
                            .addClass("property-label")
                            .append(
                                $("<span />")
                                    .addClass("vertical-align")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "text.style")))
                            )
                    )
                    .append(
                        $("<div/>")
                            .addClass("style-selector-container")
                            .css("display", "flex")
                            .append(
                                $("<div/>")
                                    .addClass("style-selector-inner-wrapper")
                                    .css({ display: "flex", width: "100%", overflow: "hidden" })
                                    .append(
                                        $("<div/>")
                                            .addClass("g-styles-preview")
                                            .css("margin-right", "5px")
                                            .css("align-self", "center")
                                            .css("display", "none")
                                    )
                                    .append(
                                        $("<div/>")
                                            .addClass("g-select")
                                            .addClass("g-styles-field-container")
                                            .css("overflow", "hidden")
                                            .css("margin-right", "5px")
                                            .append(
                                                $("<span/>")
                                                    .css({
                                                        width: "95%",
                                                        alignSelf: "center",
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                    })
                                                    .attr("type", "text")
                                                    .addClass("g-styles-field")
                                                    .attr("data-property", "_styles")
                                            )
                                            .gDesignerStyleEditor()
                                            .gRichTooltip(
                                                richTooltipModule.GRichTooltipConfig.from({
                                                    title: GObject.GLocale.get(
                                                        new GObject.GLocaleKey("GAppearanceProperties", "text.shared-styles-tooltip-title")
                                                    ),
                                                    description: GObject.GLocale.get(
                                                        new GObject.GLocaleKey("GAppearanceProperties", "text.shared-styles-tooltip-description")
                                                    ),
                                                    middle: false,
                                                    isPro: !gDesigner.isEnabledProFeatures() || !(license.isPro() && !license.isExpired()),
                                                    learnMore:
                                                        "/docs/organizing-your-designs/shared-styles/",
                                                })
                                            )
                                    )
                            )
                            .append(
                                $("<button></button>")
                                    .addClass("g-style-sync")
                                    .addClass("g-disabled")
                                    .on("click", function () {
                                        if (
                                            (gDesigner.stats("appearance_click_stylebutton"),
                                            !$(this).hasClass("g-disabled") && panelInstance._elements && panelInstance._elements.length > 0)
                                        ) {
                                            var style = panelInstance._elements[0].getReferencedStyle();
                                            style.assignStyleFrom(panelInstance._elements[0]);
                                            var preview = gDesigner.createNewStylePreview(style, true, panelInstance._elements[0] instanceof GObject.GText);
                                            (preview && panelInstance._addPreview(preview), $(this).addClass("g-disabled"));
                                        }
                                    })
                            )
                    )
                    .appendTo(this._panel);
            }),
            (GAppearanceProperties.prototype.update = function (document, elements) {
                if (
                    (this._updateUI(),
                    this._document &&
                        (gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged, this),
                        this._document.getScene().removeEventListener(GObject.GNode.AfterInsertEvent, this._styleChanged),
                        this._document.getScene().removeEventListener(GObject.GNode.AfterRemoveEvent, this._styleChanged),
                        this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        this._document.getScene().removeEventListener(GObject.GElement.AfterFlagChangeEvent, this._afterFlagChange),
                        (this._document = null)),
                    (this._elements = []),
                    document)
                ) {
                    gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this);
                    for (var n = 0; n < elements.length; ++n) {
                        var o = elements[n];
                        o.hasMixin(GObject.GStylable) &&
                            o.getStylePropertySets().indexOf(GObject.GStylable.PropertySet.Style) >= 0 &&
                            this._elements.push(o);
                    }
                    if (this._elements.length)
                        return (
                            (this._document = document),
                            this._document.getScene().addEventListener(GObject.GNode.AfterInsertEvent, this._styleChanged, this),
                            this._document.getScene().addEventListener(GObject.GNode.AfterRemoveEvent, this._styleChanged, this),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._document.getScene().addEventListener(GObject.GElement.AfterFlagChangeEvent, this._afterFlagChange, this),
                            this._updateProperties(),
                            true
                        );
                }
                return false;
            }),
            (GAppearanceProperties.prototype._updateUI = function () {
                let syncButton = this._panel.find(".g-style-sync");
                gDesigner.isTouchEnabled()
                    ? (syncButton.text(""), syncButton.append($("<span></span>").addClass("g-style-sync-refresh-item")))
                    : syncButton.text(GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "action.sync")));
            }),
            (GAppearanceProperties.prototype._settingChanged = function (event) {
                "touch" === event.key && this._updateUI();
            }),
            (GAppearanceProperties.prototype._afterFlagChange = function (event) {
                if (event.flag === GObject.GNode.Flag.Selected && (event.node instanceof GObject.GPGEdge || event.node instanceof GObject.GPGFacet)) {
                    var targetElement = event.node.getParent() ? event.node.getParent().getParent() : null;
                    targetElement && this._elements.indexOf(targetElement) >= 0 && this._updateProperties();
                }
            }),
            (GAppearanceProperties.prototype._afterPropertiesChange = function (event) {
                (event.temporary || event.node !== this._elements[0] || this._updateProperties(), this._styleChanged());
            }),
            (GAppearanceProperties.prototype._styleChanged = function () {
                1 === this._elements.length && this._checkSyncState();
            }),
            (GAppearanceProperties.prototype._updateProperties = function () {
                if (this._elements && this._elements.length) {
                    var element = this._elements[0],
                        elementEditor = editorModule.GElementEditor.getEditor(element),
                        getProperty = function (getProperty, forceSingle, fallback) {
                            var partsProperty = elementEditor ? elementEditor.getPartsProperty(getProperty) : null;
                            if (partsProperty) {
                                if (partsProperty.values.length) {
                                    if (1 == partsProperty.values.length || forceSingle) return partsProperty.values[0];
                                    for (var values = partsProperty.values, firstValue = values[0], l = 1; l < values.length; ++l) if (values[l] !== firstValue) return fallback;
                                    return firstValue;
                                }
                                return fallback;
                            }
                            return element.getProperty(getProperty);
                        },
                        opacity = 100 * getProperty("_stop", false, null);
                    (this._panel.find('.g-input-slider[data-property="_stop"]').gInputSlider("value", null !== opacity ? opacity : 100),
                        this._panel.find('[type="text"][data-property="_stop"]').gInputBox("value", GObject.GUtil.formatOpacity(opacity)),
                        this._panel.find('[data-property="_sbl"]').val(getProperty("_sbl", true)));
                    var stylePreview = null,
                        styleName = null;
                    if (1 === this._elements.length && this._elements[0].hasProperty("sref") && this._elements[0].getReferencedStyle()) {
                        var referencedStyle = this._elements[0].getReferencedStyle();
                        ((stylePreview = gDesigner.getStylePreview(referencedStyle, this._elements[0] instanceof GObject.GText)), (styleName = referencedStyle.getProperty("name")));
                    }
                    if ((this._checkSyncState(), stylePreview))
                        (this._addPreview(stylePreview),
                            this._panel.find(".g-styles-field").text(styleName),
                            this._panel.find(".g-styles-field").removeClass("g-disabled"));
                    else {
                        for (var hasReferencedStyle = false, d = 0; d < this._elements.length; ++d)
                            this._elements[0].hasProperty("sref") && this._elements[d].getReferencedStyle() && (hasReferencedStyle = true);
                        hasReferencedStyle && this._elements.length > 1
                            ? (this._panel.find(".g-styles-preview").empty(),
                              this._panel.find(".g-styles-preview").css("display", "none"),
                              this._panel
                                  .find(".g-styles-field")
                                  .text(GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "text.multiple-selection"))),
                              this._panel.find(".g-styles-field").addClass("g-disabled"))
                            : (this._panel.find(".g-styles-preview").empty(),
                              this._panel.find(".g-styles-preview").css("display", "none"),
                              this._panel
                                  .find(".g-styles-field")
                                  .text(GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "text.no-style"))),
                              this._panel.find(".g-styles-field").removeClass("g-disabled"));
                    }
                } else console.warn("GAppearanceProperties: empty _elements array");
            }),
            (GAppearanceProperties.prototype._addPreview = function (previewSrc) {
                (this._panel.find(".g-styles-preview").empty(),
                    this._panel
                        .find(".g-styles-preview")
                        .css("display", "")
                        .append($("<img/>").css({ height: "20px", width: "20px", borderRadius: "3px" }).attr("src", previewSrc)));
            }),
            (GAppearanceProperties.prototype._assignProperty = function (property, value, actionName) {
                this._assignProperties([property], [value], actionName);
            }),
            (GAppearanceProperties.prototype._assignProperties = function (properties, propertyValues, actionName) {
                if (this._document) {
                    var editor = this._document.getEditor();
                    editor.beginTransaction();
                    try {
                        for (var a = 0; a < this._elements.length; ++a) {
                            this._elements[a];
                            var r = editorModule.GElementEditor.getEditor(this._elements[a]);
                            (r && r.applyPropertiesToParts(properties, propertyValues)) || this._elements[a].setProperties(properties, propertyValues);
                        }
                    } finally {
                        editor.commitTransaction(actionName);
                    }
                } else console.warn("GAppearanceProperties: empty _document property");
            }),
            (GAppearanceProperties.prototype._checkSyncState = function () {
                this._elements && this._elements.length > 0 && this._elements[0].hasProperty("sref") && !this._elements[0].equalsStyle()
                    ? this._panel.find(".g-style-sync").removeClass("g-disabled")
                    : this._panel.find(".g-style-sync").addClass("g-disabled");
            }),
            (GAppearanceProperties.prototype.toString = function () {
                return "[Object GAppearanceProperties]";
            }),
            (module.exports = GAppearanceProperties));
    };
