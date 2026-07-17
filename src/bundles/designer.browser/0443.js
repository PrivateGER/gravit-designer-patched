module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(557), require(26), Object.defineProperty(exports, "__esModule", { value: true }), (exports.default = void 0), require(8 /* Symbol */));
        var microsoftTeams = (function (e, t) {
            if ("function" == typeof WeakMap)
                var n = new WeakMap(),
                    o = new WeakMap();
            return (function (e, t) {
                if (!t && e && e.__esModule) return e;
                var i,
                    a,
                    r = { __proto__: null, default: e };
                if (null === e || ("object" != typeof e && "function" != typeof e)) return r;
                if ((i = t ? o : n)) {
                    if (i.has(e)) return i.get(e);
                    i.set(e, r);
                }
                for (const t in e)
                    "default" !== t &&
                        {}.hasOwnProperty.call(e, t) &&
                        ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (a.get || a.set)
                            ? i(r, t, a)
                            : (r[t] = e[t]));
                return r;
            })(e, t);
        })(require(1480 /* lib:microsoft-teams-js */));
        const designerConfig = require(10);
        let isExecutingOnMSTeamsCached = false,
            channelOrChatPromise = false,
            teamsContext = null;
        const msTeamsService = {
            TeamsMode: {
                DESKTOP: { label: "Desktop", code: "desktop" },
                WEB: { label: "Web", code: "web" },
                IOS: { label: "Ios", code: "ios" },
                ANDROID: { label: "Android", code: "android" },
                OTHER: { label: "Other" },
            },
            isExecutingOnMSTeams: async () => {
                const context = await msTeamsService.getTeamsContext().catch(() => false);
                return !!context && !!context.tid;
            },
            getTeamsEnv: async function () {
                switch ((teamsContext || (await msTeamsService.initTeams()), teamsContext.hostClientType)) {
                    case msTeamsService.TeamsMode.DESKTOP.code:
                        return msTeamsService.TeamsMode.DESKTOP.label;
                    case msTeamsService.TeamsMode.WEB.code:
                        return msTeamsService.TeamsMode.WEB.label;
                    default:
                        return msTeamsService.TeamsMode.OTHER.label;
                }
            },
            isExecutingOnChannelOrChat: async () =>
                !!(await msTeamsService.isExecutingOnMSTeams()) && (!!(await msTeamsService.isPrivateChat()) || !!(await msTeamsService.isTeamsChannel())),
            isExecutingOnChannelOrChatSingletonPromise: () => channelOrChatPromise,
            initTeams: () => {
                if (teamsContext) return Promise.resolve();
                const timeoutMs = designerConfig.msTeamsMode ? 15e3 : 0;
                return new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => {
                        reject();
                    }, timeoutMs);
                    microsoftTeams.initialize(() => {
                        microsoftTeams.getContext((context) => {
                            ((teamsContext = context), clearTimeout(timeoutId), resolve());
                        });
                    });
                });
            },
            getTeamsContext: async () => (teamsContext || (await msTeamsService.initTeams()), teamsContext),
            getTeamsLocale: async () => (teamsContext || (await msTeamsService.initTeams()), teamsContext.locale),
            isPrivateChat: async () => !!(await msTeamsService.getTeamsContext()).chatId,
            isTeamsChannel: async () => !!(await msTeamsService.getTeamsContext()).channelId,
            sendSettings: async (settings) => (teamsContext || (await msTeamsService.initTeams()), microsoftTeams.authentication.notifySuccess(settings)),
            getAuthenticator: async () => (teamsContext || (await msTeamsService.initTeams()), microsoftTeams.authentication),
            isExecutingOnMSTeamsSync: () => isExecutingOnMSTeamsCached,
        };
        (msTeamsService.isExecutingOnMSTeams().then((result) => {
            isExecutingOnMSTeamsCached = result;
        }),
            (channelOrChatPromise = msTeamsService.isExecutingOnChannelOrChat()));
        exports.default = msTeamsService;
    };
