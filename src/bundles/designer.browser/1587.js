module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(19), require(168 /* PDFFetchStream */), require(20 /* polyfill:RegExp */), require(71 /* polyfill:String */), require(247), require(4), require(13), require(32), require(38), require(169 /* PDFNetworkStream */), require(33), require(26));
        var GPlatform = require(15),
            GEditor = require(53),
            GObject = require(1),
            DocumentEvent = _interopRequireDefault(require(78)),
            FullscreenEvent = _interopRequireDefault(require(1330)),
            GMenu = _interopRequireDefault(require(238 /* GMenu */)),
            GMenuItem = _interopRequireDefault(require(339 /* GMenuItem */)),
            GCutCopyAction = _interopRequireDefault(require(1331 /* GCutCopyAction */)),
            GPasteAction = _interopRequireDefault(require(877 /* GPasteAction */)),
            GPasteInPlaceAction = _interopRequireDefault(require(1183 /* GPasteInPlaceAction */)),
            GPasteInsideAction = _interopRequireDefault(require(1184 /* GPasteInsideAction */)),
            GPasteStyleAction = _interopRequireDefault(require(875 /* GPasteStyleAction */)),
            GPasteAndReplaceAction = _interopRequireDefault(require(876 /* GPasteAndReplaceAction */)),
            GDeleteAction = _interopRequireDefault(require(1332 /* GDeleteAction */)),
            GGroupAction = _interopRequireDefault(require(811 /* GGroupAction */)),
            GSplitAction = _interopRequireDefault(require(870 /* GSplitAction */)),
            GSelectAllAction = _interopRequireDefault(require(1333 /* GSelectAllAction */)),
            GDeselectAllAction = _interopRequireDefault(require(1334)),
            GArrangeAction = _interopRequireDefault(require(869 /* GArrangeAction */)),
            GToggleFullscreenAction = _interopRequireDefault(require(1335 /* GToggleFullscreenAction */)),
            GConvertToPathAction = _interopRequireDefault(require(810 /* GConvertToPathAction */)),
            GOpenQuickHelpScreenAction = _interopRequireDefault(require(1336)),
            GCollapsible = _interopRequireDefault(require(1337)),
            TouchHandler = _interopRequireDefault(require(1590)),
            GestureHandlerBase = _interopRequireDefault(require(878 /* GTouchEventHandler */)),
            TapGesture = _interopRequireDefault(require(879));
        class VirtualKeyTouchHandler extends GestureHandlerBase.default {
            constructor(targetElement) {
                (super(targetElement), this.addGesture(new TapGesture.default()), this.setDelayedTouchEventsEnabled(false));
            }
            _handleEvent(event) {
                (event.cancelable && (event.preventDefault(), event.stopPropagation()), super._handleEvent(event));
            }
        }
        const KEY_CODE_BY_KEY = {
                [GPlatform.GKey.Constant.LEFT]: 37,
                [GPlatform.GKey.Constant.UP]: 38,
                [GPlatform.GKey.Constant.RIGHT]: 39,
                [GPlatform.GKey.Constant.DOWN]: 40,
                [GPlatform.GKey.Constant.SHIFT]: 16,
                [GPlatform.GKey.Constant.CONTROL]: 17,
                [GPlatform.GKey.Constant.ALT_LEFT]: 18,
            },
            TRACKED_KEY_CODES = Object.values(KEY_CODE_BY_KEY),
            dispatchKeyEvent = (eventType, keyCode) => {
                const activeDocument = gDesigner.getActiveDocument(),
                    activeWindow = activeDocument && activeDocument.getActiveWindow(),
                    view = activeWindow && activeWindow.getView(),
                    htmlElement = view && view.getHtmlElement();
                htmlElement && htmlElement.dispatchEvent(new KeyboardEvent(eventType, { keyCode: keyCode }));
            },
            isModifierKey = (key) =>
                key === GPlatform.GKey.Constant.ALT_LEFT ||
                key === GPlatform.GKey.Constant.ALT_RIGHT ||
                key === GPlatform.GKey.Constant.SHIFT ||
                key === GPlatform.GKey.Constant.CONTROL,
            ARROW_KEYS = [GPlatform.GKey.Constant.UP, GPlatform.GKey.Constant.LEFT, GPlatform.GKey.Constant.RIGHT, GPlatform.GKey.Constant.DOWN];
        function AssistantBar(htmlElement) {
            ((this._htmlElement = htmlElement),
                (this._keyState = {}),
                (this._heldKeys = new Map()),
                (this._keyDownInveral = {}),
                (this._keyDownBound = this._keyDown.bind(this)),
                (this._keyUpBound = this._keyUp.bind(this)),
                (this._mouseUpBound = this._mouseup.bind(this)),
                (this._touchHandler = new TouchHandler.default()),
                this.init());
        }
        ((AssistantBar.prototype._touchHandler = null),
            (AssistantBar.prototype._htmlElement = null),
            (AssistantBar.prototype._keyState = null),
            (AssistantBar.prototype._heldKeys = null),
            (AssistantBar.prototype._keyDownInveral = null),
            (AssistantBar.prototype._document = null),
            (AssistantBar.prototype._keyDownBound = null),
            (AssistantBar.prototype._keyUpBound = null),
            (AssistantBar.prototype._mouseUpBound = null),
            (AssistantBar.prototype.init = function () {
                (GPlatform.GPlatform.constructor.bypassKeyDownRestrictionByClassName("g-virtual-key"), this._htmlElement.gCollapsible());
                const container = $("<div/>").addClass("container").appendTo(this._htmlElement),
                    releaseVirtualKey = (key) => {
                        const intervalId = this._keyDownInveral[key];
                        (intervalId && (clearInterval(intervalId), delete this._keyDownInveral[key]), isModifierKey(key) && GPlatform.GPlatform.releaseKey(key), dispatchKeyEvent("keyup", KEY_CODE_BY_KEY[key]));
                    },
                    pressVirtualKey = (key) => {
                        const intervalId = this._keyDownInveral[key];
                        (intervalId && clearInterval(intervalId),
                            ((candidateKey) => ARROW_KEYS.includes(candidateKey))(key) &&
                                (this._keyDownInveral[key] = setInterval(() => {
                                    dispatchKeyEvent("keydown", KEY_CODE_BY_KEY[key]);
                                }, 100)),
                            isModifierKey(key) && GPlatform.GPlatform.holdKey(key),
                            dispatchKeyEvent("keydown", KEY_CODE_BY_KEY[key]));
                    },
                    createVirtualKeyButton = (options) => {
                        let { key, icon, dblclick, actionClass } = options;
                        const keyButton = createToolbarButton({
                            name: icon ? null : GPlatform.GKey.toLocalizedShort(key, true),
                            icon: icon,
                            actionClass: "g-virtual-key" + (actionClass ? " " + actionClass : ""),
                            mousedown: (event) => {
                                (event.stopImmediatePropagation(), this._isHoldingKey(key) || pressVirtualKey(key));
                            },
                            click: (event) => {
                                (event.stopImmediatePropagation(),
                                    this._isHoldingKey(key) || (releaseVirtualKey(key), gDesigner.stats("virtualkey_assistantbar_click", key)));
                            },
                            dblclick: dblclick,
                            mouseup: (event) => {
                                (event.stopImmediatePropagation(), this._isHoldingKey(key) || releaseVirtualKey(key));
                            },
                            touchstart: () => {
                                this._isHoldingKey(key) || pressVirtualKey(key);
                            },
                            touchend: () => {
                                this._isHoldingKey(key) || releaseVirtualKey(key);
                            },
                            touchcancel: () => {
                                this._isHoldingKey(key) || releaseVirtualKey(key);
                            },
                            active: () => !!this._keyState[KEY_CODE_BY_KEY[key]] || this._isHoldingKey(key),
                        });
                        return (new VirtualKeyTouchHandler(keyButton[0]), keyButton);
                    },
                    buildActionMenu = function (items) {
                        let menuClass = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                        return items.reduce(
                            (menu, item) => {
                                let { icon: icon, action, isEnabled } = item;
                                const menuItem = menu.createAddItem(action);
                                return (
                                    icon && menuItem.setIcon(icon),
                                    isEnabled &&
                                        menuItem.addEventListener(GMenuItem.default.UpdateEvent, () => {
                                            menuItem.setEnabled(isEnabled());
                                        }),
                                    menu
                                );
                            },
                            new GMenu.default(null, "g-assistant-bar-menu" + (menuClass ? " " + menuClass : ""))
                        );
                    },
                    createToolbarButton = (options) => {
                        let {
                            action: action,
                            name,
                            menu,
                            icon: icon,
                            click,
                            dblclick: dblclick,
                            mousedown,
                            mouseup,
                            touchstart,
                            touchmove,
                            touchend,
                            touchcancel,
                            split: split = false,
                            active,
                            actionClass: actionClass,
                        } = options;
                        const buttonWrapper = $("<div/>").addClass("toolbar-button").toggleClass("split", !!split),
                            actionButton = $("<button/>").addClass("action-button").appendTo(buttonWrapper);
                        if (
                            (actionClass && actionButton.addClass(actionClass),
                            active && (buttonWrapper.data("active", active), buttonWrapper.toggleClass("g-active", !!active())),
                            action &&
                                (buttonWrapper.data("action", action),
                                icon || (icon = action.getIcon()),
                                click || (click = () => gDesigner.executeAction(action.getId(), void 0, "assistantbar"))),
                            name && $("<span/>").text(name).appendTo(actionButton),
                            icon && $("<span/>").addClass(icon).appendTo(actionButton),
                            click && actionButton.on("click", click),
                            dblclick && actionButton.on("dblclick", dblclick),
                            mousedown && buttonWrapper.on("mousedown", mousedown),
                            mouseup && buttonWrapper.on("mouseup", mouseup),
                            touchstart && buttonWrapper.on("touchstart", touchstart),
                            touchmove && buttonWrapper.on("touchmove", touchmove),
                            touchend && buttonWrapper.on("touchend", touchend),
                            touchcancel && buttonWrapper.on("touchcancel", touchcancel),
                            menu)
                        ) {
                            let menuButton;
                            ((menu.__which = "assistantbar"),
                                (menuButton = split
                                    ? $("<button/>")
                                          .addClass("dropdown-button")
                                          .append($("<span></span>").addClass("gravit-icon-touch-arrow-up"))
                                          .appendTo(buttonWrapper)
                                    : actionButton.append($("<span></span>").addClass("gravit-icon-touch-arrow-up"))),
                                menuButton.gMenuButton({ menu: menu, touch: true }));
                        }
                        return buttonWrapper;
                    },
                    leftSide = $("<div/>").addClass("left-side").appendTo(container),
                    rightSide = $("<div/>")
                        .addClass("right-side")
                        .appendTo(container)
                        .gCollapsible({ orientation: GCollapsible.default.Orientation.Horizontal })
                        .gCollapsible("collapse")
                        .on("visibilitychanged", (event, expanded) => {
                            gContainer.setProperty("designer.assistant-bar.left-side.expanded", !!expanded);
                        });
                ($("<div/>")
                    .gPropertyRow({
                        height: "auto",
                        columns: [
                            {
                                width: "86px",
                                content: createVirtualKeyButton({
                                    key: GPlatform.GKey.Constant.SHIFT,
                                    actionClass: "g-virtual-key-".concat(GPlatform.GKey.Constant.SHIFT),
                                    dblclick: () => this._toggleModifierKey(GPlatform.GKey.Constant.SHIFT),
                                }),
                            },
                            {
                                width: "auto",
                                content: createToolbarButton({
                                    icon: "gravit-icon-touch-copy",
                                    action: gDesigner.getAction(GCutCopyAction.default.ID_COPY),
                                }),
                            },
                            {
                                width: "68px",
                                content: createToolbarButton({
                                    icon: "gravit-icon-touch-paste",
                                    action: gDesigner.getAction(GPasteAction.default.ID),
                                    menu: buildActionMenu(
                                        [
                                            {
                                                icon: "gravit-icon-touch-paste-in-place",
                                                action: gDesigner.getAction(GPasteInPlaceAction.default.ID),
                                            },
                                            {
                                                icon: "gravit-icon-touch-paste-inside",
                                                action: gDesigner.getAction(GPasteInsideAction.default.ID),
                                            },
                                            {
                                                icon: "gravit-icon-touch-paste-and-replace",
                                                action: gDesigner.getAction(GPasteAndReplaceAction.default.ID),
                                            },
                                            {
                                                icon: "gravit-icon-touch-paste-style",
                                                action: gDesigner.getAction(GPasteStyleAction.default.ID),
                                            },
                                        ],
                                        "paste-menu"
                                    ),
                                    split: true,
                                }),
                            },
                            {
                                width: "auto",
                                content: createToolbarButton({
                                    icon: "gravit-icon-touch-trash-2",
                                    action: gDesigner.getAction(GDeleteAction.default.ID),
                                }),
                            },
                            {
                                width: "auto",
                                content: createToolbarButton({
                                    icon: "gravit-icon-touch-selection",
                                    click: () => {
                                        const activeDocument = gDesigner.getActiveDocument(),
                                            editor = activeDocument && activeDocument.getEditor();
                                        if (editor) {
                                            editor.getSelection() && editor.getSelection().length > 0
                                                ? gDesigner.executeAction(GDeselectAllAction.default.ID, void 0, "assistantbar")
                                                : gDesigner.executeAction(GSelectAllAction.default.ID, void 0, "assistantbar");
                                        }
                                    },
                                }),
                            },
                            {
                                width: "62px",
                                content: createToolbarButton({
                                    icon: "gravit-icon-touch-arrange-order",
                                    menu: buildActionMenu(
                                        Object.values(GEditor.GEditor.ArrangeOrderType).map((orderType) => ({
                                            icon: "gravit-icon-touch-arrange-" + orderType,
                                            action: gDesigner.getAction(GArrangeAction.default.ID + "." + orderType),
                                            isEnabled: () => this._isArrangeActionEnabled(orderType),
                                        })),
                                        "arrange-menu"
                                    ),
                                }),
                            },
                            {
                                width: "auto",
                                content: createToolbarButton({
                                    icon: "gravit-icon-touch-fullscreen",
                                    action: gDesigner.getAction(GToggleFullscreenAction.default.ID),
                                    active: () => gDesigner.getAction(GToggleFullscreenAction.default.ID).isFullscreen(),
                                }),
                            },
                        ],
                    })
                    .appendTo(leftSide),
                    $("<div/>")
                        .gPropertyRow({
                            height: "auto",
                            columns: [
                                {
                                    width: "86px",
                                    content: createVirtualKeyButton({
                                        key: GPlatform.GKey.Constant.CONTROL,
                                        actionClass: "g-virtual-key-".concat(GPlatform.GKey.Constant.CONTROL),
                                        dblclick: () => this._toggleModifierKey(GPlatform.GKey.Constant.CONTROL),
                                    }),
                                },
                                {
                                    width: "114px",
                                    content: createVirtualKeyButton({
                                        key: GPlatform.GKey.Constant.ALT_LEFT,
                                        actionClass: "g-virtual-key-".concat(GPlatform.GKey.Constant.ALT_LEFT),
                                        dblclick: () => this._toggleModifierKey(GPlatform.GKey.Constant.ALT_LEFT),
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: createToolbarButton({
                                        icon: "gravit-icon-touch-group",
                                        action: gDesigner.getAction(GGroupAction.default.ID),
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: createToolbarButton({
                                        icon: "gravit-icon-touch-ungroup",
                                        action: gDesigner.getAction(GSplitAction.default.ID),
                                    }),
                                },
                                {
                                    width: "62px",
                                    content: createToolbarButton({
                                        icon: "gravit-icon-touch-convert-to-path",
                                        action: gDesigner.getAction(GConvertToPathAction.default.ID),
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: createToolbarButton({
                                        icon: "gravit-icon-touch-help",
                                        click: () => gDesigner.executeAction(GOpenQuickHelpScreenAction.default.ID, void 0, "assistantbar"),
                                    }),
                                },
                            ],
                        })
                        .appendTo(leftSide),
                    $("<div/>")
                        .gPropertyRow({
                            height: "auto",
                            columns: [
                                {
                                    width: "auto",
                                    content: createVirtualKeyButton({
                                        key: GPlatform.GKey.Constant.UP,
                                        icon: "gravit-icon-touch-arrow-key-up",
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: createVirtualKeyButton({
                                        key: GPlatform.GKey.Constant.DOWN,
                                        icon: "gravit-icon-touch-arrow-key-down",
                                    }),
                                },
                            ],
                        })
                        .appendTo(rightSide),
                    $("<div/>")
                        .gPropertyRow({
                            height: "auto",
                            columns: [
                                {
                                    width: "auto",
                                    content: createVirtualKeyButton({
                                        key: GPlatform.GKey.Constant.LEFT,
                                        icon: "gravit-icon-touch-arrow-key-left",
                                    }),
                                },
                                {
                                    width: "auto",
                                    content: createVirtualKeyButton({
                                        key: GPlatform.GKey.Constant.RIGHT,
                                        icon: "gravit-icon-touch-arrow-key-right",
                                    }),
                                },
                            ],
                        })
                        .appendTo(rightSide),
                    gContainer.getProperty("designer.assistant-bar.left-side.expanded").then((expanded) => {
                        rightSide.gCollapsible(expanded ? "expand" : "collapse");
                    }));
            }),
            (AssistantBar.prototype._toggleModifierKey = function (key) {
                const holding = !GPlatform.GPlatform.isHoldingKey(key);
                (this._toggleKey(key, holding),
                    this._htmlElement.find(".g-virtual-key-".concat(key)).toggleClass("g-held", holding),
                    this._updateActions());
            }),
            (AssistantBar.prototype._toggleKey = function (key, holding) {
                holding ? (GPlatform.GPlatform.holdKey(key), this._heldKeys.set(key, true)) : (GPlatform.GPlatform.releaseKey(key), this._heldKeys.delete(key));
            }),
            (AssistantBar.prototype._isHoldingKey = function (key) {
                return !!this._heldKeys && !!this._heldKeys.get(key);
            }),
            (AssistantBar.prototype._keyDown = function (event) {
                TRACKED_KEY_CODES.includes(event.which || event.keyCode) && ((this._keyState[event.which || event.keyCode] = true), this._updateActions());
            }),
            (AssistantBar.prototype._keyUp = function (event) {
                TRACKED_KEY_CODES.includes(event.which || event.keyCode) && (delete this._keyState[event.which || event.keyCode], this._updateActions());
            }),
            (AssistantBar.prototype._mouseup = function (event) {
                event.isTrusted &&
                    (Object.keys(this._keyDownInveral).forEach((key) => {
                        (dispatchKeyEvent("keyup", KEY_CODE_BY_KEY[key]), clearInterval(this._keyDownInveral[key]));
                    }),
                    (this._keyDownInveral = []));
            }),
            (AssistantBar.prototype.activate = function () {
                (document.addEventListener("keydown", this._keyDownBound, true),
                    document.addEventListener("keyup", this._keyUpBound, true),
                    document.addEventListener("mouseup", this._mouseUpBound, true),
                    gDesigner.addEventListener(DocumentEvent.default, this._documentEvent, this),
                    gDesigner.addEventListener(FullscreenEvent.default, this._fullScreenEvent, this),
                    GPlatform.GPlatform.addEventListener(GPlatform.GModifiersChangedEvent, this._modifiersChangedEvent, this),
                    this._activateDocument(gDesigner.getActiveDocument()),
                    this._touchHandler.activate(this._htmlElement[0]),
                    (this._heldKeys = new Map()),
                    this._updateActions());
            }),
            (AssistantBar.prototype.deactivate = function () {
                (document.removeEventListener("keydown", this._keyDownBound, true),
                    document.removeEventListener("keyup", this._keyUpBound, true),
                    document.removeEventListener("mouseup", this._mouseUpBound, true),
                    gDesigner.removeEventListener(DocumentEvent.default, this._documentEvent, this),
                    gDesigner.removeEventListener(FullscreenEvent.default, this._fullScreenEvent, this),
                    GPlatform.GPlatform.removeEventListener(GPlatform.GModifiersChangedEvent, this._modifiersChangedEvent, this),
                    this._deactivateDocument(gDesigner.getActiveDocument()),
                    GPlatform.GPlatform.releaseKey(GPlatform.GKey.Constant.ALT_LEFT),
                    GPlatform.GPlatform.releaseKey(GPlatform.GKey.Constant.ALT_RIGHT),
                    GPlatform.GPlatform.releaseKey(GPlatform.GKey.Constant.SHIFT),
                    GPlatform.GPlatform.releaseKey(GPlatform.GKey.Constant.CONTROL),
                    this._touchHandler.deactivate(this._htmlElement[0]),
                    (this._heldKeys = null));
            }),
            (AssistantBar.prototype._activateDocument = function (document) {
                (document && document.getEditor().addEventListener(GEditor.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                    (this._document = document));
            }),
            (AssistantBar.prototype._deactivateDocument = function (document) {
                (document && document.getEditor().removeEventListener(GEditor.GEditor.SelectionChangedEvent, this._selectionChangedEvent, this),
                    (this._document = null));
            }),
            (AssistantBar.prototype._selectionChangedEvent = function (event) {
                this._updateActions();
            }),
            (AssistantBar.prototype._fullScreenEvent = function () {
                this._updateActions();
            }),
            (AssistantBar.prototype._modifiersChangedEvent = function () {
                this._updateActions();
            }),
            (AssistantBar.prototype._documentEvent = function (event) {
                const eventDocument = event.document;
                if (!eventDocument.isLockedByVersionHistory())
                    switch (event.type) {
                        case DocumentEvent.default.Type.Activated:
                            (this._activateDocument(eventDocument), this._updateActions());
                            break;
                        case DocumentEvent.default.Type.Deactivated:
                            (this._deactivateDocument(eventDocument), this._updateActions());
                            break;
                        case DocumentEvent.default.Type.Modified:
                            this._updateActions();
                    }
            }),
            (AssistantBar.prototype._updateActions = function () {
                this._htmlElement.find(".toolbar-button").each(function () {
                    const button = $(this),
                        action = button.data("action"),
                        activeFn = button.data("active");
                    if (action) {
                        const disabled = !action.isAvailable() || !action.isEnabled();
                        button.find("button").prop("disabled", disabled).toggleClass("g-disabled", disabled);
                    }
                    activeFn && button.toggleClass("g-active", !!activeFn());
                });
            }),
            (AssistantBar.prototype._isArrangeActionEnabled = function (orderType) {
                if (!gDesigner.getAction(GArrangeAction.default.ID + "." + orderType).isEnabled()) return false;
                const selection = this._document ? this._document.getEditor().getIndividualSelection() : null;
                if (!selection) return false;
                if (selection.length > 1) return true;
                const element = selection[0],
                    parent = element.getParent();
                switch (orderType) {
                    case GEditor.GEditor.ArrangeOrderType.SendToFront:
                        if (element.getNext()) {
                            let sibling = element.getNext(),
                                found = null;
                            for (; !found && sibling; ) (sibling instanceof GObject.GElement && (found = sibling), (sibling = sibling.getNext()));
                            return !!found && GEditor.GEditor.validateBlockInsertion(parent, element);
                        }
                        return false;
                    case GEditor.GEditor.ArrangeOrderType.BringForward: {
                        let sibling = element.getNext();
                        if (sibling) {
                            let found = null;
                            for (; !found && sibling; ) (sibling instanceof GObject.GElement && (sibling.hasFlag(GObject.GNode.Flag.Selected) || (found = sibling)), (sibling = sibling.getNext()));
                            if (null !== found) {
                                const nextSibling = found.getNext();
                                return GEditor.GEditor.validateBlockInsertion(parent, element, nextSibling);
                            }
                        }
                        return false;
                    }
                    case GEditor.GEditor.ArrangeOrderType.SendBackward: {
                        let sibling = element.getPrevious();
                        if (null !== sibling) {
                            let found = null;
                            for (; !found && sibling; )
                                (sibling instanceof GObject.GElement &&
                                    (sibling.hasFlag(GObject.GNode.Flag.Selected) || (GEditor.GEditor.validateBlockInsertion(parent, element, sibling) && (found = sibling))),
                                    (sibling = sibling.getPrevious()));
                            return !!found;
                        }
                        return false;
                    }
                    case GEditor.GEditor.ArrangeOrderType.SendToBack:
                        if (null !== element.getPrevious()) {
                            let sibling = parent.getFirstChild(),
                                found = null;
                            for (; !found && sibling && sibling !== element; )
                                (sibling instanceof GObject.GElement && GEditor.GEditor.validateBlockInsertion(parent, element, sibling) && (found = sibling), (sibling = sibling.getNext()));
                            return !!found;
                        }
                        return false;
                }
                return true;
            }),
            (AssistantBar.prototype.getHtmlElement = function () {
                return this._htmlElement;
            }),
            (module.exports = AssistantBar));
    };
