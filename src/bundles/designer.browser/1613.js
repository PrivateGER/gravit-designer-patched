module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(3));
        var GObject = require(1),
            GCategory = require(18),
            a = require(31),
            GSettingsDialog = require(1275),
            s = require(1277);
        function l() {}
        (GObject.GObject.inherit(l, a),
            (l.ID = s.ID),
            (l.TITLE = new GObject.GLocaleKey("GSettingsAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT;
            }),
            (l.prototype.getGroup = function () {
                return "settings";
            }),
            (l.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-setting-touch" : "";
            }),
            (l.prototype.execute = async function () {
                new GSettingsDialog().then((e) => e.open());
            }),
            (l.prototype.toString = function () {
                return "[Object GSettingsAction]";
            }),
            (module.exports = l));
    };
