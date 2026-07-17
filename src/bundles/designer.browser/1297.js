module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GSceneProperties = _interopRequireDefault(require(442));
        function GOutlineViewAction() {}
        (GObject.GObject.inherit(GOutlineViewAction, GAction.default),
            (GOutlineViewAction.ID = "view.outline-view"),
            (GOutlineViewAction.TITLE = new GObject.GLocaleKey("GOutlineViewAction", "title")),
            (GOutlineViewAction.GroupID = "view"),
            (GOutlineViewAction.StoragePropertyName = "designer.settings.outline-view.enabled"),
            (GOutlineViewAction.prototype.getId = function () {
                return GOutlineViewAction.ID;
            }),
            (GOutlineViewAction.prototype.getTitle = function () {
                return GObject.GLocale.get(GOutlineViewAction.TITLE);
            }),
            (GOutlineViewAction.prototype.getCategory = function () {
                return GCategory.default.CATEGORY_VIEW;
            }),
            (GOutlineViewAction.prototype.getGroup = function () {
                return GOutlineViewAction.GroupID;
            }),
            (GOutlineViewAction.prototype.isCheckable = function () {
                return true;
            }),
            (GOutlineViewAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-out-line" : null;
            }),
            (GOutlineViewAction.prototype.isChecked = function () {
                const window = gDesigner.getWindows().getActiveWindow();
                if (window) {
                    const viewConfiguration = window.getView().getViewConfiguration();
                    return !!viewConfiguration && viewConfiguration.paintMode === GObject.GScenePaintConfiguration.PaintMode.Outline;
                }
                return false;
            }),
            (GOutlineViewAction.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (GOutlineViewAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, "Y"];
            }),
            (GOutlineViewAction.prototype.execute = function () {
                let paintMode;
                if (
                    gDesigner.getWindows().getActiveWindow().getView().getViewConfiguration().paintMode ===
                    GObject.GScenePaintConfiguration.PaintMode.Outline
                ) {
                    var document = gDesigner.getActiveDocument();
                    if (document) {
                        var page = document.getScene().getActivePage();
                        if (page && !page.isFixedSized()) paintMode = GObject.GScenePaintConfiguration.PaintMode.Full;
                        else
                            paintMode =
                                (page.getProperty(GSceneProperties.default.PAGE_CLIP_PROPERTY_NAME, true) || GSceneProperties.default.PAGE_CLIP_CONTENT_ENABLED) ===
                                GSceneProperties.default.PAGE_CLIP_CONTENT_ENABLED
                                    ? GObject.GScenePaintConfiguration.PaintMode.Output
                                    : GObject.GScenePaintConfiguration.PaintMode.Full;
                    } else paintMode = GObject.GScenePaintConfiguration.PaintMode.Output;
                } else paintMode = GObject.GScenePaintConfiguration.PaintMode.Outline;
                (gDesigner.setPaintMode(paintMode), gDesigner.updateGEditorSceneConfigurationPaintMode(paintMode));
            }),
            (GOutlineViewAction.prototype.toString = function () {
                return "[Object GOutlineViewAction]";
            }),
            (module.exports = GOutlineViewAction));
    };
