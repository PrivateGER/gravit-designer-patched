module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            GSaveAction = require(40),
            GCategory = require(18),
            s = require(106);
        require(811 /* GGroupAction */);
        function l() {}
        (GObject.GObject.inherit(l, s),
            (l.USE_DPI = true),
            (l.ID = "modify.path2bmp"),
            (l.TITLE = new GObject.GLocaleKey("GConvertToImageAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-flatten" : "";
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (l.prototype.getGroup = function () {
                return "structure-bitmap";
            }),
            (l.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.F7];
            }),
            (l.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null;
                if (e)
                    for (var t = 0; t < e.length; ++t)
                        if (e[t] instanceof GObject.GElement && e[t].getPaintBBox() && !e[t].getPaintBBox().isEmpty()) return true;
                return false;
            }),
            (l.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e ? e.getEditor() : null,
                    n = t ? GObject.GNode.order(t.getIndividualSelection().slice()) : null,
                    i = [];
                if (n)
                    for (var a = 0; a < n.length; ++a)
                        n[a] instanceof GObject.GElement && n[a].getPaintBBox() && !n[a].getPaintBBox().isEmpty() && i.push(n[a]);
                if (i.length) {
                    (t.beginTransaction(), t.clearSelection());
                    try {
                        var r = this._groupStuff(i);
                        if (r) {
                            var s = r.getParent(),
                                l = r.getNext(),
                                c = this._convertToImage(r);
                            c && (s.insertChild(c, l), s.removeChild(r), t.updateSelection(false, [c]));
                        }
                    } finally {
                        t.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (l.prototype._groupStuff = function (e) {
                if (e && 1 === e.length) return e[0];
                for (
                    var t = gDesigner.getActiveDocument(), n = t ? t.getEditor() : null, i = new GObject.GGroup(), r = [], s = 0;
                    s < e.length;
                    ++s
                ) {
                    (g = e[s]).validateInsertion(i) && r.push(g);
                }
                if (r.length > 0) {
                    var l,
                        c = r[r.length - 1],
                        d = c.getParent(),
                        u = c.getNext();
                    if (!d.isLocked() && i.validateInsertion(d)) {
                        d.insertChild(i, u);
                        var p = gDesigner.getActiveDocument().getScene();
                        try {
                            l = new Set();
                            for (s = 0; s < r.length; ++s) l.add(r[s].getParent());
                            (0, GSaveAction.blockChanges)(n, l, p, i);
                            for (s = 0; s < r.length; ++s) {
                                var g;
                                ((g = r[s]).getParent().removeChild(g), i.appendChild(g));
                            }
                        } finally {
                            (0, GSaveAction.releaseChanges)(n, l, p, i);
                        }
                    }
                }
                return i;
            }),
            (l.prototype._convertToImage = function (e) {
                var t, n;
                (e instanceof GObject.GImage || (t = GObject.GPaintCanvas.getScreenDPI() * GObject.GLength.DPI),
                    e instanceof GObject.GElement && (n = e.getScene()),
                    e instanceof GObject.GImage || (t = Math.max(t || GObject.GLength.DPI, (n && n.getProperty("dpi")) || GObject.GLength.DPI)));
                var i = e.toBitmap(null, null, null, null, null, t),
                    a = new GObject.GImage(),
                    r = 1;
                e instanceof GObject.GImage || (r /= t / GObject.GLength.DPI);
                var s = e.getPaintBBox().getSide(GObject.GRect.Side.TOP_LEFT),
                    l = new GObject.GTransform().scaled(r, r).translated(s.getX(), s.getY());
                return (
                    a.setProperties(
                        ["iw", "ih", "url", "trf", "itrf"],
                        [i.getWidth(), i.getHeight(), i.toImageDataUrl(GObject.GBitmap.ImageType.PNG), l, l]
                    ),
                    a
                );
            }),
            (l.prototype.toString = function () {
                return "[Object GConvertToImageAction]";
            }),
            (module.exports = l));
    };
