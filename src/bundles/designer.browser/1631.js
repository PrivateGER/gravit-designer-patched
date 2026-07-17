module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(8 /* Symbol */), require(4), require(13));
        var GObject = require(1),
            GSharePointClient = _interopRequireDefault(require(1239 /* GSharePointClient */));
        const checkInTypeOptions = [
            {
                text: new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.checkin-type-minor"),
                value: GSharePointClient.default.CheckinType.MinorCheckIn,
                selected: true,
            },
            {
                text: new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.checkin-type-major"),
                value: GSharePointClient.default.CheckinType.MajorCheckIn,
            },
            {
                text: new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.checkin-type-overwrite"),
                value: GSharePointClient.default.CheckinType.OverwriteCheckIn,
            },
        ];
        module.exports = class {
            static openCheckInDialog(options) {
                return new Promise(async (resolve) => {
                    var dialog = $("<div></div>")
                        .addClass("g-container-sharepoint-check-in-dialog")
                        .append(
                            $("<div></div>")
                                .addClass("minor-related")
                                .addClass("row")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.choose-checkin-type")))
                        )
                        .append(
                            $("<div></div>")
                                .addClass("row")
                                .addClass("minor-related")
                                .append(
                                    $("<select/>")
                                        .addClass("check-in-type")
                                        .addClass("field")
                                        .append(
                                            checkInTypeOptions.map((item) => {
                                                let { text, value, selected } = item;
                                                return $("<option/>").attr("value", value).text(GObject.GLocale.get(text)).prop("selected", !!selected);
                                            })
                                        )
                                )
                        )
                        .append(
                            $("<div></div>")
                                .addClass("row")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.checkin-comment")))
                        )
                        .append(
                            $("<div></div>")
                                .addClass("row")
                                .append($("<textarea/>").addClass("comment").addClass("field").addClass("max-width").attr("type", "text"))
                        );
                    (dialog.gDialog({
                        releaseOnClose: true,
                        className: "g-sharepoint-check-in-dialog",
                        buttons: [
                            $("<button></button>")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")))
                                .on("click", () => {
                                    (dialog.gDialog("close"), resolve({ ok: false }), gDesigner.stats("filespanel-view_sharepoint-checkin_cancel"));
                                }),
                            $("<button></button>")
                                .addClass("primary")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                                .on("click", () => {
                                    dialog.gDialog("close");
                                    const checkinType = options.enableMinorVersions ? dialog.find(".check-in-type").val() : GSharePointClient.default.CheckinType.MajorCheckIn;
                                    let statLabel;
                                    ((statLabel =
                                        checkinType === GSharePointClient.default.CheckinType.MinorCheckIn
                                            ? "minor"
                                            : checkinType === GSharePointClient.default.CheckinType.MajorCheckIn
                                              ? "major"
                                              : "overwrite-minor-version"),
                                        gDesigner.stats("filespanel-view_sharepoint-checkin_confirm", statLabel),
                                        resolve({ ok: true, comment: dialog.find(".comment").val(), type: checkinType }));
                                }),
                        ],
                    }),
                        dialog.gDialog("open", false),
                        options.enableMinorVersions || (dialog.find(".minor-related").hide(), dialog.find("textarea").focus()));
                });
            }
        };
    };
