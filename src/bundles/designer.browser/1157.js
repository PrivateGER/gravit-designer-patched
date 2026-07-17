module.exports = function (module, exports, require) {
        "use strict";
        var GPlatform = require(15),
            GObject = require(1),
            modifiersChangedListener = function (event) {
                event.changed.escapeKey && (event.isImmediatePropagationStopped = true);
            },
            menuManager = {
                _activeMenu: null,
                _activeActivationCallback: null,
                _activeMenuMouseLocations: null,
                getActiveMenu: function () {
                    return menuManager._activeMenu;
                },
                triggerGlobalActivation: function (event) {
                    menuManager._activeMenu && menuManager._activeActivationCallback && menuManager._activeActivationCallback(event);
                },
                setActiveMenu: function (menu, keepOpen, activationCallback) {
                    (menuManager._activeMenu &&
                        (GPlatform.GPlatform.removeEventListener(GPlatform.GModifiersChangedEvent, modifiersChangedListener, menuManager._activeMenu && menuManager._activeMenu.getHtmlElement()),
                        keepOpen || menuManager._activeMenu.close(),
                        (menuManager._activeMenu = null),
                        (menuManager._activeActivationCallback = null),
                        document.removeEventListener("mousemove", menuManager._activeMenuMouseMoveListener),
                        document.removeEventListener("mousedown", menuManager._activeMenuMouseUpDownListener),
                        document.removeEventListener("mouseup", menuManager._activeMenuMouseUpDownListener),
                        document.removeEventListener("keydown", menuManager._activeMenuKeyDownListener)),
                        (menuManager._activeMenu = menu),
                        (menuManager._activeActivationCallback = activationCallback),
                        menuManager._activeMenu &&
                            (GPlatform.GPlatform.addEventListener(GPlatform.GModifiersChangedEvent, modifiersChangedListener, menu.getHtmlElement(), null, true),
                            document.addEventListener("mousemove", menuManager._activeMenuMouseMoveListener),
                            document.addEventListener("mousedown", menuManager._activeMenuMouseUpDownListener),
                            setTimeout(function () {
                                document.addEventListener("mouseup", menuManager._activeMenuMouseUpDownListener);
                            }, 250),
                            document.addEventListener("keydown", menuManager._activeMenuKeyDownListener)));
                },
                _activeMenuMouseMoveListener: function (event) {
                    (menuManager._activeMenuMouseLocations || (menuManager._activeMenuMouseLocations = []),
                        menuManager._activeMenuMouseLocations.push({ x: event.pageX, y: event.pageY }),
                        menuManager._activeMenuMouseLocations.length > 3 && menuManager._activeMenuMouseLocations.shift());
                },
                _activeMenuMouseUpDownListener: function (event) {
                    event.cancelable && menuManager.setActiveMenu(null);
                },
                _activeMenuKeyDownListener: function (event) {
                    27 == event.keyCode && menuManager.setActiveMenu(null);
                },
                createActionMenu: function (actions, menu) {
                    for (
                        var groupEntries = [],
                            addDividerBeforeItem = function (targetMenu, menuItem, group) {
                                targetMenu.getItemCount() > 0 &&
                                    (function (comparedItem) {
                                        for (var t = 0; t < groupEntries.length; ++t) if (groupEntries[t].item === comparedItem) return groupEntries[t].group;
                                    })(targetMenu.getItem(targetMenu.getItemCount() - 1)) !== group &&
                                    targetMenu.addItem(menu.createDivider());
                                groupEntries.push({ item: menuItem, group: group });
                            },
                            a = 0;
                        a < actions.length;
                        ++a
                    ) {
                        var r = actions[a];
                        if (r.isAvailable()) {
                            var s = GObject.GLocale.get(r.getCategory()),
                                l = r.getGroup(),
                                c = s ? s.split("/") : null,
                                d = l ? [""].concat(l.split("/")) : null;
                            if (d && c && c.length !== d.length - 1)
                                throw new Error("Number of categories different thant number of groups.");
                            var u = menu;
                            if (c)
                                for (var p = 0; p < c.length; ++p) {
                                    ((s = c[p]), (l = d ? d[p] : null));
                                    var g = u.findItem(s);
                                    (g || ((g = menu.createMenuItem(true)).setCaption(s), addDividerBeforeItem(u, g, l), u.addItem(g)), (u = g.getMenu()));
                                }
                            var h = menu.createMenuItem();
                            (h.setAction(r), addDividerBeforeItem(u, h, d ? d[d.length - 1] : null), u.addItem(h));
                        }
                    }
                },
            };
        module.exports = menuManager;
    };
