module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (Object.defineProperty(exports, "__esModule", { value: true }),
            (exports.getCollabInfo = c),
            (exports.handleCollabsData = async function (e) {
                if (!gDesigner.getActiveDocument() || !gDesigner.getActiveDocument().getStorageItem()) return;
                let t = [];
                const n = e ? await e : gDesigner.getShareManager().getCollaboratorsCached(gDesigner.getActiveDocument());
                if (n && n.length)
                    for (let e = 0; e < n.length; e++) {
                        let o = n[e];
                        if (!o.getRole().is(designerConfig.ShareRoles.Viewer) && !o.getRole().is(designerConfig.ShareRoles.NoAccess)) {
                            let e = await c(o.getUID());
                            t.push(a.default.createUserMention(o, e));
                        }
                    }
                let o,
                    s,
                    l,
                    d,
                    u = [];
                if (t.length) {
                    ((o = t.filter((e) => e.getRole().is(designerConfig.ShareRoles.Reviewer))),
                        (s = t.filter((e) => e.getRole().is(designerConfig.ShareRoles.Approver))),
                        (l = t.filter((e) => e.getRole().is(designerConfig.ShareRoles.CoAuthor))),
                        (d = t.filter((e) => e.getRole().is(designerConfig.ShareRoles.Owner))));
                    const e = (0, GAnnotationPanel.createAdditionalMentions)();
                    (o && o.length && u.push(e.MENTION_ALL_REVIEWERS),
                        s && s.length && u.push(e.MENTION_ALL_APPROVERS),
                        l && l.length && u.push(e.MENTION_ALL_CO_AUTHORS),
                        d && d.length && u.push(e.MENTION_OWNER),
                        u.push(e.MENTION_ALL));
                }
                return {
                    data: t,
                    allReviewers: o,
                    allApprovers: s,
                    allCoAuthors: l,
                    owner: d,
                    additionalMentions: u,
                };
            }),
            (exports.replaceAdditionalCollabShowTextBeforeSend = function (e) {
                const t = (0, GAnnotationPanel.createAdditionalMentions)();
                return (
                    this._mentionsCollection.forEach((n) => {
                        n.id === t.MENTION_ALL.id
                            ? e.replace(t.MENTION_ALL.showText, t.MENTION_ALL.id)
                            : n.id === t.MENTION_OWNER.id
                              ? e.replace(t.MENTION_OWNER.showText, t.MENTION_OWNER.id)
                              : n.id === t.MENTION_ALL_REVIEWERS.id
                                ? e.replace(t.MENTION_ALL_REVIEWERS.showText, t.MENTION_ALL_REVIEWERS.id)
                                : n.id === t.MENTION_ALL_APPROVERS.id
                                  ? e.replace(t.MENTION_ALL_APPROVERS.showText, t.MENTION_ALL_APPROVERS.id)
                                  : n.id === t.MENTION_ALL_CO_AUTHORS.id &&
                                    e.replace(t.MENTION_ALL_CO_AUTHORS.showText, t.MENTION_ALL_CO_AUTHORS.id);
                    }),
                    e
                );
            }),
            (exports.showAssigneeRow = function (e) {
                if (!e || !e.length) return;
                e.mentionsInput("getMentions", (e) => {
                    if (((this._mentionsCollection = e), this._mentionsCollection.length)) {
                        this._assigneeRow.show();
                        let e = this._mentionsCollection.reduce((e, t) => {
                            let n = [],
                                o = e.map((e) => e.id);
                            return (
                                (n =
                                    t.id === s.MENTION_ALL_REVIEWERS.id &&
                                    this._mentionData &&
                                    this._mentionData.allReviewers &&
                                    this._mentionData.allReviewers.length
                                        ? this._mentionData.allReviewers.filter((e) => !o.includes(e.id))
                                        : t.id === s.MENTION_ALL_APPROVERS.id &&
                                            this._mentionData &&
                                            this._mentionData.allApprovers &&
                                            this._mentionData.allApprovers.length
                                          ? this._mentionData.allApprovers.filter((e) => !o.includes(e.id))
                                          : t.id === s.MENTION_ALL_CO_AUTHORS.id &&
                                              this._mentionData &&
                                              this._mentionData.allCoAuthors &&
                                              this._mentionData.allCoAuthors.length
                                            ? this._mentionData.allCoAuthors.filter((e) => !o.includes(e.id))
                                            : t.id === s.MENTION_ALL.id
                                              ? this._data.filter((e) => !o.includes(e.id))
                                              : t.id === s.MENTION_OWNER.id && this._owner && this._owner.length
                                                ? this._owner.filter((e) => !o.includes(e.id))
                                                : o.includes(t.id)
                                                  ? []
                                                  : [t]),
                                e.push(...n),
                                e
                            );
                        }, []);
                        if (1 === e.length)
                            (this._assigneeSelector.hide(), this._onlyOneAssignee.html(e[0].name), this._onlyOneAssignee.show());
                        else {
                            this._onlyOneAssignee.hide();
                            let t = this._assigneeSelector.find("select");
                            (t.find("option").remove(),
                                e.forEach((e) => {
                                    t.append($("<option>").attr("value", e.id).text(e.name));
                                }),
                                this._assigneeSelector.show());
                        }
                        d.call(this, e[0].id);
                    } else
                        (this._assigneeRow.hide(), (this._shouldAssign = false), this._assigneeCheckBox.prop("checked", this._shouldAssign));
                });
            }),
            (exports.updateAssignee = d),
            require(58),
            require(19),
            require(168 /* PDFFetchStream */),
            require(8 /* Symbol */),
            require(20),
            require(71),
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
            a = o(require(883)),
            GAnnotationPanel = require(1353);
        const s = (0, GAnnotationPanel.createAdditionalMentions)(),
            l = {};
        async function c(e) {
            return (l.hasOwnProperty(e) || (l[e] = designerConfig.gApi.getUser(e, true).catch(() => null)), l[e]);
        }
        function d(e) {
            e && e.length && (this._assignees = [e]);
        }
    };
