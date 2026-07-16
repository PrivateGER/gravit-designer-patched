module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(32), require(33));
        var GObject = require(1),
            GPlatform = require(15),
            GCategory = require(18),
            r = require(31),
            s = require(106);
        function l() {}
        (GObject.GObject.inherit(l, r),
            (l.ID = "edit.paste.in-place"),
            (l.TITLE = new GObject.GLocaleKey("GPasteInPlaceAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_EDIT_PASTE;
            }),
            (l.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (l.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "V"];
            }),
            (l.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e && e.getEditor().getSelection()) {
                    if (document.queryCommandSupported("paste")) return true;
                    var t = gDesigner.getClipboardMimeTypes();
                    if (t && t.indexOf(GObject.GNode.MIME_TYPE) >= 0) return !!gDesigner.getActiveDocument();
                }
                return false;
            }),
            (l.prototype.execute = function () {
                (gDesigner.getPaste().assignCallback(this._paste.bind(this)),
                    (!gDesigner.isTouchDevice() && document.execCommand("paste")) ||
                        (gDesigner.getPaste().assignCallback(null),
                        this._paste(GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)))));
            }),
            (l.prototype._paste = function (e, t) {
                if (e && e.length > 0) {
                    for (var n = [], i = 0; i < e.length; ++i) e[i] instanceof GObject.GElement && n.push(e[i]);
                    if ((n = gDesigner.getActiveDocument().filterUnrestrictedCommercialFileElements(n)).length > 0) {
                        var a = gDesigner.getActiveDocument().getEditor();
                        n.forEach((e) => {
                            e instanceof GObject.GText &&
                                !e.getProperty("content") &&
                                (a.insertElements([e], false, true, true), e.getParent().removeChild(e));
                        });
                        var r = null,
                            s = null,
                            l = a.getSelectionBBox(true);
                        (l && ((r = l.getX()), (s = l.getY())), a.beginTransaction());
                        try {
                            a.insertElements(n, !t, true, true, true);
                            var c = null;
                            n.forEach((e) => {
                                var t = e.getGeometryBBox();
                                t && (c = c ? c.united(t) : t);
                            });
                            var d = c ? c.getX() : null,
                                u = c ? c.getY() : null,
                                p = null;
                            if (
                                (null === r ||
                                    null === d ||
                                    (GObject.GMath.isEqualEps(r, d) && GObject.GMath.isEqualEps(s, u)) ||
                                    (p = new GObject.GTransform(1, 0, 0, 1, r - d, s - u)),
                                p)
                            )
                                for (i = 0; i < n.length; ++i) {
                                    var g = n[i];
                                    g.hasMixin(GObject.GElement.Transform) && g.transform(p, true);
                                }
                        } finally {
                            a.commitTransaction(GObject.GLocale.get(this.getTitle()));
                        }
                    }
                }
            }),
            (l.prototype.toString = function () {
                return "[Object GPasteInPlaceAction]";
            }),
            (module.exports = l));
    };
