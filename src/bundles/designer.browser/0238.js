module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(13));
        var GObject = require(1),
            Utils = require(40),
            GMenuCloseEvent = require(1156),
            MenuPosition = require(444),
            GMenuItem = require(339),
            GMenuManager = require(1157),
            GMenuOpenEvent = require(804),
            GAction = require(31);
        function GMenu(parent, className) {
            ((this._parent = parent),
                (this._htmlElement = $("<ul></ul>").addClass("g-menu")),
                this._htmlElement.on("mouseover", this._mouseOver.bind(this)),
                this._htmlElement.on("mouseout", this._mouseOut.bind(this)));
            const touchHandler = (event) => {
                    event.cancelable || (event.stopImmediatePropagation(), "touchmove" === event.type && this.closeMenus(true));
                },
                listenerOptions = !!(0, Utils.isPassiveSupported)() && { capture: false, passive: true };
            (this._htmlElement[0].addEventListener("touchstart", touchHandler, listenerOptions),
                this._htmlElement[0].addEventListener("touchmove", touchHandler, listenerOptions),
                this._htmlElement[0].addEventListener("touchend", touchHandler, listenerOptions),
                className && this._htmlElement.addClass(className));
        }
        (GObject.GObject.inherit(GMenu, GObject.GEventTarget),
            (GMenu.prototype._parent = null),
            (GMenu.prototype._htmlElement = null),
            (GMenu.prototype._items = null),
            (GMenu.prototype._hovered = false),
            (GMenu.prototype._tooltipType = null),
            (GMenu.prototype._rangeLeftX = null),
            (GMenu.prototype._rangeLeftY = null),
            (GMenu.prototype._rangeRightX = null),
            (GMenu.prototype._rangeRightY = null),
            (GMenu.prototype.getParent = function () {
                return this._parent;
            }),
            (GMenu.prototype.setTooltipType = function (tooltipType) {
                if (tooltipType && "string" == typeof tooltipType) return ((this._tooltipType = tooltipType), this);
            }),
            (GMenu.prototype.isHovered = function (includeChildren) {
                if (this._hovered) return true;
                if (includeChildren) {
                    for (var t = 0; t < this.getItemCount(); ++t) {
                        var n = this.getItem(t);
                        if (n instanceof GMenuItem && n.getType() === GMenuItem.Type.Menu && n.getMenu().isHovered(true)) return true;
                    }
                    return false;
                }
                return false;
            }),
            (GMenu.prototype.createMenuItem = function (isSubMenu) {
                return isSubMenu ? new GMenuItem(GMenuItem.Type.Menu, GMenu) : new GMenuItem();
            }),
            (GMenu.prototype.createDivider = function () {
                return new GMenuItem(GMenuItem.Type.Divider);
            }),
            (GMenu.prototype.setActiveItem = function (item) {
                let activeItem = this.getActiveItem();
                (activeItem && activeItem.changeActiveState(false), item.changeActiveState(true));
            }),
            (GMenu.prototype.getActiveItem = function () {
                let activeItem = null;
                for (let n = 0; n < this._items.length; n++) {
                    var t = this._items[n];
                    if (t.isActive()) {
                        activeItem = t;
                        break;
                    }
                }
                return activeItem;
            }),
            (GMenu.prototype.isRootMenu = function () {
                return !(this._parent && this._parent instanceof GMenuItem);
            }),
            (GMenu.prototype.isSubMenu = function () {
                return !!(this._parent && this._parent instanceof GMenuItem) && !this._parent.isRootItem();
            }),
            (GMenu.prototype.createAddDivider = function () {
                return this.createInsertDivider(this.getItemCount());
            }),
            (GMenu.prototype.createInsertDivider = function (index) {
                var divider = new GMenuItem(GMenuItem.Type.Divider);
                return (this.insertItem(index, divider), divider);
            }),
            (GMenu.prototype.createAddItem = function (actionOrCaption, activateCallback, enterCallback, leaveCallback, componentId) {
                return this.createInsertItem(this.getItemCount(), actionOrCaption, activateCallback, enterCallback, leaveCallback, componentId);
            }),
            (GMenu.prototype.createInsertItem = function (index, actionOrCaption, activateCallback, enterCallback, leaveCallback, componentId) {
                var menuItem = new GMenuItem(null, null, componentId);
                return (
                    actionOrCaption instanceof GAction
                        ? menuItem.setAction(actionOrCaption, this._tooltipType)
                        : (menuItem.setCaption(actionOrCaption),
                          activateCallback && menuItem.addEventListener(GMenuItem.ActivateEvent, activateCallback),
                          enterCallback && menuItem.addEventListener(GMenuItem.EnterEvent, enterCallback),
                          leaveCallback && menuItem.addEventListener(GMenuItem.LeaveEvent, leaveCallback)),
                    this.insertItem(index, menuItem),
                    menuItem
                );
            }),
            (GMenu.prototype.addItem = function (item) {
                return this.insertItem(this.getItemCount(), item);
            }),
            (GMenu.prototype.insertItem = function (index, item) {
                (null == this._items && (this._items = []),
                    index + 1 < this._items.length
                        ? (this._items.splice(index, 0, item), this._items[index + 1]._htmlElement.before(item._htmlElement))
                        : (this._items.push(item), this._htmlElement.append(item._htmlElement)),
                    (item._parent = this));
            }),
            (GMenu.prototype.removeItem = function (index) {
                index >= 0 &&
                    index < this.getItemCount() &&
                    ((this._items[index]._parent = null), this._items[index]._htmlElement.detach(), this._items.splice(index, 1));
            }),
            (GMenu.prototype.clearItems = function () {
                if (this._items) {
                    for (var e = 0; e < this._items.length; ++e) ((this._items[e]._parent = null), this._items[e]._htmlElement.detach());
                    this._items = [];
                }
            }),
            (GMenu.prototype.getItem = function (index) {
                return index >= 0 && index < this.getItemCount() ? this._items[index] : null;
            }),
            (GMenu.prototype.getItemCount = function () {
                return this._items ? this._items.length : 0;
            }),
            (GMenu.prototype.indexOf = function (item) {
                return this._items ? this._items.indexOf(item) : -1;
            }),
            (GMenu.prototype.findItem = function (caption) {
                for (var t = 0; t < this.getItemCount(); ++t) {
                    var n = this.getItem(t);
                    if (caption == n.getCaption()) return n;
                }
                return null;
            }),
            (GMenu.prototype.update = function () {
                for (var e = 0; e < this.getItemCount(); ++e) {
                    this.getItem(e).update();
                }
            }),
            (GMenu.prototype.isOpen = function () {
                return !!this._htmlElement.parent().length;
            }),
            (GMenu.prototype.open = function (anchor, horizontalPosition, verticalPosition, activationCallback) {
                ((horizontalPosition = "number" == typeof horizontalPosition ? horizontalPosition : MenuPosition.Position.Center), (verticalPosition = "number" == typeof verticalPosition ? verticalPosition : MenuPosition.Position.Center));
                const isCoordinates = anchor && "number" == typeof anchor.x && "number" == typeof anchor.y,
                    isTouch = this._htmlElement.hasClass("g-touch"),
                    isMenuButton = !isCoordinates && $(anchor).hasClass("g-menu-button");
                if (
                    (this._htmlElement.toggleClass("g-menu-button", !!isMenuButton),
                    this.isOpen() ||
                        (this.update(),
                        this._htmlElement.appendTo($("body")),
                        this.isSubMenu() || GMenuManager.setActiveMenu(this, false, activationCallback),
                        this.trigger(GMenuOpenEvent.EVENT)),
                    this._htmlElement.parent().is("body"))
                ) {
                    var menuWidth = this._htmlElement.outerWidth(),
                        menuHeight = this._htmlElement.outerHeight(),
                        windowWidth = $(window).width(),
                        windowHeight = $(window).height(),
                        anchorRect = { x: 0, y: 0, width: 0, height: 0 };
                    if (isCoordinates) ((anchorRect.x = anchor.x), (anchorRect.y = anchor.y));
                    else {
                        var anchorElement = $(anchor),
                            anchorOffset = anchorElement.offset();
                        ((anchorRect.x = anchorOffset.left), (anchorRect.y = anchorOffset.top), (anchorRect.width = anchorElement.outerWidth()), (anchorRect.height = anchorElement.outerHeight()));
                    }
                    var menuX = 0;
                    switch (horizontalPosition) {
                        case MenuPosition.Position.Left_Top:
                            (menuX = anchorRect.x - menuWidth) < 0 && (menuX = anchorRect.x + anchorRect.width);
                            break;
                        case MenuPosition.Position.Center:
                            menuX = anchorRect.x;
                            break;
                        case MenuPosition.Position.Right_Bottom:
                            (menuX = anchorRect.x + anchorRect.width) + menuWidth > windowWidth && (menuX = anchorRect.x - menuWidth);
                    }
                    var menuY = 0;
                    switch (verticalPosition) {
                        case MenuPosition.Position.Left_Top:
                            (menuY = anchorRect.y - menuHeight) < 0 && (menuY = anchorRect.y + anchorRect.height);
                            break;
                        case MenuPosition.Position.Center:
                            menuY = anchorRect.y;
                            break;
                        case MenuPosition.Position.Right_Bottom:
                            (menuY = anchorRect.y + anchorRect.height) + menuHeight > windowHeight && (menuY = anchorRect.y - menuHeight);
                    }
                    const rangeLeftX = this._rangeLeftX ? this._rangeLeftX : 0;
                    menuX < rangeLeftX && (menuX = rangeLeftX);
                    const rangeRightX = this._rangeRightX ? this._rangeRightX : windowWidth;
                    menuX + menuWidth >= rangeRightX && (menuX = rangeRightX - menuWidth);
                    const rangeLeftY = this._rangeLeftY ? this._rangeLeftY : 0;
                    menuY < rangeLeftY && (menuY = rangeLeftY);
                    const rangeRightY = this._rangeRightY ? this._rangeRightY : windowHeight;
                    if ((menuY + menuHeight >= rangeRightY && (menuY = rangeRightY - menuHeight), this._htmlElement.find(".g-menu-arrow").remove(), isTouch && isMenuButton)) {
                        const arrowElement = $("<div/>").addClass("g-menu-arrow").prependTo(this._htmlElement);
                        let arrowOffset = anchorRect.width / 2 - 14;
                        (arrowOffset < 0 && (menuX - 14 > 0 ? ((menuX -= 14), (arrowOffset += 14)) : arrowElement.remove()), arrowElement.css("left", "".concat(arrowOffset, "px")));
                    }
                    switch ((this._htmlElement.css("left", menuX), this._htmlElement.css("top", menuY), horizontalPosition)) {
                        case MenuPosition.Position.Left_Top:
                            this._htmlElement.addClass("g-menu-left");
                            break;
                        case MenuPosition.Position.Right_Bottom:
                            this._htmlElement.addClass("g-menu-right");
                    }
                    switch (verticalPosition) {
                        case MenuPosition.Position.Left_Top:
                            this._htmlElement.addClass("g-menu-top");
                            break;
                        case MenuPosition.Position.Right_Bottom:
                            this._htmlElement.addClass("g-menu-bottom");
                    }
                }
            }),
            (GMenu.prototype.close = function () {
                this.isOpen() &&
                    this._htmlElement.parent().is("body") &&
                    (this.closeMenus(true),
                    this._htmlElement.removeClass("g-menu-left g-menu-right g-menu-top g-menu-bottom"),
                    this._htmlElement.detach(),
                    this === GMenuManager._activeMenu && GMenuManager.setActiveMenu(null, true),
                    this.trigger(GMenuCloseEvent.EVENT));
            }),
            (GMenu.prototype.setTouchMode = function (isTouch) {
                this._htmlElement.toggleClass("g-touch", !!isTouch);
            }),
            (GMenu.prototype.closeMenus = function () {
                let force = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                for (var t = 0; t < this.getItemCount(); ++t) {
                    var n = this.getItem(t);
                    n instanceof GMenuItem && n.getType() === GMenuItem.Type.Menu && (!n.isForcedAsOpened() || force) && n.getMenu().close();
                }
            }),
            (GMenu.prototype._mouseOver = function (event) {
                this._hovered = true;
            }),
            (GMenu.prototype._mouseOut = function (event) {
                ((this._hovered = false),
                    this.isSubMenu() &&
                        setTimeout(
                            function () {
                                this.isHovered(true) || this.closeMenus();
                            }.bind(this),
                            150
                        ));
            }),
            (GMenu.prototype.getHtmlElement = function () {
                return this._htmlElement;
            }),
            (GMenu.prototype.detach = function () {
                (this.closeMenus(true),
                    this._htmlElement.find(".g-hover").removeClass("g-hover"),
                    this._htmlElement.removeClass("g-menu-root"),
                    this._htmlElement.detach(),
                    (this._parent = null));
            }),
            (GMenu.prototype.addClass = function (className) {
                this._htmlElement.addClass(className);
            }),
            (GMenu.prototype.setActiveRangeSize = function (rangeLeftX, rangeLeftY, rangeHeight, rangeWidth) {
                ((this._rangeLeftX = rangeLeftX),
                    (this._rangeLeftY = rangeLeftY),
                    (this._rangeRightX = this._rangeLeftX + rangeWidth),
                    (this._rangeRightY = this._rangeLeftY + rangeHeight));
            }),
            (GMenu.prototype.toString = function () {
                return "[Object GMenu]";
            }),
            (GMenu.prototype.setEnabled = function (enabled) {
                ["file", "edit", "modify", "view"].forEach((category) => {
                    $('.g-menu-item-menu:contains("'.concat(GObject.GLocale.get(new GObject.GLocaleKey("GCategory", "category.".concat(category))), '")'))
                        [enabled ? "removeClass" : "addClass"]("g-disabled")
                        [enabled ? "on" : "off"]("click");
                });
            }),
            (module.exports = GMenu));
    };
