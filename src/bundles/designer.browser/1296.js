module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31);
        function s() {}
        (GObject.GObject.inherit(s, GAction),
            (s.ID = "view.clone"),
            (s.TITLE = new GObject.GLocaleKey("GNewWindowAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (s.prototype.getGroup = function () {
                return "view";
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "N"];
            }),
            (s.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (s.prototype.execute = function () {
                gDesigner.getWindows().addWindow(gDesigner.getWindows().getActiveWindow());
            }),
            (s.prototype.toString = function () {
                return "[Object GNewWindowAction]";
            }),
            (module.exports = s));
    };
