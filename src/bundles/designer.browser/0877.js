module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        require(53);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            GAction = require(31);
        require(44 /* GSystemDialog */);
        function GPasteAction() {}
        (GObject.GObject.inherit(GPasteAction, GAction),
            (GPasteAction.ID = "paste.paste"),
            (GPasteAction.TITLE = new GObject.GLocaleKey("GPasteAction", "title")),
            (GPasteAction.prototype.getId = function () {
                return GPasteAction.ID;
            }),
            (GPasteAction.prototype.getTitle = function () {
                return GPasteAction.TITLE;
            }),
            (GPasteAction.prototype.getIcon = function () {
                return "gravit-icon-paste";
            }),
            (GPasteAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_PASTE;
            }),
            (GPasteAction.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (GPasteAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "V"];
            }),
            (GPasteAction.prototype.isEnabled = function () {
                return !!gDesigner.getActiveDocument();
            }),
            (GPasteAction.prototype.executeFromShortcut = function () {
                var pasteObject = gDesigner.getPaste(),
                    area = null;
                return (
                    pasteObject && (pasteObject.assignCallback(null), (area = pasteObject.getArea())),
                    (document.activeElement &&
                        $(document.activeElement).is(":editable") &&
                        !gDesigner.isGravitIME(document.activeElement)) ||
                        (area && (pasteObject.setAllowFocus(true), area.focus())),
                    false
                );
            }),
            (GPasteAction.prototype.execute = function () {
                gDesigner
                    .getPaste()
                    .pasteFromClipboard()
                    .catch((error) => {
                        this._pasteFromInternalClipboard();
                    });
            }),
            (GPasteAction.prototype._pasteFromInternalClipboard = function () {
                gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE) &&
                    (gDesigner.getPaste().assignCallback(null),
                    gDesigner.getPaste().handlePasteData({
                        [GObject.GNode.MIME_TYPE]: gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE),
                    }));
            }),
            (GPasteAction.prototype.toString = function () {
                return "[Object GPasteAction]";
            }),
            (module.exports = GPasteAction));
    };
