module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        require(1 /* GObject */);
        (require(1327), require(1579));
        class o {
            static openTrialExpired() {
                return o._openReminder("trialexpired");
            }
            static openTrialMessage() {
                return o._openReminder("trialmessage");
            }
            static openProExpireSoon() {
                return o._openReminder("proexpiresoon");
            }
            static openProExpired() {
                return o._openReminder("proexpired");
            }
            static openUpgradeScreen() {
                return o._openReminder("upgrade");
            }
            static async _openReminder(e) {
                console.info("Reminders are disabled: ", e);
            }
            static _getProduct() {
                return gInAppPurchase.getProduct().catch(() => null);
            }
        }
        module.exports = o;
    };
