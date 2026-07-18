module.exports = function (module, exports, require) {
        "use strict";
        var _interopRequireDefault = require(16);
        require(3);
        var GObject = require(1),
            msTeamsService = _interopRequireDefault(require(443)),
            designerConfig = require(10),
            GCategory = require(18),
            GAction = require(31),
            GMessageDialog = require(219),
            GContainer = require(85),
            GCommonNames = require(119);
        const GSystemDialog = require(44),
            { isExecutingOnMSTeamsSync } = msTeamsService.default;
        function GSwitchLanguageAction(locale, title) {
            ((this._locale = locale), (this._title = GSwitchLanguageAction.Translations[locale] || title));
        }
        ((GSwitchLanguageAction.Translations = ["English", "Deutsch", "中文", "Português", "Español", "Français"]),
            GObject.GObject.inherit(GSwitchLanguageAction, GAction),
            (GSwitchLanguageAction.ID = "language"),
            (GSwitchLanguageAction.prototype._locale = null),
            (GSwitchLanguageAction.prototype._title = null),
            (GSwitchLanguageAction.prototype.getId = function () {
                return GSwitchLanguageAction.ID + "." + this._locale;
            }),
            (GSwitchLanguageAction.prototype.isCheckable = function () {
                return true;
            }),
            (GSwitchLanguageAction.prototype.isChecked = function () {
                return GObject.GLocale.getLanguage() === this._locale;
            }),
            (GSwitchLanguageAction.prototype.getTitle = function () {
                return this._title;
            }),
            (GSwitchLanguageAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP_LANGUAGE;
            }),
            (GSwitchLanguageAction.prototype.getGroup = function () {
                return "help/language";
            }),
            (GSwitchLanguageAction.prototype.isEnabled = function () {
                return true;
            }),
            // The translation packs were served by the dead i18n CDN, so every
            // language except bundled English silently falls back to English
            // while the menu claims the switch worked. Hide the submenu.
            (GSwitchLanguageAction.prototype.isAvailable = function () {
                return false;
            }),
            (GSwitchLanguageAction.prototype.isVisible = function () {
                return false;
            }),
            (GSwitchLanguageAction.prototype.execute = function () {
                if (GObject.GLocale.getLanguage() !== this._locale) {
                    let setLocalLanguage = () => gDesigner.setSetting("language", this._locale),
                        updateRemoteLanguage = () =>
                            designerConfig.gApi
                                .updateUser({ locale: GObject.GLocale.lookupLocale(this._locale) })
                                .then(() => setLocalLanguage())
                                .then(() => this._reloadApp())
                                .catch((error) => GSystemDialog.alert(designerConfig.gApi.formatError(error)));
                    gDesigner.getUser().then((user) => {
                        user
                            ? gDesigner.isAnonymous()
                                ? (setLocalLanguage(), this._reloadApp())
                                : updateRemoteLanguage()
                            : GCommonNames.performLogin().then((loggedIn) => {
                                  loggedIn && updateRemoteLanguage();
                              });
                    });
                }
            }),
            (GSwitchLanguageAction.prototype._reloadApp = function () {
                gContainer.getRuntime() === GContainer.Runtime.Browser || gContainer.getRuntime() === GContainer.Runtime.PWA
                    ? location.reload()
                    : new GMessageDialog(GObject.GLocale.get(new GObject.GLocaleKey("GNewDocumentDialog", "text.restart-app"))).open();
            }),
            (GSwitchLanguageAction.prototype.toString = function () {
                return "[Object GSwitchLanguageAction]";
            }),
            (module.exports = GSwitchLanguageAction));
    };
