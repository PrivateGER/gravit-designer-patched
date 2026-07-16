module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(30), require(8 /* Symbol */));
        var designerConfig = require(10),
            GObject = require(1),
            r = o(require(1187));
        function s() {}
        (GObject.GObject.inherit(s, designerConfig.GPaywallDialog.Impl),
            (s.prototype.open = function (e) {
                let { dialog } = e;
                this._dialog = dialog.getHTMLElement().gDialog({ releaseOnClose: true, nowrap: true }).gDialog("open");
            }),
            (s.prototype.close = function () {
                let { licenseHasBeenUpgraded: e = false } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (this._dialog.closest(".g-dialog-container").remove(), e && gDesigner.requestLicenseUpdate());
            }),
            (s.prototype.openPurchaseFlow = async function (e) {
                let { dialog: t, options: n = {} } = e;
                (await gDesigner.openPaymentDialog(null, n).catch(() => null), t.close());
            }),
            (s.prototype.openExternalLink = function (e) {
                let { link } = e;
                gContainer.openExternalLink(null, link);
            }),
            (s.prototype.getProduct = function () {
                return Promise.resolve({
                    price: -1,
                    listPrice: -1,
                    locale: navigator.language,
                    currency: "USD",
                });
            }),
            (s.prototype.getLicense = function () {
                let e = gDesigner.getLicense();
                return Promise.resolve({
                    license: e.getLicenseType(),
                    expire: e.getExpirationDate(),
                    created: e.getCreationDate(),
                    legacy: e.isLegacy(),
                });
            }),
            (s.prototype.getUser = function () {
                return gDesigner.getSyncUser();
            }),
            (s.prototype.getLanguage = function () {
                return GObject.GLocale.getLanguage();
            }));
        class l extends r.default {
            constructor(e) {
                (super(), (this._dialogOptions = e));
            }
            async open() {
                new designerConfig.GPaywallDialog(Object.assign(this._dialogOptions, { impl: new s(), gApi: designerConfig.gApi })).open();
            }
        }
        module.exports = l;
    };
