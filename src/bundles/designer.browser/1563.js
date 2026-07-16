module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13), require(32), require(97), require(33));
        var GObject = require(1),
            i = require(53),
            GContextMenu = require(1303),
            r = require(1176),
            GConvertToPathAction = require(810),
            GCreateSymbolAction = require(608),
            c = require(874),
            d = require(1177),
            u = require(1178),
            p = require(1179);
        const g = require(812);
        var h = require(1180),
            f = require(873),
            GTransformAction = require(871),
            GVectorizeBorderAction = require(872),
            v = require(238),
            _ = require(339),
            b = require(444),
            w = require(1181),
            C = require(877),
            x = require(1183),
            S = require(1184),
            E = require(1182),
            A = require(875),
            GClipAction = require(809),
            G = require(1314),
            P = require(1315),
            D = require(1316),
            GOutlineAction = require(1185),
            GOffsetAction = require(1317),
            GSimplifyAction = require(1318),
            O = require(1319),
            F = require(1320),
            R = require(566),
            M = require(31),
            { replaceImage: N, setOriginSize: B, cropImage: U } = require(1268 /* GDocument */),
            j = require(78);
        const K = require(876);
        ((GContextMenu.prototype._contextMenuContainerTouch = null),
            (GContextMenu.prototype._createTouchContextMenu = function () {
                var e = $("<div/>").gOverlay({
                        releaseOnClose: false,
                        clazz: "context-menu-touch-overlay",
                    }),
                    t = this;
                this._contextMenuContainerTouch = e;
                $("<div/>")
                    .addClass("transform-section")
                    .gPropertyRow({
                        columns: [
                            {
                                width: "48%",
                                content: this._createActionButtons([
                                    {
                                        action: gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.FlipHorizontal),
                                    },
                                    {
                                        action: gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.FlipVertical),
                                    },
                                ]),
                            },
                            { width: "4%" },
                            {
                                width: "48%",
                                content: this._createActionButtons([
                                    {
                                        action: gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.Rotate90Left),
                                        icon: "gravit-icon-rotate-left",
                                    },
                                    {
                                        action: gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.Rotate90Right),
                                        icon: "gravit-icon-rotate-right",
                                    },
                                ]),
                            },
                        ],
                    })
                    .appendTo(e);
                $("<div/>")
                    .addClass("paste-section")
                    .gPropertyRow({
                        columns: [
                            {
                                content: this._createActionButtonWithMenu(
                                    gDesigner.getAction(C.ID),
                                    GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.paste")),
                                    [
                                        gDesigner.getAction(x.ID),
                                        gDesigner.getAction(S.ID),
                                        gDesigner.getAction(E.ID),
                                        gDesigner.getAction(K.ID),
                                        gDesigner.getAction(A.ID),
                                    ]
                                ),
                            },
                        ],
                    })
                    .appendTo(e);
                const n = gDesigner.getAction(g.ID),
                    i = n && n.getSubActions().concat(gDesigner.getAction(D.ID));
                ($("<div/>")
                    .addClass("compound-section")
                    .gPropertyRow({
                        columns: [
                            {
                                content: this._createActionButtonWithMenu(
                                    gDesigner.getAction(g.ID),
                                    GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.create-compound")),
                                    i
                                ),
                            },
                        ],
                    })
                    .appendTo(e),
                    $("<div/>")
                        .addClass("path-section")
                        .gPropertyRow({
                            columns: [
                                {
                                    content: this._createActionButtonWithMenu(
                                        gDesigner.getAction(GConvertToPathAction.ID),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.convert-to-path")),
                                        [
                                            gDesigner.getAction(GVectorizeBorderAction.ID),
                                            gDesigner.getAction(F.ID),
                                            gDesigner.getAction(GOutlineAction.ID),
                                            gDesigner.getAction(GOffsetAction.ID),
                                            gDesigner.getAction(GSimplifyAction.ID),
                                            gDesigner.getAction(p.ID),
                                            gDesigner.getAction(f.ID),
                                            gDesigner.getAction(O.ID),
                                        ]
                                    ),
                                },
                            ],
                        })
                        .appendTo(e),
                    $("<div/>")
                        .addClass("symbol-section")
                        .gPropertyRow({
                            columns: [
                                {
                                    content: this._createActionButtonWithMenu(
                                        gDesigner.getAction(GCreateSymbolAction.ID),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.create-symbol")),
                                        [
                                            gDesigner.getAction(d.ID),
                                            gDesigner.getAction(c.ID),
                                            {
                                                caption: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.go-to-master")),
                                                click: (e) => {
                                                    var t = gDesigner.getActiveDocument(),
                                                        n = t.getEditor();
                                                    if (t) {
                                                        var i = t.getEditor().getIndividualSelection();
                                                        if (i && i.length) {
                                                            var a = i.find((e) => e instanceof GObject.GSymbol && !e.isLocked() && !e.isMaster());
                                                            if (a) {
                                                                var r = a;
                                                                (n.beginTransaction(),
                                                                    n.clearSelection(),
                                                                    n.updateSelection(false, [r]),
                                                                    gDesigner.executeAction(R.ID, void 0, void 0, true),
                                                                    n.commitTransaction(
                                                                        GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.go-to-master"))
                                                                    ));
                                                            }
                                                        }
                                                    }
                                                    gDesigner.stats("touchmenu_go-to-master");
                                                },
                                                icon: "gravit-icon-go-to-master",
                                                isEnabled: () => {
                                                    var e = gDesigner.getActiveDocument();
                                                    if (e) {
                                                        var t = e.getEditor().getIndividualSelection();
                                                        if (t && t.length)
                                                            if (t.find((e) => e instanceof GObject.GSymbol && !e.isLocked() && !e.isMaster()))
                                                                return true;
                                                    }
                                                    return false;
                                                },
                                            },
                                        ]
                                    ),
                                },
                            ],
                        })
                        .appendTo(e));
                $("<div/>")
                    .addClass("text-section")
                    .gPropertyRow({
                        columns: [
                            {
                                content: this._createActionButtonMenu(
                                    "gravit-icon-textbox",
                                    GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.text")),
                                    [gDesigner.getAction(r.ID), gDesigner.getAction(u.ID), gDesigner.getAction(h.ID)],
                                    () => !!this._getFirstSelectedTextElement()
                                ),
                            },
                        ],
                    })
                    .appendTo(e);
                var a = [
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.crop")),
                        click: (e) => {
                            var t = gDesigner.getActiveDocument().getEditor().hasSelectionDetail();
                            (U(this._getFirstSelectedImageElement(), t), gDesigner.stats("touchmenu_crop-image"));
                        },
                        icon: "gravit-icon-crop",
                        update: (e) => {
                            var t = gDesigner.getActiveDocument().getEditor().hasSelectionDetail();
                            e.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", t ? "action.no-crop" : "action.crop")));
                        },
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.original-size")),
                        click: (e) => {
                            (B(this._getFirstSelectedImageElement()), gDesigner.stats("touchmenu_original-size"));
                        },
                        icon: "gravit-icon-expand",
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.replace-image")),
                        click: (e) => {
                            (gDesigner.stats("touchmenu_replace-image"),
                                N(this._getFirstSelectedImageElement(), gDesigner.getActiveDocument()));
                        },
                        icon: "gravit-icon-replaceimg",
                    },
                ];
                $("<div/>")
                    .addClass("image-section")
                    .gPropertyRow({
                        columns: [
                            {
                                content: this._createActionButtonMenu(
                                    "gravit-icon-image",
                                    GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.image")),
                                    a,
                                    () => !!this._getFirstSelectedImageElement()
                                ),
                            },
                        ],
                    })
                    .appendTo(e);
                return (
                    $("<div/>")
                        .addClass("")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "48%",
                                    content: this._createActionButtons([
                                        { action: gDesigner.getAction(GClipAction.ID) },
                                        {
                                            action: gDesigner.getAction(w.ID),
                                            icon: "gravit-icon-mask-with-shape",
                                        },
                                    ]),
                                },
                                { width: "4%" },
                                {
                                    width: "48%",
                                    content: this._createActionButtons([
                                        {
                                            action: gDesigner.getAction(G.ID),
                                            icon: "gravit-icon-flatten",
                                        },
                                        {
                                            action: gDesigner.getAction(P.ID),
                                            icon: "gravit-icon-duplicate",
                                        },
                                    ]),
                                },
                            ],
                        })
                        .appendTo(e),
                    $("<div/>")
                        .addClass("")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "48%",
                                    content: this._createActionButtons([
                                        {
                                            icon: "gravit-icon-lock",
                                            click: (e) => {
                                                (t._setAllSelectionsLocked(),
                                                    this._contextMenuContainerTouch.gOverlay("close"),
                                                    gDesigner.stats("touchmenu_lock-layer"));
                                            },
                                            isEnabled: () => t._getSelectedItems().length > 0,
                                        },
                                        {
                                            icon: "gravit-icon-hide-big",
                                            click: (e) => {
                                                (t._setAllSelectionsHidden(),
                                                    this._contextMenuContainerTouch.gOverlay("close"),
                                                    gDesigner.stats("touchmenu_hide-layer"));
                                            },
                                            isEnabled: () => t._getSelectedItems().length > 0,
                                        },
                                    ]),
                                },
                                { width: "4%" },
                                { width: "48%", content: this._createSelectMenuButton() },
                            ],
                        })
                        .appendTo(e),
                    gDesigner.addEventListener(j, this._documentEvent.bind(this)),
                    e
                );
            }),
            (GContextMenu.prototype._elementsToCheck = []),
            (GContextMenu.prototype._documentEvent = function (e) {
                e.type === j.Type.ContextMenuOpened &&
                    (gDesigner.getAction(E.ID).setPosition(this._contextMenuClientPosition),
                    this._elementsToCheck.forEach((e) => {
                        e.isEnabled && e.element && e.element.attr("disabled", !e.isEnabled(this._mouseEvent));
                    }));
            }),
            (GContextMenu.prototype._createActionButtons = function (e) {
                var t = $("<div/>").addClass("button-group");
                return (
                    (e = e instanceof Array ? e : [e]).forEach((e) => {
                        var n = this._createActionButton(e);
                        t.append(n);
                    }),
                    t
                );
            }),
            (GContextMenu.prototype._createActionButton = function (e) {
                var t = e.label,
                    n = e.icon,
                    i = e.click;
                let a = e.isEnabled,
                    r = false;
                e.action &&
                    ((r = e.action.isPro()),
                    t || (t = GObject.GLocale.get(e.action.getTitle())),
                    n || (n = e.action.getIcon() || e.action.getGroupIcon()),
                    i ||
                        (i = function () {
                            gDesigner.executeAction(e.action.getId(), void 0, "touchmenu");
                        }),
                    a ||
                        (a = function () {
                            return gDesigner.canExecuteAction(e.action.getId());
                        }));
                var s = $("<div></div>").gPro({ pro: r });
                e.action && s.addClass("action").attr("data-action", e.action.getId()).data("action", e.action);
                var l = $("<button></button>")
                    .addClass("action-button")
                    .addClass(e.longButton ? "long-button" : "")
                    .toggleClass("g-active", true === e.active)
                    .appendTo(s)
                    .on("mousedown", function (e) {
                        e.preventDefault();
                    });
                return (
                    this._elementsToCheck.push({ element: l, isEnabled: a }),
                    n && (this._updateIcon($("<span></span>").appendTo(l), n), l.addClass("icon")),
                    e.label && l.append($("<span></span>").addClass("label").text(e.label)),
                    e.isMenu && l.append($("<span></span>").addClass("icon item-tail gravit-icon-chevron-left-small")),
                    i && l.on("click", i),
                    s
                );
            }),
            (GContextMenu.prototype._createActionButtonWithMenu = function (e, t, n) {
                var o = $("<div/>").addClass("action-button-with-menu");
                o.append(this._createActionButton({ action: e, label: t, longButton: true }));
                var i = new v(null, "g-context-menu");
                ((i.__which = "touchmenu"),
                    n.forEach((e) => {
                        if (e instanceof M) i.createAddItem(e, null, null, null, e.getId() === E.ID ? GContextMenu.ID : null);
                        else {
                            var t = i.createAddItem(e.caption, e.click);
                            (t.setIcon(e.icon),
                                t.addEventListener(_.UpdateEvent, function () {
                                    t.setEnabled(e.isEnabled());
                                }));
                        }
                    }));
                var r = $("<button/>")
                    .addClass("open-menu icon gravit-icon-chevron-left-small")
                    .on("click", (e) => {
                        i.open($(e.target), b.Position.Right_Bottom, b.Position.Center);
                    });
                return (
                    this._elementsToCheck.push({
                        element: r,
                        isEnabled: () => n.some((e) => e.isEnabled()),
                    }),
                    o.append(r),
                    o
                );
            }),
            (GContextMenu.prototype._createActionButtonMenu = function (e, t, n, o) {
                var i = new v(null, "g-context-menu");
                ((i.__which = "touchmenu"),
                    n.forEach((e) => {
                        if (e instanceof M) i.createAddItem(e);
                        else {
                            var t = i.createAddItem(e.caption, e.click);
                            (t.setIcon(e.icon),
                                t.addEventListener(_.UpdateEvent, function () {
                                    e.update && e.update(t);
                                }));
                        }
                    }));
                var a = $("<div/>").addClass("action-menu-button");
                return (
                    a.append(
                        this._createActionButton({
                            label: t,
                            icon: e,
                            click: (e) => {
                                i.open($(e.target).closest(".action-menu-button"), b.Position.Right_Bottom, b.Position.Center);
                            },
                            isMenu: true,
                            isEnabled: o,
                        })
                    ),
                    a
                );
            }),
            (GContextMenu.prototype._createSelectMenuButton = function () {
                var e = $("<div/>").addClass("select-menu-button");
                return (
                    e.append(
                        this._createActionButton({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.select")),
                            click: (e) => {
                                var t = this._getHitsElments(),
                                    n = gDesigner.getActiveDocument().getEditor(),
                                    o = $("<div/>").gOverlay({
                                        releaseOnClose: true,
                                        offsetX: 100,
                                        offsetY: -25,
                                        clazz: "selected-menu-overlay",
                                    }),
                                    i = $("<div/>").appendTo(o);
                                o.gOverlay("open", $(e.target).closest(".select-menu-button"));
                                i.gSelectedPanel({
                                    clickCallback: (e) => {
                                        (n.clearSelection(), n.updateSelection(false, [e]));
                                    },
                                    renderFinishCallback: () => {
                                        o.gOverlay("relayout");
                                    },
                                }).gSelectedPanel("setSelections", t);
                            },
                            isMenu: true,
                            isEnabled: (e) => {
                                var t = this._getHitsElments(e);
                                return !!(t && t.elementHits && t.elementHits.length > 0);
                            },
                        })
                    ),
                    e
                );
            }),
            (GContextMenu.prototype._updateIcon = function (e, t) {
                (e.empty(), e.attr("class", "icon " + t));
            }),
            (GContextMenu.prototype._getSelectedItems = function () {
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor();
                    if (t) {
                        var n = t.getSelection();
                        return n || [];
                    }
                }
                return [];
            }),
            (GContextMenu.prototype._getFirstSelectedImageElement = function () {
                var e = this._getSelectedItems();
                return e && e.length > 0 ? e.find((e) => e instanceof GObject.GImage) : null;
            }),
            (GContextMenu.prototype._getFirstSelectedTextElement = function () {
                var e = this._getSelectedItems();
                return e && e.length > 0 ? e.find((e) => e instanceof GObject.GText) : null;
            }),
            (GContextMenu.prototype._setAllSelectionsHidden = function () {
                var e = this._getSelectedItems();
                e &&
                    e.length > 0 &&
                    i.GEditor.tryRunTransaction(
                        gDesigner.getActiveDocument().getScene(),
                        function () {
                            for (var t = 0; t < e.length; t++) (e[t].setProperty("vis", false), e[t].removeFlag(GObject.GNode.Flag.Highlighted));
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility"))
                    );
            }),
            (GContextMenu.prototype._setAllSelectionsLocked = function () {
                var e = this._getSelectedItems();
                e &&
                    e.length > 0 &&
                    i.GEditor.tryRunTransaction(
                        gDesigner.getActiveDocument().getScene(),
                        function () {
                            for (; e.length > 0; )
                                (e[0].setProperty("lkt", GObject.GBlock.LockType.Full),
                                    e[0].removeFlag(GObject.GNode.Flag.Highlighted),
                                    e[0].accept(function (e) {
                                        e.removeFlag(GObject.GNode.Flag.Selected);
                                    }));
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock"))
                    );
            }));
    };
