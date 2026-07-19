module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(57), require(8 /* Symbol */), require(356 /* polyfill:RegExp */), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(3), require(151), require(34), require(91 /* polyfill:String */), require(4), require(41), require(13), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            designerConfig = require(10),
            brandingConfig = require(357),
            GMenu = _interopRequireDefault(require(238 /* GMenu */)),
            GMenuItem = _interopRequireDefault(require(339 /* GMenuItem */)),
            GMenuBar = _interopRequireDefault(require(1501)),
            GPersonaBar = _interopRequireDefault(require(1502)),
            GWindows = _interopRequireDefault(require(603 /* GWindows */)),
            GDocumentEvent = _interopRequireDefault(require(78)),
            GDocumentStatusEvent = _interopRequireDefault(require(217)),
            DocumentStatus = _interopRequireDefault(require(86)),
            GCommonNames = _interopRequireDefault(require(119 /* GCommonNames */)),
            GSaveAction = _interopRequireDefault(require(447 /* GSaveAction */)),
            GGravitCloudAction = _interopRequireDefault(require(448 /* GGravitCloudAction */)),
            GExportAction = _interopRequireDefault(require(861 /* GExportAction */)),
            GOpenSharedFileAction = _interopRequireDefault(require(1254 /* GOpenSharedFileAction */)),
            GVersionsHistoryAction = _interopRequireDefault(require(1256 /* GVersionsHistoryAction */)),
            GExternalStorage = _interopRequireDefault(require(388 /* GExternalStorage */)),
            GCloudStorage = _interopRequireDefault(require(220 /* GCloudStorage */)),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */)),
            GCloudDriveStorage = _interopRequireDefault(require(862 /* GCloudDrive */)),
            GDriveItem = _interopRequireDefault(require(156 /* CloudFile */)),
            GDocument = _interopRequireDefault(require(163 /* GDocument */)),
            GRegex = require(263),
            tabsRearrangeUtil = require(1517);
        const cssClasses = require(257);
        let GLicenseChangeEvent = null;
        designerConfig.LICENSE.UPGRADEABLE && (GLicenseChangeEvent = require(441));
        const GSettingChangedEvent = require(135),
            GApplicationStateChangedEvent = require(392),
            GUserPropertiesChangedEvent = require(805),
            {
                InParenthesis: { NotNegativeNumberInTheEnd },
                NotNegativeNumber,
            } = GRegex.GRegex.String,
            contextMenuItems = [
                {
                    title: new GObject.GLocaleKey("GFilesPanel", "action.rename"),
                    shortcut: null,
                    callback: function (win, tabElement) {
                        const self = this,
                            document = win.getDocument(),
                            storageItem = document.getStorageItem();
                        let canRename = true;
                        if ((storageItem && (canRename = !(storageItem instanceof GExternalStorage.default.Item)), !canRename)) return false;
                        const showRenameInput = () => {
                            const inputElement = tabElement.find("input"),
                                currentTitle = win.getTitle();
                            let displayTitle = currentTitle;
                            (storageItem && designerConfig.USE_EXTENSION_IN_FILENAME && (displayTitle += "." + storageItem.getExtension().toLowerCase()),
                                inputElement.off("focusout"),
                                inputElement.off("keypress"));
                            var coverElement = tabElement.find("span.cover");
                            (coverElement.text(displayTitle), inputElement.css("width", coverElement.outerWidth()), inputElement.val(currentTitle));
                            var originalValue = inputElement.val(),
                                submitted = false;
                            (inputElement.show(), coverElement.hide(), inputElement.focus());
                            var submitRename = async function () {
                                try {
                                    (inputElement.hide(), coverElement.show());
                                    let finalTitle,
                                        newTitle = inputElement.val().trim();
                                    if (newTitle && newTitle !== currentTitle)
                                        if (storageItem) {
                                            if (
                                                (self._updateSyncStatus(
                                                    tabElement,
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.synchronizing")) + "...",
                                                    true
                                                ),
                                                storageItem instanceof GCloudStorage.default.Item)
                                            ) {
                                                let file = storageItem.getFile();
                                                const cloudStorage = new GCloudDriveStorage.default();
                                                try {
                                                    let o = 0;
                                                    if (cloudStorage.supportsSaveCollisionFlow()) {
                                                        if (
                                                            (file.ext || (file.ext = designerConfig.FILE_FORMATS.find((format) => format.default).ext.toUpperCase()),
                                                            (await cloudStorage.fileExists(newTitle, file.ext, file.parent || cloudStorage.getRootFolder())) &&
                                                                !(await ((filename) => {
                                                                    let message;
                                                                    return (
                                                                        (message = GObject.GLocale.get(
                                                                            new GObject.GLocaleKey(
                                                                                "GFilesPanel",
                                                                                "text.file-already-exists-on-current-location"
                                                                            )
                                                                        ).replace("%filename", '"'.concat(filename, '"'))),
                                                                        new Promise((resolve) => {
                                                                            GSystemDialog.default.confirm(message, (confirmed) => resolve(!!confirmed), null, null, false, true, true);
                                                                        })
                                                                    );
                                                                })(newTitle)))
                                                        )
                                                            return (self._updateSyncStatus(tabElement, ""), showRenameInput());
                                                        if (cloudStorage.requiresOverwriteCollisionHandling())
                                                            for (finalTitle = newTitle; await cloudStorage.fileExists(finalTitle, file.ext, file.parent || cloudStorage.getRootFolder()); )
                                                                finalTitle = "".concat(newTitle, " (").concat(++o, ")");
                                                    }
                                                    (finalTitle || (finalTitle = newTitle), await cloudStorage.renameItem(file, finalTitle));
                                                } catch (e) {
                                                    return (
                                                        console.log(">>>.error-renaming e", e),
                                                        inputElement.val(originalValue),
                                                        self._updateSyncStatus(
                                                            tabElement,
                                                            GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.failed-to-synch")),
                                                            false,
                                                            false,
                                                            true,
                                                            document.isCloudFile()
                                                        ),
                                                        void GSystemDialog.default.alert(
                                                            GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-renaming"))
                                                        )
                                                    );
                                                }
                                                file.name = finalTitle;
                                            } else finalTitle = newTitle;
                                            (document.setTitle(finalTitle),
                                                storageItem.setFileName(finalTitle),
                                                gDesigner.trigger(new GDocumentEvent.default(GDocumentEvent.default.Type.Modified, document)),
                                                self._updateSyncStatus(tabElement, ""),
                                                coverElement.text(finalTitle + (designerConfig.USE_EXTENSION_IN_FILENAME ? "." + storageItem.getExtension().toLowerCase() : "")),
                                                inputElement.css("width", coverElement.outerWidth()));
                                        } else win.getDocument().setTitle(newTitle);
                                    else inputElement.val(originalValue);
                                } catch (e) {
                                    throw e;
                                }
                            };
                            inputElement.on("focusout", function () {
                                submitted || (submitRename(), (submitted = true));
                            }).on("keypress", function (event) {
                                13 !== event.which || submitted || (submitRename(), (submitted = true));
                            });
                        };
                        return (showRenameInput(), true);
                    },
                    stats: "header_contextmenu_rename",
                    requiresPro: false,
                    isEnabled: () => gDesigner.getApplicationManager().isEditingEnabled(),
                    isVisible: (win) => {
                        const storageItem = win.getDocument().getStorageItem();
                        return !(storageItem && storageItem instanceof GExternalStorage.default.Item);
                    },
                },
                {
                    separator: true,
                    isVisible: (win) => {
                        const storageItem = win.getDocument().getStorageItem();
                        return !(storageItem && storageItem instanceof GExternalStorage.default.Item);
                    },
                },
                {
                    title: GSaveAction.default.TITLE,
                    shortcut: GSaveAction.default.SHORTCUT,
                    id: GSaveAction.default.ID,
                    needsAction: true,
                    stats: "header_contextmenu_save",
                    icon: () => gDesigner.getAction(GSaveAction.default.ID).getIcon(),
                    requiresPro: false,
                },
                {
                    title: new GObject.GLocaleKey("GSaveAsAction", "title"),
                    shortcut: [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "S"],
                    id: () => "".concat(GGravitCloudAction.default.ID, ".").concat(GGravitCloudAction.default.Actions.SaveAs),
                    needsAction: true,
                    requiresPro: false,
                },
                { separator: true },
                {
                    title: new GObject.GLocaleKey("GToolbar", "text.share"),
                    shortcut: null,
                    callback: function () {
                        gDesigner.getShareManager().share();
                    },
                    stats: "header_contextmenu_share",
                    isEnabled: (win) => {
                        const storageItem = win.getDocument().getStorageItem();
                        return gDesigner.getApplicationManager().isShareEnabled() && storageItem instanceof GCloudStorage.default.Item;
                    },
                    requiresPro: false,
                },
                {
                    title: new GObject.GLocaleKey("GOpenSharedFileAction", "title"),
                    stats: "header_contextmenu_open-shared-file",
                    id: () => GOpenSharedFileAction.default.ID,
                    needsAction: true,
                    requiresPro: false,
                },
                {
                    title: new GObject.GLocaleKey("GVersionsHistoryAction", "title"),
                    shortcut: null,
                    stats: "header_contextmenu_version-history",
                    icon: () => gDesigner.getAction(GVersionsHistoryAction.default.ID).getIcon(),
                    id: GVersionsHistoryAction.default.ID,
                    needsAction: true,
                    requiresPro: true,
                },
                {
                    title: GExportAction.default.TITLE,
                    shortcut: GExportAction.default.SHORTCUT,
                    stats: "header_contextmenu_advanced-export",
                    icon: () => gDesigner.getAction(GExportAction.default.ID).getGroupIcon(),
                    id: GExportAction.default.ID,
                    needsAction: true,
                    requiresPro: true,
                },
                {
                    title: new GObject.GLocaleKey("GHeader", "action.context-menu.duplicate"),
                    shortcut: null,
                    callback: function (win) {
                        const document = win.getDocument(),
                            storageItem = document.getStorageItem(),
                            duplicateLocalDocument = () => {
                                const scene = document.getScene(),
                                    newDocument = new GDocument.default(scene.clone(null, gDesigner.getWorkspace()));
                                document.getFileFormatVersion() && newDocument.setFileFormatVersion(document.getFileFormatVersion());
                                const title = document.getTitle();
                                let newTitle;
                                if (new RegExp(NotNegativeNumberInTheEnd).test(title)) {
                                    const match = title.match(NotNegativeNumberInTheEnd),
                                        number = parseInt(match[0].match(NotNegativeNumber)[0]);
                                    newTitle = title.replace(NotNegativeNumberInTheEnd, "(".concat(number + 1, ")"));
                                } else newTitle = "".concat(title, "(1)");
                                const index = gDesigner.getDocuments().indexOf(document);
                                (newDocument.setTitle(newTitle), gDesigner.addDocument(newDocument, index + 1));
                            };
                        storageItem && storageItem instanceof GCloudStorage.default.Item
                            ? (() => {
                                  const parentFolder = storageItem.getFile().parent,
                                      index = gDesigner.getDocuments().indexOf(document),
                                      cloudStorage = new GCloudDriveStorage.default();
                                  (cloudStorage.setCurrentFolder(GDriveItem.default.from({ id: parentFolder })),
                                      cloudStorage.copyPaste([storageItem.getFile()]).then(function (results) {
                                          let [{ id }] = results;
                                          return cloudStorage.openFile(id, index + 1);
                                      }));
                              })()
                            : duplicateLocalDocument();
                    },
                    isEnabled: (win) => {
                        if (!gDesigner.getApplicationManager().isSavingAsEnabled()) return false;
                        return !(win.getDocument().getStorageItem() instanceof GExternalStorage.default.Item);
                    },
                    stats: "header_contextmenu_duplicate",
                    icon: "gravit-icon-duplicate",
                    requiresPro: false,
                },
                { separator: true },
                {
                    title: new GObject.GLocaleKey("GHeader", "action.context-menu.close-other"),
                    shortcut: null,
                    callback: function (win) {
                        const otherWindows = gDesigner
                            .getWindows()
                            .getWindows()
                            .slice()
                            .filter((otherWindow) => otherWindow !== win);
                        GSystemDialog.default.confirm(
                            GObject.GLocale.get(new GObject.GLocaleKey("GHeader", "text.close-other-tabs-confirmation")),
                            (confirmed) => {
                                confirmed && closeWindows(otherWindows);
                            },
                            null,
                            null,
                            null,
                            true,
                            true
                        );
                    },
                    isEnabled: (win) =>
                        gDesigner
                            .getWindows()
                            .getWindows()
                            .slice()
                            .filter((otherWindow) => otherWindow !== win).length > 0,
                    stats: "header_contextmenu_close-other",
                    requiresPro: false,
                },
                {
                    title: new GObject.GLocaleKey("GHeader", "action.context-menu.close-all"),
                    shortcut: null,
                    callback: function () {
                        GSystemDialog.default.confirm(
                            GObject.GLocale.get(new GObject.GLocaleKey("GHeader", "text.close-all-tabs-confirmation")),
                            (confirmed) => {
                                confirmed && closeWindows(gDesigner.getWindows().getWindows().slice());
                            },
                            null,
                            null,
                            null,
                            true,
                            true
                        );
                    },
                    stats: "header_contextmenu_close-all",
                    icon: "gravit-icon-close",
                    requiresPro: false,
                },
            ];
        function closeWindows(windows) {
            const windowManager = gDesigner.getWindows();
            for (let n = 0, count = windows.length; n < count; n++) {
                const windowItem = windows[n];
                windowManager.removeWindow(windowItem);
            }
        }
        function GHeader(htmlElement) {
            ((this._htmlElement = htmlElement),
                (this._menuBar = new GMenuBar.default(gDesigner.getMainMenu())),
                (this._menuBar.__which = "menubar"),
                (this._personaBar = new GPersonaBar.default()));
        }
        ((GHeader.prototype._personaBar = null),
            (GHeader.prototype._menuBar = null),
            (GHeader.prototype._windows = null),
            (GHeader.prototype._login = null),
            (GHeader.prototype._busy = null),
            (GHeader.prototype._contextMenu = null),
            (GHeader.prototype.getMenuBar = function () {
                return this._menuBar;
            }),
            (GHeader.prototype.init = function () {
                (brandingConfig.SHOW_BETA_BRANDING &&
                    gDesigner.isBeta() &&
                    $("<div></div>")
                        .css({
                            width: "40px",
                            backgroundColor: "#29d029",
                            color: "#fff",
                            font: '400 1em "Helvetica Neue", Helvetica, Arial, sans-serif',
                            lineHeight: "1.54em",
                            textAlign: "center",
                            borderRadius: "4px",
                            marginLeft: "12px",
                            marginRight: "-5px",
                            padding: "2px",
                        })
                        .text("βETA")
                        .appendTo(this._htmlElement),
                    $("<div></div>").addClass("section menu").append(this._menuBar._htmlElement).appendTo(this._htmlElement),
                    designerConfig.LICENSE.UPGRADEABLE &&
                        gDesigner.getLicense().canUpgrade() &&
                        $("<div></div>")
                            .addClass("section tryout")
                            .append(
                                $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.try-out-coreldrawpp-pro")))
                            )
                            .on("click", () => gDesigner.activateTrialLicense())
                            .appendTo(this._htmlElement),
                    $("<div></div>").addClass("section persona").append(this._personaBar._htmlElement).appendTo(this._htmlElement),
                    (this._windows = $("<div></div>")
                        .addClass("section windows")
                        .append(this._createWindows())
                        .appendTo(this._htmlElement)),
                    designerConfig.ALLOW_REARRANGE_TABS && (0, tabsRearrangeUtil.allowRearrangeTabs)(this._htmlElement),
                    (this._busy = $("<div></div>")
                        .addClass("section busy")
                        .css({ display: "none", color: "$(BRAND_COLOR}" })
                        .append($("<span>").addClass("txt").css({ marginRight: "4px" }))
                        .append(
                            $("<span>").css({
                                border: "4px solid #f3f3f3",
                                borderTop: "4px solid $(BRAND_COLOR}",
                                borderRadius: "50%",
                                width: "6px",
                                height: "6px",
                                animation: "spin 2s linear infinite",
                            })
                        )
                        .appendTo(this._htmlElement)),
                    this._createLoginTab().appendTo(this._htmlElement),
                    this.updateLoginInfo(),
                    this.checkUser(),
                    gDesigner.addEventListener(GDocumentEvent.default, this._documentEvent, this),
                    gDesigner.addEventListener(GSettingChangedEvent, this._settingChangedEvent, this),
                    gDesigner.getWindows().addEventListener(GWindows.default.WindowEvent, this._windowEvent, this),
                    gDesigner.addEventListener(GUserPropertiesChangedEvent, this._userPropertiesChangedEvent, this),
                    gDesigner.addEventListener(GApplicationStateChangedEvent, this._applicationStateChangedEvent, this),
                    $(document).on(
                        "networkAvailable",
                        function () {
                            this.checkUser();
                        }.bind(this)
                    ),
                    designerConfig.LICENSE.UPGRADEABLE && gDesigner.addEventListener(GLicenseChangeEvent, this._licenseChangeEvent, this),
                    (this._documentStatusEvent = this._documentStatusEvent.bind(this)),
                    this._personaBar.init(),
                    this._updateViewBasedOnPermissions());
            }),
            (GHeader.prototype._updateViewBasedOnPermissions = function () {
                const tabManagementEnabled = gDesigner.getApplicationManager().isDocumentTabManagementEnabled();
                (this._windows.find(".tabs").css("display", tabManagementEnabled ? "" : "none"), (0, tabsRearrangeUtil.toggleRearrangeTabsVisibility)(this._htmlElement, tabManagementEnabled));
            }),
            (GHeader.prototype.relayout = function () {
                gDesigner.getApplicationManager().isInspectEnabled()
                    ? this._htmlElement.removeClass("lone")
                    : this._htmlElement.addClass("lone");
            }),
            (GHeader.prototype._licenseChangeEvent = function (event) {
                designerConfig.LICENSE.UPGRADEABLE && (event.license.isDefault() || this._htmlElement.find(".tryout").remove());
            }),
            (GHeader.prototype._documentEvent = function (event) {
                designerConfig.ALLOW_REARRANGE_TABS && (0, tabsRearrangeUtil.updateTabsInterface)();
                var document = event.document || gDesigner.getActiveDocument(),
                    tab = this.getWindowTab(gDesigner.getWindows().getWindow(document)),
                    isStorageItemUpdated = event.type === GDocumentEvent.default.Type.StorageItemUpdated;
                if (isStorageItemUpdated || event.type === GDocumentEvent.default.Type.AutoSaveSynchronized || event.type === GDocumentEvent.default.Type.Modified) {
                    isStorageItemUpdated && this.updateWindowIcon($(".windows").find(".tab.g-active"));
                    for (var windows = event.document.getWindows(), s = 0; s < windows.length; ++s)
                        this._windows.find(".tab").each(function (index, element) {
                            var tabElement = $(element);
                            if (tabElement.data("window") === windows[s])
                                return (
                                    tabElement
                                        .find(".title")
                                        .find(".cover")
                                        .html(windows[s].getTitleWithExtension() + (event.document.isModified() ? "*" : "")),
                                    tabElement
                                        .find(".title")
                                        .find("input")
                                        .val(windows[s].getTitle() + (event.document.isModified() ? "*" : "")),
                                    false
                                );
                        });
                    (event.type !== GDocumentEvent.default.Type.Modified && event.type !== GDocumentEvent.default.Type.AutoSaveSynchronized) ||
                        (this._updateSyncStatus(tab, ""), this.updateWindowIcon(tab, false, true, document));
                } else
                    event.type === GDocumentEvent.default.Type.SynchronismUpdated || event.type === GDocumentEvent.default.Type.AutoSaveSynchronizing
                        ? (document.isSynchronizing() || event.type === GDocumentEvent.default.Type.AutoSaveSynchronizing) &&
                          (this.updateWindowIcon(tab, true, true, document),
                          this._updateSyncStatus(tab, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.synchronizing")) + "...", true))
                        : event.type === GDocumentEvent.default.Type.SynchronismUpdateFailed || event.type === GDocumentEvent.default.Type.AutoSaveSynchronizationFailed
                          ? this._updateSyncStatus(
                                tab,
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.failed-to-synch")),
                                false,
                                false,
                                true,
                                document.isCloudFile()
                            )
                          : event.type === GDocumentEvent.default.Type.Activated
                            ? event.document.addEventListener(GDocumentStatusEvent.default, this._documentStatusEvent)
                            : event.type === GDocumentEvent.default.Type.Deactivated && event.document.removeEventListener(GDocumentStatusEvent.default, this._documentStatusEvent);
            }),
            (GHeader.prototype._documentStatusEvent = function (event) {
                event.status === DocumentStatus.default.Loaded && this.updateWindowIcon($(".windows").find(".tab.g-active"));
            }),
            (GHeader.prototype._settingChangedEvent = function (event) {
                "touch" !== event.key || gDesigner.isTouchEnabled() || this._menuBar.setMenu(gDesigner.getMainMenu());
            }),
            (GHeader.prototype._userPropertiesChangedEvent = function (event) {
                this.updateLoginInfo(event.user);
            }),
            (GHeader.prototype._applicationStateChangedEvent = function () {
                this._updateViewBasedOnPermissions();
            }),
            (GHeader.prototype._windowEvent = function (event) {
                switch (event.type) {
                    case GWindows.default.WindowEvent.Type.Added:
                        this._addWindowTab(event.window, event.index);
                        break;
                    case GWindows.default.WindowEvent.Type.Removed:
                        this._removeWindowTab(event.window);
                        break;
                    case GWindows.default.WindowEvent.Type.Activated:
                    case GWindows.default.WindowEvent.Type.Deactivated:
                        this._updateActiveWindowTab();
                }
            }),
            (GHeader.prototype._addWindowTab = function (win, index) {
                var self = this,
                    tabElement = $("<div></div>").data("window", win).addClass("tab");
                const tabs = this._windows.find(".tabs").find(".tab");
                ("number" == typeof index && index !== tabs.length ? tabElement.insertBefore(tabs.eq(index)) : tabElement.appendTo(this._windows.find(".tabs")),
                    tabElement
                        .append(
                            $("<div />")
                                .addClass("title")
                                .append($("<span />").addClass("cover").html(win.getTitleWithExtension()))
                                .append(
                                    $("<input />")
                                        .attr("type", "text")
                                        .css("display", "none")
                                        .val(win.getTitle())
                                        .css("width", tabElement.find(".cover").outerWidth())
                                )
                        )
                        .on("click", function () {
                            (gDesigner.stats("header_change_tab", win.getTitleWithExtension()),
                                gDesigner.getWindows().activateWindow($(this).data("window"), true));
                        }),
                    tabElement.on("contextmenu", function (event) {
                        (event.stopPropagation(), self.handleContextMenu(win, tabElement));
                    }),
                    gDesigner.getLicense().isGuest() ||
                        tabElement.append(
                            $("<span></span>")
                                .addClass("close")
                                .html("&#x2715;")
                                .on("click", function (event) {
                                    (gDesigner.stats("header_remove_tab"),
                                        event.stopPropagation(),
                                        gDesigner.getWindows().removeWindow($(this).parents(".tab").data("window"), void 0, void 0, true));
                                })
                        ),
                    this.setWindowTabEnable(gDesigner.getLicense().canAccessFreemium()));
            }),
            (GHeader.prototype._createLoginTab = function () {
                // The account service is gone and the app always runs as the
                // local placeholder user, so the avatar's popup ("Account
                // settings" / "Log out") could only offer dead actions. Keep
                // the element (updateLoginInfo and others select it) but never
                // show it.
                var loginElement = $("<div/>")
                    .addClass("section login")
                    .css("display", "none")
                    .append($("<div/>").addClass("avatar"))
                    .append($("<div/>").addClass("username").append($("<span/>")))
                    .on("click", function () {
                        (gDesigner.stats("header_click_login"),
                            "yes" !== $(this).attr("has-been-clicked") &&
                                ($(this).attr("has-been-clicked", "yes"),
                                gDesigner.getUser().then((user) => {
                                    (user && !gDesigner.isAnonymous() ? loginElement.gUserLogin() : GCommonNames.default.performLogin(),
                                        $(this).attr("has-been-clicked", "no"));
                                })));
                    });
                return loginElement;
            }),
            (GHeader.prototype.checkUser = function () {
                return gDesigner.getUser().then((user) => {
                    this.updateLoginInfo(user);
                });
            }),
            (GHeader.prototype.updateLoginInfo = function (user) {
                ($(".login").css("display", "none"),
                    $(".login .username")
                        .find("span")
                        .text(user ? user.getFullUserName() : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.cloud-login"))),
                    user
                        ? user.hasOwnPictureAvatar()
                            ? ($(".login .avatar").css("background-image", 'url("' + user.avatar + '")'),
                              $(".login .avatar").removeClass("gravit-user-bonhomme"),
                              $(".login .avatar").css({ "background-color": "transparent" }),
                              $(".login .avatar").text(""))
                            : $(".login .avatar")
                                  .addClass("gravit-user-bonhomme")
                                  .text(user.getUserNameInitials())
                                  .css({ "background-color": user.getUserColor() })
                        : $(".login .avatar").css("background-image", "none"),
                    $(".login .avatar").removeClass(user ? "header-cloud" : "user-avatar"),
                    $(".login .avatar").addClass(user ? "user-avatar" : "header-cloud"),
                    user ? $(".login").addClass("user") : $(".login").removeClass("user"));
            }),
            (GHeader.prototype._removeWindowTab = function (win) {
                this._windows.find(".tab").each(function (index, element) {
                    var tabElement = $(element);
                    if (tabElement.data("window") === win) return (tabElement.remove(), false);
                });
            }),
            (GHeader.prototype._updateActiveWindowTab = function () {
                this._windows.find(".tab").each(function (index, element) {
                    var tabElement = $(element);
                    tabElement.toggleClass("g-active", tabElement.data("window") === gDesigner.getWindows().getActiveWindow());
                });
            }),
            (GHeader.prototype._createWindows = function () {
                return $("<div></div>").addClass("tabs");
            }),
            (GHeader.prototype.getHeight = function () {
                return this._htmlElement[0].clientHeight;
            }),
            (GHeader.prototype.updateWindowIcon = function (tab, forceShow, animate, document) {
                var cloudIcon = $(tab).find(".header-cloud"),
                    targetDocument = document || gDesigner.getActiveDocument();
                (targetDocument && (targetDocument.isCloudFile() || targetDocument.isExternalFile())) || forceShow
                    ? 0 === cloudIcon.length &&
                      $("<span/>").addClass("header-cloud").addClass(this._getCloudDocumentIconClass(targetDocument)).insertBefore($(tab).find(".close"))
                    : animate && cloudIcon.length > 0
                      ? cloudIcon.fadeOut(2e3, function () {
                            cloudIcon.remove();
                        })
                      : cloudIcon.remove();
            }),
            (GHeader.prototype.showBusyIcon = function (message) {
                (this._busy.find(".txt").text(message), this._busy.css({ display: "inherit" }));
            }),
            (GHeader.prototype.hideBusyIcon = function () {
                this._busy.css({ display: "none" });
            }),
            (GHeader.prototype._updateSyncStatus = function (tab, message, animate, forceAnimate, autoHide, keepCloudIcon) {
                var syncStatusElement = $(tab).find(".sync-status");
                const cloudIconSelector = "." + cssClasses["header-cloud"];
                if (
                    ($(tab).find(cloudIconSelector).length > 0 && (animate ? $(tab).find(cloudIconSelector).addClass("animated") : $(tab).find(cloudIconSelector).removeClass("animated")),
                    forceAnimate && $(tab).find(cloudIconSelector).length > 0 && $(tab).find(cloudIconSelector).addClass("animated"),
                    (syncStatusElement && 0 !== syncStatusElement.length) || $("<span/>").addClass("sync-status").insertAfter($(tab).find(".close")),
                    $(tab).find(".sync-status").text(message),
                    autoHide)
                ) {
                    $(tab)
                        .find(".sync-status")
                        .fadeOut(2e3, function () {
                            $(tab).find(".sync-status").remove();
                        });
                    var cloudIcon = $(tab).find(cloudIconSelector);
                    cloudIcon.length > 0 &&
                        !keepCloudIcon &&
                        cloudIcon.fadeOut(2e3, function () {
                            ($(tab).find(".close").css("margin-left", "0px"), cloudIcon.remove());
                        });
                }
            }),
            (GHeader.prototype.getWindowTab = function (win) {
                for (var tabs = this._windows.find(".tabs").find(".tab"), result = null, o = 0; o < tabs.length; ++o)
                    if ($(tabs[o]).data("window") === win) {
                        result = tabs[o];
                        break;
                    }
                return result;
            }),
            (GHeader.prototype.handleContextMenu = function (win, tabElement) {
                var rightOffset = tabElement.outerWidth() - 10;
                (tabElement.addClass("context-pane-opened"),
                    gDesigner.stats("header_contextmenu_tab", "Contextmenu"),
                    gDesigner.getWindows().activateWindow(win),
                    (this._contextMenu = this._createContextMenu(win, tabElement)),
                    this._contextMenu
                        .gOverlay({
                            padding: false,
                            releaseOnClose: true,
                            clazz: "g-header-context-overlay",
                            bottomClazz: "from-bottom",
                            customRight: rightOffset,
                            offsetY: -13,
                            closeCallback: () => {
                                tabElement.removeClass("context-pane-opened");
                            },
                        })
                        .gOverlay("open", tabElement));
            }),
            (GHeader.prototype._createContextMenu = function (win, tabElement) {
                const menu = new GMenu.default(),
                    self = this;
                return (
                    contextMenuItems.map((item) => {
                        let actionId,
                            menuItem,
                            {
                                title,
                                callback,
                                shortcut,
                                requiresPro,
                                separator,
                                icon,
                                id: id,
                                needsAction,
                                stats,
                                isEnabled,
                                isVisible,
                            } = item;
                        const caption = title instanceof GObject.GLocaleKey ? GObject.GLocale.get(title) : title;
                        if ((id && (actionId = "function" == typeof id ? id() : id), separator)) {
                            const divider = menu.createAddDivider();
                            return (isVisible instanceof Function ? divider.setVisible(isVisible(win)) : "boolean" == typeof isVisible && divider.setVisible(isVisible), divider);
                        }
                        // Tabs context menu: some entries reference actions that are not
                        // registered in this build (e.g. removed cloud actions). Skip them
                        // instead of creating broken items (upstream 8becdac6).
                        if (needsAction && !gDesigner.getAction(actionId)) return;
                        (callback
                            ? (menuItem = menu.createAddItem(caption, () => {
                                  callback.call(self, win, tabElement);
                              }))
                            : ((menuItem = menu.createAddItem(caption)), needsAction && menuItem.setAction(gDesigner.getAction(actionId))),
                            shortcut && menuItem.setShortcutHint(shortcut),
                            requiresPro && menuItem.setPro(requiresPro, actionId),
                            isEnabled instanceof Function && menuItem.setEnabled(isEnabled(win)),
                            isVisible instanceof Function ? menuItem.setVisible(isVisible(win)) : "boolean" == typeof isVisible && menuItem.setVisible(isVisible),
                            icon && ("function" == typeof icon ? menuItem.setIcon(icon()) : menuItem.setIcon(icon)),
                            menuItem.addEventListener(GMenuItem.default.BeforeActivateEvent, () => {
                                (!(function (statsKey) {
                                    statsKey && gDesigner.stats(statsKey);
                                    (self._contextMenu.gOverlay("close"), (self._contextMenu = null), menu.clearItems());
                                })(stats),
                                    isEnabled && menuItem.setEnabled(isEnabled(win)));
                            }),
                            menuItem.setCaption(caption));
                    }),
                    menu.getHtmlElement()
                );
            }),
            (GHeader.prototype._getCloudDocumentIconClass = function (document) {
                var iconClass = "",
                    storageItem = document.getStorageItem();
                switch (storageItem ? storageItem.toString() : null) {
                    case "[Object GGoogleDriveStorage.Item]":
                        iconClass = cssClasses["gravit-icon-googledrive-cloud-file"];
                        break;
                    case "[Object GSharePointStorage.Item]":
                        iconClass = cssClasses["gravit-icon-sharepoint-cloud-file"];
                        break;
                    case "[Object GOneDriveBusinessStorage.Item]":
                        iconClass = cssClasses["gravit-icon-onedrivebusiness-cloud-file"];
                        break;
                    default:
                        iconClass = cssClasses["gravit-icon-cloud"];
                }
                return iconClass;
            }),
            (GHeader.prototype.setWindowTabEnable = function (enabled) {
                $(".tab > span").css("pointer-events", enabled ? "auto" : "none");
            }),
            (module.exports = GHeader));
    };
