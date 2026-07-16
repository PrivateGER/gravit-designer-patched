module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        const { PasswordlessAuthenticationActions, gApi } = require(10 /* designerConfig */),
            a = require(337),
            GSystemDialog = require(44);
        module.exports = class {
            async execute() {
                let { [PasswordlessAuthenticationActions.PasswordlessToken]: e } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                try {
                    return (
                        await gApi.passwordlessAuthentication.authenticateWithPasswordlessToken(e),
                        await a.checkLicense(),
                        gDesigner.getUser()
                    );
                } catch (e) {
                    gDesigner.executeWhenReady(() => {
                        GSystemDialog.error(e);
                    });
                }
            }
        };
    };
