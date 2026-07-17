module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GAction = require(31),
            GCategory = require(18);
        function r() {}
        (GObject.GObject.inherit(r, GAction),
            (r.ID = "open-welcome-screen"),
            (r.TITLE = new GObject.GLocaleKey("GOpenWelcomeScreenAction", "title")),
            (r.prototype.getId = function () {
                return r.ID;
            }),
            (r.prototype.getTitle = function () {
                return r.TITLE;
            }),
            (r.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP;
            }),
            (r.prototype.getGroup = function () {
                return "help";
            }),
            (r.prototype.isEnabled = function () {
                return (
                    (!gDesigner._newDocumentDialog || !gDesigner._newDocumentDialog.isOpen()) &&
                    gDesigner.getApplicationManager().isCreatingNewDocumentEnabled() &&
                    gDesigner.getLicense().canAccessFreemium()
                );
            }),
            (r.prototype.execute = function () {
                gDesigner.openNewDocumentDialog({ closable: true, showCloudOptions: true });
            }),
            (r.prototype.toString = function () {
                return "[Object GOpenWelcomeScreenAction]";
            }),
            (module.exports = r));
    };
