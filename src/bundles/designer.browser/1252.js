module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(3), require(4), require(32), require(33), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        const GProfileDialog = require(604);
        module.exports = class {
            constructor() {
                let settings = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this._settings = settings;
            }
            getFrame() {
                return this._iframe;
            }
            open(url) {
                const utm = gDesigner.getUTM();
                if (utm && utm.size) {
                    const parsedUrl = new URL(url),
                        searchParams = parsedUrl.searchParams;
                    (utm.forEach((value, key) => searchParams.set(key, value)), (url = parsedUrl.toString()));
                }
                if (((this._iframe = $("<iframe></iframe>").addClass("cross-frame").attr("src", url).appendTo($("body"))), this._settings)) {
                    const { id, className, css } = this._settings;
                    (id && this._iframe.attr("id", id), className && this._iframe.addClass(className), css && this._iframe.css(css));
                }
                let closeHandler = this.close.bind(this);
                return (
                    this._settings.close && (closeHandler = this._settings.close),
                    (this._messageHandler = async (event) => {
                        if (event.originalEvent.source !== this._iframe[0].contentWindow) return;
                        let data = event.originalEvent.data;
                        const { cmd } = data;
                        if (cmd) {
                            if (this._settings[cmd]) return void this._settings[cmd](data);
                            switch (cmd) {
                                case "close":
                                    closeHandler(data);
                                    break;
                                case "settings":
                                    let user = await gDesigner.getUser();
                                    new GProfileDialog(user, "purchase").open();
                                    break;
                                case "purchase_flow":
                                    const { options: options = {} } = data,
                                        { immediatePurchase: immediatePurchase = false, closeable: closeable = true } = options;
                                    (immediatePurchase &&
                                        Object.assign(options, {
                                            autoClose: true,
                                            paymentCallback: () => {
                                                closeHandler();
                                            },
                                        }),
                                        closeable ||
                                            Object.assign(options, {
                                                paymentCallback: (paymentResult) => {
                                                    let { licenseHasBeenUpgraded: upgraded = false } = paymentResult;
                                                    closeHandler({ licenseHasBeenUpgraded: upgraded, closeable: closeable });
                                                },
                                            }));
                                    let purchaseOptions = data.options;
                                    (gInAppPurchase.getOptions() && (purchaseOptions = Object.assign({}, gInAppPurchase.getOptions(), purchaseOptions)),
                                        gDesigner
                                            .openPaymentDialog(null, purchaseOptions)
                                            .then(function () {
                                                let { reinstate } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                                (immediatePurchase && !reinstate) || closeHandler({ closeable: closeable });
                                            })
                                            .catch(() => {
                                                closeHandler({ closeable: closeable });
                                            }));
                                    break;
                                case "link":
                                    gContainer.openExternalLink(null, data.link);
                            }
                        }
                    }),
                    $(window).on("message", this._messageHandler),
                    this
                );
            }
            close() {
                let { licenseHasBeenUpgraded: licenseHasBeenUpgraded = false, closeable: closeable = true } =
                    arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (this._messageHandler && (closeable || licenseHasBeenUpgraded) && ($(window).unbind("message", this._messageHandler), this._iframe.remove()),
                    licenseHasBeenUpgraded && gDesigner.requestLicenseUpdate());
            }
            on(event, handler) {
                this._iframe.on(event, handler);
            }
            postMessage() {
                this._iframe[0].contentWindow.postMessage.apply(this._iframe[0].contentWindow, arguments);
            }
        };
    };
