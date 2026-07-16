module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        (require(19), require(8 /* Symbol */), require(134), require(4), require(13), require(26));
        var GObject = require(1),
            designerConfig = require(10),
            r = o(require(536));
        class s {
            static async setLanguage(e) {
                try {
                    const t = GObject.GLocale.getTranslations(),
                        n = GObject.GTranslation.Projects.Cloud,
                        o = GObject.GTranslation.Projects.Designer,
                        r = t.find((t) => t.keyValue === e);
                    if (!r) return;
                    const s = await this._fetchTranslation(o, r),
                        l = await this._fetchTranslation(n, r);
                    (GObject.GLocale.replaceValues(o, e, s.translations),
                        GObject.GLocale.replaceValues(n, e, l.translations),
                        GObject.GLocale.setLanguage(e),
                        designerConfig.GLocaleFactory.setLanguage(e),
                        designerConfig.gApi.setLanguage(e));
                } catch (e) {}
            }
            static async _shouldFetchTranslation(e, t) {
                if (t.keyValue === GObject.GLocale.getLanguage())
                    try {
                        const n = await fetch(await this._getCDNURL(e, t), {
                            method: "HEAD",
                        }).then((e) => {
                            if (e.ok) return e.headers.get("etag");
                        });
                        if (this._isEtagsEqual(n, t.etag)) return false;
                    } catch (e) {}
                return true;
            }
            static _isEtagsEqual(e, t) {
                return (e.startsWith("W/") && (e = e.substring(3, e.length - 1)), e === t);
            }
            static async _fetchTranslation(e, t) {
                if (!(await this._shouldFetchTranslation(e, t))) return;
                return await fetch(await this._getCDNURL(e, t)).then((e) => e.json());
            }
            static async _getCDNURL(e, t) {
                const n = t.abbreviation,
                    o = e.toLowerCase(),
                    i = "".concat(n, "/").concat(o);
                let s = this.translationsCacheMap.get(i);
                return (
                    s ||
                        (s = this.translationsCacheMap
                            .set(
                                i,
                                new r.default(() =>
                                    designerConfig.gApi
                                        .fetchTranslationsURL(n, o)
                                        .then((e) => e.url)
                                        .catch(() => null)
                                )
                            )
                            .get(i)),
                    await s.get()
                );
            }
        }
        ((s.translationsCacheMap = new Map()), (module.exports = s));
    };
