module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            a = _interopRequireDefault(require(1339 /* GPageProperties */)),
            r = _interopRequireDefault(require(31)),
            s = _interopRequireDefault(require(18 /* GCategory */));
        function l() {}
        (GObject.GObject.inherit(l, r.default),
            (l.ID = "view.fast-view"),
            (l.TITLE = new GObject.GLocaleKey("GFastViewAction", "title")),
            (l.GroupID = "view"),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return GObject.GLocale.get(l.TITLE);
            }),
            (l.prototype.getCategory = function () {
                return s.default.CATEGORY_VIEW;
            }),
            (l.prototype.getGroup = function () {
                return l.GroupID;
            }),
            (l.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (l.prototype.isCheckable = function () {
                return true;
            }),
            (l.prototype.isChecked = function () {
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getActiveWindow();
                if (t) {
                    var n = t.getView().getViewConfiguration();
                    return !!n && n.paintMode === GObject.GScenePaintConfiguration.PaintMode.Fast;
                }
                return false;
            }),
            (l.prototype.execute = function () {
                var e,
                    t = gDesigner.getActiveDocument().getActiveWindow().getView().getViewConfiguration();
                if (t.paintMode === GObject.GScenePaintConfiguration.PaintMode.Fast) {
                    var n = gDesigner.getActiveDocument().getScene().getActivePage();
                    if (((t.defaultEffectDetailLevel = null), n && !n.isFixedSized())) e = GObject.GScenePaintConfiguration.PaintMode.Full;
                    else
                        e =
                            (n.getProperty(a.default.CLIP_PROPERTY_NAME, true) || a.default.CLIP_CONTENT_ENABLED) ===
                            a.default.CLIP_CONTENT_ENABLED
                                ? GObject.GScenePaintConfiguration.PaintMode.Output
                                : GObject.GScenePaintConfiguration.PaintMode.Full;
                } else
                    ((t.defaultEffectDetailLevel = 0.5 / GObject.GPaintCanvas.getScreenDPI()), (e = GObject.GScenePaintConfiguration.PaintMode.Fast));
                (gDesigner.setPaintMode(e), gDesigner.updateGEditorSceneConfigurationPaintMode(e));
            }),
            (l.prototype.toString = function () {
                return "[GAction GFastViewAction]";
            }),
            (module.exports = l));
    };
