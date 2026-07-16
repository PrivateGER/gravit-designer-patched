module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(58),
            require(19),
            require(168 /* PDFFetchStream */),
            require(30),
            require(8 /* Symbol */),
            require(196),
            require(20),
            require(107),
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
            require(126),
            require(114));
        var designerConfig = require(10),
            IS_TRUNK = require(231),
            r = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GSaveAction = require(40),
            d = require(67),
            u = o(require(1484)),
            p = o(require(443)),
            g = o(require(1485)),
            h = o(require(1486)),
            f = o(require(1487));
        const { nodeEnv, isBeta, storeVendor, isCorel, isTeams } = require(803),
            w = require(231 /* IS_TRUNK */),
            C = !storeVendor,
            x = require(859);
        require(1488);
        require(1489);
        const S = require(1490);
        var GCommonNames = require(1491),
            GDocument = require(163),
            GAlignAction = require(866),
            GArrangeAction = require(869),
            P = require(1176),
            D = require(1311),
            GClipAction = require(809),
            I = require(1597),
            GConvertToPathAction = require(810),
            O = require(1320),
            GCreateSymbolAction = require(608),
            R = require(1310),
            M = require(874),
            N = require(1177),
            B = require(1316),
            GCutCopyAction = require(1331),
            j = require(1332),
            K = require(1334),
            V = require(1178),
            GDistributeAction = require(867),
            W = require(1315),
            z = require(1312),
            GExportAction = require(861),
            GFitAllAction = require(449),
            X = require(1598),
            Q = require(566),
            GGroupAction = require(811),
            Z = require(1599),
            ee = require(1172),
            te = require(1179),
            ne = require(1167);
        const oe = require(812),
            GMergeSubAction = require(1600);
        var ae = require(1601),
            re = require(1602),
            se = require(1296),
            GOffsetAction = require(1317),
            ce = require(1282),
            GOutlineAction = require(1185),
            ue = require(1297),
            pe = require(1603),
            ge = require(877),
            he = require(1183);
        const fe = require(876);
        var me = require(1184),
            ye = require(1182),
            ve = require(875),
            _e = require(1605),
            be = require(1606),
            we = require(1607),
            Ce = require(1340),
            xe = require(813),
            Se = require(1299),
            GImportFontsAction = require(1608),
            GPrintAction = require(1609),
            GRedoAction = require(1284),
            Ge = require(1611),
            Pe = require(447 /* GSaveAction */),
            De = require(1612),
            GSaveAsAction = require(445),
            Ie = require(1333),
            ke = require(1180);
        const Oe = require(1304),
            Fe = require(1305),
            Re = require(1306),
            Me = require(1307),
            Ne = require(1308),
            Be = require(1309);
        var Ue = require(1613),
            $e = require(1285),
            je = require(1169),
            Ke = require(1286),
            Ve = require(1614),
            He = require(1615),
            GSimplifyAction = require(1318),
            ze = require(1295),
            GSplitAction = require(870),
            Ye = require(1319),
            Xe = require(873),
            Qe = require(1287),
            GToggleSnapAction = require(1288),
            GToggleSnapZonesAction = require(1289),
            GPlaceImportAction = require(1283),
            GLinkImageAction = require(1280),
            GTransformAction = require(871),
            GUndoAction = require(1171),
            GVectorizeBorderAction = require(872),
            at = require(1616),
            rt = require(1314),
            GZoomInAction = require(1290),
            GZoomOutAction = require(1291),
            GPlayAction = require(1617),
            dt = require(1619),
            ut = require(1335),
            pt = require(448),
            GVersionsHistoryAction = require(1256),
            ht = require(1620),
            ft = require(1621),
            mt = require(1336),
            yt = require(1623),
            vt = require(843),
            _t = require(1181),
            bt = require(1624),
            wt = require(1342),
            Ct = (require(1298 /* GUseCouponAction */), require(1625)),
            xt = require(1626),
            GCloudSynchronizationAction = require(1293),
            Et = require(1627),
            At = require(1628),
            GSharePointCheckOutAction = require(1629),
            Gt = require(1630),
            Pt = require(1632),
            Dt = require(1633),
            Lt = (require(1158), require(1634 /* GToggleTouchAction */)),
            It = require(1635),
            kt = require(1636),
            Ot = require(1637);
        const Ft = require(1638);
        var GOpenSharedFileAction = require(1254),
            Mt = require(1639),
            Nt = require(1641);
        require(1642);
        const Bt = require(1643),
            Ut = require(1645),
            $t = require(1646),
            jt = require(1647),
            Kt = require(1344),
            Vt = require(1345),
            Ht = require(1648),
            Wt = require(1649),
            zt = require(1650),
            qt = require(1341),
            Yt = require(1651),
            Xt = require(1652),
            Qt = require(1653);
        (require(78), require(86));
        var Jt = require(1346),
            Zt = (require(1347), require(1160 /* GAppearanceProperties */)),
            GFillPaintLayerProperties = require(1261),
            GBorderPaintLayerProperties = require(1162),
            GBoolOpProperties = require(1264),
            GEffectProperties = require(1262),
            GEllipseProperties = require(1265),
            GImageProperties = require(1266),
            GFrameProperties = require(1654),
            GGroupFrameProperties = require(1655),
            cn = require(1656),
            dn = require(864),
            GOutlineSidebar = require(1260),
            GAnnotationsSidebar = require(567),
            GPathProperties = require(1269),
            GPatternChooser = require(1150),
            fn = require(1657 /* GPatternChooser */),
            mn = require(1270 /* GCommonNames */),
            yn = require(1271 /* GCommonNames */),
            GPageProperties = require(1339),
            GSymbolProperties = require(1658),
            GSceneProperties = require(1659),
            wn = require(1272 /* GCommonNames */),
            GTextProperties = require(1273),
            GDimensionProperties = require(1294),
            GTransformProperties = require(1660),
            En = require(1274),
            GSymbolsSidebar = require(1661),
            GLibrarySidebar = require(1662),
            GSoftwareUpdatePanel = require(1665),
            GNotificationPanel = require(1666),
            GCollaborativeTextPanel = require(1668),
            Ln = require(1669),
            In = require(1670),
            kn = require(85),
            On = require(1672),
            Fn = (require(237 /* GDocument */), require(1673)),
            Rn = require(119 /* GCommonNames */),
            Mn = require(1674),
            GSystemDialog = require(44),
            Bn = require(860),
            Un = require(1675),
            $n = require(337),
            jn = require(1325),
            Kn = require(785),
            Vn = require(1676),
            Hn = require(808),
            Wn = require(292);
        const zn = designerConfig.FILE_FORMATS.find((e) => e.default).ext,
            qn = designerConfig.FILE_FORMATS.filter((e) => e.secondary).map((e) => e.ext);
        var Yn = require(1678);
        const Xn = new (require(1343))();
        Xn.init();
        const Qn = require(1684),
            GBetaFlow = require(1686),
            Zn = require(1687),
            eo = require(1255),
            { isExecutingOnMSTeams, isExecutingOnMSTeamsSync, isTeamsChannel, getTeamsLocale } = p.default;
        (require(18 /* GCategory */), require(1688), require(1154), require(1689), require(1690), require(1691), require(1693), require(1694));
        var ao = window;
        const ro = !!/^trunk/.test("production") && !isBeta;
        ((ao.gApi = require(10 /* designerConfig */).gApi), (ao.gApi.webcdr = null));
        const so = async () => S.checkMaintenance();
        (so(),
            ro &&
                ((ao.gApi.url = designerConfig.cloudTrunkURL),
                (ao.gApi.managementUrl = "https://cloud-management-trunk.herokuapp.com"),
                designerConfig.trunkWebsocketURL && (ao.gApi.websocketURL = designerConfig.trunkWebsocketURL),
                GObject.GTranslationEvents.addEventListener(
                    GObject.GTranslationNotificationEvent,
                    (e) => {
                        let { project, type, content, data } = e;
                        if (project === GObject.GTranslation.Projects.Designer)
                            switch (type) {
                                case GObject.GTranslationNotificationEvent.Type.Warning:
                                    gContainer.getRuntime() === kn.Runtime.Electron
                                        ? console.error(content)
                                        : console.error({ content: content, data: data });
                            }
                    },
                    void 0
                )),
            isBeta &&
                (isCorel && isTeams && designerConfig.cloudTeamsURL ? (ao.gApi.url = designerConfig.cloudTeamsURL) : designerConfig.cloudBetaURL && (ao.gApi.url = designerConfig.cloudBetaURL),
                designerConfig.betaWebsocketURL && (ao.gApi.websocketURL = designerConfig.betaWebsocketURL)),
            w.IS_PRODUCTION && (designerConfig.cloudURL && (ao.gApi.url = designerConfig.cloudURL), designerConfig.websocketURL && (ao.gApi.websocketURL = designerConfig.websocketURL)),
            (ao.gApi.lang = GObject.GLocale.getLanguage()));
        let lo = null;
        ((ao.gravit = null), require(1738), (ao.gDesigner = new GCommonNames()), ao.gDesigner.getUser(), (ao.gQA = h.default));
        const co = ao.gDesigner.isOfflineAsync();
        ao.gInAppPurchase = Yn.newInAppPurchase(storeVendor);
        const { GA: { customDimensions } = {} } = require(10 /* designerConfig */);
        (gDesigner.addEventListener(Wn, (e) => {
            let { user } = e;
            user && !gDesigner.isAnonymous() && "undefined" != typeof dataLayer && customDimensions && customDimensions.forEach((e) => dataLayer.push({ [e]: void 0 }));
        }),
            (gDesigner._translationManager = Xn));
        var po = $("<div></div>").addClass("g-drag-image").appendTo($("body"));
        ((ao.gDragImage = function () {
            return po.empty().attr({ class: "g-drag-image", style: "" });
        }),
            (ao.gPatternChooser = null),
            (ao.gPatternChooserNormal = null),
            (ao.gPatternChooserTouch = null),
            (ao.gContainer = null));
        module.exports = async function (e) {
            ((ao.gContainer = e), (0, GSaveAction._tryAndCatch)(() => $n.start()));
            let t = null;
            const n = gDesigner.getUser();
            (n.then((e) => {
                e && (t = designerConfig.gApi.isEnabledSubscriptions());
            }),
                (window.onerror = function (e, t, n, o, i) {
                    Mn.isPluginError(i)
                        ? GSystemDialog.alert(i.message)
                        : ("production" === nodeEnv || "trunk" === nodeEnv || "lts" === nodeEnv || "rc" === nodeEnv) && Rn.isOnline();
                }),
                x.getRuntimeCode() === designerConfig.Runtime.WindowsStore.code && new Qn().init(),
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
            if (await so()) {
                if (gContainer.getRuntime() !== kn.Runtime.Electron || !(await n)) {
                    $("<iframe></iframe>").addClass("cross-frame").attr("src", "assets/static/maintenance/index.html").appendTo($("body"));
                    const e = setInterval(async () => {
                        (await so()) || (clearInterval(e), location.reload());
                    }, 6e4);
                    return;
                }
            }
            const o = x.getRuntimeCode();
            o && gContainer.setCookie({ name: "_ginst", value: o, url: designerConfig.gApi.url });
            const p = new URL(window.location.href).searchParams;
            if (
                (p && p.has("pd") && gContainer.setCookie({ name: "_gtpd", value: p.get("pd") }),
                p && p.has("newuser") && gDesigner.setShowCreateAccount(true),
                p && p.has("dt")
                    ? gContainer.setCookie({ name: "_gdt", value: p.get("dt") })
                    : gContainer.setCookie({ name: "_gdt", value: "" }),
                p && p.has("coupon")
                    ? gContainer.setCookie({ name: "_gcoupon", value: p.get("coupon") })
                    : gContainer.setCookie({ name: "_gcoupon", value: "" }),
                p &&
                    p.has("recaptchaToken") &&
                    gContainer.setCookie({
                        name: "__grecaptchaToken",
                        value: p.get("recaptchaToken"),
                    }),
                p &&
                    p.has("x-clickref") &&
                    (gContainer.setCookie({
                        name: "cb_prf_corelcorp",
                        value: p.get("x-clickref"),
                    }),
                    gContainer.setCookie({ name: "dynPrice_xparamCookie", value: p })),
                p &&
                    p.has("magiclink") &&
                    (await gContainer.signWithMagicLink(p.get("magiclink"), p.get("d"), p.get("token")).catch(() => null),
                    (t = designerConfig.gApi.isEnabledSubscriptions())),
                p)
            ) {
                gDesigner.setUTM(
                    new Map(
                        Array.from(p.entries()).filter((e) => {
                            let [t] = e;
                            return /^utm/.test(t);
                        })
                    )
                );
                const e = ["firstName", "lastName", "email", "to"],
                    t = Array.from(p.entries())
                        .filter((t) => {
                            let [n] = t;
                            return e.includes(n);
                        })
                        .reduce((e, t) => {
                            let [n, o] = t;
                            return Object.assign(e, { [n]: o });
                        }, {});
                Object.keys(t).length && gDesigner.setSignupOptions(t);
            }
            var h, b, w, S;
            (gContainer.setCookie({
                name: "_gdesignerv",
                value: "3.15.0",
                url: designerConfig.gApi.url,
            }),
                gDesigner.setEnv(nodeEnv),
                gContainer.getRuntime() === kn.Runtime.Electron || isCorel || designerConfig.gApi.initRecaptcha(),
                (async function (e, t) {
                    const n = await gDesigner.getUser();
                    (0, g.default)(e, t, gDesigner.getAppBaseUrl(), n);
                })(gContainer.getRuntime(), storeVendor),
                !isBeta ||
                    (gContainer.getRuntime() !== kn.Runtime.Browser && gContainer.getRuntime() !== kn.Runtime.PWA) ||
                    ((h = window),
                    (b = document),
                    (h.hj =
                        h.hj ||
                        function () {
                            (h.hj.q = h.hj.q || []).push(arguments);
                        }),
                    (h._hjSettings = { hjid: 754178, hjsv: 6 }),
                    (w = b.getElementsByTagName("head")[0]),
                    ((S = b.createElement("script")).async = 1),
                    (S.src = "https://static.hotjar.com/c/hotjar-" + h._hjSettings.hjid + ".js?sv=" + h._hjSettings.hjsv),
                    w.appendChild(S)),
                gDesigner.setStoreVendor(storeVendor),
                gDesigner.setVersion("3.15.0"),
                gDesigner.setCommitSHA("566771f4dff3952a55c0d9d3c130f7e787dfdfa7"),
                gDesigner.setBuildNum("8795"),
                gDesigner.setVersionFriendlyName("PlasmaTrap-patched"));
            let E,
                Wn = (0, GSaveAction._tryAndCatch)(() => gDesigner.preInit(t)),
                Yn = gContainer.handleDeepLinking();
            Yn &&
                (E = await gDesigner
                    .runDeepLink(Yn.link, Yn.options)
                    .then(() => null)
                    .catch((e) => e));
            const io = async () => {
                (await new Promise((e) => gContainer.initLanguage(e)),
                    gDesigner.hasEventListeners(Hn) && gDesigner.trigger(new Hn(Hn.Status.Init)),
                    gDesigner.setIsBeta(isBeta),
                    (gravit = {
                        plugins: [],
                        actions: [new ae(), new yt(), new re(), new xe(), new Se()]
                            .concat([
                                new pt(pt.Actions.Open),
                                new vt(),
                                new Pe(),
                                new GSaveAsAction(zn),
                                ...qn.map((e) => new GSaveAsAction(e)),
                                new pt(pt.Actions.SaveAs),
                                new GCloudSynchronizationAction(),
                                new Et(),
                                new Wt(),
                                new GVersionsHistoryAction(),
                                new GOpenSharedFileAction(),
                            ])
                            .concat([new De()])
                            .concat([
                                new GPlaceImportAction(),
                                new Ft(Ft.Source.PHOTOS),
                                new Ft(Ft.Source.FILES),
                                new GLinkImageAction(),
                                new xt(new GImportFontsAction()),
                                isCorel ? new xt(new GExportAction()) : new GExportAction(),
                            ])
                            .concat(
                                GDocument.FileTypes.filter(
                                    (e) => e.store && "cdrapp" !== e.ext && "des" !== e.ext && "gvdesign" !== e.ext && "pdf" !== e.ext
                                ).map((e) => new GSaveAsAction(e.ext))
                            )
                            .concat([
                                new GSaveAsAction("pdf", { dpi: 72 }),
                                new GSaveAsAction("pdf", { dpi: 96 }),
                                new GSaveAsAction("pdf", { dpi: 150 }),
                                new xt(new GSaveAsAction("pdf", { dpi: 300 })),
                                isCorel ? new xt(new GExportAction({ format: "pdf" })) : new GExportAction({ format: "pdf" }),
                            ])
                            .concat(
                                [
                                    new GSharePointCheckOutAction(),
                                    new Gt(),
                                    new At(),
                                    new GPrintAction(),
                                    new ee(),
                                    new Pt(),
                                    new GUndoAction(),
                                    new GRedoAction(),
                                    new GCutCopyAction(true),
                                    new GCutCopyAction(false),
                                    new ge(),
                                    new he(),
                                    new fe(),
                                    new me(),
                                    new ye(),
                                    new ve(),
                                    new j(),
                                    new W(),
                                    new z(),
                                    new Ie(),
                                    new K(),
                                    new Z(),
                                    new ke(),
                                    new Oe(Oe.Type.Fill),
                                    new Oe(Oe.Type.Border),
                                    new Oe(Oe.Type.FillAndBorder),
                                    new Fe(),
                                    new Re(),
                                    new Me(),
                                    new Ne(),
                                    new Be(),
                                    new Ue(),
                                    new Ut(Ut.Type.Fill),
                                    new Ut(Ut.Type.Border),
                                    new Ce(),
                                    new jt(),
                                    new GArrangeAction(r.GEditor.ArrangeOrderType.SendToFront),
                                    new GArrangeAction(r.GEditor.ArrangeOrderType.BringForward),
                                    new GArrangeAction(r.GEditor.ArrangeOrderType.SendBackward),
                                    new GArrangeAction(r.GEditor.ArrangeOrderType.SendToBack),
                                    new GAlignAction(r.GEditor.ArrangeAlignType.AlignLeft),
                                    new GAlignAction(r.GEditor.ArrangeAlignType.AlignCenter),
                                    new GAlignAction(r.GEditor.ArrangeAlignType.AlignRight),
                                    new GAlignAction(r.GEditor.ArrangeAlignType.AlignTop),
                                    new GAlignAction(r.GEditor.ArrangeAlignType.AlignMiddle),
                                    new GAlignAction(r.GEditor.ArrangeAlignType.AlignBottom),
                                    new GAlignAction(r.GEditor.ArrangeAlignType.AlignJustifyHorizontal),
                                    new GAlignAction(r.GEditor.ArrangeAlignType.AlignJustifyVertical),
                                    new GDistributeAction(GDistributeAction.Type.Horizontal),
                                    new GDistributeAction(GDistributeAction.Type.Vertical),
                                    new ze(ze.Type.FullUnit),
                                    new ze(ze.Type.HalfUnit),
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
                                    new _t(),
                                    new R(),
                                    new D(),
                                    new oe(GMergeSubAction),
                                    new GMergeSubAction(GMergeSubAction.Type.Intersect),
                                    new GMergeSubAction(GMergeSubAction.Type.Difference),
                                    new GMergeSubAction(GMergeSubAction.Type.Subtract),
                                    new GMergeSubAction(GMergeSubAction.Type.Union),
                                    new B(),
                                    new te(),
                                    new Xe(),
                                    new GConvertToPathAction(),
                                    new O(),
                                    new GOutlineAction(),
                                    new GOffsetAction(),
                                    new GVectorizeBorderAction(),
                                    new at(),
                                    new P(),
                                    new V(),
                                    new GSimplifyAction(),
                                    new I(),
                                    new Ye(),
                                    new Ge(),
                                    new GCreateSymbolAction(),
                                    new M(),
                                    new N(),
                                    new rt(),
                                    new be(),
                                    new Vt(Ht),
                                    new Ht(Ht.Type.Straight),
                                    new Ht(Ht.Type.Mirrored),
                                    new Ht(Ht.Type.Disconnected),
                                    new Ht(Ht.Type.Asymmetric),
                                    new Ht(Ht.Type.Connector),
                                    new Xt(),
                                    new Qt(),
                                    new ce(),
                                    new Q(),
                                    new X(),
                                    new GFitAllAction(),
                                    new _e(false),
                                    new _e(true),
                                    new we(),
                                    new Kt(Kt.Type.Next),
                                    new Kt(Kt.Type.Previous),
                                    new zt(),
                                    new qt(qt.Type.Next),
                                    new qt(qt.Type.Previous),
                                    new Yt(Yt.Type.Next),
                                    new Yt(Yt.Type.Previous),
                                ].concat(ne.ZOOM_LEVELS.map((e) => new ne(e)))
                            )
                            .concat([
                                new GZoomInAction(),
                                new GZoomOutAction(),
                                new ue(),
                                new pe(),
                                new Ve(),
                                new je(),
                                new Ke(),
                                new $e(),
                                new He(),
                                new dt(),
                                new $t(),
                                new GToggleSnapAction(),
                                ...(designerConfig.HAS_SNAPZONES ? [new GToggleSnapZonesAction()] : []),
                                new Qe(r.GGridGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-grid"))),
                                new Qe(r.GGuideLinesGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-guide-lines"))),
                                new Qe(r.GFullPixelsGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-full-pixels"))),
                                new Qe(r.GPointsGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-anchor-points"))),
                                new Qe(r.GBBoxGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-shapes"))),
                                new Qe(r.GPageGuide.ID, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-pages"))),
                                new se(),
                                new GPlayAction(),
                                new ut(),
                                new xt(new Lt()),
                            ])
                            .concat(
                                ft.Links.filter((e) => "eula" !== e.name).map((e) => new ft(e)),
                                isCorel ? [] : new wt(),
                                new Dt(),
                                new mt()
                            )
                            .concat(...(isExecutingOnMSTeamsSync() ? [] : kn.GravitLanguages.map((e) => new ht(e, Xn.getTranslationRealName(e)))))
                            .concat([
                                ...(isCorel ? [new Nt("STAGING", ro), new Nt("BETA", isBeta)] : []),
                                new bt(),
                                ...(C ? [new Ct()] : []),
                                ...ft.Links.filter((e) => "eula" === e.name).map((e) => new ft(e)),
                                new Mt(),
                                ...(isCorel ? [new Ot()] : []),
                                new Bt(),
                            ])
                            .concat([new It(), new kt()]),
                        sidebars: [new dn(), ...(designerConfig.HAS_ANNOTATIONS ? [new GAnnotationsSidebar()] : []), new GOutlineSidebar(), new GLibrarySidebar(), new GSymbolsSidebar()],
                        panels: [],
                        footer: [new GSoftwareUpdatePanel(), new GNotificationPanel(), ...(isCorel ? [new GCollaborativeTextPanel(), new Ln()] : [])],
                        tools: [
                            {
                                tool: r.GPointerTool,
                                toolString: "GPointerTool",
                                title: isCorel
                                    ? GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "tool.pointer"))
                                    : GObject.GLocale.get(new GObject.GLocaleKey("GPointerTool", "name")),
                                group: "select",
                                key: "V",
                                icon: "gravit-icon-cursor-filled",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GPointerTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GPointerTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["V"],
                                    video: ao.gApi.getRichTooltipVideoURL("Pointer_Tool.mp4"),
                                    learnMore: "/docs/tools/selection-tools/#pointer-tool",
                                }),
                            },
                            {
                                tool: r.GSubSelectTool,
                                toolString: "GSubSelectTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GSubSelectTool", "name")),
                                group: "select",
                                key: "D",
                                icon: isCorel ? "gravit-icon-cursor-subselect" : "gravit-icon-cursor",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GSubSelectTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GSubSelectTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["D"],
                                    video: ao.gApi.getRichTooltipVideoURL("Subselect_Tool.mp4"),
                                    learnMore: "/docs/tools/selection-tools/#subselect-tool",
                                }),
                            },
                            {
                                tool: r.GLassoTool,
                                toolString: "GLassoTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GLassoTool", "name")),
                                group: "select",
                                category: "special",
                                key: "O",
                                icon: "gravit-icon-rope",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GLassoTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GLassoTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["O"],
                                    video: ao.gApi.getRichTooltipVideoURL("Lasso_Tool.mp4"),
                                    learnMore: "/docs/tools/selection-tools/#lasso-tool",
                                }),
                            },
                            {
                                tool: r.GLayerTool,
                                toolString: "GLayerTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GLayerTool", "name")),
                                group: "select",
                                category: "special",
                                icon: "gravit-icon-sheets",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GLayerTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GLayerTool", "tooltip-description")),
                                    middle: false,
                                    learnMore: "/docs/tools/selection-tools/#layer-tool",
                                }),
                            },
                            {
                                tool: r.GSliceTool,
                                toolString: "GSliceTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GSliceTool", "name")),
                                group: "select",
                                category: "other",
                                key: "S",
                                icon: "gravit-icon-slice",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GSliceTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GSliceTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["S"],
                                    learnMore: "/docs/tools/selection-tools/#slice-tool",
                                }),
                            },
                            {
                                tool: r.GPenTool,
                                toolString: "GPenTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPenTool", "name")),
                                group: "path",
                                key: "P",
                                icon: "gravit-icon-pen",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GPenTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GPenTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["P"],
                                    video: ao.gApi.getRichTooltipVideoURL("Pen_Too.mp4"),
                                    learnMore: "/docs/tools/drawing-tools/#pen-tool",
                                }),
                            },
                            {
                                tool: r.GBezigonTool,
                                toolString: "GBezigonTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GBezigonTool", "name")),
                                group: "path",
                                key: "B",
                                icon: "gravit-icon-pen-filled",
                                pro: true,
                                feature: "bezigon",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GBezigonTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GBezigonTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["B"],
                                    isPro: gDesigner.isProTooltipNeeded("bezigon"),
                                    video: ao.gApi.getRichTooltipVideoURL("Bezigon_Tool.mp4"),
                                    learnMore: "/docs/tools/drawing-tools/#bezigon-tool",
                                }),
                            },
                            {
                                tool: r.GKnifeTool,
                                toolString: "GKnifeTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GKnifeTool", "name")),
                                group: "knife",
                                category: "modify",
                                key: "K",
                                icon: "gravit-icon-scalpel",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GKnifeTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GKnifeTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["K"],
                                    video: ao.gApi.getRichTooltipVideoURL("Knife_Tool.mp4"),
                                    learnMore: "/docs/tools/other-tools/#knife-tool",
                                }),
                            },
                            {
                                tool: r.GFreehandTool,
                                toolString: "GFreehandTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GFreehandTool", "name")),
                                group: "path",
                                category: "hand",
                                icon: "gravit-icon-free-hand-draw",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GFreehandTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GFreehandTool", "tooltip-description")),
                                    middle: false,
                                    video: ao.gApi.getRichTooltipVideoURL("Freehand_Tool.mp4"),
                                    learnMore: "/docs/tools/drawing-tools/#freehand-tool",
                                }),
                            },
                            {
                                tool: r.GMagicTool,
                                toolString: "GMagicTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GMagicTool", "name")),
                                group: "knife",
                                category: "modify",
                                icon: "gravit-icon-freehand-shape",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GMagicTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GMagicTool", "tooltip-description")),
                                    middle: false,
                                    video: ao.gApi.getRichTooltipVideoURL("Freehand_Shaping_Tool.mp4"),
                                    learnMore: "/docs/tools/other-tools/#freehand-shaping-tool",
                                }),
                            },
                            {
                                tool: r.GLineTool,
                                toolString: "GLineTool",
                                title: GObject.GLocale.get(
                                    isCorel ? new GObject.GLocaleKey("GCommonNames", "tool.line") : new GObject.GLocaleKey("GLineTool", "name")
                                ),
                                group: "shape",
                                key: "L",
                                icon: "gravit-icon-line",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GLineTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GLineTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["L"],
                                    video: ao.gApi.getRichTooltipVideoURL("Line_Tool.mp4"),
                                    learnMore: "/docs/basics/shapes-paths/#line",
                                }),
                            },
                            {
                                tool: r.GRectangleTool,
                                toolString: "GRectangleTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GRectangleTool", "name")),
                                group: "shape",
                                key: "R",
                                shortcuts: [["M"]],
                                icon: "gravit-icon-rectangle",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GRectangleTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GRectangleTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["R"],
                                    video: ao.gApi.getRichTooltipVideoURL("Rectangle_Tool.mp4"),
                                    learnMore: "/docs/basics/shapes-paths/#rectangle-r",
                                }),
                            },
                            {
                                tool: r.GEllipseTool,
                                toolString: "GEllipseTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GEllipseTool", "name")),
                                group: "shape",
                                key: "E",
                                icon: "gravit-icon-ellipse",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GEllipseTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GEllipseTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["E"],
                                    video: ao.gApi.getRichTooltipVideoURL("Ellipse_Tool.mp4"),
                                    learnMore: "/docs/basics/shapes-paths/#ellipse-e",
                                }),
                            },
                            {
                                tool: r.GPolygonTool,
                                toolString: "GPolygonTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GPolygonTool", "name")),
                                group: "shape",
                                category: "polygon",
                                icon: "gravit-icon-polygon",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GPolygonTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GPolygonTool", "tooltip-description")),
                                    middle: false,
                                    learnMore: "/docs/basics/shapes-paths/#polygon",
                                }),
                            },
                            {
                                tool: r.GTriangleTool,
                                toolString: "GTriangleTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GTriangleTool", "name")),
                                group: "shape",
                                category: "polygon",
                                icon: "gravit-icon-triangle",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GTriangleTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GTriangleTool", "tooltip-description")),
                                    middle: false,
                                    learnMore: "/docs/basics/shapes-paths/#triangle-star",
                                }),
                            },
                            {
                                tool: r.GStarTool,
                                toolString: "GStarTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GStarTool", "name")),
                                group: "shape",
                                category: "polygon",
                                icon: "gravit-icon-star",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GStarTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GStarTool", "tooltip-description")),
                                    middle: false,
                                    learnMore: "/docs/basics/shapes-paths/#triangle-star",
                                }),
                            },
                            {
                                tool: r.GTextTool,
                                toolString: "GTextTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GTextTool", "name")),
                                group: "insert",
                                key: "T",
                                icon: "gravit-icon-textbox",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GTextTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GTextTool", "tooltip-description")),
                                    middle: false,
                                    video: ao.gApi.getRichTooltipVideoURL("Text_Tool.mp4"),
                                    shortcut: ["T"],
                                    learnMore: "/docs/working-with-text/",
                                }),
                            },
                            {
                                tool: r.GHandTool,
                                toolString: "GHandTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GHandTool", "name")),
                                group: "view",
                                key: "H",
                                icon: "gravit-icon-move",
                                richTooltipConfig: d.GRichTooltipConfig.from({
                                    title: GObject.GLocale.get(new GObject.GLocaleKey("GHandTool", "tooltip-title")),
                                    description: GObject.GLocale.get(new GObject.GLocaleKey("GHandTool", "tooltip-description")),
                                    middle: false,
                                    shortcut: ["H"],
                                    learnMore: "/docs/tools/other-tools/#pan",
                                }),
                            },
                            {
                                tool: r.GZoomTool,
                                toolString: "GZoomTool",
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GZoomTool", "name")),
                                group: "view",
                                key: "Z",
                                icon: "gravit-icon-zoom-in",
                                richTooltipConfig: d.GRichTooltipConfig.from({
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
                            new En(),
                            new GTransformProperties(),
                            new GPageProperties(),
                            new GSceneProperties(),
                            new GGroupFrameProperties(),
                            new GFrameProperties(),
                            new cn(),
                            new mn(),
                            new GPathProperties(),
                            new GEllipseProperties(),
                            new GTextProperties(),
                            new GImageProperties(),
                            new yn(),
                            new wn(),
                            new GBoolOpProperties(),
                            new GSymbolProperties(),
                            new Zt(),
                            new GFillPaintLayerProperties(),
                            new GBorderPaintLayerProperties(),
                            new GEffectProperties(),
                        ],
                    }),
                    "function" != typeof window.gdb_initsavestepsaction ||
                        isBeta ||
                        IS_TRUNK.IS_RC ||
                        window.gdb_initsavestepsaction(window.gravit.actions, Pe),
                    "function" == typeof window.gdb_initsetupsystemdateaction &&
                        window.gdb_initsetupsystemdateaction(window.gravit.actions),
                    "function" != typeof window.gdb_inittranslationtoolaction ||
                        isBeta ||
                        IS_TRUNK.IS_RC ||
                        window.gdb_inittranslationtoolaction(window.gravit.actions, Pe),
                    "function" != typeof window.gdb_initrecordgravitaction ||
                        isBeta ||
                        IS_TRUNK.IS_RC ||
                        window.gdb_initrecordgravitaction(window.gravit.actions, Pe));
                let t = new In(e._storage);
                (t.load(),
                    t.init(gravit),
                    (ao.gPatternChooserNormal = new GPatternChooser()),
                    (ao.gPatternChooserTouch = new fn()),
                    gDesigner.isTouchEnabled()
                        ? (ao.gPatternChooser = ao.gPatternChooserTouch)
                        : (ao.gPatternChooser = ao.gPatternChooserNormal),
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
                                (e) => {
                                    (gDesigner.stats("touch-dialog_click_".concat(e ? "ok" : "cancel")),
                                        e && gDesigner.executeAction(Lt.ID, void 0, void 0, true));
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
                var n = e.start();
                (gContainer.getRuntime() === kn.Runtime.Electron &&
                    gDesigner.getUser().then((e) => {
                        e ||
                            co.then((e) => {
                                e || Rn.performLogin();
                            });
                    }),
                    gDesigner.updateRecentDocumentsAction(),
                    Fn.init());
                let o = gDesigner.getSetting("webcdr_choice", isBeta ? "BETA" : "STAGING");
                if (
                    (ro
                        ? designerConfig.trunkwebcdr &&
                          (IS_TRUNK.IS_LOCALHOST
                              ? (ao.gApi.webcdr = o && "BETA" === o ? designerConfig.cloudBetaURL + "/api/webcdr" : designerConfig.cloudTrunkURL + "/api/webcdr")
                              : (ao.gApi.webcdr = o && "BETA" === o ? designerConfig.betaWebcdr : designerConfig.trunkwebcdr))
                        : isBeta
                          ? (ao.gApi.webcdr = o && "BETA" === o ? designerConfig.betaWebcdr : designerConfig.stagingWebcdr)
                          : designerConfig.webcdr && (ao.gApi.webcdr = designerConfig.webcdr),
                    $("body").removeClass("loading"),
                    (window.onbeforeunload = function (e) {
                        gDesigner.isReloading() ||
                            gContainer.canUnload(gDesigner.hasModifiedDocuments(), gDesigner.hasSynchronizingDocuments(), false) ||
                            (e.preventDefault(), (e.returnValue = ""));
                    }),
                    (window.onunload = function () {
                        gDesigner.hasEventListeners(Jt) && gDesigner.trigger(new Jt());
                    }),
                    n)
                ) {
                    let e = new GDocument();
                    if (
                        gContainer.getRuntime() === kn.Runtime.Browser ||
                        gContainer.getRuntime() === kn.Runtime.PWA ||
                        gContainer.getRuntime() === kn.Runtime.IPad
                    ) {
                        let t = "";
                        if (n.getType() === kn.OpenFileRequest.Type.DocumentOrToken)
                            try {
                                t = JSON.parse(n.getContent()).doc;
                            } catch (e) {}
                        else t = n.getContent();
                        (e.setTitle(t), Yn && e.setFocusAnnotationId(Yn.options.annot), gDesigner.addDocument(e));
                    }
                    (gContainer.getRuntime() === kn.Runtime.Electron
                        ? gContainer.openStorageFile(e, n, (e) => {
                              e && gDesigner.openDocument(e);
                          })
                        : eo.handleOpenFileRequest(e, n),
                        gDesigner.createNewDocumentDialog());
                } else f.default.isEnabled() ? gDesigner.handleWelcomeScreenOpenWithUserPermissions() : gDesigner.newInfiniteDocument();
                (gDesigner.hasEventListeners(Hn) && gDesigner.trigger(new Hn(Hn.Status.Ready)),
                    (0, GSaveAction.isSupportedScreenSize)()
                        ? !(0, GSaveAction.isSupportedScreenSize)(document.body.clientWidth) &&
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
                    t.start(),
                    await jn.start(),
                    C &&
                        (await (0, GSaveAction._tryAndCatch)(() => {
                            ((gDesigner._softwareUpdateManager = new Vn()), gDesigner._softwareUpdateManager.start());
                        })),
                    (ao.gMemoryManager = new Zn()),
                    ao.gMemoryManager.start());
            };
            if (
                ("function" != typeof gdb_initSetupSystemDate || isBeta || (await gdb_initSetupSystemDate()),
                await Wn,
                await (0, GSaveAction._tryAndCatch)(() => Kn.init()),
                await null,
                isCorel || gDesigner.isEnabledSubscriptions())
            ) {
                const e = async () => {
                    const e = await gDesigner.getUser();
                    let t;
                    if (e && e.isAnonymous() && Yn && Yn.link === kn.DeepLinking.DirectLink) {
                        let e = Yn.options[kn.DeepLinking.DirectLink];
                        t = JSON.parse((0, GSaveAction.base64StringToString)(e)).signup;
                    }
                    if (!e || e.reload || e.deactivated || (e.isAnonymous() && t)) {
                        const n = Yn && Yn.link;
                        e && !e.isAnonymous() && (await (0, GSaveAction._tryAndCatch)(() => gDesigner.signout(true, true)));
                        const o = new URL(window.location.href).searchParams.get("token");
                        if (o) {
                            const { enterprise } = await designerConfig.gApi.checkEnterpriseToken(o).catch({ enterprise: false });
                            enterprise && gDesigner.setEnterpriseLoginForm(true);
                        }
                        (await gContainer.preLogin().catch((e) => {
                            console.warn("gContainer preLogin error", e);
                        }),
                            new Bn(io).open({ flow: n, signup: t, version: "PlasmaTrap-patched" }),
                            On.setupInAppLinkReloadAppForOnce(),
                            p &&
                                p.has(kn.DeepLinking.PWADialog) &&
                                gDesigner.executeWhenReady(() => {
                                    gDesigner.showInstallPwaDialog(true);
                                }),
                            E && GSystemDialog.error(E));
                    } else
                        (await io(),
                            p &&
                                p.has(kn.DeepLinking.PWADialog) &&
                                gDesigner.executeWhenReady(() => {
                                    gDesigner.showInstallPwaDialog();
                                }));
                };
                if (designerConfig.msTeamsMode) (await isExecutingOnMSTeams()) ? new u.default(io).load() : window.location.replace(window.location.origin);
                else if (navigator.onLine || gDesigner.isEnabledProFeatures("offline")) await e();
                else {
                    const t = GSystemDialog.custom({
                            icon: "clock",
                            title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.license-offline-title")),
                            subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.license-offline-expired-subtitle")),
                            closeable: false,
                        }),
                        n = () => {
                            navigator.onLine && (e(), t.gDialog("close"), $(window).off("online", n));
                        };
                    $(window).on("online", n);
                }
            } else await io();
            designerConfig.gApi.setHooks({
                onError: () => {
                    lo || so().then((e) => e && void (lo || ((lo = new Un()), lo.open())));
                },
            });
        };
    };
