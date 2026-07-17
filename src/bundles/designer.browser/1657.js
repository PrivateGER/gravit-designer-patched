module.exports = function (module, exports, require) {
        "use strict";
        require(53);
        var GObject = require(1),
            Utils = (require(15 /* GPlatform */), require(40 /* Utils */)),
            GMenu = (require(67 /* GRichTooltipConfig */), require(238 /* GMenu */)),
            GSystemDialog = (require(1151), require(857 /* GInputSlider */), require(173), require(877 /* GPasteAction */), require(44 /* GSystemDialog */)),
            GPatternChooser = require(1150);
        function PatternChooserTouch() {
            (this.initLayout(),
                this._container.gOverlay({
                    releaseOnClose: false,
                    padding: false,
                    clazz: "pattern-chooser-overlay",
                    customRight: -250,
                }),
                this.initContextMenu());
        }
        (GObject.GObject.inheritAndMix(PatternChooserTouch, GPatternChooser),
            (PatternChooserTouch.prototype._advancedExpanded = true),
            (PatternChooserTouch.prototype._longPressTimer = null),
            (PatternChooserTouch.prototype._islongPress = false),
            (PatternChooserTouch.prototype._contextMenu = null),
            (PatternChooserTouch.prototype._currentLongPressTarget = null),
            (PatternChooserTouch.prototype._createChoosers = function (onClick) {
                return $("<div />")
                    .addClass("chooser")
                    .append(
                        $("<button />")
                            .attr("data-palette", "colors")
                            .append(
                                $("<div />")
                                    .addClass("mini-font")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.colors")).toUpperCase())
                            )
                            .on("click", onClick)
                    )
                    .append(
                        $("<button />")
                            .gPro({ feature: "swatches" })
                            .attr("data-palette", "swatches")
                            .append(
                                $("<div />")
                                    .addClass("mini-font")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.swatches")).toUpperCase())
                            )
                            .on(
                                "click",
                                Utils.watchDog.trap(
                                    onClick,
                                    null,
                                    (e) => gDesigner.stats("patternchooser_nonprotriespro_palette", "swatches"),
                                    "swatches"
                                )
                            )
                    )
                    .append(
                        $("<button />")
                            .attr("data-palette", "used")
                            .append(
                                $("<div />")
                                    .addClass("mini-font")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.in-use")).toUpperCase())
                            )
                            .on("click", onClick)
                    )
                    .append(
                        $("<button />")
                            .attr("data-palette", "mixer")
                            .append(
                                $("<div />")
                                    .addClass("mini-font")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.mixer")).toUpperCase())
                            )
                            .on("click", onClick)
                    )
                    .appendTo(this._palettes);
            }),
            (PatternChooserTouch.prototype.initContextMenu = function (e) {
                this._contextMenu = new GMenu(null, "g-pattern-chooser-context-menu");
                var addSwatch = (scope, addSwatch, opacity) => {
                        gDesigner.stats("patternchooser_add_swatch", scope);
                        var swatch = new GObject.GSwatch(addSwatch, opacity),
                            swatches = gDesigner.getSwatches(scope);
                        if (swatches) {
                            for (var s = 0; s < swatches.length; ++s)
                                if (GObject.GUtil.equals(swatch, swatches[s], true))
                                    return void GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.equal-swatch-alert")));
                            (swatches.push(swatch), gDesigner.setSwatches(scope, swatches));
                        }
                    },
                    applyColorToPattern = (color) => {
                        var pattern = this._pattern.clone();
                        return (
                            (pattern instanceof GObject.GRadialGradient || pattern instanceof GObject.GLinearGradient || pattern instanceof GObject.GAngularGradient) &&
                                (pattern._stops[0].color = color),
                            pattern
                        );
                    },
                    addSwatchFromContext = (scope) => {
                        var swatchData = $(this._currentLongPressTarget).closest(".swatch").data("swatch");
                        if (swatchData) {
                            var color = swatchData.getProperty("_pt"),
                                opacity = swatchData.getProperty("_op");
                            scope = this._getSwatchScope(scope, this._pattern);
                            ((color = applyColorToPattern(color)), addSwatch(scope, color, opacity));
                        } else
                            "INPUT" === this._currentLongPressTarget.nodeName &&
                                addSwatch(this._getSwatchScope("document", this._pattern), this._pattern, this._opacity);
                    };
                (this._contextMenu
                    .createAddItem(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.add-to-document-swatches")), () => {
                        addSwatchFromContext("document");
                    })
                    .setIcon("gravit-icon-add-swatches"),
                    this._contextMenu
                        .createAddItem(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.add-to-global-swatches")), () => {
                            addSwatchFromContext("global");
                        })
                        .setIcon("gravit-icon-add-swatches"));
            }),
            (PatternChooserTouch.prototype.__getColorModeParams = function () {
                return {
                    hexWidth: "25%",
                    isTouchEnabled: true,
                    rgbWidth: "12%",
                    cymkWidth: "12%",
                };
            }),
            (PatternChooserTouch.prototype._createPatternEditorFirstRow = function (onChooseImage, onPasteColor) {
                return [
                    {
                        width: "80%",
                        padding: false,
                        content: $("<button />")
                            .prepend($("<span></span>").addClass("gravit-icon-add-image"))
                            .append(
                                $("<div />")
                                    .addClass("mini-font")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.choose-image")) + "...")
                            )
                            .addClass("pattern-choose-image-button")
                            .on("click", onChooseImage),
                    },
                    {
                        width: "20%",
                        content: $("<button />")
                            .addClass("paste-btn")
                            .addClass("g-flat")
                            .append($("<span></span>").addClass("gravit-icon-paste-color-choose"))
                            .on("click", onPasteColor),
                    },
                ];
            }),
            (PatternChooserTouch.prototype._createPatternEditorMaskRow = function (onMaskChange) {
                return [
                    {
                        padding: false,
                        width: "50px",
                        content: $("<label />")
                            .addClass("g-switch")
                            .append(
                                $("<input>")
                                    .attr("id", "texture-mask-touch")
                                    .attr("type", "checkbox")
                                    .attr("data-property", "texture_mask")
                                    .prop("disabled", true)
                                    .on("change", onMaskChange)
                            )
                            .append($("<div />")),
                    },
                    {
                        padding: false,
                        width: "auto",
                        content: $("<label></label>")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "action.set-transparency-mask")))
                            .addClass("set-transparency-mask")
                            .attr("for", "texture-mask-touch"),
                    },
                ];
            }),
            (PatternChooserTouch.prototype._createPatternEditorScaleRow = function (onScaleInput, onScaleChange, onScaleTextChange) {
                return [
                    {
                        padding: false,
                        width: "120px",
                        content: $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.scale"))),
                    },
                    {
                        width: "auto",
                        content: $("<div/>")
                            .attr("data-property", "texture_tile")
                            .gInputSlider({ min: 10, max: 200 })
                            .on("input", onScaleInput)
                            .on("change", onScaleChange),
                    },
                    {
                        width: "50px",
                        content: $("<input>").attr("data-property", "texture_tile").attr("type", "text").on("change", onScaleTextChange).gInputBox({
                            minValue: 10,
                            maxValue: 200,
                            incrementValue: 1,
                            postfix: "%",
                        }),
                    },
                ];
            }),
            (PatternChooserTouch.prototype._createPatternEditorAdvancedRow = function (advancedContent) {
                return [
                    {
                        width: "auto",
                        content: $("<div />")
                            .addClass("advanced-option")
                            .append(
                                $("<b>" + GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.advanced")) + " </b>").addClass("title")
                            )
                            .append($("<div />").addClass("gravit-icon-right expand-icon").attr("id", "expand-icon"))
                            .on(
                                "click",
                                function () {
                                    (gDesigner.stats("patternchooser_click_advanced"),
                                        advancedContent.slideToggle(),
                                        (this._advancedExpanded = !this._advancedExpanded),
                                        $("#expand-icon").removeClass("gravit-icon-right").removeClass("gravit-icon-down"),
                                        $("#expand-icon").addClass(this._advancedExpanded ? "gravit-icon-right" : "gravit-icon-down"));
                                }.bind(this)
                            ),
                    },
                ];
            }),
            (PatternChooserTouch.prototype.__getCreatePatternEditorParams = function () {
                return {
                    isTouchEnabled: true,
                    repeatWidth: "48%",
                    ghostWidth: "4%",
                    postionWith: "48%",
                    sizeWidth: "48%",
                    unitWidth: "8%",
                };
            }),
            (PatternChooserTouch.prototype._createMixerPalette = function (container) {
                for (
                    var tintsContainer = $("<div />")
                            .attr("data-container", "tints")
                            .addClass("tints")
                            .append(
                                $("<div/>")
                                    .addClass("title")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.tints")).toUpperCase())
                            )
                            .appendTo(container),
                        n = 1;
                    n <= 8;
                    n += 1
                )
                    this._createPaletteSwatch(GObject.GRGBColor.WHITE, tintsContainer, false, false);
                var shadesContainer = $("<div />")
                    .attr("data-container", "shades")
                    .addClass("shades")
                    .append(
                        $("<div/>")
                            .addClass("title")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.shades")).toUpperCase())
                    )
                    .appendTo(container);
                for (n = 1; n <= 8; n += 1) this._createPaletteSwatch(GObject.GRGBColor.WHITE, shadesContainer, false, false);
                var tonesContainer = $("<div />")
                    .attr("data-container", "tones")
                    .addClass("tones")
                    .append(
                        $("<div/>")
                            .addClass("title")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.tones")).toUpperCase())
                    )
                    .appendTo(container);
                for (n = 1; n <= 8; n += 1) this._createPaletteSwatch(GObject.GRGBColor.WHITE, tonesContainer, false, false);
                var mixesContainer = $("<div />")
                    .attr("data-container", "mixes")
                    .addClass("mixes")
                    .append(
                        $("<div/>")
                            .addClass("title")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "text.mixes")).toUpperCase())
                    )
                    .appendTo(container);
                for (n = 1; n <= 8; n += 1) this._createPaletteSwatch(GObject.GRGBColor.WHITE, mixesContainer, false, false);
                this._updateMixerPalette();
            }),
            (PatternChooserTouch.prototype.__getUpdateMixerPaletteParams = function () {
                return { maxCount: 8 };
            }),
            (PatternChooserTouch.prototype.__getCreateUsedPaletteParams = function () {
                return { isTouchEnabled: true, maxCount: 8 };
            }),
            (PatternChooserTouch.prototype.__getUpdateSwatchesPaletteParams = function () {
                return { isTouchEnabled: true };
            }),
            (PatternChooserTouch.prototype.__getUpdateGradientStopParams = function () {
                return { isTouchEnabled: true };
            }),
            (PatternChooserTouch.prototype.__getCreatePaletteSwatchParamas = function () {
                return { isTouchEnabled: true };
            }),
            (PatternChooserTouch.prototype.__getUpdateOpacityParams = function () {
                return { isTouchEnabled: true };
            }),
            (PatternChooserTouch.prototype.__getUpdateColorParams = function () {
                return { isTouchEnabled: true };
            }),
            (GPatternChooser.prototype._relayout = function () {
                let preserveTop = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._container.gOverlay("relayout", { preserveTop: preserveTop });
            }),
            (module.exports = PatternChooserTouch));
    };
