module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(443)),
            s = _interopRequireDefault(require(1330));
        const { isExecutingOnMSTeamsSync } = r.default;
        var c = require(863),
            GFitAllAction = require(449),
            GCategory = require(18),
            p = require(31),
            g = require(1588);
        function h() {
            this._banner.setBannerText(GObject.GLocale.get(new GObject.GLocaleKey("GToggleFullscreenAction", "fullscreen-banner")));
        }
        (GObject.GObject.inherit(h, p),
            (h.ID = "view.fullscreen"),
            (h.TITLE = new GObject.GLocaleKey("GToggleFullscreenAction", "title")),
            (h.prototype._lastStates = {}),
            (h.prototype._banner = new g()),
            (h.prototype.getId = function () {
                return h.ID;
            }),
            (h.prototype.getTitle = function () {
                return h.TITLE;
            }),
            (h.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (h.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.ALT_LEFT, GPlatform.GKey.Constant.ENTER];
            }),
            (h.prototype.isEnabled = function () {
                return !!gDesigner.getActiveDocument() && this._isSupported();
            }),
            (h.prototype.isVisible = function () {
                return this._isSupported();
            }),
            (h.prototype._isSupported = function () {
                return !isExecutingOnMSTeamsSync();
            }),
            (h.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-toggle-full-screen" : null;
            }),
            (h.prototype.isFullscreen = function () {
                return !(
                    gDesigner.isPartVisible(c.Header) ||
                    gDesigner.isPartVisible(c.Toolbar) ||
                    gDesigner.isPartVisible(c.RightSidebars) ||
                    gDesigner.isPartVisible(c.LeftSidebars) ||
                    gDesigner.isPartVisible(c.Panels)
                );
            }),
            (h.prototype.execute = function () {
                var e = this.isFullscreen();
                (e ? this._banner.hide() : (this._updateLastStates(), gDesigner.isTouchEnabled() || this._banner.show()),
                    gDesigner.setPartVisible(c.Header, !!e && this._lastStates.header, ""),
                    gDesigner.setPartVisible(c.Toolbar, !!e && this._lastStates.toolbar, ""),
                    gDesigner.setPartVisible(c.Panels, !!e && this._lastStates.panels),
                    gDesigner.setPartVisible(c.RightSidebars, !!e && this._lastStates.rightSidebar),
                    gDesigner.setPartVisible(c.LeftSidebars, !!e && this._lastStates.leftSidebar),
                    gDesigner.relayout(),
                    gDesigner.executeAction(GFitAllAction.ID, void 0, void 0, true),
                    gDesigner.hasEventListeners(s.default) && gDesigner.trigger(new s.default(e)));
            }),
            (h.prototype._updateLastStates = function () {
                this._lastStates = {
                    header: gDesigner.isPartVisible(c.Header),
                    toolbar: gDesigner.isPartVisible(c.Toolbar),
                    panels: gDesigner.isPartVisible(c.Panels),
                    leftSidebar: gDesigner.isPartVisible(c.LeftSidebars),
                    rightSidebar: gDesigner.isPartVisible(c.RightSidebars),
                };
            }),
            (h.prototype.toString = function () {
                return "[Object GToggleFullscreenAction]";
            }),
            (module.exports = h));
    };
