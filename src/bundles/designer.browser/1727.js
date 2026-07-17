module.exports = function (module, exports, require) {
        "use strict";
        (require(57), require(4), require(13));
        var openDialogs = [];
        function closeTopDialog() {
            if (openDialogs.length > 0) {
                var topDialog = $(openDialogs[openDialogs.length - 1]);
                $(topDialog).data("gdialog").closable && topDialog.gDialog("close", true);
            }
        }
        document.addEventListener("keydown", function (event) {
            27 === event.keyCode && closeTopDialog();
        });
        var methods = {
            init: function (options) {
                return (
                    (options = $.extend(
                        {
                            releaseOnClose: true,
                            className: "",
                            buttons: null,
                            openCallback: null,
                            closeCallback: null,
                            nowrap: false,
                            closeTimeout: null,
                            alwaysCloseable: false,
                        },
                        options
                    )),
                    this.each(function () {
                        var element = $(this).data("gdialog", { options: options, closable: false });
                        if (
                            (options.nowrap ||
                                element.addClass("g-dialog-content").wrap(
                                    $("<div></div>")
                                        .addClass("g-dialog")
                                        .addClass(options.className || "")
                                ),
                            options.buttons && options.buttons.length)
                        )
                            for (
                                var footer = $("<div></div>").addClass("g-dialog-footer").appendTo(element.closest(".g-dialog")),
                                    buttonsContainer = $("<div/>").addClass("buttons").appendTo(footer),
                                    i = 0;
                                i < options.buttons.length;
                                ++i
                            )
                                $(options.buttons[i]).appendTo(buttonsContainer);
                    })
                );
            },
            open: function (closable) {
                var element = $(this),
                    data = element.data("gdialog"),
                    options = data.options || {};
                data && (data.closable = closable || false);
                var dialogElement = element.closest(".g-dialog"),
                    overlay = $("<div></div>")
                        .addClass("g-dialog-container")
                        .on("mousedown", (event) =>
                            $(event.target).hasClass("g-dialog-container") && 0 === $(event.target).find(".g-overlay").length ? closeTopDialog() : void 0
                        )
                        .append(dialogElement)
                        .appendTo($("body"));
                if (data) {
                    const { options: { className } = {} } = data;
                    className && overlay.addClass("".concat(className, "-container"));
                }
                return (openDialogs.push(this[0]), element.trigger("open"), overlay.addClass("visible"), options && options.openCallback && options.openCallback.call(this), this);
            },
            isOpen: function () {
                return openDialogs.length && openDialogs[openDialogs.length - 1] === this[0];
            },
            close: function (cancelled, timeoutOverride) {
                var element = $(this),
                    options = element.data("gdialog").options || {};
                if ((options.alwaysCloseable && openDialogs.indexOf(this[0]) >= 0) || (openDialogs.length && openDialogs[openDialogs.length - 1] === this[0])) {
                    var overlay = element.closest(".g-dialog-container");
                    if (
                        (overlay.removeClass("visible"),
                        setTimeout(
                            () => {
                                (options.releaseOnClose ? element.closest(".g-dialog").remove() : element.parents(".g-dialog").detach(), overlay.remove());
                            },
                            parseInt(isNaN(timeoutOverride) ? (isNaN(options.closeTimeout) ? 250 : options.closeTimeout) : timeoutOverride)
                        ),
                        options.alwaysCloseable)
                    ) {
                        var dialogIndex = openDialogs.indexOf(this[0]);
                        openDialogs.splice(dialogIndex, 1);
                    } else openDialogs.pop();
                    options && options.closeCallback && options.closeCallback(cancelled);
                }
                return this;
            },
        };
        $.fn.gDialog = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
