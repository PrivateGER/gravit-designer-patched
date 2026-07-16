module.exports = function (module, exports, require) {
        "use strict";
        (require(58), require(8 /* Symbol */), require(71), require(4), require(13), require(38), require(97));
        var GObject = require(1);
        const i = require(78),
            a = require(393),
            r = require(433),
            s = require(336),
            l = require(868),
            {
                GFileReviewFlow,
                gApi,
                FileStatus,
                FILE_REVIEW_ENABLED,
                Notification,
                NotificationConstants: { FILE_REVIEW_FLOW: h = [] },
            } = require(10 /* designerConfig */);
        function f() {
            if (!FILE_REVIEW_ENABLED) return this;
            (gDesigner.addEventListener(i, this._documentEvent, this),
                gDesigner.addEventListener(s.FileStatusUpdate, this._storageItemFileStatusEvent, this),
                gDesigner.addEventListener(l, this._handleShareEvent, this),
                gDesigner.getActiveDocument() &&
                    (this._addDocumentEvents(gDesigner.getActiveDocument()), this._updateFromDocument(gDesigner.getActiveDocument())));
        }
        (GObject.GObject.inherit(f, GObject.GEventTarget),
            (f.UpdateEvent = function () {}),
            GObject.GObject.inherit(f.UpdateEvent, GObject.GEvent),
            (f.prototype._addDocumentEvents = function (e) {
                e.addEventListener(a, this._collaborationEvent, this);
            }),
            (f.prototype._removeDocumentEvents = function (e) {
                e.removeEventListener(a, this._collaborationEvent, this);
            }),
            (f.prototype._storageItemFileStatusEvent = async function (e) {
                let { storageItem, newStatus } = e;
                this._fileId === storageItem.getId() && this._doc.isCollaborative() && this._setStatus(newStatus) && this.trigger(new f.UpdateEvent());
            }),
            (f.prototype._handleShareEvent = async function (e) {
                switch (e.type) {
                    case l.Type.Updated:
                        (await this._updateCollaboratorRoleListIfInitialized(),
                            this.hasEventListeners(f.UpdateEvent) && this.trigger(new f.UpdateEvent()));
                }
            }),
            (f.prototype._documentEvent = async function (e) {
                const t = e.document;
                switch (e.type) {
                    case i.Type.Activated:
                        (this._addDocumentEvents(t), this._updateFromDocument(t));
                        break;
                    case i.Type.Deactivated:
                        (this._removeDocumentEvents(t), this._updateFromDocument(t), (this._doc = null));
                        break;
                    case i.Type.StorageItemUpdated:
                        this._updateFromDocument(t);
                }
            }),
            (f.prototype._collaborationEvent = async function (e) {
                const { type, sender } = e;
                if (sender === gDesigner.getActiveDocument())
                    switch (type) {
                        case a.Type.ShareUpdate:
                        case a.Type.UserUpdate:
                            (await this._updateCollaboratorRoleListIfInitialized(),
                                this.hasEventListeners(f.UpdateEvent) && this.trigger(new f.UpdateEvent()));
                    }
            }),
            (f.prototype._updateFromDocument = async function (e) {
                if (
                    (e !== this._doc &&
                        ((this._flow = null),
                        (this._fileId = null),
                        (this._status = null),
                        (this._doc = e),
                        (this._collaboratorRoleList = null),
                        (this._collaboratorList = null)),
                    this._doc && this._doc.getId() && this._doc.getStorageItem() && this._doc.isCollaborative())
                ) {
                    this._fileId = this._doc.getId();
                    const e = await this._doc.getStorageItem().getOrCreateCollaborativeFile();
                    e && this._setStatus(e.status) && this.trigger(new f.UpdateEvent());
                } else this._setStatus(null) && this.trigger(new f.UpdateEvent());
            }),
            (f.prototype._setStatus = function (e) {
                return (
                    this._status !== e &&
                    ((this._status = e),
                    (void 0 !== this._status && null !== this._status) || (this._status = FileStatus.IN_REVIEW),
                    void 0 !== GFileReviewFlow && GFileReviewFlow.constructor && (this._flow = new GFileReviewFlow(this._status)),
                    true)
                );
            }),
            (f.prototype._isCurrentUserApprover = function () {
                const e = gDesigner.getSyncUser();
                if (!e) return false;
                if (!this._collaboratorList) return false;
                const t = this._collaboratorList.find((t) => t.getUID() === e.getUID());
                return t && t.getRole().is(r.ROLES.APPROVER_ROLE);
            }),
            (f.prototype._shouldStatusDisabledForApproverWithCurrentStatus = function (e) {
                if (this._isCurrentUserApprover())
                    switch (this._status) {
                        case FileStatus.IN_REVIEW:
                        case FileStatus.REOPENED:
                            return true;
                        case FileStatus.APPROVED:
                            return e === FileStatus.IN_REVIEW || e === FileStatus.AWAITING_APPROVAL;
                        case FileStatus.AWAITING_APPROVAL:
                            return e === FileStatus.IN_REVIEW;
                    }
                return false;
            }),
            (f.prototype.getStatus = function () {
                return this._status;
            }),
            (f.prototype.updateReviewStatus = function (e) {
                return this.canUpdateToStatus(e) && this._fileId
                    ? gApi.updateStatus(this._fileId, e)
                    : Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GFileReviewManager", "text.cant-update-file-to-status")));
            }),
            (f.prototype.canUpdateToStatus = function (e) {
                return (
                    !!this._flow &&
                    (this._isCurrentUserApprover() ? !this._shouldStatusDisabledForApproverWithCurrentStatus(e) : this._flow.canMoveTo(e))
                );
            }),
            (f.prototype._updateCollaboratorRoleListIfInitialized = async function () {
                this._canUpdateCollaboratorList() && this._collaboratorRoleList && (await this._updateCollaboratorRoleList());
            }),
            (f.prototype._canUpdateCollaboratorList = function () {
                return this._doc && this._fileId;
            }),
            (f.prototype._updateCollaboratorRoleList = async function () {
                if (!this._canUpdateCollaboratorList()) return;
                const e = await gDesigner.getShareManager().getCollaboratorsCached(this._doc);
                e && ((this._collaboratorList = e), (this._collaboratorRoleList = e.map((e) => e.getRole())));
            }),
            (f.prototype.hasApprovers = async function () {
                return (
                    !(!this._doc || !this._fileId) &&
                    (this._collaboratorRoleList || (await this._updateCollaboratorRoleList()),
                    this._collaboratorRoleList.some((e) => e.is(r.ROLES.APPROVER_ROLE)))
                );
            }),
            (f.prototype.getDocumentReviewHistory = async function (e) {
                const t = await gApi.annotations.getDesignHistory(e).catch(() => []),
                    n = [];
                for (let e = 0; e < t.length; e++) {
                    const o = t[e],
                        i = Notification.from(o);
                    h.includes(i.getAction()) && n.push(i);
                }
                return n;
            }),
            (module.exports = f));
    };
