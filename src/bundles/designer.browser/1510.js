module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var GObject = require(1),
            Utils = require(40),
            styles = require(257);
        class SaveChooserDialog {
            constructor(callback) {
                let { closeCallback } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                var self = this;
                ((this._dialog = $("<div/>")
                    .addClass("g-save-chooser")
                    .append(
                        $("<div/>")
                            .addClass("save-to-file")
                            .append(
                                $("<div/>")
                                    .addClass("content")
                                    .append($("<span/>").addClass("gravit-icon-local-file").addClass("icon"))
                                    .append(
                                        $("<span/>")
                                            .addClass("label")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.save-to-file")))
                                    )
                            )
                            .on("click", async function () {
                                (gDesigner.stats("savedialog_save_file"), await self.close(), callback(SaveChooserDialog.file()));
                            })
                    )
                    .append($("<hr/>"))
                    .append(
                        $("<div/>")
                            .addClass("save-to-file")
                            .append(
                                $("<div/>")
                                    .addClass("content")
                                    .append($("<span/>").addClass(styles["gravit-icon-cloud-save-choose"]).addClass("icon"))
                                    .append(
                                        $("<span/>")
                                            .addClass("label")
                                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.save-to-cloud")))
                                    )
                            )
                            .on("click", async function () {
                                (gDesigner.stats("savedialog_save_cloud"), await self.close(), callback(SaveChooserDialog.cloud()));
                            })
                    )),
                    this._dialog.gDialog({
                        releaseOnClose: true,
                        className: "g-save-chooser-dialog",
                        closeTimeout: 0,
                        closeCallback: closeCallback,
                    }));
            }
            open() {
                this._dialog.gDialog("open", true);
            }
            close() {
                return (this._dialog.gDialog("close", false), (0, Utils.sleep)(0));
            }
            static file() {
                return "file";
            }
            static cloud() {
                return "cloud";
            }
        }
        module.exports = SaveChooserDialog;
    };
