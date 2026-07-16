module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(38), require(26));
        var GObject = require(1);
        require(1150 /* GPatternChooser */);
        function i(e) {
            let t = [
                ...new Set(
                    e.map((e) =>
                        e.features
                            .map((t) =>
                                "• "
                                    .concat(
                                        ((e) =>
                                            e instanceof GObject.GNode
                                                ? e.getNodeNameTranslated()
                                                : e instanceof GObject.GNoisePattern
                                                  ? GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.noise"))
                                                  : e instanceof GObject.GTexturePattern
                                                    ? GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.texture"))
                                                    : e instanceof GObject.GBackground
                                                      ? GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.backgroundfill"))
                                                      : e instanceof GObject.GAngularGradient
                                                        ? GObject.GLocale.get(new GObject.GLocaleKey("GPatternChooser", "pattern-type.angulargradient"))
                                                        : "")(t),
                                        " ["
                                    )
                                    .concat(e.name, "]")
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
                            GObject.GLocale.get(new GObject.GLocaleKey("GUnsupportedFeaturesDialog", "text.title-unsupported")) + "<br>" + t
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
                                    .on("change", (e) => {
                                        let t = $(e.target).is(":checked");
                                        gDesigner.setSetting("disable_warning_unsupported_features", t);
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
        (GObject.GObject.inherit(i, GObject.GObject),
            (i.prototype.open = function () {
                this._dialog.gDialog("open");
            }),
            (i.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (module.exports = i));
    };
