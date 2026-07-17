module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var editorModule = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        function GZoomOutAction() {
            GZoomOutAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GZoomOutAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GZoomOutAction", "tooltip-description")),
                    shortcut: GZoomOutAction.SHORTCUT,
                }),
            };
        }
        (GObject.GObject.inherit(GZoomOutAction, GAction),
            (GZoomOutAction.ID = "zoom.out"),
            (GZoomOutAction.TITLE = new GObject.GLocaleKey("GZoomOutAction", "title")),
            (GZoomOutAction.ZOOM_STEP = 2),
            (GZoomOutAction.SHORTCUT = [GPlatform.GKey.Constant.META, "-"]),
            (GZoomOutAction.TOOLTIP_CONFIG = null),
            (GZoomOutAction.prototype.getId = function () {
                return GZoomOutAction.ID;
            }),
            (GZoomOutAction.prototype.getTitle = function () {
                return GZoomOutAction.TITLE;
            }),
            (GZoomOutAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_MAGNIFICATION;
            }),
            (GZoomOutAction.prototype.getGroup = function () {
                return "zoom/magnification";
            }),
            (GZoomOutAction.prototype.getShortcut = function () {
                return GZoomOutAction.SHORTCUT;
            }),
            (GZoomOutAction.prototype.isShortcutGlobal = function () {
                return true;
            }),
            (GZoomOutAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-zoom-out" : null;
            }),
            (GZoomOutAction.prototype.isEnabled = function () {
                var activeWindow = gDesigner.getWindows().getActiveWindow(),
                    view = activeWindow ? activeWindow.getView() : null;
                return view && view.getZoom() > GPlatform.GSceneWidget.options.minZoomFactor;
            }),
            (GZoomOutAction.prototype.execute = function () {
                var view = gDesigner.getWindows().getActiveWindow().getView(),
                    targetZoom = null;
                if (editorModule.GZoomTool.options.zoomLevels) {
                    for (var zoomLevels = editorModule.GZoomTool.options.zoomLevels, currentZoom = view.getZoom(), r = (zoomLevels.length, 0); r < zoomLevels.length; r++)
                        if ((currentZoom > zoomLevels[r] && (targetZoom = zoomLevels[r]), currentZoom === zoomLevels[r])) {
                            targetZoom = r > 0 ? zoomLevels[r - 1] : GPlatform.GSceneWidget.options.minZoomFactor;
                            break;
                        }
                } else targetZoom = view.getZoom() / GZoomOutAction.ZOOM_STEP;
                gDesigner.zoomAtViewCenter(view, targetZoom);
            }),
            (GZoomOutAction.prototype.getTooltipConfig = function (area) {
                return (area && GZoomOutAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GZoomOutAction.prototype.toString = function () {
                return "[Object GZoomOutAction]";
            }),
            (module.exports = GZoomOutAction));
    };
