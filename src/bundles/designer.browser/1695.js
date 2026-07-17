module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(4), require(13));
        var GPlatform = require(15),
            GRenameLayerAction = _interopRequireDefault(require(1340)),
            GCycleThroughLayersAction = _interopRequireDefault(require(1344 /* GCycleThroughLayersAction */)),
            methods = {
                init: function (options) {
                    options = $.extend({ selector: null, submitCallback: null, noDblClickEdit: false }, options);
                    var element = this;
                    return this.each(function () {
                        if (($(element).data("gautoedit", { options: options, input: null }), !options.noDblClickEdit)) {
                            var data = $(element).data("gautoedit");
                            $(element).on("dblclick", function (event) {
                                methods.open.call(element, data);
                            });
                        }
                    });
                },
                open: function (data) {
                    var element = this,
                        jqElement = $(this);
                    data.input && methods.close.call(this, data);
                    var inputElement,
                        container = data.options.containerSelector
                            ? jqElement.find(data.options.containerSelector)
                            : data.options.getContainer && "function" == typeof data.options.getContainer
                              ? data.options.getContainer()
                              : jqElement,
                        currentText = data.options.textSelector ? jqElement.find(data.options.textSelector).text() : container.text(),
                        containerOffset = container.offset();
                    ((data.value = currentText),
                        data.options.textarea
                            ? ((inputElement = $("<textarea>")), data.options.textareaResizable || inputElement.css({ resize: "none" }))
                            : (inputElement = $("<input>").attr("type", "text")),
                        data.options.style && "object" == typeof data.options.style && inputElement.css(data.options.style),
                        gDesigner.isTouchEnabled() &&
                            document.addEventListener(
                                "click",
                                function onDocumentClick(event) {
                                    $(event.target).hasClass("g-auto-edit") ||
                                        (document.removeEventListener("click", onDocumentClick, true), methods.submit.call(element, data));
                                },
                                true
                            ),
                        (data.input = inputElement
                            .css({
                                position: "absolute",
                                left: containerOffset.left + "px",
                                top: containerOffset.top + "px",
                                width: container.outerWidth() + "px",
                                height: container.outerHeight() + "px",
                            })
                            .addClass("g-auto-edit")
                            .val(data.value)
                            .on("blur", () => {
                                methods.submit.call(element, data);
                            })
                            .on("keydown", (event) => {
                                if (GPlatform.GKey.translateCode(event.code) === GPlatform.GKey.Constant.TAB) {
                                    methods.submit.call(element, data);
                                    const cycleDirection = event.shiftKey ? GCycleThroughLayersAction.default.Type.Previous : GCycleThroughLayersAction.default.Type.Next;
                                    return (
                                        gDesigner.executeAction("".concat(GCycleThroughLayersAction.default.ID, ".").concat(cycleDirection), [GCycleThroughLayersAction.default.Mode.Focus]),
                                        gDesigner.executeAction(GRenameLayerAction.default.ID),
                                        false
                                    );
                                }
                            })
                            .on("keyup", function (event) {
                                switch (GPlatform.GKey.translateKey(event.keyCode)) {
                                    case GPlatform.GKey.Constant.ENTER:
                                        methods.submit.call(element, data);
                                        break;
                                    case GPlatform.GKey.Constant.ESC:
                                        methods.close.call(element, data);
                                }
                            })
                            .appendTo($("body"))
                            .focus()
                            .select()));
                },
                submit: function (data) {
                    var element = $(this),
                        value = data.input ? data.input.val() : null;
                    (methods.close.call(this, data),
                        value &&
                            data.value !== value &&
                            (data.options.submitCallback ? data.options.submitCallback.call(this, value) : element.trigger("submitvalue", value)));
                },
                close: function (data) {
                    $(this);
                    data.input && (data.input.remove(), (data.input = null), (data.value = null));
                },
            };
        $.fn.gAutoEdit = function (method) {
            return methods[method]
                ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof method && method
                  ? void $.error("Method " + method + " does not exist on jQuery.myPlugin")
                  : methods.init.apply(this, arguments);
        };
    };
