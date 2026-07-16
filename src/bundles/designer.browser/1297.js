module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            r = _interopRequireDefault(require(18 /* GCategory */)),
            s = _interopRequireDefault(require(31)),
            l = _interopRequireDefault(require(442));
        function c() {}
        (GObject.GObject.inherit(c, s.default),
            (c.ID = "view.outline-view"),
            (c.TITLE = new GObject.GLocaleKey("GOutlineViewAction", "title")),
            (c.GroupID = "view"),
            (c.StoragePropertyName = "designer.settings.outline-view.enabled"),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return GObject.GLocale.get(c.TITLE);
            }),
            (c.prototype.getCategory = function () {
                return r.default.CATEGORY_VIEW;
            }),
            (c.prototype.getGroup = function () {
                return c.GroupID;
            }),
            (c.prototype.isCheckable = function () {
                return true;
            }),
            (c.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-out-line" : null;
            }),
            (c.prototype.isChecked = function () {
                const e = gDesigner.getWindows().getActiveWindow();
                if (e) {
                    const t = e.getView().getViewConfiguration();
                    return !!t && t.paintMode === GObject.GScenePaintConfiguration.PaintMode.Outline;
                }
                return false;
            }),
            (c.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (c.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, "Y"];
            }),
            (c.prototype.execute = function () {
                let e;
                if (
                    gDesigner.getWindows().getActiveWindow().getView().getViewConfiguration().paintMode ===
                    GObject.GScenePaintConfiguration.PaintMode.Outline
                ) {
                    var t = gDesigner.getActiveDocument();
                    if (t) {
                        var n = t.getScene().getActivePage();
                        if (n && !n.isFixedSized()) e = GObject.GScenePaintConfiguration.PaintMode.Full;
                        else
                            e =
                                (n.getProperty(l.default.PAGE_CLIP_PROPERTY_NAME, true) || l.default.PAGE_CLIP_CONTENT_ENABLED) ===
                                l.default.PAGE_CLIP_CONTENT_ENABLED
                                    ? GObject.GScenePaintConfiguration.PaintMode.Output
                                    : GObject.GScenePaintConfiguration.PaintMode.Full;
                    } else e = GObject.GScenePaintConfiguration.PaintMode.Output;
                } else e = GObject.GScenePaintConfiguration.PaintMode.Outline;
                (gDesigner.setPaintMode(e), gDesigner.updateGEditorSceneConfigurationPaintMode(e));
            }),
            (c.prototype.toString = function () {
                return "[Object GOutlineViewAction]";
            }),
            (module.exports = c));
    };
