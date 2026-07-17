module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(19), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(20 /* polyfill:RegExp */), require(3), require(71 /* polyfill:String */), require(34), require(91 /* polyfill:String */), require(4), require(41), require(13), require(38), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1),
            GPlatform = require(15);
        const {
                FileExtended,
                gApi,
                trunkURL,
                betaURL,
                ltsURL,
                rcURL,
                prodURL,
                DateAPI,
                ShareRoles,
                Share,
                REMOVE_GUEST_USER_WHEN_ROLE_IS_NO_ACCESS,
                ENABLE_GUEST_ACCESS,
                defaultUserSettings: {
                    share: { defaults: { private: { pro: proByDefault = true } = {} } = {}, quotas: { free: { private: freePrivateQuota = 0 } = {} } = {} } = {},
                } = {},
            } = require(10 /* designerConfig */),
            { IS_TRUNK, IS_BETA, IS_RC, IS_LTS } = require(231 /* IS_TRUNK */),
            { sleep } = require(40 /* Utils */),
            GUser = require(177),
            GSystemDialog = require(44),
            GContainer = require(85),
            GExternalStorage = require(388),
            GShareRoleFactory = require(433),
            iconClasses = require(257),
            GCollaborativeFileMixin = require(436),
            GStorageItemEvent = require(336);
        class GShareDialog {
            constructor(user, storageItem, closeCallback) {
                ((this._user = user),
                    (this._sharedFile = new FileExtended()),
                    (this._initialSharedFile = null),
                    (this._statistics = null),
                    (this._storageItem = storageItem),
                    (this._closeCallback = closeCallback));
            }
            _initialize() {
                if (!this._isInitialized)
                    return (
                        this._initLayout(),
                        this._toggleLoading(true),
                        this._loadShare()
                            .then(() => this._loadShareInit())
                            .then(() => this._updateProperties())
                            .then(() => {
                                this._isInitialized = true;
                            })
                            .catch((error) => this._handleException(error))
                            .finally(() => this._toggleLoading(false))
                    );
            }
            async _loadShareInit() {
                if (!this._sharedFile.getPublicShare()) {
                    const role = GShareRoleFactory.ROLES.DEFAULT_PUBLIC_ROLE;
                    if (role) {
                        const share = new Share().assignRole(role);
                        return this._storageItem.supportsExternalSharing()
                            ? this._storageItem
                                  .requestExternalShare(null, share)
                                  .then(() => e.call(this, share))
                                  .catch((error) => this._handleException(error))
                            : e.call(this, share);
                    }
                }
                function e(e) {
                    return gApi
                        .createShare(this._storageItem.getId(), e)
                        .then(
                            () => (
                                gDesigner.hasEventListeners(GStorageItemEvent) && gDesigner.trigger(new GStorageItemEvent(GStorageItemEvent.Type.ShareCreated, this._storageItem)),
                                this._loadShare()
                            )
                        );
                }
            }
            _initLayout() {
                ((this._infoSection = $("<div/>")
                    .addClass("share-info-section")
                    .css("display", "none")
                    .append($("<span/>").addClass("gravit-icon-info"))
                    .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.participants-will-be-invited"))))),
                    (this._dialog = $("<div/>")
                        .append(
                            $("<div/>")
                                .addClass("header")
                                .append(
                                    $("<span/>")
                                        .addClass("title")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.title")))
                                )
                        )
                        .append(
                            $("<div/>")
                                .addClass("share-link")
                                .append(
                                    $("<div/>")
                                        .addClass("share-input")
                                        .append($("<input>").attr("type", "text").attr("readonly", true))
                                        .append(
                                            $("<div/>")
                                                .addClass("share-copied")
                                                .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.copied"))))
                                        )
                                )
                                .append(
                                    $("<div/>")
                                        .addClass("share-copy")
                                        .addClass("g-highlight-button")
                                        .addClass("highlighted")
                                        .append($("<span/>").addClass("icon").addClass(iconClasses["gravit-icon-share-copy"]))
                                        .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.copy"))))
                                        .on("click", async (event) => {
                                            const shareLink = $(event.target).closest(".share-link"),
                                                url = shareLink.find("input").val();
                                            if (url && url.trim().length)
                                                return (
                                                    gDesigner.stats("sharedialog_click_copy"),
                                                    gContainer
                                                        .copyToClipboard(url.trim())
                                                        .then(async () => {
                                                            const copiedIndicator = shareLink.find(".share-copied");
                                                            (copiedIndicator.addClass("visible"), await sleep(2e3), copiedIndicator.removeClass("visible"));
                                                        })
                                                        .catch((error) => {
                                                            GSystemDialog.alert(
                                                                (error && error.message) ||
                                                                    GObject.GLocale.get(
                                                                        new GObject.GLocaleKey("GShareDialog", "text.failed-copying-to-clipboard")
                                                                    )
                                                            );
                                                        })
                                                );
                                        })
                                )
                                .append(this._buildNativeShareButton())
                        )
                        .append(this._buildShareByLink())
                        .append(this._buildShareByUser())
                        .append(this._infoSection)
                        .gDialog({
                            releaseOnClose: true,
                            className: "g-share-dialog",
                            closeCallback: () => {
                                (this._sendInvitationEmails(), this._closeCallback && this._closeCallback());
                            },
                        })),
                    $("<div/>")
                        .addClass("g-btn-close")
                        .append($("<span />").addClass("gravit-icon-close"))
                        .on("click", () => this.close())
                        .appendTo($(this._dialog).parent()));
            }
            _buildNativeShareButton() {
                if (!gContainer.isNativeShareLinkSupported()) return null;
                const button = $("<div/>")
                    .addClass("share-native")
                    .addClass("g-highlight-button")
                    .addClass("highlighted")
                    .append($("<span/>").addClass("icon").addClass("gravit-icon-share-link-native"));
                return (
                    button.on("click", (event) => {
                        gDesigner.stats("sharedialog_click_native-sharing");
                        const url = this._dialog.find(".share-link").find("input").val();
                        if (url && url.trim().length) {
                            const userName = this._user.getFullUserName(),
                                fileName = this._sharedFile.name,
                                title = GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.native-link-share-title")).replace("%filename", fileName),
                                description = GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.native-link-share-description")).replace(
                                    "%username",
                                    userName
                                );
                            gContainer.nativeShareLink(title, description, url).catch((error) => console.error(error));
                        }
                    }),
                    button
                );
            }
            _getRole(share) {
                return GShareRoleFactory.makeFromShare(share);
            }
            _loadShare() {
                if (!this._storageItem.hasMixin(GCollaborativeFileMixin)) throw (console.log("Storage item not supported"), "Storage not supported");
                return this._storageItem
                    .getOrCreateCollaborativeFile()
                    .then((sharedFile) => {
                        ((this._sharedFile = sharedFile), this._initialSharedFile || (this._initialSharedFile = this._sharedFile.clone()));
                    })
                    .then(async () => {
                        this._statistics = await gApi.getSharingStatistics();
                    });
            }
            _setSelectedPrivateShare(userId) {
                if ((this._dialog.find(".share-by-user > .share-settings > .share-setting.g-selected").removeClass("g-selected"), userId)) {
                    const element = this._dialog
                        .find('.share-by-user > .share-settings > .share-setting[user_id="'.concat(userId, '"]'))
                        .addClass("g-selected")[0];
                    element && element.scrollIntoView({ behavior: "smooth" });
                }
            }
            _handleException(error) {
                (console.error(error.stack ? error.stack : error), GSystemDialog.alert(gApi.formatError(error)), this._toggleLoading(false));
            }
            _getPrivateAndInvitedShareList() {
                const privateShares = this._sharedFile.getPrivateShareList().filter((privateShares) => !privateShares.owner || privateShares.id !== this._user.getUID()),
                    invitedShares = (this._sharedFile.getInvitedShareList && this._sharedFile.getInvitedShareList()) || [];
                return privateShares.concat(invitedShares);
            }
            _getShareListLayout(shares) {
                return GObject.GUtil.bubbleSort(shares, (shareA, shareB) => {
                    let { created } = shareA,
                        { created: otherCreated } = shareB;
                    return DateAPI.gt(created, otherCreated, false) ? 1 : DateAPI.lt(created, otherCreated, false) ? -1 : 0;
                }).map((share) => {
                    const user = new GUser(share),
                        uid = user.getUID(),
                        email = user.getEmail(),
                        { guest: isGuest = false } = share,
                        role = this._getRole(share),
                        resendButtons = this._canResendInvitationEmail(share)
                            ? [
                                  {
                                      icon: "gravit-icon-resend-invitation-email",
                                      label: GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.resend-invitation-email")),
                                      click: () => {
                                          (gDesigner.stats("sharedialog_private-share_resend"),
                                              this._toggleLoading(true),
                                              gApi.share
                                                  .sendInvitationEmails(this._storageItem.getId(), [email])
                                                  .then(() => {
                                                      GSystemDialog.alert(
                                                          GObject.GLocale.get(
                                                              new GObject.GLocaleKey("GShareDialog", "text.resent-invitation-email")
                                                          ).replace("%email", email)
                                                      );
                                                  })
                                                  .catch((error) => this._handleException(error))
                                                  .finally(() => this._toggleLoading(false)));
                                      },
                                  },
                              ]
                            : [],
                        row = this._createShareSetting({
                            label: email,
                            icon: this._getAvatar(user),
                            defaultRole: GShareRoleFactory.ROLES.DEFAULT_PRIVATE_ROLE,
                            removeCallback: () => {
                                this._unshareWithUser({ id: uid, email: email, role: role });
                            },
                            buttons: resendButtons,
                        })
                            .attr("user_id", uid)
                            .on("click", () => {
                                this._setSelectedPrivateShare(uid);
                            });
                    return (
                        row
                            .find(".g-role-selector")
                            .gRoleSelector("role", role)
                            .on("rolechange", (event) => {
                                const newRole = $(event.target).closest(".g-role-selector").gRoleSelector("role");
                                newRole
                                    ? REMOVE_GUEST_USER_WHEN_ROLE_IS_NO_ACCESS && isGuest && newRole.is(ShareRoles.NoAccess)
                                        ? this._unshareWithUser({ id: uid, email: email, role: newRole })
                                        : this._shareWithUser({ id: uid, email: email, role: newRole }, share.assignRole(newRole)).catch(() => {
                                              $(event.target).closest(".g-role-selector").gRoleSelector("restoreRole");
                                          })
                                    : GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.role-required")));
                            }),
                        row
                    );
                });
            }
            _updateProperties() {
                if (this._sharedFile.getPublicShare()) {
                    const publicShareRole = this._getRole(this._sharedFile.getPublicShare());
                    this._dialog.find(".share-by-link .g-role-selector").gRoleSelector("role", publicShareRole);
                }
                this._infoSection.css("display", this._hasNewInvitationEmails() ? "" : "none");
                const shares = this._getPrivateAndInvitedShareList(),
                    license = gDesigner.getLicense();
                if (0 === license.getPrivateShareQuota())
                    this._dialog
                        .find(".share-by-user")
                        .addClass("g-disabled")
                        .on("click", (event) => {
                            $(event.target).hasClass("share-by-user") && gDesigner.handlePROFeatureInterruption();
                        });
                else if (license.getPrivateShareQuota() > 0) {
                    const usedQuota = this._statistics ? this._statistics.getPrivateShareQuota() : 0,
                        remainingQuota = license.getPrivateShareQuota() - usedQuota;
                    this._dialog
                        .find(".share-by-user .subtitle")
                        .css("display", "")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.projects-left")).replace("%number", remainingQuota));
                    const addDisabled = remainingQuota <= 0 && !(shares && shares.length);
                    this._dialog.find(".share-by-user .add-button").prop("disabled", addDisabled);
                } else
                    (this._dialog.find(".share-by-user .subtitle").css("display", "none"),
                        this._dialog.find(".share-by-user .add-button").prop("disabled", false));
                (this._dialog.find(".share-by-user > .share-settings").empty(),
                    shares && shares.length && this._dialog.find(".share-by-user > .share-settings").append(this._getShareListLayout(shares)));
                let urlString = "";
                const urlObj = new URL(this._getOrigin()),
                    searchParams = urlObj.searchParams;
                (this._sharedFile.getPublicShare()
                    ? searchParams.set("token", this._sharedFile.getPublicShare().token)
                    : searchParams.set("d", this._storageItem.getId()),
                    (urlString = urlObj.toString()),
                    this._dialog.find(".share-link > .share-input > input").val(urlString));
            }
            _getOrigin() {
                return gContainer.getRuntime() === GContainer.Runtime.Browser || gContainer.getRuntime() === GContainer.Runtime.PWA
                    ? location.origin
                    : IS_TRUNK
                      ? trunkURL
                      : IS_BETA
                        ? betaURL
                        : IS_RC
                          ? rcURL
                          : IS_LTS
                            ? ltsURL
                            : prodURL;
            }
            _buildShareByLink() {
                const row = this._createShareSetting({
                        icon: $("<span/>").addClass("gravit-icon-public-share-link").addClass("icon"),
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.public-share-link")),
                        defaultRole: GShareRoleFactory.ROLES.DEFAULT_PUBLIC_ROLE,
                    }),
                    roleSelector = row.find(".g-role-selector");
                return (
                    row.find(".g-role-selector").on("rolechange", () => {
                        const newRole = roleSelector.gRoleSelector("role");
                        if (!newRole) return void GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.role-required")));
                        gDesigner.stats("sharedialog_public-share_role", newRole.name);
                        const publicShare = this._sharedFile.getPublicShare();
                        if (publicShare)
                            return (
                                this._toggleLoading(true),
                                this._storageItem.supportsExternalSharingByLink()
                                    ? this._storageItem
                                          .updateDomainShare(newRole)
                                          .then(() => {
                                              updateShareRole.call(this);
                                          })
                                          .catch((error) => {
                                              (GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.error-change-role-failed"))),
                                                  row.find(".g-role-selector").gRoleSelector("restoreRole"),
                                                  this._toggleLoading(false),
                                                  console.error("updateDomainShare error: ", error));
                                          })
                                    : updateShareRole.call(this)
                            );
                        function updateShareRole() {
                            gApi.updateShare(publicShare.token, publicShare.assignRole(newRole))
                                .then(() => this._loadShare())
                                .then(() => this._updateProperties())
                                .catch((error) => this._handleException(error))
                                .finally(() => this._toggleLoading(false));
                        }
                    }),
                    $("<div/>")
                        .addClass("share-settings-section")
                        .append(
                            $("<div/>")
                                .addClass("share-settings-container")
                                .addClass("share-by-link")
                                .append($("<div/>").addClass("share-settings").append(row))
                        )
                );
            }
            _buildShareByUser() {
                const emailInput = $("<input/>")
                        .addClass("private-share-email-input")
                        .attr("placeholder", GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.private-share-placeholder")))
                        .attr("type", "email")
                        .on("keypress", (event) => {
                            const keyCode = event.which || event.charCode || event.keyCode;
                            if (GPlatform.GKey.translateKey(keyCode) === GPlatform.GKey.Constant.ENTER)
                                return (
                                    event.preventDefault(),
                                    event.stopPropagation(),
                                    $(event.target).closest(".share-by-user").find(".add-button").trigger("click"),
                                    false
                                );
                        }),
                    roleSelector = $("<div/>").gRoleSelector({
                        defaultRole: GShareRoleFactory.ROLES.DEFAULT_PRIVATE_ROLE,
                    });
                return (
                    roleSelector.on("rolechange", () => {
                        const role = roleSelector.gRoleSelector("role");
                        gDesigner.stats("sharedialog_private-share_role", role.name);
                    }),
                    $("<div/>")
                        .addClass("share-settings-section")
                        .append(
                            $("<div/>")
                                .addClass("share-settings-container")
                                .addClass("share-by-user")
                                .append(
                                    $("<div/>")
                                        .addClass("share-settings-header")
                                        .append(
                                            $("<div/>")
                                                .addClass("share-settings-header-caption")
                                                .append(
                                                    $("<span/>")
                                                        .addClass("title")
                                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.private-sharing")))
                                                        .gPro({
                                                            pro: proByDefault || -1 !== freePrivateQuota,
                                                            badgeAlwaysVisible: true,
                                                        })
                                                )
                                                .append($("<span/>").addClass("subtitle"))
                                        )
                                        .append(
                                            $("<div/>")
                                                .addClass("share-settings-header-input")
                                                .append($("<div/>").addClass("input-section").append(emailInput).append(roleSelector))
                                                .append(
                                                    $("<button/>")
                                                        .addClass("add-button")
                                                        .addClass("g-highlight-button highlighted")
                                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.private-sharing-add")))
                                                        .on("click", (event) => {
                                                            const email = (emailInput.val() || "").trim(),
                                                                role = roleSelector.gRoleSelector("role");
                                                            this._tryPrivateShareWithUser(email, role, event);
                                                        })
                                                )
                                        )
                                )
                                .append($("<div/>").addClass("share-settings"))
                        )
                );
            }
            async _tryPrivateShareWithUser(email, role, event) {
                if ((gDesigner.stats("sharedialog_private-share_add"), !email))
                    return void GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.empty-email")));
                if (!role) return void GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.role-required")));
                this._toggleLoading(true);
                try {
                    if (this._storageItem instanceof GExternalStorage.Item && !(await this._storageItem.isEmailFromCorporateDomain(email)))
                        return (
                            this._handleException(
                                GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.you-can-not-invite-user-from-another-domain"))
                            ),
                            void this._toggleLoading(false)
                        );
                } catch (e) {}
                const doShare = (user) => {
                    this._toggleLoading(true);
                    const share = new Share().assignRole(role),
                        headerInput = this._dialog.find(".share-settings-header-input"),
                        roleSelector = headerInput.find(".g-role-selector"),
                        emailInput = headerInput.find(".private-share-email-input");
                    this._shareWithUser(user, share, false)
                        .then((success) => {
                            success ? emailInput.val(null) : gDesigner.stats("sharedialog_invalid-email");
                        })
                        .catch(() => {
                            roleSelector.gRoleSelector("restoreRole");
                        })
                        .finally(() => {
                            this._toggleLoading(false);
                        });
                };
                try {
                    let users = await gApi
                        .listUsers({ q: email, all: true })
                        .then((e) => e.filter((e) => e.id !== this._user.getUID()).map((e) => new GUser(e)));
                    const hasMatchedUsers = users && users.length > 0;
                    let canInviteByEmail = true;
                    if (hasMatchedUsers) {
                        this._storageItem instanceof GExternalStorage.Item &&
                            this._storageItem.getCloudClient().isCorporate() &&
                            (users = users.filter(
                                (user) =>
                                    user.corporate_provider &&
                                    user.corporate_provider === this._storageItem.getCloudClient().getCorporateProviderName()
                            ));
                        const e = (this._sharedFile.getPrivateShareList() || []).filter((e) => e.role !== ShareRoles.Owner.id).map((e) => e.id);
                        e &&
                            e.length &&
                            ((users = users.filter((matchedUser) => {
                                let { id } = matchedUser;
                                return !e.includes(id);
                            })),
                            (canInviteByEmail = false));
                    }
                    if (users && users.length > 0)
                        if ((this._toggleLoading(false), users.length > 1)) {
                            const headerInput = $(event.target).closest(".share-settings-header-input");
                            this._pickUser(email, users, headerInput)
                                .then((pickedUser) => {
                                    pickedUser && doShare(Object.assign(pickedUser, { email: email }));
                                })
                                .catch(this._handleException);
                        } else doShare(Object.assign(users[0], { email: email }));
                    else
                        canInviteByEmail
                            ? doShare({ id: email, email: email })
                            : this._handleException(
                                  GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.private-share-no-options-left")).replace("%email", email)
                              );
                } catch (e) {
                    this._handleException(e);
                }
            }
            _createShareSetting(options) {
                let { icon, label, defaultRole, removeCallback, buttons } = options;
                return $("<div/>")
                    .addClass("share-setting")
                    .append(icon || "")
                    .append($("<span/>").addClass("label").text(label))
                    .append($("<div/>").gRoleSelector({ defaultRole: defaultRole, buttons: buttons }))
                    .append(removeCallback ? $("<div/>").addClass("gravit-icon-x-delete").on("click", removeCallback) : "");
            }
            _getAvatar(user) {
                const color = user.getUserColor(),
                    { avatar } = user,
                    avatarElement = $("<div/>").addClass("avatar");
                return (
                    this._shouldShowAvatar(user)
                        ? this._isSVGAvatar(avatar)
                            ? $(avatar).appendTo(avatarElement)
                            : avatarElement.css({ backgroundImage: 'url("'.concat(avatar, '")') })
                        : ((user.getFirstName() && !user.guest) || (user.name = user.getFullUserName()),
                          avatarElement.css("border-color", color).css("background-color", color).append($("<span/>").text(user.getUserNameInitials()))),
                    avatarElement
                );
            }
            _getAvatarForPicker(user) {
                const color = user.getUserColor(),
                    { avatar: avatar } = user,
                    container = $("<div/>")
                        .append(
                            $("<div/>")
                                .addClass("g-user-selector-avatar")
                                .css("border-color", color)
                                .css("background-color", color)
                                .append($("<span/>").text(user.getUserNameInitials()))
                        )
                        .addClass("g-user-selector-all-avatar");
                return (
                    this._shouldShowAvatar(user) &&
                        (this._isSVGAvatar(avatar)
                            ? $(avatar).appendTo(container)
                            : container.append(
                                  $("<div/>")
                                      .addClass("avatar")
                                      .append(
                                          $("<div/>")
                                              .addClass("gravatar-avatar")
                                              .css({ backgroundImage: 'url("'.concat(avatar, '")') })
                                      )
                              )),
                    container
                );
            }
            _isSVGAvatar(avatar) {
                return "<svg>" === avatar.substr(0, "<svg>".length);
            }
            _shouldShowAvatar(user) {
                return !!user.hasOwnPictureAvatar() || !(!user.avatar || -1 === user.avatar.indexOf("static/assets"));
            }
            _isSameUser(userA, userB) {
                let normalizedA = Object.assign({}, userA),
                    normalizedB = Object.assign({}, userB);
                return (
                    normalizedA.id || (normalizedA.id = normalizedA.email),
                    normalizedB.id || (normalizedB.id = normalizedB.email),
                    userA.id === userB.id || userA.id === userB.email || userA.id === userB.login || userA.email === userB.email || userA.login === userB.email
                );
            }
            _shareWithUser(invitee, share) {
                let n,
                    i,
                    sendEmail = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                if ("object" != typeof invitee || !invitee.email) throw Error("Invalid args");
                (({ email: i, id: n } = invitee), n || (n = i));
                const currentUser = this._user;
                return n === currentUser.id || n === currentUser.email || n === currentUser.login
                    ? (GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.you-can-not-invite-yourself"))), Promise.reject())
                    : (this._toggleLoading(true),
                      this._storageItem instanceof GExternalStorage.Item
                          ? this._storageItem
                                .isEmailFromCorporateDomain(i)
                                .then((isCorporateEmail) => {
                                    if (isCorporateEmail) return this._prepareShare(i, share, n, sendEmail);
                                    throw GObject.GLocale.get(
                                        new GObject.GLocaleKey("GShareDialog", "text.you-can-not-invite-user-from-another-domain")
                                    );
                                })
                                .catch((error) => {
                                    throw (this._handleException(error), error);
                                })
                          : this._prepareShare(i, share, n, sendEmail));
            }
            _prepareShare(email, share, userId, sendEmail) {
                return this._storageItem.supportsExternalSharing()
                    ? this._storageItem
                          .requestExternalShare(email, share)
                          .then(() => this._processShare(email, share, userId, sendEmail))
                          .catch((error) => {
                              throw (this._handleException(error), error);
                          })
                    : this._processShare(email, share, userId, sendEmail);
            }
            _processShare(email, share, userId, sendEmail) {
                const shareData = sendEmail ? share : Object.assign(share, { sendEmail: sendEmail, validated: true }),
                    storageItemString = this._storageItem.toString();
                let isCorporate = false;
                return (
                    this._storageItem instanceof GExternalStorage.Item && (isCorporate = this._storageItem.getCloudClient().isCorporate()),
                    storageItemString.indexOf("GCloudStorage") >= 0
                        ? gDesigner.stats("sharedialog_private-share_cloud")
                        : storageItemString.indexOf("GGoogleDriveStorage") >= 0
                          ? gDesigner.stats("sharedialog_private-share_".concat(isCorporate ? "corporate-" : "", "googledrive"))
                          : storageItemString.indexOf("GSharePointStorage") >= 0 &&
                            gDesigner.stats("sharedialog_private-share_".concat(isCorporate ? "corporate-" : "", "sharepoint")),
                    gApi
                        .shareWithUser(this._storageItem.getId(), userId, shareData)
                        .then(async (response) => (await this._loadShare(), this._updateProperties(), this._setSelectedPrivateShare(response.user_id), response))
                        .catch((error) => {
                            if (error.status)
                                switch (error.status) {
                                    case gApi.HTTP_STATUS_CODES.CONFLICT:
                                        return void GSystemDialog.alert(
                                            GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.you-can-not-invite-yourself"))
                                        );
                                    case gApi.HTTP_STATUS_CODES.NOT_FOUND:
                                        return void GSystemDialog.alert(
                                            GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.invalid-email")).replace("%email", email)
                                        );
                                    case gApi.HTTP_STATUS_CODES.FORBIDDEN:
                                        return void ("only same domain users allowed" === error.message
                                            ? GSystemDialog.alert(
                                                  GObject.GLocale.get(
                                                      new GObject.GLocaleKey("GShareDialog", "text.you-can-not-invite-user-from-another-domain")
                                                  )
                                              )
                                            : GSystemDialog.alert(GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "error.http.forbidden"))));
                                }
                            this._handleException(error);
                        })
                        .finally(() => this._toggleLoading(false))
                );
            }
            _unshareWithUser(share) {
                const { email, role } = share,
                    { id: userId = email } = share;
                return (
                    this._toggleLoading(true),
                    this._storageItem.supportsExternalSharing()
                        ? this._storageItem
                              .requestExternalUnShare(email, role)
                              .then(() => unshare.call(this))
                              .catch((error) => {
                                  this._handleException(error);
                              })
                        : unshare.call(this)
                );
                function unshare() {
                    return gApi
                        .unshareWithUser(this._storageItem.getId(), userId)
                        .then(() => this._setSelectedPrivateShare(null))
                        .then(() => this._loadShare())
                        .then(() => this._updateProperties())
                        .catch((error) => this._handleException(error))
                        .finally(() => this._toggleLoading(false));
                }
            }
            _toggleLoading(loading) {
                ((this._isLoading = !!loading), ($(this._dialog).data("gdialog").closable = !loading), this._dialog.toggleClass("g-loading", !!loading));
            }
            async open() {
                (await this._initialize(), this._dialog.gDialog("open", true));
            }
            close() {
                this._isLoading || this._dialog.gDialog("close");
            }
            _canResendInvitationEmail(share) {
                const role = GShareRoleFactory.makeFromShare(share);
                if (role && !role.is(ShareRoles.NoAccess)) {
                    return (
                        (this._initialSharedFile &&
                            this._initialSharedFile
                                .getPrivateShareList()
                                .map((share) => share.id)
                                .concat(this._initialSharedFile.getInvitedShareList().map((share) => share.id))) ||
                        []
                    ).includes(share.id);
                }
                return false;
            }
            _hasNewInvitationEmails() {
                return this._getNewAddedShareEmails().length > 0;
            }
            async _sendInvitationEmails() {
                const emails = this._getNewAddedShareEmails();
                if (emails && emails.length > 0) return ENABLE_GUEST_ACCESS ? this._sendGuestInvitation(emails) : this._sendUserInvitation(emails);
            }
            _sendUserInvitation(emails) {
                return (
                    gDesigner.stats("sharedialog_private-share_invite"),
                    gApi.share.sendInvitationEmails(this._storageItem.getId(), emails).then(() => {
                        this._showSentInvitationEmailAlert(emails);
                    })
                );
            }
            _sendGuestInvitation(emails) {
                let failedEmails = [],
                    remainingEmails = emails.slice();
                return Promise.all(
                    remainingEmails.map((email) =>
                        gApi.signupGuestUser({ email: email, file_id: this._storageItem.getId() }).catch(() => {
                            failedEmails.push(email);
                        })
                    )
                )
                    .then(() => {
                        if (failedEmails.length) return gApi.share.sendInvitationEmails(this._storageItem.getId(), failedEmails).catch(() => {});
                    })
                    .then(() => {
                        this._showSentInvitationEmailAlert(emails);
                    });
            }
            _showSentInvitationEmailAlert(emails) {
                GSystemDialog.alert(
                    GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.sent-invitation-email")).replace("%emails", emails.join(", ")),
                    null,
                    { className: "g-sent-invitation-email-dialog" }
                );
            }
            _pickUser(email, users, anchorElement) {
                return new Promise((resolve) => {
                    let selectedUser;
                    const overlay = $("<div/>")
                        .addClass("g-user-selector")
                        .append(
                            $("<div/>")
                                .addClass("g-user-selector-container")
                                .append(
                                    users.map((candidate) =>
                                        $("<div/>")
                                            .addClass("g-user-selector-content")
                                            .append(this._getAvatarForPicker(candidate))
                                            .append(
                                                $("<div/>")
                                                    .addClass("g-user-selector-info")
                                                    .append($("<span/>").text(candidate.getFullUserName()))
                                                    .append($("<span/>").text(email))
                                            )
                                            .on("click", () => {
                                                ((selectedUser = candidate), overlay.gOverlay("close"));
                                            })
                                    )
                                )
                        )
                        .gOverlay({
                            clazz: "g-share-dialog-user-selector",
                            releaseOnClose: true,
                            padding: false,
                            closeCallback: () => resolve(selectedUser),
                        })
                        .gOverlay("open", anchorElement);
                });
            }
            _getNewAddedShareEmails() {
                const e = (this._initialSharedFile && this._initialSharedFile.getPrivateShareList().map((e) => e.id)) || [],
                    initialInvitedEmails = (this._initialSharedFile && this._initialSharedFile.getInvitedShareList().map((share) => share.email)) || [];
                return this._sharedFile
                    .getPrivateShareList()
                    .filter((share) => !e.includes(share.id))
                    .filter((share) => !initialInvitedEmails.includes(share.email))
                    .map((share) => share.email)
                    .concat(
                        this._sharedFile
                            .getInvitedShareList()
                            .filter((share) => !initialInvitedEmails.includes(share.email))
                            .map((share) => share.email)
                    );
            }
        }
        ((GShareDialog.prototype._isInitialized = false), (GShareDialog.prototype._sharedFile = null), (GShareDialog.prototype._isLoading = false), (module.exports = GShareDialog));
    };
