module.exports = function (module, exports, require) {
            "use strict";
            const n = require(170),
                r = require(325);
            module.exports = (e) => {
                let { accessToken: t, apiKey: i, appId: o, language: a = 0 } = e;
                n.setLanguage(a);
                const s = new google.picker.DocsView()
                        .setIncludeFolders(true)
                        .setSelectFolderEnabled(true)
                        .setParent("root")
                        .setLabel(n.get(new r("GGoogleDrive", "text.all-files-tab-title"))),
                    l = new google.picker.DocsView()
                        .setIncludeFolders(true)
                        .setEnableDrives(true)
                        .setEnableTeamDrives(true)
                        .setSelectFolderEnabled(true)
                        .setParent("root")
                        .setLabel(n.get(new r("GGoogleDrive", "text.team-drives-tab-title")));
                return new google.picker.PickerBuilder()
                    .setAppId(o)
                    .setOAuthToken(t)
                    .enableFeature(google.picker.Feature.SUPPORT_TEAM_DRIVES)
                    .enableFeature(google.picker.Feature.SUPPORT_DRIVES)
                    .addView(s)
                    .addView(l)
                    .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                    .setDeveloperKey(i)
                    .setLocale(n.getLocaleTagISO6391())
                    .build();
            };
        };
