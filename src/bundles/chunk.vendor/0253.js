module.exports = function (module, exports, require) {
            "use strict";
            (require(19), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(3), require(26), require(114));
            const { DateAPI } = require(209 /* GLocale */),
                GShareRoles = require(287);
            module.exports = {
                sinceVersion: "3.4.5",
                sinceDate: new Date(2018, 8, 15),
                providers: {
                    cb: {
                        getPrice() {
                            let {
                                productId: e = 220444,
                                coupon,
                                currency,
                                country,
                            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            const r = /trunk|bleed|^localhost$/.test(location.hostname)
                                    ? "https://gravit.plasmatrap.com"
                                    : "https://gravit.plasmatrap.com",
                                o = new URLSearchParams("?client_id=1577");
                            return e
                                ? (o.set("product_id", e),
                                  coupon && o.set("coupon", coupon),
                                  currency && o.set("currency", currency),
                                  country && o.set("country", country),
                                  o.set("price_rule", e),
                                  fetch("".concat(r, "/pricesystem/cb?").concat(o.toString()))
                                      .then((e) => (e.ok ? e.json() : Promise.reject()))
                                      .then((e) => {
                                          const {
                                              price: {
                                                  gross: { value },
                                              },
                                              list_price: { gross: { value: i } = {} } = {},
                                              currency: { iso },
                                              locale,
                                          } = e.pop();
                                          return {
                                              price: value,
                                              listPrice: i,
                                              currency: iso,
                                              locale: locale,
                                          };
                                      }))
                                : Promise.reject("Missing productId");
                        },
                    },
                },
                trialDays: 15,
                legacyTrialDays: 30,
                legacyPriceDays: -1,
                legacyUserUntil: new Date(2018, 9, 17),
                newUserSince: new Date(2018, 9, 17),
                minTrialPeriod: 5,
                maxTrialPeriod: 45,
                defaultTrialPeriod: 15,
                publicUserSettings: {
                    trialDays: true,
                    flags: {
                        welcomeMessage: true,
                        windowsStoreAnnouncement: true,
                    },
                    subscription: true,
                },
                defaultLegacyUserSettings: {
                    features: [
                        "offline",
                        "file.export",
                        "file.export.pdf",
                        "file.save-as.pdf",
                        "file.save-as.pdf.300",
                        "swatches",
                        "cmyk",
                        "font.import",
                        "bezigon",
                    ],
                    quotas: {
                        free: 2097152,
                    },
                },
                defaultUserSettings: {
                    trialDays: void 0,
                    quotas: {
                        free: null,
                        pro: null,
                    },
                    subscription: {
                        annual: {
                            productId: null,
                            coupon: null,
                        },
                        extraParameters: {
                            "x-at": null,
                            "x-clickref": null,
                        },
                    },
                    license: {
                        offlineExpirationTime: DateAPI.daysToMilliseconds(15),
                        offlineCountdown: DateAPI.daysToMilliseconds(7),
                    },
                    reminders: {
                        offlineWarning: DateAPI.daysToMilliseconds(1),
                        proOfferInFree: DateAPI.daysToMilliseconds(15),
                        proOfferInTrial: DateAPI.daysToMilliseconds(5),
                        proOfferInTrialExpired: DateAPI.daysToMilliseconds(15),
                        proOfferInTrialExpireSoon: DateAPI.daysToMilliseconds(1),
                        proOfferInTrialLastWarning: DateAPI.daysToMilliseconds(0),
                        proOfferSpecialPrice: DateAPI.daysToMilliseconds(0),
                        proExpireSoon: DateAPI.daysToMilliseconds(30),
                    },
                    flags: {
                        welcomeMessage: false,
                        windowsStoreAnnouncement: false,
                        proOfferSpecialPrice: false,
                        proOfferInTrialExpireSoon: true,
                        proOfferInTrialLastWarning: true,
                    },
                },
                quotas: {
                    free: 524288e3,
                    pro: -1,
                },
                share: {
                    pro: false,
                    defaults: {
                        public: {
                            role: GShareRoles.Viewer,
                        },
                        private: {
                            pro: true,
                            role: GShareRoles.Reviewer,
                        },
                    },
                    quotas: {
                        free: {
                            private: 0,
                            public: -1,
                        },
                        pro: {
                            private: -1,
                            public: -1,
                        },
                    },
                },
                learnmore: true,
                bypassEmailVerification: true,
            };
        };
