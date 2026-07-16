module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const { PasswordlessAuthenticationActions, gApi } = require(10 /* designerConfig */),
            GSystemDialog = require(44),
            GProfileDialog = require(604),
            s = require(337);
        module.exports = class {
            async execute() {
                let { [PasswordlessAuthenticationActions.ResetPassword]: e } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                try {
                    (await gApi.passwordlessAuthentication.authenticateWithResetPasswordToken(e), await s.checkLicense());
                    const t = await gDesigner.getUser();
                    t &&
                        gDesigner.executeWhenReady(() => {
                            new GProfileDialog(t, GProfileDialog.Tabs.ChangePassword, {
                                token: e,
                                tabs: [GProfileDialog.Tabs.ChangePassword],
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
