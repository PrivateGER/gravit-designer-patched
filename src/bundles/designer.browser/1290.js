module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var editorModule = require(53),
            GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        function GZoomInAction() {
            GZoomInAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GZoomInAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GZoomInAction", "tooltip-description")),
                    shortcut: GZoomInAction.SHORTCUT,
                }),
            };
        }
        (GObject.GObject.inherit(GZoomInAction, GAction),
            (GZoomInAction.ID = "view.zoom.in"),
            (GZoomInAction.TITLE = new GObject.GLocaleKey("GZoomInAction", "title")),
            (GZoomInAction.ZOOM_STEP = 2),
            (GZoomInAction.SHORTCUT = [GPlatform.GKey.Constant.META, "+"]),
            (GZoomInAction.TOOLTIP_CONFIG = null),
            (GZoomInAction.prototype.getId = function () {
                return GZoomInAction.ID;
            }),
            (GZoomInAction.prototype.getTitle = function () {
                return GZoomInAction.TITLE;
            }),
            (GZoomInAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_MAGNIFICATION;
            }),
            (GZoomInAction.prototype.getGroup = function () {
                return "zoom/magnification";
            }),
            (GZoomInAction.prototype.getShortcut = function () {
                return GZoomInAction.SHORTCUT;
            }),
            (GZoomInAction.prototype.isShortcutGlobal = function () {
                return true;
            }),
            (GZoomInAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-zoom-in" : null;
            }),
            (GZoomInAction.prototype.isEnabled = function () {
                var activeWindow = gDesigner.getWindows().getActiveWindow(),
                    view = activeWindow ? activeWindow.getView() : null;
                return view && view.getZoom() < GPlatform.GSceneWidget.options.maxZoomFactor;
            }),
            (GZoomInAction.prototype.execute = function () {
                var view = gDesigner.getWindows().getActiveWindow().getView(),
                    targetZoom = null;
                if (editorModule.GZoomTool.options.zoomLevels) {
                    for (var zoomLevels = editorModule.GZoomTool.options.zoomLevels, currentZoom = view.getZoom(), lastIndex = zoomLevels.length - 1, s = 0; s < zoomLevels.length; s++)
                        if ((currentZoom < zoomLevels[lastIndex - s] && (targetZoom = zoomLevels[lastIndex - s]), currentZoom === zoomLevels[s])) {
                            targetZoom = lastIndex > 0 ? zoomLevels[s + 1] : GPlatform.GSceneWidget.options.maxZoomFactor;
                            break;
                        }
                } else targetZoom = view.getZoom() * GZoomInAction.ZOOM_STEP;
                gDesigner.zoomAtViewCenter(view, targetZoom);
            }),
            (GZoomInAction.prototype.getTooltipConfig = function (area) {
                return (area && GZoomInAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GZoomInAction.prototype.toString = function () {
                return "[Object GZoomInAction]";
            }),
            (module.exports = GZoomInAction));
    };
