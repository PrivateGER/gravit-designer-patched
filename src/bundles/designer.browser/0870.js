module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            r = require(67),
            GCategory = require(18),
            l = require(106);
        function c() {
            c.TOOLTIP_CONFIG = {
                [r.TOOLTIP_AREA.TOOLBAR]: r.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GSplitAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GSplitAction", "tooltip-description")),
                    shortcut: c.SHORTCUT,
                    learnMore: "/docs/organizing-your-designs/groups/",
                }),
            };
        }
        (GObject.GObject.inherit(c, l),
            (c.ID = "modify.split"),
            (c.TITLE = new GObject.GLocaleKey("GSplitAction", "title")),
            (c.SHORTCUT = [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "G"]),
            (c.TOOLTIP_CONFIG = null),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return c.TITLE;
            }),
            (c.prototype.getIcon = function () {
                return "gravit-icon-ungroup";
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (c.prototype.getGroup = function () {
                return "structure-group";
            }),
            (c.prototype.getShortcut = function () {
                return c.SHORTCUT;
            }),
            (c.prototype.isEnabled = function () {
                if (!l.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getIndividualSelection();
                    if (t)
                        for (var n = 0; n < t.length; ++n) {
                            var i = t[n];
                            if (
                                i instanceof GObject.GGroup ||
                                i instanceof GObject.GCompoundShape ||
                                (i instanceof GObject.GSymbol && !i.getMasterSymbol()) ||
                                (i instanceof GObject.GShape && null !== i.getFirstChild())
                            )
                                return true;
                        }
                }
                return false;
            }),
            (c.prototype.execute = function () {
                var e = gDesigner.getActiveDocument().getEditor(),
                    t = e.getIndividualSelection().slice();
                e.beginTransaction();
                try {
                    var n,
                        i,
                        r = [],
                        s = gDesigner.getActiveDocument().getScene();
                    e.clearSelection();
                    try {
                        i = new Set();
                        for (var l = 0; l < t.length; ++l)
                            (((n = t[l]) instanceof GObject.GShape && null !== n.getFirstChild()) ||
                                n instanceof GObject.GGroup ||
                                n instanceof GObject.GCompoundShape ||
                                (n instanceof GObject.GSymbol && !n.getMasterSymbol())) &&
                                i.add(n.getParent());
                        (0, Utils.blockChanges)(e, i, s);
                        for (l = 0; l < t.length; ++l)
                            if (
                                (n = t[l]) instanceof GObject.GGroup ||
                                n instanceof GObject.GCompoundShape ||
                                (n instanceof GObject.GSymbol && !n.getMasterSymbol())
                            ) {
                                var d = n.getParent(),
                                    u = n.getChildren();
                                try {
                                    n.beginUpdate();
                                    for (var p = 0; p < u.length; ++p) {
                                        var g = u[p];
                                        (n.removeChild(g), d.insertChild(g, n), r.push(g));
                                    }
                                } finally {
                                    n.endUpdate();
                                }
                                d.removeChild(n);
                            } else if (n instanceof GObject.GShape && null !== n.getFirstChild()) {
                                ((d = n.getParent()), (u = n.getChildren()));
                                try {
                                    n.beginUpdate();
                                    for (p = u.length - 1; p >= 0; --p) {
                                        g = u[p];
                                        (n.removeChild(g), d.insertChild(g, n.getNext()), r.push(g));
                                    }
                                } finally {
                                    n.endUpdate();
                                }
                                r.push(n);
                            } else r.push(n);
                    } finally {
                        (0, Utils.releaseChanges)(e, i, s);
                    }
                    r.length > 0 && e.updateSelection(false, r);
                } finally {
                    e.commitTransaction(GObject.GLocale.get(c.TITLE));
                }
            }),
            (c.prototype.getTooltipConfig = function (e) {
                return (e && c.TOOLTIP_CONFIG[e]) || null;
            }),
            (c.prototype.toString = function () {
                return "[Object GSplitAction]";
            }),
            (module.exports = c));
    };
