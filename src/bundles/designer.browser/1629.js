module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(8 /* Symbol */), require(3));
        var GObject = require(1),
            a = o(require(443));
        const { isExecutingOnMSTeamsSync } = a.default;
        var GCategory = require(18),
            l = require(31);
        const c = require(1152),
            GSystemDialog = require(44);
        function u() {}
        (GObject.GObject.inherit(u, l),
            (u.ID = "file.sharepoint-checkout"),
            (u.TITLE = new GObject.GLocaleKey("GSharePointCheckOutAction", "title")),
            (u.prototype.getId = function () {
                return u.ID;
            }),
            (u.prototype.getTitle = function () {
                return u.TITLE;
            }),
            (u.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (u.prototype.getGroup = function () {
                return "file";
            }),
            (u.prototype.isEnabled = function () {
                if (!isExecutingOnMSTeamsSync()) return false;
                const e = gDesigner.getActiveDocument();
                if (!e) return false;
                const t = e.getStorageItem();
                return !!t && t instanceof c.Item;
            }),
            (u.prototype.isVisible = function () {
                return this.isEnabled();
            }),
            (u.prototype.execute = async function () {
                try {
                    const e = gDesigner.getActiveDocument().getStorageItem();
                    if ((await e.refreshCheckOutStatus(), e.isCheckedOutByMe()))
                        return GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GSharePointCheckOutAction", "text.already-checkout")));
                    (await e.checkOut(), GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GSharePointCheckOutAction", "text.successul-checkout"))));
                } catch (e) {
                    GSystemDialog.alert(e.message);
                }
            }),
            (u.prototype.toString = function () {
                return "[Object GSharePointCheckOutAction]";
            }),
            (module.exports = u));
    };
