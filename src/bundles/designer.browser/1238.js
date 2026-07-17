module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(38), require(26));
        var GObject = require(1);
        require(1150 /* GPatternChooser */);
        function GUnsupportedFeaturesDialog(elements) {
            let featuresMessage = [
                ...new Set(
                    elements.map((element) =>
                        element.features
                            .map((feature) =>
                                "• "
                                    .concat(
                                        ((featureType) =>
                                            featureType instanceof GObject.GNode
                                                ? featureType.getNodeNameTranslated()
                                                : featureType instanceof GObject.GNoisePattern
                                                  ? GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.noise"))
                                                  : featureType instanceof GObject.GTexturePattern
                                                    ? GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.texture"))
                                                    : featureType instanceof GObject.GBackground
                                                      ? GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.backgroundfill"))
                                                      : featureType instanceof GObject.GAngularGradient
                                                        ? GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.angulargradient"))
                                                        : "")(feature),
                                        " ["
                                    )
                                    .concat(element.name, "]")
                            )
                            .join("<br>")
                    )
                ),
            ].join("<br>");
            ((this._dialog = $("<div></div>").gDialog({
                releaseOnClose: true,
                buttons: [$("<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")) + "</button>").on("click", () => this.close())],
            })),
                $("<div/>")
                    .addClass("message")
                    .css({ lineHeight: "1.5em", maxHeight: "60%", overflow: "auto" })
                    .append(
                        $("<span/>").html(
                            GObject.GLocale.get(new GObject.GLocaleKey("GUnsupportedFeaturesDialog", "text.title-unsupported")) + "<br>" + featuresMessage
                        )
                    )
                    .appendTo(this._dialog),
                $("<div></div>")
                    .css("margin-top", "10px")
                    .append(
                        $("<label></label>")
                            .append(
                                $("<input>")
                                    .attr("type", "checkbox")
                                    .css("margin-right", "5px")
                                    .on("change", (event) => {
                                        let isChecked = $(event.target).is(":checked");
                                        gDesigner.setSetting("disable_warning_unsupported_features", isChecked);
                                    })
                            )
                            .append(
                                $("<span></span>").text(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GUnsupportedFeaturesDialog", "text.checked-unsupported"))
                                )
                            )
                    )
                    .appendTo(this._dialog));
        }
        (GObject.GObject.inherit(GUnsupportedFeaturesDialog, GObject.GObject),
            (GUnsupportedFeaturesDialog.prototype.open = function () {
                this._dialog.gDialog("open");
            }),
            (GUnsupportedFeaturesDialog.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (module.exports = GUnsupportedFeaturesDialog));
    };
