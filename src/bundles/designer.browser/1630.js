module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            a = _interopRequireDefault(require(443));
        const { isExecutingOnMSTeamsSync } = a.default;
        var GCategory = require(18),
            l = require(31);
        const c = require(1152),
            GSystemDialog = require(44),
            GFilesPanelViewSharepoint = require(1631),
            p = require(78);
        function g() {}
        (GObject.GObject.inherit(g, l),
            (g.ID = "file.sharepoint-checkin"),
            (g.TITLE = new GObject.GLocaleKey("GSharePointCheckInAction", "title")),
            (g.prototype.getId = function () {
                return g.ID;
            }),
            (g.prototype.getTitle = function () {
                return g.TITLE;
            }),
            (g.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (g.prototype.getGroup = function () {
                return "file";
            }),
            (g.prototype.isEnabled = function () {
                return !!this._isSupported() && gDesigner.getActiveDocument().getStorageItem().isCheckedOutByMe();
            }),
            (g.prototype._isSupported = function () {
                if (!isExecutingOnMSTeamsSync()) return false;
                const e = gDesigner.getActiveDocument();
                if (!e) return false;
                const t = e.getStorageItem();
                return !!t && t instanceof c.Item;
            }),
            (g.prototype.isVisible = function () {
                return this._isSupported();
            }),
            (g.prototype.execute = async function () {
                try {
                    const e = gDesigner.getActiveDocument();
                    if (e.isModified())
                        return void GSystemDialog.alert(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSharePointCheckInAction", "text.doc-modified-save-before-check-in")).replace(
                                "%title",
                                e.getTitle()
                            )
                        );
                    const t = e.getStorageItem(),
                        n = t.getCloudClient(),
                        o = await n.getLibrarySettings();
                    await GFilesPanelViewSharepoint.openCheckInDialog(o).then(async (n) => {
                        let { ok, comment, type } = n;
                        ok && (await t.checkIn(comment, type), gDesigner.trigger(new p(p.Type.SynchronismUpdated, e)));
                    });
                } catch (e) {
                    GSystemDialog.alert(e.message);
                }
            }),
            (g.prototype.toString = function () {
                return "[Object GSharePointCheckInAction]";
            }),
            (module.exports = g));
    };
