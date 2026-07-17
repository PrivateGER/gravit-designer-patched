module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            GAction = _interopRequireDefault(require(31 /* GAction */)),
            GCategory = _interopRequireDefault(require(18 /* GCategory */)),
            GCommonNames = _interopRequireDefault(require(119 /* GCommonNames */)),
            VersionHistoryEvent = _interopRequireDefault(require(1159)),
            AlertDialog = _interopRequireDefault(require(219)),
            GOfflineDialog = _interopRequireDefault(require(256 /* GOfflineDialog */)),
            GRichTooltipConfig = require(67);
        function GVersionsHistoryAction() {
            ((this._title = new GObject.GLocaleKey("GVersionsHistoryAction", "title")),
                (GVersionsHistoryAction.TOOLTIP_CONFIG = {
                    [GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON]: GRichTooltipConfig.GRichTooltipConfig.from({
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
        (GObject.GObject.inherit(GVersionsHistoryAction, GAction.default),
            (GVersionsHistoryAction.ID = "gravit-versions-history"),
            (GVersionsHistoryAction.GroupID = "file"),
            (GVersionsHistoryAction.TOOLTIP_CONFIG = null),
            (GVersionsHistoryAction.prototype._title = null),
            (GVersionsHistoryAction.prototype.getId = function () {
                return GVersionsHistoryAction.ID;
            }),
            (GVersionsHistoryAction.prototype.getTitle = function () {
                return this._title;
            }),
            (GVersionsHistoryAction.prototype.isPro = function () {
                return true;
            }),
            (GVersionsHistoryAction.prototype.getTooltipArea = function () {
                return GRichTooltipConfig.TOOLTIP_AREA.MAIN_MENU.TRY_PRO_COMMON;
            }),
            (GVersionsHistoryAction.prototype.getTooltipConfig = function (tooltipArea) {
                return (tooltipArea && GVersionsHistoryAction.TOOLTIP_CONFIG[tooltipArea]) || null;
            }),
            (GVersionsHistoryAction.prototype.getIcon = function () {
                return "gravit-icon-versions";
            }),
            (GVersionsHistoryAction.prototype.getCategory = function () {
                return GCategory.default.CATEGORY_FILE;
            }),
            (GVersionsHistoryAction.prototype.getGroup = function () {
                return GVersionsHistoryAction.GroupID;
            }),
            (GVersionsHistoryAction.prototype.isEnabled = function () {
                if (!gDesigner.getApplicationManager().isShareEnabled()) return false;
                var storageItem = (gDesigner.getActiveDocument() && gDesigner.getActiveDocument().getStorageItem()) || null,
                    isCloudSynced = !!gDesigner.getActiveDocument() && gDesigner.getActiveDocument().getScene().isCloudSynchronization();
                return GCommonNames.default.isOnline() && storageItem && isCloudSynced;
            }),
            (GVersionsHistoryAction.prototype.execute = function () {
                if (gDesigner.getWindows().getActiveWindow().getDocument().isModified())
                    return (new AlertDialog.default(GObject.GLocale.get(new GObject.GLocaleKey("GVersionsHistoryAction", "unsaved-modifications"))).open(), false);
                const openVersionHistory = () => {
                    gDesigner &&
                        gDesigner.hasEventListeners(VersionHistoryEvent.default) &&
                        (gDesigner.trigger(
                            new VersionHistoryEvent.default(VersionHistoryEvent.default.Type.Enable, gDesigner.getActiveDocument().getScene().getProperty("cid"))
                        ),
                        gDesigner.intercomStats("Entered version history"));
                };
                gDesigner.isOffline() ? GOfflineDialog.default.openUnavailableFeature(openVersionHistory) : openVersionHistory();
            }),
            (GVersionsHistoryAction.prototype.toString = function () {
                return "[Object GVersionsHistoryAction]";
            }),
            (module.exports = GVersionsHistoryAction));
    };
