module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31),
            s = require(1169);
        function l() {}
        (GObject.GObject.inherit(l, GAction),
            (l.ID = "view.canvas.show-rulers"),
            (l.TITLE = new GObject.GLocaleKey("GShowRulersAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_CANVAS;
            }),
            (l.prototype.getGroup = function () {
                return "show/canvas";
            }),
            (l.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.OPTION, "R"];
            }),
            (l.prototype.isEnabled = function () {
                return !(!gDesigner.getWindows().getActiveWindow() || !gDesigner.getWindows().getActiveWindow().getView());
            }),
            (l.prototype.isCheckable = function () {
                return true;
            }),
            (l.prototype.isChecked = function () {
                return (
                    gDesigner.getWindows().getActiveWindow() &&
                    gDesigner.getWindows().getActiveWindow().getView() &&
                    gDesigner.getWindows().getActiveWindow().getView().hasRulers()
                );
            }),
            (l.prototype.execute = function () {
                var e = gDesigner.getWindows().getActiveWindow().getView(),
                    t = !e.hasRulers(),
                    n = gDesigner.getAction(s.ID);
                (t && !n.isChecked() && gDesigner.executeAction(s.ID, void 0, void 0, true),
                    e.setRulers(t),
                    $("#mainframe").toggleClass("rulers", t),
                    gDesigner.setSetting("rulers_visible", t));
            }),
            (l.prototype.toString = function () {
                return "[Object GShowRulersAction]";
            }),
            (module.exports = l));
    };
