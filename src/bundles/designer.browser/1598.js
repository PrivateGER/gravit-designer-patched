module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GCategory = require(18),
            a = require(31);
        function r() {}
        (GObject.GObject.inherit(r, a),
            (r.ID = "view.zoom.fit-current-layer"),
            (r.TITLE = new GObject.GLocaleKey("GFitCurrentLayerAction", "title")),
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
                    t = e ? e.getScene().getActiveLayer() : null;
                return t && t.getPaintBBox() && !t.getPaintBBox().isEmpty();
            }),
            (r.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e.getScene().getActiveLayer();
                e.getActiveWindow().getView().zoomAll(t.getPaintBBox(), false, true);
            }),
            (r.prototype.toString = function () {
                return "[Object GFitCurrentLayerAction]";
            }),
            (module.exports = r));
    };
