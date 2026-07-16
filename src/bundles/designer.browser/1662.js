module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            a = _interopRequireDefault(require(340)),
            r = require(806),
            s = require(395),
            GCommonNames = require(1663),
            c = require(119 /* GCommonNames */);
        const d = require(291);
        function u() {
            r.call(this);
        }
        (GObject.GObject.inherit(u, r),
            (u.ID = "library"),
            (u.TITLE = new GObject.GLocaleKey("GLibrarySidebar", "title")),
            (u.prototype._initialized = false),
            (u.prototype._libraryPanel = null),
            (u.prototype._libraryPanelInstance = null),
            (u.prototype._htmlElement = null),
            (u.prototype.getId = function () {
                return u.ID;
            }),
            (u.prototype.getTitle = function () {
                return u.TITLE;
            }),
            (u.prototype.isEnabled = function () {
                return c.isOnline();
            }),
            (u.prototype.isVisible = function () {
                return !!gDesigner.getApplicationManager().isEditingEnabled();
            }),
            (u.prototype.getOrientation = function () {
                return s.Orientation.Left;
            }),
            (u.prototype.getMinimumWidth = function () {
                return 250;
            }),
            (u.prototype.getDefaultWidth = function () {
                return 250;
            }),
            (u.prototype.isResizeable = function () {
                return true;
            }),
            (u.prototype.resize = function () {
                this._libraryPanelInstance.resize();
            }),
            (u.prototype.relayout = function () {
                (this._libraryPanel && !this._libraryPanel.hasClass("unavailable")) ||
                    !this.isEnabled() ||
                    this._addLibraryPanel(this._htmlElement);
            }),
            (u.prototype.init = function (e) {
                (r.prototype.init.call(this, e),
                    (this._htmlElement = e),
                    this._addLibraryPanel(e),
                    $(document).on(
                        "networkAvailable",
                        function () {
                            this.relayout();
                            var e = gDesigner.getLeftSidebars(),
                                t = e.getActiveSidebar();
                            t === this.getId() && e.setSidebarEnabled(t, this.isEnabled());
                        }.bind(this)
                    ),
                    gDesigner.addEventListener(d, this._networkAvailabilityChangedEvent, this));
            }),
            (u.prototype._networkAvailabilityChangedEvent = function (e) {
                (this._libraryPanel.toggleClass("offline", !e.connected), this._initialized || this._addLibraryPanel(this._htmlElement));
            }),
            (u.prototype._addLibraryPanel = function (e) {
                (this._libraryPanel ||
                    ($("<div></div>")
                        .addClass("toolbar library-toolbar g-touch-only")
                        .append($("<label/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GLibrarySidebar", "title"))))
                        .appendTo(e),
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
                        .appendTo(e))),
                    this._libraryPanel.toggleClass("offline", gDesigner.isOffline()),
                    c.isOnline()
                        ? (this._libraryPanel.hasClass("unavailable") &&
                              (this._libraryPanel.removeClass("unavailable"), this._libraryPanel.empty()),
                          gDesigner.isOffline() || ((this._libraryPanelInstance = new GCommonNames(this._libraryPanel)), (this._initialized = true)))
                        : (this._libraryPanel.addClass("unavailable"),
                          $("<span/>")
                              .addClass("span-unavailable")
                              .text(GObject.GLocale.get(new GObject.GLocaleKey("GLibrarySidebar", "text.connect")))
                              .appendTo(this._libraryPanel)));
            }),
            (u.prototype.getTouchTools = function () {
                return [
                    new a.default({
                        id: "libraries",
                        sidebar: this.getId(),
                        icon: "gravit-icon-touch-libraries-panel",
                        panel: ".library-container",
                    }),
                ];
            }),
            (u.prototype.toString = function () {
                return "[Object GLibrarySidebar]";
            }),
            (module.exports = u));
    };
