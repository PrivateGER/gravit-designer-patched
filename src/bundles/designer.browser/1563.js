module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13), require(32), require(97), require(33));
        var GObject = require(1),
            editorModule = require(53),
            GContextMenu = require(1303),
            GAttachToPathAction = require(1176),
            GConvertToPathAction = require(810),
            GCreateSymbolAction = require(608),
            GDetachSymbolAction = require(874),
            GResetInstanceAction = require(1177),
            GDetachFromPathAction = require(1178),
            GJoinPathsAction = require(1179);
        const GMergeMainAction = require(812);
        var GSelectByFontTypeAction = require(1180),
            GSplitPathAction = require(873),
            GTransformAction = require(871),
            GVectorizeBorderAction = require(872),
            GMenu = require(238),
            GMenuItem = require(339),
            GMenuPosition = require(444),
            GMaskWithShapeAction = require(1181),
            GPasteAction = require(877),
            GPasteInPlaceAction = require(1183),
            GPasteInsideAction = require(1184),
            GPasteHereAction = require(1182),
            GPasteStyleAction = require(875),
            GClipAction = require(809),
            GConvertToImageAction = require(1314),
            GDuplicateAction = require(1315),
            GCreateNestedCompoundAction = require(1316),
            GOutlineAction = require(1185),
            GOffsetAction = require(1317),
            GSimplifyAction = require(1318),
            GSplitLineAction = require(1319),
            GConvertToRawPathAction = require(1320),
            GFitSelectionAction = require(566),
            GAction = require(31),
            { replaceImage, setOriginSize, cropImage } = require(1268 /* imageActions */),
            GDocumentEvent = require(78);
        const GPasteAndReplaceAction = require(876);
        ((GContextMenu.prototype._contextMenuContainerTouch = null),
            (GContextMenu.prototype._createTouchContextMenu = function () {
                var container = $("<div/>").gOverlay({
                        releaseOnClose: false,
                        clazz: "context-menu-touch-overlay",
                    }),
                    self = this;
                this._contextMenuContainerTouch = container;
                $("<div/>")
                    .addClass("transform-section")
                    .gPropertyRow({
                        columns: [
                            {
                                width: "48%",
                                content: this._createActionButtons([
                                    {
                                        action: gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.FlipHorizontal),
                                    },
                                    {
                                        action: gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.FlipVertical),
                                    },
                                ]),
                            },
                            { width: "4%" },
                            {
                                width: "48%",
                                content: this._createActionButtons([
                                    {
                                        action: gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.Rotate90Left),
                                        icon: "gravit-icon-rotate-left",
                                    },
                                    {
                                        action: gDesigner.getAction(GTransformAction.ID + "." + GTransformAction.Type.Rotate90Right),
                                        icon: "gravit-icon-rotate-right",
                                    },
                                ]),
                            },
                        ],
                    })
                    .appendTo(container);
                $("<div/>")
                    .addClass("paste-section")
                    .gPropertyRow({
                        columns: [
                            {
                                content: this._createActionButtonWithMenu(
                                    gDesigner.getAction(GPasteAction.ID),
                                    GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.paste")),
                                    [
                                        gDesigner.getAction(GPasteInPlaceAction.ID),
                                        gDesigner.getAction(GPasteInsideAction.ID),
                                        gDesigner.getAction(GPasteHereAction.ID),
                                        gDesigner.getAction(GPasteAndReplaceAction.ID),
                                        gDesigner.getAction(GPasteStyleAction.ID),
                                    ]
                                ),
                            },
                        ],
                    })
                    .appendTo(container);
                const compoundAction = gDesigner.getAction(GMergeMainAction.ID),
                    compoundSubActions = compoundAction && compoundAction.getSubActions().concat(gDesigner.getAction(GCreateNestedCompoundAction.ID));
                ($("<div/>")
                    .addClass("compound-section")
                    .gPropertyRow({
                        columns: [
                            {
                                content: this._createActionButtonWithMenu(
                                    gDesigner.getAction(GMergeMainAction.ID),
                                    GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.create-compound")),
                                    compoundSubActions
                                ),
                            },
                        ],
                    })
                    .appendTo(container),
                    $("<div/>")
                        .addClass("path-section")
                        .gPropertyRow({
                            columns: [
                                {
                                    content: this._createActionButtonWithMenu(
                                        gDesigner.getAction(GConvertToPathAction.ID),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.convert-to-path")),
                                        [
                                            gDesigner.getAction(GVectorizeBorderAction.ID),
                                            gDesigner.getAction(GConvertToRawPathAction.ID),
                                            gDesigner.getAction(GOutlineAction.ID),
                                            gDesigner.getAction(GOffsetAction.ID),
                                            gDesigner.getAction(GSimplifyAction.ID),
                                            gDesigner.getAction(GJoinPathsAction.ID),
                                            gDesigner.getAction(GSplitPathAction.ID),
                                            gDesigner.getAction(GSplitLineAction.ID),
                                        ]
                                    ),
                                },
                            ],
                        })
                        .appendTo(container),
                    $("<div/>")
                        .addClass("symbol-section")
                        .gPropertyRow({
                            columns: [
                                {
                                    content: this._createActionButtonWithMenu(
                                        gDesigner.getAction(GCreateSymbolAction.ID),
                                        GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.create-symbol")),
                                        [
                                            gDesigner.getAction(GResetInstanceAction.ID),
                                            gDesigner.getAction(GDetachSymbolAction.ID),
                                            {
                                                caption: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.go-to-master")),
                                                click: (event) => {
                                                    var document = gDesigner.getActiveDocument(),
                                                        editor = document.getEditor();
                                                    if (document) {
                                                        var individualSelection = document.getEditor().getIndividualSelection();
                                                        if (individualSelection && individualSelection.length) {
                                                            var symbolInstance = individualSelection.find((element) => element instanceof GObject.GSymbol && !element.isLocked() && !element.isMaster());
                                                            if (symbolInstance) {
                                                                var targetSymbol = symbolInstance;
                                                                (editor.beginTransaction(),
                                                                    editor.clearSelection(),
                                                                    editor.updateSelection(false, [targetSymbol]),
                                                                    gDesigner.executeAction(GFitSelectionAction.ID, void 0, void 0, true),
                                                                    editor.commitTransaction(
                                                                        GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.go-to-master"))
                                                                    ));
                                                            }
                                                        }
                                                    }
                                                    gDesigner.stats("touchmenu_go-to-master");
                                                },
                                                icon: "gravit-icon-go-to-master",
                                                isEnabled: () => {
                                                    var document = gDesigner.getActiveDocument();
                                                    if (document) {
                                                        var individualSelection = document.getEditor().getIndividualSelection();
                                                        if (individualSelection && individualSelection.length)
                                                            if (individualSelection.find((element) => element instanceof GObject.GSymbol && !element.isLocked() && !element.isMaster()))
                                                                return true;
                                                    }
                                                    return false;
                                                },
                                            },
                                        ]
                                    ),
                                },
                            ],
                        })
                        .appendTo(container));
                $("<div/>")
                    .addClass("text-section")
                    .gPropertyRow({
                        columns: [
                            {
                                content: this._createActionButtonMenu(
                                    "gravit-icon-textbox",
                                    GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.text")),
                                    [gDesigner.getAction(GAttachToPathAction.ID), gDesigner.getAction(GDetachFromPathAction.ID), gDesigner.getAction(GSelectByFontTypeAction.ID)],
                                    () => !!this._getFirstSelectedTextElement()
                                ),
                            },
                        ],
                    })
                    .appendTo(container);
                var imageMenuItems = [
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.crop")),
                        click: (event) => {
                            var hasDetail = gDesigner.getActiveDocument().getEditor().hasSelectionDetail();
                            (cropImage(this._getFirstSelectedImageElement(), hasDetail), gDesigner.stats("touchmenu_crop-image"));
                        },
                        icon: "gravit-icon-crop",
                        update: (menuItem) => {
                            var hasDetail = gDesigner.getActiveDocument().getEditor().hasSelectionDetail();
                            menuItem.setCaption(GObject.GLocale.get(new GObject.GLocaleKey("GImageProperties", hasDetail ? "action.no-crop" : "action.crop")));
                        },
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.original-size")),
                        click: (event) => {
                            (setOriginSize(this._getFirstSelectedImageElement()), gDesigner.stats("touchmenu_original-size"));
                        },
                        icon: "gravit-icon-expand",
                    },
                    {
                        caption: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.replace-image")),
                        click: (event) => {
                            (gDesigner.stats("touchmenu_replace-image"),
                                replaceImage(this._getFirstSelectedImageElement(), gDesigner.getActiveDocument()));
                        },
                        icon: "gravit-icon-replaceimg",
                    },
                ];
                $("<div/>")
                    .addClass("image-section")
                    .gPropertyRow({
                        columns: [
                            {
                                content: this._createActionButtonMenu(
                                    "gravit-icon-image",
                                    GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.image")),
                                    imageMenuItems,
                                    () => !!this._getFirstSelectedImageElement()
                                ),
                            },
                        ],
                    })
                    .appendTo(container);
                return (
                    $("<div/>")
                        .addClass("")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "48%",
                                    content: this._createActionButtons([
                                        { action: gDesigner.getAction(GClipAction.ID) },
                                        {
                                            action: gDesigner.getAction(GMaskWithShapeAction.ID),
                                            icon: "gravit-icon-mask-with-shape",
                                        },
                                    ]),
                                },
                                { width: "4%" },
                                {
                                    width: "48%",
                                    content: this._createActionButtons([
                                        {
                                            action: gDesigner.getAction(GConvertToImageAction.ID),
                                            icon: "gravit-icon-flatten",
                                        },
                                        {
                                            action: gDesigner.getAction(GDuplicateAction.ID),
                                            icon: "gravit-icon-duplicate",
                                        },
                                    ]),
                                },
                            ],
                        })
                        .appendTo(container),
                    $("<div/>")
                        .addClass("")
                        .gPropertyRow({
                            columns: [
                                {
                                    width: "48%",
                                    content: this._createActionButtons([
                                        {
                                            icon: "gravit-icon-lock",
                                            click: (event) => {
                                                (self._setAllSelectionsLocked(),
                                                    this._contextMenuContainerTouch.gOverlay("close"),
                                                    gDesigner.stats("touchmenu_lock-layer"));
                                            },
                                            isEnabled: () => self._getSelectedItems().length > 0,
                                        },
                                        {
                                            icon: "gravit-icon-hide-big",
                                            click: (event) => {
                                                (self._setAllSelectionsHidden(),
                                                    this._contextMenuContainerTouch.gOverlay("close"),
                                                    gDesigner.stats("touchmenu_hide-layer"));
                                            },
                                            isEnabled: () => self._getSelectedItems().length > 0,
                                        },
                                    ]),
                                },
                                { width: "4%" },
                                { width: "48%", content: this._createSelectMenuButton() },
                            ],
                        })
                        .appendTo(container),
                    gDesigner.addEventListener(GDocumentEvent, this._documentEvent.bind(this)),
                    container
                );
            }),
            (GContextMenu.prototype._elementsToCheck = []),
            (GContextMenu.prototype._documentEvent = function (event) {
                event.type === GDocumentEvent.Type.ContextMenuOpened &&
                    (gDesigner.getAction(GPasteHereAction.ID).setPosition(this._contextMenuClientPosition),
                    this._elementsToCheck.forEach((checkEntry) => {
                        checkEntry.isEnabled && checkEntry.element && checkEntry.element.attr("disabled", !checkEntry.isEnabled(this._mouseEvent));
                    }));
            }),
            (GContextMenu.prototype._createActionButtons = function (actions) {
                var buttonGroup = $("<div/>").addClass("button-group");
                return (
                    (actions = actions instanceof Array ? actions : [actions]).forEach((actionDef) => {
                        var button = this._createActionButton(actionDef);
                        buttonGroup.append(button);
                    }),
                    buttonGroup
                );
            }),
            (GContextMenu.prototype._createActionButton = function (options) {
                var label = options.label,
                    icon = options.icon,
                    clickHandler = options.click;
                let isEnabledFn = options.isEnabled,
                    isPro = false;
                options.action &&
                    ((isPro = options.action.isPro()),
                    label || (label = GObject.GLocale.get(options.action.getTitle())),
                    icon || (icon = options.action.getIcon() || options.action.getGroupIcon()),
                    clickHandler ||
                        (clickHandler = function () {
                            gDesigner.executeAction(options.action.getId(), void 0, "touchmenu");
                        }),
                    isEnabledFn ||
                        (isEnabledFn = function () {
                            return gDesigner.canExecuteAction(options.action.getId());
                        }));
                var proWrapper = $("<div></div>").gPro({ pro: isPro });
                options.action && proWrapper.addClass("action").attr("data-action", options.action.getId()).data("action", options.action);
                var button = $("<button></button>")
                    .addClass("action-button")
                    .addClass(options.longButton ? "long-button" : "")
                    .toggleClass("g-active", true === options.active)
                    .appendTo(proWrapper)
                    .on("mousedown", function (event) {
                        event.preventDefault();
                    });
                return (
                    this._elementsToCheck.push({ element: button, isEnabled: isEnabledFn }),
                    icon && (this._updateIcon($("<span></span>").appendTo(button), icon), button.addClass("icon")),
                    options.label && button.append($("<span></span>").addClass("label").text(options.label)),
                    options.isMenu && button.append($("<span></span>").addClass("icon item-tail gravit-icon-chevron-left-small")),
                    clickHandler && button.on("click", clickHandler),
                    proWrapper
                );
            }),
            (GContextMenu.prototype._createActionButtonWithMenu = function (action, label, menuItems) {
                var wrapper = $("<div/>").addClass("action-button-with-menu");
                wrapper.append(this._createActionButton({ action: action, label: label, longButton: true }));
                var menu = new GMenu(null, "g-context-menu");
                ((menu.__which = "touchmenu"),
                    menuItems.forEach((menuItem) => {
                        if (menuItem instanceof GAction) menu.createAddItem(menuItem, null, null, null, menuItem.getId() === GPasteHereAction.ID ? GContextMenu.ID : null);
                        else {
                            var addedItem = menu.createAddItem(menuItem.caption, menuItem.click);
                            (addedItem.setIcon(menuItem.icon),
                                addedItem.addEventListener(GMenuItem.UpdateEvent, function () {
                                    addedItem.setEnabled(menuItem.isEnabled());
                                }));
                        }
                    }));
                var menuButton = $("<button/>")
                    .addClass("open-menu icon gravit-icon-chevron-left-small")
                    .on("click", (event) => {
                        menu.open($(event.target), GMenuPosition.Position.Right_Bottom, GMenuPosition.Position.Center);
                    });
                return (
                    this._elementsToCheck.push({
                        element: menuButton,
                        isEnabled: () => menuItems.some((menuItem) => menuItem.isEnabled()),
                    }),
                    wrapper.append(menuButton),
                    wrapper
                );
            }),
            (GContextMenu.prototype._createActionButtonMenu = function (icon, label, menuItems, isEnabledFn) {
                var menu = new GMenu(null, "g-context-menu");
                ((menu.__which = "touchmenu"),
                    menuItems.forEach((menuItem) => {
                        if (menuItem instanceof GAction) menu.createAddItem(menuItem);
                        else {
                            var addedItem = menu.createAddItem(menuItem.caption, menuItem.click);
                            (addedItem.setIcon(menuItem.icon),
                                addedItem.addEventListener(GMenuItem.UpdateEvent, function () {
                                    menuItem.update && menuItem.update(addedItem);
                                }));
                        }
                    }));
                var wrapper = $("<div/>").addClass("action-menu-button");
                return (
                    wrapper.append(
                        this._createActionButton({
                            label: label,
                            icon: icon,
                            click: (event) => {
                                menu.open($(event.target).closest(".action-menu-button"), GMenuPosition.Position.Right_Bottom, GMenuPosition.Position.Center);
                            },
                            isMenu: true,
                            isEnabled: isEnabledFn,
                        })
                    ),
                    wrapper
                );
            }),
            (GContextMenu.prototype._createSelectMenuButton = function () {
                var wrapper = $("<div/>").addClass("select-menu-button");
                return (
                    wrapper.append(
                        this._createActionButton({
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GContextMenu", "text.select")),
                            click: (event) => {
                                var hitElements = this._getHitsElments(),
                                    editor = gDesigner.getActiveDocument().getEditor(),
                                    overlay = $("<div/>").gOverlay({
                                        releaseOnClose: true,
                                        offsetX: 100,
                                        offsetY: -25,
                                        clazz: "selected-menu-overlay",
                                    }),
                                    panel = $("<div/>").appendTo(overlay);
                                overlay.gOverlay("open", $(event.target).closest(".select-menu-button"));
                                panel.gSelectedPanel({
                                    clickCallback: (element) => {
                                        (editor.clearSelection(), editor.updateSelection(false, [element]));
                                    },
                                    renderFinishCallback: () => {
                                        overlay.gOverlay("relayout");
                                    },
                                }).gSelectedPanel("setSelections", hitElements);
                            },
                            isMenu: true,
                            isEnabled: (event) => {
                                var hits = this._getHitsElments(event);
                                return !!(hits && hits.elementHits && hits.elementHits.length > 0);
                            },
                        })
                    ),
                    wrapper
                );
            }),
            (GContextMenu.prototype._updateIcon = function (element, iconClass) {
                (element.empty(), element.attr("class", "icon " + iconClass));
            }),
            (GContextMenu.prototype._getSelectedItems = function () {
                var document = gDesigner.getActiveDocument();
                if (document) {
                    var editor = document.getEditor();
                    if (editor) {
                        var selection = editor.getSelection();
                        return selection || [];
                    }
                }
                return [];
            }),
            (GContextMenu.prototype._getFirstSelectedImageElement = function () {
                var items = this._getSelectedItems();
                return items && items.length > 0 ? items.find((element) => element instanceof GObject.GImage) : null;
            }),
            (GContextMenu.prototype._getFirstSelectedTextElement = function () {
                var items = this._getSelectedItems();
                return items && items.length > 0 ? items.find((element) => element instanceof GObject.GText) : null;
            }),
            (GContextMenu.prototype._setAllSelectionsHidden = function () {
                var items = this._getSelectedItems();
                items &&
                    items.length > 0 &&
                    editorModule.GEditor.tryRunTransaction(
                        gDesigner.getActiveDocument().getScene(),
                        function () {
                            for (var t = 0; t < items.length; t++) (items[t].setProperty("vis", false), items[t].removeFlag(GObject.GNode.Flag.Highlighted));
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-visibility"))
                    );
            }),
            (GContextMenu.prototype._setAllSelectionsLocked = function () {
                var items = this._getSelectedItems();
                items &&
                    items.length > 0 &&
                    editorModule.GEditor.tryRunTransaction(
                        gDesigner.getActiveDocument().getScene(),
                        function () {
                            for (; items.length > 0; )
                                (items[0].setProperty("lkt", GObject.GBlock.LockType.Full),
                                    items[0].removeFlag(GObject.GNode.Flag.Highlighted),
                                    items[0].accept(function (node) {
                                        node.removeFlag(GObject.GNode.Flag.Selected);
                                    }));
                        },
                        GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "action.toggle-lock"))
                    );
            }));
    };
