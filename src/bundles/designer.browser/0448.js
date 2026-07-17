module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(3));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31),
            GActionIcons = require(844),
            DocumentStatus = require(86),
            GCloudStorage = require(220),
            GCommonNames = require(119),
            GLoginPanel = require(446);
        const GOfflineDialog = require(256);
        function GGravitCloudAction(actionType) {
            ((this._type = actionType), (this._title = new GObject.GLocaleKey("GGravitCloudAction", "title." + actionType)));
        }
        ((GGravitCloudAction.Actions = { New: "new", Save: "save", SaveAs: "save-as", Open: "open" }),
            GObject.GObject.inherit(GGravitCloudAction, GAction),
            (GGravitCloudAction.ID = "gravit-cloud"),
            (GGravitCloudAction.prototype._type = null),
            (GGravitCloudAction.prototype._title = null),
            (GGravitCloudAction.prototype.getId = function () {
                return GGravitCloudAction.getIdForAction(this._type);
            }),
            (GGravitCloudAction.getIdForAction = function (actionType) {
                return GGravitCloudAction.ID + "." + actionType;
            }),
            (GGravitCloudAction.prototype.getTitle = function () {
                return this._title;
            }),
            (GGravitCloudAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (GGravitCloudAction.prototype.getGroup = function () {
                return this._type === GGravitCloudAction.Actions.Open ? "file-open" : "file";
            }),
            (GGravitCloudAction.prototype.getGroupIcon = function () {
                return GActionIcons["gravit-cloud"];
            }),
            (GGravitCloudAction.prototype.getShortcut = function () {
                return this._type == GGravitCloudAction.Actions.Open
                    ? [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "O"]
                    : this._type == GGravitCloudAction.Actions.SaveAs
                      ? [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "S"]
                      : null;
            }),
            (GGravitCloudAction.prototype.isEnabled = function () {
                if (!gDesigner.getApplicationManager().isEditingEnabled() && this._type === GGravitCloudAction.Actions.Save) return false;
                if (!gDesigner.getApplicationManager().isOpenFromCloudEnabled() && this._type === GGravitCloudAction.Actions.Open) return false;
                if (!gDesigner.getApplicationManager().isSavingAsEnabled() && this._type === GGravitCloudAction.Actions.SaveAs) return false;
                return !(!gDesigner.getActiveDocument() && this._type !== GGravitCloudAction.Actions.Open) && !!GCommonNames.isOnline();
            }),
            (GGravitCloudAction.prototype.execute = function (document, callback, options) {
                const loginAndExecute = () =>
                    new GLoginPanel(
                        () => {
                            this._executeAction(document, callback, options);
                        },
                        () => {
                            gDesigner.stats("action-cancelled_export", this._type);
                        }
                    );
                gDesigner.isOffline() ? GOfflineDialog.openUnavailableFeature(loginAndExecute) : loginAndExecute();
            }),
            (GGravitCloudAction.prototype._executeAction = function (document, callback, options) {
                var self = this;
                if ("open" === this._type) {
                    let dialogOptions = { closable: true, showCloudOptions: true, openFromCloud: true };
                    gDesigner.openNewDocumentDialog(dialogOptions);
                } else if ("save" === this._type) {
                    var activeDocument = gDesigner.getActiveDocument();
                    if (activeDocument.isCommercialProductFile()) return void activeDocument.openPaywall(this.getId());
                    var storageItem = activeDocument.getStorageItem();
                    storageItem && storageItem instanceof GCloudStorage.Item
                        ? GCommonNames.performSave(
                              activeDocument,
                              () => {
                                  callback && callback(DocumentStatus.Saved);
                              },
                              () => {
                                  callback && callback(DocumentStatus.SaveFailed);
                              }
                          )
                        : self._saveAs(false, document, callback);
                } else if ("new" === this._type) {
                    let dialogOptions = {
                        closable: true,
                        cb: function () {
                            self._saveAs(true, document, callback);
                        },
                    };
                    gDesigner.openNewDocumentDialog(dialogOptions);
                } else "save-as" === this._type && self._saveAs(false, document, callback, options);
            }),
            (GGravitCloudAction.prototype._hasUnsupported = async function () {
                return false;
            }),
            (GGravitCloudAction.prototype._saveAs = async function (removeWindowOnCancel, document, callback, options) {
                var targetDocument = document || gDesigner.getActiveDocument();
                if (targetDocument.isCommercialProductFile()) targetDocument.openPaywall(this.getId());
                else {
                    var title = targetDocument.getTitle();
                    (!targetDocument.isDocumentFromTemplate() && (await this._hasUnsupported(targetDocument))) ||
                        gDesigner.openCloudSaveDialog(
                            targetDocument,
                            function () {
                                (removeWindowOnCancel && gDesigner.getWindows().removeWindow(targetDocument.getActiveWindow()), callback && callback(DocumentStatus.SaveCancelled));
                            },
                            title,
                            callback,
                            options
                        );
                }
            }),
            (GGravitCloudAction.prototype.getIcon = function () {
                return gDesigner.getApplicationManager().isOpenFromCloudEnabled() && this._type === GGravitCloudAction.Actions.Open
                    ? gDesigner.isTouchEnabled()
                        ? "gravit-icon-touch-file-open-cloud"
                        : ""
                    : gDesigner.getApplicationManager().isSavingAsEnabled() && this._type === GGravitCloudAction.Actions.SaveAs
                      ? gDesigner.isTouchEnabled()
                          ? "gravit-icon-touch-file-save-as-cloud"
                          : ""
                      : void 0;
            }),
            (GGravitCloudAction.prototype.toString = function () {
                return "[Object GGravitCloudAction]";
            }),
            (module.exports = GGravitCloudAction));
    };
