module.exports = function (module, exports, require) {
            "use strict";
            (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34));
            const GReminderDialog = require(706),
                GCloudUiPaywallDialog = require(707),
                gApi = require(417 /* gApi */).self(),
                Campaigns = require(354),
                Locale = require(170),
                { TRIAL_MESSAGE_WEB_CONTENT_URL_TEMPLATE, UPGRADE_SCREEN_WEB_CONTENT_URL_TEMPLATE } = require(374 /* SUPPORT_URL */),
                { DateAPI } = require(209 /* GLocale */);
            module.exports = class {
                constructor() {
                    throw new Error("No instance");
                }
                static async newProExpireSoon(options) {
                    let { impl, now } = options;
                    return new GCloudUiPaywallDialog({
                        type: "reminder/accessending",
                        impl: impl,
                        gApi: gApi,
                        now: now,
                        campaign: Campaigns.StoreCampaign.TrialSeries,
                    });
                }
                static newProExpired(options) {
                    let { impl: impl, now: now } = options;
                    return (
                        Locale.setLanguage(impl.getLanguage()),
                        new GReminderDialog({
                            page: "reminder/proexpired",
                            title: Locale.getValue("GReminderDialog", "text.subscription-expired"),
                            dismiss: false,
                            impl: impl,
                            closeable: true,
                            campaign: Campaigns.StoreCampaign.TrialSeries,
                        })
                    );
                }
                static newTrialExpired(options) {
                    let { impl: impl, now: now } = options;
                    return (
                        Locale.setLanguage(impl.getLanguage()),
                        new GReminderDialog({
                            page: "reminder/trialexpired",
                            title: Locale.getValue("GReminderDialog", "text.upgrade-screen"),
                            closeable: true,
                            dismiss: false,
                            campaign: Campaigns.StoreCampaign.TrialSeries,
                            impl: impl,
                        })
                    );
                }
                static async newTrialMessage(options) {
                    let { impl: impl, now: now } = options;
                    Locale.setLanguage(impl.getLanguage());
                    const license = await impl.getLicense().catch((e) => null),
                        title = this._getNewTrialMessageTitle(license, now);
                    return new GReminderDialog({
                        impl: impl,
                        page: "reminder/trialmessage",
                        title: title,
                        closeable: true,
                        withFooter: false,
                        dismiss: false,
                        content: {
                            type: GReminderDialog.ContentType.Web,
                            data: TRIAL_MESSAGE_WEB_CONTENT_URL_TEMPLATE.replace("%lang", Locale.getLocaleTagISO6391()),
                        },
                    });
                }
                static newUpgradeScreen(options) {
                    let { impl: impl, now: now } = options;
                    return (
                        Locale.setLanguage(impl.getLanguage()),
                        new GReminderDialog({
                            page: "reminder/upgrade",
                            title: Locale.getValue("GReminderDialog", "text.upgrade-screen"),
                            closeable: true,
                            dismiss: false,
                            withFooter: false,
                            content: {
                                type: GReminderDialog.ContentType.Web,
                                data: UPGRADE_SCREEN_WEB_CONTENT_URL_TEMPLATE.replace("%lang", Locale.getLocaleTagISO6391()),
                            },
                            impl: impl,
                        })
                    );
                }
                static _getNewTrialMessageTitle(license) {
                    let now = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date();
                    const daysRemaining = license && license.expire && DateAPI.millisecondsToDays(DateAPI.diff(new Date(license.expire), now));
                    return 0 === daysRemaining
                        ? Locale.getValue("GReminderDialogFactory", "text.expires-today")
                        : daysRemaining >= 1
                          ? Locale.getValue("GReminderDialogFactory", 1 === daysRemaining ? "text.remaining-day" : "text.remaining-days").replace("%days", daysRemaining)
                          : Locale.getValue("GReminderDialog", "text.upgrade-screen");
                }
            };
        };
