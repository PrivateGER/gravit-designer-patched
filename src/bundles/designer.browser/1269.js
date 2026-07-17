module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(13), require(32), require(33));
        var GObject = require(1),
            GEditorModule = require(53),
            uiConstants = require(357),
            GRichTooltipConfig = require(67),
            PanelBase = require(123),
            settingsChangeEvent = (require(173), require(135));
        function GPathProperties() {
            this._pathes = [];
        }
        (GObject.GObject.inherit(GPathProperties, PanelBase),
            (GPathProperties.prototype._panel = null),
            (GPathProperties.prototype._document = null),
            (GPathProperties.prototype._pathes = null),
            (GPathProperties.prototype._points = null),
            (GPathProperties.prototype.init = function (panel, t) {
                this._panel = panel;
                const applyNodeType = (event) => {
                    const nodeType = this._getTargetNodeType($(event.target));
                    this.assignNodeType(nodeType);
                };
                var createPropertyInput = function (propertyKey) {
                    var self = this;
                    if ("x" === propertyKey || "y" === propertyKey)
                        return $("<div/>")
                            .append(
                                $("<input>")
                                    .attr("type", "text")
                                    .attr("data-point-property", propertyKey)
                                    .on("change", function (n) {
                                        var value = self._document.getScene().stringToPoint($(this).val());
                                        ("x" === propertyKey
                                            ? gDesigner.stats("pathproperties_modify_x")
                                            : gDesigner.stats("pathproperties_modify_y"),
                                            null !== value && "number" == typeof value ? self._assignPointProperty(propertyKey, value) : self._updatePointProperties());
                                    })
                                    .gInputBox()
                            )
                            .gInputLabel({ label: propertyKey });
                    if ("tp" === propertyKey)
                        return $("<select></select>")
                            .attr("data-point-property", propertyKey)
                            .append(
                                $("<option></option>")
                                    .attr("value", "-")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPathProperties", "text.straight")))
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", GObject.GPathBase.AnchorPoint.Type.Mirror)
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "anchor-point.mirror")))
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", GObject.GPathBase.AnchorPoint.Type.Asymmetric)
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "anchor-point.asymmetric")))
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", GObject.GPathBase.AnchorPoint.Type.Symmetric)
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "anchor-point.symmetric")))
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", GObject.GPathBase.AnchorPoint.Type.Connector)
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "anchor-point.connector")))
                            )
                            .on("change", function (event) {
                                applyNodeType(event);
                            });
                    if ("ctp" === propertyKey)
                        return $("<span></span>")
                            .addClass("clickable")
                            .addClass("g-button")
                            .addClass("corner-type")
                            .attr("data-point-property", propertyKey)
                            .gCornerTypePicker()
                            .on("cornertypechange", function (e, cornerType) {
                                self._assignPointProperty("tp", cornerType);
                            });
                    if ("cu" === propertyKey)
                        return $("<button></button>")
                            .addClass("g-flat")
                            .attr("data-point-property", propertyKey)
                            .on("click", function () {
                                (gDesigner.stats("pathproperties_modify_uniform"),
                                    self._assignPointProperty(propertyKey, !$(this).hasClass("g-active")),
                                    self._updatePointProperties());
                            })
                            .append($("<span></span>").addClass("gravit-icon-lock").css("font-size", "10px"));
                    if ("cl-slider" === propertyKey)
                        return $("<div/>")
                            .attr("data-point-property", "cl")
                            .gInputSlider({
                                min: 0,
                                max: 100,
                                richTooltipConfig: GRichTooltipConfig.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.corner-radius-slider-tooltip-title")),
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
                                for (
                                    var value = self._document.getScene().stringToPoint($(this).gInputSlider("value")), n = 0;
                                    n < self._points.length;
                                    ++n
                                )
                                    self._points[n].setProperty("cl", value, false, false, true);
                                self._panel
                                    .find('[type="text"][data-point-property="cl"]')
                                    .gInputBox(
                                        "value",
                                        self._document.getScene().pointToString(value, self._document.getScene().getOptimalDecimalsCount())
                                    );
                            })
                            .on("change", function () {
                                var value = self._document.getScene().stringToPoint($(this).gInputSlider("value"));
                                (gDesigner.stats("pathproperties_modify_corner"), self._assignPointProperty("cl", value));
                            });
                    if ("cl-input" === propertyKey)
                        return $("<input>")
                            .attr("type", "text")
                            .attr("data-point-property", "cl")
                            .addClass("corner-radius")
                            .on("change", function () {
                                var value = self._document.getScene().stringToPoint($(this).val());
                                null !== value && "number" == typeof value && value >= 0
                                    ? (gDesigner.stats("pathproperties_modify_corner"), self._assignPointProperty("cl", value))
                                    : self._updatePointProperties();
                            })
                            .gInputBox({ minValue: 0 });
                    throw new Error("Unknown input property: " + propertyKey);
                }.bind(this);
                ($("<div></div>")
                    .attr("path-only", true)
                    .gPropertyRow({
                        columns: [
                            {
                                width: "40%",
                                content: $("<label></label>")
                                    .addClass("g-checkbox-label")
                                    .append(
                                        $("<input>")
                                            .addClass("closed-checkbox")
                                            .attr("type", "checkbox")
                                            .attr("data-path-property", "closed")
                                            .on(
                                                "change",
                                                function (event) {
                                                    ($(event.target).is(":checked") || this._setBorderAlignmentCenter(),
                                                        gDesigner.stats("pathproperties_modify_closed"),
                                                        this._assignPathProperty("closed", $(event.target).is(":checked")));
                                                }.bind(this)
                                            )
                                    )
                                    .append($("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GPathProperties", "text.closed")))),
                            },
                            {
                                width: "60%",
                                content: $("<label></label>")
                                    .addClass("g-checkbox-label")
                                    .append(
                                        $("<input>")
                                            .addClass("csc-checkbox")
                                            .attr("type", "checkbox")
                                            .attr("data-path-property", "csc")
                                            .on(
                                                "change",
                                                function (event) {
                                                    (gDesigner.stats("pathproperties_modify_autoscale"),
                                                        this._assignPathProperty("csc", $(event.target).is(":checked")));
                                                }.bind(this)
                                            )
                                    )
                                    .append(
                                        $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.autoscale-corners")))
                                    ),
                            },
                        ],
                    })
                    .appendTo(this._panel),
                    $("<div></div>")
                        .addClass("position-row")
                        .attr("point-only", true)
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.position")),
                            columns: [
                                { width: "32%", content: createPropertyInput("x") },
                                { width: "32%", content: createPropertyInput("y") },
                                { width: "auto", content: createPropertyInput("tp") },
                            ],
                        })
                        .appendTo(panel),
                    $("<div></div>")
                        .addClass(uiConstants.PATHPROPERTIES.PATH_JOIN_CLASS)
                        .addClass("joint-row")
                        .attr("point-only", true)
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GPathProperties", "text.joint")),
                            columns: [
                                {
                                    width: "25%",
                                    padding: false,
                                    content: $("<button></button>")
                                        .addClass("g-button")
                                        .css({
                                            borderRadius: "0px",
                                            borderTopLeftRadius: "3px",
                                            borderBottomLeftRadius: "3px",
                                        })
                                        .attr("data-node-type", "-")
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPathProperties", "text.straight")))
                                        .append($("<span></span>").addClass("gravit-icon-node-straight"))
                                        .on("click", applyNodeType),
                                },
                                {
                                    width: "25%",
                                    padding: false,
                                    content: $("<button></button>")
                                        .addClass("g-button")
                                        .css({ borderRadius: "0px" })
                                        .attr("data-node-type", GObject.GPathBase.AnchorPoint.Type.Mirror)
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "anchor-point.mirror")))
                                        .append($("<span></span>").addClass("gravit-icon-node-mirrored"))
                                        .on("click", applyNodeType),
                                },
                                {
                                    width: "25%",
                                    padding: false,
                                    content: $("<button></button>")
                                        .addClass("g-button")
                                        .css({ borderRadius: "0px" })
                                        .attr("data-node-type", GObject.GPathBase.AnchorPoint.Type.Asymmetric)
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "anchor-point.asymmetric")))
                                        .append($("<span></span>").addClass("gravit-icon-node-disconnected"))
                                        .on("click", applyNodeType),
                                },
                                {
                                    width: "25%",
                                    padding: false,
                                    content: $("<button></button>")
                                        .addClass("g-button")
                                        .css({
                                            borderRadius: "0px",
                                            borderTopRightRadius: "3px",
                                            borderBottomRightRadius: "3px",
                                        })
                                        .attr("data-node-type", GObject.GPathBase.AnchorPoint.Type.Symmetric)
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPathBase", "anchor-point.symmetric")))
                                        .append($("<span></span>").addClass("gravit-icon-node-assymetric"))
                                        .on("click", applyNodeType),
                                },
                            ],
                        })
                        .addClass("joint")
                        .appendTo(this._panel),
                    $("<hr/>").attr("point-only", true).attr("corner-only", true).appendTo(panel),
                    $("<div></div>")
                        .attr("point-only", true)
                        .attr("corner-only", true)
                        .addClass("path-corner-chooser")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.corner")),
                            columns: [
                                { width: "auto", content: createPropertyInput("cl-slider") },
                                { clazz: "corners-radius-no-padding" },
                                { width: "35px", content: createPropertyInput("cl-input") },
                                { width: "3x" },
                                { width: "40px", content: createPropertyInput("ctp") },
                            ],
                        })
                        .addClass("corner-radius")
                        .appendTo(this._panel));
            }),
            (GPathProperties.prototype.update = function (document, elements) {
                if (
                    (gDesigner.isTouchEnabled()
                        ? (this._panel.find(".closed-checkbox").gCheckboxSlider(), this._panel.find(".csc-checkbox").gCheckboxSlider())
                        : (this._panel.find(".closed-checkbox").gCheckboxSlider("unmount"),
                          this._panel.find(".csc-checkbox").gCheckboxSlider("unmount")),
                    this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        this._document.getScene().removeEventListener(GObject.GElement.AfterFlagChangeEvent, this._afterFlagChange),
                        this._document.getEditor().removeEventListener(GEditorModule.GEditor.EdGeometryChangeEvent, this._edGeometryChange, this),
                        gDesigner.removeEventListener(settingsChangeEvent, this._settingChanged),
                        (this._document = null)),
                    (this._pathes = []),
                    (this._points = []),
                    document)
                ) {
                    for (var n = 0; n < elements.length; ++n)
                        if (elements[n] instanceof GObject.GPath || elements[n] instanceof GObject.GCompoundPath) {
                            var a = elements[n];
                            this._pathes.push(a);
                            var r = function (path) {
                                for (var point = path.getAnchorPoints().getFirstChild(); null !== point; point = point.getNext())
                                    point.hasFlag(GObject.GNode.Flag.Selected) &&
                                        (this._points.push(point), 1 == this._points.legth && (this._mainPath = path));
                            }.bind(this);
                            if (a instanceof GObject.GPath) r(a);
                            else for (var s = a.getPaths().getFirstChild(); null !== s; s = s.getNext()) r(s);
                        }
                    if (this._pathes.length && this._pathes.length === elements.length)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._document.getScene().addEventListener(GObject.GElement.AfterFlagChangeEvent, this._afterFlagChange, this),
                            this._document.getEditor().addEventListener(GEditorModule.GEditor.EdGeometryChangeEvent, this._edGeometryChange, this),
                            gDesigner.addEventListener(settingsChangeEvent, this._settingChanged, this),
                            this._updatePathProperties(),
                            this._updatePointProperties(),
                            true
                        );
                }
                return false;
            }),
            (GPathProperties.prototype._getTargetNodeType = function (element) {
                return element.is("select") ? element.val() : element.closest("[data-node-type]").attr("data-node-type");
            }),
            (GPathProperties.prototype._getStatsNodeType = function (nodeType) {
                switch (nodeType) {
                    case GObject.GPathBase.AnchorPoint.Type.Mirror:
                        return "Mirror";
                    case GObject.GPathBase.AnchorPoint.Type.Asymmetric:
                        return "Asymmetric";
                    case GObject.GPathBase.AnchorPoint.Type.Symmetric:
                        return "Symmetric";
                    case GObject.GPathBase.AnchorPoint.Type.Connector:
                        return "Connector";
                    default:
                        return "Straight";
                }
            }),
            (GPathProperties.prototype.assignNodeType = function () {
                let nodeType = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "-";
                gDesigner.stats("pathproperties_assign_nodetype", this._getStatsNodeType(nodeType));
                const document = this._document,
                    editor = document && document.getEditor();
                if (editor) {
                    editor.beginTransaction();
                    try {
                        let propertyNames = null,
                            propertyValues = null;
                        ("-" === nodeType &&
                            ((propertyNames = ["tp", "hlx", "hly", "hrx", "hry", "ah"]),
                            (propertyValues = [GObject.GPathBase.CornerType.Rounded, null, null, null, null, false])),
                            this._points.forEach((point) => {
                                if (
                                    "-" !== nodeType &&
                                    ((propertyNames = ["ah", "tp"]), (propertyValues = [false, nodeType]), null === point.getProperty("hlx") && null === point.getProperty("hrx"))
                                ) {
                                    const previousPoint = point.getParent().getPreviousPoint(point),
                                        previousHandleX = previousPoint ? previousPoint.getProperty("hrx") : null,
                                        nextPoint = point.getParent().getNextPoint(point),
                                        nextHandleX = nextPoint ? nextPoint.getProperty("hlx") : null;
                                    if (nodeType != GObject.GPathBase.AnchorPoint.Type.Asymmetric || null !== previousHandleX || null !== nextHandleX) propertyValues[0] = true;
                                    else {
                                        const pointX = point.getProperty("x"),
                                            pointY = point.getProperty("y");
                                        if (previousPoint && previousPoint.getProperty("tp") != GObject.GPathBase.AnchorPoint.Type.Connector) {
                                            const previousPointX = previousPoint.getProperty("x"),
                                                previousPointY = previousPoint.getProperty("y");
                                            if (!GObject.GMath.isEqualEps(pointX, previousPointX) || !GObject.GMath.isEqualEps(pointY, previousPointY)) {
                                                const handleLX = pointX + (previousPointX - pointX) * GObject.GPathBase.AnchorPoint.HANDLE_COEFF,
                                                    handleLY = pointY + (previousPointY - pointY) * GObject.GPathBase.AnchorPoint.HANDLE_COEFF;
                                                (propertyNames.push("hlx"), propertyNames.push("hly"), propertyValues.push(handleLX), propertyValues.push(handleLY));
                                            }
                                        }
                                        if (nextPoint && nextPoint.getProperty("tp") != GObject.GPathBase.AnchorPoint.Type.Connector) {
                                            const nextPointX = nextPoint.getProperty("x"),
                                                nextPointY = nextPoint.getProperty("y");
                                            if (!GObject.GMath.isEqualEps(pointX, nextPointX) || !GObject.GMath.isEqualEps(pointY, nextPointY)) {
                                                const handleRX = pointX + (nextPointX - pointX) * GObject.GPathBase.AnchorPoint.HANDLE_COEFF,
                                                    handleRY = pointY + (nextPointY - pointY) * GObject.GPathBase.AnchorPoint.HANDLE_COEFF;
                                                (propertyNames.push("hrx"), propertyNames.push("hry"), propertyValues.push(handleRX), propertyValues.push(handleRY));
                                            }
                                        }
                                    }
                                }
                                point.setProperties(propertyNames, propertyValues);
                                let pointType = point.getProperty("tp");
                                const autoHandle = point.getProperty("ah");
                                pointType == GObject.GPathBase.AnchorPoint.Type.Mirror && autoHandle && point.setProperty("ah", false);
                            }));
                    } finally {
                        editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPathProperties", "action.modify-path-node-type")));
                    }
                }
            }),
            (GPathProperties.prototype._afterPropertiesChange = function (event) {
                event.temporary ||
                    (this._pathes.length > 0 && this._pathes[0] === event.node && this._updatePathProperties(),
                    this._points.length > 0 && this._points[0] === event.node && this._updatePointProperties());
            }),
            (GPathProperties.prototype._afterFlagChange = function (event) {
                if (event.flag === GObject.GNode.Flag.Selected && event.node instanceof GObject.GPathBase.AnchorPoint) {
                    var path = event.node.getParent() ? event.node.getParent().getParent() : null,
                        compoundPath = path && path.getParent() && path.getParent().getParent() ? path.getParent().getParent() : null;
                    ((path && this._pathes.indexOf(path) >= 0) || (compoundPath && this._pathes.indexOf(compoundPath) >= 0)) &&
                        (event.set ? this._points.push(event.node) : this._points.splice(this._points.indexOf(event.node), 1),
                        this._updatePathProperties(),
                        this._updatePointProperties());
                }
            }),
            (GPathProperties.prototype._edGeometryChange = function (e) {
                this._updatePointProperties();
            }),
            (GPathProperties.prototype._updatePathProperties = function () {
                if (this._points.length) this._panel.find("[path-only]").css("display", "none");
                else {
                    this._panel.find("[path-only]").css("display", "");
                    var path = this._pathes[0];
                    path instanceof GObject.GPath
                        ? (this._panel
                              .find('input[data-path-property="closed"]')
                              .prop("disabled", false)
                              .prop("checked", path.getProperty("closed")),
                          this._panel.find('input[data-path-property="csc"]').prop("disabled", false).prop("checked", !!path.getProperty("csc")))
                        : (this._panel.find('input[data-path-property="closed"]').prop("disabled", true).prop("checked", false),
                          this._panel.find('input[data-path-property="csc"]').prop("disabled", false).prop("checked", !!path.getProperty("csc")));
                }
            }),
            (GPathProperties.prototype._settingChanged = function (event) {
                "decimals_num" === event.key && this._updatePointProperties();
            }),
            (GPathProperties.prototype._updatePointProperties = function () {
                var point = this._points.length > 0 ? this._points[0] : null;
                if (point) {
                    this._panel.find("[point-only]").css("display", "");
                    var coord = this._getPointCoord(point);
                    (this._panel
                        .find('input[data-point-property="x"]')
                        .val(this._document.getScene().pointToString(coord.getX(), this._document.getScene().getOptimalDecimalsCount())),
                        this._panel
                            .find('input[data-point-property="y"]')
                            .val(this._document.getScene().pointToString(coord.getY(), this._document.getScene().getOptimalDecimalsCount())));
                    var isStraight = true,
                        tpValue = point.getProperty("tp");
                    for (var a in GObject.GPathBase.AnchorPoint.Type)
                        if (GObject.GPathBase.AnchorPoint.Type[a] === tpValue) {
                            isStraight = false;
                            break;
                        }
                    var effectiveType = isStraight ? "-" : tpValue;
                    (this._panel.find('select[data-point-property="tp"]').val(effectiveType),
                        this._panel.find("[data-node-type]").each(function (e, element) {
                            var button = $(element);
                            button.toggleClass("g-active", button.attr("data-node-type") === effectiveType);
                        }),
                        this._panel.find("[corner-only]").css("display", isStraight ? "" : "none"),
                        this._panel
                            .find('[data-point-property="ctp"]')
                            .css("display", isStraight ? "" : "none")
                            .gCornerTypePicker("value", isStraight ? tpValue : GObject.GPathBase.CornerType.Rounded),
                        this._panel
                            .find('div[data-point-property="cl"]')
                            .prop("disabled", !isStraight)
                            .gInputSlider(
                                "value",
                                this._document
                                    .getScene()
                                    .pointToString(point.getProperty("cl"), this._document.getScene().getOptimalDecimalsCount())
                            ),
                        this._panel
                            .find('input[data-point-property="cl"]')
                            .prop("disabled", !isStraight)
                            .val(
                                this._document
                                    .getScene()
                                    .pointToString(point.getProperty("cl"), this._document.getScene().getOptimalDecimalsCount())
                            ),
                        this._panel
                            .find('input[data-point-property="cr"]')
                            .prop("disabled", !isStraight || point.getProperty("cu"))
                            .val(
                                this._document
                                    .getScene()
                                    .pointToString(point.getProperty("cr"), this._document.getScene().getOptimalDecimalsCount())
                            ),
                        this._panel
                            .find('button[data-point-property="cu"]')
                            .prop("disabled", !isStraight)
                            .toggleClass("g-active", !!point.getProperty("cu")));
                } else this._panel.find("[point-only]").css("display", "none");
            }),
            (GPathProperties.prototype._getPointCoord = function (point) {
                var editor,
                    coord,
                    path = point.getPath();
                path && (editor = GEditorModule.GElementEditor.getEditor(path))
                    ? (editor.getPaintElement() != path && (point = editor.getPathPointPreview(point)), (coord = editor.getPointCoord(point)))
                    : (coord = new GObject.GPoint(point.getProperty("x"), point.getProperty("y")));
                return coord;
            }),
            (GPathProperties.prototype._transformPoint = function (point, transform, targetPoint) {
                transform && (targetPoint = transform.mapPoint(targetPoint));
                var path = point.getPath(),
                    editor = GEditorModule.GElementEditor.getEditor(path);
                editor ? editor.movePoint(point, targetPoint) : point.setProperties(["x", "y"], [targetPoint.getX(), targetPoint.getY()]);
            }),
            (GPathProperties.prototype._assignPathProperty = function (propertyName, propertyValue) {
                this._assignPathProperties([propertyName], [propertyValue]);
            }),
            (GPathProperties.prototype._assignPathProperties = function (propertyNames, propertyValues) {
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var i = 0; i < this._pathes.length; ++i) this._pathes[i].setProperties(propertyNames, propertyValues);
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPathProperties", "action.modify-path-properties")));
                }
            }),
            (GPathProperties.prototype._setBorderAlignmentCenter = function () {
                var borderLayers,
                    layer,
                    propertyNames = ["_ba"],
                    propertyValues = [GObject.GStylable.BorderAlignment.Center],
                    editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var r = 0, s = this._pathes.length; r < s; ++r) {
                        borderLayers = this._pathes[r].getPaintLayers().getBorderLayers();
                        for (var l = 0, c = borderLayers.length; l < c; l++)
                            (layer = borderLayers[l]) instanceof GObject.GStylable.BorderPaintLayer && layer.setProperties(propertyNames, propertyValues);
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPathProperties", "action.modify-path-properties")));
                }
            }),
            (GPathProperties.prototype._assignPointProperty = function (propertyName, propertyValue) {
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var i = 0; i < this._points.length; ++i) {
                        var a = this._points[i];
                        if ("x" === propertyName) {
                            var r = this._getPointCoord(a),
                                s = new GObject.GTransform(1, 0, 0, 1, propertyValue - r.getX(), 0);
                            this._transformPoint(a, s, r);
                        } else if ("y" === propertyName) {
                            ((r = this._getPointCoord(a)), (s = new GObject.GTransform(1, 0, 0, 1, 0, propertyValue - r.getY())));
                            this._transformPoint(a, s, r);
                        } else a.setProperties([propertyName], [propertyValue]);
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPathProperties", "action.modify-point-properties")));
                }
            }),
            (GPathProperties.prototype._assignPointProperties = function (propertyNames, propertyValues) {
                gDesigner.stats("pathproperties_modify_point-properties");
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var i = 0; i < this._points.length; ++i) this._points[i].setProperties(propertyNames, propertyValues);
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPathProperties", "action.modify-point-properties")));
                }
            }),
            (GPathProperties.prototype.toString = function () {
                return "[Object GPathProperties]";
            }),
            (module.exports = GPathProperties));
    };
