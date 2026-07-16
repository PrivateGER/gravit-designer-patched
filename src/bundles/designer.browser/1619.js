module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "view.canvas.show-effects"),
            (s.TITLE = new GObject.GLocaleKey("GShowEffectsAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_CANVAS;
            }),
            (s.prototype.getGroup = function () {
                return "show/canvas";
            }),
            (s.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (s.prototype.isCheckable = function () {
                return true;
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "E"];
            }),
            (s.prototype.isChecked = function () {
                var e = gDesigner.getWindows().getActiveWindow();
                return !!e && !e.getView().getViewConfiguration().ignoreEffects;
            }),
            (s.prototype.execute = function () {
                var e = gDesigner.getWindows().getActiveWindow();
                if (!e) return false;
                var t = e.getView();
                ((t.getViewConfiguration().ignoreEffects = !t.getViewConfiguration().ignoreEffects), t.invalidateAndResetCache(null));
            }),
            (s.prototype.toString = function () {
                return "[Object GShowEffectsAction]";
            }),
            (module.exports = s));
    };
