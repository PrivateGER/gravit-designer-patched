module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            designerConfig = require(10);
        const GOfflineDialog = require(256),
            GSystemDialog = require(44),
            s = require(1350);
        module.exports = class {
            async open(url) {
                let autoClose = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                ((this._url = url), (this._autoClose = autoClose), (this._isPending = true));
                return (await gDesigner.isOfflineAsync())
                    ? new Promise((resolve, reject) => {
                          GOfflineDialog.openRetryConnection(() => {
                              this._open().then(resolve).catch(reject);
                          });
                      })
                    : this._open();
            }
            async _open() {
                if ($(".g-payment-dialog").length) return Promise.reject();
                const paymentInstance = s.getInstance();
                this._dialog = $("<div></div>")
                    .gDialog({
                        className: "g-payment-dialog",
                        releaseOnClose: true,
                        closeCallback: () => {
                            paymentInstance.cancelPurchase();
                        },
                    })
                    .append(
                        $("<div></div>")
                            .addClass("g-btn-close")
                            .append($("<span></span>").addClass("gravit-icon-close"))
                            .on("click", () => {
                                this._close();
                            })
                    );
                const content = $("<div></div>").addClass("content").appendTo(this._dialog);
                (this._dialog.addClass("g-loading"), this._dialog.gDialog("open", false));
                const iframeUrl = this._getURL();
                $("<iframe/>")
                    .attr("src", iframeUrl)
                    .on("load", () => {
                        this._dialog.removeClass("g-loading");
                    })
                    .on("error", () => {
                        this._dialog.removeClass("g-loading");
                    })
                    .appendTo(content);
                try {
                    await paymentInstance.waitForPurchase();
                } catch (e) {
                    GSystemDialog.alert(
                        GObject.GLocale.getValue("GPaymentDialog", "text.payment-not-confirmed").replace("%link", designerConfig.gApi.link.getSupportUrl())
                    );
                } finally {
                    this._isPending = false;
                }
            }
            _getURL() {
                let url = this._url;
                const linkerParam = gDesigner.getLinkerParam();
                if (linkerParam) {
                    const parsedUrl = new URL(url);
                    (parsedUrl.searchParams.set.apply(parsedUrl.searchParams, linkerParam.split("=")), (url = parsedUrl.toString()));
                }
                return url;
            }
            _close() {
                if (this._isPending) {
                    const leaveMessage = GObject.GLocale.get(new GObject.GLocaleKey("GPaymentDialog", "text.dialog-dont-leave")),
                        cancelLabel = GObject.GLocale.get(new GObject.GLocaleKey("GPaymentDialog", "text.cancel")),
                        confirmLabel = GObject.GLocale.get(new GObject.GLocaleKey("GPaymentDialog", "text.finish-my-order"));
                    GSystemDialog.confirm(
                        leaveMessage,
                        (confirmed) => {
                            confirmed ? ((this._autoClose = true), this._isPending || this.close()) : this.close();
                        },
                        cancelLabel,
                        confirmLabel
                    );
                } else this.close();
            }
            close() {
                this._dialog.gDialog("close");
            }
        };
    };
