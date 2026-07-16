module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(8 /* Symbol */), require(4), require(13));
        var GObject = require(1),
            a = o(require(1239));
        const r = [
            {
                text: new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.checkin-type-minor"),
                value: a.default.CheckinType.MinorCheckIn,
                selected: true,
            },
            {
                text: new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.checkin-type-major"),
                value: a.default.CheckinType.MajorCheckIn,
            },
            {
                text: new GObject.GLocaleKey("GFilesPanelViewSharepoint", "text.checkin-type-overwrite"),
                value: a.default.CheckinType.OverwriteCheckIn,
            },
        ];
        module.exports = class {
            static openCheckInDialog(e) {
                return new Promise(async (t) => {
                    var n = $("<div></div>")
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
                                            r.map((e) => {
                                                let { text: t, value: n, selected: o } = e;
                                                return $("<option/>").attr("value", n).text(GObject.GLocale.get(t)).prop("selected", !!o);
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
                    (n.gDialog({
                        releaseOnClose: true,
                        className: "g-sharepoint-check-in-dialog",
                        buttons: [
                            $("<button></button>")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")))
                                .on("click", () => {
                                    (n.gDialog("close"), t({ ok: false }), gDesigner.stats("filespanel-view_sharepoint-checkin_cancel"));
                                }),
                            $("<button></button>")
                                .addClass("primary")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                                .on("click", () => {
                                    n.gDialog("close");
                                    const o = e.enableMinorVersions ? n.find(".check-in-type").val() : a.default.CheckinType.MajorCheckIn;
                                    let i;
                                    ((i =
                                        o === a.default.CheckinType.MinorCheckIn
                                            ? "minor"
                                            : o === a.default.CheckinType.MajorCheckIn
                                              ? "major"
                                              : "overwrite-minor-version"),
                                        gDesigner.stats("filespanel-view_sharepoint-checkin_confirm", i),
                                        t({ ok: true, comment: n.find(".comment").val(), type: o }));
                                }),
                        ],
                    }),
                        n.gDialog("open", false),
                        e.enableMinorVersions || (n.find(".minor-related").hide(), n.find("textarea").focus()));
                });
            }
        };
    };
