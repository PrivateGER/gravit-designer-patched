module.exports = function (module, exports, require) {
            for (
                var objectUtils = require(632),
                    systemInfo = require(633),
                    GTranslation = require(634),
                    ClassReference = require(635),
                    GLocaleLanguage = require(636),
                    GLocale = require(889),
                    GLocaleKey = require(637),
                    GTranslationNotificationEvent = require(638),
                    GTranslationEvents = require(639),
                    translationProjects = new GTranslation().getMapped(),
                    locale = new GLocale(),
                    d = 0;
                d < translationProjects.length;
                d++
            ) {
                var g = translationProjects[d],
                    f = g.project;
                locale.setProject(f);
                for (var m = g.importStack, y = 0; y < m.length; y++) {
                    var _ = m[y];
                    if (
                        _.some(function (languageEntry) {
                            return languageEntry.hasOwnProperty("translations") && Object.keys(languageEntry.translations).length;
                        })
                    ) {
                        if (
                            _.filter(function (languageEntry) {
                                return languageEntry.isDefault;
                            }).length > 1
                        )
                            throw "Only one default language can exist!";
                        for (var v = 0; v < _.length; v++) {
                            var b = _[v];
                            if (b.translations) {
                                GLocaleLanguage.hasOwnProperty(b.language) || (GLocaleLanguage[b.language] = b.keyValue);
                                for (var C = Object.keys(b.translations), w = 0; w < C.length; w++) {
                                    var E = C[w],
                                        B = Object.assign({}, b.translations[E]);
                                    if (
                                        (Object.keys(B).forEach(function (key) {
                                            B[key] || delete B[key];
                                        }),
                                        locale.setValues(new ClassReference(E), GLocaleLanguage[b.language], Object.keys(B), Object.values(B), true),
                                        b.translationsExtended && b.translationsExtended[E])
                                    ) {
                                        var x = objectUtils.extend({}, B, b.translationsExtended[E]);
                                        (Object.keys(x).forEach(function (key) {
                                            x[key] || delete x[key];
                                        }),
                                            locale.setValues(new ClassReference(E), GLocaleLanguage[b.language], Object.keys(x), Object.values(x), true, true));
                                    }
                                }
                            }
                        }
                    }
                }
                var P = g.translations.find(function (candidate) {
                    return (
                        systemInfo.language &&
                        ((5 === systemInfo.fullLanguage.length && candidate.abbreviation.toLowerCase() === systemInfo.fullLanguage) ||
                            (5 !== systemInfo.fullLanguage.length && candidate.abbreviation.indexOf(systemInfo.fullLanguage) >= 0))
                    );
                });
                P && locale.setLanguage(P.keyValue);
            }
            module.exports = {
                GLocale: locale,
                GLocaleLanguage: GLocaleLanguage,
                ClassReference: ClassReference,
                GTranslation: GTranslation,
                GLocaleKey: GLocaleKey,
                GTranslationNotificationEvent: GTranslationNotificationEvent,
                GTranslationEvents: GTranslationEvents,
                Factory: function (project) {
                    var localeInstance = new GLocale();
                    return ((localeInstance = Object.assign(localeInstance, locale)).setProject(project), localeInstance);
                },
            };
        };
