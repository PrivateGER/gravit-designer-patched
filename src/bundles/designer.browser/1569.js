module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(30 /* polyfill:Object */), require(8 /* Symbol */));
        var i = _interopRequireDefault(require(11));
        require(1322 /* GShareManager */);
        const a = require(808),
            r = require(1570),
            s = require(392),
            l = require(1323),
            c = require(441),
            {
                SHARE_ENGINE,
                HAS_ANNOTATIONS,
                ShareRoles,
                FileStatus: { APPROVED },
                FILE_REVIEW_ENABLED,
                LEGACY_SHARE_DIALOG,
            } = require(10 /* designerConfig */);
        function m(e) {
            ((this._state = new r()),
                SHARE_ENGINE && gDesigner.addEventListener(l, this._shareStateChangedEvent, this),
                gDesigner.addEventListener(a, this._applicationStatusEvent, this),
                gDesigner.addEventListener(c, this._licenseChangedEvent, this),
                this._init(e));
        }
        ((m.prototype._init = async function (e) {
            e && e();
        }),
            (m.prototype._shareStateChangedEvent = function (e) {
                const t = new r(Object.assign({}, this._state)),
                    {
                        owner,
                        share,
                        sharing,
                        edit,
                        inspect,
                        copy,
                        comment,
                        isPrivate,
                        role,
                        realtimeCollaborators: g = [],
                    } = e.state;
                (owner
                    ? Object.assign(t, {
                          edit: true,
                          saveAs: true,
                          export: true,
                          inspect: true,
                          copyPaste: true,
                          comment: !!HAS_ANNOTATIONS,
                      })
                    : Object.assign(t, {
                          edit: edit,
                          saveAs: copy,
                          export: copy,
                          copyPaste: copy,
                          inspect: inspect,
                          comment: comment,
                      }),
                    Object.assign(t, {
                        isShareEnabled: share,
                        isSharing: sharing,
                        isPrivateSharing: isPrivate,
                        role: role,
                        realtimeCollaborators: g,
                    }),
                    this._setState(t, e.document));
            }),
            (m.prototype._setState = function (e, t) {
                i.default.equals(e, this._state, true) || ((this._state = e), this._triggerAppStateEvent(t, e));
            }),
            (m.prototype._triggerAppStateEvent = function (e, t) {
                gDesigner.hasEventListeners(s) && gDesigner.trigger(new s(e, t));
            }),
            (m.prototype._applicationStatusEvent = function (e) {
                e.status === a.Status.Ready && gDesigner.isAnonymous() && gDesigner.addNotification({ anonymous: true });
            }),
            (m.prototype._licenseChangedEvent = function (e) {}),
            (m.prototype.isShareEnabled = function () {
                return !!this._state.isShareEnabled && SHARE_ENGINE;
            }),
            (m.prototype.isShareEngineEnabled = function () {
                return SHARE_ENGINE;
            }),
            (m.prototype.isSharing = function () {
                return !!this._state.isSharing && SHARE_ENGINE;
            }),
            (m.prototype.isPrivateSharing = function () {
                return this._state.isPrivateSharing && !!SHARE_ENGINE;
            }),
            (m.prototype.getRealtimeCollaborators = function () {
                return (SHARE_ENGINE && this._state.realtimeCollaborators) || [];
            }),
            (m.prototype.isEditingEnabled = function () {
                return !gDesigner.getLicense().isGuest() && (this._state.edit || (!!LEGACY_SHARE_DIALOG && this._state.inspect));
            }),
            (m.prototype.isSavingAsEnabled = function () {
                return !gDesigner.getLicense().isGuest() && this._state.saveAs;
            }),
            (m.prototype.isSavingToCloudEnabled = function () {
                return !gDesigner.getLicense().isGuest() && this._state.edit;
            }),
            (m.prototype.isExportEnabled = function () {
                return !gDesigner.getLicense().isGuest() && this._state.export;
            }),
            (m.prototype.isInspectEnabled = function () {
                return this._state.inspect || this._state.edit;
            }),
            (m.prototype.isPagesInspectEnabled = function () {
                return this.isInspectEnabled();
            }),
            (m.prototype.isCommentingEnabled = function () {
                return this._state.comment && HAS_ANNOTATIONS;
            }),
            (m.prototype.isCommentingEditingEnabled = function () {
                if (!this.isCommentingEnabled()) return false;
                if (FILE_REVIEW_ENABLED) {
                    var e = true,
                        t = gDesigner.getActiveDocument(),
                        n = t && t.getStorageItem(),
                        o = n && n.getFile();
                    return (o && o.status === APPROVED && (e = false), e);
                }
                return true;
            }),
            (m.prototype.isCopyPasteEnabled = function () {
                return this._state.copyPaste;
            }),
            (m.prototype.hasAccess = async function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                const n = gDesigner.getShareManager().getRole();
                return !(!n || !((!t && n.is(ShareRoles.Owner)) || (await n.can(e))));
            }),
            (m.prototype.hasPermission = function (e, t) {
                const n = gDesigner.getShareManager().getRole(e);
                return !(!n || !n.hasPermission(t));
            }),
            (m.prototype.hasRole = function (e) {
                const t = gDesigner.getShareManager().getRole();
                return !!t && t.is(e);
            }),
            (m.prototype.isFileFormatEnabledForSaveAs = function (e) {
                return this._state.saveAs;
            }),
            (m.prototype.isCreatingNewDocumentEnabled = function () {
                return !gDesigner.getLicense().isGuest();
            }),
            (m.prototype.isOpenFromCloudEnabled = function () {
                return !gDesigner.getLicense().isGuest();
            }),
            (m.prototype.isOnlyFileOpenFromCloudEnabled = function () {
                return false;
            }),
            (m.prototype.isOpenFromRecentFilesEnabled = function () {
                return true;
            }),
            (m.prototype.isDocumentTabManagementEnabled = function () {
                return this._state.isDocumentTabManagementEnabled;
            }),
            (m.prototype.isOpenFilesFromLocalEnabled = function () {
                return !gDesigner.getLicense().isGuest();
            }),
            (m.prototype.isReminderManagerEnabled = function (e) {
                return true;
            }),
            (m.prototype.isInAppPurchaseAvailable = function (e) {
                return true;
            }),
            (m.prototype.isLicenseUpgradeable = function (e) {
                return (e = e || gDesigner.getLicense()).canUpgrade();
            }),
            (m.prototype.isImportResourcesEnabled = function () {
                return this.isOpenFilesFromLocalEnabled();
            }),
            (module.exports = m));
    };
