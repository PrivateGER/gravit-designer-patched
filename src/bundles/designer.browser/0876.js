module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41), require(32), require(38), require(33));
        var GObject = require(1),
            GPlatform = require(15);
        const GCategory = require(18),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "edit.paste.replace"),
            (s.TITLE = new GObject.GLocaleKey("GPasteAndReplaceAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-paste-and-replace" : null;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_PASTE;
            }),
            (s.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.COMMAND, "V"];
            }),
            (s.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                const e = gDesigner.getActiveDocument(),
                    t = e && e.getEditor(),
                    n = t && t.getSelection();
                if (n && n.length > 0) {
                    if (document.queryCommandSupported("paste")) return true;
                    const e = gDesigner.getClipboardMimeTypes();
                    if (e && e.indexOf(GObject.GNode.MIME_TYPE) >= 0) return true;
                }
                return false;
            }),
            (s.prototype.execute = function () {
                (gDesigner.getPaste().assignCallback(this._paste.bind(this)),
                    (!gDesigner.isTouchDevice() && document.execCommand("paste")) ||
                        (gDesigner.getPaste().assignCallback(null),
                        this._paste(GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)))));
            }),
            (s.prototype._paste = function (e) {
                if (e && e.length > 0) {
                    const t = gDesigner.getActiveDocument();
                    if (!t) return;
                    const n = t && t.getEditor();
                    if (!n || !n.hasSelection()) return;
                    const i = t.filterUnrestrictedCommercialFileElements(e.filter((e) => e instanceof GObject.GElement));
                    if (i.length > 0) {
                        n.beginTransaction();
                        try {
                            let e = [];
                            const t = n.getSelection().slice();
                            (this._fixTexts(i),
                                t.forEach((t) => {
                                    const n = this._replace(t, i);
                                    n && n.length > 0 && (e = e.concat(n));
                                }),
                                n.insertElements(e, true, true, false, true));
                        } finally {
                            n.commitTransaction(GObject.GLocale.get(this.getTitle()));
                        }
                    }
                }
            }),
            (s.prototype._fixTexts = function (e) {
                const t = gDesigner.getActiveDocument(),
                    n = t && t.getEditor();
                n &&
                    e.forEach((e) => {
                        e.accept((t) => {
                            if (t instanceof GObject.GText) return (n.insertElements([e], true, true, false), e.getParent().removeChild(e), false);
                        });
                    });
            }),
            (s.prototype._replace = function (e, t) {
                const n = this._getBoundingBox(t);
                if (!n) return;
                const i = e.getGeometryBBox(),
                    a = new GObject.GTransform(1, 0, 0, 1, i.getX() - n.getX(), i.getY() - n.getY()),
                    r = this._clone(t);
                return (
                    r.forEach((e) => {
                        e.hasMixin(GObject.GElement.Transform) && e.transform(a, true);
                    }),
                    e.getParent().removeChild(e),
                    r
                );
            }),
            (s.prototype._clone = function (e) {
                return e.map((e) => e.clone());
            }),
            (s.prototype._getBoundingBox = function (e) {
                let t;
                return (
                    e.forEach((e) => {
                        const n = e.getGeometryBBox();
                        n && !n.isEmpty() && (t = t ? t.united(n) : n);
                    }),
                    t
                );
            }),
            (s.prototype.toString = function () {
                return "[Object GPasteAndReplaceAction]";
            }),
            (module.exports = s));
    };
