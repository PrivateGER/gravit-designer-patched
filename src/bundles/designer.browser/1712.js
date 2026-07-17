module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(19), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(107 /* polyfill:RegExp */), require(71 /* polyfill:String */), require(4), require(41), require(13), require(32), require(38), require(97), require(1175), require(33), require(26));
        var editorLib = require(53),
            GObject = require(1),
            collabApi = require(882),
            designerConfig = require(10),
            GInvalidationOptions = _interopRequireDefault(require(1354));
        const GSystemDialog = require(44),
            annotationService = require(358 /* GAnnotationsUtils */),
            GSimpleTree = require(1355),
            GAnnotationPanel = require(1713),
            GAnnotationReplyDocker = require(1357),
            GAnnotationRow = require(1356),
            UpdateResult = require(1279),
            GUser = require(177),
            watchedProperties = ["text"];
        function GAnnotationPanelWidget() {}
        function onNodeClick(nodeInfo) {
            var panelData = $(this).data("gannotationpanel");
            if (panelData.options.clickCallback) {
                var annot = getAnnotById.call(this, nodeInfo.id);
                panelData.options.clickCallback(annot);
            }
        }
        function onNodeExpand(nodeInfo) {
            getAnnotById.call(this, nodeInfo.id) && nodeInfo.expanded;
        }
        function renderTreeNode(nodeInfo, container) {
            var panelData = $(this).data("gannotationpanel");
            if (panelData.options.renderer) return panelData.options.renderer(nodeInfo.id, nodeInfo.virtualNode, container);
        }
        function renderExpandToggle(iconElement) {
            var panelElement = $(this);
            iconElement.id === GSimpleTree.COLLAPSE_ID
                ? $(iconElement).addClass(panelElement.data("gannotationpanel").options.collapseStyle)
                : iconElement.id === GSimpleTree.EXPAND_ID && $(iconElement).addClass(panelElement.data("gannotationpanel").options.expandStyle);
        }
        function getAnnotById(treeId) {
            var entry = $(this).data("gannotationpanel").annotTreeNodeMap[treeId];
            return entry ? entry.annot : null;
        }
        function getEntryById(treeId) {
            return $(this).data("gannotationpanel").annotTreeNodeMap[treeId];
        }
        function getTreeIdForNode(node) {
            var entry = $(this).data("gannotationpanel").annotTreeNodeMapByNodes.get(node);
            return entry ? entry.treeId : null;
        }
        function getTreeNodeForNode(node) {
            var entry = $(this).data("gannotationpanel").annotTreeNodeMapByNodes.get(node);
            return entry ? entry.treeNode : null;
        }
        function removeNodeMappings(node) {
            var treeIdMap = $(this).data("gannotationpanel").annotTreeNodeMap,
                nodeMap = $(this).data("gannotationpanel").annotTreeNodeMapByNodes;
            node.accept(
                function (visitedNode) {
                    var entry = nodeMap.get(visitedNode);
                    entry && (nodeMap.delete(visitedNode), (treeIdMap[entry.treeId] = null));
                }.bind(this)
            );
        }
        function getRelatedTreeIds(node) {
            var panelData = $(this).data("gannotationpanel"),
                treeIds = [];
            if (panelData.annotTreeNodeMap)
                for (var o in (node instanceof GObject.GComment && treeIds.push(getTreeIdForNode.call(this, node.getParent())), panelData.annotTreeNodeMap))
                    panelData.annotTreeNodeMap[o] &&
                        panelData.annotTreeNodeMap[o].annot &&
                        (panelData.annotTreeNodeMap[o].annot === node ||
                            (panelData.annotTreeNodeMap[o].annot instanceof GObject.GComment && panelData.annotTreeNodeMap[o].annot.getParent() === node)) &&
                        treeIds.push(o);
            return treeIds;
        }
        function canEditComments() {
            return (
                !!gDesigner.getApplicationManager().isCommentingEditingEnabled() ||
                (GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.document-approved-no-annotations-update"))), false)
            );
        }
        function runSyncCallback() {
            const panelData = $(this).data("gannotationpanel");
            if (panelData && panelData.syncCallback)
                try {
                    panelData.syncCallback();
                } finally {
                    panelData.syncCallback = null;
                }
        }
        function renderAnnotationRow(treeId, virtualNode, container) {
            const isCommentingEditingEnabled = gDesigner.getApplicationManager().isCommentingEditingEnabled();
            var panelData = $(this).data("gannotationpanel"),
                entry = getEntryById.call(this, treeId),
                annot = entry ? entry.annot : null,
                assignedUserRow = null;
            if (annot) {
                var isLastRow = false,
                    row = $(container);
                if (
                    (row.attr("draggable", false),
                    annot.hasMixin(GObject.GAnnotation) ? row.addClass("parent") : row.addClass("child"),
                    !panelData.showResolved &&
                        ((annot.hasMixin(GObject.GAnnotation) && annot.getProperty("rsv")) ||
                            (annot instanceof GObject.GComment && annot.getParent().getProperty("rsv"))))
                )
                    return void row.css("display", "none");
                if (
                    (row.hover(
                        () => getRelatedTreeIds.call(this, annot).forEach((relatedId) => $("#".concat(relatedId)).addClass("on-hover")),
                        () => getRelatedTreeIds.call(this, annot).forEach((relatedId) => $("#".concat(relatedId)).removeClass("on-hover"))
                    ),
                    !(annot.hasMixin(GObject.GAnnotation) ? annot : annot.getParent()).hasFlag(GObject.GNode.Flag.Selected) &&
                        ((annot.hasMixin(GObject.GAnnotation) && !getActiveComments(annot).length) || isLastComment(annot)) &&
                        (isLastRow = true),
                    !panelData.blockHighlight)
                ) {
                    var isHighlighted = annot.hasFlag(GObject.GNode.Flag.Highlighted);
                    (!isHighlighted &&
                        annot.hasMixin(GObject.GNode.Container) &&
                        (isHighlighted = annot.acceptChildren(
                            function (child) {
                                return child.hasFlag(GObject.GNode.Flag.Highlighted);
                            },
                            false,
                            true
                        )),
                        $(row).toggleClass("g-highlighted-row", isHighlighted));
                }
                var primaryTreeId = getPrimaryTreeId.call(this, annot),
                    primaryEntry = getEntryById.call(this, primaryTreeId);
                void 0 === primaryEntry.expanded && (primaryEntry.expanded = true);
                var activeDocument = gDesigner.getActiveDocument();
                activeDocument &&
                    annot.getId() === activeDocument.getFocusAnnotationId() &&
                    !activeDocument.isAnnotationFocused() &&
                    (activeDocument.getScene().updateActivePageForElem(primaryEntry.annot),
                    activeDocument.getScene().updateActiveLayerForElem(primaryEntry.annot),
                    activeDocument.setAnnotationFocused(),
                    (primaryEntry.expanded = true),
                    primaryEntry.annot.setFlag(GObject.GNode.Flag.Selected));
                var relatedCount = countRelatedTreeIds.call(this, annot);
                annot.hasMixin(GObject.GAnnotation) && (assignedUserRow = renderAssignedUser.call(this, annot, panelData.showResolved));
                var rowComponent = new GAnnotationRow({
                    isCommentingEditingEnable: isCommentingEditingEnabled,
                    container: row,
                    annotation: annot,
                    relatedNodesCount: relatedCount,
                    sidebarActive: panelData.sidebarActive,
                    isLastRow: isLastRow,
                    hasResolveAccess: panelData.vtree.hasResolveAccess(),
                    hasReopenAccess: panelData.vtree.hasReopenAccess(),
                    mentionData: panelData.vtree.getMentionData(),
                    onMouseEnter: () => {
                        annot.hasMixin(GObject.GAnnotation) && !annot.hasFlag(GObject.GAnnotation.Flag.Hidden) && annot.setFlag(GObject.GNode.Flag.Highlighted);
                    },
                    onMouseLeave: () => {
                        annot.hasMixin(GObject.GAnnotation) && !annot.hasFlag(GObject.GAnnotation.Flag.Hidden) && annot.removeFlag(GObject.GNode.Flag.Highlighted);
                    },
                    onChange: (text) => {
                        canEditComments() &&
                            (annot.getProperty("text") === text
                                ? runSyncCallback.call(this)
                                : editorLib.GEditor.tryRunTransaction(
                                      annot,
                                      function () {
                                          annot.setProperty("text", text);
                                      },
                                      GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.edit-comment"))
                                  ));
                    },
                    onToggleState: () => {
                        canEditComments() &&
                            (editorLib.GEditor.tryRunTransaction(
                                annot,
                                function () {
                                    (panelData.showResolved ||
                                        annot.getProperty("rsv") ||
                                        !annot.hasFlag(GObject.GNode.Flag.Selected) ||
                                        annot.removeFlag(GObject.GNode.Flag.Selected),
                                        annot.setProperty("rsv", !annot.getProperty("rsv")));
                                },
                                annot.getProperty("rsv")
                                    ? GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.reopen"))
                                    : GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.resolve"))
                            ),
                            resetState.call(this),
                            rebuildTree.call(this));
                    },
                    onResolve: () => {
                        canEditComments() &&
                            (editorLib.GEditor.tryRunTransaction(
                                annot,
                                function () {
                                    (!panelData.showResolved && annot.hasFlag(GObject.GNode.Flag.Selected) && annot.removeFlag(GObject.GNode.Flag.Selected),
                                        annot.setProperty("rsv", true));
                                },
                                GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.resolve"))
                            ),
                            resetState.call(this),
                            rebuildTree.call(this));
                    },
                    onReopen: () => {
                        canEditComments() &&
                            (editorLib.GEditor.tryRunTransaction(
                                annot,
                                function () {
                                    annot.setProperty("rsv", false);
                                },
                                GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.reopen"))
                            ),
                            resetState.call(this),
                            rebuildTree.call(this));
                    },
                    onDelete: () => {
                        canEditComments() &&
                            GSystemDialog.confirm(
                                GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.confirm-remove")),
                                (confirmed) => {
                                    confirmed &&
                                        annotationService.removeAnnotations(
                                            [annot],
                                            annot.getParent(),
                                            GObject.GLocale.get(
                                                new GObject.GLocaleKey(
                                                    "GAnnotationPanel",
                                                    "text.remove-".concat(annot.hasMixin(GObject.GAnnotation) ? "annotation" : "comment")
                                                )
                                            )
                                        );
                                },
                                null,
                                null,
                                null,
                                true,
                                true
                            );
                    },
                    onCancel: () => {
                        runSyncCallback.call(this);
                    },
                    onExpandClick: (event) => {
                        (event.stopPropagation(), (primaryEntry.expanded = !primaryEntry.expanded));
                        var entry = getEntryById.call(this, treeId);
                        try {
                            entry.component.setCollapseState(primaryEntry.expanded);
                        } catch (e) {
                            "function" == typeof gdb_showScene && console.error("REPAIR THIS! component is NULL!");
                        }
                        var rowAnnot = entry.annot;
                        getRelatedTreeIds.call(this, rowAnnot).forEach((relatedId, index) => {
                            if (index > 0) {
                                var relatedEntry = getEntryById.call(this, relatedId);
                                try {
                                    relatedEntry.component.setVisiblity(primaryEntry.expanded);
                                } catch (e) {
                                    "function" == typeof gdb_showScene && console.error("REPAIR THIS! component is NULL!");
                                }
                            }
                        });
                    },
                    onCopyPermalinkClick: async (annotationId) => {
                        const activeDocument = gDesigner.getActiveDocument();
                        if (activeDocument) {
                            const permalink = await gDesigner.getShareManager().getPermalink(activeDocument, annotationId);
                            permalink && gContainer.copyToClipboard(permalink);
                        }
                    },
                    onAssignTo: (assigneeId) => {
                        annot.hasMixin(GObject.GAnnotation)
                            ? annot.setProperty("asgn", assigneeId)
                            : annot.getParent() && annot.getParent().hasMixin(GObject.GAnnotation) && annot.getParent().setProperty("asgn", assigneeId);
                    },
                    mainAnnotObject: primaryEntry,
                });
                ((entry.element = row), (entry.component = rowComponent), panelData.vtree.addChild(rowComponent));
            } else if (entry && entry.replyAnnot) {
                let replyRow = $(container);
                if (
                    (replyRow.addClass("last-row"),
                    !isCommentingEditingEnabled ||
                        !entry.replyAnnot.hasFlag(GObject.GNode.Flag.Selected) ||
                        entry.replyAnnot.getProperty("rsv") ||
                        (!panelData.showResolved && entry.replyAnnot.getProperty("rsv")))
                )
                    return void replyRow.hide();
                const isNewAnnotation = !entry.replyAnnot.isFillingCompleted(),
                    onSubmit = (text) => {
                        if (canEditComments() && (text.length || (isNewAnnotation && entry.replyAnnot.isEmptyTextAllowed()))) {
                            let syncUser = gDesigner.getSyncUser();
                            if (annotationService.canUpdate(syncUser)) {
                                const scene = entry.replyAnnot.getScene(),
                                    editor = scene && editorLib.GEditor.getEditor(scene);
                                let transactionLabel, transactionData;
                                ((transactionLabel = isNewAnnotation
                                    ? GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.set-annotation-text"))
                                    : GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.add-comment"))),
                                    editor && editor.beginTransaction());
                                try {
                                    if (isNewAnnotation) {
                                        (entry.replyAnnot.setProperty("text", text),
                                            entry.replyAnnot.setProperty("email", syncUser.getAccountName()),
                                            removeReplyNode.call(this, entry.replyAnnot));
                                        var newTreeId = GObject.GUtil.uuid(),
                                            parentTreeNode = getTreeNodeForNode.call(this, entry.replyAnnot),
                                            replyEntry = {
                                                element: null,
                                                annot: null,
                                                treeNode: appendTreeNode.call(this, newTreeId, parentTreeNode, true, true),
                                                replyAnnot: entry.replyAnnot,
                                                treeId: newTreeId,
                                            };
                                        ((panelData.annotTreeNodeMap[newTreeId] = replyEntry), panelData.replyNodes.set(entry.replyAnnot, replyEntry));
                                    } else {
                                        removeReplyNode.call(this, entry.replyAnnot);
                                        const comment = entry.replyAnnot.addComment(
                                            text,
                                            syncUser.getUID(),
                                            editorLib.GEditorOptions.userConfig.userName,
                                            syncUser.avatar,
                                            syncUser.getAccountName()
                                        );
                                        transactionData = editorLib.GAnnotationEditor.createAddAnnotationTransactionData([comment], entry.replyAnnot);
                                    }
                                    (resetState.call(this), rebuildTree.call(this));
                                } catch (e) {
                                    console.log(e);
                                } finally {
                                    editor && editor.commitTransaction(transactionLabel, transactionData);
                                }
                            }
                            removeEmptyAnnotation(this, entry.replyAnnot);
                        }
                    },
                    onCancel = () => {
                        (removeEmptyAnnotation(this, entry.replyAnnot), runSyncCallback.call(this));
                    },
                    onAssignTo = (assigneeId) => {
                        entry.replyAnnot.setProperty("asgn", assigneeId);
                    };
                var replyPanel = new GAnnotationReplyDocker({
                        container: replyRow,
                        annotation: entry.replyAnnot,
                        onSubmit: onSubmit,
                        onCancel: onCancel,
                        onAssignTo: onAssignTo,
                        mentionData: panelData.vtree.getMentionData(),
                    }),
                    replyAnnotEntry = panelData.annotTreeNodeMapByNodes.get(entry.replyAnnot);
                ((entry.reply = replyPanel), panelData.vtree.addChild(replyPanel), replyAnnotEntry && (replyAnnotEntry.reply = replyPanel));
            }
            return assignedUserRow;
        }
        function renderAssignedUser(annot, showResolved) {
            let assigneeIds = annot.getProperty("asgn");
            if (!(assigneeIds || []).length) return;
            var isResolved = annot.getProperty("rsv");
            let rowElement = $("<div/>").addClass("already-assigned-user-row").appendTo($(this)),
                contentGroup = $("<span/>").addClass("assigned-content-group").appendTo(rowElement);
            return (
                (0, collabApi.getCollabInfo)(assigneeIds[0]).then(async (collabInfo) => {
                    let fullUserName = new GUser(collabInfo).getFullUserName();
                    $("<span/>")
                        .addClass("assign-to-text")
                        .html(
                            GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.assigned-to")) +
                                (collabInfo && collabInfo.name ? fullUserName : GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.unknown-user")))
                        )
                        .appendTo(contentGroup);
                    const isResolveAction = !isResolved;
                    ((await isResolveAction) ? annotationService.canResolveAnnotation(annot) : annotationService.canReopenAnnotation(annot)) &&
                        $("<span/>")
                            .addClass("assigned-action-group")
                            .append(
                                $("<span/>")
                                    .addClass("icon " + (isResolveAction ? "gravit-icon-resolve" : "gravit-icon-resolved"))
                                    .addClass("assigned-icon-resolve")
                                    .addClass("assigned-resolve-action")
                                    .attr(
                                        "data-title",
                                        isResolveAction
                                            ? GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.assign-resolve"))
                                            : GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.reopen"))
                                    )
                                    .on("click", () => {
                                        canEditComments() &&
                                            (isResolveAction
                                                ? editorLib.GEditor.tryRunTransaction(
                                                      annot,
                                                      function () {
                                                          (!showResolved && annot.hasFlag(GObject.GNode.Flag.Selected) && annot.removeFlag(GObject.GNode.Flag.Selected),
                                                              annot.setProperty("rsv", true));
                                                      },
                                                      GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.resolve"))
                                                  )
                                                : editorLib.GEditor.tryRunTransaction(
                                                      annot,
                                                      function () {
                                                          annot.setProperty("rsv", false);
                                                      },
                                                      GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.reopen"))
                                                  ),
                                            resetState.call(this),
                                            rebuildTree.call(this));
                                    })
                            )
                            .appendTo(contentGroup);
                }),
                rowElement
            );
        }
        function getPrimaryTreeId(node) {
            return getRelatedTreeIds.call($(this), node)[0];
        }
        function countRelatedTreeIds(node) {
            return getRelatedTreeIds.call($(this), node).length;
        }
        function insertTreeNodeAfter(treeId, afterNode, isVirtual) {
            var treeNode = new GSimpleTree.GSimpleTreeNodeNamed(treeId);
            return (isVirtual && (treeNode.virtualNode = true), $(this).data("gannotationpanel").vtree.insertNodeAfter(afterNode, treeNode), treeNode);
        }
        function insertTreeNodeBefore(treeId, beforeNode, isVirtual) {
            var treeNode = new GSimpleTree.GSimpleTreeNodeNamed(treeId);
            return (isVirtual && (treeNode.virtualNode = true), $(this).data("gannotationpanel").vtree.insertNodeBefore(beforeNode, treeNode), treeNode);
        }
        function appendTreeNode(treeId, parentNode, isVirtual, asLastChild) {
            var treeNode = new GSimpleTree.GSimpleTreeNodeNamed(treeId);
            return (isVirtual && (treeNode.virtualNode = true), $(this).data("gannotationpanel").vtree.appendNode(parentNode, treeNode, asLastChild), treeNode);
        }
        function removeTreeNode(treeNode) {
            $(this).data("gannotationpanel").vtree.removeNode(treeNode);
        }
        function getActiveComments(node) {
            return node.getChildren().filter((child) => child instanceof GObject.GComment && !child.getProperty("rmd"));
        }
        function isLastComment(comment) {
            if (!(comment instanceof GObject.GComment)) return false;
            for (var isLast = true, nextNode = comment.getNext(); nextNode; ) {
                if (nextNode instanceof GObject.GComment && !nextNode.getProperty("rmd")) {
                    isLast = false;
                    break;
                }
                nextNode = nextNode.getNext();
            }
            return isLast;
        }
        function updateLockFlags(node) {
            var syncUser = gDesigner.getSyncUser();
            syncUser && node.getProperty("uid") && annotationService.isOwner(syncUser, node)
                ? (node.$plkt = null)
                : (node.$plkt = GObject.GBlock.ProgramLck.NoSizeChanges | GObject.GBlock.ProgramLck.NoMove | GObject.GBlock.ProgramLck.NoDelete);
        }
        function addAnnotationNode(node, force, invalidationOptions) {
            var newTreeId = GObject.GUtil.uuid(),
                panelData = $(this).data("gannotationpanel"),
                vtree = panelData.vtree;
            if (force || !node.getParent() || node.getParent() instanceof GObject.GAnnotationsList || getTreeIdForNode.call(this, node.getParent())) {
                var treeNode;
                if ((vtree.beginUpdate(), node.hasMixin(GObject.GAnnotation))) {
                    removeReplyNode.call(this, node);
                    var prevActiveSibling = (function (node) {
                            for (var found = null, cursor = node; !found && cursor.getPrevious(); )
                                cursor.getPrevious().getProperty("rmd") ? (cursor = cursor.getPrevious()) : (found = cursor.getPrevious());
                            return found;
                        })(node),
                        prevSiblingTreeNode = prevActiveSibling ? getTreeNodeForNode.call(this, prevActiveSibling) : null;
                    treeNode = prevSiblingTreeNode ? insertTreeNodeBefore.call(this, newTreeId, prevSiblingTreeNode, false) : appendTreeNode.call(this, newTreeId, null, false);
                } else {
                    var parentNode = node.getParent();
                    removeReplyNode.call(this, parentNode);
                    var parentTreeNode = getTreeNodeForNode.call(this, parentNode);
                    treeNode = appendTreeNode.call(this, newTreeId, parentTreeNode, false, true);
                }
                var entry = { element: null, annot: node, treeNode: treeNode, treeId: newTreeId };
                if (((panelData.annotTreeNodeMap[newTreeId] = entry), panelData.annotTreeNodeMapByNodes.set(node, entry), node.hasMixin(GObject.GAnnotation))) {
                    for (var child = node.getFirstChild(); null !== child; child = child.getNext())
                        child instanceof GObject.GComment && !child.getProperty("rmd") && addAnnotationNode.call(this, child, force);
                    if (!getActiveComments(node).length) {
                        var replyTreeId = GObject.GUtil.uuid(),
                            annotReplyEntry = {
                                element: null,
                                annot: null,
                                treeNode: node.isFillingCompleted() ? appendTreeNode.call(this, replyTreeId, treeNode, true, true) : insertTreeNodeAfter.call(this, replyTreeId, treeNode, true),
                                replyAnnot: node,
                                treeId: replyTreeId,
                            };
                        ((panelData.annotTreeNodeMap[replyTreeId] = annotReplyEntry), panelData.replyNodes.set(node, annotReplyEntry));
                    }
                    updateLockFlags(node);
                } else if (node instanceof GObject.GComment && isLastComment(node)) {
                    let replyTreeNode,
                        replyTreeId = GObject.GUtil.uuid();
                    replyTreeNode = insertTreeNodeAfter.call(this, replyTreeId, treeNode, true);
                    var parentAnnot = node.getParent();
                    let commentReplyEntry = {
                        element: null,
                        annot: null,
                        treeNode: replyTreeNode,
                        replyAnnot: parentAnnot,
                        treeId: replyTreeId,
                    };
                    ((panelData.annotTreeNodeMap[replyTreeId] = commentReplyEntry), panelData.replyNodes.set(parentAnnot, commentReplyEntry));
                }
                vtree.endUpdate(invalidationOptions);
            }
        }
        function removeReplyNode(node) {
            var replyNodesMap = $(this).data("gannotationpanel").replyNodes,
                replyEntry = replyNodesMap.get(node);
            return (
                replyEntry && (removeTreeNode.call(this, replyEntry.treeNode), replyNodesMap.delete(node), ($(this).data("gannotationpanel").annotTreeNodeMap[replyEntry.treeNode.id] = null)),
                replyEntry
            );
        }
        function removeEmptyAnnotation(context, annot) {
            if (annot)
                !annot.getParent() ||
                    annot.getProperty("rmd") ||
                    annot.isFillingCompleted() ||
                    annotationService.removeAnnotations(
                        [annot],
                        annot.getParent(),
                        GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.remove-empty-annotation"))
                    );
            else {
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getSelection();
                    selection &&
                        selection.map((selectedNode) => {
                            selectedNode.hasMixin(GObject.GAnnotation) && removeEmptyAnnotation(context, selectedNode);
                        });
                }
            }
        }
        function cancelEditMode(panelElement, node) {
            var entry = panelElement.data("gannotationpanel").annotTreeNodeMapByNodes.get(node);
            entry && entry.component && (entry.component.cancelEditMode(), entry.reply && entry.reply.hide());
        }
        function removeAnnotationNode(node) {
            var treeNode = getTreeNodeForNode.call(this, node);
            treeNode && (removeTreeNode.call(this, treeNode), removeNodeMappings.call(this, node), removeReplyNode.call(this, node), pluginMethods.requestInvalidation.call(this));
        }
        function shouldHandleEvent(panelData, node) {
            return !panelData.blockHandlers || !(!panelData.ignoreBlock || panelData.ignoreBlock !== node);
        }
        function isUserInteracting() {
            return !(
                !$(this)
                    .find(".annotations-buttonrow")
                    .toArray()
                    .some((row) => "none" !== $(row).css("display")) && !$(this).find(".g-edit-mode").length
            );
        }
        function scheduleAnnotationsUpdate(changeEvent, invalidationOptions) {
            let panelData = $(this).data("gannotationpanel"),
                hasRecordedTransaction = false;
            const recordedProperties = {};
            if (!panelData) return;
            if (panelData.blockAnnotationsUpdate) return;
            if (null !== panelData.scheduledUpdate) return void (panelData.updateInProgress && (panelData.scheduleNextUpdate = true));
            if (
                changeEvent &&
                changeEvent.node &&
                changeEvent.node.recordedTransaction &&
                ((hasRecordedTransaction = true), changeEvent.properties && changeEvent.values && changeEvent.properties.length === changeEvent.values.length)
            )
                for (var r = 0, count = changeEvent.values.length; r < count; r++) recordedProperties[changeEvent.properties[r]] = changeEvent.values[r];
            if (changeEvent && changeEvent.node) {
                if (changeEvent.custom) return;
                if (changeEvent.node.hasMixin(GObject.GAnnotation) && changeEvent.node.isPropertiesIgnorable(changeEvent.properties)) return;
            }
            let activeDocument = gDesigner.getActiveDocument();
            activeDocument &&
                activeDocument.getAnnotationsId() &&
                (panelData.scheduledUpdate = setTimeout(() => {
                    let panelData = $(this).data("gannotationpanel");
                    if (!panelData) return;
                    if (isUserInteracting.call(this) || panelData.vtree.isPendingInvalidation()) return ((panelData.scheduledUpdate = null), void scheduleAnnotationsUpdate.call(this));
                    (console.log("updating annotations"), (panelData.updateInProgress = true));
                    let annotationsNode = panelData.page.getAnnotations();
                    annotationService.updateAndReturnCloudAnnotationsForDocument(activeDocument, GObject.GNode.store(annotationsNode, { recordedTransaction: hasRecordedTransaction, recordedProperties: recordedProperties }))
                        .then((response) => {
                            let annotationsCollection = response.annotationsCollection,
                                didChange = false,
                                panelData = $(this).data("gannotationpanel");
                            if (!panelData) return didChange;
                            if (!panelData.updateInProgress) return didChange;
                            if ((isUserInteracting.call(this) && (panelData.scheduleNextUpdate = true), (panelData.updateInProgress = false), !panelData.scheduleNextUpdate)) {
                                let annotationsList = annotationService.findAnnotationsListForPage(panelData.page, annotationsCollection);
                                if (annotationsList) {
                                    let restoredNode = GObject.GNode.restore(annotationsList),
                                        restoredChildren = restoredNode.getChildren();
                                    (restoredNode.clearChildren(), panelData.vtree.beginUpdate());
                                    let mergeChanged = annotationService.mergeAnnotations(
                                        panelData.page.getAnnotations(),
                                        panelData.page.getAnnotations().getChildren(),
                                        restoredNode,
                                        restoredChildren,
                                        hasRecordedTransaction ? recordedProperties : void 0
                                    );
                                    ((didChange = didChange || mergeChanged), panelData.vtree.endUpdate(invalidationOptions), resetState.call(this), rebuildTree.call(this));
                                }
                                (annotationsList || (panelData.vtree.beginUpdate(), panelData.page.getAnnotations().clearChildren(), panelData.vtree.endUpdate(invalidationOptions), resetState.call(this)),
                                    panelData.options.updateAnnotationCache(annotationsCollection));
                            }
                            if (((panelData.scheduledUpdate = null), panelData.scheduleNextUpdate && ((panelData.scheduleNextUpdate = false), scheduleAnnotationsUpdate.call(this)), didChange)) {
                                let scene = panelData.page.getScene();
                                (scene &&
                                    scene.getLastTimeAnnotationsFromCloudModified() < response.lastUpdateTime &&
                                    scene.setLastTimeAnnotationsFromCloudModified(response.lastUpdateTime),
                                    gDesigner.notifyDocumentModified(activeDocument));
                            }
                            return didChange;
                        })
                        .catch((error) => {
                            (console.warn("error during annotations list update: " + error),
                                (panelData.scheduledUpdate = null),
                                (panelData.updateInProgress = false),
                                panelData.scheduleNextUpdate && ((panelData.scheduleNextUpdate = false), scheduleAnnotationsUpdate.call(this)));
                        });
                }, 500));
        }
        function handleNodeInserted(event) {
            var panelData = $(this).data("gannotationpanel");
            if (shouldHandleEvent(panelData, event.node)) {
                const annotationsList = event.node.findParent((ancestor) => ancestor instanceof GObject.GAnnotationsList),
                    createInvalidationOptions = () => {
                        const options = new GInvalidationOptions.default();
                        if (event.node instanceof GObject.GComment) {
                            const text = event.node.getProperty("text");
                            (text && designerConfig.NOTIFICATION_USER_MENTION_REGEX.test(text)) || (options.collaboratorsCache = false);
                        }
                        return options;
                    };
                let isRemoved = false;
                const addNode = () => {
                        if (!event.node.getProperty("rmd")) {
                            const invalidationOptions = annotationsList ? GInvalidationOptions.default.NO_CACHE_INVALIDATION : createInvalidationOptions();
                            addAnnotationNode.call(this, event.node, null, invalidationOptions);
                        }
                    },
                    scheduleUpdate = () => {
                        annotationsList && scheduleAnnotationsUpdate.call(this, null, createInvalidationOptions());
                    };
                ((event.node.hasMixin(GObject.GAnnotation) || event.node instanceof GObject.GComment || event.node instanceof GObject.GAnnotationsList) &&
                    (event.node.getProperty("rmd") ? (isRemoved = true) : addNode()),
                    isRemoved
                        ? "number" != typeof panelData.delayedUpdate &&
                          (panelData.delayedUpdate = setTimeout(() => {
                              (addNode(), scheduleUpdate(), (panelData.delayedUpdate = null));
                          }))
                        : scheduleUpdate());
            }
        }
        function handleBeforeNodeRemove(event) {
            shouldHandleEvent($(this).data("gannotationpanel"), event.node) &&
                (removeAnnotationNode.call(this, event.node), event.node.findParent((ancestor) => ancestor instanceof GObject.GAnnotationsList) && scheduleAnnotationsUpdate.call(this));
        }
        function handlePropertiesChange(event) {
            if (!event.temporary && !$(this).data("gannotationpanel").blockHandlers) {
                event.properties.some((prop) => watchedProperties.indexOf(prop) >= 0) && pluginMethods.requestInvalidation.call(this);
                let syncUser = gDesigner.getSyncUser();
                (annotationService.canUpdate(syncUser) &&
                    event.node.hasMixin(GObject.GAnnotation) &&
                    event.properties.includes("rsv") &&
                    setTimeout(() => {
                        let rsvValue = event.values[event.properties.indexOf("rsv")];
                        (void 0 !== rsvValue && false !== rsvValue) !== event.node.getProperty("rsv") &&
                            (removeReplyNode.call(this, event.node),
                            event.node.addComment(
                                "",
                                syncUser.getUID(),
                                editorLib.GEditorOptions.userConfig.userName,
                                syncUser.avatar,
                                syncUser.getAccountName(),
                                event.node.getProperty("rsv") ? GObject.GComment.Type.Close : GObject.GComment.Type.Open
                            ));
                    }),
                    (event.node instanceof GObject.GAnnotationsList || event.node.findParent((ancestor) => ancestor instanceof GObject.GAnnotationsList)) &&
                        (event.node.hasMixin(GObject.GAnnotation) && event.properties.indexOf("uid") >= 0 && updateLockFlags(event.node), scheduleAnnotationsUpdate.call(this, event)),
                    event.properties.includes("rmd") && event.node.getProperty("rmd")
                        ? (event.node.hasMixin(GObject.GAnnotation) && cancelEditMode(this, event.node), resetState.call(this), rebuildTree.call(this))
                        : event.properties.includes("text") &&
                          event.node.isFillingCompleted() &&
                          event.node.hasMixin(GObject.GAnnotation) &&
                          cancelEditMode(this, event.node));
            }
        }
        function handleFlagChange(event) {
            var targetNode,
                panelData = $(this).data("gannotationpanel");
            if (shouldHandleEvent(panelData, event.node)) {
                var needsInvalidation = false;
                if (event.node instanceof GObject.GComment || event.node.hasMixin(GObject.GAnnotation))
                    if (event.flag === GObject.GAnnotation.Flag.Hidden || event.flag === GObject.GNode.Flag.Selected || event.flag === GObject.GNode.Flag.Active) {
                        var nodePage = event.node.getPage(),
                            nodeScene = event.node.getScene(),
                            activePage = nodeScene && nodeScene.getActivePage();
                        if (
                            ((activePage && nodePage && activePage !== nodePage) || (needsInvalidation = true),
                            event.node.hasMixin(GObject.GAnnotation) &&
                                event.flag === GObject.GNode.Flag.Selected &&
                                false === event.set &&
                                !event.node.isFillingCompleted() &&
                                !(targetNode = event.node).getProperty("rmd") &&
                                targetNode.getParent())
                        )
                            if (event.node.isEmptyTextAllowed()) {
                                let entry = panelData.annotTreeNodeMapByNodes.get(event.node);
                                entry && entry.reply && entry.reply.isVisible() && setTimeout(() => entry.reply.forceSubmit());
                            } else
                                GSystemDialog.confirm(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationPanel", "text.confirm-discard-annotation")), (confirmed) => {
                                    if (confirmed)
                                        setTimeout(() => {
                                            removeEmptyAnnotation(this, event.node);
                                        });
                                    else {
                                        (gDesigner.getActiveDocument().getEditor().updateSelection(false, [event.node]),
                                            gDesigner.getToolManager().activateTool(editorLib.GPointerTool, null, true));
                                        var entry = panelData.annotTreeNodeMapByNodes.get(event.node);
                                        entry &&
                                            entry.reply &&
                                            setTimeout(() => {
                                                entry.reply.requestFocus();
                                            });
                                    }
                                });
                    } else if (!panelData.blockHighlight && event.flag === GObject.GNode.Flag.Highlighted) {
                        var highlightNode = event.node,
                            isTreeNodeVisible = function (node) {
                                var treeNode = getTreeNodeForNode.call(this, node);
                                return treeNode && treeNode.isVisible();
                            }.bind(this);
                        if (isTreeNodeVisible(highlightNode) || highlightNode.findParent(isTreeNodeVisible)) {
                            var component = panelData.annotTreeNodeMapByNodes.get(highlightNode).component;
                            component ? component.toggleHighlight(event.set) : console.warn("element parent was null");
                        }
                    }
                needsInvalidation && pluginMethods.requestInvalidation.call(this, GInvalidationOptions.default.NO_CACHE_INVALIDATION);
            }
        }
        function rebuildTree() {
            var panelData = $(this).data("gannotationpanel");
            if ((panelData.vtree.beginUpdate(), panelData.page))
                for (var node = panelData.page.getAnnotations().getFirstChild(); null !== node; node = node.getNext())
                    node.getProperty("rmd") || addAnnotationNode.call(this, node, true);
            panelData.vtree.endUpdate();
        }
        function resetState(page) {
            var panelData = $(this).data("gannotationpanel");
            (panelData.vtree.clean(),
                (panelData.annotTreeNodeMap = {}),
                (panelData.replyNodes = new Map()),
                (panelData.annotTreeNodeMapByNodes = new Map()),
                void 0 !== page && (panelData.page = page),
                "number" == typeof panelData.delayedUpdate && (clearTimeout(panelData.delayedUpdate), (panelData.delayedUpdate = null)));
        }
        GObject.GObject.inheritAndMix(GAnnotationPanelWidget, GObject.GObject);
        var pluginMethods = {
            init: function (options) {
                return (
                    (options = $.extend(
                        {
                            nodeStyle: "annotation-row",
                            expandStyle: "annotation-arrow gravit-icon-right",
                            collapseStyle: "annotation-arrow gravit-icon-down",
                            freeHeight: 7,
                            insertIntoStyle: "g-drop",
                            upSeparatorSpan1Style: "g-up-separator-span1",
                            upSeparatorSpan2Style: "g-up-separator-span2",
                            downSeparatorSpan1Style: "g-down-separator-span1",
                            downSeparatorSpan2Style: "g-down-separator-span2",
                            renderer: renderAnnotationRow.bind(this),
                            expandRenderer: renderExpandToggle.bind(this),
                            separatorRenderer: null,
                            moveCallback: null,
                            clickCallback: null,
                            startDraggingCallback: null,
                            updateCommentCount: null,
                        },
                        options
                    )),
                    this.each(function () {
                        $(this)
                            .addClass("g-annotation-panel")
                            .data("gannotationpanel", {
                                vtree: new GAnnotationPanel(
                                    this,
                                    renderTreeNode.bind(this),
                                    options.nodeStyle,
                                    options.expandStyle === options.collapseStyle ? options.expandStyle : null,
                                    onNodeClick.bind(this),
                                    onNodeExpand.bind(this),
                                    options.upSeparatorSpan1Style,
                                    options.upSeparatorSpan2Style,
                                    options.downSeparatorSpan1Style,
                                    options.downSeparatorSpan2Style
                                ),
                                options: options,
                                annotTreeNodeMap: {},
                                annotTreeNodeMapByNodes: new Map(),
                                replyNodes: new Map(),
                                page: null,
                                scheduledUpdate: null,
                                scheduleNextUpdate: false,
                                blockAnnotationsUpdate: false,
                                updateInProgress: false,
                                showResolved: "boolean" == typeof options.showResolved && options.showResolved,
                                currentFocus: null,
                                sidebarActive: options.sidebarActive,
                                syncCallback: null,
                                delayedUpdate: null,
                            });
                    })
                );
            },
            requestInvalidation: function (invalidationOptions) {
                $(this).data("gannotationpanel").vtree.requestInvalidation(0, invalidationOptions);
            },
            refresh: function () {
                $(this).data("gannotationpanel").vtree.refresh();
            },
            relayout: function (forceRebuild) {
                var panelData = $(this).data("gannotationpanel"),
                    vtree = panelData.vtree,
                    currentFocus = panelData.currentFocus;
                (currentFocus && vtree.expandAndFocus(currentFocus),
                    forceRebuild ? (resetState.call(this), rebuildTree.call(this)) : pluginMethods.requestInvalidation.call(this, GInvalidationOptions.default.NO_CACHE_INVALIDATION));
            },
            cleanEmptyAnnotations: function () {
                removeEmptyAnnotation(this);
            },
            isEditingOrAddingContent: function () {
                return $(this).data("gannotationpanel").vtree.isEditingOrAddingContent();
            },
            showResolved: function (showResolved) {
                var panelData = $(this).data("gannotationpanel");
                panelData.showResolved !== showResolved && ((panelData.showResolved = showResolved), resetState.call(this), rebuildTree.call(this));
            },
            page: function (page) {
                var panelElement = $(this),
                    panelData = panelElement.data("gannotationpanel") || {};
                return arguments.length
                    ? (page !== panelData.page &&
                          (panelData.page &&
                              panelData.page.hasMixin(GObject.GEventTarget) &&
                              (panelData.page.removeEventListener(GObject.GNode.AfterInsertEvent, panelData.afterNodeInsertHandler, this),
                              panelData.page.removeEventListener(GObject.GNode.BeforeRemoveEvent, panelData.beforeNodeRemoveHandler, this),
                              panelData.page.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, panelData.afterPropertiesChangeHandler, this),
                              panelData.page.removeEventListener(GObject.GNode.AfterFlagChangeEvent, panelData.afterFlagChangeHandler, this),
                              null !== panelData.scheduledUpdate && (clearTimeout(panelData.scheduledUpdate), (panelData.scheduledUpdate = null)),
                              (panelData.updateInProgress = false)),
                          resetState.call(this, page),
                          (panelData.page = page),
                          panelData.page &&
                              (panelData.page.hasMixin(GObject.GEventTarget) &&
                                  ((panelData.beforeNodeRemoveHandler = handleBeforeNodeRemove.bind(this)),
                                  (panelData.afterPropertiesChangeHandler = handlePropertiesChange.bind(this)),
                                  (panelData.afterFlagChangeHandler = handleFlagChange.bind(this)),
                                  (panelData.afterNodeInsertHandler = handleNodeInserted.bind(this)),
                                  panelData.page.addEventListener(GObject.GNode.AfterInsertEvent, panelData.afterNodeInsertHandler, this),
                                  panelData.page.addEventListener(GObject.GNode.BeforeRemoveEvent, panelData.beforeNodeRemoveHandler, this),
                                  panelData.page.addEventListener(GObject.GNode.AfterPropertiesChangeEvent, panelData.afterPropertiesChangeHandler, this),
                                  panelData.page.addEventListener(GObject.GNode.AfterFlagChangeEvent, panelData.afterFlagChangeHandler, this)),
                              rebuildTree.call(this))),
                      this)
                    : panelData.page;
            },
            setDelayedSyncCallback: function (callback) {
                $(this).data("gannotationpanel").syncCallback = callback;
            },
            annotations: function (annotationsData) {
                let didChange = false;
                if (isUserInteracting.call(this)) return UpdateResult.DELAYED;
                let panelData = $(this).data("gannotationpanel"),
                    restoredNode = GObject.GNode.restore(annotationsData),
                    restoredChildren = restoredNode.getChildren();
                return (
                    restoredNode.clearChildren(),
                    (panelData.blockAnnotationsUpdate = true),
                    panelData.vtree.beginUpdate(),
                    (didChange = annotationService.mergeAnnotations(panelData.page.getAnnotations(), panelData.page.getAnnotations().getChildren(), restoredNode, restoredChildren)),
                    panelData.vtree.endUpdate(),
                    (panelData.blockAnnotationsUpdate = false),
                    resetState.call(this),
                    rebuildTree.call(this),
                    didChange ? UpdateResult.UPDATED : UpdateResult.SKIPPED
                );
            },
            blockHandlers: function (shouldBlock) {
                $(this).data("gannotationpanel").blockHandlers = !!shouldBlock;
            },
            ignoreBlock: function (node) {
                $(this).data("gannotationpanel").ignoreBlock = node;
            },
            setBlockHighlight: function (shouldBlock) {
                $(this).data("gannotationpanel").blockHighlight = !!shouldBlock;
            },
            getTreeNode: function (node) {
                var treeNode = null;
                return ($(this).data("gannotationpanel") && (treeNode = getTreeNodeForNode.call(this, node)), treeNode);
            },
            scrollIntoView: function () {
                const selectedId = $(this).find(".annotation-row.g-selected").attr("id");
                if (selectedId) {
                    const entry = getEntryById.call(this, selectedId);
                    entry && (entry.reply ? entry.reply.scrollIntoView() : entry.component && entry.component.scrollIntoView());
                }
            },
            getItem: function (nodeInfo) {
                return getAnnotById.call(this, nodeInfo.id);
            },
        };
        ((module.exports = GAnnotationPanelWidget),
            ($.fn.gAnnotationPanel = function (method) {
                return pluginMethods[method]
                    ? pluginMethods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                    : "object" != typeof method && method
                      ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                      : pluginMethods.init.apply(this, arguments);
            }));
    };
