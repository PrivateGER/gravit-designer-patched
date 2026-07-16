module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GCategory = require(18),
            a = require(31);
        function r() {}
        (GObject.GObject.inherit(r, a),
            (r.ID = "view.canvas.show-slices"),
            (r.TITLE = new GObject.GLocaleKey("GShowSlicesAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_CANVAS;
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
                    return !!t && true === t.slices;
                }
                return false;
            }),
            (r.prototype.execute = function () {
                var e = gDesigner.getWindows().getActiveWindow().getView();
                ((e.getViewConfiguration().slices = !e.getViewConfiguration().slices), e.invalidateAndResetCache(null));
            }),
            (r.prototype.toString = function () {
                return "[Object GShowSlicesAction]";
            }),
            (module.exports = r));
    };
