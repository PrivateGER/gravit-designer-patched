module.exports = function (module, exports, require) {
        "use strict";
        require(3);
        var GObject = require(1),
            Utils = require(40),
            GCategory = require(18),
            r = require(106);
        function s() {}
        (GObject.GObject.inherit(s, r),
            (s.ID = "modify.connect-lines"),
            (s.TITLE = new GObject.GLocaleKey("GConnectLinesAction", "title")),
            (s.prototype.getId = function () {
                return s.ID;
            }),
            (s.prototype.getTitle = function () {
                return s.TITLE;
            }),
            (s.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_PATH;
            }),
            (s.prototype.getGroup = function () {
                return "structure/path";
            }),
            (s.prototype.isEnabled = function () {
                if (!r.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getSelection() : null;
                if (e) for (var t = 0; t < e.length; ++t) if (e[t] instanceof GObject.GPath) return true;
                return false;
            }),
            (s.prototype.execute = function () {
                var e = gDesigner.getActiveDocument(),
                    t = e ? e.getEditor() : null,
                    n = t ? t.getSelection() : null,
                    a = [],
                    r = null;
                if (n)
                    for (var s = 0; s < n.length; ++s) {
                        var l = n[s];
                        l instanceof GObject.GPath && (r ? r === l.getParent() && a.push(l) : (r = l.getParent()) && a.push(l));
                    }
                if (a.length) {
                    t.beginTransaction();
                    try {
                        if (1 == a.length) a[0].setProperty("closed", true);
                        else
                            try {
                                (0, Utils.blockChanges)(t, null, null, r);
                                var c,
                                    d = (a = GObject.GNode.order(a))[a.length - 1],
                                    u = d.getProperty("trf"),
                                    p = u ? u.inverted() : null,
                                    g = d.getNext(),
                                    h = [];
                                for (s = 0; s < a.length - 1; ++s)
                                    ((c = a[s]).removeFlag(GObject.GNode.Flag.Selected),
                                        c.setProperty("closed", false),
                                        r.removeChild(c),
                                        (u = (u = c.getProperty("trf")) ? (p ? u.multiplied(p) : u) : p),
                                        (h = h.concat(c.getAnchorPoints().serialize(u))));
                                (d.removeFlag(GObject.GNode.Flag.Selected), r.removeChild(d), (h = h.concat(d.getAnchorPoints().serialize())));
                                var f = new GObject.GPath();
                                (f.getAnchorPoints().deserialize(h), f.assignFrom(d), r.insertChild(f, g));
                            } finally {
                                ((0, Utils.releaseChanges)(t, null, null, r), t.updateSelection(false, [f]));
                            }
                    } finally {
                        t.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (s.prototype.toString = function () {
                return "[Object GConnectLinesAction]";
            }),
            (module.exports = s));
    };
