module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(96 /* polyfill:JSON */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(247), require(91 /* polyfill:String */), require(4), require(41), require(13), require(32), require(38), require(33), require(26));
        var GObject = require(1);
        const { TRANSLATION_MANAGER } = require(10 /* designerConfig */);
        function a() {}
        (GObject.GObject.inherit(a, GObject.GObject),
            (a.prototype._translationBase = null),
            (a.prototype.getProjectsDescription = function () {
                return this._translationBase.getMapped().map((e) => e.project);
            }),
            (a.prototype.loadProjectTranslations = function (e) {
                if (!GObject.GTranslation.Projects.hasOwnProperty(e)) throw Error("Can't load translations, invalid project!");
                ((this._project = e),
                    (this._translations = this._translationBase.getByProject(e)),
                    (this._classesMap = Object.keys(
                        this._translations.find((e) => e.keyValue === GObject.GLocaleLanguage.English).translations
                    )));
            }),
            (a.prototype.getActiveProject = function () {
                return this._project;
            }),
            (a.prototype._translations = null),
            (a.prototype._project = null),
            (a._CSV_SEPARATOR = "|||"),
            (a.prototype.init = function () {
                return (
                    (this._translationBase = new GObject.GTranslation()),
                    this.loadProjectTranslations(GObject.GTranslation.Projects.Designer),
                    (this._localeLanguage = GObject.GLocaleLanguage),
                    this.isConsideringExtension() && GObject.GLocale.enableExtension(),
                    Promise.resolve()
                );
            }),
            (a.prototype.getTranslationByKey = function (e) {
                return this._translations.find((t) => t.keyValue === e);
            }),
            (a.prototype._clone = function (e) {
                return JSON.parse(JSON.stringify(e));
            }),
            (a.prototype.getTranslationCopy = function (e) {
                return this._clone(this.getTranslationByKey(e));
            }),
            (a.FormatTypes = { CSV: "CSV" }),
            (a.prototype.import = function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : a.FormatTypes.CSV,
                    n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                switch (t) {
                    case a.FormatTypes.CSV:
                        return this._handleCSVImport(e).then((e) => this.applyTranslationPatch(e, n));
                }
            }),
            (a.prototype.applyTranslationPatch = function (e) {
                let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                var n = t ? this._translations : this._clone(this._translations);
                return (
                    e.forEach((e) => {
                        var t = n.find((t) => t.language === e.language);
                        let i = e.translations;
                        Object.keys(i).forEach((e) => {
                            Object.keys(i[e]).forEach((n) => {
                                t.translations[e][n] = i[e][n];
                            });
                        });
                        let a = e.translationsExtended;
                        (a &&
                            Object.keys(a).forEach((e) => {
                                if (0 === Object.keys(a[e]).length) delete t.translationsExtended[e];
                                else {
                                    (t.translationsExtended || (t.translationsExtended = {}),
                                        t.translationsExtended[e] || (t.translationsExtended[e] = {}),
                                        Object.keys(a[e]).forEach((n) => {
                                            t.translationsExtended[e][n] = a[e][n];
                                        }));
                                }
                            }),
                            t.translationsExtended && 0 === Object.keys(t.translationsExtended).length && delete t.translationsExtended);
                        var r = this._clone(e);
                        (delete r.translations, delete r.translationsExtended, (t = GObject.GUtil.extend(t, r)));
                    }),
                    Promise.resolve(n)
                );
            }),
            (a.prototype.export = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.FormatTypes.CSV,
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                switch (e) {
                    case a.FormatTypes.CSV:
                        return this._exportAsCSV({ language: t, onlyEmpty: n });
                }
            }),
            (a.prototype.getMetaData = function () {
                return Promise.resolve(JSON.stringify(this._translations, null, 4));
            }),
            (a.prototype._exportAsCSV = function (e) {
                let { language: t = null, onlyEmpty: n = false } = e;
                const o = function (e) {
                    return (e && e.replace(/\r?\n|\r/g, "")) || "";
                };
                var i = (null != t && !isNaN(t) && this._translations.filter((e) => e.keyValue === t)) || this._translations,
                    r = [];
                const s = this._translations.find((e) => e.isDefault);
                return (
                    i.forEach((e) => {
                        Object.keys(e.translations).forEach((t) => {
                            Object.keys(e.translations[t]).forEach((i) => {
                                var l;
                                (this.isConsideringExtension() &&
                                    (l = e.translationsExtended && e.translationsExtended[t] && e.translationsExtended[t][i]),
                                    (n && "" !== e.translations[t][i].trim()) ||
                                        r.push(
                                            [e.language, t, i, o(n ? s.translations[t][i] : e.translations[t][i]), o(l)].join(
                                                a._CSV_SEPARATOR
                                            )
                                        ));
                            });
                        });
                    }),
                    Promise.resolve(r.join("\r\n"))
                );
            }),
            (a.prototype._handleCSVImport = function (e) {
                var t = (e) => e.length >= 4,
                    n = [];
                return new Promise((i, r) => {
                    if (e) {
                        var s = e.split(/\r?\n/);
                        if (s.length < 1) return r("No rows were found!");
                        for (let e = 0; e < s.length; e++) {
                            var l = s[e],
                                c = l.split(a._CSV_SEPARATOR);
                            if (!t(c))
                                return r(
                                    "Invalid number of columns on row " +
                                        (e + 1) +
                                        (l.trim().length ? ", content '" + l.substr(0, 30) + "...'" : ", is empty")
                                );
                            var [d, u, p, g, h] = c;
                            if (!GObject.GLocaleLanguage.hasOwnProperty(d))
                                return r("Language not available ('".concat(d, "'), row ").concat(e + 1, "!"));
                            if (!this._classesMap.find((e) => e === u))
                                return r("Reference to UI not available ('".concat(u, "')!, row ").concat(e + 1));
                            var f = this._translations.find((e) => e.language === d.trim());
                            if (f) {
                                var m = n.find((e) => e.language === d);
                                (m || ((m = { language: d, translations: {} }), n.push(m)),
                                    f.translations[u] &&
                                        (m.translations[u] || (m.translations[u] = {}),
                                        f.translations[u].hasOwnProperty(p) &&
                                            ((m.translations[u][p] = g),
                                            h &&
                                                this.isConsideringExtension() &&
                                                (m.translationsExtended || (m.translationsExtended = {}),
                                                m.translationsExtended[u] || (m.translationsExtended[u] = {}),
                                                (m.translationsExtended[u][p] = h)))));
                            }
                        }
                        return i(n);
                    }
                });
            }),
            (a.prototype.getTranslationRealName = function (e) {
                var t = this._translations.find((t) => t.keyValue === e);
                return t ? t.realName : null;
            }),
            (a.prototype.createNewLanguage = async function (e, t, n) {
                return new Promise((o, i) => {
                    var a = this.getTranslationTemplate();
                    return (
                        (a.language = e),
                        (a.realName = t),
                        (a.abbreviation = n),
                        (a.keyValue = this._localeLanguage.hasOwnProperty(e)
                            ? this._localeLanguage[e]
                            : Math.max(...Object.values(this._localeLanguage)) + 1),
                        this._translations.push(a),
                        this._localeLanguage.hasOwnProperty(e) || (this._localeLanguage[e] = a.keyValue),
                        o(a)
                    );
                });
            }),
            (a.prototype.getTranslationTemplate = function () {
                var e = this.getTranslationCopy(this._localeLanguage.Default);
                return (
                    (e.keyValue = null),
                    (e.language = null),
                    (e.isDefault = false),
                    (e.isAvailable = true),
                    (e.abbreviation = null),
                    Object.keys(e.translations).forEach((t) => {
                        Object.keys(e.translations[t]).forEach((n) => {
                            e.translations[t][n] = "";
                        });
                    }),
                    e.translationsExtended &&
                        Object.keys(e.translationsExtended).forEach((t) => {
                            Object.keys(e.translationsExtended[t]).forEach((n) => {
                                e.translationsExtended[t][n] = "";
                            });
                        }),
                    e
                );
            }),
            (a.prototype.isConsideringExtension = function () {
                return !!TRANSLATION_MANAGER.CONSIDER_EXTENSION;
            }),
            (module.exports = a));
    };
