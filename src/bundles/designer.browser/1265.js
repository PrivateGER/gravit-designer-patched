module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(3), require(4), require(13));
        var GObject = require(1),
            GProperties = require(123);
        require(173);
        function GEllipseProperties() {
            this._ellipses = [];
        }
        (GObject.GObject.inherit(GEllipseProperties, GProperties),
            (GEllipseProperties.prototype._panel = null),
            (GEllipseProperties.prototype._document = null),
            (GEllipseProperties.prototype._ellipses = null),
            (GEllipseProperties.prototype.init = function (panelElement) {
                this._panel = panelElement;
                var createPropertyControl = function (propertyName) {
                    var self = this;
                    if (0 === propertyName.indexOf("etp-")) {
                        var iconClass = "",
                            shapeType = parseInt(propertyName.substr("etp-".length));
                        switch (shapeType) {
                            case GObject.GEllipse.Type.Pie:
                                iconClass = "gravit-icon-circle-pie";
                                break;
                            case GObject.GEllipse.Type.Chord:
                                iconClass = "gravit-icon-ellipse-chord";
                                break;
                            case GObject.GEllipse.Type.Arc:
                                iconClass = "gravit-icon-ellipse-arc";
                                break;
                            default:
                                throw new Error("");
                        }
                        return $("<div></div>")
                            .attr("data-property", propertyName)
                            .addClass("g-button g-icon")
                            .on("click", function () {
                                (gDesigner.stats("ellipse_change_type", shapeType),
                                    self._assignProperty(
                                        "etp",
                                        shapeType,
                                        GObject.GLocale.get(new GObject.GLocaleKey("GEllipseProperties", "action.change-shape"))
                                    ),
                                    shapeType === GObject.GEllipse.Type.Arc && self._setBorderAlignmentCenter());
                            })
                            .append($("<span></span>").addClass(iconClass));
                    }
                    if ("sa" === propertyName || "ea" === propertyName)
                        return $("<input>")
                            .attr("type", "text")
                            .attr("data-property", propertyName)
                            .on("change", function () {
                                gDesigner.stats("ellipse_change_angle");
                                var angleValue = GObject.GLength.parseEquationValue($(this).gInputBox("value"));
                                null !== angleValue
                                    ? ((angleValue = GObject.GMath.normalizeAngleRadians(GObject.GMath.toRadians(angleValue))),
                                      self._assignProperty(
                                          propertyName,
                                          GObject.GMath.PI2 - angleValue,
                                          GObject.GLocale.get(new GObject.GLocaleKey("GEllipseProperties", "action.change-angle"))
                                      ))
                                    : self._updateProperties();
                            })
                            .gInputBox();
                    throw new Error("Unknown input property: " + propertyName);
                }.bind(this);
                ($("<div></div>")
                    .addClass("ellipse-angles-property")
                    .gPropertyRow({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.angles")),
                        columns: [
                            { width: "50%", content: createPropertyControl("sa") },
                            { width: "50%", content: createPropertyControl("ea") },
                        ],
                    })
                    .appendTo(panelElement),
                    $("<div></div>")
                        .addClass("ellipse-shape-property")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GEllipseProperties", "text.shape")),
                            columns: [
                                {
                                    width: "33.3%",
                                    clazz: "shape-type-chooser shape-arc",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GEllipse", "type.arc")),
                                    content: createPropertyControl("etp-" + GObject.GEllipse.Type.Arc),
                                },
                                {
                                    width: "33.3%",
                                    clazz: "shape-type-chooser shape-chord",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GEllipse", "type.chord")),
                                    content: createPropertyControl("etp-" + GObject.GEllipse.Type.Chord),
                                },
                                {
                                    width: "33.3%",
                                    clazz: "shape-type-chooser shape-pie",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GEllipse", "type.pie")),
                                    content: createPropertyControl("etp-" + GObject.GEllipse.Type.Pie),
                                },
                            ],
                        })
                        .appendTo(panelElement));
            }),
            (GEllipseProperties.prototype.update = function (document, elements) {
                if (
                    (this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        (this._document = null)),
                    (this._ellipses = []),
                    document)
                ) {
                    for (var n = 0; n < elements.length; ++n) elements[n] instanceof GObject.GEllipse && this._ellipses.push(elements[n]);
                    if (this._ellipses.length && this._ellipses.length === elements.length)
                        return (
                            (this._document = document),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._updateProperties(),
                            true
                        );
                }
                return false;
            }),
            (GEllipseProperties.prototype._afterPropertiesChange = function (event) {
                !event.temporary && this._ellipses.length > 0 && this._ellipses[0] === event.node && this._updateProperties();
            }),
            (GEllipseProperties.prototype._setBorderAlignmentCenter = function () {
                var borderLayers,
                    borderLayer,
                    propertyNames = ["_ba"],
                    propertyValues = [GObject.GStylable.BorderAlignment.Center],
                    editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var r = 0, s = this._ellipses.length; r < s; ++r) {
                        borderLayers = this._ellipses[r].getPaintLayers().getBorderLayers();
                        for (var l = 0, c = borderLayers.length; l < c; l++)
                            (borderLayer = borderLayers[l]) instanceof GObject.GStylable.BorderPaintLayer && borderLayer.setProperties(propertyNames, propertyValues);
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GEllipseProperties", "text.ellipse-to-center")));
                }
            }),
            (GEllipseProperties.prototype._updateProperties = function () {
                var ellipse = this._ellipses[0];
                (this._panel.find('[data-property^="etp"]').each(function (index, element) {
                    var itemElement = $(element),
                        itemShapeType = itemElement.attr("data-property").substr("etp-".length);
                    itemElement.toggleClass("g-active", ellipse.getProperty("etp").toString() === itemShapeType);
                }),
                    this._panel
                        .find('input[data-property="sa"]')
                        .val(GObject.GUtil.formatNumber(GObject.GMath.toDegrees(GObject.GMath.PI2 - ellipse.getProperty("sa")), 2)),
                    this._panel
                        .find('input[data-property="ea"]')
                        .val(GObject.GUtil.formatNumber(GObject.GMath.toDegrees(GObject.GMath.PI2 - ellipse.getProperty("ea")), 2)));
            }),
            (GEllipseProperties.prototype._assignProperty = function (propertyName, value, description) {
                this._assignProperties([propertyName], [value], description);
            }),
            (GEllipseProperties.prototype._assignProperties = function (propertyNames, values, description) {
                var editor = this._document.getEditor();
                editor.beginTransaction();
                try {
                    for (var i = 0; i < this._ellipses.length; ++i) this._ellipses[i].setProperties(propertyNames, values);
                } finally {
                    editor.commitTransaction(description);
                }
            }),
            (GEllipseProperties.prototype.toString = function () {
                return "[Object GEllipseProperties]";
            }),
            (module.exports = GEllipseProperties));
    };
