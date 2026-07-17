module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            GPageProperties = _interopRequireDefault(require(1339 /* GPageProperties */)),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GCategory = _interopRequireDefault(require(18 /* GCategory */));
        function GFastViewAction() {}
        (GObject.GObject.inherit(GFastViewAction, GAction.default),
            (GFastViewAction.ID = "view.fast-view"),
            (GFastViewAction.TITLE = new GObject.GLocaleKey("GFastViewAction", "title")),
            (GFastViewAction.GroupID = "view"),
            (GFastViewAction.prototype.getId = function () {
                return GFastViewAction.ID;
            }),
            (GFastViewAction.prototype.getTitle = function () {
                return GObject.GLocale.get(GFastViewAction.TITLE);
            }),
            (GFastViewAction.prototype.getCategory = function () {
                return GCategory.default.CATEGORY_VIEW;
            }),
            (GFastViewAction.prototype.getGroup = function () {
                return GFastViewAction.GroupID;
            }),
            (GFastViewAction.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (GFastViewAction.prototype.isCheckable = function () {
                return true;
            }),
            (GFastViewAction.prototype.isChecked = function () {
                const activeDocument = gDesigner.getActiveDocument(),
                    activeWindow = activeDocument && activeDocument.getActiveWindow();
                if (activeWindow) {
                    var viewConfiguration = activeWindow.getView().getViewConfiguration();
                    return !!viewConfiguration && viewConfiguration.paintMode === GObject.GScenePaintConfiguration.PaintMode.Fast;
                }
                return false;
            }),
            (GFastViewAction.prototype.execute = function () {
                var paintMode,
                    viewConfiguration = gDesigner.getActiveDocument().getActiveWindow().getView().getViewConfiguration();
                if (viewConfiguration.paintMode === GObject.GScenePaintConfiguration.PaintMode.Fast) {
                    var activePage = gDesigner.getActiveDocument().getScene().getActivePage();
                    if (((viewConfiguration.defaultEffectDetailLevel = null), activePage && !activePage.isFixedSized())) paintMode = GObject.GScenePaintConfiguration.PaintMode.Full;
                    else
                        paintMode =
                            (activePage.getProperty(GPageProperties.default.CLIP_PROPERTY_NAME, true) || GPageProperties.default.CLIP_CONTENT_ENABLED) ===
                            GPageProperties.default.CLIP_CONTENT_ENABLED
                                ? GObject.GScenePaintConfiguration.PaintMode.Output
                                : GObject.GScenePaintConfiguration.PaintMode.Full;
                } else
                    ((viewConfiguration.defaultEffectDetailLevel = 0.5 / GObject.GPaintCanvas.getScreenDPI()), (paintMode = GObject.GScenePaintConfiguration.PaintMode.Fast));
                (gDesigner.setPaintMode(paintMode), gDesigner.updateGEditorSceneConfigurationPaintMode(paintMode));
            }),
            (GFastViewAction.prototype.toString = function () {
                return "[GAction GFastViewAction]";
            }),
            (module.exports = GFastViewAction));
    };
