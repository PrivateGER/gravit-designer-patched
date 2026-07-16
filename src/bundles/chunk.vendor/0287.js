module.exports = function (module, exports, require) {
            "use strict";
            require(30);
            const { ACCESS: n, INSPECT: r, COMMENT: o, COPY: a, SHARE: s, EDIT: l, OWNER: h, APPROVE: A, PASSWORD_PROTECT: c } = require(352),
                { GLocale: p, GLocaleKey: u } = require(209 /* GLocale */),
                d = (e) =>
                    Object.freeze(
                        Object.assign(
                            {
                                get name() {
                                    return this.getName();
                                },
                                get description() {
                                    return this.getDescription();
                                },
                                get invitationMessage() {
                                    return this.getInvitationMessage();
                                },
                                get invitationInfo() {
                                    return this.getInvitationInfo();
                                },
                                get status() {
                                    return this.getStatus();
                                },
                                getName: (t) => p.get(new u("GShareRoles", "text.role-".concat(e.i18n || e.id, "-name")), null, t),
                                getDescription: (t) =>
                                    p.get(new u("GShareRoles", "text.role-".concat(e.i18n || e.id, "-description")), null, t),
                                getInvitationMessage: (t) =>
                                    p.get(new u("GShareRoles", "text.role-".concat(e.i18n || e.id, "-invitation-message")), null, t),
                                getInvitationInfo: (t) =>
                                    p.get(new u("GShareRoles", "text.role-".concat(e.i18n || e.id, "-invitation-info")), null, t),
                                getStatus: (t) => p.get(new u("GShareRoles", "text.role-".concat(e.i18n || e.id, "-status")), null, t),
                            },
                            e
                        )
                    );
            module.exports = Object.freeze({
                NoAccess: d({
                    id: "no_access",
                    i18n: "no-access",
                    level: 0,
                    permissions: {
                        [n]: false,
                    },
                }),
                Viewer: d({
                    id: "viewer",
                    level: 1,
                    mentionName: "viewers",
                    permissions: {
                        [n]: true,
                    },
                }),
                Developer: d({
                    id: "developer",
                    level: 2,
                    mentionName: "developers",
                    permissions: {
                        [n]: true,
                        [r]: true,
                        [a]: true,
                    },
                }),
                Reviewer: d({
                    id: "reviewer",
                    level: 3,
                    mentionName: "reviewers",
                    pro: true,
                    permissions: {
                        [n]: true,
                        [o]: true,
                    },
                }),
                Approver: d({
                    id: "approver",
                    level: 4,
                    mentionName: "approvers",
                    pro: true,
                    permissions: {
                        [n]: true,
                        [o]: true,
                        [A]: true,
                    },
                }),
                CoAuthor: d({
                    id: "co_author",
                    i18n: "co-author",
                    level: 5,
                    pro: true,
                    assignable: false,
                    mentionName: "coauthors",
                    permissions: {
                        [n]: true,
                        [r]: true,
                        [a]: true,
                        [o]: true,
                        [l]: true,
                    },
                }),
                Owner: d({
                    id: "owner",
                    level: 6,
                    mentionName: "owner",
                    assignable: false,
                    permissions: {
                        [h]: true,
                        [A]: true,
                        [c]: true,
                        [n]: true,
                        [r]: true,
                        [a]: true,
                        [o]: true,
                        [s]: true,
                        [l]: true,
                    },
                }),
            });
        };
