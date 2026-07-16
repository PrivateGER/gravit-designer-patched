module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "edit.paste.style"),
            (s.TITLE = new GObject.GLocaleKey("GPasteStyleAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_PASTE;
            }),
            (s.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (s.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-paste-style" : null;
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.F4];
            }),
            (s.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getClipboardMimeTypes();
                if (e && e.indexOf(GObject.GNode.MIME_TYPE) >= 0) {
                    var t = gDesigner.getActiveDocument();
                    if (t) {
                        var n = t.getEditor().getIndividualSelection();
                        if (n) for (var i = 0; i < n.length; ++i) if (n[i].hasMixin(GObject.GStylable)) return true;
                    }
                }
                return false;
            }),
            (s.prototype.execute = function () {
                var e = GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE));
                if ((e = gDesigner.getActiveDocument().filterUnrestrictedCommercialFileElements(e)) && e.length > 0) {
                    for (var t = null, n = 0; n < e.length; ++n)
                        if (e[n].hasMixin(GObject.GStylable)) {
                            t = e[n];
                            break;
                        }
                    if (!t) return;
                    var i = gDesigner.getActiveDocument().getEditor(),
                        a = i.getIndividualSelection();
                    (t instanceof GObject.GText && gDesigner.getActiveDocument().getScene().getActivePage().appendChild(t), i.beginTransaction());
                    try {
                        for (n = 0; n < a.length; ++n) {
                            var r = a[n];
                            r.hasMixin(GObject.GStylable) && r.assignStyleFrom(t);
                        }
                    } finally {
                        (i.commitTransaction(GObject.GLocale.get(this.getTitle())),
                            t instanceof GObject.GText && gDesigner.getActiveDocument().getScene().getActivePage().removeChild(t));
                    }
                }
            }),
            (s.prototype.toString = function () {
                return "[Object GPasteStyleAction]";
            }),
            (module.exports = s));
    };
