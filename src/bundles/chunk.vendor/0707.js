module.exports = function (module, exports, require) {
            "use strict";
            (require(19), require(30 /* polyfill:Object */), require(57), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(26));
            const jQuery = require(171),
                dateUtil = require(373),
                delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
                GOfferDialogV1 = require(526),
                PaywallPanelView = require(976),
                campaigns = require(354),
                i18n = require(170);
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
                constructor(options) {
                    let campaignOverride,
                        { type: type = "reminder", impl, gApi, now, campaign } = options;
                    this._impl = impl;
                    const getCampaign = () => campaign || campaignOverride || campaigns.StoreCampaign.TrialSeries;
                    (i18n.setLanguage(this._impl.getLanguage()),
                        gApi.setLanguage(this._impl.getLanguage()),
                        (this._htmlElement = jQuery("<div></div>").addClass("g-cloud-ui g-cloud-ui-paywall-dialog g-dialog")),
                        (this._dialog = jQuery("<div></div>")
                            .addClass("g-cloud-ui-paywall-dialog-content g-dialog-content g-cloud-ui-loading")
                            .appendTo(this._htmlElement)));
                    const pageId = "paywall/".concat(type);
                    let title, content;
                    "subscribe" === type &&
                        ((title = [
                            i18n.getValue("GPaywallDialog", "text.offerdialog-v1-subscribe-title-1"),
                            i18n.getValue("GPaywallDialog", "text.offerdialog-v1-subscribe-title-2"),
                        ]),
                        (content = GOfferDialogV1.DEFAULT_CONTENT),
                        (campaignOverride = campaigns.Campaign.UpgradeIntermintent));
                    let contentView = new PaywallPanelView({
                        campaign: getCampaign(),
                        page: pageId,
                        title: title,
                        content: content,
                        cmd: {
                            close: this.close.bind(this),
                        },
                    })
                        .getHTMLElement()
                        .appendTo(this._dialog);
                    ((now = now || dateUtil.now()),
                        Promise.all([this._impl.getLicense()])
                            .then((results) => {
                                let [license] = results;
                                this._dialog.removeClass("g-cloud-ui-loading");
                                let displayTitle = title,
                                    displayContent = content;
                                if ("subscribe" !== type) {
                                    let daysRemaining = dateUtil.millisecondsToDays(dateUtil.diff(now, new Date(license.expire)));
                                    if (
                                        ((displayTitle = i18n
                                            .getValue("GPaywallDialog", 1 === daysRemaining ? "text.remaining-day" : "text.remaining-days")
                                            .replace("%days", daysRemaining)
                                            .replace("%day", daysRemaining)),
                                        daysRemaining >= 0)
                                    )
                                        (0 === daysRemaining && (displayTitle = i18n.getValue("GPaywallDialog", "text.expires-today")),
                                            (displayContent = i18n.getValue("GPaywallDialog", "text.access-message1")),
                                            (campaignOverride = campaigns.StoreCampaign.TrialSeries));
                                    else {
                                        displayTitle = i18n.getValue("GPaywallDialog", "text.pretrial-title");
                                        const messageVariants = [
                                                () => {
                                                    displayContent = i18n.getValue("GPaywallDialog", "text.trial-message1");
                                                },
                                                () => {
                                                    displayContent = i18n.getValue("GPaywallDialog", "text.trial-message2");
                                                },
                                                () => {
                                                    displayContent = Object.assign({}, GOfferDialogV1.DEFAULT_CONTENT, {
                                                        title: i18n.getValue("GPaywallDialog", "text.pretrial-subtitle"),
                                                    });
                                                },
                                            ],
                                            daysSinceCreation = dateUtil.millisecondsToDays(dateUtil.diff(new Date(license.created), now)),
                                            variantIndex = parseInt(((daysSinceCreation - 1) / 15) % messageVariants.length) || 0;
                                        messageVariants[Math.max(variantIndex, 0)].call(this);
                                    }
                                }
                                contentView.replaceWith(
                                    new PaywallPanelView({
                                        page: pageId,
                                        title: displayTitle,
                                        content: displayContent,
                                        campaign: getCampaign(),
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
                    jQuery(".g-cloud-ui-paywall-dialog").length ||
                        (this._impl.open({
                            dialog: this,
                        }),
                        await delay(100),
                        this._htmlElement.addClass("slide-up"));
                }
                async close() {
                    let { licenseHasBeenUpgraded: licenseHasBeenUpgraded = false } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (this._htmlElement.removeClass("slide-up"),
                        await delay(1e3),
                        this._impl.close({
                            dialog: this,
                            licenseHasBeenUpgraded: licenseHasBeenUpgraded,
                        }));
                }
                toString() {
                    return "[Object GPaywallDialog]";
                }
            };
        };
