module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(4), require(13), require(32), require(38), require(97), require(33), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            GOfflineDialog = _interopRequireDefault(require(256 /* GOfflineDialog */)),
            AppError = _interopRequireDefault(require(355)),
            Utils = require(40);
        const GSystemDialog = require(44),
            GUserLoggedEvent = require(292),
            GDocumentEvent = require(78),
            GDocumentStatusEvent = require(217),
            GCloudStorage = require(220),
            GCollaborationEvent = require(393),
            GShareStateChangedEvent = require(1323),
            DocumentStatus = require(86),
            {
                DESIGNER,
                SHARE_ENGINE,
                HAS_ANNOTATIONS,
                gApi,
                ShareRoles,
                SharePermissions,
                Share,
                LEGACY_SHARE_DIALOG,
                ENABLE_REQUEST_ACCESS,
            } = require(10 /* designerConfig */),
            GShareRole = require(433),
            Collaborator = require(1324),
            GUser = require(177),
            ShareState = require(1565),
            GShareEvent = require(868),
            AsyncCache = require(536),
            GStorage = require(237),
            ShareDialog = require(LEGACY_SHARE_DIALOG ? 1566 : 1567);
        function GShareManager() {
            (SHARE_ENGINE && (gDesigner.addEventListener(GUserLoggedEvent, this._userEvent, this), gDesigner.addEventListener(GDocumentEvent, this._documentEvent, this)),
                (this._states = new Map()),
                (this._isDefaulNotificationAlreadyShown = new Map()));
        }
        ((GShareManager.prototype._states = null),
            (GShareManager.prototype._requestAccessDialog = null),
            (GShareManager.prototype._requestPermissionDialog = null),
            (GShareManager.prototype._requestEmailHasBeenSent = false),
            (GShareManager.prototype._collaboratorsCached = {}),
            (GShareManager.prototype.share = function (documentOrItem, callback) {
                const self = this,
                    isItem = documentOrItem instanceof GStorage.Item,
                    performShare = async function () {
                        let item = null;
                        if (isItem) item = documentOrItem;
                        else {
                            const doc = documentOrItem || gDesigner.getActiveDocument();
                            item = doc && doc.getStorageItem();
                        }
                        (item.supportsExternalSharing() && (await self._syncExternalPermissions(item)),
                            self._openShareDialog(await gDesigner.getUser(), item, callback));
                    };
                gDesigner.isOffline()
                    ? GOfflineDialog.default.openUnavailableFeature(performShare)
                    : this.isShareProRestricted()
                      ? gDesigner.handlePROFeatureInterruption()
                      : performShare();
            }),
            (GShareManager.prototype._openShareDialog = async function (user, item, callback) {
                const dialog = new ShareDialog(user, item, callback);
                await dialog.open();
            }),
            (GShareManager.prototype._documentEvent = async function (event) {
                const document = event.document;
                if (!document || !document.isLockedByVersionHistory())
                    switch (event.type) {
                        case GDocumentEvent.Type.Activated:
                            (await this._checkAccessAndUpdateState(document)) &&
                                (this._showDefaultNotification(document),
                                document.removeEventListener(GCollaborationEvent, this._collaborationEvent, this),
                                document.addEventListener(GCollaborationEvent, this._collaborationEvent, this));
                            break;
                        case GDocumentEvent.Type.Deactivated:
                            document.removeEventListener(GCollaborationEvent, this._collaborationEvent, this);
                            break;
                        case GDocumentEvent.Type.Removed:
                            (document.getId() && delete this._collaboratorsCached[document.getId()], this._states.delete(document));
                            break;
                        case GDocumentEvent.Type.StorageItemUpdated: {
                            document.isShareable() && document.lock();
                            const onStorageStatusChange = async (statusEvent) => {
                                if (statusEvent.status !== DocumentStatus.Loading)
                                    try {
                                        (document.removeEventListener(GDocumentStatusEvent, onStorageStatusChange),
                                            (await this._checkAccessAndUpdateState(document)) && this._showDefaultNotification(document));
                                    } finally {
                                        document.unlock();
                                    }
                            };
                            document.addEventListener(GDocumentStatusEvent, onStorageStatusChange);
                            break;
                        }
                    }
            }),
            (GShareManager.prototype.isPermissionRequestEnabled = function () {
                return ENABLE_REQUEST_ACCESS && !gDesigner.getLicense().isGuest();
            }),
            (GShareManager.prototype.getRole = function (document) {
                document = document || gDesigner.getActiveDocument();
                const { role } = this._getState(document);
                return role || GShareRole.ROLES.NO_ACCESS_ROLE;
            }),
            (GShareManager.prototype._collaborationEvent = async function (event) {
                const { sender, type } = event;
                if (sender === gDesigner.getActiveDocument())
                    switch (type) {
                        case GCollaborationEvent.Type.ShareUpdate:
                            (this.resetCollaboratorsCached(sender), this._getState(sender).sharing || (await this._updateState(sender)));
                            const previousRole = this.getRole(sender);
                            if (await this._checkAccessAndUpdateState(sender)) {
                                const newRole = this.getRole(sender);
                                previousRole.equals(newRole) || (sender.getStatus() !== DocumentStatus.Loading && this._showRoleNotification(sender));
                            }
                            break;
                        case GCollaborationEvent.Type.UserUpdate:
                            this._updateRealtimeCollaborators(sender);
                    }
            }),
            (GShareManager.prototype._userEvent = async function () {
                const document = gDesigner.getActiveDocument();
                document && (await this._updateState(document), this._showDefaultNotification(document));
            }),
            (GShareManager.prototype._showRoleNotification = function (document) {
                if (!document) return;
                const role = this.getRole(document);
                if (!role) return;
                const message = GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.new-role-is-".concat(role.getId())));
                message &&
                    gDesigner.addNotification({
                        document: document,
                        message: message,
                        anonymous: gDesigner.isAnonymous(),
                        popup: true,
                    });
            }),
            (GShareManager.prototype._showDefaultNotification = async function (document) {
                if (!document) return;
                if (
                    (void 0 === this._isDefaulNotificationAlreadyShown.get(document.sessionId) &&
                        this._isDefaulNotificationAlreadyShown.set(document.sessionId, false),
                    this._isDefaulNotificationAlreadyShown.get(document.sessionId))
                )
                    return;
                const isSharedTemplate = document.isDocumentFromTemplate() && document.isShared();
                let owner;
                if (isSharedTemplate) owner = { name: DESIGNER.TITLE };
                else {
                    const currentUser = await gDesigner.getUser(),
                        fileExtended = await this._getFileExtended(document);
                    if (currentUser && fileExtended) {
                        fileExtended.getPrivateShareList().some((share) => {
                            if (share.owner && share.id !== currentUser.getUID()) return ((owner = { name: share.name || share.email, id: share.id }), true);
                        });
                        const token = new URL(location.href).searchParams.get("token");
                        if (token) {
                            const publicShare = fileExtended.getPublicShare();
                            if (publicShare && publicShare.token === token) {
                                const sharedBy = publicShare.shared_by;
                                sharedBy && sharedBy.id && sharedBy.id !== currentUser.getUID() && (owner = sharedBy);
                            }
                        }
                    }
                }
                if (owner) {
                    document.setOwner(owner);
                    const messages = [];
                    if (isSharedTemplate) messages.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.template-shared-by")).replace("%name", owner.name));
                    else if ((messages.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.shared-by")).replace("%name", owner.name)), !LEGACY_SHARE_DIALOG)) {
                        const role = this.getRole(document);
                        role && role.getStatus() && messages.push(role.getStatus());
                    }
                    if (LEGACY_SHARE_DIALOG) {
                        const state = this._getState(document);
                        state.copy || state.inspect
                            ? (state.copy || messages.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.save-warning"))),
                              state.inspect || messages.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.inspect-warning"))))
                            : messages.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.combined-warnings")));
                    }
                    messages.length &&
                        gDesigner.addNotification({
                            document: document,
                            message: messages.join(" "),
                            anonymous: gDesigner.isAnonymous(),
                            popup: true,
                            closeCallback: () => {
                                this._isDefaulNotificationAlreadyShown.set(document.sessionId, true);
                            },
                        });
                }
            }),
            (GShareManager.prototype._canAccess = async function (document) {
                return !!(await this._getFileExtended(document).catch(() => false));
            }),
            (GShareManager.prototype.getRealtimeCollaborators = async function (file) {
                return gApi.realtime
                    .getCollaborators(file.id, { anonymous: false })
                    .then((collaborators) =>
                        collaborators.map((record) => {
                            const role = ((record) => {
                                const privateShare = file.getPrivateShare(record.access_id);
                                if (privateShare) return GShareRole.makeFromShare(privateShare);
                                const publicShare = file.getPublicShare();
                                return publicShare ? GShareRole.makeFromShare(publicShare) : GShareRole.makeFromShareRole(ShareRoles.NoAccess);
                            })(record);
                            return new Collaborator(Object.assign(record, { role: role }));
                        })
                    )
                    .catch(() => []);
            }),
            (GShareManager.prototype._getFileExtended = function (document) {
                return gDesigner.getCloudCommunicationManager().getFileExtendedCached(document);
            }),
            (GShareManager.prototype._getCollaborators = async function (document) {
                const file = await this._getFileExtended(document);
                if (!file) return null;
                let collaborators = [];
                return (
                    (collaborators = collaborators.concat(await this._getFileCollaboratorsAsUsers(file))),
                    (collaborators = collaborators.concat(this._getInvitedCollaboratorsAsUsers(file))),
                    collaborators
                );
            }),
            (GShareManager.prototype._getInvitedCollaboratorsAsUsers = function (file) {
                return file.getInvitedShareList().map((share) => {
                    const role = GShareRole.makeFromShare(share),
                        user = new GUser({ id: share.email });
                    return (user.setRole(role), user);
                });
            }),
            (GShareManager.prototype._getFileCollaboratorsAsUsers = function (file) {
                return gDesigner
                    .getCloudCommunicationManager()
                    .getCollaborators(file.id)
                    .then((collaborators) =>
                        collaborators.map((record) => {
                            const user = new GUser(record),
                                role = ((user) => {
                                    const privateShare = file.getPrivateShare(user.getUID());
                                    if (privateShare) return GShareRole.makeFromShare(privateShare);
                                    const publicShare = file.getPublicShare();
                                    return publicShare ? GShareRole.makeFromShare(publicShare) : GShareRole.makeFromShareRole(ShareRoles.NoAccess);
                                })(user);
                            return (user.setRole(role), user);
                        })
                    )
                    .catch(() => []);
            }),
            (GShareManager.prototype.resetCollaboratorsCached = function (document) {
                if ((document = document || gDesigner.getActiveDocument()) && document.getId()) {
                    const cache = this._collaboratorsCached[document.getId()];
                    cache && cache.reset();
                }
            }),
            (GShareManager.prototype.getCollaboratorsCached = async function (document) {
                return (document = document || gDesigner.getActiveDocument()) && document.getId()
                    ? (this._collaboratorsCached[document.getId()] ||
                          (this._collaboratorsCached[document.getId()] = new AsyncCache(() => this._getCollaborators(document))),
                      this._collaboratorsCached[document.getId()].get())
                    : [];
            }),
            (GShareManager.prototype.getPrivateInvitedShareList = async function (document) {
                const file = await this._getFileExtended(document);
                return this._getPrivateInvitedShareListForFile(file);
            }),
            (GShareManager.prototype.getRoleNameByUserId = async function (userId) {
                const document = gDesigner.getActiveDocument();
                if (!document.isCloudFile() && !document.isExternalFile()) return GShareRole.ROLES.OWNER_ROLE.getName();
                const collaborator = await this.getCollaboratorById(userId);
                return ((collaborator && collaborator.getRole()) || GShareRole.ROLES.NO_ACCESS_ROLE).getName();
            }),
            (GShareManager.prototype.getCollaboratorById = async function (userId) {
                let found = null;
                const collaborators = await this.getCollaboratorsCached();
                return (collaborators && (found = collaborators.find((collaborator) => collaborator.getUID() === userId)), found);
            }),
            (GShareManager.prototype._getPrivateInvitedShareListForFile = function (file) {
                if (!file) return null;
                const privateShares = file.getPrivateShareList(),
                    invitedShares = (file.getInvitedShareList && file.getInvitedShareList()) || [];
                return privateShares.concat(invitedShares);
            }),
            (GShareManager.prototype.updateStateForDocument = function (document) {
                this._updateState(document);
            }),
            (GShareManager.prototype._updateState = async function (document) {
                const state = this._createDefaultShareStateForDoc(document),
                    storageItem = document && document.getStorageItem(),
                    user = await gDesigner.getUser();
                if (!user) return this._setState(document, state);
                if (document && document.isDocumentFromTemplate() && document.isShared()) this._applyStateFromTemplate(state);
                else if (storageItem instanceof GCloudStorage.Item) {
                    const file = await this._getFileExtended(document);
                    file && (await this._applyStateFromFile(user, file, state));
                } else if (storageItem && storageItem.getId() && storageItem.supportsSharing() && storageItem.supportsShadowFile()) {
                    const file = await this._getFileExtended(document);
                    file && ((state.share = true), await this._applyStateFromFile(user, file, state));
                } else await this._getFileExtended(document);
                (this._setState(document, state), gDesigner.hasEventListeners(GShareEvent) && gDesigner.trigger(new GShareEvent(GShareEvent.Type.Updated)));
            }),
            (GShareManager.prototype._createDefaultShareStateForDoc = function (document) {
                return new ShareState(
                    Object.assign({}, this._getState(document), {
                        owner: true,
                        share: false,
                        sharing: false,
                        role: GShareRole.ROLES.OWNER_ROLE,
                        isPrivate: true,
                    })
                );
            }),
            (GShareManager.prototype._applyStateFromTemplate = function (state) {
                return Object.assign(state, {
                    edit: true,
                    inspect: true,
                    copy: true,
                    comment: false,
                    share: false,
                    owner: false,
                    sharing: false,
                    realtimeCollaborators: [],
                });
            }),
            (GShareManager.prototype._applyStateFromFile = async function (user, file, baseState) {
                if (!file) throw new AppError.default("File object is required");
                const result = (0, Utils.getFileStateAndRole)(user, file, baseState);
                let role = result.role;
                const { state } = result;
                if (!role) {
                    const publicShare = file.getPublicShare();
                    if (publicShare) {
                        const { copy, inspect, comment, edit } = publicShare;
                        ((role = GShareRole.makeFromShare(publicShare)),
                            Object.assign(state, {
                                owner: false,
                                edit: edit,
                                copy: copy,
                                inspect: inspect,
                                comment: !!HAS_ANNOTATIONS && comment,
                            }));
                    }
                }
                state.role = role || GShareRole.ROLES.NO_ACCESS_ROLE;
                const realtimeCollaborators = await this.getRealtimeCollaborators(file);
                Object.assign(state, { realtimeCollaborators: realtimeCollaborators });
            }),
            (GShareManager.prototype._updateRealtimeCollaborators = async function (document) {
                const file = await this._getFileExtended(document);
                if (file) {
                    const realtimeCollaborators = await this.getRealtimeCollaborators(file);
                    this._setState(document, new ShareState(Object.assign({}, this._getState(document), { realtimeCollaborators: realtimeCollaborators })));
                }
            }),
            (GShareManager.prototype._setState = function (document, state) {
                (this._states.set(document, state), gDesigner.hasEventListeners(GShareStateChangedEvent) && gDesigner.trigger(new GShareStateChangedEvent(document, state)));
            }),
            (GShareManager.prototype._getState = function (document) {
                return this._states.get(document) || new ShareState();
            }),
            (GShareManager.prototype._checkAccessAndUpdateState = async function (document) {
                if (!(await this._requestAccessIfAbsent(document))) return false;
                this._closeRequestAccessDialog();
                const previousRole = this.getRole(document);
                await this._updateState(document);
                const newRole = this.getRole(document);
                return (
                    (previousRole && previousRole.equals(newRole)) || this._requestPermissionToCommentIfAbsent(document),
                    (await this._isUserUnableToOperateSystem(document)) && this._openRequestAccessDialog(document),
                    true
                );
            }),
            (GShareManager.prototype._isUserUnableToOperateSystem = async function (document) {
                if (!document.getId()) return false;
                var shareLevel = await this._getShareLevelForCurrentUser(document);
                return !!(gDesigner.getLicense().isGuest() && shareLevel < 1);
            }),
            (GShareManager.prototype._getShareLevelForCurrentUser = async function (document) {
                const currentUser = await gDesigner.getUser(),
                    file = await this._getFileExtended(document);
                if (currentUser && file) {
                    var privateShare = file.getPrivateShareList().find((share) => {
                        if (share.id === currentUser.getUID()) return true;
                    });
                    if (privateShare) return privateShare.getRole().level;
                    const publicShare = file.getPublicShare();
                    return publicShare ? publicShare.getRole().level : new GShareRole.makeFromShareRole(ShareRoles.NoAccess);
                }
                return new GShareRole.makeFromShareRole(ShareRoles.NoAccess).level;
            }),
            (GShareManager.prototype._requestAccessIfAbsent = async function (document) {
                return !document.isShareable() || !!(await this._canAccess(document)) || (this._openRequestAccessDialog(document), false);
            }),
            (GShareManager.prototype._requestPermissionToCommentIfAbsent = function (document) {
                if (!document.isShareable()) return;
                if (!document.getFocusAnnotationId()) return;
                const role = this.getRole(document);
                (role && role.is(ShareRoles.Owner)) || role.hasPermission(SharePermissions.COMMENT) || this._requestPermissionToComment(document);
            }),
            (GShareManager.prototype._requestPermissionToComment = function (document) {
                if (this._requestPermissionDialog) return;
                const role = this.getRole(document);
                role &&
                    !role.is(ShareRoles.NoAccess) &&
                    (this._requestPermissionDialog = this._createRequestDialog(document, {
                        className: "g-request-permission-dialog",
                        openCallback: () => {
                            gDesigner.stats("permission-dialog_comment-access_open");
                        },
                        closeCallback: () => {
                            this._requestPermissionDialog = null;
                        },
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.file-can-not-be-commented-title")).replace(
                            "%role",
                            role.getName()
                        ),
                        subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.file-can-not-be-commented-info")),
                        requestButton: {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.file-request-permission-to-comment")),
                            permissions: { comment: true },
                        },
                        statType: "comment-access",
                    }));
            }),
            (GShareManager.prototype._openRequestAccessDialog = function (document) {
                this._requestAccessDialog ||
                    (this._requestAccessDialog = this._createRequestDialog(document, {
                        className: "g-request-access-dialog",
                        openCallback: () => {
                            gDesigner.stats("permission-dialog_no-access_open");
                        },
                        closeCallback: async () => {
                            ((this._requestAccessDialog = null),
                                (await this._canAccess(document)) ||
                                    (gDesigner.removeDocument(document, null, true),
                                    this._requestEmailHasBeenSent &&
                                        (GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.sent-request-email"))),
                                        (this._requestEmailHasBeenSent = false))));
                        },
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.file-can-not-be-accessed-title")),
                        subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.file-can-not-be-accessed-info")),
                        requestButton: {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.file-request-access")),
                            permissions: { access: true },
                        },
                        statType: "no-access",
                    }));
            }),
            (GShareManager.prototype._closeRequestAccessDialog = function () {
                this._requestAccessDialog && (this._requestAccessDialog.gDialog("close"), (this._requestAccessDialog = null));
            }),
            (GShareManager.prototype._createRequestDialog = function (document) {
                let {
                    className: className = "",
                    title,
                    subtitle,
                    closeCallback,
                    requestButton: { label, permissions: permissions = {} } = {},
                    statType,
                } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                var buttons = [];
                return (
                    this.isPermissionRequestEnabled() &&
                        buttons.push({
                            label: label,
                            onclick: (dialogElement) => {
                                gDesigner.stats("permission-dialog_".concat(statType, "_request-access"));
                                const requestPayload = Object.assign(permissions, { isToken: !document.getId() });
                                gApi.requestPermission(document.getId() || document.getFailedDocumentIdOrToken(), requestPayload)
                                    .then(() => {
                                        (dialogElement.gDialog("close"), (this._requestEmailHasBeenSent = true));
                                    })
                                    .catch(() => {
                                        GSystemDialog.error(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.cannot-request-access")));
                                    });
                            },
                        }),
                    buttons.push({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")),
                        onclick: async (dialogElement) => {
                            (gDesigner.stats("permission-dialog_".concat(statType, "_click-ok")),
                                dialogElement.gDialog("close"),
                                (await this._isUserUnableToOperateSystem(document)) && gDesigner.signout(true));
                        },
                        highlighted: true,
                    }),
                    GSystemDialog.custom({
                        icon: "error",
                        closeable: false,
                        className: className,
                        closeCallback: closeCallback,
                        title: title,
                        subtitle: subtitle,
                        buttons: buttons,
                    })
                );
            }),
            (GShareManager.prototype._syncExternalPermissions = async function (storageItem) {
                const externalPermissions = await storageItem.getPermissionsList(),
                    externalFile = await async function fetchExternalFile() {
                        return gDesigner
                            .getCloudCommunicationManager()
                            .getExternalFile(storageItem.getId())
                            .catch((error) => {
                                if (error && 404 === error.status && storageItem.supportsShadowFile()) return storageItem.createShadowFile().then(() => fetchExternalFile.call(this));
                                throw error;
                            });
                    }.call(this),
                    invitedShares = this._getPrivateInvitedShareListForFile(externalFile),
                    currentUser = await gDesigner.getUser();
                return function () {
                    const toAdd = [],
                        toRevoke = [],
                        results = [];
                    (externalPermissions.forEach((permission) => {
                        let { email, role: role, externalRole } = permission;
                        if (email) {
                            let matched = false;
                            (invitedShares.some((invited) => {
                                let { email: invitedEmail, role: invitedRole } = invited;
                                if (email && email === invitedEmail && storageItem.rolesMatch(externalRole, invitedRole)) return ((matched = true), matched);
                            }),
                                matched || toAdd.push({ email: email, role: role }));
                        }
                    }),
                        invitedShares.forEach((invitedShare) => {
                            let matched = false;
                            (externalPermissions.some((permission) => {
                                let { email: email } = permission;
                                if (invitedShare.email === email) return ((matched = true), matched);
                            }),
                                matched || GShareRole.makeFromShare(invitedShare).is(ShareRoles.NoAccess) || toRevoke.push({ email: invitedShare.email }));
                        }),
                        toAdd.length &&
                            results.concat(
                                toAdd.map(async (entry) => {
                                    let { email: email, role: roleId } = entry;
                                    if (currentUser.getEmail() === email) return null;
                                    const matchedRole = Object.values(ShareRoles).find((role) => {
                                            let { id } = role;
                                            return id === roleId;
                                        }),
                                        resolvedRole = roleId && matchedRole ? matchedRole : ShareRoles.NoAccess,
                                        share = new Share().assignRole(resolvedRole);
                                    try {
                                        return await gApi.shareWithUser(storageItem.getId(), email, share);
                                    } catch (e) {
                                        return null;
                                    }
                                })
                            ));
                    toRevoke.length &&
                        results.concat(
                            toRevoke.map(async (entry) => {
                                let { email: email } = entry;
                                return gApi.shareWithUser(storageItem.getId(), email, new Share().assignRole(ShareRoles.NoAccess));
                            })
                        );
                    return Promise.all(results);
                }.call(this);
            }),
            (GShareManager.prototype.getPermalink = async function (document, annotation) {
                const file = await this._getFileExtended(document);
                if (file) {
                    const baseUrl = gDesigner.getAppBaseUrl(true),
                        url = new URL(file.getShareLink(baseUrl));
                    return (url.searchParams.set("annot", annotation.getId()), url.toString());
                }
                return null;
            }),
            (GShareManager.prototype.isShareProRestricted = function () {
                return Share.isPro() && !gDesigner.isEnabledProFeatures();
            }),
            (module.exports = GShareManager));
    };
