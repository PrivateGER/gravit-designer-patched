module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31),
            GDocument = require(163);
        const GLoginPanel = require(446);
        function GOpenAction() {}
        (GObject.GObject.inherit(GOpenAction, GAction),
            (GOpenAction.ID = "file.open"),
            (GOpenAction.TITLE = new GObject.GLocaleKey("GOpenAction", "title")),
            (GOpenAction.prototype.getId = function () {
                return GOpenAction.ID;
            }),
            (GOpenAction.prototype.getTitle = function () {
                return GOpenAction.TITLE;
            }),
            (GOpenAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (GOpenAction.prototype.getGroup = function () {
                return "file-open";
            }),
            (GOpenAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "O"];
            }),
            (GOpenAction.prototype.isEnabled = function (storage) {
                return (
                    (storage = storage || gDesigner.getDefaultStorage()).canPromptOpen() &&
                    gDesigner.getApplicationManager().isOpenFilesFromLocalEnabled()
                );
            }),
            (GOpenAction.prototype.isAvailable = function () {
                return GPlatform.GPlatform.webBrowser !== GPlatform.GPlatform.constructor.WebBrowser.Safari;
            }),
            (GOpenAction.prototype.execute = function (storage, callback) {
                new GLoginPanel(
                    () => {
                        (storage = storage || gDesigner.getDefaultStorage()).openPrompt(
                            GDocument.FileTypes.filter((fileType) => fileType.load),
                            (file) => {
                                (gDesigner.openDocument(file), callback && callback());
                            },
                            true
                        );
                    },
                    () => {
                        gDesigner.stats("action-cancelled_anonymous", this.getId());
                    }
                );
            }),
            (GOpenAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-touch-file-open" : "";
            }),
            (GOpenAction.prototype.toString = function () {
                return "[Object GOpenAction]";
            }),
            (module.exports = GOpenAction));
    };
