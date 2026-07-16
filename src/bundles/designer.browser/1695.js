module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(4), require(13));
        var GPlatform = require(15),
            a = _interopRequireDefault(require(1340)),
            r = _interopRequireDefault(require(1344)),
            s = {
                init: function (e) {
                    e = $.extend({ selector: null, submitCallback: null, noDblClickEdit: false }, e);
                    var t = this;
                    return this.each(function () {
                        if (($(t).data("gautoedit", { options: e, input: null }), !e.noDblClickEdit)) {
                            var n = $(t).data("gautoedit");
                            $(t).on("dblclick", function (e) {
                                s.open.call(t, n);
                            });
                        }
                    });
                },
                open: function (e) {
                    var t = this,
                        n = $(this);
                    e.input && s.close.call(this, e);
                    var o,
                        l = e.options.containerSelector
                            ? n.find(e.options.containerSelector)
                            : e.options.getContainer && "function" == typeof e.options.getContainer
                              ? e.options.getContainer()
                              : n,
                        c = e.options.textSelector ? n.find(e.options.textSelector).text() : l.text(),
                        d = l.offset();
                    ((e.value = c),
                        e.options.textarea
                            ? ((o = $("<textarea>")), e.options.textareaResizable || o.css({ resize: "none" }))
                            : (o = $("<input>").attr("type", "text")),
                        e.options.style && "object" == typeof e.options.style && o.css(e.options.style),
                        gDesigner.isTouchEnabled() &&
                            document.addEventListener(
                                "click",
                                function n(o) {
                                    $(o.target).hasClass("g-auto-edit") ||
                                        (document.removeEventListener("click", n, true), s.submit.call(t, e));
                                },
                                true
                            ),
                        (e.input = o
                            .css({
                                position: "absolute",
                                left: d.left + "px",
                                top: d.top + "px",
                                width: l.outerWidth() + "px",
                                height: l.outerHeight() + "px",
                            })
                            .addClass("g-auto-edit")
                            .val(e.value)
                            .on("blur", () => {
                                s.submit.call(t, e);
                            })
                            .on("keydown", (n) => {
                                if (GPlatform.GKey.translateCode(n.code) === GPlatform.GKey.Constant.TAB) {
                                    s.submit.call(t, e);
                                    const o = n.shiftKey ? r.default.Type.Previous : r.default.Type.Next;
                                    return (
                                        gDesigner.executeAction("".concat(r.default.ID, ".").concat(o), [r.default.Mode.Focus]),
                                        gDesigner.executeAction(a.default.ID),
                                        false
                                    );
                                }
                            })
                            .on("keyup", function (n) {
                                switch (GPlatform.GKey.translateKey(n.keyCode)) {
                                    case GPlatform.GKey.Constant.ENTER:
                                        s.submit.call(t, e);
                                        break;
                                    case GPlatform.GKey.Constant.ESC:
                                        s.close.call(t, e);
                                }
                            })
                            .appendTo($("body"))
                            .focus()
                            .select()));
                },
                submit: function (e) {
                    var t = $(this),
                        n = e.input ? e.input.val() : null;
                    (s.close.call(this, e),
                        n &&
                            e.value !== n &&
                            (e.options.submitCallback ? e.options.submitCallback.call(this, n) : t.trigger("submitvalue", n)));
                },
                close: function (e) {
                    $(this);
                    e.input && (e.input.remove(), (e.input = null), (e.value = null));
                },
            };
        $.fn.gAutoEdit = function (e) {
            return s[e]
                ? s[e].apply(this, Array.prototype.slice.call(arguments, 1))
                : "object" != typeof e && e
                  ? void $.error("Method " + e + " does not exist on jQuery.myPlugin")
                  : s.init.apply(this, arguments);
        };
    };
