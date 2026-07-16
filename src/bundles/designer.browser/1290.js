module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var o = require(53),
            GObject = require(1),
            GPlatform = require(15),
            r = require(67),
            GCategory = require(18),
            l = require(31);
        function c() {
            c.TOOLTIP_CONFIG = {
                [r.TOOLTIP_AREA.TOOLBAR]: r.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GZoomInAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GZoomInAction", "tooltip-description")),
                    shortcut: c.SHORTCUT,
                }),
            };
        }
        (GObject.GObject.inherit(c, l),
            (c.ID = "view.zoom.in"),
            (c.TITLE = new GObject.GLocaleKey("GZoomInAction", "title")),
            (c.ZOOM_STEP = 2),
            (c.SHORTCUT = [GPlatform.GKey.Constant.META, "+"]),
            (c.TOOLTIP_CONFIG = null),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return c.TITLE;
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_MAGNIFICATION;
            }),
            (c.prototype.getGroup = function () {
                return "zoom/magnification";
            }),
            (c.prototype.getShortcut = function () {
                return c.SHORTCUT;
            }),
            (c.prototype.isShortcutGlobal = function () {
                return true;
            }),
            (c.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-zoom-in" : null;
            }),
            (c.prototype.isEnabled = function () {
                var e = gDesigner.getWindows().getActiveWindow(),
                    t = e ? e.getView() : null;
                return t && t.getZoom() < GPlatform.GSceneWidget.options.maxZoomFactor;
            }),
            (c.prototype.execute = function () {
                var e = gDesigner.getWindows().getActiveWindow().getView(),
                    t = null;
                if (o.GZoomTool.options.zoomLevels) {
                    for (var n = o.GZoomTool.options.zoomLevels, i = e.getZoom(), r = n.length - 1, s = 0; s < n.length; s++)
                        if ((i < n[r - s] && (t = n[r - s]), i === n[s])) {
                            t = r > 0 ? n[s + 1] : GPlatform.GSceneWidget.options.maxZoomFactor;
                            break;
                        }
                } else t = e.getZoom() * c.ZOOM_STEP;
                gDesigner.zoomAtViewCenter(e, t);
            }),
            (c.prototype.getTooltipConfig = function (e) {
                return (e && c.TOOLTIP_CONFIG[e]) || null;
            }),
            (c.prototype.toString = function () {
                return "[Object GZoomInAction]";
            }),
            (module.exports = c));
    };
