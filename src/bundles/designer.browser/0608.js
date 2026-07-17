module.exports = function (module, exports, require) {
        "use strict";
        (require(3), require(4), require(41), require(32), require(33));
        var GObject = require(1),
            GPlatform = require(15),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(106),
            GSystemDialog = require(44);
        function GCreateSymbolAction() {
            GCreateSymbolAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "tooltip-description")),
                    learnMore: "/docs/organizing-your-designs/symbols/",
                }),
            };
        }
        (GObject.GObject.inherit(GCreateSymbolAction, GAction),
            (GCreateSymbolAction.ID = "modify.createsymbol"),
            (GCreateSymbolAction.TITLE = new GObject.GLocaleKey("GCreateSymbolAction", "title")),
            (GCreateSymbolAction.SHORTCUT = [GPlatform.GKey.Constant.F8]),
            (GCreateSymbolAction.TOOLTIP_CONFIG = null),
            (GCreateSymbolAction.prototype.getId = function () {
                return GCreateSymbolAction.ID;
            }),
            (GCreateSymbolAction.prototype.getTitle = function () {
                return GCreateSymbolAction.TITLE;
            }),
            (GCreateSymbolAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY_SYMBOL;
            }),
            (GCreateSymbolAction.prototype.getGroup = function () {
                return "structure/modify";
            }),
            (GCreateSymbolAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-create-symbol" : "gravit-icon-symbolmaster";
            }),
            (GCreateSymbolAction.prototype.getShortcut = function () {
                return GCreateSymbolAction.SHORTCUT;
            }),
            (GCreateSymbolAction.prototype.isPro = function () {
                if (!gDesigner.isEnabledProFeatures()) {
                    const document = gDesigner.getActiveDocument();
                    if (document) {
                        const selection = document.getEditor().getIndividualSelection();
                        if (selection && selection.length) return selection.filter((node) => node instanceof GObject.GSymbol).length > 1;
                    }
                }
                return false;
            }),
            (GCreateSymbolAction.prototype.isEnabled = function () {
                if (!GAction.prototype.isEnabled.call(this)) return false;
                var document = gDesigner.getActiveDocument();
                if (document) {
                    var selection = document.getEditor().getIndividualSelection();
                    if (selection && selection.length)
                        for (var n = 0, newSymbol = new GObject.GSymbol(), a = selection.length - 1; a >= 0; --a) {
                            var r = selection[a];
                            if (
                                (r instanceof GObject.GSymbol && !r.getMasterSymbol()) ||
                                (r.validateInsertion(newSymbol) &&
                                    !r.getParent().isLocked() &&
                                    newSymbol.validateInsertion(r.getParent()) &&
                                    !GObject.GSymbol.containsUnsupportedNodes(r))
                            ) {
                                if (!(r instanceof GObject.GSymbol && r.isMaster())) return true;
                                if (++n > 1) return true;
                            }
                        }
                }
                return false;
            }),
            (GCreateSymbolAction.prototype.execute = function () {
                if (!this.isPro() || gDesigner.isEnabledProFeatures()) {
                    var e = 1,
                        baseName = GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "createsymbol.defaultname")),
                        candidateName = baseName + " " + e,
                        document = gDesigner.getActiveDocument();
                    if (document) {
                        var scene = document.getScene();
                        if (scene)
                            ((scene.getSymbols() || []).forEach(function (symbol) {
                                symbol instanceof GObject.GSymbol && symbol.isMaster() && symbol.getProperty("name") === candidateName && (e++, (candidateName = baseName + " " + e));
                            }),
                                GSystemDialog.prompt(
                                    GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "createsymbol.enternewname")),
                                    (newName) => {
                                        if (gDesigner.getActiveDocument() && newName) {
                                            var editor = gDesigner.getActiveDocument().getEditor(),
                                                orderedSelection = GObject.GNode.order(editor.getIndividualSelection().slice());
                                            editor.beginTransaction();
                                            try {
                                                for (var newSymbol = new GObject.GSymbol(), targetParent = null, r = orderedSelection.length - 1; r >= 0; --r) {
                                                    var s = orderedSelection[r];
                                                    if (s instanceof GObject.GSymbol && s.convertToMaster(newName)) orderedSelection.splice(r, 1);
                                                    else if (s.validateInsertion(newSymbol) && !GObject.GSymbol.containsUnsupportedNodes(s)) {
                                                        if (!(targetParent = s.getParent()).isLocked() && newSymbol.validateInsertion(targetParent)) break;
                                                        targetParent = null;
                                                    }
                                                }
                                                targetParent && editor.updateSelection(false, [GObject.GSymbol.create(orderedSelection, targetParent, newName)]);
                                            } finally {
                                                editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GCreateSymbolAction", "title")));
                                            }
                                        }
                                    },
                                    candidateName
                                ));
                    }
                } else gDesigner.handlePROFeatureInterruption();
            }),
            (GCreateSymbolAction.prototype.getTooltipConfig = function (area) {
                return (area && GCreateSymbolAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GCreateSymbolAction.prototype.toString = function () {
                return "[Object GCreateSymbolAction]";
            }),
            (module.exports = GCreateSymbolAction));
    };
