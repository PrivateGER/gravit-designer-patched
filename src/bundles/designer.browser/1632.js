module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GAction = require(31),
            GCategory = require(18),
            GContainer = require(85);
        function l() {}
        (GObject.GObject.inherit(l, GAction),
            (l.ID = "file.quit"),
            (l.TITLE = new GObject.GLocaleKey("GQuitAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (l.prototype.getGroup = function () {
                return "file-quit";
            }),
            (l.prototype.isEnabled = function () {
                return gContainer.getRuntime() !== GContainer.Runtime.Browser && gContainer.getRuntime() !== GContainer.Runtime.PWA;
            }),
            (l.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "Q"];
            }),
            (l.prototype.isAvailable = function () {
                return gContainer.getRuntime() !== GContainer.Runtime.Browser && gContainer.getRuntime() !== GContainer.Runtime.PWA;
            }),
            (l.prototype.execute = function () {
                gContainer.triggerClose();
            }),
            (l.prototype.toString = function () {
                return "[Object GQuitAction]";
            }),
            (module.exports = l));
    };
