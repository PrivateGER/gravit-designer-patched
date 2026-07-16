module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(30 /* polyfill:Object */), require(57), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(4), require(13), require(32), require(38), require(33), require(26));
        var GObject = require(1),
            GPlatform = require(15);
        class GSystemDialog {
            static error(err) {
                let { showTitle: t = true, closeCallback } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return GSystemDialog.custom({
                    title: t ? GObject.GLocale.get(new GObject.GLocaleKey("GCommonNames", "text.something-wrong")) : "",
                    subtitle: gApi.formatError(err),
                    closeCallback: closeCallback,
                });
            }
            static externalFileError(fromRecent) {
                let message = fromRecent
                    ? GObject.GLocale.get(new GObject.GLocaleKey("GContainer", "text.load-failed-from-recent"))
                    : GObject.GLocale.get(new GObject.GLocaleKey("GContainer", "text.load-failed-from-link"));
                return GSystemDialog.custom({ subtitle: message, icon: "error" });
            }
            static splashScreenError(message, buttonLabel, callback) {
                var dialogElement = $("<div></div>").append($("<div></div>").addClass("message").html(message));
                const buttons = [];
                return (
                    callback &&
                        buttons.push(
                            $("<button></button>")
                                .text(buttonLabel)
                                .on("click", (event) => {
                                    (callback && callback(event), dialogElement.gDialog("close"));
                                })
                        ),
                    dialogElement.gDialog({
                        releaseOnClose: true,
                        className: "g-system-dialog g-splash-screen-error-dialog",
                        buttons: buttons,
                    }),
                    dialogElement.gDialog("open", false),
                    dialogElement
                );
            }
            static async confirm(message, callback, cancelLabel, okLabel, closeable, confirmOnEnter, cancelOnEscape, setting) {
                if (setting) {
                    let checkDismissed = () => {
                        try {
                            return gContainer.getProperty(setting);
                        } catch (e) {
                            return false;
                        }
                    };
                    if (await checkDismissed()) return;
                }
                var dialogElement = $("<div></div>").append($("<div></div>").addClass("message").html(message));
                let keyHandler;
                const closeDialog = (result) => {
                    (keyHandler && document.removeEventListener("keydown", keyHandler, true), dialogElement.gDialog("close"), callback && callback(result));
                };
                (confirmOnEnter || cancelOnEscape) &&
                    ((keyHandler = (event) => {
                        confirmOnEnter && GPlatform.GKey.translateKey(event.keyCode) === GPlatform.GKey.Constant.ENTER
                            ? dialogElement.gDialog("isOpen") && (event.preventDefault(), event.stopImmediatePropagation(), closeDialog(true))
                            : cancelOnEscape &&
                              GPlatform.GKey.translateKey(event.keyCode) === GPlatform.GKey.Constant.ESC &&
                              dialogElement.gDialog("isOpen") &&
                              (event.preventDefault(), event.stopImmediatePropagation(), closeDialog(false));
                    }),
                    document.addEventListener("keydown", keyHandler, true));
                const getLabelText = (label) => (label && "object" == typeof label ? label.text : label),
                    isProLabel = (label) => !!label && "object" == typeof label && !!label.pro,
                    okDisabled = !!(okValue = okLabel) && "object" == typeof okValue && !!okValue.disabled;
                var okValue;
                (dialogElement.gDialog({
                    releaseOnClose: true,
                    className: "g-system-dialog g-confirm-dialog" + (setting ? " g-onetime-dialog" : ""),
                    buttons: [
                        $("<button></button>")
                            .text(getLabelText(cancelLabel) || GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")))
                            .gPro({ pro: isProLabel(cancelLabel) })
                            .on("click", () => {
                                closeDialog(false);
                            }),
                        $("<button></button>")
                            .addClass("primary")
                            .toggleClass("g-disabled", okDisabled)
                            .text(getLabelText(okLabel) || GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                            .gPro({ pro: isProLabel(okLabel) })
                            .on("click", () => {
                                okDisabled || closeDialog(true);
                            }),
                    ],
                }),
                    setting &&
                        dialogElement
                            .closest(".g-dialog")
                            .find(".g-dialog-footer")
                            .prepend(
                                $("<label></label>").append([
                                    $("<input>")
                                        .attr("type", "checkbox")
                                        .on("change", function () {
                                            this.checked ? gContainer.setProperty(setting, true) : gContainer.setProperty(setting, false);
                                        }),
                                    $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.do-not-show-again"))),
                                ])
                            ),
                    null === closeable && (closeable = false),
                    dialogElement.gDialog("open", closeable));
            }
            static prompt(message, callback, valueOrInput, cancelLabel, okLabel, className) {
                var isCustomInput = valueOrInput && "string" != typeof valueOrInput,
                    inputElement = isCustomInput
                        ? valueOrInput
                        : $("<input/>")
                              .addClass("max-width")
                              .attr("type", "text")
                              .val(valueOrInput || "")
                              .on("keypress", (event) => {
                                  13 === event.keyCode || "Enter" === event.key
                                      ? (dialogElement.gDialog("close"), callback && callback(!!isCustomInput || inputElement.val()))
                                      : (27 !== event.keyCode && "Escape" !== event.key) || (dialogElement.gDialog("close"), callback && callback());
                              }),
                    dialogElement = $("<div></div>")
                        .append($("<div></div>").addClass("message").html(message))
                        .append($("<div></div>").addClass("input").append(inputElement));
                (dialogElement.gDialog({
                    releaseOnClose: true,
                    className: "g-system-dialog g-prompt-dialog " + className,
                    buttons: [
                        $("<button></button>")
                            .text(cancelLabel || GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")))
                            .on("click", () => {
                                (dialogElement.gDialog("close"), callback && callback());
                            }),
                        $("<button></button>")
                            .addClass("primary")
                            .text(okLabel || GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                            .on("click", () => {
                                callback && (callback(!!isCustomInput || inputElement.val()), dialogElement.gDialog("close"));
                            }),
                    ],
                }),
                    dialogElement.gDialog("open", true),
                    dialogElement.find("input:first-child").focus().select());
            }
            static alert(message, callback) {
                let { closeByEnter: closeByEnter = true, className } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                var keyHandler,
                    dialogElement = $("<div></div>").append($("<div></div>").addClass("message").html(message));
                const closeDialog = () => {
                    (closeByEnter && document.removeEventListener("keypress", keyHandler, true), dialogElement.gDialog("close"), callback && callback());
                };
                return (
                    (keyHandler = (event) => {
                        GPlatform.GKey.translateKey(event.keyCode) === GPlatform.GKey.Constant.ENTER &&
                            dialogElement.gDialog("isOpen") &&
                            (event.preventDefault(), event.stopImmediatePropagation(), closeDialog());
                    }),
                    dialogElement.gDialog({
                        releaseOnClose: true,
                        className: "g-system-dialog g-alert-dialog" + (className ? " " + className : ""),
                        buttons: [
                            $("<button></button>")
                                .addClass("primary")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                                .on("click", () => closeDialog()),
                        ],
                    }),
                    dialogElement.gDialog("open", false),
                    closeByEnter && document.addEventListener("keypress", keyHandler, true),
                    dialogElement
                );
            }
            static showOneTimeDialog(message, setting) {
                return gContainer.getProperty(setting).then((alreadyDismissed) => {
                    if (!alreadyDismissed) {
                        var dialogElement = $("<div></div>").append($("<div></div>").addClass("message").html(message));
                        return (
                            dialogElement.gDialog({
                                releaseOnClose: true,
                                className: "g-system-dialog g-onetime-dialog",
                                buttons: [
                                    $("<button></button>")
                                        .addClass("primary")
                                        .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                                        .on("click", () => {
                                            dialogElement.gDialog("close");
                                        }),
                                ],
                            }),
                            dialogElement
                                .closest(".g-dialog")
                                .find(".g-dialog-footer")
                                .prepend(
                                    $("<label></label>").append([
                                        $("<input>")
                                            .attr("type", "checkbox")
                                            .on("change", function () {
                                                this.checked ? gContainer.setProperty(setting, true) : gContainer.setProperty(setting, false);
                                            }),
                                        $("<span></span>").text(GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.do-not-show-again"))),
                                    ])
                                ),
                            dialogElement.gDialog("open", false),
                            dialogElement
                        );
                    }
                });
            }
            static showCDRWarning() {
                return gDesigner.getSetting("disable_cdr_warning", false)
                    ? Promise.resolve()
                    : this.info({
                          className: "g-cdr-warning",
                          setting: "disable_cdr_warning",
                          title: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-warning-title")),
                          label: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-warning-label")),
                          message: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-warning-message")),
                      });
            }
            static showCDRUnsupportedObjectWarning(effect) {
                if (!this.isDialogOpen(".g-system-dialog.g-dialog-v1") && !gDesigner.getSetting("disable_cdr_unsupported_effect", false)) {
                    const objectName =
                        effect instanceof GObject.GStylable.Effect
                            ? GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-object-warning-effect-name")).replace(
                                  "%name",
                                  effect.getNodeNameTranslated()
                              )
                            : GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-object-warning-generic-name"));
                    return this.info({
                        setting: "disable_cdr_unsupported_effect",
                        title: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-warning-title")),
                        label: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-label")),
                        message: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-object-warning-message")).replace(
                            "%name",
                            objectName
                        ),
                    });
                }
                return Promise.resolve();
            }
            static showCDRUnsupportedObjectsWarning() {
                let unsupportedEffects = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                return gDesigner.getSetting("disable_cdr_unsupported_effects", false)
                    ? Promise.resolve(gDesigner.getSetting("default_cdr_unsupported_effects", 1))
                    : (gDesigner.stats("unsupported-dialog_open"),
                      this.warning({
                          setting: "disable_cdr_unsupported_effects",
                          title: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-title")),
                          label: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-label")),
                          message: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-message")),
                          options: {
                              setting: "default_cdr_unsupported_effects",
                              values: [
                                  GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-option-0")),
                                  GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-option-1")),
                                  GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-option-2")),
                                  GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-option-3")),
                              ],
                              tooltips: [
                                  GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-option-0-tooltip")),
                                  GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-option-1-tooltip")),
                                  "",
                                  GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-option-3-tooltip")),
                              ],
                              onClick: () => {
                                  gDesigner.stats("unsupported-dialog_click_option");
                              },
                          },
                          details: {
                              label: GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.cdr-unsupported-objects-warning-details-label")),
                              onClick: () => {
                                  gDesigner.stats("unsupported-dialog_click_details");
                              },
                              items: unsupportedEffects,
                          },
                          onCancel: () => {
                              gDesigner.stats("unsupported-dialog_click_cancel");
                          },
                          onSubmit: () => {
                              gDesigner.stats("unsupported-dialog_click_submit");
                          },
                      }).then((selectedOption) => (gDesigner.setSetting("default_cdr_unsupported_effects", selectedOption), selectedOption)));
            }
            static warning(options) {
                return this._dialogV1(
                    Object.assign(
                        {
                            icon: "assets/icon/dialog/warning.svg",
                            buttons: [
                                $("<button/>")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "cancel")))
                                    .attr("data-title", GObject.GLocale.get(new GObject.GLocaleKey("GFilesPanel", "action.cancel-tooltip")))
                                    .on("click", (event) => {
                                        (options.onCancel && options.onCancel.call(this),
                                            $(event.target).closest(".g-dialog-content").gDialog("close", true));
                                    }),
                                $("<button/>")
                                    .addClass("primary")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                                    .on("click", (event) => {
                                        (options.onSubmit && options.onSubmit.call(this), $(event.target).closest(".g-dialog-content").gDialog("close"));
                                    }),
                            ],
                        },
                        options || {}
                    )
                );
            }
            static info(options) {
                return this._dialogV1(
                    Object.assign(
                        {
                            icon: "assets/icon/dialog/info.svg",
                            buttons: [
                                $("<button/>")
                                    .addClass("primary")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                                    .on("click", (event) => $(event.target).closest(".g-dialog-content").gDialog("close")),
                            ],
                        },
                        options || {}
                    )
                );
            }
            static isDialogOpen(selector) {
                return $(selector).length > 0;
            }
            static _dialogV1() {
                let {
                    title: title = "",
                    label: label = "",
                    message: message = "",
                    icon: icon = "assets/icon/dialog/info.svg",
                    closeable: closeable = true,
                    buttons: buttons = [],
                    details,
                    options,
                    setting,
                    className: className = "",
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const deferred = {},
                    promise = new Promise((resolve, reject) => Object.assign(deferred, { resolve: resolve, reject: reject })),
                    dialogElement = $("<div></div>").gDialog({
                        releaseOnClose: true,
                        className: "g-system-dialog g-dialog-v1 " + className,
                        closeCallback: (cancelled) => {
                            cancelled
                                ? deferred.reject()
                                : (setting && gDesigner.setSetting(setting, dialogElement.find('input[data-property="'.concat(setting, '"]')).is(":checked")),
                                  options ? deferred.resolve(parseInt(dialogElement.find('input[name="options"]:checked').val()) || 0) : deferred.resolve());
                        },
                    }),
                    headerElement = $("<header></header>").append($("<span/>").addClass("title").text(title)).appendTo(dialogElement);
                return (
                    closeable &&
                        headerElement.append(
                            $("<div></div>")
                                .addClass("g-btn-close")
                                .append($("<span></span>").addClass("gravit-icon-close"))
                                .on("click", () => dialogElement.gDialog("close", true))
                        ),
                    $("<main></main>")
                        .append(
                            $("<img/>")
                                .attr("src", icon)
                                .css("display", icon ? "" : "none")
                        )
                        .append(
                            $("<div/>")
                                .addClass("container")
                                .append(
                                    $("<div/>")
                                        .addClass("content")
                                        .append($("<span/>").addClass("label").text(label))
                                        .append($("<pre/>").addClass("message").text(message))
                                        .append(
                                            details
                                                ? $("<div/>")
                                                      .addClass("details")
                                                      .append(
                                                          $("<label/>")
                                                              .append($("<span/>").text(details.label))
                                                              .append($("<span/>").addClass("gravit-icon-down icon"))
                                                              .on("click", (event) => {
                                                                  details.onClick && details.onClick.call(this);
                                                                  const detailsElement = $(event.target).closest(".details");
                                                                  (detailsElement.find(".panel").toggleClass("collapsed"),
                                                                      detailsElement.find(".icon").toggleClass("gravit-icon-down gravit-icon-up"));
                                                              })
                                                      )
                                                      .append(
                                                          $("<div/>")
                                                              .addClass("panel collapsed")
                                                              .append(
                                                                  $("<ul/>").append(
                                                                      details.items.map((item) => $("<li/>").append($("<span/>").text(item)))
                                                                  )
                                                              )
                                                      )
                                                : ""
                                        )
                                        .append(
                                            options
                                                ? $("<div/>")
                                                      .addClass("options")
                                                      .append(
                                                          options.values.map((optionLabel, index) => {
                                                              let optionRow = $("<label/>")
                                                                  .append(
                                                                      $("<input/>")
                                                                          .attr("type", "radio")
                                                                          .attr("name", "options")
                                                                          .attr("value", index)
                                                                          .prop(
                                                                              "checked",
                                                                              (elementIndexInSet) =>
                                                                                  elementIndexInSet === (options.setting ? gDesigner.getSetting(options.setting, 0) : 0)
                                                                          )
                                                                          .on("change", () => {
                                                                              options.onClick && options.onClick.call(this);
                                                                          })
                                                                  )
                                                                  .append($("<span/>").text(optionLabel));
                                                              return (
                                                                  options.tooltips &&
                                                                      options.tooltips[index] &&
                                                                      optionRow.append(
                                                                          $("<span/>")
                                                                              .addClass("tooltip")
                                                                              .text("?")
                                                                              .attr("data-title", options.tooltips[index])
                                                                      ),
                                                                  optionRow
                                                              );
                                                          })
                                                      )
                                                : ""
                                        )
                                )
                                .append(
                                    $("<footer/>")
                                        .append(
                                            setting
                                                ? $("<label/>")
                                                      .append($("<input>").attr("type", "checkbox").attr("data-property", setting))
                                                      .append(
                                                          $("<span/>").text(
                                                              GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.do-not-show-again"))
                                                          )
                                                      )
                                                : ""
                                        )
                                        .append(buttons.length ? $("<div/>").addClass("buttons").append(buttons) : "")
                                )
                        )
                        .appendTo(dialogElement),
                    dialogElement.gDialog("open", closeable),
                    promise
                );
            }
            static messageWithInfo(options) {
                let { mainMessage, infoMessage } = options;
                const dialogElement = $("<div />").gDialog({
                        releaseOnClose: true,
                        className: "g-system-dialog g-message-with-info-dialog",
                        buttons: [
                            $("<button/>")
                                .addClass("primary")
                                .text(GObject.GLocale.get(new GObject.GLocaleKey("GLocale", "ok")))
                                .on("click", () => dialogElement.gDialog("close")),
                        ],
                    }),
                    contentElement = $("<div />").addClass("content").appendTo(dialogElement);
                return (
                    mainMessage && contentElement.append($("<div />").addClass("main-message").html(mainMessage)),
                    infoMessage &&
                        contentElement.append(
                            $("<div />")
                                .addClass("info-message")
                                .append(
                                    $("<div />")
                                        .addClass("info-message-icon")
                                        .append($("<img/>").attr("src", "assets/icon/dialog/info.svg"))
                                )
                                .append($("<div />").addClass("info-message-content").html(infoMessage))
                        ),
                    dialogElement.gDialog("open", true)
                );
            }
            static custom(options) {
                let {
                    title: title = "",
                    subtitle: subtitle = "",
                    styles: styles = {},
                    footer,
                    icon,
                    buttons: buttons = [],
                    openCallback,
                    closeCallback: closeCallback,
                    closeable: closeable = true,
                    className: className = "",
                    dontShowAgainCb,
                } = options;
                var shortcuts = [];
                const dialogElement = $("<div></div>").gDialog({
                    releaseOnClose: true,
                    className: "g-system-dialog g-custom-dialog ".concat(className),
                    closeCallback: (cancelled) => {
                        (shortcuts.length && (shortcuts.forEach((shortcut) => Mousetrap.unbind(shortcut)), (shortcuts = [])), closeCallback && closeCallback(cancelled));
                    },
                    openCallback: openCallback,
                });
                (styles.dialog && dialogElement.css(styles.dialog),
                    closeable &&
                        $("<div></div>")
                            .addClass("g-btn-close")
                            .append($("<span></span>").addClass("gravit-icon-close"))
                            .on("click", () => dialogElement.gDialog("close"))
                            .appendTo(dialogElement),
                    icon && $("<div></div>").addClass("icon").append($("<div></div>").addClass(icon)).appendTo(dialogElement));
                let contentElement = $("<div></div>")
                    .addClass("content")
                    .append($("<span></span>").addClass("title").html(title))
                    .append($("<span></span>").addClass("subtitle").html(subtitle))
                    .appendTo(dialogElement);
                if ((footer && contentElement.append($("<span></span>").addClass("footer").html(footer)), buttons && buttons.length)) {
                    var buttonsElement = $("<div></div>").addClass("buttons");
                    (dontShowAgainCb &&
                        buttonsElement.prepend(
                            $("<label></label>").append([
                                $("<input>")
                                    .attr("type", "checkbox")
                                    .on("change", function () {
                                        dontShowAgainCb(this.checked);
                                    }),
                                $("<span></span>")
                                    .addClass("dont-show-this-again-message")
                                    .text(GObject.GLocale.get(new GObject.GLocaleKey("GSystemDialog", "text.do-not-show-again"))),
                            ])
                        ),
                        buttonsElement.append(
                            buttons.map((button) => {
                                let {
                                    label,
                                    onclick,
                                    highlighted,
                                    className: className,
                                    position,
                                    shortcut,
                                    closeOnClick: closeOnClick = false,
                                } = button;
                                var clicked = false,
                                    handleClick = () => {
                                        clicked ||
                                            ((clicked = true),
                                            shortcut && (Mousetrap.unbind(shortcut), shortcuts.splice(shortcuts.indexOf(shortcut), 1)),
                                            shortcuts.length && (shortcuts.forEach((shortcut) => Mousetrap.unbind(shortcut)), (shortcuts = [])),
                                            closeOnClick && dialogElement.gDialog("close"),
                                            onclick && onclick(dialogElement));
                                    },
                                    buttonElement = $("<button></button>")
                                        .append($("<span></span>").text(label))
                                        .addClass("g-pro-button " + (highlighted ? "highlighted" : ""))
                                        .on("click", () => handleClick());
                                return (
                                    shortcut && (Mousetrap.bind(shortcut, handleClick), shortcuts.push(shortcut)),
                                    className && ((className = className instanceof Array ? className : [className]), className.forEach((cls) => buttonElement.addClass(cls))),
                                    position && buttonElement.css("float", position),
                                    buttonElement
                                );
                            })
                        ),
                        styles.buttons && buttonsElement.css(styles.buttons),
                        buttonsElement.appendTo(contentElement));
                }
                return (dialogElement.gDialog("open", closeable), dialogElement);
            }
            static advanced(options) {
                let { title: title = "", buttons: buttons = [], closeCallback: closeCallback, closeable: closeable = true } = options;
                var shortcuts = [],
                    dialogElement = $("<div></div>").append($("<div></div>").addClass("message").html(title));
                return (
                    dialogElement.gDialog({
                        releaseOnClose: true,
                        className: "g-system-dialog g-advanced-dialog",
                        closeCallback: (cancelled) => {
                            (shortcuts.length && (shortcuts.forEach((shortcut) => Mousetrap.unbind(shortcut)), (shortcuts = [])), closeCallback && closeCallback(cancelled));
                        },
                        buttons: buttons.map((button) => {
                            let { label: label, onclick: onclick, highlighted: highlighted, className: className, position: position, shortcut: shortcut, closeOnClick: closeOnClick = false } = button;
                            var clicked = false,
                                handleClick = () => {
                                    clicked ||
                                        ((clicked = true),
                                        shortcut && (Mousetrap.unbind(shortcut), shortcuts.splice(shortcuts.indexOf(shortcut), 1)),
                                        shortcuts.length && (shortcuts.forEach((shortcut) => Mousetrap.unbind(shortcut)), (shortcuts = [])),
                                        onclick(dialogElement),
                                        closeOnClick && dialogElement.gDialog("close", false));
                                },
                                buttonElement = $("<button></button>")
                                    .append($("<span></span>").text(label))
                                    .addClass(highlighted ? "primary" : "")
                                    .on("click", () => handleClick());
                            return (
                                shortcut && (Mousetrap.bind(shortcut, handleClick), shortcuts.push(shortcut)),
                                className && ((className = className instanceof Array ? className : [className]), className.forEach((cls) => buttonElement.addClass(cls))),
                                position && buttonElement.css("float", position),
                                buttonElement
                            );
                        }),
                    }),
                    dialogElement.gDialog("open", closeable),
                    dialogElement
                );
            }
            toString() {
                return "[Object GSystemDialog]";
            }
        }
        ((GSystemDialog.Shortcut = { Esc: "esc", Enter: "enter" }), (module.exports = GSystemDialog));
    };
