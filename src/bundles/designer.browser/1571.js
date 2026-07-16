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
            p = require(393),
            g = require(78);
        function h() {
            ((this._documents = new Map()), gDesigner.addEventListener(g, this._documentEvent, this));
        }
        ((h.prototype._documents = null),
            (h.prototype._documentEvent = function (e) {
                const t = e.document;
                switch (e.type) {
                    case g.Type.Added:
                    case g.Type.Activated:
                    case g.Type.StorageItemUpdated:
                        ((!t.isLockedByVersionHistory() && t.isCloudFile()) ||
                            (t.getId() && t.getStorageItem() && t.getStorageItem().supportsShadowFile())) &&
                            this.attachDocument(t);
                        break;
                    case g.Type.Removed:
                        this.detachDocument(t);
                }
            }),
            (h.prototype.attachDocument = function (e) {
                if (!designerConfig.ENABLE_COLLABORATION) return;
                if (this._documents.has(e)) return;
                const t = new designerConfig.gApi.WebSocketClient();
                (t.setToken(e.getToken()),
                    t.connect("/v2/realtime/" + e.getId()),
                    designerConfig.ENABLE_COLLABORATION &&
                        (t.on(ANNOTATION_EVENT, (t) => {
                            this._trigger(e, p.Type.AnnotationsUpdate, t.data);
                        }),
                        t.on(USER_EVENT, (t) => {
                            this._trigger(e, p.Type.UserUpdate, t.data);
                        }),
                        t.on(REVIEW_STATUS_CHANGED, (t) => {
                            this._trigger(e, p.Type.ReviewStatusChanged, t.data);
                        }),
                        t.on(LOCK_REQUEST_EVENT, (t) => {
                            this._trigger(e, p.Type.LockRequest, t.data);
                        }),
                        t.on(LOCK_UPDATE_EVENT, (t) => {
                            const n = t.data && t.data.lock ? new designerConfig.Lock(t.data.lock) : null;
                            this._trigger(e, p.Type.LockUpdated, n);
                        }),
                        t.on(FILE_UPDATE_EVENT, (t) => {
                            this._trigger(e, p.Type.FileUpdate, t.data);
                        })),
                    designerConfig.SHARE_ENGINE &&
                        t.on(SHARE_EVENT, (t) => {
                            this._trigger(e, p.Type.ShareUpdate, t.data);
                        }),
                    designerConfig.AUTO_SAVE_ENABLED &&
                        t.on(FILE_AUTO_SAVE_EVENT, (t) => {
                            this._trigger(e, p.Type.FileAutoSave, t.data);
                        }),
                    this._documents.set(e, { doc: e, ws: t }));
            }),
            (h.prototype.detachDocument = function (e) {
                const t = this._documents.get(e);
                t && (t.ws.close(), this._documents.delete(e));
            }),
            (h.prototype._trigger = function (e, t, n) {
                const o = new p(t, n);
                e.hasEventListeners(o) && e.trigger(o);
            }),
            (module.exports = h));
    };
