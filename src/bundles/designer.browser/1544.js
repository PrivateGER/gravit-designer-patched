module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(57), require(8 /* Symbol */), require(71 /* polyfill:String */), require(4), require(13), require(32), require(33));
        var GObject = require(1),
            designerConfig = require(10),
            uiConfig = require(357),
            Utils = require(40),
            GOfflineDialog = _interopRequireDefault(require(256 /* GOfflineDialog */)),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            GExternalFileError = _interopRequireDefault(require(734)),
            GDocument = require(163),
            GOpenAction = require(813),
            GSafariOpenAction = require(1299),
            GCommonNames = require(119),
            GFilesPanel = require(1545),
            GTemplatesPanel = require(1558),
            GPresets = require(1153),
            { youtubePlaylist } = require(1302),
            GLoginPanel = require(446);
        require(220 /* GCloudStorage */);
        const runtimeDetector = require(859),
            GLicenseChangedEvent = require(441);
        function C() {
            let parentDialogInstance = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            var footerSections = this._createFooter(),
                self = this;
            (this._createOption.bind(this),
                this._createPresetsFrame.bind(this),
                this.open.bind(this),
                this.isOpen.bind(this),
                this.close.bind(this),
                this._newDocumentCustomSize.bind(this),
                this.getDialogElement.bind(this),
                (this._openFromCloud = false),
                (this._parentDialogInstance = parentDialogInstance),
                (this._spectatorModeClazz = "on-spectator-mode"),
                (this._cb = null),
                (this._dialog = $("<div></div>")));
            $("<div></div>")
                .addClass("links")
                .append(
                    $("<div></div>")
                        .addClass("loader")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "loading")) + "...")
                );
            var sidebarElement = $("<div></div>").addClass("sidebar").appendTo(this._dialog);
            designerConfig.LICENSE.UPGRADEABLE && (gDesigner.getApplicationManager().isLicenseUpgradeable() || sidebarElement.addClass("on-pro"));
            var sidebarOptionsElement = $("<div/>").addClass("sidebar-options").appendTo(sidebarElement),
                frameElement = $("<div></div>").addClass("frame").appendTo(this._dialog),
                presetsFrame = this._createPresetsFrame().appendTo(frameElement),
                g = null;
            this._createSeparator(sidebarOptionsElement, "start-option");
            var activateOption = function (selector) {
                    (this._dialog.find(".sidebar-options").find(".option").removeClass("active"),
                        this._dialog.find(".sidebar-options").find(selector).addClass("active"));
                }.bind(this),
                y = function () {
                    (this._dialog.find(".option.start-option").trigger("click"),
                        this._dialog.find(".frame").removeClass("cloud-frame"),
                        this._dialog.find(".g-dialog-content").removeClass("cloud-dialog"),
                        this._dialog.parent().removeClass("cloud-files-dialog"),
                        activateOption(".start-option"));
                }.bind(this);
            (this._createOption(
                sidebarOptionsElement,
                GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.start-option")),
                GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.start-option-description")),
                "start-option",
                function (isTrigger) {
                    (frameElement.children().detach(), frameElement.append(presetsFrame));
                    var storedShowWelcomeScreen = gDesigner.getSetting("show_welcome_screen"),
                        showWelcomeScreen = "boolean" != typeof storedShowWelcomeScreen || storedShowWelcomeScreen;
                    (isTrigger || self._isSpectatorMode() || gDesigner.stats("newdocumentdialog_click_newdesign"),
                        $("<div></div>")
                            .addClass("footer-section")
                            .append(
                                $("<label></label>")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.start-option-check")))
                                    .append(
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .prop("checked", !showWelcomeScreen)
                                            .on("change", (event) => {
                                                (gDesigner.stats("newdocumentdialog_toggle_show-welcome-screen", showWelcomeScreen ? "enable" : "disable"),
                                                    gDesigner.setSetting("show_welcome_screen", !$(event.target).is(":checked")));
                                            })
                                    )
                            )
                            .appendTo(frameElement),
                        self._isSpectatorMode() || activateOption(".start-option"));
                }
            ),
                this._createSeparator(sidebarOptionsElement, "local-option"),
                this._createOption(
                    sidebarOptionsElement,
                    GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.local-option")),
                    GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.local-option-description")),
                    "local-option",
                    function (isTrigger) {
                        (isTrigger || gDesigner.stats("newdocumentdialog_click_opendocument"), this._openDocument());
                    }.bind(this),
                    true
                ),
                this._createSeparator(sidebarOptionsElement, "recent-option"));
            var recentOptionElement = this._createOption(
                sidebarOptionsElement,
                GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.recent-option")),
                GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.recent-option-description")),
                "recent-option",
                function (isTrigger) {
                    isTrigger || gDesigner.stats("newdocumentdialog_click_recent");
                    var overlayElement = $("<div></div>").gOverlay({
                            releaseOnClose: true,
                            clazz: "g-recent-documents",
                            padding: false,
                        }),
                        menuElement = $("<div></div>").addClass("menu").appendTo(overlayElement),
                        recentDocuments = gContainer.getRecentDocuments();
                    recentDocuments && recentDocuments.length
                        ? recentDocuments.forEach((recentDoc) => {
                              var iconClass = gContainer.getRecentDocumentIconClass(recentDoc);
                              $("<div></div>")
                                  .addClass("item file")
                                  .data("file", recentDoc)
                                  .on("click", async (event) => {
                                      gDesigner.stats("newdocumentdialog_click_openrecentdocument");
                                      try {
                                          gDesigner.openDocument($(event.target).closest(".file").data("file"));
                                      } catch (error) {
                                          if (!(error instanceof GExternalFileError.default)) throw (this.close(), error);
                                          GSystemDialog.default.externalFileError(true);
                                      }
                                      this.close();
                                  })
                                  .append(
                                      $("<div/>")
                                          .addClass("icon")
                                          .addClass(iconClass || "")
                                  )
                                  .append(
                                      $("<div/>")
                                          .addClass("name")
                                          .append(recentDoc.getName() + "." + recentDoc.getExtension().toLowerCase())
                                  )
                                  .appendTo(menuElement);
                          })
                        : $("<div></div>")
                              .addClass("item")
                              .append(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.recent-option-empty")))
                              .appendTo(menuElement);
                    var overlayX = recentOptionElement.offset().left + recentOptionElement.width() - 10,
                        overlayY = recentOptionElement.offset().top - overlayElement.height();
                    overlayElement.gOverlay("open", { x: overlayX, y: overlayY });
                }.bind(this),
                true
            );
            (this._createSeparator(sidebarOptionsElement),
                designerConfig.LICENSE.UPGRADEABLE &&
                    $("<div></div>")
                        .addClass("activate-trial")
                        .css("display", gDesigner.getApplicationManager().isLicenseUpgradeable() ? "" : "none")
                        .append(
                            $("<div></div>")
                                .addClass("title")
                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.try-out-pro")))
                        )
                        .append(
                            $("<div></div>")
                                .addClass("subtitle")
                                .html(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.start-free-trial")))
                        )
                        .on("click", () => gDesigner.activateTrialLicense().then(() => this._updateUI()))
                        .appendTo(sidebarElement));
            var footerElement = $("<div></div>").addClass("footer").appendTo(sidebarElement),
                linksContainer = $("<div />").addClass("links-container").appendTo(footerElement),
                linksColumn1 = $("<div/>").addClass("links-column").appendTo(linksContainer),
                linksColumn2 = $("<div/>").addClass("links-column").appendTo(linksContainer),
                linksColumn3 = $("<div/>").addClass("links-column").appendTo(linksContainer),
                A = 0;
            (footerSections.forEach((section) => {
                section.links.forEach((link) => {
                    var linkElement = $("<div/>").addClass("link");
                    ($("<div/>").addClass("link-icon").appendTo(linkElement),
                        $("<a/>")
                            .on("click", function (event) {
                                (link.statType
                                    ? gDesigner.stats(link.statType)
                                    : gDesigner.stats(
                                          "newdocumentdialog_open_externallink",
                                          GObject.GLocale.get(link.labelLocale, null, GObject.GLocaleLanguage.English)
                                      ),
                                    link.click ? link.click.call(this) : gContainer.openExternalLink(event, link.href));
                            })
                            .text(GObject.GLocale.get(link.labelLocale || link.text))
                            .appendTo(linkElement),
                        A % 3 == 0 ? linkElement.appendTo(linksColumn1) : A % 3 == 1 ? linkElement.appendTo(linksColumn2) : linkElement.appendTo(linksColumn3),
                        ++A);
                });
            }),
                uiConfig.SHOW_BETA_BRANDING && gDesigner.isBeta() && $("<div/>").addClass("beta-badge").attr("title", "βETA").appendTo(sidebarElement),
                this._getVersionInfoWidget().appendTo(sidebarElement),
                (this._closeCallbackListeners = []),
                this._dialog.gDialog({
                    closeTimeout: 0,
                    releaseOnClose: false,
                    className: "g-new-document-dialog",
                    closeCallback: (e) => {
                        (this._closeCallback && this._closeCallback(e),
                            this._closeCallbackListeners.length &&
                                (this._closeCallbackListeners.forEach((listener) => listener.call(null, e)), (this._closeCallbackListeners = [])));
                    },
                    alwaysCloseable: true,
                }),
                document.addEventListener(
                    "keydown",
                    function (event) {
                        13 === event.keyCode && this._dialog.gDialog("isOpen") && this._newDocumentCustomSize();
                    }.bind(this)
                ));
        }
        (GObject.GObject.inherit(C, GObject.GObject),
            (C.prototype._getVersionInfoWidget = function () {
                let envSuffix = "";
                "lts" === gDesigner.getEnv() ? (envSuffix = " LTS") : "rc" === gDesigner.getEnv() && (envSuffix = " Staging");
                const runtimeInfo = runtimeDetector.getRuntime();
                return (
                    runtimeInfo && (envSuffix += " ".concat(runtimeInfo.abbr)),
                    $("<div/>")
                        .addClass("version")
                        .html(
                            GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.version")) + " " + gDesigner.getVersionFriendlyName() + envSuffix
                        )
                        .on("click", function () {
                            if (
                                (gDesigner.stats("newdocumentdialog_show_gravitversion"),
                                "production" !== gDesigner.getEnv() && "lts" !== gDesigner.getEnv() && "rc" !== gDesigner.getEnv())
                            ) {
                                var versionElement = $(this),
                                    versionToggleState = versionElement.data("nfo");
                                (versionToggleState || versionElement.data("nfo", (versionToggleState = { current: 0 })),
                                    (function (state) {
                                        switch (((state.current = (state.current + 1) % 4), state.current)) {
                                            case 0:
                                                versionElement.html(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.version")) +
                                                        " " +
                                                        gDesigner.getVersionFriendlyName() +
                                                        envSuffix
                                                );
                                                break;
                                            case 1:
                                                versionElement.html(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.internal-version")) +
                                                        ": " +
                                                        gDesigner.getVersion()
                                                );
                                                break;
                                            case 2:
                                                versionElement.html(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.build")) +
                                                        ": " +
                                                        (gDesigner.getBuildNum() || "")
                                                );
                                                break;
                                            case 3:
                                                versionElement.html(
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.commit")) +
                                                        ": " +
                                                        (gDesigner.getCommitSHA() || "").substr(0, 8)
                                                );
                                        }
                                    })(versionToggleState));
                            }
                        })
                );
            }),
            (C.prototype._licenseChangedEvent = function (e) {
                this._updateUI();
            }),
            (C.prototype._updateUI = function () {
                if (designerConfig.LICENSE.UPGRADEABLE) {
                    const isLicenseUpgradeable = gDesigner.getApplicationManager().isLicenseUpgradeable();
                    (this._dialog.find(".activate-trial").css("display", isLicenseUpgradeable ? "" : "none"),
                        this._dialog.find(".sidebar").toggleClass("on-pro", !isLicenseUpgradeable));
                }
                (this._dialog.find(".templates-option").css("display", gDesigner.isOffline() ? "none" : ""),
                    this._dialog.find(".cloud-option").css("display", gDesigner.isOffline() ? "none" : ""),
                    this._updateForUserLicense());
            }),
            (C.prototype.getDialogElement = function () {
                return this._dialog;
            }),
            (C.prototype._updateForUserLicense = function () {
                const headerElement = this._dialog.find(".header"),
                    presetsFrameElement = this._dialog.find(".presets-frame"),
                    presetInputsElement = headerElement.find(".preset .g-input"),
                    presetTiles = presetsFrameElement.find(".presets .preset");
                if (!this._isSpectatorMode())
                    return (
                        this._dialog.find(".start-option").removeClass(this._spectatorModeClazz).removeAttr("data-title"),
                        this._dialog.find(".templates-option").removeClass(this._spectatorModeClazz).removeAttr("data-title"),
                        presetsFrameElement.removeClass(this._spectatorModeClazz),
                        headerElement.removeClass(this._spectatorModeClazz),
                        headerElement.find(".select-overlay").remove(),
                        presetInputsElement.find("input").removeAttr("readonly").removeAttr("disabled").removeAttr("data-title"),
                        presetInputsElement.find("select").removeAttr("disabled").removeAttr("data-title").removeClass("g-disabled"),
                        presetInputsElement
                            .find(".cloud-button")
                            .removeAttr("disabled")
                            .removeAttr("data-title")
                            .removeClass("g-disabled")
                            .addClass("active"),
                        presetTiles.find(".icon").removeAttr("data-title"),
                        void presetTiles.find(".select-container").removeAttr("data-title")
                    );
                const notAvailableMessage = GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.option-not-available-in-view-mode"));
                (this._dialog.find(".start-option").addClass(this._spectatorModeClazz).attr("data-title", notAvailableMessage),
                    this._dialog.find(".templates-option").addClass(this._spectatorModeClazz).attr("data-title", notAvailableMessage),
                    presetsFrameElement.addClass(this._spectatorModeClazz),
                    headerElement.addClass(this._spectatorModeClazz),
                    presetInputsElement.find("input").attr("readonly", true).attr("disabled", true).attr("data-title", notAvailableMessage),
                    presetInputsElement.find("select").attr("disabled", true).attr("data-title", notAvailableMessage).addClass("g-disabled").insertAfter(),
                    presetInputsElement.find(".cloud-button").attr("data-title", notAvailableMessage).addClass("g-disabled").removeClass("active"),
                    presetTiles.find(".icon").attr("data-title", notAvailableMessage),
                    presetTiles.find(".select-container").attr("data-title", notAvailableMessage),
                    headerElement.find(".select-overlay").length ||
                        $("<div>").addClass("select-overlay").attr("data-title", notAvailableMessage).insertAfter(headerElement.find(".preset .g-input select")));
            }),
            (C.prototype._createOption = function (container, title, subtitle, optionClass, clickCallback, isActionOption) {
                var optionElement = $("<div/>")
                    .addClass("option")
                    .addClass(optionClass)
                    .on(
                        "click",
                        function (event, documentToSave, cancelSaveCallback, defaultFilename, nativeCloud, showExampleFiles) {
                            (this._dialog.find(".frame").removeClass("loading"),
                                isActionOption ||
                                    (this._dialog.find(".sidebar-options").find(".option-separator").removeClass("active"),
                                    $(optionElement).prevAll(".option-separator:visible").first().addClass("active"),
                                    $(optionElement).nextAll(".option-separator:visible").first().addClass("active")),
                                clickCallback(true & event.isTrigger, documentToSave, cancelSaveCallback, defaultFilename, nativeCloud, showExampleFiles));
                        }.bind(this)
                    )
                    .appendTo(container);
                $("<div/>").addClass("option-icon").appendTo(optionElement);
                var optionTextElement = $("<div/>").addClass("option-text").appendTo(optionElement);
                return (
                    $("<div/>").addClass("option-title").html(title).appendTo(optionTextElement),
                    $("<div/>").addClass("option-subtitle").html(subtitle).appendTo(optionTextElement),
                    optionElement
                );
            }),
            (C.prototype._createFooter = function () {
                return [
                    {
                        section: GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.connect")),
                        links: [],
                    },
                ];
            }),
            (C.prototype._createSeparator = function (container, separatorClass) {
                $("<div/>").addClass("option-separator").addClass(separatorClass).appendTo(container);
            }),
            (C.prototype._createPresetsFrame = function () {
                var presetsContainer = $("<div></div>").addClass("presets-container"),
                    headerElement = $("<div/>").addClass("header").appendTo(presetsContainer),
                    presetsListElement = $("<div></div>").addClass("presets").appendTo($("<div/>").addClass("presets-frame").appendTo(presetsContainer));
                GPresets.getPresets(true).forEach((preset, t) => {
                    $("<div/>")
                        .addClass("preset")
                        .data("preset", preset)
                        .append($("<p/>").addClass("title").text(preset.name))
                        .append(
                            $("<div/>")
                                .addClass("icon")
                                .on("click", (event) => {
                                    this._isSpectatorMode() || this._showPresetDropdown(event, preset);
                                })
                                .append($("<img/>").attr("src", "assets/img/new-document/" + preset.icon + "-white.svg"))
                                .append(
                                    $("<img/>")
                                        .attr("src", "assets/img/new-document/" + preset.icon + "-black.svg")
                                        .addClass("hover")
                                )
                        )
                        .append(
                            $("<div/>")
                                .addClass("select-container")
                                .append([
                                    $("<p/>")
                                        .addClass("name")
                                        .text(preset.subTitle)
                                        .on("click", (event) => {
                                            this._isSpectatorMode() || this._showPresetDropdown(event, preset);
                                        }),
                                ])
                        )
                        .appendTo(presetsListElement);
                });
                // "New from Template" preset tile removed: the template backend was
                // never archived, so the tile led to an empty/broken dialog.
                var handleEnterKeydown = (event) => (13 === event.keyCode ? this._newDocumentCustomSize() : void 0);
                return (
                    $("<div/>")
                        .addClass("preset custom-size")
                        .append(
                            $("<div/>")
                                .addClass("g-input")
                                .on("click", (event) => event.stopPropagation())
                                .append(
                                    $("<div/>")
                                        .addClass("input-holder")
                                        .append(
                                            $("<div/>")
                                                .append(
                                                    $("<input/>")
                                                        .on("keydown", handleEnterKeydown)
                                                        .attr("name", "width")
                                                        .attr("placeholder", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.width")))
                                                        .val("")
                                                        .gInputBox({
                                                            minValue: 0,
                                                            incrementValue: 1,
                                                            allowEmptyValue: true,
                                                        })
                                                )
                                                .append($("<img/>").addClass("versus").attr("src", "assets/icon/versus.svg"))
                                                .append(
                                                    $("<input/>")
                                                        .on("keydown", handleEnterKeydown)
                                                        .attr("name", "height")
                                                        .attr("placeholder", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.height")))
                                                        .val("")
                                                        .gInputBox({
                                                            minValue: 0,
                                                            incrementValue: 1,
                                                            allowEmptyValue: true,
                                                        })
                                                )
                                        )
                                )
                                .append($("<select/>").attr("name", "unit").val("px").gUnit({ short: true }))
                                .on("change", function (e) {
                                    var selectedUnit = $(this).find(":selected").val() || "px";
                                    "undefined" != typeof gDesigner && gDesigner.stats("newdocumentdialog_change_unit", selectedUnit);
                                })
                                .append($("<img/>").addClass("result").attr("src", "assets/icon/result.svg"))
                                .append(
                                    $("<button/>")
                                        .addClass("cloud-button")
                                        .append(
                                            $("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "action.create-canvas")))
                                        )
                                        .addClass("active")
                                        .on("click", () => {
                                            this._isSpectatorMode() || this._newDocumentCustomSize();
                                        })
                                )
                        )
                        .append(
                            $("<p/>")
                                .addClass("infinite-canvas")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "action.leave-empty-infinite")))
                        )
                        .appendTo(headerElement),
                    uiConfig.NEWDOCUMENTDIALOG.HR_UNDER_PRESETS && $("<hr/>").appendTo(headerElement),
                    presetsContainer
                );
            }),
            (C.prototype._createCloudLoginFrame = function (loginType, loginCallback, container) {
                if (0 === $(container).children().length) {
                    container.removeClass("loading");
                    var cloudLoginElement = $("<div/>").addClass("cloud-login").addClass(loginType),
                        isTemplateType = "template" === loginType;
                    $("<div/>").addClass("cloud-logo").addClass(loginType).appendTo(cloudLoginElement);
                    var titleText = isTemplateType
                            ? GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.templates-login-title"))
                            : GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.cloud-login-title")),
                        phraseOneText = isTemplateType
                            ? GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.templates-login-phrase1"))
                            : GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.cloud-login-phrase1")),
                        phraseTwoText = isTemplateType
                            ? GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.templates-login-phrase2"))
                            : GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.cloud-login-phrase2"));
                    ($("<div/>").html(titleText).addClass("title").addClass(loginType).appendTo(cloudLoginElement),
                        $("<div/>").html(phraseOneText).addClass("subtitle").addClass("first").addClass(loginType).appendTo(cloudLoginElement),
                        $("<div/>").html(phraseTwoText).addClass("subtitle").addClass("second").addClass(loginType).appendTo(cloudLoginElement),
                        $("<div/>")
                            .addClass("login-buttons")
                            .append(
                                $("<div/>")
                                    .addClass("g-button cloud-login-button")
                                    .addClass("login")
                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.cloud-login")))
                                    .on("click", function () {
                                        GCommonNames.performLogin().then(function (user) {
                                            loginCallback && loginCallback(user);
                                        });
                                    })
                            )
                            .append(
                                $("<div/>")
                                    .addClass("g-button cloud-login-button")
                                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.cloud-signup")))
                                    .on("click", function () {
                                        GCommonNames.performSignup().then(function (user) {
                                            loginCallback && loginCallback(user);
                                        });
                                    })
                            )
                            .appendTo(cloudLoginElement),
                        container.append(cloudLoginElement));
                }
            }),
            (C.prototype._loadCloudFiles = function (parentComponent, documentToSave, cancelCallback, defaultFilename, nativeCloud, showExampleFiles) {
                this.handled = false;
                var filesPanel = new GFilesPanel({
                        parentComponent: parentComponent,
                        closeCallback: async function (saved) {
                            ((this.handled = true),
                                await this.close(),
                                this._parentDialogInstance && (await this._parentDialogInstance.close()),
                                saved || (cancelCallback && cancelCallback()));
                        }.bind(this),
                        documentToSave: documentToSave,
                        cancelSave: async function () {
                            ((this.handled = true), await this.close(), cancelCallback && cancelCallback());
                        }.bind(this),
                        defaultFilename: defaultFilename,
                        readyStateChange: this.readyStateChange,
                        nativeCloud: nativeCloud,
                        showExampleFiles: showExampleFiles,
                    }),
                    closeListener = () => {
                        var listenerIndex = this._closeCallbackListeners.indexOf(closeListener);
                        (this._closeCallbackListeners.splice(listenerIndex, 1), this.handled || (cancelCallback && cancelCallback()), filesPanel.handleParentClose());
                    };
                this._closeCallbackListeners.push(closeListener);
            }),
            (C.prototype._loadTemplates = function () {
                new GTemplatesPanel(
                    function () {
                        this.close();
                    }.bind(this)
                );
            }),
            (C.prototype.open = function (options) {
                let {
                    closable,
                    cb,
                    showCloudOptions,
                    openFromCloud,
                    defaultOption,
                    newOrFromTemplate,
                    documentToSave,
                    cancelSaveCallback,
                    defaultFilename,
                    closeCallback,
                    nativeCloud,
                    showExampleFiles,
                } = options;
                ((this._cb = cb || null), (this._closeCallback = closeCallback), (this._openFromCloud = openFromCloud));
                GCommonNames.isOnline();
                var showSidebar = function () {
                        (this._dialog.find(".sidebar").css("display", ""),
                            this._dialog.find(".sidebar-options").find(".option").css("display", ""),
                            this._dialog.find(".sidebar-options").find(".option-separator").css("display", ""),
                            this._dialog.find(".sidebar").find(".footer").css("display", ""),
                            this._dialog.find(".sidebar").find(".version").css("display", ""));
                    }.bind(this),
                    applyOpenOptions = function () {
                        (this._dialog.find(".cloud-option").css("display", showCloudOptions ? "" : "none"),
                            this._dialog.find(".option.start-option").trigger("click"),
                            this._dialog.find(".frame").removeClass("cloud-frame"),
                            this._dialog.find(".g-dialog-content").removeClass("cloud-dialog"),
                            this._dialog.parent().removeClass("cloud-files-dialog"),
                            showCloudOptions &&
                                openFromCloud &&
                                (this._dialog.find(".sidebar").css("display", "none"),
                                this._dialog.addClass("cloud-dialog"),
                                this._dialog.parent().addClass("cloud-files-dialog"),
                                this._dialog.find(".frame").addClass("cloud-frame"),
                                this._dialog.find(".cloud-option").trigger("click", [documentToSave, cancelSaveCallback, defaultFilename, nativeCloud, showExampleFiles])),
                            defaultOption && this._dialog.find("." + defaultOption).trigger("click"));
                    }.bind(this);
                (this._dialog.gDialog("open", closable),
                    showSidebar(),
                    applyOpenOptions(),
                    this._updateUI(),
                    this._closeCallbackListeners.push(() => {
                        gDesigner.removeEventListener(GLicenseChangedEvent, this._licenseChangedEvent, this);
                    }),
                    gDesigner.addEventListener(GLicenseChangedEvent, this._licenseChangedEvent, this));
            }),
            (C.prototype.saveCloudFile = function (documentToSave, cancelSaveCallback, defaultFilename, readyStateChange, nativeCloud) {
                let openOptions = {
                    closable: true,
                    showCloudOptions: true,
                    openFromCloud: true,
                    cancelSaveCallback: cancelSaveCallback,
                    documentToSave: documentToSave,
                    defaultFilename: defaultFilename,
                    nativeCloud: nativeCloud,
                };
                ((this.readyStateChange = readyStateChange), this.open(openOptions));
            }),
            (C.prototype.isOpen = function () {
                return this._dialog.gDialog("isOpen");
            }),
            (C.prototype.close = function () {
                return (this._dialog.parent().removeClass("cloud-files-dialog"), this._dialog.gDialog("close", false, 0), (0, Utils.sleep)(0));
            }),
            (C.prototype._newDocumentFromPreset = async function (preset, layoutIndex, displayName) {
                var frameElement = this._dialog.find(".frame"),
                    layout = preset.layouts[layoutIndex];
                if (
                    (gDesigner.stats(
                        "newdocumentdialog_new_document-from-preset",
                        displayName || (layout.localeClass ? GObject.GLocale.get(layout.localeClass, null, GObject.GLocaleLanguage.English) : layout.name),
                        false,
                        true
                    ),
                    gDesigner.getAmplitudeHelper().logEvent(designerConfig.AmplitudeData.Events.DOCUMENT_CREATED, {
                        DOCUMENT_CATEGORY: preset.nameEn,
                        DOCUMENT_TYPE: this._getLayoutDisplayName(layout),
                        DOCUMENT_TEMPLATE_ID: preset.id,
                    }),
                    layout.template)
                )
                    try {
                        frameElement.addClass("loading");
                        var newDoc = new GDocument(),
                            presetTemplateResponse = await designerConfig.gApi.getPresetTemplate({ type: layout.template });
                        (frameElement.removeClass("loading"),
                            gDesigner.addDocument(newDoc),
                            newDoc.setDocumentFromTemplate(true),
                            newDoc.loadFromData(presetTemplateResponse.data),
                            this.close(),
                            this._cb && this._cb());
                    } catch (e) {
                        (frameElement.hasClass("loading") && frameElement.removeClass("loading"), this._newDocument(layout.width, layout.height, layout.unit, layout.dpi));
                    }
                else this._newDocument(layout.width, layout.height, layout.unit, layout.dpi);
            }),
            (C.prototype._newDocumentCustomSize = function () {
                (gDesigner.stats("newdocumentdialog_new_custom-sized"),
                    gDesigner.getAmplitudeHelper().logEvent(designerConfig.AmplitudeData.Events.DOCUMENT_CREATED, {
                        DOCUMENT_CATEGORY: "Blank",
                        DOCUMENT_TYPE: "Blank",
                    }));
                var customSizeElement = this._dialog.find(".preset.custom-size"),
                    widthValue = customSizeElement.find('[name="width"]').gInputBox("value"),
                    heightValue = customSizeElement.find('[name="height"]').gInputBox("value"),
                    unitValue = customSizeElement.find('[name="unit"]').val(),
                    widthEmpty = "" === widthValue,
                    heightEmpty = "" === heightValue,
                    widthNumber = widthEmpty ? 0 : parseInt(widthValue),
                    heightNumber = heightEmpty ? 0 : parseInt(heightValue);
                isNaN(widthNumber) || isNaN(heightNumber) || !unitValue || (!widthNumber && !widthEmpty) || (!heightNumber && !heightEmpty) || this._newDocument(widthValue, heightValue, unitValue);
            }),
            (C.prototype._newDocument = function (width, height, unit, dpi) {
                var scene = gDesigner.createScene();
                (scene.setProperties(["ut", "dpi"], [unit, dpi || GObject.GLength.DPI]),
                    scene
                        .getActivePage()
                        .setProperties(
                            ["bck", "w", "h"],
                            [GObject.GRGBColor.WHITE, new GObject.GLength(width, unit).toPoint(), new GObject.GLength(height, unit).toPoint()]
                        ),
                    gDesigner.addDocument(new GDocument(scene)),
                    this.close(),
                    this._cb && this._cb());
            }),
            (C.prototype._openDocument = function () {
                gDesigner.executeAction(gDesigner.getAction(GSafariOpenAction.ID).isAvailable() ? GSafariOpenAction.ID : GOpenAction.ID, [null, this.close.bind(this)], void 0, true);
            }),
            (C.prototype._getLayoutFormattedSize = function (layout) {
                var layoutVariants = layout.includes,
                    formattedSize = "";
                if (layoutVariants) {
                    for (var sizeParts = [], i = 0, length = layoutVariants.length; i < length; i++) {
                        var r = layoutVariants[i];
                        sizeParts.push(r.width + "x" + r.height);
                    }
                    formattedSize = sizeParts.join(", ") + " " + layout.unit;
                } else formattedSize = layout.width + "x" + layout.height + " " + layout.unit;
                return formattedSize;
            }),
            (C.prototype._getLayoutDisplayName = function (layout) {
                return layout.name + " (" + this._getLayoutFormattedSize(layout) + ")";
            }),
            (C.prototype._showPresetDropdown = function (event, preset) {
                event.stopPropagation();
                var presetNameElement = $(event.target).closest(".preset").find(".name"),
                    dropdownListElement = $("<ul/>");
                (preset.layouts.forEach((layout, layoutIndex) => {
                    var layoutListItem = $("<li/>")
                        .attr("data-value", layoutIndex)
                        .text(this._getLayoutDisplayName(layout))
                        .on("click", (event) => {
                            dropdownListElement.gOverlay("close");
                            var selectedLayoutIndex = parseInt($(event.target).attr("data-value")),
                                displayName = "";
                            ((displayName = preset.localeClass ? GObject.GLocale.get(preset.localeClass, null, GObject.GLocaleLanguage.English) : preset.name || ""),
                                (displayName = preset.layouts[selectedLayoutIndex].localeClass
                                    ? displayName + "/" + GObject.GLocale.get(preset.layouts[selectedLayoutIndex].localeClass, null, GObject.GLocaleLanguage.English)
                                    : displayName + "/" + preset.layouts[selectedLayoutIndex].name),
                                "undefined" != typeof gDesigner && gDesigner.stats("newdocumentdialog_change_preset", displayName),
                                this._newDocumentFromPreset(preset, selectedLayoutIndex, displayName));
                        });
                    dropdownListElement.append(layoutListItem);
                }),
                    dropdownListElement.gOverlay({ clazz: "preset-select", padding: false, offsetY: 10 }),
                    dropdownListElement.gOverlay("open", presetNameElement));
            }),
            (C.prototype._isSpectatorMode = function () {
                return false;
            }),
            (module.exports = C));
    };
