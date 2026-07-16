module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(4), require(32), require(33), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            a = (require(53), require(18 /* GCategory */)),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "edit.paste.inside"),
            (s.TITLE = new GObject.GLocaleKey("GPasteInsideAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return a.CATEGORY_EDIT_PASTE;
            }),
            (s.prototype.getGroup = function () {
                return "ccp/paste";
            }),
            (s.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-paste-inside" : null;
            }),
            (s.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.OPTION, GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "V"];
            }),
            (s.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getSelection();
                    if (t) {
                        if (document.queryCommandSupported("paste")) return true;
                        var n = gDesigner.getClipboardMimeTypes();
                        if (n && n.indexOf(GObject.GNode.MIME_TYPE) >= 0)
                            for (var i = 0; i < t.length; ++i) if (t[i].hasMixin(GObject.GNode.Container)) return true;
                    }
                }
                return false;
            }),
            (s.prototype.execute = function () {
                (gDesigner.getPaste().assignCallback(this._paste.bind(this)),
                    (!gDesigner.isTouchDevice() && document.execCommand("paste")) ||
                        (gDesigner.getPaste().assignCallback(null),
                        this._paste(GObject.GNode.deserialize(gDesigner.getClipboardContent(GObject.GNode.MIME_TYPE)))));
            }),
            (s.prototype._paste = function (e, t) {
                if (e && e.length > 0) {
                    for (var n = [], i = 0; i < e.length; ++i) e[i] instanceof GObject.GElement && n.push(e[i]);
                    if ((n = gDesigner.getActiveDocument().filterUnrestrictedCommercialFileElements(n)).length > 0) {
                        var a = gDesigner.getActiveDocument().getEditor(),
                            r = [...a.getSelection()];
                        (n.forEach((e) => {
                            e instanceof GObject.GText &&
                                !e.getProperty("content") &&
                                (a.insertElements([e], false, true, true), e.getParent().removeChild(e));
                        }),
                            a.beginTransaction());
                        try {
                            for (i = 0; i < r.length; ++i) {
                                var s = r[i];
                                if (s.hasMixin(GObject.GNode.Container) && !s.isLocked()) {
                                    for (var l = [], c = 0; c < n.length; ++c) n[c].validateInsertion(s) && l.push(n[c].clone());
                                    a.insertElements(l, !t, true, false, true, s);
                                    var d = s instanceof GObject.GElement ? s.getGeometryBBox() : null;
                                    if (d) {
                                        var u = d.getX(),
                                            p = d.getY(),
                                            g = null;
                                        l.forEach((e) => {
                                            var t = e.getGeometryBBox();
                                            t && (g = g ? g.united(t) : t);
                                        });
                                        var h = g ? g.getX() : null,
                                            f = g ? g.getY() : null,
                                            m = null;
                                        if (
                                            (null === u ||
                                                null === h ||
                                                (GObject.GMath.isEqualEps(u, h) && GObject.GMath.isEqualEps(p, f)) ||
                                                (m = new GObject.GTransform(1, 0, 0, 1, u - h, p - f)),
                                            m)
                                        )
                                            for (c = 0; c < l.length; ++c) {
                                                var y = l[c];
                                                y.hasMixin(GObject.GElement.Transform) && y.transform(m, true);
                                            }
                                    }
                                }
                            }
                        } finally {
                            a.commitTransaction(GObject.GLocale.get(this.getTitle()));
                        }
                    }
                }
            }),
            (s.prototype.toString = function () {
                return "[Object GPasteInsideAction]";
            }),
            (module.exports = s));
    };
