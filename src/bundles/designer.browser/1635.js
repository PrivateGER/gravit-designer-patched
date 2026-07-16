module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        const GCategory = require(18),
            a = require(31);
        function r() {}
        (GObject.GObject.inherit(r, a),
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
            (r.prototype.isVisible = function () {
                const e = gDesigner.getSyncUser();
                return !(e && !e.canUpdateSelfAccountData()) && gDesigner.isTouchEnabled();
            }),
            (r.prototype.toString = function () {
                return "[Object GOpenAccountSettingsAction]";
            }),
            (module.exports = r));
    };
