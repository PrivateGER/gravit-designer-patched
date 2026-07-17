module.exports = function (module, exports, require) {
        "use strict";
        (require(30 /* polyfill:Object */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(527), require(107 /* polyfill:RegExp */), require(4), require(32), require(33));
        var designerConfig = require(10);
        const paywall = require(1326),
            upgradeDialogs = require(1578),
            GOfflineDialog = require(256),
            GLicenseChangedEvent = require(441),
            reminderHandlers = {
                offlineWarning: () => GOfflineDialog.openOfflineWarning(),
                trialExpired: () => upgradeDialogs.openTrialExpired(),
                proExpireSoon: () => upgradeDialogs.openProExpireSoon(),
                proExpireToday: () => upgradeDialogs.openProExpireSoon(),
                proExpired: () => upgradeDialogs.openProExpired(),
                upgradeScreen: () => upgradeDialogs.openUpgradeScreen(),
                proOfferInTrial: () => upgradeDialogs.openTrialMessage(),
                proOfferInTrialExpired: () => paywall.openOfferReminder(),
                proOfferInTrialExpireSoon: () => upgradeDialogs.openTrialMessage(),
                proOfferInTrialLastWarning: () => upgradeDialogs.openTrialMessage(),
                proOfferSpecialPrice: () => paywall.openOfferReminder(),
                proOfferInFree: () => paywall.openOfferReminder(),
            };
        module.exports = new (class {
            constructor() {
                ((this._settings = Object.assign({}, designerConfig.defaultUserSettings.defaultUserSettings)),
                    (this._intervalId = null),
                    (this._flags = {
                        proOfferInTrialLastWarning: true,
                        proOfferInTrialExpireSoon: true,
                    }));
            }
            async start() {
                try {
                    let userSettings = await designerConfig.gApi.getUserSettings().catch(() => null);
                    userSettings && (this._settings = Object.assign(this._settings, userSettings));
                } catch (error) {
                    console.info("GReminderManager", "exception", error);
                }
                (this._settings &&
                    this._settings.reminders &&
                    (this._settings.reminders.proOfferInTrialExpireSoon = designerConfig.DateAPI.daysToMilliseconds(1)),
                    setInterval(this.checkReminders.bind(this), designerConfig.DateAPI.daysToMilliseconds(1)),
                    await this.checkReminders(),
                    gDesigner.addEventListener(GLicenseChangedEvent, this.checkReminders, this));
            }
            async checkReminders() {
                if (!gDesigner.isEnabledSubscriptions()) return;
                let syncUser = gDesigner.getSyncUser();
                if (!syncUser || syncUser.deactivated) return;
                if (!this._isAllowedToShowReminders()) return;
                const license = gDesigner.getLicense(),
                    now = gDesigner.now();
                if (license.canAccessFreemium(now)) {
                    if (license.isExpired(now)) {
                        if (license.isTrial() && this.once("trialExpired")) return void this._checkPoint("proOfferInTrialExpired", now);
                        if (license.isPro()) return void this.once("proExpired");
                        this.execute("proOfferInTrialExpired");
                    } else if (license.isPro())
                        license.getExpirationDate() &&
                            (this.once("proExpireSoon", license.getExpirationDate()) || this.once("proExpireToday", license.getExpirationDate()));
                    else if (license.isTrial())
                        (await this._getShowTrialMessage()) &&
                            this._waitUntilUserIsInactive() &&
                            (this.execute("proOfferInTrial") ||
                                this.once("proOfferInTrialExpireSoon", license.getExpirationDate()) ||
                                this.once("proOfferInTrialLastWarning", license.getExpirationDate()));
                    else if (license.isFree()) {
                        const { reminders: { proOfferInFree: proOfferDelay = 15 } = {} } = this._settings;
                        if (license.getCreationDate()) {
                            const triggerDate = designerConfig.DateAPI.addTime(license.getCreationDate(), proOfferDelay);
                            designerConfig.DateAPI.gte(now, triggerDate) && this.execute("proOfferInFree") && this.reset("proOfferInTrial", now);
                        }
                    }
                    (license.isPro() ||
                        (license.isLegacy() && license.getSpecialPriceDate() && this.once("proOfferSpecialPrice", license.getSpecialPriceDate(), true)),
                        license.isOffline() &&
                            !license.isOfflinePeriodExpired() &&
                            (license.isPro() || license.isTrial()) &&
                            this.execute("offlineWarning", license.getOfflineWarningDate()),
                        license.isPro() && !license.isExpired(now) && (this.reset("proExpired"), this.reset("proExpireToday")));
                } else (await this._getShowTrialMessage()) && this._executeReminder("upgradeScreen");
            }
            _isAllowedToShowReminders() {
                const nowTime = new Date(gDesigner.now()).getTime(),
                    license = gDesigner.getLicense();
                return !license.isTrial() || !designerConfig.DateAPI.lte(nowTime, license.getCreationDate());
            }
            execute(key, date) {
                const now = gDesigner.now();
                date && (date = designerConfig.DateAPI.addTime(date, -this._settings.reminders[key] || 0));
                const lastShownValue = gDesigner.getSetting(key);
                return (
                    !(lastShownValue && !designerConfig.DateAPI.isExpired(now, new Date(lastShownValue), this._settings.reminders[key])) &&
                    !(date && !designerConfig.DateAPI.isExpired(now, date)) &&
                    this._executeReminder(key)
                );
            }
            once(key, date) {
                let exactMatch = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if (gDesigner.getSetting(key)) return false;
                const now = gDesigner.now();
                return (
                    date && (date = designerConfig.DateAPI.addTime(date, -this._settings.reminders[key] || 0)),
                    !date || (!exactMatch && designerConfig.DateAPI.isExpired(now, date)) || (exactMatch && designerConfig.DateAPI.eq(now, date)) ? this._executeReminder(key) : void 0
                );
            }
            _checkPoint(key, date) {
                gDesigner.setSetting(key, date);
            }
            _executeReminder(key) {
                return (
                    !!this._checkFlag(key) &&
                    (/^prod/.test("production") || console.info("ReminderManager", key),
                    this._checkPoint(key, gDesigner.now()),
                    this._handleStats(key),
                    reminderHandlers[key].call(null),
                    true)
                );
            }
            _checkFlag(key) {
                return this._flags.hasOwnProperty(key) ? this._flags[key] : false !== this._settings.flags[key];
            }
            _handleStats(key) {
                let license, days;
                switch (key) {
                    case "offlineWarning":
                        gDesigner.pageTracking("/ProOfflineWarning");
                        break;
                    case "trialExpired":
                        gDesigner.pageTracking("/ProTrialExpired");
                        break;
                    case "upgradeScreen":
                        (gDesigner.pageTracking("/Upgrade"),
                            gDesigner
                                .getUser()
                                .then(async (user) => {
                                    gDesigner.getAmplitudeHelper().logEvent(designerConfig.AmplitudeData.Events.ACCOUNT_TRIAL_EXPIRED_SCREEN, {
                                        ACCOUNT_TOTAL_TRIAL_DAYS_GIVEN: user.trial_created
                                            ? designerConfig.DateAPI.millisecondsToDays(
                                                  designerConfig.DateAPI.diff(new Date(user.trial_created), new Date(user.trial_expire))
                                              )
                                            : null,
                                        ACCOUNT_TOTAL_SUBSCRIPTION_DAYS_GIVEN: await designerConfig.gApi.license.totalSubscriptionDays(user),
                                        ACCOUNT_EVER_SUBSCRIBED: await designerConfig.gApi.license.everSubscribed(),
                                    });
                                })
                                .catch(() => null));
                        break;
                    case "proExpireSoon":
                        ((license = gDesigner.getLicense()),
                            (days = designerConfig.DateAPI.millisecondsToDays(designerConfig.DateAPI.diff(designerConfig.DateAPI.toUTCZone(gDesigner.now()), license.getExpirationDate()))),
                            gDesigner.pageTracking("/ProReminders" + days));
                        break;
                    case "proExpireToday":
                        gDesigner.pageTracking("/ProReminders1");
                        break;
                    case "proExpired":
                        gDesigner.pageTracking("/ProSubExpired");
                        break;
                    case "proOfferInTrial":
                        gDesigner.pageTracking("/ProTrial");
                        break;
                    case "proOfferInTrialExpired":
                        gDesigner.pageTracking("/ProTrialExpired");
                        break;
                    case "proOfferInTrialExpireSoon":
                        ((license = gDesigner.getLicense()),
                            (days = designerConfig.DateAPI.millisecondsToDays(designerConfig.DateAPI.diff(designerConfig.DateAPI.toUTCZone(gDesigner.now()), license.getExpirationDate()))),
                            gDesigner.pageTracking("/ProTrialExpireSoon" + days));
                        break;
                    case "proOfferInTrialLastWarning":
                        gDesigner.pageTracking("/ProTrialExpireToday");
                        break;
                    case "proOfferSpecialPrice":
                        gDesigner.pageTracking("/ProTrialSpecialPrice");
                        break;
                    case "proOfferInFree":
                        gDesigner.pageTracking("/ProFree");
                        break;
                    case "upgrade":
                        gDesigner.pageTracking("/Upgrade");
                }
            }
            reset(key, date) {
                gDesigner.setSetting(key, date);
            }
            resetAll() {
                Object.keys(reminderHandlers).forEach((key) => this.reset(key));
            }
            _waitUntilUserIsInactive() {
                return (
                    !gDesigner.isUserActivelyUsingApp() ||
                    (this._intervalId ||
                        (this._intervalId = setInterval(() => {
                            gDesigner.isUserActivelyUsingApp() ||
                                (clearInterval(this._intervalId), (this._intervalId = null), this.checkReminders());
                        }, designerConfig.ACTIVE_USAGE_IDLE_TIME)),
                    false)
                );
            }
            async _getShowTrialMessage() {
                try {
                    const { showTrialMessage } = (await designerConfig.gApi.client.getConfiguration()) || {};
                    return !!showTrialMessage;
                } catch (e) {
                    console.error("Failed to load client configuration. Skipping trial reminders");
                }
                return false;
            }
        })();
    };
