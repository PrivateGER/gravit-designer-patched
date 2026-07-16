module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(8 /* Symbol */), require(20), require(3), require(34), require(26), require(125), require(126), require(114));
        var GObject = require(1),
            designerConfig = require(10);
        const GOfflineDialog = require(256),
            GSystemDialog = require(44),
            s = require(1350);
        module.exports = class {
            async open(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                ((this._url = e), (this._autoClose = t), (this._isPending = true));
                return (await gDesigner.isOfflineAsync())
                    ? new Promise((e, t) => {
                          GOfflineDialog.openRetryConnection(() => {
                              this._open().then(e).catch(t);
                          });
                      })
                    : this._open();
            }
            async _open() {
                if ($(".g-payment-dialog").length) return Promise.reject();
                const e = s.getInstance();
                this._dialog = $("<div></div>")
                    .gDialog({
                        className: "g-payment-dialog",
                        releaseOnClose: true,
                        closeCallback: () => {
                            e.cancelPurchase();
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
                const t = $("<div></div>").addClass("content").appendTo(this._dialog);
                (this._dialog.addClass("g-loading"), this._dialog.gDialog("open", false));
                const n = this._getURL();
                $("<iframe/>")
                    .attr("src", n)
                    .on("load", () => {
                        this._dialog.removeClass("g-loading");
                    })
                    .on("error", () => {
                        this._dialog.removeClass("g-loading");
                    })
                    .appendTo(t);
                try {
                    await e.waitForPurchase();
                } catch (e) {
                    GSystemDialog.alert(
                        GObject.GLocale.getValue("GPaymentDialog", "text.payment-not-confirmed").replace("%link", designerConfig.gApi.link.getSupportUrl())
                    );
                } finally {
                    this._isPending = false;
                }
            }
            _getURL() {
                let e = this._url;
                const t = gDesigner.getLinkerParam();
                if (t) {
                    const n = new URL(e);
                    (n.searchParams.set.apply(n.searchParams, t.split("=")), (e = n.toString()));
                }
                return e;
            }
            _close() {
                if (this._isPending) {
                    const e = GObject.GLocale.get(new GObject.GLocaleKey("GPaymentDialog", "text.dialog-dont-leave")),
                        t = GObject.GLocale.get(new GObject.GLocaleKey("GPaymentDialog", "text.cancel")),
                        n = GObject.GLocale.get(new GObject.GLocaleKey("GPaymentDialog", "text.finish-my-order"));
                    GSystemDialog.confirm(
                        e,
                        (e) => {
                            e ? ((this._autoClose = true), this._isPending || this.close()) : this.close();
                        },
                        t,
                        n
                    );
                } else this.close();
            }
            close() {
                this._dialog.gDialog("close");
            }
        };
    };
