module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(8 /* Symbol */));
        const o = require(86),
            i = require(78),
            a = require(1531),
            r = require(1532),
            s = require(1533),
            l = require(156),
            c = require(790),
            d = require(554);
        function u(e) {
            ((this._worker = e), (this._docs = []));
        }
        ((u.prototype._docs = null),
            (u.prototype._worker = null),
            (u.prototype.has = function (e) {
                return this._docs.indexOf(e) >= 0;
            }),
            (u.prototype._addDocToQueue = function (e) {
                this._docs.push(e);
            }),
            (u.prototype._removeDocFromQueue = function (e) {
                this._docs.splice(this._docs.indexOf(e), 1);
            }),
            (u.prototype.isSaving = function () {
                return this._docs.length > 0;
            }),
            (u.prototype.save = async function (e) {
                if (this.has(e)) return Promise.resolve(null);
                this._addDocToQueue(e);
                const t = e.getEditor(),
                    n = t && t.markSavePoint();
                try {
                    if (this._isDocAllowedToBeAutoSaved(e)) {
                        gDesigner.trigger(new i(i.Type.AutoSaveSynchronizing, e));
                        const t = this._getAutoSaveHelper(e.getStorageItem().getFile());
                        return (
                            (function (t) {
                                const n = e.getStorageItem();
                                n.setVersionId && n.setVersionId(null);
                                n.setFile(t);
                            })(
                                await t.updateFileSceneAndMetadata(
                                    e.getId(),
                                    e.getStorageItem().getFile(),
                                    e.getScene(),
                                    await this._createDocumentMetadata(e)
                                )
                            ),
                            gDesigner.trigger(new i(i.Type.Modified, e)),
                            gDesigner.trigger(new i(i.Type.AutoSaveSynchronized, e)),
                            true
                        );
                    }
                    return false;
                } catch (t) {
                    throw (gDesigner.trigger(new i(i.Type.AutoSaveSynchronizationFailed, e)), n && n.rollback(), t);
                } finally {
                    this._removeDocFromQueue(e);
                }
            }),
            (u.prototype._isDocAllowedToBeAutoSaved = function (e) {
                return ![o.Saving, o.Syncing].includes(e.getStatus()) && e.canSaveToCloud();
            }),
            (u.prototype._createDocumentMetadata = async function (e) {
                const t = new c();
                return ((t.thumbnail = await d.fromBlob(await e.buildPreview())), t);
            }),
            (u.prototype._getAutoSaveHelper = function (e) {
                let t = null;
                const n = e.getStorage(),
                    o = gDesigner.getSyncUser();
                return (
                    n === l.Storage.Gravit
                        ? (t = new a(this._worker, o))
                        : n === l.Storage.GoogleDrive
                          ? (t = new r(this._worker, o))
                          : (n !== l.Storage.SharePoint && n !== l.Storage.OneDriveBusiness) || (t = new s(this._worker, o)),
                    t
                );
            }),
            (module.exports = u));
    };
