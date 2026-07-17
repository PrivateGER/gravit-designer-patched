module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(8 /* Symbol */), require(71 /* polyfill:String */), require(4), require(13), require(38), require(97));
        var GObject = require(1);
        const DocumentEvent = require(78),
            CollaborationEvent = require(393),
            GShareRoleFactory = require(433),
            StorageItemEvent = require(336),
            ShareEvent = require(868),
            {
                GFileReviewFlow,
                gApi,
                FileStatus,
                FILE_REVIEW_ENABLED,
                Notification,
                NotificationConstants: { FILE_REVIEW_FLOW: reviewFlowActions = [] },
            } = require(10 /* designerConfig */);
        function GFileReviewManager() {
            if (!FILE_REVIEW_ENABLED) return this;
            (gDesigner.addEventListener(DocumentEvent, this._documentEvent, this),
                gDesigner.addEventListener(StorageItemEvent.FileStatusUpdate, this._storageItemFileStatusEvent, this),
                gDesigner.addEventListener(ShareEvent, this._handleShareEvent, this),
                gDesigner.getActiveDocument() &&
                    (this._addDocumentEvents(gDesigner.getActiveDocument()), this._updateFromDocument(gDesigner.getActiveDocument())));
        }
        (GObject.GObject.inherit(GFileReviewManager, GObject.GEventTarget),
            (GFileReviewManager.UpdateEvent = function () {}),
            GObject.GObject.inherit(GFileReviewManager.UpdateEvent, GObject.GEvent),
            (GFileReviewManager.prototype._addDocumentEvents = function (document) {
                document.addEventListener(CollaborationEvent, this._collaborationEvent, this);
            }),
            (GFileReviewManager.prototype._removeDocumentEvents = function (document) {
                document.removeEventListener(CollaborationEvent, this._collaborationEvent, this);
            }),
            (GFileReviewManager.prototype._storageItemFileStatusEvent = async function (event) {
                let { storageItem, newStatus } = event;
                this._fileId === storageItem.getId() && this._doc.isCollaborative() && this._setStatus(newStatus) && this.trigger(new GFileReviewManager.UpdateEvent());
            }),
            (GFileReviewManager.prototype._handleShareEvent = async function (event) {
                switch (event.type) {
                    case ShareEvent.Type.Updated:
                        (await this._updateCollaboratorRoleListIfInitialized(),
                            this.hasEventListeners(GFileReviewManager.UpdateEvent) && this.trigger(new GFileReviewManager.UpdateEvent()));
                }
            }),
            (GFileReviewManager.prototype._documentEvent = async function (event) {
                const document = event.document;
                switch (event.type) {
                    case DocumentEvent.Type.Activated:
                        (this._addDocumentEvents(document), this._updateFromDocument(document));
                        break;
                    case DocumentEvent.Type.Deactivated:
                        (this._removeDocumentEvents(document), this._updateFromDocument(document), (this._doc = null));
                        break;
                    case DocumentEvent.Type.StorageItemUpdated:
                        this._updateFromDocument(document);
                }
            }),
            (GFileReviewManager.prototype._collaborationEvent = async function (event) {
                const { type, sender } = event;
                if (sender === gDesigner.getActiveDocument())
                    switch (type) {
                        case CollaborationEvent.Type.ShareUpdate:
                        case CollaborationEvent.Type.UserUpdate:
                            (await this._updateCollaboratorRoleListIfInitialized(),
                                this.hasEventListeners(GFileReviewManager.UpdateEvent) && this.trigger(new GFileReviewManager.UpdateEvent()));
                    }
            }),
            (GFileReviewManager.prototype._updateFromDocument = async function (document) {
                if (
                    (document !== this._doc &&
                        ((this._flow = null),
                        (this._fileId = null),
                        (this._status = null),
                        (this._doc = document),
                        (this._collaboratorRoleList = null),
                        (this._collaboratorList = null)),
                    this._doc && this._doc.getId() && this._doc.getStorageItem() && this._doc.isCollaborative())
                ) {
                    this._fileId = this._doc.getId();
                    const collaborativeFile = await this._doc.getStorageItem().getOrCreateCollaborativeFile();
                    collaborativeFile && this._setStatus(collaborativeFile.status) && this.trigger(new GFileReviewManager.UpdateEvent());
                } else this._setStatus(null) && this.trigger(new GFileReviewManager.UpdateEvent());
            }),
            (GFileReviewManager.prototype._setStatus = function (status) {
                return (
                    this._status !== status &&
                    ((this._status = status),
                    (void 0 !== this._status && null !== this._status) || (this._status = FileStatus.IN_REVIEW),
                    void 0 !== GFileReviewFlow && GFileReviewFlow.constructor && (this._flow = new GFileReviewFlow(this._status)),
                    true)
                );
            }),
            (GFileReviewManager.prototype._isCurrentUserApprover = function () {
                const currentUser = gDesigner.getSyncUser();
                if (!currentUser) return false;
                if (!this._collaboratorList) return false;
                const collaborator = this._collaboratorList.find((collaborator) => collaborator.getUID() === currentUser.getUID());
                return collaborator && collaborator.getRole().is(GShareRoleFactory.ROLES.APPROVER_ROLE);
            }),
            (GFileReviewManager.prototype._shouldStatusDisabledForApproverWithCurrentStatus = function (newStatus) {
                if (this._isCurrentUserApprover())
                    switch (this._status) {
                        case FileStatus.IN_REVIEW:
                        case FileStatus.REOPENED:
                            return true;
                        case FileStatus.APPROVED:
                            return newStatus === FileStatus.IN_REVIEW || newStatus === FileStatus.AWAITING_APPROVAL;
                        case FileStatus.AWAITING_APPROVAL:
                            return newStatus === FileStatus.IN_REVIEW;
                    }
                return false;
            }),
            (GFileReviewManager.prototype.getStatus = function () {
                return this._status;
            }),
            (GFileReviewManager.prototype.updateReviewStatus = function (status) {
                return this.canUpdateToStatus(status) && this._fileId
                    ? gApi.updateStatus(this._fileId, status)
                    : Promise.reject(GObject.GLocale.get(new GObject.GLocaleKey("GFileReviewManager", "text.cant-update-file-to-status")));
            }),
            (GFileReviewManager.prototype.canUpdateToStatus = function (status) {
                return (
                    !!this._flow &&
                    (this._isCurrentUserApprover() ? !this._shouldStatusDisabledForApproverWithCurrentStatus(status) : this._flow.canMoveTo(status))
                );
            }),
            (GFileReviewManager.prototype._updateCollaboratorRoleListIfInitialized = async function () {
                this._canUpdateCollaboratorList() && this._collaboratorRoleList && (await this._updateCollaboratorRoleList());
            }),
            (GFileReviewManager.prototype._canUpdateCollaboratorList = function () {
                return this._doc && this._fileId;
            }),
            (GFileReviewManager.prototype._updateCollaboratorRoleList = async function () {
                if (!this._canUpdateCollaboratorList()) return;
                const collaborators = await gDesigner.getShareManager().getCollaboratorsCached(this._doc);
                collaborators && ((this._collaboratorList = collaborators), (this._collaboratorRoleList = collaborators.map((collaborator) => collaborator.getRole())));
            }),
            (GFileReviewManager.prototype.hasApprovers = async function () {
                return (
                    !(!this._doc || !this._fileId) &&
                    (this._collaboratorRoleList || (await this._updateCollaboratorRoleList()),
                    this._collaboratorRoleList.some((role) => role.is(GShareRoleFactory.ROLES.APPROVER_ROLE)))
                );
            }),
            (GFileReviewManager.prototype.getDocumentReviewHistory = async function (fileId) {
                const historyItems = await gApi.annotations.getDesignHistory(fileId).catch(() => []),
                    reviewHistory = [];
                for (let e = 0; e < historyItems.length; e++) {
                    const historyItem = historyItems[e],
                        notification = Notification.from(historyItem);
                    reviewFlowActions.includes(notification.getAction()) && reviewHistory.push(notification);
                }
                return reviewHistory;
            }),
            (module.exports = GFileReviewManager));
    };
