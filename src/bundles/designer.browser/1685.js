module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        const i = {
            [GObject.GLocaleLanguage.Portuguese]: "pt-br",
            [GObject.GLocaleLanguage.Spanish]: "es",
            [GObject.GLocaleLanguage.German]: "de",
            [GObject.GLocaleLanguage.Italian]: "it",
            [GObject.GLocaleLanguage.French]: "fr",
        };
        module.exports = class {
            constructor() {
                const e = i[GObject.GLocale.getLanguage()] || "en",
                    t = $("<iframe>")
                        .attr("src", "https://www.gravit.linusrath.de/".concat(e, "/messages/windows-store"))
                        .on("load error", () => this._dialog.removeClass("g-loading"));
                this._dialog = $("<div/>")
                    .addClass("g-loading")
                    .gDialog({
                        releaseOnClose: true,
                        className: "g-windows-store-announcement-dialog",
                        buttons: [
                            $("<button/>")
                                .addClass("primary")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                                .on("click", () => this.close()),
                        ],
                    })
                    .append(t);
            }
            open() {
                this._dialog.gDialog("open", false);
            }
            close() {
                this._dialog.gDialog("close");
            }
        };
    };
