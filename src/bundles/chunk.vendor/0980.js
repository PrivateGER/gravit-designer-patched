module.exports = function (module, exports, require) {
            "use strict";
            (require(8 /* Symbol */), require(20), require(3), require(34), require(38));
            const n = require(171),
                r = require(170),
                o = require(325),
                { SUPPORT_URL } = require(374 /* SUPPORT_URL */);

            function s(e, t, i) {
                ((this._dialog = n("<div></div>").addClass("g-dialog-content")),
                    (this._htmlElement = n("<div></div>")
                        .addClass("g-cloud-ui-dialog-container g-dialog-container")
                        .append(n("<div></div>").addClass("g-cloud-ui-offline-dialog g-dialog").append(this._dialog))),
                    n("<div></div>").addClass("logo").appendTo(this._dialog),
                    n("<div></div>")
                        .addClass("content")
                        .append(n("<span></span>").addClass("title").html(e))
                        .append(n("<span></span>").addClass("subtitle").html(t))
                        .append(
                            n("<div></div>")
                                .addClass("buttons")
                                .append(
                                    i.map((e) => {
                                        let { label, onclick, highlighted } = e;
                                        return n("<button></button>")
                                            .append(n("<span></span>").text(label))
                                            .addClass("g-cloud-ui-btn-pro " + (highlighted ? "highlighted" : ""))
                                            .on("click", () => onclick(this));
                                    })
                                )
                        )
                        .append(
                            n("<span></span>")
                                .addClass("footer")
                                .html(r.getValue("GOfflineDialog", "text.have-questions").replace("%link", SUPPORT_URL))
                        )
                        .appendTo(this._dialog));
            }
            ((s.openRetryConnection = async function (e, t) {
                new s(r.get(new o("GOfflineDialog", "text.retry-connection")).replace("%name", e ? e.name || e.email : "there"), "", [
                    {
                        label: r.get(new o("GOfflineDialog", "text.retry")),
                        highlighted: true,
                        onclick: async (e) => {
                            var i;
                            (e._dialog.addClass("g-cloud-ui-loading"),
                                await ((i = 500), new Promise((e) => setTimeout(e, i))),
                                e._dialog.removeClass("g-cloud-ui-loading"),
                                navigator.onLine && (t && t(), e.close()));
                        },
                    },
                    {
                        label: r.get(new o("GOfflineDialog", "text.cancel")),
                        onclick: (e) => e.close(),
                    },
                ]).open();
            }),
                (s.prototype._dialog = null),
                (s.prototype.open = function () {
                    this._htmlElement.appendTo(n("body"));
                }),
                (s.prototype.close = function () {
                    this._htmlElement.remove();
                }),
                (s.prototype.toString = function () {
                    return "[Object GOfflineDialog]";
                }),
                (module.exports = s));
        };
