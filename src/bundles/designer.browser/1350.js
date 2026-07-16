module.exports = function (module, exports, require) {
        "use strict";
        (require(30), require(8 /* Symbol */));
        const o = require(337),
            i = require(1338),
            { gApi, PurchaseStatus } = require(10 /* designerConfig */),
            { IS_TRUNK } = require(231 /* IS_TRUNK */);
        let l;
        class c {
            static getInstance() {
                return (l || (l = new c()), l);
            }
            waitForPurchase() {
                return (
                    this.cancelPurchase(),
                    (this._promiseCapabilities = {}),
                    new Promise((e, t) => {
                        (Object.assign(this._promiseCapabilities, { resolve: e, reject: t }),
                            (this._ws = new gApi.WebSocketClient()),
                            this._ws.connect("/payload"),
                            this._ws.on("payload", async (t) => {
                                try {
                                    const { data } = t;
                                    (await this._tryCheckLicense(),
                                        await this._tryFireEvent(data),
                                        (data.licenseHasBeenUpgraded = this._shouldFireUserCompletedPurchaseEvent(data)),
                                        e(data));
                                } finally {
                                    this._ws.close();
                                }
                            }));
                    })
                );
            }
            cancelPurchase() {
                (this._promiseCapabilities && this._promiseCapabilities.resolve && this._promiseCapabilities.resolve(),
                    this._ws && this._ws.close());
            }
            async _tryCheckLicense() {
                try {
                    await o.checkLicense();
                } catch (e) {
                    console.error("GLicenseManager.checkLicense", e);
                }
            }
            async _tryFireEvent(e) {
                try {
                    this._shouldFireUserCompletedPurchaseEvent(e) && i.fireEvent(i.Events.USER_COMPLETED_PURCHASE_EVENT);
                } catch (e) {
                    console.error("GTMHelper.fireEvent", e);
                }
            }
            _shouldFireUserCompletedPurchaseEvent(e) {
                const { statusId } = e;
                return !(!IS_TRUNK || statusId !== PurchaseStatus.SuccessfulTestOrder) || statusId === PurchaseStatus.Paid;
            }
        }
        module.exports = c;
    };
