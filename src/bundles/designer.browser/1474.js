module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(71 /* polyfill:String */), require(34));
        var GObject = require(1),
            Utils = require(40);
        function GConfirmationDialog(document, user) {
            let actionId = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "file.save";
            ((this._document = document), (this._user = user), (this._action = actionId), this._init());
        }
        (GObject.GObject.inherit(GConfirmationDialog, GObject.GObject),
            (GConfirmationDialog.prototype._init = function () {
                ((this._dialog = $("<div></div>").gDialog({
                    releaseOnClose: true,
                    className: "g-confirmation-dialog",
                })),
                    $("<div></div>").addClass("header").append($("<span></span>").addClass("gravit-icon-thanks")).appendTo(this._dialog));
                const action = gDesigner.getAction(this._action);
                let title,
                    messageType = "save";
                (action.getId().includes("save")
                    ? (title = GObject.GLocale.get(new GObject.GLocaleKey("GConfirmationDialog", "text.confirm-save")))
                    : action.getId().includes("export")
                      ? ((title = GObject.GLocale.get(new GObject.GLocaleKey("GConfirmationDialog", "text.confirm-export"))), (messageType = "export"))
                      : (title = action.getTitle() instanceof GObject.GLocaleKey ? GObject.GLocale.get(action.getTitle()) : action.getTitle()),
                    $("<div></div>")
                        .addClass("content")
                        .append(
                            $("<span></span>").text(
                                GObject.GLocale.get(new GObject.GLocaleKey("GConfirmationDialog", "text.confirm-info-" + messageType)).replace(
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
                                .text(title)
                                .on("click", () => {
                                    let actionArgs = [];
                                    ("file.save" === this._action && (actionArgs = [void 0, true]),
                                        gDesigner.executeAction(this._action, actionArgs, "confirmationdialog"),
                                        this.close());
                                })
                        )
                        .appendTo(this._dialog));
            }),
            (GConfirmationDialog.prototype.open = async function () {
                (this._dialog.gDialog("open", true), await (0, Utils.sleep)(100), this._dialog.closest(".g-dialog").addClass("slide-up"));
            }),
            (GConfirmationDialog.prototype.close = function () {
                (this._dialog.gDialog("close"), this._dialog.closest(".g-dialog").removeClass("slide-up"));
            }),
            (module.exports = GConfirmationDialog));
    };
