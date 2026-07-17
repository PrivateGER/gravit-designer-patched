module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            teamsPlatform = _interopRequireDefault(require(443)),
            fullscreenEventModule = _interopRequireDefault(require(1330));
        const { isExecutingOnMSTeamsSync } = teamsPlatform.default;
        var parts = require(863),
            GFitAllAction = require(449),
            GCategory = require(18),
            GAction = require(31),
            GBanner = require(1588);
        function GToggleFullscreenAction() {
            this._banner.setBannerText(GObject.GLocale.get(new GObject.GLocaleKey("GToggleFullscreenAction", "fullscreen-banner")));
        }
        (GObject.GObject.inherit(GToggleFullscreenAction, GAction),
            (GToggleFullscreenAction.ID = "view.fullscreen"),
            (GToggleFullscreenAction.TITLE = new GObject.GLocaleKey("GToggleFullscreenAction", "title")),
            (GToggleFullscreenAction.prototype._lastStates = {}),
            (GToggleFullscreenAction.prototype._banner = new GBanner()),
            (GToggleFullscreenAction.prototype.getId = function () {
                return GToggleFullscreenAction.ID;
            }),
            (GToggleFullscreenAction.prototype.getTitle = function () {
                return GToggleFullscreenAction.TITLE;
            }),
            (GToggleFullscreenAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (GToggleFullscreenAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.ALT_LEFT, GPlatform.GKey.Constant.ENTER];
            }),
            (GToggleFullscreenAction.prototype.isEnabled = function () {
                return !!gDesigner.getActiveDocument() && this._isSupported();
            }),
            (GToggleFullscreenAction.prototype.isVisible = function () {
                return this._isSupported();
            }),
            (GToggleFullscreenAction.prototype._isSupported = function () {
                return !isExecutingOnMSTeamsSync();
            }),
            (GToggleFullscreenAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-toggle-full-screen" : null;
            }),
            (GToggleFullscreenAction.prototype.isFullscreen = function () {
                return !(
                    gDesigner.isPartVisible(parts.Header) ||
                    gDesigner.isPartVisible(parts.Toolbar) ||
                    gDesigner.isPartVisible(parts.RightSidebars) ||
                    gDesigner.isPartVisible(parts.LeftSidebars) ||
                    gDesigner.isPartVisible(parts.Panels)
                );
            }),
            (GToggleFullscreenAction.prototype.execute = function () {
                var wasFullscreen = this.isFullscreen();
                (wasFullscreen ? this._banner.hide() : (this._updateLastStates(), gDesigner.isTouchEnabled() || this._banner.show()),
                    gDesigner.setPartVisible(parts.Header, !!wasFullscreen && this._lastStates.header, ""),
                    gDesigner.setPartVisible(parts.Toolbar, !!wasFullscreen && this._lastStates.toolbar, ""),
                    gDesigner.setPartVisible(parts.Panels, !!wasFullscreen && this._lastStates.panels),
                    gDesigner.setPartVisible(parts.RightSidebars, !!wasFullscreen && this._lastStates.rightSidebar),
                    gDesigner.setPartVisible(parts.LeftSidebars, !!wasFullscreen && this._lastStates.leftSidebar),
                    gDesigner.relayout(),
                    gDesigner.executeAction(GFitAllAction.ID, void 0, void 0, true),
                    gDesigner.hasEventListeners(fullscreenEventModule.default) && gDesigner.trigger(new fullscreenEventModule.default(wasFullscreen)));
            }),
            (GToggleFullscreenAction.prototype._updateLastStates = function () {
                this._lastStates = {
                    header: gDesigner.isPartVisible(parts.Header),
                    toolbar: gDesigner.isPartVisible(parts.Toolbar),
                    panels: gDesigner.isPartVisible(parts.Panels),
                    leftSidebar: gDesigner.isPartVisible(parts.LeftSidebars),
                    rightSidebar: gDesigner.isPartVisible(parts.RightSidebars),
                };
            }),
            (GToggleFullscreenAction.prototype.toString = function () {
                return "[Object GToggleFullscreenAction]";
            }),
            (module.exports = GToggleFullscreenAction));
    };
