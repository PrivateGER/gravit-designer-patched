module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        (require(19), require(8 /* Symbol */), require(134 /* polyfill:String */), require(4), require(13), require(26));
        var GObject = require(1),
            designerConfig = require(10),
            r = _interopRequireDefault(require(536));
        class GTranslationLoader {
            static async setLanguage(languageKey) {
                try {
                    const translations = GObject.GLocale.getTranslations(),
                        cloudProject = GObject.GTranslation.Projects.Cloud,
                        designerProject = GObject.GTranslation.Projects.Designer,
                        translation = translations.find((entry) => entry.keyValue === languageKey);
                    if (!translation) return;
                    const designerTranslation = await this._fetchTranslation(designerProject, translation),
                        cloudTranslation = await this._fetchTranslation(cloudProject, translation);
                    (GObject.GLocale.replaceValues(designerProject, languageKey, designerTranslation.translations),
                        GObject.GLocale.replaceValues(cloudProject, languageKey, cloudTranslation.translations),
                        GObject.GLocale.setLanguage(languageKey),
                        designerConfig.GLocaleFactory.setLanguage(languageKey),
                        designerConfig.gApi.setLanguage(languageKey));
                } catch (e) {}
            }
            static async _shouldFetchTranslation(project, translation) {
                if (translation.keyValue === GObject.GLocale.getLanguage())
                    try {
                        // The translation CDN is gone; _getCDNURL resolves null. Skip
                        // the HEAD probe instead of requesting the literal URL "null".
                        const url = await this._getCDNURL(project, translation);
                        if (!url) return false;
                        const etag = await fetch(url, {
                            method: "HEAD",
                        }).then((response) => {
                            if (response.ok) return response.headers.get("etag");
                        });
                        if (this._isEtagsEqual(etag, translation.etag)) return false;
                    } catch (e) {}
                return true;
            }
            static _isEtagsEqual(etag, expectedEtag) {
                return (etag.startsWith("W/") && (etag = etag.substring(3, etag.length - 1)), etag === expectedEtag);
            }
            static async _fetchTranslation(project, translation) {
                // No URL means the locale pack is unavailable (dead CDN): return
                // undefined so setLanguage takes its existing English-fallback path
                // without a network round-trip to "/null".
                const url = await this._getCDNURL(project, translation);
                if (!url || !(await this._shouldFetchTranslation(project, translation))) return;
                return await fetch(url).then((response) => response.json());
            }
            static async _getCDNURL(project, translation) {
                const abbreviation = translation.abbreviation,
                    projectKey = project.toLowerCase(),
                    cacheKey = "".concat(abbreviation, "/").concat(projectKey);
                let cached = this.translationsCacheMap.get(cacheKey);
                return (
                    cached ||
                        (cached = this.translationsCacheMap
                            .set(
                                cacheKey,
                                new r.default(() =>
                                    designerConfig.gApi
                                        .fetchTranslationsURL(abbreviation, projectKey)
                                        .then((result) => result.url)
                                        .catch(() => null)
                                )
                            )
                            .get(cacheKey)),
                    await cached.get()
                );
            }
        }
        ((GTranslationLoader.translationsCacheMap = new Map()), (module.exports = GTranslationLoader));
    };
