module.exports = function (module, exports, require) {
        "use strict";
        require(557);
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */),
            require(19),
            require(168 /* PDFFetchStream */),
            require(596 /* polyfill:Array */),
            require(96 /* polyfill:JSON */),
            require(30 /* polyfill:Object */),
            require(57),
            require(8 /* Symbol */),
            require(20 /* polyfill:RegExp */),
            require(3),
            require(71 /* polyfill:String */),
            require(34),
            require(134 /* polyfill:String */),
            require(4),
            require(41),
            require(13),
            require(32),
            require(38),
            require(169 /* PDFNetworkStream */),
            require(97),
            require(33),
            require(26));
        var GEditor = require(53),
            GObject = require(1),
            GPlatform = require(15),
            designerConfig = require(10),
            themeConfig = require(357),
            GCursorManager = _interopRequireDefault(require(1492)),
            GPersonaModule = require(1246),
            Utils = require(40),
            ExternalFileCheck = require(1247),
            amplitude = (function (e, t) {
                if ("function" == typeof WeakMap)
                    var n = new WeakMap(),
                        o = new WeakMap();
                return (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    var i,
                        a,
                        r = { __proto__: null, default: e };
                    if (null === e || ("object" != typeof e && "function" != typeof e)) return r;
                    if ((i = t ? o : n)) {
                        if (i.has(e)) return i.get(e);
                        i.set(e, r);
                    }
                    for (const t in e)
                        "default" !== t &&
                            {}.hasOwnProperty.call(e, t) &&
                            ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (a.get || a.set)
                                ? i(r, t, a)
                                : (r[t] = e[t]));
                    return r;
                })(e, t);
            })(require(1739 /* lib:amplitude */)),
            EventWaiter = (_interopRequireDefault(require(1249)), _interopRequireDefault(require(1155))),
            GGoogleDriveStorage = _interopRequireDefault(require(556 /* GGoogleDriveStorage */)),
            ExternalFileError = _interopRequireDefault(require(734)),
            Analytics = _interopRequireDefault(require(1494 /* Analytics */)),
            AppUrlHelper = _interopRequireDefault(require(1496)),
            GBanner = _interopRequireDefault(require(1497)),
            GOverlay = _interopRequireDefault(require(1498));
        var GDocument = require(163),
            GMenu = require(238),
            GMenuItem = require(339),
            MenuOpenEvent = require(804),
            GHeader = require(1500),
            GFooter = require(1521),
            GInfo = require(1522),
            GOutlineSidebar = require(1260),
            GInspectorSidebar = require(864),
            GAnnotationsSidebar = require(567),
            GPanels = require(1539),
            GSidebars = require(395);
        require(1540);
        var GToolbar = require(1541),
            GWindows = require(603),
            Parts = require(863),
            GDimensionProperties = require(1294),
            SettingChangedEvent = require(135),
            SwatchesChangedEvent = require(1151),
            DocumentEvent = require(78),
            GNewWindowAction = require(1296),
            GInstallToDesktopAction = require(1172),
            GToggleSidebarAction = require(1170),
            GOutlineViewAction = require(1297),
            FontProviderRegistry = (require(1298 /* GUseCouponAction */), require(255 /* FontsProviderManager */)),
            DefaultFontsProvider = require(590),
            GNewDocumentDialog = require(1544),
            GUserNameConfigDialog = require(1560),
            GInstallPwaDialog = require(1562),
            GContextMenu = require(1303);
        require(1563 /* GContextMenuTouch */);
        var GCommonNames = require(119),
            GCloudStorage = require(220),
            GContainer = require(85),
            GSystemDialog = require(44),
            GAutoSave = require(1276),
            GAmplitudeAnalyticsTracker = require(1564),
            PersonaChangedEvent = require(1250),
            GNetworkAvailabilityChangedEvent = require(291),
            GPaste = require(1313),
            GEmbeddedLogin = require(860),
            LicenseChangedEvent = require(441),
            UserLoggedEvent = require(292),
            UserPropertiesChangedEvent = require(805),
            NotificationEvent = require(1321),
            ApplicationStateChangedEvent = require(392),
            ShareEvent = require(868),
            GShareManager = require(1322),
            GCloudCommunicationManager = require(1568),
            GApplicationManager = require(1569),
            GRealtimeManager = require(1571),
            GFileReviewManager = require(1165),
            GAnnotationsManager = require(1572),
            LicenseFactory = require(846),
            LicenseChecker = require(337),
            reminderManager = require(1325),
            UserCache = require(785),
            GOfflineDialog = require(256),
            GProfileDialog = require(604),
            SubscriptionOffer = require(1326),
            PaintModeChangedEvent = require(1328),
            GApplicationStatusEvent = require(808),
            PwaUpdateEvents = require(1188),
            GSaveAction = require(447),
            DocumentStatus = require(86),
            CopyConfig = (require(18 /* GCategory */), require(442));
        const {
            defaultLegacyUserSettings: { features },
        } = designerConfig.defaultUserSettings;
        var config = require(10 /* designerConfig */);
        const { gApi } = config;
        var GExternalStorage = require(388),
            CDRIntegration = require(1580);
        const DocumentTouchHandler = require(1581),
            EditorTouchHandler = require(1584);
        var AssistantBar = require(1587);
        require(607);
        const Utilities = require(40 /* Utils */),
            GUser = require(177),
            GtmBridge = require(1338),
            PwaInstallSupport = require(1173),
            SetPasswordFlow = (require(1591), require(1592)),
            ResetPasswordFlow = require(1593),
            PasswordlessTokenFlow = require(1594);
        var Mousetrap = require(1595 /* lib:mousetrap */);
        (require(1596), Mousetrap.addKeycodes({ 173: "-" }), Mousetrap.addKeycodes({ 187: "=" }), Mousetrap.addKeycodes({ 61: "=" }));
        var cachedOfflineState,
            lastStatsHash,
            lastOfflineCheckTime = 0,
            offlineCheckTimeoutId = null;
        function GDesigner() {
            ((this._settings = {}),
                (this._settingsLoaded = false),
                (this._swatches = {}),
                (this._workspace = new GEditor.GEditorWorkspace()),
                (this._documents = []),
                (this._actions = []),
                (this._actionsMap = {}),
                (this._clipboardMimeTypes = {}),
                (this._license = void 0),
                (this._reloading = false),
                (this._mainMenu = new GMenu()),
                (this._enabledSubscriptions = false),
                (this._documentTouchHandler = new DocumentTouchHandler(document)),
                (this._editorTouchHandler = new EditorTouchHandler()),
                GCloudCommunicationManager.clearSingleton(),
                (this._cloudCommunicationManager = new GCloudCommunicationManager(this)),
                (this._cursorManager = new GCursorManager.default()),
                document.addEventListener("gesturechange", function (e) {
                    e.stopPropagation();
                }),
                window.addEventListener(
                    "dragover",
                    (e) => {
                        e.preventDefault();
                    },
                    false
                ),
                window.addEventListener(
                    "drop",
                    (e) => {
                        e.preventDefault();
                        var t = this.getWindows().getActiveWindow(),
                            n = t && t.getView();
                        n && n.handleDropEvent(e);
                    },
                    false
                ),
                window.addEventListener(
                    "wheel",
                    (e) => {
                        (GPlatform.GPlatform.modifiers.ctrlKey || GPlatform.GPlatform.modifiers.metaKey) && e.preventDefault();
                    },
                    { passive: false }
                ),
                window.addEventListener("gesturestart", (e) => {
                    e.preventDefault();
                }),
                window.addEventListener("gestureend", (e) => {
                    e.preventDefault();
                }),
                window.addEventListener("gesturechange", (e) => {
                    e.preventDefault();
                    var t = e.scale;
                    t > 1 ? (t *= -1) : (t = 2 - t);
                    var n = new WheelEvent("wheel", {
                            deltaY: t,
                            clientX: e.clientX,
                            clientY: e.clientY,
                            ctrlKey: true,
                        }),
                        o = this.getWindows() && this.getWindows().getActiveWindow(),
                        i = o && o.getView() && o.getView()._htmlElement;
                    i && i.dispatchEvent(n);
                }),
                document.addEventListener(
                    "keydown",
                    function (e) {
                        if (
                            (document.activeElement &&
                                $(document.activeElement).is(":button") &&
                                (13 == e.keyCode || 32 == e.keyCode) &&
                                (e.preventDefault(), document.activeElement.blur()),
                            this._windows)
                        ) {
                            var t = document.activeElement,
                                n = this._windows.getActiveWindow(),
                                o =
                                    $(t).is("input") &&
                                    "number" === $(t).attr("type") &&
                                    !$(t).hasClass("g-disabled") &&
                                    "true" !== $(t).attr("disabled");
                            !n || !n.getView() || (t && ($(t).is(":editable") || o)) || n.getView().focus();
                        }
                    }.bind(this),
                    false
                ),
                document.addEventListener(
                    "contextmenu",
                    function (e) {
                        return !$(e.target).is(":editable") || this.propertyPanelHasContextMenu(e)
                            ? (e.preventDefault(), false)
                            : (e.stopPropagation(), true);
                    }.bind(this),
                    true
                ),
                this._workspace.addEventListener(GObject.GWorkspace.ResolveUrlEvent, this._workspaceResolveUrlEvent, this),
                this.addEventListener(DocumentEvent, this._documentEvent, this),
                this.addEventListener(SettingChangedEvent, this._settingChangedEvent, this),
                this.addEventListener(UserLoggedEvent, this._userLoggedEvent, this),
                this.addEventListener(UserPropertiesChangedEvent, this._userPropertiesChangedEvent, this),
                this.addEventListener(LicenseChangedEvent, this._licenseChangedEvent, this),
                this.addEventListener(PwaUpdateEvents.BeforeInstallUpdate, this._beforeInstallUpdate, this),
                this.addEventListener(GApplicationStatusEvent, this._applicationStatusEvent, this),
                this.addEventListener(ApplicationStateChangedEvent, this._applicationStateChangedEvent, this),
                this.addEventListener(ShareEvent, this._shareEvent, this),
                (this._settings.theme = "light"),
                (this._settings.snap_disabled = false),
                (this._settings.snap_zones = false),
                (this._settings.snap_guides = [
                    GEditor.GGuideLinesGuide.ID,
                    GEditor.GFullPixelsGuide.ID,
                    GEditor.GPointsGuide.ID,
                    GEditor.GBBoxGuide.ID,
                    GEditor.GPageGuide.ID,
                    GEditor.GGridGuide.ID,
                ]),
                (this._settings.rulers_visible = false),
                (this._settings.guide_lines_visible = true),
                (this._settings.symbol_labels_visible = true),
                (this._settings.grid_visible = true),
                (this._settings.page_labels_visible = true),
                (this._settings.highlight_on_hover = true),
                (this._settings.invert_selection = false),
                (this._settings.auto_expand_layers = true),
                (this._settings.system_fonts_enabled = true),
                (this._settings.symbols_panel_shown = false),
                (this._settings.decimals_num = null),
                (this._settings.enable_steps_debug = false),
                (this._settings.enable_cache = "function" == typeof gdb_loaddesign),
                (this._settings.ui_toolbar_alignment = true),
                (this._settings.eps_outline_fonts = true),
                (this._settings[GAutoSave.AUTO_SAVE_SETTING] = false),
                (this._settings[GAutoSave.AUTO_SAVE_INTERVAL_SETTING] = designerConfig.AUTOSAVE_INTERVAL_DEFAULT),
                (this._settings.notifications_disabled = false),
                (this._settings.touch = false),
                (this._settings[GSidebars.getSettingNameForSidebar(GSidebars.Orientation.Left)] = true),
                (this._settings[GSidebars.getSettingNameForSidebar(GSidebars.Orientation.Right)] = true),
                $(document).on("networkAvailable", () => {
                    this._initialized && gDesigner.updateRecentDocumentsAction();
                }),
                (this._paste = new GPaste()));
            const e = (e) => {
                this.hasEventListeners(GNetworkAvailabilityChangedEvent) && this.trigger(new GNetworkAvailabilityChangedEvent(e));
            };
            ($(window).on("online", () => e(true)),
                $(window).on("offline", () => {
                    ("undefined" != typeof dataLayer && dataLayer.push({ event: "NETWORK_DISCONNECTED_EVENT" }), e(false));
                }));
        }
        (GObject.GObject.inherit(GDesigner, GObject.GEventTarget),
            (GDesigner.prototype._documentTouchHandler = null),
            (GDesigner.prototype._editorTouchHandler = null),
            (GDesigner.prototype._persona = GPersonaModule.GPersona.GraphicDesign),
            (GDesigner.prototype._paymentFlow = null),
            (GDesigner.prototype._license = void 0),
            (GDesigner.prototype._translationManager = void 0),
            (GDesigner.prototype._initialized = false),
            (GDesigner.prototype._ready = false),
            (GDesigner.prototype._settings = null),
            (GDesigner.prototype._settingsLoaded = false),
            (GDesigner.prototype._softwareUpdateManager = null),
            (GDesigner.prototype._swatches = null),
            (GDesigner.prototype._workspace = null),
            (GDesigner.prototype._CDRIntegrationEngine = null),
            (GDesigner.prototype._documents = null),
            (GDesigner.prototype._activeDocument = null),
            (GDesigner.prototype._mainframe = null),
            (GDesigner.prototype._frame = null),
            (GDesigner.prototype._info = null),
            (GDesigner.prototype._footer = null),
            (GDesigner.prototype._header = null),
            (GDesigner.prototype._toolbar = null),
            (GDesigner.prototype._panels = null),
            (GDesigner.prototype._leftSidebars = null),
            (GDesigner.prototype._rightSidebars = null),
            (GDesigner.prototype._windows = null),
            (GDesigner.prototype._actions = null),
            (GDesigner.prototype._actionsMap = null),
            (GDesigner.prototype._clipboardMimeTypes = null),
            (GDesigner.prototype._newDocumentDialog = null),
            (GDesigner.prototype._userNameConfigDialog = null),
            (GDesigner.prototype._contextMenu = null),
            (GDesigner.prototype._stylesPreview = {}),
            (GDesigner.prototype._version = null),
            (GDesigner.prototype._commitSHA = null),
            (GDesigner.prototype._buildNum = null),
            (GDesigner.prototype._isBeta = null),
            (GDesigner.prototype._storeVendor = null),
            (GDesigner.prototype._env = null),
            (GDesigner.prototype._user = null),
            (GDesigner.prototype._fontsPath = null),
            (GDesigner.prototype._paste = null),
            (GDesigner.prototype._enabledSubscriptions = false),
            (GDesigner.prototype._reloading = false),
            (GDesigner.prototype._utm = null),
            (GDesigner.prototype._location = null),
            (GDesigner.prototype._supportedBrowsers = []),
            (GDesigner.prototype._supportedTabletBrowsers = []),
            (GDesigner.prototype._isBrowserSupported = true),
            (GDesigner.prototype._showCreateAccount = false),
            (GDesigner.prototype._signupOptions = null),
            (GDesigner.prototype._enterpriseLoginForm = false),
            (GDesigner.prototype._anonymous = false),
            (GDesigner.prototype._assistantBar = null),
            (GDesigner.prototype._mainMenu = null),
            (GDesigner.prototype._mouseOverContext = {
                context: null,
                prevEvt: null,
                contextCallback: null,
            }),
            (GDesigner.prototype._realtimeManager = null),
            (GDesigner.prototype._fileReviewManager = null),
            (GDesigner.prototype._shareManager = null),
            (GDesigner.prototype._cloudCommunicationManager = null),
            (GDesigner.prototype._annotationsManager = null),
            (GDesigner.prototype._cursorManager = null),
            (GDesigner.prototype._draggableItemIsDragging = false),
            (GDesigner.prototype._amplitudeHelper = null),
            (GDesigner.prototype._banner = null),
            (GDesigner.prototype._overlay = null),
            (GDesigner.prototype.getOverlay = function () {
                return this._overlay;
            }),
            (GDesigner.prototype.getBanner = function () {
                return this._banner;
            }),
            (GDesigner.prototype.getMainMenu = function () {
                return this._mainMenu;
            }),
            (GDesigner.prototype.propertyPanelHasContextMenu = function (event) {
                var hasContextMenu = false;
                return (
                    event.composedPath &&
                        event.composedPath() &&
                        event.path.forEach((pathElement) => {
                            $(pathElement).hasClass("properties-panel") && (hasContextMenu = !!$(pathElement).data("contextmenu"));
                        }),
                    hasContextMenu
                );
            }),
            (GDesigner.prototype.getMouseOverContext = function () {
                return this._mouseOverContext;
            }),
            (GDesigner.prototype.setMouseOverContext = function (context, prevEvent, contextCallback) {
                this._mouseOverContext = { context: context, prevEvt: prevEvent, contextCallback: contextCallback };
            }),
            (GDesigner.prototype._pwaEvent = window.__pwaEvent__ || null),
            (GDesigner.prototype.isAnonymous = function () {
                return this._anonymous;
            }),
            (GDesigner.prototype.toggleLoading = function (loading) {
                loading ? $("body").addClass("g-loading") : $("body").removeClass("g-loading");
            }),
            (GDesigner.prototype.setSupportedBrowsers = function (browsers) {
                this._supportedBrowsers = browsers;
            }),
            (GDesigner.prototype.setSupportedTabletBrowsers = function (browsers) {
                this._supportedTabletBrowsers = browsers;
            }),
            (GDesigner.prototype._initBrowserSupported = function (platform) {
                var t = (t) =>
                    t.some((t) => (t instanceof Object ? GObject.GSystem.operatingSystem == t.operatingSystem && platform == t.platform : platform === t));
                GObject.GSystem.hardware === GObject.GSystem.Hardware.Tablet
                    ? (this._isBrowserSupported = t(this._supportedTabletBrowsers))
                    : GObject.GSystem.hardware == GObject.GSystem.Hardware.Desktop
                      ? (this._isBrowserSupported = t(this._supportedBrowsers))
                      : (this._isBrowserSupported = false);
            }),
            (GDesigner.prototype.isBrowserSupported = function () {
                return gContainer.getRuntime() === GContainer.Runtime.IPad || this._isBrowserSupported;
            }),
            (GDesigner.prototype.setUTM = function (utm) {
                this._utm = utm;
            }),
            (GDesigner.prototype.getUTM = function () {
                return this._utm;
            }),
            (GDesigner.prototype.getTranslationManager = function () {
                return this._translationManager;
            }),
            (GDesigner.prototype.activatePersona = function (persona) {
                var previousPersona = this._persona;
                previousPersona !== persona && ((this._persona = persona), this.hasEventListeners(PersonaChangedEvent) && this.trigger(new PersonaChangedEvent(previousPersona, this._persona)));
            }),
            (GDesigner.prototype.getActivePersona = function () {
                return this._persona;
            }),
            (GDesigner.prototype.getDefaultStorage = function () {
                return gContainer.getStorage();
            }),
            (GDesigner.prototype.getWorkspace = function () {
                return this._workspace;
            }),
            (GDesigner.prototype.getCDRIntegrationEngine = function () {
                return this._CDRIntegrationEngine;
            }),
            (GDesigner.prototype.getApplicationManager = function () {
                return this._applicationManager;
            }),
            (GDesigner.prototype.getSoftwareUpdateManager = function () {
                return this._softwareUpdateManager;
            }),
            (GDesigner.prototype.getShareManager = function () {
                return this._shareManager;
            }),
            (GDesigner.prototype.getCloudCommunicationManager = function () {
                return this._cloudCommunicationManager;
            }),
            (GDesigner.prototype.getAnnotationsManager = function () {
                return this._annotationsManager;
            }),
            (GDesigner.prototype.getCursorManager = function () {
                return this._cursorManager;
            }),
            (GDesigner.prototype.getRealtimeManager = function () {
                return this._realtimeManager;
            }),
            (GDesigner.prototype.getFileReviewManager = function () {
                return this._fileReviewManager;
            }),
            (GDesigner.prototype.getToolManager = function () {
                return this._workspace.getToolManager();
            }),
            (GDesigner.prototype.getDocuments = function () {
                return this._documents;
            }),
            (GDesigner.prototype.getActiveDocument = function () {
                return this._activeDocument ? this._activeDocument : null;
            }),
            (GDesigner.prototype.getActiveView = function () {
                const activeDoc = gDesigner.getActiveDocument(),
                    activeWindow = activeDoc && activeDoc.getActiveWindow();
                return activeWindow && activeWindow.getView();
            }),
            (GDesigner.prototype.getHeader = function () {
                return this._header;
            }),
            (GDesigner.prototype.getInfo = function () {
                return this._info;
            }),
            (GDesigner.prototype.getToolbar = function () {
                return this._toolbar;
            }),
            (GDesigner.prototype.getPanels = function () {
                return this._panels;
            }),
            (GDesigner.prototype.getLeftSidebars = function () {
                return this._leftSidebars;
            }),
            (GDesigner.prototype.getRightSidebars = function () {
                return this._rightSidebars;
            }),
            (GDesigner.prototype.getWindows = function () {
                return this._windows;
            }),
            (GDesigner.prototype.isPartVisible = function (e) {
                return "none" !== this.getPart(e).css("display");
            }),
            (GDesigner.prototype.setPartVisible = function (e, t, n) {
                t != this.isPartVisible(e) && (this.getPart(e).css("display", t ? (n || "" === n ? n : "block") : "none"), this.relayout());
            }),
            (GDesigner.prototype.getPart = function (e) {
                return this._mainframe.find("#" + e.id);
            }),
            (GDesigner.prototype.getActions = function () {
                return this._actions;
            }),
            (GDesigner.prototype.getAction = function (e) {
                return this._actionsMap[e] || null;
            }),
            (GDesigner.prototype.addMenu = function (e, caption, openCallback, icon, updateCallback) {
                e = e || this._mainMenu;
                var menuItem = new GMenuItem(GMenuItem.Type.Menu, GMenu);
                return (
                    menuItem.setCaption(caption),
                    menuItem.setIcon(icon),
                    e.addItem(menuItem),
                    openCallback && menuItem.getMenu().addEventListener(MenuOpenEvent, openCallback),
                    updateCallback && menuItem.addEventListener(GMenuItem.UpdateEvent, () => updateCallback(menuItem)),
                    menuItem.getMenu()
                );
            }),
            (GDesigner.prototype.addMenuSeparator = function (parentMenu, dividerVisible) {
                var divider = new GMenuItem(GMenuItem.Type.Divider, null, null, dividerVisible);
                return (parentMenu.addItem(divider), divider);
            }),
            (GDesigner.prototype.addMenuItem = function (parentMenu, caption, icon, o, shortcut, activateCallback, shortcutGlobal, pro, action, className, noHover) {
                var menuItem = new GMenuItem(GMenuItem.Type.Item);
                return (
                    activateCallback && menuItem.addEventListener(GMenuItem.ActivateEvent, activateCallback),
                    shortcut &&
                        (gDesigner.registerShortcut(
                            shortcut,
                            function (event) {
                                return activateCallback("shortcut", event);
                            }.bind(this),
                            shortcutGlobal
                        ),
                        menuItem.setShortcutHint(shortcut)),
                    menuItem.setIcon(icon),
                    menuItem.setPro(pro),
                    menuItem.setNoHover(noHover),
                    className && menuItem.addClass(className),
                    this.updateMenuItem(menuItem, caption, true, false),
                    parentMenu.addItem(menuItem),
                    action && menuItem.setAction(action),
                    menuItem
                );
            }),
            (GDesigner.prototype.updateMenuItem = function (menuItem, caption, enabled, checked, pro, feature) {
                (menuItem.setCaption(caption), menuItem.setEnabled(enabled), menuItem.setChecked(checked), menuItem.setPro(!!pro, feature));
            }),
            (GDesigner.prototype.removeMenuItem = function (menu, item) {
                menu.removeItem(menu.indexOf(item));
            }),
            (GDesigner.prototype.getClipboardMimeTypes = function () {
                return this._clipboardMimeTypes ? Object.keys(this._clipboardMimeTypes) : null;
            }),
            (GDesigner.prototype.getClipboardContent = function (mimeType) {
                return this._clipboardMimeTypes && this._clipboardMimeTypes.hasOwnProperty(mimeType) ? this._clipboardMimeTypes[mimeType] : null;
            }),
            (GDesigner.prototype.setClipboardContent = function (mimeType, content) {
                this._clipboardMimeTypes[mimeType] = content;
            }),
            (GDesigner.prototype.getSetting = function (key, defaultValue) {
                return this._settings.hasOwnProperty(key) ? this._settings[key] : defaultValue;
            }),
            (GDesigner.prototype.setSetting = function (key, value) {
                if (this._settingsLoaded) {
                    for (var keys = key instanceof Array ? key : [key], values = key instanceof Array ? value : [value], i = false, r = 0; r < keys.length; ++r) {
                        ((key = keys[r]), (value = values[r]));
                        if (!this._settings.hasOwnProperty(key) || !GObject.GUtil.equals(this._settings[key], value, true)) {
                            var s = this._settings[key];
                            ((this._settings[key] = value), this.trigger(new SettingChangedEvent(key, s || void 0, value)), (i = true));
                        }
                    }
                    if (i)
                        try {
                            gContainer.setProperty("designer.settings", this._settings);
                        } catch (e) {}
                    return i;
                }
            }),
            (GDesigner.prototype.getSwatches = function (type) {
                if (type.startsWith("document") && this.getActiveDocument()) {
                    var swatchesNode = this.getActiveDocument().getScene().getSwatches(),
                        result = [];
                    if (swatchesNode)
                        for (var swatch = swatchesNode.getFirstChild(); null !== swatch; swatch = swatch.getNext()) {
                            var i = GObject.GPattern.serialize(swatch.getProperty("_pt"));
                            (((i.startsWith("C#") || i.startsWith("Y#")) && "document" === type) ||
                                (i.startsWith("L#") && "document-linear-gradient" === type) ||
                                (i.startsWith("R#") && "document-radial-gradient" === type) ||
                                (i.startsWith("A#") && "document-angular-gradient" === type) ||
                                (i.startsWith("T#") && "document-texture-pattern" === type) ||
                                (i.startsWith("N#") && "document-noise-pattern" === type)) &&
                                result.push(swatch);
                        }
                    return result;
                }
                return this._swatches[type];
            }),
            (GDesigner.prototype.setSwatches = function (type, swatches, clearExisting) {
                if (
                    (!type.startsWith("document") || this.getActiveDocument()) &&
                    (type.startsWith("document") || this._swatches.hasOwnProperty(type))
                ) {
                    type.startsWith("document") || (this._swatches[type] = swatches);
                    var isDocument = type.startsWith("document"),
                        i = type.startsWith("global"),
                        r = this.getActiveDocument().getScene();
                    if (isDocument) {
                        if (clearExisting) r.getSwatches().clearChildren();
                        else {
                            for (var s = this.getSwatches(type), l = [], c = r.getSwatches().getFirstChild(); null !== c; c = c.getNext())
                                for (var d = 0; d < s.length; ++d) GObject.GUtil.equals(c, s[d]) && l.push(c);
                            for (d = 0; d < l.length; ++d) r.getSwatches().removeChild(l[d]);
                        }
                        for (d = 0; d < swatches.length; ++d) r.getSwatches().appendChild(swatches[d]);
                    } else if (i) {
                        var u = this._swatches.global;
                        u = (u = (u = (u = (u = u.concat(this._swatches["global-linear-gradient"])).concat(
                            this._swatches["global-angular-gradient"]
                        )).concat(this._swatches["global-radial-gradient"])).concat(this._swatches["global-texture-pattern"])).concat(
                            this._swatches["global-noise-pattern"]
                        );
                        var p = [];
                        for (d = 0; d < u.length; ++d) p.push(GObject.GNode.serialize(u[d]));
                        gContainer.setProperty("swatches", p);
                    }
                    this.trigger(new SwatchesChangedEvent(type));
                }
            }),
            (GDesigner.prototype.getAllSwatches = function (type) {
                var result = [];
                if (type.startsWith("document"))
                    for (var swatchNode = this.getActiveDocument().getScene().getSwatches().getFirstChild(); null !== swatchNode; swatchNode = swatchNode.getNext()) result.push(swatchNode);
                else
                    result = (result = (result = (result = (result = (result = result.concat(this._swatches.global)).concat(this._swatches["global-linear-gradient"])).concat(
                        this._swatches["global-angular-gradient"]
                    )).concat(this._swatches["global-radial-gradient"])).concat(this._swatches["global-texture-pattern"])).concat(
                        this._swatches["global-noise-pattern"]
                    );
                return result;
            }),
            (GDesigner.prototype.newInfiniteDocument = function () {
                var scene = this.createScene();
                scene.getActivePage().setProperties(["bck", "w", "h"], [GObject.GRGBColor.WHITE, 0, 0]);
                var document = new GDocument(scene);
                return (this.addDocument(document), document);
            }),
            (GDesigner.prototype.createScene = function (parentScene) {
                var scene = new GObject.GScene(this.getWorkspace(), parentScene);
                return (
                    void 0 !== GEditor.GEditorOptions.scaleBorderWidth && scene.setBorderScale(GEditor.GEditorOptions.scaleBorderWidth),
                    void 0 !== GEditor.GEditorOptions.scaleCorners && scene.setCornersScale(GEditor.GEditorOptions.scaleCorners),
                    scene
                );
            }),
            (GDesigner.prototype.createNewDocumentDialog = function () {
                this._newDocumentDialog = new GNewDocumentDialog();
            }),
            (GDesigner.prototype.openNewDocumentDialog = function (options) {
                const appManager = this.getApplicationManager();
                (appManager.isCreatingNewDocumentEnabled() || appManager.isOpenFromCloudEnabled()) &&
                    (this._newDocumentDialog || (this._newDocumentDialog = new GNewDocumentDialog()),
                    0 === $(".g-new-document-dialog").length
                        ? this._newDocumentDialog.open(options)
                        : options && options.openFromCloud && this._newDocumentDialog.getDialogElement().find(".option.cloud-option").click());
            }),
            (GDesigner.prototype.openCloudSaveDialog = function (documentToSave, cancelSaveCallback, defaultFilename, readyStateChange, nativeCloud) {
                0 === $(".g-new-document-dialog").length &&
                    (this._newDocumentDialog || (this._newDocumentDialog = new GNewDocumentDialog()), this._newDocumentDialog.saveCloudFile(documentToSave, cancelSaveCallback, defaultFilename, readyStateChange, nativeCloud));
            }),
            (GDesigner.prototype._shouldOpenUserNameConfigDialog = function () {
                return (
                    !(this._user && !this._user.canUpdateSelfAccountData()) &&
                    !(this._user && this._user.isAnonymous() && !designerConfig.ANONYMOUS_SESSION_ENABLED) &&
                    (!this._user || !this._user.getFirstName())
                );
            }),
            (GDesigner.prototype.openUserNameConfigDialog = function () {
                if (!designerConfig.ENABLE_COLLABORATION) return;
                let shouldOpen = this._shouldOpenUserNameConfigDialog();
                if (!this._userNameConfigDialog && shouldOpen) {
                    const user = this._user || { name: "", last_name: "", anonymous: "" };
                    this._userNameConfigDialog = new GUserNameConfigDialog(user.name, user.last_name, user.anonymous);
                }
                shouldOpen && 0 === $(".g-username-config-dialog").length && this._userNameConfigDialog.open();
            }),
            (GDesigner.prototype.closeNewDocumentDialog = function () {
                this._newDocumentDialog && this._newDocumentDialog.close();
            }),
            (GDesigner.prototype.addDocument = function (document, index) {
                (void 0 !== index ? this._documents.splice(index, 0, document) : this._documents.push(document),
                    this.hasEventListeners(DocumentEvent) && this.trigger(new DocumentEvent(DocumentEvent.Type.Added, document)),
                    this._windows.addWindow(document, false, index));
            }),
            (GDesigner.prototype.notifyDocumentModified = function (document) {
                this.hasEventListeners(DocumentEvent) && this.trigger(new DocumentEvent(DocumentEvent.Type.Modified, document, null));
            }),
            (GDesigner.prototype._isNativeDesign = function (extension) {
                return extension === designerConfig.FILE_FORMATS.find((format) => format.default).ext.toUpperCase();
            }),
            (GDesigner.prototype.isInitialized = function () {
                return this._initialized;
            }),
            (GDesigner.prototype._canOpenDocument = function (file) {
                if (!this._initialized) return false;
                if (!this.isEnabledProFeatures()) {
                    let fileType = GDocument.FileTypes.find((fileType) => fileType.ext.toUpperCase() === (file.getExtension() || "").toUpperCase());
                    if (fileType && fileType.pro)
                        return (
                            gDesigner.stats("document_nonprotriespro_".concat(fileType.ext.toLowerCase())),
                            this.handlePROFeatureInterruption(),
                            false
                        );
                }
                return true;
            }),
            (GDesigner.prototype._processOpenDocument = function (file, index) {
                const extension = file.getExtension(),
                    isNative = this._isNativeDesign(extension),
                    document = new GDocument(isNative ? file : null);
                if (document.isExtensionAvailableForLoading(extension))
                    return (this.addDocument(document, index), (document.fileExtension = extension), document.load(file), this.trigger(new DocumentEvent(DocumentEvent.Type.Opened, document)), document);
                var alertMessageKey = !!GDocument.FileTypes.find((fileType) => fileType.ext.toUpperCase() === extension.toUpperCase() && "image" === fileType.category)
                    ? "text.suggestion-open-image"
                    : "text.unsupported-file-extension";
                return (GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GDocument", alertMessageKey))), null);
            }),
            (GDesigner.prototype.openDocumentWithReload = function (file, index) {
                if (this._canOpenDocument(file)) return this._processOpenDocument(file, index);
            }),
            (GDesigner.prototype.openDocument = function (file, index) {
                if (!this._canOpenDocument(file)) return;
                if (file && (0, ExternalFileCheck.shouldShowExternalFileError)(file)) throw new ExternalFileError.default();
                const extension = file.getExtension();
                if (this._isNativeDesign(extension)) {
                    const uniqueId = file.getUniqueId();
                    if (null != uniqueId)
                        for (var o = 0; o < this._documents.length; ++o) {
                            const existingDocument = this._documents[o];
                            if (
                                existingDocument.getStorageItem() &&
                                existingDocument.getStorageItem().getUniqueId() === uniqueId &&
                                (!existingDocument.getStorageItem().getVersionId ||
                                    !file.getVersionId ||
                                    existingDocument.getStorageItem().getVersionId() === file.getVersionId())
                            )
                                return (this.activateDocument(existingDocument), existingDocument);
                        }
                }
                return this._processOpenDocument(file, index);
            }),
            (GDesigner.prototype.addToRecentFiles = function (file) {
                function t(t, serializeEntry) {
                    let encode = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    gContainer.getProperty(t).then(function (list) {
                        (encode && list && (list = JSON.parse(Utilities.base64StringToString(list))), list || (list = []));
                        for (var a = 0; a < list.length; ++a) {
                            let found = false;
                            if (gContainer.getRuntime() === GContainer.Runtime.Electron) found = list[a] === serializeEntry(file);
                            else {
                                let parsedEntry = JSON.parse(list[a]),
                                    fileObj = file.getFile();
                                found = parsedEntry.file.id === fileObj.id;
                            }
                            if (found) {
                                list.splice(a, 1);
                                break;
                            }
                        }
                        (list.unshift(serializeEntry(file)),
                            list.splice(10, list.length),
                            encode && (list = Utilities.stringToBase64String(JSON.stringify(list))),
                            gContainer.setProperty(t, list),
                            gDesigner.updateRecentDocumentsAction());
                    });
                }
                file &&
                    (file instanceof GCloudStorage.Item
                        ? gDesigner.updateRecentDocumentsAction()
                        : gContainer.getRuntime() === GContainer.Runtime.Electron
                          ? t("recent_documents", (file) => file.getUniqueId())
                          : file instanceof GExternalStorage.Item &&
                            gDesigner.getUser().then((user) => {
                                t(
                                    "recent_external_".concat(user.getUID()),
                                    (storageItem) => {
                                        const provider = storageItem instanceof GGoogleDriveStorage.default.Item ? "googledrive" : null;
                                        return JSON.stringify({ type: provider, file: storageItem.getFile() });
                                    },
                                    true
                                );
                            }));
            }),
            (GDesigner.prototype.activateDocument = function (document, skipActivateWindow) {
                if (document != this._activeDocument) {
                    if (this._activeDocument) {
                        var previousDocument = this._activeDocument;
                        ((this._activeDocument = null),
                            previousDocument.deactivate(),
                            this.hasEventListeners(DocumentEvent) && this.trigger(new DocumentEvent(DocumentEvent.Type.Deactivated, previousDocument)),
                            previousDocument.getActiveWindow() === this._windows.getActiveWindow() && this._windows.activateWindow(null));
                    }
                    document &&
                        ((this._activeDocument = document),
                        skipActivateWindow || this._windows.activateWindow(document.getActiveWindow()),
                        document.activate(),
                        this.hasEventListeners(DocumentEvent) && this.trigger(new DocumentEvent(DocumentEvent.Type.Activated, document)));
                }
            }),
            (GDesigner.prototype.replaceDocument = function (oldDocument, newDocument, force) {
                var oldIndex = this._documents.indexOf(oldDocument);
                oldIndex < 0 || (this.addDocument(newDocument, oldIndex), this.removeDocument(oldDocument, null, force));
            }),
            (GDesigner.prototype.removeDocument = function (document, callback, force) {
                var index = this._documents.indexOf(document);
                if (!(index < 0)) {
                    var windows = document.getWindows();
                    if (windows.length) {
                        var removeNextWindow = function () {
                            windows.length > 0 ? this._windows.removeWindow(windows[0], removeNextWindow, force) : this.removeDocument(document, callback);
                        }.bind(this);
                        removeNextWindow();
                    } else
                        (document === this.getActiveDocument() && this.activateDocument(null),
                            document.release(),
                            this._documents.splice(index, 1),
                            callback && callback(),
                            this.hasEventListeners(DocumentEvent) && this.trigger(new DocumentEvent(DocumentEvent.Type.Removed, document)),
                            0 === this._documents.length && this.handleWelcomeScreenOpenWithUserPermissions());
                }
            }),
            (GDesigner.prototype.handleWelcomeScreenOpenWithUserPermissions = function () {
                let e = {
                    closable: this.getApplicationManager().isCreatingNewDocumentEnabled(),
                    showCloudOptions: true,
                    closeCallback: (e) => {
                        e && gDesigner.newInfiniteDocument();
                    },
                };
                var t;
                this.getLicense().canAccessFreemium()
                    ? this.openNewDocumentDialog(e)
                    : (this._newDocumentDialog || (this._newDocumentDialog = new GNewDocumentDialog()),
                      null === (t = this._newDocumentDialog) || void 0 === t || t._newDocumentCustomSize());
            }),
            (GDesigner.prototype.canExecuteAction = function (actionId, args) {
                var action = this.getAction(actionId);
                return !!action && action.isAvailable() && action.isEnabled.apply(action, args);
            }),
            (GDesigner.prototype.canActivateTool = function (toolId) {
                let checkAnnotations = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (!checkAnnotations || !designerConfig.HAS_ANNOTATIONS || this.getRightSidebars().getActiveSidebar() != GAnnotationsSidebar.ID) return true;
                const restrictedGroups = ["path", "shape", "knife", "insert"],
                    restrictedCategories = ["special"];
                return !gravit.tools.some((toolDef) => {
                    let { tool, group, category } = toolDef;
                    return tool === toolId && (restrictedGroups.includes(group) || restrictedCategories.includes(category));
                });
            }),
            (GDesigner.prototype.executeAction = function (actionId, args, source, skipStats) {
                var action = this.getAction(actionId);
                if (!action) throw new Error("Unable to execute action '" + actionId + "' - not registered.");
                var activeWindow = this._windows.getActiveWindow();
                if (!activeWindow || !activeWindow.isPreview()) {
                    if (action.isAvailable() && action.isEnabled.apply(action, args)) {
                        if (actionId === GSaveAction.ID)
                            this.getPart(Parts.Toolbar)
                                .find(".toolbar-button[data-action='" + actionId + "']")
                                .find("button")
                                .toggleClass("g-disabled", true);
                        var executeFn = action.execute;
                        if (("shortcut" === source && (executeFn = action.executeFromShortcut), !skipStats)) {
                            var statsAction = action.isPro() ? (gDesigner.isEnabledProFeatures(actionId) ? "execute" : "nonprotriespro") : "execute";
                            this.stats("action_" + statsAction + "_" + (source || "button"), action.statsValue() || actionId);
                        }
                        var result = executeFn.apply(action, args);
                        if (void 0 !== result) return result;
                    }
                    return true;
                }
            }),
            (GDesigner.prototype.setOpenSansDefaultFont = function () {
                var fontManager = this._workspace.getFontManager();
                (fontManager.setDefaultFont(fontManager.getFont("Open Sans", GObject.GFont.Style.Normal, GObject.GFont.Weight.Regular)),
                    fontManager.setDefaultFontStyles([GObject.GFont.Style.Normal, GObject.GFont.Style.Italic]),
                    fontManager.setDefaultFontWeights([300, 400, 600, 700, 800]));
            }),
            (GDesigner.prototype.isTouchDevice = function () {
                return designerConfig.TOUCH_LAYOUT && ("ontouchstart" in window || !!navigator.msMaxTouchPoints || !!navigator.maxTouchPoints);
            }),
            (GDesigner.prototype.isTouchEnabled = function () {
                return (
                    gContainer.getRuntime() === GContainer.Runtime.IPad ||
                    (!!designerConfig.TOUCH_LAYOUT && this.isEnabledProFeatures() && !!this.getSetting("touch", false))
                );
            }),
            (GDesigner.prototype.setTouchEnabled = function (touchEnabled) {
                this.setSetting("touch", !!touchEnabled);
            }),
            (GDesigner.prototype.init = function () {
                ((this._shareManager = new GShareManager()),
                    (this._realtimeManager = new GRealtimeManager()),
                    (this._fileReviewManager = new GFileReviewManager()),
                    (this._annotationsManager = new GAnnotationsManager()),
                    gContainer.registerFontProviders(),
                    FontProviderRegistry.getInstance().init());
                var fontManager = this._workspace.getFontManager();
                if (
                    (fontManager.addEventListener(GObject.GFontManager.ResolveFontEvent, this._fontManagerResolveFontEvent, this),
                    fontManager.addEventListener(GObject.GFontManager.QueryFontFamilyEvent, this._fontManagerQueryFontFamilyEvent, this),
                    this.setOpenSansDefaultFont(),
                    GObject.GLocale.getLanguage() === GObject.GLocaleLanguage.Chinese || GObject.GLocale.getLanguage() === GObject.GLocaleLanguage.ChineseTaiwan)
                )
                    FontProviderRegistry.getProviderInstance(DefaultFontsProvider).hasFont("Noto Sans CS") &&
                        (fontManager.setDefaultFont(fontManager.getFont("Noto Sans CS", GObject.GFont.Style.Normal, GObject.GFont.Weight.Regular)),
                        fontManager.setDefaultFontStyles([GObject.GFont.Style.Normal]),
                        fontManager.setDefaultFontWeights([100, 200, 300, 400, 500, 600, 800]));
                else if (GObject.GLocale.getLanguage() === GObject.GLocaleLanguage.Japanese) {
                    FontProviderRegistry.getProviderInstance(DefaultFontsProvider).hasFont("Noto Sans CJK JP") &&
                        (fontManager.setDefaultFont(fontManager.getFont("Noto Sans CJK JP", GObject.GFont.Style.Normal, GObject.GFont.Weight.Regular)),
                        fontManager.setDefaultFontStyles([GObject.GFont.Style.Normal]),
                        fontManager.setDefaultFontWeights([400, 700]));
                }
                ((this._CDRIntegrationEngine = CDRIntegration.createCDRIntegrationEngine()),
                    (GEditor.GEditorOptions.selectDoubleClickBehavior = "subselect"),
                    (GEditor.GEditorOptions.coordinatesTooltip = true),
                    (GEditor.GEditorOptions.bboxPositionTooltip = false),
                    (GEditor.GEditorOptions.sizeTooltip = false),
                    (GEditor.GEditorOptions.angleTooltip = false),
                    (GEditor.GEditorOptions.showTooltips = true),
                    (GEditor.GEditorOptions.propertiesExcludedFromCopying = CopyConfig.PropertiesToExcludeFromCopying),
                    (GEditor.GEditorOptions.adaptiveResizeHandles = true),
                    GEditor.GSkewHorizontalAnnotation.setIcon("assets/annotation/touch/skew-horizontal-handle.png"),
                    GEditor.GSkewVerticalAnnotation.setIcon("assets/annotation/touch/skew-vertical-handle.png"),
                    GEditor.GPreserveAspectRatioAnnotation.setIcon("assets/annotation/touch/preserve-aspect-ratio-handle.png"),
                    GEditor.GRotateAnnotation.setIcon("assets/annotation/touch/rotate-handle.png"),
                    themeConfig.DESIGNER.HIGHLIGHT_COLOR && (GObject.GPaintContext.prototype.highlightOutlineColor = themeConfig.DESIGNER.HIGHLIGHT_COLOR),
                    gContainer.getProperty(GDimensionProperties._keepRatioName).then((keepRatio) => {
                        ((keepRatio = keepRatio || false), (GEditor.GEditorOptions.preserveAspectRatio = keepRatio), (GEditor.GEditorOptions.allowTextRatioPreservation = keepRatio));
                    }),
                    (GObject.GSceneOptions.scaleLabel = false),
                    (GObject.GSceneOptions.defaultBorderPositionForLines = true),
                    (GEditor.GEditorPaintConfiguration.prototype.pageDecoration.shadow = 4),
                    (GEditor.GEditorPaintConfiguration.prototype.pageDecoration.shadowOffsetY = 2),
                    (GEditor.GEditorPaintConfiguration.prototype.pageDecoration.shadowBackground = "rgba(0,0,0,0.25)"),
                    gContainer.getProperty(GOutlineViewAction.StoragePropertyName).then((outlineMode) => {
                        outlineMode && this.updateGEditorSceneConfigurationPaintMode(GObject.GScenePaintConfiguration.PaintMode.Outline);
                    }),
                    (GEditor.GGridGuide.MIN_CELL_SPACE = 5));
                var body = $("body");
                (body.attr("data-long-press-delay", designerConfig.LONG_PRESS_TIME_OUT),
                    body.on("long-press", (event) => {
                        const contextMenuEvent = jQuery.Event("contextmenu", {
                            pageX: event.detail.clientX,
                            pageY: event.detail.clientY,
                            clientX: event.detail.clientX,
                            clientY: event.detail.clientY,
                        });
                        $(event.target).trigger(contextMenuEvent);
                    }),
                    (this._mainframe = $("<div></div>").attr("id", "mainframe").css("display", "none").prependTo(body)));
                var frame = (this._frame = $("<div></div>").appendTo(this._mainframe)),
                    windowsContainer = $("<div></div>").attr("id", Parts.Windows.id).appendTo(frame);
                this._windows = new GWindows(windowsContainer);
                var infoContainer = $("<div></div>").attr("id", Parts.Info.id).appendTo(frame);
                this._info = new GInfo(infoContainer);
                var headerContainer = $("<div></div>").attr("id", Parts.Header.id).appendTo(frame);
                this._header = new GHeader(headerContainer);
                var toolbarContainer = $("<div></div>").attr("id", Parts.Toolbar.id).appendTo(frame);
                this._toolbar = new GToolbar(toolbarContainer);
                var bannerContainer = $("<div></div>").attr("id", Parts.Banner.id).appendTo(frame);
                this._banner = new GBanner.default(bannerContainer);
                var overlayContainer = $("<div></div>").attr("id", Parts.Overlay.id).appendTo(frame);
                this._overlay = new GOverlay.default(overlayContainer);
                var panelsContainer = $("<div></div>").attr("id", Parts.Panels.id).appendTo(frame),
                    footerContainer = $("<div></div>").attr("id", Parts.Footer.id).appendTo(frame);
                ((this._footer = new GFooter(footerContainer)), (this._panels = new GPanels(panelsContainer)));
                var leftSidebarsContainer = $("<div></div>")
                    .attr("id", Parts.LeftSidebars.id)
                    .on("mousedown", () => {
                        this._toggleSideBarAndAssistBarZIndex(true, false, false, false);
                    })
                    .appendTo(frame);
                this._leftSidebars = new GSidebars(leftSidebarsContainer, GSidebars.Orientation.Left, frame);
                var rightSidebarsContainer = $("<div></div>")
                    .attr("id", Parts.RightSidebars.id)
                    .on("mousedown", () => {
                        this._toggleSideBarAndAssistBarZIndex(false, true, false, false);
                    })
                    .appendTo(frame);
                ((this._rightSidebars = new GSidebars(rightSidebarsContainer, GSidebars.Orientation.Right, frame)),
                    this._updateStyles(body),
                    this._initBrowserSupported(GPlatform.GPlatform.webBrowser),
                    this.isBrowserSupported() ||
                        GSystemDialog.showOneTimeDialog(
                            GObject.GLocale.get(
                                new GObject.GLocaleKey(
                                    "GSystemDialog",
                                    GObject.GSystem.hardware === GObject.GSystem.Hardware.Tablet
                                        ? "text.unsupported-browser-touch"
                                        : "text.unsupported-browser"
                                )
                            ).replace("%app", config.DESIGNER.TITLE),
                            "designer.settings.dont_show_unsupported_browser_dialog"
                        ));
                let debouncedRelayout = (0, Utils.debounce)(
                    function () {
                        (this.relayout(),
                            setTimeout(() => {
                                this._windows.getActiveWindow() && this._windows.getActiveWindow().getView().invalidate(null, true);
                            }));
                    }.bind(this),
                    500
                );
                $(window).resize(
                    function () {
                        debouncedRelayout();
                    }.bind(this)
                );
                var actionInsertIndex = -1;
                this._actions = gravit.actions.map((action, index) => (action.getId() === GNewWindowAction.ID && (actionInsertIndex = index), action));
                var sidebarActions = gravit.sidebars.map((sidebar) => new GToggleSidebarAction(sidebar));
                if ((Array.prototype.splice.apply(this._actions, [actionInsertIndex, 0].concat(sidebarActions)), this._createMainMenu(), gravit.tools)) {
                    for (
                        var makeActivateHandler = (toolDef) => {
                                let { tool: tool, pro: pro = false, feature } = toolDef;
                                return () =>
                                    !(!this.isEnabledProFeatures(feature) && pro) &&
                                    !!this.canActivateTool(tool, true) &&
                                    (gDesigner.stats("tools_activate_shortcut", GToolbar.getToolName(tool) || "unknown_tool"),
                                    this.getToolManager().tempToolKeyActivate(tool));
                            },
                            makeReleaseHandler = (toolDef) => {
                                let { tool: tool, pro: pro = false, feature: feature } = toolDef;
                                return () =>
                                    !this.isEnabledProFeatures(feature) && pro
                                        ? (this.handlePROFeatureInterruption(), false)
                                        : this.getToolManager().tempToolKeyRelease(tool, 450);
                            },
                            N = 0;
                        N < gravit.tools.length;
                        ++N
                    ) {
                        var B = gravit.tools[N];
                        if (B.key || B.shortcuts) {
                            var j = makeActivateHandler(B),
                                z = makeReleaseHandler(B);
                            (B.key && this.registerShortcut([B.key], j, false, z),
                                Array.isArray(B.shortcuts) &&
                                    B.shortcuts.forEach((shortcut) => {
                                        this.registerShortcut(shortcut, j, false, z);
                                    }));
                        }
                    }
                    this.getToolManager().activateTool(gravit.tools[0].tool);
                    var activateSelectTool = function () {
                        var toolManager = this.getToolManager();
                        return (
                            this.getRightSidebars().getActiveSidebar() == GAnnotationsSidebar.ID ||
                                ((toolManager.getActiveTool() && toolManager.getActiveTool() instanceof GEditor.GSelectTool) || toolManager.activateTool(GEditor.GPointerTool),
                                toolManager.getActiveTool() instanceof GEditor.GSelectTool &&
                                    toolManager.getActiveTool().getEditMode() !== GEditor.GSelectTool.EditMode.Transform &&
                                    toolManager.getActiveTool().setEditMode(GEditor.GSelectTool.EditMode.Transform)),
                            true
                        );
                    }.bind(this);
                    this.registerShortcut(["Q"], activateSelectTool);
                }
                (this._info.init(),
                    this._header.init(),
                    this._toolbar.init(),
                    this._panels.init(),
                    this._footer.init(),
                    this._leftSidebars.init(),
                    this._rightSidebars.init(),
                    this._windows.init(),
                    this._banner.init(),
                    this._overlay.init(),
                    this._leftSidebars.setActiveSidebar(GOutlineSidebar.ID),
                    this._rightSidebars.setActiveSidebar(GInspectorSidebar.ID),
                    this.setPartVisible(Parts.Panels, false),
                    this.setPartVisible(Parts.Info, false),
                    this._mainframe.css("display", ""),
                    GObject.GColor.setCMYKProfile("USWebCoatedSWOPv2", "assets/data/icc/"),
                    (this._initialized = true),
                    this._windows.addEventListener(GWindows.WindowEvent, this._windowEvent, this),
                    this._leftSidebars.addEventListener(GSidebars.SidebarEvent, this._sidebarEvent, this),
                    this._rightSidebars.addEventListener(GSidebars.SidebarEvent, this._sidebarEvent, this),
                    (this._contextMenu = new GContextMenu(windowsContainer)),
                    this.updateLicenseInfo(),
                    this._updateTitle({ saveToSessionHistory: false }),
                    designerConfig.AUTO_SAVE_ENABLED && (this._autoSaveManager = GAutoSave.getInstance()),
                    this.getCursorManager().init(),
                    this._updateLayout(),
                    this._initAmplitudeProperties(),
                    this._updateState());
            }),
            (GDesigner.prototype._updateStyles = function (e) {
                switch (GPlatform.GPlatform.webBrowser) {
                    case GPlatform.GPlatform.constructor.WebBrowser.Edge:
                        e.addClass("g-edge");
                        break;
                    case GPlatform.GPlatform.constructor.WebBrowser.Opera:
                        e.addClass("g-opera");
                        break;
                    case GPlatform.GPlatform.constructor.WebBrowser.Chrome:
                        e.addClass("g-chrome");
                        break;
                    case GPlatform.GPlatform.constructor.WebBrowser.Firefox:
                        e.addClass("g-firefox");
                        break;
                    case GPlatform.GPlatform.constructor.WebBrowser.Safari:
                        e.addClass("g-safari");
                        break;
                    case GPlatform.GPlatform.constructor.WebBrowser.MSIE:
                        e.addClass("g-msie");
                }
                switch (GObject.GSystem.hardware) {
                    case GObject.GSystem.Hardware.Desktop:
                        e.addClass("g-desktop");
                        break;
                    case GObject.GSystem.Hardware.Tablet:
                        e.addClass("g-tablet");
                        break;
                    case GObject.GSystem.Hardware.Phone:
                        e.addClass("g-phone");
                }
                switch (GObject.GSystem.operatingSystem) {
                    case GObject.GSystem.OperatingSystem.Unix:
                        e.addClass("g-os-unix");
                        break;
                    case GObject.GSystem.OperatingSystem.Windows:
                        e.addClass("g-os-windows");
                        break;
                    case GObject.GSystem.OperatingSystem.OSX_IOS:
                        e.addClass("g-os-osx_ios");
                }
                gContainer.getRuntime() === GContainer.Runtime.IPad && e.addClass("g-ipad");
            }),
            (GDesigner.prototype.getContextMenu = function () {
                return this._contextMenu;
            }),
            (GDesigner.prototype.getAutoSaveManager = function () {
                if (this._autoSaveManager) return this._autoSaveManager;
            }),
            (GDesigner.prototype.isActiveDocument = function (e) {
                const activeDocument = this.getActiveDocument();
                return !!activeDocument && !!(e && e instanceof GDocument) && (activeDocument === e || !(!activeDocument.getId() || activeDocument.getId() !== e.getId()));
            }),
            (GDesigner.prototype._setActiveAssistantBar = function (active) {
                if (active) {
                    if (!this._assistantBar) {
                        const assistantBarElement = $("<div/>")
                            .attr("id", Parts.AssistantBar.id)
                            .on("mousedown", () => {
                                this._toggleSideBarAndAssistBarZIndex(false, false, true, false);
                            })
                            .appendTo(this._frame);
                        this._assistantBar = new AssistantBar(assistantBarElement);
                    }
                    this._assistantBar.activate();
                } else this._assistantBar && this._assistantBar.deactivate();
            }),
            (GDesigner.prototype._toggleSideBarAndAssistBarZIndex = function (leftActive, rightActive, assistantActive, notificationActive) {
                gDesigner.isTouchEnabled() &&
                    (this._leftSidebars.getHtmlElement().toggleClass("bring-to-front", leftActive),
                    this._rightSidebars.getHtmlElement().toggleClass("bring-to-front", rightActive),
                    this._assistantBar.getHtmlElement().toggleClass("bring-to-front", assistantActive),
                    void 0 !== notificationActive && $(".g-notification-panel").toggleClass("bring-to-front", notificationActive));
            }),
            (GDesigner.prototype.sendSideBarAndAssistBarToBack = function () {
                this._toggleSideBarAndAssistBarZIndex(false, false, false);
            }),
            (GDesigner.prototype.start = function () {
                return Promise.all([
                    gContainer
                        .getProperty("designer.settings")
                        .then((settings) => {
                            for (var t in ((settings = settings || {}), this._settings)) settings.hasOwnProperty(t) || (settings[t] = this._settings[t]);
                            for (var n in ((this._settings = settings), (this._settingsLoaded = true), this._settings))
                                this.trigger(new SettingChangedEvent(n, void 0, this._settings[n], true));
                        })
                        .catch((e) => Promise.reject(e)),
                    gContainer
                        .getProperty("swatches")
                        .then((swatchData) => {
                            if (
                                ((this._swatches.global = []),
                                (this._swatches["global-linear-gradient"] = []),
                                (this._swatches["global-radial-gradient"] = []),
                                (this._swatches["global-angular-gradient"] = []),
                                (this._swatches["global-texture-pattern"] = []),
                                (this._swatches["global-noise-pattern"] = []),
                                swatchData)
                            )
                                for (var t = 0; t < swatchData.length; ++t) {
                                    var n = GObject.GNode.deserialize(swatchData[t]) || GObject.GPattern.deserialize(swatchData[t]),
                                        o = n instanceof GObject.GSwatch ? n : new GObject.GSwatch(n);
                                    this._addGlobalSwatch(o);
                                }
                            this.trigger(new SwatchesChangedEvent("global"));
                        })
                        .catch((e) => Promise.reject(e)),
                ]);
            }),
            (GDesigner.prototype._addGlobalSwatch = function (swatch) {
                var serialized = GObject.GPattern.serialize(swatch.getProperty("_pt"));
                serialized.startsWith("C#") || serialized.startsWith("Y#")
                    ? this._swatches.global.push(swatch)
                    : serialized.startsWith("L#")
                      ? this._swatches["global-linear-gradient"].push(swatch)
                      : serialized.startsWith("R#")
                        ? this._swatches["global-radial-gradient"].push(swatch)
                        : serialized.startsWith("A#")
                          ? this._swatches["global-angular-gradient"].push(swatch)
                          : serialized.startsWith("T#")
                            ? this._swatches["global-texture-pattern"].push(swatch)
                            : serialized.startsWith("N#") && this._swatches["global-noise-pattern"].push(swatch);
            }),
            (GDesigner.prototype.updateRecentDocumentsAction = function () {
                let result = [];
                const recentDocsPromise = gContainer.getProperty("recent_documents"),
                    userPromise = gDesigner.getUser();
                Promise.all([recentDocsPromise, userPromise])
                    .then((pair) => {
                        let [t, user] = pair;
                        return user ? Promise.all([t, user, gContainer.getProperty("recent_external_".concat(user.getUID()))]) : Promise.reject();
                    })
                    .then((t) => {
                        let [docs, o, external] = t;
                        var a, count;
                        if (docs)
                            for (a = 0, count = docs.length; a < count; ++a) {
                                let storage = gContainer.getStorage(),
                                    storageItem = new storage.constructor.Item(storage, docs[a]);
                                result.push(storageItem);
                            }
                        if (external)
                            for (external = JSON.parse(Utilities.base64StringToString(external)), a = 0, count = external.length; a < count; ++a) {
                                let driveItem,
                                    storage = gContainer.getStorage(),
                                    parsedEntry = JSON.parse(external[a]);
                                ("googledrive" === parsedEntry.type &&
                                    (parsedEntry.file.hasOwnProperty("version") && delete parsedEntry.file.version, (driveItem = new GGoogleDriveStorage.default.Item(storage, parsedEntry.file))),
                                    driveItem && result.push(driveItem));
                            }
                        var saveRecentList = function () {
                            gContainer.updateRecentDocumentsAction(result);
                        };
                        GCommonNames.getRecentStorageItems()
                            .then(async function (storageItems) {
                                if (storageItems.length > 0)
                                    for (var n = 0; n < storageItems.length; ++n) result.push(await GCloudStorage.from(gDesigner.getDefaultStorage(), storageItems[n]));
                            })
                            .then(saveRecentList)
                            .catch(saveRecentList);
                    });
            }),
            (GDesigner.prototype.removeExternalRecentFiles = function (providerType, accountId) {
                gDesigner
                    .getUser()
                    .then((user) => (user ? Promise.all([user, gContainer.getProperty("recent_external_".concat(user.getUID()))]) : Promise.reject()))
                    .then((pair) => {
                        let [user, externalData] = pair,
                            entries = externalData ? JSON.parse(Utilities.base64StringToString(externalData)) : [];
                        entries instanceof Array || (entries = new Array());
                        const filtered = [];
                        for (let n = 0, o = entries.length; n < o; n++) {
                            let entry = JSON.parse(entries[n]);
                            entry &&
                                (entry.type !== providerType ||
                                    (entry.file && entry.file.settings && !entry.file.settings.accountId) ||
                                    (entry.file && entry.file.settings && entry.file.settings.accountId !== accountId)) &&
                                filtered.push(JSON.stringify(entry));
                        }
                        (entries.length > 0
                            ? gContainer.setProperty("recent_external_".concat(user.getUID()), Utilities.stringToBase64String(JSON.stringify(filtered)))
                            : gContainer.removeProperty("recent_external_".concat(user.getUID())),
                            gDesigner.updateRecentDocumentsAction());
                    });
            }),
            (GDesigner.prototype.relayout = function () {
                if (!this._initialized) return;
                var topOffset,
                    t,
                    leftOffset = 0,
                    rightOffset = 0;
                ((topOffset = this._getTopOffset(leftOffset, rightOffset)),
                    (leftOffset = this._getLeftOffset(topOffset)),
                    (rightOffset = this._getRightOffset(topOffset)),
                    (t = this._getBottomOffset(leftOffset, rightOffset)));
                const touchEnabled = this.isTouchEnabled();
                (this._header.relayout(),
                    this._toolbar.relayout(),
                    this._panels.relayout(),
                    this._footer.relayout(),
                    this._leftSidebars.relayout(),
                    this._rightSidebars.relayout(),
                    this._windows.relayout([touchEnabled ? 0 : leftOffset, topOffset, touchEnabled ? 0 : rightOffset, t]));
            }),
            (GDesigner.prototype.updateCollabTextPreviews = async function () {
                var e,
                    t = this.getActiveDocument();
                t && ((e = t.getEditor()) && e.closeInlineEditor(), await this._CDRIntegrationEngine.processCollabText(t));
            }),
            (GDesigner.prototype._getTopOffset = function (leftOffset, rightOffset) {
                var topOffset = 0,
                    infoPart = this.getPart(Parts.Info);
                topOffset += this.isPartVisible(Parts.Info) ? infoPart.outerHeight() : 0;
                var headerPart = this.getPart(Parts.Header);
                (headerPart.css("top", topOffset.toString() + "px"), (topOffset += this.isPartVisible(Parts.Header) ? headerPart.outerHeight() : 0));
                this.getPart(Parts.Overlay).css("top", topOffset.toString() + "px");
                var toolbarPart = this.getPart(Parts.Toolbar);
                (toolbarPart.css("left", leftOffset.toString() + "px"),
                    toolbarPart.css("top", topOffset.toString() + "px"),
                    toolbarPart.css("right", rightOffset.toString() + "px"),
                    (topOffset += this.isPartVisible(Parts.Toolbar) ? toolbarPart.outerHeight() : 0));
                const bannerPart = this.getPart(Parts.Banner);
                return (bannerPart.css("top", topOffset.toString() + "px"), (topOffset += this.isPartVisible(Parts.Banner) ? bannerPart.outerHeight() : 0));
            }),
            (GDesigner.prototype._getLeftOffset = function (topOffset) {
                var width = 0,
                    sidebar = this._leftSidebars.getSidebar(this._leftSidebars.getActiveSidebar()),
                    minWidth = sidebar ? sidebar.getMinimumWidth() : 0,
                    sidebarPart = this.getPart(Parts.LeftSidebars),
                    visible = this.isPartVisible(Parts.LeftSidebars);
                return (
                    sidebarPart.outerWidth() < minWidth && visible && sidebarPart.outerWidth(minWidth),
                    sidebarPart.css("top", topOffset.toString() + "px"),
                    sidebarPart.height(this._mainframe.height() - topOffset),
                    (width += visible ? sidebarPart.outerWidth() : 0)
                );
            }),
            (GDesigner.prototype._getRightOffset = function (topOffset) {
                var width = 0,
                    sidebar = this._rightSidebars.getSidebar(this._rightSidebars.getActiveSidebar()),
                    minWidth = sidebar ? sidebar.getMinimumWidth() : 0,
                    sidebarPart = this.getPart(Parts.RightSidebars),
                    visible = this.isPartVisible(Parts.RightSidebars);
                return (
                    sidebarPart.outerWidth() < minWidth && visible && sidebarPart.outerWidth(minWidth),
                    sidebarPart.css("top", topOffset.toString() + "px"),
                    sidebarPart.height(this._mainframe.height() - topOffset),
                    (width += visible ? sidebarPart.outerWidth() : 0)
                );
            }),
            (GDesigner.prototype._getBottomOffset = function (leftOffset, rightOffset) {
                var bottomOffset = 0,
                    panelsPart = this.getPart(Parts.Panels);
                (panelsPart.css("left", leftOffset.toString() + "px"), panelsPart.css("width", (this._mainframe.width() - leftOffset - rightOffset).toString() + "px"));
                var footerPart = this.getPart(Parts.Footer);
                return (
                    footerPart.css("left", leftOffset.toString() + "px"),
                    footerPart.css("width", (this._mainframe.width() - leftOffset - rightOffset).toString() + "px"),
                    (bottomOffset += this.isPartVisible(Parts.Panels) ? panelsPart.outerHeight() : 0),
                    (bottomOffset += this.isPartVisible(Parts.Footer) ? footerPart.outerHeight() : 0)
                );
            }),
            (GDesigner.prototype.positionIsOnCanvas = function (x, y) {
                var topOffset,
                    bottomOffset,
                    leftOffset = 0,
                    rightOffset = 0;
                return (
                    (topOffset = this._getTopOffset(leftOffset, rightOffset)),
                    (leftOffset = this._getLeftOffset(topOffset)),
                    (rightOffset = this._getRightOffset(topOffset)),
                    (bottomOffset = this._getBottomOffset(leftOffset, rightOffset)),
                    x > leftOffset && x < window.innerWidth - rightOffset && y > topOffset && y < window.innerHeight - bottomOffset
                );
            }),
            (GDesigner.prototype.updateGEditorSceneConfigurationPaintMode = function (paintMode) {
                [
                    GObject.GScenePaintConfiguration.PaintMode.Full,
                    GObject.GScenePaintConfiguration.PaintMode.Outline,
                    GObject.GScenePaintConfiguration.PaintMode.Fast,
                ].indexOf(paintMode) < 0 || (GEditor.GEditorPaintConfiguration.prototype.paintMode = paintMode);
            }),
            (GDesigner.prototype.registerShortcut = function (keys, callback, isGlobal, releaseCallback) {
                var makeHandler = function (e, t) {
                        return (event) => {
                            var editor,
                                elementEditor,
                                s = this.getActiveDocument();
                            if (s && (editor = s.getEditor()) && editor.isInlineEditing()) {
                                var inlineNode = editor.getCurrentInlineEditorNode();
                                GEditor.GElementEditor && inlineNode instanceof GObject.GText && (elementEditor = GEditor.GElementEditor.getEditor(inlineNode));
                            }
                            if (!((t && elementEditor && elementEditor.handleKeyDown(event) && (t || elementEditor)) || true !== e(event)))
                                return (event.preventDefault(), event.stopPropagation(), false);
                        };
                    }.bind(this),
                    bindFn = isGlobal ? Mousetrap.bindGlobal : Mousetrap.bind;
                2 === keys.length && keys[0] === GPlatform.GKey.Constant.META && "+" === keys[1]
                    ? (bindFn(this._shortcutToMouseTrapShortcut(keys), makeHandler(callback, true)),
                      bindFn("mod+=", makeHandler(callback, true), "keydown"),
                      releaseCallback && bindFn("mod+=", makeHandler(releaseCallback, false), "keyup"))
                    : (bindFn(this._shortcutToMouseTrapShortcut(keys), makeHandler(callback, true), "keydown"),
                      releaseCallback && bindFn(this._shortcutToMouseTrapShortcut(keys), makeHandler(releaseCallback, false), "keyup"));
            }),
            (GDesigner.prototype._createMainMenu = function () {
                for (
                    var groupList = [],
                        menuTree = { items: [] },
                        getGroupFor = function (item) {
                            for (var n = 0; n < groupList.length; ++n) if (groupList[n].item === item) return groupList[n].group;
                        },
                        o = function (t, o, i) {
                            if (t.items.length > 0) {
                                var a = t.items[t.items.length - 1];
                                if (getGroupFor(a) !== i) {
                                    var divider = { type: "divider" };
                                    if ("item" === a.type && a.action) {
                                        var siblingActionsFor = (function (t) {
                                            for (var o = getGroupFor(t), i = [], a = 0; a < groupList.length; ++a) groupList[a].group === o && i.push(t);
                                            return i;
                                        })(a);
                                        divider.isVisible = function () {
                                            return siblingActionsFor.some((entry) => entry.action.isVisible());
                                        };
                                    }
                                    t.items.push(divider);
                                }
                            }
                            groupList.push({ item: o, group: i });
                        },
                        i = 0;
                    i < this._actions.length;
                    ++i
                ) {
                    var r = this._actions[i];
                    if (((this._actionsMap[r.getId()] = r), !r.isAvailable())) continue;
                    let actionCategory = r.getCategory();
                    for (var s = [actionCategory]; (actionCategory = actionCategory.parent); ) s.push(actionCategory);
                    s.reverse();
                    var l = r.getGroup(),
                        c = r.getGroupIcon(),
                        d = (r.getStyleClass(), l ? [""].concat(l.split("/")) : null);
                    if (d && s && s.length !== d.length - 1)
                        throw new Error("The number of categories is different than the number of groups.");
                    var u = menuTree;
                    if (s)
                        for (var p = 0; p < s.length; ++p) {
                            let category = s[p],
                                groupAtLevel = d ? d[p] : null;
                            for (var g = null, h = category.label.split("/")[p], f = 0; f < u.items.length; ++f)
                                h == u.items[f].caption && (g = u.items[f]);
                            (g ||
                                (o(
                                    u,
                                    (g = {
                                        type: "menu",
                                        caption: h,
                                        items: [],
                                        icon: c,
                                        category: category,
                                    }),
                                    groupAtLevel
                                ),
                                u.items.push(g)),
                                (u = g));
                        }
                    var m = { type: "item", action: r };
                    (o(u, m, d ? d[d.length - 1] : null), u.items.push(m));
                }
                var renderNode = function (node, parentMenu) {
                        "menu" === node.type
                            ? (node.menu = renderMenu(node, parentMenu))
                            : "divider" === node.type
                              ? (node.separator = this.addMenuSeparator(parentMenu, node.isVisible))
                              : "item" === node.type &&
                                ((node.item = this.addMenuItem(
                                    parentMenu,
                                    GObject.GLocale.get(node.action.getTitle()),
                                    node.action.getIcon(),
                                    node.action.isCheckable(),
                                    node.action.getShortcut(),
                                    function (source, args) {
                                        if ("shortcut" === source) return this._executeShortcutAction(node.action, args);
                                    }.bind(this),
                                    node.action.isShortcutGlobal(),
                                    node.action.isPro(),
                                    node.action,
                                    node.action._sidebar ? node.action.getStyleClass() + " hidepanel" : node.action.getStyleClass(),
                                    node.action.noHover()
                                )),
                                this.registerAdditionalShortcuts(node.action));
                    }.bind(this),
                    renderMenu = function (node, parentMenu) {
                        const updateCallback = node.category
                            ? (menuItem) => {
                                  (menuItem.setVisible(node.category.visible), menuItem.setIcon(node.category.icon));
                              }
                            : null;
                        for (
                            var menu = this.addMenu(
                                    parentMenu,
                                    node.caption,
                                    function () {
                                        for (var t = 0; t < node.items.length; ++t) {
                                            var n = node.items[t];
                                            "item" === n.type &&
                                                this.updateMenuItem(
                                                    n.item,
                                                    GObject.GLocale.get(n.action.getTitle()),
                                                    n.action.isEnabled(),
                                                    !!n.action.isCheckable() && n.action.isChecked(),
                                                    n.action.isPro(),
                                                    n.action.getId()
                                                );
                                        }
                                    }.bind(this),
                                    node.icon,
                                    updateCallback
                                ),
                                i = 0;
                            i < node.items.length;
                            ++i
                        )
                            renderNode(node.items[i], menu);
                        return menu;
                    }.bind(this);
                for (i = 0; i < menuTree.items.length; ++i) ((g = menuTree.items[i]), renderMenu(menuTree.items[i], null));
                this._mainMenu.update();
            }),
            (GDesigner.prototype._workspaceResolveUrlEvent = function (event) {
                GCommonNames.resolveImage(event, this.getActiveDocument());
            }),
            (GDesigner.prototype._shareEvent = function (event) {
                event.type === ShareEvent.Type.Updated && this._updateSidebars();
            }),
            (GDesigner.prototype._applicationStateChangedEvent = function (event) {
                this._updateSidebars();
                const document = this.getActiveDocument();
                if (document && document.getStatus() === DocumentStatus.Ready) {
                    this.getApplicationManager().isCommentingEnabled() && this.openUserNameConfigDialog();
                }
            }),
            (GDesigner.prototype._updateSidebars = function () {
                const appManager = this.getApplicationManager(),
                    inspectEnabled = appManager.isInspectEnabled(),
                    commentingEnabled = appManager.isCommentingEnabled(),
                    editingEnabled = appManager.isEditingEnabled();
                if (GSidebars.isOrientationActiveInSetting(GSidebars.Orientation.Right)) {
                    const sidebar = this._rightSidebars.getSidebar(this._rightSidebars.getActiveSidebar());
                    ((sidebar && sidebar.isVisible()) ||
                        (editingEnabled || inspectEnabled
                            ? this._rightSidebars.setActiveSidebar(GInspectorSidebar.ID)
                            : commentingEnabled
                              ? this._rightSidebars.setActiveSidebar(GAnnotationsSidebar.ID)
                              : this._rightSidebars.setActiveSidebar(null)),
                        this.setPartVisible(Parts.RightSidebars, commentingEnabled || editingEnabled || inspectEnabled),
                        this._rightSidebars.relayout());
                }
                if (GSidebars.isOrientationActiveInSetting(GSidebars.Orientation.Left)) {
                    const sidebar = this._leftSidebars.getSidebar(this._leftSidebars.getActiveSidebar());
                    ((sidebar && sidebar.isVisible()) || (inspectEnabled ? this._leftSidebars.setActiveSidebar(GOutlineSidebar.ID) : this._leftSidebars.setActiveSidebar(null)),
                        this.setPartVisible(Parts.LeftSidebars, inspectEnabled),
                        this._leftSidebars.relayout());
                }
            }),
            (GDesigner.prototype._fontManagerResolveFontEvent = function (event) {
                const fontDescriptor = Object.assign({}, event);
                try {
                    FontProviderRegistry.resolveFont(fontDescriptor);
                } catch (error) {
                    throw (event.failed(), error);
                }
            }),
            (GDesigner.prototype._fontManagerQueryFontFamilyEvent = function (event) {
                try {
                    FontProviderRegistry.resolveQueryFontFamily(event);
                } catch (error) {
                    throw (event.failed(), error);
                }
            }),
            (GDesigner.prototype._documentEvent = function (event) {
                switch (event.type) {
                    case DocumentEvent.Type.OwnerUpdated:
                        if (event.document) {
                            const owner = event.document.getOwner();
                            if (owner) {
                                const storageFile = event.document.isCloudFile() ? event.document.getStorageItem().getFile() : null,
                                    imageUrl = storageFile ? storageFile.url_t || storageFile.url : null,
                                    previewText = GObject.GLocale.get(new GObject.GLocaleKey("GDesigner", "text.preview-by"))
                                        .replace("%name", owner.name)
                                        .replace("%appname", config.DESIGNER.TITLE);
                                ($('meta[name="description"]').attr("content", previewText),
                                    $('meta[property="og:title"]').attr(
                                        "content",
                                        GObject.GLocale.get(new GObject.GLocaleKey("GDesigner", "text.design-by"))
                                            .replace("%name", owner.name)
                                            .replace("%appname", config.DESIGNER.TITLE)
                                    ),
                                    $('meta[property="og:description"]').attr("content", previewText),
                                    imageUrl && $('meta[property="og:image"]').attr("content", imageUrl),
                                    $('meta[property="og:url"]').attr("content", location.href),
                                    $('meta[name="twitter:card"]').attr("content", "summary_large_image"),
                                    $('meta[property="og:site_name"]').attr("content", config.DESIGNER.TITLE));
                            }
                        }
                        this._updateTitle({ saveToSessionHistory: false });
                        break;
                    case DocumentEvent.Type.StorageItemUpdated:
                        (this._updateTitle(), this._registerUsage(event.document));
                        break;
                    case DocumentEvent.Type.Added:
                        this._newDocumentDialog && this._newDocumentDialog.close();
                }
            }),
            (GDesigner.prototype._registerUsage = function (document) {
                const storageItem = document.getStorageItem();
                storageItem &&
                    storageItem.isRegistrable() &&
                    gApi.usage(storageItem.getId()).catch((error) => {
                        console.error("gApi.usage error", error);
                    });
            }),
            (GDesigner.prototype._windowEvent = function (event) {
                let htmlElement;
                switch (event.type) {
                    case GWindows.WindowEvent.Type.Added:
                    case GWindows.WindowEvent.Type.Removed:
                        this._updateTitle();
                        break;
                    case GWindows.WindowEvent.Type.Activated:
                        (1 === this._windows.getWindows().length && this._updateTheme(),
                            this.getToolManager().setView(event.window.getView()),
                            this._leftSidebars.setView(event.window.getView()),
                            this._rightSidebars.setView(event.window.getView()),
                            this._updateTitle(),
                            (htmlElement = event.window.getView().getHtmlElement()),
                            this._editorTouchHandler.activate(htmlElement));
                        break;
                    case GWindows.WindowEvent.Type.Deactivated:
                        ((htmlElement = event.window.getView().getHtmlElement()),
                            this._editorTouchHandler.deactivate(htmlElement),
                            this.getToolManager().setView(null),
                            this._leftSidebars.setView(null),
                            this._rightSidebars.setView(null),
                            this._updateTitle());
                }
            }),
            (GDesigner.prototype._sidebarEvent = function (event) {
                event.type === GSidebars.SidebarEvent.Type.Activated && this.relayout();
            }),
            (GDesigner.prototype._settingChangedEvent = function (event) {
                switch (event.key) {
                    case "touch":
                        (event.restoring && event.newValue && !this.isTouchEnabled() ? this.setTouchEnabled(false) : this._updateLayout(),
                            this._updateEditorOptions(),
                            this._updateGTM());
                        break;
                    case "theme":
                        this._setTheme(event.newValue);
                        break;
                    case "snap_disabled":
                        GEditor.GGuides.options.disabled = event.newValue;
                        break;
                    case "snap_zones":
                        GEditor.GGuides.options.zones = event.newValue;
                        break;
                    case "snap_guides":
                        GEditor.GGuides.options.guides = event.newValue;
                        break;
                    case "highlight_on_hover":
                        GEditor.GEditorOptions.highlightOnHover = event.newValue;
                        break;
                    case "dont_store_textpath":
                        GObject.GText.dontStorePaths = event.newValue;
                        break;
                    case "decimals_num":
                        GObject.GScene.decimalsNum = event.newValue;
                        break;
                    case "enable_steps_debug":
                        GEditor.GEditorOptions.debugTransactions = event.newValue;
                        break;
                    case "enable_cache":
                        "function" == typeof gdb_loaddesign &&
                            ((GObject.GRendererConfig.ENABLE_CACHE = event.newValue),
                            gDesigner.getActiveDocument() &&
                                gDesigner.getActiveDocument().getActiveWindow() &&
                                (gDesigner.getActiveDocument().getActiveWindow().getView().cleanCache(),
                                gDesigner.getActiveDocument().getActiveWindow().getView().configureCache()));
                        break;
                    case "ui_toolbar_alignment":
                        event.newValue ? this._frame.removeClass("ui-toolbar-center") : this._frame.addClass("ui-toolbar-center");
                }
            }),
            (GDesigner.prototype._updateGTM = async function () {
                const touchEnabled = !!this.isTouchEnabled();
                (GtmBridge.updateProperty("touch", touchEnabled), GtmBridge.fireEvent(GtmBridge.Events.SETTING_CHANGED_EVENT));
            }),
            (GDesigner.prototype._updateEditorOptions = function () {
                this.isTouchEnabled() ? this._applyTouchEditorOptions() : this._applyDefaultEditorOptions();
                const document = this.getActiveDocument(),
                    activeWindow = document && document.getActiveWindow(),
                    view = activeWindow && activeWindow.getView();
                view && GPlatform.GPlatform.scheduleFrame(() => view.invalidate(null, true));
            }),
            (GDesigner.prototype._applyTouchEditorOptions = function () {
                const dpi = GObject.GPaintCanvas.getScreenDPI();
                ((GEditor.GEditorOptions.distanceHelperBehaviour = GEditor.GSelectTool._DistanceHelperBehaviour.Click),
                    (GEditor.GEditorOptions.resizeHandlesInDetailMode = false),
                    (GEditor.GEditorOptions.rotateHandleInDetailMode = false),
                    (GEditor.GEditorOptions.annotationHandles.suppressRedundantCorners = true),
                    (GEditor.GEditorOptions.annotationHandles.gradient.size = 16 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.gradient.sizeBig = 20 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.preserveAspectRatio.side = GObject.GRect.Side.BOTTOM_RIGHT),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.skew.enabled = true),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.rotate.enabled = true),
                    (GEditor.GEditorOptions.annotationHandles.preserveAspectRatio.enabled = true),
                    (GObject.GPaintContext.prototype.transformBoxOutlineColor = GObject.GPaintContext.prototype.selectionOutlineColor),
                    (GEditor.GTransformBox.OUTSIDE_TOLERANCE = 0),
                    (GEditor.GEditorOptions.annotPickDistance = 4),
                    (GEditor.GEditorOptions.pickDistance = 20),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.size = 23 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.outlineWidth = 3 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.pivotSize = 23 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.pivotOutlineWidth = 3 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.outsideStroke = true),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.shadowColor = "transparent"),
                    (GEditor.GEditorOptions.rotateHandle = "bottom"),
                    (GEditor.GEditorOptions.annotationHandles.rotate.size = 23 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.rotate.iconSize = 23 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.rotate.outlineWidth = dpi),
                    (GEditor.GEditorOptions.annotationHandles.rotate.shadowColor = "transparent"),
                    (GEditor.GEditorOptions.annotationHandles.rotate.distance = 46 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.resize.size = 23 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.resize.outlineWidth = 3 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.resize.outsideStroke = true),
                    (GEditor.GEditorOptions.annotationHandles.resize.shadowColor = "transparent"),
                    (GEditor.GEditorOptions.annotationHandles.rectangle.size = 22 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.rectangle.outlineWidth = 4 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.rectangle.outsideStroke = true),
                    (GEditor.GEditorOptions.annotationHandles.rectangle.shadowColor = "transparent"),
                    (GEditor.GEditorOptions.annotationHandles.rectangle.maxNumberOfDetailedSegments = 1),
                    (GEditor.GEditorOptions.annotationHandles.polygon.size = 22 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.polygon.outlineWidth = 4 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.polygon.outsideStroke = true),
                    (GEditor.GEditorOptions.annotationHandles.polygon.shadowColor = "transparent"),
                    (GEditor.GEditorOptions.annotationHandles.polygon.maxNumberOfDetailedSegments = 2),
                    (GEditor.GEditorOptions.annotationHandles.ellipse.size = 22 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.ellipse.outlineWidth = 4 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.ellipse.outsideStroke = true),
                    (GEditor.GEditorOptions.annotationHandles.ellipse.shadowColor = "transparent"),
                    (GEditor.GEditorOptions.annotationHandles.ellipse.maxNumberOfDetailedSegments = 2),
                    (GEditor.GEditorOptions.annotationHandles.path.node.size = 20 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.path.node.outlineWidth = 2 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.path.control.size = 10 * dpi),
                    GEditor.GSkewHorizontalAnnotation.setIconVisible(true),
                    GEditor.GSkewVerticalAnnotation.setIconVisible(true),
                    GEditor.GPreserveAspectRatioAnnotation.setIconVisible(true),
                    GEditor.GRotateAnnotation.setIconVisible(true));
            }),
            (GDesigner.prototype._applyDefaultEditorOptions = function () {
                const dpi = GObject.GPaintCanvas.getScreenDPI();
                ((GEditor.GEditorOptions.distanceHelperBehaviour = GEditor.GSelectTool._DistanceHelperBehaviour.Default),
                    (GEditor.GEditorOptions.resizeHandlesInDetailMode = true),
                    (GEditor.GEditorOptions.rotateHandleInDetailMode = true),
                    (GEditor.GEditorOptions.annotationHandles.suppressRedundantCorners = false),
                    (GEditor.GEditorOptions.annotationHandles.gradient.size = 9 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.gradient.sizeBig = 12 * dpi),
                    GEditor.GSkewHorizontalAnnotation.setIconVisible(false),
                    GEditor.GSkewVerticalAnnotation.setIconVisible(false),
                    GEditor.GPreserveAspectRatioAnnotation.setIconVisible(false),
                    GEditor.GRotateAnnotation.setIconVisible(false),
                    (GObject.GPaintContext.prototype.transformBoxOutlineColor = new GObject.GRGBColor([23, 104, 196])),
                    (GEditor.GTransformBox.OUTSIDE_TOLERANCE = 100),
                    (GEditor.GEditorOptions.annotPickDistance = 0),
                    (GEditor.GEditorOptions.pickDistance = 4),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.size = 10 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.outlineWidth = null),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.pivotSize = null),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.pivotOutlineWidth = null),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.outsideStroke = false),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.shadowColor = null),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.skew.enabled = false),
                    (GEditor.GEditorOptions.annotationHandles.tranformBox.rotate.enabled = false),
                    (GEditor.GEditorOptions.annotationHandles.preserveAspectRatio.enabled = false),
                    (GEditor.GEditorOptions.rotateHandle = "top"),
                    (GEditor.GEditorOptions.annotationHandles.rotate.size = 10 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.rotate.outlineWidth = null),
                    (GEditor.GEditorOptions.annotationHandles.rotate.shadowColor = null),
                    (GEditor.GEditorOptions.annotationHandles.rotate.distance = 16 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.resize.size = 10 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.resize.outlineWidth = null),
                    (GEditor.GEditorOptions.annotationHandles.resize.outsideStroke = false),
                    (GEditor.GEditorOptions.annotationHandles.resize.shadowColor = null),
                    (GEditor.GEditorOptions.annotationHandles.rectangle.size = 8 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.rectangle.outlineWidth = null),
                    (GEditor.GEditorOptions.annotationHandles.rectangle.outsideStroke = false),
                    (GEditor.GEditorOptions.annotationHandles.rectangle.shadowColor = null),
                    (GEditor.GEditorOptions.annotationHandles.polygon.size = 8 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.polygon.outlineWidth = null),
                    (GEditor.GEditorOptions.annotationHandles.polygon.outsideStroke = false),
                    (GEditor.GEditorOptions.annotationHandles.polygon.shadowColor = null),
                    (GEditor.GEditorOptions.annotationHandles.ellipse.size = 8 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.ellipse.outlineWidth = null),
                    (GEditor.GEditorOptions.annotationHandles.ellipse.outsideStroke = false),
                    (GEditor.GEditorOptions.annotationHandles.ellipse.shadowColor = null),
                    (GEditor.GEditorOptions.annotationHandles.path.node.size = 10 * dpi),
                    (GEditor.GEditorOptions.annotationHandles.path.node.outlineWidth = null),
                    (GEditor.GEditorOptions.annotationHandles.path.control.size = 6 * dpi));
            }),
            (GDesigner.prototype._updateLayout = function () {
                ($("body").toggleClass("g-touch", this.isTouchEnabled()),
                    this.isTouchEnabled() ||
                        (this._leftSidebars && this._leftSidebars.getHtmlElement().toggleClass("bring-to-front", false),
                        this._rightSidebars && this._rightSidebars.getHtmlElement().toggleClass("bring-to-front", false),
                        this._assistantBar && this._assistantBar.getHtmlElement().toggleClass("bring-to-front", false)),
                    this._initialized &&
                        (this._leftSidebars.getActiveSidebar() || this._leftSidebars.setActiveSidebar(GOutlineSidebar.ID),
                        this._rightSidebars.getActiveSidebar() || this._rightSidebars.setActiveSidebar(GInspectorSidebar.ID),
                        this._leftSidebars.setActiveTouchTool(null),
                        this._rightSidebars.setActiveTouchTool(null),
                        this._setActiveAssistantBar(this.isTouchEnabled())),
                    this.relayout());
            }),
            (GDesigner.prototype._setTheme = function (theme) {
                (theme && "default" !== theme) || (theme = "light");
                var linkElement = $('head > link[href$=".css"]'),
                    hrefParts = linkElement.attr("href").split(".");
                ((hrefParts[2] = theme),
                    linkElement.attr("href", hrefParts.join(".")),
                    $(linkElement).load(
                        hrefParts.join("."),
                        function () {
                            var windows = this._windows.getWindows();
                            (themeConfig.DESIGNER.GUIDELINE_COLOR
                                ? (GEditor.GEditorOptions.guideLineColor = themeConfig.DESIGNER.GUIDELINE_COLOR)
                                : (GEditor.GEditorOptions.guideLineColor =
                                      "light" === theme ? new GObject.GRGBColor([107, 156, 228]) : new GObject.GRGBColor([227, 0, 97])),
                                themeConfig.DESIGNER.GUIDELINEHINT_COLOR
                                    ? (GEditor.GEditorOptions.guideLineHintColor = themeConfig.DESIGNER.GUIDELINEHINT_COLOR)
                                    : (GEditor.GEditorOptions.guideLineHintColor = "light" === theme ? "blue" : "#F790B6"),
                                themeConfig.DESIGNER.DISTANCEHELPER_COLOR && (GEditor.GEditorOptions.distanceHelperColor = themeConfig.DESIGNER.DISTANCEHELPER_COLOR),
                                themeConfig.DESIGNER.HIGHLIGHTOUTLINE_COLOR &&
                                    (GObject.GPaintContext.prototype.highlightOutlineColor = new GObject.GRGBColor([197, 17, 98])));
                            for (var n = 0; n < windows.length; ++n) {
                                var o = windows[n].getView();
                                o && (o.setRulers(!o.hasRulers()), o.setRulers(!o.hasRulers()));
                            }
                            this._updateTheme();
                        }.bind(this)
                    ));
            }),
            (GDesigner.prototype._updateTheme = function () {
                var activeWindow = this._windows.getActiveWindow();
                (activeWindow &&
                    activeWindow.getView() &&
                    GPlatform.GPlatform.scheduleFrame(
                        function () {
                            var labelColor = GObject.GRGBColor.BLACK,
                                backgroundColor = getComputedStyle(this._windows.getHtmlElement()[0]).getPropertyValue("background-color"),
                                rgbColor = GObject.GRGBColor.fromCSSColor(backgroundColor);
                            if (rgbColor) {
                                var screenColor = rgbColor.toScreen();
                                labelColor = (299 * screenColor[0] + 587 * screenColor[1] + 114 * screenColor[2]) / 1e3 >= 128 ? GObject.GRGBColor.BLACK : GObject.GRGBColor.WHITE;
                            }
                            ((GObject.GPaintContext.prototype.labelColor = labelColor), activeWindow && activeWindow.getView() && activeWindow.getView().invalidate());
                        }.bind(this)
                    ),
                    this.relayout());
            }),
            (GDesigner.prototype._updateTitle = async function () {
                let { saveToSessionHistory: saveHistory = true } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                var title = "";
                let appTitle = config.DESIGNER.TITLE;
                var isWeb = gContainer.getRuntime() === GContainer.Runtime.Browser || gContainer.getRuntime() === GContainer.Runtime.PWA;
                isWeb && saveHistory && window.history.pushState(null, "Title", "/");
                var activeWindow = this.getWindows().getActiveWindow();
                if (activeWindow) {
                    title = activeWindow.getTitle() + " - ";
                    let document = activeWindow.getDocument();
                    if (
                        (document &&
                            document.getOwner() &&
                            !document.isDocumentFromTemplate() &&
                            ((appTitle = ""),
                            (title = GObject.GLocale.get(new GObject.GLocaleKey("GDesigner", "text.design-by"))
                                .replace("%name", document.getOwner().name)
                                .replace("%appname", config.DESIGNER.TITLE))),
                        isWeb)
                    ) {
                        let storageItem = document.getStorageItem();
                        document &&
                            storageItem &&
                            (storageItem instanceof GCloudStorage.Item || (storageItem.supportsShadowFile() && (await storageItem.getCollaborativeFile()))) &&
                            (document.getStorageItem().getToken()
                                ? document.getFocusAnnotationId()
                                    ? window.history.pushState(
                                          null,
                                          "Title",
                                          "/?token=" + storageItem.getToken() + "&annot=" + document.getFocusAnnotationId()
                                      )
                                    : window.history.pushState(null, "Title", "/?token=" + storageItem.getToken())
                                : storageItem.getId() &&
                                  (document.getFocusAnnotationId()
                                      ? window.history.pushState(null, "Title", "/?d=" + storageItem.getId() + "&annot=" + document.getFocusAnnotationId())
                                      : window.history.pushState(null, "Title", "/?d=" + storageItem.getId())));
                    }
                }
                ((title += appTitle), (document.title = (0, Utils.decodeHTML)(title)));
            }),
            (GDesigner.prototype.addNotification = function (notification, builder) {
                this.hasEventListeners(NotificationEvent) && this.trigger(new NotificationEvent(notification, builder));
            }),
            (GDesigner.prototype._shortcutToMouseTrapShortcut = function (keys) {
                for (var t = "", n = 0; n < keys.length; ++n) {
                    n > 0 && (t += "+");
                    var o = keys[n];
                    if ("number" == typeof o)
                        switch ((o = GPlatform.GKey.transformKey(o))) {
                            case GPlatform.GKey.Constant.SPACE:
                                t += "space";
                                break;
                            case GPlatform.GKey.Constant.ENTER:
                                t += "enter";
                                break;
                            case GPlatform.GKey.Constant.TAB:
                                t += "tab";
                                break;
                            case GPlatform.GKey.Constant.BACKSPACE:
                                t += "backspace";
                                break;
                            case GPlatform.GKey.Constant.CONTROL:
                                t += "ctrl";
                                break;
                            case GPlatform.GKey.Constant.SHIFT:
                                t += "shift";
                                break;
                            case GPlatform.GKey.Constant.ALT_LEFT:
                            case GPlatform.GKey.Constant.ALT_RIGHT:
                                t += "alt";
                                break;
                            case GPlatform.GKey.Constant.LEFT:
                                t += "left";
                                break;
                            case GPlatform.GKey.Constant.UP:
                                t += "up";
                                break;
                            case GPlatform.GKey.Constant.RIGHT:
                                t += "right";
                                break;
                            case GPlatform.GKey.Constant.DOWN:
                                t += "down";
                                break;
                            case GPlatform.GKey.Constant.PAGE_UP:
                                t += "pageup";
                                break;
                            case GPlatform.GKey.Constant.PAGE_DOWN:
                                t += "pagedown";
                                break;
                            case GPlatform.GKey.Constant.HOME:
                                t += "home";
                                break;
                            case GPlatform.GKey.Constant.END:
                                t += "end";
                                break;
                            case GPlatform.GKey.Constant.INSERT:
                                t += "ins";
                                break;
                            case GPlatform.GKey.Constant.DELETE:
                                t += "del";
                                break;
                            case GPlatform.GKey.Constant.COMMAND:
                                t += "meta";
                                break;
                            case GPlatform.GKey.Constant.F1:
                                t += "f1";
                                break;
                            case GPlatform.GKey.Constant.F2:
                                t += "f2";
                                break;
                            case GPlatform.GKey.Constant.F3:
                                t += "f3";
                                break;
                            case GPlatform.GKey.Constant.F4:
                                t += "f4";
                                break;
                            case GPlatform.GKey.Constant.F5:
                                t += "f5";
                                break;
                            case GPlatform.GKey.Constant.F6:
                                t += "f6";
                                break;
                            case GPlatform.GKey.Constant.F7:
                                t += "f7";
                                break;
                            case GPlatform.GKey.Constant.F8:
                                t += "f8";
                                break;
                            case GPlatform.GKey.Constant.F9:
                                t += "f9";
                                break;
                            case GPlatform.GKey.Constant.F10:
                                t += "f10";
                                break;
                            case GPlatform.GKey.Constant.F11:
                                t += "f11";
                                break;
                            case GPlatform.GKey.Constant.F12:
                                t += "f12";
                                break;
                            default:
                                throw new Error("Unknown key code");
                        }
                    else t += o.toLowerCase();
                }
                return t;
            }),
            (GDesigner.prototype.isGravitIME = function (element) {
                return element && element.className === GPlatform.GSceneWidget.GRAVIT_IME;
            }),
            (GDesigner.prototype.hasModifiedDocuments = function () {
                for (var e = false, t = this.getDocuments(), n = 0; n < t.length; ++n)
                    if (t[n].isModified()) {
                        e = true;
                        break;
                    }
                return e;
            }),
            (GDesigner.prototype.getCanvasWidth = function () {
                return (
                    this.getWindows().getActiveWindow().getView().getWidth() -
                    ("none" !== $("#right-sidebars").css("display") ? $("#right-sidebars").width() : 0) -
                    ("none" !== $("#left-sidebars").css("display") ? $("#left-sidebars").width() : 0)
                );
            }),
            (GDesigner.prototype.getCanvasHeight = function () {
                return (
                    this.getWindows().getActiveWindow().getView().getHeight() - this.getHeader().getHeight() - this.getToolbar().getHeight()
                );
            }),
            (GDesigner.prototype.getCanvasCenter = function () {
                var dpi = GObject.GPaintCanvas.getScreenDPI(),
                    x = this.getCanvasWidth() / 2,
                    y = this.getCanvasHeight() / 2;
                return (
                    (x += "none" !== $("#left-sidebars").css("display") ? $("#left-sidebars").width() : 0),
                    (y += this.getHeader().getHeight() + this.getToolbar().getHeight()),
                    new GObject.GPoint(x * dpi, y * dpi)
                );
            }),
            (GDesigner.prototype.getStylePreview = function (style, wantText) {
                return this._stylesPreview[style.getReferenceId()]
                    ? wantText
                        ? this._stylesPreview[style.getReferenceId()].textBitmap
                        : this._stylesPreview[style.getReferenceId()].bitmap
                    : this.createNewStylePreview(style, true, wantText);
            }),
            (GDesigner.prototype.createStyleElement = function (style, includeText) {
                var rect = new GObject.GRectangle(0, 0, 50, 50);
                if (includeText && $.inArray(GObject.GStylable.PropertySet.Text, style.getProperty("ps")) >= 0) {
                    var text = new GObject.GText();
                    (text.setText("Ab"), text.assignStyleFrom(style), text.setProperty("_tfi", "20"), text.setBounds(7, 10, 50, 50), rect.appendChild(text));
                } else
                    (rect.assignStyleFrom(style),
                        $.inArray(GObject.GStylable.PropertySet.FillPaintLayers, style.getProperty("ps")) < 0 &&
                            $.inArray(GObject.GStylable.PropertySet.BorderPaintLayers, style.getProperty("ps")) < 0 &&
                            rect.getPaintLayers().appendChild(new GObject.GStylable.FillPaintLayer(new GObject.GRGBColor([235, 235, 235]), 1)));
                return rect;
            }),
            (GDesigner.prototype.createNewStylePreview = function (style, cache, wantText) {
                var preview = this.createStyleElement(style, false),
                    textPreview = this.createStyleElement(style, true);
                if (!gDesigner.getActiveDocument()) return null;
                var selection = gDesigner.getActiveDocument().getEditor().getSelection() || [];
                selection.length > 0 && selection[0].appendChild(textPreview);
                var bitmap = preview.toBitmap().toImageDataUrl(GObject.GBitmap.ImageType.PNG),
                    textBitmap = textPreview.toBitmap().toImageDataUrl(GObject.GBitmap.ImageType.PNG);
                return (
                    selection.length > 0 && selection[0].removeChild(textPreview),
                    cache &&
                        (this._stylesPreview[style.getReferenceId()] = {
                            preview: preview,
                            bitmap: bitmap,
                            textBitmap: textBitmap,
                        }),
                    wantText ? textBitmap : bitmap
                );
            }),
            (GDesigner.prototype.setVersion = function (version) {
                this._version = version;
            }),
            (GDesigner.prototype.getVersion = function () {
                return this._version;
            }),
            (GDesigner.prototype.setVersionFriendlyName = function (name) {
                this._versionFriendlyName = name;
            }),
            (GDesigner.prototype.getVersionFriendlyName = function () {
                return this._versionFriendlyName;
            }),
            (GDesigner.prototype.setCommitSHA = function (sha) {
                this._commitSHA = sha;
            }),
            (GDesigner.prototype.getCommitSHA = function () {
                return this._commitSHA;
            }),
            (GDesigner.prototype.setBuildNum = function (buildNum) {
                this._buildNum = buildNum;
            }),
            (GDesigner.prototype.getBuildNum = function () {
                return this._buildNum;
            }),
            (GDesigner.prototype.setIsBeta = function (isBeta) {
                this._isBeta = isBeta;
            }),
            (GDesigner.prototype.isBeta = function () {
                return this._isBeta;
            }),
            (GDesigner.prototype.setStoreVendor = function (vendor) {
                this._storeVendor = vendor;
            }),
            (GDesigner.prototype.getStoreVendor = function () {
                return this._storeVendor;
            }),
            (GDesigner.prototype._userLoggedEvent = function (event) {
                let user = event.user,
                    header = this.getHeader();
                if ((header && header.updateLoginInfo(user), user && user.getUID()))
                    (this.executeWhenReady(() => {
                        this.updateRecentDocumentsAction();
                    }),
                        (GEditor.GEditorOptions.userConfig = {
                            userName: user.getFullUserName(),
                            uid: user.getUID(),
                        }));
                else {
                    const anonymousLabel = GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.anonymous-user")),
                        displayName = (user && user.getFullUserName()) || anonymousLabel;
                    GEditor.GEditorOptions.userConfig = { userName: displayName, uid: -1 };
                }
            }),
            (GDesigner.prototype._userPropertiesChangedEvent = function (event) {
                const { user } = event;
                user &&
                    user.getUID() &&
                    (GEditor.GEditorOptions.userConfig = {
                        userName: user.getFullUserName(),
                        uid: user.getUID(),
                    });
            }),
            (GDesigner.prototype._beforeInstallUpdate = function (event) {
                this._reloading = true;
            }),
            (GDesigner.prototype._updateDataLayerWithLicenseData = function () {
                if (this._user && "undefined" != typeof dataLayer) {
                    dataLayer.push({ userType: this.getSubscriberUserType() });
                    const license = this.getLicense();
                    var expirationDate = license.getExpirationDate() || new Date(0),
                        expirationTimestamp = Math.floor(expirationDate.getTime() / 1e3),
                        creationDate = license.getCreationDate() || new Date(0),
                        creationTimestamp = Math.floor(creationDate.getTime() / 1e3),
                        diffMs = designerConfig.DateAPI.diff(creationDate, expirationDate),
                        durationDays = designerConfig.DateAPI.millisecondsToDays(diffMs);
                    (designerConfig.DateAPI.eq(creationDate, new Date(0)) && (creationTimestamp = "0000000000"),
                        designerConfig.DateAPI.eq(expirationDate, new Date(0)) && ((durationDays = 0), (expirationTimestamp = "0000000000")),
                        dataLayer.push({ expirationDate: expirationTimestamp }),
                        dataLayer.push({ licenseDuration: durationDays }),
                        dataLayer.push({ creationDate: creationTimestamp }));
                }
            }),
            (GDesigner.prototype._licenseChangedEvent = async function (event) {
                (event.license.isDefault() || ((this._enabledSubscriptions = true), gContainer.setProperty("enabled_subscriptions", true)),
                    "undefined" != typeof dataLayer &&
                        (this._utm && this._utm.forEach((value, key) => dataLayer.push({ [key]: value })),
                        this._updateDataLayerWithLicenseData(),
                        dataLayer.push({ event: "LICENSE_CHANGED_EVENT" })),
                    event.license.isOffline() &&
                        !this.isEnabledProFeatures("offline") &&
                        this.reload({
                            icon: "clock",
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.license-offline-title")),
                            subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.license-offline-subtitle")),
                            footer: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.license-offline-footer"))
                                .replace(
                                    "%close",
                                    $("<span/>")
                                        .addClass("link")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.license-offline-footer-highlight")))
                                        .prop("outerHTML")
                                )
                                .replace("%time", 5),
                            buttons: [
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")),
                                    onclick: (dialog) => dialog.gDialog("close"),
                                },
                            ],
                            attachTimer: (countdown) => {
                                const onOnline = () => {
                                    ((this._reloading = false), this.clearCountdown(countdown), $(window).off("online", onOnline));
                                };
                                (navigator.onLine && onOnline(), $(window).on("online", onOnline));
                            },
                        }),
                    $("body")
                        .toggleClass("pro-expired", this.isEnabledSubscriptions() && !this.isEnabledProFeatures())
                        .toggleClass("pro-license", this.isEnabledSubscriptions() && this.isEnabledProFeatures())
                        .toggleClass("pro-legacy", event.license.isLegacy())
                        .toggleClass("pro-subscription", event.license.isPro() && !event.license.isExpired())
                        .toggleClass("trial-expired", event.license.isTrial() && event.license.isExpired()),
                    this._toggleAdditionalSubscriptionClasses(event.license),
                    this.isEnabledProFeatures() || this.setTouchEnabled(false),
                    this._updateState());
            }),
            (GDesigner.prototype._toggleAdditionalSubscriptionClasses = function () {}),
            (GDesigner.prototype.signout = function (force, skipReload) {
                if (this.isEnabledSubscriptions() && !force) {
                    if (this.getDocuments().some((doc) => doc.isModified()))
                        return (
                            GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.save-before-logging-out"))),
                            Promise.reject(void 0)
                        );
                }
                return (
                    UserCache.clear(),
                    new Promise(async (resolve, reject) => {
                        (await (0, Utils._tryAndCatch)(() => gApi.signout()),
                            (this._user = null),
                            this.hasEventListeners(UserLoggedEvent) && this.trigger(new UserLoggedEvent(null)),
                            this.isEnabledSubscriptions() && (skipReload || ((this._reloading = true), location.reload())),
                            resolve());
                    })
                );
            }),
            (GDesigner.prototype.isReloading = function () {
                return this._reloading;
            }),
            (GDesigner.prototype.reload = function (options) {
                let { title, subtitle, icon, footer, buttons, attachTimer } = options;
                this._initialized &&
                    (this._reloading ||
                        ((this._reloading = true),
                        GSystemDialog
                            .custom({
                                icon: icon,
                                title: title,
                                subtitle: subtitle,
                                footer: footer,
                                buttons: buttons,
                                closeCallback: () => {
                                    const countdown = this.createCountdown(() => this.signout(true), 3e5);
                                    attachTimer && attachTimer(countdown);
                                },
                            })
                            .css({ zIndex: 9999 })));
            }),
            (GDesigner.prototype.clearCountdown = function (countdown) {
                let { timeoutID, intervalID: intervalID = 0 } = countdown;
                (intervalID && clearInterval(intervalID), timeoutID && clearInterval(timeoutID), $(".g-timer[data-interval=".concat(intervalID, "]")).remove());
            }),
            (GDesigner.prototype.createCountdown = function (onComplete, delay) {
                let timerElement = null;
                const endTime = designerConfig.DateAPI.addTime(new Date(), delay),
                    intervalID = setInterval(() => {
                        const remaining = endTime - Date.now();
                        if (remaining < 0) return (clearInterval(intervalID), void (timerElement && timerElement.remove()));
                        const minutes = Math.floor((remaining % 36e5) / 6e4),
                            seconds = Math.floor((remaining % 6e4) / 1e3);
                        (timerElement || (timerElement = $("<time></time>").attr("data-interval", intervalID).addClass("g-timer").appendTo($("body"))),
                            timerElement.text(
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.countdown-timer"))
                                    .replace("%minutes", minutes)
                                    .replace("%seconds", seconds)
                            ));
                    }, 1e3);
                let timeoutID = null;
                return (onComplete && (timeoutID = setTimeout(onComplete, delay)), { intervalID: intervalID, timeoutID: timeoutID });
            }),
            (GDesigner.prototype.openDeactivatedUserDialog = async function (user) {
                const messageElement = $(
                    "<div>".concat(
                        GObject.GLocale.get(new GObject.GLocaleKey("GDocument", "text.account-deactivated"))
                            .replace("%app", config.DESIGNER.TITLE)
                            .replace("%name", user.getFullUserName() || user.getEmail()),
                        "</div>"
                    )
                );
                (messageElement.find("a").on("click", (event) => {
                    event.preventDefault();
                    let dialogContent = $(event.target).closest(".g-dialog-content");
                    return (GCommonNames.resendEmailConfirmation(user).then(() => dialogContent.gDialog("close")), false);
                }),
                    GSystemDialog.custom({
                        className: "g-deactivated-user-dialog",
                        subtitle: messageElement,
                        icon: "email",
                    }));
            }),
            (GDesigner.prototype.getSyncUser = function () {
                return this._user;
            }),
            (GDesigner.prototype.getUser = function () {
                return new Promise(async (resolve, reject) => {
                    let user = await this.getCloudCommunicationManager().getUser();
                    this._anonymous = !!user && user.isAnonymous();
                    let isOffline = await this.isOfflineAsync();
                    if (!user && isOffline) {
                        const cachedUser = UserCache.getUser();
                        cachedUser && (user = new GUser(cachedUser));
                    }
                    if (!user || "lts" !== gDesigner.getEnv() || this.isEnabledProFeatures()) {
                        if (user && user.reload)
                            return (
                                this.reload({
                                    title: "We are currently doing some important maintenance work. Please save your design in the next five minutes to avoid loss of progress!",
                                }),
                                void resolve(null)
                            );
                        if (user)
                            if (!user || (this._user && GUser.equals(this._user, user))) {
                                if (this._user && user && !user.isDeactivated()) {
                                    const statsPlaceholder = { stats: void 0 };
                                    GObject.GUtil.equals(Object.assign({}, this._user, statsPlaceholder), Object.assign({}, user, statsPlaceholder), true) ||
                                        (this.hasEventListeners(UserPropertiesChangedEvent) && this.trigger(new UserPropertiesChangedEvent(user)));
                                }
                            } else
                                ("undefined" == typeof dataLayer ||
                                    user.isAnonymous() ||
                                    user.isDeactivated() ||
                                    (dataLayer.push({ userId: user.getUID() }),
                                    dataLayer.push({ userEmail: user.getEmail() }),
                                    dataLayer.push({ userName: user.name || "" }),
                                    dataLayer.push({ userLogin: user.login }),
                                    this._utm && this._utm.forEach((value, key) => dataLayer.push({ [key]: value })),
                                    this._updateDataLayerWithLicenseData(),
                                    dataLayer.push({ event: "USER_LOGGED_EVENT" })),
                                    this.hasEventListeners(UserLoggedEvent) && this.trigger(new UserLoggedEvent(user)));
                        var savedStats;
                        (this._user && user && this._user.getUID() === user.getUID() && (savedStats = this._user.stats),
                            (this._user = user),
                            this._user && !isOffline && UserCache.updateUser(this._user),
                            savedStats && (this._user.stats = savedStats),
                            resolve(this._user));
                    } else resolve(null);
                });
            }),
            (GDesigner.prototype.stats = function (event, value, skipThrottle, forceLog) {
                return Analytics.default.pageStats(event, value, this._user, skipThrottle, forceLog);
            }),
            (GDesigner.prototype.pageTracking = function (path, subPath) {
                return Analytics.default.pageTracking(path, subPath);
            }),
            (GDesigner.prototype.gtmEvent = function (event, data) {
                "undefined" != typeof dataLayer &&
                    (data &&
                        data.forEach((item) => {
                            "object" == typeof item && dataLayer.push(item);
                        }),
                    dataLayer.push({ event: event }));
            }),
            (GDesigner.prototype.intercomStats = function (event) {
                "function" == typeof Intercom && Intercom("trackEvent", event);
            }),
            (GDesigner.prototype.saveStats = function () {
                if (this._user && this._user.stats) {
                    var hash = Utilities.toMD5(JSON.stringify(this._user.stats || ""));
                    lastStatsHash !== hash && (gApi.updateUser({ stats: this._user.stats }), (lastStatsHash = hash));
                }
            }),
            (GDesigner.prototype.setEnv = function (env) {
                this._env = env;
            }),
            (GDesigner.prototype.getEnv = function () {
                return this._env;
            }),
            (GDesigner.prototype.hasSynchronizingDocuments = function () {
                for (var e = false, t = this.getDocuments(), n = 0; n < t.length; ++n)
                    if (t[n].isSynchronizing()) {
                        e = true;
                        break;
                    }
                return e;
            }),
            (GDesigner.prototype.zoomAtViewCenter = function (view, factor) {
                var usingSceneBBox,
                    bbox,
                    activeDocument = this.getActiveDocument();
                if (!activeDocument || !(bbox = activeDocument.getEditor().getSelectionBBox())) {
                    usingSceneBBox = true;
                    var scene = view.getScene();
                    scene && (bbox = scene.getPaintBBox());
                }
                var center = bbox && !bbox.isEmpty() ? bbox.getSide(GObject.GRect.Side.CENTER) : new GObject.GPoint(0, 0);
                if (usingSceneBBox && !view.getViewConfiguration().multiPageView) {
                    var viewCenter = view.getViewTransform().mapPoint(this.getCanvasCenter());
                    isNaN(viewCenter.getX()) || isNaN(viewCenter.getY()) || (center = viewCenter);
                }
                if (view.getViewConfiguration().multiPageView) {
                    var activePage = view.getScene().getActivePage();
                    activePage && (center = center.add(activePage.getPosition(true)));
                }
                view.zoomAtCenter(center, factor);
            }),
            (GDesigner.prototype.handleUnsavedDocuments = function () {
                return gDesigner.hasModifiedDocuments()
                    ? this.getDocuments()
                          .filter((doc) => doc.isModified())
                          .reduce(
                              (chain, doc) =>
                                  chain.then(
                                      () =>
                                          new Promise(async (resolve, reject) => {
                                              this.canUnloadDocument(doc)
                                                  .then((canUnload) => {
                                                      canUnload
                                                          ? resolve()
                                                          : this.executeAction(
                                                                GSaveAction.ID,
                                                                [
                                                                    doc,
                                                                    function () {
                                                                        let result =
                                                                            arguments.length > 0 && void 0 !== arguments[0]
                                                                                ? arguments[0]
                                                                                : {};
                                                                        const { documentStatus: documentStatus = null } = result;
                                                                        documentStatus && documentStatus === DocumentStatus.SaveCancelled ? reject(result) : resolve();
                                                                    },
                                                                ],
                                                                "unsavedhandler"
                                                            );
                                                  })
                                                  .catch((error) => {
                                                      reject(error);
                                                  });
                                          })
                                  ),
                              Promise.resolve()
                          )
                    : Promise.resolve();
            }),
            (GDesigner.prototype.canUnloadDocument = function (document) {
                let { changeActiveDocument: changeActiveDocument = true } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new Promise((resolve, reject) => {
                    if (!document.isModified() && !document.isSynchronizing()) return resolve(true);
                    (changeActiveDocument && this.getActiveDocument() !== document && this.activateDocument(document),
                        gDesigner.canExecuteAction(GSaveAction.ID, [document]) || resolve(true),
                        GSystemDialog.advanced({
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.document-modified")).replace(
                                "%title",
                                document.getTitle()
                            ),
                            closeCallback: (confirmed) => confirmed && reject({ documentStatus: DocumentStatus.SaveCancelled }),
                            buttons: [
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.dont-save")),
                                    onclick: () => {
                                        resolve(true);
                                    },
                                    closeOnClick: true,
                                    position: "left",
                                    shortcut: "n",
                                },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.cancel")),
                                    onclick: () => reject({ documentStatus: DocumentStatus.SaveCancelled }),
                                    closeOnClick: true,
                                    shortcut: "esc",
                                },
                                {
                                    label: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.save")) + "...",
                                    onclick: () => {
                                        resolve(false);
                                    },
                                    shortcut: this._shortcutToMouseTrapShortcut(GPlatform.GKey.Constant.ENTER),
                                    highlighted: true,
                                    closeOnClick: true,
                                },
                            ],
                        }));
                });
            }),
            (GDesigner.prototype.exportSwatches = function (type) {
                for (var swatches = this.getAllSwatches(type), swatchesNode = new GObject.GSwatches(), o = 0; o < swatches.length; ++o) {
                    var i = swatches[o].clone();
                    swatchesNode.appendChild(i);
                }
                var r = pako.gzip(GObject.GNode.serialize(swatchesNode), { level: 9 }),
                    storage = this.getDefaultStorage();
                if (storage.canPromptSave())
                    storage.savePrompt(
                        null,
                        [{ ext: "gvswatch", mime: "application/gzip" }],
                        (file) => {
                            (file.setSaveCounterMeasureEnabled(true), file.write(r), file.setSaveCounterMeasureEnabled(false));
                        },
                        null
                    );
                else if (storage.canDownload()) {
                    storage.download("Swatches.gvswatch", (file) => {
                        file && (file.setSaveCounterMeasureEnabled(true), file.write(r), file.setSaveCounterMeasureEnabled(false));
                    });
                }
            }),
            (GDesigner.prototype.importSwatches = function (type) {
                var storage = this.getDefaultStorage(),
                    isDocument = type.startsWith("document");
                storage.openPrompt(
                    [{ ext: "gvswatch", mime: "text/plain" }],
                    (file) => {
                        file.read((data) => {
                            try {
                                for (
                                    var swatches = this.getAllSwatches(type),
                                        importedNode = GObject.GNode.deserialize(pako.ungzip(data, { to: "string" })),
                                        newSwatches = [],
                                        s = importedNode.getFirstChild();
                                    null !== s;
                                    s = s.getNext()
                                ) {
                                    for (var l = true, c = 0; c < swatches.length; ++c)
                                        if (GObject.GUtil.equals(s, swatches[c])) {
                                            l = false;
                                            break;
                                        }
                                    l && newSwatches.push(s.clone());
                                }
                                if (((swatches = swatches.concat(newSwatches)), isDocument)) this.setSwatches(type, swatches, true);
                                else {
                                    for (c = 0; c < newSwatches.length; ++c) this._addGlobalSwatch(newSwatches[c]);
                                    this.setSwatches(type, this._swatches[type]);
                                }
                            } catch (error) {
                                (console.warn("error importing swatches: " + error),
                                    GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.fail-import-swatch"))));
                            }
                        });
                    },
                    false
                );
            }),
            (GDesigner.prototype.getFontsPath = function () {
                return this._fontsPath;
            }),
            (GDesigner.prototype.calculateFontsSize = function (fontGroups) {
                var self = this;
                return new Promise(function (resolve, reject) {
                    var sizes = {},
                        loadFontSize = function (url) {
                            return new Promise(function (resolve, reject) {
                                var request = new XMLHttpRequest();
                                (request.open("HEAD", self.getAssetsURL() + "" + url, true),
                                    (request.onload = function () {
                                        this.status >= 200 && this.status < 400
                                            ? ((sizes[url] = parseInt(request.getResponseHeader("Content-Length"))), resolve())
                                            : reject({ status: this.status, statusText: request.statusText });
                                    }),
                                    (request.onerror = function () {
                                        reject({ status: this.status, statusText: request.statusText });
                                    }),
                                    request.send());
                            });
                        },
                        promises = [];
                    (fontGroups.forEach((fontGroup) => {
                        promises.push(loadFontSize(fontGroup.preview));
                        for (var t = 0; t < fontGroup.fonts.length; ++t) promises.push(loadFontSize(fontGroup.fonts[t].url));
                    }),
                        Promise.all(promises).then(
                            () => {
                                resolve(sizes);
                            },
                            (error) => {
                                reject(error);
                            }
                        ));
                });
            }),
            (GDesigner.prototype.downloadFonts = function (fonts, sizes) {
                var self = this,
                    totalSize = 0,
                    progressByFont = {},
                    keys = Object.keys(sizes);
                if (keys.length) {
                    for (var s = 0, l = 0; l < keys.length; ++l) s += sizes[keys[l]];
                    totalSize = s;
                }
                $("#right-sidebars").find(".fonts-download-progress").remove();
                var progressElement = $("<div/>")
                        .addClass("fonts-download-progress")
                        .append(
                            $("<span/>")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.downloading-fonts")))
                                .addClass("info")
                        )
                        .append($("<span/>").addClass("count").text(" (0%)"))
                        .appendTo($("#right-sidebars")),
                    finishProgress = function (success) {
                        (progressElement
                            .find(".info")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", success ? "text.fonts-downloaded" : "text.error-downloading"))),
                            progressElement.find(".count").remove(),
                            progressElement.append(
                                $("<span/>")
                                    .text("X")
                                    .addClass("g-button")
                                    .addClass("close")
                                    .on("click", function () {
                                        (gDesigner.stats("font_downloaded_closebutton"), progressElement.remove());
                                    })
                            ));
                    };
                return new Promise(function (resolve, reject) {
                    var results = [];
                    try {
                        var downloadFont = function (url) {
                                return new Promise(function (resolve, reject) {
                                    var request = new XMLHttpRequest();
                                    (request.open("GET", self.getAssetsURL() + "" + url, true),
                                        (request.responseType = "blob"),
                                        (request.onprogress = function (progressEvent) {
                                            ((progressByFont[url] = progressEvent.loaded),
                                                (function () {
                                                    let fontUrls = Object.keys(progressByFont);
                                                    if (fontUrls.length) {
                                                        let loaded = 0;
                                                        for (var t = 0; t < fontUrls.length; ++t) loaded += progressByFont[fontUrls[t]];
                                                        let percent = Math.round((loaded / totalSize) * 100);
                                                        progressElement.find(".count").text(" (" + (percent < 100 ? percent : 100) + "%)");
                                                    }
                                                })());
                                        }),
                                        (request.onload = function () {
                                            this.status >= 200 && this.status < 400
                                                ? resolve({ blob: request.response, url: url })
                                                : reject({ status: this.status, statusText: request.statusText });
                                        }),
                                        (request.onerror = function () {
                                            reject({ status: this.status, statusText: request.statusText });
                                        }),
                                        request.send());
                                });
                            },
                            promises = [],
                            collectResult = function (result) {
                                results.push(result);
                            },
                            throwDownloadError = function () {
                                throw new Exception("error downloading fonts");
                            };
                        (fonts.forEach((fontGroup) => {
                            promises.push(
                                downloadFont(fontGroup.preview)
                                    .then(function (result) {
                                        collectResult(result);
                                    })
                                    .catch(() => {
                                        throwDownloadError();
                                    })
                            );
                            for (var t = 0; t < fontGroup.fonts.length; ++t)
                                promises.push(
                                    downloadFont(fontGroup.fonts[t].url)
                                        .then(function (result) {
                                            collectResult(result);
                                        })
                                        .catch((error) => {
                                            (console.log(error), throwDownloadError());
                                        })
                                );
                        }),
                            Promise.all(promises).then(
                                () => {
                                    (finishProgress(true), resolve(results));
                                },
                                (error) => {
                                    (console.log(error), finishProgress(false), reject());
                                }
                            ));
                    } catch (error) {
                        (console.log(error), finishProgress(false), reject());
                    }
                });
            }),
            (GDesigner.prototype.showCreateAccount = function () {
                return this._showCreateAccount;
            }),
            (GDesigner.prototype.setShowCreateAccount = function (show) {
                this._showCreateAccount = show;
            }),
            (GDesigner.prototype.getSignupOptions = function () {
                return this._signupOptions;
            }),
            (GDesigner.prototype.setSignupOptions = function (options) {
                this._signupOptions = options;
            }),
            (GDesigner.prototype.enterpriseLoginForm = function () {
                return false;
            }),
            (GDesigner.prototype.setEnterpriseLoginForm = function (e) {}),
            (GDesigner.prototype.runDeepLink = async function (action) {
                let params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if ((console.log("Called: " + action), action))
                    try {
                        const user = await this.getUser();
                        if (0 === action.indexOf("purchase")) {
                            let productId;
                            return (
                                params.hasOwnProperty("newuser") && (this._showCreateAccount = true),
                                config.PURCHASE.URL_TO_PRODUCT && (productId = config.PURCHASE.URL_TO_PRODUCT[action]),
                                productId &&
                                    (Object.assign(params, { productId: productId }),
                                    user
                                        ? await gApi.updateUserSettings({
                                              subscription: { annual: { productId: productId } },
                                          })
                                        : gContainer.setCookie({
                                              name: "_gproductid",
                                              value: productId || "",
                                              url: gApi.url,
                                          })),
                                this.openPaymentDialog(null, Object.assign(params, { flow: action }))
                            );
                        }
                        if ("login_dialog" === action) this._user || GCommonNames.performLogin();
                        else {
                            if ("confirm_email" === action) {
                                const { confirm_email, flow } = params;
                                return this.getCloudCommunicationManager()
                                    .confirmEmail(confirm_email)
                                    .then(async () => {
                                        let user = await this.getUser();
                                        user &&
                                            user.isEmailVerified() &&
                                            this.executeWhenReady(() => {
                                                const license = this.getLicense();
                                                (GSystemDialog.custom({
                                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.activating-your-account")),
                                                    subtitle:
                                                        (license.isPro() || license.isTrial()) &&
                                                        GObject.GLocale.get(
                                                            new GObject.GLocaleKey("GCommonNames", "text.activating-your-account-subtitle")
                                                        ),
                                                    icon: "ok",
                                                }),
                                                    flow && "confirm_email" !== flow && this.runDeepLink(flow, params));
                                            });
                                    })
                                    .catch((error) => {
                                        if (!user) return Promise.reject(error);
                                        this.executeWhenReady(() => GSystemDialog.error(error));
                                    });
                            }
                            // "account" deep link removed: it bypassed the action
                            // framework and opened the dead cloud profile dialog even
                            // though GOpenAccountSettingsAction is hidden in this fork.
                            if ("purchases" === action) {
                                user &&
                                    (await gApi.hasPurchases()) &&
                                    this.executeWhenReady(() => {
                                        new GProfileDialog(user, "purchase").open();
                                    });
                            } else if ("newuser" === action) this._showCreateAccount = true;
                            else if ("enterprise" === action) user || (this._enterpriseLoginForm = true);
                            else if ("reset_trial" === action) {
                                const resetAndUpdate = () => {
                                    gApi.license.resetTrial().then(() => gDesigner.requestLicenseUpdate());
                                };
                                user
                                    ? resetAndUpdate()
                                    : new EventWaiter.default()
                                          .listen(UserLoggedEvent)
                                          .when((event) => !!event && !!event.user)
                                          .do(resetAndUpdate);
                            } else if ("procoupon" === action)
                                this.executeWhenReady(() => {
                                    GCommonNames.activateCoupon(params.procoupon);
                                });
                            else if ("annot" === action)
                                designerConfig.HAS_ANNOTATIONS &&
                                    this.executeWhenReady(() => {
                                        const { annot } = params;
                                        (this.setPartVisible(Parts.RightSidebars, true), this._rightSidebars.setActiveSidebar(GAnnotationsSidebar.ID));
                                    });
                            else if (action === GContainer.DeepLinking.CreateShare && "true" === params[GContainer.DeepLinking.CreateShare])
                                new EventWaiter.default()
                                    .listen(GApplicationStatusEvent)
                                    .when(() => this._initialized)
                                    .do(() => {
                                        const shareHandler = (event) => {
                                            if (event.type === ShareEvent.Type.Updated) {
                                                const activeDocument = this.getActiveDocument();
                                                activeDocument &&
                                                    activeDocument.getStatus() === DocumentStatus.Loaded &&
                                                    (activeDocument.isShareable() &&
                                                        !this.getApplicationManager().isSharing() &&
                                                        this.getShareManager().share(),
                                                    this.removeEventListener(ShareEvent, shareHandler, this));
                                            }
                                        };
                                        this.addEventListener(ShareEvent, shareHandler, this);
                                    });
                            else if (action === GContainer.DeepLinking.ActivateTrial && params[GContainer.DeepLinking.ActivateTrial]) {
                                const trialToken = params[GContainer.DeepLinking.ActivateTrial];
                                gApi.license.activateTrial(trialToken).then(() => LicenseChecker.checkLicense());
                            } else {
                                if (action === GContainer.DeepLinking.SetPassword) return new SetPasswordFlow().execute(params);
                                if (action === GContainer.DeepLinking.ResetPassword) return new ResetPasswordFlow().execute(params);
                                if (action === GContainer.DeepLinking.PasswordlessToken) return new PasswordlessTokenFlow().execute(params);
                            }
                        }
                        return Promise.resolve();
                    } catch (error) {
                        return Promise.reject(error);
                    }
            }),
            (GDesigner.prototype.openProOffer = function () {
                let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                SubscriptionOffer.openSubscriptionOffer(options);
            }),
            (GDesigner.prototype.handlePROFeatureInterruption = function () {
                let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                ((options = $.extend({ campaign: "profeature" }, options)),
                    this.isAnonymous()
                        ? new GEmbeddedLogin(() => {}).open({
                              anonymous: true,
                              signup: true,
                              animate: true,
                              options: options,
                          })
                        : this.openProOffer(options));
            }),
            (GDesigner.prototype.handleShareFilePROFeatureInterruption = function () {
                this.handlePROFeatureInterruption({ shareFile: true });
            }),
            (GDesigner.prototype._applicationStatusEvent = function (event) {
                event.status === GApplicationStatusEvent.Status.Ready && (this._ready = true);
            }),
            (GDesigner.prototype.executeWhenReady = function (callback) {
                return new EventWaiter.default()
                    .listen(GApplicationStatusEvent)
                    .when(() => this._ready)
                    .do(callback);
            }),
            (GDesigner.prototype.isReady = function () {
                return this._ready;
            }),
            (GDesigner.prototype.isInAppPurchaseAllowed = function () {
                return gInAppPurchase.canMakePayments();
            }),
            (GDesigner.prototype.openPaymentDialog = async function (productId) {
                let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return (this.getAmplitudeHelper().logEvent(designerConfig.AmplitudeData.Events.ACCOUNT_CART_SCREEN), gInAppPurchase.purchase(productId, options));
            }),
            (GDesigner.prototype.getWebURL = function () {
                return gContainer.getRuntime() === GContainer.Runtime.Browser || gContainer.getRuntime() === GContainer.Runtime.PWA
                    ? location.origin
                    : gDesigner.getAssetsURL();
            }),
            (GDesigner.prototype.getAssetsURL = function () {
                return "production" === this.getEnv()
                    ? designerConfig.prodURL
                    : this.isBeta()
                      ? designerConfig.betaURL
                      : "lts" === this.getEnv()
                        ? designerConfig.ltsURL
                        : "rc" === this.getEnv()
                          ? designerConfig.rcURL
                          : "https://app-" + this.getEnv().split(".")[0] + "." + designerConfig.domain + "/";
            }),
            (GDesigner.prototype.getTabByDocument = function (document) {
                return this.getHeader().getWindowTab(this.getWindows().getWindow(document));
            }),
            (GDesigner.prototype.getOpacityIncrement = function () {
                return 1;
            }),
            (GDesigner.prototype.registerAdditionalShortcuts = function (action) {
                var shortcuts = action.getAdditionalShortcuts();
                shortcuts &&
                    shortcuts.length &&
                    shortcuts.forEach((shortcut) => {
                        this.registerShortcut(shortcut, (event) => this._executeShortcutAction(action, event), false);
                    });
            }),
            (GDesigner.prototype._executeShortcutAction = function (action, event) {
                const args = action.isKeyBoardEventRequiredToExecute() ? [event] : [void 0];
                return this.executeAction(action.getId(), args, "shortcut");
            }),
            (GDesigner.prototype.getPaste = function () {
                return this._paste;
            }),
            (GDesigner.prototype.getSubscriberUserType = function () {
                return this.getLicense().getSubscriberUserType();
            }),
            (GDesigner.prototype.isLegacyFeature = function (feature) {
                return !!feature && features.includes(feature);
            }),
            (GDesigner.prototype.isEnabledProFeatures = function (feature) {
                if (!this.isEnabledSubscriptions()) return true;
                const license = this.getLicense();
                return (
                    !(license.isFree() || this.isAnonymous() || license.isGuest()) &&
                    (!(!license.isLegacy() || !this.isLegacyFeature(feature)) || (!license.isExpired() && (!license.isOffline() || !license.isOfflinePeriodExpired())))
                );
            }),
            (GDesigner.prototype.isProTooltipNeeded = function (feature) {
                const license = this.getLicense();
                return !(feature && this.isLegacyFeature(feature) && license.isLegacy()) && !(license.isPro() && !license.isExpired());
            }),
            (GDesigner.prototype.preInit = async function (subscriptionsPromise) {
                const self = this;
                (await (async function () {
                    subscriptionsPromise || (subscriptionsPromise = gApi.isEnabledSubscriptions());
                    if (await subscriptionsPromise.catch(() => false))
                        return (
                            (self._enabledSubscriptions = true),
                            void gContainer.setProperty("enabled_subscriptions", self._enabledSubscriptions)
                        );
                    self._enabledSubscriptions = await gContainer.getProperty("enabled_subscriptions").catch(() => false);
                })(),
                    await new Promise((resolve) => {
                        self._applicationManager = new GApplicationManager(resolve);
                    }));
            }),
            (GDesigner.prototype.isEnabledSubscriptions = function () {
                return !!this.isInAppPurchaseAllowed() || !!this._enabledSubscriptions;
            }),
            (GDesigner.prototype.setLicense = function (license) {
                (!license ||
                    (this._license && license.equals(this._license)) ||
                    ((this._license = license), this.hasEventListeners(LicenseChangedEvent) && this.trigger(new LicenseChangedEvent(this._license))),
                    this.updateLicenseInfo());
            }),
            (GDesigner.prototype.updateLicenseInfo = async function () {
                let license = this._license,
                    licenseInfoElement = $(".license-info");
                const currentType = licenseInfoElement.data("type");
                (currentType && currentType === license.getLicenseType()) || (licenseInfoElement.remove(), (licenseInfoElement = null));
            }),
            (GDesigner.prototype.getLicense = function () {
                return navigator.onLine ? this._license || LicenseFactory.newDefaultLicense() : LicenseFactory.newOfflineLicense();
            }),
            (GDesigner.prototype.getLicenseAsync = async function () {
                return (await this.isOfflineAsync()) ? LicenseFactory.newOfflineLicense() : this._license || LicenseFactory.newDefaultLicense();
            }),
            (GDesigner.prototype.activateTrialLicense = async function () {
                const activate = async () => {
                    this.toggleLoading(true);
                    try {
                        await gApi.license
                            .activateTrial()
                            .then(() => gDesigner.requestLicenseUpdate())
                            .catch((error) => GSystemDialog.alert(gApi.formatError(error)));
                    } finally {
                        this.toggleLoading(false);
                    }
                };
                gDesigner.isOffline() ? GOfflineDialog.openUnavailableFeature(activate) : activate();
            }),
            (GDesigner.prototype.requestLicenseUpdate = function () {
                let { showProOfferInTrial: e = designerConfig.LICENSE.UPGRADEABLE } =
                    arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return (reminderManager.reset("proOfferInTrial", e ? void 0 : gDesigner.now()), LicenseChecker.checkLicense());
            }),
            (GDesigner.prototype.now = function () {
                return new Date();
            }),
            (GDesigner.prototype.isOffline = function (minWaitOverride) {
                if (!navigator.onLine) return ((cachedOfflineState = true), (lastOfflineCheckTime = Date.now()), true);
                const minWait = minWaitOverride || designerConfig.OFFLINE_CHECK_MIN_WAIT;
                var offline = !!cachedOfflineState;
                if (Date.now() - lastOfflineCheckTime > minWait) {
                    offline = false;
                    var request = new XMLHttpRequest();
                    request.onerror = function () {
                        (console.log("OFFLINE!!!"), (offline = true));
                    };
                    try {
                        (request.open("HEAD", gApi.url + "/connection/test", false),
                            (request.withCredentials = designerConfig.CONNECTION_TEST_WITH_CREDENTIALS),
                            request.setRequestHeader("Accept", "text/plain"),
                            request.setRequestHeader("Content-Type", "text/plain"),
                            request.send());
                    } catch (error) {
                        offline = true;
                    }
                    cachedOfflineState = offline;
                }
                return ((lastOfflineCheckTime = Date.now()), !navigator.onLine || offline);
            }),
            (GDesigner.prototype.setPaintMode = function (paintMode) {
                var activeWindow = this.getWindows().getActiveWindow();
                if (activeWindow) {
                    var view = activeWindow.getView();
                    ((view.getViewConfiguration().paintMode = paintMode),
                        GPlatform.GPlatform.scheduleFrame(() => {
                            (view.invalidateAndResetCache(null), this.hasEventListeners(PaintModeChangedEvent) && this.trigger(new PaintModeChangedEvent(paintMode)));
                        }));
                }
            }),
            (GDesigner.prototype.isOfflineAsync = async function () {
                if (!navigator.onLine) return ((cachedOfflineState = true), (lastOfflineCheckTime = Date.now()), true);
                var offline = !!cachedOfflineState,
                    settled = false;
                if (null === offlineCheckTimeoutId && Date.now() - lastOfflineCheckTime > 3100) {
                    var header = this.getHeader();
                    header && header.showBusyIcon(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.checking-connectivity")));
                    try {
                        await (() =>
                            new Promise((resolve, reject) => {
                                let timeout;
                                timeout = this._initialized ? 3e3 : 2e4;
                                var request = new XMLHttpRequest();
                                ((request.onerror = (errorEvent) => {
                                    ((offline = true), (settled = true), resolve());
                                }),
                                    (request.onload = (loadEvent) => {
                                        ((offline = false), (settled = true), resolve());
                                    }));
                                var timeoutId = (offlineCheckTimeoutId = setTimeout(() => {
                                    (timeoutId === offlineCheckTimeoutId && (offlineCheckTimeoutId = null), settled || ((offline = true), resolve()));
                                }, timeout));
                                try {
                                    (request.open("HEAD", gApi.url + "/connection/test", true),
                                        (request.withCredentials = designerConfig.CONNECTION_TEST_WITH_CREDENTIALS),
                                        (request.timeout = 2e3),
                                        request.setRequestHeader("Accept", "text/plain"),
                                        request.setRequestHeader("Content-Type", "text/plain"),
                                        request.send());
                                } catch (error) {
                                    ((offline = true), (settled = true), resolve());
                                }
                            }))();
                    } finally {
                        (header && header.hideBusyIcon(), (cachedOfflineState = offline));
                    }
                }
                return ((lastOfflineCheckTime = Date.now()), !navigator.onLine || offline);
            }),
            (GDesigner.prototype.getLinkerParam = function (trackingId) {
                const analyticsObj = window[window.GoogleAnalyticsObject];
                if (analyticsObj) {
                    const trackers = analyticsObj.getAll && analyticsObj.getAll();
                    if (trackers)
                        for (let t = 0; t < trackers.length; t++) {
                            let tracker = trackers[t];
                            if (!trackingId || tracker.get("trackingId") === trackingId) return tracker.get("linkerParam");
                        }
                }
                return null;
            }),
            (GDesigner.prototype.isLocalhost = function () {
                return "localhost" === window.location.hostname;
            }),
            (GDesigner.prototype.getAppBaseUrl = function () {
                let absolute = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return AppUrlHelper.default.getAppBaseUrl(absolute);
            }),
            (GDesigner.prototype.setPwaEvent = function (event) {
                if (!event || "beforeinstallprompt" !== event.type) return;
                if (
                    ((this._pwaEvent = event),
                    this._waitingPwaDialog &&
                        !this._installPwaDialog &&
                        (this.showInstallPwaDialog(this._waitingPwaDialogDarkBackground),
                        (this._waitingPwaDialog = null),
                        (this._waitingPwaDialogDarkBackground = null)),
                    window.screen.availWidth < 1024)
                )
                    return;
                const now = gDesigner.now().getTime();
                gContainer.getProperty(GInstallToDesktopAction.closedInstallPWADialogDatePropName).then((closedDate) => {
                    closedDate && now - closedDate < designerConfig.DateAPI.daysToMilliseconds(30)
                        ? gContainer.setProperty(GInstallToDesktopAction.installPWA3timesAWeekPropName, JSON.stringify([]))
                        : gContainer.getProperty(GInstallToDesktopAction.installPWA3timesAWeekPropName).then((historyRaw) => {
                              let history,
                                  recentCloses = [];
                              if (historyRaw && historyRaw.length)
                                  try {
                                      history = JSON.parse(historyRaw);
                                  } catch (error) {}
                              history || (history = []);
                              for (let e = 0, count = history.length; e < count; e++) {
                                  const closeTime = history[e];
                                  now - closeTime < designerConfig.DateAPI.daysToMilliseconds(7) && recentCloses.push(closeTime);
                              }
                              (2 === recentCloses.length &&
                                  (gDesigner._ready
                                      ? gDesigner.showInstallPwaDialog()
                                      : this.executeWhenReady(() => {
                                            gDesigner.showInstallPwaDialog();
                                        })),
                                  recentCloses.push(now),
                                  recentCloses.length > 2 && (recentCloses = recentCloses.slice(-2)),
                                  gContainer.setProperty(GInstallToDesktopAction.installPWA3timesAWeekPropName, JSON.stringify(recentCloses)));
                          });
                });
            }),
            (GDesigner.prototype.showInstallPwaDialog = function () {
                let darkBackground = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (!this._installPwaDialog) {
                    this._shouldWaitForPWAEvent()
                        ? ((this._waitingPwaDialog = true), (this._waitingPwaDialogDarkBackground = darkBackground))
                        : ((this._installPwaDialog = new GInstallPwaDialog(darkBackground)), this._installPwaDialog.open());
                }
            }),
            (GDesigner.prototype._shouldWaitForPWAEvent = function () {
                return !this.hasPwaEvent() && !!PwaInstallSupport.isSupported();
            }),
            (GDesigner.prototype.closeInstallPwaDialog = function () {
                this._installPwaDialog && (this._installPwaDialog.close(), (this._installPwaDialog = null));
            }),
            (GDesigner.prototype.getPwaEvent = function () {
                return this._pwaEvent;
            }),
            (GDesigner.prototype.hasPwaEvent = function () {
                return !!this._pwaEvent;
            }),
            (GDesigner.prototype.draggableItemIsDragging = function () {
                return this._draggableItemIsDragging;
            }),
            (GDesigner.prototype.setItemDraggingState = function (dragging) {
                this._draggableItemIsDragging = dragging;
            }),
            (GDesigner.prototype.hasDocuments = function () {
                return !!this.getDocuments().length;
            }),
            (GDesigner.prototype.getAmplitudeHelper = function () {
                return this._amplitudeHelper;
            }),
            (GDesigner.prototype._initAmplitudeProperties = async function () {
                const user = await this.getUser();
                ((this._amplitudeHelper = new designerConfig.AmplitudeHelper(amplitude, {
                    userId: null == user ? void 0 : user.id,
                    apiKey: window.AMPLITUDE_API_KEY,
                })),
                    new GAmplitudeAnalyticsTracker(this._amplitudeHelper));
            }),
            (GDesigner.prototype._updateState = function () {
                var toolbar, leftSidebars, rightSidebars, banner, overlay, mainMenu, header;
                const license = gDesigner.getLicense();
                (null === (toolbar = this._toolbar) || void 0 === toolbar || toolbar.setEnabled(license.canAccessFreemium()),
                    null === (leftSidebars = this._leftSidebars) || void 0 === leftSidebars || leftSidebars.setEnabled(this._leftSidebars, license.canAccessFreemium()),
                    null === (rightSidebars = this._rightSidebars) || void 0 === rightSidebars || rightSidebars.setEnabled(this._rightSidebars, license.canAccessFreemium()),
                    null === (banner = this._banner) || void 0 === banner || banner.setEnabled(license.canAccessFreemium()),
                    null === (overlay = this._overlay) || void 0 === overlay || overlay.setEnabled(license.canAccessFreemium()),
                    null === (mainMenu = this._mainMenu) || void 0 === mainMenu || mainMenu.setEnabled(license.canAccessFreemium()),
                    null === (header = this._header) || void 0 === header || header.setWindowTabEnable(license.canAccessFreemium()),
                    this.relayout());
            }),
            (GDesigner.prototype.isUserActivelyUsingApp = function () {
                var e;
                const t =
                        null === (e = this.getActiveDocument()) || void 0 === e || null === (e = e.getEditor()) || void 0 === e
                            ? void 0
                            : e.getUndoStates(),
                    n = (null == t ? void 0 : t.length) && t[t.length - 1];
                return !!n && Date.now() - n.createdAt < config.ACTIVE_USAGE_IDLE_TIME;
            }),
            (module.exports = GDesigner));
    };
