module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(4), require(13));
        const o = require(1190),
            i = require(292),
            a = require(291),
            {
                gApi,
                MicrosoftB2BKeyType,
                PaymentProviders,
                DateAPI,
                IN_APP_PURCHASE: { WINDOWS: { production, trunk, rc, beta, lts } = {} } = {},
            } = require(10 /* designerConfig */),
            { IS_PRODUCTION, IS_LTS, IS_RC, IS_BETA } = require(231 /* IS_TRUNK */),
            {
                ERROR_CODES: { ERR_MICROSOFT_STORE_SERVICES_B2B_KEY_NOT_FOUND },
            } = gApi;
        module.exports = class extends o {
            constructor() {
                if ((super(), !window.napi)) return;
                const { remote } = require(881),
                    t = remote.getCurrentWindow().getNativeWindowHandle();
                ((this._store = new window.napi.windowsStore.StoreContext()),
                    this._store.initialize(t),
                    gDesigner.addEventListener(i, this._userLoggedEvent, this),
                    gDesigner.addEventListener(a, this._networkAvailabilityChangedEvent, this),
                    (this._intervalId = setInterval(() => this.syncLicense(), DateAPI.daysToMilliseconds(1))));
            }
            async purchase(e, t) {
                try {
                    if ((gDesigner.toggleLoading(true), e || (e = await this.getProduct()), !e)) return;
                } finally {
                    gDesigner.toggleLoading(false);
                }
                return new Promise((t, n) => {
                    const o = setTimeout(() => {
                        n();
                    }, DateAPI.minutesToMilliseconds(3));
                    this._store.requestPurchaseAsync(e.productId, (e, i) => {
                        (clearTimeout(o),
                            e
                                ? n(e)
                                : (gDesigner.toggleLoading(true),
                                  this.syncLicense()
                                      .then(t)
                                      .catch(n)
                                      .finally(() => {
                                          gDesigner.toggleLoading(false);
                                      })));
                    });
                });
            }
            async getProduct() {
                return new Promise((e, t) => {
                    this._store.getAssociatedStoreProductsAsync(["Durable"], (n, o) => {
                        if (n) return t(n);
                        if (!o) return t();
                        const i = this._getInAppOfferToken();
                        if (!i) return t();
                        const a = Object.values(o).find((e) => e.inAppOfferToken === i);
                        if (!a) return t();
                        e({
                            provider: PaymentProviders.WindowsStore,
                            formattedPrice: a.price.formattedRecurrencePrice,
                            currency: a.price.currencyCode,
                            productId: a.storeId,
                        });
                    });
                });
            }
            async syncLicense() {
                const e = await gDesigner.getUser();
                if (e)
                    return gApi.microsoftStoreServices
                        .syncLicense()
                        .then(() => gDesigner.requestLicenseUpdate())
                        .catch(async (t) => {
                            if (t.cloud && t.code === ERR_MICROSOFT_STORE_SERVICES_B2B_KEY_NOT_FOUND) {
                                const t = await gApi.microsoftStoreServices.getAccessToken(),
                                    n = await this._createB2BKeyForPurchaseAPI(e, t),
                                    o = await this._createB2BKeyForCollectionsAPI(e, t);
                                return (
                                    await gApi.microsoftStoreServices.updateB2BKeys({
                                        accessToken: t,
                                        keys: { [MicrosoftB2BKeyType.Purchase]: n, [MicrosoftB2BKeyType.Collections]: o },
                                    }),
                                    gApi.microsoftStoreServices.syncLicense().then(() => gDesigner.requestLicenseUpdate())
                                );
                            }
                            throw t;
                        });
            }
            _getInAppOfferToken() {
                return IS_PRODUCTION ? production : IS_BETA ? beta : IS_LTS ? lts : IS_RC ? rc : trunk;
            }
            _createB2BKeyForPurchaseAPI(e, t) {
                return new Promise(async (n, o) => {
                    this._store.getCustomerPurchaseIdAsync(t, e.getUID(), (e, t) => {
                        e ? o(e) : n(t);
                    });
                });
            }
            _createB2BKeyForCollectionsAPI(e, t) {
                return new Promise(async (n, o) => {
                    this._store.getCustomerCollectionsIdAsync(t, e.getUID(), (e, t) => {
                        e ? o(e) : n(t);
                    });
                });
            }
            _userLoggedEvent(e) {
                this.syncLicense();
            }
            _networkAvailabilityChangedEvent(e) {
                e.connected && this.syncLicense();
            }
        };
    };
