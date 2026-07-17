module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34));
        var GObject = require(1),
            msTeamsUtils = _interopRequireDefault(require(443));
        const { isExecutingOnMSTeamsSync } = msTeamsUtils.default;
        var GCategory = require(18),
            GAction = require(31);
        const GSharePointStorage = require(1152),
            GSystemDialog = require(44),
            GFilesPanelViewSharepoint = require(1631),
            GDocumentEvent = require(78);
        function SharePointCheckInAction() {}
        (GObject.GObject.inherit(SharePointCheckInAction, GAction),
            (SharePointCheckInAction.ID = "file.sharepoint-checkin"),
            (SharePointCheckInAction.TITLE = new GObject.GLocaleKey("GSharePointCheckInAction", "title")),
            (SharePointCheckInAction.prototype.getId = function () {
                return SharePointCheckInAction.ID;
            }),
            (SharePointCheckInAction.prototype.getTitle = function () {
                return SharePointCheckInAction.TITLE;
            }),
            (SharePointCheckInAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (SharePointCheckInAction.prototype.getGroup = function () {
                return "file";
            }),
            (SharePointCheckInAction.prototype.isEnabled = function () {
                return !!this._isSupported() && gDesigner.getActiveDocument().getStorageItem().isCheckedOutByMe();
            }),
            (SharePointCheckInAction.prototype._isSupported = function () {
                if (!isExecutingOnMSTeamsSync()) return false;
                const activeDocument = gDesigner.getActiveDocument();
                if (!activeDocument) return false;
                const storageItem = activeDocument.getStorageItem();
                return !!storageItem && storageItem instanceof GSharePointStorage.Item;
            }),
            (SharePointCheckInAction.prototype.isVisible = function () {
                return this._isSupported();
            }),
            (SharePointCheckInAction.prototype.execute = async function () {
                try {
                    const activeDocument = gDesigner.getActiveDocument();
                    if (activeDocument.isModified())
                        return void GSystemDialog.alert(
                            GObject.GLocale.get(new GObject.GLocaleKey("GSharePointCheckInAction", "text.doc-modified-save-before-check-in")).replace(
                                "%title",
                                activeDocument.getTitle()
                            )
                        );
                    const storageItem = activeDocument.getStorageItem(),
                        cloudClient = storageItem.getCloudClient(),
                        librarySettings = await cloudClient.getLibrarySettings();
                    await GFilesPanelViewSharepoint.openCheckInDialog(librarySettings).then(async (checkInResult) => {
                        let { ok, comment, type } = checkInResult;
                        ok && (await storageItem.checkIn(comment, type), gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.SynchronismUpdated, activeDocument)));
                    });
                } catch (error) {
                    GSystemDialog.alert(error.message);
                }
            }),
            (SharePointCheckInAction.prototype.toString = function () {
                return "[Object GSharePointCheckInAction]";
            }),
            (module.exports = SharePointCheckInAction));
    };
