module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(196 /* polyfill:Promise */));
        var GEditor = require(53),
            GObject = require(1);
        const { gApi } = require(10 /* designerConfig */),
            GCollaborationEvent = require(393),
            GDocumentStatusEvent = require(217),
            DocumentStatus = require(86);
        function CollaborativeTextController(document) {
            ((this._document = document),
                (this._currentLock = null),
                (this._openingInlineEditor = false),
                (this._alreadyRequestedAccess = false),
                this._document.addEventListener(GCollaborationEvent, this._collaborationEvent, this, null, true));
            const editor = this._document.getEditor();
            editor && editor.addEventListener(GEditor.GEditor.InlineEditorEvent, this._inlineEditorEvent, this, null, true);
        }
        ((CollaborativeTextController.StatusChangedEvent = function (status) {
            this.status = status;
        }),
            GObject.GObject.inherit(CollaborativeTextController.StatusChangedEvent, GObject.GEvent),
            (CollaborativeTextController.StatusChangedEvent.prototype.status = null),
            (CollaborativeTextController.Status = {
                Initial: 0,
                Editing: 1,
                Finished: 2,
                Previewing: 3,
                Previewed: 4,
                Sending: 5,
                UpdateAvailable: 6,
                Updating: 7,
            }),
            (CollaborativeTextController.LockUpdateEvent = function (lock) {
                this.lock = lock;
            }),
            GObject.GObject.inherit(CollaborativeTextController.LockUpdateEvent, GObject.GEvent),
            (CollaborativeTextController.LockUpdateEvent.prototype.lock = null),
            (CollaborativeTextController.prototype._status = CollaborativeTextController.Status.Initial),
            (CollaborativeTextController.prototype._openingInlineEditor = false),
            (CollaborativeTextController.prototype._currentLock = null),
            (CollaborativeTextController.prototype._alreadyRequestedAccess = false),
            (CollaborativeTextController.prototype.detach = function () {
                this._document.removeEventListener(GCollaborationEvent, this._collaborationEvent, this);
                const editor = this._document.getEditor();
                editor && editor.removeEventListener(GEditor.GEditor.InlineEditorEvent, this._inlineEditorEvent, this);
            }),
            (CollaborativeTextController.prototype.getStatus = function () {
                return this._status;
            }),
            (CollaborativeTextController.prototype.getCurrentLock = async function () {
                return (
                    this._currentLock ||
                        ((this._currentLock = await gApi.lock.get(this._document.getId()).catch(() => null)),
                        this._currentLock && this._fireLockUpdateEvent()),
                    this._currentLock
                );
            }),
            (CollaborativeTextController.prototype.acquireLock = async function () {
                return (await this.canLock())
                    ? (this._currentLock ||
                          ((this._currentLock = await gApi.lock.acquire(this._document.getId()).catch(() => null)),
                          this._currentLock && this._fireLockUpdateEvent()),
                      this._currentLock)
                    : null;
            }),
            (CollaborativeTextController.prototype.releaseLock = function () {
                return gApi.lock.release(this._document.getId()).then(() => {
                    this._currentLock = null;
                });
            }),
            (CollaborativeTextController.prototype.canLock = async function () {
                return !(await this.getCurrentLock()) || this.isLockedByMe();
            }),
            (CollaborativeTextController.prototype.isLockedByMe = function () {
                if (!this._currentLock) return false;
                const user = gDesigner.getSyncUser();
                return this._currentLock.isLockedBy(user);
            }),
            (CollaborativeTextController.prototype.reloadDocument = async function () {
                this._updateStatus(CollaborativeTextController.Status.Updating);
                const onStatusEvent = (event) => {
                    event.status !== DocumentStatus.Loading && (this._document.removeEventListener(GDocumentStatusEvent, onStatusEvent), this._document.unlock(), this.resetTextEditing());
                };
                (await this.releaseLock(), this._document.addEventListener(GDocumentStatusEvent, onStatusEvent), this._document.lock(), this._document.reload());
            }),
            (CollaborativeTextController.prototype.resetTextEditing = function () {
                this._updateStatus(CollaborativeTextController.Status.Initial);
            }),
            (CollaborativeTextController.prototype.finishTextEditing = async function () {
                (this._closeInlineEditor(), this._updateStatus(CollaborativeTextController.Status.Finished));
            }),
            (CollaborativeTextController.prototype.backToTextEditing = async function () {
                (this._closeInlineEditor(), this._updateStatus(CollaborativeTextController.Status.Editing));
            }),
            (CollaborativeTextController.prototype.sendChanges = async function () {
                return (
                    this._closeInlineEditor(),
                    this._document.lock(),
                    this._updateStatus(CollaborativeTextController.Status.Sending),
                    new Promise(async (resolve, reject) => {
                        this._document.storeToCloud(
                            this._document.getScene(),
                            async () => {
                                (await this.releaseLock().catch((error) => console.error(error)), resolve());
                            },
                            reject,
                            true,
                            { collabTextUpdate: true, sendEmail: true }
                        );
                    })
                        .then(async () => {
                            (await gDesigner.updateCollabTextPreviews().catch((error) => console.error(error)), this.resetTextEditing());
                        })
                        .catch((error) => {
                            throw (
                                this.finishTextEditing(),
                                this._document.updateStatus(DocumentStatus.SaveCancelled),
                                this._document.updateStatus(DocumentStatus.Ready),
                                error
                            );
                        })
                        .finally(() => {
                            this._document.unlock();
                        })
                );
            }),
            (CollaborativeTextController.prototype.previewChanges = async function () {
                return (
                    this._closeInlineEditor(),
                    this._updateStatus(CollaborativeTextController.Status.Previewing),
                    this._document.lock(),
                    gDesigner
                        .updateCollabTextPreviews()
                        .then(() => {
                            this._updateStatus(CollaborativeTextController.Status.Previewed);
                        })
                        .catch(() => {
                            this.finishTextEditing();
                        })
                        .finally(() => {
                            this._document.unlock();
                        })
                );
            }),
            (CollaborativeTextController.prototype.requestAccess = async function () {
                return gApi.lock.request(this._document.getId()).then(() => (this._alreadyRequestedAccess = true));
            }),
            (CollaborativeTextController.prototype.hasAlreadyRequestedAccess = function () {
                return this._alreadyRequestedAccess;
            }),
            (CollaborativeTextController.prototype._updateStatus = function (status) {
                status !== this._status &&
                    ((this._status = status),
                    this._document.hasEventListeners(CollaborativeTextController.StatusChangedEvent) &&
                        this._document.trigger(new CollaborativeTextController.StatusChangedEvent(this._status)));
            }),
            (CollaborativeTextController.prototype._closeInlineEditor = function () {
                const editor = this._document.getEditor();
                editor && (editor.closeInlineEditor(), editor.clearSelection());
            }),
            (CollaborativeTextController.prototype._inlineEditorEvent = function (event) {
                switch (event.type) {
                    case GEditor.GEditor.InlineEditorEvent.Type.TryOpen:
                        this._tryOpenInlineEditor(event);
                }
            }),
            (CollaborativeTextController.prototype._tryOpenInlineEditor = async function (event) {
                if (!this._openingInlineEditor && this._document.isCollaborativeTextEditing())
                    if ((event.editor.disableInlineEditingSupport(), event.editor instanceof GEditor.GCollabTextEditor)) {
                        this._openingInlineEditor = true;
                        try {
                            gDesigner.toggleLoading(true);
                            if (!(await this.acquireLock())) return void this._closeInlineEditor();
                            event.editor.enableInlineEditingSupport();
                            const editor = this._document.getEditor();
                            if (editor) {
                                const activeWindow = this._document.getActiveWindow(),
                                    view = activeWindow && activeWindow.getView();
                                view && editor.openInlineEditor(event.editor.getElement(), view) && this._updateStatus(CollaborativeTextController.Status.Editing);
                            }
                        } finally {
                            ((this._openingInlineEditor = false), gDesigner.toggleLoading(false));
                        }
                    } else this._closeInlineEditor();
            }),
            (CollaborativeTextController.prototype._fireLockUpdateEvent = function () {
                this._document.hasEventListeners(CollaborativeTextController.LockUpdateEvent) && this._document.trigger(new CollaborativeTextController.LockUpdateEvent(this._currentLock));
            }),
            (CollaborativeTextController.prototype._collaborationEvent = function (event) {
                if (event.type === GCollaborationEvent.Type.LockUpdated) ((this._currentLock = event.data), this._fireLockUpdateEvent());
                else if (event.type === GCollaborationEvent.Type.FileUpdate) {
                    if (event.data && event.data.from === gDesigner.getSyncUser().id) return;
                    this._updateStatus(CollaborativeTextController.Status.UpdateAvailable);
                }
            }),
            (module.exports = CollaborativeTextController));
    };
