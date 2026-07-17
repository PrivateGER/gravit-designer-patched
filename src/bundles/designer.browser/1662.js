module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            GTouchTool = _interopRequireDefault(require(340)),
            GSidebar = require(806),
            GSidebars = require(395),
            GLibraryPanel = require(1663),
            GCommonNames = require(119);
        const GNetworkAvailabilityChangedEvent = require(291);
        function GLibrarySidebar() {
            GSidebar.call(this);
        }
        (GObject.GObject.inherit(GLibrarySidebar, GSidebar),
            (GLibrarySidebar.ID = "library"),
            (GLibrarySidebar.TITLE = new GObject.GLocaleKey("GLibrarySidebar", "title")),
            (GLibrarySidebar.prototype._initialized = false),
            (GLibrarySidebar.prototype._libraryPanel = null),
            (GLibrarySidebar.prototype._libraryPanelInstance = null),
            (GLibrarySidebar.prototype._htmlElement = null),
            (GLibrarySidebar.prototype.getId = function () {
                return GLibrarySidebar.ID;
            }),
            (GLibrarySidebar.prototype.getTitle = function () {
                return GLibrarySidebar.TITLE;
            }),
            (GLibrarySidebar.prototype.isEnabled = function () {
                return GCommonNames.isOnline();
            }),
            (GLibrarySidebar.prototype.isVisible = function () {
                // The panel's only living content source is the Unsplash proxy
                // (window.UNSPLASH_ENABLED via /config.js); without it every
                // category is dead, so hide the whole LIBRARIES tab.
                return true === window.UNSPLASH_ENABLED && !!gDesigner.getApplicationManager().isEditingEnabled();
            }),
            (GLibrarySidebar.prototype.getOrientation = function () {
                return GSidebars.Orientation.Left;
            }),
            (GLibrarySidebar.prototype.getMinimumWidth = function () {
                return 250;
            }),
            (GLibrarySidebar.prototype.getDefaultWidth = function () {
                return 250;
            }),
            (GLibrarySidebar.prototype.isResizeable = function () {
                return true;
            }),
            (GLibrarySidebar.prototype.resize = function () {
                this._libraryPanelInstance.resize();
            }),
            (GLibrarySidebar.prototype.relayout = function () {
                (this._libraryPanel && !this._libraryPanel.hasClass("unavailable")) ||
                    !this.isEnabled() ||
                    this._addLibraryPanel(this._htmlElement);
            }),
            (GLibrarySidebar.prototype.init = function (htmlElement) {
                (GSidebar.prototype.init.call(this, htmlElement),
                    (this._htmlElement = htmlElement),
                    this._addLibraryPanel(htmlElement),
                    $(document).on(
                        "networkAvailable",
                        function () {
                            this.relayout();
                            var leftSidebars = gDesigner.getLeftSidebars(),
                                activeSidebarId = leftSidebars.getActiveSidebar();
                            activeSidebarId === this.getId() && leftSidebars.setSidebarEnabled(activeSidebarId, this.isEnabled());
                        }.bind(this)
                    ),
                    gDesigner.addEventListener(GNetworkAvailabilityChangedEvent, this._networkAvailabilityChangedEvent, this));
            }),
            (GLibrarySidebar.prototype._networkAvailabilityChangedEvent = function (event) {
                (this._libraryPanel.toggleClass("offline", !event.connected), this._initialized || this._addLibraryPanel(this._htmlElement));
            }),
            (GLibrarySidebar.prototype._addLibraryPanel = function (htmlElement) {
                (this._libraryPanel ||
                    ($("<div></div>")
                        .addClass("toolbar library-toolbar g-touch-only")
                        .append($("<label/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLibrarySidebar", "title"))))
                        .appendTo(htmlElement),
                    (this._libraryPanel = $("<div/>")
                        .append(
                            $("<div/>")
                                .addClass("overlay")
                                .append(
                                    $("<div/>")
                                        .addClass("box")
                                        .append(
                                            $("<span/>").text(
                                                GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "title.unavailable-feature"))
                                            )
                                        )
                                )
                        )
                        .addClass("library-container")
                        .css("overflow", "auto")
                        .appendTo(htmlElement))),
                    this._libraryPanel.toggleClass("offline", gDesigner.isOffline()),
                    GCommonNames.isOnline()
                        ? (this._libraryPanel.hasClass("unavailable") &&
                              (this._libraryPanel.removeClass("unavailable"), this._libraryPanel.empty()),
                          gDesigner.isOffline() || ((this._libraryPanelInstance = new GLibraryPanel(this._libraryPanel)), (this._initialized = true)))
                        : (this._libraryPanel.addClass("unavailable"),
                          $("<span/>")
                              .addClass("span-unavailable")
                              .text(GObject.GLocale.get(new GObject.GLocaleKey("GLibrarySidebar", "text.connect")))
                              .appendTo(this._libraryPanel)));
            }),
            (GLibrarySidebar.prototype.getTouchTools = function () {
                return [
                    new GTouchTool.default({
                        id: "libraries",
                        sidebar: this.getId(),
                        icon: "gravit-icon-touch-libraries-panel",
                        panel: ".library-container",
                    }),
                ];
            }),
            (GLibrarySidebar.prototype.toString = function () {
                return "[Object GLibrarySidebar]";
            }),
            (module.exports = GLibrarySidebar));
    };
