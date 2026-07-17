module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(38));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            designerConfig = require(10),
            uiConfig = require(357);
        function GOfflineDialog(title, subtitle, buttons) {
            const handleKeydown = (event) => {
                if (GPlatform.GKey.translateKey(event.keyCode) === GPlatform.GKey.Constant.ESC)
                    return (event.preventDefault(), event.stopPropagation(), $(document).off("keydown", handleKeydown), this._dialog.gDialog("close"), false);
            };
            ((this._dialog = $("<div></div>").gDialog({
                releaseOnClose: true,
                className: "g-offline-dialog",
                alwaysCloseable: true,
                closeCallback: () => $(document).off("keydown", handleKeydown),
            })),
                $(document).on("keydown", handleKeydown),
                $("<div></div>")
                    .addClass("g-btn-close")
                    .append($("<span></span>").addClass("gravit-icon-close"))
                    .on("click", this.close.bind(this))
                    .appendTo(this._dialog),
                $("<div></div>").addClass("logo").appendTo(this._dialog));
            const content = $("<div></div>")
                .addClass("content")
                .append($("<span></span>").addClass("title").html(title))
                .append($("<span></span>").addClass("subtitle").html(subtitle))
                .append(
                    $("<div></div>")
                        .addClass("buttons")
                        .append(
                            buttons.map((buttonSpec) => {
                                let { label, onclick, highlighted } = buttonSpec;
                                return $("<button></button>")
                                    .append($("<span></span>").text(label))
                                    .addClass("g-pro-button " + (highlighted ? "highlighted" : ""))
                                    .on("click", () => onclick(this));
                            })
                        )
                );
            (uiConfig.OFFLINEDIALOG.HAS_FOOTER &&
                content.append(
                    $("<span></span>")
                        .addClass("footer")
                        .html(GObject.GLocale.getValue("GOfflineDialog", "text.offline-footer").replace("%link", designerConfig.gApi.link.getSupportUrl()))
                ),
                content.appendTo(this._dialog));
        }
        (GObject.GObject.inherit(GOfflineDialog, GObject.GObject),
            (GOfflineDialog.openOfflineWarning = async function () {
                const user = await gDesigner.getUser();
                if (!user) return;
                const license = gDesigner.getLicense(),
                    now = gDesigner.now();
                let daysUntilExpiration = designerConfig.DateAPI.millisecondsToDays(designerConfig.DateAPI.diff(designerConfig.DateAPI.toUTCZone(now), license.getOfflineExpirationDate()));
                new GOfflineDialog(
                    GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-title")).replace("%name", user.getFullUserName()),
                    GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-subtitle")).replace("%days", daysUntilExpiration),
                    [
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-check")),
                            onclick: (dialog) => dialog.close(),
                        },
                    ]
                ).open();
            }),
            (GOfflineDialog.openUnavailableFeature = function (onRetrySuccess) {
                GOfflineDialog.openRetryConnection(onRetrySuccess, GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "title.unavailable-feature")));
            }),
            (GOfflineDialog.openRetryConnection = async function (onRetrySuccess, titleOverride) {
                if ($(".g-offline-dialog").length) return;
                const user = await gDesigner.getUser();
                new GOfflineDialog(
                    titleOverride ||
                        GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-title-retry")).replace(
                            "%name",
                            user ? user.getFullUserName() : GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.display-name-in-case-missing"))
                        ),
                    "",
                    [
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-retry")),
                            highlighted: true,
                            onclick: async (dialog) => {
                                (gDesigner.stats("offline-dialog_retry"),
                                    dialog._dialog.addClass("g-loading"),
                                    await (0, Utils.sleep)(500),
                                    dialog._dialog.removeClass("g-loading"),
                                    (await gDesigner.isOfflineAsync()) || (onRetrySuccess && onRetrySuccess(), dialog.close()));
                            },
                        },
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-cancel")),
                            onclick: (dialog) => {
                                (gDesigner.stats("offline-dialog_cancel"), dialog.close());
                            },
                        },
                    ]
                ).open();
            }),
            (GOfflineDialog.prototype._dialog = null),
            (GOfflineDialog.prototype.open = function () {
                this._dialog.gDialog("open", false);
            }),
            (GOfflineDialog.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (GOfflineDialog.prototype.toString = function () {
                return "[Object GOfflineDialog]";
            }),
            (module.exports = GOfflineDialog));
    };
