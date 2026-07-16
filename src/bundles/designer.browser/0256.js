module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(20), require(3), require(34), require(38));
        var GObject = require(1),
            GPlatform = require(15),
            GSaveAction = require(40),
            designerConfig = require(10),
            s = require(357);
        function l(e, t, n) {
            const a = (e) => {
                if (GPlatform.GKey.translateKey(e.keyCode) === GPlatform.GKey.Constant.ESC)
                    return (e.preventDefault(), e.stopPropagation(), $(document).off("keydown", a), this._dialog.gDialog("close"), false);
            };
            ((this._dialog = $("<div></div>").gDialog({
                releaseOnClose: true,
                className: "g-offline-dialog",
                alwaysCloseable: true,
                closeCallback: () => $(document).off("keydown", a),
            })),
                $(document).on("keydown", a),
                $("<div></div>")
                    .addClass("g-btn-close")
                    .append($("<span></span>").addClass("gravit-icon-close"))
                    .on("click", this.close.bind(this))
                    .appendTo(this._dialog),
                $("<div></div>").addClass("logo").appendTo(this._dialog));
            const l = $("<div></div>")
                .addClass("content")
                .append($("<span></span>").addClass("title").html(e))
                .append($("<span></span>").addClass("subtitle").html(t))
                .append(
                    $("<div></div>")
                        .addClass("buttons")
                        .append(
                            n.map((e) => {
                                let { label, onclick, highlighted } = e;
                                return $("<button></button>")
                                    .append($("<span></span>").text(label))
                                    .addClass("g-pro-button " + (highlighted ? "highlighted" : ""))
                                    .on("click", () => onclick(this));
                            })
                        )
                );
            (s.OFFLINEDIALOG.HAS_FOOTER &&
                l.append(
                    $("<span></span>")
                        .addClass("footer")
                        .html(GObject.GLocale.getValue("GOfflineDialog", "text.offline-footer").replace("%link", designerConfig.gApi.link.getSupportUrl()))
                ),
                l.appendTo(this._dialog));
        }
        (GObject.GObject.inherit(l, GObject.GObject),
            (l.openOfflineWarning = async function () {
                const e = await gDesigner.getUser();
                if (!e) return;
                const t = gDesigner.getLicense(),
                    n = gDesigner.now();
                let i = designerConfig.DateAPI.millisecondsToDays(designerConfig.DateAPI.diff(designerConfig.DateAPI.toUTCZone(n), t.getOfflineExpirationDate()));
                new l(
                    GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-title")).replace("%name", e.getFullUserName()),
                    GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-subtitle")).replace("%days", i),
                    [
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-check")),
                            onclick: (e) => e.close(),
                        },
                    ]
                ).open();
            }),
            (l.openUnavailableFeature = function (e) {
                l.openRetryConnection(e, GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "title.unavailable-feature")));
            }),
            (l.openRetryConnection = async function (e, t) {
                if ($(".g-offline-dialog").length) return;
                const n = await gDesigner.getUser();
                new l(
                    t ||
                        GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-title-retry")).replace(
                            "%name",
                            n ? n.getFullUserName() : GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.display-name-in-case-missing"))
                        ),
                    "",
                    [
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-retry")),
                            highlighted: true,
                            onclick: async (t) => {
                                (gDesigner.stats("offline-dialog_retry"),
                                    t._dialog.addClass("g-loading"),
                                    await (0, GSaveAction.sleep)(500),
                                    t._dialog.removeClass("g-loading"),
                                    (await gDesigner.isOfflineAsync()) || (e && e(), t.close()));
                            },
                        },
                        {
                            label: GObject.GLocale.get(new GObject.GLocaleKey("GOfflineDialog", "text.offline-cancel")),
                            onclick: (e) => {
                                (gDesigner.stats("offline-dialog_cancel"), e.close());
                            },
                        },
                    ]
                ).open();
            }),
            (l.prototype._dialog = null),
            (l.prototype.open = function () {
                this._dialog.gDialog("open", false);
            }),
            (l.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (l.prototype.toString = function () {
                return "[Object GOfflineDialog]";
            }),
            (module.exports = l));
    };
