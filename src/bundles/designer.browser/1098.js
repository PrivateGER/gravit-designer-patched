module.exports = function (module, exports, require) {
        "use strict";
        require(8 /* Symbol */);
        var designerConfig = require(10);
        const userLoggedInEvent = require(292),
            licenseFactory = require(846);
        module.exports = class {
            constructor() {
                this._isListening = false;
            }
            async checkLicense() {
                let license;
                if (gDesigner.isOffline()) license = licenseFactory.newOfflineLicense();
                else
                    try {
                        license = licenseFactory.newLicense(await designerConfig.gApi.license.get());
                    } catch (error) {
                        ((license = licenseFactory.newDefaultLicense()), console.info("CheckLicense", "exception", error));
                    }
                this._setApplicationLicense(license);
            }
            async _listenLicense() {
                if (!this._isListening)
                    try {
                        if (!gDesigner.isOffline()) {
                            (await gDesigner.getUser()) &&
                                !gDesigner.isAnonymous() &&
                                (designerConfig.gApi.license.listen((licenseData) => {
                                    this._setApplicationLicense(licenseFactory.newLicense(licenseData));
                                }),
                                (this._isListening = true));
                        }
                    } catch (error) {
                        console.info("LicenseChanged", "exception", error);
                    }
            }
            _setApplicationLicense(license) {
                gDesigner.setLicense(license);
            }
            async start() {
                (gDesigner.addEventListener(userLoggedInEvent, this._userLoggedEvent, this),
                    $(window).on("online", this.checkLicense.bind(this)),
                    $(window).on("offline", this.checkLicense.bind(this)));
                try {
                    await this.checkLicense();
                } catch (e) {
                    console.error(e);
                }
                try {
                    this._listenLicense();
                } catch (e) {
                    console.error(e);
                }
                setInterval(this.checkLicense.bind(this), designerConfig.DateAPI.daysToMilliseconds(1));
            }
            _userLoggedEvent() {
                (this.checkLicense(), this._listenLicense());
            }
        };
    };
