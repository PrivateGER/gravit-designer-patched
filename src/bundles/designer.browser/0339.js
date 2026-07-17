module.exports = function (module, exports, require) {
        "use strict";
        (require(30 /* polyfill:Object */), require(3), require(4), require(13));
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GMenuActivateEvent = require(1499),
            GMenuCloseEvent = require(1156),
            GPosition = require(444),
            GMenuManager = require(1157),
            GMenuOpenEvent = require(804);
        function u(category, MenuClass, componentId, isVisibleFn) {
            ((this._htmlElement = $("<li></li>").addClass("g-menu-item")),
                (this._category = category || u.Type.Item),
                (this._componentId = componentId || null),
                (this._pro = false),
                (this._visible = true),
                (this._feature = null),
                (this._detachBound = this._detach.bind(this)),
                this._category === u.Type.Divider
                    ? ((this._isVisible = isVisibleFn), this._htmlElement.addClass("g-menu-item-divider"))
                    : (this._htmlElement
                          .append($("<span></span>").addClass("g-menu-item-icon").css("display", "none"))
                          .append($("<span></span>").addClass("g-menu-item-caption"))
                          .append($("<span></span>").addClass("g-menu-item-info"))
                          .append($("<span></span>").addClass("g-menu-item-shortcut").css("display", "none"))
                          .append($("<span></span>").addClass("g-menu-item-detach").addClass("gravit-icon-detach").css("display", "none"))
                          .append($("<span></span>").addClass("g-menu-item-tail")),
                      this._category === u.Type.Menu && (this._htmlElement.addClass("g-menu-item-menu"), this.setMenu(new MenuClass(this)))),
                this._htmlElement.on("mouseover", this._mouseOver.bind(this)),
                this._htmlElement.on("mouseout", this._mouseOut.bind(this)),
                this._htmlElement.on("mousedown", this._mouseDown.bind(this)),
                this._htmlElement.on("mouseup", this._mouseUp.bind(this)));
        }
        (GObject.GObject.inherit(u, GObject.GEventTarget),
            (u.Type = { Item: 0, Menu: 1, Divider: 2 }),
            (u.EnterEvent = function () {}),
            GObject.GObject.inherit(u.EnterEvent, GObject.GEvent),
            (u.EnterEvent.prototype.toString = function () {
                return "[Object GMenuItem.EnterEvent]";
            }),
            (u.ENTER_EVENT = new u.EnterEvent()),
            (u.LeaveEvent = function () {}),
            GObject.GObject.inherit(u.LeaveEvent, GObject.GEvent),
            (u.LeaveEvent.prototype.toString = function () {
                return "[Object GMenuItem.LeaveEvent]";
            }),
            (u.LEAVE_EVENT = new u.LeaveEvent()),
            (u.ActivateEvent = function () {}),
            GObject.GObject.inherit(u.ActivateEvent, GObject.GEvent),
            (u.ActivateEvent.prototype.toString = function () {
                return "[Object GMenuItem.ActivateEvent]";
            }),
            (u.ACTIVATE_EVENT = new u.ActivateEvent()),
            (u.BeforeActivateEvent = function () {}),
            GObject.GObject.inherit(u.BeforeActivateEvent, GObject.GEvent),
            (u.BeforeActivateEvent.prototype.toString = function () {
                return "[Object GMenuItem.BeforeActivateEvent]";
            }),
            (u.BEFORE_ACTIVATE_EVENT = new u.BeforeActivateEvent()),
            (u.UpdateEvent = function () {}),
            GObject.GObject.inherit(u.UpdateEvent, GObject.GEvent),
            (u.UpdateEvent.prototype.toString = function () {
                return "[Object GMenuItem.UpdateEvent]";
            }),
            (u.UPDATE_EVENT = new u.UpdateEvent()),
            (u.DetachEvent = function () {}),
            GObject.GObject.inherit(u.DetachEvent, GObject.GEvent),
            (u.DetachEvent.prototype.toString = function () {
                return "[Object GMenuItem.DetachEvent]";
            }),
            (u.prototype._parent = null),
            (u.prototype._category = null),
            (u.prototype._menu = null),
            (u.prototype._icon = null),
            (u.prototype._forcedAsOpened = false),
            (u.prototype._caption = null),
            (u.prototype._shortcutHint = null),
            (u.prototype._action = null),
            (u.prototype._data = null),
            (u.prototype._noHover = false),
            (u.prototype._pro = false),
            (u.prototype._visible = true),
            (u.prototype._feature = null),
            (u.prototype._info = null),
            (u.prototype._uuid = null),
            (u.prototype._detached = false),
            (u.prototype._detachBound = null),
            (u.prototype._isVisible = null),
            (u.prototype._proFeatureInterruption = true),
            (u.prototype.getUUID = function () {
                return (this._uuid || (this._uuid = GObject.GUtil.uuid()), this._uuid);
            }),
            (u.prototype.getParent = function () {
                return this._parent;
            }),
            (u.prototype.getType = function () {
                return this._category;
            }),
            (u.prototype.getIcon = function () {
                return this._icon;
            }),
            (u.prototype.isForcedAsOpened = function () {
                return this._forcedAsOpened;
            }),
            (u.prototype.setPro = function (isPro, feature) {
                ((this._pro = !!isPro), (this._feature = feature), this._htmlElement.gPro({ pro: this._pro, feature: feature }));
                let isTrial = false;
                const license = gDesigner.getLicense(),
                    isLegacyFeature = license.isLegacy() && gDesigner.isLegacyFeature(feature),
                    requiresUpgrade = !isLegacyFeature && (license.isFree() || gDesigner.isAnonymous() || license.isExpired());
                if ((this._pro && (isTrial = license.isTrial() && !isLegacyFeature), (!isTrial && !requiresUpgrade) || !this._action)) return;
                let tooltipConfig = this._action.getTooltipConfig(this._action.getTooltipArea());
                tooltipConfig &&
                    this._htmlElement.gRichTooltip(
                        GRichTooltipConfig.GRichTooltipConfig.from(
                            Object.assign({}, tooltipConfig.getConfig(), {
                                isPro: !gDesigner.isEnabledProFeatures() || !(license.isPro() && !license.isExpired()),
                            })
                        )
                    );
            }),
            (u.prototype.isPro = function () {
                return !!this._pro;
            }),
            (u.prototype.getFeature = function () {
                return this._feature;
            }),
            (u.prototype.setIcon = function (icon) {
                if (icon !== this._icon) {
                    this._icon = icon;
                    var iconElement = this._htmlElement.find(".g-menu-item-icon");
                    (iconElement.empty(),
                        this._icon
                            ? ("string" == typeof this._icon ? iconElement.append($("<i></i>").addClass(icon)) : iconElement.append(this._icon),
                              iconElement.css("display", ""),
                              this._htmlElement.addClass("has-icon"))
                            : (iconElement.css("display", "none"), this._htmlElement.removeClass("has-icon")));
                }
            }),
            (u.prototype.getCaption = function () {
                return this._caption;
            }),
            (u.prototype.setCaption = function (caption) {
                if (caption !== this._caption) {
                    this._caption = caption;
                    var captionElement = this._htmlElement.find(".g-menu-item-caption");
                    (captionElement.empty(),
                        !this._caption || this._caption instanceof GObject.GLocaleKey || "string" == typeof this._caption
                            ? captionElement.html(this._caption ? GObject.GLocale.get(this._caption) : "")
                            : captionElement.append(this._caption));
                }
            }),
            (u.prototype.getInfo = function () {
                return this._info;
            }),
            (u.prototype.setInfo = function (info) {
                if (info !== this._info) {
                    this._info = info;
                    const infoElement = this._htmlElement.find(".g-menu-item-info").empty();
                    (this._htmlElement.css("display", this._info ? "" : "none"),
                        this._info &&
                            (this._info instanceof GObject.GLocaleKey || "string" == typeof this._info
                                ? infoElement.text(this._info ? GObject.GLocale.get(this._info) : "")
                                : infoElement.append(this._info)));
                }
            }),
            (u.prototype.getShortcutHint = function () {
                return this._shortcutHint;
            }),
            (u.prototype.setShortcutHint = function (shortcut) {
                this._shortcutHint = shortcut;
                var shortcutElement = this._htmlElement.find(".g-menu-item-shortcut");
                this._shortcutHint && this._shortcutHint.length > 0
                    ? (shortcutElement.text(GPlatform.GKey.shortcutToString(shortcut)), shortcutElement.css("display", ""), this._htmlElement.addClass("has-shortcut"))
                    : (shortcutElement.empty(), shortcutElement.css("display", "none"), this._htmlElement.removeClass("has-shortcut"));
            }),
            (u.prototype.getAction = function () {
                return this._action;
            }),
            (u.prototype.updateEnabled = function () {
                this._action && this.setEnabled(!!this._action.isEnabled());
            }),
            (u.prototype.setAction = function (action, tooltipArea) {
                if (action !== this._action) {
                    if (this._action) {
                        let newActionShortcut = action.getShortcut();
                        newActionShortcut && newActionShortcut === this.getShortcutHint() && this.setShortcutHint(null);
                    }
                    if (((this._action = action), this._action)) {
                        let newShortcut = action.getShortcut();
                        if (
                            (newShortcut && this.setShortcutHint(newShortcut),
                            this.setCaption(this._action.getTitle()),
                            this.setInfo(this._action.getInfo()),
                            this.setIcon(this._action.getIcon()),
                            this.setEnabled(true === this._action.isEnabled()),
                            this.setVisible(this._action.isVisible()),
                            tooltipArea)
                        ) {
                            let tooltipConfig = this._action.getTooltipConfig(tooltipArea);
                            tooltipConfig && this.setTooltipConfig(GRichTooltipConfig.GRichTooltipConfig.from(Object.assign({}, tooltipConfig.getConfig(), { side: true })));
                        }
                    }
                }
                this.setPro(this._action && this._action.isPro(), this._action && this._action.getId());
            }),
            (u.prototype.isChecked = function () {
                return this._htmlElement.hasClass("g-menu-item-checked");
            }),
            (u.prototype.isCheckable = function () {
                return !!this._action && this._action.isCheckable();
            }),
            (u.prototype.setChecked = function (checked) {
                checked != this.isChecked() &&
                    (checked ? this._htmlElement.addClass("g-menu-item-checked") : this._htmlElement.removeClass("g-menu-item-checked"));
            }),
            (u.prototype.isEnabled = function () {
                return !this._htmlElement.hasClass("g-disabled");
            }),
            (u.prototype.setEnabled = function (enabled) {
                enabled != this.isEnabled() && (enabled ? this._htmlElement.removeClass("g-disabled") : this._htmlElement.addClass("g-disabled"));
            }),
            (u.prototype.setDetachable = function (detachable) {
                const detachElement = this._htmlElement.find(".g-menu-item-detach").css("display", detachable ? "" : "none");
                detachable
                    ? (detachElement.on("click", this._detachBound),
                      detachElement[0].addEventListener("mousedown", this._stopPropagationEventListener, true),
                      detachElement[0].addEventListener("mouseup", this._stopPropagationEventListener, true))
                    : (detachElement.off("click", this._detachBound),
                      detachElement[0].removeEventListener("mousedown", this._stopPropagationEventListener, true),
                      detachElement[0].removeEventListener("mouseup", this._stopPropagationEventListener, true));
            }),
            (u.prototype._stopPropagationEventListener = function (event) {
                event.stopPropagation();
            }),
            (u.prototype._detach = function (event) {
                if (event.button == GPlatform.GMouseEvent.BUTTON_LEFT) {
                    (event.stopPropagation(), event.preventDefault(), (this._detached = true));
                    const parent = this._parent;
                    (parent && (parent.removeItem(parent.indexOf(this)), parent.close()),
                        this.hasEventListeners(u.DetachEvent) && this.trigger(new u.DetachEvent()));
                }
            }),
            (u.prototype.setVisible = function (visible) {
                ((this._visible = !!visible), this._htmlElement.css("display", visible ? "" : "none"));
            }),
            (u.prototype.isVisible = function () {
                return this._visible;
            }),
            (u.prototype.getData = function () {
                return this._data;
            }),
            (u.prototype.setData = function (data) {
                this._data = data;
            }),
            (u.prototype.setNoHover = function (noHover) {
                this._noHover = noHover;
            }),
            (u.prototype.addClass = function (className) {
                this._htmlElement.addClass(className);
            }),
            (u.prototype.isRootItem = function () {
                return (
                    this._parent &&
                    "function" == typeof this._parent.toString &&
                    "[Object GMenu]" === this._parent.toString() &&
                    null != this._parent._parent &&
                    !(this._parent._parent instanceof u)
                );
            }),
            (u.prototype.isRootMenuBarItem = function () {
                return (
                    this.isRootItem() &&
                    this._parent._parent &&
                    "function" == typeof this._parent._parent.toString &&
                    "[Object GMenuBar]" === this._parent._parent.toString()
                );
            }),
            (u.prototype.getMenuBar = function () {
                return this.isRootMenuBarItem() ? this._parent._parent : null;
            }),
            (u.prototype.getMenu = function () {
                return this._menu;
            }),
            (u.prototype.setMenu = function (menu) {
                menu &&
                    menu !== this._menu &&
                    this._category === u.Type.Menu &&
                    ((this._menu = menu),
                    (this._menu._parent = this),
                    this._menu.addEventListener(GMenuOpenEvent.EVENT, this._menuOpen.bind(this)),
                    this._menu.addEventListener(GMenuCloseEvent.EVENT, this._menuClose.bind(this)));
            }),
            (u.prototype.update = function () {
                (this._action &&
                    (this.setCaption(this._action.getTitle()),
                    this.setEnabled(this._action.isEnabled()),
                    this.setChecked(this._action.isChecked()),
                    this.setPro(this._action.isPro(), this._action.getId()),
                    this.setIcon(this._icon || this._action.getIcon()),
                    this.setInfo(this._action.getInfo()),
                    this.setVisible(this._action.isVisible())),
                    this.getType() === u.Type.Divider && this._isVisible && this.setVisible(this._isVisible()),
                    this.hasEventListeners(u.UpdateEvent) && this.trigger(u.UPDATE_EVENT));
            }),
            (u.prototype.activate = function () {
                let actionExecuted = false;
                const getRootContainer = () => {
                    let root,
                        current = this.getParent();
                    for (; current && ((root = current), current !== current.getParent()); ) current = current.getParent();
                    return root;
                };
                if (
                    (this.hasEventListeners(u.BeforeActivateEvent) && this.trigger(u.BEFORE_ACTIVATE_EVENT),
                    this._action && this._action.isAvailable(this._componentId) && this._action.isEnabled())
                ) {
                    let rootContainer = getRootContainer();
                    var statsSuffix = "execute";
                    (this._action.isPro() && !gDesigner.isEnabledProFeatures(this._action.getId()) && (statsSuffix = "nonprotriespro"),
                        this._action.execute(),
                        (actionExecuted = true));
                    var statsValue = this._action.statsValue() || this._action.getId();
                    rootContainer && "context" === rootContainer.__which
                        ? gDesigner.stats("action_" + statsSuffix + "_context", statsValue)
                        : rootContainer && "menubar" === rootContainer.__which
                          ? gDesigner.stats("action_" + statsSuffix + "_menu", statsValue)
                          : rootContainer && "assistantbar" === rootContainer.__which
                            ? gDesigner.stats("action_" + statsSuffix + "_assistantbar", statsValue)
                            : rootContainer && "touchmenu" === rootContainer.__which
                              ? gDesigner.stats("action_" + statsSuffix + "_touchmenu", statsValue)
                              : gDesigner.stats("action_" + statsSuffix + "_toolbar", statsValue);
                }
                if (this.isEnabled()) {
                    if (this.isPro() && this._proFeatureInterruption && !gDesigner.isEnabledProFeatures(this._feature)) {
                        if (!actionExecuted) {
                            let rootContainer = getRootContainer();
                            (rootContainer && "context" === rootContainer.__which
                                ? gDesigner.stats("action_nonprotriespro_context", this._feature)
                                : rootContainer && "menubar" === rootContainer.__which
                                  ? gDesigner.stats("action_nonprotriespro_menu", this._feature)
                                  : rootContainer && "assistantbar" === rootContainer.__which
                                    ? gDesigner.stats("action_nonprotriespro_assistantbar", this._feature)
                                    : rootContainer && "touchmenu" === rootContainer.__which
                                      ? gDesigner.stats("action_nonprotriespro_touchmenu", this._feature)
                                      : gDesigner.stats("action_nonprotriespro_toolbar", this._feature),
                                gDesigner.handlePROFeatureInterruption());
                        }
                        return false;
                    }
                    (this.hasEventListeners(u.ActivateEvent) && this.trigger(u.ACTIVATE_EVENT),
                        this._parent && this._parent.hasEventListeners(GMenuActivateEvent) && this._parent.trigger(new GMenuActivateEvent(this)));
                }
            }),
            (u.prototype.setTooltipConfig = function (tooltipConfig) {
                this._htmlElement.gRichTooltip(tooltipConfig);
            }),
            (u.prototype.setProFeatureInterruption = function (interruption) {
                this._proFeatureInterruption = interruption;
            }),
            (u.prototype._mouseOver = function (event) {
                (this._parent &&
                    this._category === u.Type.Menu &&
                    this._parent.getActiveItem() !== this &&
                    !this.isRootItem() &&
                    this._parent.closeMenus(true),
                    this._parent &&
                        "function" == typeof this._parent.toString &&
                        "[Object GMenu]" === this._parent.toString() &&
                        !this.isRootItem() &&
                        this._parent.closeMenus(),
                    this.isEnabled() &&
                        (this._category == u.Type.Menu &&
                            GObject.GSystem.hardware === GObject.GSystem.Hardware.Desktop &&
                            (!this.isRootItem() || (this.isRootMenuBarItem() && this.getMenuBar().isActive())) &&
                            this._openMenu(),
                        this._category != u.Type.Divider &&
                            (this._noHover || this._htmlElement.addClass("g-hover"),
                            this.hasEventListeners(u.EnterEvent) && this.trigger(u.ENTER_EVENT))));
            }),
            (u.prototype.isActive = function () {
                return this._htmlElement.hasClass("g-active");
            }),
            (u.prototype.changeActiveState = function (active) {
                active ? this._htmlElement.addClass("g-active") : this._htmlElement.removeClass("g-active");
            }),
            (u.prototype._mouseOut = function (event) {
                if (this._category === u.Type.Menu && (this.isRootItem() || GObject.GSystem.hardware !== GObject.GSystem.Hardware.Desktop))
                    return (event.stopPropagation(), void event.preventDefault());
                this.isEnabled() &&
                    this._category != u.Type.Divider &&
                    (this._noHover || this._htmlElement.removeClass("g-hover"),
                    this.hasEventListeners(u.LeaveEvent) && this.trigger(u.LEAVE_EVENT));
            }),
            (u.prototype._mouseDown = function (event) {
                event.cancelable &&
                    (this.isEnabled()
                        ? event.button == GPlatform.GMouseEvent.BUTTON_LEFT
                            ? (event.stopPropagation(),
                              event.preventDefault(),
                              this._category === u.Type.Menu &&
                                  (this._forcedAsOpened
                                      ? (this.getMenu().close(), (this._forcedAsOpened = false))
                                      : (this._parent && (this._parent.closeMenus(true), this._parent.setActiveItem(this)),
                                        this._openMenu(),
                                        (this._forcedAsOpened = true))))
                            : (event.button, GPlatform.GMouseEvent.BUTTON_MIDDLE, event.stopPropagation(), event.preventDefault())
                        : gDesigner.isTouchEnabled() && event.button === GPlatform.GMouseEvent.BUTTON_LEFT && event.stopPropagation());
            }),
            (u.prototype._mouseUp = function (event) {
                if (
                    event.cancelable &&
                    (event.stopPropagation(),
                    event.preventDefault(),
                    event.button != GPlatform.GMouseEvent.BUTTON_MIDDLE &&
                        event.button != GPlatform.GMouseEvent.BUTTON_RIGHT &&
                        !this._detached &&
                        this._category !== u.Type.Menu)
                ) {
                    if ((this.isRootMenuBarItem() || this._mouseOut(event), this._category == u.Type.Item)) {
                        let activateResult = this.activate();
                        this.isEnabled() && false !== activateResult && GMenuManager.triggerGlobalActivation(this);
                    }
                    this.isRootMenuBarItem() || GMenuManager.setActiveMenu(null);
                }
            }),
            (u.prototype._openMenu = function () {
                this.getMenu().open(
                    this._htmlElement,
                    this.isRootItem() ? GPosition.Position.Center : GPosition.Position.Right_Bottom,
                    this.isRootItem() ? GPosition.Position.Right_Bottom : GPosition.Position.Center
                );
            }),
            (u.prototype._menuOpen = function () {
                (this._htmlElement.addClass("g-active"), this.isRootItem() && this._parent._parent._htmlElement.addClass("g-active"));
            }),
            (u.prototype._menuClose = function () {
                ((this._forcedAsOpened = false),
                    this._htmlElement.removeClass("g-active"),
                    this.isRootItem() && this._parent._parent._htmlElement.removeClass("g-active"));
            }),
            (u.prototype.toString = function () {
                return "[Object GMenuItem]";
            }),
            (module.exports = u));
    };
