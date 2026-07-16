module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(20), require(34), require(91), require(4), require(13));
        var GObject = require(1),
            a = o(require(44 /* GSystemDialog */));
        function r(e, t, n, o) {
            let r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
            var s = this;
            ((this._dialog = $("<div></div>")),
                $("<div/>")
                    .css("display", "grid")
                    .append(
                        $("<span/>")
                            .css("display", "block")
                            .html(GObject.GLocale.get(new GObject.GLocaleKey("GNewFilePrompt", "text.name-document")))
                    )
                    .append(
                        $("<input/>")
                            .attr("type", "text")
                            .css("margin-top", "10px")
                            .css("width", "100%")
                            .val(o || "")
                            .addClass("name")
                    )
                    .appendTo(this._dialog));
            var l = function (e) {
                    13 === e.which && (gDesigner.stats("newfile_enter_save"), c(), e.stopPropagation());
                },
                c = function () {
                    if ($(s._dialog).find(".name").val().trim()) {
                        var t = $(s._dialog).find(".name").val();
                        r && r.fn && !r.fn(t)
                            ? a.default.alert(r.errorMessage.replace("%fileName%", '"'.concat(t, '"')))
                            : (e(t), s.close());
                    }
                };
            ($(s._dialog).find(".name").keypress(l),
                this._dialog.gDialog({
                    className: "g-new-file-prompt-dialog",
                    releaseOnClose: false,
                    closeCallback: t,
                    buttons: [
                        $(
                            "<button"
                                .concat(n ? ' class="'.concat(n, '"') : "", ">")
                                .concat(GObject.GLocale.get(new GObject.GLocaleKey("GNewFilePrompt", "action.create")), "</button>")
                        ).on("click", function () {
                            (gDesigner.stats("newfile_click_save"), c());
                        }),
                        $("<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")) + "</button>").on("click", function () {
                            (gDesigner.stats("newfile_click_close"), s.close());
                        }),
                    ],
                }));
        }
        (GObject.GObject.inherit(r, GObject.GObject),
            (r.prototype.open = function () {
                (this._dialog.gDialog("open", true), $(this._dialog).find(".name").focus());
            }),
            (r.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (module.exports = r));
    };
