module.exports = function (module, exports, require) {
        "use strict";
        (require(30 /* polyfill:Object */), require(8 /* Symbol */));
        const licenseManager = require(337),
            gtmHelper = require(1338),
            { gApi, PurchaseStatus } = require(10 /* designerConfig */),
            { IS_TRUNK } = require(231 /* IS_TRUNK */);
        let instance;
        class PurchaseManager {
            static getInstance() {
                return (instance || (instance = new PurchaseManager()), instance);
            }
            waitForPurchase() {
                return (
                    this.cancelPurchase(),
                    (this._promiseCapabilities = {}),
                    new Promise((resolve, reject) => {
                        (Object.assign(this._promiseCapabilities, { resolve: resolve, reject: reject }),
                            (this._ws = new gApi.WebSocketClient()),
                            this._ws.connect("/payload"),
                            this._ws.on("payload", async (message) => {
                                try {
                                    const { data } = message;
                                    (await this._tryCheckLicense(),
                                        await this._tryFireEvent(data),
                                        (data.licenseHasBeenUpgraded = this._shouldFireUserCompletedPurchaseEvent(data)),
                                        resolve(data));
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
                    await licenseManager.checkLicense();
                } catch (error) {
                    console.error("GLicenseManager.checkLicense", error);
                }
            }
            async _tryFireEvent(data) {
                try {
                    this._shouldFireUserCompletedPurchaseEvent(data) && gtmHelper.fireEvent(gtmHelper.Events.USER_COMPLETED_PURCHASE_EVENT);
                } catch (error) {
                    console.error("GTMHelper.fireEvent", error);
                }
            }
            _shouldFireUserCompletedPurchaseEvent(data) {
                const { statusId } = data;
                return !(!IS_TRUNK || statusId !== PurchaseStatus.SuccessfulTestOrder) || statusId === PurchaseStatus.Paid;
            }
        }
        module.exports = PurchaseManager;
    };
