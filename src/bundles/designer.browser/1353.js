module.exports = function (module, exports, require) {
        "use strict";
        const { GLocale, GLocaleKey } = require(1 /* GObject */),
            UserMention = require(883);
        module.exports = {
            createAdditionalMentions: function () {
                return {
                    MENTION_ALL_REVIEWERS: new UserMention({
                        name: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-reviewers-name")),
                        showText: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-reviewers-show-text")),
                        id: "@reviewers",
                        avatar: "assets/icon/notification-icon.svg",
                        fontWeight: "bold",
                        type: "contact",
                        role: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-reviewers-role")),
                        email: "",
                        additional: true,
                    }),
                    MENTION_ALL_APPROVERS: new UserMention({
                        name: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-approvers-name")),
                        showText: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-approvers-show-text")),
                        id: "@approvers",
                        avatar: "assets/icon/notification-icon.svg",
                        fontWeight: "bold",
                        type: "contact",
                        role: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-approvers-role")),
                        email: "",
                        additional: true,
                    }),
                    MENTION_ALL_CO_AUTHORS: new UserMention({
                        name: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-co-author-name")),
                        showText: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-co-author-show-text")),
                        id: "@coauthors",
                        avatar: "assets/icon/notification-icon.svg",
                        fontWeight: "bold",
                        type: "contact",
                        role: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-co-author-role")),
                        email: "",
                        additional: true,
                    }),
                    MENTION_ALL: new UserMention({
                        name: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-name")),
                        showText: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-show-text")),
                        id: "@all",
                        avatar: "assets/icon/notification-icon.svg",
                        fontWeight: "bold",
                        type: "contact",
                        role: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-all-role")),
                        email: "",
                        additional: true,
                    }),
                    MENTION_OWNER: new UserMention({
                        name: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-owner-name")),
                        showText: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-owner-show-text")),
                        id: "@owner",
                        avatar: "assets/icon/notification-icon.svg",
                        fontWeight: "bold",
                        type: "contact",
                        role: GLocale.get(new GLocaleKey("GAnnotationPanel", "text.additional-collaborators-owner-role")),
                        email: "",
                        additional: true,
                    }),
                };
            },
        };
    };
