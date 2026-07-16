module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41));
        var editorModule = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GAlignAction = require(866),
            GArrangeAction = require(869),
            GAttachToPathAction = require(1176),
            GConvertToPathAction = require(810),
            GCreateSymbolAction = require(608),
            GDetachSymbolAction = require(874),
            GResetInstanceAction = require(1177),
            GDetachFromPathAction = require(1178),
            GDistributeAction = require(867),
            GGroupAction = require(811),
            GJoinPathsAction = require(1179);
        const GMergeMainAction = require(812);
        var GSelectByFontTypeAction = require(1180);
        const GSelectByPaintLayerAction = require(1304),
            GSelectByBorderWidthAction = require(1305),
            GSelectByTransparencyAction = require(1306),
            GSelectByBlendModeAction = require(1307),
            GSelectByShapeAction = require(1308),
            GSelectByEffectAction = require(1309);
        var GSplitAction = require(870),
            GSplitPathAction = require(873),
            GTransformAction = require(871),
            GVectorizeBorderAction = require(872),
            GMenu = require(238),
            GMenuItem = require(339),
            GMenuOpenEvent = require(804),
            GMaskWithShapeAction = require(1181),
            GCropAction = require(1310),
            GCancelCropAction = require(1311),
            GEditElementAction = require(1312),
            GPasteStyleAction = require(875),
            GPasteHereAction = require(1182);
        const GPasteAndReplaceAction = require(876);
        var GExportAction = require(861),
            contextMenuContexts = require(450),
            GSystemDialog = require(44),
            GDocumentEvent = require(78);
        function GContextMenu(container) {
            var contextMenu = this._createContextMenu(),
                cropMenu = this._createCropMenu(),
                pageMenu = this._createPageMenu(),
                touchContextMenu = this._createTouchContextMenu(),
                fillPropertyMenu = this._createFillPropertyMenu(),
                borderPropertyMenu = this._createBorderPropertyMenu(),
                effectPropertyMenu = this._createEffectPropertyMenu();
            container.on(
                "contextmenu",
                function (event, options) {
                    if (gDesigner.getWindows().getActiveWindow().getView()) {
                        var sourceEvent = options && options.previousEvent ? options.previousEvent : options,
                            activeTool = gDesigner.getToolManager().getActiveTool(),
                            context = (event.data && event.data.context) || (sourceEvent && sourceEvent.data && sourceEvent.data.context);
                        if (!activeTool || !activeTool.catchesContextMenu(context == contextMenuContexts.LayerPanel || false)) {
                            var activeMenu = contextMenu,
                                useTouchOverlay = false;
                            context === contextMenuContexts.PagePanel
                                ? ((activeMenu = pageMenu), gDesigner.stats("contextmenu_open_page-menu"))
                                : context === contextMenuContexts.LayerPanel
                                  ? ((useTouchOverlay = true), gDesigner.stats("contextmenu_open_layer-menu"))
                                  : context === contextMenuContexts.FillPropertyPanel
                                    ? ((activeMenu = fillPropertyMenu), gDesigner.stats("contextmenu_open_fill-properties-menu"))
                                    : context === contextMenuContexts.BorderPropertyPanel
                                      ? ((activeMenu = borderPropertyMenu), gDesigner.stats("contextmenu_open_border-properties-menu"))
                                      : context === contextMenuContexts.EffectPropertyPanel
                                        ? ((activeMenu = effectPropertyMenu), gDesigner.stats("contextmenu_open_effect-properties-menu"))
                                        : activeTool instanceof editorModule.GSelectTool && activeTool.isCropContext()
                                          ? ((activeMenu = cropMenu), gDesigner.stats("contextmenu_open_crop-menu"))
                                          : ((useTouchOverlay = true), gDesigner.stats("contextmenu_open_context-menu"));
                            var positionEvent = "number" == typeof event.clientX ? event : sourceEvent;
                            this._contextMenuClientPosition = gDesigner
                                .getWindows()
                                .getActiveWindow()
                                .getView()
                                ._convertClientPositionFromMousePosition(positionEvent);
                            var pageX = event.pageX ? event.pageX : sourceEvent.pageX,
                                pageY = event.pageY ? event.pageY : sourceEvent.pageY;
                            return (
                                (this._mouseEvent = event.pageX ? event : sourceEvent),
                                (this._options = options),
                                gDesigner.isTouchEnabled() && useTouchOverlay
                                    ? touchContextMenu.gOverlay("open", { x: pageX, y: pageY }, void 0, () => {
                                          gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.ContextMenuOpened, gDesigner.getActiveDocument()));
                                      })
                                    : activeMenu.open({ x: pageX, y: pageY }),
                                (this._contextMenuTouch = touchContextMenu),
                                (this._contextMenuDesktop = activeMenu),
                                true
                            );
                        }
                    }
                }.bind(this)
            );
        }
        ((GContextMenu.ID = "context.menu"),
            (GContextMenu.prototype._contextMenuClientPosition = null),
            (GContextMenu.prototype._mouseEvent = null),
            (GContextMenu.prototype._options = null),
            (GContextMenu.prototype._contextMenuTouch = null),
            (GContextMenu.prototype._contextMenuDesktop = null),
            (GContextMenu.prototype._createContextMenu = function () {
                var menu = new GMenu();
                ((menu.__which = "context"), menu.createAddItem(gDesigner.getAction(GEditElementAction.ID)));
                var pasteMenuItem = new GMenuItem(GMenuItem.Type.Menu, GMenu);
                (pasteMenuItem.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GPaste", "action.paste"))),
                    pasteMenuItem
                        .getMenu()
                        .createAddItem(gDesigner.getAction(GPasteHereAction.ID), null, null, null, GContextMenu.ID)
                        .addEventListener(
                            GMenuItem.UpdateEvent,
                            function () {
                                gDesigner.getAction(GPasteHereAction.ID).setPosition(this._contextMenuClientPosition);
                            }.bind(this)
                        ),
                    pasteMenuItem.getMenu().createAddItem(gDesigner.getAction(GPasteAndReplaceAction.ID)),
                    pasteMenuItem.getMenu().createAddItem(gDesigner.getAction(GPasteStyleAction.ID)),
                    menu.addItem(pasteMenuItem),
                    menu.createAddDivider());
                var arrangeMenuItem = new GMenuItem(GMenuItem.Type.Menu, GMenu);
                (arrangeMenuItem.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.arrange"))),
                    arrangeMenuItem.getMenu().createAddItem(gDesigner.getAction(GArrangeAction.ID + "." + editorModule.GEditor.ArrangeOrderType.SendToFront)),
                    arrangeMenuItem.getMenu().createAddItem(gDesigner.getAction(GArrangeAction.ID + "." + editorModule.GEditor.ArrangeOrderType.BringForward)),
                    arrangeMenuItem.getMenu().createAddItem(gDesigner.getAction(GArrangeAction.ID + "." + editorModule.GEditor.ArrangeOrderType.SendBackward)),
                    arrangeMenuItem.getMenu().createAddItem(gDesigner.getAction(GArrangeAction.ID + "." + editorModule.GEditor.ArrangeOrderType.SendToBack)),
                    menu.addItem(arrangeMenuItem));
                var alignMenuItem = new GMenuItem(GMenuItem.Type.Menu, GMenu);
                (alignMenuItem.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.align"))),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + editorModule.GEditor.ArrangeAlignType.AlignLeft)),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + editorModule.GEditor.ArrangeAlignType.AlignCenter)),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + editorModule.GEditor.ArrangeAlignType.AlignRight)),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + editorModule.GEditor.ArrangeAlignType.AlignJustifyHorizontal)),
                    alignMenuItem.getMenu().createAddDivider(),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + editorModule.GEditor.ArrangeAlignType.AlignTop)),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + editorModule.GEditor.ArrangeAlignType.AlignMiddle)),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + editorModule.GEditor.ArrangeAlignType.AlignBottom)),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GAlignAction.ID + "." + editorModule.GEditor.ArrangeAlignType.AlignJustifyVertical)),
                    alignMenuItem.getMenu().createAddDivider(),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GDistributeAction.ID + "." + GDistributeAction.Type.Horizontal)),
                    alignMenuItem.getMenu().createAddItem(gDesigner.getAction(GDistributeAction.ID + "." + GDistributeAction.Type.Vertical)),
                    menu.addItem(alignMenuItem));
                var transformMenuItem = new GMenuItem(GMenuItem.Type.Menu, GMenu);
                (transformMenuItem.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.transform"))),
                    transformMenuItem.getMenu().createAddItem(gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.Rotate90Left)),
                    transformMenuItem.getMenu().createAddItem(gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.Rotate90Right)),
                    transformMenuItem.getMenu().createAddItem(gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.FlipHorizontal)),
                    transformMenuItem.getMenu().createAddItem(gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.FlipVertical)),
                    menu.addItem(transformMenuItem),
                    menu.createAddDivider(),
                    menu.createAddItem(gDesigner.getAction(GGroupAction.ID)),
                    menu.createAddItem(gDesigner.getAction(GMergeMainAction.ID)),
                    menu.createAddItem(gDesigner.getAction(GSplitAction.ID)),
                    menu.createAddItem(gDesigner.getAction(GMaskWithShapeAction.ID)),
                    menu.createAddDivider(),
                    menu.createAddItem(gDesigner.getAction(GConvertToPathAction.ID)),
                    menu.createAddItem(gDesigner.getAction(GVectorizeBorderAction.ID)),
                    menu.createAddItem(gDesigner.getAction(GJoinPathsAction.ID)),
                    menu.createAddItem(gDesigner.getAction(GSplitPathAction.ID)),
                    menu.createAddDivider(),
                    menu.createAddItem(gDesigner.getAction(GCreateSymbolAction.ID)),
                    menu.createAddItem(gDesigner.getAction(GResetInstanceAction.ID)),
                    menu.createAddItem(gDesigner.getAction(GDetachSymbolAction.ID)),
                    menu.createAddDivider(),
                    menu.createAddItem(gDesigner.getAction(GAttachToPathAction.ID)),
                    menu.createAddItem(gDesigner.getAction(GDetachFromPathAction.ID)),
                    menu.createAddDivider());
                const selectSameMenuItem = new GMenuItem(GMenuItem.Type.Menu, GMenu);
                (selectSameMenuItem.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.select-same"))),
                    selectSameMenuItem.getMenu().createAddItem(gDesigner.getAction(GSelectByFontTypeAction.ID)),
                    selectSameMenuItem.getMenu().createAddDivider(),
                    selectSameMenuItem.getMenu().createAddItem(gDesigner.getAction(GSelectByPaintLayerAction.getId(GSelectByPaintLayerAction.Type.Fill))),
                    selectSameMenuItem.getMenu().createAddItem(gDesigner.getAction(GSelectByPaintLayerAction.getId(GSelectByPaintLayerAction.Type.Border))),
                    selectSameMenuItem.getMenu().createAddItem(gDesigner.getAction(GSelectByPaintLayerAction.getId(GSelectByPaintLayerAction.Type.FillAndBorder))),
                    selectSameMenuItem.getMenu().createAddDivider(),
                    selectSameMenuItem.getMenu().createAddItem(gDesigner.getAction(GSelectByBorderWidthAction.ID)),
                    selectSameMenuItem.getMenu().createAddItem(gDesigner.getAction(GSelectByTransparencyAction.ID)),
                    selectSameMenuItem.getMenu().createAddItem(gDesigner.getAction(GSelectByBlendModeAction.ID)),
                    selectSameMenuItem.getMenu().createAddItem(gDesigner.getAction(GSelectByShapeAction.ID)),
                    selectSameMenuItem.getMenu().createAddItem(gDesigner.getAction(GSelectByEffectAction.ID)),
                    menu.addItem(selectSameMenuItem),
                    menu.createAddDivider());
                var selectMenuItem = new GMenuItem(GMenuItem.Type.Menu, GMenu);
                return (
                    selectMenuItem.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.select"))),
                    selectMenuItem.setIcon("gravit-icon-cursor-filled"),
                    selectMenuItem.addEventListener(
                        GMenuItem.UpdateEvent,
                        function () {
                            (selectMenuItem.getMenu().clearItems(), selectMenuItem.setEnabled(false));
                            var { elementHits, filteredElementHits, submenus } = this._getHitsElments();
                            if (!(elementHits && elementHits.length > 0 && elementHits[0] instanceof GObject.GPage) && elementHits && elementHits.length > 0) {
                                selectMenuItem.setEnabled(true);
                                for (var o = 0; o < filteredElementHits.length; o++) {
                                    var r = filteredElementHits[o].element,
                                        s = r instanceof GObject.GBlock ? r.getLabel() : r.getNodeNameTranslated(),
                                        l = "temp-" + elementHits.indexOf(filteredElementHits[o]);
                                    if (submenus[l]) {
                                        var c = new GMenuItem(GMenuItem.Type.Menu, GMenu);
                                        (c.setCaption((o + 1).toString() + ". " + s),
                                            c.setData(l),
                                            c.addEventListener(GMenuItem.UpdateEvent, function () {
                                                var childElements = submenus[this.getData()];
                                                this.getMenu().clearItems();
                                                for (var t = 0; t < childElements.length; t++)
                                                    this.getMenu().createAddItem(
                                                        (t + 1).toString() +
                                                            ". " +
                                                            (childElements[t] instanceof GObject.GBlock ? childElements[t].getLabel() : childElements[t].getNodeNameTranslated()),
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
                                                    ).element = childElements[t];
                                            }),
                                            selectMenuItem.getMenu().addItem(c));
                                    } else
                                        selectMenuItem.getMenu().createAddItem(
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
                    menu.addItem(selectMenuItem),
                    menu
                );
            }),
            (GContextMenu.prototype._createCropMenu = function () {
                var menu = new GMenu();
                return ((menu.__which = "crop"), menu.createAddItem(gDesigner.getAction(GCropAction.ID)), menu.createAddItem(gDesigner.getAction(GCancelCropAction.ID)), menu);
            }),
            (GContextMenu.prototype._getHitsElments = function (mouseEvent) {
                mouseEvent = mouseEvent || this._mouseEvent;
                var clientPosition = gDesigner.getWindows().getActiveWindow().getView()._convertClientPositionFromMousePosition(mouseEvent),
                    scene = gDesigner.getActiveDocument().getScene(),
                    view = gDesigner.getWindows().getActiveWindow().getView(),
                    worldTransform = view.getWorldTransform(scene),
                    excludePages = function (element) {
                        return !(element instanceof GObject.GPage);
                    }.bind(this),
                    elementHits = scene.hitTest(clientPosition, worldTransform, excludePages, true, -1, editorModule.GEditorOptions.pickDistance, true, null, true, false, view.getViewConfiguration().multiPageView);
                if (
                    (elementHits &&
                        elementHits.length > 0 &&
                        (elementHits = elementHits.filter(function (hit) {
                            var lockFlags = hit.element.getProperty("plkt");
                            return !(
                                lockFlags & GObject.GBlock.ProgramLck.NoEdit &&
                                lockFlags & GObject.GBlock.ProgramLck.NoSizeChanges &&
                                lockFlags & GObject.GBlock.ProgramLck.NoMove &&
                                lockFlags & GObject.GBlock.ProgramLck.NoDelete
                            );
                        })),
                    elementHits && elementHits.length > 0 && elementHits[0] instanceof GObject.GPage)
                )
                    return { elementHits: elementHits };
                var filteredElementHits = [],
                    submenus = {};
                if (elementHits && elementHits.length > 0)
                    for (var u = 0; u < elementHits.length; ++u) {
                        for (var p = elementHits[u].element.getParent(), g = false, h = 0; h < elementHits.length; ++h)
                            if (elementHits[h].element === p) {
                                ((g = true), submenus["temp-" + h] ? submenus["temp-" + h].push(elementHits[u].element) : (submenus["temp-" + h] = [elementHits[u].element]));
                                break;
                            }
                        g || filteredElementHits.push(elementHits[u]);
                    }
                return { elementHits: elementHits, filteredElementHits: filteredElementHits, submenus: submenus };
            }),
            (GContextMenu.prototype._createPageMenu = function () {
                var menu = new GMenu(null, "g-page-option-menu"),
                    labels = {
                        DUPLICATE: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "page-panel.text.duplicate")),
                        DELETE: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "page-panel.text.delete")),
                        COPY: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "page-panel.text.copy")),
                        EXPORT: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "page-panel.text.export")),
                    },
                    duplicateItem = menu.createAddItem(labels.DUPLICATE, function () {
                        var scene = gDesigner.getActiveDocument().getScene();
                        (editorModule.GEditor.tryRunTransaction(
                            scene,
                            function () {
                                var activePage = scene.getActivePage(),
                                    clonedPage = activePage.clone({
                                        copy: true,
                                        copyIgnoreProperties: editorModule.GEditorOptions.propertiesExcludedFromCopying,
                                    });
                                (scene.insertChild(clonedPage), scene.renameClone(activePage, clonedPage));
                                var position = clonedPage.getPosition(true, true, true, true);
                                clonedPage.setProperty("off", new GObject.GTransform(1, 0, 0, 1, position.getX(), position.getY()));
                            },
                            labels.DUPLICATE
                        ),
                            gDesigner.stats("contextmenu_pages_duplicate"));
                    }),
                    deleteItem = menu.createAddItem(labels.DELETE, function () {
                        var scene = gDesigner.getActiveDocument().getScene(),
                            activePage = scene.getActivePage(),
                            hasSlavePages = activePage.getSlavePages().length > 0;
                        activePage.getProperty("plkt") & GObject.GBlock.ProgramLck.NoDelete ||
                            (hasSlavePages
                                ? GSystemDialog.confirm(
                                      GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.confirm-delete-masterpage")),
                                      function (confirmed) {
                                          confirmed &&
                                              editorModule.GEditor.tryRunTransaction(
                                                  scene,
                                                  function () {
                                                      scene.deleteActivePage();
                                                  },
                                                  GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.delete-page"))
                                              );
                                      },
                                      null,
                                      null,
                                      true,
                                      true
                                  )
                                : editorModule.GEditor.tryRunTransaction(
                                      scene,
                                      function () {
                                          scene.deleteActivePage();
                                      },
                                      labels.DELETE
                                  ),
                            gDesigner.stats("contextmenu_pages_delete"));
                    }),
                    copyItem = menu.createAddItem(labels.COPY, function () {
                        var document = gDesigner.getActiveDocument(),
                            scene = document.getScene();
                        (editorModule.GEditor.tryRunTransaction(
                            scene,
                            function () {
                                var isRestricted = document.isCommercialProductFile() || !gDesigner.getApplicationManager().isCopyPasteEnabled(),
                                    activePage = scene.getActivePage(),
                                    serialized = GObject.GNode.serialize(activePage, {
                                        copy: true,
                                        copyIgnoreProperties: editorModule.GEditorOptions.propertiesExcludedFromCopying,
                                    }),
                                    clipboardXml =
                                        '<gravit mimeType="' +
                                        GObject.GNode.MIME_TYPE +
                                        '" restricted="' +
                                        (!!isRestricted && document.getStorageItem().getId()) +
                                        '">' +
                                        $("<div/>").text(serialized).html() +
                                        "</gravit>";
                                gContainer.copyToClipboard(clipboardXml);
                            },
                            labels.COPY
                        ),
                            gDesigner.stats("contextmenu_pages_copy"));
                    }),
                    exportItem = menu.createAddItem(labels.EXPORT, function () {
                        var activePage = gDesigner.getActiveDocument().getScene().getActivePage();
                        (gDesigner.executeAction(GExportAction.ID, [{ element: activePage }], null, true), gDesigner.stats("contextmenu_pages_export"));
                    });
                return (
                    duplicateItem.setIcon("gravit-icon-duplicate"),
                    deleteItem.setIcon("gravit-icon-delete"),
                    copyItem.setIcon("gravit-icon-copy"),
                    exportItem.setIcon("gravit-icon-export"),
                    exportItem.setProFeatureInterruption(false),
                    menu.addEventListener(GMenuOpenEvent.EVENT, function (event) {
                        gDesigner.isEnabledProFeatures() || exportItem.setPro(true);
                    }),
                    (menu.__which = "page"),
                    menu
                );
            }),
            (GContextMenu.prototype._createFillPropertyMenu = function () {
                var menu = new GMenu(null, "fill-context-menu"),
                    selectedFillLayer = null,
                    labels = {
                        DELETE: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "fill-properties-panel.text.delete-fill")),
                        COPY: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "fill-properties-panel.text.copy-fill")),
                    },
                    deleteItem = menu.createAddItem(labels.DELETE, function () {
                        if (selectedFillLayer) {
                            var selection = gDesigner.getActiveDocument().getEditor().getSelection();
                            editorModule.GEditor.tryRunTransaction(
                                selection[0],
                                function () {
                                    for (var n = 0; n < selection.length; n++)
                                        for (var o = selection[n].getPaintLayers().getFillLayers(), a = 0; a < o.length; a++) {
                                            var r = o[a];
                                            if (GObject.GStylable.FillPaintLayer.equals(r, selectedFillLayer)) {
                                                r.getParent().removeChild(r);
                                                break;
                                            }
                                        }
                                },
                                labels.DELETE
                            );
                        }
                        gDesigner.stats("contextmenu_fills_delete");
                    }),
                    copyItem = menu.createAddItem(labels.COPY, function () {
                        if (selectedFillLayer) {
                            var serialized = GObject.GNode.serialize([selectedFillLayer], {
                                    copy: true,
                                    copyIgnoreProperties: editorModule.GEditorOptions.propertiesExcludedFromCopying,
                                }),
                                clipboardXml = '<gravit mimeType="' + GObject.GNode.MIME_TYPE + '">' + $("<div/>").text(serialized).html() + "</gravit>";
                            gContainer.copyToClipboard(clipboardXml);
                        }
                        gDesigner.stats("contextmenu_fills_copy");
                    });
                return (
                    deleteItem.setIcon("gravit-icon-trash"),
                    copyItem.setIcon("gravit-icon-copy"),
                    deleteItem.setShortcutHint([GPlatform.GKey.Constant.DELETE]),
                    copyItem.setShortcutHint([GPlatform.GKey.Constant.META, "C"]),
                    menu.addEventListener(
                        GMenuOpenEvent,
                        function () {
                            selectedFillLayer = this._options && this._options.data && this._options.data.paintLayer;
                        }.bind(this)
                    ),
                    (menu.__which = "fill"),
                    menu
                );
            }),
            (GContextMenu.prototype._createBorderPropertyMenu = function () {
                var menu = new GMenu(null, "border-context-menu"),
                    selectedBorderLayer = null,
                    labels = {
                        ADVANCED: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "border-properties-panel.text.advanced-settings")),
                        DELETE: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "border-properties-panel.text.delete-border")),
                        COPY: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "border-properties-panel.text.copy-border")),
                    },
                    advancedItem = menu.createAddItem(
                        labels.ADVANCED,
                        function () {
                            (this._options && this._options.data && this._options.data.openAdvancedSettings(),
                                gDesigner.stats("contextmenu_borders_advanced-settings"));
                        }.bind(this)
                    ),
                    deleteItem = menu.createAddItem(labels.DELETE, function () {
                        if (selectedBorderLayer) {
                            var selection = gDesigner.getActiveDocument().getEditor().getSelection();
                            editorModule.GEditor.tryRunTransaction(
                                selection[0],
                                function () {
                                    for (var n = 0; n < selection.length; n++)
                                        for (var o = selection[n].getPaintLayers().getBorderLayers(), a = 0; a < o.length; a++) {
                                            var r = o[a];
                                            if (GObject.GStylable.BorderPaintLayer.equals(r, selectedBorderLayer)) {
                                                r.getParent().removeChild(r);
                                                break;
                                            }
                                        }
                                },
                                labels.DELETE
                            );
                        }
                        gDesigner.stats("contextmenu_borders_delete");
                    }),
                    copyItem = menu.createAddItem(labels.COPY, function () {
                        if (selectedBorderLayer) {
                            var serialized = GObject.GNode.serialize([selectedBorderLayer], {
                                    copy: true,
                                    copyIgnoreProperties: editorModule.GEditorOptions.propertiesExcludedFromCopying,
                                }),
                                clipboardXml = '<gravit mimeType="' + GObject.GNode.MIME_TYPE + '">' + $("<div/>").text(serialized).html() + "</gravit>";
                            gContainer.copyToClipboard(clipboardXml);
                        }
                        gDesigner.stats("contextmenu_borders_copy");
                    });
                return (
                    advancedItem.setIcon("gravit-icon-settings"),
                    deleteItem.setIcon("gravit-icon-trash"),
                    copyItem.setIcon("gravit-icon-copy"),
                    deleteItem.setShortcutHint([GPlatform.GKey.Constant.DELETE]),
                    copyItem.setShortcutHint([GPlatform.GKey.Constant.META, "C"]),
                    menu.addEventListener(
                        GMenuOpenEvent,
                        function () {
                            selectedBorderLayer = this._options && this._options.data && this._options.data.paintLayer;
                        }.bind(this)
                    ),
                    (menu.__which = "border"),
                    menu
                );
            }),
            (GContextMenu.prototype._createEffectPropertyMenu = function () {
                var menu = new GMenu(null, "effect-context-menu"),
                    selectedEffect = null,
                    labels = {
                        COPY: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "effect-properties-panel.text.copy-effect")),
                        APPLY_TO_ELEMENT: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "effect-properties-panel.text.apply-to-element")),
                        APPLY_TO_FILL: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "effect-properties-panel.text.apply-to-fill")),
                        APPLY_TO_BORDER: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "effect-properties-panel.text.apply-to-border")),
                    },
                    layerMenuItem = new GMenuItem(GMenuItem.Type.Menu, GMenu);
                layerMenuItem.getMenu().addClass("effect-context-menu");
                var applyToElementItem = layerMenuItem.getMenu().createAddItem(labels.APPLY_TO_ELEMENT, function () {
                        applyToLayer(null, labels.APPLY_TO_ELEMENT);
                    }),
                    applyToFillItem = layerMenuItem.getMenu().createAddItem(labels.APPLY_TO_FILL, function () {
                        applyToLayer(GObject.GStylable.StyleLayer.Fill, labels.APPLY_TO_FILL);
                    }),
                    applyToBorderItem = layerMenuItem.getMenu().createAddItem(labels.APPLY_TO_BORDER, function () {
                        applyToLayer(GObject.GStylable.StyleLayer.Border, labels.APPLY_TO_BORDER);
                    }),
                    copyItem = menu.createAddItem(labels.COPY, function () {
                        if (selectedEffect) {
                            var serialized = GObject.GNode.serialize([selectedEffect], {
                                    copy: true,
                                    copyIgnoreProperties: editorModule.GEditorOptions.propertiesExcludedFromCopying,
                                }),
                                clipboardXml = '<gravit mimeType="' + GObject.GNode.MIME_TYPE + '">' + $("<div/>").text(serialized).html() + "</gravit>";
                            gContainer.copyToClipboard(clipboardXml);
                        }
                        gDesigner.stats("contextmenu_effects_copy");
                    }),
                    applyToLayer = function (layerType, label) {
                        (editorModule.GEditor.tryRunTransaction(
                            selectedEffect,
                            function () {
                                selectedEffect.setProperty("ly", layerType);
                            },
                            label
                        ),
                            gDesigner.stats("contextmenu_effects_change-layer", label));
                    };
                return (
                    layerMenuItem.setCaption(labels.APPLY_TO_ELEMENT),
                    copyItem.setIcon("gravit-icon-copy"),
                    applyToElementItem.setIcon("gravit-icon-circle"),
                    applyToFillItem.setIcon("gravit-icon-fill"),
                    applyToBorderItem.setIcon("gravit-icon-stroke"),
                    copyItem.setShortcutHint([GPlatform.GKey.Constant.META, "C"]),
                    menu.addItem(layerMenuItem),
                    menu.addEventListener(
                        GMenuOpenEvent,
                        function () {
                            let icon = null,
                                caption = null,
                                currentLayer = (selectedEffect = this._options && this._options.data && this._options.data.effect).getProperty("ly");
                            (currentLayer === GObject.GStylable.StyleLayer.Fill
                                ? ((icon = "gravit-icon-fill"), (caption = labels.APPLY_TO_FILL))
                                : currentLayer === GObject.GStylable.StyleLayer.Border
                                  ? ((icon = "gravit-icon-stroke"), (caption = labels.APPLY_TO_BORDER))
                                  : ((icon = "gravit-icon-circle"), (caption = labels.APPLY_TO_ELEMENT)),
                                layerMenuItem.setIcon(icon),
                                layerMenuItem.setCaption(caption));
                        }.bind(this)
                    ),
                    (menu.__which = "effect"),
                    menu
                );
            }),
            (GContextMenu.prototype.close = function () {
                (this._contextMenuTouch && this._contextMenuTouch.gOverlay("close"),
                    this._contextMenuDesktop && this._contextMenuDesktop.close());
            }),
            (GContextMenu.prototype.toString = function () {
                return "[Object GContextMenu]";
            }),
            (module.exports = GContextMenu));
    };
