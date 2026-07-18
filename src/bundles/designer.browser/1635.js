module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        const GCategory = require(18),
            GAction = require(31);
        function r() {}
        (GObject.GObject.inherit(r, GAction),
            (r.ID = "account.open"),
            (r.TITLE = new GObject.GLocaleKey("GOpenAccountSettingsAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_ACCOUNT;
            }),
            (r.prototype.getGroup = function () {
                return "account";
            }),
            (r.prototype.execute = function () {
                gDesigner.runDeepLink("account");
            }),
            // The account service is gone; hide alongside the header avatar.
            (r.prototype.isAvailable = function () {
                return false;
            }),
            (r.prototype.isVisible = function () {
                return false;
            }),
            (r.prototype.toString = function () {
                return "[Object GOpenAccountSettingsAction]";
            }),
            (module.exports = r));
    };
