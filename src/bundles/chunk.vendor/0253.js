module.exports = function (module, exports, require) {
            "use strict";
            (require(19), require(8 /* Symbol */), require(20), require(107), require(3), require(26), require(114));
            const { DateAPI: n } = require(209 /* GLocale */),
                GShareRoles = require(287);
            module.exports = {
                sinceVersion: "3.4.5",
                sinceDate: new Date(2018, 8, 15),
                providers: {
                    cb: {
                        getPrice() {
                            let {
                                productId: e = 220444,
                                coupon: t,
                                currency: i,
                                country: n,
                            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            const r = /trunk|bleed|^localhost$/.test(location.hostname)
                                    ? "https://gravit.plasmatrap.com"
                                    : "https://gravit.plasmatrap.com",
                                o = new URLSearchParams("?client_id=1577");
                            return e
                                ? (o.set("product_id", e),
                                  t && o.set("coupon", t),
                                  i && o.set("currency", i),
                                  n && o.set("country", n),
                                  o.set("price_rule", e),
                                  fetch("".concat(r, "/pricesystem/cb?").concat(o.toString()))
                                      .then((e) => (e.ok ? e.json() : Promise.reject()))
                                      .then((e) => {
                                          const {
                                              price: {
                                                  gross: { value: t },
                                              },
                                              list_price: { gross: { value: i } = {} } = {},
                                              currency: { iso: n },
                                              locale: r,
                                          } = e.pop();
                                          return {
                                              price: t,
                                              listPrice: i,
                                              currency: n,
                                              locale: r,
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
                        offlineExpirationTime: n.daysToMilliseconds(15),
                        offlineCountdown: n.daysToMilliseconds(7),
                    },
                    reminders: {
                        offlineWarning: n.daysToMilliseconds(1),
                        proOfferInFree: n.daysToMilliseconds(15),
                        proOfferInTrial: n.daysToMilliseconds(5),
                        proOfferInTrialExpired: n.daysToMilliseconds(15),
                        proOfferInTrialExpireSoon: n.daysToMilliseconds(1),
                        proOfferInTrialLastWarning: n.daysToMilliseconds(0),
                        proOfferSpecialPrice: n.daysToMilliseconds(0),
                        proExpireSoon: n.daysToMilliseconds(30),
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
