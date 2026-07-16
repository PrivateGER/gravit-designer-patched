module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(3));
        var GObject = require(1),
            i = require(31),
            GCategory = require(18);
        const GSystemDialog = require(44),
            GCommonNames = require(119);
        function l() {}
        (GObject.GObject.inherit(l, i),
            (l.ID = "use-coupon-action"),
            (l.TITLE = new GObject.GLocaleKey("GUseCouponAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP;
            }),
            (l.prototype.getGroup = function () {
                return "help";
            }),
            (l.prototype.isVisible = function () {
                if (!gDesigner.isInAppPurchaseAllowed()) return false;
                const e = gDesigner.getLicense(),
                    t = !(e.isPro() && !e.isExpired()),
                    n = !gDesigner.isAnonymous(),
                    o = !e.isGuest();
                return t && n && o;
            }),
            (l.prototype.execute = function () {
                GSystemDialog.prompt(GObject.GLocale.get(new GObject.GLocaleKey("GUseCouponAction", "text.hava-coupon")), async (e) => {
                    if (e) return GCommonNames.activateCoupon(e);
                    GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GUseCouponAction", "text.invalid-coupon")));
                });
            }),
            (l.prototype.toString = function () {
                return "[Object GUseCouponAction]";
            }),
            (module.exports = l));
    };
