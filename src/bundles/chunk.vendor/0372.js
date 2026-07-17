module.exports = function (module, exports, require) {
            "use strict";
            (require(30 /* polyfill:Object */), require(4), require(41), require(13), require(32), require(97), require(33));
            for (
                var objectUtils = require(685),
                    systemInfo = require(686),
                    GTranslation = require(699),
                    ClassReference = require(700),
                    GLocaleLanguage = require(701),
                    GLocale = require(945),
                    GLocaleKey = require(703),
                    GTranslationNotificationEvent = require(704),
                    GTranslationEvents = require(705),
                    translationProjects = new GTranslation().getMapped(),
                    localeInstance = new GLocale(),
                    d = 0;
                d < translationProjects.length;
                d++
            ) {
                var g = translationProjects[d],
                    f = g.project;
                localeInstance.setProject(f);
                for (var m = g.importStack, y = 0; y < m.length; y++) {
                    var _ = m[y];
                    if (
                        _.some(function (language) {
                            return language.hasOwnProperty("translations") && Object.keys(language.translations).length;
                        })
                    ) {
                        if (
                            _.filter(function (language) {
                                return language.isDefault;
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
                                        localeInstance.setValues(new ClassReference(E), GLocaleLanguage[b.language], Object.keys(B), Object.values(B), true),
                                        b.translationsExtended && b.translationsExtended[E])
                                    ) {
                                        var x = objectUtils.extend({}, B, b.translationsExtended[E]);
                                        (Object.keys(x).forEach(function (key) {
                                            x[key] || delete x[key];
                                        }),
                                            localeInstance.setValues(new ClassReference(E), GLocaleLanguage[b.language], Object.keys(x), Object.values(x), true, true));
                                    }
                                }
                            }
                        }
                    }
                }
                var P = g.translations.find(function (translation) {
                    return (
                        systemInfo.language &&
                        ((5 === systemInfo.fullLanguage.length && translation.abbreviation.toLowerCase() === systemInfo.fullLanguage) ||
                            (5 !== systemInfo.fullLanguage.length && translation.abbreviation.indexOf(systemInfo.fullLanguage) >= 0))
                    );
                });
                P && localeInstance.setLanguage(P.keyValue);
            }
            module.exports = {
                GLocale: localeInstance,
                GLocaleLanguage: GLocaleLanguage,
                ClassReference: ClassReference,
                GTranslation: GTranslation,
                GLocaleKey: GLocaleKey,
                GTranslationNotificationEvent: GTranslationNotificationEvent,
                GTranslationEvents: GTranslationEvents,
                Factory: function (project) {
                    var instance = new GLocale();
                    return ((instance = Object.assign(instance, localeInstance)).setProject(project), instance);
                },
            };
        };
