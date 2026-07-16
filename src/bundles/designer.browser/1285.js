module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "view.canvas.show-grid"),
            (s.TITLE = new GObject.GLocaleKey("GShowGridAction", "title")),
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
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "G"];
            }),
            (s.prototype.isEnabled = function () {
                return !!gDesigner.getActiveDocument();
            }),
            (s.prototype.isCheckable = function () {
                return true;
            }),
            (s.prototype.isChecked = function () {
                var e = gDesigner.getActiveDocument();
                return !!e && !!e.getScene().getProperty("gm");
            }),
            (s.prototype.execute = function () {
                var e = gDesigner.getActiveDocument().getScene();
                e.getProperty("gm") ? e.setProperty("gm", null) : e.setProperty("gm", e.getProperty("lgm") || GObject.GScene.GridMode.Boxed);
            }),
            (s.prototype.toString = function () {
                return "[Object GShowGridAction]";
            }),
            (module.exports = s));
    };
