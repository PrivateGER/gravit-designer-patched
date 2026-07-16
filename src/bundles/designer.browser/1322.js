module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(19), require(30), require(8 /* Symbol */), require(20), require(3), require(34), require(4), require(13), require(32), require(38), require(97), require(33), require(26), require(125), require(126), require(114));
        var GObject = require(1),
            a = o(require(256 /* GOfflineDialog */)),
            r = o(require(355)),
            GSaveAction = require(40);
        const GSystemDialog = require(44),
            c = require(292),
            d = require(78),
            u = require(217),
            GCommonNames = require(220),
            g = require(393),
            h = require(1323),
            f = require(86),
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
            E = require(433),
            A = require(1324),
            T = require(177),
            G = require(1565),
            P = require(868),
            D = require(536),
            GDocument = require(237),
            I = require(LEGACY_SHARE_DIALOG ? 1566 : 1567);
        function k() {
            (SHARE_ENGINE && (gDesigner.addEventListener(c, this._userEvent, this), gDesigner.addEventListener(d, this._documentEvent, this)),
                (this._states = new Map()),
                (this._isDefaulNotificationAlreadyShown = new Map()));
        }
        ((k.prototype._states = null),
            (k.prototype._requestAccessDialog = null),
            (k.prototype._requestPermissionDialog = null),
            (k.prototype._requestEmailHasBeenSent = false),
            (k.prototype._collaboratorsCached = {}),
            (k.prototype.share = function (e, t) {
                const n = this,
                    o = e instanceof GDocument.Item,
                    i = async function () {
                        let i = null;
                        if (o) i = e;
                        else {
                            const t = e || gDesigner.getActiveDocument();
                            i = t && t.getStorageItem();
                        }
                        (i.supportsExternalSharing() && (await n._syncExternalPermissions(i)),
                            n._openShareDialog(await gDesigner.getUser(), i, t));
                    };
                gDesigner.isOffline()
                    ? a.default.openUnavailableFeature(i)
                    : this.isShareProRestricted()
                      ? gDesigner.handlePROFeatureInterruption()
                      : i();
            }),
            (k.prototype._openShareDialog = async function (e, t, n) {
                const o = new I(e, t, n);
                await o.open();
            }),
            (k.prototype._documentEvent = async function (e) {
                const t = e.document;
                if (!t || !t.isLockedByVersionHistory())
                    switch (e.type) {
                        case d.Type.Activated:
                            (await this._checkAccessAndUpdateState(t)) &&
                                (this._showDefaultNotification(t),
                                t.removeEventListener(g, this._collaborationEvent, this),
                                t.addEventListener(g, this._collaborationEvent, this));
                            break;
                        case d.Type.Deactivated:
                            t.removeEventListener(g, this._collaborationEvent, this);
                            break;
                        case d.Type.Removed:
                            (t.getId() && delete this._collaboratorsCached[t.getId()], this._states.delete(t));
                            break;
                        case d.Type.StorageItemUpdated: {
                            t.isShareable() && t.lock();
                            const e = async (n) => {
                                if (n.status !== f.Loading)
                                    try {
                                        (t.removeEventListener(u, e),
                                            (await this._checkAccessAndUpdateState(t)) && this._showDefaultNotification(t));
                                    } finally {
                                        t.unlock();
                                    }
                            };
                            t.addEventListener(u, e);
                            break;
                        }
                    }
            }),
            (k.prototype.isPermissionRequestEnabled = function () {
                return ENABLE_REQUEST_ACCESS && !gDesigner.getLicense().isGuest();
            }),
            (k.prototype.getRole = function (e) {
                e = e || gDesigner.getActiveDocument();
                const { role } = this._getState(e);
                return role || E.ROLES.NO_ACCESS_ROLE;
            }),
            (k.prototype._collaborationEvent = async function (e) {
                const { sender, type } = e;
                if (sender === gDesigner.getActiveDocument())
                    switch (type) {
                        case g.Type.ShareUpdate:
                            (this.resetCollaboratorsCached(sender), this._getState(sender).sharing || (await this._updateState(sender)));
                            const e = this.getRole(sender);
                            if (await this._checkAccessAndUpdateState(sender)) {
                                const n = this.getRole(sender);
                                e.equals(n) || (sender.getStatus() !== f.Loading && this._showRoleNotification(sender));
                            }
                            break;
                        case g.Type.UserUpdate:
                            this._updateRealtimeCollaborators(sender);
                    }
            }),
            (k.prototype._userEvent = async function () {
                const e = gDesigner.getActiveDocument();
                e && (await this._updateState(e), this._showDefaultNotification(e));
            }),
            (k.prototype._showRoleNotification = function (e) {
                if (!e) return;
                const t = this.getRole(e);
                if (!t) return;
                const n = GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.new-role-is-".concat(t.getId())));
                n &&
                    gDesigner.addNotification({
                        document: e,
                        message: n,
                        anonymous: gDesigner.isAnonymous(),
                        popup: true,
                    });
            }),
            (k.prototype._showDefaultNotification = async function (e) {
                if (!e) return;
                if (
                    (void 0 === this._isDefaulNotificationAlreadyShown.get(e.sessionId) &&
                        this._isDefaulNotificationAlreadyShown.set(e.sessionId, false),
                    this._isDefaulNotificationAlreadyShown.get(e.sessionId))
                )
                    return;
                const t = e.isDocumentFromTemplate() && e.isShared();
                let n;
                if (t) n = { name: DESIGNER.TITLE };
                else {
                    const t = await gDesigner.getUser(),
                        o = await this._getFileExtended(e);
                    if (t && o) {
                        o.getPrivateShareList().some((e) => {
                            if (e.owner && e.id !== t.getUID()) return ((n = { name: e.name || e.email, id: e.id }), true);
                        });
                        const e = new URL(location.href).searchParams.get("token");
                        if (e) {
                            const i = o.getPublicShare();
                            if (i && i.token === e) {
                                const e = i.shared_by;
                                e && e.id && e.id !== t.getUID() && (n = e);
                            }
                        }
                    }
                }
                if (n) {
                    e.setOwner(n);
                    const o = [];
                    if (t) o.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.template-shared-by")).replace("%name", n.name));
                    else if ((o.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.shared-by")).replace("%name", n.name)), !LEGACY_SHARE_DIALOG)) {
                        const t = this.getRole(e);
                        t && t.getStatus() && o.push(t.getStatus());
                    }
                    if (LEGACY_SHARE_DIALOG) {
                        const t = this._getState(e);
                        t.copy || t.inspect
                            ? (t.copy || o.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.save-warning"))),
                              t.inspect || o.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.inspect-warning"))))
                            : o.push(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.combined-warnings")));
                    }
                    o.length &&
                        gDesigner.addNotification({
                            document: e,
                            message: o.join(" "),
                            anonymous: gDesigner.isAnonymous(),
                            popup: true,
                            closeCallback: () => {
                                this._isDefaulNotificationAlreadyShown.set(e.sessionId, true);
                            },
                        });
                }
            }),
            (k.prototype._canAccess = async function (e) {
                return !!(await this._getFileExtended(e).catch(() => false));
            }),
            (k.prototype.getRealtimeCollaborators = async function (e) {
                return gApi.realtime
                    .getCollaborators(e.id, { anonymous: false })
                    .then((t) =>
                        t.map((t) => {
                            const n = ((t) => {
                                const n = e.getPrivateShare(t.access_id);
                                if (n) return E.makeFromShare(n);
                                const o = e.getPublicShare();
                                return o ? E.makeFromShare(o) : E.makeFromShareRole(ShareRoles.NoAccess);
                            })(t);
                            return new A(Object.assign(t, { role: n }));
                        })
                    )
                    .catch(() => []);
            }),
            (k.prototype._getFileExtended = function (e) {
                return gDesigner.getCloudCommunicationManager().getFileExtendedCached(e);
            }),
            (k.prototype._getCollaborators = async function (e) {
                const t = await this._getFileExtended(e);
                if (!t) return null;
                let n = [];
                return (
                    (n = n.concat(await this._getFileCollaboratorsAsUsers(t))),
                    (n = n.concat(this._getInvitedCollaboratorsAsUsers(t))),
                    n
                );
            }),
            (k.prototype._getInvitedCollaboratorsAsUsers = function (e) {
                return e.getInvitedShareList().map((e) => {
                    const t = E.makeFromShare(e),
                        n = new T({ id: e.email });
                    return (n.setRole(t), n);
                });
            }),
            (k.prototype._getFileCollaboratorsAsUsers = function (e) {
                return gDesigner
                    .getCloudCommunicationManager()
                    .getCollaborators(e.id)
                    .then((t) =>
                        t.map((t) => {
                            const n = new T(t),
                                o = ((t) => {
                                    const n = e.getPrivateShare(t.getUID());
                                    if (n) return E.makeFromShare(n);
                                    const o = e.getPublicShare();
                                    return o ? E.makeFromShare(o) : E.makeFromShareRole(ShareRoles.NoAccess);
                                })(n);
                            return (n.setRole(o), n);
                        })
                    )
                    .catch(() => []);
            }),
            (k.prototype.resetCollaboratorsCached = function (e) {
                if ((e = e || gDesigner.getActiveDocument()) && e.getId()) {
                    const t = this._collaboratorsCached[e.getId()];
                    t && t.reset();
                }
            }),
            (k.prototype.getCollaboratorsCached = async function (e) {
                return (e = e || gDesigner.getActiveDocument()) && e.getId()
                    ? (this._collaboratorsCached[e.getId()] ||
                          (this._collaboratorsCached[e.getId()] = new D(() => this._getCollaborators(e))),
                      this._collaboratorsCached[e.getId()].get())
                    : [];
            }),
            (k.prototype.getPrivateInvitedShareList = async function (e) {
                const t = await this._getFileExtended(e);
                return this._getPrivateInvitedShareListForFile(t);
            }),
            (k.prototype.getRoleNameByUserId = async function (e) {
                const t = gDesigner.getActiveDocument();
                if (!t.isCloudFile() && !t.isExternalFile()) return E.ROLES.OWNER_ROLE.getName();
                const n = await this.getCollaboratorById(e);
                return ((n && n.getRole()) || E.ROLES.NO_ACCESS_ROLE).getName();
            }),
            (k.prototype.getCollaboratorById = async function (e) {
                let t = null;
                const n = await this.getCollaboratorsCached();
                return (n && (t = n.find((t) => t.getUID() === e)), t);
            }),
            (k.prototype._getPrivateInvitedShareListForFile = function (e) {
                if (!e) return null;
                const t = e.getPrivateShareList(),
                    n = (e.getInvitedShareList && e.getInvitedShareList()) || [];
                return t.concat(n);
            }),
            (k.prototype.updateStateForDocument = function (e) {
                this._updateState(e);
            }),
            (k.prototype._updateState = async function (e) {
                const t = this._createDefaultShareStateForDoc(e),
                    n = e && e.getStorageItem(),
                    o = await gDesigner.getUser();
                if (!o) return this._setState(e, t);
                if (e && e.isDocumentFromTemplate() && e.isShared()) this._applyStateFromTemplate(t);
                else if (n instanceof GCommonNames.Item) {
                    const n = await this._getFileExtended(e);
                    n && (await this._applyStateFromFile(o, n, t));
                } else if (n && n.getId() && n.supportsSharing() && n.supportsShadowFile()) {
                    const n = await this._getFileExtended(e);
                    n && ((t.share = true), await this._applyStateFromFile(o, n, t));
                } else await this._getFileExtended(e);
                (this._setState(e, t), gDesigner.hasEventListeners(P) && gDesigner.trigger(new P(P.Type.Updated)));
            }),
            (k.prototype._createDefaultShareStateForDoc = function (e) {
                return new G(
                    Object.assign({}, this._getState(e), {
                        owner: true,
                        share: false,
                        sharing: false,
                        role: E.ROLES.OWNER_ROLE,
                        isPrivate: true,
                    })
                );
            }),
            (k.prototype._applyStateFromTemplate = function (e) {
                return Object.assign(e, {
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
            (k.prototype._applyStateFromFile = async function (e, t, n) {
                if (!t) throw new r.default("File object is required");
                const o = (0, GSaveAction.getFileStateAndRole)(e, t, n);
                let i = o.role;
                const { state } = o;
                if (!i) {
                    const e = t.getPublicShare();
                    if (e) {
                        const { copy, inspect, comment, edit } = e;
                        ((i = E.makeFromShare(e)),
                            Object.assign(state, {
                                owner: false,
                                edit: edit,
                                copy: copy,
                                inspect: inspect,
                                comment: !!HAS_ANNOTATIONS && comment,
                            }));
                    }
                }
                state.role = i || E.ROLES.NO_ACCESS_ROLE;
                const l = await this.getRealtimeCollaborators(t);
                Object.assign(state, { realtimeCollaborators: l });
            }),
            (k.prototype._updateRealtimeCollaborators = async function (e) {
                const t = await this._getFileExtended(e);
                if (t) {
                    const n = await this.getRealtimeCollaborators(t);
                    this._setState(e, new G(Object.assign({}, this._getState(e), { realtimeCollaborators: n })));
                }
            }),
            (k.prototype._setState = function (e, t) {
                (this._states.set(e, t), gDesigner.hasEventListeners(h) && gDesigner.trigger(new h(e, t)));
            }),
            (k.prototype._getState = function (e) {
                return this._states.get(e) || new G();
            }),
            (k.prototype._checkAccessAndUpdateState = async function (e) {
                if (!(await this._requestAccessIfAbsent(e))) return false;
                this._closeRequestAccessDialog();
                const t = this.getRole(e);
                await this._updateState(e);
                const n = this.getRole(e);
                return (
                    (t && t.equals(n)) || this._requestPermissionToCommentIfAbsent(e),
                    (await this._isUserUnableToOperateSystem(e)) && this._openRequestAccessDialog(e),
                    true
                );
            }),
            (k.prototype._isUserUnableToOperateSystem = async function (e) {
                if (!e.getId()) return false;
                var t = await this._getShareLevelForCurrentUser(e);
                return !!(gDesigner.getLicense().isGuest() && t < 1);
            }),
            (k.prototype._getShareLevelForCurrentUser = async function (e) {
                const t = await gDesigner.getUser(),
                    n = await this._getFileExtended(e);
                if (t && n) {
                    var o = n.getPrivateShareList().find((e) => {
                        if (e.id === t.getUID()) return true;
                    });
                    if (o) return o.getRole().level;
                    const e = n.getPublicShare();
                    return e ? e.getRole().level : new E.makeFromShareRole(ShareRoles.NoAccess);
                }
                return new E.makeFromShareRole(ShareRoles.NoAccess).level;
            }),
            (k.prototype._requestAccessIfAbsent = async function (e) {
                return !e.isShareable() || !!(await this._canAccess(e)) || (this._openRequestAccessDialog(e), false);
            }),
            (k.prototype._requestPermissionToCommentIfAbsent = function (e) {
                if (!e.isShareable()) return;
                if (!e.getFocusAnnotationId()) return;
                const t = this.getRole(e);
                (t && t.is(ShareRoles.Owner)) || t.hasPermission(SharePermissions.COMMENT) || this._requestPermissionToComment(e);
            }),
            (k.prototype._requestPermissionToComment = function (e) {
                if (this._requestPermissionDialog) return;
                const t = this.getRole(e);
                t &&
                    !t.is(ShareRoles.NoAccess) &&
                    (this._requestPermissionDialog = this._createRequestDialog(e, {
                        className: "g-request-permission-dialog",
                        openCallback: () => {
                            gDesigner.stats("permission-dialog_comment-access_open");
                        },
                        closeCallback: () => {
                            this._requestPermissionDialog = null;
                        },
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.file-can-not-be-commented-title")).replace(
                            "%role",
                            t.getName()
                        ),
                        subtitle: GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.file-can-not-be-commented-info")),
                        requestButton: {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.file-request-permission-to-comment")),
                            permissions: { comment: true },
                        },
                        statType: "comment-access",
                    }));
            }),
            (k.prototype._openRequestAccessDialog = function (e) {
                this._requestAccessDialog ||
                    (this._requestAccessDialog = this._createRequestDialog(e, {
                        className: "g-request-access-dialog",
                        openCallback: () => {
                            gDesigner.stats("permission-dialog_no-access_open");
                        },
                        closeCallback: async () => {
                            ((this._requestAccessDialog = null),
                                (await this._canAccess(e)) ||
                                    (gDesigner.removeDocument(e, null, true),
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
            (k.prototype._closeRequestAccessDialog = function () {
                this._requestAccessDialog && (this._requestAccessDialog.gDialog("close"), (this._requestAccessDialog = null));
            }),
            (k.prototype._createRequestDialog = function (e) {
                let {
                    className: t = "",
                    title,
                    subtitle,
                    closeCallback,
                    requestButton: { label, permissions: s = {} } = {},
                    statType,
                } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                var d = [];
                return (
                    this.isPermissionRequestEnabled() &&
                        d.push({
                            label: label,
                            onclick: (t) => {
                                gDesigner.stats("permission-dialog_".concat(statType, "_request-access"));
                                const n = Object.assign(s, { isToken: !e.getId() });
                                gApi.requestPermission(e.getId() || e.getFailedDocumentIdOrToken(), n)
                                    .then(() => {
                                        (t.gDialog("close"), (this._requestEmailHasBeenSent = true));
                                    })
                                    .catch(() => {
                                        GSystemDialog.error(GObject.GLocale.get(new GObject.GLocaleKey("GShareManager", "text.cannot-request-access")));
                                    });
                            },
                        }),
                    d.push({
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")),
                        onclick: async (t) => {
                            (gDesigner.stats("permission-dialog_".concat(statType, "_click-ok")),
                                t.gDialog("close"),
                                (await this._isUserUnableToOperateSystem(e)) && gDesigner.signout(true));
                        },
                        highlighted: true,
                    }),
                    GSystemDialog.custom({
                        icon: "error",
                        closeable: false,
                        className: t,
                        closeCallback: closeCallback,
                        title: title,
                        subtitle: subtitle,
                        buttons: d,
                    })
                );
            }),
            (k.prototype._syncExternalPermissions = async function (e) {
                const t = await e.getPermissionsList(),
                    n = await async function t() {
                        return gDesigner
                            .getCloudCommunicationManager()
                            .getExternalFile(e.getId())
                            .catch((n) => {
                                if (n && 404 === n.status && e.supportsShadowFile()) return e.createShadowFile().then(() => t.call(this));
                                throw n;
                            });
                    }.call(this),
                    o = this._getPrivateInvitedShareListForFile(n),
                    i = await gDesigner.getUser();
                return function () {
                    const n = [],
                        a = [],
                        r = [];
                    (t.forEach((t) => {
                        let { email, role: a, externalRole } = t;
                        if (email) {
                            let t = false;
                            (o.some((n) => {
                                let { email: o, role: a } = n;
                                if (email && email === o && e.rolesMatch(externalRole, a)) return ((t = true), t);
                            }),
                                t || n.push({ email: email, role: a }));
                        }
                    }),
                        o.forEach((e) => {
                            let n = false;
                            (t.some((t) => {
                                let { email: o } = t;
                                if (e.email === o) return ((n = true), n);
                            }),
                                n || E.makeFromShare(e).is(ShareRoles.NoAccess) || a.push({ email: e.email }));
                        }),
                        n.length &&
                            r.concat(
                                n.map(async (t) => {
                                    let { email: n, role: o } = t;
                                    if (i.getEmail() === n) return null;
                                    const a = Object.values(ShareRoles).find((e) => {
                                            let { id } = e;
                                            return id === o;
                                        }),
                                        r = o && a ? a : ShareRoles.NoAccess,
                                        s = new Share().assignRole(r);
                                    try {
                                        return await gApi.shareWithUser(e.getId(), n, s);
                                    } catch (e) {
                                        return null;
                                    }
                                })
                            ));
                    a.length &&
                        r.concat(
                            a.map(async (t) => {
                                let { email: n } = t;
                                return gApi.shareWithUser(e.getId(), n, new Share().assignRole(ShareRoles.NoAccess));
                            })
                        );
                    return Promise.all(r);
                }.call(this);
            }),
            (k.prototype.getPermalink = async function (e, t) {
                const n = await this._getFileExtended(e);
                if (n) {
                    const e = gDesigner.getAppBaseUrl(true),
                        o = new URL(n.getShareLink(e));
                    return (o.searchParams.set("annot", t.getId()), o.toString());
                }
                return null;
            }),
            (k.prototype.isShareProRestricted = function () {
                return Share.isPro() && !gDesigner.isEnabledProFeatures();
            }),
            (module.exports = k));
    };
