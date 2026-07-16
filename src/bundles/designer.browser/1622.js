module.exports = function (module, exports, require) {
        "use strict";
        var GCategory = require(18),
            i = require(1302);
        module.exports = [
            {
                name: "contact-us",
                link: gApi.link.getSupportUrl(),
                category: GCategory.CATEGORY_HELP_SUPPORT,
                group: "help/support",
            },
            {
                name: "user-guide",
                link: gApi.link.getDocumentationUrl(),
                category: GCategory.CATEGORY_HELP_LEARN,
                group: "help/learn",
            },
            {
                name: "tutorials",
                link: i.youtubePlaylist,
                category: GCategory.CATEGORY_HELP_LEARN,
                group: "help/learn",
            },
            {
                name: "request-new-feature",
                link: gApi.link.getRequestNewFeatureUrl(),
                category: GCategory.CATEGORY_HELP,
                group: "help",
            },
            {
                name: "eula",
                link: "http://www.corel.com/eula",
                category: GCategory.CATEGORY_HELP,
                group: "help",
            },
        ];
    };
