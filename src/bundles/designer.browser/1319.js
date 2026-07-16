module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var o = require(53),
            GObject = require(1),
            GSaveAction = require(40),
            GCategory = require(18),
            s = require(106);
        function l() {}
        (GObject.GObject.inherit(l, s),
            (l.ID = "modify.split-line"),
            (l.TITLE = new GObject.GLocaleKey("GSplitLineAction", "title")),
            (l.prototype.getId = function () {
                return l.ID;
            }),
            (l.prototype.getTitle = function () {
                return l.TITLE;
            }),
            (l.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (l.prototype.getGroup = function () {
                return "structure/path";
            }),
            (l.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-break-curve" : null;
            }),
            (l.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null,
                    t = false;
                if (e) for (var n = 0; !t && n < e.length; ++n) e[n] instanceof GObject.GPath && (t = this._isPathSplittable(e[n]));
                return t;
            }),
            (l.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e ? e.getEditor() : null,
                    n = t ? t.getSelection() : null,
                    o = [];
                if (n)
                    for (var r = 0; r < n.length; ++r) {
                        var s = n[r];
                        s instanceof GObject.GPath && this._isPathSplittable(s) && o.push(s);
                    }
                if (o.length) {
                    t.beginTransaction();
                    try {
                        var l,
                            c = [];
                        l = new Set();
                        for (r = 0; r < o.length; ++r) l.add(o[r].getParent());
                        try {
                            (0, GSaveAction.blockChanges)(t, l);
                            for (r = 0; r < o.length; ++r) {
                                var d,
                                    u = o[r],
                                    p = u.getParent(),
                                    g = u.getNext(),
                                    h = u.getAnchorPoints(),
                                    f = false;
                                if (u.getProperty("closed"))
                                    for (d = h.getFirstChild(); null !== d && !d.hasFlag(GObject.GNode.Flag.Selected); d = d.getNext());
                                else (d = h.getFirstChild()).hasFlag(GObject.GNode.Flag.Selected) || (f = true);
                                var m = d,
                                    y = m,
                                    v = m ? m.getNext() || m.getPrevious() : null,
                                    _ = false;
                                for (
                                    u.getProperty("closed") && (_ = true);
                                    null !== m && (m.hasFlag(GObject.GNode.Flag.Selected) || f) && null !== v;

                                ) {
                                    var b,
                                        w = new GObject.GPath(),
                                        C = w.getAnchorPoints();
                                    if (((f = false), w.assignFrom(u), p.insertChild(w, g), c.push(w), (d = h.getNextPoint(m)), _))
                                        ((b = new GObject.GPathBase.AnchorPoint()).deserialize(m.serialize()), (m = b), (_ = false));
                                    else h.removeChild(m);
                                    for (C.appendChild(m); null !== d && !d.hasFlag(GObject.GNode.Flag.Selected) && h.getFirstChild(); )
                                        ((v = h.getNextPoint(d)), h.removeChild(d), C.appendChild(d), (d = v));
                                    if (null !== d && d.hasFlag(GObject.GNode.Flag.Selected) && h.getFirstChild())
                                        ((b = new GObject.GPathBase.AnchorPoint()).deserialize(d.serialize()),
                                            C.appendChild(b),
                                            (v = (m = d) === y ? null : h.getNextPoint(d)));
                                    else v = null;
                                    w.isLine() &&
                                        (w.getPaintLayers().getBorderLayers(true).length ||
                                            (u.getPaintLayers().getFillLayers(true).length
                                                ? w.getPaintLayers().appendChild(new GObject.GStylable.BorderPaintLayer(GObject.GRGBColor.BLACK))
                                                : w.getPaintLayers().appendChild(u.getPaintLayers().getFillLayers(true)[0])));
                                }
                                p.removeChild(u);
                            }
                        } finally {
                            ((0, GSaveAction.releaseChanges)(t, l), c.length && t.updateSelection(false, c.slice(-1)));
                        }
                    } finally {
                        t.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (l.prototype._isPathSplittable = function (e) {
                var t = false,
                    n = o.GElementEditor.getEditor(e),
                    i = n ? n.getPartSelection() : null;
                if (i && i.length)
                    for (var a = 0; !t && a < i.length; ++a)
                        i[a].type == o.GPathEditor.PartType.Point &&
                            (e.getProperty("closed") ||
                                (i[a].point != e.getAnchorPoints().getFirstChild() && i[a].point != e.getAnchorPoints().getLastChild())) &&
                            (t = true);
                return t;
            }),
            (l.prototype.toString = function () {
                return "[Object GSplitLineAction]";
            }),
            (module.exports = l));
    };
