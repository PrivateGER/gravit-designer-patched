module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const { PasswordlessAuthenticationActions: o, gApi: i } = require(10 /* designerConfig */),
            GSystemDialog = require(44),
            GProfileDialog = require(604),
            s = require(337),
            { GLocale: l, GLocaleKey: c } = require(1 /* GObject */);
        module.exports = class {
            async execute() {
                let { [o.SetPassword]: e } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                try {
                    (await i.passwordlessAuthentication.authenticateWithSetPasswordToken(e), await s.checkLicense());
                    const t = await gDesigner.getUser();
                    t &&
                        gDesigner.executeWhenReady(() => {
                            new GProfileDialog(t, GProfileDialog.Tabs.ChangePassword, {
                                token: e,
                                tabs: [GProfileDialog.Tabs.ChangePassword],
                                closeable: false,
                                changePasswordOptions: {
                                    autoClose: true,
                                    title: l.get(new c("GChangePasswordPanel", "text.set-password")),
                                    info: l.get(new c("GChangePasswordPanel", "text.set-password-info")),
                                },
                            }).open();
                        });
                } catch (e) {
                    gDesigner.executeWhenReady(() => {
                        GSystemDialog.error(e);
                    });
                }
            }
        };
    };
