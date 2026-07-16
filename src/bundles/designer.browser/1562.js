module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            r = o(require(1172)),
            s = o(require(1173));
        function l(e) {
            const t = (e) => {
                if (GPlatform.GKey.translateKey(e.keyCode) === GPlatform.GKey.Constant.ESC)
                    return (e.preventDefault(), e.stopPropagation(), $(document).off("keydown", t), this._dialog.gDialog("close"), false);
            };
            let n = "g-install-pwa-dialog";
            (e && (n += "-dark"),
                (this._dialog = $("<div />").gDialog({
                    releaseOnClose: true,
                    className: n,
                    alwaysCloseable: true,
                    closeCallback: () => $(document).off("keydown", t),
                })),
                $(document).on("keydown", t),
                this._dialog.append(this._getCloseButton()).append(this._getDialogContent()));
        }
        (GObject.GObject.inherit(l, GObject.GObject),
            (l.prototype._getCloseButton = function () {
                return $("<div />")
                    .addClass("g-btn-close")
                    .append($("<span />").addClass("gravit-icon-close"))
                    .on("click", this.close.bind(this));
            }),
            (l.prototype._getDialogContent = function () {
                return $("<div />").addClass("content").append(this._getHeader()).append(this._getMainContent());
            }),
            (l.prototype._getHeader = function () {
                return $("<div />").addClass("header");
            }),
            (l.prototype._getMainContent = function () {
                return $("<div />")
                    .addClass("main-content")
                    .append(
                        $("<div />")
                            .addClass("title")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "text.title")))
                    )
                    .append(
                        $("<div />")
                            .addClass("description")
                            .append($("<span />").text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "text.description-text"))))
                            .append(
                                $("<a />")
                                    .attr("href", "https://www.gravit.linusrath.de/pro")
                                    .attr("target", "_blank")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "text.description-pro-link")))
                            )
                            .append($("<span />").text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "text.end-sentence-dot"))))
                    )
                    .append(s.default.isSupported() ? this._getButtons() : this._buildChromiumInfoSection())
                    .append(this._getFooter());
            }),
            (l.prototype._getButtons = function () {
                var e = this;
                return $("<div />")
                    .addClass("buttons")
                    .append(
                        $("<button />")
                            .addClass("primary")
                            .addClass("g-button")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "action.install-button")))
                            .on("click", function (t) {
                                try {
                                    gDesigner.executeAction(r.default.ID);
                                } catch (t) {
                                    r.default.install();
                                }
                                e.close();
                            })
                    )
                    .append(
                        $("<button />")
                            .addClass("g-button")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "action.not-now-button")))
                            .on("click", () => {
                                const e = gDesigner.now().getTime();
                                (gContainer.setProperty(r.default.closedInstallPWADialogDatePropName, e), this.close());
                            })
                    );
            }),
            (l.prototype._buildChromiumInfoSection = function () {
                return $("<div />")
                    .addClass("chromium-section")
                    .append(
                        $("<div/>")
                            .addClass("chromium-content")
                            .html(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "text.pwa-requires")))
                    );
            }),
            (l.prototype._getFooter = function () {
                return $("<div />")
                    .addClass("footer")
                    .append($("<span />").text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "text.footer-main-text"))))
                    .append($("<span />").text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "action.footer-link-text"))))
                    .append($("<span />").text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "text.end-sentence-dot"))))
                    .append($("<span> </span>"))
                    .append(
                        $("<a />")
                            .attr("href", "https://www.gravit.linusrath.de/en/gravit-designer/progressive-web-app-for-design/")
                            .attr("target", "_blank")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "action.footer-more-information")))
                    );
            }),
            (l.prototype._dialog = null),
            (l.prototype.open = function () {
                this._dialog.gDialog("open", false);
            }),
            (l.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (l.prototype.toString = function () {
                return "[Object GInstallPwaDialog]";
            }),
            (module.exports = l));
    };
