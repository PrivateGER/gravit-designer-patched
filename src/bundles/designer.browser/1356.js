module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(58 /* polyfill:Array */), require(19), require(30 /* polyfill:Object */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(71 /* polyfill:String */), require(151), require(34), require(91 /* polyfill:String */), require(4), require(41), require(13), require(32), require(38), require(33), require(26));
        var designerConfig = require(10),
            assigneeUtil = require(882),
            GAnnotationAdditionalMentions = require(1353),
            GRegex = require(263),
            richTooltip = require(67),
            ownerUtil = _interopRequireDefault(require(358)),
            Collaborator = _interopRequireDefault(require(1324)),
            Mention = _interopRequireDefault(require(883));
        const { GSystem, GLocale, GLocaleKey, GUtil, GComment, GAnnotation, GObject, GNode } = require(1 /* GObject */),
            { NEW_COMMENT_READ_TIMEOUT, ANNOTATION_PERMANENT_LINK, IS_COREL } = ((0, GAnnotationAdditionalMentions.createAdditionalMentions)(), require(10 /* designerConfig */)),
            GPanelItem = require(1191),
            GUserPreview = require(1166),
            AccessKeys = require(434),
            { getAnnotationType } = require(40 /* Utils */);
        function AnnotationRow(options) {
            let {
                container,
                annotation,
                relatedNodesCount,
                sidebarActive,
                isLastRow,
                mentionData,
                onMouseEnter,
                onMouseLeave,
                onChange,
                onToggleState,
                onResolve,
                onReopen,
                onDelete,
                onCancel,
                onExpandClick,
                onCopyPermalinkClick,
                onAssignTo,
                mainAnnotObject,
                isCommentingEditingEnable,
                hasResolveAccess,
                hasReopenAccess,
            } = options;
            ((this._container = container),
                (this._annotation = annotation),
                (this._relatedNodesCount = relatedNodesCount),
                (this._sidebarActive = sidebarActive),
                (this._isLastRow = isLastRow),
                (this._onMouseEnter = onMouseEnter),
                (this._onMouseLeave = onMouseLeave),
                (this._onChange = onChange),
                (this._onToggleState = onToggleState),
                (this._onResolve = onResolve),
                (this._onReopen = onReopen),
                (this._onDelete = onDelete),
                (this._onCancel = onCancel),
                (this._onExpandClick = onExpandClick),
                (this._onCopyPermalinkClick = onCopyPermalinkClick),
                (this._onAssignTo = onAssignTo),
                (this._mainAnnotObject = mainAnnotObject),
                (this._shouldAssign = false),
                (this._assignees = []),
                (this._mentionsCollection = []),
                (this._data = mentionData.data),
                (this._owner = mentionData.owner),
                (this._additionalMentions = mentionData.additionalMentions),
                (this._mentionData = mentionData),
                (this._isCommentingEditingEnable = isCommentingEditingEnable),
                (this._hasResolveAccess = hasResolveAccess),
                (this._hasReopenAccess = hasReopenAccess),
                this._init());
        }
        function isSubmitEnterKey(event) {
            if (13 !== event.keyCode) return false;
            if (GSystem.operatingSystem !== GSystem.OperatingSystem.OSX_IOS) {
                if (!event.shiftKey) return true;
            } else {
                if (!event.altKey) return true;
                if ("keydown" === event.type) {
                    let value = $(event.target).val();
                    $(event.target).val(value + "\n");
                }
            }
            return false;
        }
        function createUserMatcher(query) {
            return (user) => user.getFirstName() === query || user.getFullUserName() === query || user.getEmail() === query;
        }
        function findAdditionalMention(uid) {
            const mentions = (0, GAnnotationAdditionalMentions.createAdditionalMentions)();
            return Object.values(mentions).find((mention) => mention.getUID() === uid);
        }
        function escapeHtml(text) {
            return GUtil.xss(text);
        }
        (GObject.inherit(AnnotationRow, GPanelItem),
            (AnnotationRow.prototype._isRead = false),
            (AnnotationRow.prototype._isTypeResolved = false),
            (AnnotationRow.prototype._isTypeReopened = false),
            (AnnotationRow.prototype._isParentAnnotResolved = false),
            (AnnotationRow.prototype._init = function () {
                var commentContent,
                    container = this._container,
                    annotation = this._annotation,
                    annotationType = getAnnotationType(this._annotation instanceof GComment ? this._annotation._parent : this._annotation),
                    self = this,
                    currentUser = gDesigner.getSyncUser(),
                    isOwner = ownerUtil.default.isOwner(currentUser, annotation),
                    applicationManager = gDesigner.getApplicationManager();
                const canResolve = this._isCommentingEditingEnable && (this._hasResolveAccess || isOwner),
                    canReopen = this._isCommentingEditingEnable && (this._hasReopenAccess || isOwner);
                var titleGroup = $("<span></span>").addClass("annotation-title-group").appendTo(container);
                container.on("mouseenter", this._onMouseEnter).on("mouseleave", this._onMouseLeave);
                var tooltipContainer = $("<div/>").addClass("email-and-role-tooltop").appendTo(titleGroup);
                gDesigner
                    .getShareManager()
                    .getRoleNameByUserId(annotation.getProperty("uid"))
                    .then((roleName) => {
                        tooltipContainer.gRichTooltip(
                            richTooltip.GRichTooltipConfig.from({
                                title: annotation.getProperty("email") || currentUser.getEmail() || " ",
                                description: roleName,
                                forceShow: true,
                                middle: false,
                                flipHorizontal: true,
                                marginLeft: 26,
                            })
                        );
                    });
                var displayName = annotation.getProperty("name");
                displayName = displayName || annotation.getProperty("login") || annotation.getProperty("email").split("@")[0] || GLocale.get(new GLocaleKey("GAnnotationPanel", "text.empty"));
                var titleElement = $("<span></span>").html(escapeHtml(displayName)).addClass("annotation-title").appendTo(tooltipContainer);
                gDesigner
                    .getShareManager()
                    .getCollaboratorById(annotation.getProperty("uid"))
                    .then((collaborator) => {
                        const userData = GUserPreview.getUserDataFromAnnotAndUser(annotation, collaborator || currentUser);
                        new GUserPreview(userData).build().addClass("g-user-comment-preview").insertBefore(titleElement);
                    });
                var modifiedDate = new Date(annotation.getProperty("mtime") || annotation.getProperty("time")),
                    formattedDate = GLocale.toLocaleDate(modifiedDate, {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    });
                ($("<span>").text("·").addClass("dot").appendTo(titleGroup),
                    $("<span></span>").text(formattedDate).addClass("annotation-date").appendTo(titleGroup),
                    (this._annotationCommentContainer = $("<div/>").addClass("annotation-comment-container").appendTo(container)),
                    (this._contentEditorButtons = $("<div>")));
                var commentContentElement = $("<span></span>")
                    .addClass("annotation-comment-content")
                    .css("userSelect", "text")
                    .appendTo(this._annotationCommentContainer);
                if (annotation instanceof GComment)
                    switch ((this._updateParentAnnotResolvedStatus(annotation.getParent()), annotation.getProperty("type"))) {
                        case GComment.Type.User:
                            ((commentContent = this._generateCommentContentHTML(annotation)), commentContentElement.html(commentContent.html), this._updateReadUnreadStatus(titleGroup));
                            break;
                        case GComment.Type.Open:
                            (commentContentElement.addClass("automatic").text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.re-opened"))),
                                this._updateReadUnreadStatus(titleGroup),
                                (this._isTypeReopened = true),
                                (this._isTypeResolved = false));
                            break;
                        case GComment.Type.Close:
                            (commentContentElement.addClass("automatic").text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.marked-as-resolved"))),
                                (this._isRead = true),
                                (this._isTypeResolved = true),
                                (this._isTypeReopened = false));
                    }
                else
                    (this._updateParentAnnotResolvedStatus(annotation),
                        (commentContent = this._generateCommentContentHTML(annotation)),
                        commentContentElement.html(commentContent.html),
                        this._updateReadUnreadStatus(titleGroup));
                var submitComment = (text) => {
                        ((text = ((text = assigneeUtil.replaceAdditionalCollabShowTextBeforeSend.call(this, text)) || "").trim()) || annotation.isEmptyTextAllowed()) &&
                            (this._onChange(text),
                            this._shouldAssign && this._assignees && this._assignees.length && self._onAssignTo(self._assignees));
                    },
                    commentEditor = $("<textarea></textarea>")
                        .appendTo(this._annotationCommentContainer)
                        .addClass("annotation-comment-editor")
                        .addClass("mention")
                        .on("click", function (event) {
                            self.isEditMode() && event.stopPropagation();
                        })
                        .on("blur", function () {
                            !self.isEditMode() ||
                                (self._mentionsCollection && self._mentionsCollection.length) ||
                                (submitComment(this.value), self.cancelEditMode());
                        })
                        .on("keydown", function (event) {
                            self.isEditMode() && isSubmitEnterKey(event) && event.preventDefault();
                        })
                        .on("keypress", function (event) {
                            self.isEditMode() &&
                                GSystem.operatingSystem === GSystem.OperatingSystem.OSX_IOS &&
                                13 === event.keyCode &&
                                event.altKey &&
                                event.preventDefault();
                        })
                        .on("keyup", function (event) {
                            const mentionsAutocompleteItemCount = commentEditor.parent().find(".mentions-autocomplete-list").data("assign");
                            self.isEditMode() &&
                                (isSubmitEnterKey(event) && !mentionsAutocompleteItemCount
                                    ? (submitComment(this.value), self.cancelEditMode(), event.preventDefault())
                                    : 27 === event.keyCode && (self.cancelEditMode(), self._onCancel()));
                        });
                if (
                    (commentEditor.mentionsInput({
                        elastic: false,
                        onDataRequest: (mode, query, callback) => {
                            let filteredCollaborators = this._data.filter(
                                (collaborator) =>
                                    collaborator.getFullUserName().toLowerCase().includes(query.toLowerCase()) ||
                                    (collaborator.getEmail() && collaborator.getEmail().toLowerCase().includes(query.toLowerCase()))
                            );
                            (filteredCollaborators.push(...this._additionalMentions), callback.call(this, filteredCollaborators));
                        },
                        onSelectItem: () => {
                            gDesigner.stats("commentdocker_mention_select-user", annotationType);
                        },
                    }).on("input", function () {
                        (assigneeUtil.showAssigneeRow.call(self, commentEditor), (this.style.height = 0), (this.style.height = this.scrollHeight + "px"));
                    }),
                    this._annotationCommentContainer.find(".mentions-autocomplete-list").delegate("li", "mousedown", () => {
                        assigneeUtil.showAssigneeRow.call(this, commentEditor);
                    }),
                    this.setMentionOverlayBorderVisiblity(false),
                    (this._onlyOneAssignee = $("<span>")
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
                            ((this._shouldAssign = $(event.target).prop("checked")), gDesigner.stats("commentdocker_mention_assign-user", annotationType));
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
                        .appendTo(this._annotationCommentContainer)),
                    this._contentEditorButtons
                        .appendTo(this._annotationCommentContainer)
                        .css("display", "none")
                        .addClass("contenteditor-buttonrow")
                        .append(
                            $("<button>")
                                .addClass("annotations-cancelcomment")
                                .text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.cancel")))
                                .on("mousedown", (event) => {
                                    event.preventDefault();
                                })
                                .on("click", (event) => {
                                    (event.stopPropagation(),
                                        gDesigner.stats("commentdocker_cancel-btn", annotationType),
                                        self.cancelEditMode(),
                                        self._onCancel());
                                })
                        )
                        .append(
                            $("<button>")
                                .addClass("annotations-addcomment")
                                .text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.fill-contents")))
                                .on("mousedown", (event) => {
                                    event.preventDefault();
                                })
                                .on("click", (event) => {
                                    (event.stopPropagation(),
                                        gDesigner.stats(
                                            annotation.getProperty("text").trim().length > 0 ? "commentdocker_edit-btn" : "commentdocker_add-btn",
                                            annotationType
                                        ),
                                        submitComment(commentEditor.val()),
                                        self.cancelEditMode());
                                })
                        ),
                    $(container)
                        .toggleClass("g-active", annotation.hasFlag(GNode.Flag.Active))
                        .toggleClass(
                            "g-selected",
                            annotation.hasFlag(GNode.Flag.Selected) || (annotation instanceof GComment && annotation.getParent().hasFlag(GNode.Flag.Selected))
                        ),
                    this._relatedNodesCount > 1)
                )
                    this.isCollapsible()
                        ? (this._container.addClass("collapsible"),
                          (this._expandIcon = $("<div></div>")
                              .addClass(this._mainAnnotObject.expanded ? "gravit-icon-down " : "gravit-icon-right")
                              .addClass("annotation-collapse")
                              .click(this._onExpandClick)),
                          titleGroup.prepend(this._expandIcon))
                        : this._mainAnnotObject.expanded
                          ? container.show()
                          : container.hide();
                else {
                    const collapseEmptyIcon = $("<div></div>").addClass("annotation-collapse-empty");
                    titleGroup.prepend(collapseEmptyIcon);
                }
                (annotation.hasFlag(GNode.Flag.Selected) || (annotation instanceof GComment && annotation.getParent().hasFlag(GNode.Flag.Selected))) &&
                    (this.setCollapseState(true), this.setVisiblity(true));
                var actionGroup = $("<span>").addClass("annotation-action-group").appendTo(titleGroup);
                if (this._isCommentingEditingEnable && annotation.hasMixin(GAnnotation)) {
                    var isResolved = annotation.getProperty("rsv"),
                        showResolvedIcon = false,
                        resolveActionTitle = "";
                    (isResolved
                        ? ((showResolvedIcon = true),
                          (resolveActionTitle = canReopen
                              ? GLocale.get(new GLocaleKey("GAnnotationPanel", "text.reopen"))
                              : GLocale.get(new GLocaleKey("GAnnotationPanel", "text.marked-as-resolved"))))
                        : ((showResolvedIcon = false), (resolveActionTitle = GLocale.get(new GLocaleKey("GAnnotationPanel", "text.resolve")))),
                        (!isResolved && !canReopen) ||
                            (annotation.getProperty("asgn") || []).length ||
                            $("<span>")
                                .addClass("icon " + (isResolved ? "gravit-icon-resolved" : "gravit-icon-resolve"))
                                .addClass(showResolvedIcon ? "visible" : "")
                                .addClass("annotation-action")
                                .attr("data-title", resolveActionTitle)
                                .click((event) => {
                                    (event.stopPropagation(),
                                        applicationManager.hasAccess(AccessKeys.RESOLVE_COMMENT_ANNOTATION).then((hasAccess) => {
                                            hasAccess || isOwner
                                                ? this._onToggleState(annotation)
                                                : applicationManager.hasAccess(AccessKeys.REOPEN_COMMENT_ANNOTATION).then((hasAccess) => {
                                                      (hasAccess || isOwner) && this._onToggleState(annotation);
                                                  });
                                        }));
                                })
                                .appendTo(actionGroup));
                }
                var menuButton = $("<span>")
                        .append($("<span></span>").addClass("gravit-annotation-icon-menu"))
                        .addClass("annotationpanel-menubutton")
                        .addClass("annotation-action"),
                    menuOverlay = $("<div></div>")
                        .addClass("annotations-menu")
                        .gOverlay({
                            releaseOnClose: false,
                            closeCallback: () => {
                                menuButton.removeClass("g-active");
                            },
                        });
                if (
                    (container.data("annotmenu", menuOverlay),
                    annotation.hasMixin(GAnnotation) &&
                        (canResolve || canReopen) &&
                        !(annotation.getProperty("asgn") || []).length &&
                        (annotation.getProperty("rsv")
                            ? menuOverlay.append(
                                  $("<label>")
                                      .append($("<span>").addClass("icon gravit-icon-reopen").addClass("annot-menu-icon"))
                                      .on("click", (event) => {
                                          (event.stopPropagation(),
                                              gDesigner.stats("commentdocker_option_reopen", annotationType),
                                              menuOverlay.gOverlay("close"),
                                              this._onReopen(annotation));
                                      })
                                      .append($("<span>").text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.reopen"))))
                              )
                            : menuOverlay.append(
                                  $("<label>")
                                      .append(
                                          $("<span>")
                                              .addClass("icon ".concat(IS_COREL ? "gravit-icon-resolved" : "gravit-icon-resolve"))
                                              .addClass("annot-menu-icon")
                                      )
                                      .on("click", (event) => {
                                          (event.stopPropagation(),
                                              gDesigner.stats("commentdocker_option_resolve", annotationType),
                                              menuOverlay.gOverlay("close"),
                                              this._onResolve(annotation));
                                      })
                                      .append($("<span>").text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.resolve"))))
                              )),
                    isOwner &&
                        ((annotation.hasMixin(GAnnotation) && !annotation.getProperty("rsv")) || (annotation instanceof GComment && !annotation.getParent().getProperty("rsv"))) &&
                        annotation.isFillingCompleted())
                ) {
                    const hasText = annotation.getProperty("text").trim().length > 0;
                    this._isCommentingEditingEnable &&
                        menuOverlay.append(
                            $("<label>")
                                .append($("<span>").addClass("icon gravit-icon-edit").addClass("annot-menu-icon"))
                                .on(
                                    "click",
                                    function (event) {
                                        event.stopPropagation();
                                        let statName = hasText ? "commentdocker_option_edit" : "commentdocker_option_add";
                                        (gDesigner.stats("".concat(statName), annotationType),
                                            self._startEditMode(
                                                self._annotationCommentContainer,
                                                annotation.getProperty("text").trim().length > 0,
                                                annotation.getProperty("text"),
                                                commentContentElement.outerWidth(),
                                                commentContentElement.outerHeight(),
                                                self._data,
                                                self._additionalMentions
                                            ),
                                            menuOverlay.gOverlay("close"));
                                    }.bind(commentContentElement)
                                )
                                .append($("<span>").text(GLocale.get(new GLocaleKey("GAnnotationPanel", hasText ? "text.edit-comment" : "text.add-comment"))))
                        );
                }
                isOwner &&
                    this._isCommentingEditingEnable &&
                    menuOverlay.append(
                        $("<label>")
                            .append($("<span>").addClass("icon gravit-icon-trash").addClass("annot-menu-icon"))
                            .on("click", (event) => {
                                (event.stopPropagation(),
                                    gDesigner.stats("commentdocker_option_delete", annotationType),
                                    menuOverlay.gOverlay("close"),
                                    this._onDelete(annotation));
                            })
                            .append($("<span>").text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.delete"))))
                    );
                const activeDocument = gDesigner.getActiveDocument();
                (ANNOTATION_PERMANENT_LINK &&
                    activeDocument &&
                    activeDocument.isShareable() &&
                    menuOverlay.append(
                        $("<label/>")
                            .append($("<span/>").addClass("icon gravit-icon-copy-annot").addClass("annot-menu-icon"))
                            .append($("<span>").text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.copy-permalink"))))
                            .on("click", async (event) => {
                                (event.stopPropagation(), gDesigner.stats("commentdocker_option_copy-permalink", annotationType));
                                const loadingSpinner = $("<span/>").addClass("g-loading").appendTo($(event.target).closest("label"));
                                try {
                                    await this._onCopyPermalinkClick(this._annotation);
                                } finally {
                                    (loadingSpinner.remove(), menuOverlay.gOverlay("close"));
                                }
                            })
                    ),
                    (annotation.hasMixin(GAnnotation) || annotation.getProperty("type") === GComment.Type.User) &&
                        menuOverlay.find(".annot-menu-icon").length &&
                        menuButton.on("click", (event) => {
                            (event.stopPropagation(), menuButton.addClass("g-active"), menuOverlay.gOverlay("open", $(event.target).closest("span").closest("span")));
                        }).appendTo(actionGroup));
            }),
            (AnnotationRow.prototype.isCollapsible = function () {
                return this._annotation.hasMixin(GAnnotation);
            }),
            (AnnotationRow.prototype.setCollapseState = function (expanded) {
                if (this.isCollapsible())
                    return $(this._expandIcon)
                        .removeClass(expanded ? "gravit-icon-right" : "gravit-icon-down")
                        .addClass(expanded ? "gravit-icon-down" : "gravit-icon-right");
            }),
            (AnnotationRow.prototype.isEditMode = function () {
                return this._annotationCommentContainer.hasClass("g-edit-mode");
            }),
            (AnnotationRow.prototype._clearOwnData = function () {
                var menu = this._container.data("annotmenu");
                menu && (menu.empty(), this._container.data("annotmenu", null));
            }),
            (AnnotationRow.prototype.cancelEditMode = function () {
                (this._annotationCommentContainer.removeClass("g-edit-mode"),
                    this._contentEditorButtons.hide(),
                    this._assigneeRow.hide(),
                    this.setMentionOverlayBorderVisiblity(false));
            }),
            (AnnotationRow.prototype.toggleHighlight = function (highlighted) {
                this._container.toggleClass("g-highlighted-row", highlighted);
            }),
            (AnnotationRow.prototype.isRead = function () {
                return this._isRead;
            }),
            (AnnotationRow.prototype.isTypeResolved = function () {
                return this._isTypeResolved;
            }),
            (AnnotationRow.prototype.isTypeReopened = function () {
                return this._isTypeReopened;
            }),
            (AnnotationRow.prototype.isParentAnnotationResolved = function () {
                return this._isParentAnnotResolved;
            }),
            (AnnotationRow.prototype.setVisiblity = function (visible) {
                visible ? this._container.show() : this._container.hide();
            }),
            (AnnotationRow.prototype.setMentionOverlayBorderVisiblity = function (visible) {
                visible
                    ? this._annotationCommentContainer.find(".mentions-input-box").css("display", "block")
                    : this._annotationCommentContainer.find(".mentions-input-box").css("display", "none");
            }),
            (AnnotationRow.prototype._updateParentAnnotResolvedStatus = function (parentAnnotation) {
                this._isParentAnnotResolved = !!parentAnnotation.getProperty("rsv");
            }),
            (AnnotationRow.prototype._updateReadUnreadStatus = function (titleGroup) {
                var annotation = this._annotation,
                    currentUser = gDesigner.getSyncUser(),
                    isOwner = ownerUtil.default.isOwner(currentUser, annotation);
                if (this._isParentAnnotResolved || isOwner || (annotation.getProperty("read") || []).includes(currentUser.getUID())) this._isRead = true;
                else {
                    var unreadBadge = null;
                    (designerConfig.SHOW_SIDEBAR_BADGE &&
                        ((unreadBadge = $("<div/>")
                            .addClass("new-comment")
                            .append([
                                $("<span/>").addClass("dot").text("·"),
                                $("<span/>")
                                    .addClass("text-new")
                                    .text(GLocale.get(new GLocaleKey("GAnnotationPanel", "text.unread-comment"))),
                            ])
                            .appendTo(titleGroup)),
                        this._container.addClass("new-element")),
                        this._sidebarActive &&
                            setTimeout(() => {
                                let readUsers = annotation.getProperty("read") || [];
                                readUsers.includes(currentUser.getUID()) ||
                                    (annotation.setProperty("read", readUsers.concat(currentUser.getUID())),
                                    unreadBadge && unreadBadge.remove(),
                                    (this._isRead = true),
                                    this._container.addClass("new-element"));
                            }, NEW_COMMENT_READ_TIMEOUT));
                }
            }),
            (AnnotationRow.prototype.scrollIntoView = function () {
                this._scrollToElement(this._container);
            }),
            (AnnotationRow.prototype._startEditMode = function (container, hasExistingText, text, width, height) {
                let existingMentions = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : [],
                    additionalMentions = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [];
                if (!container.hasClass("g-edit-mode")) {
                    var commentEditor = container.find(".annotation-comment-editor"),
                        buttonRow = container.find(".contenteditor-buttonrow");
                    commentEditor.val(escapeHtml(text));
                    var commentResult = this._generateCommentContentHTML(text);
                    let mentionedIds = commentResult.mentioned.map((mention) => mention.id),
                        mentionsToApply = existingMentions
                            .concat(additionalMentions)
                            .filter((mention) => mentionedIds.includes(mention.id))
                            .map((mention) => Mention.default.clone(mention));
                    (mentionsToApply &&
                        mentionsToApply.length &&
                        (mentionsToApply.forEach((mentionItem) => {
                            const matchedMention = commentResult.mentioned.find((matchedMention) => matchedMention.id === mentionItem.id);
                            ((mentionItem.value = matchedMention.showText), (mentionItem.showText = matchedMention.showText));
                        }),
                        container.find(".annotation-comment-editor").mentionsInput("setMentions", mentionsToApply)),
                        this.setMentionOverlayBorderVisiblity(true),
                        commentEditor.trigger("input"),
                        commentEditor[0].setSelectionRange(commentEditor[0].textLength, commentEditor[0].textLength),
                        buttonRow.show(),
                        buttonRow
                            .find(".annotations-addcomment")
                            .text(GLocale.get(new GLocaleKey("GAnnotationPanel", hasExistingText ? "text.edit-comment" : "text.add-comment"))),
                        setTimeout(() => commentEditor.focus()),
                        container.addClass("g-edit-mode"));
                }
            }),
            (AnnotationRow.prototype._generateCommentContentHTML = function (source) {
                let html = "string" == typeof source ? source : escapeHtml(source.getProperty("text"));
                if (((html = html || ""), !gDesigner.getActiveDocument() || !gDesigner.getActiveDocument().getStorageItem()))
                    return { html: html, mentioned: [] };
                let usernameMatches = html.match(GRegex.GRegex.String.USERNAME_RE);
                if (!(usernameMatches || []).length) return { html: html, mentioned: [] };
                let eligibleCollaborators = (this._data || []).filter((collaborator) => {
                        let role = (collaborator.getRole && collaborator.getRole()) || collaborator.role;
                        return !role.is(designerConfig.ShareRoles.Viewer) && !role.is(designerConfig.ShareRoles.NoAccess);
                    }),
                    matchedMentions = [];
                if (
                    (usernameMatches.forEach((match) => {
                        const username = match.substring(1);
                        if (!username) return;
                        if (findAdditionalMention(match)) return void matchedMentions.push(match);
                        const collaborator = eligibleCollaborators.find(createUserMatcher(username));
                        collaborator &&
                            !matchedMentions.find(
                                (function (collaborator) {
                                    return (mention) =>
                                        collaborator.getFirstName() === mention.substring(1) ||
                                        collaborator.getFullUserName() === mention.substring(1) ||
                                        collaborator.getEmail() === mention.substring(1);
                                })(collaborator)
                            ) &&
                            matchedMentions.push(match);
                    }),
                    !(matchedMentions || []).length)
                )
                    return { html: html, mentioned: [] };
                let matchedCollaborators = eligibleCollaborators.filter(
                    (collaborator) =>
                        matchedMentions.includes("@" + collaborator.getFirstName()) ||
                        matchedMentions.includes("@" + collaborator.getFullUserName()) ||
                        (collaborator.getEmail() && matchedMentions.includes("@" + collaborator.getEmail()))
                );
                return (
                    (matchedCollaborators = matchedCollaborators.map((collaborator) => {
                        const collaboratorClone = Object.assign(new Collaborator.default(), collaborator),
                            emailMention = "@" + collaboratorClone.getEmail(),
                            firstNameMention = "@" + collaboratorClone.getFirstName();
                        return (matchedMentions.includes(firstNameMention) ? (collaboratorClone.showText = "@" + collaboratorClone.getFullUserName()) : matchedMentions.includes(emailMention) && (collaboratorClone.showText = emailMention), collaboratorClone);
                    })),
                    matchedMentions.forEach((mention) => {
                        let displayMention = mention;
                        const additionalMention = findAdditionalMention(mention);
                        if (additionalMention) ((displayMention = additionalMention.showText), matchedCollaborators.push(additionalMention));
                        else {
                            const username = mention.substring(1),
                                matchedCollaborator = matchedCollaborators.find(createUserMatcher(username));
                            matchedCollaborator && ((displayMention = matchedCollaborator.showText), html.includes(displayMention) && (mention = displayMention));
                        }
                        html = html.replace(mention, "<strong><span>" + displayMention + "</span></strong>");
                    }),
                    { html: html, mentioned: matchedCollaborators }
                );
            }),
            (module.exports = AnnotationRow));
    };
