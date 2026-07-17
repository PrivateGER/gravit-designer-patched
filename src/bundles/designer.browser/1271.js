module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(3), require(4), require(13));
        var GObject = require(1),
            GEditor = require(53),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            GProperties = require(123),
            GSettingChangedEvent = (require(173), require(135));
        function GRectangleProperties() {
            this._rectangles = [];
        }
        (GObject.GObject.inherit(GRectangleProperties, GProperties),
            (GRectangleProperties.prototype._panel = null),
            (GRectangleProperties.prototype._advancedPanel = null),
            (GRectangleProperties.prototype._document = null),
            (GRectangleProperties.prototype._rectangles = null),
            (GRectangleProperties.prototype.isGroup = function (e) {
                return true;
            }),
            (GRectangleProperties.prototype.init = function (panel, toolbar) {
                this._panel = panel;
                var self = this,
                    createControl = function (property) {
                        if ("uf" === property)
                            return $("<input>")
                                .addClass("uf-checkbox")
                                .attr("type", "checkbox")
                                .attr("data-property", property)
                                .on("change", function () {
                                    (gDesigner.stats("rectangleproperties_toggle_uniform", $(this).is(":checked") ? "enabled" : "disabled"),
                                        self._assignProperty(property, $(this).is(":checked")),
                                        self._updateProperties());
                                });
                        if ("csc" === property)
                            return $("<input>")
                                .addClass("csc-checkbox")
                                .attr("type", "checkbox")
                                .attr("data-property", property)
                                .on("change", function () {
                                    (gDesigner.stats(
                                        "rectangleproperties_toggle_scale-corners",
                                        $(this).is(":checked") ? "enabled" : "disabled"
                                    ),
                                        self._assignProperty(property, $(this).is(":checked")));
                                });
                        if (
                            "tl_sx" === property ||
                            "tl_sy" === property ||
                            "tr_sx" === property ||
                            "tr_sy" === property ||
                            "bl_sx" === property ||
                            "bl_sy" === property ||
                            "br_sx" === property ||
                            "br_sy" === property
                        ) {
                            var extraClass = "";
                            return (
                                ("tl_sy" !== property && "tr_sy" !== property && "bl_sy" !== property && "br_sy" !== property) || (extraClass = "sy-input"),
                                $("<input>")
                                    .addClass("corner-input")
                                    .addClass(extraClass)
                                    .attr("type", "text")
                                    .attr("data-property", property)
                                    .on("change", function () {
                                        gDesigner.stats("rectangleproperties_scale_individual-corners");
                                        var value = self._document.getScene().stringToPoint($(this).val());
                                        null !== value && "number" == typeof value && value >= 0 ? self._assignProperty(property, value) : self._updateProperties();
                                    })
                                    .gInputBox()
                            );
                        }
                        if ("tl_ct" === property || "tr_ct" === property || "bl_ct" === property || "br_ct" === property) {
                            var rotate = 0,
                                cornerSide = "right";
                            return (
                                "tl_ct" === property
                                    ? ((rotate = 270), (cornerSide = "left"))
                                    : "bl_ct" === property
                                      ? ((rotate = 180), (cornerSide = "left"))
                                      : "br_ct" === property && (rotate = 90),
                                $("<button></button>")
                                    .addClass("g-flat")
                                    .addClass(cornerSide)
                                    .attr("data-property", property)
                                    .css("width", "32px")
                                    .gCornerTypePicker({ rotate: rotate })
                                    .on("cornertypechange", function (event, value) {
                                        self._assignProperty(property, value);
                                    })
                            );
                        }
                        if ("tl_uf" === property || "tr_uf" === property || "bl_uf" === property || "br_uf" === property) {
                            var lockSide = "uf-right";
                            return (
                                ("tl_uf" !== property && "bl_uf" !== property) || (lockSide = "uf-left"),
                                $("<button></button>")
                                    .addClass("g-flat")
                                    .addClass("uf-btn")
                                    .addClass(lockSide)
                                    .attr("data-property", property)
                                    .on("click", function () {
                                        (gDesigner.stats("rectangleproperties_toggle_individual-uniform-corners"),
                                            self._assignProperty(property, !$(this).hasClass("g-active")),
                                            self._updateProperties());
                                    })
                                    .append($("<span></span>").addClass("gravit-icon-lock"))
                            );
                        }
                        if ("corners-type" !== property) {
                            if ("corners-radius-slider" === property)
                                return $("<div/>")
                                    .attr("data-property", "corners-radius")
                                    .gInputSlider({
                                        min: 0,
                                        max: 100,
                                        richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                            title: GObject.GLocale.get(
                                                new GObject.GLocaleKey("GCommonNames", "text.corner-radius-slider-tooltip-title")
                                            ),
                                            description: GObject.GLocale.get(
                                                new GObject.GLocaleKey("GCommonNames", "text.corner-radius-slider-tooltip-description")
                                            ),
                                            learnMore:
                                                "/docs/basics/shapes-paths/#advanced-corner-settings",
                                        }),
                                    })
                                    .on("mousedown", function () {
                                        (self._document.getEditor().hideSelection(),
                                            $(document).one("mouseup", function () {
                                                self._document.getEditor().resetHideSelection();
                                            }));
                                    })
                                    .on("input", function () {
                                        var computedRadius = self._assignCorners(parseInt($(this).gInputSlider("value")) / 100, void 0, true),
                                            unit = self._document.getScene().getProperty("ut"),
                                            decimals =
                                                (unit == GObject.GLength.Unit.PX || unit == GObject.GLength.Unit.PT) &&
                                                GEditor.GGuides.options.guides &&
                                                GEditor.GGuides.options.guides.indexOf(GEditor.GFullPixelsGuide.ID) >= 0
                                                    ? 0
                                                    : self._document.getScene().getOptimalDecimalsCount();
                                        self._panel
                                            .find('[type="text"][data-property="corners-radius"]')
                                            .val(self._document.getScene().pointToString(computedRadius, decimals));
                                    })
                                    .on("change", function () {
                                        (gDesigner.stats("rectangleproperties_input_corners-radius"),
                                            self._assignCorners(parseInt($(this).gInputSlider("value")) / 100, void 0, false));
                                    });
                            if ("corners-radius-input" === property)
                                return $("<input>")
                                    .attr("type", "text")
                                    .attr("data-property", "corners-radius")
                                    .addClass("corner-radius")
                                    .on("change", function () {
                                        gDesigner.stats("rectangleproperties_slide_corners-radius");
                                        var value = self._document.getScene().stringToPoint($(this).gInputBox("value"));
                                        null !== value && "number" == typeof value && value >= 0
                                            ? self._assignProperties(["uf", "tl_sx"], [true, value])
                                            : self._updateProperties();
                                    })
                                    .gInputBox({ minValue: 0 });
                            throw new Error("Unknown input property: " + property);
                        }
                    }.bind(this),
                    uniformSmoothnessLabel = GObject.GLocale.get(new GObject.GLocaleKey("GRectangleProperties", "text.uniform-corner-smoothness")),
                    horizontalSmoothnessLabel = GObject.GLocale.get(new GObject.GLocaleKey("GRectangleProperties", "text.horizontal-corner-smoothness")),
                    verticalSmoothnessLabel = GObject.GLocale.get(new GObject.GLocaleKey("GRectangleProperties", "text.vertical-corner-smoothness")),
                    cornerTypeLabel = GObject.GLocale.get(new GObject.GLocaleKey("GRectangleProperties", "text.corner-type"));
                ((this._advancedPanel = $("<div></div>")
                    .addClass("advanced-panel-wrapper")
                    .addClass("rectangle-properties")
                    .gOverlay({ releaseOnClose: false, clazz: "advanced-overlay" })
                    .append(
                        $("<div/>")
                            .css("margin-bottom", "10px")
                            .attr("data-property", "corners-type")
                            .addClass("corner-type")
                            .gCornerTypePicker({ notOverlay: true })
                            .on("cornertypechange", function (event, value) {
                                self._assignCorners(void 0, value);
                            })
                    )
                    .append(
                        $("<label></label>")
                            .addClass("g-checkbox-label")
                            .append(createControl("csc"))
                            .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.autoscale-corners"))))
                    )
                    .append(
                        $("<label></label>")
                            .addClass("g-checkbox-label")
                            .append(createControl("uf"))
                            .append(
                                $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GRectangleProperties", "text.uniform-corners")))
                            )
                    )
                    .append(
                        $("<div></div>")
                            .addClass("corners-panel")
                            .append(
                                $("<div></div>")
                                    .addClass("corners-item-row with-padding")
                                    .append(createControl("tl_ct").attr("data-title", uniformSmoothnessLabel))
                                    .append(createControl("tl_sx").attr("data-title", horizontalSmoothnessLabel))
                                    .append(createControl("tr_sx").attr("data-title", horizontalSmoothnessLabel))
                                    .append(createControl("tr_ct").attr("data-title", uniformSmoothnessLabel))
                            )
                            .append(
                                $("<div></div>")
                                    .addClass("corners-item-row with-padding")
                                    .append(createControl("tl_sy").attr("data-title", verticalSmoothnessLabel))
                                    .append(createControl("tl_uf").attr("data-title", cornerTypeLabel))
                                    .append(createControl("tr_uf").attr("data-title", cornerTypeLabel))
                                    .append(createControl("tr_sy").attr("data-title", verticalSmoothnessLabel))
                            )
                            .append(
                                $("<div></div>")
                                    .addClass("corners-item-row with-padding")
                                    .append(createControl("bl_sy").attr("data-title", verticalSmoothnessLabel))
                                    .append(createControl("bl_uf").attr("data-title", cornerTypeLabel))
                                    .append(createControl("br_uf").attr("data-title", cornerTypeLabel))
                                    .append(createControl("br_sy").attr("data-title", verticalSmoothnessLabel))
                            )
                            .append(
                                $("<div></div>")
                                    .addClass("corners-item-row with-padding")
                                    .append(createControl("bl_ct").attr("data-title", uniformSmoothnessLabel))
                                    .append(createControl("bl_sx").attr("data-title", horizontalSmoothnessLabel))
                                    .append(createControl("br_sx").attr("data-title", horizontalSmoothnessLabel))
                                    .append(createControl("br_ct").attr("data-title", uniformSmoothnessLabel))
                            )
                    )),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.corner")),
                            columns: [
                                {
                                    width: "auto",
                                    clazz: "corners-radius-slider-wrapper",
                                    content: createControl("corners-radius-slider"),
                                },
                                { clazz: "corners-radius-no-padding" },
                                {
                                    clazz: "corners-radius-input-wrapper",
                                    content: createControl("corners-radius-input"),
                                },
                                { width: "3px" },
                                {
                                    clazz: "advanced-settings-col",
                                    content: $("<div></div>")
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.advanced-settings")))
                                        .addClass("g-button g-icon g-advanced-setting")
                                        .css({ display: "flex", justifyContent: "center" })
                                        .append(
                                            $("<span></span>")
                                                .addClass("gravit-icon-settings")
                                                .css({ alignSelf: "center", lineHeight: "19px" })
                                        )
                                        .on(
                                            "click",
                                            function (event) {
                                                (gDesigner.stats("rectangleproperties_open_advanced"),
                                                    this._advancedPanel.gOverlay("open", $(event.target).closest(".g-button")),
                                                    gDesigner.isTouchEnabled()
                                                        ? (this._advancedPanel.find(".uf-checkbox").gCheckboxSlider(),
                                                          this._advancedPanel.find(".csc-checkbox").gCheckboxSlider())
                                                        : (this._advancedPanel.find(".uf-checkbox").gCheckboxSlider("unmount"),
                                                          this._advancedPanel.find(".csc-checkbox").gCheckboxSlider("unmount")));
                                                var cornerTypePicker = $('div[data-property="corners-type"]');
                                                cornerTypePicker.gCornerTypePicker("update", cornerTypePicker.gCornerTypePicker("value"));
                                            }.bind(this)
                                        ),
                                },
                            ],
                        })
                        .addClass("corner-radius")
                        .appendTo(this._panel));
            }),
            (GRectangleProperties.prototype.update = function (document, elements) {
                if (
                    (this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged),
                        (this._document = null)),
                    (this._rectangles = []),
                    document)
                ) {
                    for (var n = 0; n < elements.length; ++n) elements[n] instanceof GObject.GRectangle && this._rectangles.push(elements[n]);
                    if (this._rectangles.length && this._rectangles.length === elements.length)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                            this._updateProperties(),
                            true
                        );
                }
                return false;
            }),
            (GRectangleProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary && this._rectangles.length > 0 && this._rectangles[0] === event.node && this._updateProperties();
            }),
            (GRectangleProperties.prototype._settingChanged = function (event) {
                "decimals_num" === event.key && this._updateProperties();
            }),
            (GRectangleProperties.prototype._updateProperties = function () {
                var rectangle = this._rectangles[0],
                    radius = rectangle.getProperty("tl_sx"),
                    bbox = rectangle.getGeometryBBox(),
                    radiusSlider = this._panel.find('.g-input-slider[data-property="corners-radius"]'),
                    radiusInput = this._panel.find('input[type="text"][data-property="corners-radius"]'),
                    cornerTypePicker = this._advancedPanel.find('[data-property="corners-type"]'),
                    disabled = null === bbox;
                if ((radiusSlider.prop("disabled", disabled), radiusInput.prop("disabled", disabled), this._panel.find("button").prop("disabled", disabled), disabled))
                    cornerTypePicker.addClass("g-disabled");
                else {
                    cornerTypePicker.removeClass("g-disabled");
                    var percent = (radius / (rectangle.getPointsMinDistance() / 2)) * 100,
                        unit = this._document.getScene().getProperty("ut"),
                        decimals =
                            (unit == GObject.GLength.Unit.PX || unit == GObject.GLength.Unit.PT) &&
                            GEditor.GGuides.options.guides &&
                            GEditor.GGuides.options.guides.indexOf(GEditor.GFullPixelsGuide.ID) >= 0
                                ? 0
                                : this._document.getScene().getOptimalDecimalsCount();
                    (radiusSlider.gInputSlider("value", Math.round(percent)),
                        radiusInput.gInputBox("value", this._document.getScene().pointToString(radius, decimals)),
                        cornerTypePicker.gCornerTypePicker("value", rectangle.getProperty("tl_ct")),
                        this._advancedPanel
                            .find('input[data-property="csc"]')
                            .prop("disabled", disabled || rectangle instanceof GObject.GImage)
                            .prop("checked", !!rectangle.getProperty("csc")));
                    var uniform = rectangle.getProperty("uf");
                    if ((this._advancedPanel.find('input[data-property="uf"]').prop("checked", uniform), uniform))
                        this._advancedPanel.find(".corners-panel").css("display", "none");
                    else
                        (this._advancedPanel.find(".corners-panel").css("display", ""),
                            function (cornerPrefixes) {
                                for (var n = 0; n < cornerPrefixes.length; ++n) {
                                    var o = cornerPrefixes[n],
                                        i = this._advancedPanel.find('button[data-property="' + o + '_uf"]'),
                                        a = this._advancedPanel.find('input[data-property="' + o + '_sx"]'),
                                        r = this._advancedPanel.find('input[data-property="' + o + '_sy"]'),
                                        s = this._advancedPanel.find('button[data-property="' + o + '_ct"]');
                                    (a.val(this._document.getScene().pointToString(rectangle.getProperty(o + "_sx"), decimals)),
                                        r.val(this._document.getScene().pointToString(rectangle.getProperty(o + "_sy"), decimals)),
                                        rectangle.getProperty(o + "_uf")
                                            ? (i.addClass("g-active"), r.prop("disabled", true))
                                            : (i.removeClass("g-active"), r.prop("disabled", false)),
                                        i.prop("disabled", uniform),
                                        s.gCornerTypePicker("value", rectangle.getProperty(o + "_ct")));
                                }
                            }.bind(this)(["tl", "tr", "bl", "br"]));
                }
            }),
            (GRectangleProperties.prototype._assignCorners = function (ratio, cornerType, temporary) {
                temporary || this._document.getEditor().beginTransaction();
                var firstRadius = 0;
                try {
                    for (var a = 0; a < this._rectangles.length; ++a)
                        if (this._rectangles[a].isVisible()) {
                            var r = this._rectangles[a].getProperty("tl_sx"),
                                s = this._rectangles[a].getProperty("tl_ct");
                            if ((0 === r && "string" == typeof cornerType && "number" != typeof ratio && (ratio = 0.25), "number" == typeof ratio)) {
                                this._rectangles[a].getGeometryBBox();
                                r = ratio * (this._rectangles[a].getPointsMinDistance() / 2);
                            }
                            ("string" == typeof cornerType && (s = cornerType),
                                0 === a && (firstRadius = r),
                                this._rectangles[a].setProperties(["uf", "tl_sx", "tl_ct"], [true, r, s], false, false, temporary));
                        }
                } finally {
                    temporary ||
                        this._document
                            .getEditor()
                            .commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.change-corners")));
                }
                return firstRadius;
            }),
            (GRectangleProperties.prototype._assignProperty = function (property, value) {
                this._assignProperties([property], [value]);
            }),
            (GRectangleProperties.prototype._assignProperties = function (properties, values) {
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var i = 0; i < this._rectangles.length; ++i) this._rectangles[i].setProperties(properties, values);
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GRectangleProperties", "action.modify-rectangle-properties")));
                }
            }),
            (GRectangleProperties.prototype.toString = function () {
                return "[Object GRectangleProperties]";
            }),
            (module.exports = GRectangleProperties));
    };
