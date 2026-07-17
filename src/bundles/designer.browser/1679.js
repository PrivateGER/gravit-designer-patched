module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(30 /* polyfill:Object */), require(8 /* Symbol */), require(196 /* polyfill:Promise */));
        var PaymentFlow = _interopRequireDefault(require(1249)),
            EventWaiter = _interopRequireDefault(require(1155)),
            GObject = require(1);
        const { gApi, IN_APP_PURCHASE: { CLEVERBRIDGE: { openCartInAPopup: openCartInAPopup = false } = {} } = {} } = require(10 /* designerConfig */),
            GApplicationStatusEvent = require(808),
            GUserLoggedEvent = require(292),
            GProfileDialog = require(604),
            GOfflineDialog = require(256),
            GPaymentDialog = require(1680),
            CartPopup = require(1681),
            PaymentProvider = require(1190);
        module.exports = class extends PaymentProvider {
            getOptions() {
                return this._paymentFlow ? this._paymentFlow.getOptions() : null;
            }
            async purchase(product) {
                let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return (
                    gDesigner.toggleLoading(true),
                    this._purchase(product, options).finally(() => {
                        gDesigner.toggleLoading(false);
                    })
                );
            }
            _purchase(product) {
                let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return $(".g-payment-dialog").length
                    ? Promise.reject(false)
                    : new Promise(async (resolve, reject) => {
                          try {
                              (this._paymentFlow && this._paymentFlow.abort(), (this._paymentFlow = new PaymentFlow.default(options)));
                              const runPurchaseFlow = async () => {
                                  const { immediatePurchase: immediatePurchase = false, paymentCallback: paymentCallback = () => {}, autoClose: autoClose = false } = options,
                                      currentUser = await gDesigner.getUser();
                                  if (!product) {
                                      if (!currentUser)
                                          return (
                                              this._paymentFlow.step(
                                                  new EventWaiter.default()
                                                      .listen(GUserLoggedEvent)
                                                      .when((event) => !!event && !!event.user)
                                                      .do(() => {
                                                          gDesigner.openPaymentDialog(product, options);
                                                      })
                                              ),
                                              void resolve()
                                          );
                                      {
                                          const timestamp = gDesigner.now().getTime();
                                          product = await gApi.getProduct(
                                              Object.assign(
                                                  {
                                                      time: timestamp,
                                                      language: GObject.GLocale.getLocaleLanguageTag().slice(0, 2),
                                                  },
                                                  options
                                              )
                                          );
                                      }
                                  }
                                  if (!product) return void reject(new Error("Product is missing"));
                                  const { reinstate: reinstate = false } = product;
                                  if (reinstate)
                                      return (
                                          this._paymentFlow.step(
                                              gDesigner.executeWhenReady(() => {
                                                  new GProfileDialog(this._user, "purchase").open();
                                              })
                                          ),
                                          void resolve({ reinstate: true })
                                      );
                                  (this._paymentFlow.step(
                                      new EventWaiter.default()
                                          .listen(GApplicationStatusEvent)
                                          .when(() => gDesigner.isInitialized())
                                          .do(async () => {
                                              try {
                                                  const cartResult = await this._openCart(product, immediatePurchase, autoClose);
                                                  paymentCallback(cartResult);
                                              } catch (e) {
                                                  paymentCallback({});
                                              }
                                          }, immediatePurchase)
                                  ),
                                      resolve());
                              };
                              gDesigner.isOffline() ? (GOfflineDialog.openRetryConnection(runPurchaseFlow), gDesigner.toggleLoading(false)) : await runPurchaseFlow();
                          } catch (error) {
                              reject(error);
                          }
                      }).then(
                          (result) => (
                              (result && result.reinstate) || ("undefined" != typeof dataLayer && dataLayer.push({ event: "USER_CART_VIEW_EVENT" })),
                              result
                          )
                      );
            }
            _openCart(product, immediatePurchase, autoClose) {
                return openCartInAPopup && !immediatePurchase ? this._openCartPopup(product) : this._openCartDialog(product, autoClose);
            }
            _openCartPopup(product) {
                return new CartPopup().open(product.url);
            }
            _openCartDialog(product, autoClose) {
                return new GPaymentDialog().open(product.url, autoClose);
            }
        };
    };
