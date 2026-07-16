module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            i = require(31),
            GCategory = require(18);
        function r() {}
        (GObject.GObject.inherit(r, i),
            (r.ID = "check-for-updates"),
            (r.TITLE = new GObject.GLocaleKey("GCheckForUpdatesAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP;
            }),
            (r.prototype.getGroup = function () {
                return "help";
            }),
            (r.prototype.isEnabled = function () {
                return true;
            }),
            (r.prototype.execute = function () {
                gDesigner.getSoftwareUpdateManager().checkForUpdates();
            }),
            (r.prototype.toString = function () {
                return "[Object GCheckForUpdatesAction]";
            }),
            (module.exports = r));
    };
