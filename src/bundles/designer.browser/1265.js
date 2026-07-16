module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(3), require(4), require(13));
        var GObject = require(1),
            i = require(123);
        require(173);
        function a() {
            this._ellipses = [];
        }
        (GObject.GObject.inherit(a, i),
            (a.prototype._panel = null),
            (a.prototype._document = null),
            (a.prototype._ellipses = null),
            (a.prototype.init = function (e) {
                this._panel = e;
                var t = function (e) {
                    var t = this;
                    if (0 === e.indexOf("etp-")) {
                        var n = "",
                            i = parseInt(e.substr("etp-".length));
                        switch (i) {
                            case GObject.GEllipse.Type.Pie:
                                n = "gravit-icon-circle-pie";
                                break;
                            case GObject.GEllipse.Type.Chord:
                                n = "gravit-icon-ellipse-chord";
                                break;
                            case GObject.GEllipse.Type.Arc:
                                n = "gravit-icon-ellipse-arc";
                                break;
                            default:
                                throw new Error("");
                        }
                        return $("<div></div>")
                            .attr("data-property", e)
                            .addClass("g-button g-icon")
                            .on("click", function () {
                                (gDesigner.stats("ellipse_change_type", i),
                                    t._assignProperty(
                                        "etp",
                                        i,
                                        GObject.GLocale.get(new GObject.GLocaleKey("GEllipseProperties", "action.change-shape"))
                                    ),
                                    i === GObject.GEllipse.Type.Arc && t._setBorderAlignmentCenter());
                            })
                            .append($("<span></span>").addClass(n));
                    }
                    if ("sa" === e || "ea" === e)
                        return $("<input>")
                            .attr("type", "text")
                            .attr("data-property", e)
                            .on("change", function () {
                                gDesigner.stats("ellipse_change_angle");
                                var n = GObject.GLength.parseEquationValue($(this).gInputBox("value"));
                                null !== n
                                    ? ((n = GObject.GMath.normalizeAngleRadians(GObject.GMath.toRadians(n))),
                                      t._assignProperty(
                                          e,
                                          GObject.GMath.PI2 - n,
                                          GObject.GLocale.get(new GObject.GLocaleKey("GEllipseProperties", "action.change-angle"))
                                      ))
                                    : t._updateProperties();
                            })
                            .gInputBox();
                    throw new Error("Unknown input property: " + e);
                }.bind(this);
                ($("<div></div>")
                    .addClass("ellipse-angles-property")
                    .gPropertyRow({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.angles")),
                        columns: [
                            { width: "50%", content: t("sa") },
                            { width: "50%", content: t("ea") },
                        ],
                    })
                    .appendTo(e),
                    $("<div></div>")
                        .addClass("ellipse-shape-property")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GEllipseProperties", "text.shape")),
                            columns: [
                                {
                                    width: "33.3%",
                                    clazz: "shape-type-chooser shape-arc",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GEllipse", "type.arc")),
                                    content: t("etp-" + GObject.GEllipse.Type.Arc),
                                },
                                {
                                    width: "33.3%",
                                    clazz: "shape-type-chooser shape-chord",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GEllipse", "type.chord")),
                                    content: t("etp-" + GObject.GEllipse.Type.Chord),
                                },
                                {
                                    width: "33.3%",
                                    clazz: "shape-type-chooser shape-pie",
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GEllipse", "type.pie")),
                                    content: t("etp-" + GObject.GEllipse.Type.Pie),
                                },
                            ],
                        })
                        .appendTo(e));
            }),
            (a.prototype.update = function (e, t) {
                if (
                    (this._document &&
                        (this._document.getScene().removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange),
                        (this._document = null)),
                    (this._ellipses = []),
                    e)
                ) {
                    for (var n = 0; n < t.length; ++n) t[n] instanceof GObject.GEllipse && this._ellipses.push(t[n]);
                    if (this._ellipses.length && this._ellipses.length === t.length)
                        return (
                            (this._document = e),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._updateProperties(),
                            true
                        );
                }
                return false;
            }),
            (a.prototype._afterPropertiesChange = function (e) {
                !e.temporary && this._ellipses.length > 0 && this._ellipses[0] === e.node && this._updateProperties();
            }),
            (a.prototype._setBorderAlignmentCenter = function () {
                var e,
                    t,
                    n = ["_ba"],
                    i = [GObject.GStylable.BorderAlignment.Center],
                    a = this._document.getEditor();
                a.beginTransaction();
                try {
                    for (var r = 0, s = this._ellipses.length; r < s; ++r) {
                        e = this._ellipses[r].getPaintLayers().getBorderLayers();
                        for (var l = 0, c = e.length; l < c; l++)
                            (t = e[l]) instanceof GObject.GStylable.BorderPaintLayer && t.setProperties(n, i);
                    }
                } finally {
                    a.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GEllipseProperties", "text.ellipse-to-center")));
                }
            }),
            (a.prototype._updateProperties = function () {
                var e = this._ellipses[0];
                (this._panel.find('[data-property^="etp"]').each(function (t, n) {
                    var o = $(n),
                        i = o.attr("data-property").substr("etp-".length);
                    o.toggleClass("g-active", e.getProperty("etp").toString() === i);
                }),
                    this._panel
                        .find('input[data-property="sa"]')
                        .val(GObject.GUtil.formatNumber(GObject.GMath.toDegrees(GObject.GMath.PI2 - e.getProperty("sa")), 2)),
                    this._panel
                        .find('input[data-property="ea"]')
                        .val(GObject.GUtil.formatNumber(GObject.GMath.toDegrees(GObject.GMath.PI2 - e.getProperty("ea")), 2)));
            }),
            (a.prototype._assignProperty = function (e, t, n) {
                this._assignProperties([e], [t], n);
            }),
            (a.prototype._assignProperties = function (e, t, n) {
                var o = this._document.getEditor();
                o.beginTransaction();
                try {
                    for (var i = 0; i < this._ellipses.length; ++i) this._ellipses[i].setProperties(e, t);
                } finally {
                    o.commitTransaction(n);
                }
            }),
            (a.prototype.toString = function () {
                return "[Object GEllipseProperties]";
            }),
            (module.exports = a));
    };
