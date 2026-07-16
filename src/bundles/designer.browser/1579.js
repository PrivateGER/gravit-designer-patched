module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(30), require(8 /* Symbol */));
        var designerConfig = require(10),
            GObject = require(1),
            r = o(require(1187));
        class s extends designerConfig.GReminderDialog.Impl {
            open(e) {
                let { dialog: t } = e;
                this._dialog = t.getHTMLElement().gDialog({ releaseOnClose: true, nowrap: true }).gDialog("open");
            }
            async openPurchaseFlow(e) {
                let { dialog: t, options: n = {} } = e;
                await gDesigner.openPaymentDialog(null, n).catch(() => null);
            }
            openExternalLink(e) {
                let { link: t } = e;
                gContainer.openExternalLink(null, t);
            }
            close() {
                this._dialog.gDialog("close");
            }
            getProduct() {
                return Promise.resolve({
                    price: -1,
                    listPrice: -1,
                    locale: navigator.language,
                    currency: "USD",
                });
            }
            getLicense() {
                let e = gDesigner.getLicense();
                return Promise.resolve({
                    license: e._license,
                    expire: e._expire,
                    created: e._created,
                    legacy: e._legacy,
                });
            }
            getLanguage() {
                return GObject.GLocale.getLanguage();
            }
        }
        class l extends r.default {
            constructor(e) {
                (super(), (this._dialogOptions = e));
            }
            async open() {
                const e = new s(),
                    t = Object.assign(this._dialogOptions, { impl: e });
                switch (this._dialogOptions.endpoint) {
                    case "/pro/reminder/proexpiresoon":
                        (await designerConfig.GReminderDialogFactory.newProExpireSoon(t)).open();
                        break;
                    case "/pro/reminder/proexpired":
                        (await designerConfig.GReminderDialogFactory.newProExpired(t)).open();
                        break;
                    case "/pro/reminder/trialexpired":
                        (await designerConfig.GReminderDialogFactory.newTrialExpired(t)).open();
                        break;
                    case "/pro/reminder/trialmessage":
                        (await designerConfig.GReminderDialogFactory.newTrialMessage(t)).open();
                        break;
                    case "/pro/reminder/upgrade":
                        (await designerConfig.GReminderDialogFactory.newUpgradeScreen(t)).open();
                }
            }
        }
        module.exports = l;
    };
