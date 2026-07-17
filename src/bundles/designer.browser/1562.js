module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GInstallToDesktopAction = _interopRequireDefault(require(1172)),
            PwaInstallSupport = _interopRequireDefault(require(1173));
        function InstallPwaDialog(isDarkMode) {
            const onKeyDown = (event) => {
                if (GPlatform.GKey.translateKey(event.keyCode) === GPlatform.GKey.Constant.ESC)
                    return (event.preventDefault(), event.stopPropagation(), $(document).off("keydown", onKeyDown), this._dialog.gDialog("close"), false);
            };
            let className = "g-install-pwa-dialog";
            (isDarkMode && (className += "-dark"),
                (this._dialog = $("<div />").gDialog({
                    releaseOnClose: true,
                    className: className,
                    alwaysCloseable: true,
                    closeCallback: () => $(document).off("keydown", onKeyDown),
                })),
                $(document).on("keydown", onKeyDown),
                this._dialog.append(this._getCloseButton()).append(this._getDialogContent()));
        }
        (GObject.GObject.inherit(InstallPwaDialog, GObject.GObject),
            (InstallPwaDialog.prototype._getCloseButton = function () {
                return $("<div />")
                    .addClass("g-btn-close")
                    .append($("<span />").addClass("gravit-icon-close"))
                    .on("click", this.close.bind(this));
            }),
            (InstallPwaDialog.prototype._getDialogContent = function () {
                return $("<div />").addClass("content").append(this._getHeader()).append(this._getMainContent());
            }),
            (InstallPwaDialog.prototype._getHeader = function () {
                return $("<div />").addClass("header");
            }),
            (InstallPwaDialog.prototype._getMainContent = function () {
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
                    .append(PwaInstallSupport.default.isSupported() ? this._getButtons() : this._buildChromiumInfoSection())
                    .append(this._getFooter());
            }),
            (InstallPwaDialog.prototype._getButtons = function () {
                var self = this;
                return $("<div />")
                    .addClass("buttons")
                    .append(
                        $("<button />")
                            .addClass("primary")
                            .addClass("g-button")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "action.install-button")))
                            .on("click", function (event) {
                                try {
                                    gDesigner.executeAction(GInstallToDesktopAction.default.ID);
                                } catch (error) {
                                    GInstallToDesktopAction.default.install();
                                }
                                self.close();
                            })
                    )
                    .append(
                        $("<button />")
                            .addClass("g-button")
                            .text(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "action.not-now-button")))
                            .on("click", () => {
                                const closedDate = gDesigner.now().getTime();
                                (gContainer.setProperty(GInstallToDesktopAction.default.closedInstallPWADialogDatePropName, closedDate), this.close());
                            })
                    );
            }),
            (InstallPwaDialog.prototype._buildChromiumInfoSection = function () {
                return $("<div />")
                    .addClass("chromium-section")
                    .append(
                        $("<div/>")
                            .addClass("chromium-content")
                            .html(GObject.GLocale.get(new GObject.GLocaleKey("GInstallPwaDialog", "text.pwa-requires")))
                    );
            }),
            (InstallPwaDialog.prototype._getFooter = function () {
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
            (InstallPwaDialog.prototype._dialog = null),
            (InstallPwaDialog.prototype.open = function () {
                this._dialog.gDialog("open", false);
            }),
            (InstallPwaDialog.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (InstallPwaDialog.prototype.toString = function () {
                return "[Object GInstallPwaDialog]";
            }),
            (module.exports = InstallPwaDialog));
    };
