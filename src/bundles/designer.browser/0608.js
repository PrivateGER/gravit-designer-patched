module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41), require(32), require(33));
        var GObject = require(1),
            GPlatform = require(15),
            a = require(67),
            GCategory = require(18),
            s = require(106),
            GSystemDialog = require(44);
        function c() {
            c.TOOLTIP_CONFIG = {
                [a.TOOLTIP_AREA.TOOLBAR]: a.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "tooltip-description")),
                    learnMore: "/docs/organizing-your-designs/symbols/",
                }),
            };
        }
        (GObject.GObject.inherit(c, s),
            (c.ID = "modify.createsymbol"),
            (c.TITLE = new GObject.GLocaleKey("GCreateSymbolAction", "title")),
            (c.SHORTCUT = [GPlatform.GKey.Constant.F8]),
            (c.TOOLTIP_CONFIG = null),
            (c.prototype.getId = function () {
                return c.ID;
            }),
            (c.prototype.getTitle = function () {
                return c.TITLE;
            }),
            (c.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_SYMBOL;
            }),
            (c.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (c.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-create-symbol" : "gravit-icon-symbolmaster";
            }),
            (c.prototype.getShortcut = function () {
                return c.SHORTCUT;
            }),
            (c.prototype.isPro = function () {
                if (!gDesigner.isEnabledProFeatures()) {
                    const e = gDesigner.getActiveDocument();
                    if (e) {
                        const t = e.getEditor().getIndividualSelection();
                        if (t && t.length) return t.filter((e) => e instanceof GObject.GSymbol).length > 1;
                    }
                }
                return false;
            }),
            (c.prototype.isEnabled = function () {
                if (!s.prototype.isEnabled.call(this)) return false;
                var e = gDesigner.getActiveDocument();
                if (e) {
                    var t = e.getEditor().getIndividualSelection();
                    if (t && t.length)
                        for (var n = 0, i = new GObject.GSymbol(), a = t.length - 1; a >= 0; --a) {
                            var r = t[a];
                            if (
                                (r instanceof GObject.GSymbol && !r.getMasterSymbol()) ||
                                (r.validateInsertion(i) &&
                                    !r.getParent().isLocked() &&
                                    i.validateInsertion(r.getParent()) &&
                                    !GObject.GSymbol.containsUnsupportedNodes(r))
                            ) {
                                if (!(r instanceof GObject.GSymbol && r.isMaster())) return true;
                                if (++n > 1) return true;
                            }
                        }
                }
                return false;
            }),
            (c.prototype.execute = function () {
                if (!this.isPro() || gDesigner.isEnabledProFeatures()) {
                    var e = 1,
                        t = GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "createsymbol.defaultname")),
                        n = t + " " + e,
                        i = gDesigner.getActiveDocument();
                    if (i) {
                        var a = i.getScene();
                        if (a)
                            ((a.getSymbols() || []).forEach(function (i) {
                                i instanceof GObject.GSymbol && i.isMaster() && i.getProperty("name") === n && (e++, (n = t + " " + e));
                            }),
                                GSystemDialog.prompt(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "createsymbol.enternewname")),
                                    (e) => {
                                        if (gDesigner.getActiveDocument() && e) {
                                            var t = gDesigner.getActiveDocument().getEditor(),
                                                n = GObject.GNode.order(t.getIndividualSelection().slice());
                                            t.beginTransaction();
                                            try {
                                                for (var i = new GObject.GSymbol(), a = null, r = n.length - 1; r >= 0; --r) {
                                                    var s = n[r];
                                                    if (s instanceof GObject.GSymbol && s.convertToMaster(e)) n.splice(r, 1);
                                                    else if (s.validateInsertion(i) && !GObject.GSymbol.containsUnsupportedNodes(s)) {
                                                        if (!(a = s.getParent()).isLocked() && i.validateInsertion(a)) break;
                                                        a = null;
                                                    }
                                                }
                                                a && t.updateSelection(false, [GObject.GSymbol.create(n, a, e)]);
                                            } finally {
                                                t.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "title")));
                                            }
                                        }
                                    },
                                    n
                                ));
                    }
                } else gDesigner.handlePROFeatureInterruption();
            }),
            (c.prototype.getTooltipConfig = function (e) {
                return (e && c.TOOLTIP_CONFIG[e]) || null;
            }),
            (c.prototype.toString = function () {
                return "[Object GCreateSymbolAction]";
            }),
            (module.exports = c));
    };
