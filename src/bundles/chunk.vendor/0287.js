module.exports = function (module, exports, require) {
            "use strict";
            require(30 /* polyfill:Object */);
            const { ACCESS, INSPECT, COMMENT, COPY, SHARE, EDIT, OWNER, APPROVE, PASSWORD_PROTECT } = require(352),
                { GLocale, GLocaleKey } = require(209 /* GLocale */),
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
                                getName: (t) => GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(e.i18n || e.id, "-name")), null, t),
                                getDescription: (t) =>
                                    GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(e.i18n || e.id, "-description")), null, t),
                                getInvitationMessage: (t) =>
                                    GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(e.i18n || e.id, "-invitation-message")), null, t),
                                getInvitationInfo: (t) =>
                                    GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(e.i18n || e.id, "-invitation-info")), null, t),
                                getStatus: (t) => GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(e.i18n || e.id, "-status")), null, t),
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
                        [ACCESS]: false,
                    },
                }),
                Viewer: d({
                    id: "viewer",
                    level: 1,
                    mentionName: "viewers",
                    permissions: {
                        [ACCESS]: true,
                    },
                }),
                Developer: d({
                    id: "developer",
                    level: 2,
                    mentionName: "developers",
                    permissions: {
                        [ACCESS]: true,
                        [INSPECT]: true,
                        [COPY]: true,
                    },
                }),
                Reviewer: d({
                    id: "reviewer",
                    level: 3,
                    mentionName: "reviewers",
                    pro: true,
                    permissions: {
                        [ACCESS]: true,
                        [COMMENT]: true,
                    },
                }),
                Approver: d({
                    id: "approver",
                    level: 4,
                    mentionName: "approvers",
                    pro: true,
                    permissions: {
                        [ACCESS]: true,
                        [COMMENT]: true,
                        [APPROVE]: true,
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
                        [ACCESS]: true,
                        [INSPECT]: true,
                        [COPY]: true,
                        [COMMENT]: true,
                        [EDIT]: true,
                    },
                }),
                Owner: d({
                    id: "owner",
                    level: 6,
                    mentionName: "owner",
                    assignable: false,
                    permissions: {
                        [OWNER]: true,
                        [APPROVE]: true,
                        [PASSWORD_PROTECT]: true,
                        [ACCESS]: true,
                        [INSPECT]: true,
                        [COPY]: true,
                        [COMMENT]: true,
                        [SHARE]: true,
                        [EDIT]: true,
                    },
                }),
            });
        };
