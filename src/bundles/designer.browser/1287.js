module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            GCategory = require(18),
            GAction = require(31);
        require(173);
        function r(e, t) {
            ((this._guideId = e), (this._guideName = t));
        }
        (GObject.GObject.inherit(r, GAction),
            (r.ID = "view.toggle-guide"),
            (r.prototype._guideId = null),
            (r.prototype._guideName = false),
            (r.prototype.getId = function () {
                return r.ID + "." + this._guideId;
            }),
            (r.prototype.getTitle = function () {
                return GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.snap-to-action")).replace("%action", this._guideName);
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_VIEW_SNAP;
            }),
            (r.prototype.getGroup = function () {
                return "snap/guide";
            }),
            (r.prototype.isCheckable = function () {
                return true;
            }),
            (r.prototype.isEnabled = function () {
                return !gDesigner.getSetting("snap_disabled");
            }),
            (r.prototype.isChecked = function () {
                return gDesigner.getSetting("snap_guides").indexOf(this._guideId) >= 0;
            }),
            (r.prototype.execute = function () {
                var e = gDesigner.getSetting("snap_guides").slice(),
                    t = e.indexOf(this._guideId);
                (t >= 0 ? e.splice(t, 1) : e.push(this._guideId), gDesigner.setSetting("snap_guides", e));
            }),
            (r.prototype.toString = function () {
                return "[Object GToggleGuideAction]";
            }),
            (module.exports = r));
    };
