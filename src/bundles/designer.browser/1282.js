module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31);
        function s() {}
        (GObject.GObject.inherit(s, GAction),
            (s.ID = "view.zoom.original"),
            (s.TITLE = new GObject.GLocaleKey("GOriginalViewAction", "title")),
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
                return "zoom";
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "0"];
            }),
            (s.prototype.isEnabled = function () {
                return !!gDesigner.getActiveDocument();
            }),
            (s.prototype.execute = function () {
                var e,
                    t = gDesigner.getActiveDocument(),
                    n = t.getActiveWindow().getView().getViewConfiguration().multiPageView,
                    i = t.getScene();
                if (i.isFixedSized()) {
                    var a = i.getActivePage();
                    if (((e = new GObject.GRect(0, 0, a.getProperty("w"), a.getProperty("h"))), n)) {
                        var r = a.getPosition(true);
                        r && (e = e.translated(r.getX(), r.getY()));
                    }
                } else e = i.getPaintBBox(n);
                e && !e.isEmpty() && t.getActiveWindow().getView().zoomAtCenter(e.getSide(GObject.GRect.Side.CENTER), 1);
            }),
            (s.prototype.toString = function () {
                return "[Object GOriginalViewAction]";
            }),
            (module.exports = s));
    };
