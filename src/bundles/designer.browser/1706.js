module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(57), require(91 /* polyfill:String */), require(4), require(13), require(97), require(26));
        var GEditor = require(53),
            GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            layerItemUtils = require(1351),
            DragMode = _interopRequireDefault(require(565)),
            GSettingChangedEvent = _interopRequireDefault(require(135)),
            GVirtualTree = require(451 /* GVirtualTree */).GVirtualTree,
            GVirtualTreeNodeNamed = require(451 /* GVirtualTree */).GVirtualTreeNodeNamed,
            { VTREE_FREE_HEIGHT, VTREE_FREE_HEIGHT_TOUCH } = require(10 /* designerConfig */),
            contextMenuContexts = require(450),
            watchedPropertyNames = ["name"];
        function GLayerPanel() {}
        function canDropAdapter(parentNode, targetNode, previousNode, dragNodes, droppedNodesOut) {
            var allowed = true,
                panelData = $(this).data("glayerpanel");
            if (panelData.options.canDropCallback) {
                for (
                    var targetParentNode = parentNode.id ? getNodeById.call(this, parentNode.id) : panelData.scene ? panelData.scene.getActivePage() : null,
                        previousSceneNode = previousNode ? getNodeById.call(this, previousNode.id) : null,
                        dragSceneNodes = [],
                        d = 0;
                    d < dragNodes.length;
                    ++d
                )
                    dragSceneNodes.push(getNodeById.call(this, dragNodes[d].id));
                var allowedIndices = [];
                if ((allowed = panelData.options.canDropCallback(targetParentNode, previousSceneNode, dragSceneNodes, allowedIndices)))
                    for (d = 0; d < allowedIndices.length; ++d) {
                        var p = allowedIndices[d];
                        droppedNodesOut.push(dragNodes[p]);
                    }
            }
            return allowed;
        }
        function defaultCanDrop(parentNode, referenceNode, dragNodes, allowedIndices) {
            if (!dragNodes || !dragNodes.length || !parentNode) return false;
            if (!gDesigner.isEnabledProFeatures()) {
                if ((0, Utils.isSymbolInstance)(parentNode)) return false;
                if (dragNodes.some((node) => node instanceof GObject.GSymbol) && (0, Utils.isSymbol)(parentNode)) return false;
            }
            for (var allowed = true, l = 0; l < dragNodes.length && allowed; ++l)
                (allowed = !parentNode.isLocked() && dragNodes[l].validateInsertion(parentNode, referenceNode) && GEditor.GEditor.validateBlockInsertion(parentNode, dragNodes[l], referenceNode)) && allowedIndices.push[l];
            return allowed;
        }
        function moveAdapter(parentNode, targetNode, previousNode, dragNodes) {
            var panelData = $(this).data("glayerpanel");
            if (panelData.options.moveCallback) {
                for (
                    var targetParentNode = parentNode.id ? getNodeById.call(this, parentNode.id) : panelData.scene ? panelData.scene.getActivePage() : null,
                        previousSceneNode = previousNode ? getNodeById.call(this, previousNode.id) : null,
                        dragSceneNodes = [],
                        l = 0;
                    l < dragNodes.length;
                    ++l
                )
                    dragSceneNodes.push(getNodeById.call(this, dragNodes[l].id));
                panelData.options.moveCallback(targetParentNode, previousSceneNode, dragSceneNodes);
            }
        }
        function duplicateAdapter(parentNode, targetNode, previousNode, dragNodes) {
            var panelData = $(this).data("glayerpanel");
            if (panelData.options.duplicateCallback) {
                for (
                    var targetParentNode = parentNode.id ? getNodeById.call(this, parentNode.id) : panelData.scene ? panelData.scene.getActivePage() : null,
                        previousSceneNode = previousNode ? getNodeById.call(this, previousNode.id) : null,
                        dragSceneNodes = [],
                        l = 0;
                    l < dragNodes.length;
                    ++l
                )
                    dragSceneNodes.push(getNodeById.call(this, dragNodes[l].id));
                panelData.options.duplicateCallback(targetParentNode, previousSceneNode, dragSceneNodes);
            }
        }
        function clickAdapter(treeNode) {
            var panelData = $(this).data("glayerpanel");
            if (panelData.options.clickCallback) {
                var sceneNode = getNodeById.call(this, treeNode.id);
                panelData.options.clickCallback(sceneNode);
            }
        }
        function expandAdapter(treeNode) {
            var sceneNode = getNodeById.call(this, treeNode.id);
            sceneNode && (treeNode.expanded ? sceneNode.setFlag(GObject.GNode.Flag.Expanded) : sceneNode.removeFlag(GObject.GNode.Flag.Expanded));
        }
        function renderNodeAdapter(treeNode, rowElement) {
            var panelData = $(this).data("glayerpanel");
            (panelData && panelData.options && panelData.options.renderer && panelData.options.renderer(treeNode.id, treeNode.expanded, rowElement), updateTouchHeight.call(this));
        }
        function expandIconRenderer(expandElement) {
            var panelElement = $(this);
            expandElement.id === GVirtualTree.COLLAPSE_ID
                ? $(expandElement).addClass(panelElement.data("glayerpanel").options.collapseStyle)
                : expandElement.id === GVirtualTree.EXPAND_ID && $(expandElement).addClass(panelElement.data("glayerpanel").options.expandStyle);
        }
        function getNodeById(treeId) {
            var entry = $(this).data("glayerpanel").layersTreeNodeMap[treeId];
            return entry ? entry.node : null;
        }
        function getTreeEntryById(treeId) {
            return $(this).data("glayerpanel").layersTreeNodeMap[treeId];
        }
        function getTreeIdByNode(node) {
            var entry = $(this).data("glayerpanel").layersTreeNodeMapByNodes.get(node);
            return entry ? entry.treeId : null;
        }
        function getTreeNodeByNode(node) {
            var entry = $(this).data("glayerpanel").layersTreeNodeMapByNodes.get(node);
            return entry ? entry.treeNode : null;
        }
        function removeNodeMapping(node) {
            var layersTreeNodeMap = $(this).data("glayerpanel").layersTreeNodeMap,
                layersTreeNodeMapByNodes = $(this).data("glayerpanel").layersTreeNodeMapByNodes;
            node.accept(
                function (childNode) {
                    if (childNode instanceof GObject.GLayer || childNode instanceof GObject.GItem) {
                        var entry = layersTreeNodeMapByNodes.get(childNode);
                        entry && (layersTreeNodeMapByNodes.delete(childNode), (layersTreeNodeMap[entry.treeId] = null));
                    }
                }.bind(this)
            );
        }
        function renderLayerItem(treeId, expanded, rowElement) {
            var panelData = $(this).data("glayerpanel"),
                treeEntry = getTreeEntryById.call(this, treeId),
                node = treeEntry ? treeEntry.node : null;
            if (node) {
                var { parentHidden, isHidden, lockType, isOutlined, hasSelection } = (0, layerItemUtils.getLayerOrItemStatus)(node),
                    { container, title, titleGroup } = (0, layerItemUtils.buildLayerItemContainer)(rowElement, node, hasSelection, expanded);
                treeEntry.element = titleGroup;
                var panelElement = this;
                if (
                    (node.hasFlag(GObject.GElement.Flag.PartialLocked) ||
                        titleGroup.attr("draggable", true)
                            .attr("data-drag-mode", DragMode.default.PRESS_AND_HOLD)
                            .on("dragstart", function (dragEvent) {
                                if (panelData.options.startDraggingCallback) {
                                    var draggedNodes = panelData.options.startDraggingCallback(node);
                                    if (draggedNodes && draggedNodes.length) {
                                        var nameLabel = "",
                                            nodeName = draggedNodes[0].getProperty("name");
                                        (nodeName = nodeName || draggedNodes[0].getNodeNameTranslated()) && (nameLabel = nodeName);
                                        for (var a = 1; a < draggedNodes.length; ++a)
                                            (nodeName = (nodeName = draggedNodes[a].getProperty("name")) || draggedNodes[a].getNodeNameTranslated()) && (nameLabel += ", " + nodeName);
                                        nameLabel.length && $(title).html(nameLabel);
                                        var vtree = panelData.vtree,
                                            dragTreeNodes = [];
                                        for (a = 0; a < draggedNodes.length; ++a) {
                                            var c = getTreeNodeByNode.call(panelElement, draggedNodes[a]);
                                            c && dragTreeNodes.push(c);
                                        }
                                        (vtree.setDragNodes(dragTreeNodes),
                                            setTimeout(
                                                function () {
                                                    $(title).html(nodeName);
                                                }.bind(this),
                                                0
                                            ));
                                    } else $(this).attr("draggable", false);
                                }
                            }),
                    !panelData.blockHighlight)
                ) {
                    var highlighted = node.hasFlag(GObject.GNode.Flag.Highlighted);
                    (highlighted ||
                        expanded ||
                        !node.hasMixin(GObject.GNode.Container) ||
                        (highlighted = node.acceptChildren(
                            function (childNode) {
                                return childNode.hasFlag(GObject.GNode.Flag.Highlighted);
                            },
                            false,
                            true
                        )),
                        container.toggleClass("g-highlighted-row", highlighted));
                }
                !lockType &&
                    gDesigner.getActiveDocument() &&
                    gDesigner.getApplicationManager().isEditingEnabled() &&
                    $(titleGroup).gAutoEdit({
                        textSelector: "> .layer-title",
                        getContainer: function () {
                            return getTreeEntryById.call(panelElement, treeId).element;
                        },
                        submitCallback: function (newName) {
                            newName &&
                                "" !== newName.trim() &&
                                GEditor.GEditor.tryRunTransaction(
                                    node,
                                    function () {
                                        node.setProperty("name", newName);
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.rename-layer"))
                                );
                        },
                    });
                var symbolAncestor = getSymbolAncestor(node);
                symbolAncestor &&
                    !symbolAncestor.inSync(node, true) &&
                    $("<span></span>")
                        .addClass("layer-action layer-synchronize gravit-icon-refresh")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.reset-instance")))
                        .on("click", function (clickEvent) {
                            (gDesigner.stats("layers_click_symbol-reset"),
                                clickEvent.stopPropagation(),
                                GEditor.GEditor.tryRunTransaction(
                                    node,
                                    function () {
                                        symbolAncestor.synchronize(node);
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.reset-instance"))
                                ));
                        })
                        .appendTo(container);
                var lockIconClass = lockType ? "gravit-icon-lock" : "gravit-icon-unlock";
                ((lockIconClass = gDesigner.isTouchEnabled() ? lockIconClass + "-small" : lockIconClass),
                    $("<span></span>")
                        .addClass("layer-action layer-lock " + lockIconClass)
                        .toggleClass("g-active", !!lockType)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock")))
                        .on("click", function (clickEvent) {
                            (clickEvent.stopPropagation(), panelMethods.toggleLockStatusOfLayerOrItem(node));
                        })
                        .appendTo(container)
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-lock-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-lock-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/objects/#locking-objects",
                            })
                        ),
                    container.toggleClass("layer-hidden", isHidden));
                var visibilityIconClass = isHidden ? "gravit-icon-hide" : "gravit-icon-display";
                if (
                    ((visibilityIconClass = gDesigner.isTouchEnabled() ? visibilityIconClass + "-small" : visibilityIconClass),
                    $("<span></span>")
                        .addClass("layer-action layer-visibility " + visibilityIconClass)
                        .toggleClass("g-active", isHidden)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility")))
                        .on("click", function (clickEvent) {
                            (clickEvent.stopPropagation(), panelMethods.toggleHideStatusOfLayerOrItem(node));
                        })
                        .appendTo(container)
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-visibility-tooltip-title")),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-visibility-tooltip-description")
                                ),
                                learnMore: "/docs/organizing-your-designs/objects/#hiding-objects",
                            })
                        ),
                    node instanceof GObject.GLayer)
                ) {
                    $("<span></span>")
                        .addClass("layer-action layer-outline gravit-icon-" + (isOutlined ? "ellipse" : "circle"))
                        .toggleClass("g-active", isOutlined)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.toggle-outline")))
                        .on("click", function (clickEvent) {
                            (gDesigner.stats("layers_toggle_outline"), clickEvent.stopPropagation());
                            var outlineButton = $(this);
                            parentHidden ||
                                GEditor.GEditor.tryRunTransaction(
                                    node,
                                    function () {
                                        (node.setProperty("otl", !node.getProperty("otl")),
                                            outlineButton.toggleClass("gravit-icon-ellipse", node.getProperty("otl")),
                                            outlineButton.toggleClass("gravit-icon-circle", !node.getProperty("otl")));
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.toggle-outline"))
                                );
                        })
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.layer-toggle-outline-tooltip-title")),
                                learnMore:
                                    "/docs/organizing-your-designs/layer-groups/#extra-properties-of-the-layer-groups",
                            })
                        )
                        .appendTo(container);
                    $("<span></span>")
                        .addClass("layer-color")
                        .gPatternChooser({
                            types: [GObject.GColor],
                            hasOpacity: false,
                            asButton: false,
                            simplified: true,
                        })
                        .gPatternChooser("value", node.getProperty("cls"))
                        .on("patternchange", function (event, pattern, n, temporary) {
                            temporary ||
                                GEditor.GEditor.tryRunTransaction(
                                    node,
                                    function () {
                                        var oldColor = node.getProperty("cls");
                                        (node.setProperty("cls", pattern),
                                            node.acceptChildren(function (childNode) {
                                                if (childNode instanceof GObject.GLayer) {
                                                    var childColor = childNode.getProperty("cls");
                                                    GObject.GUtil.equals(childColor, oldColor) && childNode.setProperty("cls", pattern);
                                                }
                                            }));
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GLayerPanel", "action.change-layer-color"))
                                );
                        })
                        .on("chooseropen", function () {
                            panelData.options.patternChooserStatusChangeCallBack(true);
                        })
                        .on("chooserclose", function (event, t, n) {
                            panelData.options.patternChooserStatusChangeCallBack(false);
                        })
                        .appendTo(container);
                }
                container.contextmenu(
                    { context: contextMenuContexts.LayerPanel },
                    function (contextMenuEvent) {
                        if ($.inArray(node, gDesigner.getActiveDocument().getEditor().getSelection()) < 0) {
                            var panelData = $(this).data("glayerpanel");
                            panelData.options.clickCallback && panelData.options.clickCallback(node);
                        }
                        $(gDesigner.getWindows().getHtmlElement()).trigger("contextmenu", contextMenuEvent);
                    }.bind(this)
                );
            }
        }
        function insertTreeNodeBefore(treeId, referenceNode, expanded) {
            var newNode = new GVirtualTreeNodeNamed(treeId);
            return (expanded && (newNode.expanded = true), $(this).data("glayerpanel").vtree.insertNodeBefore(referenceNode, newNode), newNode);
        }
        function appendTreeNode(treeId, parentNode, expanded) {
            var newNode = new GVirtualTreeNodeNamed(treeId);
            return (expanded && (newNode.expanded = true), $(this).data("glayerpanel").vtree.appendNode(parentNode, newNode), newNode);
        }
        function removeTreeNode(treeNode) {
            $(this).data("glayerpanel").vtree.removeNode(treeNode);
        }
        function getSymbolAncestor(node) {
            do {
                if (node instanceof GObject.GSymbol) return node.isMaster() ? null : node;
                node = node.getParent();
            } while (node);
            return null;
        }
        function insertNodeIntoTree(node, skipParentCheck) {
            var treeId = GObject.GUtil.uuid(),
                panelData = $(this).data("glayerpanel"),
                vtree = panelData.vtree;
            if (
                !skipParentCheck &&
                node.getParent() &&
                node.getParent().hasMixin(GObject.GNode.Container) &&
                !(node.getParent() instanceof GObject.GScene) &&
                !(node.getParent() instanceof GObject.GPage) &&
                !getTreeIdByNode.call(this, node.getParent())
            )
                return;
            vtree.beginUpdate();
            const previousElement = (function (fromNode) {
                let prevSibling = fromNode.getPrevious();
                for (; prevSibling && !(prevSibling instanceof GObject.GElement); ) prevSibling = prevSibling.getPrevious();
                return prevSibling;
            })(node);
            var newTreeNode,
                previousTreeNode = previousElement ? getTreeNodeByNode.call(this, previousElement) : null;
            if (previousTreeNode) newTreeNode = insertTreeNodeBefore.call(this, treeId, previousTreeNode, node.hasFlag(GObject.GNode.Flag.Expanded));
            else {
                var parentNode = node.getParent(),
                    parentTreeNode = !parentNode || parentNode instanceof GObject.GScene || parentNode instanceof GObject.GPage ? null : getTreeNodeByNode.call(this, parentNode);
                newTreeNode = appendTreeNode.call(this, treeId, parentTreeNode, node.hasFlag(GObject.GNode.Flag.Expanded));
            }
            if (
                ((panelData.layersTreeNodeMap[treeId] = { element: null, node: node, treeNode: newTreeNode }),
                panelData.layersTreeNodeMapByNodes.set(node, {
                    element: null,
                    treeNode: newTreeNode,
                    treeId: treeId,
                }),
                node.hasMixin(GObject.GNode.Container))
            )
                for (var childNode = node.getFirstChild(); null !== childNode; childNode = childNode.getNext())
                    (childNode instanceof GObject.GLayer || childNode instanceof GObject.GItem) && insertNodeIntoTree.call(this, childNode, skipParentCheck);
            vtree.endUpdate();
        }
        function removeNodeFromTree(node) {
            var treeNode = getTreeNodeByNode.call(this, node);
            treeNode && (removeTreeNode.call(this, treeNode), removeNodeMapping.call(this, node));
        }
        function shouldHandleEvent(panelData, node) {
            return !panelData.blockHandlers || !(!panelData.ignoreBlock || panelData.ignoreBlock !== node);
        }
        function afterSiblingUpdateHandler(event) {
            $(this).data("glayerpanel");
            var targetNode = event.targetNode;
            if (
                targetNode instanceof GObject.GLayer ||
                (targetNode instanceof GObject.GItem &&
                    !(
                        targetNode instanceof GObject.GPathBase &&
                        targetNode.getParent() &&
                        (targetNode.getParent() instanceof GObject.GPGEdge || targetNode.getParent() instanceof GObject.GCompoundPath.Paths)
                    ))
            )
                switch (event.type) {
                    case GObject.GSymbol.AfterSiblingUpdate.INSERT:
                        insertNodeIntoTree.call(this, targetNode);
                        break;
                    case GObject.GSymbol.AfterSiblingUpdate.REMOVE:
                        removeNodeFromTree.call(this, targetNode);
                }
        }
        function afterNodeInsertHandler(event) {
            shouldHandleEvent($(this).data("glayerpanel"), event.node) &&
                (event.node instanceof GObject.GLayer ||
                    (event.node instanceof GObject.GItem &&
                        !(
                            event.node instanceof GObject.GPathBase &&
                            event.node.getParent() &&
                            (event.node.getParent() instanceof GObject.GPGEdge || event.node.getParent() instanceof GObject.GCompoundPath.Paths)
                        ) &&
                        !(function (node) {
                            var scene = node.getScene();
                            if (scene) {
                                var nodePage = node.getPage(),
                                    activePage = scene.getActivePage();
                                if (activePage && nodePage && nodePage !== activePage) return true;
                            }
                            return false;
                        })(event.node))) &&
                insertNodeIntoTree.call(this, event.node);
        }
        function beforeNodeRemoveHandler(event) {
            shouldHandleEvent($(this).data("glayerpanel"), event.node) && (event.node instanceof GObject.GLayer || event.node instanceof GObject.GItem) && removeNodeFromTree.call(this, event.node);
        }
        function afterPropertiesChangeHandler(event) {
            event.temporary ||
                (!$(this).data("glayerpanel").blockHandlers &&
                    (event.properties.some((propertyName) => watchedPropertyNames.indexOf(propertyName) >= 0) || getSymbolAncestor(event.node)) &&
                    (event.node instanceof GObject.GLayer || event.node instanceof GObject.GItem) &&
                    $(this).data("glayerpanel").vtree.requestInvalidation());
        }
        function fontAvailableHandler() {
            $(this).data("glayerpanel").vtree.requestInvalidation();
        }
        function settingChangedHandler(event) {
            "touch" === event.key && panelMethods._updateLayout.call(this);
        }
        function afterFlagChangeHandler(event) {
            var panelData = $(this).data("glayerpanel"),
                vtree = $(this).data("glayerpanel").vtree;
            let { onlyUpdateStyle } = panelData;
            if (shouldHandleEvent(panelData, event.node)) {
                var needsInvalidate = false;
                if (event.node instanceof GObject.GLayer || event.node instanceof GObject.GItem)
                    if (
                        event.flag === GObject.GElement.Flag.Hidden ||
                        event.flag === GObject.GElement.Flag.PartialLocked ||
                        event.flag === GObject.GElement.Flag.FullLocked ||
                        event.flag === GObject.GNode.Flag.Selected ||
                        event.flag === GObject.GNode.Flag.Active
                    ) {
                        var nodePage = event.node.getPage(),
                            nodeScene = event.node.getScene(),
                            activePage = nodeScene && nodeScene.getActivePage();
                        (activePage && nodePage && activePage !== nodePage) || ((needsInvalidate = true), onlyUpdateStyle || (onlyUpdateStyle = event.flag === GObject.GNode.Flag.Active));
                    } else if (!panelData.blockHighlight && event.flag === GObject.GNode.Flag.Highlighted) {
                        var node = event.node,
                            isNodeVisible = function (node) {
                                var treeNode = getTreeNodeByNode.call(this, node);
                                return treeNode && treeNode.isVisible();
                            }.bind(this);
                        (isNodeVisible(node) || node.findParent(isNodeVisible)) && (needsInvalidate = true);
                    }
                if (
                    gDesigner.getSetting("auto_expand_layers") &&
                    event.flag === GObject.GNode.Flag.Selected &&
                    event.node &&
                    event.node.hasFlag(GObject.GNode.Flag.Selected)
                ) {
                    var focusTreeNode = getTreeNodeByNode.call(this, event.node);
                    focusTreeNode && (vtree.expandAndFocus(focusTreeNode, needsInvalidate) ? (panelData.currentFocus = focusTreeNode) : (needsInvalidate = true));
                }
                (event.node instanceof GObject.GPage && event.flag === GObject.GNode.Flag.Active && (resetTree.call(this), rebuildTree.call(this), (needsInvalidate = false)),
                    needsInvalidate &&
                        (onlyUpdateStyle
                            ? setTimeout((t) => {
                                  updateSelectionClasses.call(this, event.node);
                              })
                            : vtree.requestInvalidation()));
            }
        }
        function rebuildTree() {
            var panelData = $(this).data("glayerpanel");
            if ((panelData.vtree.beginUpdate(), panelData.scene && panelData.scene.getActivePage()))
                for (var childNode = panelData.scene.getActivePage().getFirstChild(); null !== childNode; childNode = childNode.getNext())
                    (childNode instanceof GObject.GLayer || childNode instanceof GObject.GItem) && insertNodeIntoTree.call(this, childNode, true);
            (panelData.vtree.endUpdate(), updateTouchHeight.call(this));
        }
        function updateTouchHeight() {
            gDesigner.isTouchEnabled() &&
                $(this)
                    .parent()
                    .css("height", parseInt($(this).find(".vscroller").css("height"), 10) + VTREE_FREE_HEIGHT + "px");
        }
        function resetTree() {
            var panelData = $(this).data("glayerpanel");
            (panelData.vtree.clean(), (panelData.layersTreeNodeMap = {}), (panelData.layersTreeNodeMapByNodes = new Map()));
        }
        function updateSelectionClasses(node) {
            $(this).data("glayerpanel");
            var treeId = getTreeIdByNode.call(this, node);
            if (!treeId) return null;
            var treeEntry = getTreeEntryById.call(this, treeId);
            if (!treeEntry) return null;
            var titleGroupElement = treeEntry.element,
                containerElement = titleGroupElement.parent(),
                hasSelection = false;
            if (node.hasMixin(GObject.GNode.Container))
                for (var childNode = node.getFirstChild(); null !== childNode && !hasSelection; childNode = childNode.getNext())
                    childNode instanceof GObject.GItem && childNode.hasFlag(GObject.GNode.Flag.Selected) && (hasSelection = true);
            (node.getParent() && node instanceof GObject.GItem && updateSelectionClasses.call(this, node.getParent()),
                containerElement
                    .toggleClass("g-active", node.hasFlag(GObject.GNode.Flag.Active))
                    .toggleClass("g-selected", node.hasFlag(GObject.GNode.Flag.Selected))
                    .toggleClass("g-has-selection", hasSelection),
                titleGroupElement.toggleClass("g-selected", node.hasFlag(GObject.GNode.Flag.Selected)));
        }
        GObject.GObject.inheritAndMix(GLayerPanel, GObject.GObject);
        var panelMethods = {
            init: function (options) {
                return (
                    (options = $.extend(
                        {
                            nodeStyle: "layer-row",
                            expandStyle: "layer-arrow gravit-icon-right",
                            collapseStyle: "layer-arrow gravit-icon-down",
                            freeHeight: VTREE_FREE_HEIGHT,
                            insertIntoStyle: "g-drop",
                            upSeparatorSpan1Style: "g-up-separator-span1",
                            upSeparatorSpan2Style: "g-up-separator-span2",
                            downSeparatorSpan1Style: "g-down-separator-span1",
                            downSeparatorSpan2Style: "g-down-separator-span2",
                            renderer: renderLayerItem.bind(this),
                            expandRenderer: expandIconRenderer.bind(this),
                            separatorRenderer: null,
                            canDropCallback: defaultCanDrop.bind(this),
                            moveCallback: null,
                            isDuplicateEffectCallback: null,
                            duplicateCallback: null,
                            clickCallback: null,
                            startDraggingCallback: null,
                            patternChooserStatusChangeCallBack: null,
                        },
                        options
                    )),
                    this.each(function () {
                        $(this)
                            .addClass("g-layer-panel")
                            .data("glayerpanel", {
                                vtree: new GVirtualTree(
                                    this,
                                    renderNodeAdapter.bind(this),
                                    options.nodeStyle,
                                    options.expandRenderer ? options.expandRenderer : null,
                                    options.expandStyle == options.collapseStyle ? options.expandStyle : null,
                                    options.separatorRenderer ? options.separatorRenderer : null,
                                    options.freeHeight,
                                    options.insertIntoStyle,
                                    canDropAdapter.bind(this),
                                    moveAdapter.bind(this),
                                    options.isDuplicateEffectCallback,
                                    duplicateAdapter.bind(this),
                                    clickAdapter.bind(this),
                                    expandAdapter.bind(this),
                                    options.upSeparatorSpan1Style,
                                    options.upSeparatorSpan2Style,
                                    options.downSeparatorSpan1Style,
                                    options.downSeparatorSpan2Style,
                                    false,
                                    15,
                                    21
                                ),
                                options: options,
                                layersTreeNodeMap: {},
                                layersTreeNodeMapByNodes: new Map(),
                                scene: null,
                                currentFocus: null,
                            });
                    })
                );
            },
            refresh: function () {
                $(this).data("glayerpanel").vtree.refresh();
            },
            relayout: function () {
                var panelData = $(this).data("glayerpanel"),
                    vtree = panelData.vtree,
                    currentFocusNode = panelData.currentFocus;
                (currentFocusNode && vtree.expandAndFocus(currentFocusNode), vtree.requestInvalidation());
            },
            scene: function (scene) {
                var panelElement = $(this),
                    panelData = panelElement.data("glayerpanel");
                if (!arguments.length) return panelData.scene;
                if (scene !== panelData.scene) {
                    if (panelData.scene && panelData.scene.hasMixin(GObject.GEventTarget))
                        (panelData.scene.removeEventListener(GObject.GNode.AfterInsertEvent, panelData.afterNodeInsertHandler, this),
                            panelData.scene.removeEventListener(GObject.GNode.BeforeRemoveEvent, panelData.beforeNodeRemoveHandler, this),
                            panelData.scene.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, panelData.afterPropertiesChangeHandler, this),
                            panelData.scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, panelData.afterFlagChangeHandler, this),
                            panelData.scene.removeEventListener(GObject.GSymbol.AfterSiblingUpdate, panelData.afterSiblingUpdate, this),
                            gDesigner.removeEventListener(GSettingChangedEvent.default, panelData.settingChangedEvent, this),
                            (workspace = panelData.scene.getWorkspace()) &&
                                workspace.getFontManager().removeEventListener(GObject.GFontManager.FontAvailableEvent, panelData.fontAvailableEvent, this));
                    if ((resetTree.call(this), (panelData.scene = scene), panelData.scene)) {
                        var workspace;
                        if (panelData.scene.hasMixin(GObject.GEventTarget))
                            ((panelData.afterNodeInsertHandler = afterNodeInsertHandler.bind(this)),
                                (panelData.beforeNodeRemoveHandler = beforeNodeRemoveHandler.bind(this)),
                                (panelData.afterPropertiesChangeHandler = afterPropertiesChangeHandler.bind(this)),
                                (panelData.afterFlagChangeHandler = afterFlagChangeHandler.bind(this)),
                                (panelData.afterSiblingUpdate = afterSiblingUpdateHandler.bind(this)),
                                (panelData.fontAvailableEvent = fontAvailableHandler.bind(this)),
                                (panelData.settingChangedEvent = settingChangedHandler.bind(this)),
                                panelData.scene.addEventListener(GObject.GSymbol.AfterSiblingUpdate, panelData.afterSiblingUpdate, this),
                                panelData.scene.addEventListener(GObject.GNode.AfterInsertEvent, panelData.afterNodeInsertHandler, this),
                                panelData.scene.addEventListener(GObject.GNode.BeforeRemoveEvent, panelData.beforeNodeRemoveHandler, this),
                                panelData.scene.addEventListener(GObject.GNode.AfterPropertiesChangeEvent, panelData.afterPropertiesChangeHandler, this),
                                panelData.scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, panelData.afterFlagChangeHandler, this),
                                gDesigner.addEventListener(GSettingChangedEvent.default, panelData.settingChangedEvent, this),
                                (workspace = panelData.scene.getWorkspace()) &&
                                    workspace.getFontManager().addEventListener(GObject.GFontManager.FontAvailableEvent, panelData.fontAvailableEvent, this));
                        (rebuildTree.call(this), panelMethods._updateLayout.call(this));
                    }
                }
                return this;
            },
            blockHandlers: function (value) {
                $(this).data("glayerpanel").blockHandlers = !!value;
            },
            onlyUpdateStyle: function (value) {
                $(this).data("glayerpanel").onlyUpdateStyle = !!value;
            },
            ignoreBlock: function (node) {
                $(this).data("glayerpanel").ignoreBlock = node;
            },
            setBlockHighlight: function (value) {
                $(this).data("glayerpanel").blockHighlight = !!value;
            },
            getLastVisitedDroppable: function () {
                return $(this).data("glayerpanel").vtree.getLastVisitedDroppable();
            },
            getTreeNode: function (node) {
                var treeNode = null;
                return ($(this).data("glayerpanel") && (treeNode = getTreeNodeByNode.call(this, node)), treeNode);
            },
            getItem: function (treeNode) {
                return getNodeById.call(this, treeNode.id);
            },
            getTitleOfLayer: function (rowElement) {
                return rowElement.children(".layer-title-group");
            },
            getSelected: function () {
                return $(this).children(".g-selected");
            },
            toggleLockStatusOfLayerOrItem: function (node) {
                gDesigner.stats("layers_change_locktype");
                const { parentLockType } = (0, layerItemUtils.getLayerOrItemStatus)(node);
                if (!parentLockType || parentLockType === GObject.GBlock.LockType.Partial) {
                    let lockType = node.getProperty("lkt");
                    const programLockFlags = node.getProperty("plkt");
                    if (
                        (lockType
                            ? programLockFlags &
                                  (GObject.GBlock.ProgramLck.NoEdit |
                                      GObject.GBlock.ProgramLck.NoMove |
                                      GObject.GBlock.ProgramLck.NoNewChildren |
                                      GObject.GBlock.ProgramLck.NoDelete) || (lockType = null)
                            : (lockType = GObject.GBlock.LockType.Full),
                        parentLockType !== GObject.GBlock.LockType.Partial || null !== lockType)
                    ) {
                        const nodesToLock = [];
                        if (GPlatform.GPlatform.modifiers.optionKey) {
                            for (let siblingNode = node.getParent().getFirstChild(); null != siblingNode; siblingNode = siblingNode.getNext()) {
                                const siblingLockType = siblingNode.getProperty("lkt");
                                lockType === siblingLockType || (siblingLockType === GObject.GBlock.LockType.Full && lockType === GObject.GBlock.LockType.Partial) || nodesToLock.push(siblingNode);
                            }
                        } else nodesToLock.push(node);
                        nodesToLock.length &&
                            GEditor.GEditor.tryRunTransaction(
                                node,
                                function () {
                                    for (let e = 0; e < nodesToLock.length; ++e)
                                        (lockType === GObject.GBlock.LockType.Full &&
                                            nodesToLock[e].accept((descendant) => {
                                                descendant.removeFlag(GObject.GNode.Flag.Selected);
                                            }),
                                            nodesToLock[e].setProperty("lkt", lockType));
                                },
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock"))
                            );
                    }
                }
            },
            toggleHideStatusOfLayerOrItem: function (node) {
                gDesigner.stats("layers_toggle_visibility");
                const { parentHidden: parentHidden } = (0, layerItemUtils.getLayerOrItemStatus)(node);
                if (!parentHidden) {
                    const newVisibility = !node.getProperty("vis"),
                        nodesToToggle = [];
                    if (GPlatform.GPlatform.modifiers.optionKey) {
                        for (let siblingNode = node.getParent().getFirstChild(); null != siblingNode; siblingNode = siblingNode.getNext()) {
                            const siblingVisibility = siblingNode.getProperty("vis");
                            null !== siblingVisibility && siblingVisibility !== newVisibility && nodesToToggle.push(siblingNode);
                        }
                    } else nodesToToggle.push(node);
                    GEditor.GEditor.tryRunTransaction(
                        node,
                        function () {
                            for (let e = 0; e < nodesToToggle.length; ++e) (nodesToToggle[e].removeFlag(GObject.GNode.Flag.Highlighted), nodesToToggle[e].setProperty("vis", newVisibility));
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility"))
                    );
                }
            },
            resetVTreeRowHeight: function (node) {
                $(this).data("glayerpanel").vtree.resetRowHeight(node);
            },
            getCurrentFocusedNode: function () {
                return $(this).data("glayerpanel").currentFocus;
            },
            setCurrentFocusedNode: function (node) {
                $(this).data("glayerpanel").currentFocus = node;
            },
            _updateLayout: function () {
                const panelData = $(this).data("glayerpanel"),
                    vtree = panelData && panelData.vtree;
                if (vtree) {
                    const isTouch = gDesigner.isTouchEnabled();
                    (vtree.setFreeHeight(isTouch ? VTREE_FREE_HEIGHT_TOUCH : VTREE_FREE_HEIGHT), vtree.setAnimatedDragEnabled(isTouch));
                }
            },
        };
        ((module.exports = GLayerPanel),
            ($.fn.gLayerPanel = function (methodName) {
                return panelMethods[methodName]
                    ? panelMethods[methodName].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof methodName && methodName
                      ? void $.error("Method " + methodName + " does not exist on jQuery.myPlugin")
                      : panelMethods.init.apply(this, arguments);
            }));
    };
