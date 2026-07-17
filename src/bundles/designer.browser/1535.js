module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(3), require(71 /* polyfill:String */), require(4), require(41), require(13), require(32), require(97), require(33));
        var editorModule = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GFitAllAction = require(449),
            GFitSelectionAction = require(566),
            GProperties = require(123);
        const GAnnotationsUtils = require(358),
            DocumentStatus = require(86),
            { SHOW_SIDEBAR_BADGE } = require(10 /* designerConfig */);
        function GAnnotations() {
            this._elements = [];
        }
        (GObject.GObject.inherit(GAnnotations, GProperties),
            (GAnnotations.prototype._panel = null),
            (GAnnotations.prototype._toolbar = null),
            (GAnnotations.prototype._document = null),
            (GAnnotations.prototype._elements = null),
            (GAnnotations.prototype.init = function (panel, toolbar, sidebarActive, showResolved, updateSidebar, updateAnnotationCache) {
                ((this._panel = panel),
                    (this._toolbar = toolbar),
                    this._addListPanel(panel, sidebarActive, showResolved, updateSidebar, updateAnnotationCache),
                    toolbar.append(
                        $("<label>")
                            .addClass("annotation-panel-label")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotations", "text.page")))
                    ));
            }),
            (GAnnotations.prototype._addListPanel = function (panel, sidebarActive, showResolved, updateSidebar, updateAnnotationCache) {
                var annotationsContainer = $("<div></div>").addClass("annotations-container").appendTo(panel);
                this._annotationPanel ||
                    ((this._annotationPanel = $("<div></div>")
                        .addClass("annotations")
                        .on(
                            "mouseenter",
                            function () {
                                var scene = this._document.getScene();
                                (scene &&
                                    scene.acceptChildren(function (node) {
                                        return (node.hasFlag(GObject.GNode.Flag.Highlighted) && node.removeFlag(GObject.GNode.Flag.Highlighted), true);
                                    }),
                                    this._annotationPanel.gAnnotationPanel("setBlockHighlight", true));
                            }.bind(this)
                        )
                        .on(
                            "mouseleave",
                            function () {
                                this._annotationPanel.gAnnotationPanel("setBlockHighlight", false);
                            }.bind(this)
                        )
                        .on(
                            "click",
                            function () {
                                this._document.getEditor().clearSelection();
                                var scene = this._document.getScene();
                                (scene && scene.setActiveLayer(null),
                                    GPlatform.GPlatform.modifiers.optionKey && gDesigner.executeAction(GFitAllAction.ID, void 0, "outlinesidebar"));
                            }.bind(this)
                        )
                        .on("dragover", function (event) {
                            (event.preventDefault(), event.stopPropagation());
                        })
                        .on("dragenter", function (event) {
                            (event.preventDefault(), event.stopPropagation());
                        })
                        .on(
                            "drop",
                            function (event) {
                                (event.preventDefault(), event.stopPropagation());
                            }.bind(this)
                        )
                        .appendTo(annotationsContainer)),
                    this._annotationPanel.gAnnotationPanel({
                        clickCallback: this._clickTreeNodeCallback.bind(this),
                        updateCommentCount: this._updateCommentCount.bind(this),
                        showResolved: showResolved,
                        updateSidebar: updateSidebar,
                        updateAnnotationCache: updateAnnotationCache,
                        sidebarActive: sidebarActive,
                    }),
                    (window.refreshannot = () => this._annotationPanel.gAnnotationPanel("refresh")),
                    (window.relayoutannot = () => this._annotationPanel.gAnnotationPanel("relayout")));
            }),
            (GAnnotations.prototype.relayout = function (force) {
                this._annotationPanel && this._annotationPanel.gAnnotationPanel("relayout", force);
            }),
            (GAnnotations.prototype.isAddingAnnotation = function () {
                return this._annotationPanel.gAnnotationPanel("isEditingOrAddingContent");
            }),
            (GAnnotations.prototype.toggleShowResolved = function (showResolved) {
                this._annotationPanel.gAnnotationPanel("showResolved", showResolved);
            }),
            (GAnnotations.prototype.setPage = function (page) {
                (this._annotationPanel.gAnnotationPanel("page", page), page && this._setAnnotationLabel(page.getProperty("name")));
            }),
            (GAnnotations.prototype._setAnnotationLabel = function (label) {
                this._toolbar.find(".annotation-panel-label").text(label);
            }),
            (GAnnotations.prototype._updateCommentCount = function (commentCount, unreadCount) {
                var badge = this._toolbar.find(".g-badge");
                SHOW_SIDEBAR_BADGE && commentCount > 0
                    ? (0 === badge.length && ((badge = $("<span/>").addClass("g-badge comment-count")), this._toolbar.append(badge)),
                      unreadCount > 0 ? badge.addClass("unread") : badge.removeClass("unread"),
                      badge.text(commentCount))
                    : badge.remove();
            }),
            (GAnnotations.prototype.getPage = function () {
                return this._annotationPanel.gAnnotationPanel("page");
            }),
            (GAnnotations.prototype.setAnnotations = function (annotations) {
                return this._annotationPanel.gAnnotationPanel("annotations", annotations);
            }),
            (GAnnotations.prototype.setDelayedSyncCallback = function (callback) {
                this._annotationPanel.gAnnotationPanel("setDelayedSyncCallback", callback);
            }),
            (GAnnotations.prototype._clickTreeNodeCallback = function (node) {
                if ((node instanceof GObject.GComment && (node = node.getParent()), node && !node.hasFlag(GObject.GNode.Flag.Selected))) {
                    (this._document.getScene().updateActivePageForElem(node), this._document.getScene().updateActiveLayerForElem(node));
                    var editor = this._document.getEditor(),
                        selectionChanged = false;
                    if (
                        (jQuery(gDesigner.getWindows().getActiveWindow().getView().getHtmlElement()).find("> div[tabindex=0]").focus(),
                        GPlatform.GPlatform.modifiers.metaKey ||
                            (!node.hasFlag(GObject.GNode.Flag.Selected) &&
                                !node.hasFlag(GObject.GElement.Flag.FullLocked) &&
                                !GPlatform.GPlatform.modifiers.shiftKey))
                    ) {
                        let nodesToSelect = [node];
                        if (node.hasMixin(GObject.GAnnotation.Linkable)) {
                            let references = node.getAnnotableReferences();
                            references &&
                                ((references = references.filter((reference) => !reference.hasFlag(GObject.GNode.Flag.Selected))),
                                references.length && ((nodesToSelect = nodesToSelect.concat(references)), this._document.getScene().updateActivePageForElem(references[0])));
                        }
                        (editor.updateSelection(GPlatform.GPlatform.modifiers.metaKey, nodesToSelect), (selectionChanged = true));
                    }
                    if (selectionChanged && GPlatform.GPlatform.modifiers.optionKey)
                        editor.hasSelection()
                            ? gDesigner.executeAction(GFitSelectionAction.ID, void 0, "outlinesidebar")
                            : gDesigner.executeAction(GFitAllAction.ID, void 0, "outlinesidebar");
                    else if (selectionChanged) {
                        let boundingBox;
                        if (node.hasMixin(GObject.GAnnotation.Linkable)) {
                            const references = node.getAnnotableReferences();
                            references &&
                                references.length &&
                                references.forEach((reference) => {
                                    if (reference instanceof GObject.GElement) {
                                        const bbox = reference.getPaintBBox();
                                        bbox && !bbox.isEmpty() && (boundingBox = boundingBox ? boundingBox.united(bbox) : bbox);
                                    }
                                });
                        } else node instanceof GObject.GElement && (boundingBox = node.getPaintBBox());
                        const activeWindow = this._document && this._document.getActiveWindow();
                        activeWindow && activeWindow.scrollIntoView(boundingBox);
                    }
                }
            }),
            (GAnnotations.prototype._selectionChangedEvent = function () {
                const editor = this._document && this._document.getEditor(),
                    selection = editor && editor.getSelection();
                if (selection && selection.length) {
                    selection.filter((element) => element.hasMixin(GObject.GAnnotable)).forEach((element) => {
                        const linkedAnnotations = element.getLinkedAnnotations();
                        linkedAnnotations &&
                            linkedAnnotations.forEach((annotation) => {
                                annotation.hasFlag(GObject.GNode.Flag.Selected) || annotation.setFlag(GObject.GNode.Flag.Selected);
                            });
                    });
                }
            }),
            (GAnnotations.prototype._isSyncTransactionEvent = function (event) {
                return !(
                    !(event.data && event.data.nodes && event.data.parent) ||
                    (event.data.type !== editorModule.GAnnotationEditor.TransactionType.RemoveAnnotation &&
                        event.data.type !== editorModule.GAnnotationEditor.TransactionType.AddAnnotation)
                );
            }),
            (GAnnotations.prototype._handleModifiedEvent = function (event) {
                if (this._isSyncTransactionEvent(event)) {
                    const isUndo = event.data.evtType === editorModule.GEditor.ModifiedEvent.Type.Undo,
                        isRedo = event.data.evtType === editorModule.GEditor.ModifiedEvent.Type.Redo,
                        isRemoveTransaction = event.data.type === editorModule.GAnnotationEditor.TransactionType.RemoveAnnotation,
                        isAddTransaction = event.data.type === editorModule.GAnnotationEditor.TransactionType.AddAnnotation,
                        hasAnnotationsId = !!this._document.getAnnotationsId(),
                        shouldRestoreAnnotations = (isUndo && isRemoveTransaction) || (isUndo && isAddTransaction) || (isRedo && isAddTransaction),
                        shouldRemoveAnnotations = isRedo && isRemoveTransaction;
                    let annotationElements;
                    if (hasAnnotationsId && shouldRestoreAnnotations)
                        ((annotationElements = GAnnotationsUtils.filterAnnotationElements(event.data.nodes)),
                            annotationElements.length &&
                                annotationElements.forEach((element) => {
                                    (GAnnotationsUtils.removeSidFromAnnotations(element), element.getParent() || event.data.parent.insertChild(element));
                                }));
                    else if (hasAnnotationsId && shouldRemoveAnnotations) {
                        var siblingChildren = event.data.parent.getChildren();
                        ((annotationElements = GAnnotationsUtils.filterAnnotationElements(event.data.nodes).filter((filteredNode) => siblingChildren.some((child) => child.getId() === filteredNode.getId()))),
                            annotationElements.length && GAnnotationsUtils.removeAnnotations(annotationElements, event.data.parent, void 0, false));
                    }
                }
            }),
            (GAnnotations.prototype.update = function (newDocument, elements, toolChanged) {
                if (
                    (toolChanged && this._annotationPanel.gAnnotationPanel("cleanEmptyAnnotations"),
                    this._document &&
                        (this._document.getScene().removeEventListener(GObject.GElement.GeometryChangeEvent, this._geometryChange, this),
                        this._document
                            .getScene()
                            .removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                        this._document.getEditor().removeEventListener(editorModule.GEditor.EdGeometryChangeEvent, this._edGeometryChange, this),
                        this._document.getEditor().removeEventListener(editorModule.GEditor.ModifiedEvent, this._handleModifiedEvent, this),
                        this._document.getEditor().removeEventListener(editorModule.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                        (this._document = null)),
                    (this._elements = []),
                    newDocument)
                ) {
                    for (var a = 0; a < elements.length; ++a) this._elements.push(elements[a]);
                    if (this._elements.length === elements.length) {
                        if (((this._document = newDocument), this._elements.length))
                            return (
                                this._document
                                    .getScene()
                                    .addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChange, this),
                                this._document.getScene().addEventListener(GObject.GElement.GeometryChangeEvent, this._geometryChange, this),
                                this._document.getEditor().addEventListener(editorModule.GEditor.EdGeometryChangeEvent, this._edGeometryChange, this),
                                this._document
                                    .getEditor()
                                    .addEventListener(editorModule.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                                this._document.getEditor().addEventListener(editorModule.GEditor.ModifiedEvent, this._handleModifiedEvent, this),
                                this._updateDimensions(),
                                this._updateToolbar(),
                                (this._document.getStatus() !== DocumentStatus.Ready && this._document.getStatus() !== DocumentStatus.Loaded) ||
                                    !this._document.getActiveWindow() ||
                                    this._document.getActiveWindow().getView().invalidate(null, true),
                                true
                            );
                        this._document.getEditor().addEventListener(editorModule.GEditor.ModifiedEvent, this._handleModifiedEvent, this);
                    }
                } else this.setPage(null);
                return false;
            }),
            (GAnnotations.prototype._afterPropertiesChange = function (event) {
                event.node === this.getPage() && event.properties.includes("name") && this._setAnnotationLabel(event.node.getProperty("name"));
            }),
            (GAnnotations.prototype._geometryChange = function (event) {
                (event.type !== GObject.GElement.GeometryChangeEvent.Type.After && event.type !== GObject.GElement.GeometryChangeEvent.Type.Child) ||
                    (this._elements.indexOf(event.element) >= 0 && this._updateDimensions());
            }),
            (GAnnotations.prototype._edGeometryChange = function () {
                this._updateDimensions(false, true);
            }),
            (GAnnotations.prototype._updateDimensions = function () {}),
            (GAnnotations.prototype._updateToolbar = function () {
                this._toolbar.find("[data-action]").each(
                    function (e, element) {
                        var $element = $(element);
                        $element.prop("disabled", !gDesigner.canExecuteAction($element.attr("data-action")));
                    }.bind(this)
                );
            }),
            (GAnnotations.prototype.toString = function () {
                return "[Object GAnnotations]";
            }),
            (module.exports = GAnnotations));
    };
