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
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GGroupAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GGroupAction", "tooltip-description")),
                    shortcut: c.SHORTCUT,
                    learnMore: "/docs/organizing-your-designs/groups/",
                }),
            };
        }
        (GObject.GObject.inherit(c, l),
            (c.ID = "modify.group"),
            (c.TITLE = new GObject.GLocaleKey("GGroupAction", "title")),
            (c.SHORTCUT = [GPlatform.GKey.Constant.META, "G"]),
            (c.TOOLTIP_CONFIG = null),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return c.TITLE;
            }),
            (c.prototype.getIcon = function () {
                return "gravit-icon-group";
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
                    if (t && t.length > 0)
                        for (var n = new GObject.GGroup(), i = t.length - 1; i >= 0; --i) {
                            var a = t[i];
                            if (a.validateInsertion(n) && !a.getParent().isLocked() && n.validateInsertion(a.getParent())) return true;
                        }
                }
                return false;
            }),
            (c.prototype.execute = function () {
                var e = gDesigner.getActiveDocument().getEditor(),
                    t = GObject.GNode.order(e.getIndividualSelection().slice());
                e.beginTransaction();
                try {
                    for (var n = new GObject.GGroup(), i = [], r = 0; r < t.length; ++r) {
                        (p = t[r]).validateInsertion(n) && i.push(p);
                    }
                    if (i.length > 0) {
                        var s = i[i.length - 1],
                            l = s.getParent(),
                            c = s.getNext();
                        if (!l.isLocked() && n.validateInsertion(l)) {
                            l.insertChild(n, c);
                            var d,
                                u = gDesigner.getActiveDocument().getScene();
                            try {
                                d = new Set();
                                for (r = 0; r < i.length; ++r) d.add(i[r].getParent());
                                (0, Utils.blockChanges)(e, d, u, n);
                                for (r = 0; r < i.length; ++r) {
                                    var p;
                                    ((p = i[r]).getParent().removeChild(p), n.appendChild(p));
                                }
                            } finally {
                                (0, Utils.releaseChanges)(e, d, u, n);
                            }
                        }
                        e.updateSelection(false, [n]);
                    }
                } finally {
                    e.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GGroupAction", "title")));
                }
            }),
            (c.prototype.getTooltipConfig = function (e) {
                return (e && c.TOOLTIP_CONFIG[e]) || null;
            }),
            (c.prototype.toString = function () {
                return "[Object GGroupAction]";
            }),
            (module.exports = c));
    };
