module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = (require(15 /* GPlatform */), require(18 /* GCategory */)),
            GAction = require(31);
        function r() {}
        (GObject.GObject.inherit(r, GAction),
            (r.ID = "view.canvas.show-symbol-labels"),
            (r.TITLE = new GObject.GLocaleKey("GShowSymbolLabelsAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return i.CATEGORY_VIEW_CANVAS;
            }),
            (r.prototype.getGroup = function () {
                return "show/canvas";
            }),
            (r.prototype.isEnabled = function () {
                return !!gDesigner.getWindows().getActiveWindow();
            }),
            (r.prototype.isCheckable = function () {
                return true;
            }),
            (r.prototype.isChecked = function () {
                var e = gDesigner.getWindows().getActiveWindow();
                if (e) {
                    var t = e.getView().getViewConfiguration();
                    return !!t && !!t.symbolLabelsVisible;
                }
                return false;
            }),
            (r.prototype.execute = function () {
                var e = gDesigner.getWindows().getActiveWindow().getView();
                ((e.getViewConfiguration().symbolLabelsVisible = !e.getViewConfiguration().symbolLabelsVisible),
                    e.invalidate(),
                    gDesigner.setSetting("symbol_labels_visible", e.getViewConfiguration().symbolLabelsVisible));
            }),
            (r.prototype.toString = function () {
                return "[Object GShowSymbolLabelsAction]";
            }),
            (module.exports = r));
    };
