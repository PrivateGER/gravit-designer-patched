module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GCategory = require(18),
            GAction = require(31);
        function r() {}
        (GObject.GObject.inherit(r, GAction),
            (r.ID = "file.save-all"),
            (r.TITLE = new GObject.GLocaleKey("GSaveAllAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (r.prototype.getGroup = function () {
                return "file";
            }),
            (r.prototype.isAvailable = function (e) {
                return false;
            }),
            (r.prototype.isEnabled = function () {
                return false;
            }),
            (r.prototype.execute = function () {
                for (var e = gDesigner.getDocuments(), t = 0; t < e.length; ++t) e[t].isModified() && e[t].save();
            }),
            (r.prototype.toString = function () {
                return "[Object GSaveAllAction]";
            }),
            (module.exports = r));
    };
