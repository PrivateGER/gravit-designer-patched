module.exports = function (module, exports, require) {
            "use strict";
            require(30 /* polyfill:Object */);
            const { ACCESS, INSPECT, COMMENT, COPY, SHARE, EDIT, OWNER, APPROVE, PASSWORD_PROTECT } = require(352),
                { GLocale, GLocaleKey } = require(209 /* GLocale */),
                createRole = (role) =>
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
                                getName: (locale) => GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(role.i18n || role.id, "-name")), null, locale),
                                getDescription: (locale) =>
                                    GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(role.i18n || role.id, "-description")), null, locale),
                                getInvitationMessage: (locale) =>
                                    GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(role.i18n || role.id, "-invitation-message")), null, locale),
                                getInvitationInfo: (locale) =>
                                    GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(role.i18n || role.id, "-invitation-info")), null, locale),
                                getStatus: (locale) => GLocale.get(new GLocaleKey("GShareRoles", "text.role-".concat(role.i18n || role.id, "-status")), null, locale),
                            },
                            role
                        )
                    );
            module.exports = Object.freeze({
                NoAccess: createRole({
                    id: "no_access",
                    i18n: "no-access",
                    level: 0,
                    permissions: {
                        [ACCESS]: false,
                    },
                }),
                Viewer: createRole({
                    id: "viewer",
                    level: 1,
                    mentionName: "viewers",
                    permissions: {
                        [ACCESS]: true,
                    },
                }),
                Developer: createRole({
                    id: "developer",
                    level: 2,
                    mentionName: "developers",
                    permissions: {
                        [ACCESS]: true,
                        [INSPECT]: true,
                        [COPY]: true,
                    },
                }),
                Reviewer: createRole({
                    id: "reviewer",
                    level: 3,
                    mentionName: "reviewers",
                    pro: true,
                    permissions: {
                        [ACCESS]: true,
                        [COMMENT]: true,
                    },
                }),
                Approver: createRole({
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
                CoAuthor: createRole({
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
                Owner: createRole({
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
