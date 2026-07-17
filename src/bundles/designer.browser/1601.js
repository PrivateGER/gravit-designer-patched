module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31);
        function s() {}
        (GObject.GObject.inherit(s, GAction),
            (s.ID = "file.new"),
            (s.TITLE = new GObject.GLocaleKey("GNewAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.isEnabled = function () {
                return gDesigner.getApplicationManager().isCreatingNewDocumentEnabled();
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
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, "N"];
            }),
            (s.prototype.getAdditionalShortcuts = function () {
                return [[GPlatform.GKey.Constant.META, "N"]];
            }),
            (s.prototype.execute = function () {
                (gContainer.newDocumentActionPerformed(),
                    gDesigner.openNewDocumentDialog({
                        closable: true,
                        showCloudOptions: true,
                        defaultOption: "start-option",
                        newOrFromTemplate: true,
                    }));
            }),
            (s.prototype.toString = function () {
                return "[Object GNewAction]";
            }),
            (module.exports = s));
    };
