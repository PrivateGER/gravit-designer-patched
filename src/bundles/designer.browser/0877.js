module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        require(53);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31);
        require(44 /* GSystemDialog */);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "paste.paste"),
            (s.TITLE = new GObject.GLocaleKey("GPasteAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getIcon = function () {
                return "gravit-icon-paste";
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_PASTE;
            }),
            (s.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, "V"];
            }),
            (s.prototype.isEnabled = function () {
                return !!gDesigner.getActiveDocument();
            }),
            (s.prototype.executeFromShortcut = function () {
                var e = gDesigner.getPaste(),
                    t = null;
                return (
                    e && (e.assignCallback(null), (t = e.getArea())),
                    (document.activeElement &&
                        $(document.activeElement).is(":editable") &&
                        !gDesigner.isGravitIME(document.activeElement)) ||
                        (t && (e.setAllowFocus(true), t.focus())),
                    false
                );
            }),
            (s.prototype.execute = function () {
                gDesigner
                    .getPaste()
                    .pasteFromClipboard()
                    .catch((e) => {
                        this._pasteFromInternalClipboard();
                    });
            }),
            (s.prototype._pasteFromInternalClipboard = function () {
                gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE) &&
                    (gDesigner.getPaste().assignCallback(null),
                    gDesigner.getPaste().handlePasteData({
                        [GObject.GNode.MIME_TYPE]: gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE),
                    }));
            }),
            (s.prototype.toString = function () {
                return "[Object GPasteAction]";
            }),
            (module.exports = s));
    };
