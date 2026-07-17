module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(57), require(4), require(13), require(32), require(33));
        var GObject = require(1),
            GPlatform = require(15),
            GView = require(394),
            GSettingChangedEvent = require(135),
            Parts = require(863),
            { SidebarsIds } = require(198 /* SidebarsIds */),
            SidebarEvent = require(807);
        function GSidebars(htmlElement, orientation, frame) {
            ((this._htmlElement = htmlElement),
                (this._orientation = orientation),
                (this._frame = frame),
                (this._sidebarWidths = {}),
                (this._canResize = false),
                (this._isResizing = false));
        }
        (GObject.GObject.inherit(GSidebars, GObject.GEventTarget),
            (GSidebars.Orientation = { Left: "left", Right: "right" }),
            (GSidebars.SidebarEvent = SidebarEvent),
            (GSidebars.prototype._htmlElement = null),
            (GSidebars.prototype._orientation = null),
            (GSidebars.prototype._sidebars = null),
            (GSidebars.prototype._activeSidebar = null),
            (GSidebars.prototype._activeTouchTool = null),
            (GSidebars.prototype._touchToolbar = null),
            (GSidebars.prototype._sidebarWidths = null),
            (GSidebars.prototype._sidebarsSelector = null),
            (GSidebars.prototype.getActiveSidebar = function () {
                return this._activeSidebar;
            }),
            (GSidebars.prototype.setActiveSidebar = function (sidebarId) {
                if ((sidebarId || this.setActiveTouchTool(null), sidebarId !== this._activeSidebar)) {
                    if (sidebarId) {
                        var sidebar = this.getSidebar(sidebarId);
                        if ((!sidebar || !sidebar.isVisible()) && ((sidebarId = null), this._activeSidebar)) {
                            const activeSidebar = this.getSidebar(this._activeSidebar);
                            if (activeSidebar && activeSidebar.isVisible()) return;
                        }
                    }
                    for (var previousActiveSidebar = this._activeSidebar, o = 0; o < this._sidebars.length; ++o) {
                        var i = this._sidebars[o],
                            a = i.sidebar.getId();
                        if (a === sidebarId) {
                            ((this._activeSidebar = a),
                                i.container.css("display", ""),
                                i.sidebar.activate(),
                                this._sidebarWidths[a]
                                    ? this._htmlElement.css("width", this._sidebarWidths[a] + "px")
                                    : this._htmlElement.css("width", i.sidebar.getDefaultWidth() + "px"),
                                this.relayout(),
                                this.hasEventListeners(GSidebars.SidebarEvent) &&
                                    this.trigger(new GSidebars.SidebarEvent(GSidebars.SidebarEvent.Type.Activated, i.sidebar)));
                            const touchTools = i.sidebar.getTouchTools();
                            if (touchTools) {
                                const defaultTouchTool =
                                    touchTools.find((touchTool) => {
                                        let { def } = touchTool;
                                        return !!def;
                                    }) || touchTools[0];
                                defaultTouchTool && this.setActiveTouchTool(defaultTouchTool);
                            }
                        } else
                            (i.container.css("display", "none"),
                                a === previousActiveSidebar &&
                                    (i.sidebar.deactivate(),
                                    (this._activeSidebar = sidebarId),
                                    this.hasEventListeners(GSidebars.SidebarEvent) &&
                                        this.trigger(new GSidebars.SidebarEvent(GSidebars.SidebarEvent.Type.Deactivated, i.sidebar))));
                        this._updateBadge(i.sidebar);
                    }
                    (this._htmlElement.find(".sidebar-option").removeClass("active"),
                        this._htmlElement.find(".sidebar-option.sidebar-" + sidebarId).addClass("active"),
                        this._activeSidebar &&
                            !this._getSidebarInfo(this._activeSidebar) &&
                            this.setActiveSidebar(this._sidebars[0].sidebar.getId()));
                }
            }),
            (GSidebars.prototype.setActiveTouchTool = function (touchTool) {
                (this._activeTouchTool && touchTool && this._activeTouchTool.id === touchTool.id) ||
                    (this._htmlElement.find("[g-touch-tool]").removeClass("g-active"),
                    this._htmlElement.find(".sidebar-container").removeClass("g-active"),
                    this._activeTouchTool && this._activeTouchTool.deactivate(),
                    touchTool
                        ? (this._htmlElement.find(".sidebar-".concat(touchTool.sidebar)).addClass("g-active"),
                          this._htmlElement.find('[g-touch-tool="'.concat(touchTool.id, '"]')).addClass("g-active"),
                          (this._activeTouchTool = touchTool))
                        : (this._activeTouchTool = null),
                    this._activeTouchTool && this._activeTouchTool.activate());
            }),
            (GSidebars.prototype.showSidebar = function (sidebarId) {
                if (this.getSidebar(sidebarId) && this._activeSidebar !== sidebarId) {
                    null === this._activeSidebar && this.setActiveSidebar(sidebarId);
                    var optionElement = this._htmlElement.find(".sidebar-option.sidebar-" + sidebarId);
                    optionElement.is(":hidden") && optionElement.show();
                }
            }),
            (GSidebars.prototype.hideSidebar = function (sidebarId) {
                if (this.getActiveSidebar() === sidebarId) {
                    for (var replacementId = null, n = 0; n < this._sidebars.length && !replacementId; ++n)
                        if (this._sidebars[n].sidebar.getId() !== sidebarId) {
                            var o = this._sidebars[n].sidebar.getId();
                            this._htmlElement.find(".sidebar-option.sidebar-" + o).is(":visible") && (replacementId = o);
                        }
                    this.setActiveSidebar(replacementId);
                }
                var optionElement = this._htmlElement.find(".sidebar-option.sidebar-" + sidebarId);
                optionElement.is(":visible") && optionElement.hide();
            }),
            (GSidebars.prototype.setSidebarEnabled = function (sidebarId, enabled) {
                var sidebarInfo = this._getSidebarInfo(sidebarId);
                if (sidebarInfo)
                    if (enabled) (sidebarInfo.container.find(".g-disabled-overlay").remove(), sidebarInfo.container.removeClass("g-disabled"));
                    else {
                        var overlay = sidebarInfo.container.find(".g-disabled-overlay");
                        (0 === overlay.length && (overlay = $("<div></div>").addClass("g-disabled-overlay").appendTo(sidebarInfo.container)),
                            sidebarInfo.container.addClass("g-disabled"));
                    }
            }),
            (GSidebars.prototype.init = function () {
                this._sidebars = [];
                var sidebar = function (sidebar, sidebarCount) {
                        (sidebarCount > 1 &&
                            !this._sidebarsSelector &&
                            ((this._sidebarsSelector = $("<div/>")
                                .addClass("sidebar-selector")
                                .css("display", "none")
                                .appendTo(this._htmlElement)),
                            this._htmlElement.css("width", sidebar.getDefaultWidth() + "px")),
                            this._sidebarsSelector &&
                                $("<div/>")
                                    .addClass("sidebar-option sidebar-" + sidebar.getId())
                                    .append([
                                        $("<span/>").addClass("sidebar-title").text(GObject.GLocale.get(sidebar.getTitle())),
                                        $("<span/>").addClass("g-badge").hide(),
                                    ])
                                    .on("click", this._tryActivateSidebar.bind(this, sidebar))
                                    .appendTo(this._sidebarsSelector));
                        var container = $("<div></div>")
                            .addClass("sidebar-container sidebar-" + sidebar.getId() + (this._sidebarsSelector ? " multiple" : ""))
                            .css("display", "none")
                            .appendTo(this._htmlElement);
                        (sidebar.init(container),
                            this._sidebars.push({ container: container, sidebar: sidebar }),
                            container.find("button").each(function (index, buttonElement) {
                                $(buttonElement).on("mousedown", function (event) {
                                    event.preventDefault();
                                });
                            }));
                        const license = gDesigner.getLicense();
                        (sidebar.addEventListener(
                            GView.UpdateEvent,
                            function () {
                                (this.setSidebarEnabled(sidebar.getId(), sidebar.isEnabled() && license.canAccessFreemium()),
                                    this._updateTouchToolbar(),
                                    this._updateBadge(sidebar));
                            }.bind(this)
                        ),
                            sidebar.getId() === SidebarsIds.GInspectorSidebar &&
                                sidebar.addEventListener(
                                    GSidebars.SidebarEvent,
                                    function (event) {
                                        [GSidebars.SidebarEvent.Type.ChildAdded, GSidebars.SidebarEvent.Type.ChildRemoved].includes(event.type) &&
                                            this._updateTouchToolbar();
                                    }.bind(this)
                                ),
                            this.setSidebarEnabled(sidebar.getId(), sidebar.isEnabled()));
                    }.bind(this),
                    matchingSidebars = [];
                for (let e = 0; e < window.gravit.sidebars.length; ++e) {
                    let sidebarDef = window.gravit.sidebars[e];
                    sidebarDef.getOrientation() === this._orientation && matchingSidebars.push(sidebarDef);
                }
                if (window.gravit.sidebars)
                    for (let n = 0; n < matchingSidebars.length; ++n) {
                        let sidebarDef = matchingSidebars[n];
                        sidebarDef.getOrientation() === this._orientation && sidebar(sidebarDef, matchingSidebars.length);
                    }
                (gDesigner.addEventListener(GSettingChangedEvent, this._settingChanged, this),
                    (this._mouseDownHandler = this._documentMouseDown.bind(this)),
                    (this._mouseMoveHandler = this._documentMouseMove.bind(this)),
                    (this._mouseReleaseHandler = this._resizeMouseUp.bind(this)),
                    document.addEventListener("mousemove", this._mouseMoveHandler),
                    document.addEventListener("mousedown", this._mouseDownHandler),
                    document.addEventListener("mouseup", this._mouseReleaseHandler, true),
                    document.addEventListener("dragstart", this._mouseMoveHandler),
                    document.addEventListener("drag", this._mouseMoveHandler),
                    document.addEventListener("dragend", this._mouseMoveHandler, true),
                    this._updateTouchToolbar());
            }),
            (GSidebars.prototype.setView = function (view) {
                view !== this._view &&
                    (this._view &&
                        (this._view.removeEventListener(GPlatform.GMouseEvent.Down, this._mouseDownHandler, this),
                        this._view.removeEventListener(GPlatform.GMouseEvent.Move, this._mouseMoveHandler, this),
                        this._view.removeEventListener(GPlatform.GMouseEvent.DragStart, this._mouseMoveHandler, this),
                        this._view.removeEventListener(GPlatform.GMouseEvent.Drag, this._mouseMoveHandler, this),
                        this._view.removeEventListener(GPlatform.GMouseEvent.DragEnd, this._mouseMoveHandler, this),
                        this._view.removeEventListener(GPlatform.GMouseEvent.Release, this._mouseReleaseHandler, this)),
                    (this._view = view),
                    this._view &&
                        (this._view.addEventListener(GPlatform.GMouseEvent.Down, this._mouseDownHandler, this),
                        this._view.addEventListener(GPlatform.GMouseEvent.Move, this._mouseMoveHandler, this),
                        this._view.addEventListener(GPlatform.GMouseEvent.DragStart, this._mouseMoveHandler, this),
                        this._view.addEventListener(GPlatform.GMouseEvent.Drag, this._mouseMoveHandler, this),
                        this._view.addEventListener(GPlatform.GMouseEvent.DragEnd, this._mouseMoveHandler, this),
                        this._view.addEventListener(GPlatform.GMouseEvent.Release, this._mouseReleaseHandler, this)));
            }),
            (GSidebars.prototype._isActiveSidebarDeactivatable = function () {
                return !(this.getSidebar(this._activeSidebar) && !this.getSidebar(this._activeSidebar).isDeactivatable());
            }),
            (GSidebars.prototype._tryActivateSidebar = function (sidebar) {
                return (
                    !!this._isActiveSidebarDeactivatable() &&
                    (gDesigner.stats("sidebars_activate_sidebar", (sidebar && sidebar.getId()) || "unkn"),
                    this.setActiveSidebar(sidebar.getId()),
                    this.setSidebarEnabled(sidebar.getId(), sidebar.isEnabled()),
                    true)
                );
            }),
            (GSidebars.prototype.disableContextSensitive = function () {
                this._updateTouchToolbar({ disableContextSensitive: true });
            }),
            (GSidebars.prototype.enableContextSensitive = function () {
                this._updateTouchToolbar();
            }),
            (GSidebars.prototype._documentMouseMove = function (event) {
                if (this._htmlElement && this._htmlElement[0])
                    if (this._isResizing) {
                        var pointerX;
                        (event instanceof MouseEvent
                            ? (pointerX = event.pageX)
                            : ((event.isImmediatePropagationStopped = true), (pointerX = event.client.getX() / GObject.GPaintCanvas.getScreenDPI())),
                            event.stopPropagation instanceof Function && event.stopPropagation(),
                            (this._newWidth = this._orientation === GSidebars.Orientation.Left ? pointerX : window.innerWidth - pointerX),
                            this._newWidth < this._minimumWidth && (this._newWidth = this._minimumWidth),
                            this._htmlElement.css("width", this._newWidth + "px"));
                        var sidebar = this.getSidebar(this._activeSidebar);
                        sidebar && sidebar.resize();
                    } else {
                        var edgePosition =
                                this._orientation === GSidebars.Orientation.Left
                                    ? this._htmlElement[0].offsetWidth
                                    : window.innerWidth - this._htmlElement[0].offsetWidth,
                            nearEdge =
                                GObject.GMath.isEqualEps(event.pageX, edgePosition, 3 * GObject.GPaintCanvas.getScreenDPI()) &&
                                this._orientation !== GSidebars.Orientation.Right;
                        (nearEdge || this._canResize) &&
                            (nearEdge && !this._canResize
                                ? (this._frame.addClass("resize"), (this._canResize = nearEdge))
                                : this._canResize && !nearEdge && (this._frame.removeClass("resize"), (this._canResize = nearEdge)));
                    }
            }),
            (GSidebars.prototype._documentMouseDown = function (event) {
                var sidebar = this.getSidebar(this._activeSidebar);
                this._canResize &&
                    sidebar &&
                    sidebar.isResizeable() &&
                    ((this._isResizing = true),
                    (this._minimumWidth = sidebar.getMinimumWidth()),
                    event instanceof GPlatform.GMouseEvent && (event.isImmediatePropagationStopped = true),
                    event.stopPropagation instanceof Function && event.stopPropagation());
            }),
            (GSidebars.prototype._resizeMouseUp = function (event) {
                if (this._isResizing) {
                    (event instanceof GPlatform.GMouseEvent && (event.isImmediatePropagationStopped = true),
                        event.stopPropagation instanceof Function && event.stopPropagation(),
                        (this._isResizing = false));
                    var sidebar = this.getSidebar(this._activeSidebar);
                    sidebar && gDesigner.setSetting("sidebars_width_" + sidebar.getId(), this._newWidth);
                }
            }),
            (GSidebars.prototype.relayout = function () {
                if (this._activeSidebar) {
                    let sidebar = this.getSidebar(this._activeSidebar);
                    sidebar && (this._htmlElement.css("width", sidebar.getSettingWidth() + "px"), sidebar.relayout());
                }
                for (var e = 0, t = 0, n = 0; n < this._sidebars.length; ++n) {
                    let sidebarInfo = this._sidebars[n];
                    var o = sidebarInfo.sidebar.getId();
                    (sidebarInfo.sidebar.isVisible()
                        ? (e++, this._htmlElement.find(".sidebar-option.sidebar-" + o).show())
                        : this._htmlElement.find(".sidebar-option.sidebar-" + o).hide(),
                        sidebarInfo.sidebar.isEnabled() && t++,
                        this._updateBadge(sidebarInfo.sidebar));
                }
                if (e > 0) {
                    let containers = this._htmlElement.find(".sidebar-container");
                    (this._sidebarsSelector &&
                        t > 0 &&
                        (this._sidebarsSelector.css("display", ""),
                        this._sidebarsSelector.toggleClass("singleton", 1 === e),
                        containers.hasClass("multiple") || containers.addClass("multiple")),
                        this._orientation === GSidebars.Orientation.Right &&
                            containers.css(
                                "bottom",
                                $(".license-info:visible").length > 0 ? parseInt($(".license-info:visible").outerHeight(), 10) : 0
                            ));
                } else
                    (this._sidebarsSelector && this._sidebarsSelector.css("display", "none"),
                        this._htmlElement.find(".sidebar-container").removeClass("multiple"));
                this._updateTouchToolbar();
            }),
            (GSidebars.prototype._getSidebarInfo = function (sidebarId) {
                if (sidebarId && this._sidebars)
                    for (var t = 0; t < this._sidebars.length; ++t) {
                        if (this._sidebars[t].sidebar.getId() === sidebarId) return this._sidebars[t];
                    }
                return null;
            }),
            (GSidebars.prototype._settingChanged = function (event) {
                if (event.key === "sidebars_" + this._orientation + "_active") {
                    if (gDesigner.isTouchEnabled() && event.restoring) return;
                    (this.setActiveSidebar(event.newValue ? event.newValue : null), gDesigner.setPartVisible(this.getSidebarsPart(), !!event.newValue));
                } else if (0 === event.key.indexOf("sidebars_width_") && this._orientation !== GSidebars.Orientation.Right) {
                    var sidebarId = event.key.substr("sidebars_width_".length);
                    ((this._sidebarWidths[sidebarId] = event.newValue),
                        sidebarId === this._activeSidebar && (this._htmlElement.css("width", event.newValue + "px"), gDesigner.relayout()));
                } else
                    "touch" === event.key &&
                        (this._updateTouchToolbar(), this._htmlElement.find(".appearance-properties-panel").removeClass("display-none"));
            }),
            (GSidebars.prototype._updateBadge = function (sidebar) {
                if (this._sidebarsSelector) {
                    var optionElement = this._sidebarsSelector.find(".sidebar-option.sidebar-" + sidebar.getId()),
                        badgeElement = optionElement.find(".g-badge");
                    sidebar.updateBadge(badgeElement) ? (optionElement.addClass("content-width"), badgeElement.show()) : (optionElement.removeClass("content-width"), badgeElement.hide());
                }
            }),
            (GSidebars.prototype.getSidebar = function (sidebarId) {
                var sidebar = null;
                if (sidebarId) {
                    var sidebarInfo = this._getSidebarInfo(sidebarId);
                    sidebarInfo && (sidebar = sidebarInfo.sidebar);
                }
                return sidebar;
            }),
            (GSidebars.prototype.getSidebarsPart = function () {
                switch (this._orientation) {
                    case GSidebars.Orientation.Left:
                        return Parts.LeftSidebars;
                    case GSidebars.Orientation.Right:
                        return Parts.RightSidebars;
                }
            }),
            (GSidebars.prototype.addClassName = function (className) {
                this._htmlElement.find(".sidebar-container").addClass(className);
            }),
            (GSidebars.prototype.removeClassName = function (className) {
                this._htmlElement.find(".sidebar-container").removeClass(className);
            }),
            (GSidebars.setOrientationStateInSetting = function (orientation, value) {
                gDesigner.setSetting(GSidebars.getSettingNameForSidebar(orientation), value);
            }),
            (GSidebars.isOrientationActiveInSetting = function (orientation) {
                return gDesigner.getSetting(GSidebars.getSettingNameForSidebar(orientation));
            }),
            (GSidebars.getSettingNameForSidebar = function (orientation) {
                return "sidebars_" + orientation + "_active";
            }),
            (GSidebars.prototype.getHtmlElement = function () {
                return this._htmlElement;
            }),
            (GSidebars.prototype.setEnabled = function (sidebarsContainer, enabled) {
                ($(".sidebar-selector > div")[enabled ? "removeClass" : "addClass"]("g-disabled"),
                    sidebarsContainer._sidebars.forEach((sidebarInfo) => {
                        sidebarInfo.container[enabled ? "removeClass" : "addClass"]("g-disabled");
                    }));
            }),
            (module.exports = GSidebars));
    };
