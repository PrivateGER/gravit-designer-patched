module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(31);
        function GFitAllAction() {
            GFitAllAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GFitAllAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GFitAllAction", "tooltip-description")),
                    shortcut: GFitAllAction.SHORTCUT,
                }),
            };
        }
        (GObject.GObject.inherit(GFitAllAction, GAction),
            (GFitAllAction.ID = "view.zoom.fit.all"),
            (GFitAllAction.TITLE = new GObject.GLocaleKey("GFitAllAction", "title")),
            (GFitAllAction.SHORTCUT = [GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.META, "0"]),
            (GFitAllAction.TOOLTIP_CONFIG = null),
            (GFitAllAction.prototype.getId = function () {
                return GFitAllAction.ID;
            }),
            (GFitAllAction.prototype.getTitle = function () {
                return GFitAllAction.TITLE;
            }),
            (GFitAllAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (GFitAllAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-fit-all" : null;
            }),
            (GFitAllAction.prototype.getGroup = function () {
                return "zoom";
            }),
            (GFitAllAction.prototype.getShortcut = function () {
                return GFitAllAction.SHORTCUT;
            }),
            (GFitAllAction.prototype.isEnabled = function () {
                var activeDocument = gDesigner.getActiveDocument(),
                    paintBBox = (activeDocument && activeDocument.getScene() && activeDocument.getScene().getPaintBBox()) || null;
                return paintBBox && !paintBBox.isEmpty();
            }),
            (GFitAllAction.prototype.execute = function () {
                var boundingBox,
                    activeDocument = gDesigner.getActiveDocument(),
                    scene = activeDocument.getScene(),
                    multiPageView = activeDocument.getActiveWindow().getView().getViewConfiguration().multiPageView;
                if (scene.isFixedSized() && !multiPageView) {
                    var activePage = scene.getActivePage();
                    boundingBox = new GObject.GRect(0, 0, activePage.getProperty("w"), activePage.getProperty("h"));
                } else boundingBox = scene.getPaintBBox(multiPageView);
                boundingBox && !boundingBox.isEmpty() && activeDocument.getActiveWindow().getView().zoomAll(boundingBox, false);
            }),
            (GFitAllAction.prototype.getTooltipConfig = function (area) {
                return (area && GFitAllAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GFitAllAction.prototype.toString = function () {
                return "[Object GFitAllAction]";
            }),
            (module.exports = GFitAllAction));
    };
