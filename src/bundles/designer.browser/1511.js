module.exports = function (module, exports, require) {
        "use strict";
        var GObject = require(1);
        function GWarnLinkedImageDialog(agreeCallback, rejectCallback) {
            ((this._neverRemind = false),
                (this._agreeCb = agreeCallback),
                (this._rejectCb = rejectCallback || this.close),
                gContainer.getProperty("designer.settings.warn-linked-image-dialog.never-remind").then((neverRemind) => {
                    (neverRemind = neverRemind || false) ? agreeCallback() : this._init();
                }));
        }
        (GObject.GObject.inherit(GWarnLinkedImageDialog, GObject.GObject),
            (GWarnLinkedImageDialog.prototype._init = function () {
                ((this._dialog = $("<div></div>")
                    .addClass("container")
                    .append(
                        $("<div />")
                            .addClass("text-content")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GWarnLinkedImageDialog", "warn-linked-image.text")))
                    )
                    .append(
                        $("<div />")
                            .addClass("checkbox-content")
                            .append(
                                $("<input />")
                                    .attr("type", "checkbox")
                                    .attr("name", "never-remind")
                                    .attr("checked", this._neverRemind)
                                    .on(
                                        "change",
                                        function () {
                                            this._neverRemind = !this._neverRemind;
                                        }.bind(this)
                                    )
                            )
                            .append(
                                $("<span />")
                                    .addClass("checkbox-text")
                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GWarnLinkedImageDialog", "warn-linked-image.never-remind")))
                            )
                    )
                    .gDialog({
                        releaseOnClose: true,
                        className: "g-warn-linked-image-dialog",
                        buttons: [
                            $("<button />")
                                .addClass("native-button")
                                .attr("type", "submit")
                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GWarnLinkedImageDialog", "warn-linked-image.proceed")))
                                .on("click", this.save.bind(this)),
                            $("<button />")
                                .addClass("native-button")
                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GWarnLinkedImageDialog", "warn-linked-image.cancel")))
                                .on("click", this._rejectCb.bind(this)),
                        ],
                    })),
                    $("<div></div>")
                        .addClass("g-btn-close")
                        .append($("<span></span>").addClass("gravit-icon-close"))
                        .on("click", this.close.bind(this))
                        .appendTo(this._dialog));
            }),
            (GWarnLinkedImageDialog.prototype.save = function () {
                (this._neverRemind &&
                    gContainer &&
                    gContainer.setProperty &&
                    gContainer.setProperty("designer.settings.warn-linked-image-dialog.never-remind", true),
                    this.close(),
                    this._agreeCb());
            }),
            (GWarnLinkedImageDialog.prototype.open = function () {
                this._dialog.gDialog("open", true);
            }),
            (GWarnLinkedImageDialog.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (module.exports = GWarnLinkedImageDialog));
    };
