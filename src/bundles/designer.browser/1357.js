module.exports = function (module, exports, require) {
        "use strict";
        (require(58 /* polyfill:Array */), require(19), require(71 /* polyfill:String */), require(91 /* polyfill:String */), require(4), require(41), require(13), require(26));
        var GPlatform = require(15),
            assigneeUtil = require(882 /* collabApi */);
        const GSystemDialog = require(44),
            { GSystem, GLocale, GLocaleKey, GObject, GNode } = require(1 /* GObject */),
            GPanelItem = require(1191),
            { getAnnotationType } = require(40 /* Utils */);
        require(85 /* GContainer */);
        function GAnnotationReplyDocker(options) {
            let { container, annotation, onSubmit, onCancel, onAssignTo, mentionData } = options;
            ((this._containter = container),
                (this._annotation = annotation),
                (this._onSubmit = onSubmit),
                (this._onCancel = onCancel),
                (this._onAssignTo = onAssignTo),
                (this._shouldAssign = false),
                (this._assignees = []),
                (this._mentionsCollection = []),
                (this._data = mentionData.data),
                (this._owner = mentionData.owner),
                (this._additionalMentions = mentionData.additionalMentions || []),
                (this._mentionData = mentionData),
                this._init());
        }
        function isSubmitEnterKey(event) {
            if (13 === event.keyCode)
                if (GSystem.operatingSystem !== GSystem.OperatingSystem.OSX_IOS) {
                    if (!event.shiftKey) return true;
                } else {
                    if (!event.altKey) return true;
                    if ("keydown" === event.type) {
                        let text = $(event.target).val();
                        $(event.target).val(text + "\n");
                    }
                }
            return false;
        }
        (GObject.inherit(GAnnotationReplyDocker, GPanelItem),
            (GAnnotationReplyDocker.prototype._init = function () {
                var container = this._containter;
                this._containter.addClass("reply-docker");
                var buttonRow,
                    annotationType = getAnnotationType(this._annotation);
                container.toggleClass("g-active", this._annotation.hasFlag(GNode.Flag.Active)).toggleClass(
                    "g-selected",
                    this._annotation.hasFlag(GNode.Flag.Selected)
                );
                const isFillingRequired = !this._annotation.isFillingCompleted();
                container.on("focusout", (event) => {
                    if (container.find(event.relatedTarget).length) return (event.stopPropagation(), event.preventDefault(), false);
                    $(event.target).val() || GSystemDialog.isDialogOpen(".g-system-dialog.g-confirm-dialog") || ($(event.target).attr("rows", 1), buttonRow.hide());
                })
                    .on("keydown", function (event) {
                        isSubmitEnterKey(event) && event.preventDefault();
                    })
                    .on("keypress", function (event) {
                        GSystem.operatingSystem === GSystem.OperatingSystem.OSX_IOS && 13 === event.keyCode && event.altKey && event.preventDefault();
                    })
                    .on("keyup", (event) => {
                        const mentionsAutocompleteItemCount = commentArea.find(".mentions-autocomplete-list").data("assign");
                        isSubmitEnterKey(event) && !mentionsAutocompleteItemCount && (this._addContent(), event.preventDefault());
                    });
                var commentArea = $("<span>").addClass("annotations-comment-area").appendTo(container);
                ((this._onlyOneAssignee = $("<span>")
                    .addClass("only-one-assignee")
                    .html(1 === this._mentionsCollection.length ? this._mentionsCollection[0].name : "")
                    .css("display", "none")),
                    (this._assigneeSelector = $("<div>")
                        .addClass("assignee-selector")
                        .css("display", "none")
                        .append(
                            $("<select>").on("change", (event) => {
                                assigneeUtil.updateAssignee.call(this, $(event.target).val());
                            })
                        )),
                    (this._assigneeCheckBox = $("<input>")
                        .attr("type", "checkbox")
                        .prop("checked", this._shouldAssign)
                        .on("change", (event) => {
                            ((this._shouldAssign = $(event.target).prop("checked")), gDesigner.stats("replydocker_mention_assign-user", annotationType));
                        })),
                    (this._assigneeRow = $("<div>")
                        .css("display", "none")
                        .addClass("assignee-row-container")
                        .append(
                            $("<label>")
                                .addClass("label")
                                .addClass("assignee-row-label")
                                .append(this._assigneeCheckBox)
                                .append($("<span>").html(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.assign-to"))))
                                .append(this._onlyOneAssignee)
                                .append(this._assigneeSelector)
                        )
                        .appendTo(commentArea)),
                    (buttonRow = $("<div>")
                        .css("display", "none")
                        .addClass("annotations-buttonrow")
                        .append(
                            $("<button>")
                                .addClass("annotations-cancelcomment")
                                .text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.cancel")))
                                .on("click", (event) => {
                                    (event.stopImmediatePropagation(),
                                        gDesigner.stats("replydocker_cancel-reply", annotationType),
                                        buttonRow.hide(),
                                        this._input.val("").attr("rows", 1).trigger("input"),
                                        this._onCancel());
                                })
                        )
                        .append(
                            $("<button>")
                                .addClass("annotations-addcomment")
                                .text(
                                    isFillingRequired
                                        ? GLocale.get(new GLocaleKey("GAnnotationPanel", "text.fill-contents"))
                                        : GLocale.get(new GLocaleKey("GAnnotationPanel", "text.comment"))
                                )
                                .on("click", () => {
                                    (gDesigner.stats("replydocker_add-reply", annotationType), this._addContent());
                                })
                        )
                        .appendTo(commentArea)),
                    container.attr("draggable", false));
                const shouldAutofocus = isFillingRequired && GPlatform.GPlatform.webBrowser !== GPlatform.GPlatform.constructor.WebBrowser.Safari;
                ((this._input = $("<textarea>")
                    .attr("placeholder", GLocale.get(new GLocaleKey("GAnnotationPanel", isFillingRequired ? "text.write-annotation-here" : "text.write-reply-here")))
                    .attr("rows", 1)
                    .attr("autofocus", shouldAutofocus)
                    .addClass("annotations-comment-placeholder")
                    .addClass("mention")
                    .on("input", function () {
                        if (gDesigner.isTouchEnabled()) ((this.style.height = 0), (this.style.height = this.scrollHeight + "px"));
                        else {
                            const lineHeight = 18;
                            var computedRows = Math.ceil(this.scrollHeight / lineHeight);
                            this.rows = Math.max(computedRows, 5);
                        }
                    })
                    .on("click", (event) => {
                        ($(event.target).attr("rows") <= 5 && $(event.target).attr("rows", 5),
                            buttonRow.show(),
                            assigneeUtil.showAssigneeRow.call(this, this._input),
                            gDesigner.isTouchEnabled() && this.requestFocus());
                    })
                    .prependTo(commentArea)),
                    this._input
                        .mentionsInput({
                            onDataRequest: (mode, query, callback) => {
                                let matches = this._data.filter(
                                    (user) =>
                                        user.getFullUserName().toLowerCase().includes(query.toLowerCase()) ||
                                        (user.getEmail() && user.getEmail().toLowerCase().includes(query.toLowerCase()))
                                );
                                (matches.push(...this._additionalMentions), callback.call(this, matches));
                            },
                            onSelectItem: () => {
                                gDesigner.stats("replydocker_mention_select-user", annotationType);
                            },
                        })
                        .on("input", () => {
                            assigneeUtil.showAssigneeRow.call(this, this._input);
                        }),
                    commentArea.find(".mentions-autocomplete-list").delegate("li", "mousedown", () => {
                        assigneeUtil.showAssigneeRow.call(this, this._input);
                    }),
                    isFillingRequired && (this._input.trigger("click"), this._input.focus()));
            }),
            (GAnnotationReplyDocker.prototype._addContent = function () {
                var content = assigneeUtil.replaceAdditionalCollabShowTextBeforeSend.call(this, $(this._input).val());
                ((content = content.trim()),
                    this._onSubmit(content),
                    this._shouldAssign && this._assignees && this._assignees.length && this._onAssignTo(this._assignees));
            }),
            (GAnnotationReplyDocker.prototype.requestFocus = function () {
                const inputElement = this._input[0];
                inputElement && inputElement.focus ? inputElement.focus() : this._input.focus();
            }),
            (GAnnotationReplyDocker.prototype.forceSubmit = function () {
                this._addContent();
            }),
            (GAnnotationReplyDocker.prototype.isVisible = function () {
                return "none" !== this._containter.find(".annotations-buttonrow").css("display");
            }),
            (GAnnotationReplyDocker.prototype.show = function () {
                this._containter.find(".annotations-buttonrow").show();
            }),
            (GAnnotationReplyDocker.prototype.hide = function () {
                this._containter.find(".annotations-buttonrow").hide();
            }),
            (GAnnotationReplyDocker.prototype.scrollIntoView = function () {
                this._scrollToElement(this._input);
            }),
            (module.exports = GAnnotationReplyDocker));
    };
