module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(168 /* PDFFetchStream */), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(196 /* polyfill:Promise */), require(3), require(91 /* polyfill:String */), require(4), require(13), require(32), require(38), require(169 /* PDFNetworkStream */), require(33), require(26), require(125), require(126 /* polyfill:URL */), require(114));
        var GObject = require(1);
        const {
                gApi,
                IS_TRUNK,
                IS_BETA,
                NODE_ENV,
                trunkURL,
                betaURL,
                ltsURL,
                rcURL,
                prodURL,
                HAS_ANNOTATIONS,
            } = require(10 /* designerConfig */),
            { sleep, watchDog } = require(40 /* Utils */),
            GSystemDialog = require(44),
            GContainer = require(85),
            shareOptions = [
                {
                    id: "copy",
                    label: new GObject.GLocaleKey("GShareDialog", "text.allow-to-save-label"),
                    info: new GObject.GLocaleKey("GShareDialog", "text.allow-to-save-info"),
                    pro: false,
                    sharePermissions: { copy: true, comment: !!HAS_ANNOTATIONS },
                    analyticsRef: "save",
                },
                {
                    id: "inspect",
                    label: new GObject.GLocaleKey("GShareDialog", "text.allow-to-inspect-label"),
                    info: new GObject.GLocaleKey("GShareDialog", "text.allow-to-inspect-info"),
                    pro: true,
                    default: true,
                    sharePermissions: { inspect: true, comment: !!HAS_ANNOTATIONS },
                    analyticsRef: "inspect",
                },
            ];
        module.exports = class {
            constructor(user, storageItem) {
                ((this._user = user),
                    (this._dialog = $("<div/>")
                        .append(
                            $("<div/>")
                                .addClass("header")
                                .append(
                                    $("<span/>")
                                        .addClass("title")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.title")))
                                )
                                .append(
                                    $("<div/>")
                                        .addClass("share-switch")
                                        .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.switch-on"))))
                                        .append(
                                            $("<div/>")
                                                .addClass("editor")
                                                .append(
                                                    $("<label/>")
                                                        .addClass("g-switch")
                                                        .append(
                                                            $("<input>")
                                                                .attr("type", "checkbox")
                                                                .on("change", (event) => {
                                                                    const checked = $(event.target).closest("input").is(":checked");
                                                                    gDesigner.stats("sharedialog_click_sharing", checked);
                                                                    let permissions = { access: checked };
                                                                    (checked &&
                                                                        this._lastSharePermissions &&
                                                                        (permissions = Object.assign({}, this._lastSharePermissions, permissions)),
                                                                        this._toggleLoading(true),
                                                                        this._setSharePermissions(permissions)
                                                                            .catch(this._handleException)
                                                                            .finally(() => {
                                                                                this._toggleLoading(false);
                                                                            }));
                                                                })
                                                        )
                                                        .append($("<div></div>"))
                                                )
                                        )
                                )
                        )
                        .append(
                            $("<span/>")
                                .addClass("subtitle")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.subtitle-on")))
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
                                        .append($("<span/>").addClass("icon").addClass("gravit-icon-share-copy"))
                                        .append($("<span/>").text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.copy"))))
                                        .on("click", async (event) => {
                                            const shareLinkEl = $(event.target).closest(".share-link"),
                                                url = shareLinkEl.find("input").val();
                                            url &&
                                                url.trim().length &&
                                                (gDesigner.stats("sharedialog_click_copy"),
                                                gContainer
                                                    .copyToClipboard(url.trim())
                                                    .then(async () => {
                                                        const copiedIndicator = shareLinkEl.find(".share-copied");
                                                        (copiedIndicator.addClass("visible"), await sleep(2e3), copiedIndicator.removeClass("visible"));
                                                    })
                                                    .catch((error) => {
                                                        GSystemDialog.alert(
                                                            (error && error.message) ||
                                                                GObject.GLocale.get(
                                                                    new GObject.GLocaleKey("GShareDialog", "text.failed-copying-to-clipboard")
                                                                )
                                                        );
                                                    }));
                                        })
                                )
                        )
                        .append(
                            $("<div/>")
                                .addClass("share-settings")
                                .append(
                                    shareOptions.map((option) => {
                                        let {
                                            id,
                                            label,
                                            info,
                                            sharePermissions,
                                            shareBy,
                                            pro,
                                            default: isDefault,
                                            analyticsRef,
                                        } = option;
                                        const container = $("<div/>").attr("id", id).addClass("share-setting-container"),
                                            handleToggle = (event) => {
                                                this._toggleLoading(true);
                                                const checked = $(event.target).closest("input").is(":checked");
                                                gDesigner.stats("sharedialog_click_${analyticsRef}", checked);
                                                const n = Object.entries(sharePermissions).reduce((e, n) => ((e[n[0]] = n[1] && checked), e), {}),
                                                    updatedPermissions = Object.assign(this._getSharePermissions(), n, {
                                                        access: true,
                                                    });
                                                ((this._lastSharePermissions = updatedPermissions),
                                                    this._setSharePermissions(updatedPermissions)
                                                        .catch(this._handleException)
                                                        .finally(() => {
                                                            this._toggleLoading(false);
                                                        }));
                                            },
                                            onProBlocked = () => gDesigner.stats("sharedialog_nonprotriespro_".concat(analyticsRef));
                                        return (
                                            $("<label/>")
                                                .addClass("share-setting-input")
                                                .append(
                                                    $("<input>")
                                                        .attr("type", "checkbox")
                                                        .on("click", pro ? watchDog.trap(handleToggle, null, onProBlocked) : handleToggle)
                                                        .on("mousedown", pro ? watchDog.trap(null, null, onProBlocked) : () => {})
                                                )
                                                .append(
                                                    $("<div/>")
                                                        .addClass("share-setting-panel")
                                                        .append(
                                                            $("<span/>")
                                                                .addClass("title")
                                                                .text(GObject.GLocale.get(label))
                                                                .append(pro ? $("<span></span>").gPro() : "")
                                                        )
                                                        .append($("<span/>").addClass("subtitle").text(GObject.GLocale.get(info)))
                                                )
                                                .appendTo(container),
                                            shareBy && this._buildShareByInput(shareBy).appendTo(container),
                                            container
                                        );
                                    })
                                )
                        )
                        .gDialog({
                            releaseOnClose: true,
                            className: "g-share-dialog-legacy",
                        })),
                    $("<div/>")
                        .addClass("g-btn-close")
                        .append($("<span />").addClass("gravit-icon-close"))
                        .on("click", () => this.close())
                        .appendTo(this._dialog),
                    this._toggleLoading(true),
                    gApi
                        .getFile(storageItem.getId(), true)
                        .then(async (file) => {
                            if (((this._file = file), this._updateProperties(), this._shareList && this._shareList.length))
                                this._lastSharePermissions = this._getSharePermissions();
                            else {
                                const defaultPermissions = shareOptions
                                    .map((option) => {
                                        let { sharePermissions: permissions } = option;
                                        return permissions;
                                    })
                                    .reduce((acc, permissions) => Object.assign({}, permissions, acc), {});
                                ((this._lastSharePermissions = defaultPermissions), await this._setSharePermissions(Object.assign(defaultPermissions, { access: true })));
                            }
                        })
                        .catch(this._handleException)
                        .finally(() => {
                            this._toggleLoading(false);
                        }));
            }
            _handleException(error) {
                GSystemDialog.alert(gApi.formatError(error));
            }
            _isSharingByLink() {
                return true;
            }
            _getSharePermissions() {
                if (this._shareList) {
                    const permissions = this._shareList.reduce((permissions, entry) => Object.assign(permissions, entry), {});
                    return (
                        shareOptions
                            .filter((option) => {
                                let { pro: isPro } = option;
                                return !!isPro;
                            })
                            .forEach((option) => {
                                let { sharePermissions: optionPermissions } = option;
                                Object.entries(optionPermissions).forEach((entry) => {
                                    let [key, value] = entry;
                                    Object.assign(permissions, { [key]: watchDog.check(permissions[key], value) });
                                });
                            }),
                        permissions
                    );
                }
                return {};
            }
            async _setSharePermissions(permissions) {
                (permissions && Object.keys(permissions).length
                    ? (delete permissions.role,
                      this._isSharingByLink() &&
                          (this._shareList && this._shareList.length
                              ? await Promise.all(
                                    this._shareList.map((shareEntry) => {
                                        let { token } = shareEntry;
                                        return gApi.updateShare(token, permissions);
                                    })
                                )
                              : await gApi.createShare(this._file.id, permissions)))
                    : this._isSharingByLink() &&
                      (await Promise.all(
                          this._shareList.map((shareEntry) => {
                              let { token: token } = shareEntry;
                              return gApi.deleteShare(token);
                          })
                      )),
                    (this._file = await gApi.getFile(this._file.id, true)),
                    this._updateProperties());
            }
            _updateProperties() {
                const shareList = this._file.link_accesses || [];
                this._shareList = shareList;
                const hasAccess = this._shareList.length && !!this._shareList[0].access,
                    canCopy = this._shareList.length && !!this._shareList[0].copy,
                    canInspect = this._shareList.length && !!this._shareList[0].inspect;
                (this._dialog.toggleClass("share-on", !!hasAccess),
                    this._dialog
                        .find(".subtitle")
                        .first()
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.subtitle-".concat(hasAccess ? "on" : "off")))),
                    this._dialog
                        .find(".share-switch > span")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.switch-".concat(hasAccess ? "on" : "off")))),
                    this._dialog.find(".share-switch input").prop("checked", hasAccess),
                    this._dialog.find("#copy > .share-setting-input > input").prop("checked", canCopy),
                    this._dialog.find("#inspect > .share-setting-input > input").prop("checked", canInspect));
                let url = "";
                if (this._shareList && this._shareList.length) {
                    const shareUrl = new URL(this._getOrigin()),
                        searchParams = shareUrl.searchParams;
                    (this._isSharingByLink() ? searchParams.set("token", this._shareList[0].token) : searchParams.set("d", this._file.id), (url = shareUrl.toString()));
                }
                this._dialog.find(".share-link > .share-input > input").val(url);
            }
            _getOrigin() {
                return gContainer.getRuntime() === GContainer.Runtime.Browser || gContainer.getRuntime() === GContainer.Runtime.PWA
                    ? location.origin
                    : IS_TRUNK
                      ? trunkURL
                      : IS_BETA
                        ? betaURL
                        : "rc" === NODE_ENV
                          ? rcURL
                          : "lts" === NODE_ENV
                            ? ltsURL
                            : prodURL;
            }
            _buildShareByInput(type) {
                if ("user" === type) return $("<div/>").css("display", "none").addClass("share-emails").gShareUserInput();
            }
            _toggleLoading(loading) {
                this._dialog.toggleClass("g-loading", !!loading);
            }
            open() {
                this._dialog.gDialog("open", true);
            }
            close() {
                this._dialog.gDialog("close");
            }
        };
    };
