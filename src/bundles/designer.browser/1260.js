module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(596 /* polyfill:Array */), require(30 /* polyfill:Object */), require(57), require(8 /* Symbol */), require(3), require(4), require(41), require(13), require(32), require(33));
        var GUI = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GTouchTool = _interopRequireDefault(require(340)),
            GRichTooltipConfig = require(67),
            GSceneProperties = _interopRequireDefault(require(442)),
            GDocumentEvent = require(78),
            GDocumentStatusEvent = require(217),
            GDocumentStatus = require(86),
            GWindows = require(603),
            GFitAllAction = require(449),
            GFitSelectionAction = require(566),
            GSidebar = require(806),
            GSidebars = require(395),
            GExportProperties = require(1523),
            GSystemDialog = require(44),
            GContextMenuTarget = require(450);
        const GApplicationStatusEvent = require(808),
            GSettingChangedEvent = require(135);
        function GOutlineSidebar() {
            GSidebar.call(this);
        }
        (GObject.GObject.inherit(GOutlineSidebar, GSidebar),
            (GOutlineSidebar.ID = "outline"),
            (GOutlineSidebar.TITLE = new GObject.GLocaleKey("GOutlineSidebar", "title")),
            (GOutlineSidebar.MULTIPAGE_MODE_ENABLED_OPTION_NAME = "OutlineSidebar/Multipage_Mode"),
            (GOutlineSidebar.prototype._document = null),
            (GOutlineSidebar.prototype._pageToolbar = null),
            (GOutlineSidebar.prototype._layerToolbar = null),
            (GOutlineSidebar.prototype._exportToolbar = null),
            (GOutlineSidebar.prototype._outlineSidebarElement = null),
            (GOutlineSidebar.prototype._pageContainerMaxHeight = 500),
            (GOutlineSidebar.prototype._pageContainerMinHeight = 50),
            (GOutlineSidebar.prototype._pagePanel = null),
            (GOutlineSidebar.prototype._pageModeSwitch = null),
            (GOutlineSidebar.prototype._layerPanel = null),
            (GOutlineSidebar.prototype._exportPanel = null),
            (GOutlineSidebar.prototype._exportInstance = null),
            (GOutlineSidebar.prototype._pageMenuOptionButton = null),
            (GOutlineSidebar.prototype._transformMode = false),
            (GOutlineSidebar.prototype._htmlElement = null),
            (GOutlineSidebar.prototype.getId = function () {
                return GOutlineSidebar.ID;
            }),
            (GOutlineSidebar.prototype.getTitle = function () {
                return GOutlineSidebar.TITLE;
            }),
            (GOutlineSidebar.prototype.isEnabled = function () {
                return null !== this._document;
            }),
            (GOutlineSidebar.prototype.isVisible = function () {
                return !!gDesigner.getApplicationManager().isInspectEnabled();
            }),
            (GOutlineSidebar.prototype.getOrientation = function () {
                return GSidebars.Orientation.Left;
            }),
            (GOutlineSidebar.prototype.getMinimumWidth = function () {
                return 250;
            }),
            (GOutlineSidebar.prototype.getDefaultWidth = function () {
                return 250;
            }),
            (GOutlineSidebar.prototype.isResizeable = function () {
                return true;
            }),
            (GOutlineSidebar.prototype.getLayerPanel = function () {
                return this._layerPanel;
            }),
            (GOutlineSidebar.prototype.relayout = function () {
                (this._pagePanel.gPagePanel("relayout"),
                    this._layerPanel.gLayerPanel("relayout"),
                    (this._pageContainerMaxHeight = parseInt(this._outlineSidebarElement.css("height"), 10) - 150));
            }),
            (GOutlineSidebar.prototype._copyDataTransfer = function (targetEvent, sourceEvent) {
                var originalEvent = sourceEvent.originalEvent;
                targetEvent.hasOwnProperty("dataTransfer")
                    ? originalEvent &&
                      originalEvent.dataTransfer &&
                      originalEvent.dataTransfer.types &&
                      originalEvent.dataTransfer.types.forEach(function (type) {
                          targetEvent.dataTransfer.setData(originalEvent.dataTransfer.getData(type));
                      })
                    : (targetEvent.dataTransfer = originalEvent.dataTransfer);
            }),
            (GOutlineSidebar.prototype.getTouchTools = function () {
                return [
                    new GTouchTool.default({
                        def: true,
                        id: "pages",
                        sidebar: this.getId(),
                        icon: "gravit-icon-touch-pages-panel",
                        panel: ".pages-container",
                        toolbar: ".page-toolbar",
                        panelWidth: "320px",
                    }),
                    new GTouchTool.default({
                        id: "layers",
                        sidebar: this.getId(),
                        icon: "gravit-icon-touch-layers-panel",
                        panel: [".layers-container", ".export-panel"],
                        toolbar: ".layer-toolbar",
                        panelWidth: "350px",
                    }),
                ];
            }),
            (GOutlineSidebar.prototype.init = function (container) {
                ((this._htmlElement = container),
                    GSidebar.prototype.init.call(this, container),
                    (this._pageToolbar = $("<div></div>")
                        .addClass("toolbar page-toolbar")
                        .append($("<label></label>").text(GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.pages"))))
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
                                var droppable = this._pagePanel.gPagePanel("getLastVisitedDroppable");
                                if (droppable) {
                                    var dropEvent = document.createEvent("mouseEvent");
                                    (dropEvent.initEvent("drop", true, true, null), this._copyDataTransfer(dropEvent, event), droppable.dispatchEvent(dropEvent));
                                }
                            }.bind(this)
                        )
                        .appendTo(container)),
                    (this._pageModeSwitch = $("<label></label>")
                        .addClass("g-switch")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.toggle-page-mode")))
                        .css("margin-right", "5px")
                        .append(
                            $("<input>")
                                .attr("id", "toogle-page-mode-checkbox")
                                .attr("type", "checkbox")
                                .attr("data-property", "multipage-switch")
                                .on("change", this._multiPageModeChangeEventHandler.bind(this))
                        )
                        .append($("<div></div>"))
                        .appendTo(this._pageToolbar)
                        .gRichTooltip(
                            GRichTooltipConfig.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.multipage-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.multipage-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/pages/#page-panel",
                            })
                        )),
                    (this._pageMenuOptionButton = $("<button></button>")
                        .addClass("setting-menu-options")
                        .on(
                            "click",
                            function (event) {
                                (Object.assign(event, { data: { context: GContextMenuTarget.PagePanel } }),
                                    $(gDesigner.getWindows().getHtmlElement()).trigger("contextmenu", event));
                            }.bind(this)
                        )
                        .append($("<span/>").addClass("gravit-icon-settings"))
                        .appendTo(this._pageToolbar)),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.delete-active-page")))
                        .on("click", () => this._deletePage())
                        .append($("<span></span>").addClass("gravit-icon-trash"))
                        .appendTo(this._pageToolbar)
                        .gRichTooltip(
                            GRichTooltipConfig.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.delete-page-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.delete-page-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/pages/#page-panel",
                            })
                        ),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.create-new-page")))
                        .on(
                            "click",
                            function () {
                                (this._insertPage(),
                                    $(this._pageToolbar).gAccordion("toggleOpen", true),
                                    $(this._pageToolbar).gAccordion("init", $(this._pagePanel)));
                            }.bind(this)
                        )
                        .append($("<span></span>").addClass("gravit-icon-addpage"))
                        .appendTo(this._pageToolbar)
                        .gRichTooltip(
                            GRichTooltipConfig.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.create-new-page-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.create-new-page-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/pages/#page-panel",
                            })
                        ));
                var startY,
                    startHeight,
                    pagesContainer = $("<div></div>").addClass("pages-container").appendTo(container);
                ((this._pagePanel = $("<div></div>")
                    .addClass("pages")
                    .gToolbarShadow("init", ".page-toolbar")
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
                            var droppable = this._pagePanel.gPagePanel("getLastVisitedDroppable");
                            if (droppable) {
                                var dropEvent = document.createEvent("mouseEvent");
                                (dropEvent.initEvent("drop", true, true, null), this._copyDataTransfer(dropEvent, event), droppable.dispatchEvent(dropEvent));
                            }
                        }.bind(this)
                    )
                    .on(
                        "mouseenter",
                        function () {
                            this._pagePanel.gPagePanel("setBlockHighlight", true);
                        }.bind(this)
                    )
                    .on(
                        "mouseleave",
                        function () {
                            this._pagePanel.gPagePanel("setBlockHighlight", false);
                        }.bind(this)
                    )
                    .appendTo(pagesContainer)),
                    this._pagePanel.gPagePanel({
                        moveCallback: this._movePageTreeNodeCallback.bind(this),
                        clickCallback: this._clickPageTreeNodeCallback.bind(this),
                        startDraggingCallback: this._startPageDraggingCallback.bind(this),
                    }));
                var isResizing = false,
                    divider = $("<div/>").attr("id", "page-layer-divider"),
                    handleResize = function (event) {
                        var newHeight;
                        isResizing &&
                            ((newHeight = startHeight - startY + event.clientY) < this._pageContainerMinHeight && (newHeight = this._pageContainerMinHeight),
                            newHeight > this._pageContainerMaxHeight && (newHeight = this._pageContainerMaxHeight),
                            pagesContainer.css("height", newHeight + "px"));
                    }.bind(this),
                    stopResize = function () {
                        ($(document).off("mousemove", handleResize),
                            $(document).off("mouseup", stopResize),
                            (isResizing = false),
                            (startY = null),
                            (startHeight = null),
                            container.removeClass("page-container-resizing"));
                    },
                    startResize = function (mousedownEvent) {
                        ((startY = mousedownEvent.clientY),
                            (isResizing = true),
                            (startHeight = parseInt(pagesContainer.css("height"), 10)),
                            container.addClass("page-container-resizing"),
                            $(document).on("mousemove", handleResize),
                            $(document).on("mouseup", stopResize));
                    }.bind(this);
                ($(divider).on("mousedown", startResize),
                    divider.appendTo(container),
                    $("<hr />").appendTo(divider),
                    divider.append($("<div />")),
                    this._addLayerPanel(container),
                    $("<hr/>").appendTo(container),
                    (this._exportToolbar = $("<div></div>").addClass("toolbar toolbar-export").appendTo(container)),
                    (this._exportPanel = $("<div></div>").addClass("properties-panel").addClass("export-panel").appendTo(container)),
                    (this._exportInstance = new GExportProperties()),
                    this._exportInstance.init(this._exportPanel, this._exportToolbar),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this),
                    gDesigner.getToolManager().addEventListener(GUI.GToolManager.ToolChangedEvent, this._toolChangedEvent, this),
                    gDesigner.addEventListener(GApplicationStatusEvent, this._applicationStatusEvent, this),
                    gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                    this._pageToolbar.gAccordion("init", ".pages-container", "label"),
                    this._exportToolbar.gAccordion("init", ".properties-panel", "label"),
                    (this._outlineSidebarElement = container));
            }),
            (GOutlineSidebar.prototype.toggleMultiPageMode = function () {
                const switchInput = this._getMultiPageSwitcher();
                if (switchInput) {
                    const isChecked = switchInput.is(":checked");
                    (switchInput.prop("checked", !isChecked), switchInput.trigger("change"));
                }
            }),
            (GOutlineSidebar.prototype._changePageMode = function (enabled) {
                let updateSwitch = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                (this._document.getScene().setProperty(GSceneProperties.default.MULTIPAGE_VIEW_ENABLED, enabled),
                    gContainer.setProperty(GOutlineSidebar.MULTIPAGE_MODE_ENABLED_OPTION_NAME, enabled),
                    updateSwitch && this._pageModeSwitch.find("input[data-property=multipage-switch]").prop("checked", enabled));
            }),
            (GOutlineSidebar.prototype._getMultiPageSwitcher = function () {
                return this._pageModeSwitch ? this._pageModeSwitch.find('input[data-property="multipage-switch"]') : null;
            }),
            (GOutlineSidebar.prototype._multiPageModeChangeEventHandler = function (event) {
                gDesigner.stats("pages_change_multipage-mode");
                const switchInput = $(event.target);
                this._refreshPageModeSwitch(switchInput, { showAlert: true });
                const enabled = switchInput.is(":checked");
                this._changePageMode(enabled, false);
                const actionTitle = GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.toggle-page-mode"));
                this._document.getEditor().pushState(
                    actionTitle,
                    () => {
                        this._changePageMode(enabled);
                    },
                    () => {
                        this._changePageMode(!enabled);
                    },
                    {
                        actions: [{ isPropertyChangeAction: true, node: { hasMixin: () => false } }],
                    }
                );
            }),
            (GOutlineSidebar.prototype._settingChanged = function (event) {
                "touch" === event.key && this._touchInterfaceUpdate();
            }),
            (GOutlineSidebar.prototype._applicationStatusEvent = function (event) {
                event.status === GApplicationStatusEvent.Status.Ready && this._touchInterfaceUpdate();
            }),
            (GOutlineSidebar.prototype._touchInterfaceUpdate = function () {
                gDesigner.isTouchEnabled()
                    ? (this._pageModeSwitch.toggleClass("toogle-page-mode", true),
                      this._pageModeSwitch.toggleClass("g-switch", false),
                      this._pageModeSwitch.find("#toogle-page-mode-checkbox").gCheckboxSlider(),
                      this._pageMenuOptionButton.show(),
                      this._pagePanel.gPagePanel("resetVTreeRowHeight", "48"),
                      this._layerPanel.gLayerPanel("resetVTreeRowHeight", "48"))
                    : (this._pageModeSwitch.toggleClass("toogle-page-mode", false),
                      this._pageModeSwitch.toggleClass("g-switch", true),
                      this._pageModeSwitch.find("#toogle-page-mode-checkbox").gCheckboxSlider("unmount"),
                      this._pageMenuOptionButton.hide(),
                      this._pagePanel.gPagePanel("resetVTreeRowHeight", "34"),
                      this._layerPanel.gLayerPanel("resetVTreeRowHeight", "34"));
            }),
            (GOutlineSidebar.prototype._addLayerPanel = function (container) {
                (this._layerToolbar ||
                    ((this._layerToolbar = $("<div></div>")
                        .addClass("toolbar")
                        .addClass("layer-toolbar")
                        .append(
                            $("<label></label>")
                                .css("flex-grow", "1")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.layers")))
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
                                var droppable = this._layerPanel.gLayerPanel("getLastVisitedDroppable");
                                if (droppable) {
                                    var dropEvent = new CustomEvent("drop", {
                                        bubbles: true,
                                        cancelable: true,
                                    });
                                    (this._copyDataTransfer(dropEvent, event), (dropEvent.altKey = event.originalEvent.altKey), (dropEvent.layerY = 0), droppable.dispatchEvent(dropEvent));
                                }
                            }.bind(this)
                        )),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.delete-layer-item")))
                        .on("click", () => this._deleteLayerOrItem())
                        .append($("<span></span>").addClass("gravit-icon-trash"))
                        .appendTo(this._layerToolbar)
                        .gRichTooltip(
                            GRichTooltipConfig.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.delete-layer-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.delete-layer-tooltip-description")),
                                learnMore: "/docs/organizing-your-designs/objects/#deleting-objects",
                            })
                        ),
                    $("<button></button>")
                        .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.new-layer")))
                        .on("click", () => this.insertLayer())
                        .append($("<span></span>").addClass("gravit-icon-addlayer"))
                        .appendTo(this._layerToolbar)
                        .gRichTooltip(
                            GRichTooltipConfig.GRichTooltipConfig.from({
                                title: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.new-layer-tooltip-title")),
                                description: GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.new-layer-tooltip-description")),
                                learnMore:
                                    "/docs/organizing-your-designs/layer-groups/#adding-a-layer-group",
                            })
                        )),
                    this._layerToolbar.appendTo(container));
                var layersContainer = $("<div></div>").addClass("layers-container").appendTo(container);
                this._layerPanel ||
                    ((this._layerPanel = $("<div></div>")
                        .gToolbarShadow("init", ".layer-toolbar")
                        .addClass("layers")
                        .on(
                            "mouseenter",
                            function (e) {
                                var scene = this._document.getScene();
                                (scene &&
                                    scene.acceptChildren(function (node) {
                                        return (node.hasFlag(GObject.GNode.Flag.Highlighted) && node.removeFlag(GObject.GNode.Flag.Highlighted), true);
                                    }),
                                    this._layerPanel.gLayerPanel("setBlockHighlight", true));
                            }.bind(this)
                        )
                        .on(
                            "mouseleave",
                            function (e) {
                                this._layerPanel.gLayerPanel("setBlockHighlight", false);
                            }.bind(this)
                        )
                        .on(
                            "click",
                            function () {
                                (gDesigner.stats("layers_deselect_all-layers"), this._document.getEditor().clearSelection());
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
                                var droppable = this._layerPanel.gLayerPanel("getLastVisitedDroppable");
                                if (droppable) {
                                    var dropEvent = document.createEvent("mouseEvent");
                                    (dropEvent.initEvent("drop", true, true, null), this._copyDataTransfer(dropEvent, event), droppable.dispatchEvent(dropEvent));
                                }
                            }.bind(this)
                        )
                        .appendTo(layersContainer)),
                    this._layerPanel.gLayerPanel({
                        moveCallback: this._moveLayerTreeNodeCallback.bind(this),
                        isDuplicateEffectCallback: this._isDuplicateEffectCallback.bind(this),
                        duplicateCallback: this._duplicateLayerTreeNodeCallback.bind(this),
                        clickCallback: this._clickLayerTreeNodeCallback.bind(this),
                        startDraggingCallback: this._startLayerDraggingCallback.bind(this),
                        patternChooserStatusChangeCallBack: this._patternChooserStatusChange.bind(this),
                    }));
            }),
            (GOutlineSidebar.prototype._documentEvent = function (event) {
                var scene, editor;
                event.type === GDocumentEvent.Type.Activated
                    ? ((this._document = event.document),
                      (scene = this._document.getScene()),
                      this._pagePanel.gPagePanel("scene", scene),
                      this._layerPanel.gLayerPanel("scene", scene),
                      this.trigger(GSidebar.UPDATE_EVENT),
                      this._document.getStatus() === GDocumentStatus.Ready || this._document.getStatus() === GDocumentStatus.Loaded
                          ? this._document.getActiveWindow()
                              ? this._updateMultiPageMode()
                              : gDesigner.getWindows().addEventListener(GWindows.WindowEvent, this._windowsEvent, this)
                          : this._document.addEventListener(GDocumentStatusEvent, this._documentStatusEvent, this),
                      (editor = this._document.getEditor()),
                      gDesigner.getToolManager().addEventListener(GUI.GToolManager.ToolChangedEvent, this._updateExport, this),
                      editor.addEventListener(GUI.GEditor.SelectionChangedEvent, this._updateExport, this),
                      scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this),
                      scene.addEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChanged, this),
                      scene.addEventListener(GObject.GNode.AfterInsertEvent, this._afterInsert, this),
                      this._updateExport())
                    : event.type === GDocumentEvent.Type.Deactivated &&
                      (this._pagePanel.gPagePanel("scene", null),
                      this._layerPanel.gLayerPanel("scene", null),
                      (scene = this._document.getScene()),
                      (editor = this._document.getEditor()),
                      gDesigner.getToolManager().removeEventListener(GUI.GToolManager.ToolChangedEvent, this._updateExport, this),
                      gDesigner.getWindows().removeEventListener(GWindows.WindowEvent, this._windowsEvent, this),
                      editor.removeEventListener(GUI.GEditor.SelectionChangedEvent, this._updateExport, this),
                      scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this),
                      scene.removeEventListener(GObject.GNode.AfterPropertiesChangeEvent, this._afterPropertiesChanged, this),
                      scene.removeEventListener(GObject.GNode.AfterInsertEvent, this._afterInsert, this),
                      this._document.removeEventListener(GDocumentStatusEvent, this._documentStatusEvent, this),
                      (this._document = null),
                      (this._elements = null),
                      this._updateExport(),
                      this.trigger(GSidebar.UPDATE_EVENT));
            }),
            (GOutlineSidebar.prototype._documentStatusEvent = function (event) {
                (event.status !== GDocumentStatus.Ready && event.status !== GDocumentStatus.Loaded) ||
                    (this._updateMultiPageMode(), this._document.removeEventListener(GDocumentStatusEvent, this._documentStatusEvent, this));
            }),
            (GOutlineSidebar.prototype._windowsEvent = function (event) {
                event.type === GWindows.WindowEvent.Type.Activated &&
                    (this._updateMultiPageMode(), gDesigner.getWindows().removeEventListener(GWindows.WindowEvent, this._windowsEvent, this));
            }),
            (GOutlineSidebar.prototype._isMultiPageModeEnabled = function () {
                const multipageEnabled = this._document.getScene().getProperty(GSceneProperties.default.MULTIPAGE_VIEW_ENABLED);
                return "boolean" == typeof multipageEnabled ? multipageEnabled : gContainer.getProperty(GOutlineSidebar.MULTIPAGE_MODE_ENABLED_OPTION_NAME);
            }),
            (GOutlineSidebar.prototype._updateMultiPageMode = async function () {
                const switchInput = this._getMultiPageSwitcher(),
                    enabled = await this._isMultiPageModeEnabled();
                (switchInput.prop("checked", enabled), this._refreshPageModeSwitch(switchInput, { skipInvalidation: true }));
            }),
            (GOutlineSidebar.prototype._toolChangedEvent = function (event) {
                var previousTool = event.previousTool,
                    newTool = event.newTool;
                (previousTool &&
                    previousTool instanceof GUI.GSelectTool &&
                    (event.light || this._updateTransformMode(false), previousTool.removeEventListener(GUI.GSelectTool.Event, this._selectToolEvent, this)),
                    this._activeTool(newTool));
            }),
            (GOutlineSidebar.prototype._activeTool = function (tool) {
                tool && tool instanceof GUI.GSelectTool && tool.addEventListener(GUI.GSelectTool.Event, this._selectToolEvent, this);
            }),
            (GOutlineSidebar.prototype._selectToolEvent = function (event) {
                event.type === GUI.GSelectTool.Event.Type.EditModeChanged &&
                    this._updateTransformMode(event.args.mode === GUI.GSelectTool.EditMode.Transform);
            }),
            (GOutlineSidebar.prototype._insertPage = function () {
                if (gDesigner.getApplicationManager().isEditingEnabled()) {
                    gDesigner.stats("pages_insert_page");
                    var scene = this._document.getScene();
                    (GUI.GEditor.tryRunTransaction(
                        scene,
                        function () {
                            var page = scene.insertPage();
                            scene.setActivePage(page);
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.insert-page"))
                    ),
                        this._navigateDrawingCenter(scene.getActivePage()),
                        this._refreshSelection());
                }
            }),
            (GOutlineSidebar.prototype.sceneHasInfiniteCanvas = function () {
                var hasInfiniteCanvas = false;
                return (this._document.getScene().iteratePages((page) => (page.isFixedSized() || (hasInfiniteCanvas = true), !hasInfiniteCanvas), true), hasInfiniteCanvas);
            }),
            (GOutlineSidebar.prototype._refreshPageModeSwitch = function (switchInput) {
                let { showAlert: showAlert = false, skipInvalidation: skipInvalidation = false } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const canEnableMultipage = !this.sceneHasInfiniteCanvas();
                if (!this.isEnabled()) return (switchInput.attr("data-title", ""), void switchInput.prop("disabled", true));
                switchInput.prop("disabled", false);
                var window = this._document.getActiveWindow(),
                    view = window.getView();
                (canEnableMultipage ||
                    (switchInput.is(":checked") && switchInput.prop("checked", false),
                    showAlert && GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.multipage-alert"))),
                    view.getViewConfiguration().multiPageView || view.getViewConfiguration().pageLabelsVisible)) &&
                    ((view.getViewConfiguration().multiPageView = switchInput.is(":checked")),
                    (view.getViewConfiguration().pageLabelsVisible = switchInput.is(":checked")),
                    skipInvalidation || (view.invalidate(null, true), showAlert && (window.centerAndZoom(), this._refreshSelection())));
            }),
            (GOutlineSidebar.prototype._deletePage = function () {
                gDesigner.stats("pages_delete_page");
                this._document.getEditor();
                var scene = this._document.getScene(),
                    page = scene.getActivePage();
                page.getProperty("plkt") & GObject.GBlock.ProgramLck.NoDelete ||
                    (page.getSlavePages().length > 0
                        ? GSystemDialog.confirm(
                              GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.confirm-delete-masterpage")),
                              function (confirmed) {
                                  confirmed &&
                                      GUI.GEditor.tryRunTransaction(
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
                        : GUI.GEditor.tryRunTransaction(
                              scene,
                              function () {
                                  scene.deleteActivePage();
                              },
                              GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.delete-page"))
                          ),
                    this._navigateDrawingCenter(scene.getActivePage()),
                    this._refreshSelection());
            }),
            (GOutlineSidebar.prototype._refreshSelection = function () {
                var editor = this._document.getEditor(),
                    scene = this._document.getScene(),
                    isMultiPage = this._document.getActiveWindow().getView().getViewConfiguration().multiPageView,
                    activePage = scene.getActivePage(),
                    filteredSelection = null;
                if (editor.hasSelection()) {
                    var selection = editor.getSelection();
                    isMultiPage
                        ? editor.updateSelection(false, [activePage])
                        : (filteredSelection = selection.filter(function (element) {
                              return GUI.GEditor.getElementPage(element) === activePage;
                          })).length !== selection.length && editor.updateSelection(false, filteredSelection);
                } else isMultiPage && editor.updateSelection(false, [activePage]);
            }),
            (GOutlineSidebar.prototype._movePageTreeNodeCallback = function (parent, reference, nodes) {
                if (nodes && parent && nodes.length) {
                    this._pagePanel.gPagePanel("blockHandlers", true);
                    var scene = this._document.getScene();
                    (GUI.GEditor.tryRunTransaction(
                        this._document.getScene(),
                        function () {
                            (this._document.getEditor().clearSelection(), scene.startBlockReferenceChanges(), nodes.length > 1 && parent.beginUpdate());
                            for (var i = nodes.length; i > 0; --i) {
                                var a = nodes[i - 1];
                                (a.getParent().removeChild(a), parent.insertChild(a, reference));
                            }
                            (nodes.length > 1 && parent.endUpdate(), scene.endBlockReferenceChanges(), scene.isEvenOddMaster() && scene.reassignMasterPages());
                        }.bind(this),
                        GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.move-page"))
                    ),
                        this._pagePanel.gPagePanel("blockHandlers", false));
                }
            }),
            (GOutlineSidebar.prototype._startPageDraggingCallback = function (node) {
                gDesigner.stats("pages_start_drag");
                var draggedNodes = null;
                if (node) {
                    draggedNodes = [];
                    var editor = this._document.getEditor();
                    if (node.hasFlag(GObject.GNode.Flag.Selected)) {
                        var selection = editor.getSelection();
                        draggedNodes = this._filterPageDraggable(selection);
                        draggedNodes = GObject.GNode.order(draggedNodes, true);
                    } else (editor.clearSelection(), draggedNodes.push(node));
                }
                return draggedNodes;
            }),
            (GOutlineSidebar.prototype._filterPageDraggable = function (nodes) {
                var result = [];
                if (nodes)
                    for (var n = 0; n < nodes.length; ++n) {
                        var o = nodes[n];
                        o instanceof GObject.GPage && !o.hasFlag(GObject.GElement.Flag.PartialLocked) && result.push(o);
                    }
                return result;
            }),
            (GOutlineSidebar.prototype.changeActivePage = function (page) {
                gDesigner.stats("pages_select_page");
                const doc = this._document,
                    scene = doc && doc.getScene();
                scene &&
                    page &&
                    GUI.GEditor.tryRunTransaction(
                        scene,
                        () => {
                            (scene.setActivePage(page), this._navigateDrawingCenter(page), this._refreshSelection());
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.change-active-page"))
                    );
            }),
            (GOutlineSidebar.prototype._clickPageTreeNodeCallback = function (page) {
                this.changeActivePage(page);
            }),
            (GOutlineSidebar.prototype._navigateDrawingCenter = function (page) {
                var view = this._document.getActiveWindow().getView();
                if (view.getViewConfiguration().multiPageView) {
                    var transform = page.getTransform(),
                        bbox = page.getGeometryBBox();
                    center = transform.mapRect(bbox).getSide(GObject.GRect.Side.CENTER);
                    view.zoomAtCenter(center);
                } else if (this._document.hasCDR()) {
                    var contentBBox = page.getContentBBox();
                    if (contentBBox && !contentBBox.isEmpty()) {
                        var center = contentBBox.getSide(GObject.GRect.Side.CENTER);
                        view.zoomAtCenter(center);
                    }
                }
            }),
            (GOutlineSidebar.prototype.createLayer = function () {
                const scene = this._document.getScene(),
                    layer = new GObject.GLayer();
                return (
                    layer.setProperty(
                        "name",
                        GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "text.layer")) + " " + scene.queryCount("layer").toString()
                    ),
                    layer
                );
            }),
            (GOutlineSidebar.prototype.insertLayer = function () {
                if (!gDesigner.getApplicationManager().isEditingEnabled()) return;
                gDesigner.stats("layers_insert_layer");
                const scene = this._document.getScene();
                GUI.GEditor.tryRunTransaction(
                    scene,
                    () => {
                        const activeDocument = gDesigner.getActiveDocument(),
                            editor = activeDocument && activeDocument.getEditor(),
                            selection = (editor && editor.getSelection()) || [];
                        let page = scene.getActivePage();
                        page || ((page = scene.insertPage()), page.setFlag(GObject.GNode.Flag.Active));
                        const newLayer = this.createLayer(),
                            topSelection = selection.filter((node) => !this._hasSelectedParentLayer(node)),
                            orderedNodes = GObject.GNode.order(topSelection, true),
                            firstNode = orderedNodes && orderedNodes[0];
                        (((firstNode && firstNode.getParent()) || page).insertChild(newLayer, firstNode), scene.setActiveLayer(newLayer), this._moveLayers(newLayer, null, topSelection, false));
                    },
                    GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.insert-layer"))
                );
            }),
            (GOutlineSidebar.prototype._hasSelectedParentLayer = function (node) {
                let hasSelectedParent = false;
                for (let parent = node.getParent(); parent instanceof GObject.GLayer && !hasSelectedParent; parent = parent.getParent()) parent.hasFlag(GObject.GNode.Flag.Selected) && (hasSelectedParent = true);
                return hasSelectedParent;
            }),
            (GOutlineSidebar.prototype._moveLayerTreeNodeCallback = function (target, reference, nodes, blockHandlers) {
                const scene = this._document.getScene();
                GUI.GEditor.tryRunTransaction(
                    scene,
                    () => {
                        this._moveLayers(target, reference, nodes, blockHandlers);
                    },
                    GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.move-layer"))
                );
            }),
            (GOutlineSidebar.prototype._moveLayers = function (target, reference, nodes) {
                let blockHandlers = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                if (!(target && target.hasMixin(GObject.GNode.Container) && nodes && nodes.length)) return;
                if (!(nodes = nodes.slice().filter((node) => GUI.GEditor.validateBlockInsertion(node.getParent(), node, reference))).length) return;
                blockHandlers && this._layerPanel.gLayerPanel("blockHandlers", true);
                const scene = this._document.getScene();
                (this._document.getEditor().clearSelection(),
                    scene.startBlockReferenceChanges(),
                    nodes.length > 1 && target.beginUpdate(),
                    nodes.forEach((node) => {
                        (GPlatform.GPlatform.modifiers.optionKey ? node.hasMixin(GObject.GNode.Store) && (node = node.clone()) : node.getParent().removeChild(node),
                            node && (target.insertChild(node, reference), target instanceof GObject.GCompoundShape && node.assignStyleFrom(target)));
                    }),
                    nodes.length > 1 && target.endUpdate(),
                    scene.endBlockReferenceChanges(),
                    this._document.getEditor().updateSelection(false, nodes),
                    blockHandlers && this._layerPanel.gLayerPanel("blockHandlers", false));
            }),
            (GOutlineSidebar.prototype._isDuplicateEffectCallback = function (event) {
                return event.altKey;
            }),
            (GOutlineSidebar.prototype._duplicateLayerTreeNodeCallback = function (target, reference, nodes) {
                if (nodes && target && target.hasMixin(GObject.GNode.Container) && nodes.length) {
                    this._layerPanel.gLayerPanel("blockHandlers", false);
                    var scene = this._document.getScene();
                    GUI.GEditor.tryRunTransaction(
                        scene,
                        function () {
                            (this._document.getEditor().clearSelection(), nodes.length > 1 && target.beginUpdate());
                            for (var clonedNodes = [], r = 0; r < nodes.length; ++r) {
                                var s = nodes[r];
                                s.validateInsertion(target) &&
                                    s.hasMixin(GObject.GNode.Store) &&
                                    GUI.GEditor.validateBlockInsertion(target, s) &&
                                    (s = s.clone()) &&
                                    clonedNodes.push(s);
                            }
                            if ((this._document.getEditor().insertElements(clonedNodes, true, true, false, true, target, reference), target instanceof GObject.GCompoundShape))
                                for (var l = 0; l < clonedNodes.length; ++l) clonedNodes[l].assignStyleFrom(target);
                            else if (target instanceof GObject.GShape) {
                                var targetBBox = target.getPaintBBox();
                                if (targetBBox) {
                                    var targetX = targetBBox.getX(),
                                        targetY = targetBBox.getY();
                                    for (r = 0; r < clonedNodes.length; ++r) {
                                        var p = clonedNodes[r],
                                            g = p instanceof GObject.GElement ? p.getPaintBBox() : null;
                                        if (g && !targetBBox.intersectsRect(g, true)) {
                                            var h = g.getX(),
                                                f = g.getY();
                                            null === targetX ||
                                                null === h ||
                                                (GObject.GMath.isEqualEps(targetX, h) && GObject.GMath.isEqualEps(targetY, f)) ||
                                                p.transform(new GObject.GTransform(1, 0, 0, 1, targetX - h, targetY - f), true);
                                        }
                                    }
                                }
                            }
                            (nodes.length > 1 && target.endUpdate(), this._document.getEditor().updateSelection(false, clonedNodes));
                        }.bind(this),
                        GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.move-layer"))
                    );
                }
            }),
            (GOutlineSidebar.prototype._startLayerDraggingCallback = function (node) {
                var draggedNodes = null;
                if (node) {
                    (gDesigner.stats("layers_start_drag"), (draggedNodes = []));
                    var editor = this._document.getEditor();
                    if (node.hasFlag(GObject.GNode.Flag.Selected)) {
                        var selection = editor.getSelection();
                        ((draggedNodes = this._filterLayerDraggable(selection)), (draggedNodes = GObject.GNode.order(draggedNodes, true)));
                    } else (editor.clearSelection(), draggedNodes.push(node));
                }
                return draggedNodes;
            }),
            (GOutlineSidebar.prototype._patternChooserStatusChange = function (active) {
                this._layerToolbar.toggleClass("pattern-choose-actived", active);
            }),
            (GOutlineSidebar.prototype._filterLayerDraggable = function (nodes) {
                var result = [];
                if (nodes)
                    for (var n = 0; n < nodes.length; ++n) {
                        var o = nodes[n];
                        if (!o.hasFlag(GObject.GElement.Flag.PartialLocked)) {
                            for (var i = false, r = o.getParent(); null != r && !i; r = r.getParent()) i = r.hasFlag(GObject.GNode.Flag.Selected);
                            i || result.push(o);
                        }
                    }
                return result;
            }),
            (GOutlineSidebar.prototype._clickLayerTreeNodeCallback = function (node) {
                if (node) {
                    (node instanceof GObject.GCollabText ? gDesigner.stats("layers_select_collab-text") : gDesigner.stats("layers_select_layer"),
                        this._document.getScene().updateActivePageForElem(node),
                        this._document.getScene().updateActiveLayerForElem(node));
                    var editor = this._document.getEditor(),
                        nodeClass = null,
                        selectionChanged = false;
                    if ((node instanceof GObject.GItem ? (nodeClass = GObject.GItem) : node instanceof GObject.GLayer && (nodeClass = GObject.GLayer), nodeClass)) {
                        if (
                            (jQuery(gDesigner.getWindows().getActiveWindow().getView().getHtmlElement()).find("> div[tabindex=0]").focus(),
                            GPlatform.GPlatform.modifiers.metaKey ||
                                (!node.hasFlag(GObject.GNode.Flag.Selected) &&
                                    !node.hasFlag(GObject.GElement.Flag.FullLocked) &&
                                    !GPlatform.GPlatform.modifiers.shiftKey))
                        )
                            (this._layerPanel.gLayerPanel("onlyUpdateStyle", true),
                                editor.updateSelection(GPlatform.GPlatform.modifiers.metaKey, [node]),
                                this._layerPanel.gLayerPanel("onlyUpdateStyle", false),
                                (selectionChanged = true));
                        else if (GPlatform.GPlatform.modifiers.shiftKey) {
                            var selection = editor.getSelection(),
                                matched = null;
                            if (selection && selection.length) {
                                for (var l = selection.length - 1; l >= 0 && !matched; --l) selection[l] instanceof nodeClass && (matched = selection[l]);
                                if (matched && matched !== node) {
                                    var matchedNodes = [];
                                    if (
                                        (this._document.getScene().accept(
                                            function (element) {
                                                return (element instanceof nodeClass && matchedNodes.push(element), true);
                                            },
                                            false,
                                            true
                                        ),
                                        matchedNodes)
                                    ) {
                                        matchedNodes = GObject.GNode.order(matchedNodes);
                                        var rangeNodes = [],
                                            inRange = false,
                                            startIndex = null,
                                            endIndex = null;
                                        for (l = 0; l < matchedNodes.length && (null === startIndex || null === endIndex); ++l)
                                            matchedNodes[l] === matched || matchedNodes[l] === node
                                                ? ((inRange = !inRange), rangeNodes.push(matchedNodes[l]), matchedNodes[l] === matched ? (startIndex = l) : (endIndex = l))
                                                : inRange && rangeNodes.push(matchedNodes[l]);
                                        var matchedParent = matched.getParent(),
                                            nodeParent = node.getParent();
                                        rangeNodes = rangeNodes.filter(
                                            function (candidateNode) {
                                                var treeNode = this._layerPanel.gLayerPanel("getTreeNode", candidateNode);
                                                if (node === candidateNode || matched === candidateNode) return true;
                                                var parentItem = this._layerPanel.gLayerPanel("getItem", treeNode.parent);
                                                return parentItem ? matchedParent === parentItem : candidateNode !== matchedParent && candidateNode !== nodeParent;
                                            }.bind(this)
                                        );
                                        var autoExpandLayers = gDesigner.getSetting("auto_expand_layers");
                                        (gDesigner.setSetting("auto_expand_layers", false),
                                            rangeNodes.length && (startIndex > endIndex && rangeNodes.reverse(), editor.updateSelection(false, rangeNodes), (selectionChanged = true)),
                                            setTimeout(function () {
                                                gDesigner.setSetting("auto_expand_layers", autoExpandLayers);
                                            }, 50));
                                    }
                                } else (editor.updateSelection(false, [node]), (selectionChanged = true));
                            }
                        } else
                            node.hasFlag(GObject.GNode.Flag.Selected) &&
                                (this._layerPanel.gLayerPanel("onlyUpdateStyle", true),
                                editor.clearSelection(),
                                this._layerPanel.gLayerPanel("onlyUpdateStyle", false),
                                (selectionChanged = true));
                        if (selectionChanged)
                            if (GPlatform.GPlatform.modifiers.optionKey)
                                editor.hasSelection()
                                    ? gDesigner.executeAction(GFitSelectionAction.ID, void 0, "outlinesidebar")
                                    : gDesigner.executeAction(GFitAllAction.ID, void 0, "outlinesidebar");
                            else if (node.hasMixin(GObject.GNode.Properties) && node.getProperty("collab")) {
                                const window = this._document && this._document.getActiveWindow();
                                window && window.scrollIntoView(node.getGeometryBBox());
                            }
                    }
                }
            }),
            (GOutlineSidebar.prototype._deleteLayerOrItem = function () {
                gDesigner.stats("layers_delete_layer-or-item");
                var editor = this._document.getEditor(),
                    scene = this._document.getScene(),
                    activeLayer = scene.getActiveLayer();
                editor.hasSelection()
                    ? GUI.GEditor.tryRunTransaction(
                          scene,
                          function () {
                              editor.deleteSelection(true);
                              var newActiveLayer = scene.getActiveLayer();
                              activeLayer &&
                                  activeLayer === newActiveLayer &&
                                  (activeLayer.acceptChildren(
                                      function (child) {
                                          return child instanceof GObject.GItem;
                                      },
                                      false,
                                      true
                                  ) ||
                                      scene.deleteActiveLayer(activeLayer));
                          },
                          GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.delete-layer-item"))
                      )
                    : activeLayer &&
                      GUI.GEditor.tryRunTransaction(
                          scene,
                          function () {
                              scene.deleteActiveLayer(activeLayer);
                          },
                          GObject.GLocale.get(new GObject.GLocaleKey("GOutlineSidebar", "action.delete-layer-item"))
                      );
            }),
            (GOutlineSidebar.prototype._updateExport = function () {
                this._exportInstance.update(this._document, this._elements);
            }),
            (GOutlineSidebar.prototype._updateTransformMode = function (transformMode) {
                transformMode !== this._transformMode && ((this._transformMode = transformMode), this._updateExport());
            }),
            (GOutlineSidebar.prototype._afterFlagChangeEvent = function (event) {
                event.node instanceof GObject.GPage &&
                    event.flag === GObject.GNode.Flag.Active &&
                    (this._document.getEditor().hasSelection() || this._updateExport());
            }),
            (GOutlineSidebar.prototype._afterPropertiesChanged = function (event) {
                !event.temporary &&
                    (event.node instanceof GObject.GScene || event.node instanceof GObject.GPage) &&
                    GObject.GUtil.containsOneOf(event.properties, ["w", "h"]) &&
                    this._refreshPageModeSwitch(this._getMultiPageSwitcher());
            }),
            (GOutlineSidebar.prototype._afterInsert = function (event) {
                var node = event.node;
                node instanceof GObject.GPage && 0 === node.getProperty("w") && this._refreshPageModeSwitch(this._getMultiPageSwitcher());
            }),
            (GOutlineSidebar.prototype.toString = function () {
                return "[Object GOutlineSidebar]";
            }),
            (module.exports = GOutlineSidebar));
    };
