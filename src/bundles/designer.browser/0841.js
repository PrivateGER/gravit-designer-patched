module.exports = function (module, exports, require) {
        "use strict";
        (require(96 /* polyfill:JSON */), require(4), require(13), require(32), require(33));
        var GObject = require(1);
        function GMissingFontsDialog(document, missingFonts, providerEnablers, callback) {
            ((this._dialog = $("<div></div>")),
                (this._replacedFonts = {}),
                (this.opened = false),
                (this._document = document),
                (this._callbacks = []),
                (this._keepFontsButton = $(
                    "<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GMissingFontsDialog", "action.keep-fonts")) + "</button>"
                ).on("click", () => this._keepFonts())),
                this._hasFakeTextNodes() || (this._keepFontsButton.addClass("g-disabled"), this._keepFontsButton.attr("disabled", true)),
                callback && this._callbacks.push(callback),
                $("<div></div>")
                    .addClass("title")
                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GMissingFontsDialog", "text.fonts-missing")))
                    .appendTo(this._dialog),
                $("<div></div>")
                    .addClass("subtitle")
                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GMissingFontsDialog", "text.fonts-not-found")))
                    .appendTo(this._dialog),
                (this._fontsContainer = $("<div></div>").addClass("fonts-container").appendTo(this._dialog)),
                this.setMissingFonts(missingFonts));
            var buttons = [];
            (buttons.push(this._keepFontsButton),
                document &&
                    buttons.unshift(
                        $("<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GMissingFontsDialog", "action.replace-fonts")) + "</button>").on(
                            "click",
                            this._replaceFonts.bind(this)
                        )
                    ),
                this.setProviderEnablers(providerEnablers),
                this._dialog.gDialog({
                    releaseOnClose: true,
                    className: "g-missingfonts-dialog",
                    buttons: buttons,
                }));
        }
        (GObject.GObject.inherit(GMissingFontsDialog, GObject.GObject),
            (GMissingFontsDialog.prototype.getMissingFonts = function () {
                var fontNames = [];
                return (this._fontsContainer.find(".postscriptname").each((index, element) => fontNames.push($(element).data("font"))), fontNames);
            }),
            (GMissingFontsDialog.prototype.setProviderEnablers = function (providerEnablers) {
                if (providerEnablers && providerEnablers.length > 0) {
                    $("<div></div>")
                        .addClass("subtitle")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GMissingFontsDialog", "text.turn-disabled-function")) + ":")
                        .css({ marginTop: "5px" })
                        .appendTo(this._dialog);
                    for (var t = 0; t < providerEnablers.length; t++) $(providerEnablers[t]).appendTo(this._dialog);
                }
            }),
            (GMissingFontsDialog.prototype.setMissingFonts = function (missingFonts) {
                if (missingFonts) {
                    var existingFontNames = Object.keys(this._replacedFonts);
                    if (Array.isArray(missingFonts)) {
                        var defaultFont = gDesigner.getWorkspace().getFontManager().getDefaultFont();
                        (this._keepFontsButton.show(),
                            missingFonts.forEach((fontName) => {
                                this._replacedFonts[fontName] = defaultFont.getFamily();
                            }));
                    } else
                        (this._keepFontsButton.hide(),
                            Object.keys(missingFonts).forEach((fontName) => {
                                this._replacedFonts[fontName] = missingFonts[fontName];
                            }));
                    var self = this;
                    Object.keys(this._replacedFonts).forEach((fontName) => {
                        if (!(existingFontNames.indexOf(fontName) >= 0)) {
                            var fontRow = $("<div></div>").addClass("font-row").appendTo(this._fontsContainer);
                            ($("<div></div>").addClass("postscriptname").data("font", fontName).text(fontName).appendTo(fontRow),
                                $("<input/>")
                                    .addClass("g-select")
                                    .data("font", fontName)
                                    .attr("type", "button")
                                    .gFontsButton({
                                        assignFontCallback: function (fontFamily, element) {
                                            self._replacedFonts[element.data("font")] = fontFamily;
                                        },
                                    })
                                    .val(self._replacedFonts[fontName] || defaultFont.getFamily())
                                    .appendTo(fontRow));
                        }
                    });
                } else this._keepFontsButton.hide();
            }),
            (GMissingFontsDialog.prototype.open = function (label) {
                var buttonLabel = label || GObject.GLocale.get(new GObject.GLocaleKey("GMissingFontsDialog", "action.keep-fonts"));
                (this._keepFontsButton.text(buttonLabel), (this.opened = true), this._dialog.gDialog("open", false));
            }),
            (GMissingFontsDialog.prototype.close = function (shouldApply) {
                ((this.opened = false),
                    this._callbacks.forEach((callback) => {
                        callback(shouldApply ? this._replacedFonts : null);
                    }),
                    this._dialog.gDialog("close"));
            }),
            (GMissingFontsDialog.prototype._keepFonts = function () {
                gDesigner.stats("missingfonts_keep_fonts");
                var scene = this._document.getScene();
                if (scene) {
                    var keptFontNames = scene.getProperty("cst") || [];
                    (Object.keys(this._replacedFonts).forEach((fontName) => {
                        !keptFontNames.indexOf(fontName) >= 0 && keptFontNames.push(fontName);
                    }),
                        scene.setProperty("cst", keptFontNames),
                        this.close());
                } else this.close();
            }),
            (GMissingFontsDialog.prototype._hasFakeTextNodes = function () {
                var hasFakeText = false;
                const scene = this._document && this._document.getScene();
                return (
                    scene &&
                        scene.acceptChildren((node) => {
                            if (node instanceof GObject.GText && (node.isFakeText() || node.hasEmbeddedFonts())) return ((hasFakeText = true), false);
                        }),
                    hasFakeText
                );
            }),
            (GMissingFontsDialog.prototype._replaceFonts = function () {
                (gDesigner.stats("missingfonts_replace_fonts"),
                    this._document.getScene().acceptChildren((node) => {
                        if (node instanceof GObject.GText)
                            if (node.isFakeText() || !node.$fontFamilies) node.replaceFonts(this._replacedFonts, node.hasEmbeddedFonts());
                            else {
                                var defaultFont = gDesigner.getWorkspace().getFontManager().getDefaultFont(),
                                    replacedFontNames = Object.keys(this._replacedFonts),
                                    content = node.getContent();
                                content &&
                                    (content.forEach((run, index) => {
                                        var fontFamily = (node.$fontFamilies && node.$fontFamilies[index]) || run.fontFamily;
                                        -1 !== replacedFontNames.indexOf(fontFamily) && (run.fontFamily = this._replacedFonts[fontFamily] || defaultFont.getFamily());
                                    }),
                                    (node._runsDirty = true),
                                    (node.$content = JSON.stringify(content)),
                                    node.setText(content),
                                    node.repaint());
                            }
                        else if (node instanceof GObject.GStyle) {
                            var styleFontFamily = node.getProperty("_tff");
                            this._replacedFonts instanceof GObject.GFont
                                ? node.setProperties(
                                      ["_tff", "_tfs", "_tfw"],
                                      [this._replacedFonts.getFamily(), this._replacedFonts.getStyle(), this._replacedFonts.getWeight()]
                                  )
                                : styleFontFamily && this._replacedFonts[styleFontFamily] && node.setProperty("_tff", this._replacedFonts[styleFontFamily]);
                        }
                    }),
                    this.close(true));
            }),
            (module.exports = GMissingFontsDialog));
    };
