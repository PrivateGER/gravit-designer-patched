module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(8 /* Symbol */));
        const documentStatus = require(86),
            GDocumentEvent = require(78),
            GravitAutoSaveHelper = require(1531),
            GoogleDriveAutoSaveHelper = require(1532),
            SharePointAutoSaveHelper = require(1533),
            CloudFile = require(156),
            DocumentMetadata = require(790),
            Base64Image = require(554);
        function AutoSaveQueue(worker) {
            ((this._worker = worker), (this._docs = []));
        }
        ((AutoSaveQueue.prototype._docs = null),
            (AutoSaveQueue.prototype._worker = null),
            (AutoSaveQueue.prototype.has = function (document) {
                return this._docs.indexOf(document) >= 0;
            }),
            (AutoSaveQueue.prototype._addDocToQueue = function (document) {
                this._docs.push(document);
            }),
            (AutoSaveQueue.prototype._removeDocFromQueue = function (document) {
                this._docs.splice(this._docs.indexOf(document), 1);
            }),
            (AutoSaveQueue.prototype.isSaving = function () {
                return this._docs.length > 0;
            }),
            (AutoSaveQueue.prototype.save = async function (document) {
                if (this.has(document)) return Promise.resolve(null);
                this._addDocToQueue(document);
                const editor = document.getEditor(),
                    savePoint = editor && editor.markSavePoint();
                try {
                    if (this._isDocAllowedToBeAutoSaved(document)) {
                        gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.AutoSaveSynchronizing, document));
                        const autoSaveHelper = this._getAutoSaveHelper(document.getStorageItem().getFile());
                        return (
                            (function (file) {
                                const storageItem = document.getStorageItem();
                                storageItem.setVersionId && storageItem.setVersionId(null);
                                storageItem.setFile(file);
                            })(
                                await autoSaveHelper.updateFileSceneAndMetadata(
                                    document.getId(),
                                    document.getStorageItem().getFile(),
                                    document.getScene(),
                                    await this._createDocumentMetadata(document)
                                )
                            ),
                            gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.Modified, document)),
                            gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.AutoSaveSynchronized, document)),
                            true
                        );
                    }
                    return false;
                } catch (error) {
                    throw (gDesigner.trigger(new GDocumentEvent(GDocumentEvent.Type.AutoSaveSynchronizationFailed, document)), savePoint && savePoint.rollback(), error);
                } finally {
                    this._removeDocFromQueue(document);
                }
            }),
            (AutoSaveQueue.prototype._isDocAllowedToBeAutoSaved = function (document) {
                return ![documentStatus.Saving, documentStatus.Syncing].includes(document.getStatus()) && document.canSaveToCloud();
            }),
            (AutoSaveQueue.prototype._createDocumentMetadata = async function (document) {
                const metadata = new DocumentMetadata();
                return ((metadata.thumbnail = await Base64Image.fromBlob(await document.buildPreview())), metadata);
            }),
            (AutoSaveQueue.prototype._getAutoSaveHelper = function (file) {
                let helper = null;
                const storageType = file.getStorage(),
                    user = gDesigner.getSyncUser();
                return (
                    storageType === CloudFile.Storage.Gravit
                        ? (helper = new GravitAutoSaveHelper(this._worker, user))
                        : storageType === CloudFile.Storage.GoogleDrive
                          ? (helper = new GoogleDriveAutoSaveHelper(this._worker, user))
                          : (storageType !== CloudFile.Storage.SharePoint && storageType !== CloudFile.Storage.OneDriveBusiness) || (helper = new SharePointAutoSaveHelper(this._worker, user)),
                    helper
                );
            }),
            (module.exports = AutoSaveQueue));
    };
