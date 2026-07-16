module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(527));
        const o = require(292),
            i = require(1685),
            { gApi: a, DateAPI: r } = require(10 /* designerConfig */);
        module.exports = class {
            init() {
                gDesigner.addEventListener(o, this._userLoggedEvent, this);
            }
            async _userLoggedEvent(e) {
                const t = e.user;
                if (t && t.getUID()) {
                    gDesigner.removeEventListener(o, this._userLoggedEvent, this);
                    try {
                        (await this._shouldShowWindowsStoreAnnouncement(t)) && this._showWindowsStoreAnnouncement();
                    } finally {
                        this._updateWindowStoreAnnouncementFlag();
                    }
                }
            }
            async _shouldShowWindowsStoreAnnouncement(e) {
                const { flags: { windowsStoreAnnouncement: t = false } = {} } = await a.getUserSettings().catch(() => ({}));
                return !(t || !r.lt(e.created, Date.now()));
            }
            _updateWindowStoreAnnouncementFlag() {
                a.updateUserSettings({ flags: { windowsStoreAnnouncement: true } });
            }
            _showWindowsStoreAnnouncement() {
                gDesigner.executeWhenReady(() => {
                    new i().open();
                });
            }
        };
    };
