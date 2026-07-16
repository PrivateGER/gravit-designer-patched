module.exports = function (module, exports, require) {
        "use strict";
        require(30);
        var IS_TRUNK = require(231);
        const { License, LicenseType, DateAPI } = require(10 /* designerConfig */),
            {
                defaultUserSettings: {
                    license: { offlineCountdown, offlineExpirationTime },
                },
            } = require(10 /* designerConfig */).defaultUserSettings,
            c = require(785),
            d = require(1099);
        module.exports = class {
            static newLicense(e) {
                return (c.updateLicense(e), this._newLicense(e));
            }
            static newDefaultLicense() {
                return this._newLicense({ license: LicenseType.Default });
            }
            static newOfflineLicense() {
                const e = c.getLicense();
                if (e) {
                    const t = DateAPI.addTime(DateAPI.addTime(new Date(e.lastUpdate), e.offlineExpirationTime || offlineExpirationTime), e.offlineCountdown || offlineCountdown);
                    return this._newLicense(Object.assign(e, { offline: true, offlineExpire: t }));
                }
                return this._newLicense({ license: LicenseType.Default, offline: true });
            }
            static _newLicense(e) {
                return this._isDevLicense() ? new d(e) : new License(e);
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
