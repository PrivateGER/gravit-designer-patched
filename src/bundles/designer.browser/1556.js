module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(20 /* polyfill:RegExp */), require(34), require(91 /* polyfill:String */), require(4), require(13));
        var GObject = require(1),
            GSystemDialog = _interopRequireDefault(require(44 /* GSystemDialog */));
        function GNewFilePromptDialog(createCallback, closeCallback, buttonClass, defaultName) {
            let validator = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
            var self = this;
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
                            .val(defaultName || "")
                            .addClass("name")
                    )
                    .appendTo(this._dialog));
            var onKeypress = function (event) {
                    13 === event.which && (gDesigner.stats("newfile_enter_save"), save(), event.stopPropagation());
                },
                save = function () {
                    if ($(self._dialog).find(".name").val().trim()) {
                        var value = $(self._dialog).find(".name").val();
                        validator && validator.fn && !validator.fn(value)
                            ? GSystemDialog.default.alert(validator.errorMessage.replace("%fileName%", '"'.concat(value, '"')))
                            : (createCallback(value), self.close());
                    }
                };
            ($(self._dialog).find(".name").keypress(onKeypress),
                this._dialog.gDialog({
                    className: "g-new-file-prompt-dialog",
                    releaseOnClose: false,
                    closeCallback: closeCallback,
                    buttons: [
                        $(
                            "<button"
                                .concat(buttonClass ? ' class="'.concat(buttonClass, '"') : "", ">")
                                .concat(GObject.GLocale.get(new GObject.GLocaleKey("GNewFilePrompt", "action.create")), "</button>")
                        ).on("click", function () {
                            (gDesigner.stats("newfile_click_save"), save());
                        }),
                        $("<button>" + GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")) + "</button>").on("click", function () {
                            (gDesigner.stats("newfile_click_close"), self.close());
                        }),
                    ],
                }));
        }
        (GObject.GObject.inherit(GNewFilePromptDialog, GObject.GObject),
            (GNewFilePromptDialog.prototype.open = function () {
                (this._dialog.gDialog("open", true), $(this._dialog).find(".name").focus());
            }),
            (GNewFilePromptDialog.prototype.close = function () {
                this._dialog.gDialog("close");
            }),
            (module.exports = GNewFilePromptDialog));
    };
