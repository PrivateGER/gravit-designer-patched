module.exports = function (module, exports, require) {
        "use strict";
        (require(865 /* polyfill:Number */), require(193), require(57), require(3), require(4), require(13));
        var GEditor = require(53),
            GObject = require(1),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            GProperties = require(123),
            GSettingChangedEvent = (require(173), require(135));
        require(1162 /* GBorderPaintLayerProperties */);
        function GTransformProperties() {
            this._elements = [];
        }
        (GObject.GObject.inherit(GTransformProperties, GProperties),
            (GTransformProperties.prototype._panel = null),
            (GTransformProperties.prototype._copiesAndApply = null),
            (GTransformProperties.prototype._copiesAndApplyTouch = null),
            (GTransformProperties.prototype._document = null),
            (GTransformProperties.prototype._elements = null),
            (GTransformProperties.prototype.isGroup = function (otherProperties) {
                return false;
            }),
            (GTransformProperties.prototype._scaleKeepRatio = false),
            (GTransformProperties.prototype._preserveScaleX = 100),
            (GTransformProperties.prototype._preserveScaleY = 100),
            (GTransformProperties.prototype.init = function (panel, toolbar) {
                (toolbar.addClass("advanced-transform-toolbar"), (this._panel = panel.addClass("advanced-transform-properties")));
                var self = this;
                ((this._advancedTransformPanel = $("<div></div>").css("width", "180px").gOverlay({
                    releaseOnClose: false,
                    clazz: "g-overlay-advanced-transform",
                })),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "auto",
                                    content: $("<label></label>")
                                        .append(
                                            $("<input />")
                                                .attr("type", "checkbox")
                                                .attr("data-property", "_bs")
                                                .prop("checked", true)
                                                .on("change", function () {
                                                    (gDesigner.stats(
                                                        "transformproperties_toggle_autoscale-borders",
                                                        $(this).prop("checked") ? "enabled" : "disabled"
                                                    ),
                                                        self._setBorderScale($(this).prop("checked")));
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
                        .appendTo(this._advancedTransformPanel),
                    $("<div></div>")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "auto",
                                    content: $("<label></label>")
                                        .append(
                                            $("<input />")
                                                .attr("type", "checkbox")
                                                .attr("data-property", "esc")
                                                .prop("checked", true)
                                                .on("change", function () {
                                                    (gDesigner.stats(
                                                        "transformproperties_toggle_autoscale-corners",
                                                        $(this).prop("checked") ? "enabled" : "disabled"
                                                    ),
                                                        self._setCornersScale($(this).prop("checked")));
                                                })
                                        )
                                        .append(
                                            $("<span></span>").text(
                                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.autoscale-corners"))
                                            )
                                        ),
                                },
                            ],
                        })
                        .appendTo(this._advancedTransformPanel),
                    $("<label></label>")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "title")))
                        .appendTo(toolbar),
                    $("<button></button>")
                        .attr("data-action", "stroke-settings")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.advanced-transform-settings")))
                        .append($("<span></span>").addClass("gravit-icon-settings"))
                        .on(
                            "click",
                            function (event) {
                                (gDesigner.stats("transformproperties_open_advanced"),
                                    this._advancedTransformPanel.gOverlay("open", $(event.target).closest("button")));
                            }.bind(this)
                        )
                        .appendTo(toolbar));
                const moveTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.move-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.move-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/transform-panel/#moving-objects",
                    }),
                    scaleTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.scale-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.scale-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/transform-panel/#scaling-objects",
                    }),
                    rotateTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.rotate-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.rotate-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/transform-panel/#rotating-objects",
                    }),
                    reflectTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.rotate-axis-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.rotate-axis-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/transform-panel/#rotating-objects",
                    }),
                    skewTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.skew-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.skew-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/transform-panel/#skewing-objects",
                    }),
                    copiesTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.copies-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.copies-tooltip-description")),
                        middle: false,
                        learnMore: "/docs/basics/transform-panel/#transform-and-copy-objects",
                    }),
                    pivotTooltip = richTooltipModule.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.transdorm-origin-tooltip-title")),
                        description: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.transdorm-origin-tooltip-description")),
                        learnMore: "/docs/basics/transform-panel/#reference-point",
                    });
                ($("<div></div>")
                    .gPropertyRow({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.move")),
                        columns: [
                            {
                                width: "44%",
                                content: $("<div/>")
                                    .append(
                                        $("<input/>")
                                            .on("keydown", this._confirmEvent.bind(this))
                                            .on("change", (event) => gDesigner.stats("transformproperties_change_move-x"))
                                            .attr({ type: "text", "data-property": "move-x" })
                                            .gInputBox()
                                            .gInputBox("value", "0")
                                    )
                                    .gInputLabel({ label: "x" })
                                    .gRichTooltip(moveTooltip),
                            },
                            { width: "12%" },
                            {
                                width: "44%",
                                content: $("<div/>")
                                    .append(
                                        $("<input/>")
                                            .on("keydown", this._confirmEvent.bind(this))
                                            .on("change", (event) => gDesigner.stats("transformproperties_change_move-y"))
                                            .attr({ type: "text", "data-property": "move-y" })
                                            .gInputBox()
                                            .gInputBox("value", "0")
                                    )
                                    .gInputLabel({ label: "y" })
                                    .gRichTooltip(moveTooltip),
                            },
                        ],
                    })
                    .appendTo(this._panel),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.scale")),
                            columns: [
                                {
                                    width: "44%",
                                    content: $("<div/>")
                                        .append(
                                            $("<input/>")
                                                .attr({ type: "text", "data-property": "scale-x" })
                                                .on("change", (event) => {
                                                    gDesigner.stats("transformproperties_change_scale-x");
                                                    var scaleXValue = parseFloat($(event.target).gInputBox("value")) || 100;
                                                    if (this._scaleKeepRatio) {
                                                        var ratio = scaleXValue / this._preserveScaleX,
                                                            scaleYField = this._panel.find('[data-property="scale-y"]'),
                                                            scaleYValue = parseFloat(scaleYField.gInputBox("value")) || 100;
                                                        ((scaleYValue *= ratio), scaleYField.gInputBox("value", parseFloat(scaleYValue).toFixed(1)));
                                                    }
                                                    this._preserveScaleX = scaleXValue;
                                                })
                                                .gInputBox({ postfix: "%" })
                                                .gInputBox("value", "100")
                                        )
                                        .gInputLabel({
                                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "property-w"), "w"),
                                        })
                                        .gRichTooltip(scaleTooltip),
                                },
                                {
                                    width: "12%",
                                    content: $("<span></span>")
                                        .addClass("gravit-icon-unlinked transform-scale-link")
                                        .css("text-align", "center")
                                        .css("cursor", "pointer")
                                        .on("click", function (event) {
                                            var linkIcon = $(this);
                                            "yes" === linkIcon.attr("data-ratio")
                                                ? (linkIcon.attr("data-ratio", "no").attr("class", "gravit-icon-unlinked transform-scale-link"),
                                                  (self._scaleKeepRatio = false))
                                                : (linkIcon.attr("data-ratio", "yes").attr("class", "gravit-icon-linked transform-scale-link"),
                                                  (self._scaleKeepRatio = true));
                                        })
                                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "action.keep-ratio")))
                                        .attr("data-ratio", "no"),
                                },
                                {
                                    width: "44%",
                                    content: $("<div/>")
                                        .append(
                                            $("<input/>")
                                                .attr({ type: "text", "data-property": "scale-y" })
                                                .on("change", (event) => {
                                                    gDesigner.stats("transformproperties_change_scale-y");
                                                    var scaleYValue = parseFloat($(event.target).gInputBox("value")) || 100;
                                                    if (this._scaleKeepRatio) {
                                                        var ratio = scaleYValue / this._preserveScaleY,
                                                            scaleXField = this._panel.find('[data-property="scale-x"]'),
                                                            scaleXValue = parseFloat(scaleXField.gInputBox("value")) || 100;
                                                        ((scaleXValue *= ratio), scaleXField.gInputBox("value", parseFloat(scaleXValue).toFixed(1)));
                                                    }
                                                    this._preserveScaleY = scaleYValue;
                                                })
                                                .gInputBox({ postfix: "%" })
                                                .gInputBox("value", "100")
                                        )
                                        .gInputLabel({
                                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "property-h"), "h"),
                                        })
                                        .gRichTooltip(scaleTooltip),
                                },
                            ],
                        })
                        .appendTo(this._panel),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.rotate")),
                            columns: [
                                {
                                    width: "44%",
                                    content: $("<div/>")
                                        .append(
                                            $("<input/>")
                                                .attr({ type: "text", "data-property": "rotate" })
                                                .on("change", (event) => gDesigner.stats("transformproperties_change_rotate-up"))
                                                .gInputBox({ postfix: "°" })
                                                .gInputBox("value", "0")
                                        )
                                        .gInputLabel({ label: "&#x2191;" })
                                        .gRichTooltip(rotateTooltip),
                                },
                                { width: "12%" },
                                {
                                    width: "44%",
                                    content: $("<div/>")
                                        .append(
                                            $("<input/>")
                                                .attr({ type: "text", "data-property": "reflect" })
                                                .on("change", (event) => gDesigner.stats("transformproperties_change_rotate-down"))
                                                .gInputBox({ postfix: "°" })
                                                .gInputBox("value", "0")
                                        )
                                        .gInputLabel({ label: "&#x2193;" })
                                        .gRichTooltip(reflectTooltip),
                                },
                            ],
                        })
                        .appendTo(this._panel),
                    $("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.skew")),
                            columns: [
                                {
                                    width: "44%",
                                    content: $("<div/>")
                                        .append(
                                            $("<input/>")
                                                .attr({ type: "text", "data-property": "skew-x" })
                                                .on("change", (event) => gDesigner.stats("transformproperties_change_skew-x"))
                                                .gInputBox({ postfix: "°" })
                                                .gInputBox("value", "0")
                                        )
                                        .gInputLabel({ label: "X" })
                                        .gRichTooltip(skewTooltip),
                                },
                                { width: "12%" },
                                {
                                    width: "44%",
                                    content: $("<div/>")
                                        .append(
                                            $("<input/>")
                                                .attr({ type: "text", "data-property": "skew-y" })
                                                .on("change", (event) => gDesigner.stats("transformproperties_change_skew-y"))
                                                .gInputBox({ postfix: "°" })
                                                .gInputBox("value", "0")
                                        )
                                        .gInputLabel({ label: "Y" })
                                        .gRichTooltip(skewTooltip),
                                },
                            ],
                        })
                        .appendTo(this._panel),
                    $("<hr/>").appendTo(this._panel),
                    (this._copiesAndApply = $("<div/>").addClass("copies-apply").appendTo(this._panel)),
                    (this._copiesAndApplyTouch = $("<div/>").addClass("copies-apply-touch").appendTo(this._panel)));
                (((container) => {
                    ($("<div></div>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.copies")),
                            columns: [
                                {
                                    width: "44%",
                                    content: $("<input/>")
                                        .on("change", (event) => gDesigner.stats("transformproperties_change_copies"))
                                        .attr({ type: "text", "data-property": "copies" })
                                        .gInputBox()
                                        .gInputBox("value", "0")
                                        .gRichTooltip(copiesTooltip),
                                },
                                { width: "12%" },
                                {
                                    width: "44%",
                                    html: $("<div/>")
                                        .css("width", "100%")
                                        .css("display", "flex")
                                        .css("justify-content", "center")
                                        .append(
                                            $("<div></div>")
                                                .attr("data-property", "pivot")
                                                .css("align-self", "center")
                                                .gPivot()
                                                .gPivot("value", GObject.GRect.Side.CENTER)
                                        )
                                        .gRichTooltip(pivotTooltip),
                                },
                            ],
                        })
                        .appendTo(container),
                        $("<div></div>")
                            .gPropertyRow({
                                label: "",
                                columns: [
                                    {
                                        width: "100%",
                                        content: $("<button></button>")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.apply")))
                                            .addClass("transform-button")
                                            .css("margin-top", "5px")
                                            .on("click", this._applyTransformation.bind(this)),
                                    },
                                ],
                            })
                            .appendTo(container));
                })(this._copiesAndApply),
                    ((container) => {
                        var leftColumn = $("<div/>").addClass("left");
                        ($("<div></div>")
                            .gPropertyRow({
                                label: GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "text.copies")),
                                columns: [
                                    {
                                        width: "100px",
                                        content: $("<input/>")
                                            .on("change", (event) => gDesigner.stats("transformproperties_change_copies"))
                                            .attr({ type: "text", "data-property": "copies" })
                                            .gInputBox()
                                            .gInputBox("value", "0")
                                            .gRichTooltip(copiesTooltip),
                                    },
                                ],
                            })
                            .appendTo(leftColumn),
                            $("<div></div>")
                                .addClass("transform-apply")
                                .gPropertyRow({
                                    columns: [
                                        {
                                            width: "100%",
                                            content: $("<button></button>")
                                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GDimensionProperties", "text.transform-apply")))
                                                .addClass("transform-button")
                                                .on("click", this._applyTransformation.bind(this)),
                                        },
                                    ],
                                })
                                .appendTo(leftColumn),
                            leftColumn.appendTo(container),
                            $("<div></div>")
                                .addClass("right")
                                .append($("<div/>").attr("data-property", "pivot").gPivot().gPivot("value", GObject.GRect.Side.CENTER))
                                .appendTo(container));
                    })(this._copiesAndApplyTouch));
            }),
            (GTransformProperties.prototype.isAvailable = function (transformMode) {
                return true === transformMode;
            }),
            (GTransformProperties.prototype._enableTouchModal = function (touchEnabled) {
                touchEnabled
                    ? (this._copiesAndApplyTouch.css("display", "block"), this._copiesAndApply.css("display", "none"))
                    : (this._copiesAndApplyTouch.css("display", "none"), this._copiesAndApply.css("display", "block"));
            }),
            (GTransformProperties.prototype.update = function (document, elements) {
                if (
                    (this._document && (gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged), (this._document = null)),
                    this._enableTouchModal(gDesigner.isTouchEnabled()),
                    (this._elements = []),
                    document)
                ) {
                    for (var n = 0; n < elements.length; ++n)
                        !elements[n].hasMixin(GObject.GElement.Transform) || elements[n] instanceof GObject.GPage || this._elements.push(elements[n]);
                    if (this._elements.length && this._elements.length === elements.length)
                        return (
                            (this._document = document),
                            gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                            this._setBorderScale(this._getOwnBorderScale()),
                            this._setCornersScale(this._getOwnCornersScale()),
                            true
                        );
                }
                return false;
            }),
            (GTransformProperties.prototype._confirmEvent = function (event) {
                13 === event.keyCode && this._updateDisplayValues();
            }),
            (GTransformProperties.prototype._settingChanged = function (event) {
                "decimals_num" === event.key && this._updateDisplayValues();
            }),
            (GTransformProperties.prototype._updateDisplayValues = function () {
                this._document.getScene();
                var field = this._panel.find('[data-property="move-x"]'),
                    fieldValue = parseFloat(field.gInputBox("value"));
                ((fieldValue = isNaN(fieldValue) || fieldValue <= 0 || !fieldValue ? 0 : fieldValue),
                    field.gInputBox("value", GObject.GUtil.formatNumber(fieldValue, this._document.getScene().getOptimalDecimalsCount())),
                    (field = this._panel.find('[data-property="move-y"]')),
                    (fieldValue = parseFloat(field.gInputBox("value"))),
                    (fieldValue = isNaN(fieldValue) || fieldValue <= 0 || !fieldValue ? 0 : fieldValue),
                    field.gInputBox("value", GObject.GUtil.formatNumber(fieldValue, this._document.getScene().getOptimalDecimalsCount())));
            }),
            (GTransformProperties.prototype._applyTransformation = function () {
                gDesigner.stats("transformproperties_apply_transformation");
                var scene = this._document.getScene(),
                    copiesPanel = gDesigner.isTouchEnabled() ? this._copiesAndApplyTouch : this._copiesAndApply,
                    copiesCount = parseInt(copiesPanel.find('[data-property="copies"]').gInputBox("value")),
                    pivotSide = copiesPanel.find('[data-property="pivot"]').gPivot("value"),
                    moveX = scene.stringToPoint(this._panel.find('[data-property="move-x"]').gInputBox("value")) || 0,
                    moveY = scene.stringToPoint(this._panel.find('[data-property="move-y"]').gInputBox("value")) || 0,
                    scaleX = parseFloat(this._panel.find('[data-property="scale-x"]').gInputBox("value")) / 100 || 1,
                    scaleY = parseFloat(this._panel.find('[data-property="scale-y"]').gInputBox("value")) / 100 || 1,
                    rotateAngle = GObject.GMath.toRadians(parseFloat(this._panel.find('[data-property="rotate"]').gInputBox("value"))) || 0,
                    skewX = GObject.GMath.toRadians(parseFloat(this._panel.find('[data-property="skew-x"]').gInputBox("value"))) || 0,
                    skewY = GObject.GMath.toRadians(parseFloat(this._panel.find('[data-property="skew-y"]').gInputBox("value"))) || 0,
                    reflectAngle = parseFloat(parseFloat(this._panel.find('[data-property="reflect"]').gInputBox("value"))) || 0;
                reflectAngle = 0 !== reflectAngle ? GObject.GMath.toRadians(-reflectAngle) : reflectAngle;
                var applyTransformToElement = function (element, transform) {
                    var editor = GEditor.GElementEditor.openEditor(element);
                    editor ? (editor._setTransform(transform), editor.applyTransform(element, true, null, null)) : element.transform(element, true);
                };
                function applyCopyTransform(copyIndex, element, pivot) {
                    element.beginUpdate();
                    try {
                        if (
                            ((moveX || moveY) && applyTransformToElement(element, new GObject.GTransform(1, 0, 0, 1, moveX * copyIndex, moveY * copyIndex)),
                            (1 === scaleX && 1 === scaleY) ||
                                applyTransformToElement(
                                    element,
                                    new GObject.GTransform()
                                        .translated(-pivot.getX(), -pivot.getY())
                                        .scaled(scaleX + (scaleX - 1) * (copyIndex - 1), scaleY + (scaleY - 1) * (copyIndex - 1))
                                        .translated(pivot.getX(), pivot.getY())
                                ),
                            0 !== rotateAngle &&
                                applyTransformToElement(
                                    element,
                                    new GObject.GTransform()
                                        .translated(-pivot.getX(), -pivot.getY())
                                        .rotated(rotateAngle * copyIndex)
                                        .translated(pivot.getX(), pivot.getY())
                                ),
                            (0 !== skewX || 0 !== skewY) &&
                                skewX > -GObject.GMath.PIHALF &&
                                skewY > -GObject.GMath.PIHALF &&
                                skewX < GObject.GMath.PIHALF &&
                                skewY < GObject.GMath.PIHALF &&
                                applyTransformToElement(
                                    element,
                                    new GObject.GTransform()
                                        .translated(-pivot.getX(), -pivot.getY())
                                        .skewed(skewX * copyIndex, skewY * copyIndex)
                                        .translated(pivot.getX(), pivot.getY())
                                ),
                            0 !== reflectAngle)
                        ) {
                            var cosReflect = Math.cos(reflectAngle),
                                sinReflect = Math.sin(reflectAngle);
                            copyIndex % 2 &&
                                applyTransformToElement(
                                    element,
                                    new GObject.GTransform()
                                        .translated(-pivot.getX(), -pivot.getY())
                                        .multiplied(new GObject.GTransform(cosReflect, -sinReflect, sinReflect, cosReflect, 0, 0))
                                        .multiplied(new GObject.GTransform(1, 0, 0, -1, 0, 0))
                                        .multiplied(new GObject.GTransform(cosReflect, sinReflect, -sinReflect, cosReflect, 0, 0))
                                        .translated(pivot.getX(), pivot.getY())
                                );
                        }
                    } finally {
                        element.endUpdate();
                    }
                }
                GEditor.GEditor.tryRunTransaction(
                    scene,
                    function () {
                        for (var elementGroups = [], combinedBBox = null, elementBBox = null, r = 0; r < this._elements.length; ++r) {
                            var s = this._elements[r];
                            pivotSide && (elementBBox = s.getGeometryBBox()) && (combinedBBox = combinedBBox ? combinedBBox.united(elementBBox) : elementBBox);
                            var l = [s];
                            if (copiesCount > 0)
                                for (var c = s.getParent(), d = s.getNext() ? s.getNext() : null, u = 0; u < copiesCount; ++u) {
                                    var p = s.clone();
                                    (c.insertChild(p, d),
                                        u == copiesCount - 1 && (p.setFlag(GObject.GNode.Flag.Selected), s.removeFlag(GObject.GNode.Flag.Selected)),
                                        l.push(p));
                                }
                            elementGroups.push(l);
                        }
                        var pivotPoint = null;
                        if ((combinedBBox && !combinedBBox.isEmpty() && (pivotPoint = combinedBBox.getSide(pivotSide)), pivotPoint))
                            for (r = 0; r < elementGroups.length; ++r) {
                                if ((l = elementGroups[r]).length > 1) for (var h = 0; h < l.length; ++h) applyCopyTransform(h, l[h], pivotPoint);
                                else 1 == l.length && applyCopyTransform(1, l[0], pivotPoint);
                            }
                    }.bind(this),
                    GObject.GLocale.get(new GObject.GLocaleKey("GTransformProperties", "action.apply-transformation"))
                );
            }),
            (GTransformProperties.prototype._getOwnBorderScale = function () {
                return this._advancedTransformPanel.find('[data-property="_bs"]').prop("checked");
            }),
            (GTransformProperties.prototype._setBorderScale = function (enabled) {
                this._document &&
                    this._document
                        .getScene()
                        .setBorderScale(enabled && (void 0 === GEditor.GEditorOptions.scaleBorderWidth || GEditor.GEditorOptions.scaleBorderWidth));
            }),
            (GTransformProperties.prototype._getOwnCornersScale = function () {
                return this._advancedTransformPanel.find('[data-property="esc"]').prop("checked");
            }),
            (GTransformProperties.prototype._setCornersScale = function (enabled) {
                this._document &&
                    this._document
                        .getScene()
                        .setCornersScale(enabled && (void 0 === GEditor.GEditorOptions.scaleCorners || GEditor.GEditorOptions.scaleCorners));
            }),
            (GTransformProperties.prototype.toString = function () {
                return "[Object GTransformProperties]";
            }),
            (module.exports = GTransformProperties));
    };
