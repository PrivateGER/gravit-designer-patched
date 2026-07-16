module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GCategory = require(18),
            a = require(31);
        function r() {}
        (GObject.GObject.inherit(r, a),
            (r.ID = "file.open-recent"),
            (r.TITLE = new GObject.GLocaleKey("GOpenRecentAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE_OPEN_RECENT;
            }),
            (r.prototype.getGroup = function () {
                return "file-open/open-recent";
            }),
            (r.prototype.isEnabled = function (e) {
                return false;
            }),
            (r.prototype.execute = function () {}),
            (r.prototype.toString = function () {
                return "[Object GOpenRecentAction]";
            }),
            (module.exports = r));
    };
