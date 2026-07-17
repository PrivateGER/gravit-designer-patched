module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(168 /* PDFFetchStream */), require(3), require(4), require(41), require(13), require(169 /* PDFNetworkStream */), require(26));
        var Editor = require(53),
            GObject = require(1),
            DocumentEvent = require(78),
            GPanel = require(606),
            GSidebar = require(806),
            GSidebars = require(395),
            GAppearanceProperties = require(1160),
            GFillPaintLayerProperties = require(1261),
            GBorderPaintLayerProperties = require(1162),
            GEffectProperties = require(1262),
            GBoolOpProperties = require(1264),
            GEllipseProperties = require(1265),
            GImageProperties = require(1266),
            GPathProperties = require(1269),
            GPolygonProperties = require(1270),
            GRectangleProperties = require(1271),
            GSliceProperties = require(1272),
            GTextProperties = require(1273),
            AlignProperties = require(1274),
            GVersionHistoryProperties = require(1528),
            VersionHistoryEvent = require(1159);
        const SettingChangedEvent = require(135),
            SidebarsIds = require(198),
            SidebarEvent = require(807);
        function GInspectorSidebar() {
            (GSidebar.call(this), (this._propertyPanels = []), (this._touchTools = []));
        }
        (GObject.GObject.inherit(GInspectorSidebar, GSidebar),
            (GInspectorSidebar.ACCORDIONS = [GAppearanceProperties.prototype.toString(), GFillPaintLayerProperties.prototype.toString(), GBorderPaintLayerProperties.prototype.toString(), GEffectProperties.prototype.toString()]),
            (GInspectorSidebar.APPEARANCE_PROPERTIES = [
                AlignProperties.prototype.toString(),
                GPolygonProperties.prototype.toString(),
                GPathProperties.prototype.toString(),
                GEllipseProperties.prototype.toString(),
                GTextProperties.prototype.toString(),
                GImageProperties.prototype.toString(),
                GRectangleProperties.prototype.toString(),
                GSliceProperties.prototype.toString(),
                GBoolOpProperties.prototype.toString(),
                GAppearanceProperties.prototype.toString(),
            ]),
            (GInspectorSidebar.ID = SidebarsIds.SidebarsIds.GInspectorSidebar),
            (GInspectorSidebar.TITLE = new GObject.GLocaleKey("GInspectorSidebar", "title")),
            (GInspectorSidebar.prototype._touchTools = null),
            (GInspectorSidebar.prototype._htmlElement = null),
            (GInspectorSidebar.prototype._propertyPanels = null),
            (GInspectorSidebar.prototype._document = null),
            (GInspectorSidebar.prototype._elements = null),
            (GInspectorSidebar.prototype._transformMode = false),
            (GInspectorSidebar.prototype._appearancePanel = null),
            (GInspectorSidebar.prototype._versionHistoryPanel = null),
            (GInspectorSidebar.prototype._versionHistoryProperties = null),
            (GInspectorSidebar.prototype._versionHistoryMode = false),
            (GInspectorSidebar.prototype.getId = function () {
                return GInspectorSidebar.ID;
            }),
            (GInspectorSidebar.prototype.getTitle = function () {
                return GInspectorSidebar.TITLE;
            }),
            (GInspectorSidebar.prototype.isEnabled = function () {
                return !!this._document;
            }),
            (GInspectorSidebar.prototype.isVisible = function () {
                return !(!gDesigner.getApplicationManager().isInspectEnabled() && gDesigner.getActiveDocument());
            }),
            (GInspectorSidebar.prototype.getOrientation = function () {
                return GSidebars.Orientation.Right;
            }),
            (GInspectorSidebar.prototype.getMinimumWidth = function () {
                return 300;
            }),
            (GInspectorSidebar.prototype.isResizeable = function () {
                return false;
            }),
            (GInspectorSidebar.prototype.getDefaultWidth = function () {
                return 300;
            }),
            (GInspectorSidebar.prototype.init = function (container) {
                (GSidebar.prototype.init.call(this, container), (this._htmlElement = container));
                var scrollingPanels = $("<div></div>").addClass("panels scrolling-panels").appendTo(this._htmlElement),
                    stickyPanels = $("<div></div>").addClass("panels sticky-panels").appendTo(this._htmlElement),
                    appearanceToolbar = $("<div></div>").addClass("toolbar appearance-toolbar");
                ((this._appearancePanel = $("<div></div>")
                    .css("display", "none")
                    .addClass("properties-panel")
                    .addClass("appearance-properties-panel")),
                    $("<label></label>")
                        .addClass("appearance-toolbar-title")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GAppearanceProperties", "title")))
                        .appendTo(appearanceToolbar));
                for (
                    var createPropertyPanel = function (properties) {
                            var targetPanels = properties.isSticky() ? stickyPanels : scrollingPanels,
                                panel = $("<div></div>").css("display", "none").addClass("properties-panel"),
                                divider = $("<hr/>"),
                                toolbar = $("<div></div>").addClass("toolbar");
                            if ($.inArray(properties.toString(), GInspectorSidebar.APPEARANCE_PROPERTIES) > -1) {
                                var appearancePropertyPanel = $("<div></div>").addClass("appearance-property-panel");
                                (properties.init(appearancePropertyPanel, appearanceToolbar),
                                    divider.appendTo(appearancePropertyPanel),
                                    this._appearancePanel.append(appearancePropertyPanel),
                                    appearanceToolbar.appendTo(targetPanels),
                                    this._appearancePanel.appendTo(targetPanels),
                                    (toolbar = appearanceToolbar),
                                    (panel = appearancePropertyPanel));
                            } else (divider.appendTo(targetPanels), properties.init(panel, toolbar), "" !== toolbar.html() ? toolbar.appendTo(targetPanels) : (toolbar = null), panel.appendTo(targetPanels));
                            this._propertyPanels.push({
                                panel: panel,
                                toolbar: toolbar,
                                divider: divider,
                                properties: properties,
                            });
                        }.bind(this),
                        r = 0;
                    r < gravit.properties.length;
                    ++r
                )
                    createPropertyPanel(gravit.properties[r]);
                (this._activeTool(gDesigner.getToolManager().getActiveTool()),
                    this._updatePropertyPanels(),
                    this._initVersionHistoryPanel(),
                    gDesigner.getRightSidebars().addEventListener(SidebarEvent, this._sidebarEvent, this),
                    gDesigner.addEventListener(SettingChangedEvent, this._settingChanged, this));
            }),
            (GInspectorSidebar.prototype._getPropertyPanel = function (propertiesClass) {
                return this._propertyPanels.find((panel) => panel.properties instanceof propertiesClass) || null;
            }),
            (GInspectorSidebar.prototype.openFillPatternChooser = function () {
                const panel = this._getPropertyPanel(GFillPaintLayerProperties);
                panel && panel.properties.openPatternChooser();
            }),
            (GInspectorSidebar.prototype.openBorderPatternChooser = function () {
                const panel = this._getPropertyPanel(GBorderPaintLayerProperties);
                panel && panel.properties.openPatternChooser();
            }),
            (GInspectorSidebar.prototype.openFillEyeDropper = function (pageX, pageY) {
                const panel = this._getPropertyPanel(GFillPaintLayerProperties);
                panel && panel.properties.openEyeDropper(pageX, pageY);
            }),
            (GInspectorSidebar.prototype.openBorderEyeDropper = function (pageX, pageY) {
                const panel = this._getPropertyPanel(GBorderPaintLayerProperties);
                panel && panel.properties.openEyeDropper(pageX, pageY);
            }),
            (GInspectorSidebar.prototype.openTextColorEyeDropper = function (pageX, pageY) {
                const panel = this._getPropertyPanel(GTextProperties);
                panel && panel.properties.openEyeDropper(pageX, pageY);
            }),
            (GInspectorSidebar.prototype.setPathPointsNodeType = function (nodeType) {
                const panel = this._getPropertyPanel(GPathProperties);
                panel && panel.properties.assignNodeType(nodeType);
            }),
            (GInspectorSidebar.prototype._sidebarEvent = function (event) {
                gDesigner.isTouchEnabled() &&
                    event.type === SidebarEvent.Type.Activated &&
                    event.sidebar &&
                    event.sidebar.getId() === SidebarsIds.SidebarsIds.GAnnotationsSidebar &&
                    this._updatePropertyPanels();
            }),
            (GInspectorSidebar.prototype.activate = function () {
                (gDesigner.addEventListener(DocumentEvent, this._documentEvent, this),
                    gDesigner.getToolManager().addEventListener(Editor.GToolManager.ToolChangedEvent, this._toolChangedEvent, this));
                var activeDocument = gDesigner.getActiveDocument();
                activeDocument && this._activateDocument(activeDocument);
            }),
            (GInspectorSidebar.prototype.deactivate = function () {
                (gDesigner.removeEventListener(DocumentEvent, this._documentEvent, this),
                    gDesigner.getToolManager().removeEventListener(Editor.GToolManager.ToolChangedEvent, this._toolChangedEvent, this),
                    this._document && this._deactivateDocument());
            }),
            (GInspectorSidebar.prototype._initVersionHistoryPanel = function () {
                this._versionHistoryPanel = $("<div />")
                    .css("display", "none")
                    .addClass("panels history-panel")
                    .appendTo(this._htmlElement);
                var panel = $("<div></div>").addClass("properties-panel version-history-panel"),
                    toolbar = $("<div></div>").addClass("toolbar");
                ((this._versionHistoryProperties = new GVersionHistoryProperties()),
                    this._versionHistoryProperties.init(panel, toolbar),
                    this._versionHistoryPanel.append(toolbar).append(panel),
                    gDesigner.addEventListener(VersionHistoryEvent, this._updateVersionsPanel, this));
            }),
            (GInspectorSidebar.prototype._updateVersionsPanel = function (event) {
                if (event.type === VersionHistoryEvent.Type.Enable) {
                    var sidebars;
                    switch (((this._versionHistoryMode = true), this.getOrientation())) {
                        case GSidebars.Orientation.Left:
                            sidebars = gDesigner.getLeftSidebars();
                            break;
                        case GSidebars.Orientation.Right:
                            sidebars = gDesigner.getRightSidebars();
                    }
                    (sidebars.setActiveSidebar(this.getId()),
                        gDesigner.setPartVisible(sidebars.getSidebarsPart(), true),
                        this._htmlElement.find(".panels").css("display", "none"),
                        this._versionHistoryPanel.appendTo(this._htmlElement),
                        this._versionHistoryPanel.css("display", ""));
                } else
                    event.type === VersionHistoryEvent.Type.Disable &&
                        ((this._versionHistoryMode = false),
                        this._htmlElement.find(".panels").css("display", ""),
                        this._versionHistoryPanel.css("display", "none"),
                        this._updatePropertyPanels(false));
                gDesigner.isTouchEnabled() && this._updateVersionsPanelTouch();
            }),
            (GInspectorSidebar.prototype._documentEvent = function (event) {
                event.type === DocumentEvent.Type.Activated
                    ? this._activateDocument(event.document)
                    : event.type === DocumentEvent.Type.Deactivated
                      ? this._deactivateDocument()
                      : event.type === DocumentEvent.Type.StorageItemUpdated && this._updatePropertyPanels(false, event.data ? event.data : null);
            }),
            (GInspectorSidebar.prototype._activateDocument = function (activeDocument) {
                (this._document && this._deactivateDocument(), (this._document = activeDocument));
                var scene = this._document.getScene(),
                    editor = this._document.getEditor();
                (gDesigner.getToolManager().addEventListener(Editor.GToolManager.ToolChangedEvent, this._updateFromToolOrSelection, this),
                    editor.addEventListener(Editor.GEditor.SelectionChangedEvent, this._updateFromToolOrSelection, this),
                    scene.addEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this),
                    this._updateFromToolOrSelection(),
                    this.trigger(GPanel.UPDATE_EVENT));
            }),
            (GInspectorSidebar.prototype._deactivateDocument = function () {
                var scene = this._document.getScene(),
                    editor = this._document.getEditor();
                (gDesigner.getToolManager().removeEventListener(Editor.GToolManager.ToolChangedEvent, this._updateFromToolOrSelection, this),
                    editor.removeEventListener(Editor.GEditor.SelectionChangedEvent, this._updateFromToolOrSelection, this),
                    scene.removeEventListener(GObject.GNode.AfterFlagChangeEvent, this._afterFlagChangeEvent, this),
                    (this._document = null),
                    (this._elements = null),
                    this._updatePropertyPanels(true),
                    this.trigger(GPanel.UPDATE_EVENT));
            }),
            (GInspectorSidebar.prototype._toolChangedEvent = function (event) {
                var previousTool = event.previousTool,
                    newTool = event.newTool;
                (previousTool &&
                    previousTool instanceof Editor.GSelectTool &&
                    (event.light || this._updateTransformMode(false), previousTool.removeEventListener(Editor.GSelectTool.Event, this._selectToolEvent, this)),
                    this._activeTool(newTool));
            }),
            (GInspectorSidebar.prototype._activeTool = function (tool) {
                tool && tool instanceof Editor.GSelectTool && tool.addEventListener(Editor.GSelectTool.Event, this._selectToolEvent, this);
            }),
            (GInspectorSidebar.prototype._selectToolEvent = function (event) {
                event.type === Editor.GSelectTool.Event.Type.EditModeChanged &&
                    this._updateTransformMode(event.args.mode === Editor.GSelectTool.EditMode.Transform);
            }),
            (GInspectorSidebar.prototype._updateTransformMode = function (isTransformMode) {
                isTransformMode !== this._transformMode && ((this._transformMode = isTransformMode), this._updatePropertyPanels(false));
            }),
            (GInspectorSidebar.prototype._afterFlagChangeEvent = function (event) {
                event.node instanceof GObject.GPage &&
                    event.flag === GObject.GNode.Flag.Active &&
                    !this._document.getEditor().hasSelection() &&
                    this._updateFromToolOrSelection();
            }),
            (GInspectorSidebar.prototype._updateFromToolOrSelection = function (event) {
                var editor = this._document.getEditor();
                if (
                    this._document &&
                    editor &&
                    ((this._elements = editor.getSelection()),
                    this._elements &&
                        this._elements.length &&
                        (this._elements = editor.filterIndividualElements(this._elements.filter((element) => !element.hasMixin(GObject.GAnnotation)))),
                    !this._elements || 0 === this._elements.length)
                ) {
                    var activeTool = gDesigner.getToolManager().getActiveTool(),
                        defaultStyle = null;
                    activeTool instanceof Editor.GItemTool && (defaultStyle = activeTool.getDefaultStyle())
                        ? (this._elements = [defaultStyle])
                        : (this._elements = [this._document.getScene().getActivePage()]);
                }
                this._updatePropertyPanels(false);
            }),
            (GInspectorSidebar.prototype._updatePropertyPanels = function (isDeactivating, data) {
                var hasVisiblePanel = false,
                    previousProperties = null,
                    sliceToolbar = null;
                this._touchTools = [];
                for (var a = 0; a < this._propertyPanels.length; ++a) {
                    var r = this._propertyPanels[a],
                        s = r.properties,
                        l = s.isAvailable(this._transformMode);
                    if ((l && (l = r.properties.update(isDeactivating ? null : this._document, this._elements ? this._elements : null, data || null)), l)) {
                        const touchTools = r.properties.getTouchTools();
                        touchTools && (this._touchTools = this._touchTools.concat(touchTools));
                    }
                    (r.panel.css("display", l ? "" : "none"),
                        r.toolbar &&
                            (r.toolbar.css("display", l ? "" : "none"),
                            s instanceof GSliceProperties && l && (sliceToolbar = r.toolbar),
                            $.inArray(r.properties.toString(), GInspectorSidebar.ACCORDIONS) > -1 &&
                                l &&
                                (r.toolbar.addClass("appearance-panel-toggle-btn").gAccordion("init", ".properties-panel", "label"),
                                this._htmlElement
                                    .find(".appearance-panel-toggle-btn button.g-accordion")
                                    [gDesigner.isTouchEnabled() ? "hide" : "show"]())));
                    var c = l && hasVisiblePanel && s.isGroup(previousProperties);
                    (r.divider.css("display", c ? "" : "none"), (hasVisiblePanel = hasVisiblePanel || l), l && ((previousProperties = s), this._appearancePanel.css("display", "")));
                    const isEnabled = this._isPropertiesEnabled(r.properties);
                    (r.toolbar && r.toolbar.toggleClass("g-disabled", !isEnabled), r.panel && r.panel.toggleClass("g-disabled", !isEnabled));
                }
                sliceToolbar && gDesigner.isTouchEnabled() && sliceToolbar.css("display", "");
                var appearanceDivider = $("<hr/>").addClass("appearance-divider");
                (0 === $(".appearance-divider").length && $(".appearance-toolbar:first").before(appearanceDivider),
                    $(".appearance-divider").css("display", "none" === $(".appearance-toolbar:first").css("display") ? "none" : ""),
                    $(".appearance-properties-panel >div >hr:visible:last").css("display", "none"),
                    $(".sidebar-inspector").find(".toolbar").removeClass("last-toolbar"),
                    $(".sidebar-inspector").find(".toolbar").filter(":visible").filter(":last").addClass("last-toolbar"),
                    gDesigner.isTouchEnabled() && this._fireUpdateEvent(),
                    this._updateUI());
            }),
            (GInspectorSidebar.prototype._updateUI = function () {
                let groupFramePanel = this._htmlElement.find(".group-frame-property-panel"),
                    framePanel = this._htmlElement.find(".frame-property-panel"),
                    itemPanel = this._htmlElement.find(".item-property-panel"),
                    symbolToolbar = this._htmlElement.find(".symbol-instance-toolbar"),
                    symbolPanel = this._htmlElement.find(".symbol-instance-panel"),
                    anchorElement = null;
                ((anchorElement = gDesigner.isTouchEnabled()
                    ? this._htmlElement.find(".appearance-properties-panel .appearance-property-panel:last-child")
                    : this._htmlElement.find(".scene-properties-panel").next()),
                    anchorElement &&
                        (symbolPanel.insertAfter(anchorElement),
                        symbolToolbar.insertAfter(anchorElement),
                        itemPanel.next().insertAfter(anchorElement),
                        itemPanel.insertAfter(anchorElement),
                        framePanel.next().insertAfter(anchorElement),
                        framePanel.insertAfter(anchorElement),
                        groupFramePanel.next().insertAfter(anchorElement),
                        groupFramePanel.insertAfter(anchorElement)));
            }),
            (GInspectorSidebar.prototype._settingChanged = function (event) {
                "touch" === event.key &&
                    (this._htmlElement
                        .find(".appearance-panel-toggle-btn button.g-accordion")
                        [gDesigner.isTouchEnabled() ? "hide" : "show"](),
                    this._updateUI(),
                    this._updatePropertyPanels());
            }),
            (GInspectorSidebar.prototype._isPropertiesEnabled = function (properties) {
                return true;
            }),
            (GInspectorSidebar.prototype.getTouchTools = function () {
                let { disableContextSensitive: disableContextSensitive = false } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return disableContextSensitive ? this._getAllTouchTools() : this._touchTools;
            }),
            (GInspectorSidebar.prototype._getAllTouchTools = function () {
                return [
                    ...new Set(
                        this._propertyPanels.reduce((touchTools, panelEntry) => {
                            const panelTouchTools = panelEntry.properties.getTouchTools();
                            return (panelTouchTools && (touchTools = touchTools.concat(panelTouchTools)), touchTools);
                        }, [])
                    ),
                ];
            }),
            (GInspectorSidebar.prototype.toString = function () {
                return "[Object GInspectorSidebar]";
            }),
            require(1529)(GInspectorSidebar),
            (module.exports = GInspectorSidebar));
    };
