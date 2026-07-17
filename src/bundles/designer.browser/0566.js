module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GCategory = require(18),
            GAction = require(31);
        function r() {}
        (GObject.GObject.inherit(r, GAction),
            (r.ID = "view.zoom.fit-selection"),
            (r.TITLE = new GObject.GLocaleKey("GFitSelectionAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW;
            }),
            (r.prototype.getGroup = function () {
                return "zoom";
            }),
            (r.prototype.isEnabled = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e ? e.getEditor() : null;
                return t && t.hasSelection();
            }),
            (r.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = (e ? e.getEditor() : null).getSelectionBBox();
                t && !t.isEmpty() && e.getActiveWindow().getView().zoomAll(t, false, true);
            }),
            (r.prototype.toString = function () {
                return "[Object GFitSelectionAction]";
            }),
            (module.exports = r));
    };
