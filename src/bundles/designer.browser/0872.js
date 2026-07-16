module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GSaveAction = require(40),
            a = require(67),
            GCategory = require(18),
            s = require(106);
        function l() {
            l.TOOLTIP_CONFIG = {
                [a.TOOLTIP_AREA.TOOLBAR]: a.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GVectorizeBorderAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GVectorizeBorderAction", "tooltip-description")),
                    learnMore: "/docs/basics/modify-paths/#vectorize-borders",
                }),
            };
        }
        (GObject.GObject.inherit(l, s),
            (l.ID = "modify.vectorize"),
            (l.TITLE = new GObject.GLocaleKey("GVectorizeBorderAction", "title")),
            (l.TOOLTIP_CONFIG = null),
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
                return "structure/modify";
            }),
            (l.prototype.getIcon = function () {
                return "gravit-icon-vectorize-border";
            }),
            (l.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument() ? gDesigner.getActiveDocument().getEditor().getIndividualSelection() : null,
                    t = false;
                if (e)
                    for (var n = 0; !t && n < e.length; ++n)
                        if (!(e[n] instanceof GObject.GImage) && e[n].hasMixin(GObject.GVertexSource) && e[n].hasMixin(GObject.GStylable)) {
                            var i = e[n].getPaintLayers(),
                                a = i ? i.getBorderLayers(true) : null;
                            t = a && a.length >= 1;
                        }
                return t;
            }),
            (l.prototype.execute = function () {
                var e,
                    t = gDesigner.getActiveDocument(),
                    n = t ? t.getEditor() : null,
                    a = (t && t.getScene(), n ? n.getIndividualSelection() : null),
                    r = [];
                if (a)
                    for (var s = 0; s < a.length; ++s) {
                        var l = a[s];
                        !l.hasMixin(GObject.GVertexSource) || l instanceof GObject.GImage || !l.hasMixin(GObject.GStylable) || r.push(l);
                    }
                if (r.length) {
                    var c = function (e, t) {
                        if (t instanceof GObject.GPath) e.getPaths().appendChild(t);
                        else
                            for (var n, i = t.cloneSubPaths(), a = i.getFirstChild(); null !== a; a = n)
                                ((n = a.getNext()), i.removeChild(a), e.getPaths().appendChild(a));
                    };
                    n.beginTransaction();
                    try {
                        var d,
                            u = [],
                            p = function (e) {
                                var t = e.getProperty("_ba"),
                                    n = e.getProperty("_bw");
                                n = n || 1;
                                var i,
                                    a = t == GObject.GStylable.BorderAlignment.Center ? 0.5 * n : n,
                                    r = new GObject.GVertexOffsetter(
                                        GObject.GPathUtil.makeClockWise(d),
                                        a,
                                        t != GObject.GStylable.BorderAlignment.Outside,
                                        t != GObject.GStylable.BorderAlignment.Inside,
                                        0,
                                        e.getProperty("_blc"),
                                        e.getProperty("_bml")
                                    );
                                if (t == GObject.GStylable.BorderAlignment.Center) i = GObject.GPathUtil.createPathFromVertexSource(r);
                                else {
                                    var s = GObject.GPathUtil.createPathFromVertexSource(d),
                                        l = GObject.GPathUtil.createPathFromVertexSource(r);
                                    s && ((i = new GObject.GCompoundPath()), c(i, s), l && c(i, l));
                                }
                                return (
                                    i &&
                                        (GObject.GElement.prototype.assignFrom.call(i, d),
                                        i.getPaintLayers().clearLayers(),
                                        e.$_pt && i.getPaintLayers().appendChild(new GObject.GStylable.FillPaintLayer(e.$_pt))),
                                    i
                                );
                            };
                        e = new Set();
                        for (s = 0; s < r.length; ++s) {
                            var g = r[s].getParent();
                            g && e.add(g);
                        }
                        try {
                            (0, GSaveAction.blockChanges)(n, e);
                            for (s = 0; s < r.length; ++s) {
                                var h = (d = r[s]).getParent(),
                                    f = d.getNext(),
                                    m = null,
                                    y = d.getPaintLayers().getBorderLayers(true);
                                if (y.length > 1)
                                    GObject.GUtil.each(y, function (e, t) {
                                        var n = p(t);
                                        n && (m || (m = new GObject.GGroup()), m.appendChild(n));
                                    });
                                else if (1 == y.length) {
                                    var v = y.pop();
                                    m = p(v);
                                }
                                m ? (h.insertChild(m, f), u.push(m), h.removeChild(d)) : u.push(d);
                            }
                        } finally {
                            ((0, GSaveAction.releaseChanges)(n, e), u.length && n.updateSelection(false, u));
                        }
                    } finally {
                        n.commitTransaction(GObject.GLocale.get(this.getTitle()));
                    }
                }
            }),
            (l.prototype.getTooltipConfig = function (e) {
                return (e && l.TOOLTIP_CONFIG[e]) || null;
            }),
            (l.prototype.toString = function () {
                return "[Object GVectorizeBorderAction]";
            }),
            (module.exports = l));
    };
