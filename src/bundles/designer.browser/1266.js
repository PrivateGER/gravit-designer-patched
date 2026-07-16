module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(13));
        require(53);
        var GObject = require(1),
            i = (require(15 /* GPlatform */), require(1267)),
            a = require(123),
            { replaceImage: r, setOriginSize: s, cropImage: l } = (require(173), require(219), require(1268 /* GDocument */));
        function c() {}
        (GObject.GObject.inherit(c, a),
            (c.prototype._panel = null),
            (c.prototype._document = null),
            (c.prototype._image = null),
            (c.prototype._controls = null),
            (c.prototype.init = function (e, t) {
                ((this._panel = e),
                    (this._controls = t),
                    $("<div></div>")
                        .addClass("g-image-convert-status")
                        .css({ display: "none", "font-size": "8px" })
                        .append(
                            $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "text.checking-profile")) + "...")
                        )
                        .appendTo(this._controls),
                    $("<div></div>")
                        .addClass("image-button-row")
                        .gPropertyRow({
                            columns: [
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "action.replace")),
                                    width: "25%",
                                    content: $("<button></button>")
                                        .addClass("g-flat")
                                        .css("padding", "0")
                                        .append($("<span></span>").addClass("gravit-icon-replaceimg"))
                                        .on("click", () => {
                                            (r(this._image, this._document), gDesigner.stats("image_replace_image"));
                                        }),
                                },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "action.original-size")),
                                    width: "25%",
                                    content: $("<button></button>")
                                        .addClass("g-flat")
                                        .css("padding", "0")
                                        .attr("data-action", "reset-size")
                                        .append($("<span></span>").addClass("gravit-icon-expand"))
                                        .on("click", () => {
                                            (s(this._image), gDesigner.stats("image_reset_size"));
                                        }),
                                },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "action.no-crop")),
                                    labelClass: "crop-label",
                                    width: "25%",
                                    content: $("<button></button>")
                                        .attr("data-action", "handle-crop")
                                        .addClass("g-flat")
                                        .css("padding", "0")
                                        .append($("<span></span>").addClass("gravit-icon-crop"))
                                        .on("click", () => {
                                            var t = e.find('button[data-action="handle-crop"]');
                                            (l(this._image, t.data("no-crop")), gDesigner.stats("image_change_croptype"));
                                        }),
                                },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.colors")),
                                    width: "25%",
                                    content: $("<button></button>")
                                        .attr("data-image-palette", "button")
                                        .addClass("g-flat")
                                        .css("padding", "0")
                                        .append($("<span></span>").addClass("gravit-icon-extract-colors"))
                                        .on("click", this._updateImagePalette.bind(this)),
                                },
                            ],
                        })
                        .appendTo(e),
                    $("<div></div>").attr("data-image-palette", "palette").css({ height: "27px", margin: "5px 10px 0 10px" }).appendTo(e));
            }),
            (c.prototype._updateImagePalette = function () {
                gDesigner.stats("image_update_palette");
                var e = this._image.getImage() || this._image.getImageCanvas(),
                    t = this._panel.find('[data-image-palette="palette"]');
                t.empty();
                var n = function (e) {
                    $("<div></div>")
                        .gPatternTarget({ allowDrop: false })
                        .gPatternTarget("types", [GObject.GColor])
                        .gPatternTarget("value", e)
                        .css({
                            display: "inline-block",
                            height: "100%",
                            width: "12.5%",
                            background: GObject.GPattern.asCSSBackground(e),
                        })
                        .appendTo(t);
                }.bind(this);
                if (e) {
                    (t.css("display", ""), this._panel.find('[data-image-palette="button"]').prop("disabled", true));
                    var a = new i(),
                        r = null;
                    try {
                        r = a.getColor(e);
                    } catch (e) {
                        console.warn("Cannot extract image palette");
                    }
                    var s = r ? new GObject.GRGBColor(r) : GObject.GRGBColor.BLACK;
                    n(s);
                    var l = null;
                    try {
                        l = a.getPalette(e, 16);
                    } catch (e) {
                        console.warn("Cannot extract image palette");
                    }
                    var c = 1;
                    if (l)
                        for (var d = 0; d < l.length; ++d) {
                            var u = new GObject.GRGBColor(l[d]);
                            if (!GObject.GUtil.equals(u, s) && (n(u), ++c >= 8)) break;
                        }
                }
            }),
            (c.prototype.update = function (e, t) {
                if (
                    (this._document &&
                        (this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        this._document.getScene().removeEventListener(GObject.GImage.StatusEvent, this._imageStatus, this),
                        this._document.getScene().removeEventListener(GObject.GImage.ConvertStatusEvent, this._imageConvertStatus, this),
                        (this._document = null)),
                    (this._image = null),
                    e)
                ) {
                    for (var n = 0; n < t.length; ++n)
                        if (t[n] instanceof GObject.GImage) {
                            if (this._image) {
                                this._image = null;
                                break;
                            }
                            this._image = t[n];
                        }
                    if (this._image)
                        return (
                            (this._document = e),
                            this._document
                                .getScene()
                                .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                            this._document.getScene().addEventListener(GObject.GImage.StatusEvent, this._imageStatus, this),
                            this._document.getScene().addEventListener(GObject.GImage.ConvertStatusEvent, this._imageConvertStatus, this),
                            this._updateProperties(),
                            true
                        );
                }
                return (this._controls.find(".g-image-convert-status").css("display", "none"), false);
            }),
            (c.prototype._afterPropertiesChange = function (e) {
                !e.temporary && this._image && this._image === e.node && this._updateProperties();
            }),
            (c.prototype._imageStatus = function (e) {
                e.image !== this._image ||
                    (e.status !== GObject.GImage.ImageStatus.Error && e.status !== GObject.GImage.ImageStatus.Loaded) ||
                    this._updateProperties();
            }),
            (c.prototype._imageConvertStatus = function (e) {
                this._updateConvertStatus(e.status);
            }),
            (c.prototype._updateConvertStatus = function (e) {
                var t;
                switch (e) {
                    case GObject.GImage.ConvertStatus.Checking:
                        t = GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "text.check-profile")) + "...";
                        break;
                    case GObject.GImage.ConvertStatus.Converting:
                        t = GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "text.loading-profile")) + "...";
                }
                (t && this._controls.find(".g-image-convert-status > span").text(t),
                    this._controls.find(".g-image-convert-status").css("display", t ? "" : "none"));
            }),
            (c.prototype._updateProperties = function () {
                (this._image.getProperty("url"), this._image.getStatus());
                var e = this._image.isReady(),
                    t = this._image.getGeometryBBox(),
                    n = t ? t.getWidth() : 0,
                    i = t ? t.getHeight() : 0,
                    a = this._image.getWidth(),
                    r = this._image.getHeight();
                if (gDesigner.getActiveDocument()) {
                    var s = gDesigner.getActiveDocument().getEditor().hasSelectionDetail();
                    (this._panel
                        .find('button[data-action="reset-size"]')
                        .prop("disabled", !e || (GObject.GMath.isEqualEps(a, n) && GObject.GMath.isEqualEps(r, i))),
                        this._panel.find('button[data-action="handle-crop"]').data("no-crop", s),
                        this._panel
                            .find(".crop-label")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", s ? "action.no-crop" : "action.crop"))),
                        this._panel.find('[data-image-palette="button"]').prop("disabled", !e).css("display", ""),
                        this._panel.find('[data-image-palette="palette"]').css("display", "none"),
                        this._updateConvertStatus(this._image.getConvertStatus()));
                }
            }),
            (c.prototype.toString = function () {
                return "[Object GImageProperties]";
            }),
            (module.exports = c));
    };
