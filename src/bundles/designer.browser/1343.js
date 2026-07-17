module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(96 /* polyfill:JSON */), require(8 /* Symbol */), require(20 /* polyfill:RegExp */), require(34), require(247), require(91 /* polyfill:String */), require(4), require(41), require(13), require(32), require(38), require(33), require(26));
        var GObject = require(1);
        const { TRANSLATION_MANAGER } = require(10 /* designerConfig */);
        function GTranslationManager() {}
        (GObject.GObject.inherit(GTranslationManager, GObject.GObject),
            (GTranslationManager.prototype._translationBase = null),
            (GTranslationManager.prototype.getProjectsDescription = function () {
                return this._translationBase.getMapped().map((translation) => translation.project);
            }),
            (GTranslationManager.prototype.loadProjectTranslations = function (project) {
                if (!GObject.GTranslation.Projects.hasOwnProperty(project)) throw Error("Can't load translations, invalid project!");
                ((this._project = project),
                    (this._translations = this._translationBase.getByProject(project)),
                    (this._classesMap = Object.keys(
                        this._translations.find((translation) => translation.keyValue === GObject.GLocaleLanguage.English).translations
                    )));
            }),
            (GTranslationManager.prototype.getActiveProject = function () {
                return this._project;
            }),
            (GTranslationManager.prototype._translations = null),
            (GTranslationManager.prototype._project = null),
            (GTranslationManager._CSV_SEPARATOR = "|||"),
            (GTranslationManager.prototype.init = function () {
                return (
                    (this._translationBase = new GObject.GTranslation()),
                    this.loadProjectTranslations(GObject.GTranslation.Projects.Designer),
                    (this._localeLanguage = GObject.GLocaleLanguage),
                    this.isConsideringExtension() && GObject.GLocale.enableExtension(),
                    Promise.resolve()
                );
            }),
            (GTranslationManager.prototype.getTranslationByKey = function (key) {
                return this._translations.find((translation) => translation.keyValue === key);
            }),
            (GTranslationManager.prototype._clone = function (value) {
                return JSON.parse(JSON.stringify(value));
            }),
            (GTranslationManager.prototype.getTranslationCopy = function (key) {
                return this._clone(this.getTranslationByKey(key));
            }),
            (GTranslationManager.FormatTypes = { CSV: "CSV" }),
            (GTranslationManager.prototype.import = function (data) {
                let format = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : GTranslationManager.FormatTypes.CSV,
                    merge = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                switch (format) {
                    case GTranslationManager.FormatTypes.CSV:
                        return this._handleCSVImport(data).then((patch) => this.applyTranslationPatch(patch, merge));
                }
            }),
            (GTranslationManager.prototype.applyTranslationPatch = function (patch) {
                let merge = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                var target = merge ? this._translations : this._clone(this._translations);
                return (
                    patch.forEach((translation) => {
                        var existing = target.find((existing) => existing.language === translation.language);
                        let translations = translation.translations;
                        Object.keys(translations).forEach((uiClass) => {
                            Object.keys(translations[uiClass]).forEach((field) => {
                                existing.translations[uiClass][field] = translations[uiClass][field];
                            });
                        });
                        let extended = translation.translationsExtended;
                        (extended &&
                            Object.keys(extended).forEach((uiClass) => {
                                if (0 === Object.keys(extended[uiClass]).length) delete existing.translationsExtended[uiClass];
                                else {
                                    (existing.translationsExtended || (existing.translationsExtended = {}),
                                        existing.translationsExtended[uiClass] || (existing.translationsExtended[uiClass] = {}),
                                        Object.keys(extended[uiClass]).forEach((field) => {
                                            existing.translationsExtended[uiClass][field] = extended[uiClass][field];
                                        }));
                                }
                            }),
                            existing.translationsExtended && 0 === Object.keys(existing.translationsExtended).length && delete existing.translationsExtended);
                        var rest = this._clone(translation);
                        (delete rest.translations, delete rest.translationsExtended, (existing = GObject.GUtil.extend(existing, rest)));
                    }),
                    Promise.resolve(target)
                );
            }),
            (GTranslationManager.prototype.export = function () {
                let format = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : GTranslationManager.FormatTypes.CSV,
                    language = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    onlyEmpty = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                switch (format) {
                    case GTranslationManager.FormatTypes.CSV:
                        return this._exportAsCSV({ language: language, onlyEmpty: onlyEmpty });
                }
            }),
            (GTranslationManager.prototype.getMetaData = function () {
                return Promise.resolve(JSON.stringify(this._translations, null, 4));
            }),
            (GTranslationManager.prototype._exportAsCSV = function (options) {
                let { language: language = null, onlyEmpty: onlyEmpty = false } = options;
                const sanitize = function (value) {
                    return (value && value.replace(/\r?\n|\r/g, "")) || "";
                };
                var translations = (null != language && !isNaN(language) && this._translations.filter((translation) => translation.keyValue === language)) || this._translations,
                    rows = [];
                const defaultTranslation = this._translations.find((translation) => translation.isDefault);
                return (
                    translations.forEach((translation) => {
                        Object.keys(translation.translations).forEach((uiClass) => {
                            Object.keys(translation.translations[uiClass]).forEach((field) => {
                                var extendedValue;
                                (this.isConsideringExtension() &&
                                    (extendedValue = translation.translationsExtended && translation.translationsExtended[uiClass] && translation.translationsExtended[uiClass][field]),
                                    (onlyEmpty && "" !== translation.translations[uiClass][field].trim()) ||
                                        rows.push(
                                            [translation.language, uiClass, field, sanitize(onlyEmpty ? defaultTranslation.translations[uiClass][field] : translation.translations[uiClass][field]), sanitize(extendedValue)].join(
                                                GTranslationManager._CSV_SEPARATOR
                                            )
                                        ));
                            });
                        });
                    }),
                    Promise.resolve(rows.join("\r\n"))
                );
            }),
            (GTranslationManager.prototype._handleCSVImport = function (csvText) {
                var isValidRow = (columns) => columns.length >= 4,
                    result = [];
                return new Promise((resolve, reject) => {
                    if (csvText) {
                        var lines = csvText.split(/\r?\n/);
                        if (lines.length < 1) return reject("No rows were found!");
                        for (let e = 0; e < lines.length; e++) {
                            var l = lines[e],
                                c = l.split(GTranslationManager._CSV_SEPARATOR);
                            if (!isValidRow(c))
                                return reject(
                                    "Invalid number of columns on row " +
                                        (e + 1) +
                                        (l.trim().length ? ", content '" + l.substr(0, 30) + "...'" : ", is empty")
                                );
                            var [d, u, p, g, h] = c;
                            if (!GObject.GLocaleLanguage.hasOwnProperty(d))
                                return reject("Language not available ('".concat(d, "'), row ").concat(e + 1, "!"));
                            if (!this._classesMap.find((uiClass) => uiClass === u))
                                return reject("Reference to UI not available ('".concat(u, "')!, row ").concat(e + 1));
                            var f = this._translations.find((item) => item.language === d.trim());
                            if (f) {
                                var m = result.find((item) => item.language === d);
                                (m || ((m = { language: d, translations: {} }), result.push(m)),
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
                        return resolve(result);
                    }
                });
            }),
            (GTranslationManager.prototype.getTranslationRealName = function (key) {
                var translation = this._translations.find((translation) => translation.keyValue === key);
                return translation ? translation.realName : null;
            }),
            (GTranslationManager.prototype.createNewLanguage = async function (language, realName, abbreviation) {
                return new Promise((resolve, reject) => {
                    var template = this.getTranslationTemplate();
                    return (
                        (template.language = language),
                        (template.realName = realName),
                        (template.abbreviation = abbreviation),
                        (template.keyValue = this._localeLanguage.hasOwnProperty(language)
                            ? this._localeLanguage[language]
                            : Math.max(...Object.values(this._localeLanguage)) + 1),
                        this._translations.push(template),
                        this._localeLanguage.hasOwnProperty(language) || (this._localeLanguage[language] = template.keyValue),
                        resolve(template)
                    );
                });
            }),
            (GTranslationManager.prototype.getTranslationTemplate = function () {
                var template = this.getTranslationCopy(this._localeLanguage.Default);
                return (
                    (template.keyValue = null),
                    (template.language = null),
                    (template.isDefault = false),
                    (template.isAvailable = true),
                    (template.abbreviation = null),
                    Object.keys(template.translations).forEach((uiClass) => {
                        Object.keys(template.translations[uiClass]).forEach((field) => {
                            template.translations[uiClass][field] = "";
                        });
                    }),
                    template.translationsExtended &&
                        Object.keys(template.translationsExtended).forEach((uiClass) => {
                            Object.keys(template.translationsExtended[uiClass]).forEach((field) => {
                                template.translationsExtended[uiClass][field] = "";
                            });
                        }),
                    template
                );
            }),
            (GTranslationManager.prototype.isConsideringExtension = function () {
                return !!TRANSLATION_MANAGER.CONSIDER_EXTENSION;
            }),
            (module.exports = GTranslationManager));
    };
