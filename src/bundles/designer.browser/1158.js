module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GAction = require(31),
            GCategory = require(18);
        function r() {}
        (GObject.GObject.inherit(r, GAction),
            (r.ID = "help.purchase"),
            (r.TITLE = new GObject.GLocaleKey("GPurchaseProAction", "title")),
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
            (r.prototype.isVisible = function () {
                if (!gDesigner.isInAppPurchaseAllowed()) return false;
                var e = gDesigner.getLicense();
                return !(gDesigner.isAnonymous() || (e.isPro() && !e.isExpired()));
            }),
            (r.prototype.isEnabled = function () {
                var e = gDesigner.getLicense();
                return !(e.isPro() && !e.isExpired());
            }),
            (r.prototype.execute = function () {
                gDesigner.openPaymentDialog();
            }),
            (r.prototype.getStyleClass = function () {
                return "purchase-pro-menu-item";
            }),
            (r.prototype.noHover = function () {
                return true;
            }),
            (r.prototype.toString = function () {
                return "[GObject GPurchaseProAction]";
            }),
            (module.exports = r));
    };
