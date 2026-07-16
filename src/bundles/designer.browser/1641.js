module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        const GCategory = require(18),
            a = require(31);
        var r = require(219),
            s = require(85);
        const { IS_TRUNK, IS_LOCALHOST, IS_BETA } = require(231 /* IS_TRUNK */);
        function u(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            ((this._serverName = e), (this._isDefault = !!t));
        }
        (GObject.GObject.inherit(u, a),
            (u.ID = "help.switchwebcdr"),
            (u.TITLE = new GObject.GLocaleKey("GSwitchWebcdrAction", "title")),
            (u.prototype.getId = function () {
                return u.ID + "." + this._serverName;
            }),
            (u.prototype.isCheckable = function () {
                return true;
            }),
            (u.prototype.isChecked = function () {
                let e = gDesigner.getSetting("webcdr_choice");
                return (!!e && e === this._serverName) || (!e && this._isDefault);
            }),
            (u.prototype.getTitle = function () {
                return this._serverName;
            }),
            (u.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP_SWITCHWEBCDR;
            }),
            (u.prototype.getGroup = function () {
                return "help/switchwebcdr";
            }),
            (u.prototype.isEnabled = function () {
                return true;
            }),
            (u.prototype.isVisible = function () {
                return !!(IS_TRUNK || IS_BETA || IS_LOCALHOST);
            }),
            (u.prototype.execute = function () {
                (gDesigner.setSetting("webcdr_choice", this._serverName), this._reloadApp());
            }),
            (u.prototype._reloadApp = function () {
                gContainer.getRuntime() === s.Runtime.Browser || gContainer.getRuntime() === s.Runtime.PWA
                    ? location.reload()
                    : new r(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.restart-app"))).open();
            }),
            (u.prototype.toString = function () {
                return "[Object GSwitchWebcdrAction]";
            }),
            (module.exports = u));
    };
