module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(527), require(3));
        var GObject = require(1),
            i = require(31),
            GCategory = require(18);
        const { gApi: r } = require(10 /* designerConfig */);
        var s = require(337);
        function l() {}
        (GObject.GObject.inherit(l, i),
            (l.ID = "toggle-pro-beta-license"),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                const e = gDesigner.getLicense();
                return e.isPro() && !e.isExpired() ? "Switch to Basic License" : "Switch to PRO License";
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP;
            }),
            (l.prototype.getGroup = function () {
                return "help";
            }),
            (l.prototype.isEnabled = function () {
                return gDesigner.isBeta();
            }),
            (l.prototype.isVisible = function () {
                return gDesigner.isBeta();
            }),
            (l.prototype.execute = async function () {
                const e = await r.getUserSettings(),
                    t = (e.flags && e.flags.betaProLicense) || false;
                r.updateUserSettings({ flags: { betaProLicense: !t } }).then(() => {
                    s.checkLicense();
                });
            }),
            (l.prototype.toString = function () {
                return "[Object GToggleProBETALicenseAction]";
            }),
            (module.exports = l));
    };
