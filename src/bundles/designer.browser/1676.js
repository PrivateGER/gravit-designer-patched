module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(96 /* polyfill:JSON */), require(865 /* polyfill:Number */), require(193), require(8 /* Symbol */), require(3), require(4), require(97));
        var GObject = require(1),
            designerConfig = require(10),
            Utils = require(40);
        const GContainer = require(85),
            UpdateEvents = require(1188),
            UpdateChannel = require(1349);
        var electronUpdateClient;
        module.exports = class {
            constructor() {
                ((this._intervalPID = null), (this._releaseStatus = { version: void 0, forceUpdate: false }), (this._downloadCompleted = false));
            }
            _trigger(event) {
                gDesigner.trigger(event);
            }
            getNewVersion() {
                return this._releaseStatus.version;
            }
            getCurrentVersion() {
                return gDesigner.getVersion();
            }
            getCurrentFriendlyVersion() {
                return gDesigner.getVersionFriendlyName();
            }
            _isVersionGeneralFormatHigherThan(releaseVersion, currentVersion) {
                var releaseParts = releaseVersion.split("."),
                    currentParts = currentVersion.split(".");
                if (3 !== releaseParts.length || releaseParts.some((part) => isNaN(Number(part)))) throw "Incorrect release version argument";
                if (3 !== currentParts.length || currentParts.some((part) => isNaN(Number(part)))) throw "Incorrect current version argument";
                var releaseMajor = +releaseParts[0],
                    releaseMinor = +releaseParts[1],
                    releasePatch = +releaseParts[2],
                    currentMajor = +currentParts[0],
                    currentMinor = +currentParts[1],
                    currentPatch = +currentParts[2];
                return releaseMajor > currentMajor || (releaseMajor === currentMajor && releaseMinor > currentMinor) || (releaseMajor === currentMajor && releaseMinor === currentMinor && releasePatch > currentPatch);
            }
            _isVersionHigherThan(version, currentVersion) {
                return !!version && this._isVersionGeneralFormatHigherThan(version, currentVersion);
            }
            async initializeReleaseStatus() {
                try {
                    this._releaseStatus = await designerConfig.gApi.software.getRelease({
                        current: this.getCurrentVersion(),
                        env: gDesigner.getEnv(),
                        runtime: gContainer.getRuntime(),
                        build: gDesigner.getBuildNum(),
                        commit: gDesigner.getCommitSHA(),
                        internalVersion: gDesigner.getVersion(),
                    });
                } catch (e) {
                    this._releaseStatus = { silent: true, forceUpdate: false };
                }
            }
            async initializeReleaseStatusWithNotifications() {
                (await this.initializeReleaseStatus(), (this._releaseStatus.silent = false));
            }
            async checkForUpdates(silent) {
                if (gDesigner.isOffline()) return console.warn(this.toString() + " Unable to check for updates - system is offline!");
                try {
                    const currentVersion = this.getCurrentVersion();
                    silent ? await this.initializeReleaseStatus() : await this.initializeReleaseStatusWithNotifications();
                    this._isVersionHigherThan(this._releaseStatus.tagVersion, currentVersion)
                        ? this._isElectron()
                            ? electronUpdateClient.checkForUpdates()
                            : this._trigger(
                                  new UpdateEvents.UpdateAvailable({
                                      currentVersion: this.getCurrentFriendlyVersion(),
                                      newVersion: this._releaseStatus.version,
                                      forceUpdate: this._releaseStatus.forceUpdate,
                                      isSilent: this._releaseStatus.silent,
                                  })
                              )
                        : silent ||
                          this._trigger(
                              new UpdateEvents.UpdateNotAvailable({
                                  currentVersion: this.getCurrentFriendlyVersion(),
                              })
                          );
                } catch (error) {
                    console.error(this.toString(), "exception", error);
                }
            }
            downloadUpdate() {
                (console.info(this.toString(), " - Downloading update"), this._isElectron() && electronUpdateClient.downloadUpdate());
            }
            async installElectronUpdate() {
                (GObject.GSystem.operatingSystem === GObject.GSystem.OperatingSystem.OSX_IOS &&
                    (console.info(this.toString(), " - Waiting install - OSX"), await (0, Utils.sleep)(5e3)),
                    console.info(this.toString(), " - Installing update - Call"),
                    electronUpdateClient.installUpdate());
            }
            async installUpdate() {
                switch (
                    (console.info(this.toString(), " - Installing update - Start"),
                    this._releaseStatus.silent || this._trigger(new UpdateEvents.BeforeInstallUpdate()),
                    gContainer.getRuntime())
                ) {
                    case GContainer.Runtime.Browser:
                    case GContainer.Runtime.PWA:
                        location.reload();
                        break;
                    case GContainer.Runtime.Electron:
                        (console.info(this.toString(), " - Checking download"),
                            this._downloadCompleted
                                ? this._releaseStatus.silent
                                    ? gContainer.setProperty("install_update_on_start", true)
                                    : this.installElectronUpdate()
                                : console.warn(this.toString() + " The download has not been finished yet!"));
                }
            }
            _isElectron() {
                return gContainer.getRuntime() === GContainer.Runtime.Electron;
            }
            async start() {
                [GContainer.Runtime.Electron, GContainer.Runtime.Browser, GContainer.Runtime.PWA].includes(gContainer.getRuntime())
                    ? (this._isElectron() &&
                          ((electronUpdateClient = require(1677)).on(UpdateChannel.UpdateDownloaded, this._handleDownloadComplete.bind(this)),
                          electronUpdateClient.on(UpdateChannel.DownloadProgress, this._handleDownloadInProgress.bind(this)),
                          electronUpdateClient.on(UpdateChannel.UpdateAvailable, this._handleUpdateAvailable.bind(this)),
                          electronUpdateClient.on(UpdateChannel.Error, this._handleUpdateError.bind(this)),
                          electronUpdateClient.on(UpdateChannel.UpdateNotAvailable, this._handleUpdateNotAvailable.bind(this)),
                          electronUpdateClient.on(UpdateChannel.CheckingForUpdate, this._handleCheckingForUpdate.bind(this)),
                          (await gContainer.getProperty("install_update_on_start")) &&
                              (gContainer.removeProperty("install_update_on_start"),
                              await this.initializeReleaseStatus(),
                              this.installElectronUpdate())),
                      (this._intervalPID = setTimeout(
                          function () {
                              let now = new Date().getTime();
                              (gContainer.setProperty("last_update_check", now), this.checkForUpdates(true));
                          }.bind(this),
                          designerConfig.DateAPI.daysToMilliseconds(1)
                      )),
                      gContainer.getProperty("last_update_check").then((lastCheck) => {
                          let now = new Date().getTime();
                          if (lastCheck) {
                              let diffMs = designerConfig.DateAPI.diff(designerConfig.DateAPI.toDate(lastCheck), designerConfig.DateAPI.toDate(now), false),
                                  oneDayMs = designerConfig.DateAPI.daysToMilliseconds(1);
                              (diffMs < 0 || diffMs >= oneDayMs) && (gContainer.setProperty("last_update_check", now), this.checkForUpdates(true));
                          } else gContainer.setProperty("last_update_check", now);
                      }),
                      gContainer.getProperty("old_version").then((oldVersion) => {
                          const currentVersion = this.getCurrentVersion();
                          oldVersion
                              ? oldVersion !== currentVersion &&
                                (gContainer.setProperty("old_version", currentVersion),
                                designerConfig.gApi.software.getRelease().then((release) => {
                                    release &&
                                        !release.silent &&
                                        this._trigger(
                                            new UpdateEvents.AfterUpdate({
                                                currentVersion: this.getCurrentFriendlyVersion(),
                                            })
                                        );
                                }))
                              : gContainer.setProperty("old_version", currentVersion);
                      }))
                    : console.warn(this.toString() + " Runtime not available for auto update!");
            }
            _handleDownloadComplete() {
                (console.info(this.toString() + " Download complete"),
                    (this._downloadCompleted = true),
                    this._trigger(
                        new UpdateEvents.DownloadComplete({
                            newVersion: this._releaseStatus.version,
                            forceUpdate: this._releaseStatus.forceUpdate,
                            isSilent: this._releaseStatus.silent,
                        })
                    ));
            }
            _handleUpdateNotAvailable() {
                (console.info(this.toString() + " Update not available"),
                    this._trigger(
                        new UpdateEvents.UpdateNotAvailable({
                            currentVersion: this.getCurrentFriendlyVersion(),
                            isSilent: this._releaseStatus.silent,
                        })
                    ));
            }
            _handleCheckingForUpdate() {
                (console.info(this.toString() + " Checking for update"),
                    this._trigger(new UpdateEvents.CheckingForUpdate({ isSilent: this._releaseStatus.silent })));
            }
            _handleDownloadInProgress(e, progress) {
                console.info(this.toString() + " Download in progress:" + JSON.stringify(progress));
                const percent = progress.percent;
                this._trigger(
                    new UpdateEvents.Downloading({
                        percent: parseFloat(percent).toFixed(2),
                        newVersion: this._releaseStatus.version,
                        isSilent: this._releaseStatus.silent,
                    })
                );
            }
            _handleUpdateAvailable(e, data) {
                (console.info(this.toString() + " Update available:" + JSON.stringify(data)),
                    this._trigger(
                        new UpdateEvents.UpdateAvailable({
                            currentVersion: this.getCurrentFriendlyVersion(),
                            newVersion: this._releaseStatus.version,
                            forceUpdate: this._releaseStatus.forceUpdate,
                            isSilent: this._releaseStatus.silent,
                        })
                    ),
                    this._releaseStatus.forceUpdate && this._isElectron() && electronUpdateClient.downloadUpdate());
            }
            _handleUpdateError(e, error) {
                (console.info(this.toString() + " Update error:" + JSON.stringify(error)),
                    this._trigger(
                        new UpdateEvents.UpdateError({
                            error: error,
                            isSilent: this._releaseStatus.silent,
                        })
                    ));
            }
            stop() {
                this._intervalPID && clearInterval(this._intervalPID);
            }
            getReleaseNotesLink() {
                return designerConfig.SOFTWARE_UPDATE.CHANGE_LOG_LINK;
            }
            toString() {
                return "[Object GSoftwareUpdateManager]";
            }
        };
    };
