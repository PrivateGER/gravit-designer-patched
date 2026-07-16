module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(3));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31),
            s = require(844),
            l = require(86),
            GCommonNames = require(220),
            d = require(119 /* GCommonNames */),
            GLoginPanel = require(446);
        const GOfflineDialog = require(256);
        function g(e) {
            ((this._type = e), (this._title = new GObject.GLocaleKey("GGravitCloudAction", "title." + e)));
        }
        ((g.Actions = { New: "new", Save: "save", SaveAs: "save-as", Open: "open" }),
            GObject.GObject.inherit(g, r),
            (g.ID = "gravit-cloud"),
            (g.prototype._type = null),
            (g.prototype._title = null),
            (g.prototype.getId = function () {
                return g.getIdForAction(this._type);
            }),
            (g.getIdForAction = function (e) {
                return g.ID + "." + e;
            }),
            (g.prototype.getTitle = function () {
                return this._title;
            }),
            (g.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (g.prototype.getGroup = function () {
                return this._type === g.Actions.Open ? "file-open" : "file";
            }),
            (g.prototype.getGroupIcon = function () {
                return s["gravit-cloud"];
            }),
            (g.prototype.getShortcut = function () {
                return this._type == g.Actions.Open
                    ? [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "O"]
                    : this._type == g.Actions.SaveAs
                      ? [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "S"]
                      : null;
            }),
            (g.prototype.isEnabled = function () {
                if (!gDesigner.getApplicationManager().isEditingEnabled() && this._type === g.Actions.Save) return false;
                if (!gDesigner.getApplicationManager().isOpenFromCloudEnabled() && this._type === g.Actions.Open) return false;
                if (!gDesigner.getApplicationManager().isSavingAsEnabled() && this._type === g.Actions.SaveAs) return false;
                return !(!gDesigner.getActiveDocument() && this._type !== g.Actions.Open) && !!d.isOnline();
            }),
            (g.prototype.execute = function (e, t, n) {
                const o = () =>
                    new GLoginPanel(
                        () => {
                            this._executeAction(e, t, n);
                        },
                        () => {
                            gDesigner.stats("action-cancelled_export", this._type);
                        }
                    );
                gDesigner.isOffline() ? GOfflineDialog.openUnavailableFeature(o) : o();
            }),
            (g.prototype._executeAction = function (e, t, n) {
                var o = this;
                if ("open" === this._type) {
                    let e = { closable: true, showCloudOptions: true, openFromCloud: true };
                    gDesigner.openNewDocumentDialog(e);
                } else if ("save" === this._type) {
                    var i = gDesigner.getActiveDocument();
                    if (i.isCommercialProductFile()) return void i.openPaywall(this.getId());
                    var a = i.getStorageItem();
                    a && a instanceof GCommonNames.Item
                        ? d.performSave(
                              i,
                              () => {
                                  t && t(l.Saved);
                              },
                              () => {
                                  t && t(l.SaveFailed);
                              }
                          )
                        : o._saveAs(false, e, t);
                } else if ("new" === this._type) {
                    let n = {
                        closable: true,
                        cb: function () {
                            o._saveAs(true, e, t);
                        },
                    };
                    gDesigner.openNewDocumentDialog(n);
                } else "save-as" === this._type && o._saveAs(false, e, t, n);
            }),
            (g.prototype._hasUnsupported = async function () {
                return false;
            }),
            (g.prototype._saveAs = async function (e, t, n, o) {
                var i = t || gDesigner.getActiveDocument();
                if (i.isCommercialProductFile()) i.openPaywall(this.getId());
                else {
                    var a = i.getTitle();
                    (!i.isDocumentFromTemplate() && (await this._hasUnsupported(i))) ||
                        gDesigner.openCloudSaveDialog(
                            i,
                            function () {
                                (e && gDesigner.getWindows().removeWindow(i.getActiveWindow()), n && n(l.SaveCancelled));
                            },
                            a,
                            n,
                            o
                        );
                }
            }),
            (g.prototype.getIcon = function () {
                return gDesigner.getApplicationManager().isOpenFromCloudEnabled() && this._type === g.Actions.Open
                    ? gDesigner.isTouchEnabled()
                        ? "gravit-icon-touch-file-open-cloud"
                        : ""
                    : gDesigner.getApplicationManager().isSavingAsEnabled() && this._type === g.Actions.SaveAs
                      ? gDesigner.isTouchEnabled()
                          ? "gravit-icon-touch-file-save-as-cloud"
                          : ""
                      : void 0;
            }),
            (g.prototype.toString = function () {
                return "[Object GGravitCloudAction]";
            }),
            (module.exports = g));
    };
