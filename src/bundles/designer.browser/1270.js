module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(3), require(4), require(13));
        var GObject = require(1),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            GProperties = require(123),
            GSettingChangedEvent = (require(173), require(135));
        function GPolygonProperties() {
            this._polygons = [];
        }
        (GObject.GObject.inherit(GPolygonProperties, GProperties),
            (GPolygonProperties.prototype._panel = null),
            (GPolygonProperties.prototype._advancedPanel = null),
            (GPolygonProperties.prototype._document = null),
            (GPolygonProperties.prototype._polygons = null),
            (GPolygonProperties.prototype.init = function (panel, t) {
                this._panel = panel;
                var self = this,
                    createInput = function (property) {
                        if ("ir" === property || "or" === property)
                            return $("<input>")
                                .addClass("radius-input-" + property)
                                .attr("type", "text")
                                .attr("data-property", property)
                                .on("change", function () {
                                    gDesigner.stats("polygonproperties_change_radius");
                                    var value = self._document.getScene().stringToPoint($(this).val());
                                    null !== value && "number" == typeof value && value >= 0
                                        ? self._assignProperty(
                                              property,
                                              value,
                                              GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "action.change-radius"))
                                          )
                                        : self._updateProperties();
                                })
                                .gInputBox();
                        if ("ia" === property || "oa" === property)
                            return $("<input>")
                                .addClass("angle-input-" + property)
                                .attr("type", "text")
                                .attr("data-property", property)
                                .on("change", function () {
                                    gDesigner.stats("polygonproperties_change_angle");
                                    var angle = GObject.GLength.parseEquationValue($(this).val());
                                    null !== angle
                                        ? ((angle = GObject.GMath.normalizeAngleRadians(GObject.GMath.toRadians(angle))),
                                          self._assignProperty(
                                              property,
                                              GObject.GMath.PI2 - angle,
                                              GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "action.change-angle"))
                                          ))
                                        : self._updateProperties();
                                })
                                .gInputBox({ fixedIncrement: true });
                        if ("ict" === property || "oct" === property)
                            return $("<button></button>")
                                .addClass("g-flat")
                                .attr("data-property", property)
                                .gCornerTypePicker()
                                .on("cornertypechange", function (event, value) {
                                    self._assignProperty(
                                        property,
                                        value,
                                        GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "action.change-corner-type"))
                                    );
                                });
                        if ("icr" === property || "ocr" === property)
                            return $("<input>")
                                .attr("type", "text")
                                .attr("data-property", property)
                                .on("change", function (event) {
                                    gDesigner.stats("polygonproperties_change_corner-radius");
                                    var value = self._document.getScene().stringToPoint($(this).val());
                                    null !== value && "number" == typeof value && value >= 0
                                        ? self._assignProperty(
                                              property,
                                              value < 0 ? 0 : value,
                                              GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "action.change-corner-radius"))
                                          )
                                        : self._updateProperties();
                                })
                                .gInputBox();
                        if ("corners-type" !== property) {
                            if ("corners-radius-slider" === property)
                                return $("<div/>")
                                    .attr("data-property", "corners-radius-slider")
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
                                        }),
                                    })
                                    .on("mousedown", function () {
                                        (self._document.getEditor().hideSelection(),
                                            $(document).one("mouseup", function () {
                                                self._document.getEditor().resetHideSelection();
                                            }));
                                    })
                                    .on("input", function () {
                                        var radius = self._assignCornersRadius(parseInt($(this).gInputSlider("value")) / 100, true);
                                        self._panel
                                            .find('[data-property="corners-radius"]')
                                            .val(self._document.getScene().pointToString(radius, self._document.getScene().getOptimalDecimalsCount()));
                                    })
                                    .on("change", function () {
                                        (gDesigner.stats("polygonproperties_change_radius"),
                                            self._assignCornersRadius(parseInt($(this).gInputSlider("value")) / 100, false));
                                    });
                            if ("corners-radius-input" === property)
                                return $("<input>")
                                    .attr("type", "text")
                                    .attr("data-property", "corners-radius")
                                    .addClass("corner-radius")
                                    .on("change", function () {
                                        gDesigner.stats("polygonproperties_change_corners-radius");
                                        var value = self._document.getScene().stringToPoint($(this).gInputBox("value"));
                                        null !== value && "number" == typeof value && value >= 0
                                            ? self._assignCornersRadius(value, false, true)
                                            : self._updateProperties();
                                    })
                                    .gInputBox({ minValue: 0, incrementValue: 1 });
                            throw new Error("Unknown input property: " + property);
                        }
                    };
                ($("<div></div>")
                    .gPropertyRow({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "text.points")),
                        columns: [
                            {
                                width: "auto",
                                clazz: "point-slider-wrapper",
                                content: $("<div/>")
                                    .attr("data-property", "pts")
                                    .gInputSlider({ min: 3, max: 25 })
                                    .on("input", function () {
                                        var value = $(this).gInputSlider("value");
                                        (self._assignPoints(parseInt(value), true), self._panel.find('input[type="text"][data-property="pts"]').val(value));
                                    })
                                    .on("change", function (event) {
                                        (gDesigner.stats("polygonproperties_change_number-of-points"),
                                            self._assignPoints(parseInt($(this).gInputSlider("value")), false));
                                    }),
                            },
                            {
                                width: "40px",
                                content: $("<input>")
                                    .attr("type", "text")
                                    .attr("data-property", "pts")
                                    .on("change", function (event) {
                                        (gDesigner.stats("polygonproperties_change_number-of-points"),
                                            self._assignPoints(GObject.GLength.parseEquationValue($(this).gInputBox("value")), false));
                                    })
                                    .gInputBox({ minValue: 3 }),
                            },
                        ],
                    })
                    .appendTo(this._panel),
                    $("<div></div>")
                        .attr("data-plain-edges", "false")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.size")),
                            columns: [
                                {
                                    width: "auto",
                                    clazz: "size-slider-wrapper",
                                    content: $("<div/>")
                                        .attr("data-property", "size")
                                        .gInputSlider({ min: 0, max: 100 })
                                        .on("input", function () {
                                            var value = parseInt($(this).gInputSlider("value"));
                                            (self._assignSize(value / 100, true),
                                                self._panel
                                                    .find('[type="text"][data-property="size"]')
                                                    .gInputBox("value", GObject.GUtil.formatNumber(value, 0)));
                                        })
                                        .on("change", function () {
                                            (gDesigner.stats("polygonproperties_change_plain-edges"),
                                                self._assignSize(parseInt($(this).gInputSlider("value")) / 100, false));
                                        }),
                                },
                                {
                                    width: "40px",
                                    content: $("<input>")
                                        .attr("type", "text")
                                        .attr("data-property", "size")
                                        .on("change", function () {
                                            (gDesigner.stats("polygonproperties_change_plain-edges"),
                                                self._assignSize(GObject.GLength.parseEquationValue($(this).gInputBox("value")) / 100, false));
                                        })
                                        .gInputBox({ minValue: 0, maxValue: 100, postfix: "%" }),
                                },
                            ],
                        })
                        .appendTo(this._panel),
                    $("<hr/>").appendTo(this._panel),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.corner")),
                            columns: [
                                {
                                    width: "auto",
                                    clazz: "corners-radius-slider-wrapper",
                                    content: createInput("corners-radius-slider"),
                                },
                                { clazz: "corners-radius-no-padding" },
                                {
                                    clazz: "corners-radius-input-wrapper",
                                    content: createInput("corners-radius-input"),
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
                                                (gDesigner.stats("polygonproperties_click_advanced-corners"),
                                                    this._advancedPanel.gOverlay("open", $(event.target).closest(".g-button")),
                                                    gDesigner.isTouchEnabled()
                                                        ? (this._advancedPanel.find(".edges-checkbox").gCheckboxSlider(),
                                                          this._advancedPanel.find(".csc-checkbox").gCheckboxSlider())
                                                        : (this._advancedPanel.find(".edges-checkbox").gCheckboxSlider("unmount"),
                                                          this._advancedPanel.find(".csc-checkbox").gCheckboxSlider("unmount")));
                                                var cornerTypePicker = $('div[data-property="corners-type"]');
                                                cornerTypePicker.gCornerTypePicker("update", cornerTypePicker.gCornerTypePicker("value"));
                                            }.bind(this)
                                        ),
                                },
                            ],
                        })
                        .addClass("corner-radius")
                        .appendTo(this._panel),
                    (this._advancedPanel = $("<div></div>")
                        .addClass("advanced-panel-wrapper")
                        .gOverlay({ releaseOnClose: false, clazz: "advanced-overlay" })),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "100%",
                                    content: $("<div/>")
                                        .css("margin-bottom", "10px")
                                        .attr("data-property", "corners-type")
                                        .addClass("corner-type")
                                        .gCornerTypePicker({ notOverlay: true })
                                        .on("cornertypechange", function (event, value) {
                                            self._assignProperties(
                                                ["ict", "oct"],
                                                [value, value],
                                                GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "action.change-corner-type"))
                                            );
                                        }),
                                },
                            ],
                        })
                        .appendTo(this._advancedPanel),
                    $("<div></div>")
                        .addClass("g-checkbox-label-wrapper")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "100%",
                                    content: $("<label></label>")
                                        .addClass("g-checkbox-label")
                                        .append(
                                            $("<input>")
                                                .addClass("edges-checkbox")
                                                .attr("type", "checkbox")
                                                .attr("data-property", "edges")
                                                .on("change", function () {
                                                    (gDesigner.stats(
                                                        "polygonproperties_toggle_plain-edges",
                                                        $(this).is(":checked") ? "enabled" : "disabled"
                                                    ),
                                                        self._assignEdges($(this).is(":checked")),
                                                        self._updateProperties());
                                                })
                                        )
                                        .append(
                                            $(
                                                "<span>" +
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "text.plain-edges")) +
                                                    "</span>"
                                            )
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._advancedPanel),
                    $("<div></div>")
                        .addClass("g-checkbox-label-wrapper")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "100%",
                                    content: $("<label></label>")
                                        .addClass("g-checkbox-label")
                                        .append(
                                            $("<input>")
                                                .addClass("csc-checkbox")
                                                .attr("type", "checkbox")
                                                .attr("data-property", "csc")
                                                .on(
                                                    "change",
                                                    function (event) {
                                                        (gDesigner.stats(
                                                            "polygonproperties_toggle_autoscale-corners",
                                                            $(event.target).is(":checked") ? "enabled" : "disabled"
                                                        ),
                                                            this._assignProperty("csc", $(event.target).is(":checked")));
                                                    }.bind(this)
                                                )
                                        )
                                        .append(
                                            $(
                                                "<span>" +
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.autoscale-corners")) +
                                                    "</span>"
                                            )
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._advancedPanel),
                    $("<div></div>")
                        .addClass("corner-row-wrapper")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "text.corners")),
                            columns: [
                                {
                                    width: "50%",
                                    content: $("<div></div>").addClass("corner-wrapper").append(createInput("ocr")).append(createInput("oct")),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.outside")),
                                },
                                {
                                    width: "50%",
                                    content: $("<div></div>").addClass("corner-wrapper").append(createInput("icr")).append(createInput("ict")),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.inside")),
                                },
                            ],
                        })
                        .appendTo(this._advancedPanel),
                    $("<div></div>")
                        .addClass("radius-row-wrapper")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.radius")),
                            columns: [
                                {
                                    width: "50%",
                                    content: createInput("or"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.outside")),
                                },
                                {
                                    width: "50%",
                                    content: createInput("ir"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.inside")),
                                },
                            ],
                        })
                        .appendTo(this._advancedPanel),
                    $("<div></div>")
                        .addClass("angles-row-wrapper")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.angles")),
                            columns: [
                                {
                                    width: "50%",
                                    content: createInput("oa"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.outside")),
                                },
                                {
                                    width: "50%",
                                    content: createInput("ia"),
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.inside")),
                                },
                            ],
                        })
                        .appendTo(this._advancedPanel));
            }),
            (GPolygonProperties.prototype.update = function (document, elements) {
                if (
                    (this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged),
                        (this._document = null)),
                    (this._polygons = []),
                    document)
                ) {
                    for (var n = 0; n < elements.length; ++n) elements[n] instanceof GObject.GPolygon && this._polygons.push(elements[n]);
                    if (this._polygons.length && this._polygons.length === elements.length)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                            this._updateProperties(true),
                            true
                        );
                }
                return false;
            }),
            (GPolygonProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary && this._polygons.length > 0 && this._polygons[0] === event.node && this._updateProperties();
            }),
            (GPolygonProperties.prototype._settingChanged = function (event) {
                "decimals_num" === event.key && this._updateProperties();
            }),
            (GPolygonProperties.prototype._updateProperties = function (initial) {
                var polygon = this._polygons[0],
                    outerRadius = polygon.getProperty("or"),
                    innerRadius = polygon.getProperty("ir"),
                    points = polygon.getProperty("pts"),
                    sizePercent = (innerRadius / outerRadius) * 100,
                    plainEdges = polygon.isPlainEdges(),
                    outerCornerRadius = polygon.getProperty("ocr");
                (this._panel.find('.g-input-slider[data-property="pts"]').gInputSlider("value", points),
                    this._panel.find('[type="text"][data-property="pts"]').gInputBox("value", points),
                    this._panel.find('.g-input-slider[data-property="size"]').gInputSlider("value", Math.round(sizePercent)),
                    this._panel.find('[type="text"][data-property="size"]').gInputBox("value", GObject.GUtil.formatNumber(sizePercent, 0)),
                    this._advancedPanel.find('[data-property="corners-type"]').gCornerTypePicker("value", polygon.getProperty("oct")));
                var minDistance = polygon.getPointsMinDistance();
                (plainEdges || (minDistance /= 2), (outerCornerRadius = Math.min(outerCornerRadius, minDistance)));
                var cornerRadiusPercent = minDistance > 0 ? (outerCornerRadius / minDistance) * 100 : 0;
                (this._panel.find('[data-property="corners-radius-slider"]').gInputSlider("value", Math.round(cornerRadiusPercent)),
                    this._panel
                        .find('[data-property="corners-radius"]')
                        .val(
                            this._document
                                .getScene()
                                .pointToString(polygon.getProperty("ocr"), this._document.getScene().getOptimalDecimalsCount())
                        ),
                    initial && plainEdges
                        ? this._advancedPanel.find('input[data-property="edges"]').prop("checked", true)
                        : plainEdges || this._advancedPanel.find('input[data-property="edges"]').prop("checked", false),
                    this._advancedPanel.find('input[data-property="csc"]').prop("checked", !!polygon.getProperty("csc")),
                    this._advancedPanel.find('button[data-property="oct"]').gCornerTypePicker("value", polygon.getProperty("oct")),
                    this._advancedPanel.find('button[data-property="ict"]').gCornerTypePicker("value", polygon.getProperty("ict")),
                    this._advancedPanel
                        .find('input[data-property="ocr"]')
                        .val(
                            this._document
                                .getScene()
                                .pointToString(polygon.getProperty("ocr"), this._document.getScene().getOptimalDecimalsCount())
                        ),
                    this._advancedPanel
                        .find('input[data-property="icr"]')
                        .val(
                            this._document
                                .getScene()
                                .pointToString(polygon.getProperty("icr"), this._document.getScene().getOptimalDecimalsCount())
                        ),
                    this._advancedPanel
                        .find('input[data-property="or"]')
                        .val(
                            this._document
                                .getScene()
                                .pointToString(polygon.getProperty("or"), this._document.getScene().getOptimalDecimalsCount())
                        ),
                    this._advancedPanel
                        .find('input[data-property="ir"]')
                        .val(
                            this._document
                                .getScene()
                                .pointToString(polygon.getProperty("ir"), this._document.getScene().getOptimalDecimalsCount())
                        ),
                    this._advancedPanel
                        .find('input[data-property="oa"]')
                        .val(GObject.GUtil.formatNumber(GObject.GMath.toDegrees(GObject.GMath.PI2 - polygon.getProperty("oa")), 2)),
                    this._advancedPanel
                        .find('input[data-property="ia"]')
                        .val(GObject.GUtil.formatNumber(GObject.GMath.toDegrees(GObject.GMath.PI2 - polygon.getProperty("ia")), 2)),
                    this._panel
                        .find('[data-plain-edges="false"]')
                        .css("display", this._advancedPanel.find('input[data-property="edges"]').prop("checked") ? "none" : ""));
            }),
            (GPolygonProperties.prototype._assignCornersRadius = function (radius, temporary, absolute) {
                temporary || this._document.getEditor().beginTransaction();
                var cornerRadius = 0;
                try {
                    for (var a = 0; a < this._polygons.length; ++a) {
                        var r = this._polygons[a];
                        if (r.isVisible()) {
                            var s = radius;
                            if (!absolute) s = radius * r.getPointsMinDistance();
                            (r.isPlainEdges()
                                ? r.setProperties(["ocr"], [s], false, false, temporary)
                                : (absolute || (s /= 2), r.setProperties(["ocr", "icr"], [s, s], false, false, temporary)),
                                0 === a && (cornerRadius = s));
                        }
                    }
                } finally {
                    temporary ||
                        this._document
                            .getEditor()
                            .commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.change-corners")));
                }
                return cornerRadius;
            }),
            (GPolygonProperties.prototype._assignProperty = function (property, value, action) {
                this._assignProperties([property], [value], action);
            }),
            (GPolygonProperties.prototype._assignProperties = function (properties, values, action) {
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var i = 0; i < this._polygons.length; ++i) this._polygons[i].setProperties(properties, values);
                } finally {
                    editor.commitTransaction(action);
                }
            }),
            (GPolygonProperties.prototype._assignSize = function (sizeRatio, temporary) {
                temporary || this._document.getEditor().beginTransaction();
                try {
                    for (var n = 0; n < this._polygons.length; ++n) {
                        var i = this._polygons[n],
                            a = i.getProperty("or") * sizeRatio;
                        i.setProperty("ir", a, false, false, temporary);
                    }
                } finally {
                    temporary ||
                        this._document
                            .getEditor()
                            .commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "action.change-polygon-size")));
                }
            }),
            (GPolygonProperties.prototype._assignPoints = function (points, temporary) {
                temporary || this._document.getEditor().beginTransaction();
                try {
                    for (var n = 0; n < this._polygons.length; ++n) {
                        var i = this._polygons[n],
                            a = i.isPlainEdges(),
                            r = Math.PI / points,
                            s = GObject.GMath.normalizeAngleRadians(i.getProperty("oa") + r);
                        if (a) {
                            var l = i.getProperty("or") * Math.cos(r);
                            i.setProperties(["pts", "ia", "ir"], [points, s, l], false, false, temporary);
                        } else i.setProperties(["pts", "ia"], [points, s], false, false, temporary);
                    }
                } finally {
                    temporary ||
                        this._document
                            .getEditor()
                            .commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "action.change-polygon-points")));
                }
            }),
            (GPolygonProperties.prototype._assignEdges = function (plainEdges, temporary) {
                if (plainEdges) {
                    temporary || this._document.getEditor().beginTransaction();
                    try {
                        for (var n = 0; n < this._polygons.length; ++n) {
                            var i = this._polygons[n],
                                a = i.getProperty("or"),
                                r = i.getProperty("pts"),
                                s = i.getProperty("oa"),
                                l = Math.PI / r,
                                c = s + l,
                                d = a * Math.cos(l);
                            i.setProperties(["ir", "ia"], [d, c], false, false, temporary);
                        }
                    } finally {
                        temporary ||
                            this._document
                                .getEditor()
                                .commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPolygonProperties", "action.change-polygon-size")));
                    }
                }
            }),
            (GPolygonProperties.prototype.toString = function () {
                return "[Object GPolygonProperties]";
            }),
            (module.exports = GPolygonProperties));
    };
