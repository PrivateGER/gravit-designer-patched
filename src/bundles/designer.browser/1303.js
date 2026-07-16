module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41));
        var o = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GAlignAction = require(866),
            GArrangeAction = require(869),
            l = require(1176),
            GConvertToPathAction = require(810),
            GCreateSymbolAction = require(608),
            u = require(874),
            p = require(1177),
            g = require(1178),
            GDistributeAction = require(867),
            GGroupAction = require(811),
            m = require(1179);
        const y = require(812);
        var v = require(1180);
        const _ = require(1304),
            b = require(1305),
            w = require(1306),
            C = require(1307),
            x = require(1308),
            S = require(1309);
        var GSplitAction = require(870),
            A = require(873),
            GTransformAction = require(871),
            GVectorizeBorderAction = require(872),
            P = require(238),
            D = require(339),
            L = require(804),
            I = require(1181),
            k = require(1310),
            O = require(1311),
            F = require(1312),
            R = require(875),
            M = require(1182);
        const N = require(876);
        var GExportAction = require(861),
            U = require(450),
            GSystemDialog = require(44),
            K = require(78);
        function V(e) {
            var t = this._createContextMenu(),
                n = this._createCropMenu(),
                i = this._createPageMenu(),
                a = this._createTouchContextMenu(),
                r = this._createFillPropertyMenu(),
                s = this._createBorderPropertyMenu(),
                l = this._createEffectPropertyMenu();
            e.on(
                "contextmenu",
                function (e, c) {
                    if (gDesigner.getWindows().getActiveWindow().getView()) {
                        var d = c && c.previousEvent ? c.previousEvent : c,
                            u = gDesigner.getToolManager().getActiveTool(),
                            p = (e.data && e.data.context) || (d && d.data && d.data.context);
                        if (!u || !u.catchesContextMenu(p == U.LayerPanel || false)) {
                            var g = t,
                                h = false;
                            p === U.PagePanel
                                ? ((g = i), gDesigner.stats("contextmenu_open_page-menu"))
                                : p === U.LayerPanel
                                  ? ((h = true), gDesigner.stats("contextmenu_open_layer-menu"))
                                  : p === U.FillPropertyPanel
                                    ? ((g = r), gDesigner.stats("contextmenu_open_fill-properties-menu"))
                                    : p === U.BorderPropertyPanel
                                      ? ((g = s), gDesigner.stats("contextmenu_open_border-properties-menu"))
                                      : p === U.EffectPropertyPanel
                                        ? ((g = l), gDesigner.stats("contextmenu_open_effect-properties-menu"))
                                        : u instanceof o.GSelectTool && u.isCropContext()
                                          ? ((g = n), gDesigner.stats("contextmenu_open_crop-menu"))
                                          : ((h = true), gDesigner.stats("contextmenu_open_context-menu"));
                            var f = "number" == typeof e.clientX ? e : d;
                            this._contextMenuClientPosition = gDesigner
                                .getWindows()
                                .getActiveWindow()
                                .getView()
                                ._convertClientPositionFromMousePosition(f);
                            var m = e.pageX ? e.pageX : d.pageX,
                                y = e.pageY ? e.pageY : d.pageY;
                            return (
                                (this._mouseEvent = e.pageX ? e : d),
                                (this._options = c),
                                gDesigner.isTouchEnabled() && h
                                    ? a.gOverlay("open", { x: m, y: y }, void 0, () => {
                                          gDesigner.trigger(new K(K.Type.ContextMenuOpened, gDesigner.getActiveDocument()));
                                      })
                                    : g.open({ x: m, y: y }),
                                (this._contextMenuTouch = a),
                                (this._contextMenuDesktop = g),
                                true
                            );
                        }
                    }
                }.bind(this)
            );
        }
        ((V.ID = "context.menu"),
            (V.prototype._contextMenuClientPosition = null),
            (V.prototype._mouseEvent = null),
            (V.prototype._options = null),
            (V.prototype._contextMenuTouch = null),
            (V.prototype._contextMenuDesktop = null),
            (V.prototype._createContextMenu = function () {
                var e = new P();
                ((e.__which = "context"), e.createAddItem(gDesigner.getAction(F.ID)));
                var t = new D(D.Type.Menu, P);
                (t.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste"))),
                    t
                        .getMenu()
                        .createAddItem(gDesigner.getAction(M.ID), null, null, null, V.ID)
                        .addEventListener(
                            D.UpdateEvent,
                            function () {
                                gDesigner.getAction(M.ID).setPosition(this._contextMenuClientPosition);
                            }.bind(this)
                        ),
                    t.getMenu().createAddItem(gDesigner.getAction(N.ID)),
                    t.getMenu().createAddItem(gDesigner.getAction(R.ID)),
                    e.addItem(t),
                    e.createAddDivider());
                var n = new D(D.Type.Menu, P);
                (n.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.arrange"))),
                    n.getMenu().createAddItem(gDesigner.getAction(GArrangeAction.ID + "." + o.GEditor.ArrangeOrderType.SendToFront)),
                    n.getMenu().createAddItem(gDesigner.getAction(GArrangeAction.ID + "." + o.GEditor.ArrangeOrderType.BringForward)),
                    n.getMenu().createAddItem(gDesigner.getAction(GArrangeAction.ID + "." + o.GEditor.ArrangeOrderType.SendBackward)),
                    n.getMenu().createAddItem(gDesigner.getAction(GArrangeAction.ID + "." + o.GEditor.ArrangeOrderType.SendToBack)),
                    e.addItem(n));
                var L = new D(D.Type.Menu, P);
                (L.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.align"))),
                    L.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + o.GEditor.ArrangeAlignType.AlignLeft)),
                    L.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + o.GEditor.ArrangeAlignType.AlignCenter)),
                    L.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + o.GEditor.ArrangeAlignType.AlignRight)),
                    L.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + o.GEditor.ArrangeAlignType.AlignJustifyHorizontal)),
                    L.getMenu().createAddDivider(),
                    L.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + o.GEditor.ArrangeAlignType.AlignTop)),
                    L.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + o.GEditor.ArrangeAlignType.AlignMiddle)),
                    L.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + o.GEditor.ArrangeAlignType.AlignBottom)),
                    L.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + o.GEditor.ArrangeAlignType.AlignJustifyVertical)),
                    L.getMenu().createAddDivider(),
                    L.getMenu().createAddItem(gDesigner.getAction(GDistributeAction.ID + "." + GDistributeAction.Type.Horizontal)),
                    L.getMenu().createAddItem(gDesigner.getAction(GDistributeAction.ID + "." + GDistributeAction.Type.Vertical)),
                    e.addItem(L));
                var k = new D(D.Type.Menu, P);
                (k.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.transform"))),
                    k.getMenu().createAddItem(gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.Rotate90Left)),
                    k.getMenu().createAddItem(gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.Rotate90Right)),
                    k.getMenu().createAddItem(gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.FlipHorizontal)),
                    k.getMenu().createAddItem(gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.FlipVertical)),
                    e.addItem(k),
                    e.createAddDivider(),
                    e.createAddItem(gDesigner.getAction(GGroupAction.ID)),
                    e.createAddItem(gDesigner.getAction(y.ID)),
                    e.createAddItem(gDesigner.getAction(GSplitAction.ID)),
                    e.createAddItem(gDesigner.getAction(I.ID)),
                    e.createAddDivider(),
                    e.createAddItem(gDesigner.getAction(GConvertToPathAction.ID)),
                    e.createAddItem(gDesigner.getAction(GVectorizeBorderAction.ID)),
                    e.createAddItem(gDesigner.getAction(m.ID)),
                    e.createAddItem(gDesigner.getAction(A.ID)),
                    e.createAddDivider(),
                    e.createAddItem(gDesigner.getAction(GCreateSymbolAction.ID)),
                    e.createAddItem(gDesigner.getAction(p.ID)),
                    e.createAddItem(gDesigner.getAction(u.ID)),
                    e.createAddDivider(),
                    e.createAddItem(gDesigner.getAction(l.ID)),
                    e.createAddItem(gDesigner.getAction(g.ID)),
                    e.createAddDivider());
                const O = new D(D.Type.Menu, P);
                (O.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.select-same"))),
                    O.getMenu().createAddItem(gDesigner.getAction(v.ID)),
                    O.getMenu().createAddDivider(),
                    O.getMenu().createAddItem(gDesigner.getAction(_.getId(_.Type.Fill))),
                    O.getMenu().createAddItem(gDesigner.getAction(_.getId(_.Type.Border))),
                    O.getMenu().createAddItem(gDesigner.getAction(_.getId(_.Type.FillAndBorder))),
                    O.getMenu().createAddDivider(),
                    O.getMenu().createAddItem(gDesigner.getAction(b.ID)),
                    O.getMenu().createAddItem(gDesigner.getAction(w.ID)),
                    O.getMenu().createAddItem(gDesigner.getAction(C.ID)),
                    O.getMenu().createAddItem(gDesigner.getAction(x.ID)),
                    O.getMenu().createAddItem(gDesigner.getAction(S.ID)),
                    e.addItem(O),
                    e.createAddDivider());
                var B = new D(D.Type.Menu, P);
                return (
                    B.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.select"))),
                    B.setIcon("gravit-icon-cursor-filled"),
                    B.addEventListener(
                        D.UpdateEvent,
                        function () {
                            (B.getMenu().clearItems(), B.setEnabled(false));
                            var { elementHits, filteredElementHits, submenus } = this._getHitsElments();
                            if (!(elementHits && elementHits.length > 0 && elementHits[0] instanceof GObject.GPage) && elementHits && elementHits.length > 0) {
                                B.setEnabled(true);
                                for (var o = 0; o < filteredElementHits.length; o++) {
                                    var r = filteredElementHits[o].element,
                                        s = r instanceof GObject.GBlock ? r.getLabel() : r.getNodeNameTranslated(),
                                        l = "temp-" + elementHits.indexOf(filteredElementHits[o]);
                                    if (submenus[l]) {
                                        var c = new D(D.Type.Menu, P);
                                        (c.setCaption((o + 1).toString() + ". " + s),
                                            c.setData(l),
                                            c.addEventListener(D.UpdateEvent, function () {
                                                var e = submenus[this.getData()];
                                                this.getMenu().clearItems();
                                                for (var t = 0; t < e.length; t++)
                                                    this.getMenu().createAddItem(
                                                        (t + 1).toString() +
                                                            ". " +
                                                            (e[t] instanceof GObject.GBlock ? e[t].getLabel() : e[t].getNodeNameTranslated()),
                                                        function () {
                                                            (this.element.removeFlag(GObject.GNode.Flag.Highlighted),
                                                                gDesigner
                                                                    .getActiveDocument()
                                                                    .getEditor()
                                                                    .updateSelection(GPlatform.GPlatform.modifiers.shiftKey, [this.element]));
                                                        },
                                                        function () {
                                                            this.element.setFlag(GObject.GNode.Flag.Highlighted);
                                                        },
                                                        function () {
                                                            this.element.removeFlag(GObject.GNode.Flag.Highlighted);
                                                        }
                                                    ).element = e[t];
                                            }),
                                            B.getMenu().addItem(c));
                                    } else
                                        B.getMenu().createAddItem(
                                            (o + 1).toString() + ". " + s,
                                            function () {
                                                (this.element.removeFlag(GObject.GNode.Flag.Highlighted),
                                                    gDesigner
                                                        .getActiveDocument()
                                                        .getEditor()
                                                        .updateSelection(GPlatform.GPlatform.modifiers.shiftKey, [this.element]));
                                            },
                                            function () {
                                                this.element.setFlag(GObject.GNode.Flag.Highlighted);
                                            },
                                            function () {
                                                this.element.removeFlag(GObject.GNode.Flag.Highlighted);
                                            }
                                        ).element = r;
                                }
                            }
                        }.bind(this)
                    ),
                    e.addItem(B),
                    e
                );
            }),
            (V.prototype._createCropMenu = function () {
                var e = new P();
                return ((e.__which = "crop"), e.createAddItem(gDesigner.getAction(k.ID)), e.createAddItem(gDesigner.getAction(O.ID)), e);
            }),
            (V.prototype._getHitsElments = function (e) {
                e = e || this._mouseEvent;
                var t = gDesigner.getWindows().getActiveWindow().getView()._convertClientPositionFromMousePosition(e),
                    n = gDesigner.getActiveDocument().getScene(),
                    a = gDesigner.getWindows().getActiveWindow().getView(),
                    r = a.getWorldTransform(n),
                    s = function (e) {
                        return !(e instanceof GObject.GPage);
                    }.bind(this),
                    l = n.hitTest(t, r, s, true, -1, o.GEditorOptions.pickDistance, true, null, true, false, a.getViewConfiguration().multiPageView);
                if (
                    (l &&
                        l.length > 0 &&
                        (l = l.filter(function (e) {
                            var t = e.element.getProperty("plkt");
                            return !(
                                t & GObject.GBlock.ProgramLck.NoEdit &&
                                t & GObject.GBlock.ProgramLck.NoSizeChanges &&
                                t & GObject.GBlock.ProgramLck.NoMove &&
                                t & GObject.GBlock.ProgramLck.NoDelete
                            );
                        })),
                    l && l.length > 0 && l[0] instanceof GObject.GPage)
                )
                    return { elementHits: l };
                var c = [],
                    d = {};
                if (l && l.length > 0)
                    for (var u = 0; u < l.length; ++u) {
                        for (var p = l[u].element.getParent(), g = false, h = 0; h < l.length; ++h)
                            if (l[h].element === p) {
                                ((g = true), d["temp-" + h] ? d["temp-" + h].push(l[u].element) : (d["temp-" + h] = [l[u].element]));
                                break;
                            }
                        g || c.push(l[u]);
                    }
                return { elementHits: l, filteredElementHits: c, submenus: d };
            }),
            (V.prototype._createPageMenu = function () {
                var e = new P(null, "g-page-option-menu"),
                    t = {
                        DUPLICATE: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "page-panel.text.duplicate")),
                        DELETE: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "page-panel.text.delete")),
                        COPY: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "page-panel.text.copy")),
                        EXPORT: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "page-panel.text.export")),
                    },
                    n = e.createAddItem(t.DUPLICATE, function () {
                        var e = gDesigner.getActiveDocument().getScene();
                        (o.GEditor.tryRunTransaction(
                            e,
                            function () {
                                var t = e.getActivePage(),
                                    n = t.clone({
                                        copy: true,
                                        copyIgnoreProperties: o.GEditorOptions.propertiesExcludedFromCopying,
                                    });
                                (e.insertChild(n), e.renameClone(t, n));
                                var a = n.getPosition(true, true, true, true);
                                n.setProperty("off", new GObject.GTransform(1, 0, 0, 1, a.getX(), a.getY()));
                            },
                            t.DUPLICATE
                        ),
                            gDesigner.stats("contextmenu_pages_duplicate"));
                    }),
                    a = e.createAddItem(t.DELETE, function () {
                        var e = gDesigner.getActiveDocument().getScene(),
                            n = e.getActivePage(),
                            a = n.getSlavePages().length > 0;
                        n.getProperty("plkt") & GObject.GBlock.ProgramLck.NoDelete ||
                            (a
                                ? GSystemDialog.confirm(
                                      GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.confirm-delete-masterpage")),
                                      function (t) {
                                          t &&
                                              o.GEditor.tryRunTransaction(
                                                  e,
                                                  function () {
                                                      e.deleteActivePage();
                                                  },
                                                  GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.delete-page"))
                                              );
                                      },
                                      null,
                                      null,
                                      true,
                                      true
                                  )
                                : o.GEditor.tryRunTransaction(
                                      e,
                                      function () {
                                          e.deleteActivePage();
                                      },
                                      t.DELETE
                                  ),
                            gDesigner.stats("contextmenu_pages_delete"));
                    }),
                    r = e.createAddItem(t.COPY, function () {
                        var e = gDesigner.getActiveDocument(),
                            n = e.getScene();
                        (o.GEditor.tryRunTransaction(
                            n,
                            function () {
                                var t = e.isCommercialProductFile() || !gDesigner.getApplicationManager().isCopyPasteEnabled(),
                                    a = n.getActivePage(),
                                    r = GObject.GNode.serialize(a, {
                                        copy: true,
                                        copyIgnoreProperties: o.GEditorOptions.propertiesExcludedFromCopying,
                                    }),
                                    s =
                                        '<gravit mimeType="' +
                                        GObject.GNode.MIME_TYPE +
                                        '" restricted="' +
                                        (!!t && e.getStorageItem().getId()) +
                                        '">' +
                                        $("<div/>").text(r).html() +
                                        "</gravit>";
                                gContainer.copyToClipboard(s);
                            },
                            t.COPY
                        ),
                            gDesigner.stats("contextmenu_pages_copy"));
                    }),
                    s = e.createAddItem(t.EXPORT, function () {
                        var e = gDesigner.getActiveDocument().getScene().getActivePage();
                        (gDesigner.executeAction(GExportAction.ID, [{ element: e }], null, true), gDesigner.stats("contextmenu_pages_export"));
                    });
                return (
                    n.setIcon("gravit-icon-duplicate"),
                    a.setIcon("gravit-icon-delete"),
                    r.setIcon("gravit-icon-copy"),
                    s.setIcon("gravit-icon-export"),
                    s.setProFeatureInterruption(false),
                    e.addEventListener(L.EVENT, function (e) {
                        gDesigner.isEnabledProFeatures() || s.setPro(true);
                    }),
                    (e.__which = "page"),
                    e
                );
            }),
            (V.prototype._createFillPropertyMenu = function () {
                var e = new P(null, "fill-context-menu"),
                    t = null,
                    n = {
                        DELETE: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "fill-properties-panel.text.delete-fill")),
                        COPY: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "fill-properties-panel.text.copy-fill")),
                    },
                    r = e.createAddItem(n.DELETE, function () {
                        if (t) {
                            var e = gDesigner.getActiveDocument().getEditor().getSelection();
                            o.GEditor.tryRunTransaction(
                                e[0],
                                function () {
                                    for (var n = 0; n < e.length; n++)
                                        for (var o = e[n].getPaintLayers().getFillLayers(), a = 0; a < o.length; a++) {
                                            var r = o[a];
                                            if (GObject.GStylable.FillPaintLayer.equals(r, t)) {
                                                r.getParent().removeChild(r);
                                                break;
                                            }
                                        }
                                },
                                n.DELETE
                            );
                        }
                        gDesigner.stats("contextmenu_fills_delete");
                    }),
                    s = e.createAddItem(n.COPY, function () {
                        if (t) {
                            var e = GObject.GNode.serialize([t], {
                                    copy: true,
                                    copyIgnoreProperties: o.GEditorOptions.propertiesExcludedFromCopying,
                                }),
                                n = '<gravit mimeType="' + GObject.GNode.MIME_TYPE + '">' + $("<div/>").text(e).html() + "</gravit>";
                            gContainer.copyToClipboard(n);
                        }
                        gDesigner.stats("contextmenu_fills_copy");
                    });
                return (
                    r.setIcon("gravit-icon-trash"),
                    s.setIcon("gravit-icon-copy"),
                    r.setShortcutHint([GPlatform.GKey.Constant.DELETE]),
                    s.setShortcutHint([GPlatform.GKey.Constant.META, "C"]),
                    e.addEventListener(
                        L,
                        function () {
                            t = this._options && this._options.data && this._options.data.paintLayer;
                        }.bind(this)
                    ),
                    (e.__which = "fill"),
                    e
                );
            }),
            (V.prototype._createBorderPropertyMenu = function () {
                var e = new P(null, "border-context-menu"),
                    t = null,
                    n = {
                        ADVANCED: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "border-properties-panel.text.advanced-settings")),
                        DELETE: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "border-properties-panel.text.delete-border")),
                        COPY: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "border-properties-panel.text.copy-border")),
                    },
                    r = e.createAddItem(
                        n.ADVANCED,
                        function () {
                            (this._options && this._options.data && this._options.data.openAdvancedSettings(),
                                gDesigner.stats("contextmenu_borders_advanced-settings"));
                        }.bind(this)
                    ),
                    s = e.createAddItem(n.DELETE, function () {
                        if (t) {
                            var e = gDesigner.getActiveDocument().getEditor().getSelection();
                            o.GEditor.tryRunTransaction(
                                e[0],
                                function () {
                                    for (var n = 0; n < e.length; n++)
                                        for (var o = e[n].getPaintLayers().getBorderLayers(), a = 0; a < o.length; a++) {
                                            var r = o[a];
                                            if (GObject.GStylable.BorderPaintLayer.equals(r, t)) {
                                                r.getParent().removeChild(r);
                                                break;
                                            }
                                        }
                                },
                                n.DELETE
                            );
                        }
                        gDesigner.stats("contextmenu_borders_delete");
                    }),
                    l = e.createAddItem(n.COPY, function () {
                        if (t) {
                            var e = GObject.GNode.serialize([t], {
                                    copy: true,
                                    copyIgnoreProperties: o.GEditorOptions.propertiesExcludedFromCopying,
                                }),
                                n = '<gravit mimeType="' + GObject.GNode.MIME_TYPE + '">' + $("<div/>").text(e).html() + "</gravit>";
                            gContainer.copyToClipboard(n);
                        }
                        gDesigner.stats("contextmenu_borders_copy");
                    });
                return (
                    r.setIcon("gravit-icon-settings"),
                    s.setIcon("gravit-icon-trash"),
                    l.setIcon("gravit-icon-copy"),
                    s.setShortcutHint([GPlatform.GKey.Constant.DELETE]),
                    l.setShortcutHint([GPlatform.GKey.Constant.META, "C"]),
                    e.addEventListener(
                        L,
                        function () {
                            t = this._options && this._options.data && this._options.data.paintLayer;
                        }.bind(this)
                    ),
                    (e.__which = "border"),
                    e
                );
            }),
            (V.prototype._createEffectPropertyMenu = function () {
                var e = new P(null, "effect-context-menu"),
                    t = null,
                    n = {
                        COPY: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "effect-properties-panel.text.copy-effect")),
                        APPLY_TO_ELEMENT: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "effect-properties-panel.text.apply-to-element")),
                        APPLY_TO_FILL: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "effect-properties-panel.text.apply-to-fill")),
                        APPLY_TO_BORDER: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "effect-properties-panel.text.apply-to-border")),
                    },
                    r = new D(D.Type.Menu, P);
                r.getMenu().addClass("effect-context-menu");
                var s = r.getMenu().createAddItem(n.APPLY_TO_ELEMENT, function () {
                        u(null, n.APPLY_TO_ELEMENT);
                    }),
                    l = r.getMenu().createAddItem(n.APPLY_TO_FILL, function () {
                        u(GObject.GStylable.StyleLayer.Fill, n.APPLY_TO_FILL);
                    }),
                    c = r.getMenu().createAddItem(n.APPLY_TO_BORDER, function () {
                        u(GObject.GStylable.StyleLayer.Border, n.APPLY_TO_BORDER);
                    }),
                    d = e.createAddItem(n.COPY, function () {
                        if (t) {
                            var e = GObject.GNode.serialize([t], {
                                    copy: true,
                                    copyIgnoreProperties: o.GEditorOptions.propertiesExcludedFromCopying,
                                }),
                                n = '<gravit mimeType="' + GObject.GNode.MIME_TYPE + '">' + $("<div/>").text(e).html() + "</gravit>";
                            gContainer.copyToClipboard(n);
                        }
                        gDesigner.stats("contextmenu_effects_copy");
                    }),
                    u = function (e, n) {
                        (o.GEditor.tryRunTransaction(
                            t,
                            function () {
                                t.setProperty("ly", e);
                            },
                            n
                        ),
                            gDesigner.stats("contextmenu_effects_change-layer", n));
                    };
                return (
                    r.setCaption(n.APPLY_TO_ELEMENT),
                    d.setIcon("gravit-icon-copy"),
                    s.setIcon("gravit-icon-circle"),
                    l.setIcon("gravit-icon-fill"),
                    c.setIcon("gravit-icon-stroke"),
                    d.setShortcutHint([GPlatform.GKey.Constant.META, "C"]),
                    e.addItem(r),
                    e.addEventListener(
                        L,
                        function () {
                            let e = null,
                                o = null,
                                a = (t = this._options && this._options.data && this._options.data.effect).getProperty("ly");
                            (a === GObject.GStylable.StyleLayer.Fill
                                ? ((e = "gravit-icon-fill"), (o = n.APPLY_TO_FILL))
                                : a === GObject.GStylable.StyleLayer.Border
                                  ? ((e = "gravit-icon-stroke"), (o = n.APPLY_TO_BORDER))
                                  : ((e = "gravit-icon-circle"), (o = n.APPLY_TO_ELEMENT)),
                                r.setIcon(e),
                                r.setCaption(o));
                        }.bind(this)
                    ),
                    (e.__which = "effect"),
                    e
                );
            }),
            (V.prototype.close = function () {
                (this._contextMenuTouch && this._contextMenuTouch.gOverlay("close"),
                    this._contextMenuDesktop && this._contextMenuDesktop.close());
            }),
            (V.prototype.toString = function () {
                return "[Object GContextMenu]";
            }),
            (module.exports = V));
    };
