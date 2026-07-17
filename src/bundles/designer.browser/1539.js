module.exports = function (module, exports, require) {
        "use strict";
        (require(4), require(13));
        var GObject = require(1),
            GView = require(394);
        function GPanels(htmlElement) {
            ((this._htmlElement = htmlElement), (this._collapseIcon = $('<span class="collapse-icon"><span></span><span></span></span>')));
        }
        ((GPanels.CollapseMode = { None: "none", Half: "half", Full: "full" }),
            (GPanels.prototype._htmlElement = null),
            (GPanels.prototype._collapseIcon = null),
            (GPanels.prototype._panels = null),
            (GPanels.prototype._activePanel = null),
            (GPanels.prototype._collapseMode = null),
            (GPanels.prototype.getCollapseMode = function () {
                return this._collapseMode;
            }),
            (GPanels.prototype.setCollapseMode = function (collapseMode) {
                collapseMode !== this._collapseMode &&
                    (this._collapseMode && this._htmlElement.removeClass("collapse-" + this._collapseMode),
                    (this._collapseMode = collapseMode),
                    this._collapseMode && this._htmlElement.addClass("collapse-" + this._collapseMode));
            }),
            (GPanels.prototype.toggleCollapseMode = function () {
                switch (this._collapseMode) {
                    case GPanels.CollapseMode.Full:
                        this.setCollapseMode(GPanels.CollapseMode.None);
                        break;
                    case GPanels.CollapseMode.Half:
                        this.setCollapseMode(GPanels.CollapseMode.Full);
                        break;
                    case GPanels.CollapseMode.None:
                        this.setCollapseMode(GPanels.CollapseMode.Half);
                }
            }),
            (GPanels.prototype.getActivePanel = function () {
                return this._activePanel;
            }),
            (GPanels.prototype.setActivePanel = function (panelId) {
                if (panelId === this._activePanel) this.toggleCollapseMode();
                else {
                    for (var t = 0; t < this._panels.length; ++t) {
                        var n = this._panels[t],
                            o = n.panel.getId();
                        o === panelId
                            ? (n.container.css("display", ""), n.tab.addClass("g-active"), n.panel.activate())
                            : (n.container.css("display", "none"),
                              n.tab.removeClass("g-active"),
                              o === this._activePanel && n.panel.deactivate());
                    }
                    this._activePanel = panelId;
                }
            }),
            (GPanels.prototype.setPanelEnabled = function (panelId, enabled) {
                var panelInfo = this._getPanelInfo(panelId);
                if (panelInfo)
                    if (enabled) (panelInfo.container.find(".g-disabled-overlay").remove(), panelInfo.container.removeClass("g-disabled"));
                    else {
                        var overlay = panelInfo.container.find(".g-disabled-overlay");
                        (0 === overlay.length && (overlay = $("<div></div>").addClass("g-disabled-overlay").appendTo(panelInfo.container)),
                            panelInfo.container.addClass("g-disabled"));
                    }
            }),
            (GPanels.prototype.init = function () {
                this._panels = [];
                var tabsContainer = $("<div></div>").addClass("panels-tabs").appendTo(this._htmlElement),
                    frameContainer = $("<div></div>").addClass("panels-frame").appendTo(this._htmlElement),
                    n = function (n) {
                        var tabButton = $("<button></button>")
                                .addClass("panel-tab")
                                .attr("data-panel-id", n.getId())
                                .text(GObject.GLocale.get(n.getTitle()))
                                .on(
                                    "click",
                                    function (event) {
                                        (gDesigner.stats("panels_set_active"),
                                            this.setActivePanel($(event.target).closest("button").attr("data-panel-id")));
                                    }.bind(this)
                                )
                                .on("mousedown", function (event) {
                                    event.preventDefault();
                                })
                                .prepend(this._collapseIcon.clone())
                                .appendTo(tabsContainer),
                            panelContainer = $("<div></div>")
                                .addClass("panel-container panel-" + n.getId())
                                .css("display", "none")
                                .appendTo(frameContainer);
                        (n.init(panelContainer),
                            panelContainer.find("button").each(function (index, button) {
                                button.on("mousedown", function (event) {
                                    event.preventDefault();
                                });
                            }),
                            this.setPanelEnabled(n.getId(), n.isEnabled()),
                            this._panels.push({ tab: tabButton, container: panelContainer, panel: n }),
                            n.addEventListener(
                                GView.UpdateEvent,
                                function () {
                                    this.setPanelEnabled(n.getId(), n.isEnabled());
                                }.bind(this)
                            ));
                    }.bind(this);
                if (gravit.panels)
                    for (var r = 0; r < gravit.panels.length; ++r) {
                        var s = gravit.panels[r];
                        (n(s), this._activePanel || this.setActivePanel(s.getId()));
                    }
                this.setCollapseMode(GPanels.CollapseMode.None);
            }),
            (GPanels.prototype.relayout = function () {}),
            (GPanels.prototype._getPanelInfo = function (panelId) {
                for (var t = 0; t < this._panels.length; ++t) {
                    if (this._panels[t].panel.getId() === panelId) return this._panels[t];
                }
            }),
            (module.exports = GPanels));
    };
