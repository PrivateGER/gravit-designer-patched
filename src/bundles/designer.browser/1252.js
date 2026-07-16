module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(30), require(8 /* Symbol */), require(3), require(4), require(32), require(33), require(26), require(125), require(126), require(114));
        const GProfileDialog = require(604);
        module.exports = class {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this._settings = e;
            }
            getFrame() {
                return this._iframe;
            }
            open(e) {
                const t = gDesigner.getUTM();
                if (t && t.size) {
                    const n = new URL(e),
                        o = n.searchParams;
                    (t.forEach((e, t) => o.set(t, e)), (e = n.toString()));
                }
                if (((this._iframe = $("<iframe></iframe>").addClass("cross-frame").attr("src", e).appendTo($("body"))), this._settings)) {
                    const { id: e, className: t, css: n } = this._settings;
                    (e && this._iframe.attr("id", e), t && this._iframe.addClass(t), n && this._iframe.css(n));
                }
                let n = this.close.bind(this);
                return (
                    this._settings.close && (n = this._settings.close),
                    (this._messageHandler = async (e) => {
                        if (e.originalEvent.source !== this._iframe[0].contentWindow) return;
                        let t = e.originalEvent.data;
                        const { cmd: i } = t;
                        if (i) {
                            if (this._settings[i]) return void this._settings[i](t);
                            switch (i) {
                                case "close":
                                    n(t);
                                    break;
                                case "settings":
                                    let e = await gDesigner.getUser();
                                    new GProfileDialog(e, "purchase").open();
                                    break;
                                case "purchase_flow":
                                    const { options: i = {} } = t,
                                        { immediatePurchase: a = false, closeable: r = true } = i;
                                    (a &&
                                        Object.assign(i, {
                                            autoClose: true,
                                            paymentCallback: () => {
                                                n();
                                            },
                                        }),
                                        r ||
                                            Object.assign(i, {
                                                paymentCallback: (e) => {
                                                    let { licenseHasBeenUpgraded: t = false } = e;
                                                    n({ licenseHasBeenUpgraded: t, closeable: r });
                                                },
                                            }));
                                    let s = t.options;
                                    (gInAppPurchase.getOptions() && (s = Object.assign({}, gInAppPurchase.getOptions(), s)),
                                        gDesigner
                                            .openPaymentDialog(null, s)
                                            .then(function () {
                                                let { reinstate: e } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                                (a && !e) || n({ closeable: r });
                                            })
                                            .catch(() => {
                                                n({ closeable: r });
                                            }));
                                    break;
                                case "link":
                                    gContainer.openExternalLink(null, t.link);
                            }
                        }
                    }),
                    $(window).on("message", this._messageHandler),
                    this
                );
            }
            close() {
                let { licenseHasBeenUpgraded: e = false, closeable: t = true } =
                    arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (this._messageHandler && (t || e) && ($(window).unbind("message", this._messageHandler), this._iframe.remove()),
                    e && gDesigner.requestLicenseUpdate());
            }
            on(e, t) {
                this._iframe.on(e, t);
            }
            postMessage() {
                this._iframe[0].contentWindow.postMessage.apply(this._iframe[0].contentWindow, arguments);
            }
        };
    };
