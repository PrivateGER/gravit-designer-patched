module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31),
            GDocument = require(163);
        const GLoginPanel = require(446);
        function c() {}
        (GObject.GObject.inherit(c, r),
            (c.ID = "file.open"),
            (c.TITLE = new GObject.GLocaleKey("GOpenAction", "title")),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return c.TITLE;
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_FILE;
            }),
            (c.prototype.getGroup = function () {
                return "file-open";
            }),
            (c.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "O"];
            }),
            (c.prototype.isEnabled = function (e) {
                return (
                    (e = e || gDesigner.getDefaultStorage()).canPromptOpen() &&
                    gDesigner.getApplicationManager().isOpenFilesFromLocalEnabled()
                );
            }),
            (c.prototype.isAvailable = function () {
                return GPlatform.GPlatform.webBrowser !== GPlatform.GPlatform.constructor.WebBrowser.Safari;
            }),
            (c.prototype.execute = function (e, t) {
                new GLoginPanel(
                    () => {
                        (e = e || gDesigner.getDefaultStorage()).openPrompt(
                            GDocument.FileTypes.filter((e) => e.load),
                            (e) => {
                                (gDesigner.openDocument(e), t && t());
                            },
                            false
                        );
                    },
                    () => {
                        gDesigner.stats("action-cancelled_anonymous", this.getId());
                    }
                );
            }),
            (c.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-touch-file-open" : "";
            }),
            (c.prototype.toString = function () {
                return "[Object GOpenAction]";
            }),
            (module.exports = c));
    };
