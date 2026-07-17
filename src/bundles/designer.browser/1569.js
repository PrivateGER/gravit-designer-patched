module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(30 /* polyfill:Object */), require(8 /* Symbol */));
        var i = _interopRequireDefault(require(11));
        require(1322 /* GShareManager */);
        const GApplicationStatusEvent = require(808),
            GApplicationState = require(1570),
            GApplicationStateChangedEvent = require(392),
            GShareStateChangedEvent = require(1323),
            GLicenseChangedEvent = require(441),
            {
                SHARE_ENGINE,
                HAS_ANNOTATIONS,
                ShareRoles,
                FileStatus: { APPROVED },
                FILE_REVIEW_ENABLED,
                LEGACY_SHARE_DIALOG,
            } = require(10 /* designerConfig */);
        function GApplicationManager(callback) {
            ((this._state = new GApplicationState()),
                SHARE_ENGINE && gDesigner.addEventListener(GShareStateChangedEvent, this._shareStateChangedEvent, this),
                gDesigner.addEventListener(GApplicationStatusEvent, this._applicationStatusEvent, this),
                gDesigner.addEventListener(GLicenseChangedEvent, this._licenseChangedEvent, this),
                this._init(callback));
        }
        ((GApplicationManager.prototype._init = async function (callback) {
            callback && callback();
        }),
            (GApplicationManager.prototype._shareStateChangedEvent = function (event) {
                const newState = new GApplicationState(Object.assign({}, this._state)),
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
                        realtimeCollaborators: realtimeCollaborators = [],
                    } = event.state;
                (owner
                    ? Object.assign(newState, {
                          edit: true,
                          saveAs: true,
                          export: true,
                          inspect: true,
                          copyPaste: true,
                          comment: !!HAS_ANNOTATIONS,
                      })
                    : Object.assign(newState, {
                          edit: edit,
                          saveAs: copy,
                          export: copy,
                          copyPaste: copy,
                          inspect: inspect,
                          comment: comment,
                      }),
                    Object.assign(newState, {
                        isShareEnabled: share,
                        isSharing: sharing,
                        isPrivateSharing: isPrivate,
                        role: role,
                        realtimeCollaborators: realtimeCollaborators,
                    }),
                    this._setState(newState, event.document));
            }),
            (GApplicationManager.prototype._setState = function (newState, document) {
                i.default.equals(newState, this._state, true) || ((this._state = newState), this._triggerAppStateEvent(document, newState));
            }),
            (GApplicationManager.prototype._triggerAppStateEvent = function (document, state) {
                gDesigner.hasEventListeners(GApplicationStateChangedEvent) && gDesigner.trigger(new GApplicationStateChangedEvent(document, state));
            }),
            (GApplicationManager.prototype._applicationStatusEvent = function (event) {
                event.status === GApplicationStatusEvent.Status.Ready && gDesigner.isAnonymous() && gDesigner.addNotification({ anonymous: true });
            }),
            (GApplicationManager.prototype._licenseChangedEvent = function (event) {}),
            (GApplicationManager.prototype.isShareEnabled = function () {
                return !!this._state.isShareEnabled && SHARE_ENGINE;
            }),
            (GApplicationManager.prototype.isShareEngineEnabled = function () {
                return SHARE_ENGINE;
            }),
            (GApplicationManager.prototype.isSharing = function () {
                return !!this._state.isSharing && SHARE_ENGINE;
            }),
            (GApplicationManager.prototype.isPrivateSharing = function () {
                return this._state.isPrivateSharing && !!SHARE_ENGINE;
            }),
            (GApplicationManager.prototype.getRealtimeCollaborators = function () {
                return (SHARE_ENGINE && this._state.realtimeCollaborators) || [];
            }),
            (GApplicationManager.prototype.isEditingEnabled = function () {
                return !gDesigner.getLicense().isGuest() && (this._state.edit || (!!LEGACY_SHARE_DIALOG && this._state.inspect));
            }),
            (GApplicationManager.prototype.isSavingAsEnabled = function () {
                return !gDesigner.getLicense().isGuest() && this._state.saveAs;
            }),
            (GApplicationManager.prototype.isSavingToCloudEnabled = function () {
                return !gDesigner.getLicense().isGuest() && this._state.edit;
            }),
            (GApplicationManager.prototype.isExportEnabled = function () {
                return !gDesigner.getLicense().isGuest() && this._state.export;
            }),
            (GApplicationManager.prototype.isInspectEnabled = function () {
                return this._state.inspect || this._state.edit;
            }),
            (GApplicationManager.prototype.isPagesInspectEnabled = function () {
                return this.isInspectEnabled();
            }),
            (GApplicationManager.prototype.isCommentingEnabled = function () {
                return this._state.comment && HAS_ANNOTATIONS;
            }),
            (GApplicationManager.prototype.isCommentingEditingEnabled = function () {
                if (!this.isCommentingEnabled()) return false;
                if (FILE_REVIEW_ENABLED) {
                    var isEditingAllowed = true,
                        activeDocument = gDesigner.getActiveDocument(),
                        storageItem = activeDocument && activeDocument.getStorageItem(),
                        file = storageItem && storageItem.getFile();
                    return (file && file.status === APPROVED && (isEditingAllowed = false), isEditingAllowed);
                }
                return true;
            }),
            (GApplicationManager.prototype.isCopyPasteEnabled = function () {
                return this._state.copyPaste;
            }),
            (GApplicationManager.prototype.hasAccess = async function (permission) {
                let ignoreOwner = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                const role = gDesigner.getShareManager().getRole();
                return !(!role || !((!ignoreOwner && role.is(ShareRoles.Owner)) || (await role.can(permission))));
            }),
            (GApplicationManager.prototype.hasPermission = function (document, permission) {
                const role = gDesigner.getShareManager().getRole(document);
                return !(!role || !role.hasPermission(permission));
            }),
            (GApplicationManager.prototype.hasRole = function (role) {
                const currentRole = gDesigner.getShareManager().getRole();
                return !!currentRole && currentRole.is(role);
            }),
            (GApplicationManager.prototype.isFileFormatEnabledForSaveAs = function (e) {
                return this._state.saveAs;
            }),
            (GApplicationManager.prototype.isCreatingNewDocumentEnabled = function () {
                return !gDesigner.getLicense().isGuest();
            }),
            (GApplicationManager.prototype.isOpenFromCloudEnabled = function () {
                return !gDesigner.getLicense().isGuest();
            }),
            (GApplicationManager.prototype.isOnlyFileOpenFromCloudEnabled = function () {
                return false;
            }),
            (GApplicationManager.prototype.isOpenFromRecentFilesEnabled = function () {
                return true;
            }),
            (GApplicationManager.prototype.isDocumentTabManagementEnabled = function () {
                return this._state.isDocumentTabManagementEnabled;
            }),
            (GApplicationManager.prototype.isOpenFilesFromLocalEnabled = function () {
                return !gDesigner.getLicense().isGuest();
            }),
            (GApplicationManager.prototype.isReminderManagerEnabled = function (e) {
                return true;
            }),
            (GApplicationManager.prototype.isInAppPurchaseAvailable = function (e) {
                return true;
            }),
            (GApplicationManager.prototype.isLicenseUpgradeable = function (license) {
                return (license = license || gDesigner.getLicense()).canUpgrade();
            }),
            (GApplicationManager.prototype.isImportResourcesEnabled = function () {
                return this.isOpenFilesFromLocalEnabled();
            }),
            (module.exports = GApplicationManager));
    };
