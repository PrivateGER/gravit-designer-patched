module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(8 /* Symbol */), require(3), require(71 /* polyfill:String */), require(4), require(41), require(13), require(32), require(38), require(97), require(33));
        var GEditor = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GMenuModule = _interopRequireDefault(require(238 /* GMenu */)),
            GMenuItemModule = _interopRequireDefault(require(339 /* GMenuItem */)),
            richTooltipModule = require(67 /* GRichTooltipConfig */),
            touchToolModule = _interopRequireDefault(require(340)),
            GSettingsDialog = require(1275),
            GPosition = require(444),
            GDocumentEvent = require(78),
            GSidebar = (require(606), require(806)),
            GSidebars = require(395),
            GInspectorSidebar = require(864),
            GProperties = require(123),
            GAnnotations = require(1535),
            GWindows = require(603),
            GAnnotationProperties = require(1536),
            GAnnotationsUtils = require(358),
            AnnotationsError = require(592);
        const GApplicationStateChangedEvent = require(392),
            GSettingChangedEvent = require(135);
        var GReviewDockerProperties = require(1537);
        const GNetworkAvailabilityChangedEvent = require(291),
            GCollaborationEvent = require(393),
            GStorageItemEvent = require(336),
            AnnotationPermissions = require(434),
            { SHOW_SIDEBAR_BADGE, NOTIFICATION_SETTINGS_ENABLED } = require(10 /* designerConfig */),
            DocumentStatus = require(86),
            GDocumentStatusEvent = require(217),
            SyncStatus = require(1279),
            {
                DateAPI,
                FileStatus: { APPROVED },
            } = require(10 /* designerConfig */),
            SidebarsIds = require(198);
        function GAnnotationsSidebar() {
            (GSidebar.call(this),
                (this._annotationPanels = []),
                (this._annotationProperties = []),
                (this._handleFocusInEvent = this._handleFocusInEvent.bind(this)),
                (this._handleFocusOutEvent = this._handleFocusOutEvent.bind(this)));
        }
        (GObject.GObject.inherit(GAnnotationsSidebar, GSidebar),
            (GAnnotationsSidebar.ANNOTATION_PROPERTIES_ARROW_POSITION = [32.5, 44, 55.5, 67, 78.5, 90]),
            (GAnnotationsSidebar.ANNOTATION_PROPERTIES_ARROW_POSITION_TOUCH = [25.5, 38, 50.5, 63, 75.5, 88]),
            (GAnnotationsSidebar.ID = SidebarsIds.SidebarsIds.GAnnotationsSidebar),
            (GAnnotationsSidebar.TITLE = new GObject.GLocaleKey("GAnnotationsSidebar", "text.title")),
            (GAnnotationsSidebar.prototype._htmlElement = null),
            (GAnnotationsSidebar.prototype._panelsContainer = null),
            (GAnnotationsSidebar.prototype._annotationPanels = null),
            (GAnnotationsSidebar.prototype._annotationProperties = null),
            (GAnnotationsSidebar.prototype._document = null),
            (GAnnotationsSidebar.prototype._notificationMenu = null),
            (GAnnotationsSidebar.prototype._elements = null),
            (GAnnotationsSidebar.prototype._listenersAdded = false),
            (GAnnotationsSidebar.prototype._annotationToolbar = null),
            (GAnnotationsSidebar.prototype._annotationsToolbarPanel = null),
            (GAnnotationsSidebar.prototype._showResolved = false),
            (GAnnotationsSidebar.prototype._showDistance = GEditor.GEditorOptions.showDistance),
            (GAnnotationsSidebar.prototype._toolExitKey = GEditor.GEditorOptions.toolExitKey),
            (GAnnotationsSidebar.prototype._currentAnnotations = null),
            (GAnnotationsSidebar.prototype._localAnnotations = null),
            (GAnnotationsSidebar.prototype._page = null),
            (GAnnotationsSidebar.prototype.getId = function () {
                return GAnnotationsSidebar.ID;
            }),
            (GAnnotationsSidebar.prototype.getTitle = function () {
                return GAnnotationsSidebar.TITLE;
            }),
            (GAnnotationsSidebar.prototype.isEnabled = function () {
                return !!this._document;
            }),
            (GAnnotationsSidebar.prototype.isVisible = function () {
                return !!gDesigner.getApplicationManager().isCommentingEnabled();
            }),
            (GAnnotationsSidebar.prototype.isDeactivatable = function () {
                return !this._annotationPanels || !this._annotationPanels.some((panel) => panel.properties.isAddingAnnotation());
            }),
            (GAnnotationsSidebar.prototype.getOrientation = function () {
                return GSidebars.Orientation.Right;
            }),
            (GAnnotationsSidebar.prototype.getMinimumWidth = function () {
                return this._getSidebarWidth();
            }),
            (GAnnotationsSidebar.prototype.isResizeable = function () {
                return false;
            }),
            (GAnnotationsSidebar.prototype.getDefaultWidth = function () {
                return this._getSidebarWidth();
            }),
            (GAnnotationsSidebar.prototype._getSidebarWidth = function () {
                return gDesigner.isTouchEnabled() ? 376 : 300;
            }),
            (GAnnotationsSidebar.prototype._storageItemFileStatusEvent = function (event) {
                this._storageItem &&
                    this._storageItem === event.storageItem &&
                    ((event.oldStatus !== APPROVED && event.newStatus !== APPROVED) || this._updatePropertyPanels(true));
            }),
            (GAnnotationsSidebar.prototype._toggleShowResolved = function (showResolved) {
                if (showResolved !== this._showResolved) {
                    this._showResolved = showResolved;
                    for (var t = this._annotationPanels.length - 1; t >= 0; t--) {
                        this._annotationPanels[t].properties.toggleShowResolved(showResolved);
                    }
                    ((this._document.getActiveWindow().getView().getViewConfiguration().showResolvedAnnotations = showResolved),
                        this._document.getActiveWindow().getView().invalidateAndResetCache(null));
                }
            }),
            (GAnnotationsSidebar.prototype.syncAnnotations = function (pushChanges) {
                return this._annotationPanels && this._document && this._document.getAnnotationsId()
                    ? this.isAnnotationPropertiesEditing()
                        ? Promise.resolve()
                        : new Promise((resolve) => {
                              (pushChanges
                                  ? GAnnotationsUtils.updateAndReturnCloudAnnotationsForDocument(this._document, this._currentAnnotations)
                                  : GAnnotationsUtils.getCloudAnnotationsForDocument(this._document)
                              ).then((result) => {
                                  let annotationsCollection = result.annotationsCollection,
                                      updated = false;
                                  this._document && this._document.getAnnotationsId() !== result.cid && resolve(updated);
                                  let delayed = false;
                                  if (annotationsCollection) {
                                      this._currentAnnotations = annotationsCollection;
                                      for (let t = this._annotationPanels.length - 1; t >= 0; t--) {
                                          let panel = this._annotationPanels[t];
                                          if (panel.properties instanceof GAnnotations) {
                                              let annotationsList = this._getAnnotationsToSet(annotationsCollection, panel.properties.getPage()),
                                                  syncResult = panel.properties.setAnnotations(annotationsList);
                                              syncResult === SyncStatus.UPDATED
                                                  ? (updated = true)
                                                  : syncResult === SyncStatus.DELAYED &&
                                                    ((delayed = true), panel.properties.setDelayedSyncCallback(this.syncAnnotations.bind(this, pushChanges)));
                                          }
                                      }
                                  }
                                  if (((updated = updated && !delayed), updated)) {
                                      let scene = this._document.getScene();
                                      (scene && scene.setLastTimeAnnotationsFromCloudModified(result.lastUpdateTime),
                                          gDesigner.notifyDocumentModified(this._document),
                                          this._active ? this._activateAnnotations() : this.trigger(GSidebar.UPDATE_EVENT));
                                  }
                                  resolve(updated);
                              });
                          })
                    : Promise.resolve();
            }),
            (GAnnotationsSidebar.prototype._getAnnotationsToSet = function (annotationsCollection, page) {
                let list = GAnnotationsUtils.findAnnotationsListForPage(page, annotationsCollection);
                return (list || (list = { "@": "annlst" }), list);
            }),
            (GAnnotationsSidebar.prototype.init = function (element) {
                (GSidebar.prototype.init.call(this, element),
                    (this._htmlElement = element),
                    (this._notificationMenu = new GMenuModule.default(null, "g-annotation-sidebar-notification-menu")));
                const commentingEditingEnabled = gDesigner.getApplicationManager().isCommentingEditingEnabled();
                ((this._sidebarTitle = $("<div></div>").addClass("sidebar-title-inner").append(GObject.GLocale.get(this.getTitle()))),
                    (this._annotationToolbar = $("<div></div>").addClass("toolbar annotations-toolbar")));
                const optionsButton = $("<button></button>");
                var optionsOverlay = $("<div></div>")
                    .addClass("annotation-sidebar-options")
                    .gOverlay({
                        releaseOnClose: false,
                        clazz: "g-annotation-sidebar-option-overlay",
                        closeCallback: () => optionsButton.removeClass("g-active"),
                    });
                this._annotationsToolbarPanel = $("<div></div>").addClass("properties-panel").addClass("annotations-properties-panel");
                var optionsBox = $("<div></div>").addClass("annotation-options-box").appendTo(this._annotationToolbar);
                (optionsButton
                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.annotation-options")))
                    .addClass("annotation-options")
                    .append($("<span></span>").addClass("gravit-icon-settings"))
                    .on(
                        "click",
                        function (event) {
                            (optionsOverlay.gOverlay("open", $(event.target).closest("button")), optionsButton.addClass("g-active"));
                        }.bind(this)
                    )
                    .appendTo(optionsBox),
                    $("<span></span>").addClass("indicator").appendTo(this._annotationToolbar),
                    (this._optionsToolbar = $("<div></div>").gPropertyRow({
                        noPaddingRight: true,
                        clickable: true,
                        rawClick: (event) => {
                            var checked = !$(event.target).find("input").prop("checked");
                            ($(event.target).find("input").prop("checked", checked),
                                gDesigner.stats("annotations_settings_show-resolved", checked ? "On" : "Off"),
                                this._toggleShowResolved(checked),
                                event.stopPropagation());
                        },
                        columns: [
                            {
                                width: "100%",
                                content: $("<label>")
                                    .append(
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .prop("checked", this._showResolved)
                                            .on("change", (event) => {
                                                var checked = $(event.target).prop("checked");
                                                (gDesigner.stats("annotations_settings_show-resolved", checked ? "On" : "Off"),
                                                    this._toggleShowResolved(checked),
                                                    event.stopPropagation());
                                            })
                                    )
                                    .append($("<span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.show-resolved")))),
                            },
                        ],
                    })),
                    commentingEditingEnabled &&
                        this._optionsToolbar.gPropertyRow({
                            noPaddingRight: true,
                            clickable: true,
                            rawClick: () => {
                                gDesigner.getApplicationManager().isCommentingEditingEnabled() &&
                                    (GAnnotationsUtils.resolveAllComments(this._document), this.relayout(true));
                            },
                            columns: [
                                {
                                    width: "100%",
                                    content: $("<label>")
                                        .append($("<span>").addClass("resolve-all-button").addClass("gravit-icon-resolve-all"))
                                        .append(
                                            $("<span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.resolve-all")))
                                        ),
                                },
                            ],
                        }),
                    NOTIFICATION_SETTINGS_ENABLED &&
                        this._optionsToolbar.gPropertyRow({
                            clickable: true,
                            isMenu: true,
                            rawClick: (event) => {
                                if (this._document && this._document.isCloudFile())
                                    (this._notificationMenu.open(event.target, GPosition.Position.Right_Bottom, GPosition.Position.Right_Bottom),
                                        $("body").find(".hover-notification-container") && this._removeHoverNotificationFrag(),
                                        this._openHoverNotification(event.target));
                                else {
                                    this._optionsToolbar.find(".notification-label").closest(".columns").gTooltip("show");
                                }
                                event.stopPropagation();
                            },
                            columns: [
                                {
                                    width: "100%",
                                    clazz: "notification-label",
                                    content: $("<label>")
                                        .append($("<span>").addClass("resolve-all-button").addClass("gravit-icon-notification"))
                                        .append(
                                            $("<span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.notification")))
                                        ),
                                },
                            ],
                        }),
                    this._optionsToolbar.appendTo(optionsOverlay),
                    $("<div/>")
                        .addClass("offline-overlay-message")
                        .append(
                            $("<div/>")
                                .addClass("box")
                                .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "title.unavailable-feature"))))
                        )
                        .appendTo(this._htmlElement),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this),
                    gDesigner.getWindows().addEventListener(GWindows.WindowEvent, this._windowEvent, this),
                    gDesigner.getToolManager().addEventListener(GEditor.GToolManager.ToolChangedEvent, this._toolChangedEvent, this),
                    gDesigner.addEventListener(GApplicationStateChangedEvent, this._stateChangedEvent, this),
                    gDesigner.addEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this),
                    this._activeTool(gDesigner.getToolManager().getActiveTool()),
                    this._updatePropertyPanels(true));
            }),
            (GAnnotationsSidebar.prototype.getTouchTools = function () {
                if (!this.isEnabled()) return [];
                if (!this._active) {
                    const editor = this._document && this._document.getEditor(),
                        selection = editor && editor.getSelection();
                    if (selection && selection.length) return [];
                }
                return [
                    new touchToolModule.default({
                        id: "annotation",
                        sidebar: this.getId(),
                        icon: "gravit-icon-touch-comment-docker",
                        panel: [this._annotationsToolbarPanel, ".annotations-properties-panel"],
                        toolbar: [this._annotationToolbar, ".annotations-toolbar"],
                    }),
                ];
            }),
            (GAnnotationsSidebar.prototype.getAnnotationsProperties = function () {
                return [
                    new GAnnotationProperties(
                        [GAnnotationProperties.PropertySet.FillLayer, GAnnotationProperties.PropertySet.BorderLayer, GAnnotationProperties.PropertySet.BorderWidth],
                        GObject.GEllipseAnnotation,
                        GEditor.GEllipseAnnotationTool,
                        "gravit-icon-annotationtools-ellipse",
                        "text.tooltip-ellipse-tool",
                        {
                            _ptf: "text.tooltip-ellipse-fill",
                            _ptb: "text.tooltip-ellipse-border",
                            _ptfdropper: "text.tooltip-ellipse-dropper-fill",
                            _ptbdropper: "text.tooltip-ellipse-dropper-border",
                            _bw: "text.tooltip-ellipse-outline",
                        },
                        "Ellipse",
                        "tool-ellipse"
                    ),
                    new GAnnotationProperties(
                        [GAnnotationProperties.PropertySet.FillLayer, GAnnotationProperties.PropertySet.BorderLayer, GAnnotationProperties.PropertySet.BorderWidth],
                        GObject.GRectangleAnnotation,
                        GEditor.GRectangleAnnotationTool,
                        "gravit-icon-annotationtools-rectangle",
                        "text.tooltip-rectangle-tool",
                        {
                            _ptf: "text.tooltip-rectangle-fill",
                            _ptb: "text.tooltip-rectangle-border",
                            _ptfdropper: "text.tooltip-rectangle-dropper-fill",
                            _ptbdropper: "text.tooltip-rectangle-dropper-border",
                            _bw: "text.tooltip-rectangle-outline",
                        },
                        "Rectangle",
                        "tool-rectangle"
                    ),
                    new GAnnotationProperties(
                        [GAnnotationProperties.PropertySet.BorderLayer, GAnnotationProperties.PropertySet.BorderWidth],
                        GObject.GPencilAnnotation,
                        GEditor.GPencilAnnotationTool,
                        "gravit-icon-annotationtools-pencil",
                        "text.tooltip-pencil-tool",
                        {
                            _ptb: "text.tooltip-pencil-border",
                            _ptbdropper: "text.tooltip-pencil-dropper-border",
                            _bw: "text.tooltip-pencil-outline",
                        },
                        "Pencil",
                        "tool-pencil"
                    ),
                    new GAnnotationProperties(
                        [GAnnotationProperties.PropertySet.BorderLayer, GAnnotationProperties.PropertySet.BorderWidth],
                        GObject.GHighlighterAnnotation,
                        GEditor.GHighlighterAnnotationTool,
                        "gravit-icon-annotationtools-highlighter",
                        "text.tooltip-highlighter-tool",
                        {
                            _ptb: "text.tooltip-highlighter-border",
                            _ptbdropper: "text.tooltip-highlighter-dropper-border",
                            _bw: "text.tooltip-highlighter-outline",
                        },
                        "Highlighter",
                        "tool-highlighter"
                    ),
                    new GAnnotationProperties(
                        [
                            GAnnotationProperties.PropertySet.BorderLayer,
                            GAnnotationProperties.PropertySet.BorderWidth,
                            GAnnotationProperties.PropertySet.BorderHeadMarker,
                            GAnnotationProperties.PropertySet.BorderTailMarker,
                        ],
                        GObject.GArrowAnnotation,
                        GEditor.GArrowAnnotationTool,
                        "gravit-icon-annotationtools-line",
                        "text.tooltip-arrow-tool",
                        {
                            _ptb: "text.tooltip-arrow-border",
                            _ptbdropper: "text.tooltip-arrow-dropper-border",
                            _bw: "text.tooltip-arrow-outline",
                        },
                        "Line",
                        "tool-line"
                    ),
                    new GAnnotationProperties(
                        [GAnnotationProperties.PropertySet.FillLayer],
                        GObject.GCommentAnnotation,
                        GEditor.GCommentAnnotationTool,
                        "gravit-icon-annotationtools-comment",
                        "text.tooltip-comment-tool",
                        {
                            _ptf: "text.tooltip-comment-fill",
                            _ptfdropper: "text.tooltip-comment-dropper-fill",
                        },
                        "Note",
                        "tool-comment"
                    ),
                    new GReviewDockerProperties(),
                ];
            }),
            (GAnnotationsSidebar.prototype.activate = function () {
                ((this._active = true),
                    !this._listenersAdded && this._document && (this._addListeners(), this._updatePropertyPanels(true)),
                    this._updateToolbarButtons(),
                    this._document && this._document.getActiveWindow() && this._activateAnnotations(),
                    gDesigner.getToolManager().activateTool(GEditor.GPointerTool, null, true),
                    this.syncAnnotations());
            }),
            (GAnnotationsSidebar.prototype.deactivate = function () {
                ((this._active = false),
                    this._listenersAdded && this._removeListeners(),
                    this._document && this._document.getActiveWindow() && this._deactivateAnnotations());
            }),
            (GAnnotationsSidebar.prototype._activateAnnotations = function () {
                this._document &&
                    (this._document.getEditor().clearSelection(),
                    (this._document.getActiveWindow().getView().getViewConfiguration().elementAnnotations = true),
                    (this._document.getActiveWindow().getView().getViewConfiguration().showResolvedAnnotations = this._showResolved),
                    (this._showDistance = GEditor.GEditorOptions.showDistance),
                    (this._toolExitKey = GEditor.GEditorOptions.toolExitKey),
                    (GEditor.GEditorOptions.showDistance = false),
                    (GEditor.GEditorOptions.toolExitKey = GPlatform.GKey.Constant.ESC),
                    this._document.getActiveWindow().getView().invalidateAndResetCache(null));
            }),
            (GAnnotationsSidebar.prototype._deactivateAnnotations = function () {
                if (this._document) {
                    var editor = this._document.getEditor();
                    (editor.getSelection() &&
                        editor.updateSelection(
                            false,
                            editor.getSelection().filter((element) => !element.hasMixin(GObject.GAnnotation))
                        ),
                        (this._document.getActiveWindow().getView().getViewConfiguration().elementAnnotations = false),
                        (GEditor.GEditorOptions.showDistance = this._showDistance),
                        (GEditor.GEditorOptions.toolExitKey = this._toolExitKey),
                        this._document.getActiveWindow().getView().invalidateAndResetCache(null));
                }
            }),
            (GAnnotationsSidebar.prototype._addListeners = function () {
                var scene = this._document.getScene(),
                    editor = this._document.getEditor();
                (gDesigner.getToolManager().addEventListener(GEditor.GToolManager.ToolChangedEvent, this._updateFromToolOrSelection, this),
                    editor.addEventListener(GEditor.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                    scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this),
                    scene.addEventListener(GObject.GNode.AfterInsertEvent, this._afterInsertEvent, this),
                    scene.addEventListener(GObject.GNode.AfterRemoveEvent, this._afterRemoveEvent, this),
                    gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                    gDesigner.isTouchEnabled() &&
                        this._htmlElement &&
                        (this._htmlElement[0].addEventListener("focusin", this._handleFocusInEvent, true),
                        this._htmlElement[0].addEventListener("focusout", this._handleFocusOutEvent, true)),
                    (this._listenersAdded = true));
            }),
            (GAnnotationsSidebar.prototype._removeListeners = function () {
                var scene = this._document.getScene(),
                    editor = this._document.getEditor();
                (gDesigner.getToolManager().removeEventListener(GEditor.GToolManager.ToolChangedEvent, this._updateFromToolOrSelection, this),
                    editor.removeEventListener(GEditor.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                    scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this),
                    scene.removeEventListener(GObject.GNode.AfterInsertEvent, this._afterInsertEvent, this),
                    scene.removeEventListener(GObject.GNode.AfterRemoveEvent, this._afterRemoveEvent, this),
                    gDesigner.removeEventListener(GSettingChangedEvent, this._settingChanged, this),
                    this._htmlElement &&
                        (this._htmlElement[0].removeEventListener("focusin", this._handleFocusInEvent),
                        this._htmlElement[0].removeEventListener("focusout", this._handleFocusOutEvent)),
                    (this._listenersAdded = false));
            }),
            (GAnnotationsSidebar.prototype._stateChangedEvent = async function (event) {
                this._updateToolbar();
            }),
            (GAnnotationsSidebar.prototype._updateToolbar = async function () {
                const applicationManager = gDesigner.getApplicationManager(),
                    commentingEditingEnabled = applicationManager.isCommentingEditingEnabled(),
                    canResolveAll = await applicationManager.hasAccess(AnnotationPermissions.RESOLVE_ALL_COMMENT_ANNOTATION),
                    resolveAllRow = this._optionsToolbar.find(".resolve-all-row");
                commentingEditingEnabled && canResolveAll ? resolveAllRow.parent().show() : resolveAllRow.parent().hide();
            }),
            (GAnnotationsSidebar.prototype._windowEvent = function (event) {
                event.type === GWindows.WindowEvent.Type.Activated && this._active && this._activateAnnotations();
            }),
            (GAnnotationsSidebar.prototype._documentEvent = function (event) {
                if (!event.document.isLockedByVersionHistory())
                    if (event.type === GDocumentEvent.Type.Activated) {
                        ((this._document = event.document), (this._storageItem = this._document.getStorageItem()));
                        var scene = this._document && this._document.getScene();
                        ((this._localAnnotations = scene && scene.getAnnotations()),
                            this._document.isLocked() || this._updateFromToolOrSelection(true),
                            this._active && !this._listenersAdded && this._addListeners(),
                            this._active && this._document.getActiveWindow() && this._activateAnnotations(),
                            this.trigger(GSidebar.UPDATE_EVENT),
                            this._document.addEventListener(GDocumentStatusEvent, this._documentStatusEvent, this),
                            this._document.addEventListener(GCollaborationEvent, this._collaborationEvent, this),
                            gDesigner.addEventListener(GStorageItemEvent.FileStatusUpdate, this._storageItemFileStatusEvent, this),
                            this._updateNotificationMenu());
                    } else
                        event.type === GDocumentEvent.Type.Deactivated
                            ? (this._listenersAdded && this._removeListeners(),
                              this._document.getActiveWindow() && this._deactivateAnnotations(),
                              this._document.removeEventListener(GDocumentStatusEvent, this._documentStatusEvent, this),
                              this._document.removeEventListener(GCollaborationEvent, this._collaborationEvent, this),
                              gDesigner.removeEventListener(GStorageItemEvent.FileStatusUpdate, this._storageItemFileStatusEvent, this),
                              (this._document = null),
                              (this._storageItem = null),
                              (this._elements = null),
                              (this._currentAnnotations = null),
                              (this._localAnnotations = null),
                              (this._page = null),
                              this._updatePropertyPanels(true),
                              this.trigger(GSidebar.UPDATE_EVENT))
                            : event.type === GDocumentEvent.Type.StorageItemUpdated && this._updatePropertyPanels(true);
            }),
            (GAnnotationsSidebar.prototype._settingChanged = function (event) {
                "touch" === event.key && this._updateToolbarButtons();
            }),
            (GAnnotationsSidebar.prototype._handleFocusInEvent = function (event) {
                $(event.target).is("textarea") && this._htmlElement.addClass("g-annotation-comment-focus");
            }),
            (GAnnotationsSidebar.prototype._handleFocusOutEvent = function (event) {
                $(event.target).is("textarea") && this._htmlElement.removeClass("g-annotation-comment-focus");
            }),
            (GAnnotationsSidebar.prototype._updateNotificationMenu = function () {
                (this._notificationMenu.clearItems(),
                    this._notificationMenu.setTooltipType(richTooltipModule.TOOLTIP_AREA.SIDEBAR),
                    this._document.getId() &&
                        gApi.updateFileData(this._document.getId()).then((fileData) => {
                            const items = [
                                {
                                    caption: GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.notification-all-annotation")),
                                    checked: false,
                                    statType: "All",
                                },
                                {
                                    caption: GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.notification-assign-to-me")),
                                    checked: false,
                                    statType: "Assigned",
                                },
                                {
                                    caption: GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.notification-none")),
                                    checked: false,
                                    statType: "None",
                                },
                            ];
                            ((items[fileData.data.notifications_disabled || 0].checked = true),
                                0 === this._notificationMenu.getItemCount() &&
                                    items.forEach((item) => {
                                        this._notificationMenu.addItem(this._createMenuItem(item));
                                    }));
                        }));
            }),
            (GAnnotationsSidebar.prototype._createMenuItem = function (item) {
                var menuItem = new GMenuItemModule.default(GMenuItemModule.default.Type.Item);
                return (
                    menuItem.setChecked(item.checked),
                    menuItem.setCaption(item.caption),
                    menuItem.addEventListener(GMenuItemModule.default.ActivateEvent, (event) => {
                        const { sender } = event;
                        (this._notificationMenu._items.forEach((menuItem) => {
                            menuItem.setChecked(false);
                        }),
                            sender.setChecked(true),
                            gDesigner.stats("annotations_settings_notifications", item.statType),
                            gApi.updateFileData(this._document.getId(), {
                                notifications_disabled: this._notificationMenu.indexOf(sender),
                            }));
                    }),
                    menuItem
                );
            }),
            (GAnnotationsSidebar.prototype._documentStatusEvent = function (event) {
                event.status === DocumentStatus.Unlocked && this._updateFromToolOrSelection(true);
            }),
            (GAnnotationsSidebar.prototype._collaborationEvent = function (event) {
                if (event.type === GCollaborationEvent.Type.AnnotationsUpdate) {
                    const { data: { lastUpdateTime } = {} } = event;
                    if (lastUpdateTime && this._document) {
                        const scene = this._document.getScene();
                        !scene ||
                            (scene.getLastTimeAnnotationsFromCloudModified() && !DateAPI.lt(scene.getLastTimeAnnotationsFromCloudModified(), lastUpdateTime, false)) ||
                            this.syncAnnotations();
                    }
                } else event.type === GCollaborationEvent.Type.ReviewStatusChanged && this._updateToolbar();
            }),
            (GAnnotationsSidebar.prototype.isToolAllowed = function (tool) {
                return !(![GEditor.GHandTool, GEditor.GPointerTool, GEditor.GZoomTool].some((ToolClass) => tool instanceof ToolClass) && !tool.hasMixin(GEditor.GAnnotationTool));
            }),
            (GAnnotationsSidebar.prototype._toolChangedEvent = function (event) {
                event.previousTool;
                var newTool = event.newTool;
                if (event.newTool.hasMixin(GEditor.GAnnotationTool)) {
                    var activeDocument = gDesigner.getActiveDocument();
                    activeDocument && activeDocument.getEditor() && activeDocument.getEditor().clearSelection();
                }
                this._activeTool(newTool);
            }),
            (GAnnotationsSidebar.prototype._networkAvailabilityChangedEvent = function (event) {
                (this._htmlElement.toggleClass("offline", !event.connected), event.connected && this.syncAnnotations());
            }),
            (GAnnotationsSidebar.prototype._activeTool = function (tool) {
                this._annotationToolbar.find(".toolbar-button").each((index, button) => {
                    var toolClass = $(button).data("toolClass");
                    tool instanceof toolClass ? $(button).addClass("g-active") : $(button).removeClass("g-active");
                });
            }),
            (GAnnotationsSidebar.prototype._afterFlagChangeEvent = function (event) {
                event.node instanceof GObject.GPage &&
                    event.flag === GObject.GNode.Flag.Active &&
                    !this._document.getEditor().hasSelection() &&
                    this._updateFromToolOrSelection();
            }),
            (GAnnotationsSidebar.prototype._afterInsertEvent = function (event) {
                (event.node instanceof GObject.GPage || event.node instanceof GObject.GAnnotationsList) && this._updatePropertyPanels(true);
            }),
            (GAnnotationsSidebar.prototype._afterRemoveEvent = function (event) {
                (event.node instanceof GObject.GPage || event.node instanceof GObject.GAnnotationsList) && this._updatePropertyPanels(true);
            }),
            (GAnnotationsSidebar.prototype.relayout = function (force) {
                this._annotationPanels.forEach((panel) => panel.properties instanceof GAnnotations && panel.properties.relayout(force));
            }),
            (GAnnotationsSidebar.prototype._updateSelection = function () {
                const editor = this._document && this._document.getEditor();
                if (editor) {
                    var page = this._document.getScene().getActivePage();
                    if (((this._page = page), (this._elements = editor.getSelection()), this._elements && this._elements.length)) {
                        if (this._elements.find((element) => !(element.hasMixin(GObject.GAnnotation) || element instanceof GObject.GPage)))
                            return (
                                (this._elements = []),
                                console.warn("deactivating annotations"),
                                void gDesigner.getRightSidebars().setActiveSidebar(GInspectorSidebar.ID)
                            );
                        this._elements = this._elements.filter((element) => element.hasMixin(GObject.GAnnotation));
                    }
                    if (!this._elements || 0 === this._elements.length) {
                        var tool = gDesigner.getToolManager().getActiveTool();
                        if (tool instanceof GEditor.GItemTool) {
                            var defaultStyle = tool.getDefaultStyle();
                            defaultStyle && (this._elements = [defaultStyle]);
                        }
                    }
                    this._elements || (this._elements = []);
                }
            }),
            (GAnnotationsSidebar.prototype._selectionChangedEvent = function (event) {
                (this._updateSelection(), this._updatePropertyPanels(false, false, false));
            }),
            (GAnnotationsSidebar.prototype._updateFromToolOrSelection = function (event) {
                (this._updateSelection(),
                    this._updatePropertyPanels(
                        true === event,
                        event instanceof GEditor.GToolManager.ToolChangedEvent && !(event.newTool instanceof GEditor.GPointerTool)
                    ));
            }),
            (GAnnotationsSidebar.prototype._updateAnnotationArray = function () {
                var fixedPanels,
                    changed = false,
                    alreadyInitialized = false;
                if (
                    (this._panelsContainer
                        ? (alreadyInitialized = true)
                        : ((this._panelsContainer = $("<div></div>").addClass("panels").appendTo(this._htmlElement)),
                          $("<div></div>").addClass("fixed-panels").appendTo(this._panelsContainer),
                          $("<div></div>").addClass("scrolling-panels").appendTo(this._panelsContainer)),
                    (fixedPanels = this._panelsContainer.find(".fixed-panels")),
                    !alreadyInitialized)
                ) {
                    (this._sidebarTitle.appendTo(fixedPanels), this._annotationToolbar.appendTo(fixedPanels), this._annotationsToolbarPanel.appendTo(fixedPanels));
                    for (var o = 0; o < this.getAnnotationsProperties().length; o++)
                        changed = this._addPropertiesPanel(this.getAnnotationsProperties()[o], o) || changed;
                }
                if (this._document) {
                    for (o = this._annotationPanels.length - 1; o >= 0; o--) {
                        var i = this._annotationPanels[o];
                        (i.properties.setPage(null),
                            i.panel && i.panel.remove(),
                            i.toolbar && i.toolbar.remove(),
                            i.divider && i.divider.remove());
                    }
                    ((this._annotationPanels = []),
                        this._document.getScene().iteratePages((page) => {
                            changed = this._addPropertiesPanel(page) || changed;
                        }, true));
                }
                return changed;
            }),
            (GAnnotationsSidebar.prototype._addPropertiesPanel = function (propertiesOrPage, index) {
                let properties,
                    toolbar,
                    panel = $("<div></div>").css("display", "none").addClass("properties-panel"),
                    changed = false;
                const scrollingPanels = this._panelsContainer.find(".scrolling-panels");
                if (propertiesOrPage instanceof GProperties) {
                    properties = propertiesOrPage;
                    var propertyPanel = $("<div></div>").addClass("annotations-property-panel");
                    if ((properties.init(propertyPanel, this._annotationToolbar), propertiesOrPage._availableProperties && 0 === propertiesOrPage._availableProperties.length)) return changed;
                    var topArrow = $("<div></div>").css("display", "none");
                    (propertiesOrPage instanceof GAnnotationProperties &&
                        topArrow.append(
                            $("<div></div>")
                                .addClass("arrow-top")
                                .css(
                                    "right",
                                    (gDesigner.isTouchEnabled()
                                        ? GAnnotationsSidebar.ANNOTATION_PROPERTIES_ARROW_POSITION_TOUCH[index]
                                        : GAnnotationsSidebar.ANNOTATION_PROPERTIES_ARROW_POSITION[index]) + "%"
                                )
                        ),
                        this._annotationsToolbarPanel.append(topArrow),
                        this._annotationsToolbarPanel.append(propertyPanel),
                        (toolbar = this._annotationToolbar),
                        (panel = propertyPanel),
                        this._annotationProperties.push({
                            panel: panel,
                            toolbar: toolbar,
                            properties: properties,
                            topArrow: topArrow,
                        }));
                } else {
                    if (
                        ((toolbar = $("<div></div>").addClass("annotations-page-toolbar toolbar")),
                        (properties = new GAnnotations()),
                        panel.appendTo(scrollingPanels),
                        properties.init(
                            panel,
                            toolbar,
                            this._active,
                            this._showResolved,
                            this._updatePropertyPanels.bind(this),
                            function (annotations) {
                                this._currentAnnotations = annotations;
                            }.bind(this)
                        ),
                        "" !== toolbar.html() ? toolbar.insertBefore(panel) : (toolbar = null),
                        this._currentAnnotations)
                    ) {
                        let storedAnnotations,
                            cachedList,
                            pageAnnotations = propertiesOrPage.getAnnotations();
                        storedAnnotations = GObject.GNode.store(pageAnnotations);
                        let matchedById = false;
                        if (
                            (pageAnnotations.restored
                                ? (cachedList = GAnnotationsUtils.findAnnotationsListForPage(propertiesOrPage, this._currentAnnotations))
                                : ((cachedList = this._currentAnnotations.find((item) => item["@id"] === storedAnnotations["@id"])), (matchedById = true)),
                            cachedList && !GObject.GUtil.equals(storedAnnotations, cachedList, true))
                        ) {
                            let restoredList = GObject.GNode.restore(cachedList);
                            if (restoredList) {
                                let pageAnnotations = propertiesOrPage.getAnnotations(),
                                    restoredChildren = restoredList.getChildren() || [];
                                if ((restoredList.clearChildren(), matchedById && pageAnnotations.getProperty("aid") !== restoredList.getProperty("aid"))) {
                                    (pageAnnotations.setProperty("aid", restoredList.getProperty("aid")), pageAnnotations.clearChildren());
                                    for (let e = 0; e < restoredChildren.length; e++) pageAnnotations.appendChild(restoredChildren[e]);
                                    changed = true;
                                } else {
                                    let merged = GAnnotationsUtils.mergeAnnotations(pageAnnotations, pageAnnotations.getChildren(), restoredList, restoredChildren);
                                    changed = changed || merged;
                                }
                            }
                        }
                    }
                    (properties.setPage(propertiesOrPage),
                        this._annotationPanels.push({
                            panel: panel,
                            toolbar: toolbar,
                            properties: properties,
                        }));
                }
                return changed;
            }),
            (GAnnotationsSidebar.prototype._updateToolbarButtons = function () {
                this._annotationProperties.forEach((entry, index) => {
                    const { topArrow, properties } = entry;
                    if (properties instanceof GAnnotationProperties) {
                        const positions = gDesigner.isTouchEnabled()
                            ? GAnnotationsSidebar.ANNOTATION_PROPERTIES_ARROW_POSITION_TOUCH
                            : GAnnotationsSidebar.ANNOTATION_PROPERTIES_ARROW_POSITION;
                        topArrow.find(".arrow-top").css("right", positions[index] + "%");
                    }
                });
            }),
            (GAnnotationsSidebar.prototype._updatePropertyPanels = function (rebuild, toolChanged) {
                let shouldRelayout = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                if (this._updatingPropertyPanels) return;
                (this.updateNotificationOption(), (this._updatingPropertyPanels = true));
                const updatePanels = () => {
                    let changed = false;
                    try {
                        rebuild && (changed = this._updateAnnotationArray());
                        var allPanels = this._annotationProperties.concat(this._annotationPanels),
                            indicator = this._annotationToolbar.find(".indicator");
                        indicator.css("visibility", "hidden");
                        for (var s = 0; s < allPanels.length; ++s) {
                            var l = allPanels[s],
                                c = l.properties,
                                d = c.isAvailable(this._transformMode);
                            if (d)
                                if (c instanceof GAnnotationProperties || c instanceof GReviewDockerProperties)
                                    (l.panel.show(),
                                        (d = l.properties.update(
                                            this._document,
                                            this._elements,
                                            gDesigner.getToolManager().getActiveTool()
                                        )) || l.panel.hide());
                                else {
                                    var u = c.getPage().getAnnotations().getChildren();
                                    ((d = l.properties.update(this._document, u, toolChanged)), shouldRelayout && l.properties.relayout());
                                }
                            if (l.toolbar && l.toolbar !== this._annotationToolbar)
                                (l.toolbar.css("display", d ? "" : "none"),
                                    c instanceof GReviewDockerProperties ||
                                        (d
                                            ? (l.toolbar.gAccordion("toggleOpen", c.getPage().hasFlag(GObject.GNode.Flag.Active)),
                                              l.toolbar.gAccordion("init", l.panel, "label", null, "annotations"),
                                              c.getPage().hasFlag(GObject.GNode.Flag.Active)
                                                  ? l.panel.addClass("g-active")
                                                  : l.panel.removeClass("g-active"))
                                            : l.panel.css("display", "none")));
                            else if (
                                (l.panel.css("display", d ? "" : "none"),
                                l.topArrow.css("display", d ? "" : "none"),
                                d && !(c instanceof GReviewDockerProperties))
                            ) {
                                let toolbarIcon = this._annotationToolbar.find("." + c._toolbarIcon);
                                (indicator.css("left", toolbarIcon.position().left + toolbarIcon.width() / 2 - 6), indicator.css("visibility", "visible"));
                            }
                            d && this._annotationsToolbarPanel.css("display", "");
                        }
                        this._document || (this._annotationPanels = []);
                    } finally {
                        this._updatingPropertyPanels = false;
                    }
                    return changed;
                };
                !this._currentAnnotations && this._document && this._document.getAnnotationsId()
                    ? GAnnotationsUtils
                          .getCloudAnnotationsForDocument(this._document)
                          .then((result) => {
                              let changed = false;
                              if (this._document && this._document.getAnnotationsId() !== result.cid)
                                  return ((this._updatingPropertyPanels = false), changed);
                              if (((this._currentAnnotations = result.annotationsCollection), (changed = updatePanels()), changed)) {
                                  let scene = this._document.getScene();
                                  (scene && scene.setLastTimeAnnotationsFromCloudModified(result.lastUpdateTime),
                                      gDesigner.notifyDocumentModified(this._document),
                                      this._active ? this._activateAnnotations() : this.trigger(GSidebar.UPDATE_EVENT));
                              }
                          })
                          .catch((error) => {
                              !this._active || (error instanceof AnnotationsError && error.cid && this._document && this._document.getAnnotationsId() !== error.cid)
                                  ? (this._updatingPropertyPanels = false)
                                  : ((this._currentAnnotations = []), updatePanels());
                          })
                    : updatePanels();
            }),
            (GAnnotationsSidebar.prototype.updateBadge = function (badgeElement) {
                var counts = { unread: 0, total: 0 },
                    pages = this._annotationPanels.map((panel) => panel.properties.getPage()),
                    isCloud = this._document && (this._document.isCloudFile() || this._document.isExternalFile());
                if (SHOW_SIDEBAR_BADGE && !this._active) {
                    var syncUser = gDesigner.getSyncUser();
                    if (isCloud) {
                        if (this._currentAnnotations) {
                            pages.map((page) => GAnnotationsUtils.findAnnotationsListForPage(page, this._currentAnnotations))
                                .filter((list) => !!list)
                                .forEach(function (list) {
                                    list.$ &&
                                        list.$.forEach(function (annotation) {
                                            var isOwner = GAnnotationsUtils.isOwner(syncUser, annotation);
                                            annotation.rsv ||
                                                (annotation.$ && 0 != annotation.$.length
                                                    ? (annotation.$.forEach(function (comment) {
                                                          "cmt" == comment["@"] &&
                                                              (syncUser &&
                                                                  syncUser.getUID() !== comment.uid &&
                                                                  comment.type !== GObject.GComment.Type.Close &&
                                                                  !(comment.read || []).includes(syncUser.getUID()) &&
                                                                  counts.unread++,
                                                              counts.total++);
                                                      }),
                                                      isOwner || (annotation.read || []).includes(syncUser.getUID()) || counts.unread++,
                                                      counts.total++)
                                                    : (isOwner || (annotation.read || []).includes(syncUser.getUID()) || counts.unread++, counts.total++));
                                        });
                                });
                        }
                    } else if (this._localAnnotations) {
                        pages.map((page) => GAnnotationsUtils.findAnnotationsListForPage(page, this._localAnnotations))
                            .filter((list) => !!list)
                            .forEach(function (list) {
                                for (var annotation = list.getFirstChild(); null !== annotation && annotation.hasMixin(GObject.GAnnotation); annotation = annotation.getNext()) {
                                    var o = GAnnotationsUtils.isOwner(syncUser, annotation);
                                    if (!annotation.getProperty("rsv"))
                                        if (annotation.getChildren().length > 0) {
                                            for (var r = annotation.getFirstChild(); null !== r && r instanceof GObject.GComment; r = r.getNext())
                                                (syncUser &&
                                                    syncUser.getUID() !== r.getProperty("uid") &&
                                                    r.getProperty("type") !== GObject.GComment.Type.Close &&
                                                    !(r.getProperty("read") || []).includes(syncUser.getUID()) &&
                                                    counts.unread++,
                                                    counts.total++);
                                            (o || (annotation.getProperty("read") || []).includes(syncUser.getUID()) || counts.unread++, counts.total++);
                                        } else (o || (annotation.getProperty("read") || []).includes(syncUser.getUID()) || counts.unread++, counts.total++);
                                }
                            });
                    }
                }
                return (counts.total > 0 && (badgeElement.text(counts.total), counts.unread > 0 ? badgeElement.addClass("new") : badgeElement.removeClass("new")), !!counts.total);
            }),
            (GAnnotationsSidebar.prototype.isAnnotationPropertiesEditing = function () {
                return this._annotationProperties.some((entry) => {
                    let { properties: properties } = entry;
                    return (properties.isEditing && properties.isEditing()) || false;
                });
            }),
            (GAnnotationsSidebar.prototype.updateNotificationOption = function () {
                const notificationLabel = this._optionsToolbar.find(".notification-label").closest(".columns");
                this._document && this._document.isCloudFile()
                    ? (notificationLabel.removeAttr("data-title"), notificationLabel.toggleClass("g-disabled", false))
                    : (notificationLabel.attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.save-file-tip"))),
                      notificationLabel.toggleClass("g-disabled", true));
            }),
            (GAnnotationsSidebar.prototype.toString = function () {
                return "[Object GAnnotationsSidebar]";
            }),
            (GAnnotationsSidebar.prototype._createHoverNotificationFrag = function () {
                let frag = $("<div>")
                    .addClass("g-menu hover-notification-container")
                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.hover-notification")));
                return (
                    frag
                        .find("span")
                        .addClass("highlight")
                        .click(() => {
                            new GSettingsDialog().then((dialog) => dialog.open());
                        }),
                    frag
                );
            }),
            (GAnnotationsSidebar.prototype._openHoverNotification = function (targetElement) {
                let frag = this._createHoverNotificationFrag(),
                    menuElement = $("body").find(".g-annotation-sidebar-notification-menu")[0];
                if (
                    (frag.appendTo($("body")),
                    document.addEventListener("click", this._removeHoverNotificationFrag),
                    menuElement &&
                        (menuElement.addEventListener("mouseenter", function () {
                            let frag = $("body").find(".hover-notification-container");
                            frag.length && $(frag[0]).css("display", "block");
                        }),
                        menuElement.addEventListener("mouseleave", function () {
                            let frag = $("body").find(".hover-notification-container");
                            frag.length &&
                                setTimeout(function () {
                                    $(frag[0]).css("display", "none");
                                }, 250);
                        }),
                        $(menuElement)
                            .find("li")
                            .map((index, element) => {
                                element.addEventListener("mousedown", function () {
                                    let frag = $("body").find(".hover-notification-container");
                                    frag.length && $(frag[0]).css("display", "none");
                                });
                            })),
                    frag.parent().is("body"))
                ) {
                    var fragWidth = frag.outerWidth(),
                        fragHeight = frag.outerHeight(),
                        windowWidth = $(window).width(),
                        windowHeight = $(window).height(),
                        targetRect = { x: 0, y: 0, width: 0, height: 0 },
                        target = $(targetElement),
                        offset = target.offset();
                    ((targetRect.x = offset.left), (targetRect.y = offset.top), (targetRect.width = target.outerWidth()), (targetRect.height = target.outerHeight()));
                    var left = 0;
                    (left = targetRect.x + targetRect.width) + fragWidth > windowWidth && (left = targetRect.x - fragWidth);
                    var top = 0;
                    (top = targetRect.y + targetRect.height) + fragHeight > windowHeight && (top = targetRect.y - fragHeight);
                    const minLeft = this._rangeLeftX ? this._rangeLeftX : 0;
                    left < minLeft && (left = minLeft);
                    const maxLeft = this._rangeRightX ? this._rangeRightX : windowWidth;
                    left + fragWidth >= maxLeft && (left = maxLeft - fragWidth);
                    const minTop = this._rangeLeftY ? this._rangeLeftY : 0;
                    top < minTop && (top = minTop);
                    const maxTop = this._rangeRightY ? this._rangeRightY : windowHeight;
                    top + fragHeight >= maxTop && (top = maxTop - fragHeight);
                    const finalTop = top - fragHeight - 10;
                    (frag.css("left", left), frag.css("top", finalTop), frag.addClass("g-menu-right g-menu-bottom"));
                }
            }),
            (GAnnotationsSidebar.prototype._removeHoverNotificationFrag = function () {
                let frag = $("body").find(".hover-notification-container");
                frag.length && (frag.remove(), document.removeEventListener("click", this._removeHoverNotificationFrag));
            }),
            (module.exports = GAnnotationsSidebar));
    };
