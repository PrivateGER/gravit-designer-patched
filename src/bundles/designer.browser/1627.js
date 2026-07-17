module.exports = function (module, exports, require) {
        "use strict";
        (require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1);
        const GCategory = require(18),
            GAction = require(31),
            GContainer = require(85),
            { CLOUD_SYNC_FEATURE: { NEW_LAYOUT } = {} } = require(10 /* designerConfig */);
        function l() {}
        (GObject.GObject.inherit(l, GAction),
            (l.ID = "sync.info"),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                const e = gDesigner.getActiveDocument();
                if (e && e.getScene()) {
                    const t = e.getScene().lastModifiedDate();
                    return t
                        ? GObject.GLocale.get(new GObject.GLocaleKey("GCloudSynchronizationAction", "text.last-synced-at")).replace(
                              "%date",
                              GObject.GLocale.toLocaleDate(t, {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  second: "numeric",
                              })
                          )
                        : GObject.GLocale.get(new GObject.GLocaleKey("GDocumentChooser", "text.unavailable"));
                }
                return GObject.GLocale.get(new GObject.GLocaleKey("GDocumentChooser", "text.unavailable"));
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (l.prototype.getGroup = function () {
                return "file";
            }),
            (l.prototype.isVisible = function () {
                const e = gDesigner.getActiveDocument();
                return e && e.isCloudSyncOn() && e.isCloudSynchronismAvailable();
            }),
            (l.prototype.isEnabled = function () {
                return false;
            }),
            (l.prototype.isAvailable = function () {
                return (
                    !!NEW_LAYOUT && gContainer.getRuntime() === GContainer.Runtime.Electron && GObject.GSystem.operatingSystem === GObject.GSystem.OperatingSystem.OSX_IOS
                );
            }),
            (l.prototype.toString = function () {
                return "[Object GCloudSynchronizationInfoAction]";
            }),
            (module.exports = l));
    };
