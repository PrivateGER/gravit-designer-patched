module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(30 /* polyfill:Object */), require(8 /* Symbol */));
        var designerConfig = require(10),
            GObject = require(1),
            DialogBase = _interopRequireDefault(require(1187));
        class ReminderDialogImpl extends designerConfig.GReminderDialog.Impl {
            open(options) {
                let { dialog } = options;
                this._dialog = dialog.getHTMLElement().gDialog({ releaseOnClose: true, nowrap: true }).gDialog("open");
            }
            async openPurchaseFlow(openEvent) {
                let { dialog: dialog, options: purchaseOptions = {} } = openEvent;
                await gDesigner.openPaymentDialog(null, purchaseOptions).catch(() => null);
            }
            openExternalLink(options) {
                let { link } = options;
                gContainer.openExternalLink(null, link);
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
                let license = gDesigner.getLicense();
                return Promise.resolve({
                    license: license._license,
                    expire: license._expire,
                    created: license._created,
                    legacy: license._legacy,
                });
            }
            getLanguage() {
                return GObject.GLocale.getLanguage();
            }
        }
        class ReminderDialog extends DialogBase.default {
            constructor(dialogOptions) {
                (super(), (this._dialogOptions = dialogOptions));
            }
            async open() {
                const impl = new ReminderDialogImpl(),
                    dialogOptions = Object.assign(this._dialogOptions, { impl: impl });
                switch (this._dialogOptions.endpoint) {
                    case "/pro/reminder/proexpiresoon":
                        (await designerConfig.GReminderDialogFactory.newProExpireSoon(dialogOptions)).open();
                        break;
                    case "/pro/reminder/proexpired":
                        (await designerConfig.GReminderDialogFactory.newProExpired(dialogOptions)).open();
                        break;
                    case "/pro/reminder/trialexpired":
                        (await designerConfig.GReminderDialogFactory.newTrialExpired(dialogOptions)).open();
                        break;
                    case "/pro/reminder/trialmessage":
                        (await designerConfig.GReminderDialogFactory.newTrialMessage(dialogOptions)).open();
                        break;
                    case "/pro/reminder/upgrade":
                        (await designerConfig.GReminderDialogFactory.newUpgradeScreen(dialogOptions)).open();
                }
            }
        }
        module.exports = ReminderDialog;
    };
