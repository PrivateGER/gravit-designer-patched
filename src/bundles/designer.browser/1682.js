module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(4), require(13));
        const PaymentProvider = require(1190),
            UserLoggedEvent = require(292),
            NetworkAvailabilityChangedEvent = require(291),
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
        module.exports = class extends PaymentProvider {
            constructor() {
                if ((super(), !window.napi)) return;
                const { remote } = require(881),
                    windowHandle = remote.getCurrentWindow().getNativeWindowHandle();
                ((this._store = new window.napi.windowsStore.StoreContext()),
                    this._store.initialize(windowHandle),
                    gDesigner.addEventListener(UserLoggedEvent, this._userLoggedEvent, this),
                    gDesigner.addEventListener(NetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this),
                    (this._intervalId = setInterval(() => this.syncLicense(), DateAPI.daysToMilliseconds(1))));
            }
            async purchase(product, t) {
                try {
                    if ((gDesigner.toggleLoading(true), product || (product = await this.getProduct()), !product)) return;
                } finally {
                    gDesigner.toggleLoading(false);
                }
                return new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => {
                        reject();
                    }, DateAPI.minutesToMilliseconds(3));
                    this._store.requestPurchaseAsync(product.productId, (error, i) => {
                        (clearTimeout(timeoutId),
                            error
                                ? reject(error)
                                : (gDesigner.toggleLoading(true),
                                  this.syncLicense()
                                      .then(resolve)
                                      .catch(reject)
                                      .finally(() => {
                                          gDesigner.toggleLoading(false);
                                      })));
                    });
                });
            }
            async getProduct() {
                return new Promise((resolve, reject) => {
                    this._store.getAssociatedStoreProductsAsync(["Durable"], (error, products) => {
                        if (error) return reject(error);
                        if (!products) return reject();
                        const offerToken = this._getInAppOfferToken();
                        if (!offerToken) return reject();
                        const matchedProduct = Object.values(products).find((candidate) => candidate.inAppOfferToken === offerToken);
                        if (!matchedProduct) return reject();
                        resolve({
                            provider: PaymentProviders.WindowsStore,
                            formattedPrice: matchedProduct.price.formattedRecurrencePrice,
                            currency: matchedProduct.price.currencyCode,
                            productId: matchedProduct.storeId,
                        });
                    });
                });
            }
            async syncLicense() {
                const user = await gDesigner.getUser();
                if (user)
                    return gApi.microsoftStoreServices
                        .syncLicense()
                        .then(() => gDesigner.requestLicenseUpdate())
                        .catch(async (error) => {
                            if (error.cloud && error.code === ERR_MICROSOFT_STORE_SERVICES_B2B_KEY_NOT_FOUND) {
                                const accessToken = await gApi.microsoftStoreServices.getAccessToken(),
                                    purchaseKey = await this._createB2BKeyForPurchaseAPI(user, accessToken),
                                    collectionsKey = await this._createB2BKeyForCollectionsAPI(user, accessToken);
                                return (
                                    await gApi.microsoftStoreServices.updateB2BKeys({
                                        accessToken: accessToken,
                                        keys: { [MicrosoftB2BKeyType.Purchase]: purchaseKey, [MicrosoftB2BKeyType.Collections]: collectionsKey },
                                    }),
                                    gApi.microsoftStoreServices.syncLicense().then(() => gDesigner.requestLicenseUpdate())
                                );
                            }
                            throw error;
                        });
            }
            _getInAppOfferToken() {
                return IS_PRODUCTION ? production : IS_BETA ? beta : IS_LTS ? lts : IS_RC ? rc : trunk;
            }
            _createB2BKeyForPurchaseAPI(user, accessToken) {
                return new Promise(async (resolve, reject) => {
                    this._store.getCustomerPurchaseIdAsync(accessToken, user.getUID(), (error, key) => {
                        error ? reject(error) : resolve(key);
                    });
                });
            }
            _createB2BKeyForCollectionsAPI(user, accessToken) {
                return new Promise(async (resolve, reject) => {
                    this._store.getCustomerCollectionsIdAsync(accessToken, user.getUID(), (error, key) => {
                        error ? reject(error) : resolve(key);
                    });
                });
            }
            _userLoggedEvent(event) {
                this.syncLicense();
            }
            _networkAvailabilityChangedEvent(event) {
                event.connected && this.syncLicense();
            }
        };
    };
