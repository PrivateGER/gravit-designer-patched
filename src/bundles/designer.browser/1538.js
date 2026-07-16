module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(20), require(34), require(4), require(13), require(38));
        const { GLocale, GLocaleKey } = require(1 /* GObject */),
            a = require(1166),
            r = require(177),
            {
                gApi,
                Notification,
                NotificationConstants: {
                    ACTIONS: { ACTION_APPROVE, ACTION_REQUEST_APPROVE, ACTION_REOPEN, ACTION_IN_REVIEW } = {},
                },
            } = require(10 /* designerConfig */);
        function g() {
            ((this._container = null), (this._opened = false));
        }
        ((g.prototype._updateHistoryList = async function () {
            const e = this._container.find(".list");
            (e.empty(), e.addClass("loading"));
            var t = await gApi.annotations.getDesignHistory(gDesigner.getActiveDocument().getId()).catch((e) => []);
            (e.append(
                t.map((e) => {
                    const t = Notification.from(e);
                    var n;
                    switch (t.getAction()) {
                        case ACTION_APPROVE:
                            n = GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.action-approved"));
                            break;
                        case ACTION_REQUEST_APPROVE:
                            n = GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.action-request-approval"));
                            break;
                        case ACTION_REOPEN:
                            n = GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.action-reopened"));
                            break;
                        case ACTION_IN_REVIEW:
                            n = GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.action-in-review"));
                    }
                    if (n) {
                        var r = $("<span></span>").addClass("annotation-title-group"),
                            s = $("<span></span>")
                                .html(n.replace("%name", this._getUserNameFromNotification(t)))
                                .addClass("annotation-title")
                                .appendTo(r),
                            g = GLocale.toLocaleDate(t.created, {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            });
                        return (
                            $("<span>").text("·").addClass("dot").appendTo(r),
                            $("<span></span>").text(g).addClass("annotation-date").appendTo(r),
                            new a({ id: t.uid, name: t.uname, last_name: t.last_name })
                                .build()
                                .addClass("g-user-preview-history")
                                .insertBefore(s),
                            r
                        );
                    }
                })
            ),
                e.removeClass("loading"));
        }),
            (g.prototype.open = function () {
                if (this._opened) return;
                ((this._opened = true),
                    this._container && this._container.remove(),
                    (this._container = $("<div/>").gDialog({
                        className: "g-file-status-history-dialog",
                    })));
                let e = $("<div/>").addClass("row").addClass("header").appendTo(this._container);
                ($("<div/>")
                    .addClass("title")
                    .text(GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.status-history")))
                    .appendTo(e),
                    $("<div></div>")
                        .addClass("btn-close")
                        .click(() => {
                            ((this._opened = false), this._container.gDialog("close"));
                        })
                        .append($("<span></span>").addClass("gravit-icon-close"))
                        .appendTo(e),
                    $("<div/>").addClass("list").appendTo(this._container));
                (this._container.gDialog("open", false), this._updateHistoryList());
            }),
            (g.prototype._getUserNameFromNotification = function (e) {
                return new r({
                    name: e.uname,
                    last_name: e.last_name,
                }).getFullUserName();
            }),
            (module.exports = g));
    };
