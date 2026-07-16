module.exports = function (module, exports, require) {
        "use strict";
        var o = require(16);
        require(3);
        var GObject = require(1),
            a = o(require(443)),
            designerConfig = require(10),
            GCategory = require(18),
            l = require(31),
            c = require(219),
            d = require(85),
            GCommonNames = require(119);
        const GSystemDialog = require(44),
            { isExecutingOnMSTeamsSync: g } = a.default;
        function h(e, t) {
            ((this._locale = e), (this._title = h.Translations[e] || t));
        }
        ((h.Translations = ["English", "Deutsch", "中文", "Português", "Español", "Français"]),
            GObject.GObject.inherit(h, l),
            (h.ID = "language"),
            (h.prototype._locale = null),
            (h.prototype._title = null),
            (h.prototype.getId = function () {
                return h.ID + "." + this._locale;
            }),
            (h.prototype.isCheckable = function () {
                return true;
            }),
            (h.prototype.isChecked = function () {
                return GObject.GLocale.getLanguage() === this._locale;
            }),
            (h.prototype.getTitle = function () {
                return this._title;
            }),
            (h.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP_LANGUAGE;
            }),
            (h.prototype.getGroup = function () {
                return "help/language";
            }),
            (h.prototype.isEnabled = function () {
                return true;
            }),
            (h.prototype.isVisible = function () {
                return !g();
            }),
            (h.prototype.execute = function () {
                if (GObject.GLocale.getLanguage() !== this._locale) {
                    let e = () => gDesigner.setSetting("language", this._locale),
                        t = () =>
                            designerConfig.gApi
                                .updateUser({ locale: GObject.GLocale.lookupLocale(this._locale) })
                                .then(() => e())
                                .then(() => this._reloadApp())
                                .catch((e) => GSystemDialog.alert(designerConfig.gApi.formatError(e)));
                    gDesigner.getUser().then((n) => {
                        n
                            ? gDesigner.isAnonymous()
                                ? (e(), this._reloadApp())
                                : t()
                            : GCommonNames.performLogin().then((e) => {
                                  e && t();
                              });
                    });
                }
            }),
            (h.prototype._reloadApp = function () {
                gContainer.getRuntime() === d.Runtime.Browser || gContainer.getRuntime() === d.Runtime.PWA
                    ? location.reload()
                    : new c(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.restart-app"))).open();
            }),
            (h.prototype.toString = function () {
                return "[Object GSwitchLanguageAction]";
            }),
            (module.exports = h));
    };
