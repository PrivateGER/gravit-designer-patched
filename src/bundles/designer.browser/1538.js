module.exports = function (module, exports, require) {
        "use strict";
        (require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(4), require(13), require(38));
        const { GLocale, GLocaleKey } = require(1 /* GObject */),
            UserPreview = require(1166),
            GUser = require(177),
            {
                gApi,
                Notification,
                NotificationConstants: {
                    ACTIONS: { ACTION_APPROVE, ACTION_REQUEST_APPROVE, ACTION_REOPEN, ACTION_IN_REVIEW } = {},
                },
            } = require(10 /* designerConfig */);
        function FileStatusHistoryDialog() {
            ((this._container = null), (this._opened = false));
        }
        ((FileStatusHistoryDialog.prototype._updateHistoryList = async function () {
            const listElement = this._container.find(".list");
            (listElement.empty(), listElement.addClass("loading"));
            var historyEntries = await gApi.annotations.getDesignHistory(gDesigner.getActiveDocument().getId()).catch((e) => []);
            (listElement.append(
                historyEntries.map((notificationData) => {
                    const notification = Notification.from(notificationData);
                    var actionText;
                    switch (notification.getAction()) {
                        case ACTION_APPROVE:
                            actionText = GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.action-approved"));
                            break;
                        case ACTION_REQUEST_APPROVE:
                            actionText = GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.action-request-approval"));
                            break;
                        case ACTION_REOPEN:
                            actionText = GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.action-reopened"));
                            break;
                        case ACTION_IN_REVIEW:
                            actionText = GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.action-in-review"));
                    }
                    if (actionText) {
                        var titleGroup = $("<span></span>").addClass("annotation-title-group"),
                            titleSpan = $("<span></span>")
                                .html(actionText.replace("%name", this._getUserNameFromNotification(notification)))
                                .addClass("annotation-title")
                                .appendTo(titleGroup),
                            dateText = GLocale.toLocaleDate(notification.created, {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            });
                        return (
                            $("<span>").text("·").addClass("dot").appendTo(titleGroup),
                            $("<span></span>").text(dateText).addClass("annotation-date").appendTo(titleGroup),
                            new UserPreview({ id: notification.uid, name: notification.uname, last_name: notification.last_name })
                                .build()
                                .addClass("g-user-preview-history")
                                .insertBefore(titleSpan),
                            titleGroup
                        );
                    }
                })
            ),
                listElement.removeClass("loading"));
        }),
            (FileStatusHistoryDialog.prototype.open = function () {
                if (this._opened) return;
                ((this._opened = true),
                    this._container && this._container.remove(),
                    (this._container = $("<div/>").gDialog({
                        className: "g-file-status-history-dialog",
                    })));
                let headerRow = $("<div/>").addClass("row").addClass("header").appendTo(this._container);
                ($("<div/>")
                    .addClass("title")
                    .text(GLocale.get(new GLocaleKey("GFileStatusHistoryDialog", "text.status-history")))
                    .appendTo(headerRow),
                    $("<div></div>")
                        .addClass("btn-close")
                        .click(() => {
                            ((this._opened = false), this._container.gDialog("close"));
                        })
                        .append($("<span></span>").addClass("gravit-icon-close"))
                        .appendTo(headerRow),
                    $("<div/>").addClass("list").appendTo(this._container));
                (this._container.gDialog("open", false), this._updateHistoryList());
            }),
            (FileStatusHistoryDialog.prototype._getUserNameFromNotification = function (notification) {
                return new GUser({
                    name: notification.uname,
                    last_name: notification.last_name,
                }).getFullUserName();
            }),
            (module.exports = FileStatusHistoryDialog));
    };
