module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(26));
        var designerConfig = require(10);
        const {
                ANNOTATION_EVENT,
                SHARE_EVENT,
                USER_EVENT,
                REVIEW_STATUS_CHANGED,
                LOCK_REQUEST_EVENT,
                LOCK_UPDATE_EVENT,
                FILE_UPDATE_EVENT,
                FILE_AUTO_SAVE_EVENT,
            } = designerConfig.gApi.COLLABORATION_EVENTS,
            GCollaborationEvent = require(393),
            GDocumentEvent = require(78);
        function GRealtimeManager() {
            ((this._documents = new Map()), gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this));
        }
        ((GRealtimeManager.prototype._documents = null),
            (GRealtimeManager.prototype._documentEvent = function (event) {
                const document = event.document;
                switch (event.type) {
                    case GDocumentEvent.Type.Added:
                    case GDocumentEvent.Type.Activated:
                    case GDocumentEvent.Type.StorageItemUpdated:
                        ((!document.isLockedByVersionHistory() && document.isCloudFile()) ||
                            (document.getId() && document.getStorageItem() && document.getStorageItem().supportsShadowFile())) &&
                            this.attachDocument(document);
                        break;
                    case GDocumentEvent.Type.Removed:
                        this.detachDocument(document);
                }
            }),
            (GRealtimeManager.prototype.attachDocument = function (document) {
                if (!designerConfig.ENABLE_COLLABORATION) return;
                if (this._documents.has(document)) return;
                const socket = new designerConfig.gApi.WebSocketClient();
                (socket.setToken(document.getToken()),
                    socket.connect("/v2/realtime/" + document.getId()),
                    designerConfig.ENABLE_COLLABORATION &&
                        (socket.on(ANNOTATION_EVENT, (message) => {
                            this._trigger(document, GCollaborationEvent.Type.AnnotationsUpdate, message.data);
                        }),
                        socket.on(USER_EVENT, (message) => {
                            this._trigger(document, GCollaborationEvent.Type.UserUpdate, message.data);
                        }),
                        socket.on(REVIEW_STATUS_CHANGED, (message) => {
                            this._trigger(document, GCollaborationEvent.Type.ReviewStatusChanged, message.data);
                        }),
                        socket.on(LOCK_REQUEST_EVENT, (message) => {
                            this._trigger(document, GCollaborationEvent.Type.LockRequest, message.data);
                        }),
                        socket.on(LOCK_UPDATE_EVENT, (message) => {
                            const lock = message.data && message.data.lock ? new designerConfig.Lock(message.data.lock) : null;
                            this._trigger(document, GCollaborationEvent.Type.LockUpdated, lock);
                        }),
                        socket.on(FILE_UPDATE_EVENT, (message) => {
                            this._trigger(document, GCollaborationEvent.Type.FileUpdate, message.data);
                        })),
                    designerConfig.SHARE_ENGINE &&
                        socket.on(SHARE_EVENT, (message) => {
                            this._trigger(document, GCollaborationEvent.Type.ShareUpdate, message.data);
                        }),
                    designerConfig.AUTO_SAVE_ENABLED &&
                        socket.on(FILE_AUTO_SAVE_EVENT, (message) => {
                            this._trigger(document, GCollaborationEvent.Type.FileAutoSave, message.data);
                        }),
                    this._documents.set(document, { doc: document, ws: socket }));
            }),
            (GRealtimeManager.prototype.detachDocument = function (document) {
                const entry = this._documents.get(document);
                entry && (entry.ws.close(), this._documents.delete(document));
            }),
            (GRealtimeManager.prototype._trigger = function (document, type, data) {
                const event = new GCollaborationEvent(type, data);
                document.hasEventListeners(event) && document.trigger(event);
            }),
            (module.exports = GRealtimeManager));
    };
