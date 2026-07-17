module.exports = function (module, exports, require) {
            "use strict";
            (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(3), require(34), require(38));
            const $ = require(171),
                GLocale = require(170),
                GLocaleKey = require(325),
                { SUPPORT_URL } = require(374 /* SUPPORT_URL */);

            function GOfflineDialog(title, subtitle, buttons) {
                ((this._dialog = $("<div></div>").addClass("g-dialog-content")),
                    (this._htmlElement = $("<div></div>")
                        .addClass("g-cloud-ui-dialog-container g-dialog-container")
                        .append($("<div></div>").addClass("g-cloud-ui-offline-dialog g-dialog").append(this._dialog))),
                    $("<div></div>").addClass("logo").appendTo(this._dialog),
                    $("<div></div>")
                        .addClass("content")
                        .append($("<span></span>").addClass("title").html(title))
                        .append($("<span></span>").addClass("subtitle").html(subtitle))
                        .append(
                            $("<div></div>")
                                .addClass("buttons")
                                .append(
                                    buttons.map((button) => {
                                        let { label, onclick, highlighted } = button;
                                        return $("<button></button>")
                                            .append($("<span></span>").text(label))
                                            .addClass("g-cloud-ui-btn-pro " + (highlighted ? "highlighted" : ""))
                                            .on("click", () => onclick(this));
                                    })
                                )
                        )
                        .append(
                            $("<span></span>")
                                .addClass("footer")
                                .html(GLocale.getValue("GOfflineDialog", "text.have-questions").replace("%link", SUPPORT_URL))
                        )
                        .appendTo(this._dialog));
            }
            ((GOfflineDialog.openRetryConnection = async function (user, callback) {
                new GOfflineDialog(GLocale.get(new GLocaleKey("GOfflineDialog", "text.retry-connection")).replace("%name", user ? user.name || user.email : "there"), "", [
                    {
                        label: GLocale.get(new GLocaleKey("GOfflineDialog", "text.retry")),
                        highlighted: true,
                        onclick: async (dialogInstance) => {
                            var delay;
                            (dialogInstance._dialog.addClass("g-cloud-ui-loading"),
                                await ((delay = 500), new Promise((resolve) => setTimeout(resolve, delay))),
                                dialogInstance._dialog.removeClass("g-cloud-ui-loading"),
                                navigator.onLine && (callback && callback(), dialogInstance.close()));
                        },
                    },
                    {
                        label: GLocale.get(new GLocaleKey("GOfflineDialog", "text.cancel")),
                        onclick: (dialogInstance) => dialogInstance.close(),
                    },
                ]).open();
            }),
                (GOfflineDialog.prototype._dialog = null),
                (GOfflineDialog.prototype.open = function () {
                    this._htmlElement.appendTo($("body"));
                }),
                (GOfflineDialog.prototype.close = function () {
                    this._htmlElement.remove();
                }),
                (GOfflineDialog.prototype.toString = function () {
                    return "[Object GOfflineDialog]";
                }),
                (module.exports = GOfflineDialog));
        };
