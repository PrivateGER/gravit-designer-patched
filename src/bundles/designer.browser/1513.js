module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(596 /* polyfill:Array */), require(30 /* polyfill:Object */), require(57), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(4), require(41), require(13), require(38), require(97), require(26));
        var GObject = require(1),
            GExportFormats = require(797),
            GPlatform = require(15),
            Utils = require(40),
            designerConfig = require(10),
            GMenu = require(238),
            GPosition = require(444),
            iconClasses = require(257),
            GExporter = require(1253);
        const GUnsupportedFeaturesDialog = require(1238);
        var GSystemDialog = require(44);
        const GFileTypes = require(389);
        var lastUsedSettings = {};
        function GExportDialog(document, options, actionId) {
            ((this._document = document),
                (this._options = options),
                (this._settings = GObject.GUtil.extend(
                    {
                        size: "1x",
                        format: "png",
                        jpegQuality: designerConfig.JPEG_EXPORT_QUALITY_DEFAULT,
                        backgroundColor: document ? document.getScene().getActivePage().getProperty("bck") : null,
                        backgroundOpacity: document ? document.getScene().getActivePage().getProperty("bop") : 1,
                        chooserColor: document ? document.getScene().getActivePage().getProperty("bck") : null,
                        chooserOpacity: document ? document.getScene().getActivePage().getProperty("bop") : 1,
                        convertTextToPath: false,
                        decimalPlacesPrecision: 3,
                        configuration: {
                            ignoreEffects: false,
                            forceEffectsWhenZoomed: true,
                            sceneBackground: true,
                            isOutline: function () {
                                return false;
                            },
                        },
                        preserveEditingCapabilities: false,
                        layerNamesAsId: GExportFormats.GSVGExport.DefaultOptions.layerNamesAsId,
                        downsampleImages: false,
                    },
                    this._options || lastUsedSettings
                )));
            var isUserFree = this._isUserFree();
            this.init(isUserFree, actionId);
        }
        (GObject.GObject.inherit(GExportDialog, GObject.GObject),
            (GExportDialog.prototype._warningSection = null),
            (GExportDialog.prototype._isUserFree = function () {
                var license = gDesigner.getLicense();
                return !license.isLegacy() && (license.isFree() || gDesigner.isAnonymous() || license.isExpired());
            }),
            (GExportDialog.prototype.init = function (isUserFree, actionId) {
                (this._settings.background || (this._settings.background = "page-background"),
                    (this._chooserElem = null),
                    (this._dialog = $("<div></div>")),
                    (this._setupContainer = $("<div></div>").addClass("setup-container").appendTo(this._dialog)),
                    (this._modeContainer = $("<div/>").addClass("mode-container").appendTo(this._setupContainer)));
                var modeIcon = function (mode, label, modeIcon) {
                    return $("<label/>")
                        .attr("data-mode", mode)
                        .append($("<span></span>").addClass("icon " + modeIcon))
                        .append($("<span></span>").addClass("name").text(label))
                        .on(
                            "click",
                            function (event) {
                                (gDesigner.stats("export_change_mode", mode),
                                    $(event.target).closest("label").hasClass("g-disabled") || this._setActiveMode(mode));
                            }.bind(this)
                        )
                        .appendTo(this._modeContainer);
                }.bind(this);
                (modeIcon("canvas", GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.canvas")), iconClasses["gravit-icon-display"]),
                    modeIcon("selection", GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.selection")), iconClasses["gravit-icon-cursor-filled"]),
                    modeIcon("assets", GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.assets")), "gravit-icon-layers"),
                    (this._settingsContainer = $("<div/>").addClass("settings-container").appendTo(this._setupContainer)));
                var settingControl = function (settingKey, label, settingControl, options) {
                        options = $.extend({ controlLeft: false, forbiddenForFree: true }, options);
                        var controlSpan = $("<span></span>").addClass("control").append(settingControl);
                        (isUserFree && options.forbiddenForFree
                            ? (controlSpan
                                  .find("*")
                                  .on(
                                      "mousedown",
                                      Utils.watchDog.trap(
                                          null,
                                          null,
                                          (event) => {
                                              (event.stopPropagation(),
                                                  event.stopImmediatePropagation(),
                                                  event.preventDefault(),
                                                  options.prostats && gDesigner.stats(options.prostats));
                                          },
                                          actionId
                                      )
                                  )
                                  .on(
                                      "click",
                                      Utils.watchDog.trap(
                                          null,
                                          null,
                                          (event) => {
                                              (event.stopPropagation(), event.stopImmediatePropagation(), event.preventDefault());
                                          },
                                          actionId
                                      )
                                  ),
                              controlSpan.find("*").each((index, domElement) => {
                                  ($._data(domElement, "events").click.reverse(), $._data(domElement, "events").mousedown.reverse());
                              }))
                            : options.pro &&
                              controlSpan
                                  .find("input")
                                  .gPro()
                                  .on(
                                      "click",
                                      Utils.watchDog.trap(null, null, (e) => options.prostats && gDesigner.stats(options.prostats))
                                  )
                                  .after($("<span></span>").gPro()),
                            options.controlLeft && controlSpan.addClass("control-left"),
                            "jpeg-quality" === settingKey &&
                                controlSpan.css("width", "55%").css("height", "100%").css("display", "flex").css("justify-content", "center"));
                        var row = $("<div></div>").attr("data-setting", settingKey);
                        return (
                            "" !== label && row.append($("<span></span>").addClass("label").text(label)),
                            row.append(controlSpan).appendTo(this._settingsContainer),
                            row
                        );
                    }.bind(this),
                    controlLeftOptions = { controlLeft: true };
                (settingControl(
                    "format",
                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.format")),
                    $("<select/>")
                        .on(
                            "change",
                            function (event) {
                                ((this._settings.format = $(event.target).val()),
                                    gDesigner.stats("export_change_documenttype", this._settings.format),
                                    "pdf" !== this._settings.format && (this._settings.configuration.ignoreEffects = false),
                                    ("pdf" != this._settings.format && "jpg" != this._settings.format) ||
                                        "no-background" != this._settings.background ||
                                        (this._settings.background = "page-background"),
                                    this._updateSettings(),
                                    this._updatePreview(),
                                    this._updateSizeMenu());
                            }.bind(this)
                        )
                        .append($("<option></option>").attr("value", "png").text("PNG"))
                        .append($("<option></option>").attr("value", "jpg").text("JPEG"))
                        .append($("<option></option>").attr("value", "svg").text("SVG"))
                        .append($("<option></option>").attr("value", "pdf").text("PDF")),
                    { forbiddenForFree: false }
                ),
                    settingControl(
                        "size",
                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.size")),
                        $("<div></div>")
                            .addClass("g-input-select")
                            .append(
                                $("<input/>")
                                    .attr("size", "6")
                                    .val(this._settings.size)
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats("export_change_size", $(event.target).val()),
                                                (this._settings.size = $(event.target).val()),
                                                this._updatePreview());
                                        }.bind(this)
                                    )
                            )
                            .append(
                                $("<button></button>").on(
                                    "click",
                                    function (event) {
                                        (gDesigner.stats("export_open_size-menu"),
                                            this._sizeMenu.open(
                                                event.target,
                                                GPosition.Position.Right_Bottom,
                                                GPosition.Position.Right_Bottom,
                                                function (item) {
                                                    $(event.target)
                                                        .closest("div")
                                                        .find("input")
                                                        .val(this._formatCaption(item.getCaption()))
                                                        .trigger("change")
                                                        .focus()
                                                        .select();
                                                }.bind(this)
                                            ));
                                    }.bind(this)
                                )
                            ),
                        { prostats: "export_nonprotriespro_size" }
                    ));
                const qualitySlider = $("<div />")
                        .gInputSlider({ min: 25, max: 100 })
                        .css("align-self", "center")
                        .gInputSlider("value", this._settings.jpegQuality)
                        .on(
                            "change",
                            function (event) {
                                gDesigner.stats("export_change_jpeg-quality");
                                var quality = parseInt($(event.target).gInputSlider("value"), 10);
                                ((this._settings.jpegQuality = quality), this._updatePreview(), qualityInput.gInputBox("value", quality));
                            }.bind(this)
                        ),
                    qualityInput = $("<input />")
                        .attr("type", "text")
                        .gInputBox({
                            minValue: 25,
                            maxValue: 100,
                            incrementValue: 1,
                            postfix: "%",
                        })
                        .gInputBox("value", this._settings.jpegQuality)
                        .on(
                            "change",
                            function (event) {
                                var quality = parseInt(qualityInput.gInputBox("value"), 10);
                                (quality > 100 ? (quality = 100) : quality < 25 && (quality = 25),
                                    qualitySlider.gInputSlider("value", quality),
                                    (this._settings.jpegQuality = quality),
                                    this._updatePreview());
                            }.bind(this)
                        );
                settingControl(
                    "jpeg-quality",
                    GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.jpeg-quality")),
                    $("<div/>").addClass("jpeg-quality").append(qualitySlider).append($("<label />").append(qualityInput)),
                    { prostats: "export_nonprotriespro_jpeg-quality" }
                );
                var backgroundSelector = $("<div/>")
                    .addClass("export-background-selector")
                    .append(
                        $("<select/>")
                            .on(
                                "change",
                                function (event) {
                                    (false & event.isTrigger && gDesigner.stats("export_change_background-pattern", $(event.target).val()),
                                        (this._settings.background = $(event.target).val()),
                                        $(event.target)
                                            .next(".export-background-pattern-chooser")
                                            .css("display", "custom-background" === this._settings.background ? "" : "none"),
                                        this._updateBackground(),
                                        this._updatePreview());
                                }.bind(this)
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", "page-background")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.page-background")))
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", "custom-background")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.custom-background")))
                            )
                            .append(
                                $("<option></option>")
                                    .attr("value", "no-background")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.no-background")))
                            )
                    )
                    .append(
                        $("<span></span>")
                            .css("display", "custom-background" === this._settings.background ? "" : "none")
                            .addClass("export-background-pattern-chooser")
                            .gPatternChooser({
                                noEyedropper: true,
                                types: [GObject.GColor],
                                hasOpacity: true,
                            })
                            .gPatternChooser("value", this._settings.chooserColor)
                            .on("chooseropen", function () {
                                this._chooserElem = $(this);
                            })
                            .on("chooserclose", function (e, t, n) {
                                this._chooserElem = null;
                            })
                            .on(
                                "patternchange",
                                function (e, color, opacity, o) {
                                    (color && ((this._settings.backgroundColor = color), (this._settings.chooserColor = color)),
                                        opacity
                                            ? ((this._settings.backgroundOpacity = opacity), (this._settings.chooserOpacity = opacity))
                                            : (this._settings.backgroundOpacity = this._document
                                                  ? this._document.getScene().getActivePage().getProperty("bop")
                                                  : 1),
                                        this._updateBackground(),
                                        this._updatePreview());
                                }.bind(this)
                            )
                    );
                (this._settings.chooserColor &&
                    backgroundSelector.find(".export-background-pattern-chooser").gPatternChooser("setPattern", this._settings.chooserColor),
                    this._settings.chooserOpacity &&
                        backgroundSelector.find(".export-background-pattern-chooser").gPatternChooser("opacity", this._settings.chooserOpacity),
                    settingControl("background-color", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.background-color")), backgroundSelector, {
                        prostats: "export_nonprotriespro_select-background",
                    }),
                    backgroundSelector.find('option[value="' + this._settings.background + '"]').prop("selected", true),
                    settingControl(
                        "color-space",
                        GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.color-mode")),
                        $("<select/>")
                            .on(
                                "change",
                                function (event) {
                                    (gDesigner.stats("export_change_colorspace", $(event.target).val()),
                                        (this._settings.colorSpace = $(event.target).val()));
                                }.bind(this)
                            )
                            .append($("<option/>").attr("value", "rgb").text("RGB"))
                            .append($("<option/>").attr("value", "cmyk").text("CMYK")),
                        { prostats: "export_nonprotriespro_color-space" }
                    ),
                    settingControl(
                        "ignore-effects",
                        "",
                        $("<label></label>")
                            .addClass("label")
                            .append(
                                $("<input/>")
                                    .attr("type", "checkbox")
                                    .prop("checked", true)
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats(
                                                "export_toggle_ignoreeffects",
                                                $(event.target).prop("checked") ? "enable" : "disable"
                                            ),
                                                (this._settings.configuration.ignoreEffects = !$(event.target).prop("checked")),
                                                this._updatePreview());
                                        }.bind(this)
                                    )
                            )
                            .append(
                                $("<span></span>").html("&nbsp;" + GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.with-effects")))
                            ),
                        Object.assign({}, controlLeftOptions, {
                            prostats: "export_nonprotriespro_ignore-effects",
                        })
                    ),
                    settingControl(
                        "decimal-places-precision",
                        GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.decimal-places-precision")),
                        $("<input/>")
                            .attr("type", "text")
                            .css("width", "63px")
                            .gInputBox({ minValue: 0, maxValue: 6 })
                            .gInputBox("value", this._settings.decimalPlacesPrecision)
                            .on(
                                "change",
                                function (event) {
                                    (gDesigner.stats("export_change_decimalprecision"),
                                        (this._settings.decimalPlacesPrecision = parseInt($(event.target).gInputBox("value"))));
                                }.bind(this)
                            ),
                        { pro: true, prostats: "export_nonprotriespro_decimalprecision" }
                    ),
                    settingControl(
                        "convert-text-to-path",
                        "",
                        $("<label></label>")
                            .addClass("label")
                            .append(
                                $("<input/>")
                                    .attr("type", "checkbox")
                                    .prop("checked", true)
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats(
                                                "export_toggle_convert-to-path",
                                                $(event.target).prop("checked") ? "enable" : "disable"
                                            ),
                                                (this._settings.convertTextToPath = $(event.target).prop("checked")));
                                        }.bind(this)
                                    )
                            )
                            .append(
                                $("<span></span>").html(
                                    "&nbsp;" + GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.export-as-curves"))
                                )
                            ),
                        Object.assign({}, controlLeftOptions, {
                            prostats: "export_nonprotriespro_convert-text-to-path",
                        })
                    ),
                    settingControl(
                        "export-all",
                        "",
                        $("<label></label>")
                            .addClass("label")
                            .append(
                                $("<input/>")
                                    .attr("type", "checkbox")
                                    .prop("checked", true)
                                    .on(
                                        "change",
                                        function (event) {
                                            gDesigner.stats("export_click_exportall");
                                            var checked = $(event.target).prop("checked");
                                            this._previewContainer.find(".item .preview-check input").each((e, input) => {
                                                ($(input).prop("checked", checked), this._updateStorageDestinationSetting());
                                            });
                                        }.bind(this)
                                    )
                            )
                            .append(
                                $("<span></span>").html("&nbsp;" + GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.export-all")))
                            ),
                        Object.assign({}, controlLeftOptions, {
                            prostats: "export_nonprotriespro_export-all",
                        })
                    ),
                    settingControl(
                        "layer-as-id",
                        "",
                        $("<label></label>")
                            .addClass("label")
                            .append(
                                $("<input/>")
                                    .attr("type", "checkbox")
                                    .prop("checked", this._settings.layerNamesAsId)
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats("export_click_layer-as-id"),
                                                (this._settings.layerNamesAsId = $(event.target).prop("checked")));
                                        }.bind(this)
                                    )
                            )
                            .append(
                                $("<span></span>").html("&nbsp;" + GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.layer-as-id")))
                            )
                            .append(
                                $("<div></div>")
                                    .addClass("description")
                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.layer-as-id-info")))
                            ),
                        Object.assign(controlLeftOptions, {
                            pro: true,
                            prostats: "export_nonprotriespro_layer-as-id",
                        })
                    ),
                    settingControl(
                        "export-preserve-editing-capabilities",
                        "",
                        $("<label></label>")
                            .addClass("label")
                            .append(
                                $("<input/>")
                                    .attr("type", "checkbox")
                                    .prop("checked", true)
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats(
                                                "export_toggle_preserve-svg-editing-capabilities",
                                                $(event.target).prop("checked") ? "enable" : "disable"
                                            ),
                                                (this._settings.preserveEditingCapabilities = $(event.target).prop("checked")));
                                        }.bind(this)
                                    )
                            )
                            .append(
                                $("<span></span>").html(
                                    "&nbsp;" + GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.preserve-svg-editing-capabilites"))
                                )
                            )
                            .append(
                                $("<div></div>")
                                    .addClass("description")
                                    .html(
                                        GObject.GLocale.get(
                                            new GObject.GLocaleKey("GExportDialog", "text.preserve-svg-editing-capabilites-description")
                                        )
                                    )
                            ),
                        Object.assign(controlLeftOptions, {
                            pro: true,
                            prostats: "export_nonprotriespro_preserve-svg-editing-capabilities",
                        })
                    ),
                    settingControl(
                        "do-not-downsample-images",
                        "",
                        $("<label></label>")
                            .addClass("label")
                            .append(
                                $("<input/>")
                                    .attr("type", "checkbox")
                                    .prop("checked", !this._settings.downsampleImages)
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats("export_toggle_do-not-downsample-images", $(event.target).prop("checked")),
                                                (this._settings.downsampleImages = !$(event.target).prop("checked")));
                                        }.bind(this)
                                    )
                            )
                            .append(
                                $("<span></span>").html(
                                    "&nbsp;" + GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.do-not-downsample-images"))
                                )
                            )
                            .append(
                                $("<div></div>")
                                    .addClass("description")
                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.do-not-downsample-images-info")))
                            ),
                        Object.assign({}, controlLeftOptions, { prostats: "do-not-downsample-images" })
                    ),
                    settingControl(
                        "storage-destination",
                        GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.export-to")),
                        $("<select/>").on("change", () => {
                            const destination = this._getSelectedStorageDestination();
                            destination && gDesigner.stats("export_change_output", destination.stats);
                        })
                    ),
                    (this._previewContainer = $("<div></div>").addClass("preview-container").appendTo(this._dialog)),
                    (this._sizeMenu = new GMenu()),
                    this._setActiveMode("canvas", true),
                    this._updateSettings(),
                    this._updateSizeMenu(),
                    this._dialog.gDialog({
                        releaseOnClose: true,
                        className: isUserFree ? "g-export-dialog dialog-expired-pro" : "g-export-dialog",
                        buttons: [
                            $("<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")) + "</button>").on("click", () => {
                                (gDesigner.stats("export_cancel_button"), this.close());
                            }),
                            $("<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.export")) + "</button>")
                                .addClass("primary")
                                .on(
                                    "click",
                                    Utils.watchDog.trap(
                                        () => {
                                            (gDesigner.stats("export_execute_button", this._settings && this._settings.format),
                                                gDesigner.getAmplitudeHelper().logEvent(designerConfig.AmplitudeData.Events.DOCUMENT_EXPORTED, {
                                                    DOCUMENT_EXPORT_TYPE: designerConfig.AmplitudeData.ExportTypes.Advanced,
                                                    DOCUMENT_FILE_FORMAT: this._getFormat(),
                                                }),
                                                this._export());
                                        },
                                        null,
                                        (e) => gDesigner.stats("export_nonprotriespro_export"),
                                        actionId
                                    )
                                ),
                        ],
                    }),
                    backgroundSelector.find("select").trigger("change"));
            }),
            (GExportDialog.prototype.open = function () {
                this._dialog.gDialog("open", true);
            }),
            (GExportDialog.prototype.close = function () {
                (this._chooserElem && this._chooserElem.gPatternChooser("close"), this._dialog.gDialog("close"));
            }),
            (GExportDialog.prototype._shouldWarningBeShown = function (exportables) {
                if (!this._hasFormat()) return false;
                if (!(this._settings.format === GFileTypes.PDF.ext)) return false;
                if (!exportables || !exportables.length) return false;
                const maxSizePx = new GObject.GLength(200, GObject.GLength.Unit.IN).toUnit(GObject.GLength.Unit.PX),
                    dpi = GObject.GLength.DPI;
                return exportables.some((exportable) => {
                    const paintArea = GExportFormats.GBitmapExport.getBitmapPaintArea(exportable.element, exportable.size, dpi);
                    if (paintArea.getWidth() > maxSizePx || paintArea.getHeight() > maxSizePx) return true;
                });
            }),
            (GExportDialog.prototype._updateWarningSection = function (exportables) {
                this._shouldWarningBeShown(exportables)
                    ? (this._warningSection || (this._warningSection = this._buildWarningSection().appendTo(this._settingsContainer)),
                      this._warningSection.show())
                    : this._warningSection && this._warningSection.hide();
            }),
            (GExportDialog.prototype._buildWarningSection = function () {
                return $("<div/>")
                    .addClass("warning-section")
                    .append(
                        $("<span/>")
                            .addClass("control")
                            .append(
                                $("<label/>")
                                    .addClass("label")
                                    .append($("<span/>").addClass("icon").addClass("gravit-icon-export-warning"))
                                    .append(
                                        $("<span/>")
                                            .addClass("title")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.warning")))
                                    )
                                    .append(
                                        $("<div/>")
                                            .addClass("description")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.canvas-bigger-than-200-in")))
                                    )
                            )
                    );
            }),
            (GExportDialog.prototype._getStorageDestinations = function () {
                const format = this._getFormat();
                if (format) {
                    const destinations = gContainer.getStorageDestinations();
                    if (destinations) return destinations.filter((destination) => destination.isSupported(format));
                }
                return [];
            }),
            (GExportDialog.prototype._getSelectedStorageDestination = function () {
                const selectedId = parseInt(this._settingsContainer.find("[data-setting=storage-destination] > .control > select").val());
                return this._getStorageDestinations().find((destination) => destination.id === selectedId);
            }),
            (GExportDialog.prototype._isStorageDestinationSettingAvailable = function () {
                return !(this._getStorageDestinations().length < 2);
            }),
            (GExportDialog.prototype._updateStorageDestinationSetting = function () {
                const isAvailable = this._isStorageDestinationSettingAvailable(),
                    destinations = isAvailable ? this._getStorageDestinations() : [];
                this._settingsContainer
                    .find("[data-setting=storage-destination]")
                    .css("display", isAvailable ? "" : "none")
                    .find("select")
                    .empty()
                    .append(destinations.map((destination) => $("<option/>").attr("value", destination.id).text(destination.label)));
            }),
            (GExportDialog.prototype._getFormat = function () {
                if (this._hasFormat()) {
                    if ("assets" === this._activeMode) return GFileTypes.ZIP.ext;
                    if (this._previewContainer.find(".item .preview-check input:checked").length > 1) {
                        if (!(this._settings.format === GFileTypes.PDF.ext)) return GFileTypes.ZIP.ext;
                    }
                    return this._settings.format;
                }
                return null;
            }),
            (GExportDialog.prototype._setActiveMode = function (mode, skipPreview) {
                mode !== this._activeMode &&
                    ((this._activeMode = mode),
                    this._modeContainer.find("> label").each(function (t, labelEl) {
                        var labelElement = $(labelEl);
                        labelElement.toggleClass("g-active", labelElement.attr("data-mode") === mode);
                    }),
                    "selection" === mode &&
                        "page-background" === this._settings.background &&
                        (this._settings.background = "custom-background"),
                    this._updateSettings(),
                    skipPreview || this._updatePreview(),
                    this._updateSizeMenu());
            }),
            (GExportDialog.prototype._hasBackgroundColor = function () {
                return (
                    "canvas" === this._activeMode ||
                    ("selection" === this._activeMode && this._settings.format in { png: 1, jpg: 1, pdf: 1 })
                );
            }),
            (GExportDialog.prototype._hasSize = function () {
                return this._hasFormat() && this._settings.format in { png: 1, jpg: 1, pdf: 1 };
            }),
            (GExportDialog.prototype._hasJpegQuality = function () {
                return this._hasFormat() && this._settings.format in { jpg: 1, pdf: 1 };
            }),
            (GExportDialog.prototype._hasFormat = function () {
                return "canvas" === this._activeMode || "selection" === this._activeMode;
            }),
            (GExportDialog.prototype._updateBackground = function () {
                if (((this._settings.configuration.sceneBackground = true), !this._hasBackgroundColor()))
                    return ((this._settings.backgroundColor = null), void (this._settings.backgroundOpacity = 0));
                if ("custom-background" !== this._settings.background)
                    ((this._settings.configuration.sceneBackground = "page-background" == this._settings.background),
                        (this._settings.backgroundColor = "jpg" === this._settings.format ? GObject.GRGBColor.WHITE : null),
                        (this._settings.backgroundOpacity = 1));
                else {
                    this._settings.configuration.sceneBackground = false;
                    var patternChooserEl = this._settingsContainer.find("[data-setting=background-color]").find(".export-background-pattern-chooser");
                    if (
                        (patternChooserEl.gPatternChooser("value")
                            ? ((this._settings.backgroundColor = patternChooserEl.gPatternChooser("value")),
                              (this._settings.backgroundOpacity = patternChooserEl.gPatternChooser("opacity")),
                              this._settings.backgroundColor instanceof GObject.GColor ||
                                  ((this._settings.backgroundColor = GObject.GRGBColor.WHITE),
                                  (this._settings.backgroundOpacity = 1),
                                  patternChooserEl.gPatternChooser("value", this._settings.backgroundColor),
                                  patternChooserEl.gPatternChooser("opacity", this._settings.backgroundOpacity)))
                            : ((this._settings.backgroundColor = this._document
                                  ? this._document.getScene().getActivePage().getProperty("bck")
                                  : null),
                              (this._settings.backgroundOpacity = this._document
                                  ? this._document.getScene().getActivePage().getProperty("bop")
                                  : 1),
                              this._settings.backgroundColor && this._settings.backgroundColor instanceof GObject.GColor
                                  ? null == this._settings.backgroundOpacity && (this._settings.backgroundOpacity = 1)
                                  : ((this._settings.backgroundOpacity = 1), (this._settings.backgroundColor = GObject.GRGBColor.WHITE)),
                              patternChooserEl.gPatternChooser("value", this._settings.backgroundColor),
                              patternChooserEl.gPatternChooser("opacity", this._settings.backgroundOpacity)),
                        "jpg" === this._settings.format)
                    ) {
                        var whiteRGBA = GObject.GRGBColor.WHITE.getValue().slice(),
                            colorRGBA = this._settings.backgroundColor.getValue().slice();
                        ((whiteRGBA[3] = 1), (colorRGBA[3] = this._settings.backgroundOpacity));
                        var mixedValue = GObject.GRGBColor.mix(whiteRGBA, colorRGBA);
                        ((this._settings.backgroundColor = new GObject.GRGBColor(mixedValue)), (this._settings.backgroundOpacity = 1));
                    }
                }
            }),
            (GExportDialog.prototype._updateSettings = function () {
                (this._updateBackground(),
                    this._settingsContainer.find("[data-setting=size]").css("display", this._hasSize() ? "" : "none"),
                    this._settingsContainer.find("[data-setting=format]").css("display", this._hasFormat() ? "" : "none"),
                    this._settingsContainer.find("[data-setting=jpeg-quality]").css("display", this._hasJpegQuality() ? "" : "none"),
                    this._settingsContainer
                        .find("[data-setting=background-color]")
                        .css("display", this._hasBackgroundColor() ? "" : "none"),
                    this._settingsContainer
                        .find("[data-setting=background-color]")
                        .find(".export-background-pattern-chooser")
                        .css("display", "custom-background" === this._settings.background ? "" : "none"),
                    this._settingsContainer
                        .find("[data-setting=color-space]")
                        .css("display", this._hasFormat() && "pdf" === this._settings.format ? "" : "none"),
                    this._settingsContainer
                        .find("[value=no-background]")
                        .css(
                            "display",
                            !this._hasFormat() || ("pdf" !== this._settings.format && "jpg" !== this._settings.format) ? "" : "none"
                        ),
                    this._settingsContainer
                        .find("[data-setting=retina-display]")
                        .css(
                            "display",
                            !this._hasSize() || ("jpg" !== this._settings.format && "png" !== this._settings.format) ? "none" : ""
                        ),
                    this._settingsContainer
                        .find("[data-setting=ignore-effects]")
                        .css("display", this._hasFormat() && "pdf" === this._settings.format ? "" : "none")
                        .find("input")
                        .prop("checked", !this._settings.configuration.ignoreEffects),
                    this._settingsContainer
                        .find("[data-setting=convert-text-to-path]")
                        .css(
                            "display",
                            !this._hasFormat() || ("svg" !== this._settings.format && "pdf" !== this._settings.format) ? "none" : ""
                        )
                        .find("input")
                        .prop("checked", this._settings.convertTextToPath),
                    this._settingsContainer
                        .find("[data-setting=layer-as-id]")
                        .css("display", this._hasFormat() && "svg" === this._settings.format ? "" : "none")
                        .find("input")
                        .prop("checked", this._settings.layerNamesAsId),
                    this._settingsContainer
                        .find("[data-setting=export-preserve-editing-capabilities]")
                        .css("display", this._hasFormat() && "svg" === this._settings.format ? "" : "none")
                        .find("input")
                        .prop("checked", this._settings.preserveEditingCapabilities),
                    this._settingsContainer
                        .find("[data-setting=decimal-places-precision]")
                        .css("display", this._hasFormat() && "svg" === this._settings.format ? "" : "none"),
                    this._settingsContainer
                        .find("[data-setting=format]")
                        .find("[value=" + this._settings.format + "]")
                        .attr("selected", true),
                    this._settings.colorSpace &&
                        this._settingsContainer
                            .find("[data-setting=color-space]")
                            .find("[value=" + this._settings.colorSpace + "]")
                            .attr("selected", true),
                    this._settingsContainer
                        .find("[data-setting=do-not-downsample-images]")
                        .css("display", this._hasFormat() && "pdf" === this._settings.format ? "" : "none")
                        .find("input")
                        .prop("checked", !this._settings.downsampleImages),
                    this._settingsContainer
                        .find("[data-setting=export-all]")
                        .find("input")
                        .prop("checked", !this._options || !this._options.element),
                    $(".export-background-selector")
                        .find('option[value="page-background"]')
                        .css("display", "selection" === this._activeMode ? "none" : ""),
                    $(".export-background-selector")
                        .find('option[value="' + this._settings.background + '"]')
                        .prop("selected", true),
                    this._updateStorageDestinationSetting());
            }),
            (GExportDialog.prototype._generateExportables = function () {
                if ("canvas" === this._activeMode || "selection" === this._activeMode) {
                    var exportOptions = {
                        size: this._settings.size,
                        suffix: "",
                        format: this._settings.format,
                        jpegQuality: this._settings.jpegQuality,
                        backgroundColor: this._settings.backgroundColor,
                        backgroundOpacity: this._settings.backgroundOpacity,
                        colorSpace: this._settings.colorSpace,
                        configuration: this._settings.configuration,
                        convertTextToPath: this._settings.convertTextToPath,
                        decimalPlacesPrecision: this._settings.decimalPlacesPrecision,
                        preserveEditingCapabilities: this._settings.preserveEditingCapabilities,
                        layerNamesAsId: this._settings.layerNamesAsId,
                        overrideBackground: "page-background" !== this._settings.background,
                        downsampleImages: this._settings.downsampleImages,
                    };
                    if ("canvas" === this._activeMode)
                        return GExporter.generateExportables(this._document.getScene(), $.extend({ name: this._document.getTitle() }, exportOptions), false);
                    var selection = this._document.getEditor().getSelection();
                    return selection && selection.length ? GExporter.generateExportables(selection, exportOptions, false) : [];
                }
                if ("assets" === this._activeMode) return GExporter.generateExportables(this._document.getScene(), null, true);
            }),
            (GExportDialog.prototype._export = async function (e) {
                this._options || (lastUsedSettings = this._settings);
                var exportables = this._generateExportables();
                let opacityBackups = [];
                try {
                    var checkboxes = this._previewContainer.find(".item .preview-check input");
                    if (checkboxes.length) {
                        var selectedElements = [];
                        checkboxes.each(function (e, checkboxEl) {
                            var checkbox = $(checkboxEl);
                            checkbox.prop("checked") && selectedElements.push(checkbox.closest(".item").data("element"));
                        });
                        for (var matchedExportables = [], c = 0; c < exportables.length; ++c)
                            for (var d = 0; d < selectedElements.length; ++d) {
                                if (
                                    (selectedElements[d] instanceof GObject.GPage &&
                                        exportables[c].element instanceof GObject.GPage &&
                                        selectedElements[d].getReferenceId() === exportables[c].element.getReferenceId()) ||
                                    selectedElements[d] === exportables[c].element
                                ) {
                                    matchedExportables.push(exportables[c]);
                                    break;
                                }
                            }
                        exportables = matchedExportables;
                    }
                    var maxCanvasSize = GExportFormats.GBitmapExport.getMaximumCanvasSize();
                    if (
                        exportables.some((exportable) => {
                            if ("jpg" === exportable.format || "png" === exportable.format) {
                                var dpi = GObject.GLength.DPI,
                                    paintArea = GExportFormats.GBitmapExport.getBitmapPaintArea(exportable.element, exportable.size, dpi);
                                if (paintArea.getWidth() > maxCanvasSize.width || paintArea.getHeight() > maxCanvasSize.height || paintArea.getWidth() * paintArea.getHeight() > maxCanvasSize.area) return true;
                            }
                            return false;
                        })
                    )
                        return void GSystemDialog
                            .alert(
                                GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.default-limit"))
                                    .replace("%width", maxCanvasSize.width)
                                    .replace("%height", maxCanvasSize.height)
                                    .replace("%area", maxCanvasSize.area / 1024 / 1024 + "MP")
                            )
                            .css({ width: "500px" });
                    if (
                        exportables.some(
                            (exportable) =>
                                "pdf" === exportable.format &&
                                !GExportFormats.GPDFExport.isSupported(exportable.element, !exportable.configuration || !exportable.configuration.ignoreEffects, exportable.size)
                        )
                    )
                        return void GSystemDialog
                            .alert(
                                GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.pdf-limit")).replace(
                                    "%limit",
                                    Math.round(GPlatform.GPlatform.maxPngDataSize / 1024 / 1024) + "MB"
                                )
                            )
                            .css({ width: "500px" });
                    if (((opacityBackups = this._persistOpacities(exportables)), exportables.length)) {
                        const destination = this._getSelectedStorageDestination();
                        if (destination && !(await this._checkWriteAccess(destination))) return;
                        var overlay = $("<div></div>")
                                .addClass("export-overlay")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.exporting")) + "...")
                                .appendTo(this._dialog),
                            messageEl = $("<div></div>").addClass("message").append($("<span></span>"));
                        let reporter = {
                            abort: void 0,
                            message: (text) => {
                                messageEl.find("span").text(text);
                            },
                            close: () => overlay.remove(),
                            error: () => reporter.message(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.pdf-export-error"))),
                        };
                        const storageOptions = { storageDestination: destination },
                            onError = (error) => {
                                error && GSystemDialog.error(error, { closeCallback: () => this.close() });
                            };
                        (exportables.length &&
                            "pdf" === exportables[0].format &&
                            (overlay.append(
                                $("<button>")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.cancel")))
                                    .on("click", () => {
                                        (reporter.abort && reporter.abort(), reporter.close());
                                    })
                            ),
                            overlay.append(messageEl)),
                            GExporter.export(
                                exportables,
                                this._document.getStorage() || gDesigner.getDefaultStorage(),
                                this._document.getTitle(),
                                () => {
                                    if ((this.close(), !gDesigner.getSetting("disable_warning_unsupported_features", false))) {
                                        let unsupportedFeatures = [];
                                        for (let exportable of exportables)
                                            "svg" === exportable.format && (unsupportedFeatures = unsupportedFeatures.concat(GExportFormats.GSVGExport.getUnsupportedFeatures(exportable.element)));
                                        unsupportedFeatures.length && new GUnsupportedFeaturesDialog(unsupportedFeatures).open();
                                    }
                                },
                                () => this.close(),
                                "assets" === this._activeMode,
                                function (percent) {
                                    var progressEl = overlay.find("progress");
                                    (progressEl.length ||
                                        overlay.append(
                                            $("<p>").append((progressEl = $("<progress>").attr({ min: "0", max: "100" }).css("width", "200px")))
                                        ),
                                        progressEl.val(percent));
                                },
                                reporter,
                                onError,
                                storageOptions
                            ));
                    }
                } finally {
                    this._restoreOpacities(exportables, opacityBackups);
                }
            }),
            (GExportDialog.prototype._checkWriteAccess = async function (destination) {
                const storage = this._document.getStorage() || gDesigner.getDefaultStorage(),
                    permission = await storage.getWritePermission(destination),
                    isAuthorized = permission.isAuthorized();
                return (!isAuthorized && permission.hasStatusText() && GSystemDialog.error(permission.getStatusText(), { showTitle: false }), isAuthorized);
            }),
            (GExportDialog.prototype._formatCaption = function (caption) {
                return "pdf" === this._settings.format ? caption.replace(/[^0-9\.]/g, "") + "dpi" : caption;
            }),
            (GExportDialog.prototype._updateSizeMenu = function () {
                this._sizeMenu.clearItems();
                let defaultSize = "1x";
                if ("pdf" === this._settings.format) {
                    const dpi = this._document && this._document.getScene() && this._document.getScene().getProperty("dpi");
                    ((defaultSize = isNaN(dpi) ? "72dpi" : dpi + "dpi"),
                        this._sizeMenu.createAddItem(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.default")) + " (72dpi)"),
                        this._sizeMenu.createAddItem(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.web")) + " (96dpi)"),
                        this._sizeMenu.createAddItem(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.medium-quality")) + " (150dpi)"),
                        this._sizeMenu.createAddItem(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.high-quality")) + " (300dpi)"));
                } else
                    (this._sizeMenu.createAddItem("1x"),
                        this._sizeMenu.createAddItem("2x"),
                        this._sizeMenu.createAddItem("0.5x"),
                        this._sizeMenu.createAddItem("3x"),
                        this._sizeMenu.createAddItem("512w"),
                        this._sizeMenu.createAddItem("512h"),
                        this._sizeMenu.createAddItem("128x128"),
                        this._sizeMenu.createAddItem("300dpi"));
                for (var t = 0; t < this._sizeMenu.getItemCount(); t++)
                    if (-1 !== this._sizeMenu.getItem(t).getCaption().indexOf(this._settings.size)) return;
                ((this._settings.size = defaultSize), this._settingsContainer.find(".g-input-select > input").val(this._settings.size));
            }),
            (GExportDialog.prototype._updatePreview = function () {
                this._previewContainer.empty();
                var exportables = this._generateExportables();
                let opacityBackups = [];
                try {
                    if (
                        ((opacityBackups = this._persistOpacities(exportables)),
                        this._settingsContainer
                            .find("[data-setting=export-all]")
                            .css("display", "canvas" !== this._activeMode || exportables.length > 1 ? "" : "none"),
                        exportables.length)
                    ) {
                        for (
                            var loader = $("<div></div>")
                                    .addClass("loader")
                                    .append(
                                        $("<span></span>")
                                            .addClass("text")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.preparing-preview")) + "...")
                                    )
                                    .appendTo(this._previewContainer),
                                previewItems = [],
                                r = 0;
                            r < exportables.length;
                            ++r
                        ) {
                            for (var s = exportables[r], l = null, c = 0; c < previewItems.length; ++c)
                                if (previewItems[c].element === s.element) {
                                    l = previewItems[c];
                                    break;
                                }
                            (l ||
                                ((l = {
                                    element: s.element,
                                    name: s.name,
                                    format: s.format,
                                    size: s.size,
                                    jpegQuality: s.jpegQuality,
                                    backgroundColor: s.backgroundColor,
                                    backgroundOpacity: s.backgroundOpacity,
                                    sizes: "",
                                    formats: "",
                                    configuration: s.configuration,
                                }),
                                previewItems.push(l)),
                                "" !== l.formats && (l.formats += ", "),
                                (l.formats += s.format),
                                s.size && ("" !== l.sizes && (l.sizes += ", "), (l.sizes += s.size)));
                        }
                        var listContainer = null;
                        (previewItems.length > 1 || "assets" === this._activeMode) &&
                            (listContainer = $("<div></div>").addClass("list content").appendTo(this._previewContainer));
                        var previewEntries = [];
                        for (r = 0; r < previewItems.length; ++r) {
                            l = previewItems[r];
                            var dataUrl,
                                bitmap,
                                h = GObject.GBitmap.ImageType.PNG,
                                f = null;
                            "jpg" === l.format && ((h = GObject.GBitmap.ImageType.JPEG), (f = (l.jpegQuality || 100) / 100));
                            var m = window.devicePixelRatio;
                            if (listContainer) {
                                var y = new GObject.GLength(50, GObject.GLength.Unit.PX);
                                dataUrl = (bitmap = l.element.toBitmap(
                                    y,
                                    y,
                                    2,
                                    l.backgroundColor,
                                    l.configuration,
                                    null,
                                    l.backgroundOpacity
                                )).toImageDataUrl(h, f);
                            } else {
                                var v = null;
                                this._hasBackgroundColor() && (v = l.backgroundColor);
                                var _ = l.element._getBitmapPaintArea(),
                                    b = [0],
                                    w = GExportFormats.GBitmapExport.convertSizeToScale(_.getWidth(), _.getHeight(), l.size, null, b),
                                    C = _.getWidth() * (b[0] / GObject.GLength.DPI) * w.getX(),
                                    x = _.getHeight() * (b[0] / GObject.GLength.DPI) * w.getY(),
                                    S = l.size;
                                ((C > 1920 || x > 1080) && (S = Math.min(1920 / _.getWidth(), 1080 / _.getHeight()) + "x"),
                                    (dataUrl = (bitmap = GExportFormats.GBitmapExport.export(
                                        l.element,
                                        S,
                                        v,
                                        l.configuration,
                                        null,
                                        l.backgroundOpacity,
                                        true
                                    )).toImageDataUrl(h, f)));
                            }
                            var E = bitmap.getWidth() / m,
                                A = bitmap.getHeight() / m,
                                T = $("<img />").attr("src", dataUrl),
                                G = $("<div></div>")
                                    .addClass("preview-image")
                                    .css("background", GObject.GPattern.asCSSBackground(null, 0))
                                    .append(T);
                            if ((previewEntries.push({ img: T, w: E, h: A, preview: G }), listContainer)) {
                                var P = "";
                                ("assets" === this._activeMode && (l.sizes && (P = l.sizes + " - "), (P += l.formats)),
                                    $("<div></div>")
                                        .addClass("item")
                                        .data("element", l.element)
                                        .append(G)
                                        .append(
                                            $("<div></div>")
                                                .addClass("preview-check")
                                                .append(
                                                    $("<input/>")
                                                        .prop(
                                                            "checked",
                                                            !this._options || !this._options.element || this._options.element == l.element
                                                        )
                                                        .on("change", () => {
                                                            this._updateStorageDestinationSetting();
                                                        })
                                                        .attr("type", "checkbox")
                                                )
                                        )
                                        .append($("<div></div>").addClass("preview-name").text(l.name))
                                        .append($("<div></div>").addClass("preview-meta").text(P))
                                        .appendTo(listContainer));
                            } else G.addClass("content").appendTo(this._previewContainer);
                        }
                        loader.remove();
                    } else
                        switch (this._activeMode) {
                            case "selection":
                                $("<div></div>")
                                    .addClass("empty")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.selection-warning")))
                                    .appendTo(this._previewContainer);
                                break;
                            case "assets":
                                $("<div></div>")
                                    .addClass("empty")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GExportDialog", "text.assets-warning")))
                                    .appendTo(this._previewContainer);
                        }
                } finally {
                    this._restoreOpacities(exportables, opacityBackups);
                }
                (this._updateStorageDestinationSetting(), this._updateWarningSection(exportables));
            }),
            (GExportDialog.prototype._persistOpacities = function (exportables) {
                let backups = [];
                if ("canvas" === this._activeMode && "svg" !== this._settings.format && "pdf" !== this._settings.format)
                    for (var n = 0; n < exportables.length; ++n) {
                        var o = exportables[n];
                        if (o.overrideBackground) {
                            var i = o.element.getProperty("bop");
                            (backups.push({ index: n, opacity: i }), o.element.setProperty("bop", 0));
                        }
                    }
                return backups;
            }),
            (GExportDialog.prototype._restoreOpacities = function (exportables, backups) {
                if (backups.length > 0)
                    for (var n = 0; n < exportables.length; ++n)
                        for (var o = exportables[n], i = 0; i < backups.length; ++i)
                            if (n === backups[i].index) {
                                o.element.setProperty("bop", backups[i].opacity);
                                break;
                            }
            }),
            (module.exports = GExportDialog));
    };
