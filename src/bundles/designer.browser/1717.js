module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(57), require(91 /* polyfill:String */), require(4), require(13), require(26));
        var editorModule = require(53),
            GObject = require(1),
            dragMode = (require(15 /* GPlatform */), _interopRequireDefault(require(565))),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            GSettingChangedEvent = _interopRequireDefault(require(135)),
            GVirtualTree = require(451 /* GVirtualTree */).GVirtualTree,
            GVirtualTreeNodeNamed = (require(451 /* GVirtualTree */).GVirtualTreeNode, require(451 /* GVirtualTree */).GVirtualTreeNodeNamed),
            { VTREE_FREE_HEIGHT, VTREE_FREE_HEIGHT_TOUCH } = require(10 /* designerConfig */),
            menuContextIds = (require(173), require(450));
        function GPagePanel() {}
        function vtreeCanDropHandler(targetItem, referenceItem, n, draggedItems, allowedItems) {
            var canDrop = true,
                panelData = $(this).data("gpagepanel");
            if (panelData.options.canDropCallback) {
                for (
                    var targetNode = targetItem.id ? getNodeById.call(this, targetItem.id) : $(this).data("gpagepanel").scene, referenceNode = referenceItem ? getNodeById.call(this, referenceItem.id) : null, draggedNodes = [], d = 0;
                    d < draggedItems.length;
                    ++d
                )
                    draggedNodes.push(getNodeById.call(this, draggedItems[d].id));
                var allowedIndices = [];
                if ((canDrop = panelData.options.canDropCallback(targetNode, referenceNode, draggedNodes, allowedIndices)))
                    for (d = 0; d < allowedIndices.length; ++d) {
                        var p = allowedIndices[d];
                        allowedItems.push(draggedItems[p]);
                    }
            }
            return canDrop;
        }
        function defaultCanDropValidator(targetNode, referenceNode, draggedNodes, allowedIndices) {
            if (!draggedNodes || !draggedNodes.length || !targetNode) return false;
            var canInsert = true;
            if (gDesigner.getApplicationManager().isEditingEnabled()) {
                for (var a = 0; a < draggedNodes.length && canInsert; ++a) (canInsert = !targetNode.isLocked() && draggedNodes[a] && draggedNodes[a].validateInsertion(targetNode, referenceNode)) && allowedIndices.push[a];
                return canInsert;
            }
        }
        function vtreeMoveHandler(targetItem, referenceItem, n, draggedItems) {
            var panelData = $(this).data("gpagepanel");
            if (panelData.options.moveCallback) {
                for (
                    var targetNode = targetItem.id ? getNodeById.call(this, targetItem.id) : $(this).data("gpagepanel").scene, referenceNode = referenceItem ? getNodeById.call(this, referenceItem.id) : null, draggedNodes = [], l = 0;
                    l < draggedItems.length;
                    ++l
                )
                    draggedNodes.push(getNodeById.call(this, draggedItems[l].id));
                panelData.options.moveCallback(targetNode, referenceNode, draggedNodes);
            }
        }
        function vtreeClickHandler(item) {
            var panelData = $(this).data("gpagepanel");
            if (panelData.options.clickCallback) {
                var node = getNodeById.call(this, item.id);
                panelData.options.clickCallback(node);
            }
        }
        function vtreeRenderHandler(item, element) {
            var panelData = $(this).data("gpagepanel");
            (panelData.options.renderer && panelData.options.renderer(item.id, element), updateTouchPanelHeight.call(this));
        }
        function getNodeById(treeId) {
            var entry = $(this).data("gpagepanel").pagesTreeNodeMap[treeId];
            return entry ? entry.node : null;
        }
        function getTreeEntryById(treeId) {
            return $(this).data("gpagepanel").pagesTreeNodeMap[treeId];
        }
        function getTreeNodeByNode(node) {
            var entry = $(this).data("gpagepanel").pagesTreeNodeMapByNodes.get(node);
            return entry ? entry.treeNode : null;
        }
        function removePageMapEntries(rootNode) {
            var treeNodeMap = $(this).data("gpagepanel").pagesTreeNodeMap,
                treeNodeMapByNodes = $(this).data("gpagepanel").pagesTreeNodeMapByNodes;
            rootNode.accept(
                function (node) {
                    if (node instanceof GObject.GPage) {
                        var entry = treeNodeMapByNodes.get(node);
                        entry && (treeNodeMapByNodes.delete(node), (treeNodeMap[entry.treeId] = null));
                    }
                }.bind(this)
            );
        }
        function renderPageRow(treeId, rowElement) {
            var panelData = $(this).data("gpagepanel"),
                entry = getTreeEntryById.call(this, treeId),
                pageNode = entry.node;
            if (pageNode) {
                if (!(pageNode instanceof GObject.GPage)) throw new Error("item not page");
                var lockType = pageNode.getProperty("lkt"),
                    isMaster = !!pageNode.getSlavePages().length,
                    isInfinitePage = 0 === pageNode.getProperty("w") && 0 === pageNode.getProperty("h"),
                    row = $(rowElement);
                row.attr("draggable", false)
                    .on("mouseenter", function () {
                        pageNode.getProperty("w") && !pageNode.hasFlag(GObject.GElement.Flag.Hidden) && pageNode.setFlag(GObject.GNode.Flag.Highlighted);
                    })
                    .on("mouseleave", function () {
                        pageNode.getProperty("w") && !pageNode.hasFlag(GObject.GElement.Flag.Hidden) && pageNode.removeFlag(GObject.GNode.Flag.Highlighted);
                    });
                var titleGroup = $("<span></span>").addClass("page-title-group");
                (titleGroup.appendTo(row), (entry.element = titleGroup));
                var pageName = pageNode.getProperty("name");
                ((pageName = pageName || pageNode.getNodeNameTranslated()), isMaster && !gDesigner.isTouchEnabled() && (pageName += " (master)"));
                var titleSpan = $("<span></span>").html(pageName);
                titleSpan.addClass("page-title").appendTo(titleGroup);
                var panelElement = this;
                (pageNode.hasFlag(GObject.GElement.Flag.PartialLocked) ||
                    titleGroup
                        .attr("draggable", true)
                        .attr("data-drag-mode", dragMode.default.PRESS_AND_HOLD)
                        .on("dragstart", function (e) {
                            if (panelData.options.startDraggingCallback) {
                                var draggedNodes = panelData.options.startDraggingCallback(pageNode);
                                if (draggedNodes && draggedNodes.length) {
                                    $(this).addClass("g-dragging");
                                    var dragLabel = "",
                                        nodeName = draggedNodes[0].getProperty("name");
                                    (nodeName = nodeName || draggedNodes[0].getNodeNameTranslated()) && (dragLabel = nodeName);
                                    for (var a = 1; a < draggedNodes.length; ++a)
                                        (nodeName = (nodeName = draggedNodes[a].getProperty("name")) || draggedNodes[a].getNodeNameTranslated()) && (dragLabel += ", " + nodeName);
                                    dragLabel.length && $(titleSpan).html(dragLabel);
                                    var vtree = panelData.vtree,
                                        dragTreeNodes = [];
                                    for (a = 0; a < draggedNodes.length; ++a) {
                                        var c = getTreeNodeByNode.call(panelElement, draggedNodes[a]);
                                        c && dragTreeNodes.push(c);
                                    }
                                    (vtree.setDragNodes(dragTreeNodes),
                                        setTimeout(
                                            function () {
                                                ($(this).removeClass("g-dragging"), $(titleSpan).html(pageName));
                                            }.bind(this),
                                            0
                                        ));
                                } else $(this).attr("draggable", false);
                            }
                        }),
                    row.toggleClass("g-active", pageNode.hasFlag(GObject.GNode.Flag.Active)),
                    panelData.blockHighlight || row.toggleClass("g-highlighted-row", pageNode.hasFlag(GObject.GNode.Flag.Highlighted)),
                    !lockType &&
                        gDesigner.getApplicationManager().isEditingEnabled() &&
                        $(titleGroup).gAutoEdit({
                            textSelector: "> .page-title",
                            getContainer: function () {
                                return getTreeEntryById.call(panelElement, treeId).element;
                            },
                            submitCallback: function (newName) {
                                newName &&
                                    "" !== newName.trim() &&
                                    editorModule.GEditor.tryRunTransaction(
                                        pageNode,
                                        function () {
                                            pageNode.setProperty("name", newName);
                                        },
                                        GObject.GLocale.get(new GObject.GLocaleKey("GPagePanel", "action.rename-page"))
                                    );
                            },
                        }));
                var pageIcon = $("<span></span>").addClass("page-icon gravit-icon-page").insertBefore(titleSpan);
                gDesigner.isTouchEnabled() &&
                    (isInfinitePage
                        ? (pageIcon.toggleClass("gravit-icon-page-infinity", true), pageIcon.toggleClass("gravit-icon-page", false))
                        : isMaster && (pageIcon.toggleClass("gravit-icon-page-master", true), pageIcon.toggleClass("gravit-icon-page", false)));
                var lockIconClass = lockType ? "gravit-icon-lock" : "gravit-icon-unlock";
                ((lockIconClass = gDesigner.isTouchEnabled() ? lockIconClass + "-small" : lockIconClass),
                    $("<span></span>")
                        .addClass("page-action page-lock " + lockIconClass)
                        .toggleClass("g-active", !!lockType)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock")))
                        .on("click", function (event) {
                            (gDesigner.stats("pages_change_lock"), event.stopPropagation());
                            var newLockType = pageNode.getProperty("lkt");
                            ((newLockType = newLockType ? null : GObject.GBlock.LockType.Full),
                                editorModule.GEditor.tryRunTransaction(
                                    pageNode,
                                    function () {
                                        if ((pageNode.setProperty("lkt", newLockType), newLockType === GObject.GBlock.LockType.Full)) {
                                            panelData.scene.setProperty("edit", false);
                                            var activeDocument = gDesigner.getActiveDocument();
                                            activeDocument && activeDocument.getEditor().clearSelection();
                                        } else panelData.scene.setProperty("edit", true);
                                    },
                                    GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock"))
                                ));
                        })
                        .appendTo(row)
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.page-toggle-lock-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.page-toggle-lock-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/pages/#page-panel",
                            })
                        ));
                var isHidden = false === pageNode.getProperty("vis");
                row.toggleClass("page-hiden", isHidden);
                var visibilityIconClass = isHidden ? "gravit-icon-hide" : "gravit-icon-display";
                ((visibilityIconClass = gDesigner.isTouchEnabled() ? visibilityIconClass + "-small" : visibilityIconClass),
                    $("<span></span>")
                        .addClass("page-action page-visibility " + visibilityIconClass)
                        .toggleClass("g-active", isHidden)
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility")))
                        .on("click", function (event) {
                            (gDesigner.stats("pages_change_visibility"), event.stopPropagation());
                            var newVisibility = !pageNode.getProperty("vis");
                            editorModule.GEditor.tryRunTransaction(
                                pageNode,
                                function () {
                                    pageNode.setProperty("vis", newVisibility);
                                },
                                GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility"))
                            );
                        })
                        .appendTo(row)
                        .gRichTooltip(
                            richTooltipModule.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.page-toggle-visibility-tooltip-title")),
                                description: GObject.GLocale.get(
                                    new GObject.GLocaleKey("GCommonNames", "text.page-toggle-visibility-tooltip-description")
                                ),
                                learnMore: "/docs/organizing-your-designs/pages/#page-panel",
                            })
                        ),
                    row.contextmenu(
                        { context: menuContextIds.PagePanel },
                        function (event) {
                            ($(this).data("gpagepanel").scene.setActivePage(pageNode),
                                $(gDesigner.getWindows().getHtmlElement()).trigger("contextmenu", event));
                        }.bind(this)
                    ));
            }
        }
        function insertTreeNodeBefore(treeId, beforeTreeNode) {
            var treeNode = new GVirtualTreeNodeNamed(treeId);
            return ($(this).data("gpagepanel").vtree.insertNodeBefore(beforeTreeNode, treeNode), treeNode);
        }
        function appendTreeNode(treeId, parentTreeNode) {
            var treeNode = new GVirtualTreeNodeNamed(treeId);
            return ($(this).data("gpagepanel").vtree.appendNode(parentTreeNode, treeNode), treeNode);
        }
        function removeTreeNode(treeNode) {
            $(this).data("gpagepanel").vtree.removeNode(treeNode);
        }
        function addPageTreeNode(pageNode) {
            var nextPageNode,
                newTreeNode,
                treeId = GObject.GUtil.uuid(),
                panelData = $(this).data("gpagepanel"),
                vtree = panelData.vtree;
            for (vtree.beginUpdate(), nextPageNode = pageNode.getNext(); nextPageNode && !(nextPageNode instanceof GObject.GPage); nextPageNode = nextPageNode.getNext());
            var nextTreeNode = nextPageNode ? getTreeNodeByNode.call(this, nextPageNode) : null;
            ((newTreeNode = nextTreeNode ? insertTreeNodeBefore.call(this, treeId, nextTreeNode) : appendTreeNode.call(this, treeId, null)),
                (panelData.pagesTreeNodeMap[treeId] = { node: pageNode, treeNode: newTreeNode, element: null }),
                panelData.pagesTreeNodeMapByNodes.set(pageNode, {
                    element: null,
                    treeNode: newTreeNode,
                    treeId: treeId,
                }),
                vtree.endUpdate());
        }
        function removePageTreeNode(pageNode) {
            var treeNode = getTreeNodeByNode.call(this, pageNode);
            treeNode && (removeTreeNode.call(this, treeNode), removePageMapEntries.call(this, pageNode));
        }
        function afterNodeInsertHandler(event) {
            !$(this).data("gpagepanel").blockHandlers && event.node instanceof GObject.GPage && addPageTreeNode.call(this, event.node);
        }
        function beforeNodeRemoveHandler(event) {
            !$(this).data("gpagepanel").blockHandlers && event.node instanceof GObject.GPage && removePageTreeNode.call(this, event.node);
        }
        function afterPropertiesChangeHandler(event) {
            if (!event.temporary && !$(this).data("gpagepanel").blockHandlers && (event.node instanceof GObject.GPage || event.node instanceof GObject.GScene)) {
                if (event.node instanceof GObject.GScene && 1 === event.properties.length && "pi" === event.properties[0]) return;
                $(this).data("gpagepanel").vtree.requestInvalidation();
            }
        }
        function focusActiveRow(treeNode) {
            if (!treeNode) return;
            $(this).find(".page-row.g-active").removeClass("g-active");
            const entry = getTreeEntryById.call(this, treeNode.id),
                element = entry && entry.element;
            element && $(element).closest(".page-row").addClass("g-active");
        }
        function afterFlagChangeHandler(event) {
            var panelData = $(this).data("gpagepanel"),
                vtree = $(this).data("gpagepanel").vtree;
            if (!panelData.blockHandlers && event.node instanceof GObject.GPage)
                if (
                    event.flag === GObject.GElement.Flag.Hidden ||
                    event.flag === GObject.GElement.Flag.PartialLocked ||
                    event.flag === GObject.GElement.Flag.FullLocked ||
                    event.flag === GObject.GNode.Flag.Active
                ) {
                    var scene = event.node.getScene(),
                        activePage = scene && scene.getActivePage();
                    if (activePage && activePage == event.node && event.set) {
                        var treeNode = getTreeNodeByNode.call(this, event.node);
                        (vtree.expandAndFocus(treeNode, true), event.flag === GObject.GNode.Flag.Active ? focusActiveRow.call(this, treeNode) : vtree.requestInvalidation());
                    }
                } else panelData.blockHighlight || event.flag !== GObject.GNode.Flag.Highlighted || vtree.requestInvalidation();
        }
        function settingChangedHandler(event) {
            "touch" === event.key && pagePanelMethods._updateLayout.call(this);
        }
        function updateTouchPanelHeight() {
            gDesigner.isTouchEnabled() &&
                $(this)
                    .parent()
                    .css("height", parseInt($(this).find(".vscroller").css("height"), 10) + VTREE_FREE_HEIGHT + "px");
        }
        function resetPagePanelState() {
            var panelData = $(this).data("gpagepanel");
            (panelData.vtree.clean(), (panelData.pagesTreeNodeMap = {}), (panelData.pagesTreeNodeMapByNodes = new Map()), (panelData.scene = null));
        }
        GObject.GObject.inheritAndMix(GPagePanel, GObject.GObject);
        var pagePanelMethods = {
            init: function (options) {
                return (
                    (options = $.extend(
                        {
                            nodeStyle: "page-row",
                            collapseStyle: "page-arrow gravit-icon-down",
                            freeHeight: VTREE_FREE_HEIGHT,
                            insertIntoStyle: "g-drop",
                            upSeparatorSpan1Style: "g-up-separator-span1",
                            upSeparatorSpan2Style: "g-up-separator-span2",
                            downSeparatorSpan1Style: "g-down-separator-span1",
                            downSeparatorSpan2Style: "g-down-separator-span2",
                            renderer: renderPageRow.bind(this),
                            separatorRenderer: null,
                            canDropCallback: defaultCanDropValidator.bind(this),
                            moveCallback: null,
                            clickCallback: null,
                            startDraggingCallback: null,
                        },
                        options
                    )),
                    this.each(function () {
                        $(this)
                            .addClass("g-page-panel")
                            .data("gpagepanel", {
                                vtree: new GVirtualTree(
                                    this,
                                    vtreeRenderHandler.bind(this),
                                    options.nodeStyle,
                                    null,
                                    null,
                                    options.separatorRenderer ? options.separatorRenderer : null,
                                    options.freeHeight,
                                    options.insertIntoStyle,
                                    vtreeCanDropHandler.bind(this),
                                    vtreeMoveHandler.bind(this),
                                    null,
                                    null,
                                    vtreeClickHandler.bind(this),
                                    null,
                                    options.upSeparatorSpan1Style,
                                    options.upSeparatorSpan2Style,
                                    options.downSeparatorSpan1Style,
                                    options.downSeparatorSpan2Style,
                                    false,
                                    0,
                                    21
                                ),
                                options: options,
                                pagesTreeNodeMap: {},
                                pagesTreeNodeMapByNodes: new Map(),
                                scene: null,
                                currentFocus: null,
                            });
                    })
                );
            },
            refresh: function () {
                $(this).data("gpagepanel").vtree.refresh();
            },
            relayout: function () {
                var panelData = $(this).data("gpagepanel"),
                    vtree = panelData.vtree,
                    currentFocus = panelData.currentFocus;
                (currentFocus && vtree.expandAndFocus(currentFocus), vtree.requestInvalidation());
            },
            scene: function (newScene) {
                var panel = $(this),
                    panelData = panel.data("gpagepanel");
                if (!arguments.length) return panelData.scene;
                if (
                    newScene !== panelData.scene &&
                    (panelData.scene &&
                        panelData.scene.hasMixin(GObject.GEventTarget) &&
                        (panelData.scene.removeEventListener(GObject.GNode.AfterInsertEvent, panelData.afterNodeInsertHandler, this),
                        panelData.scene.removeEventListener(GObject.GNode.BeforeRemoveEvent, panelData.beforeNodeRemoveHandler, this),
                        panelData.scene.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, panelData.afterPropertiesChangeHandler, this),
                        panelData.scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, panelData.afterFlagChangeHandler, this),
                        gDesigner.removeEventListener(GSettingChangedEvent.default, panelData.settingChangedEvent, this)),
                    resetPagePanelState.call(this),
                    (panelData.scene = newScene),
                    panelData.scene)
                ) {
                    panelData.scene.hasMixin(GObject.GEventTarget) &&
                        ((panelData.afterNodeInsertHandler = afterNodeInsertHandler.bind(this)),
                        (panelData.beforeNodeRemoveHandler = beforeNodeRemoveHandler.bind(this)),
                        (panelData.afterPropertiesChangeHandler = afterPropertiesChangeHandler.bind(this)),
                        (panelData.afterFlagChangeHandler = afterFlagChangeHandler.bind(this)),
                        (panelData.settingChangedEvent = settingChangedHandler.bind(this)),
                        gDesigner.addEventListener(GSettingChangedEvent.default, panelData.settingChangedEvent, this),
                        panelData.scene.addEventListener(GObject.GNode.AfterInsertEvent, panelData.afterNodeInsertHandler, this),
                        panelData.scene.addEventListener(GObject.GNode.BeforeRemoveEvent, panelData.beforeNodeRemoveHandler, this),
                        panelData.scene.addEventListener(GObject.GNode.AfterPropertiesChangeEvent, panelData.afterPropertiesChangeHandler, this),
                        panelData.scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, panelData.afterFlagChangeHandler, this));
                    for (var child = panelData.scene.getLastChild(); null !== child; child = child.getPrevious()) child instanceof GObject.GPage && addPageTreeNode.call(this, child);
                    pagePanelMethods._updateLayout.call(this);
                }
                return this;
            },
            blockHandlers: function (block) {
                $(this).data("gpagepanel").blockHandlers = !!block;
            },
            getLastVisitedDroppable: function () {
                return $(this).data("gpagepanel").vtree.getLastVisitedDroppable();
            },
            setBlockHighlight: function (block) {
                $(this).data("gpagepanel").blockHighlight = !!block;
            },
            resetVTreeRowHeight: function (rowHeight) {
                $(this).data("gpagepanel").vtree.resetRowHeight(rowHeight);
            },
            _updateLayout: function () {
                const panelData = $(this).data("gpagepanel"),
                    vtree = panelData && panelData.vtree;
                if (vtree) {
                    const isTouchEnabled = gDesigner.isTouchEnabled();
                    (vtree.setFreeHeight(isTouchEnabled ? VTREE_FREE_HEIGHT_TOUCH : VTREE_FREE_HEIGHT), vtree.setAnimatedDragEnabled(isTouchEnabled));
                }
            },
        };
        ((module.exports = GPagePanel),
            ($.fn.gPagePanel = function (method) {
                return pagePanelMethods[method]
                    ? pagePanelMethods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof method && method
                      ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                      : pagePanelMethods.init.apply(this, arguments);
            }));
    };
