module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31);
        function s() {}
        (GObject.GObject.inherit(s, GAction),
            (s.ID = "view.canvas.show-guide-lines"),
            (s.TITLE = new GObject.GLocaleKey("GShowGuideLinesAction", "title")),
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
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, ","];
            }),
            (s.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (s.prototype.isCheckable = function () {
                return true;
            }),
            (s.prototype.isChecked = function () {
                var e = gDesigner.getWindows().getActiveWindow();
                if (e) {
                    var t = e.getView().getViewConfiguration();
                    return !!t && true === t.guideLinesVisible;
                }
                return false;
            }),
            (s.prototype.execute = function () {
                var e = gDesigner.getWindows().getActiveWindow().getView();
                ((e.getViewConfiguration().guideLinesVisible = !e.getViewConfiguration().guideLinesVisible),
                    e.invalidate(),
                    gDesigner.setSetting("guide_lines_visible", e.getViewConfiguration().guideLinesVisible));
            }),
            (s.prototype.toString = function () {
                return "[Object GShowGuideLinesAction]";
            }),
            (module.exports = s));
    };
