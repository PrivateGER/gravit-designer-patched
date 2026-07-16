module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var GObject = require(1);
        const i = require(1327),
            a = require(1577);
        class r {
            static openOfferReminder(e) {
                return r._openPaywall("reminder", e);
            }
            static openSubscriptionOffer(e) {
                return r._openPaywall("subscribe", e);
            }
            static async _openPaywall() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "reminder",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const n = await this._getProduct(),
                    r = this._getLayout(),
                    s = gDesigner.getApplicationManager().isInAppPurchaseAvailable();
                return (await i.newBuilder(a))
                    .setId("paywall-cross-frame")
                    .setEndpoint("/pro/paywall/".concat(e))
                    .setTime(gDesigner.now())
                    .setLanguage(GObject.GLocale.getLanguage())
                    .setCampaign(t.campaign)
                    .setShareFile(t.shareFile)
                    .setDashboard(t.dashboard)
                    .setProduct(n)
                    .setInAppPurchasesAvailable(s)
                    .setLayout(r)
                    .build()
                    .open();
            }
            static _getProduct() {
                return gInAppPurchase.getProduct().catch(() => null);
            }
            static _getLayout() {
                return a.DEFAULT_LAYOUT;
            }
        }
        module.exports = r;
    };
