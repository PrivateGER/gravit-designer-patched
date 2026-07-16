module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(71 /* polyfill:String */), require(34));
        var GObject = require(1),
            Utils = require(40);
        function a(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "file.save";
            ((this._document = e), (this._user = t), (this._action = n), this._init());
        }
        (GObject.GObject.inherit(a, GObject.GObject),
            (a.prototype._init = function () {
                ((this._dialog = $("<div></div>").gDialog({
                    releaseOnClose: true,
                    className: "g-confirmation-dialog",
                })),
                    $("<div></div>").addClass("header").append($("<span></span>").addClass("gravit-icon-thanks")).appendTo(this._dialog));
                const e = gDesigner.getAction(this._action);
                let t,
                    n = "save";
                (e.getId().includes("save")
                    ? (t = GObject.GLocale.get(new GObject.GLocaleKey("GConfirmationDialog", "text.confirm-save")))
                    : e.getId().includes("export")
                      ? ((t = GObject.GLocale.get(new GObject.GLocaleKey("GConfirmationDialog", "text.confirm-export"))), (n = "export"))
                      : (t = e.getTitle() instanceof GObject.GLocaleKey ? GObject.GLocale.get(e.getTitle()) : e.getTitle()),
                    $("<div></div>")
                        .addClass("content")
                        .append(
                            $("<span></span>").text(
                                GObject.GLocale.get(new GObject.GLocaleKey("GConfirmationDialog", "text.confirm-info-" + n)).replace(
                                    "%email",
                                    this._user.email
                                )
                            )
                        )
                        .appendTo(this._dialog),
                    $("<hr/>").appendTo(this._dialog),
                    $("<div></div>")
                        .addClass("footer")
                        .append(
                            $("<button></button>")
                                .addClass("highlight")
                                .text(t)
                                .on("click", () => {
                                    let e = [];
                                    ("file.save" === this._action && (e = [void 0, true]),
                                        gDesigner.executeAction(this._action, e, "confirmationdialog"),
                                        this.close());
                                })
                        )
                        .appendTo(this._dialog));
            }),
            (a.prototype.open = async function () {
                (this._dialog.gDialog("open", true), await (0, Utils.sleep)(100), this._dialog.closest(".g-dialog").addClass("slide-up"));
            }),
            (a.prototype.close = function () {
                (this._dialog.gDialog("close"), this._dialog.closest(".g-dialog").removeClass("slide-up"));
            }),
            (module.exports = a));
    };
