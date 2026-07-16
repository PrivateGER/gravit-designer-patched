module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(8 /* Symbol */), require(3), require(71 /* polyfill:String */), require(4), require(41), require(13), require(32), require(38), require(97), require(33));
        var i = require(53),
            GObject = require(1),
            GPlatform = require(15),
            s = _interopRequireDefault(require(238)),
            l = _interopRequireDefault(require(339)),
            c = require(67),
            d = _interopRequireDefault(require(340)),
            GSettingsDialog = require(1275),
            p = require(444),
            g = require(78),
            h = (require(606), require(806)),
            f = require(395),
            m = require(864),
            y = require(123),
            v = require(1535),
            _ = require(603),
            GAnnotationProperties = require(1536),
            w = require(358),
            C = require(592);
        const x = require(392),
            S = require(135);
        var GReviewDockerProperties = require(1537);
        const A = require(291),
            T = require(393),
            G = require(336),
            P = require(434),
            { SHOW_SIDEBAR_BADGE, NOTIFICATION_SETTINGS_ENABLED } = require(10 /* designerConfig */),
            I = require(86),
            k = require(217),
            O = require(1279),
            {
                DateAPI,
                FileStatus: { APPROVED },
            } = require(10 /* designerConfig */),
            SidebarsIds = require(198);
        function N() {
            (h.call(this),
                (this._annotationPanels = []),
                (this._annotationProperties = []),
                (this._handleFocusInEvent = this._handleFocusInEvent.bind(this)),
                (this._handleFocusOutEvent = this._handleFocusOutEvent.bind(this)));
        }
        (GObject.GObject.inherit(N, h),
            (N.ANNOTATION_PROPERTIES_ARROW_POSITION = [32.5, 44, 55.5, 67, 78.5, 90]),
            (N.ANNOTATION_PROPERTIES_ARROW_POSITION_TOUCH = [25.5, 38, 50.5, 63, 75.5, 88]),
            (N.ID = SidebarsIds.SidebarsIds.GAnnotationsSidebar),
            (N.TITLE = new GObject.GLocaleKey("GAnnotationsSidebar", "text.title")),
            (N.prototype._htmlElement = null),
            (N.prototype._panelsContainer = null),
            (N.prototype._annotationPanels = null),
            (N.prototype._annotationProperties = null),
            (N.prototype._document = null),
            (N.prototype._notificationMenu = null),
            (N.prototype._elements = null),
            (N.prototype._listenersAdded = false),
            (N.prototype._annotationToolbar = null),
            (N.prototype._annotationsToolbarPanel = null),
            (N.prototype._showResolved = false),
            (N.prototype._showDistance = i.GEditorOptions.showDistance),
            (N.prototype._toolExitKey = i.GEditorOptions.toolExitKey),
            (N.prototype._currentAnnotations = null),
            (N.prototype._localAnnotations = null),
            (N.prototype._page = null),
            (N.prototype.getId = function () {
                return N.ID;
            }),
            (N.prototype.getTitle = function () {
                return N.TITLE;
            }),
            (N.prototype.isEnabled = function () {
                return !!this._document;
            }),
            (N.prototype.isVisible = function () {
                return !!gDesigner.getApplicationManager().isCommentingEnabled();
            }),
            (N.prototype.isDeactivatable = function () {
                return !this._annotationPanels || !this._annotationPanels.some((e) => e.properties.isAddingAnnotation());
            }),
            (N.prototype.getOrientation = function () {
                return f.Orientation.Right;
            }),
            (N.prototype.getMinimumWidth = function () {
                return this._getSidebarWidth();
            }),
            (N.prototype.isResizeable = function () {
                return false;
            }),
            (N.prototype.getDefaultWidth = function () {
                return this._getSidebarWidth();
            }),
            (N.prototype._getSidebarWidth = function () {
                return gDesigner.isTouchEnabled() ? 376 : 300;
            }),
            (N.prototype._storageItemFileStatusEvent = function (e) {
                this._storageItem &&
                    this._storageItem === e.storageItem &&
                    ((e.oldStatus !== APPROVED && e.newStatus !== APPROVED) || this._updatePropertyPanels(true));
            }),
            (N.prototype._toggleShowResolved = function (e) {
                if (e !== this._showResolved) {
                    this._showResolved = e;
                    for (var t = this._annotationPanels.length - 1; t >= 0; t--) {
                        this._annotationPanels[t].properties.toggleShowResolved(e);
                    }
                    ((this._document.getActiveWindow().getView().getViewConfiguration().showResolvedAnnotations = e),
                        this._document.getActiveWindow().getView().invalidateAndResetCache(null));
                }
            }),
            (N.prototype.syncAnnotations = function (e) {
                return this._annotationPanels && this._document && this._document.getAnnotationsId()
                    ? this.isAnnotationPropertiesEditing()
                        ? Promise.resolve()
                        : new Promise((t) => {
                              (e
                                  ? w.updateAndReturnCloudAnnotationsForDocument(this._document, this._currentAnnotations)
                                  : w.getCloudAnnotationsForDocument(this._document)
                              ).then((n) => {
                                  let o = n.annotationsCollection,
                                      i = false;
                                  this._document && this._document.getAnnotationsId() !== n.cid && t(i);
                                  let a = false;
                                  if (o) {
                                      this._currentAnnotations = o;
                                      for (let t = this._annotationPanels.length - 1; t >= 0; t--) {
                                          let n = this._annotationPanels[t];
                                          if (n.properties instanceof v) {
                                              let t = this._getAnnotationsToSet(o, n.properties.getPage()),
                                                  r = n.properties.setAnnotations(t);
                                              r === O.UPDATED
                                                  ? (i = true)
                                                  : r === O.DELAYED &&
                                                    ((a = true), n.properties.setDelayedSyncCallback(this.syncAnnotations.bind(this, e)));
                                          }
                                      }
                                  }
                                  if (((i = i && !a), i)) {
                                      let e = this._document.getScene();
                                      (e && e.setLastTimeAnnotationsFromCloudModified(n.lastUpdateTime),
                                          gDesigner.notifyDocumentModified(this._document),
                                          this._active ? this._activateAnnotations() : this.trigger(h.UPDATE_EVENT));
                                  }
                                  t(i);
                              });
                          })
                    : Promise.resolve();
            }),
            (N.prototype._getAnnotationsToSet = function (e, t) {
                let n = w.findAnnotationsListForPage(t, e);
                return (n || (n = { "@": "annlst" }), n);
            }),
            (N.prototype.init = function (e) {
                (h.prototype.init.call(this, e),
                    (this._htmlElement = e),
                    (this._notificationMenu = new s.default(null, "g-annotation-sidebar-notification-menu")));
                const t = gDesigner.getApplicationManager().isCommentingEditingEnabled();
                ((this._sidebarTitle = $("<div></div>").addClass("sidebar-title-inner").append(GObject.GLocale.get(this.getTitle()))),
                    (this._annotationToolbar = $("<div></div>").addClass("toolbar annotations-toolbar")));
                const n = $("<button></button>");
                var o = $("<div></div>")
                    .addClass("annotation-sidebar-options")
                    .gOverlay({
                        releaseOnClose: false,
                        clazz: "g-annotation-sidebar-option-overlay",
                        closeCallback: () => n.removeClass("g-active"),
                    });
                this._annotationsToolbarPanel = $("<div></div>").addClass("properties-panel").addClass("annotations-properties-panel");
                var r = $("<div></div>").addClass("annotation-options-box").appendTo(this._annotationToolbar);
                (n
                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.annotation-options")))
                    .addClass("annotation-options")
                    .append($("<span></span>").addClass("gravit-icon-settings"))
                    .on(
                        "click",
                        function (e) {
                            (o.gOverlay("open", $(e.target).closest("button")), n.addClass("g-active"));
                        }.bind(this)
                    )
                    .appendTo(r),
                    $("<span></span>").addClass("indicator").appendTo(this._annotationToolbar),
                    (this._optionsToolbar = $("<div></div>").gPropertyRow({
                        noPaddingRight: true,
                        clickable: true,
                        rawClick: (e) => {
                            var t = !$(e.target).find("input").prop("checked");
                            ($(e.target).find("input").prop("checked", t),
                                gDesigner.stats("annotations_settings_show-resolved", t ? "On" : "Off"),
                                this._toggleShowResolved(t),
                                e.stopPropagation());
                        },
                        columns: [
                            {
                                width: "100%",
                                content: $("<label>")
                                    .append(
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .prop("checked", this._showResolved)
                                            .on("change", (e) => {
                                                var t = $(e.target).prop("checked");
                                                (gDesigner.stats("annotations_settings_show-resolved", t ? "On" : "Off"),
                                                    this._toggleShowResolved(t),
                                                    e.stopPropagation());
                                            })
                                    )
                                    .append($("<span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.show-resolved")))),
                            },
                        ],
                    })),
                    t &&
                        this._optionsToolbar.gPropertyRow({
                            noPaddingRight: true,
                            clickable: true,
                            rawClick: () => {
                                gDesigner.getApplicationManager().isCommentingEditingEnabled() &&
                                    (w.resolveAllComments(this._document), this.relayout(true));
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
                            rawClick: (e) => {
                                if (this._document && this._document.isCloudFile())
                                    (this._notificationMenu.open(e.target, p.Position.Right_Bottom, p.Position.Right_Bottom),
                                        $("body").find(".hover-notification-container") && this._removeHoverNotificationFrag(),
                                        this._openHoverNotification(e.target));
                                else {
                                    this._optionsToolbar.find(".notification-label").closest(".columns").gTooltip("show");
                                }
                                e.stopPropagation();
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
                    this._optionsToolbar.appendTo(o),
                    $("<div/>")
                        .addClass("offline-overlay-message")
                        .append(
                            $("<div/>")
                                .addClass("box")
                                .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "title.unavailable-feature"))))
                        )
                        .appendTo(this._htmlElement),
                    gDesigner.addEventListener(g, this._documentEvent, this),
                    gDesigner.getWindows().addEventListener(_.WindowEvent, this._windowEvent, this),
                    gDesigner.getToolManager().addEventListener(i.GToolManager.ToolChangedEvent, this._toolChangedEvent, this),
                    gDesigner.addEventListener(x, this._stateChangedEvent, this),
                    gDesigner.addEventListener(A, this._networkAvailabilityChangedEvent, this),
                    this._activeTool(gDesigner.getToolManager().getActiveTool()),
                    this._updatePropertyPanels(true));
            }),
            (N.prototype.getTouchTools = function () {
                if (!this.isEnabled()) return [];
                if (!this._active) {
                    const e = this._document && this._document.getEditor(),
                        t = e && e.getSelection();
                    if (t && t.length) return [];
                }
                return [
                    new d.default({
                        id: "annotation",
                        sidebar: this.getId(),
                        icon: "gravit-icon-touch-comment-docker",
                        panel: [this._annotationsToolbarPanel, ".annotations-properties-panel"],
                        toolbar: [this._annotationToolbar, ".annotations-toolbar"],
                    }),
                ];
            }),
            (N.prototype.getAnnotationsProperties = function () {
                return [
                    new GAnnotationProperties(
                        [GAnnotationProperties.PropertySet.FillLayer, GAnnotationProperties.PropertySet.BorderLayer, GAnnotationProperties.PropertySet.BorderWidth],
                        GObject.GEllipseAnnotation,
                        i.GEllipseAnnotationTool,
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
                        i.GRectangleAnnotationTool,
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
                        i.GPencilAnnotationTool,
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
                        i.GHighlighterAnnotationTool,
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
                        i.GArrowAnnotationTool,
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
                        i.GCommentAnnotationTool,
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
            (N.prototype.activate = function () {
                ((this._active = true),
                    !this._listenersAdded && this._document && (this._addListeners(), this._updatePropertyPanels(true)),
                    this._updateToolbarButtons(),
                    this._document && this._document.getActiveWindow() && this._activateAnnotations(),
                    gDesigner.getToolManager().activateTool(i.GPointerTool, null, true),
                    this.syncAnnotations());
            }),
            (N.prototype.deactivate = function () {
                ((this._active = false),
                    this._listenersAdded && this._removeListeners(),
                    this._document && this._document.getActiveWindow() && this._deactivateAnnotations());
            }),
            (N.prototype._activateAnnotations = function () {
                this._document &&
                    (this._document.getEditor().clearSelection(),
                    (this._document.getActiveWindow().getView().getViewConfiguration().elementAnnotations = true),
                    (this._document.getActiveWindow().getView().getViewConfiguration().showResolvedAnnotations = this._showResolved),
                    (this._showDistance = i.GEditorOptions.showDistance),
                    (this._toolExitKey = i.GEditorOptions.toolExitKey),
                    (i.GEditorOptions.showDistance = false),
                    (i.GEditorOptions.toolExitKey = GPlatform.GKey.Constant.ESC),
                    this._document.getActiveWindow().getView().invalidateAndResetCache(null));
            }),
            (N.prototype._deactivateAnnotations = function () {
                if (this._document) {
                    var e = this._document.getEditor();
                    (e.getSelection() &&
                        e.updateSelection(
                            false,
                            e.getSelection().filter((e) => !e.hasMixin(GObject.GAnnotation))
                        ),
                        (this._document.getActiveWindow().getView().getViewConfiguration().elementAnnotations = false),
                        (i.GEditorOptions.showDistance = this._showDistance),
                        (i.GEditorOptions.toolExitKey = this._toolExitKey),
                        this._document.getActiveWindow().getView().invalidateAndResetCache(null));
                }
            }),
            (N.prototype._addListeners = function () {
                var e = this._document.getScene(),
                    t = this._document.getEditor();
                (gDesigner.getToolManager().addEventListener(i.GToolManager.ToolChangedEvent, this._updateFromToolOrSelection, this),
                    t.addEventListener(i.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                    e.addEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this),
                    e.addEventListener(GObject.GNode.AfterInsertEvent, this._afterInsertEvent, this),
                    e.addEventListener(GObject.GNode.AfterRemoveEvent, this._afterRemoveEvent, this),
                    gDesigner.addEventListener(S, this._settingChanged, this),
                    gDesigner.isTouchEnabled() &&
                        this._htmlElement &&
                        (this._htmlElement[0].addEventListener("focusin", this._handleFocusInEvent, true),
                        this._htmlElement[0].addEventListener("focusout", this._handleFocusOutEvent, true)),
                    (this._listenersAdded = true));
            }),
            (N.prototype._removeListeners = function () {
                var e = this._document.getScene(),
                    t = this._document.getEditor();
                (gDesigner.getToolManager().removeEventListener(i.GToolManager.ToolChangedEvent, this._updateFromToolOrSelection, this),
                    t.removeEventListener(i.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                    e.removeEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this),
                    e.removeEventListener(GObject.GNode.AfterInsertEvent, this._afterInsertEvent, this),
                    e.removeEventListener(GObject.GNode.AfterRemoveEvent, this._afterRemoveEvent, this),
                    gDesigner.removeEventListener(S, this._settingChanged, this),
                    this._htmlElement &&
                        (this._htmlElement[0].removeEventListener("focusin", this._handleFocusInEvent),
                        this._htmlElement[0].removeEventListener("focusout", this._handleFocusOutEvent)),
                    (this._listenersAdded = false));
            }),
            (N.prototype._stateChangedEvent = async function (e) {
                this._updateToolbar();
            }),
            (N.prototype._updateToolbar = async function () {
                const e = gDesigner.getApplicationManager(),
                    t = e.isCommentingEditingEnabled(),
                    n = await e.hasAccess(P.RESOLVE_ALL_COMMENT_ANNOTATION),
                    o = this._optionsToolbar.find(".resolve-all-row");
                t && n ? o.parent().show() : o.parent().hide();
            }),
            (N.prototype._windowEvent = function (e) {
                e.type === _.WindowEvent.Type.Activated && this._active && this._activateAnnotations();
            }),
            (N.prototype._documentEvent = function (e) {
                if (!e.document.isLockedByVersionHistory())
                    if (e.type === g.Type.Activated) {
                        ((this._document = e.document), (this._storageItem = this._document.getStorageItem()));
                        var t = this._document && this._document.getScene();
                        ((this._localAnnotations = t && t.getAnnotations()),
                            this._document.isLocked() || this._updateFromToolOrSelection(true),
                            this._active && !this._listenersAdded && this._addListeners(),
                            this._active && this._document.getActiveWindow() && this._activateAnnotations(),
                            this.trigger(h.UPDATE_EVENT),
                            this._document.addEventListener(k, this._documentStatusEvent, this),
                            this._document.addEventListener(T, this._collaborationEvent, this),
                            gDesigner.addEventListener(G.FileStatusUpdate, this._storageItemFileStatusEvent, this),
                            this._updateNotificationMenu());
                    } else
                        e.type === g.Type.Deactivated
                            ? (this._listenersAdded && this._removeListeners(),
                              this._document.getActiveWindow() && this._deactivateAnnotations(),
                              this._document.removeEventListener(k, this._documentStatusEvent, this),
                              this._document.removeEventListener(T, this._collaborationEvent, this),
                              gDesigner.removeEventListener(G.FileStatusUpdate, this._storageItemFileStatusEvent, this),
                              (this._document = null),
                              (this._storageItem = null),
                              (this._elements = null),
                              (this._currentAnnotations = null),
                              (this._localAnnotations = null),
                              (this._page = null),
                              this._updatePropertyPanels(true),
                              this.trigger(h.UPDATE_EVENT))
                            : e.type === g.Type.StorageItemUpdated && this._updatePropertyPanels(true);
            }),
            (N.prototype._settingChanged = function (e) {
                "touch" === e.key && this._updateToolbarButtons();
            }),
            (N.prototype._handleFocusInEvent = function (e) {
                $(e.target).is("textarea") && this._htmlElement.addClass("g-annotation-comment-focus");
            }),
            (N.prototype._handleFocusOutEvent = function (e) {
                $(e.target).is("textarea") && this._htmlElement.removeClass("g-annotation-comment-focus");
            }),
            (N.prototype._updateNotificationMenu = function () {
                (this._notificationMenu.clearItems(),
                    this._notificationMenu.setTooltipType(c.TOOLTIP_AREA.SIDEBAR),
                    this._document.getId() &&
                        gApi.updateFileData(this._document.getId()).then((e) => {
                            const t = [
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
                            ((t[e.data.notifications_disabled || 0].checked = true),
                                0 === this._notificationMenu.getItemCount() &&
                                    t.forEach((e) => {
                                        this._notificationMenu.addItem(this._createMenuItem(e));
                                    }));
                        }));
            }),
            (N.prototype._createMenuItem = function (e) {
                var t = new l.default(l.default.Type.Item);
                return (
                    t.setChecked(e.checked),
                    t.setCaption(e.caption),
                    t.addEventListener(l.default.ActivateEvent, (t) => {
                        const { sender } = t;
                        (this._notificationMenu._items.forEach((e) => {
                            e.setChecked(false);
                        }),
                            sender.setChecked(true),
                            gDesigner.stats("annotations_settings_notifications", e.statType),
                            gApi.updateFileData(this._document.getId(), {
                                notifications_disabled: this._notificationMenu.indexOf(sender),
                            }));
                    }),
                    t
                );
            }),
            (N.prototype._documentStatusEvent = function (e) {
                e.status === I.Unlocked && this._updateFromToolOrSelection(true);
            }),
            (N.prototype._collaborationEvent = function (e) {
                if (e.type === T.Type.AnnotationsUpdate) {
                    const { data: { lastUpdateTime } = {} } = e;
                    if (lastUpdateTime && this._document) {
                        const e = this._document.getScene();
                        !e ||
                            (e.getLastTimeAnnotationsFromCloudModified() && !DateAPI.lt(e.getLastTimeAnnotationsFromCloudModified(), lastUpdateTime, false)) ||
                            this.syncAnnotations();
                    }
                } else e.type === T.Type.ReviewStatusChanged && this._updateToolbar();
            }),
            (N.prototype.isToolAllowed = function (e) {
                return !(![i.GHandTool, i.GPointerTool, i.GZoomTool].some((t) => e instanceof t) && !e.hasMixin(i.GAnnotationTool));
            }),
            (N.prototype._toolChangedEvent = function (e) {
                e.previousTool;
                var t = e.newTool;
                if (e.newTool.hasMixin(i.GAnnotationTool)) {
                    var n = gDesigner.getActiveDocument();
                    n && n.getEditor() && n.getEditor().clearSelection();
                }
                this._activeTool(t);
            }),
            (N.prototype._networkAvailabilityChangedEvent = function (e) {
                (this._htmlElement.toggleClass("offline", !e.connected), e.connected && this.syncAnnotations());
            }),
            (N.prototype._activeTool = function (e) {
                this._annotationToolbar.find(".toolbar-button").each((t, n) => {
                    var o = $(n).data("toolClass");
                    e instanceof o ? $(n).addClass("g-active") : $(n).removeClass("g-active");
                });
            }),
            (N.prototype._afterFlagChangeEvent = function (e) {
                e.node instanceof GObject.GPage &&
                    e.flag === GObject.GNode.Flag.Active &&
                    !this._document.getEditor().hasSelection() &&
                    this._updateFromToolOrSelection();
            }),
            (N.prototype._afterInsertEvent = function (e) {
                (e.node instanceof GObject.GPage || e.node instanceof GObject.GAnnotationsList) && this._updatePropertyPanels(true);
            }),
            (N.prototype._afterRemoveEvent = function (e) {
                (e.node instanceof GObject.GPage || e.node instanceof GObject.GAnnotationsList) && this._updatePropertyPanels(true);
            }),
            (N.prototype.relayout = function (e) {
                this._annotationPanels.forEach((t) => t.properties instanceof v && t.properties.relayout(e));
            }),
            (N.prototype._updateSelection = function () {
                const e = this._document && this._document.getEditor();
                if (e) {
                    var t = this._document.getScene().getActivePage();
                    if (((this._page = t), (this._elements = e.getSelection()), this._elements && this._elements.length)) {
                        if (this._elements.find((e) => !(e.hasMixin(GObject.GAnnotation) || e instanceof GObject.GPage)))
                            return (
                                (this._elements = []),
                                console.warn("deactivating annotations"),
                                void gDesigner.getRightSidebars().setActiveSidebar(m.ID)
                            );
                        this._elements = this._elements.filter((e) => e.hasMixin(GObject.GAnnotation));
                    }
                    if (!this._elements || 0 === this._elements.length) {
                        var n = gDesigner.getToolManager().getActiveTool();
                        if (n instanceof i.GItemTool) {
                            var o = n.getDefaultStyle();
                            o && (this._elements = [o]);
                        }
                    }
                    this._elements || (this._elements = []);
                }
            }),
            (N.prototype._selectionChangedEvent = function (e) {
                (this._updateSelection(), this._updatePropertyPanels(false, false, false));
            }),
            (N.prototype._updateFromToolOrSelection = function (e) {
                (this._updateSelection(),
                    this._updatePropertyPanels(
                        true === e,
                        e instanceof i.GToolManager.ToolChangedEvent && !(e.newTool instanceof i.GPointerTool)
                    ));
            }),
            (N.prototype._updateAnnotationArray = function () {
                var e,
                    t = false,
                    n = false;
                if (
                    (this._panelsContainer
                        ? (n = true)
                        : ((this._panelsContainer = $("<div></div>").addClass("panels").appendTo(this._htmlElement)),
                          $("<div></div>").addClass("fixed-panels").appendTo(this._panelsContainer),
                          $("<div></div>").addClass("scrolling-panels").appendTo(this._panelsContainer)),
                    (e = this._panelsContainer.find(".fixed-panels")),
                    !n)
                ) {
                    (this._sidebarTitle.appendTo(e), this._annotationToolbar.appendTo(e), this._annotationsToolbarPanel.appendTo(e));
                    for (var o = 0; o < this.getAnnotationsProperties().length; o++)
                        t = this._addPropertiesPanel(this.getAnnotationsProperties()[o], o) || t;
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
                        this._document.getScene().iteratePages((e) => {
                            t = this._addPropertiesPanel(e) || t;
                        }, true));
                }
                return t;
            }),
            (N.prototype._addPropertiesPanel = function (e, t) {
                let n,
                    o,
                    i = $("<div></div>").css("display", "none").addClass("properties-panel"),
                    r = false;
                const s = this._panelsContainer.find(".scrolling-panels");
                if (e instanceof y) {
                    n = e;
                    var l = $("<div></div>").addClass("annotations-property-panel");
                    if ((n.init(l, this._annotationToolbar), e._availableProperties && 0 === e._availableProperties.length)) return r;
                    var c = $("<div></div>").css("display", "none");
                    (e instanceof GAnnotationProperties &&
                        c.append(
                            $("<div></div>")
                                .addClass("arrow-top")
                                .css(
                                    "right",
                                    (gDesigner.isTouchEnabled()
                                        ? N.ANNOTATION_PROPERTIES_ARROW_POSITION_TOUCH[t]
                                        : N.ANNOTATION_PROPERTIES_ARROW_POSITION[t]) + "%"
                                )
                        ),
                        this._annotationsToolbarPanel.append(c),
                        this._annotationsToolbarPanel.append(l),
                        (o = this._annotationToolbar),
                        (i = l),
                        this._annotationProperties.push({
                            panel: i,
                            toolbar: o,
                            properties: n,
                            topArrow: c,
                        }));
                } else {
                    if (
                        ((o = $("<div></div>").addClass("annotations-page-toolbar toolbar")),
                        (n = new v()),
                        i.appendTo(s),
                        n.init(
                            i,
                            o,
                            this._active,
                            this._showResolved,
                            this._updatePropertyPanels.bind(this),
                            function (e) {
                                this._currentAnnotations = e;
                            }.bind(this)
                        ),
                        "" !== o.html() ? o.insertBefore(i) : (o = null),
                        this._currentAnnotations)
                    ) {
                        let t,
                            n,
                            o = e.getAnnotations();
                        t = GObject.GNode.store(o);
                        let i = false;
                        if (
                            (o.restored
                                ? (n = w.findAnnotationsListForPage(e, this._currentAnnotations))
                                : ((n = this._currentAnnotations.find((e) => e["@id"] === t["@id"])), (i = true)),
                            n && !GObject.GUtil.equals(t, n, true))
                        ) {
                            let t = GObject.GNode.restore(n);
                            if (t) {
                                let n = e.getAnnotations(),
                                    o = t.getChildren() || [];
                                if ((t.clearChildren(), i && n.getProperty("aid") !== t.getProperty("aid"))) {
                                    (n.setProperty("aid", t.getProperty("aid")), n.clearChildren());
                                    for (let e = 0; e < o.length; e++) n.appendChild(o[e]);
                                    r = true;
                                } else {
                                    let e = w.mergeAnnotations(n, n.getChildren(), t, o);
                                    r = r || e;
                                }
                            }
                        }
                    }
                    (n.setPage(e),
                        this._annotationPanels.push({
                            panel: i,
                            toolbar: o,
                            properties: n,
                        }));
                }
                return r;
            }),
            (N.prototype._updateToolbarButtons = function () {
                this._annotationProperties.forEach((e, t) => {
                    const { topArrow, properties } = e;
                    if (properties instanceof GAnnotationProperties) {
                        const e = gDesigner.isTouchEnabled()
                            ? N.ANNOTATION_PROPERTIES_ARROW_POSITION_TOUCH
                            : N.ANNOTATION_PROPERTIES_ARROW_POSITION;
                        topArrow.find(".arrow-top").css("right", e[t] + "%");
                    }
                });
            }),
            (N.prototype._updatePropertyPanels = function (e, t) {
                let n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                if (this._updatingPropertyPanels) return;
                (this.updateNotificationOption(), (this._updatingPropertyPanels = true));
                const o = () => {
                    let o = false;
                    try {
                        e && (o = this._updateAnnotationArray());
                        var i = this._annotationProperties.concat(this._annotationPanels),
                            r = this._annotationToolbar.find(".indicator");
                        r.css("visibility", "hidden");
                        for (var s = 0; s < i.length; ++s) {
                            var l = i[s],
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
                                    ((d = l.properties.update(this._document, u, t)), n && l.properties.relayout());
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
                                let e = this._annotationToolbar.find("." + c._toolbarIcon);
                                (r.css("left", e.position().left + e.width() / 2 - 6), r.css("visibility", "visible"));
                            }
                            d && this._annotationsToolbarPanel.css("display", "");
                        }
                        this._document || (this._annotationPanels = []);
                    } finally {
                        this._updatingPropertyPanels = false;
                    }
                    return o;
                };
                !this._currentAnnotations && this._document && this._document.getAnnotationsId()
                    ? w
                          .getCloudAnnotationsForDocument(this._document)
                          .then((e) => {
                              let t = false;
                              if (this._document && this._document.getAnnotationsId() !== e.cid)
                                  return ((this._updatingPropertyPanels = false), t);
                              if (((this._currentAnnotations = e.annotationsCollection), (t = o()), t)) {
                                  let t = this._document.getScene();
                                  (t && t.setLastTimeAnnotationsFromCloudModified(e.lastUpdateTime),
                                      gDesigner.notifyDocumentModified(this._document),
                                      this._active ? this._activateAnnotations() : this.trigger(h.UPDATE_EVENT));
                              }
                          })
                          .catch((e) => {
                              !this._active || (e instanceof C && e.cid && this._document && this._document.getAnnotationsId() !== e.cid)
                                  ? (this._updatingPropertyPanels = false)
                                  : ((this._currentAnnotations = []), o());
                          })
                    : o();
            }),
            (N.prototype.updateBadge = function (e) {
                var t = { unread: 0, total: 0 },
                    n = this._annotationPanels.map((e) => e.properties.getPage()),
                    o = this._document && (this._document.isCloudFile() || this._document.isExternalFile());
                if (SHOW_SIDEBAR_BADGE && !this._active) {
                    var i = gDesigner.getSyncUser();
                    if (o) {
                        if (this._currentAnnotations) {
                            n.map((e) => w.findAnnotationsListForPage(e, this._currentAnnotations))
                                .filter((e) => !!e)
                                .forEach(function (e) {
                                    e.$ &&
                                        e.$.forEach(function (e) {
                                            var n = w.isOwner(i, e);
                                            e.rsv ||
                                                (e.$ && 0 != e.$.length
                                                    ? (e.$.forEach(function (e) {
                                                          "cmt" == e["@"] &&
                                                              (i &&
                                                                  i.getUID() !== e.uid &&
                                                                  e.type !== GObject.GComment.Type.Close &&
                                                                  !(e.read || []).includes(i.getUID()) &&
                                                                  t.unread++,
                                                              t.total++);
                                                      }),
                                                      n || (e.read || []).includes(i.getUID()) || t.unread++,
                                                      t.total++)
                                                    : (n || (e.read || []).includes(i.getUID()) || t.unread++, t.total++));
                                        });
                                });
                        }
                    } else if (this._localAnnotations) {
                        n.map((e) => w.findAnnotationsListForPage(e, this._localAnnotations))
                            .filter((e) => !!e)
                            .forEach(function (e) {
                                for (var n = e.getFirstChild(); null !== n && n.hasMixin(GObject.GAnnotation); n = n.getNext()) {
                                    var o = w.isOwner(i, n);
                                    if (!n.getProperty("rsv"))
                                        if (n.getChildren().length > 0) {
                                            for (var r = n.getFirstChild(); null !== r && r instanceof GObject.GComment; r = r.getNext())
                                                (i &&
                                                    i.getUID() !== r.getProperty("uid") &&
                                                    r.getProperty("type") !== GObject.GComment.Type.Close &&
                                                    !(r.getProperty("read") || []).includes(i.getUID()) &&
                                                    t.unread++,
                                                    t.total++);
                                            (o || (n.getProperty("read") || []).includes(i.getUID()) || t.unread++, t.total++);
                                        } else (o || (n.getProperty("read") || []).includes(i.getUID()) || t.unread++, t.total++);
                                }
                            });
                    }
                }
                return (t.total > 0 && (e.text(t.total), t.unread > 0 ? e.addClass("new") : e.removeClass("new")), !!t.total);
            }),
            (N.prototype.isAnnotationPropertiesEditing = function () {
                return this._annotationProperties.some((e) => {
                    let { properties: t } = e;
                    return (t.isEditing && t.isEditing()) || false;
                });
            }),
            (N.prototype.updateNotificationOption = function () {
                const e = this._optionsToolbar.find(".notification-label").closest(".columns");
                this._document && this._document.isCloudFile()
                    ? (e.removeAttr("data-title"), e.toggleClass("g-disabled", false))
                    : (e.attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.save-file-tip"))),
                      e.toggleClass("g-disabled", true));
            }),
            (N.prototype.toString = function () {
                return "[Object GAnnotationsSidebar]";
            }),
            (N.prototype._createHoverNotificationFrag = function () {
                let e = $("<div>")
                    .addClass("g-menu hover-notification-container")
                    .html(GObject.GLocale.get(new GObject.GLocaleKey("GAnnotationsSidebar", "text.hover-notification")));
                return (
                    e
                        .find("span")
                        .addClass("highlight")
                        .click(() => {
                            new GSettingsDialog().then((e) => e.open());
                        }),
                    e
                );
            }),
            (N.prototype._openHoverNotification = function (e) {
                let t = this._createHoverNotificationFrag(),
                    n = $("body").find(".g-annotation-sidebar-notification-menu")[0];
                if (
                    (t.appendTo($("body")),
                    document.addEventListener("click", this._removeHoverNotificationFrag),
                    n &&
                        (n.addEventListener("mouseenter", function () {
                            let e = $("body").find(".hover-notification-container");
                            e.length && $(e[0]).css("display", "block");
                        }),
                        n.addEventListener("mouseleave", function () {
                            let e = $("body").find(".hover-notification-container");
                            e.length &&
                                setTimeout(function () {
                                    $(e[0]).css("display", "none");
                                }, 250);
                        }),
                        $(n)
                            .find("li")
                            .map((e, t) => {
                                t.addEventListener("mousedown", function () {
                                    let e = $("body").find(".hover-notification-container");
                                    e.length && $(e[0]).css("display", "none");
                                });
                            })),
                    t.parent().is("body"))
                ) {
                    var o = t.outerWidth(),
                        i = t.outerHeight(),
                        a = $(window).width(),
                        r = $(window).height(),
                        s = { x: 0, y: 0, width: 0, height: 0 },
                        l = $(e),
                        c = l.offset();
                    ((s.x = c.left), (s.y = c.top), (s.width = l.outerWidth()), (s.height = l.outerHeight()));
                    var d = 0;
                    (d = s.x + s.width) + o > a && (d = s.x - o);
                    var u = 0;
                    (u = s.y + s.height) + i > r && (u = s.y - i);
                    const n = this._rangeLeftX ? this._rangeLeftX : 0;
                    d < n && (d = n);
                    const p = this._rangeRightX ? this._rangeRightX : a;
                    d + o >= p && (d = p - o);
                    const g = this._rangeLeftY ? this._rangeLeftY : 0;
                    u < g && (u = g);
                    const h = this._rangeRightY ? this._rangeRightY : r;
                    u + i >= h && (u = h - i);
                    const f = u - i - 10;
                    (t.css("left", d), t.css("top", f), t.addClass("g-menu-right g-menu-bottom"));
                }
            }),
            (N.prototype._removeHoverNotificationFrag = function () {
                let e = $("body").find(".hover-notification-container");
                e.length && (e.remove(), document.removeEventListener("click", this._removeHoverNotificationFrag));
            }),
            (module.exports = N));
    };
