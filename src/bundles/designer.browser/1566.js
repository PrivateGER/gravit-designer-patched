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
            y = require(85),
            v = [
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
            constructor(e, t) {
                ((this._user = e),
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
                                                                .on("change", (e) => {
                                                                    const t = $(e.target).closest("input").is(":checked");
                                                                    gDesigner.stats("sharedialog_click_sharing", t);
                                                                    let n = { access: t };
                                                                    (t &&
                                                                        this._lastSharePermissions &&
                                                                        (n = Object.assign({}, this._lastSharePermissions, n)),
                                                                        this._toggleLoading(true),
                                                                        this._setSharePermissions(n)
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
                                        .on("click", async (e) => {
                                            const t = $(e.target).closest(".share-link"),
                                                n = t.find("input").val();
                                            n &&
                                                n.trim().length &&
                                                (gDesigner.stats("sharedialog_click_copy"),
                                                gContainer
                                                    .copyToClipboard(n.trim())
                                                    .then(async () => {
                                                        const e = t.find(".share-copied");
                                                        (e.addClass("visible"), await sleep(2e3), e.removeClass("visible"));
                                                    })
                                                    .catch((e) => {
                                                        GSystemDialog.alert(
                                                            (e && e.message) ||
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
                                    v.map((e) => {
                                        let {
                                            id,
                                            label,
                                            info,
                                            sharePermissions,
                                            shareBy,
                                            pro,
                                            default: l,
                                            analyticsRef,
                                        } = e;
                                        const d = $("<div/>").attr("id", id).addClass("share-setting-container"),
                                            u = (e) => {
                                                this._toggleLoading(true);
                                                const t = $(e.target).closest("input").is(":checked");
                                                gDesigner.stats("sharedialog_click_${analyticsRef}", t);
                                                const n = Object.entries(sharePermissions).reduce((e, n) => ((e[n[0]] = n[1] && t), e), {}),
                                                    o = Object.assign(this._getSharePermissions(), n, {
                                                        access: true,
                                                    });
                                                ((this._lastSharePermissions = o),
                                                    this._setSharePermissions(o)
                                                        .catch(this._handleException)
                                                        .finally(() => {
                                                            this._toggleLoading(false);
                                                        }));
                                            },
                                            p = () => gDesigner.stats("sharedialog_nonprotriespro_".concat(analyticsRef));
                                        return (
                                            $("<label/>")
                                                .addClass("share-setting-input")
                                                .append(
                                                    $("<input>")
                                                        .attr("type", "checkbox")
                                                        .on("click", pro ? watchDog.trap(u, null, p) : u)
                                                        .on("mousedown", pro ? watchDog.trap(null, null, p) : () => {})
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
                                                .appendTo(d),
                                            shareBy && this._buildShareByInput(shareBy).appendTo(d),
                                            d
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
                        .getFile(t.getId(), true)
                        .then(async (e) => {
                            if (((this._file = e), this._updateProperties(), this._shareList && this._shareList.length))
                                this._lastSharePermissions = this._getSharePermissions();
                            else {
                                const e = v
                                    .map((e) => {
                                        let { sharePermissions: t } = e;
                                        return t;
                                    })
                                    .reduce((e, t) => Object.assign({}, t, e), {});
                                ((this._lastSharePermissions = e), await this._setSharePermissions(Object.assign(e, { access: true })));
                            }
                        })
                        .catch(this._handleException)
                        .finally(() => {
                            this._toggleLoading(false);
                        }));
            }
            _handleException(e) {
                GSystemDialog.alert(gApi.formatError(e));
            }
            _isSharingByLink() {
                return true;
            }
            _getSharePermissions() {
                if (this._shareList) {
                    const e = this._shareList.reduce((e, t) => Object.assign(e, t), {});
                    return (
                        v
                            .filter((e) => {
                                let { pro: t } = e;
                                return !!t;
                            })
                            .forEach((t) => {
                                let { sharePermissions: n } = t;
                                Object.entries(n).forEach((t) => {
                                    let [n, o] = t;
                                    Object.assign(e, { [n]: watchDog.check(e[n], o) });
                                });
                            }),
                        e
                    );
                }
                return {};
            }
            async _setSharePermissions(e) {
                (e && Object.keys(e).length
                    ? (delete e.role,
                      this._isSharingByLink() &&
                          (this._shareList && this._shareList.length
                              ? await Promise.all(
                                    this._shareList.map((t) => {
                                        let { token } = t;
                                        return gApi.updateShare(token, e);
                                    })
                                )
                              : await gApi.createShare(this._file.id, e)))
                    : this._isSharingByLink() &&
                      (await Promise.all(
                          this._shareList.map((e) => {
                              let { token: t } = e;
                              return gApi.deleteShare(t);
                          })
                      )),
                    (this._file = await gApi.getFile(this._file.id, true)),
                    this._updateProperties());
            }
            _updateProperties() {
                const e = this._file.link_accesses || [];
                this._shareList = e;
                const t = this._shareList.length && !!this._shareList[0].access,
                    n = this._shareList.length && !!this._shareList[0].copy,
                    i = this._shareList.length && !!this._shareList[0].inspect;
                (this._dialog.toggleClass("share-on", !!t),
                    this._dialog
                        .find(".subtitle")
                        .first()
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.subtitle-".concat(t ? "on" : "off")))),
                    this._dialog
                        .find(".share-switch > span")
                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GShareDialog", "text.switch-".concat(t ? "on" : "off")))),
                    this._dialog.find(".share-switch input").prop("checked", t),
                    this._dialog.find("#copy > .share-setting-input > input").prop("checked", n),
                    this._dialog.find("#inspect > .share-setting-input > input").prop("checked", i));
                let a = "";
                if (this._shareList && this._shareList.length) {
                    const e = new URL(this._getOrigin()),
                        t = e.searchParams;
                    (this._isSharingByLink() ? t.set("token", this._shareList[0].token) : t.set("d", this._file.id), (a = e.toString()));
                }
                this._dialog.find(".share-link > .share-input > input").val(a);
            }
            _getOrigin() {
                return gContainer.getRuntime() === y.Runtime.Browser || gContainer.getRuntime() === y.Runtime.PWA
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
            _buildShareByInput(e) {
                if ("user" === e) return $("<div/>").css("display", "none").addClass("share-emails").gShareUserInput();
            }
            _toggleLoading(e) {
                this._dialog.toggleClass("g-loading", !!e);
            }
            open() {
                this._dialog.gDialog("open", true);
            }
            close() {
                this._dialog.gDialog("close");
            }
        };
    };
