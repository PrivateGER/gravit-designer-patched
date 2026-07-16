module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GCategory = require(18),
            a = require(31),
            GCommonNames = require(119);
        function s() {}
        (GObject.GObject.inherit(s, a),
            (s.ID = "file.open-from-template"),
            (s.TITLE = new GObject.GLocaleKey("GNewFromTemplateAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (s.prototype.getGroup = function () {
                return "document";
            }),
            (s.prototype.isEnabled = function () {
                return GCommonNames.isOnline() && !gDesigner.isOffline(6e5) && gDesigner.getApplicationManager().isCreatingNewDocumentEnabled();
            }),
            // The template listing/content API was never archived (see README
            // "Known-dead features"), so hide this action from the File menu.
            (s.prototype.isAvailable = function () {
                return false;
            }),
            (s.prototype.execute = function () {
                (gContainer.newDocumentActionPerformed(),
                    gDesigner.openNewDocumentDialog({
                        closable: true,
                        showCloudOptions: true,
                        defaultOption: "templates-option",
                        newOrFromTemplate: true,
                    }));
            }),
            (s.prototype.toString = function () {
                return "[Object GNewFromTemplateAction]";
            }),
            (module.exports = s));
    };
