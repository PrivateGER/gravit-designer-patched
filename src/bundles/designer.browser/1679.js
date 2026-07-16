module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(30 /* polyfill:Object */), require(8 /* Symbol */), require(196 /* polyfill:Promise */));
        var i = _interopRequireDefault(require(1249)),
            a = _interopRequireDefault(require(1155)),
            GObject = require(1);
        const { gApi, IN_APP_PURCHASE: { CLEVERBRIDGE: { openCartInAPopup: l = false } = {} } = {} } = require(10 /* designerConfig */),
            c = require(808),
            d = require(292),
            GProfileDialog = require(604),
            GOfflineDialog = require(256),
            GPaymentDialog = require(1680),
            h = require(1681),
            f = require(1190);
        module.exports = class extends f {
            getOptions() {
                return this._paymentFlow ? this._paymentFlow.getOptions() : null;
            }
            async purchase(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return (
                    gDesigner.toggleLoading(true),
                    this._purchase(e, t).finally(() => {
                        gDesigner.toggleLoading(false);
                    })
                );
            }
            _purchase(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return $(".g-payment-dialog").length
                    ? Promise.reject(false)
                    : new Promise(async (n, o) => {
                          try {
                              (this._paymentFlow && this._paymentFlow.abort(), (this._paymentFlow = new i.default(t)));
                              const l = async () => {
                                  const { immediatePurchase: i = false, paymentCallback: l = () => {}, autoClose: p = false } = t,
                                      g = await gDesigner.getUser();
                                  if (!e) {
                                      if (!g)
                                          return (
                                              this._paymentFlow.step(
                                                  new a.default()
                                                      .listen(d)
                                                      .when((e) => !!e && !!e.user)
                                                      .do(() => {
                                                          gDesigner.openPaymentDialog(e, t);
                                                      })
                                              ),
                                              void n()
                                          );
                                      {
                                          const n = gDesigner.now().getTime();
                                          e = await gApi.getProduct(
                                              Object.assign(
                                                  {
                                                      time: n,
                                                      language: GObject.GLocale.getLocaleLanguageTag().slice(0, 2),
                                                  },
                                                  t
                                              )
                                          );
                                      }
                                  }
                                  if (!e) return void o(new Error("Product is missing"));
                                  const { reinstate: h = false } = e;
                                  if (h)
                                      return (
                                          this._paymentFlow.step(
                                              gDesigner.executeWhenReady(() => {
                                                  new GProfileDialog(this._user, "purchase").open();
                                              })
                                          ),
                                          void n({ reinstate: true })
                                      );
                                  (this._paymentFlow.step(
                                      new a.default()
                                          .listen(c)
                                          .when(() => gDesigner.isInitialized())
                                          .do(async () => {
                                              try {
                                                  const t = await this._openCart(e, i, p);
                                                  l(t);
                                              } catch (e) {
                                                  l({});
                                              }
                                          }, i)
                                  ),
                                      n());
                              };
                              gDesigner.isOffline() ? (GOfflineDialog.openRetryConnection(l), gDesigner.toggleLoading(false)) : await l();
                          } catch (e) {
                              o(e);
                          }
                      }).then(
                          (e) => (
                              (e && e.reinstate) || ("undefined" != typeof dataLayer && dataLayer.push({ event: "USER_CART_VIEW_EVENT" })),
                              e
                          )
                      );
            }
            _openCart(e, t, n) {
                return l && !t ? this._openCartPopup(e) : this._openCartDialog(e, n);
            }
            _openCartPopup(e) {
                return new h().open(e.url);
            }
            _openCartDialog(e, t) {
                return new GPaymentDialog().open(e.url, t);
            }
        };
    };
