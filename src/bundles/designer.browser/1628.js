module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        const GCategory = require(18),
            GAction = require(31);
        function r() {}
        (GObject.GObject.inherit(r, GAction),
            (r.ID = "file.share"),
            (r.TITLE = new GObject.GLocaleKey("GShareAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE_SHARE;
            }),
            (r.prototype.getGroup = function () {
                return "file-share/share";
            }),
            (r.prototype.isEnabled = function () {
                return gDesigner.getApplicationManager().isShareEnabled();
            }),
            // The sharing/collaboration service is gone; hide the whole
            // File > Share submenu (see also GOpenSharedFileAction).
            (r.prototype.isAvailable = function () {
                return false;
            }),
            (r.prototype.isVisible = function () {
                return false;
            }),
            (r.prototype.execute = function () {
                gDesigner.getShareManager().share();
            }),
            (r.prototype.toString = function () {
                return "[Object GShareAction]";
            }),
            (module.exports = r));
    };
