module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(57), require(8 /* Symbol */), require(356), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(3), require(151), require(34), require(91 /* polyfill:String */), require(4), require(41), require(13), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            designerConfig = require(10),
            s = require(357),
            l = _interopRequireDefault(require(238)),
            c = _interopRequireDefault(require(339)),
            d = _interopRequireDefault(require(1501)),
            u = _interopRequireDefault(require(1502)),
            p = _interopRequireDefault(require(603)),
            g = _interopRequireDefault(require(78)),
            h = _interopRequireDefault(require(217)),
            f = _interopRequireDefault(require(86)),
            m = _interopRequireDefault(require(119 /* GCommonNames */)),
            y = _interopRequireDefault(require(447 /* GSaveAction */)),
            v = _interopRequireDefault(require(448)),
            _ = _interopRequireDefault(require(861 /* GExportAction */)),
            b = _interopRequireDefault(require(1254 /* GOpenSharedFileAction */)),
            w = _interopRequireDefault(require(1256 /* GVersionsHistoryAction */)),
            C = _interopRequireDefault(require(388)),
            x = _interopRequireDefault(require(220)),
            S = _interopRequireDefault(require(44 /* GSystemDialog */)),
            E = _interopRequireDefault(require(862)),
            A = _interopRequireDefault(require(156)),
            T = _interopRequireDefault(require(163 /* GDocument */)),
            GRegex = require(263),
            P = require(1517);
        const D = require(257);
        let L = null;
        designerConfig.LICENSE.UPGRADEABLE && (L = require(441));
        const I = require(135),
            k = require(392),
            O = require(805),
            {
                InParenthesis: { NotNegativeNumberInTheEnd },
                NotNegativeNumber,
            } = GRegex.GRegex.String,
            M = [
                {
                    title: new GObject.GLocaleKey("GFilesPanel", "action.rename"),
                    shortcut: null,
                    callback: function (e, t) {
                        const n = this,
                            o = e.getDocument(),
                            a = o.getStorageItem();
                        let s = true;
                        if ((a && (s = !(a instanceof C.default.Item)), !s)) return false;
                        const l = () => {
                            const s = t.find("input"),
                                c = e.getTitle();
                            let d = c;
                            (a && designerConfig.USE_EXTENSION_IN_FILENAME && (d += "." + a.getExtension().toLowerCase()),
                                s.off("focusout"),
                                s.off("keypress"));
                            var u = t.find("span.cover");
                            (u.text(d), s.css("width", u.outerWidth()), s.val(c));
                            var p = s.val(),
                                h = false;
                            (s.show(), u.hide(), s.focus());
                            var f = async function () {
                                try {
                                    (s.hide(), u.show());
                                    let d,
                                        h = s.val().trim();
                                    if (h && h !== c)
                                        if (a) {
                                            if (
                                                (n._updateSyncStatus(
                                                    t,
                                                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.synchronizing")) + "...",
                                                    true
                                                ),
                                                a instanceof x.default.Item)
                                            ) {
                                                let e = a.getFile();
                                                const c = new E.default();
                                                try {
                                                    let o = 0;
                                                    if (c.supportsSaveCollisionFlow()) {
                                                        if (
                                                            (e.ext || (e.ext = designerConfig.FILE_FORMATS.find((e) => e.default).ext.toUpperCase()),
                                                            (await c.fileExists(h, e.ext, e.parent || c.getRootFolder())) &&
                                                                !(await ((e) => {
                                                                    let t;
                                                                    return (
                                                                        (t = GObject.GLocale.get(
                                                                            new GObject.GLocaleKey(
                                                                                "GFilesPanel",
                                                                                "text.file-already-exists-on-current-location"
                                                                            )
                                                                        ).replace("%filename", '"'.concat(e, '"'))),
                                                                        new Promise((e) => {
                                                                            S.default.confirm(t, (t) => e(!!t), null, null, false, true, true);
                                                                        })
                                                                    );
                                                                })(h)))
                                                        )
                                                            return (n._updateSyncStatus(t, ""), l());
                                                        if (c.requiresOverwriteCollisionHandling())
                                                            for (d = h; await c.fileExists(d, e.ext, e.parent || c.getRootFolder()); )
                                                                d = "".concat(h, " (").concat(++o, ")");
                                                    }
                                                    (d || (d = h), await c.renameItem(e, d));
                                                } catch (e) {
                                                    return (
                                                        console.log(">>>.error-renaming e", e),
                                                        s.val(p),
                                                        n._updateSyncStatus(
                                                            t,
                                                            GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.failed-to-synch")),
                                                            false,
                                                            false,
                                                            true,
                                                            o.isCloudFile()
                                                        ),
                                                        void S.default.alert(
                                                            GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "text.error-renaming"))
                                                        )
                                                    );
                                                }
                                                e.name = d;
                                            } else d = h;
                                            (o.setTitle(d),
                                                a.setFileName(d),
                                                gDesigner.trigger(new g.default(g.default.Type.Modified, o)),
                                                n._updateSyncStatus(t, ""),
                                                u.text(d + (designerConfig.USE_EXTENSION_IN_FILENAME ? "." + a.getExtension().toLowerCase() : "")),
                                                s.css("width", u.outerWidth()));
                                        } else e.getDocument().setTitle(h);
                                    else s.val(p);
                                } catch (e) {
                                    throw e;
                                }
                            };
                            s.on("focusout", function () {
                                h || (f(), (h = true));
                            }).on("keypress", function (e) {
                                13 !== e.which || h || (f(), (h = true));
                            });
                        };
                        return (l(), true);
                    },
                    stats: "header_contextmenu_rename",
                    requiresPro: false,
                    isEnabled: () => gDesigner.getApplicationManager().isEditingEnabled(),
                    isVisible: (e) => {
                        const t = e.getDocument().getStorageItem();
                        return !(t && t instanceof C.default.Item);
                    },
                },
                {
                    separator: true,
                    isVisible: (e) => {
                        const t = e.getDocument().getStorageItem();
                        return !(t && t instanceof C.default.Item);
                    },
                },
                {
                    title: y.default.TITLE,
                    shortcut: y.default.SHORTCUT,
                    id: y.default.ID,
                    needsAction: true,
                    stats: "header_contextmenu_save",
                    icon: () => gDesigner.getAction(y.default.ID).getIcon(),
                    requiresPro: false,
                },
                {
                    title: new GObject.GLocaleKey("GSaveAsAction", "title"),
                    shortcut: [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "S"],
                    id: () => "".concat(v.default.ID, ".").concat(v.default.Actions.SaveAs),
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
                    isEnabled: (e) => {
                        const t = e.getDocument().getStorageItem();
                        return gDesigner.getApplicationManager().isShareEnabled() && t instanceof x.default.Item;
                    },
                    requiresPro: false,
                },
                {
                    title: new GObject.GLocaleKey("GOpenSharedFileAction", "title"),
                    stats: "header_contextmenu_open-shared-file",
                    id: () => b.default.ID,
                    needsAction: true,
                    requiresPro: false,
                },
                {
                    title: new GObject.GLocaleKey("GVersionsHistoryAction", "title"),
                    shortcut: null,
                    stats: "header_contextmenu_version-history",
                    icon: () => gDesigner.getAction(w.default.ID).getIcon(),
                    id: w.default.ID,
                    needsAction: true,
                    requiresPro: true,
                },
                {
                    title: _.default.TITLE,
                    shortcut: _.default.SHORTCUT,
                    stats: "header_contextmenu_advanced-export",
                    icon: () => gDesigner.getAction(_.default.ID).getGroupIcon(),
                    id: _.default.ID,
                    needsAction: true,
                    requiresPro: true,
                },
                {
                    title: new GObject.GLocaleKey("GHeader", "action.context-menu.duplicate"),
                    shortcut: null,
                    callback: function (e) {
                        const t = e.getDocument(),
                            n = t.getStorageItem(),
                            o = () => {
                                const e = t.getScene(),
                                    n = new T.default(e.clone(null, gDesigner.getWorkspace()));
                                t.getFileFormatVersion() && n.setFileFormatVersion(t.getFileFormatVersion());
                                const o = t.getTitle();
                                let i;
                                if (new RegExp(NotNegativeNumberInTheEnd).test(o)) {
                                    const e = o.match(NotNegativeNumberInTheEnd),
                                        t = parseInt(e[0].match(NotNegativeNumber)[0]);
                                    i = o.replace(NotNegativeNumberInTheEnd, "(".concat(t + 1, ")"));
                                } else i = "".concat(o, "(1)");
                                const a = gDesigner.getDocuments().indexOf(t);
                                (n.setTitle(i), gDesigner.addDocument(n, a + 1));
                            };
                        n && n instanceof x.default.Item
                            ? (() => {
                                  const e = n.getFile().parent,
                                      o = gDesigner.getDocuments().indexOf(t),
                                      i = new E.default();
                                  (i.setCurrentFolder(A.default.from({ id: e })),
                                      i.copyPaste([n.getFile()]).then(function (e) {
                                          let [{ id }] = e;
                                          return i.openFile(id, o + 1);
                                      }));
                              })()
                            : o();
                    },
                    isEnabled: (e) => {
                        if (!gDesigner.getApplicationManager().isSavingAsEnabled()) return false;
                        return !(e.getDocument().getStorageItem() instanceof C.default.Item);
                    },
                    stats: "header_contextmenu_duplicate",
                    icon: "gravit-icon-duplicate",
                    requiresPro: false,
                },
                { separator: true },
                {
                    title: new GObject.GLocaleKey("GHeader", "action.context-menu.close-other"),
                    shortcut: null,
                    callback: function (e) {
                        const t = gDesigner
                            .getWindows()
                            .getWindows()
                            .slice()
                            .filter((t) => t !== e);
                        S.default.confirm(
                            GObject.GLocale.get(new GObject.GLocaleKey("GHeader", "text.close-other-tabs-confirmation")),
                            (e) => {
                                e && N(t);
                            },
                            null,
                            null,
                            null,
                            true,
                            true
                        );
                    },
                    isEnabled: (e) =>
                        gDesigner
                            .getWindows()
                            .getWindows()
                            .slice()
                            .filter((t) => t !== e).length > 0,
                    stats: "header_contextmenu_close-other",
                    requiresPro: false,
                },
                {
                    title: new GObject.GLocaleKey("GHeader", "action.context-menu.close-all"),
                    shortcut: null,
                    callback: function () {
                        S.default.confirm(
                            GObject.GLocale.get(new GObject.GLocaleKey("GHeader", "text.close-all-tabs-confirmation")),
                            (e) => {
                                e && N(gDesigner.getWindows().getWindows().slice());
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
        function N(e) {
            const t = gDesigner.getWindows();
            for (let n = 0, o = e.length; n < o; n++) {
                const o = e[n];
                t.removeWindow(o);
            }
        }
        function B(e) {
            ((this._htmlElement = e),
                (this._menuBar = new d.default(gDesigner.getMainMenu())),
                (this._menuBar.__which = "menubar"),
                (this._personaBar = new u.default()));
        }
        ((B.prototype._personaBar = null),
            (B.prototype._menuBar = null),
            (B.prototype._windows = null),
            (B.prototype._login = null),
            (B.prototype._busy = null),
            (B.prototype._contextMenu = null),
            (B.prototype.getMenuBar = function () {
                return this._menuBar;
            }),
            (B.prototype.init = function () {
                (s.SHOW_BETA_BRANDING &&
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
                    designerConfig.ALLOW_REARRANGE_TABS && (0, P.allowRearrangeTabs)(this._htmlElement),
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
                    gDesigner.addEventListener(g.default, this._documentEvent, this),
                    gDesigner.addEventListener(I, this._settingChangedEvent, this),
                    gDesigner.getWindows().addEventListener(p.default.WindowEvent, this._windowEvent, this),
                    gDesigner.addEventListener(O, this._userPropertiesChangedEvent, this),
                    gDesigner.addEventListener(k, this._applicationStateChangedEvent, this),
                    $(document).on(
                        "networkAvailable",
                        function () {
                            this.checkUser();
                        }.bind(this)
                    ),
                    designerConfig.LICENSE.UPGRADEABLE && gDesigner.addEventListener(L, this._licenseChangeEvent, this),
                    (this._documentStatusEvent = this._documentStatusEvent.bind(this)),
                    this._personaBar.init(),
                    this._updateViewBasedOnPermissions());
            }),
            (B.prototype._updateViewBasedOnPermissions = function () {
                const e = gDesigner.getApplicationManager().isDocumentTabManagementEnabled();
                (this._windows.find(".tabs").css("display", e ? "" : "none"), (0, P.toggleRearrangeTabsVisibility)(this._htmlElement, e));
            }),
            (B.prototype.relayout = function () {
                gDesigner.getApplicationManager().isInspectEnabled()
                    ? this._htmlElement.removeClass("lone")
                    : this._htmlElement.addClass("lone");
            }),
            (B.prototype._licenseChangeEvent = function (e) {
                designerConfig.LICENSE.UPGRADEABLE && (e.license.isDefault() || this._htmlElement.find(".tryout").remove());
            }),
            (B.prototype._documentEvent = function (e) {
                designerConfig.ALLOW_REARRANGE_TABS && (0, P.updateTabsInterface)();
                var t = e.document || gDesigner.getActiveDocument(),
                    n = this.getWindowTab(gDesigner.getWindows().getWindow(t)),
                    o = e.type === g.default.Type.StorageItemUpdated;
                if (o || e.type === g.default.Type.AutoSaveSynchronized || e.type === g.default.Type.Modified) {
                    o && this.updateWindowIcon($(".windows").find(".tab.g-active"));
                    for (var a = e.document.getWindows(), s = 0; s < a.length; ++s)
                        this._windows.find(".tab").each(function (t, n) {
                            var o = $(n);
                            if (o.data("window") === a[s])
                                return (
                                    o
                                        .find(".title")
                                        .find(".cover")
                                        .html(a[s].getTitleWithExtension() + (e.document.isModified() ? "*" : "")),
                                    o
                                        .find(".title")
                                        .find("input")
                                        .val(a[s].getTitle() + (e.document.isModified() ? "*" : "")),
                                    false
                                );
                        });
                    (e.type !== g.default.Type.Modified && e.type !== g.default.Type.AutoSaveSynchronized) ||
                        (this._updateSyncStatus(n, ""), this.updateWindowIcon(n, false, true, t));
                } else
                    e.type === g.default.Type.SynchronismUpdated || e.type === g.default.Type.AutoSaveSynchronizing
                        ? (t.isSynchronizing() || e.type === g.default.Type.AutoSaveSynchronizing) &&
                          (this.updateWindowIcon(n, true, true, t),
                          this._updateSyncStatus(n, GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.synchronizing")) + "...", true))
                        : e.type === g.default.Type.SynchronismUpdateFailed || e.type === g.default.Type.AutoSaveSynchronizationFailed
                          ? this._updateSyncStatus(
                                n,
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.failed-to-synch")),
                                false,
                                false,
                                true,
                                t.isCloudFile()
                            )
                          : e.type === g.default.Type.Activated
                            ? e.document.addEventListener(h.default, this._documentStatusEvent)
                            : e.type === g.default.Type.Deactivated && e.document.removeEventListener(h.default, this._documentStatusEvent);
            }),
            (B.prototype._documentStatusEvent = function (e) {
                e.status === f.default.Loaded && this.updateWindowIcon($(".windows").find(".tab.g-active"));
            }),
            (B.prototype._settingChangedEvent = function (e) {
                "touch" !== e.key || gDesigner.isTouchEnabled() || this._menuBar.setMenu(gDesigner.getMainMenu());
            }),
            (B.prototype._userPropertiesChangedEvent = function (e) {
                this.updateLoginInfo(e.user);
            }),
            (B.prototype._applicationStateChangedEvent = function () {
                this._updateViewBasedOnPermissions();
            }),
            (B.prototype._windowEvent = function (e) {
                switch (e.type) {
                    case p.default.WindowEvent.Type.Added:
                        this._addWindowTab(e.window, e.index);
                        break;
                    case p.default.WindowEvent.Type.Removed:
                        this._removeWindowTab(e.window);
                        break;
                    case p.default.WindowEvent.Type.Activated:
                    case p.default.WindowEvent.Type.Deactivated:
                        this._updateActiveWindowTab();
                }
            }),
            (B.prototype._addWindowTab = function (e, t) {
                var n = this,
                    o = $("<div></div>").data("window", e).addClass("tab");
                const i = this._windows.find(".tabs").find(".tab");
                ("number" == typeof t && t !== i.length ? o.insertBefore(i.eq(t)) : o.appendTo(this._windows.find(".tabs")),
                    o
                        .append(
                            $("<div />")
                                .addClass("title")
                                .append($("<span />").addClass("cover").html(e.getTitleWithExtension()))
                                .append(
                                    $("<input />")
                                        .attr("type", "text")
                                        .css("display", "none")
                                        .val(e.getTitle())
                                        .css("width", o.find(".cover").outerWidth())
                                )
                        )
                        .on("click", function () {
                            (gDesigner.stats("header_change_tab", e.getTitleWithExtension()),
                                gDesigner.getWindows().activateWindow($(this).data("window"), true));
                        }),
                    o.on("contextmenu", function (t) {
                        (t.stopPropagation(), n.handleContextMenu(e, o));
                    }),
                    gDesigner.getLicense().isGuest() ||
                        o.append(
                            $("<span></span>")
                                .addClass("close")
                                .html("&#x2715;")
                                .on("click", function (e) {
                                    (gDesigner.stats("header_remove_tab"),
                                        e.stopPropagation(),
                                        gDesigner.getWindows().removeWindow($(this).parents(".tab").data("window"), void 0, void 0, true));
                                })
                        ),
                    this.setWindowTabEnable(gDesigner.getLicense().canAccessFreemium()));
            }),
            (B.prototype._createLoginTab = function () {
                var e = $("<div/>")
                    .addClass("section login")
                    .append($("<div/>").addClass("avatar"))
                    .append($("<div/>").addClass("username").append($("<span/>")))
                    .on("click", function () {
                        (gDesigner.stats("header_click_login"),
                            "yes" !== $(this).attr("has-been-clicked") &&
                                ($(this).attr("has-been-clicked", "yes"),
                                gDesigner.getUser().then((t) => {
                                    (t && !gDesigner.isAnonymous() ? e.gUserLogin() : m.default.performLogin(),
                                        $(this).attr("has-been-clicked", "no"));
                                })));
                    });
                return e;
            }),
            (B.prototype.checkUser = function () {
                return gDesigner.getUser().then((e) => {
                    this.updateLoginInfo(e);
                });
            }),
            (B.prototype.updateLoginInfo = function (e) {
                ($(".login").css("display", e && e.isAnonymous() ? "none" : ""),
                    $(".login .username")
                        .find("span")
                        .text(e ? e.getFullUserName() : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.cloud-login"))),
                    e
                        ? e.hasOwnPictureAvatar()
                            ? ($(".login .avatar").css("background-image", 'url("' + e.avatar + '")'),
                              $(".login .avatar").removeClass("gravit-user-bonhomme"),
                              $(".login .avatar").css({ "background-color": "transparent" }),
                              $(".login .avatar").text(""))
                            : $(".login .avatar")
                                  .addClass("gravit-user-bonhomme")
                                  .text(e.getUserNameInitials())
                                  .css({ "background-color": e.getUserColor() })
                        : $(".login .avatar").css("background-image", "none"),
                    $(".login .avatar").removeClass(e ? "header-cloud" : "user-avatar"),
                    $(".login .avatar").addClass(e ? "user-avatar" : "header-cloud"),
                    e ? $(".login").addClass("user") : $(".login").removeClass("user"));
            }),
            (B.prototype._removeWindowTab = function (e) {
                this._windows.find(".tab").each(function (t, n) {
                    var o = $(n);
                    if (o.data("window") === e) return (o.remove(), false);
                });
            }),
            (B.prototype._updateActiveWindowTab = function () {
                this._windows.find(".tab").each(function (e, t) {
                    var n = $(t);
                    n.toggleClass("g-active", n.data("window") === gDesigner.getWindows().getActiveWindow());
                });
            }),
            (B.prototype._createWindows = function () {
                return $("<div></div>").addClass("tabs");
            }),
            (B.prototype.getHeight = function () {
                return this._htmlElement[0].clientHeight;
            }),
            (B.prototype.updateWindowIcon = function (e, t, n, o) {
                var i = $(e).find(".header-cloud"),
                    a = o || gDesigner.getActiveDocument();
                (a && (a.isCloudFile() || a.isExternalFile())) || t
                    ? 0 === i.length &&
                      $("<span/>").addClass("header-cloud").addClass(this._getCloudDocumentIconClass(a)).insertBefore($(e).find(".close"))
                    : n && i.length > 0
                      ? i.fadeOut(2e3, function () {
                            i.remove();
                        })
                      : i.remove();
            }),
            (B.prototype.showBusyIcon = function (e) {
                (this._busy.find(".txt").text(e), this._busy.css({ display: "inherit" }));
            }),
            (B.prototype.hideBusyIcon = function () {
                this._busy.css({ display: "none" });
            }),
            (B.prototype._updateSyncStatus = function (e, t, n, o, i, a) {
                var r = $(e).find(".sync-status");
                const s = "." + D["header-cloud"];
                if (
                    ($(e).find(s).length > 0 && (n ? $(e).find(s).addClass("animated") : $(e).find(s).removeClass("animated")),
                    o && $(e).find(s).length > 0 && $(e).find(s).addClass("animated"),
                    (r && 0 !== r.length) || $("<span/>").addClass("sync-status").insertAfter($(e).find(".close")),
                    $(e).find(".sync-status").text(t),
                    i)
                ) {
                    $(e)
                        .find(".sync-status")
                        .fadeOut(2e3, function () {
                            $(e).find(".sync-status").remove();
                        });
                    var l = $(e).find(s);
                    l.length > 0 &&
                        !a &&
                        l.fadeOut(2e3, function () {
                            ($(e).find(".close").css("margin-left", "0px"), l.remove());
                        });
                }
            }),
            (B.prototype.getWindowTab = function (e) {
                for (var t = this._windows.find(".tabs").find(".tab"), n = null, o = 0; o < t.length; ++o)
                    if ($(t[o]).data("window") === e) {
                        n = t[o];
                        break;
                    }
                return n;
            }),
            (B.prototype.handleContextMenu = function (e, t) {
                var n = t.outerWidth() - 10;
                (t.addClass("context-pane-opened"),
                    gDesigner.stats("header_contextmenu_tab", "Contextmenu"),
                    gDesigner.getWindows().activateWindow(e),
                    (this._contextMenu = this._createContextMenu(e, t)),
                    this._contextMenu
                        .gOverlay({
                            padding: false,
                            releaseOnClose: true,
                            clazz: "g-header-context-overlay",
                            bottomClazz: "from-bottom",
                            customRight: n,
                            offsetY: -13,
                            closeCallback: () => {
                                t.removeClass("context-pane-opened");
                            },
                        })
                        .gOverlay("open", t));
            }),
            (B.prototype._createContextMenu = function (e, t) {
                const n = new l.default(),
                    o = this;
                return (
                    M.map((a) => {
                        let r,
                            s,
                            {
                                title,
                                callback,
                                shortcut,
                                requiresPro,
                                separator,
                                icon,
                                id: f,
                                needsAction,
                                stats,
                                isEnabled,
                                isVisible,
                            } = a;
                        const b = title instanceof GObject.GLocaleKey ? GObject.GLocale.get(title) : title;
                        if ((f && (r = "function" == typeof f ? f() : f), separator)) {
                            const t = n.createAddDivider();
                            return (isVisible instanceof Function ? t.setVisible(isVisible(e)) : "boolean" == typeof isVisible && t.setVisible(isVisible), t);
                        }
                        (callback
                            ? (s = n.createAddItem(b, () => {
                                  callback.call(o, e, t);
                              }))
                            : ((s = n.createAddItem(b)), needsAction && s.setAction(gDesigner.getAction(r))),
                            shortcut && s.setShortcutHint(shortcut),
                            requiresPro && s.setPro(requiresPro, r),
                            isEnabled instanceof Function && s.setEnabled(isEnabled(e)),
                            isVisible instanceof Function ? s.setVisible(isVisible(e)) : "boolean" == typeof isVisible && s.setVisible(isVisible),
                            icon && ("function" == typeof icon ? s.setIcon(icon()) : s.setIcon(icon)),
                            s.addEventListener(c.default.BeforeActivateEvent, () => {
                                (!(function (e) {
                                    e && gDesigner.stats(e);
                                    (o._contextMenu.gOverlay("close"), (o._contextMenu = null), n.clearItems());
                                })(stats),
                                    isEnabled && s.setEnabled(isEnabled(e)));
                            }),
                            s.setCaption(b));
                    }),
                    n.getHtmlElement()
                );
            }),
            (B.prototype._getCloudDocumentIconClass = function (e) {
                var t = "",
                    n = e.getStorageItem();
                switch (n ? n.toString() : null) {
                    case "[Object GGoogleDriveStorage.Item]":
                        t = D["gravit-icon-googledrive-cloud-file"];
                        break;
                    case "[Object GSharePointStorage.Item]":
                        t = D["gravit-icon-sharepoint-cloud-file"];
                        break;
                    case "[Object GOneDriveBusinessStorage.Item]":
                        t = D["gravit-icon-onedrivebusiness-cloud-file"];
                        break;
                    default:
                        t = D["gravit-icon-cloud"];
                }
                return t;
            }),
            (B.prototype.setWindowTabEnable = function (e) {
                $(".tab > span").css("pointer-events", e ? "auto" : "none");
            }),
            (module.exports = B));
    };
