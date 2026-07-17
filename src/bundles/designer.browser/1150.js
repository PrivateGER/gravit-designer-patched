module.exports = function (module, exports, require) {
        "use strict";
        (require(193), require(57), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(34), require(134 /* polyfill:String */), require(4), require(13), require(32), require(38), require(33));
        var GUI = require(53),
            GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GRichTooltipConfig = require(67),
            GSwatchesChangedEvent = require(1151),
            GInputSlider = require(857),
            GSystemDialog = require(44);
        function GPatternChooser() {
            (this.initLayout(), this._container.gOverlay({ releaseOnClose: false, padding: false }));
        }
        ((GPatternChooser.ColorMode = { RGB: "rgb", HSV: "hsv", CMYK: "cmyk" }),
            (GPatternChooser._ColorModeToFrameworkColorMode = {
                [GPatternChooser.ColorMode.RGB]: GObject.GColor.ColorModes.RGB,
                [GPatternChooser.ColorMode.HSV]: GObject.GColor.ColorModes.HSB,
                [GPatternChooser.ColorMode.CMYK]: GObject.GColor.ColorModes.CMYK,
            }),
            (GPatternChooser.ColorModeLabel = { RGB: "RGB", HSV: "HSB", CMYK: "CMYK" }),
            (GPatternChooser.ColorModelFree = { RGB: true }),
            (GPatternChooser.ExtendedGamut = { COMPONENTS: "cp", COLOR_SLIDER: "cs", MAP: "map" }),
            (GPatternChooser.canDragSwatch = false),
            (GPatternChooser.dragSwatch = null),
            (GPatternChooser.dragDeltaX = 0),
            (GPatternChooser.dragDeltaY = 0),
            (GPatternChooser.hasDropped = false),
            (GPatternChooser.EXTEND_DRAG_RANGE = 50),
            GObject.GObject.inheritAndMix(GPatternChooser, GObject.GObject),
            (GPatternChooser.enableFileTypes = [
                { ext: "png", mime: "image/png" },
                { ext: "jpg", mime: "image/jpeg" },
                { ext: "jpeg", mime: "image/jpeg" },
                { ext: "gif", mime: "image/gif" },
            ]),
            (GPatternChooser.prototype._container = null),
            (GPatternChooser.prototype._toolbar = null),
            (GPatternChooser.prototype._settingsMenu = null),
            (GPatternChooser.prototype._rgbModeItem = null),
            (GPatternChooser.prototype._hsvModeItem = null),
            (GPatternChooser.prototype._cmykModeItem = null),
            (GPatternChooser.prototype._gradientEditor = null),
            (GPatternChooser.prototype._gradientActions = null),
            (GPatternChooser.prototype._colorEditor = null),
            (GPatternChooser.prototype._patternEditor = null),
            (GPatternChooser.prototype._noiseEditor = null),
            (GPatternChooser.prototype._colorMap = null),
            (GPatternChooser.prototype._colorSlider = null),
            (GPatternChooser.prototype._colorComponents = null),
            (GPatternChooser.prototype._systemColorInput = null),
            (GPatternChooser.prototype._colorPreview = null),
            (GPatternChooser.prototype._colorPreviewOld = null),
            (GPatternChooser.prototype._colorPreviewNew = null),
            (GPatternChooser.prototype._opacitySlider = null),
            (GPatternChooser.prototype._palettes = null),
            (GPatternChooser.prototype._activePalette = null),
            (GPatternChooser.prototype._swatchesScope = "user"),
            (GPatternChooser.prototype._colorMode = null),
            (GPatternChooser.prototype._oldColor = GObject.GRGBColor.BLACK),
            (GPatternChooser.prototype._color = GObject.GRGBColor.BLACK),
            (GPatternChooser.prototype._oldColorOpacity = 100),
            (GPatternChooser.prototype._colorOpacity = 100),
            (GPatternChooser.prototype._activeGradientStop = null),
            (GPatternChooser.prototype._activeGradient = null),
            (GPatternChooser.prototype._pattern = null),
            (GPatternChooser.prototype._patternUpdateBlocker = false),
            (GPatternChooser.prototype._texture = null),
            (GPatternChooser.prototype._opacity = null),
            (GPatternChooser.prototype._settings = null),
            (GPatternChooser.prototype._isVisible = false),
            (GPatternChooser.prototype._extendedGamutInitiated = null),
            (GPatternChooser.prototype._sliderColorThumb = null),
            (GPatternChooser.prototype._sliderOpacityThumb = null),
            (GPatternChooser.prototype._extValue = null),
            (GPatternChooser.prototype.getPattern = function () {
                return this._pattern;
            }),
            (GPatternChooser.prototype.setPattern = function (pattern) {
                this._updatePattern(pattern, "set_pattern");
            }),
            (GPatternChooser.prototype.getOpacity = function () {
                return this._opacity;
            }),
            (GPatternChooser.prototype.setOpacity = function (opacity) {
                this._updateOpacity(opacity, "set_opacity");
            }),
            (GPatternChooser.prototype.initLayout = function () {
                ((this._container = $("<div/>")
                    .addClass("pattern-chooser")
                    .on(
                        "close",
                        function (e, cancelClose, triggerEvent) {
                            if (this._settings && this._settings.onClose && this._settings.onClose(this._pattern, this._opacity, cancelClose, triggerEvent)) {
                                var activeDocument = gDesigner.getActiveDocument();
                                (activeDocument &&
                                    (activeDocument.getEditor().removeEventListener(GUI.GEditor.ModifiedEvent, this._closeIfNeeded, this),
                                    activeDocument.getEditor().keysOn([GPlatform.GKey.Constant.OPTION])),
                                    gDesigner.getWorkspace().getStyleEdManager() &&
                                        gDesigner.getWorkspace().getStyleEdManager().isActivated() &&
                                        gDesigner
                                            .getWorkspace()
                                            .getStyleEdManager()
                                            .removeEventListener(GUI.GStyleEdManager.EditorEvent, this._styleEditorHandler, this));
                            }
                        }.bind(this)
                    )),
                    (this._toolbar = $("<div/>").addClass("toolbar").appendTo(this._container)),
                    GPatternChooser.PATTERN_TYPES || (GPatternChooser.PATTERN_TYPES = GPatternChooser.initPatternType()));
                var patternOptions = GPatternChooser.PATTERN_TYPES.map(GPatternChooser._createPatternOption);
                this._toolbar.append(
                    $("<select></select>")
                        .addClass("pattern-type-select")
                        .append(patternOptions)
                        .on("change", (event) => {
                            var selectedType = $(event.target).children("option:selected").data("type"),
                                selectedColorMode = $(".colormode-selector").children("option:selected").data("colormode"),
                                newPattern = selectedType.createDefault(this._pattern);
                            (null === newPattern
                                ? gDesigner.stats("patternchooser_change_type", "transparent")
                                : newPattern instanceof GObject.GBackground
                                  ? gDesigner.stats("patternchooser_change_type", "background")
                                  : newPattern instanceof GObject.GTexturePattern
                                    ? gDesigner.stats("patternchooser_change_type", "texture")
                                    : newPattern instanceof GObject.GNoisePattern
                                      ? gDesigner.stats("patternchooser_change_type", "noise")
                                      : newPattern instanceof GObject.GRadialGradient
                                        ? gDesigner.stats("patternchooser_change_type", "radialgradient")
                                        : newPattern instanceof GObject.GLinearGradient
                                          ? gDesigner.stats("patternchooser_change_type", "lineargradient")
                                          : newPattern instanceof GObject.GAngularGradient
                                            ? gDesigner.stats("patternchooser_change_type", "angulargradient")
                                            : newPattern instanceof GObject.GColor && gDesigner.stats("patternchooser_change_type", "color"),
                                this._updateOpacity(1),
                                this._updatePattern(newPattern, "set_type"),
                                this._updateSwatchesPalette(this._getSwatchScope("global", this._pattern)),
                                this._updateSwatchesPalette(this._getSwatchScope("document", this._pattern)),
                                this.setColorMode(selectedColorMode),
                                this._updateActiveGradient());
                        })
                );
                var colorModeSelect = $("<select></select>").addClass("colormode-selector");
                (Array.prototype.forEach.call(Object.keys(GPatternChooser.ColorMode), function (key) {
                    $("<option></option>")
                        .addClass("color-mode")
                        .data("colormode", GPatternChooser.ColorMode[key])
                        .text(GPatternChooser.ColorModeLabel[key])
                        .appendTo(colorModeSelect)
                        .gPro({ pro: !GPatternChooser.ColorModelFree[key], feature: key.toLowerCase() });
                }),
                    colorModeSelect
                        .on(
                            "change",
                            Utils.watchDog.trap(
                                (event) => {
                                    var selectedColorMode = $(event.target).children("option:selected").data("colormode");
                                    GPatternChooser.ColorModelFree[(selectedColorMode || "").toUpperCase()]
                                        ? gDesigner.stats("patternchooser_change_colormode", selectedColorMode)
                                        : gDesigner.stats("patternchooser_change_procolormode", selectedColorMode);
                                    var colorModeElements = gDesigner.getActiveDocument().getColorModeElms() || [],
                                        individualSelection = gDesigner.getActiveDocument().getEditor().getIndividualSelection();
                                    (individualSelection && (colorModeElements.push(individualSelection[0]), gDesigner.getActiveDocument().setColorModeElms(colorModeElements)),
                                        this.setColorMode(selectedColorMode),
                                        this._updateActiveGradient());
                                },
                                (event) => {
                                    var colorModeUpper = ($(event.target).children("option:selected").data("colormode") || "").toUpperCase();
                                    return !!gDesigner.isEnabledProFeatures(colorModeUpper.toLowerCase()) || !!GPatternChooser.ColorModelFree[colorModeUpper];
                                },
                                (event) => {
                                    var selectedColorMode = $(event.target).children("option:selected").data("colormode");
                                    (this.setColorMode(this._colorMode, true),
                                        gDesigner.stats("patternchooser_nonprotriespro_procolormode", selectedColorMode));
                                }
                            )
                        )
                        .appendTo(this._toolbar),
                    (this._gradientEditor = $("<div/>")
                        .addClass("gradient-editor")
                        .append($("<div/>").addClass("stops"))
                        .on(
                            "mousedown",
                            function (event) {
                                var offset = this._gradientEditor.offset(),
                                    relativeX = event.pageX - offset.left,
                                    newStop = {
                                        position: relativeX / this._gradientEditor.outerWidth(),
                                        color: this._defineStopInitColor(relativeX),
                                        opacity: 1,
                                    };
                                this._activeGradient.getStops().push(newStop);
                                var stopElement = this._insertGradientStop(newStop);
                                (this._setActiveGradientStop(newStop),
                                    this._updatePatternFromActiveGradient(),
                                    this._updateOnlineEditorStops(),
                                    stopElement.trigger("mousedown"));
                            }.bind(this)
                        )
                        .appendTo(this._container)),
                    (this._patternEditor = this._createPatternEditor().appendTo(this._container)),
                    (this._noiseEditor = this._createNoiseEditor().appendTo(this._container)),
                    (this._colorEditor = $("<div/>").addClass("color-editor").appendTo(this._container)),
                    (this._systemColorInput = $("<input>")
                        .attr("type", "color")
                        .css({ position: "absolute", visibility: "hidden" })
                        .on(
                            "change",
                            function (event) {
                                this._updateColor(GObject.GRGBColor.fromCSSColor($(event.target).val()));
                            }.bind(this)
                        )
                        .appendTo(this._colorEditor)),
                    (this._colorMap = $("<div/>")
                        .addClass("color-map")
                        .append($("<canvas></canvas>"))
                        .append(
                            $("<div/>")
                                .addClass("overlay")
                                .on("mousedown touchstart", this._colorMapMouseDown.bind(this))
                                .on("mousemove", function (event) {
                                    event.originalEvent.isTrusted && (event.preventDefault(), event.stopPropagation());
                                })
                        )
                        .append($("<div/>").addClass("marker"))
                        .appendTo(this._colorEditor)));
                var colorDetails = $("<div/>").addClass("color-details").appendTo(this._colorEditor);
                $("<div/>")
                    .addClass("color-eyedropper g-flat eye-drop")
                    .gEyeDropper()
                    .on(
                        "colorchange",
                        function (e, colorValue) {
                            (this._updateColor(new GObject.GRGBColor(colorValue)), this._updateOpacity(colorValue[3] / 255, "eyedropper"));
                        }.bind(this)
                    )
                    .appendTo(colorDetails);
                var colorSliders = $("<div/>").addClass("color-sliders").appendTo(colorDetails);
                ((this._colorSlider = $("<div>")
                    .gColorSlider()
                    .css("box-sizing", "border-box")
                    .on(
                        "input",
                        function () {
                            this._updateColorFromColorSlider(true);
                        }.bind(this)
                    )
                    .on(
                        "change",
                        function () {
                            (gDesigner.stats("patternchooser_change_color-from-colorslider"), this._updateColorFromColorSlider());
                        }.bind(this)
                    )
                    .appendTo(colorSliders)),
                    (this._opacitySlider = $("<div/>")
                        .gInputSlider(GInputSlider.prototype.OPACITY_DEFAULT)
                        .css("box-sizing", "border-box")
                        .on(
                            "input",
                            function (event) {
                                this._updateOpacity($(event.target).gInputSlider("value") / 100, "slider", true);
                            }.bind(this)
                        )
                        .on(
                            "change",
                            function (event) {
                                (gDesigner.stats("patternchooser_change_opacity"),
                                    this._updateOpacity($(event.target).gInputSlider("value") / 100, "slider", false, true));
                            }.bind(this)
                        )
                        .appendTo(colorSliders)),
                    (this._sliderColorThumb = $(this._colorSlider).find(".g-input-slider-thumb").css("box-sizing", "border-box")),
                    (this._sliderOpacityThumb = $(this._opacitySlider).find(".g-input-slider-thumb").css("box-sizing", "border-box")));
                var colorPreviewContainer = $("<div/>").addClass("color-preview-container").appendTo(colorDetails);
                ((this._colorPreview = $("<div/>")
                    .addClass("color-preview")
                    .css("background", GObject.GPattern.asCSSBackground(null, 0))
                    .appendTo(colorPreviewContainer)),
                    (this._colorPreviewOld = $("<div/>").addClass("color-preview-old").appendTo(this._colorPreview)),
                    (this._colorPreviewNew = $("<div/>").addClass("color-preview-new").appendTo(this._colorPreview)),
                    $("<div/>").addClass("color-preview-overlay").appendTo(this._colorPreview),
                    (this._colorComponents = $("<div/>").addClass("color-components").appendTo(this._colorEditor)),
                    (this._gradientActions = $("<div/>")
                        .addClass("gradient-actions")
                        .append(
                            $("<button />")
                                .addClass("g-flat")
                                .attr("data-action", "exchange")
                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.change-stops-order")))
                                .on(
                                    "click",
                                    function () {
                                        gDesigner.stats("patternchooser_change_stops-order");
                                        for (var stops = this._activeGradient.getStops(), t = 0; t < stops.length; ++t)
                                            ((stops[t].position = 1 - stops[t].position), this._updateGradientStop(stops[t]));
                                        this._updatePatternFromActiveGradient();
                                    }.bind(this)
                                )
                                .append($("<span />").addClass("gravit-icon-exchange"))
                        )
                        .append(
                            $("<div/>")
                                .addClass("g-flat")
                                .css("float", "right")
                                .append(
                                    $("<button />")
                                        .addClass("g-flat")
                                        .attr("data-action", "rotate-left")
                                        .attr(
                                            "data-title",
                                            GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.rotate-gradient-left"))
                                        )
                                        .on(
                                            "click",
                                            function () {
                                                (gDesigner.stats("patternchooser_rotate_gradient", "left"),
                                                    this._rotateActiveGradient(-45));
                                            }.bind(this)
                                        )
                                        .append($("<span />").addClass("gravit-icon-rotate-left"))
                                )
                                .append(
                                    $("<button />")
                                        .addClass("g-flat")
                                        .attr("data-action", "rotate-right")
                                        .attr(
                                            "data-title",
                                            GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.rotate-gradient-right"))
                                        )
                                        .on(
                                            "click",
                                            function () {
                                                (gDesigner.stats("patternchooser_rotate_gradient", "right"),
                                                    this._rotateActiveGradient(45));
                                            }.bind(this)
                                        )
                                        .append($("<span />").addClass("gravit-icon-rotate-right"))
                                )
                        )
                        .appendTo(this._container)),
                    (this._palettes = $("<div/>").addClass("palettes").appendTo(this._container)));
                var onPaletteClick = function (event) {
                    var paletteName = $(event.target).closest("[data-palette]").attr("data-palette");
                    (gDesigner.stats("patternchooser_activate_palette", paletteName), this._activatePalette(paletteName));
                }.bind(this);
                (this._createChoosers(onPaletteClick).appendTo(this._palettes),
                    this._createColorsPalette(
                        $("<div/>").attr("data-palette", "colors").addClass("palette colors-palette").appendTo(this._palettes)
                    ),
                    this._createMixerPalette(
                        $("<div/>").attr("data-palette", "mixer").addClass("palette mixer-palette").appendTo(this._palettes)
                    ),
                    $("<div/>").attr("data-palette", "used").addClass("palette used-palette").appendTo(this._palettes));
                var swatchesPaletteContainer = $("<div/>").attr("data-palette", "swatches").addClass("palette swatches-palette global").appendTo(this._palettes);
                const trialClass = this._palettes.find(".chooser").find("button[data-palette=swatches]").hasClass("trial") ? " trial" : "";
                (this._createSwatchesPalette(swatchesPaletteContainer, "global" + trialClass),
                    this._createSwatchesPalette(
                        $("<div/>").attr("data-palette", "swatches").addClass("palette swatches-palette document").appendTo(this._palettes),
                        "document"
                    ),
                    (this._swatchesScope = this._getSwatchScope("global", this._pattern)),
                    this._activatePalette("colors"),
                    this._container.find("button").each(function (e, buttonElement) {
                        $(buttonElement).on("mousedown", function (event) {
                            event.preventDefault();
                        });
                    }),
                    this.setColorMode(GPatternChooser.ColorMode.RGB));
            }),
            (GPatternChooser.prototype._createChoosers = function (onPaletteClick) {
                return $("<div/>")
                    .addClass("chooser")
                    .append(
                        $("<button />")
                            .attr("data-palette", "colors")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.colors")))
                            .on("click", onPaletteClick)
                    )
                    .append(
                        $("<button />")
                            .gPro({ feature: "swatches" })
                            .attr("data-palette", "swatches")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.swatches")))
                            .on(
                                "click",
                                Utils.watchDog.trap(
                                    onPaletteClick,
                                    null,
                                    () => gDesigner.stats("patternchooser_nonprotriespro_palette", "swatches"),
                                    "swatches"
                                )
                            )
                    )
                    .append(
                        $("<button />")
                            .attr("data-palette", "used")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.in-use")))
                            .on("click", onPaletteClick)
                    )
                    .append(
                        $("<button />")
                            .attr("data-palette", "mixer")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.mixer")))
                            .on("click", onPaletteClick)
                    );
            }),
            (GPatternChooser.prototype.__getColorModeParams = function () {
                return {
                    hexWidth: "27%",
                    isTouchEnabled: false,
                    rgbWidth: "15%",
                    cmykWidth: "18%",
                };
            }),
            (GPatternChooser.prototype._updateActiveGradient = function () {
                if (this._activeGradient) {
                    const stops = this._activeGradient.getStops();
                    if (stops && stops.length) {
                        const frameworkColorMode = GPatternChooser._ColorModeToFrameworkColorMode[this._colorMode] || GObject.GColor.ColorModes.RGB;
                        (stops.forEach((stop) => {
                            const convertedColor = GObject.GColorHelper.convertColor(stop.color, frameworkColorMode);
                            (convertedColor && (stop.color = convertedColor), this._updateGradientStop(stop));
                        }),
                            this._updatePatternFromActiveGradient());
                    }
                }
            }),
            (GPatternChooser.prototype.setColorMode = function (colorMode, force) {
                var params = this.__getColorModeParams();
                if (colorMode !== this._colorMode || force) {
                    this._colorMode = colorMode;
                    var convertedColor = null;
                    if (
                        (this._toolbar.find(".color-mode").each((t, optionElement) => {
                            var optionEl = $(optionElement),
                                optionColorMode = optionEl.data("colormode");
                            optionColorMode && optionEl.prop("selected", colorMode === optionColorMode);
                        }),
                        this._colorComponents.empty(),
                        this._colorMode === GPatternChooser.ColorMode.RGB || this._colorMode === GPatternChooser.ColorMode.HSV)
                    ) {
                        (this._colorMap.css("display", ""),
                            this._colorSlider.css("display", ""),
                            this._colorEditor.toggleClass("cmyk-mode", false),
                            this._opacitySlider.toggleClass("cmyk-mode", false),
                            $("<label />")
                                .css("width", params.hexWidth)
                                .attr("data-css", "")
                                .append(
                                    $("<input>")
                                        .attr("type", "text")
                                        .attr("data-long-press-delay", "500")
                                        .gInputBox({
                                            keyIncrement: false,
                                            wheelIncrement: false,
                                            mousemoveIncrement: false,
                                        })
                                        .on("long-press", (event) => {
                                            params.isTouchEnabled &&
                                                ((this._currentLongPressTarget = event.target), this._contextMenu.open(event.target));
                                        })
                                        .on(
                                            "change",
                                            function (event) {
                                                var newColor = GObject.GRGBColor.fromCSSColor($(event.target).val());
                                                (newColor || (newColor = this._color),
                                                    colorMode === GPatternChooser.ColorMode.HSV && (newColor = new GObject.GHSVColor(GObject.GColor.rgbToHSV(newColor.getValue()))),
                                                    gDesigner.stats("patternchooser_update_color", colorMode),
                                                    this._updateColor(newColor, null, false, true));
                                            }.bind(this)
                                        )
                                        .on("paste keydown keyup", (event) => {
                                            var inputElement = $(event.target),
                                                targetElement = event.target,
                                                value = inputElement.val();
                                            if ("keydown" === event.type) {
                                                var isAlnumKey = /[0-9a-z\u017F\u212A]/i.test(String.fromCharCode(event.keyCode || event.charCode));
                                                if (value.length >= 7 && isAlnumKey && targetElement.selectionStart === targetElement.selectionEnd) return false;
                                            }
                                            value.startsWith("#") || ((value = "#" + value), inputElement.val(value));
                                            var match = /^#[0-9A-Za-z]{0,6}/.exec(value);
                                            match && match[0] && value !== match[0] && inputElement.val(match[0]);
                                        })
                                )
                                .append($("<span />").text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.hex"))))
                                .appendTo(this._colorComponents),
                            params.isTouchEnabled && $("<div/>").css("width", "11%").appendTo(this._colorComponents));
                        var componentLabels = this._colorMode === GPatternChooser.ColorMode.RGB ? ["R", "G", "B"] : ["H", "S", "B"];
                        Array.prototype.forEach.call(
                            componentLabels,
                            function (label, index) {
                                var maxValue = 0;
                                switch (label) {
                                    case "R":
                                    case "G":
                                    case "B":
                                        this._colorMode === GPatternChooser.ColorMode.RGB ? (maxValue = 255) : this._colorMode === GPatternChooser.ColorMode.HSV && (maxValue = 100);
                                        break;
                                    case "H":
                                        maxValue = 360;
                                        break;
                                    case "S":
                                        maxValue = 100;
                                }
                                $("<label />")
                                    .css("width", params.rgbWidth)
                                    .attr("data-component-index", index)
                                    .append($("<input>").attr("type", "text").gInputBox({ minValue: 0, maxValue: maxValue }))
                                    .append($("<span />").text(label))
                                    .appendTo(this._colorComponents);
                            }.bind(this)
                        );
                    } else
                        this._colorMode === GPatternChooser.ColorMode.CMYK &&
                            (this._colorMap.css("display", "none"),
                            this._colorEditor.toggleClass("cmyk-mode", true),
                            this._opacitySlider.toggleClass("cmyk-mode", true),
                            this._colorSlider.css("display", "none"),
                            Array.prototype.forEach.call(
                                ["C", "M", "Y", "K"],
                                function (label, index) {
                                    $("<label />")
                                        .addClass("cymk-label")
                                        .css("width", params.cmykWidth)
                                        .attr("data-component-index", index)
                                        .append($("<input>").attr("type", "text").gInputBox({ minValue: 0, maxValue: 100, postfix: "%" }))
                                        .append($("<span />").text(label))
                                        .appendTo(this._colorComponents);
                                }.bind(this)
                            ),
                            this._color instanceof GObject.GCMYKColor || (convertedColor = new GObject.GCMYKColor(GObject.GColor.rgbToCMYK(this._color.toScreen()))));
                    var updateFromComponents = this._updateColorFromColorComponents.bind(this);
                    (this._colorComponents.find("[data-component-index] input").each(function (e, inputElement) {
                        $(inputElement).on("change", () => {
                            (gDesigner.stats("patternchooser_change_colorinput"), updateFromComponents());
                        });
                    }),
                        $("<label />")
                            .css("width", "18%")
                            .attr("data-opacity", "")
                            .append(
                                $("<input>")
                                    .attr("type", "text")
                                    .gInputBox({ minValue: 0, maxValue: 100, postfix: "%" })
                                    .gInputBox("value", GObject.GUtil.formatOpacity(100 * this._colorOpacity))
                                    .on(
                                        "change",
                                        function (event) {
                                            (gDesigner.stats("patternchooser_change_opacity"),
                                                this._updateOpacity(
                                                    GObject.GLength.parseEquationValue($(event.target).gInputBox("value")) / 100,
                                                    "input"
                                                ));
                                        }.bind(this)
                                    )
                            )
                            .append($("<span />").text("A"))
                            .appendTo(this._colorComponents),
                        this._updateColorMap(),
                        convertedColor ? this._updateColor(convertedColor, "mode") : this._updateColorComponentsFromColor(),
                        this._relayout());
                }
            }),
            (GPatternChooser.prototype.open = function (target, settings) {
                (this._updateSettings(settings, true),
                    this._container.gOverlay("open", target),
                    "used" === this._activePalette && this._updateUsedPalette(),
                    gDesigner.getWorkspace().getStyleEdManager() &&
                        gDesigner.getWorkspace().getStyleEdManager().isActivated() &&
                        gDesigner
                            .getWorkspace()
                            .getStyleEdManager()
                            .addEventListener(GUI.GStyleEdManager.EditorEvent, this._styleEditorHandler, this));
                var activeDocument = gDesigner.getActiveDocument();
                activeDocument &&
                    (activeDocument.getEditor().addEventListener(GUI.GEditor.ModifiedEvent, this._closeIfNeeded, this),
                    activeDocument.getEditor().keysOff([GPlatform.GKey.Constant.OPTION]));
            }),
            (GPatternChooser.prototype.close = function () {
                this._container.gOverlay("close");
            }),
            (GPatternChooser.prototype.isOpenned = function (target) {
                return this._container.gOverlay("isOpenned", target);
            }),
            (GPatternChooser.prototype.setActiveGradientStopByIdx = function (index) {
                if (this._activeGradient && null !== index) {
                    var stops = this._activeGradient.getStops();
                    if (index >= 0 && index < stops.length) {
                        var stop = stops[index];
                        (this._setActiveGradientStop(stop), this._updateOnlineEditorStops());
                    }
                }
            }),
            (GPatternChooser.prototype._updateSettings = function (settings, replace) {
                this._settings = replace ? $.extend({ types: [] }, settings) : $.extend({ types: [] }, this._settings, settings);
                const { types, singleOption } = this._settings;
                if (singleOption) this._toolbar.css("display", "none");
                else {
                    "none" === this._toolbar.css("display") && this._toolbar.css("display", "");
                    const patternOptionElements = [];
                    for (let t = 0, patternTypesLength = GPatternChooser.PATTERN_TYPES.length; t < patternTypesLength; t++) {
                        var i = GPatternChooser.PATTERN_TYPES[t],
                            a = !types.length;
                        if (!a)
                            for (var r = 0; r < types.length; ++r)
                                if (i.isCompatible(types[r])) {
                                    a = true;
                                    break;
                                }
                        if (a) {
                            var s = GPatternChooser._createPatternOption(i);
                            patternOptionElements.push(s);
                        }
                    }
                    this._toolbar.find(".pattern-type-select").empty().append(patternOptionElements);
                }
                (this._opacitySlider.gInputSlider("disabled", this._settings.hasOwnProperty("hasOpacity") && !this._settings.hasOpacity),
                    this._patternEditor.find('[data-property="texture_mask"]').prop("disabled", !this._settings.hasMask));
            }),
            (GPatternChooser.prototype._createNoiseEditor = function () {
                var container = $("<div/>").addClass("noise-editor");
                $("<div/>")
                    .gPropertyRow({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.intensity")),
                        columns: [
                            {
                                width: "auto",
                                content: $("<div/>")
                                    .attr("data-property", "noise_amount")
                                    .gInputSlider({ min: 0, max: 100 })
                                    .on(
                                        "input",
                                        function (event) {
                                            var sliderElement = $(event.target),
                                                amount = parseFloat(sliderElement.gInputSlider("value")) / 100;
                                            if (
                                                (container
                                                    .find('[type="text"][data-property="noise_amount"]')
                                                    .gInputBox("value", GObject.GUtil.formatNumber(100 * amount, 0)),
                                                this._pattern)
                                            ) {
                                                var clonedPattern = this._pattern.clone();
                                                (clonedPattern.setAmount(amount), this._updatePattern(clonedPattern, "noise_amount", null, true));
                                            }
                                        }.bind(this)
                                    )
                                    .on(
                                        "change",
                                        function (event) {
                                            if ((gDesigner.stats("patternchooser_change_noise-amount"), this._pattern)) {
                                                var clonedPattern = this._pattern.clone();
                                                (clonedPattern.setAmount(parseFloat($(event.target).gInputSlider("value")) / 100),
                                                    this._updatePattern(clonedPattern, "noise_amount"));
                                            }
                                        }.bind(this)
                                    ),
                            },
                            {
                                width: "40px",
                                content: $("<input>")
                                    .attr("data-property", "noise_amount")
                                    .attr("type", "text")
                                    .on(
                                        "change",
                                        function (event) {
                                            if ((gDesigner.stats("patternchooser_change_noise", "amount"), this._pattern)) {
                                                var clonedPattern = this._pattern.clone();
                                                (clonedPattern.setAmount(GObject.GLength.parseEquationValue($(event.target).gInputBox("value")) / 100),
                                                    this._updatePattern(clonedPattern, "noise_amount"));
                                            }
                                        }.bind(this)
                                    )
                                    .gInputBox({ minValue: 0, maxValue: 100, incrementValue: 1 }),
                            },
                        ],
                    })
                    .appendTo(container);
                var noiseTypeEnum, propertyCategory, selectElement;
                return (
                    $("<div/>")
                        .gPropertyRow({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.type")),
                            columns: [
                                {
                                    width: "auto",
                                    content: ((noiseTypeEnum = GObject.GNoisePattern.Type),
                                    (propertyCategory = "type"),
                                    (selectElement = $("<select></select>")),
                                    (noiseTypeEnum = noiseTypeEnum || []),
                                    Array.prototype.forEach.call(Object.keys(noiseTypeEnum), function (key) {
                                        $("<option></option>")
                                            .attr("value", noiseTypeEnum[key])
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "noise." + propertyCategory + "." + noiseTypeEnum[key])))
                                            .appendTo(selectElement);
                                    }),
                                    selectElement)
                                        .attr("data-property", "noise_type")
                                        .on(
                                            "change",
                                            function (event) {
                                                if ((gDesigner.stats("patternchooser_change_noise", "type"), this._pattern)) {
                                                    var clonedPattern = this._pattern.clone();
                                                    (clonedPattern.setType($(event.target).val()), this._updatePattern(clonedPattern, "noise_type"));
                                                }
                                            }.bind(this)
                                        ),
                                },
                            ],
                        })
                        .appendTo(container),
                    container
                );
            }),
            (GPatternChooser.prototype._createPatternEditorFirstRow = function (onChooseImage, onPasteImage) {
                return [
                    {
                        padding: false,
                        content: $("<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.choose-image")) + "...</button>")
                            .addClass("pattern-choose-image-button")
                            .on("click", onChooseImage),
                    },
                    {
                        width: "auto",
                        content: $("<button />")
                            .addClass("paste-btn")
                            .addClass("g-flat")
                            .append($("<span />").addClass("gravit-icon-paste"))
                            .append(
                                $("<span />")
                                    .addClass("title")
                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GPasteAction", "title")))
                            )
                            .on("click", onPasteImage),
                    },
                ];
            }),
            (GPatternChooser.prototype._createPatternEditorMaskRow = function (onMaskChange) {
                return [
                    {
                        padding: false,
                        width: "auto",
                        content: $("<span />").text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.set-transparency-mask"))),
                    },
                    {
                        padding: false,
                        width: "40px",
                        content: $("<label />")
                            .addClass("g-switch")
                            .append(
                                $("<input>")
                                    .attr("type", "checkbox")
                                    .attr("data-property", "texture_mask")
                                    .prop("disabled", true)
                                    .on("change", onMaskChange)
                            )
                            .append($("<div/>")),
                    },
                ];
            }),
            (GPatternChooser.prototype._createPatternEditorScaleRow = function (onTileInput, onTileChange, onTileTextChange) {
                return [
                    {
                        width: "auto",
                        content: $("<div/>")
                            .attr("data-property", "texture_tile")
                            .gInputSlider({ min: 10, max: 200 })
                            .on("input", onTileInput)
                            .on("change", onTileChange),
                    },
                    {
                        width: "40px",
                        content: $("<input>").attr("data-property", "texture_tile").attr("type", "text").on("change", onTileTextChange).gInputBox({
                            minValue: 10,
                            maxValue: 200,
                            incrementValue: 1,
                            postfix: "%",
                        }),
                    },
                ];
            }),
            (GPatternChooser.prototype._createPatternEditorAdvancedRow = function (advancedSettingsContainer) {
                return [
                    {
                        width: "auto",
                        content: $("<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.advanced")) + "</button>").on(
                            "click",
                            function () {
                                (gDesigner.stats("patternchooser_click_advanced"), advancedSettingsContainer.slideToggle());
                            }.bind(this)
                        ),
                    },
                ];
            }),
            (GPatternChooser.prototype.__getCreatePatternEditorParams = function () {
                return {
                    isTouchEnabled: false,
                    repeatWidth: "50%",
                    ghostWidth: "0%",
                    postionWith: "50%",
                    sizeWidth: "52%",
                    unitWidth: "10%",
                };
            }),
            (GPatternChooser.prototype._createPatternEditor = function () {
                var params = this.__getCreatePatternEditorParams(),
                    container = $("<div/>").addClass("pattern-editor"),
                    createSelect = function (enumValues, propertyCategory) {
                        var selectElement = $("<select></select>");
                        return (
                            (enumValues = enumValues || []),
                            Array.prototype.forEach.call(Object.keys(enumValues), function (key) {
                                $("<option></option>")
                                    .attr("value", enumValues[key])
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "texture." + propertyCategory + "." + enumValues[key])))
                                    .appendTo(selectElement);
                            }),
                            selectElement
                        );
                    },
                    onMaskChange = (event) => {
                        gDesigner.stats("patternchooser_change_texture", "mask");
                        var clonedPattern = this._pattern.clone();
                        (clonedPattern.setMask($(event.target).prop("checked")), this._updatePattern(clonedPattern, "texture_mask"));
                    },
                    onTileSliderInput = (event) => {
                        var sliderElement = $(event.target),
                            propertyName = sliderElement.attr("data-property"),
                            tileSizeRatio = parseFloat(sliderElement.gInputSlider("value")) / 100;
                        if (
                            (container.find('[type="text"][data-property="' + propertyName + '"]').gInputBox("value", GObject.GUtil.formatNumber(100 * tileSizeRatio, 0)),
                            this._pattern)
                        ) {
                            var clonedPattern = this._pattern.clone();
                            (clonedPattern.setTileSize(tileSizeRatio), this._updatePattern(clonedPattern, "texture_tile", null, true));
                        }
                    },
                    onTileSliderChange = (event) => {
                        if ((gDesigner.stats("patternchooser_change_texture", "tile"), this._pattern)) {
                            var clonedPattern = this._pattern.clone();
                            (clonedPattern.setTileSize(parseFloat($(event.target).gInputSlider("value")) / 100), this._updatePattern(clonedPattern, "texture_tile"));
                        }
                    },
                    onTileTextChange = (event) => {
                        if ((gDesigner.stats("patternchooser_change_texture", "tile"), this._pattern)) {
                            var clonedPattern = this._pattern.clone();
                            (clonedPattern.setTileSize(GObject.GLength.parseEquationValue($(event.target).gInputBox("value")) / 100),
                                this._updatePattern(clonedPattern, "texture_tile"));
                        }
                    };
                ($("<div/>")
                    .addClass("choose-section")
                    .append($("<div/>").addClass("pattern-preview-container").append($("<div/>").addClass("pattern-preview")))
                    .append(
                        $("<div/>")
                            .addClass("pattern-info-container")
                            .append(
                                $("<div/>").gPropertyRow({
                                    clazz: "first-row",
                                    columns: this._createPatternEditorFirstRow(
                                        () => {
                                            gDesigner.stats("patternchooser_choose_image");
                                            var activeDocument = gDesigner.getActiveDocument(),
                                                storage = storage || (activeDocument ? activeDocument.getStorage() : null) || gDesigner.getDefaultStorage();
                                            storage &&
                                                storage.canPromptOpen() &&
                                                storage.openPrompt(
                                                    GPatternChooser.enableFileTypes,
                                                    (file) => {
                                                        file.read((data) => {
                                                            var fileReader = new FileReader();
                                                            ((fileReader.onload = () => {
                                                                var resultPattern,
                                                                    dataUrl = fileReader.result;
                                                                (this._pattern instanceof GObject.GTexturePattern
                                                                    ? (resultPattern = this._pattern.clone()).setTexture(dataUrl)
                                                                    : (resultPattern = new GObject.GTexturePattern(dataUrl)).setScene(
                                                                          gDesigner.getActiveDocument().getScene()
                                                                      ),
                                                                    this._updatePattern(resultPattern, "texture_upload"));
                                                            }),
                                                                fileReader.readAsDataURL(new Blob([data])));
                                                        });
                                                    },
                                                    false
                                                );
                                        },
                                        () => {
                                            gDesigner.stats("patternchooser_paste_texture");
                                            var pasted = false,
                                                nodes = GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE));
                                            if (nodes && nodes.length)
                                                for (var n = 0; n < nodes.length; ++n) {
                                                    var o = nodes[n];
                                                    if (o.hasMixin(GObject.GVertexSource) || o instanceof GObject.GGroup) {
                                                        if (this._pattern) {
                                                            var a = this._pattern.clone();
                                                            (a.setTexture(o), this._updatePattern(a, "texture_paste"));
                                                        }
                                                        pasted = true;
                                                        break;
                                                    }
                                                }
                                            pasted || window.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "arrow-paste.alert")));
                                        }
                                    ),
                                })
                            )
                            .append(
                                $("<div/>").gPropertyRow({
                                    columns: [
                                        {
                                            width: "100%",
                                            content: createSelect(GObject.GTexturePattern.ScaleMode, "scale")
                                                .attr("data-property", "texture_scale")
                                                .on(
                                                    "change",
                                                    function (event) {
                                                        if (this._pattern) {
                                                            var clonedPattern = this._pattern.clone();
                                                            (clonedPattern.setScaleMode($(event.target).val()),
                                                                (0, GObject.GTexturePattern.ScaleSettings[$(event.target).val()])(clonedPattern),
                                                                gDesigner.stats("patternchooser_change_texture", clonedPattern.getScaleMode()),
                                                                this._updatePattern(clonedPattern, "texture_pattern"));
                                                        }
                                                    }.bind(this)
                                                ),
                                        },
                                    ],
                                })
                            )
                            .append(
                                $("<div/>").gPropertyRow({
                                    columns: params.isTouchEnabled
                                        ? this._createPatternEditorMaskRow(onMaskChange)
                                        : this._createPatternEditorScaleRow(onTileSliderInput, onTileSliderChange, onTileTextChange),
                                })
                            )
                    )
                    .appendTo(container),
                    $("<div/>")
                        .addClass(params.isTouchEnabled ? "scale" : "")
                        .gPropertyRow({
                            columns: params.isTouchEnabled ? this._createPatternEditorScaleRow(onTileSliderInput, onTileSliderChange, onTileTextChange) : this._createPatternEditorMaskRow(onMaskChange),
                        })
                        .appendTo(container));
                var advancedSettingsContainer = $("<div/>").addClass("pattern-advanced-settings");
                return (
                    $("<div/>")
                        .gPropertyRow({ columns: this._createPatternEditorAdvancedRow(advancedSettingsContainer) })
                        .appendTo(container),
                    $("<div/>")
                        .gPropertyRow({
                            columns: [
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.repeat")),
                                    width: params.repeatWidth,
                                    content: createSelect(GObject.GTexturePattern.RepeatMode, "repeat")
                                        .attr("data-property", "texture_repeat")
                                        .on(
                                            "change",
                                            function (event) {
                                                if ((gDesigner.stats("patternchooser_change_texture", "repeat"), this._pattern)) {
                                                    var clonedPattern = this._pattern.clone();
                                                    (clonedPattern.setRepeatMode($(event.target).val()), this._updatePattern(clonedPattern, "texture_repeat"));
                                                }
                                            }.bind(this)
                                        ),
                                },
                                { width: params.ghostWidth },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.position")),
                                    width: params.postionWith,
                                    content: createSelect(GObject.GTexturePattern.PositionMode, "position")
                                        .attr("data-property", "texture_position")
                                        .on(
                                            "change",
                                            function (event) {
                                                if ((gDesigner.stats("patternchooser_change_texture", "position"), this._pattern)) {
                                                    var clonedPattern = this._pattern.clone();
                                                    (clonedPattern.setPosition($(event.target).val()), this._updatePattern(clonedPattern, "texture_position"));
                                                }
                                            }.bind(this)
                                        ),
                                },
                            ],
                        })
                        .gPropertyRow({
                            columns: [
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.size")),
                                    width: params.sizeWidth,
                                    content: createSelect(GObject.GTexturePattern.SizeMode, "size")
                                        .attr("data-property", "texture_size")
                                        .on(
                                            "change",
                                            function (event) {
                                                if ((gDesigner.stats("patternchooser_change_texture", "size"), this._pattern)) {
                                                    var clonedPattern = this._pattern.clone();
                                                    (clonedPattern.setSizeMode($(event.target).val()), this._updatePattern(clonedPattern, "texture_size"));
                                                }
                                            }.bind(this)
                                        ),
                                },
                                { width: params.ghostWidth },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.width")),
                                    width: "20%",
                                    content: $("<input>")
                                        .attr("data-property", "texture_size_w")
                                        .attr("type", "text")
                                        .on(
                                            "change",
                                            function (event) {
                                                if ((gDesigner.stats("patternchooser_change_texture", "size"), this._pattern)) {
                                                    var width = GObject.GLength.parseEquationValue($(event.target).val());
                                                    if (null !== width && width >= 0) {
                                                        var clonedPattern = this._pattern.clone();
                                                        (clonedPattern.setWidth(width), this._updatePattern(clonedPattern, "texture_size"));
                                                    }
                                                }
                                            }.bind(this)
                                        )
                                        .gInputBox(),
                                },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.height")),
                                    width: "20%",
                                    content: $("<input>")
                                        .attr("data-property", "texture_size_h")
                                        .attr("type", "text")
                                        .on(
                                            "change",
                                            function (event) {
                                                if ((gDesigner.stats("patternchooser_change_texture", "size-h"), this._pattern)) {
                                                    var height = GObject.GLength.parseEquationValue($(event.target).val());
                                                    if (null !== height && height >= 0) {
                                                        var clonedPattern = this._pattern.clone();
                                                        (clonedPattern.setHeight(height), this._updatePattern(clonedPattern, "texture_size"));
                                                    }
                                                }
                                            }.bind(this)
                                        )
                                        .gInputBox(),
                                },
                                {
                                    label: params.isTouchEnabled ? "" : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.unit")),
                                    width: params.unitWidth,
                                    content: $("<label />").attr("data-property", "texture_size_u"),
                                },
                            ],
                        })
                        .appendTo(advancedSettingsContainer),
                    advancedSettingsContainer.appendTo(container),
                    container
                );
            }),
            (GPatternChooser.prototype.__getCreatePaletteSwatchParamas = function () {
                return { isTouchEnabled: false };
            }),
            (GPatternChooser.prototype._findOrCreateLastSwitchContiner = function (container) {
                var lastSwatchesRow = container.find(".swatches:last");
                lastSwatchesRow.length > 0
                    ? lastSwatchesRow.find(".swatch").length >= 8 && (lastSwatchesRow = $("<div/>").addClass("swatches").appendTo(container))
                    : (lastSwatchesRow = $("<div/>").addClass("swatches").appendTo(container));
                return lastSwatchesRow;
            }),
            (GPatternChooser.prototype._createPaletteSwatch = function (color, container, draggable, forceNewRow) {
                var params = this.__getCreatePaletteSwatchParamas(),
                    swatch = color instanceof GObject.GSwatch ? color : new GObject.GSwatch(color),
                    targetContainer = container;
                params.isTouchEnabled && (targetContainer = forceNewRow ? $("<div/>").addClass("swatches").appendTo(container) : this._findOrCreateLastSwitchContiner(container));
                var onDragStart = function (event) {
                        if (!GPatternChooser.canDragSwatch) return (event.preventDefault(), void event.stopPropagation());
                        var grabbedSwatchElement = $(event.target).closest(".swatch"),
                            offset = grabbedSwatchElement.offset(),
                            originalEvent = event.originalEvent;
                        (originalEvent.stopPropagation(),
                            (GPatternChooser.dragSwatch = grabbedSwatchElement),
                            (GPatternChooser.hasDropped = false),
                            (GPatternChooser.dragDeltaX = originalEvent.pageX - offset.left),
                            (GPatternChooser.dragDeltaY = originalEvent.pageY - offset.top),
                            (originalEvent.dataTransfer.effectAllowed = "move"),
                            originalEvent.dataTransfer.setData("text/plain", "dummy_data"));
                    }.bind(this),
                    onDragEnd = function (event) {
                        var originalEvent = event.originalEvent;
                        (originalEvent.stopPropagation(), targetContainer.find(".grid-drag-overlay").remove());
                        var outOfBounds = false,
                            chooserElement = $(".pattern-chooser"),
                            top = chooserElement.offset().top,
                            left = chooserElement.offset().left,
                            right = left + chooserElement.width(),
                            bottom = top + chooserElement.height(),
                            pageX = originalEvent.pageX,
                            pageY = originalEvent.pageY;
                        if (((pageX > right || pageX < left || pageY > bottom || pageY < top) && (outOfBounds = true), GPatternChooser.dragSwatch && outOfBounds)) {
                            var editor = gDesigner.getActiveDocument().getEditor();
                            editor.beginTransaction();
                            try {
                                var draggedSwatch = GPatternChooser.dragSwatch.data("swatch"),
                                    scope = this._getSwatchScope(
                                        GPatternChooser.dragSwatch.closest(".swatches-wrapper").hasClass("global") ? "global" : "document",
                                        draggedSwatch.getProperty("_pt")
                                    ),
                                    swatches = gDesigner.getSwatches(scope);
                                if (draggedSwatch && swatches) {
                                    for (var y = 0; y < swatches.length; ++y)
                                        if (GObject.GUtil.equals(draggedSwatch, swatches[y])) {
                                            (swatches = swatches.slice()).splice(y, 1);
                                            break;
                                        }
                                    gDesigner.setSwatches(scope, swatches);
                                }
                            } finally {
                                editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.remove-swatch")), {
                                    chooserOn: true,
                                });
                            }
                        }
                        GPatternChooser.hasDropped = false;
                    }.bind(this),
                    pattern = swatch.getProperty("_pt");
                const isTexturePattern = pattern instanceof GObject.GTexturePattern && !(pattern instanceof GObject.GNoisePattern);
                gDesigner.getActiveDocument() && isTexturePattern && (pattern = this._clonePattern(pattern));
                var opacity = swatch.getProperty("_op"),
                    swatchElement = $("<div/>")
                        .addClass("swatch")
                        .css("background", GObject.GPattern.asCSSBackground(pattern, opacity))
                        .data("swatch", swatch)
                        .attr("draggable", draggable)
                        .attr("data-long-press-delay", "500")
                        .on("long-press", (event) => {
                            params.isTouchEnabled && ((this._currentLongPressTarget = event.target), this._contextMenu.open(event.target));
                        })
                        .on(
                            "click",
                            function (event) {
                                gDesigner.stats("patternchooser_click_swatch");
                                var clickedSwatch = $(event.target).closest(".swatch").data("swatch"),
                                    clickedPattern = clickedSwatch.getProperty("_pt"),
                                    clickedOpacity = clickedSwatch.getProperty("_op"),
                                    selectedColorMode = $(".colormode-selector").children("option:selected").data("colormode");
                                if (GPlatform.GPlatform.modifiers.optionKey) {
                                    var selection = gDesigner.getActiveDocument().getEditor().selectFromPattern(clickedPattern, true);
                                    if (selection) {
                                        ($(".g-overlay .pattern-chooser").length > 0 && $(".g-overlay .pattern-chooser").gOverlay("close"),
                                            gDesigner.getActiveDocument().getEditor().updateSelection(false, selection),
                                            gDesigner.getActiveDocument().getEditor().blinkSelection(2e3, 4));
                                        for (var previewElements = $(".fill-properties-panel .g-pattern-chooser .preview"), c = 0; c < previewElements.length; ++c)
                                            if (
                                                $(previewElements[c]).data("gpatterntarget") &&
                                                GObject.GUtil.equals($(previewElements[c]).data("gpatterntarget").pattern, clickedPattern)
                                            ) {
                                                $(previewElements[c]).trigger("click");
                                                break;
                                            }
                                    }
                                } else (this._updateOpacity(clickedOpacity), this._updatePattern(clickedPattern, "set_type", true));
                                this.setColorMode(selectedColorMode);
                            }.bind(this)
                        )
                        .appendTo(targetContainer);
                if (
                    (swatch.isCMYK() && this._addCmykIcon(swatchElement),
                    draggable &&
                        swatchElement
                            .on("mousedown", function (event) {
                                GPatternChooser.canDragSwatch = $(event.target).hasClass("swatch");
                            })
                            .on("dragenter", function () {
                                (function (swatchElement) {
                                    let isDraggedGlobal = GPatternChooser.dragSwatch.closest(".swatches-wrapper").hasClass("global"),
                                        isTargetGlobal = swatchElement.closest(".swatches-wrapper").hasClass("global"),
                                        sameCmykType = GPatternChooser.dragSwatch.data("swatch").isCMYK() === swatchElement.data("swatch").isCMYK();
                                    return !(!((isDraggedGlobal && isTargetGlobal) || (!isDraggedGlobal && !isTargetGlobal)) || !sameCmykType);
                                })($(this)) && $(this).addClass("g-drop");
                            })
                            .on("dragleave", function () {
                                $(this).removeClass("g-drop");
                            })
                            .on("dragstart", onDragStart)
                            .on("dragend", onDragEnd)
                            .on("dragover", function (event) {
                                event.preventDefault();
                            })
                            .on(
                                "drop",
                                function () {
                                    targetContainer.find(".grid-drag-overlay").remove();
                                    var dropTarget = GPatternChooser.dragSwatch.closest(".swatches-wrapper").find(".g-drop");
                                    if ((dropTarget.removeClass("g-drop"), GPatternChooser.dragSwatch && dropTarget.length > 0)) {
                                        var draggedSwatch = GPatternChooser.dragSwatch.data("swatch"),
                                            droppedOnSwatch = $(dropTarget).data("swatch"),
                                            scope = this._getSwatchScope(
                                                GPatternChooser.dragSwatch.closest(".swatches-wrapper").hasClass("global") ? "global" : "document",
                                                draggedSwatch.getProperty("_pt")
                                            ),
                                            swatches = gDesigner.getSwatches(scope),
                                            draggedIndex = -1,
                                            targetIndex = -1;
                                        if (draggedSwatch && swatches && droppedOnSwatch) {
                                            for (var c = 0; c < swatches.length; ++c)
                                                GObject.GUtil.equals(draggedSwatch, swatches[c]) ? (draggedIndex = c) : GObject.GUtil.equals(droppedOnSwatch, swatches[c]) && (targetIndex = c);
                                            (draggedIndex > -1 && targetIndex > -1 && ((swatches = swatches.slice()).splice(draggedIndex, 1), swatches.splice(targetIndex, 0, draggedSwatch)),
                                                gDesigner.setSwatches(scope, swatches));
                                        }
                                    }
                                }.bind(this)
                            ),
                    isTexturePattern && !pattern.isReady())
                ) {
                    const onReady = () => {
                        pattern.isReady() &&
                            (swatchElement.css("background", GObject.GPattern.asCSSBackground(pattern, opacity)),
                            pattern.removeEventListener(GObject.GTexturePattern.UpdateEvent, onReady));
                    };
                    pattern.addEventListener(GObject.GTexturePattern.UpdateEvent, onReady);
                }
            }),
            (GPatternChooser.prototype._addCmykIcon = function (container) {
                container.append(
                    $("<div/>")
                        .addClass("cmyk-swatch")
                        .append($("<div/>").addClass("cmyk-icon c"))
                        .append($("<div/>").addClass("cmyk-icon m"))
                        .append($("<div/>").addClass("cmyk-icon y"))
                        .append($("<div/>").addClass("cmyk-icon k"))
                );
            }),
            (GPatternChooser.prototype.__getCreateColorsPaletteParams = function () {
                return { isTouchEnabled: false };
            }),
            (GPatternChooser.prototype._createColorsPalette = function (container) {
                var params = this.__getCreatePaletteSwatchParamas(),
                    swatchesContainer = $("<div/>").addClass("swatches").appendTo(container);
                params.isTouchEnabled && (swatchesContainer = container);
                var black = [0, 0, 0],
                    white = [255, 255, 255];
                this._createPaletteSwatch(new GObject.GRGBColor(black), swatchesContainer, false, false);
                for (var r = 1; r <= 10; r += 1)
                    this._createPaletteSwatch(new GObject.GRGBColor(GObject.GRGBColor.blend(black, white, r * (1 / 11))), swatchesContainer, false, false);
                this._createPaletteSwatch(new GObject.GRGBColor(white), swatchesContainer, false, false);
                var baseColors = [
                        [152, 0, 0],
                        [255, 0, 0],
                        [255, 153, 0],
                        [255, 255, 0],
                        [0, 255, 0],
                        [0, 255, 255],
                        [0, 150, 136],
                        [96, 125, 139],
                        [74, 134, 232],
                        [0, 0, 255],
                        [153, 0, 255],
                        [255, 0, 255],
                    ],
                    shadeSteps = [];
                for (let n = -1; n < shadeSteps.length; ++n) {
                    var c = container;
                    params.isTouchEnabled || (c = $("<div/>").addClass("swatches").appendTo(container));
                    var d = null,
                        u = 0;
                    n >= 0 && ((d = shadeSteps[n].color), (u = shadeSteps[n].factor));
                    for (let e = 0; e < baseColors.length; ++e) {
                        var p = baseColors[e],
                            g = d ? GObject.GRGBColor.blend(p, d, u) : p;
                        this._createPaletteSwatch(new GObject.GRGBColor(g), c, false, false);
                    }
                }
            }),
            (GPatternChooser.prototype._createMixerPalette = function (container) {
                for (
                    var tintsContainer = $("<div/>")
                            .attr("data-container", "tints")
                            .addClass("swatches")
                            .append($("<label />").text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.tints"))))
                            .appendTo(container),
                        shadesContainer = $("<div/>")
                            .attr("data-container", "shades")
                            .append($("<label />").text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.shades"))))
                            .addClass("swatches")
                            .appendTo(container),
                        tonesContainer = $("<div/>")
                            .attr("data-container", "tones")
                            .append($("<label />").text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.tones"))))
                            .addClass("swatches")
                            .appendTo(container),
                        mixesContainer = $("<div/>")
                            .attr("data-container", "mixes")
                            .append($("<label />").text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.mixes"))))
                            .addClass("swatches")
                            .appendTo(container),
                        r = 1;
                    r <= 10;
                    r += 1
                )
                    (this._createPaletteSwatch(GObject.GRGBColor.WHITE, tintsContainer),
                        this._createPaletteSwatch(GObject.GRGBColor.WHITE, shadesContainer),
                        this._createPaletteSwatch(GObject.GRGBColor.WHITE, tonesContainer),
                        this._createPaletteSwatch(GObject.GRGBColor.WHITE, mixesContainer));
                this._updateMixerPalette();
            }),
            (GPatternChooser.prototype.__getUpdateMixerPaletteParams = function () {
                return { maxCount: 10 };
            }),
            (GPatternChooser.prototype._updateMixerPalette = function () {
                var params = this.__getUpdateMixerPaletteParams();
                function t(color, t, index) {
                    $(t[index]).css("background", GObject.GPattern.asCSSBackground(color)).data("swatch", new GObject.GSwatch(color));
                }
                for (
                    var white = [255, 255, 255],
                        black = [0, 0, 0],
                        gray = [128, 128, 128],
                        baseColor = this._color.toScreen(),
                        tintSwatches = this._palettes.find('.mixer-palette [data-container="tints"] .swatch'),
                        shadeSwatches = this._palettes.find('.mixer-palette [data-container="shades"] .swatch'),
                        toneSwatches = this._palettes.find('.mixer-palette [data-container="tones"] .swatch'),
                        mixSwatches = this._palettes.find('.mixer-palette [data-container="mixes"] .swatch'),
                        u = 0;
                    u < params.maxCount;
                    u += 1
                ) {
                    var p = (u + 1) / (1 * params.maxCount);
                    (t(new GObject.GRGBColor(GObject.GRGBColor.blend(baseColor, white, p)), tintSwatches, u),
                        t(new GObject.GRGBColor(GObject.GRGBColor.blend(baseColor, black, p)), shadeSwatches, u),
                        t(new GObject.GRGBColor(GObject.GRGBColor.blend(baseColor, gray, p)), toneSwatches, u),
                        t(new GObject.GRGBColor(GObject.GRGBColor.blend(baseColor, this._oldColor.toScreen(), p)), mixSwatches, u));
                }
            }),
            (GPatternChooser.prototype.__getCreateUsedPaletteParams = function () {
                return { isTouchEnabled: false, maxCount: 12 };
            }),
            (GPatternChooser.prototype._createUsedPalette = function (container) {
                var params = this.__getCreateUsedPaletteParams();
                let extraContainer;
                params.isTouchEnabled || (extraContainer = $("<div/>").addClass("swatches").appendTo(container));
                for (var o = 0; o < params.maxCount; o += 1) this._createPaletteSwatch(GObject.GRGBColor.WHITE, params.isTouchEnabled ? container : extraContainer, false, false);
            }),
            (GPatternChooser.prototype._updateUsedPalette = function () {
                var documentColors = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getDocumentColors() : [];
                ($(".palettes > .used-palette").empty(), this._createUsedPalette($(".palettes > .used-palette")));
                for (var t = 12, n = 0; n < t; n += 1) {
                    var o = n < documentColors.length,
                        a = o ? documentColors[n] : null,
                        r = this._palettes.find(".used-palette .swatches .swatch")[n],
                        s = new GObject.GSwatch(a);
                    (o && $(r).css("background", GObject.GPattern.asCSSBackground(a)).data("swatch", s),
                        $(r).css("display", o ? "" : "none"),
                        s.isCMYK() && this._addCmykIcon($(r)),
                        n % 11 == 0 && o && ((t += 12), this._createUsedPalette($(".palettes > .used-palette"))));
                }
            }),
            (GPatternChooser.prototype._createSwatchesPalette = function (container, scope) {
                var scopeLabel = $("<span/>").text(
                        "global" === scope
                            ? GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.global"))
                            : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.document"))
                    ),
                    wrapper = $("<div/>").addClass("swatches-wrapper").addClass(scope),
                    toolbar = $("<div/>")
                        .addClass("toolbar")
                        .addClass(scope)
                        .append(scopeLabel)
                        .append(
                            $("<button/>")
                                .append("<span/>")
                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.import-swatches")))
                                .addClass("swatch-icon")
                                .addClass("gravit-icon-swatches-import")
                                .on("click", () => {
                                    (gDesigner.stats("patternchooser_import_swatches"), gDesigner.importSwatches(scope));
                                })
                        )
                        .append(
                            $("<button/>")
                                .append("<span/>")
                                .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.export-swatches")))
                                .addClass("swatch-icon")
                                .addClass("gravit-icon-swatches-export")
                                .on("click", () => {
                                    (gDesigner.stats("patternchooser_export_swatches"), gDesigner.exportSwatches(scope));
                                })
                        )
                        .appendTo(container);
                (wrapper.appendTo(container), toolbar.gAccordion(wrapper, "span", false));
            }),
            (GPatternChooser.prototype._getSwatchScope = function (scope, pattern) {
                return pattern && pattern instanceof GObject.GLinearGradient
                    ? scope + "-linear-gradient"
                    : pattern && pattern instanceof GObject.GRadialGradient
                      ? scope + "-radial-gradient"
                      : pattern && pattern instanceof GObject.GAngularGradient
                        ? scope + "-angular-gradient"
                        : pattern && pattern instanceof GObject.GTexturePattern && !(pattern instanceof GObject.GNoisePattern)
                          ? scope + "-texture-pattern"
                          : pattern && pattern instanceof GObject.GNoisePattern
                            ? scope + "-noise-pattern"
                            : scope;
            }),
            (GPatternChooser.prototype.__getUpdateSwatchesPaletteParams = function () {
                return { isTouchEnabled: false };
            }),
            (GPatternChooser.prototype._updateSwatchesPalette = function (scope) {
                var params = this.__getUpdateSwatchesPaletteParams(),
                    hasSuffix = scope.indexOf("-") > 0,
                    wrapper = this._palettes.find(".swatches-palette .swatches-wrapper." + (hasSuffix ? scope.substring(0, scope.indexOf("-")) : scope)).empty(),
                    swatches = gDesigner.getSwatches(scope);
                if (!swatches)
                    return void $("<div/>")
                        .addClass("info")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.error-on-loading")))
                        .appendTo(wrapper);
                var nonCmykSwatches = [],
                    cmykSwatches = [];
                for (let e = 0; e < swatches.length; ++e) swatches[e].isCMYK() ? cmykSwatches.push(swatches[e]) : nonCmykSwatches.push(swatches[e]);
                nonCmykSwatches = nonCmykSwatches.concat(cmykSwatches);
                let currentRow = null;
                var c = 1;
                if (!params.isTouchEnabled && nonCmykSwatches.length)
                    for (let e = 0; e < nonCmykSwatches.length; ++e)
                        (currentRow || (currentRow = $("<div/>").addClass("swatches").appendTo(wrapper)),
                            this._createPaletteSwatch(nonCmykSwatches[e], currentRow, true, false),
                            14 == ++c && ((c = 1), (currentRow = null)));
                if (
                    (currentRow || (currentRow = $("<div/>").addClass("swatches").appendTo(wrapper)),
                    $("<button />")
                        .addClass(params.isTouchEnabled ? "add-button swatch-button" : "swatch-button")
                        .addClass("g-flat")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.add-swatch")))
                        .append($('<span class="gravit-icon-plus"/>'))
                        .on(
                            "click",
                            function () {
                                gDesigner.stats("patternchooser_add_swatch", scope);
                                var newSwatch = new GObject.GSwatch(this._pattern, this._opacity),
                                    existingSwatches = gDesigner.getSwatches(scope);
                                if (existingSwatches) {
                                    for (var o = 0; o < existingSwatches.length; ++o)
                                        if (GObject.GUtil.equals(newSwatch, existingSwatches[o], true))
                                            return void GSystemDialog.alert(
                                                GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.equal-swatch-alert"))
                                            );
                                    (existingSwatches.push(newSwatch), gDesigner.setSwatches(scope, existingSwatches));
                                }
                            }.bind(this)
                        )
                        .appendTo(currentRow),
                    params.isTouchEnabled && ((currentRow = null), nonCmykSwatches.length))
                )
                    for (var u = 0; u < nonCmykSwatches.length; ++u) this._createPaletteSwatch(nonCmykSwatches[u], wrapper, true, 7 === u);
                this._updateActiveSwatch(hasSuffix ? scope.substring(0, scope.indexOf("-")) : scope);
            }),
            (GPatternChooser.prototype._updateActiveSwatch = function (scope) {
                if ("swatches" === this._activePalette) {
                    var scopePalette = this._palettes.find(".swatches-palette." + scope),
                        hasActiveMatch = false;
                    (scopePalette.find(".swatches-wrapper .swatches .swatch").each(
                        function (e, swatchElement) {
                            var swatchEl = $(swatchElement),
                                isMatch = GObject.GUtil.equals(swatchEl.data("swatch"), new GObject.GSwatch(this._pattern, this._opacity), true);
                            (isMatch && (hasActiveMatch = true), swatchEl.data("isActive", isMatch).toggleClass("g-active", isMatch));
                        }.bind(this)
                    ),
                        scopePalette.find(".toolbar button[data-active-swatch]").each(function (e, buttonElement) {
                            $(buttonElement).prop("disabled", !hasActiveMatch);
                        }));
                }
            }),
            (GPatternChooser.prototype._swatchesChanged = function (event) {
                this._updateSwatchesPalette(event.scope);
            }),
            (GPatternChooser.prototype._activatePalette = function (paletteId) {
                if (paletteId !== this._activePalette) {
                    switch (this._activatePalette) {
                        case "swatches":
                            gDesigner.removeEventListener(GSwatchesChangedEvent, this._swatchesChanged, this);
                    }
                    switch (
                        (this._palettes.find(".chooser [data-palette]").each(function (t, paletteButton) {
                            var buttonEl = $(paletteButton);
                            buttonEl.toggleClass("g-active", buttonEl.attr("data-palette") === paletteId);
                        }),
                        this._palettes.find(".palette").each(function (t, paletteElement) {
                            var paletteEl = $(paletteElement);
                            paletteEl.css("display", paletteEl.attr("data-palette") === paletteId ? "" : "none");
                        }),
                        paletteId)
                    ) {
                        case "mixer":
                            this._updateMixerPalette();
                            break;
                        case "used":
                            this._updateUsedPalette();
                            break;
                        case "swatches":
                            (this._updateSwatchesPalette(this._getSwatchScope("global", this._pattern)),
                                this._updateSwatchesPalette(this._getSwatchScope("document", this._pattern)),
                                gDesigner.addEventListener(GSwatchesChangedEvent, this._swatchesChanged, this));
                    }
                    ((this._activePalette = paletteId), this._relayout());
                }
            }),
            (GPatternChooser.prototype._setActiveGradientStop = function (stop, colorOverride, n) {
                (stop !== this._activeGradientStop || n) &&
                    ((this._activeGradientStop = stop),
                    this._activeGradientStop &&
                        (this._updateColor(colorOverride || this._activeGradientStop.color, n ? "" : "gradient-stop"),
                        this._updateOpacity(this._activeGradientStop.opacity, "gradient-stop"),
                        Array.prototype.forEach.call(
                            this._activeGradient.getStops(),
                            function (stop) {
                                this._updateGradientStop(stop);
                            }.bind(this)
                        )));
            }),
            (GPatternChooser.prototype._updateOnlineEditorStops = function () {
                if (gDesigner.getWorkspace().getStyleEdManager() && gDesigner.getWorkspace().getStyleEdManager().isActivated()) {
                    var activeStopIndex = null;
                    this._activeGradientStop &&
                        this._activeGradient &&
                        Array.prototype.forEach.call(
                            this._activeGradient.getStops(),
                            function (stop, index) {
                                stop === this._activeGradientStop && (activeStopIndex = index);
                            }.bind(this)
                        );
                    var activeEditor = gDesigner.getWorkspace().getStyleEdManager().getActiveEditor(),
                        partSelection = null;
                    (null !== activeStopIndex && activeEditor && (partSelection = { type: GUI.GGradientStyleEditor.STOP_HANDLE_PART_ID, idx: activeStopIndex }),
                        activeEditor && activeEditor.updatePartSelection(false, partSelection ? [partSelection] : null, true));
                }
            }),
            (GPatternChooser.prototype._insertGradientStop = function (stop) {
                var stopsContainer = this._gradientEditor.find(".stops"),
                    width = stopsContainer.width(),
                    height = stopsContainer.height(),
                    offset = stopsContainer.offset(),
                    stopElement = null,
                    onDrag = function (event, isFinal) {
                        var clampedX = Math.max(0, Math.min(width, Math.round(event.pageX - offset.left)));
                        (event.pageY < offset.top - GPatternChooser.EXTEND_DRAG_RANGE || event.pageY > offset.top + height + GPatternChooser.EXTEND_DRAG_RANGE
                            ? this._activeGradient.getStops().length >= 3 && (stopElement.css("display", "none"), (stop.remove = true))
                            : (stopElement.css("display", ""), (stop.remove = false)),
                            (stop.position = clampedX / width),
                            this._updateGradientStop(stop),
                            this._updatePatternFromActiveGradient(!isFinal));
                    }.bind(this),
                    onDragEnd = function (event) {
                        if (
                            (onDrag(event, true),
                            event.stopPropagation(),
                            document.removeEventListener("mouseup", onDragEnd, true),
                            document.removeEventListener("mousemove", onDrag, true),
                            stop.remove)
                        ) {
                            var stops = this._activeGradient.getStops(),
                                index = stops.indexOf(stop);
                            stops.splice(index, 1);
                        }
                    }.bind(this);
                return (
                    (stopElement = $("<div/>")
                        .addClass("stop")
                        .data("stop", stop)
                        .on(
                            "mousedown",
                            function (event) {
                                (event.stopPropagation(),
                                    this._setActiveGradientStop(stop),
                                    this._updateOnlineEditorStops(),
                                    document.addEventListener("mouseup", onDragEnd, true),
                                    document.addEventListener("mousemove", onDrag, true));
                                var firstStopColor = this._activeGradient.getStops()[0].color;
                                firstStopColor instanceof GObject.GCMYKColor
                                    ? this.setColorMode(GPatternChooser.ColorMode.CMYK)
                                    : firstStopColor instanceof GObject.GHSVColor
                                      ? this.setColorMode(GPatternChooser.ColorMode.HSV)
                                      : firstStopColor instanceof GObject.GRGBColor && this.setColorMode(GPatternChooser.ColorMode.RGB);
                            }.bind(this)
                        )
                        .appendTo(stopsContainer)),
                    this._updateGradientStop(stop),
                    stopElement
                );
            }),
            (GPatternChooser.prototype.__getUpdateGradientStopParams = function () {
                return { isTouchEnabled: false };
            }),
            (GPatternChooser.prototype._updateGradientStop = function (stop) {
                var params = this.__getUpdateGradientStopParams(),
                    stopsContainer = this._gradientEditor.find(".stops"),
                    width = stopsContainer.width();
                stopsContainer.find(".stop").each(
                    function (n, stopDom) {
                        var stopEl = $(stopDom);
                        if (stopEl.data("stop") === stop) {
                            (stopEl.toggleClass("g-active", stop === this._activeGradientStop),
                                params.isTouchEnabled &&
                                    (stop === this._activeGradientStop
                                        ? (stopEl.css("background", stop.color.toScreenCSS(stop.opacity)), stopEl.css("border", "2px solid #FFFFFF"))
                                        : (stopEl.css("background", "transparent"), stopEl.css("border", "2px solid transparent"))));
                            var leftPos = Math.round(stop.position * width),
                                halfWidth = stopEl.outerWidth() / 2 + 1;
                            (leftPos < halfWidth ? params.isTouchEnabled || (leftPos = halfWidth) : leftPos > width - halfWidth && (params.isTouchEnabled || (leftPos = width - halfWidth)), stopEl.css("left", leftPos + "px"));
                        }
                    }.bind(this)
                );
            }),
            (GPatternChooser.prototype._updatePatternFromActiveGradient = function (temporary) {
                if (this._activeGradient) {
                    this._activeGradient.sortStops();
                    var clonedGradient = this._activeGradient.clone(),
                        stops = clonedGradient.getStops();
                    (Array.prototype.forEach.call(this._activeGradient.getStops(), function (stop, index) {
                        stop.remove && stops.splice(index, 1);
                    }),
                        this._updatePattern(clonedGradient, "gradient", null, temporary));
                }
            }),
            (GPatternChooser.prototype._rotateActiveGradient = function (degrees) {
                var radians = GObject.GMath.toRadians(degrees),
                    focalPoint = new GObject.GPoint(this._activeGradient._fx, this._activeGradient._fy);
                ((focalPoint = focalPoint.rotatedAt(radians, new GObject.GPoint(0.5, 0.5))),
                    (this._activeGradient._fx = focalPoint.getX()),
                    (this._activeGradient._fy = focalPoint.getY()),
                    (this._activeGradient._angle = this._activeGradient._angle + radians),
                    this._updatePatternFromActiveGradient());
            }),
            (GPatternChooser.prototype._updateTexture = function (texture) {
                GObject.GUtil.equals(texture, this._texture) || (this._texture = texture);
            }),
            (GPatternChooser.prototype.__getUpdateColorParams = function () {
                return { isTouchEnabled: false };
            }),
            (GPatternChooser.prototype._updateColor = function (color, reason, temporary, force) {
                var params = this.__getUpdateColorParams();
                (GObject.GUtil.equals(color, this._color) && "set_pattern" !== reason && !force) ||
                    ((this._color = color),
                    this._updateSwatchesPalette(this._getSwatchScope("global", this._pattern)),
                    this._updateSwatchesPalette(this._getSwatchScope("document", this._pattern)),
                    this._pattern &&
                        this._pattern instanceof GObject.GColor &&
                        "set_pattern" !== reason &&
                        "update_pattern" !== reason &&
                        this._updatePattern(this._color, "set_color", null, temporary),
                    this._activeGradientStop &&
                        "gradient-stop" !== reason &&
                        ((this._activeGradientStop.color = this._color), this._updatePatternFromActiveGradient(temporary)),
                    "mode" !== reason &&
                        (this._color instanceof GObject.GCMYKColor
                            ? this.setColorMode(GPatternChooser.ColorMode.CMYK)
                            : this._color instanceof GObject.GHSVColor
                              ? this.setColorMode(GPatternChooser.ColorMode.HSV)
                              : this._color instanceof GObject.GRGBColor && this.setColorMode(GPatternChooser.ColorMode.RGB)),
                    this._updateColorComponentsFromColor(),
                    "slider" !== reason && "map" !== reason && this._updateColorSliderFromColor(),
                    this._systemColorInput.val(this._color.toScreenCSS()),
                    "map" !== reason && this._updateMapMarker(),
                    ("set_pattern" !== reason && "gradient-stop" !== reason) ||
                        ((this._oldColor = this._color),
                        this._colorPreviewOld.css("background", this._oldColor.toScreenCSS(this._oldColorOpacity))),
                    "swatch" !== reason && "mixer" === this._activePalette && this._updateMixerPalette(),
                    GObject.GUtil.equals(this._oldColor, this._color) || (0 === this._oldColorOpacity && this._updateOpacity(1)),
                    params.isTouchEnabled &&
                        (this._sliderColorThumb.css("background", this._color.toScreenCSS(1)),
                        this._sliderOpacityThumb.css("background", this._color.toScreenCSS(this._colorOpacity))),
                    this._colorPreviewNew.css("background", this._color.toScreenCSS(this._colorOpacity)));
            }),
            (GPatternChooser.prototype.__getUpdateOpacityParams = function () {
                return { isTouchEnabled: false };
            }),
            (GPatternChooser.prototype._updateOpacity = function (opacity, reason, temporary, force) {
                var params = this.__getUpdateColorParams();
                if (opacity !== this._colorOpacity || "set_opacity" === reason || force) {
                    if (this._activeGradientStop && "set_opacity" === reason) return;
                    (this._activeGradientStop ||
                        ((this._opacity = opacity),
                        "set_opacity" !== reason && this._settings && this._settings.onOpacity && this._settings.onOpacity(this._opacity, !!temporary)),
                        (this._colorOpacity = opacity),
                        ("set_opacity" !== reason && "gradient-stop" !== reason) ||
                            ((this._oldColorOpacity = this._colorOpacity),
                            this._colorPreviewOld.css("background", this._oldColor.toScreenCSS(this._oldColorOpacity))),
                        this._colorPreviewNew.css("background", this._color.toScreenCSS(this._colorOpacity)),
                        "slider" !== reason && this._opacitySlider.gInputSlider("value", Math.round(100 * this._colorOpacity)),
                        this._colorComponents
                            .find("[data-opacity]")
                            .find("input")
                            .prop("disabled", this._settings && this._settings.hasOwnProperty("hasOpacity") && !this._settings.hasOpacity)
                            .gInputBox("value", GObject.GUtil.formatOpacity(100 * this._colorOpacity)),
                        this._activeGradientStop &&
                            "gradient-stop" !== reason &&
                            ((this._activeGradientStop.opacity = this._colorOpacity), this._updatePatternFromActiveGradient(temporary)),
                        params.isTouchEnabled &&
                            (this._sliderColorThumb.css("background", this._color.toScreenCSS(1)),
                            this._sliderOpacityThumb.css("background", this._color.toScreenCSS(this._colorOpacity))));
                }
            }),
            (GPatternChooser.prototype._updatePattern = function (pattern, reason, n, temporary) {
                if (!this._patternUpdateBlocker) {
                    (("set_pattern" !== reason && "gradient" !== reason) || (this._patternUpdateBlocker = true),
                        (!n || pattern instanceof GObject.GGradient) &&
                            ((this._pattern = pattern),
                            this._toolbar.find(".pattern-type").each(function (t, optionEl) {
                                var patternTypeOption = $(optionEl),
                                    patternTypeDef = patternTypeOption.data("type");
                                patternTypeDef && patternTypeOption.prop("selected", !!patternTypeDef.isInstance(pattern));
                            })));
                    var isGradient = this._pattern && this._pattern instanceof GObject.GGradient,
                        isColor = this._pattern && this._pattern instanceof GObject.GColor,
                        isTexture = this._pattern && this._pattern instanceof GObject.GTexturePattern && !(pattern instanceof GObject.GNoisePattern),
                        isNoise = this._pattern && this._pattern instanceof GObject.GNoisePattern,
                        isBackground = this._pattern && this._pattern instanceof GObject.GBackground;
                    (this._gradientEditor.css("display", isGradient ? "" : "none"),
                        this._gradientActions.css("display", isGradient ? "" : " none"),
                        this._colorEditor.css("display", isColor || isGradient ? "" : "none"),
                        this._palettes.css("display", isColor || isGradient || isTexture || isNoise ? "" : "none"),
                        isTexture || isNoise
                            ? (this._palettes.find(".chooser").find("button[data-palette!='swatches']").css("display", "none"),
                              this._activatePalette("swatches"))
                            : this._palettes.find(".chooser").find("button").css("display", ""),
                        this._patternEditor.css("display", isTexture && !isNoise ? "" : "none"),
                        this._noiseEditor.css("display", isNoise ? "" : "none"),
                        ("set_pattern" === reason || ("set_type" === reason && !isGradient)) &&
                            ((this._activeGradient = null), (this._activeGradientStop = null)));
                    var activeStopIndex = null;
                    if (isGradient) {
                        if (
                            (this._gradientEditor.css(
                                "background",
                                GObject.GPattern.asCSSBackground(new GObject.GLinearGradient(this._pattern.getStops()), this._opacity)
                            ),
                            "set_pattern" === reason || "set_type" === reason)
                        ) {
                            (this._gradientEditor.find(".stops").empty(), (this._activeGradient = this._pattern.clone()));
                            var firstStop = null,
                                matchedStop = null;
                            Array.prototype.forEach.call(
                                this._activeGradient.getStops(),
                                function (stop, index) {
                                    (this._insertGradientStop(stop),
                                        0 === index && (firstStop = stop),
                                        this._activeGradientStop && this._activeGradientStop.position === stop.position && (matchedStop = stop));
                                }.bind(this)
                            );
                            var activeEditor = gDesigner.getWorkspace().getStyleEdManager()
                                ? gDesigner.getWorkspace().getStyleEdManager().getActiveEditor()
                                : null;
                            if (!matchedStop && activeEditor && activeEditor.getPartsSelectionLength()) {
                                var stops = this._activeGradient.getStops(),
                                    partSelection = activeEditor.getPartSelection(),
                                    partIndex = partSelection && null !== partSelection[0].idx ? partSelection[0].idx : null;
                                stops && null !== partIndex && stops.length > partIndex && ((matchedStop = stops[partIndex]), (activeStopIndex = partIndex));
                            }
                            (matchedStop || (matchedStop = firstStop),
                                this._setActiveGradientStop(matchedStop, pattern && pattern instanceof GObject.GColor ? pattern : null, n),
                                this._gradientActions.find("[data-action]").each(function (t, actionEl) {
                                    var actionElement = $(actionEl),
                                        visible = true;
                                    switch (actionElement.attr("data-action")) {
                                        case "rotate-left":
                                        case "rotate-right":
                                            visible = pattern instanceof GObject.GLinearGradient;
                                    }
                                    actionElement.css("display", visible ? "" : "none");
                                }));
                        }
                        null === activeStopIndex &&
                            Array.prototype.forEach.call(
                                this._activeGradient.getStops(),
                                function (stop, index) {
                                    stop === this._activeGradientStop && (activeStopIndex = index);
                                }.bind(this)
                            );
                    } else if (isColor) this._updateColor(pattern, reason || "update_pattern", !!temporary);
                    else if (isNoise) {
                        var noiseAmountPercent = 100 * pattern.getAmount();
                        (this._noiseEditor.find('.g-input-slider[data-property="noise_amount"]').gInputSlider("value", noiseAmountPercent),
                            this._noiseEditor
                                .find('[type="text"][data-property="noise_amount"]')
                                .gInputBox("value", GObject.GUtil.formatNumber(noiseAmountPercent, 0)));
                        var noiseTypeSelect = this._patternEditor.find('[data-property="noise_type"]');
                        (noiseTypeSelect.children("option").attr("selected", false), noiseTypeSelect.children('option[value="' + pattern.getType() + '"]').attr("selected", true));
                    } else if (isTexture) {
                        this._updateTexture(pattern, reason || "update_pattern");
                        var hasTexture = !!pattern.getTexture(),
                            isLengthOrPercentSize =
                                -1 !==
                                GObject.GTexturePattern.SizeMode.Length.concat(GObject.GTexturePattern.SizeMode.Percent).indexOf(pattern.getSizeMode()),
                            updateSelect = function (property, value) {
                                var selectEl = this._patternEditor.find('[data-property="' + property + '"]').prop("disabled", !hasTexture);
                                (selectEl.children("option").attr("selected", false),
                                    selectEl.children('option[value="' + value + '"]').attr("selected", true),
                                    selectEl.val(value));
                            }.bind(this),
                            updateText = function (property, value) {
                                this._patternEditor
                                    .find('[data-property="' + property + '"]')
                                    .prop("disabled", !(hasTexture && isLengthOrPercentSize))
                                    .val(GObject.GUtil.formatNumber(value));
                            }.bind(this);
                        (updateSelect("texture_repeat", pattern.getRepeatMode()),
                            updateSelect("texture_position", pattern.getPosition()),
                            updateSelect("texture_size", pattern.getSizeMode()),
                            updateSelect("texture_scale", pattern.getScaleMode()),
                            updateText("texture_size_w", pattern.getWidth()),
                            updateText("texture_size_h", pattern.getHeight()));
                        var tilePercent = 100 * pattern.getTileSize();
                        if (
                            (this._patternEditor.find('.g-input-slider[data-property="texture_tile"]').gInputSlider("value", tilePercent),
                            this._patternEditor
                                .find('[type="text"][data-property="texture_tile"]')
                                .gInputBox("value", GObject.GUtil.formatNumber(tilePercent, 0)),
                            this._patternEditor
                                .find('[data-property="texture_tile"]')
                                .gInputSlider("disabled", pattern.getScaleMode() !== GObject.GTexturePattern.ScaleMode.Tile),
                            this._patternEditor
                                .find('[data-property="texture_size_u"]')
                                .text(pattern.getSizeMode() === GObject.GTexturePattern.SizeMode.Length ? "px" : "%"),
                            this._patternEditor.find('[data-property="texture_mask"]').prop("checked", pattern.isMask()),
                            this._patternEditor
                                .find(".pattern-preview")
                                .css("background-image", pattern.asCSSBackground())
                                .css("background-repeat", "no-repeat")
                                .css("background-position", "center")
                                .css("background-size", "contain"),
                            "set_type" === reason)
                        ) {
                            const clonedPattern = this._clonePattern(pattern);
                            this._updatePattern(clonedPattern, "texture_pattern");
                        }
                    }
                    (this._relayout(!isBackground),
                        "set_pattern" !== reason &&
                            this._settings &&
                            this._settings.onPattern &&
                            this._settings.onPattern(n ? this._pattern : pattern, !!temporary, null !== activeStopIndex ? activeStopIndex : null),
                        isGradient && this._updateOnlineEditorStops(),
                        "swatches" === this._activePalette &&
                            (this._updateSwatchesPalette(this._getSwatchScope("global", this._pattern)),
                            this._updateSwatchesPalette(this._getSwatchScope("document", this._pattern))),
                        (this._patternUpdateBlocker = false));
                }
            }),
            (GPatternChooser.prototype._styleEditorHandler = function (event) {
                if (event.type === GUI.GStyleEdManager.EditorEventType.ActivePointChange) {
                    var stops = this._activeGradient ? this._activeGradient.getStops() : null,
                        index = event.data ? event.data.idx : null;
                    (stops && null !== index && stops.length > index ? this._setActiveGradientStop(stops[index]) : stops && this._setActiveGradientStop(stops.null),
                        this._updatePatternFromActiveGradient());
                }
            }),
            (GPatternChooser.prototype._closeIfNeeded = function (event) {
                !this.isOpenned() || (event.data && event.data.chooserOn) || this.close();
            }),
            (GPatternChooser.prototype._updateColorFromColorSlider = function (temporary) {
                var sliderValue = parseInt(this._colorSlider.gColorSlider("value")),
                    newColor = null,
                    hsv = null;
                if (this._colorMode === GPatternChooser.ColorMode.RGB || this._colorMode === GPatternChooser.ColorMode.HSV) {
                    switch (this._colorMode) {
                        case GPatternChooser.ColorMode.RGB:
                            hsv = GObject.GColor.rgbToHSV(this._color.toScreen());
                            break;
                        case GPatternChooser.ColorMode.HSV:
                            ((hsv = []),
                                this._colorComponents.find("[data-component-index]").each(function (e, inputEl) {
                                    var inputElement = $(inputEl),
                                        componentIndex = parseInt(inputElement.attr("data-component-index"));
                                    0 !== componentIndex && (hsv[componentIndex] = parseInt(inputElement.find("input").gInputBox("value")) / 100);
                                }));
                    }
                    hsv &&
                        ((hsv = [sliderValue, hsv[1], hsv[2]]),
                        (newColor = this._colorMode === GPatternChooser.ColorMode.RGB ? new GObject.GRGBColor(GObject.GColor.hsvToRGB(hsv)) : new GObject.GHSVColor(hsv)),
                        (this._extendedGamutInitiated = GPatternChooser.ExtendedGamut.COLOR_SLIDER),
                        this._updateColor(newColor, "slider", temporary, true),
                        this._updateColorMap(),
                        (this._extendedGamutInitiated = null));
                }
            }),
            (GPatternChooser.prototype._updateColorSliderFromColor = function () {
                var hueValue;
                switch (this._colorMode) {
                    case GPatternChooser.ColorMode.RGB:
                    case GPatternChooser.ColorMode.HSV:
                        if (
                            this._extendedGamutInitiated === GPatternChooser.ExtendedGamut.COLOR_SLIDER ||
                            this._extendedGamutInitiated === GPatternChooser.ExtendedGamut.MAP
                        )
                            return;
                        ((hueValue =
                            this._extendedGamutInitiated === GPatternChooser.ExtendedGamut.COMPONENTS &&
                            this._extValue &&
                            this._colorMode === GPatternChooser.ColorMode.HSV
                                ? this._extValue[0]
                                : GObject.GColor.rgbToHSV(this._color.toScreen())[0]),
                            parseInt(this._colorSlider.gColorSlider("value")) !== hueValue &&
                                (this._colorSlider.gColorSlider("value", hueValue), this._updateColorMap()));
                        break;
                    case GPatternChooser.ColorMode.CMYK:
                }
            }),
            (GPatternChooser.prototype._updateColorFromColorComponents = function () {
                var componentValues = [];
                this._colorComponents.find("[data-component-index]").each(function (t, componentEl) {
                    var componentElement = $(componentEl),
                        componentIndex = parseInt(componentElement.attr("data-component-index"));
                    componentValues[componentIndex] = parseInt(componentElement.find("input").gInputBox("value"));
                });
                var newColor = null;
                switch (this._colorMode) {
                    case GPatternChooser.ColorMode.RGB:
                        newColor = new GObject.GRGBColor(componentValues);
                        break;
                    case GPatternChooser.ColorMode.HSV: {
                        const mappedValues = componentValues.map(function (value, index) {
                            return 0 === index ? value : value / 100;
                        });
                        newColor = new GObject.GHSVColor(mappedValues);
                        break;
                    }
                    case GPatternChooser.ColorMode.CMYK:
                        newColor = new GObject.GCMYKColor(
                            componentValues.map(function (value) {
                                return value / 100;
                            })
                        );
                }
                ((this._extendedGamutInitiated = GPatternChooser.ExtendedGamut.COMPONENTS),
                    newColor && this._updateColor(newColor, "components", false, true),
                    (this._extendedGamutInitiated = null));
            }),
            (GPatternChooser.prototype._updateColorComponentsFromColor = function () {
                if (
                    (this._colorComponents.find("[data-css]").find("input").gInputBox("value", this._color.toScreenCSS()),
                    this._extendedGamutInitiated !== GPatternChooser.ExtendedGamut.COMPONENTS || this._colorMode !== GPatternChooser.ColorMode.HSV)
                ) {
                    var colorValues = null,
                        formatValue = function (e, formatValue) {
                            return formatValue;
                        };
                    switch (this._colorMode) {
                        case GPatternChooser.ColorMode.RGB:
                            colorValues = this._color.toScreen();
                            break;
                        case GPatternChooser.ColorMode.HSV:
                            ((colorValues =
                                (this._extendedGamutInitiated !== GPatternChooser.ExtendedGamut.COLOR_SLIDER &&
                                    this._extendedGamutInitiated !== GPatternChooser.ExtendedGamut.MAP) ||
                                !this._extValue
                                    ? this._color instanceof GObject.GHSVColor
                                        ? this._color.getValue()
                                        : GObject.GColor.rgbToHSV(this._color.toScreen())
                                    : this._extValue),
                                (formatValue = function (index, value) {
                                    return 0 === index ? value : GObject.GUtil.formatNumber(100 * value, 0);
                                }));
                            break;
                        case GPatternChooser.ColorMode.CMYK:
                            ((colorValues =
                                this._color instanceof GObject.GCMYKColor ? this._color.getValue() : GObject.GColor.rgbToCMYK(this._color.toScreen())),
                                (formatValue = function (e, value) {
                                    return GObject.GUtil.formatNumber(100 * value, 0);
                                }));
                    }
                    this._colorComponents.find("[data-component-index]").each(function (n, componentEl) {
                        var componentElement = $(componentEl),
                            componentIndex = parseInt(componentElement.attr("data-component-index"));
                        componentElement.find("input").gInputBox("value", formatValue(componentIndex, colorValues[componentIndex]));
                    });
                }
            }),
            (GPatternChooser.prototype._updateMapMarker = function () {
                if (this._extendedGamutInitiated !== GPatternChooser.ExtendedGamut.MAP) {
                    var hsv,
                        canvas = this._colorMap.find("canvas")[0],
                        canvasWidth = canvas.width,
                        canvasHeight = canvas.height;
                    hsv =
                        (this._extendedGamutInitiated !== GPatternChooser.ExtendedGamut.COLOR_SLIDER &&
                            this._extendedGamutInitiated !== GPatternChooser.ExtendedGamut.COMPONENTS) ||
                        !this._extValue ||
                        this._colorMode !== GPatternChooser.ColorMode.HSV
                            ? GObject.GColor.rgbToHSV(this._color.toScreen())
                            : this._extValue;
                    var markerX = Math.round(hsv[1] * canvasWidth),
                        markerY = Math.round((1 - hsv[2]) * canvasHeight);
                    this._setMarkerPosition(markerX, markerY);
                }
            }),
            (GPatternChooser.prototype._setMarkerPosition = function (x, y) {
                var marker = this._colorMap.find(".marker"),
                    canvas = this._colorMap.find("canvas"),
                    canvasWidth = canvas[0].width,
                    canvasHeight = canvas[0].height,
                    halfMarkerWidth = marker.width() / 2,
                    halfMarkerHeight = marker.height() / 2;
                (x < halfMarkerWidth && (x = halfMarkerWidth),
                    y < halfMarkerHeight && (y = halfMarkerHeight),
                    x > canvasWidth - halfMarkerWidth && (x = canvasWidth - halfMarkerWidth),
                    y > canvasHeight - halfMarkerHeight && (y = canvasHeight - halfMarkerHeight),
                    marker.css({ left: x + "px", top: y + "px" }));
            }),
            (GPatternChooser.prototype._updateColorMap = function () {
                var canvas = this._colorMap.find("canvas")[0];
                this._colorMap.width() &&
                    this._colorMap.height() &&
                    ((canvas.width = this._colorMap.width()), (canvas.height = this._colorMap.height()));
                var width = canvas.width,
                    height = canvas.height,
                    context = canvas.getContext("2d"),
                    hueValue = this._colorSlider.gColorSlider("value"),
                    imageData = context.getImageData(0, 0, width, height);
                if (imageData) {
                    for (var s = 0; s < width; ++s)
                        for (var l = 0; l < height; ++l) {
                            var c = GObject.GColor.hsvToRGB([parseInt(hueValue), s / width, 1 - l / height]),
                                d = 4 * (l * width + s);
                            ((imageData.data[d] = c[0]), (imageData.data[d + 1] = c[1]), (imageData.data[d + 2] = c[2]), (imageData.data[d + 3] = 255));
                        }
                    context.putImageData(imageData, 0, 0);
                }
            }),
            (GPatternChooser.prototype._colorMapMouseDown = function (event) {
                if (event.originalEvent.isTrusted) {
                    var t = function (event, t) {
                            if (!event.isTrusted) return;
                            event.cancelable && event.preventDefault();
                            let pageX = event.pageX,
                                pageY = event.pageY;
                            if ("touchstart" === event.type || "touchmove" === event.type) {
                                const touch = event.changedTouches[0];
                                ((pageX = touch && touch.pageX), (pageY = touch && touch.pageY));
                            }
                            var canvas = this._colorMap.find("canvas")[0],
                                canvasWidth = canvas.width,
                                canvasHeight = canvas.height,
                                offset = this._colorMap.offset(),
                                x = Math.max(0, Math.min(canvasWidth, Math.round(pageX - offset.left))),
                                y = Math.max(0, Math.min(canvasHeight, Math.round(pageY - offset.top)));
                            const hsv = [parseInt(this._colorSlider.gColorSlider("value")), x / canvasWidth, 1 - y / canvasHeight];
                            var newColor;
                            ((newColor = this._colorMode === GPatternChooser.ColorMode.HSV ? new GObject.GHSVColor(hsv) : new GObject.GRGBColor(GObject.GColor.hsvToRGB(hsv))),
                                this._setMarkerPosition(x, y),
                                (this._extendedGamutInitiated = GPatternChooser.ExtendedGamut.MAP),
                                this._updateColor(newColor, "map", !t, t),
                                (this._extendedGamutInitiated = null));
                        }.bind(this),
                        onPointerUp = function (event) {
                            (t(event, true),
                                event.stopPropagation(),
                                document.removeEventListener("mouseup", onPointerUp, true),
                                document.removeEventListener("mousemove", t, true),
                                document.removeEventListener("touchmove", t, true));
                        };
                    (t(event.originalEvent),
                        document.addEventListener("mouseup", onPointerUp, true),
                        document.addEventListener("mousemove", t, true),
                        document.addEventListener("touchmove", t, true));
                }
            }),
            (GPatternChooser.prototype._defineStopInitColor = function (positionX) {
                var visibleStops = this._gradientEditor.find(".stop:visible"),
                    getStopLeft = function (stopEl) {
                        return Number($(stopEl).css("left").replace("px", ""));
                    },
                    getStopColor = function (stopEl) {
                        var stop = $(stopEl).data("stop");
                        return stop && stop.color instanceof GObject.GColor ? stop.color.toScreen() : [0, 0, 0];
                    },
                    rightStops = [],
                    leftStops = [],
                    nearestLeftStop = null,
                    nearestRightStop = null,
                    nearestLeftPos = null,
                    nearestRightPos = null;
                for (let o = 0; o < visibleStops.length; ++o) getStopLeft(visibleStops[o]) < positionX ? leftStops.push(visibleStops[o]) : rightStops.push(visibleStops[o]);
                for (let e = 0; e < leftStops.length; ++e) nearestLeftStop ? getStopLeft(leftStops[e]) > nearestLeftPos && ((nearestLeftStop = leftStops[e]), (nearestLeftPos = getStopLeft(leftStops[e]))) : ((nearestLeftStop = leftStops[e]), (nearestLeftPos = getStopLeft(leftStops[e])));
                for (let e = 0; e < rightStops.length; ++e) nearestRightStop ? getStopLeft(rightStops[e]) < nearestRightPos && ((nearestRightStop = rightStops[e]), (nearestRightPos = getStopLeft(rightStops[e]))) : ((nearestRightStop = rightStops[e]), (nearestRightPos = getStopLeft(rightStops[e])));
                var ratio = (100 * (positionX -= nearestLeftPos)) / (nearestRightPos -= nearestLeftPos) / 100;
                const blendedColor = (function (colorA, colorB, weight) {
                    var weightB = ((2 * weight - 1) / 1 + 1) / 2,
                        weightA = 1 - weightB;
                    return [Math.round(colorB[0] * weightB + colorA[0] * weightA), Math.round(colorB[1] * weightB + colorA[1] * weightA), Math.round(colorB[2] * weightB + colorA[2] * weightA)];
                })(getStopColor(nearestLeftStop), getStopColor(nearestRightStop), ratio);
                switch (this._colorMode) {
                    case GPatternChooser.ColorMode.CMYK:
                        return new GObject.GCMYKColor(GObject.GColor.rgbToCMYK(blendedColor));
                    case GPatternChooser.ColorMode.HSV:
                        return new GObject.GHSVColor(GObject.GColor.rgbToHSV(blendedColor));
                    default:
                        return new GObject.GRGBColor(blendedColor);
                }
            }),
            (GPatternChooser._createPatternOption = function (patternType) {
                return $("<option></option>")
                    .addClass("pattern-type")
                    .data("type", patternType)
                    .attr("data-title", patternType.name)
                    .attr("value", patternType.name)
                    .text(patternType.name);
            }),
            (GPatternChooser.prototype._relayout = function () {
                this._container.gOverlay("relayout", { preserveTop: false });
            }),
            (GPatternChooser.getGradientStopsFromCurrentPattern = function (pattern) {
                var stops;
                return (
                    pattern instanceof GObject.GGradient
                        ? (stops = pattern.getClonedStops())
                        : ((stops = [
                              { color: GObject.GRGBColor.WHITE, position: 0, opacity: 1 },
                              { color: GObject.GRGBColor.BLACK, position: 1, opacity: 1 },
                          ]),
                          pattern instanceof GObject.GColor && !GObject.GUtil.equals(pattern.toScreen(), stops[1].color.toScreen()) && (stops[0].color = pattern)),
                    stops
                );
            }),
            (GPatternChooser.PATTERN_TYPES = null),
            (GPatternChooser.initPatternType = function () {
                return [
                    {
                        name: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.color")),
                        cssBackgroundImage: new GObject.GLinearGradient(
                            [
                                { color: GObject.GRGBColor.WHITE, position: 0, opacity: 0.5 },
                                { color: GObject.GRGBColor.WHITE, position: 1, opacity: 0.5 },
                            ],
                            1,
                            GObject.GMath.toRadians(90)
                        ).asCSSBackground(),
                        isCompatible: function (typeClass) {
                            return typeClass === GObject.GColor;
                        },
                        isInstance: function (pattern) {
                            return pattern && pattern instanceof GObject.GColor;
                        },
                        createDefault: function (currentPattern) {
                            if (currentPattern instanceof GObject.GGradient)
                                for (var stops = currentPattern.getStops(), n = 0; n < stops.length; ++n) if (stops[n].hasOwnProperty("color")) return stops[n].color;
                            return new GObject.GRGBColor();
                        },
                    },
                    {
                        name: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.lineargradient")),
                        cssBackgroundImage: new GObject.GLinearGradient(
                            [
                                { color: GObject.GRGBColor.WHITE, position: 0, opacity: 1 },
                                { color: GObject.GRGBColor.BLACK, position: 1, opacity: 0 },
                            ],
                            1,
                            GObject.GMath.toRadians(90)
                        ).asCSSBackground(),
                        isCompatible: function (typeClass) {
                            return typeClass === GObject.GLinearGradient || typeClass === GObject.GGradient;
                        },
                        isInstance: function (pattern) {
                            return pattern && pattern instanceof GObject.GLinearGradient;
                        },
                        createDefault: function (currentPattern) {
                            return new GObject.GLinearGradient(GPatternChooser.getGradientStopsFromCurrentPattern(currentPattern));
                        },
                    },
                    {
                        name: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.radialgradient")),
                        cssBackgroundImage: new GObject.GRadialGradient([
                            { color: GObject.GRGBColor.WHITE, position: 0, opacity: 1 },
                            { color: GObject.GRGBColor.BLACK, position: 1, opacity: 0 },
                        ]).asCSSBackground(),
                        isCompatible: function (typeClass) {
                            return typeClass === GObject.GRadialGradient || typeClass === GObject.GGradient;
                        },
                        isInstance: function (pattern) {
                            return pattern && pattern instanceof GObject.GRadialGradient;
                        },
                        createDefault: function (currentPattern) {
                            return new GObject.GRadialGradient(GPatternChooser.getGradientStopsFromCurrentPattern(currentPattern));
                        },
                    },
                    {
                        name: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.angulargradient")),
                        cssBackgroundImage: new GObject.GAngularGradient([
                            { color: GObject.GRGBColor.WHITE, position: 0, opacity: 1 },
                            { color: GObject.GRGBColor.BLACK, position: 1, opacity: 0 },
                        ]).asCSSBackground(),
                        isCompatible: function (typeClass) {
                            return typeClass === GObject.GAngularGradient || typeClass === GObject.GGradient;
                        },
                        isInstance: function (pattern) {
                            return pattern && pattern instanceof GObject.GAngularGradient;
                        },
                        createDefault: function (currentPattern) {
                            return new GObject.GAngularGradient(GPatternChooser.getGradientStopsFromCurrentPattern(currentPattern));
                        },
                    },
                    {
                        name: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.texture")),
                        cssBackgroundImage:
                            'url("data:image/svg+xml;base64,' +
                            btoa(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">\n                        <circle r="9.2" stroke-width="2" stroke="white" fill="none"/>\n                        <circle cy="18.4" r="9.2" stroke-width="2px" stroke="white" fill="none"/>\n                        <circle cx="18.4" cy="18.4" r="9.2" stroke-width="2" stroke="white" fill="none"/>\n                    </svg>'
                            ) +
                            '")',
                        isCompatible: function (typeClass) {
                            return typeClass === GObject.GTexturePattern;
                        },
                        isInstance: function (pattern) {
                            return pattern && pattern instanceof GObject.GTexturePattern && !(pattern instanceof GObject.GNoisePattern);
                        },
                        createDefault: function () {
                            var nodeData = GObject.GNode.deserialize(
                                    '[{"@":"group","$":[{"@":"rectangle","uf":true,"ct":"R","sl":0,"reftxt":null,"trf":[9.948817641447532,0,0,9.692411708290129,370.93546258325506,25.987797270522503],"_sdf":84,"_layers":{"@":"paintLayers","$":[{"@":"fillPaintLayer","_pt":"C#[0,0,0]"}]}},{"@":"rectangle","uf":true,"ct":"R","sl":0,"reftxt":null,"trf":[9.948817641447532,0,0,9.692411708290129,410.7307331490452,25.987797270522503],"_sdf":84,"_layers":{"@":"paintLayers","$":[{"@":"fillPaintLayer","_pt":"C#[0,0,0]"}]}},{"@":"rectangle","uf":true,"ct":"R","sl":0,"reftxt":null,"trf":[9.948817641447532,0,0,9.692411708290129,390.7793771686299,44.58515959609013],"_sdf":84,"_layers":{"@":"paintLayers","$":[{"@":"fillPaintLayer","_pt":"C#[0,0,0]"}]}},{"@":"rectangle","uf":true,"ct":"R","sl":0,"reftxt":null,"trf":[9.948817641447532,0,0,9.692411708290129,430.57464773441995,44.58515959609013],"_sdf":84,"_layers":{"@":"paintLayers","$":[{"@":"fillPaintLayer","_pt":"C#[0,0,0]"}]}},{"@":"rectangle","uf":true,"ct":"R","sl":0,"reftxt":null,"trf":[9.948817641447532,0,0,9.692411708290129,370.9623229320152,63.96998301267038],"_sdf":84,"_layers":{"@":"paintLayers","$":[{"@":"fillPaintLayer","_pt":"C#[0,0,0]"}]}},{"@":"rectangle","uf":true,"ct":"R","sl":0,"reftxt":null,"trf":[9.948817641447532,0,0,9.692411708290129,410.75759349780526,63.96998301267038],"_sdf":84,"_layers":{"@":"paintLayers","$":[{"@":"fillPaintLayer","_pt":"C#[0,0,0]"}]}},{"@":"rectangle","uf":true,"ct":"R","sl":0,"reftxt":null,"trf":[9.948817641447532,0,0,9.692411708290129,390.80623751739,82.56734533823798],"_sdf":84,"_layers":{"@":"paintLayers","$":[{"@":"fillPaintLayer","_pt":"C#[0,0,0]"}]}},{"@":"rectangle","uf":true,"ct":"R","sl":0,"reftxt":null,"trf":[9.948817641447532,0,0,9.692411708290129,430.60150808318014,82.56734533823798],"_sdf":84,"_layers":{"@":"paintLayers","$":[{"@":"fillPaintLayer","_pt":"C#[0,0,0]"}]}}]}]'
                                ).pop(),
                                texturePattern = new GObject.GTexturePattern(nodeData, GObject.GTexturePattern.RepeatMode.Both);
                            return (texturePattern.setScene(gDesigner.getActiveDocument().getScene()), texturePattern);
                        },
                    },
                    {
                        name: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.noise")),
                        cssBackgroundImage:
                            'url("data:image/svg+xml;base64,' +
                            btoa(
                                '<svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><rect x="-0.994" y="-1.097" width="24.763" height="23.271" style="fill:transparent;"/><path d="M7.689,17.9l0.848,0l0,0.565l-0.848,0l0,0.848l-0.565,0l0,-0.848l-0.848,0l0,-0.565l0.848,0l0,-0.848l0.565,0l0,0.848Zm5.769,0l0.848,0l0,0.565l-0.848,0l0,0.848l-0.565,0l0,-0.848l-0.847,0l0,-0.565l0.847,0l0,-0.848l0.565,0l0,0.848Zm5.094,0l0.847,0l0,0.565l-0.847,0l0,0.848l-0.566,0l0,-0.848l-0.847,0l0,-0.565l0.847,0l0,-0.848l0.566,0l0,0.848Zm-16.58,0l0.847,0l0,0.565l-0.847,0l0,0.848l-0.566,0l0,-0.848l-0.847,0l0,-0.565l0.847,0l0,-0.848l0.566,0l0,0.848Zm3.015,-2.33l1.321,0l0,0.881l-1.321,0l0,1.321l-0.88,0l0,-1.321l-1.321,0l0,-0.881l1.321,0l0,-1.32l0.88,0l0,1.32Zm5.752,0l1.32,0l0,0.881l-1.32,0l0,1.321l-0.881,0l0,-1.321l-1.32,0l0,-0.881l1.32,0l0,-1.32l0.881,0l0,1.32Zm5.764,0l1.32,0l0,0.881l-1.32,0l0,1.321l-0.881,0l0,-1.321l-1.321,0l0,-0.881l1.321,0l0,-1.32l0.881,0l0,1.32Zm-8.814,-2.896l0.848,0l0,0.566l-0.848,0l0,0.847l-0.565,0l0,-0.847l-0.848,0l0,-0.566l0.848,0l0,-0.847l0.565,0l0,0.847Zm5.769,0l0.848,0l0,0.566l-0.848,0l0,0.847l-0.565,0l0,-0.847l-0.847,0l0,-0.566l0.847,0l0,-0.847l0.565,0l0,0.847Zm5.094,0l0.847,0l0,0.566l-0.847,0l0,0.847l-0.566,0l0,-0.847l-0.847,0l0,-0.566l0.847,0l0,-0.847l0.566,0l0,0.847Zm-16.58,0l0.847,0l0,0.566l-0.847,0l0,0.847l-0.566,0l0,-0.847l-0.847,0l0,-0.566l0.847,0l0,-0.847l0.566,0l0,0.847Zm3.015,-2.91l1.321,0l0,0.88l-1.321,0l0,1.321l-0.88,0l0,-1.321l-1.321,0l0,-0.88l1.321,0l0,-1.321l0.88,0l0,1.321Zm5.752,0l1.32,0l0,0.88l-1.32,0l0,1.321l-0.881,0l0,-1.321l-1.32,0l0,-0.88l1.32,0l0,-1.321l0.881,0l0,1.321Zm5.764,0l1.32,0l0,0.88l-1.32,0l0,1.321l-0.881,0l0,-1.321l-1.321,0l0,-0.88l1.321,0l0,-1.321l0.881,0l0,1.321Zm-8.814,-2.932l0.848,0l0,0.565l-0.848,0l0,0.848l-0.565,0l0,-0.848l-0.848,0l0,-0.565l0.848,0l0,-0.848l0.565,0l0,0.848Zm5.769,0l0.848,0l0,0.565l-0.848,0l0,0.848l-0.565,0l0,-0.848l-0.847,0l0,-0.565l0.847,0l0,-0.848l0.565,0l0,0.848Zm5.094,0l0.847,0l0,0.565l-0.847,0l0,0.848l-0.566,0l0,-0.848l-0.847,0l0,-0.565l0.847,0l0,-0.848l0.566,0l0,0.848Zm-16.58,0l0.847,0l0,0.565l-0.847,0l0,0.848l-0.566,0l0,-0.848l-0.847,0l0,-0.565l0.847,0l0,-0.848l0.566,0l0,0.848Zm3.015,-2.833l1.321,0l0,0.881l-1.321,0l0,1.32l-0.88,0l0,-1.32l-1.321,0l0,-0.881l1.321,0l0,-1.321l0.88,0l0,1.321Zm5.752,2.201l-0.881,0l0,-1.32l-1.32,0l0,-0.881l1.32,0l0,-1.321l0.881,0l0,1.321l1.32,0l0,0.881l-1.32,0l0,1.32Zm5.764,0l-0.881,0l0,-1.32l-1.321,0l0,-0.881l1.321,0l0,-1.321l0.881,0l0,1.321l1.32,0l0,0.881l-1.32,0l0,1.32Zm-8.814,-4.515l0.848,0l0,0.565l-0.848,0l0,0.848l-0.565,0l0,-0.848l-0.848,0l0,-0.565l0.848,0l0,-0.847l0.565,0l0,0.847Zm5.769,0l0.848,0l0,0.565l-0.848,0l0,0.848l-0.565,0l0,-0.848l-0.847,0l0,-0.565l0.847,0l0,-0.847l0.565,0l0,0.847Zm5.094,0l0.847,0l0,0.565l-0.847,0l0,0.848l-0.566,0l0,-0.848l-0.847,0l0,-0.565l0.847,0l0,-0.847l0.566,0l0,0.847Zm-16.58,0l0.847,0l0,0.565l-0.847,0l0,0.848l-0.566,0l0,-0.848l-0.847,0l0,-0.565l0.847,0l0,-0.847l0.566,0l0,0.847Z" style="fill:#fff;"/></svg>'
                            ) +
                            '")',
                        isCompatible: function (typeClass) {
                            return typeClass === GObject.GNoisePattern;
                        },
                        isInstance: function (pattern) {
                            return pattern && pattern instanceof GObject.GNoisePattern;
                        },
                        createDefault: function () {
                            return new GObject.GNoisePattern();
                        },
                    },
                    {
                        name: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.backgroundfill")),
                        cssBackgroundImage:
                            'url("data:image/svg+xml;base64,' +
                            btoa(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 5 10"><line x1="-2" y1="1" x2="7" y2="10" stroke="white" stroke-width="2"/><line x1="-2" y1="6" x2="7" y2="15" stroke="white" stroke-width="2"/><line x1="-2" y1="-4" x2="7" y2="5" stroke="white" stroke-width="2"/></svg>'
                            ) +
                            '")',
                        isCompatible: function (typeClass) {
                            return typeClass === GObject.GBackground;
                        },
                        isInstance: function (pattern) {
                            return pattern && pattern instanceof GObject.GBackground;
                        },
                        createDefault: function () {
                            return new GObject.GBackground();
                        },
                    },
                ];
            }),
            (function ($) {
                var methods = {
                    init: function (options) {
                        return (
                            (options = $.extend({ asButton: true, label: "", singleOption: false }, options)),
                            window.gPatternChooser._updateSettings(options, true),
                            this.each(function () {
                                var element = this,
                                    jqElement = $(this),
                                    labelElement = null;
                                options.label && (labelElement = $("<span />").addClass("label").css("margin-left", "5px").text(options.label));
                                var simplified = options.simplified,
                                    previewElement = $("<span />")
                                        .addClass("preview")
                                        .data("gpatternchooser", { options: options, opacity: 1 })
                                        .on(
                                            "click",
                                            function (event, activeStopIdx) {
                                                if (
                                                    (gDesigner.isTouchEnabled()
                                                        ? (window.gPatternChooser = window.gPatternChooserTouch)
                                                        : (window.gPatternChooser = window.gPatternChooserNormal),
                                                    options.onOpen ? options.onOpen.call(this) : gDesigner.stats("patternchooser_click_open"),
                                                    event.stopPropagation(),
                                                    event.preventDefault(),
                                                    !jqElement.hasClass("g-disabled"))
                                                ) {
                                                    var chooserData = jqElement.data("gpatternchooser");
                                                    chooserData.options.asButton && jqElement.addClass("g-active");
                                                    var baseSettings = $.extend({}, chooserData.options),
                                                        settings = $.extend(baseSettings, {
                                                            onPattern: function (pattern, temporary, stopIndex) {
                                                                (methods.value.call(element, pattern),
                                                                    jqElement.trigger("patternchange", [pattern, null, temporary, true, null !== stopIndex ? stopIndex : null]));
                                                            },
                                                            onOpacity: function (opacity, temporary) {
                                                                (methods.opacity.call(element, opacity), jqElement.trigger("patternchange", [void 0, opacity, temporary, true]));
                                                            },
                                                            onClose: function (pattern, opacity, cancelClose, triggerEvent) {
                                                                var cancelled = false;
                                                                return (
                                                                    jqElement.trigger("chooserclose", [
                                                                        function () {
                                                                            ((cancelled = true), cancelClose && cancelClose());
                                                                        },
                                                                        triggerEvent,
                                                                    ]),
                                                                    !cancelled && (chooserData.options.asButton && jqElement.removeClass("g-active"), true)
                                                                );
                                                            },
                                                        });
                                                    (window.gPatternChooser.open(jqElement, settings),
                                                        window.gPatternChooser.setOpacity(methods.opacity.call(element)),
                                                        window.gPatternChooser.setPattern(methods.value.call(element)),
                                                        jqElement.trigger("chooseropen"),
                                                        null !== activeStopIdx && window.gPatternChooser.setActiveGradientStopByIdx(activeStopIdx));
                                                }
                                            }.bind(this)
                                        )
                                        .gPatternTarget()
                                        .gRichTooltip(
                                            GRichTooltipConfig.GRichTooltipConfig.from({
                                                title: GObject.GLocale.get(
                                                    new GObject.GLocaleKey("GPatternChooser", "text.color-picker-tooltip-title")
                                                ),
                                                description: GObject.GLocale.get(
                                                    new GObject.GLocaleKey("GPatternChooser", "text.color-picker-tooltip-description")
                                                ),
                                                learnMore:
                                                    "/docs/colors-gradients-textures/color-picker-fill-types/",
                                            })
                                        );
                                if (
                                    (options.asButton && previewElement.addClass("g-button"),
                                    jqElement
                                        .addClass(simplified ? "g-pattern-chooser-simplified" : "g-pattern-chooser")
                                        .data("gpatternchooser", { options: options, opacity: 1 }),
                                    !simplified && !options.noEyedropper)
                                ) {
                                    var eyedropperButton = $("<div/>")
                                        .addClass("eyedropper")
                                        .addClass("eye-drop")
                                        .gEyeDropper({ onClick: options.onClickEyedropper })
                                        .on("colorchange", function (e, colorValue) {
                                            jqElement.trigger("patternchange", [new GObject.GRGBColor(colorValue), colorValue[3] / 255, false]);
                                        })
                                        .removeClass("g-button")
                                        .gRichTooltip(
                                            GRichTooltipConfig.GRichTooltipConfig.from({
                                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.eyedropper-tooltip-title")),
                                                description: GObject.GLocale.get(
                                                    new GObject.GLocaleKey("GPatternChooser", "text.eyedropper-tooltip-description")
                                                ),
                                            })
                                        );
                                    previewElement.append(eyedropperButton);
                                }
                                (options.noEyedropper && jqElement.addClass("only-picker"), jqElement.append(previewElement).append(labelElement));
                            })
                        );
                    },
                    opacity: function (opacity) {
                        var element = $(this),
                            chooserData = element.data("gpatternchooser");
                        return arguments.length ? (chooserData && ((chooserData.opacity = opacity), methods._updateBackground.call(this)), this) : chooserData ? chooserData.opacity : 1;
                    },
                    value: function (value) {
                        var element = $(this);
                        return arguments.length
                            ? (element.find(".preview").gPatternTarget("value", value),
                              element.find(".eye-drop").gEyeDropper("setValue", value),
                              methods._updateBackground.call(this),
                              this)
                            : element.find(".preview").gPatternTarget("value");
                    },
                    setPattern: function (pattern) {
                        var element = $(this);
                        return (gPatternChooser.isOpenned(element) && gPatternChooser.setPattern(pattern), this);
                    },
                    nullValue: function (value) {
                        var element = $(this),
                            chooserData = element.data("gpatternchooser");
                        return arguments.length ? (chooserData && (chooserData.nullValue = value), methods._updateBackground.call(this), this) : chooserData ? chooserData.nullValue : null;
                    },
                    close: function () {
                        gPatternChooser.isOpenned($(this)) && gPatternChooser.close();
                    },
                    openEyeDropper: function (t, n) {
                        $(this).find(".eye-drop").gEyeDropper("setActive", true, t, n);
                    },
                    _updateBackground: function () {
                        var element = $(this),
                            chooserData = element.data("gpatternchooser"),
                            patternValue = element.find(".preview").gPatternTarget("value"),
                            previewElement = element.find(".preview");
                        let backgroundCss;
                        (!patternValue && chooserData && chooserData.nullValue && (patternValue = chooserData.nullValue),
                            patternValue instanceof GObject.GTexturePattern
                                ? ((backgroundCss = GObject.GPattern.asCSSBackground(patternValue, chooserData && "number" == typeof chooserData.opacity ? chooserData.opacity : 1)),
                                  previewElement
                                      .css("background-image", backgroundCss)
                                      .css("background-repeat", patternValue.getRepeatMode())
                                      .css("background-size", "contain"),
                                  element.find(".eye-drop").gEyeDropper("setValue", patternValue))
                                : patternValue &&
                                  "function" == typeof patternValue.asCSSBackground &&
                                  ((backgroundCss = GObject.GPattern.asCSSBackground(patternValue, chooserData && "number" == typeof chooserData.opacity ? chooserData.opacity : 1)),
                                  previewElement.css("background", backgroundCss),
                                  element.find(".eye-drop").gEyeDropper("setValue", backgroundCss)));
                    },
                    updateSettings: function (settings) {
                        var chooserData = $(this).data("gpatternchooser");
                        return (chooserData && chooserData.options && $.extend(chooserData.options, settings), this);
                    },
                };
                $.fn.gPatternChooser = function (methodName) {
                    return methods[methodName]
                        ? methods[methodName].apply(this, Array.prototype.slice.call(arguments, 1))
                        : "object" != typeof methodName && methodName
                          ? void $.error("Method " + methodName + " does not exist on jQuery.gPatternChooser")
                          : methods.init.apply(this, arguments);
                };
            })(jQuery),
            (GPatternChooser.prototype._clonePattern = function (pattern) {
                const clonedPattern = pattern.clone();
                return (clonedPattern.setScene(gDesigner.getActiveDocument().getScene()), clonedPattern);
            }),
            (module.exports = GPatternChooser));
    };
