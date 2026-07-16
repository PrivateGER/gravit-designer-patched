module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        require(3);
        var GObject = require(1),
            a = o(require(31)),
            r = o(require(18 /* GCategory */)),
            s = o(require(119 /* GCommonNames */)),
            l = o(require(1159)),
            c = o(require(219)),
            d = o(require(256 /* GOfflineDialog */)),
            u = require(67);
        function p() {
            ((this._title = new GObject.GLocaleKey("GVersionsHistoryAction", "title")),
                (p.TOOLTIP_CONFIG = {
                    [u.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON]: u.GRichTooltipConfig.from({
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GVersionsHistoryAction", "text.try-this-feature-pro-tooltip-title")),
                        description: GObject.GLocale.get(
                            new GObject.GLocaleKey("GVersionsHistoryAction", "text.try-this-feature-pro-tooltip-description")
                        ),
                        learnMore:
                            "/docs/basics/working-with-files/working-with-Corel%20Vector-cloud/#version-history",
                        upgradeToProStatsValue: "gravit-versions-history",
                        middle: false,
                        side: true,
                    }),
                }));
        }
        (GObject.GObject.inherit(p, a.default),
            (p.ID = "gravit-versions-history"),
            (p.GroupID = "file"),
            (p.TOOLTIP_CONFIG = null),
            (p.prototype._title = null),
            (p.prototype.getId = function () {
                return p.ID;
            }),
            (p.prototype.getTitle = function () {
                return this._title;
            }),
            (p.prototype.isPro = function () {
                return true;
            }),
            (p.prototype.getTooltipArea = function () {
                return u.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON;
            }),
            (p.prototype.getTooltipConfig = function (e) {
                return (e && p.TOOLTIP_CONFIG[e]) || null;
            }),
            (p.prototype.getIcon = function () {
                return "gravit-icon-versions";
            }),
            (p.prototype.getCategory = function () {
                return r.default.CATEGORY_FILE;
            }),
            (p.prototype.getGroup = function () {
                return p.GroupID;
            }),
            (p.prototype.isEnabled = function () {
                if (!gDesigner.getApplicationManager().isShareEnabled()) return false;
                var e = (gDesigner.getActiveDocument() && gDesigner.getActiveDocument().getStorageItem()) || null,
                    t = !!gDesigner.getActiveDocument() && gDesigner.getActiveDocument().getScene().isCloudSynchronization();
                return s.default.isOnline() && e && t;
            }),
            (p.prototype.execute = function () {
                if (gDesigner.getWindows().getActiveWindow().getDocument().isModified())
                    return (new c.default(GObject.GLocale.get(new GObject.GLocaleKey("GVersionsHistoryAction", "unsaved-modifications"))).open(), false);
                const e = () => {
                    gDesigner &&
                        gDesigner.hasEventListeners(l.default) &&
                        (gDesigner.trigger(
                            new l.default(l.default.Type.Enable, gDesigner.getActiveDocument().getScene().getProperty("cid"))
                        ),
                        gDesigner.intercomStats("Entered version history"));
                };
                gDesigner.isOffline() ? d.default.openUnavailableFeature(e) : e();
            }),
            (p.prototype.toString = function () {
                return "[Object GVersionsHistoryAction]";
            }),
            (module.exports = p));
    };
