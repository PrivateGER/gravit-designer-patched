module.exports = function (module, exports, require) {
        "use strict";
        require(30);
        var IS_TRUNK = require(231);
        const { License: i, LicenseType: a, DateAPI: r } = require(10 /* designerConfig */),
            {
                defaultUserSettings: {
                    license: { offlineCountdown: s, offlineExpirationTime: l },
                },
            } = require(10 /* designerConfig */).defaultUserSettings,
            c = require(785),
            d = require(1099);
        module.exports = class {
            static newLicense(e) {
                return (c.updateLicense(e), this._newLicense(e));
            }
            static newDefaultLicense() {
                return this._newLicense({ license: a.Default });
            }
            static newOfflineLicense() {
                const e = c.getLicense();
                if (e) {
                    const t = r.addTime(r.addTime(new Date(e.lastUpdate), e.offlineExpirationTime || l), e.offlineCountdown || s);
                    return this._newLicense(Object.assign(e, { offline: true, offlineExpire: t }));
                }
                return this._newLicense({ license: a.Default, offline: true });
            }
            static _newLicense(e) {
                return this._isDevLicense() ? new d(e) : new i(e);
            }
            static _isDevLicense() {
                if (IS_TRUNK.IS_TRUNK) return true;
                if (IS_TRUNK.IS_RC) {
                    const e = gDesigner.getSyncUser();
                    return !!e && !e.isDeactivated() && e.isEmailVerified() && e.isGravitAccount();
                }
                return false;
            }
        };
    };
