module.exports = function (module, exports, require) {
            "use strict";
            (require(19), require(30), require(57), require(8 /* Symbol */), require(20), require(34), require(26));
            const n = require(171),
                r = require(373),
                o = (e) => new Promise((t) => setTimeout(t, e)),
                GOfferDialogV1 = require(526),
                s = require(976),
                l = require(354),
                h = require(170);
            module.exports = class {
                static get __i18n__() {
                    return "GPaywallDialog";
                }
                static get Impl() {
                    return class {
                        open() {
                            throw new Error("Not implemented");
                        }
                        close() {
                            throw new Error("Not implemented");
                        }
                        openPurchaseFlow() {
                            throw new Error("Not implemented");
                        }
                        openExternalLink() {
                            throw new Error("Not implemented");
                        }
                        getProduct() {
                            throw new Error("Not implemented");
                        }
                        getLicense() {
                            throw new Error("Not implemented");
                        }
                        getUser() {
                            throw new Error("Not implemented");
                        }
                        getLanguage() {
                            throw new Error("Not implemented");
                        }
                    };
                }
                constructor(e) {
                    let t,
                        { type: i = "reminder", impl, gApi, now, campaign } = e;
                    this._impl = impl;
                    const u = () => campaign || t || l.StoreCampaign.TrialSeries;
                    (h.setLanguage(this._impl.getLanguage()),
                        gApi.setLanguage(this._impl.getLanguage()),
                        (this._htmlElement = n("<div></div>").addClass("g-cloud-ui g-cloud-ui-paywall-dialog g-dialog")),
                        (this._dialog = n("<div></div>")
                            .addClass("g-cloud-ui-paywall-dialog-content g-dialog-content g-cloud-ui-loading")
                            .appendTo(this._htmlElement)));
                    const d = "paywall/".concat(i);
                    let g, f;
                    "subscribe" === i &&
                        ((g = [
                            h.getValue("GPaywallDialog", "text.offerdialog-v1-subscribe-title-1"),
                            h.getValue("GPaywallDialog", "text.offerdialog-v1-subscribe-title-2"),
                        ]),
                        (f = GOfferDialogV1.DEFAULT_CONTENT),
                        (t = l.Campaign.UpgradeIntermintent));
                    let m = new s({
                        campaign: u(),
                        page: d,
                        title: g,
                        content: f,
                        cmd: {
                            close: this.close.bind(this),
                        },
                    })
                        .getHTMLElement()
                        .appendTo(this._dialog);
                    ((now = now || r.now()),
                        Promise.all([this._impl.getLicense()])
                            .then((e) => {
                                let [n] = e;
                                this._dialog.removeClass("g-cloud-ui-loading");
                                let o = g,
                                    A = f;
                                if ("subscribe" !== i) {
                                    let e = r.millisecondsToDays(r.diff(now, new Date(n.expire)));
                                    if (
                                        ((o = h
                                            .getValue("GPaywallDialog", 1 === e ? "text.remaining-day" : "text.remaining-days")
                                            .replace("%days", e)
                                            .replace("%day", e)),
                                        e >= 0)
                                    )
                                        (0 === e && (o = h.getValue("GPaywallDialog", "text.expires-today")),
                                            (A = h.getValue("GPaywallDialog", "text.access-message1")),
                                            (t = l.StoreCampaign.TrialSeries));
                                    else {
                                        o = h.getValue("GPaywallDialog", "text.pretrial-title");
                                        const e = [
                                                () => {
                                                    A = h.getValue("GPaywallDialog", "text.trial-message1");
                                                },
                                                () => {
                                                    A = h.getValue("GPaywallDialog", "text.trial-message2");
                                                },
                                                () => {
                                                    A = Object.assign({}, GOfferDialogV1.DEFAULT_CONTENT, {
                                                        title: h.getValue("GPaywallDialog", "text.pretrial-subtitle"),
                                                    });
                                                },
                                            ],
                                            t = r.millisecondsToDays(r.diff(new Date(n.created), now)),
                                            i = parseInt(((t - 1) / 15) % e.length) || 0;
                                        e[Math.max(i, 0)].call(this);
                                    }
                                }
                                m.replaceWith(
                                    new s({
                                        page: d,
                                        title: o,
                                        content: A,
                                        campaign: u(),
                                        cmd: {
                                            openPurchaseFlow: () => {
                                                (this._impl.openPurchaseFlow({
                                                    dialog: this,
                                                }),
                                                    this.close());
                                            },
                                            close: this.close.bind(this),
                                        },
                                    }).getHTMLElement()
                                );
                            })
                            .catch(() => this._dialog.removeClass("g-cloud-ui-loading")));
                }
                getHTMLElement() {
                    return this._htmlElement;
                }
                async open() {
                    n(".g-cloud-ui-paywall-dialog").length ||
                        (this._impl.open({
                            dialog: this,
                        }),
                        await o(100),
                        this._htmlElement.addClass("slide-up"));
                }
                async close() {
                    let { licenseHasBeenUpgraded: e = false } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (this._htmlElement.removeClass("slide-up"),
                        await o(1e3),
                        this._impl.close({
                            dialog: this,
                            licenseHasBeenUpgraded: e,
                        }));
                }
                toString() {
                    return "[Object GPaywallDialog]";
                }
            };
        };
