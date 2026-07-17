module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13), require(32), require(33));
        var GSidebars = require(395);
        ((GSidebars.prototype._rightSidebarDefaultWidthForTouch = 300),
            (GSidebars.prototype._updateTouchToolbar = function (options) {
                const expandingToolIds = ["fill", "border", "effect"];
                if (!gDesigner.isTouchEnabled()) return;
                this._touchToolbar || (this._touchToolbar = $("<div/>").addClass("g-touch-toolbar").prependTo(this._htmlElement));
                let activeTool = null;
                (this._touchToolbar.empty(),
                    this.removeClassName("align-active"),
                    this._sidebars.forEach((sidebarEntry) => {
                        let { sidebar, container } = sidebarEntry;
                        const touchTools = sidebar.getTouchTools(options);
                        sidebar &&
                            sidebar.isVisible() &&
                            touchTools &&
                            touchTools.forEach((tool) => {
                                tool.sidebar = sidebar.getId();
                                const isActive = !!this._activeTouchTool && tool.id == this._activeTouchTool.id;
                                isActive && (activeTool = tool);
                                let panels = tool.panel;
                                if (
                                    (Array.isArray(tool.panel) || (panels = [tool.panel]),
                                    "dimension.align" === tool.id && isActive && this.addClassName("align-active"),
                                    panels.forEach((panelSelector) => {
                                        let panelElement;
                                        ((panelElement = "string" == typeof panelSelector ? container.find(panelSelector) : $(panelSelector)),
                                            panelElement.attr("g-touch-tool", tool.id).toggleClass("g-active", isActive).addClass("g-touch-toolbar-panel"));
                                    }),
                                    tool.toolbar)
                                ) {
                                    let toolbarSelectors = tool.toolbar;
                                    (Array.isArray(tool.toolbar) || (toolbarSelectors = [tool.toolbar]),
                                        toolbarSelectors.forEach((toolbarSelector) => {
                                            let toolbarElement;
                                            ((toolbarElement = "string" == typeof toolbarSelector ? container.find(toolbarSelector) : $(toolbarSelector)),
                                                toolbarElement.attr("g-touch-tool", tool.id).toggleClass("g-active", isActive).addClass("g-touch-toolbar-label"));
                                        }));
                                }
                                var button = $("<button/>")
                                    .addClass("g-touch-toolbar-button")
                                    .attr("g-touch-tool", tool.id)
                                    .attr("id", tool.id)
                                    .toggleClass("g-active", isActive)
                                    .append($("<span/>").addClass(tool.icon || ""))
                                    .on("click", () => {
                                        (this.removeClassName("align-active"),
                                            "dimension.align" == tool.id
                                                ? ($(".scrolling-panels").addClass("hide"), this.addClassName("align-active"))
                                                : $(".scrolling-panels").removeClass("hide"),
                                            -1 != expandingToolIds.indexOf(tool.id)
                                                ? $(".sidebar-inspector").addClass("expand")
                                                : $(".sidebar-inspector").removeClass("expand"),
                                            this._activeTouchTool && this._activeTouchTool.id == tool.id
                                                ? this._isActiveSidebarDeactivatable() &&
                                                  (this.setActiveTouchTool(null),
                                                  this._htmlElement.css("width", sidebar.getDefaultWidth() + "px"))
                                                : this._tryActivateSidebar(sidebar) &&
                                                  (this.setActiveTouchTool(tool),
                                                  tool.panelWidth
                                                      ? this._htmlElement.css("width", tool.panelWidth)
                                                      : this._htmlElement.css("width", sidebar.getDefaultWidth() + "px"),
                                                  ".appearance-toolbar" !== tool.toolbar
                                                      ? this._htmlElement.find(".appearance-properties-panel").addClass("display-none")
                                                      : this._htmlElement
                                                            .find(".appearance-properties-panel")
                                                            .removeClass("display-none")));
                                    })
                                    .appendTo(this._touchToolbar);
                                if (-1 != expandingToolIds.indexOf(tool.id)) {
                                    var count = $(".".concat(tool.id, "-block")).length;
                                    button.append($("<div/>").addClass("count").append($("<div/>").addClass("scale").text(count)));
                                }
                            });
                    }),
                    this.setActiveTouchTool(activeTool),
                    activeTool || this._setDefaultRightSidebarWidthForTouch());
            }),
            (GSidebars.prototype.updateTouchToolbar = function () {
                this._updateTouchToolbar();
            }),
            (GSidebars.prototype._setDefaultRightSidebarWidthForTouch = function () {
                this._htmlElement.css("width", this._rightSidebarDefaultWidthForTouch + "px");
            }));
    };
