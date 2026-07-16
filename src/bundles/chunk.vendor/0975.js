module.exports = function (module, exports, require) {
            "use strict";
            (require(8 /* Symbol */), require(20), require(34));
            const n = require(706),
                GPaywallDialog = require(707),
                o = require(417 /* gApi */).self(),
                a = require(354),
                s = require(170),
                { TRIAL_MESSAGE_WEB_CONTENT_URL_TEMPLATE: l, UPGRADE_SCREEN_WEB_CONTENT_URL_TEMPLATE: h } = require(374 /* SUPPORT_URL */),
                { DateAPI: A } = require(209 /* GLocale */);
            module.exports = class {
                constructor() {
                    throw new Error("No instance");
                }
                static async newProExpireSoon(e) {
                    let { impl: t, now: i } = e;
                    return new GPaywallDialog({
                        type: "reminder/accessending",
                        impl: t,
                        gApi: o,
                        now: i,
                        campaign: a.StoreCampaign.TrialSeries,
                    });
                }
                static newProExpired(e) {
                    let { impl: t, now: i } = e;
                    return (
                        s.setLanguage(t.getLanguage()),
                        new n({
                            page: "reminder/proexpired",
                            title: s.getValue("GReminderDialog", "text.subscription-expired"),
                            dismiss: false,
                            impl: t,
                            closeable: true,
                            campaign: a.StoreCampaign.TrialSeries,
                        })
                    );
                }
                static newTrialExpired(e) {
                    let { impl: t, now: i } = e;
                    return (
                        s.setLanguage(t.getLanguage()),
                        new n({
                            page: "reminder/trialexpired",
                            title: s.getValue("GReminderDialog", "text.upgrade-screen"),
                            closeable: true,
                            dismiss: false,
                            campaign: a.StoreCampaign.TrialSeries,
                            impl: t,
                        })
                    );
                }
                static async newTrialMessage(e) {
                    let { impl: t, now: i } = e;
                    s.setLanguage(t.getLanguage());
                    const r = await t.getLicense().catch((e) => null),
                        o = this._getNewTrialMessageTitle(r, i);
                    return new n({
                        impl: t,
                        page: "reminder/trialmessage",
                        title: o,
                        closeable: true,
                        withFooter: false,
                        dismiss: false,
                        content: {
                            type: n.ContentType.Web,
                            data: l.replace("%lang", s.getLocaleTagISO6391()),
                        },
                    });
                }
                static newUpgradeScreen(e) {
                    let { impl: t, now: i } = e;
                    return (
                        s.setLanguage(t.getLanguage()),
                        new n({
                            page: "reminder/upgrade",
                            title: s.getValue("GReminderDialog", "text.upgrade-screen"),
                            closeable: true,
                            dismiss: false,
                            withFooter: false,
                            content: {
                                type: n.ContentType.Web,
                                data: h.replace("%lang", s.getLocaleTagISO6391()),
                            },
                            impl: t,
                        })
                    );
                }
                static _getNewTrialMessageTitle(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date();
                    const i = e && e.expire && A.millisecondsToDays(A.diff(new Date(e.expire), t));
                    return 0 === i
                        ? s.getValue("GReminderDialogFactory", "text.expires-today")
                        : i >= 1
                          ? s.getValue("GReminderDialogFactory", 1 === i ? "text.remaining-day" : "text.remaining-days").replace("%days", i)
                          : s.getValue("GReminderDialog", "text.upgrade-screen");
                }
            };
        };
