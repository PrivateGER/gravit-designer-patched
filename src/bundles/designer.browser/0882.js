module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.getCollabInfo = getCollabInfo),
            (exports.handleCollabsData = async function (collaboratorsPromise) {
                if (!gDesigner.getActiveDocument() || !gDesigner.getActiveDocument().getStorageItem()) return;
                let userMentions = [];
                const collaborators = collaboratorsPromise ? await collaboratorsPromise : gDesigner.getShareManager().getCollaboratorsCached(gDesigner.getActiveDocument());
                if (collaborators && collaborators.length)
                    for (let e = 0; e < collaborators.length; e++) {
                        let collaborator = collaborators[e];
                        if (!collaborator.getRole().is(designerConfig.ShareRoles.Viewer) && !collaborator.getRole().is(designerConfig.ShareRoles.NoAccess)) {
                            let userInfo = await getCollabInfo(collaborator.getUID());
                            userMentions.push(userMentionModule.default.createUserMention(collaborator, userInfo));
                        }
                    }
                let reviewers,
                    approvers,
                    coAuthors,
                    owner,
                    additionalMentions = [];
                if (userMentions.length) {
                    ((reviewers = userMentions.filter((mention) => mention.getRole().is(designerConfig.ShareRoles.Reviewer))),
                        (approvers = userMentions.filter((mention) => mention.getRole().is(designerConfig.ShareRoles.Approver))),
                        (coAuthors = userMentions.filter((mention) => mention.getRole().is(designerConfig.ShareRoles.CoAuthor))),
                        (owner = userMentions.filter((mention) => mention.getRole().is(designerConfig.ShareRoles.Owner))));
                    const mentionConstants = (0, GAnnotationAdditionalMentions.createAdditionalMentions)();
                    (reviewers && reviewers.length && additionalMentions.push(mentionConstants.MENTION_ALL_REVIEWERS),
                        approvers && approvers.length && additionalMentions.push(mentionConstants.MENTION_ALL_APPROVERS),
                        coAuthors && coAuthors.length && additionalMentions.push(mentionConstants.MENTION_ALL_CO_AUTHORS),
                        owner && owner.length && additionalMentions.push(mentionConstants.MENTION_OWNER),
                        additionalMentions.push(mentionConstants.MENTION_ALL));
                }
                return {
                    data: userMentions,
                    allReviewers: reviewers,
                    allApprovers: approvers,
                    allCoAuthors: coAuthors,
                    owner: owner,
                    additionalMentions: additionalMentions,
                };
            }),
            (exports.replaceAdditionalCollabShowTextBeforeSend = function (text) {
                const mentionConstants = (0, GAnnotationAdditionalMentions.createAdditionalMentions)();
                return (
                    this._mentionsCollection.forEach((mention) => {
                        mention.id === mentionConstants.MENTION_ALL.id
                            ? text.replace(mentionConstants.MENTION_ALL.showText, mentionConstants.MENTION_ALL.id)
                            : mention.id === mentionConstants.MENTION_OWNER.id
                              ? text.replace(mentionConstants.MENTION_OWNER.showText, mentionConstants.MENTION_OWNER.id)
                              : mention.id === mentionConstants.MENTION_ALL_REVIEWERS.id
                                ? text.replace(mentionConstants.MENTION_ALL_REVIEWERS.showText, mentionConstants.MENTION_ALL_REVIEWERS.id)
                                : mention.id === mentionConstants.MENTION_ALL_APPROVERS.id
                                  ? text.replace(mentionConstants.MENTION_ALL_APPROVERS.showText, mentionConstants.MENTION_ALL_APPROVERS.id)
                                  : mention.id === mentionConstants.MENTION_ALL_CO_AUTHORS.id &&
                                    text.replace(mentionConstants.MENTION_ALL_CO_AUTHORS.showText, mentionConstants.MENTION_ALL_CO_AUTHORS.id);
                    }),
                    text
                );
            }),
            (exports.showAssigneeRow = function (inputElement) {
                if (!inputElement || !inputElement.length) return;
                inputElement.mentionsInput("getMentions", (mentions) => {
                    if (((this._mentionsCollection = mentions), this._mentionsCollection.length)) {
                        this._assigneeRow.show();
                        let assignees = this._mentionsCollection.reduce((assignees, mention) => {
                            let itemsToAdd = [],
                                existingIds = assignees.map((assignee) => assignee.id);
                            return (
                                (itemsToAdd =
                                    mention.id === mentionConstants.MENTION_ALL_REVIEWERS.id &&
                                    this._mentionData &&
                                    this._mentionData.allReviewers &&
                                    this._mentionData.allReviewers.length
                                        ? this._mentionData.allReviewers.filter((item) => !existingIds.includes(item.id))
                                        : mention.id === mentionConstants.MENTION_ALL_APPROVERS.id &&
                                            this._mentionData &&
                                            this._mentionData.allApprovers &&
                                            this._mentionData.allApprovers.length
                                          ? this._mentionData.allApprovers.filter((item) => !existingIds.includes(item.id))
                                          : mention.id === mentionConstants.MENTION_ALL_CO_AUTHORS.id &&
                                              this._mentionData &&
                                              this._mentionData.allCoAuthors &&
                                              this._mentionData.allCoAuthors.length
                                            ? this._mentionData.allCoAuthors.filter((item) => !existingIds.includes(item.id))
                                            : mention.id === mentionConstants.MENTION_ALL.id
                                              ? this._data.filter((item) => !existingIds.includes(item.id))
                                              : mention.id === mentionConstants.MENTION_OWNER.id && this._owner && this._owner.length
                                                ? this._owner.filter((item) => !existingIds.includes(item.id))
                                                : existingIds.includes(mention.id)
                                                  ? []
                                                  : [mention]),
                                assignees.push(...itemsToAdd),
                                assignees
                            );
                        }, []);
                        if (1 === assignees.length)
                            (this._assigneeSelector.hide(), this._onlyOneAssignee.html(assignees[0].name), this._onlyOneAssignee.show());
                        else {
                            this._onlyOneAssignee.hide();
                            let selectElement = this._assigneeSelector.find("select");
                            (selectElement.find("option").remove(),
                                assignees.forEach((assignee) => {
                                    selectElement.append($("<option>").attr("value", assignee.id).text(assignee.name));
                                }),
                                this._assigneeSelector.show());
                        }
                        updateAssignee.call(this, assignees[0].id);
                    } else
                        (this._assigneeRow.hide(), (this._shouldAssign = false), this._assigneeCheckBox.prop("checked", this._shouldAssign));
                });
            }),
            (exports.updateAssignee = updateAssignee),
            require(58 /* polyfill:Array */),
            require(19),
            require(168 /* PDFFetchStream */),
            require(8 /* Symbol */),
            require(20 /* polyfill:RegExp */),
            require(71 /* polyfill:String */),
            require(34),
            require(4),
            require(41),
            require(13),
            require(32),
            require(38),
            require(169 /* PDFNetworkStream */),
            require(33),
            require(26));
        var designerConfig = require(10),
            userMentionModule = _interopRequireDefault(require(883)),
            GAnnotationAdditionalMentions = require(1353);
        const mentionConstants = (0, GAnnotationAdditionalMentions.createAdditionalMentions)(),
            userInfoCache = {};
        async function getCollabInfo(userId) {
            return (userInfoCache.hasOwnProperty(userId) || (userInfoCache[userId] = designerConfig.gApi.getUser(userId, true).catch(() => null)), userInfoCache[userId]);
        }
        function updateAssignee(id) {
            id && id.length && (this._assignees = [id]);
        }
    };
