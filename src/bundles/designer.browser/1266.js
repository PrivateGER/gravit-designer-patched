module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(13));
        require(53);
        var GObject = require(1),
            ColorExtractor = (require(15 /* GPlatform */), require(1267 /* lib:color-thief */)),
            PropertyPanelBase = require(123),
            { replaceImage, setOriginSize, cropImage } = (require(173), require(219), require(1268 /* imageActions */));
        function GImagePropertiesPanel() {}
        (GObject.GObject.inherit(GImagePropertiesPanel, PropertyPanelBase),
            (GImagePropertiesPanel.prototype._panel = null),
            (GImagePropertiesPanel.prototype._document = null),
            (GImagePropertiesPanel.prototype._image = null),
            (GImagePropertiesPanel.prototype._controls = null),
            (GImagePropertiesPanel.prototype.init = function (panelElement, controlsElement) {
                ((this._panel = panelElement),
                    (this._controls = controlsElement),
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
                                            (replaceImage(this._image, this._document), gDesigner.stats("image_replace_image"));
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
                                            (setOriginSize(this._image), gDesigner.stats("image_reset_size"));
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
                                            var cropButton = panelElement.find('button[data-action="handle-crop"]');
                                            (cropImage(this._image, cropButton.data("no-crop")), gDesigner.stats("image_change_croptype"));
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
                        .appendTo(panelElement),
                    $("<div></div>").attr("data-image-palette", "palette").css({ height: "27px", margin: "5px 10px 0 10px" }).appendTo(panelElement));
            }),
            (GImagePropertiesPanel.prototype._updateImagePalette = function () {
                gDesigner.stats("image_update_palette");
                var imageElement = this._image.getImage() || this._image.getImageCanvas(),
                    paletteElement = this._panel.find('[data-image-palette="palette"]');
                paletteElement.empty();
                var addSwatch = function (color) {
                    $("<div></div>")
                        .gPatternTarget({ allowDrop: false })
                        .gPatternTarget("types", [GObject.GColor])
                        .gPatternTarget("value", color)
                        .css({
                            display: "inline-block",
                            height: "100%",
                            width: "12.5%",
                            background: GObject.GPattern.asCSSBackground(color),
                        })
                        .appendTo(paletteElement);
                }.bind(this);
                if (imageElement) {
                    (paletteElement.css("display", ""), this._panel.find('[data-image-palette="button"]').prop("disabled", true));
                    var colorExtractorInstance = new ColorExtractor(),
                        rawDominantColor = null;
                    try {
                        rawDominantColor = colorExtractorInstance.getColor(imageElement);
                    } catch (e) {
                        console.warn("Cannot extract image palette");
                    }
                    var dominantColor = rawDominantColor ? new GObject.GRGBColor(rawDominantColor) : GObject.GRGBColor.BLACK;
                    addSwatch(dominantColor);
                    var paletteColors = null;
                    try {
                        paletteColors = colorExtractorInstance.getPalette(imageElement, 16);
                    } catch (e) {
                        console.warn("Cannot extract image palette");
                    }
                    var c = 1;
                    if (paletteColors)
                        for (var d = 0; d < paletteColors.length; ++d) {
                            var u = new GObject.GRGBColor(paletteColors[d]);
                            if (!GObject.GUtil.equals(u, dominantColor) && (addSwatch(u), ++c >= 8)) break;
                        }
                }
            }),
            (GImagePropertiesPanel.prototype.update = function (editorDocument, nodes) {
                if (
                    (this._document &&
                        (this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        this._document.getScene().removeEventListener(GObject.GImage.StatusEvent, this._imageStatus, this),
                        this._document.getScene().removeEventListener(GObject.GImage.ConvertStatusEvent, this._imageConvertStatus, this),
                        (this._document = null)),
                    (this._image = null),
                    editorDocument)
                ) {
                    for (var n = 0; n < nodes.length; ++n)
                        if (nodes[n] instanceof GObject.GImage) {
                            if (this._image) {
                                this._image = null;
                                break;
                            }
                            this._image = nodes[n];
                        }
                    if (this._image)
                        return (
                            (this._document = editorDocument),
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
            (GImagePropertiesPanel.prototype._afterPropertiesChange = function (event) {
                !event.temporary && this._image && this._image === event.node && this._updateProperties();
            }),
            (GImagePropertiesPanel.prototype._imageStatus = function (event) {
                event.image !== this._image ||
                    (event.status !== GObject.GImage.ImageStatus.Error && event.status !== GObject.GImage.ImageStatus.Loaded) ||
                    this._updateProperties();
            }),
            (GImagePropertiesPanel.prototype._imageConvertStatus = function (event) {
                this._updateConvertStatus(event.status);
            }),
            (GImagePropertiesPanel.prototype._updateConvertStatus = function (status) {
                var statusText;
                switch (status) {
                    case GObject.GImage.ConvertStatus.Checking:
                        statusText = GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "text.check-profile")) + "...";
                        break;
                    case GObject.GImage.ConvertStatus.Converting:
                        statusText = GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", "text.loading-profile")) + "...";
                }
                (statusText && this._controls.find(".g-image-convert-status > span").text(statusText),
                    this._controls.find(".g-image-convert-status").css("display", statusText ? "" : "none"));
            }),
            (GImagePropertiesPanel.prototype._updateProperties = function () {
                (this._image.getProperty("url"), this._image.getStatus());
                var isReady = this._image.isReady(),
                    bbox = this._image.getGeometryBBox(),
                    bboxWidth = bbox ? bbox.getWidth() : 0,
                    bboxHeight = bbox ? bbox.getHeight() : 0,
                    imageWidth = this._image.getWidth(),
                    imageHeight = this._image.getHeight();
                if (gDesigner.getActiveDocument()) {
                    var hasSelectionDetail = gDesigner.getActiveDocument().getEditor().hasSelectionDetail();
                    (this._panel
                        .find('button[data-action="reset-size"]')
                        .prop("disabled", !isReady || (GObject.GMath.isEqualEps(imageWidth, bboxWidth) && GObject.GMath.isEqualEps(imageHeight, bboxHeight))),
                        this._panel.find('button[data-action="handle-crop"]').data("no-crop", hasSelectionDetail),
                        this._panel
                            .find(".crop-label")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", hasSelectionDetail ? "action.no-crop" : "action.crop"))),
                        this._panel.find('[data-image-palette="button"]').prop("disabled", !isReady).css("display", ""),
                        this._panel.find('[data-image-palette="palette"]').css("display", "none"),
                        this._updateConvertStatus(this._image.getConvertStatus()));
                }
            }),
            (GImagePropertiesPanel.prototype.toString = function () {
                return "[Object GImageProperties]";
            }),
            (module.exports = GImagePropertiesPanel));
    };
