module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */),
            require(19),
            require(168 /* PDFFetchStream */),
            require(30 /* polyfill:Object */),
            require(8 /* Symbol */),
            require(196 /* polyfill:Promise */),
            require(20 /* polyfill:RegExp */),
            require(107 /* polyfill:RegExp */),
            require(34),
            require(4),
            require(41),
            require(13),
            require(32),
            require(38),
            require(169 /* PDFNetworkStream */),
            require(33),
            require(26),
            require(125),
            require(126 /* polyfill:URL */),
            require(114));
        var designerConfig = require(10),
            buildConstants = require(231 /* IS_TRUNK */),
            editorModules = require(53),
            GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            richTooltipModule = require(67),
            GMSTeamsAppLoader = _interopRequireDefault(require(1484)),
            teamsHelper = _interopRequireDefault(require(443)),
            gtmInit = _interopRequireDefault(require(1485)),
            gQADebugTools = _interopRequireDefault(require(1486)),
            welcomeScreenSettings = _interopRequireDefault(require(1487));
        const { nodeEnv, isBeta, storeVendor, isCorel, isTeams } = require(803),
            buildFlags = require(231 /* IS_TRUNK */),
            canSelfUpdate = !storeVendor,
            runtimeDetector = require(859);
        require(1488);
        require(1489);
        const GMaintenanceStatus = require(1490);
        var GDesigner = require(1491),
            GDocument = require(163),
            GAlignAction = require(866),
            GArrangeAction = require(869),
            GAttachToPathAction = require(1176),
            GCancelCropAction = require(1311),
            GClipAction = require(809),
            GConnectLinesAction = require(1597),
            GConvertToPathAction = require(810),
            GConvertToRawPathAction = require(1320),
            GCreateSymbolAction = require(608),
            GCropAction = require(1310),
            GDetachSymbolAction = require(874),
            GResetInstanceAction = require(1177),
            GCreateNestedCompoundAction = require(1316),
            GCutCopyAction = require(1331),
            GDeleteAction = require(1332),
            GDeselectAllAction = require(1334),
            GDetachFromPathAction = require(1178),
            GDistributeAction = require(867),
            GDuplicateAction = require(1315),
            GEditElementAction = require(1312),
            GExportAction = require(861),
            GFitAllAction = require(449),
            GFitCurrentLayerAction = require(1598),
            GFitSelectionAction = require(566),
            GGroupAction = require(811),
            GInvertSelectionAction = require(1599),
            GInstallToDesktopAction = require(1172),
            GJoinPathsAction = require(1179),
            GMagnificationAction = require(1167);
        const GMergeMainAction = require(812),
            GMergeSubAction = require(1600);
        var GNewAction = require(1601),
            GNewClipboardAction = require(1602),
            GNewWindowAction = require(1296),
            GOffsetAction = require(1317),
            GOriginalViewAction = require(1282),
            GOutlineAction = require(1185),
            GOutlineViewAction = require(1297),
            GFastViewAction = require(1603),
            GPasteAction = require(877),
            GPasteInPlaceAction = require(1183);
        const GPasteAndReplaceAction = require(876);
        var GPasteInsideAction = require(1184),
            GPasteHereAction = require(1182),
            GPasteStyleAction = require(875),
            GEnterLayerGroupAction = require(1605),
            GLockLayerAction = require(1606),
            GToggleLayerVisibilityAction = require(1607),
            GRenameLayerAction = require(1340),
            GOpenAction = require(813),
            GSafariOpenAction = require(1299),
            GImportFontsAction = require(1608),
            GPrintAction = require(1609),
            GRedoAction = require(1284),
            GReverseOrderAction = require(1611),
            GSaveAction = require(447),
            GSaveAllAction = require(1612),
            GSaveAsAction = require(445),
            GSelectAllAction = require(1333),
            GSelectByFontTypeAction = require(1180);
        const GSelectByPaintLayerAction = require(1304),
            GSelectByBorderWidthAction = require(1305),
            GSelectByTransparencyAction = require(1306),
            GSelectByBlendModeAction = require(1307),
            GSelectByShapeAction = require(1308),
            GSelectByEffectAction = require(1309);
        var GSettingsAction = require(1613),
            GShowGridAction = require(1285),
            GShowGuideLinesAction = require(1169),
            GShowSymbolLabelsAction = require(1286),
            GShowRulersAction = require(1614),
            GShowSlicesAction = require(1615),
            GSimplifyAction = require(1318),
            GSnapUnitAction = require(1295),
            GSplitAction = require(870),
            GSplitLineAction = require(1319),
            GSplitPathAction = require(873),
            GToggleGuideAction = require(1287),
            GToggleSnapAction = require(1288),
            GToggleSnapZonesAction = require(1289),
            GPlaceImportAction = require(1283),
            GLinkImageAction = require(1280),
            GTransformAction = require(871),
            GUndoAction = require(1171),
            GVectorizeBorderAction = require(872),
            GVectorizeImageAction = require(1616),
            GConvertToImageAction = require(1314),
            GZoomInAction = require(1290),
            GZoomOutAction = require(1291),
            GPlayAction = require(1617),
            GShowEffectsAction = require(1619),
            GToggleFullscreenAction = require(1335),
            GGravitCloudAction = require(448),
            GVersionsHistoryAction = require(1256),
            GLanguageAction = require(1620),
            GOpenLinkAction = require(1621),
            GOpenQuickHelpScreenAction = require(1336),
            GNewFromTemplateAction = require(1623),
            GOpenRecentAction = require(843),
            GMaskWithShapeAction = require(1181),
            GOpenWelcomeScreenAction = require(1624),
            GEnhancedTooltipsAction = require(1342),
            GCheckForUpdatesAction = (require(1298 /* GUseCouponAction */), require(1625)),
            GProFeatureAction = require(1626),
            GCloudSynchronizationAction = require(1293),
            GSyncInfoAction = require(1627),
            GShareAction = require(1628),
            GSharePointCheckOutAction = require(1629),
            GSharePointCheckInAction = require(1630),
            GQuitAction = require(1632),
            GExampleFilesAction = require(1633),
            GToggleTouchAction = (require(1158), require(1634 /* GToggleTouchAction */)),
            GOpenAccountSettingsAction = require(1635),
            GLogoutAction = require(1636),
            GToggleProBetaLicenseAction = require(1637);
        const GImportImageFromIOSAction = require(1638);
        var GOpenSharedFileAction = require(1254),
            GTranslationToolAction = require(1639),
            GSwitchWebcdrAction = require(1641);
        require(1642);
        const GShowShortcutsAction = require(1643),
            GEyeDropperAction = require(1645),
            GShowSelectionHandlesAction = require(1646),
            GChangeOpacityAction = require(1647),
            GCycleThroughLayersAction = require(1344),
            GChangeAnchorPointsJointTypeMainAction = require(1345),
            GChangeAnchorPointsJointTypeSubAction = require(1648),
            GCloseActiveWindowAction = require(1649),
            GToggleMultiPageModeAction = require(1650),
            GChangeActivePageAction = require(1341),
            GChangeActiveWindowAction = require(1651),
            GSwapPaintLayersAction = require(1652),
            GCreateNewLayerAction = require(1653);
        (require(78), require(86));
        var GUnloadEvent = require(1346),
            GAppearanceProperties = (require(1347), require(1160 /* GAppearanceProperties */)),
            GFillPaintLayerProperties = require(1261),
            GBorderPaintLayerProperties = require(1162),
            GBoolOpProperties = require(1264),
            GEffectProperties = require(1262),
            GEllipseProperties = require(1265),
            GImageProperties = require(1266),
            GFrameProperties = require(1654),
            GGroupFrameProperties = require(1655),
            GItemProperties = require(1656),
            GInspectorSidebar = require(864),
            GOutlineSidebar = require(1260),
            GAnnotationsSidebar = require(567),
            GPathProperties = require(1269),
            GPatternChooser = require(1150),
            GPatternChooserTouch = require(1657),
            GPolygonProperties = require(1270),
            GRectangleProperties = require(1271),
            GPageProperties = require(1339),
            GSymbolProperties = require(1658),
            GSceneProperties = require(1659),
            GSliceProperties = require(1272),
            GTextProperties = require(1273),
            GDimensionProperties = require(1294),
            GTransformProperties = require(1660),
            GAlignProperties = require(1274),
            GSymbolsSidebar = require(1661),
            GLibrarySidebar = require(1662),
            GSoftwareUpdatePanel = require(1665),
            GNotificationPanel = require(1666),
            GCollaborativeTextPanel = require(1668),
            GDocumentNotificationsPanel = require(1669),
            GPluginManager = require(1670),
            GContainer = require(85),
            GInAppLinkHandler = require(1672),
            GRichTooltipController = (require(237 /* GStorage */), require(1673)),
            GCommonNames = require(119),
            GPluginError = require(1674),
            GSystemDialog = require(44),
            GEmbeddedLoginDialog = require(860),
            GMaintenanceDialog = require(1675),
            licenseManager = require(337),
            reminderManager = require(1325),
            offlineCache = require(785),
            GSoftwareUpdateManager = require(1676),
            GApplicationStatusEvent = require(808),
            GUserLoginEvent = require(292);
        const defaultFileExt = designerConfig.FILE_FORMATS.find((format) => format.default).ext,
            secondaryFileExts = designerConfig.FILE_FORMATS.filter((format) => format.secondary).map((format) => format.ext);
        var inAppPurchaseFactory = require(1678);
        const translationManager = new (require(1343))();
        translationManager.init();
        const GWindowsStoreAnnouncement = require(1684),
            GBetaFlow = require(1686),
            GMemoryManager = require(1687),
            GOpenFileHandler = require(1255),
            { isExecutingOnMSTeams, isExecutingOnMSTeamsSync, isTeamsChannel, getTeamsLocale } = teamsHelper.default;
        (require(18 /* GCategory */), require(1688), require(1154), require(1689), require(1690), require(1691), require(1693), require(1694));
        var globalWindow = window;
        const isTrunkBuild = !!/^trunk/.test("production") && !isBeta;
        ((globalWindow.gApi = require(10 /* designerConfig */).gApi), (globalWindow.gApi.webcdr = null));
        const checkMaintenance = async () => GMaintenanceStatus.checkMaintenance();
        (checkMaintenance(),
            isTrunkBuild &&
                ((globalWindow.gApi.url = designerConfig.cloudTrunkURL),
                (globalWindow.gApi.managementUrl = "https://cloud-management-trunk.herokuapp.com"),
                designerConfig.trunkWebsocketURL && (globalWindow.gApi.websocketURL = designerConfig.trunkWebsocketURL),
                GObject.GTranslationEvents.addEventListener(
                    GObject.GTranslationNotificationEvent,
                    (event) => {
                        let { project, type, content, data } = event;
                        if (project === GObject.GTranslation.Projects.Designer)
                            switch (type) {
                                case GObject.GTranslationNotificationEvent.Type.Warning:
                                    gContainer.getRuntime() === GContainer.Runtime.Electron
                                        ? console.error(content)
                                        : console.error({ content: content, data: data });
                            }
                    },
                    void 0
                )),
            isBeta &&
                (isCorel && isTeams && designerConfig.cloudTeamsURL ? (globalWindow.gApi.url = designerConfig.cloudTeamsURL) : designerConfig.cloudBetaURL && (globalWindow.gApi.url = designerConfig.cloudBetaURL),
                designerConfig.betaWebsocketURL && (globalWindow.gApi.websocketURL = designerConfig.betaWebsocketURL)),
            buildFlags.IS_PRODUCTION && (designerConfig.cloudURL && (globalWindow.gApi.url = designerConfig.cloudURL), designerConfig.websocketURL && (globalWindow.gApi.websocketURL = designerConfig.websocketURL)),
            (globalWindow.gApi.lang = GObject.GLocale.getLanguage()));
        let maintenanceDialog = null;
        ((globalWindow.gravit = null), require(1738), (globalWindow.gDesigner = new GDesigner()), globalWindow.gDesigner.getUser(), (globalWindow.gQA = gQADebugTools.default));
        const isOfflinePromise = globalWindow.gDesigner.isOfflineAsync();
        globalWindow.gInAppPurchase = inAppPurchaseFactory.newInAppPurchase(storeVendor);
        const { GA: { customDimensions } = {} } = require(10 /* designerConfig */);
        (gDesigner.addEventListener(GUserLoginEvent, (event) => {
            let { user } = event;
            user && !gDesigner.isAnonymous() && "undefined" != typeof dataLayer && customDimensions && customDimensions.forEach((dimension) => dataLayer.push({ [dimension]: void 0 }));
        }),
            (gDesigner._translationManager = translationManager));
        var dragImageElement = $("<div></div>").addClass("g-drag-image").appendTo($("body"));
        ((globalWindow.gDragImage = function () {
            return dragImageElement.empty().attr({ class: "g-drag-image", style: "" });
        }),
            (globalWindow.gPatternChooser = null),
            (globalWindow.gPatternChooserNormal = null),
            (globalWindow.gPatternChooserTouch = null),
            (globalWindow.gContainer = null));
        module.exports = async function (container) {
            ((globalWindow.gContainer = container), (0, Utils._tryAndCatch)(() => licenseManager.start()));
            let subscriptionsEnabled = null;
            const userPromise = gDesigner.getUser();
            (userPromise.then((user) => {
                user && (subscriptionsEnabled = designerConfig.gApi.isEnabledSubscriptions());
            }),
                (window.onerror = function (message, source, lineno, colno, error) {
                    GPluginError.isPluginError(error)
                        ? GSystemDialog.alert(error.message)
                        : ("production" === nodeEnv || "trunk" === nodeEnv || "lts" === nodeEnv || "rc" === nodeEnv) && GCommonNames.isOnline();
                }),
                runtimeDetector.getRuntimeCode() === designerConfig.Runtime.WindowsStore.code && new GWindowsStoreAnnouncement().init(),
                isBeta && !isCorel && new GBetaFlow().init(),
                isCorel
                    ? (gContainer.setCookie({
                          name: "_access_token",
                          value: "b03f5f7f11d50a3a",
                      }),
                      gDesigner.setSupportedBrowsers([
                          GPlatform.GPlatform.constructor.WebBrowser.Chrome,
                          GPlatform.GPlatform.constructor.WebBrowser.Firefox,
                          GPlatform.GPlatform.constructor.WebBrowser.Edge,
                      ]),
                      gDesigner.setSupportedTabletBrowsers([
                          {
                              operatingSystem: GObject.GSystem.OperatingSystem.Unix,
                              platform: GPlatform.GPlatform.constructor.WebBrowser.Chrome,
                          },
                          {
                              operatingSystem: GObject.GSystem.OperatingSystem.OSX_IOS,
                              platform: GPlatform.GPlatform.constructor.WebBrowser.Safari,
                          },
                      ]))
                    : (gDesigner.setSupportedBrowsers([
                          GPlatform.GPlatform.constructor.WebBrowser.Chrome,
                          GPlatform.GPlatform.constructor.WebBrowser.Firefox,
                          GPlatform.GPlatform.constructor.WebBrowser.Safari,
                          GPlatform.GPlatform.constructor.WebBrowser.Edge,
                      ]),
                      gDesigner.setSupportedTabletBrowsers([
                          {
                              operatingSystem: GObject.GSystem.OperatingSystem.Unix,
                              platform: GPlatform.GPlatform.constructor.WebBrowser.Chrome,
                          },
                          {
                              operatingSystem: GObject.GSystem.OperatingSystem.OSX_IOS,
                              platform: GPlatform.GPlatform.constructor.WebBrowser.Safari,
                          },
                      ])));
            if (await checkMaintenance()) {
                if (gContainer.getRuntime() !== GContainer.Runtime.Electron || !(await userPromise)) {
                    $("<iframe></iframe>").addClass("cross-frame").attr("src", "assets/static/maintenance/index.html").appendTo($("body"));
                    const intervalId = setInterval(async () => {
                        (await checkMaintenance()) || (clearInterval(intervalId), location.reload());
                    }, 6e4);
                    return;
                }
            }
            const runtimeCode = runtimeDetector.getRuntimeCode();
            runtimeCode && gContainer.setCookie({ name: "_ginst", value: runtimeCode, url: designerConfig.gApi.url });
            const urlParams = new URL(window.location.href).searchParams;
            if (
                (urlParams && urlParams.has("pd") && gContainer.setCookie({ name: "_gtpd", value: urlParams.get("pd") }),
                urlParams && urlParams.has("newuser") && gDesigner.setShowCreateAccount(true),
                urlParams && urlParams.has("dt")
                    ? gContainer.setCookie({ name: "_gdt", value: urlParams.get("dt") })
                    : gContainer.setCookie({ name: "_gdt", value: "" }),
                urlParams && urlParams.has("coupon")
                    ? gContainer.setCookie({ name: "_gcoupon", value: urlParams.get("coupon") })
                    : gContainer.setCookie({ name: "_gcoupon", value: "" }),
                urlParams &&
                    urlParams.has("recaptchaToken") &&
                    gContainer.setCookie({
                        name: "__grecaptchaToken",
                        value: urlParams.get("recaptchaToken"),
                    }),
                urlParams &&
                    urlParams.has("x-clickref") &&
                    (gContainer.setCookie({
                        name: "cb_prf_corelcorp",
                        value: urlParams.get("x-clickref"),
                    }),
                    gContainer.setCookie({ name: "dynPrice_xparamCookie", value: urlParams })),
                urlParams &&
                    urlParams.has("magiclink") &&
                    (await gContainer.signWithMagicLink(urlParams.get("magiclink"), urlParams.get("d"), urlParams.get("token")).catch(() => null),
                    (subscriptionsEnabled = designerConfig.gApi.isEnabledSubscriptions())),
                urlParams)
            ) {
                gDesigner.setUTM(
                    new Map(
                        Array.from(urlParams.entries()).filter((entry) => {
                            let [key] = entry;
                            return /^utm/.test(key);
                        })
                    )
                );
                const signupFields = ["firstName", "lastName", "email", "to"],
                    signupOptions = Array.from(urlParams.entries())
                        .filter((entry) => {
                            let [key] = entry;
                            return signupFields.includes(key);
                        })
                        .reduce((acc, entry) => {
                            let [key, value] = entry;
                            return Object.assign(acc, { [key]: value });
                        }, {});
                Object.keys(signupOptions).length && gDesigner.setSignupOptions(signupOptions);
            }
            var hjWindow, hjDocument, headEl, scriptEl;
            (gContainer.setCookie({
                name: "_gdesignerv",
                value: "3.15.0",
                url: designerConfig.gApi.url,
            }),
                gDesigner.setEnv(nodeEnv),
                gContainer.getRuntime() === GContainer.Runtime.Electron || isCorel || designerConfig.gApi.initRecaptcha(),
                (async function (runtime, vendor) {
                    const user = await gDesigner.getUser();
                    (0, gtmInit.default)(runtime, vendor, gDesigner.getAppBaseUrl(), user);
                })(gContainer.getRuntime(), storeVendor),
                !isBeta ||
                    (gContainer.getRuntime() !== GContainer.Runtime.Browser && gContainer.getRuntime() !== GContainer.Runtime.PWA) ||
                    ((hjWindow = window),
                    (hjDocument = document),
                    (hjWindow.hj =
                        hjWindow.hj ||
                        function () {
                            (hjWindow.hj.q = hjWindow.hj.q || []).push(arguments);
                        }),
                    (hjWindow._hjSettings = { hjid: 754178, hjsv: 6 }),
                    (headEl = hjDocument.getElementsByTagName("head")[0]),
                    ((scriptEl = hjDocument.createElement("script")).async = 1),
                    (scriptEl.src = "https://static.hotjar.com/c/hotjar-" + hjWindow._hjSettings.hjid + ".js?sv=" + hjWindow._hjSettings.hjsv),
                    headEl.appendChild(scriptEl)),
                gDesigner.setStoreVendor(storeVendor),
                gDesigner.setVersion("3.15.0"),
                gDesigner.setCommitSHA("566771f4dff3952a55c0d9d3c130f7e787dfdfa7"),
                gDesigner.setBuildNum("8795"),
                gDesigner.setVersionFriendlyName("PlasmaTrap-patched"));
            let deepLinkError,
                preInitPromise = (0, Utils._tryAndCatch)(() => gDesigner.preInit(subscriptionsEnabled)),
                deepLink = gContainer.handleDeepLinking();
            deepLink &&
                (deepLinkError = await gDesigner
                    .runDeepLink(deepLink.link, deepLink.options)
                    .then(() => null)
                    .catch((error) => error));
            const initGravitApp = async () => {
                (await new Promise((resolve) => gContainer.initLanguage(resolve)),
                    gDesigner.hasEventListeners(GApplicationStatusEvent) && gDesigner.trigger(new GApplicationStatusEvent(GApplicationStatusEvent.Status.Init)),
                    gDesigner.setIsBeta(isBeta),
                    (gravit = {
                        plugins: [],
                        actions: [new GNewAction(), new GNewFromTemplateAction(), new GNewClipboardAction(), new GOpenAction(), new GSafariOpenAction()]
                            .concat([
                                new GGravitCloudAction(GGravitCloudAction.Actions.Open),
                                new GOpenRecentAction(),
                                new GSaveAction(),
                                new GSaveAsAction(defaultFileExt),
                                ...secondaryFileExts.map((ext) => new GSaveAsAction(ext)),
                                new GGravitCloudAction(GGravitCloudAction.Actions.SaveAs),
                                new GCloudSynchronizationAction(),
                                new GSyncInfoAction(),
                                new GCloseActiveWindowAction(),
                                new GVersionsHistoryAction(),
                                new GOpenSharedFileAction(),
                            ])
                            .concat([new GSaveAllAction()])
                            .concat([
                                new GPlaceImportAction(),
                                new GImportImageFromIOSAction(GImportImageFromIOSAction.Source.PHOTOS),
                                new GImportImageFromIOSAction(GImportImageFromIOSAction.Source.FILES),
                                new GLinkImageAction(),
                                new GProFeatureAction(new GImportFontsAction()),
                                isCorel ? new GProFeatureAction(new GExportAction()) : new GExportAction(),
                            ])
                            .concat(
                                GDocument.FileTypes.filter(
                                    (fileType) => fileType.store && "cdrapp" !== fileType.ext && "des" !== fileType.ext && "gvdesign" !== fileType.ext && "pdf" !== fileType.ext
                                ).map((fileType) => new GSaveAsAction(fileType.ext))
                            )
                            .concat([
                                new GSaveAsAction("pdf", { dpi: 72 }),
                                new GSaveAsAction("pdf", { dpi: 96 }),
                                new GSaveAsAction("pdf", { dpi: 150 }),
                                new GProFeatureAction(new GSaveAsAction("pdf", { dpi: 300 })),
                                isCorel ? new GProFeatureAction(new GExportAction({ format: "pdf" })) : new GExportAction({ format: "pdf" }),
                            ])
                            .concat(
                                [
                                    new GSharePointCheckOutAction(),
                                    new GSharePointCheckInAction(),
                                    new GShareAction(),
                                    new GPrintAction(),
                                    new GInstallToDesktopAction(),
                                    new GQuitAction(),
                                    new GUndoAction(),
                                    new GRedoAction(),
                                    new GCutCopyAction(true),
                                    new GCutCopyAction(false),
                                    new GPasteAction(),
                                    new GPasteInPlaceAction(),
                                    new GPasteAndReplaceAction(),
                                    new GPasteInsideAction(),
                                    new GPasteHereAction(),
                                    new GPasteStyleAction(),
                                    new GDeleteAction(),
                                    new GDuplicateAction(),
                                    new GEditElementAction(),
                                    new GSelectAllAction(),
                                    new GDeselectAllAction(),
                                    new GInvertSelectionAction(),
                                    new GSelectByFontTypeAction(),
                                    new GSelectByPaintLayerAction(GSelectByPaintLayerAction.Type.Fill),
                                    new GSelectByPaintLayerAction(GSelectByPaintLayerAction.Type.Border),
                                    new GSelectByPaintLayerAction(GSelectByPaintLayerAction.Type.FillAndBorder),
                                    new GSelectByBorderWidthAction(),
                                    new GSelectByTransparencyAction(),
                                    new GSelectByBlendModeAction(),
                                    new GSelectByShapeAction(),
                                    new GSelectByEffectAction(),
                                    new GSettingsAction(),
                                    new GEyeDropperAction(GEyeDropperAction.Type.Fill),
                                    new GEyeDropperAction(GEyeDropperAction.Type.Border),
                                    new GRenameLayerAction(),
                                    new GChangeOpacityAction(),
                                    new GArrangeAction(editorModules.GEditor.ArrangeOrderType.SendToFront),
                                    new GArrangeAction(editorModules.GEditor.ArrangeOrderType.BringForward),
                                    new GArrangeAction(editorModules.GEditor.ArrangeOrderType.SendBackward),
                                    new GArrangeAction(editorModules.GEditor.ArrangeOrderType.SendToBack),
                                    new GAlignAction(editorModules.GEditor.ArrangeAlignType.AlignLeft),
                                    new GAlignAction(editorModules.GEditor.ArrangeAlignType.AlignCenter),
                                    new GAlignAction(editorModules.GEditor.ArrangeAlignType.AlignRight),
                                    new GAlignAction(editorModules.GEditor.ArrangeAlignType.AlignTop),
                                    new GAlignAction(editorModules.GEditor.ArrangeAlignType.AlignMiddle),
                                    new GAlignAction(editorModules.GEditor.ArrangeAlignType.AlignBottom),
                                    new GAlignAction(editorModules.GEditor.ArrangeAlignType.AlignJustifyHorizontal),
                                    new GAlignAction(editorModules.GEditor.ArrangeAlignType.AlignJustifyVertical),
                                    new GDistributeAction(GDistributeAction.Type.Horizontal),
                                    new GDistributeAction(GDistributeAction.Type.Vertical),
                                    new GSnapUnitAction(GSnapUnitAction.Type.FullUnit),
                                    new GSnapUnitAction(GSnapUnitAction.Type.HalfUnit),
                                    new GTransformAction(GTransformAction.Type.Rotate45Left),
                                    new GTransformAction(GTransformAction.Type.Rotate90Left),
                                    new GTransformAction(GTransformAction.Type.Rotate180Left),
                                    new GTransformAction(GTransformAction.Type.Rotate45Right),
                                    new GTransformAction(GTransformAction.Type.Rotate90Right),
                                    new GTransformAction(GTransformAction.Type.Rotate180Right),
                                    new GTransformAction(GTransformAction.Type.FlipVertical),
                                    new GTransformAction(GTransformAction.Type.FlipHorizontal),
                                    new GGroupAction(),
                                    new GClipAction(),
                                    new GSplitAction(),
                                    new GMaskWithShapeAction(),
                                    new GCropAction(),
                                    new GCancelCropAction(),
                                    new GMergeMainAction(GMergeSubAction),
                                    new GMergeSubAction(GMergeSubAction.Type.Intersect),
                                    new GMergeSubAction(GMergeSubAction.Type.Difference),
                                    new GMergeSubAction(GMergeSubAction.Type.Subtract),
                                    new GMergeSubAction(GMergeSubAction.Type.Union),
                                    new GCreateNestedCompoundAction(),
                                    new GJoinPathsAction(),
                                    new GSplitPathAction(),
                                    new GConvertToPathAction(),
                                    new GConvertToRawPathAction(),
                                    new GOutlineAction(),
                                    new GOffsetAction(),
                                    new GVectorizeBorderAction(),
                                    new GVectorizeImageAction(),
                                    new GAttachToPathAction(),
                                    new GDetachFromPathAction(),
                                    new GSimplifyAction(),
                                    new GConnectLinesAction(),
                                    new GSplitLineAction(),
                                    new GReverseOrderAction(),
                                    new GCreateSymbolAction(),
                                    new GDetachSymbolAction(),
                                    new GResetInstanceAction(),
                                    new GConvertToImageAction(),
                                    new GLockLayerAction(),
                                    new GChangeAnchorPointsJointTypeMainAction(GChangeAnchorPointsJointTypeSubAction),
                                    new GChangeAnchorPointsJointTypeSubAction(GChangeAnchorPointsJointTypeSubAction.Type.Straight),
                                    new GChangeAnchorPointsJointTypeSubAction(GChangeAnchorPointsJointTypeSubAction.Type.Mirrored),
                                    new GChangeAnchorPointsJointTypeSubAction(GChangeAnchorPointsJointTypeSubAction.Type.Disconnected),
                                    new GChangeAnchorPointsJointTypeSubAction(GChangeAnchorPointsJointTypeSubAction.Type.Asymmetric),
                                    new GChangeAnchorPointsJointTypeSubAction(GChangeAnchorPointsJointTypeSubAction.Type.Connector),
                                    new GSwapPaintLayersAction(),
                                    new GCreateNewLayerAction(),
                                    new GOriginalViewAction(),
                                    new GFitSelectionAction(),
                                    new GFitCurrentLayerAction(),
                                    new GFitAllAction(),
                                    new GEnterLayerGroupAction(false),
                                    new GEnterLayerGroupAction(true),
                                    new GToggleLayerVisibilityAction(),
                                    new GCycleThroughLayersAction(GCycleThroughLayersAction.Type.Next),
                                    new GCycleThroughLayersAction(GCycleThroughLayersAction.Type.Previous),
                                    new GToggleMultiPageModeAction(),
                                    new GChangeActivePageAction(GChangeActivePageAction.Type.Next),
                                    new GChangeActivePageAction(GChangeActivePageAction.Type.Previous),
                                    new GChangeActiveWindowAction(GChangeActiveWindowAction.Type.Next),
                                    new GChangeActiveWindowAction(GChangeActiveWindowAction.Type.Previous),
                                ].concat(GMagnificationAction.ZOOM_LEVELS.map((zoomLevel) => new GMagnificationAction(zoomLevel)))
                            )
                            .concat([
                                new GZoomInAction(),
                                new GZoomOutAction(),
                                new GOutlineViewAction(),
                                new GFastViewAction(),
                                new GShowRulersAction(),
                                new GShowGuideLinesAction(),
                                new GShowSymbolLabelsAction(),
                                new GShowGridAction(),
                                new GShowSlicesAction(),
                                new GShowEffectsAction(),
                                new GShowSelectionHandlesAction(),
                                new GToggleSnapAction(),
                                ...(designerConfig.HAS_SNAPZONES ? [new GToggleSnapZonesAction()] : []),
                                new GToggleGuideAction(editorModules.GGridGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-grid"))),
                                new GToggleGuideAction(editorModules.GGuideLinesGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-guide-lines"))),
                                new GToggleGuideAction(editorModules.GFullPixelsGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-full-pixels"))),
                                new GToggleGuideAction(editorModules.GPointsGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-anchor-points"))),
                                new GToggleGuideAction(editorModules.GBBoxGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-shapes"))),
                                new GToggleGuideAction(editorModules.GPageGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-pages"))),
                                new GNewWindowAction(),
                                new GPlayAction(),
                                new GToggleFullscreenAction(),
                                new GProFeatureAction(new GToggleTouchAction()),
                            ])
                            .concat(
                                GOpenLinkAction.Links.filter((link) => "eula" !== link.name).map((link) => new GOpenLinkAction(link)),
                                isCorel ? [] : new GEnhancedTooltipsAction(),
                                new GExampleFilesAction(),
                                new GOpenQuickHelpScreenAction()
                            )
                            .concat(...(isExecutingOnMSTeamsSync() ? [] : GContainer.GravitLanguages.map((language) => new GLanguageAction(language, translationManager.getTranslationRealName(language)))))
                            .concat([
                                ...(isCorel ? [new GSwitchWebcdrAction("STAGING", isTrunkBuild), new GSwitchWebcdrAction("BETA", isBeta)] : []),
                                new GOpenWelcomeScreenAction(),
                                ...(canSelfUpdate ? [new GCheckForUpdatesAction()] : []),
                                ...GOpenLinkAction.Links.filter((link) => "eula" === link.name).map((link) => new GOpenLinkAction(link)),
                                new GTranslationToolAction(),
                                ...(isCorel ? [new GToggleProBetaLicenseAction()] : []),
                                new GShowShortcutsAction(),
                            ])
                            .concat([new GOpenAccountSettingsAction(), new GLogoutAction()]),
                        sidebars: [new GInspectorSidebar(), ...(designerConfig.HAS_ANNOTATIONS ? [new GAnnotationsSidebar()] : []), new GOutlineSidebar(), new GLibrarySidebar(), new GSymbolsSidebar()],
                        panels: [],
                        footer: [new GSoftwareUpdatePanel(), new GNotificationPanel(), ...(isCorel ? [new GCollaborativeTextPanel(), new GDocumentNotificationsPanel()] : [])],
                        tools: [
                            {
                                tool: editorModules.GPointerTool,
                                toolString: "GPointerTool",
                                title: isCorel
                                    ? GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "tool.pointer"))
                                    : GObject.GLocale.get(new GObject.GLocaleKey("GPointerTool", "name")),
                                group: "select",
                                key: "V",
                                icon: "gravit-icon-cursor-filled",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GPointerTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GPointerTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["V"],
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Pointer_Tool.mp4"),
                                    learnMore: "/docs/tools/selection-tools/#pointer-tool",
                                }),
                            },
                            {
                                tool: editorModules.GSubSelectTool,
                                toolString: "GSubSelectTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GSubSelectTool", "name")),
                                group: "select",
                                key: "D",
                                icon: isCorel ? "gravit-icon-cursor-subselect" : "gravit-icon-cursor",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GSubSelectTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GSubSelectTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["D"],
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Subselect_Tool.mp4"),
                                    learnMore: "/docs/tools/selection-tools/#subselect-tool",
                                }),
                            },
                            {
                                tool: editorModules.GLassoTool,
                                toolString: "GLassoTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GLassoTool", "name")),
                                group: "select",
                                category: "special",
                                key: "O",
                                icon: "gravit-icon-rope",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GLassoTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GLassoTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["O"],
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Lasso_Tool.mp4"),
                                    learnMore: "/docs/tools/selection-tools/#lasso-tool",
                                }),
                            },
                            {
                                tool: editorModules.GLayerTool,
                                toolString: "GLayerTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GLayerTool", "name")),
                                group: "select",
                                category: "special",
                                icon: "gravit-icon-sheets",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GLayerTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GLayerTool", "tooltip-description")),
                                    middle: false,
                                    learnMore: "/docs/tools/selection-tools/#layer-tool",
                                }),
                            },
                            {
                                tool: editorModules.GSliceTool,
                                toolString: "GSliceTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GSliceTool", "name")),
                                group: "select",
                                category: "other",
                                key: "S",
                                icon: "gravit-icon-slice",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GSliceTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GSliceTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["S"],
                                    learnMore: "/docs/tools/selection-tools/#slice-tool",
                                }),
                            },
                            {
                                tool: editorModules.GPenTool,
                                toolString: "GPenTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPenTool", "name")),
                                group: "path",
                                key: "P",
                                icon: "gravit-icon-pen",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GPenTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GPenTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["P"],
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Pen_Too.mp4"),
                                    learnMore: "/docs/tools/drawing-tools/#pen-tool",
                                }),
                            },
                            {
                                tool: editorModules.GBezigonTool,
                                toolString: "GBezigonTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GBezigonTool", "name")),
                                group: "path",
                                key: "B",
                                icon: "gravit-icon-pen-filled",
                                pro: true,
                                feature: "bezigon",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GBezigonTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GBezigonTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["B"],
                                    isPro: gDesigner.isProTooltipNeeded("bezigon"),
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Bezigon_Tool.mp4"),
                                    learnMore: "/docs/tools/drawing-tools/#bezigon-tool",
                                }),
                            },
                            {
                                tool: editorModules.GKnifeTool,
                                toolString: "GKnifeTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GKnifeTool", "name")),
                                group: "knife",
                                category: "modify",
                                key: "K",
                                icon: "gravit-icon-scalpel",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GKnifeTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GKnifeTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["K"],
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Knife_Tool.mp4"),
                                    learnMore: "/docs/tools/other-tools/#knife-tool",
                                }),
                            },
                            {
                                tool: editorModules.GFreehandTool,
                                toolString: "GFreehandTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GFreehandTool", "name")),
                                group: "path",
                                category: "hand",
                                icon: "gravit-icon-free-hand-draw",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GFreehandTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GFreehandTool", "tooltip-description")),
                                    middle: false,
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Freehand_Tool.mp4"),
                                    learnMore: "/docs/tools/drawing-tools/#freehand-tool",
                                }),
                            },
                            {
                                tool: editorModules.GMagicTool,
                                toolString: "GMagicTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GMagicTool", "name")),
                                group: "knife",
                                category: "modify",
                                icon: "gravit-icon-freehand-shape",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GMagicTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GMagicTool", "tooltip-description")),
                                    middle: false,
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Freehand_Shaping_Tool.mp4"),
                                    learnMore: "/docs/tools/other-tools/#freehand-shaping-tool",
                                }),
                            },
                            {
                                tool: editorModules.GLineTool,
                                toolString: "GLineTool",
                                title: GObject.GLocale.get(
                                    isCorel ? new GObject.GLocaleKey("GCommonNames", "tool.line") : new GObject.GLocaleKey("GLineTool", "name")
                                ),
                                group: "shape",
                                key: "L",
                                icon: "gravit-icon-line",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GLineTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GLineTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["L"],
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Line_Tool.mp4"),
                                    learnMore: "/docs/basics/shapes-paths/#line",
                                }),
                            },
                            {
                                tool: editorModules.GRectangleTool,
                                toolString: "GRectangleTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GRectangleTool", "name")),
                                group: "shape",
                                key: "R",
                                shortcuts: [["M"]],
                                icon: "gravit-icon-rectangle",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GRectangleTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GRectangleTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["R"],
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Rectangle_Tool.mp4"),
                                    learnMore: "/docs/basics/shapes-paths/#rectangle-r",
                                }),
                            },
                            {
                                tool: editorModules.GEllipseTool,
                                toolString: "GEllipseTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GEllipseTool", "name")),
                                group: "shape",
                                key: "E",
                                icon: "gravit-icon-ellipse",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GEllipseTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GEllipseTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["E"],
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Ellipse_Tool.mp4"),
                                    learnMore: "/docs/basics/shapes-paths/#ellipse-e",
                                }),
                            },
                            {
                                tool: editorModules.GPolygonTool,
                                toolString: "GPolygonTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPolygonTool", "name")),
                                group: "shape",
                                category: "polygon",
                                icon: "gravit-icon-polygon",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GPolygonTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GPolygonTool", "tooltip-description")),
                                    middle: false,
                                    learnMore: "/docs/basics/shapes-paths/#polygon",
                                }),
                            },
                            {
                                tool: editorModules.GTriangleTool,
                                toolString: "GTriangleTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GTriangleTool", "name")),
                                group: "shape",
                                category: "polygon",
                                icon: "gravit-icon-triangle",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GTriangleTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GTriangleTool", "tooltip-description")),
                                    middle: false,
                                    learnMore: "/docs/basics/shapes-paths/#triangle-star",
                                }),
                            },
                            {
                                tool: editorModules.GStarTool,
                                toolString: "GStarTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GStarTool", "name")),
                                group: "shape",
                                category: "polygon",
                                icon: "gravit-icon-star",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GStarTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GStarTool", "tooltip-description")),
                                    middle: false,
                                    learnMore: "/docs/basics/shapes-paths/#triangle-star",
                                }),
                            },
                            {
                                tool: editorModules.GTextTool,
                                toolString: "GTextTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GTextTool", "name")),
                                group: "insert",
                                key: "T",
                                icon: "gravit-icon-textbox",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GTextTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GTextTool", "tooltip-description")),
                                    middle: false,
                                    video: globalWindow.gApi.getRichTooltipVideoURL("Text_Tool.mp4"),
                                    shortcut: ["T"],
                                    learnMore: "/docs/working-with-text/",
                                }),
                            },
                            {
                                tool: editorModules.GHandTool,
                                toolString: "GHandTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GHandTool", "name")),
                                group: "view",
                                key: "H",
                                icon: "gravit-icon-move",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GHandTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GHandTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["H"],
                                    learnMore: "/docs/tools/other-tools/#pan",
                                }),
                            },
                            {
                                tool: editorModules.GZoomTool,
                                toolString: "GZoomTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GZoomTool", "name")),
                                group: "view",
                                key: "Z",
                                icon: "gravit-icon-zoom-in",
                                richTooltipConfig: richTooltipModule.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GZoomTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GZoomTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["Z"],
                                    learnMore: "/docs/tools/other-tools/#zoom-tool",
                                }),
                            },
                        ],
                        properties: [
                            new GDimensionProperties(),
                            new GAlignProperties(),
                            new GTransformProperties(),
                            new GPageProperties(),
                            new GSceneProperties(),
                            new GGroupFrameProperties(),
                            new GFrameProperties(),
                            new GItemProperties(),
                            new GPolygonProperties(),
                            new GPathProperties(),
                            new GEllipseProperties(),
                            new GTextProperties(),
                            new GImageProperties(),
                            new GRectangleProperties(),
                            new GSliceProperties(),
                            new GBoolOpProperties(),
                            new GSymbolProperties(),
                            new GAppearanceProperties(),
                            new GFillPaintLayerProperties(),
                            new GBorderPaintLayerProperties(),
                            new GEffectProperties(),
                        ],
                    }),
                    "function" != typeof window.gdb_initsavestepsaction ||
                        isBeta ||
                        buildConstants.IS_RC ||
                        window.gdb_initsavestepsaction(window.gravit.actions, GSaveAction),
                    "function" == typeof window.gdb_initsetupsystemdateaction &&
                        window.gdb_initsetupsystemdateaction(window.gravit.actions),
                    "function" != typeof window.gdb_inittranslationtoolaction ||
                        isBeta ||
                        buildConstants.IS_RC ||
                        window.gdb_inittranslationtoolaction(window.gravit.actions, GSaveAction),
                    "function" != typeof window.gdb_initrecordgravitaction ||
                        isBeta ||
                        buildConstants.IS_RC ||
                        window.gdb_initrecordgravitaction(window.gravit.actions, GSaveAction));
                let pluginLoader = new GPluginManager(container._storage);
                (pluginLoader.load(),
                    pluginLoader.init(gravit),
                    (globalWindow.gPatternChooserNormal = new GPatternChooser()),
                    (globalWindow.gPatternChooserTouch = new GPatternChooserTouch()),
                    gDesigner.isTouchEnabled()
                        ? (globalWindow.gPatternChooser = globalWindow.gPatternChooserTouch)
                        : (globalWindow.gPatternChooser = globalWindow.gPatternChooserNormal),
                    gDesigner.init(),
                    gDesigner.relayout(),
                    await gDesigner.start().finally(() => {
                        gDesigner.isTouchDevice() &&
                            !gDesigner.isTouchEnabled() &&
                            designerConfig.TOUCH_LAYOUT &&
                            (gDesigner.stats("touch-dialog_open"),
                            GSystemDialog.confirm(
                                ""
                                    .concat(
                                        GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.supported-touch-title")),
                                        "<br>\n                         "
                                    )
                                    .concat(GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.supported-touch-footer"))),
                                (confirmed) => {
                                    (gDesigner.stats("touch-dialog_click_".concat(confirmed ? "ok" : "cancel")),
                                        confirmed && gDesigner.executeAction(GToggleTouchAction.ID, void 0, void 0, true));
                                },
                                GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")),
                                {
                                    text: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")),
                                    pro: true,
                                },
                                false,
                                false,
                                false,
                                "designer.settings.dont_show_supported_touch_dialog"
                            ));
                    }),
                    "undefined" != typeof dataLayer && dataLayer.push({ runtime1: gContainer.getRuntime() }));
                var openFileRequest = container.start();
                (gContainer.getRuntime() === GContainer.Runtime.Electron &&
                    gDesigner.getUser().then((user) => {
                        user ||
                            isOfflinePromise.then((isOffline) => {
                                isOffline || GCommonNames.performLogin();
                            });
                    }),
                    gDesigner.updateRecentDocumentsAction(),
                    GRichTooltipController.init());
                let webcdrChoice = gDesigner.getSetting("webcdr_choice", isBeta ? "BETA" : "STAGING");
                if (
                    (isTrunkBuild
                        ? designerConfig.trunkwebcdr &&
                          (buildConstants.IS_LOCALHOST
                              ? (globalWindow.gApi.webcdr = webcdrChoice && "BETA" === webcdrChoice ? designerConfig.cloudBetaURL + "/api/webcdr" : designerConfig.cloudTrunkURL + "/api/webcdr")
                              : (globalWindow.gApi.webcdr = webcdrChoice && "BETA" === webcdrChoice ? designerConfig.betaWebcdr : designerConfig.trunkwebcdr))
                        : isBeta
                          ? (globalWindow.gApi.webcdr = webcdrChoice && "BETA" === webcdrChoice ? designerConfig.betaWebcdr : designerConfig.stagingWebcdr)
                          : designerConfig.webcdr && (globalWindow.gApi.webcdr = designerConfig.webcdr),
                    $("body").removeClass("loading"),
                    (window.onbeforeunload = function (event) {
                        gDesigner.isReloading() ||
                            gContainer.canUnload(gDesigner.hasModifiedDocuments(), gDesigner.hasSynchronizingDocuments(), false) ||
                            (event.preventDefault(), (event.returnValue = ""));
                    }),
                    (window.onunload = function () {
                        gDesigner.hasEventListeners(GUnloadEvent) && gDesigner.trigger(new GUnloadEvent());
                    }),
                    openFileRequest)
                ) {
                    let newDocument = new GDocument();
                    if (
                        gContainer.getRuntime() === GContainer.Runtime.Browser ||
                        gContainer.getRuntime() === GContainer.Runtime.PWA ||
                        gContainer.getRuntime() === GContainer.Runtime.IPad
                    ) {
                        let docTitle = "";
                        if (openFileRequest.getType() === GContainer.OpenFileRequest.Type.DocumentOrToken)
                            try {
                                docTitle = JSON.parse(openFileRequest.getContent()).doc;
                            } catch (e) {}
                        else docTitle = openFileRequest.getContent();
                        (newDocument.setTitle(docTitle), deepLink && newDocument.setFocusAnnotationId(deepLink.options.annot), gDesigner.addDocument(newDocument));
                    }
                    (gContainer.getRuntime() === GContainer.Runtime.Electron
                        ? gContainer.openStorageFile(newDocument, openFileRequest, (openedDocument) => {
                              openedDocument && gDesigner.openDocument(openedDocument);
                          })
                        : GOpenFileHandler.handleOpenFileRequest(newDocument, openFileRequest),
                        gDesigner.createNewDocumentDialog());
                } else welcomeScreenSettings.default.isEnabled() ? gDesigner.handleWelcomeScreenOpenWithUserPermissions() : gDesigner.newInfiniteDocument();
                (gDesigner.hasEventListeners(GApplicationStatusEvent) && gDesigner.trigger(new GApplicationStatusEvent(GApplicationStatusEvent.Status.Ready)),
                    (0, Utils.isSupportedScreenSize)()
                        ? !(0, Utils.isSupportedScreenSize)(document.body.clientWidth) &&
                          designerConfig.msTeamsMode &&
                          (await isTeamsChannel()) &&
                          GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.unsupported-windows-size-msteams")))
                        : designerConfig.msTeamsMode
                          ? GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.unsupported-screen-size-msteams")))
                          : (gDesigner.stats("touch-dialog_unsupport-size"),
                            GSystemDialog.showOneTimeDialog(
                                GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.unsupported-screen-size")).replace(
                                    "%app",
                                    designerConfig.DESIGNER.TITLE
                                ),
                                "designer.settings.dont_show_unsupported_screen_size_dialog"
                            )),
                    pluginLoader.start(),
                    await reminderManager.start(),
                    canSelfUpdate &&
                        (await (0, Utils._tryAndCatch)(() => {
                            ((gDesigner._softwareUpdateManager = new GSoftwareUpdateManager()), gDesigner._softwareUpdateManager.start());
                        })),
                    (globalWindow.gMemoryManager = new GMemoryManager()),
                    globalWindow.gMemoryManager.start());
            };
            if (
                ("function" != typeof gdb_initSetupSystemDate || isBeta || (await gdb_initSetupSystemDate()),
                await preInitPromise,
                await (0, Utils._tryAndCatch)(() => offlineCache.init()),
                await null,
                isCorel || gDesigner.isEnabledSubscriptions())
            ) {
                const runLoginFlow = async () => {
                    const user = await gDesigner.getUser();
                    let signupData;
                    if (user && user.isAnonymous() && deepLink && deepLink.link === GContainer.DeepLinking.DirectLink) {
                        let directLinkOption = deepLink.options[GContainer.DeepLinking.DirectLink];
                        signupData = JSON.parse((0, Utils.base64StringToString)(directLinkOption)).signup;
                    }
                    if (!user || user.reload || user.deactivated || (user.isAnonymous() && signupData)) {
                        const deepLinkFlow = deepLink && deepLink.link;
                        user && !user.isAnonymous() && (await (0, Utils._tryAndCatch)(() => gDesigner.signout(true, true)));
                        const loginToken = new URL(window.location.href).searchParams.get("token");
                        if (loginToken) {
                            const { enterprise } = await designerConfig.gApi.checkEnterpriseToken(loginToken).catch({ enterprise: false });
                            enterprise && gDesigner.setEnterpriseLoginForm(true);
                        }
                        (await gContainer.preLogin().catch((error) => {
                            console.warn("gContainer preLogin error", error);
                        }),
                            new GEmbeddedLoginDialog(initGravitApp).open({ flow: deepLinkFlow, signup: signupData, version: "PlasmaTrap-patched" }),
                            GInAppLinkHandler.setupInAppLinkReloadAppForOnce(),
                            urlParams &&
                                urlParams.has(GContainer.DeepLinking.PWADialog) &&
                                gDesigner.executeWhenReady(() => {
                                    gDesigner.showInstallPwaDialog(true);
                                }),
                            deepLinkError && GSystemDialog.error(deepLinkError));
                    } else
                        (await initGravitApp(),
                            urlParams &&
                                urlParams.has(GContainer.DeepLinking.PWADialog) &&
                                gDesigner.executeWhenReady(() => {
                                    gDesigner.showInstallPwaDialog();
                                }));
                };
                if (designerConfig.msTeamsMode) (await isExecutingOnMSTeams()) ? new GMSTeamsAppLoader.default(initGravitApp).load() : window.location.replace(window.location.origin);
                else if (navigator.onLine || gDesigner.isEnabledProFeatures("offline")) await runLoginFlow();
                else {
                    const offlineDialog = GSystemDialog.custom({
                            icon: "clock",
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.license-offline-title")),
                            subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.license-offline-expired-subtitle")),
                            closeable: false,
                        }),
                        onOnline = () => {
                            navigator.onLine && (runLoginFlow(), offlineDialog.gDialog("close"), $(window).off("online", onOnline));
                        };
                    $(window).on("online", onOnline);
                }
            } else await initGravitApp();
            designerConfig.gApi.setHooks({
                onError: () => {
                    maintenanceDialog || checkMaintenance().then((isUnderMaintenance) => isUnderMaintenance && void (maintenanceDialog || ((maintenanceDialog = new GMaintenanceDialog()), maintenanceDialog.open())));
                },
            });
        };
    };
