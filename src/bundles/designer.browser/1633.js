module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1);
        const i = require(31),
            GCategory = require(18),
            GOfflineDialog = require(256);
        function s() {}
        (GObject.GObject.inherit(s, i),
            (s.ID = "example-files"),
            (s.TITLE = new GObject.GLocaleKey("GExampleFilesAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_HELP_LEARN;
            }),
            (s.prototype.getGroup = function () {
                return "help/learn";
            }),
            (s.prototype.execute = function () {
                const e = {
                        closable: true,
                        showCloudOptions: true,
                        openFromCloud: true,
                        nativeCloud: true,
                        showExampleFiles: true,
                    },
                    t = () => gDesigner.openNewDocumentDialog(e);
                gDesigner.isOffline() ? GOfflineDialog.openUnavailableFeature(t) : t();
            }),
            (s.prototype.toString = function () {
                return "[GObject GExampleFilesAction]";
            }),
            (module.exports = s));
    };
