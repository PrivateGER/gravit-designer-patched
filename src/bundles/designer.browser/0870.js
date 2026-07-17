module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GAction = require(106);
        function GSplitAction() {
            GSplitAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GSplitAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GSplitAction", "tooltip-description")),
                    shortcut: GSplitAction.SHORTCUT,
                    learnMore: "/docs/organizing-your-designs/groups/",
                }),
            };
        }
        (GObject.GObject.inherit(GSplitAction, GAction),
            (GSplitAction.ID = "modify.split"),
            (GSplitAction.TITLE = new GObject.GLocaleKey("GSplitAction", "title")),
            (GSplitAction.SHORTCUT = [GPlatform.GKey.Constant.SHIFT, GPlatform.GKey.Constant.META, "G"]),
            (GSplitAction.TOOLTIP_CONFIG = null),
            (GSplitAction.prototype.getId = function () {
                return GSplitAction.ID;
            }),
            (GSplitAction.prototype.getTitle = function () {
                return GSplitAction.TITLE;
            }),
            (GSplitAction.prototype.getIcon = function () {
                return "gravit-icon-ungroup";
            }),
            (GSplitAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (GSplitAction.prototype.getGroup = function () {
                return "structure-group";
            }),
            (GSplitAction.prototype.getShortcut = function () {
                return GSplitAction.SHORTCUT;
            }),
            (GSplitAction.prototype.isEnabled = function () {
                if (!GAction.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getIndividualSelection();
                    if (selection)
                        for (var n = 0; n < selection.length; ++n) {
                            var i = selection[n];
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
            (GSplitAction.prototype.execute = function () {
                var editor = gDesigner.getActiveDocument().getEditor(),
                    selection = editor.getIndividualSelection().slice();
                editor.beginTransaction();
                try {
                    var current,
                        parentSet,
                        resultElements = [],
                        scene = gDesigner.getActiveDocument().getScene();
                    editor.clearSelection();
                    try {
                        parentSet = new Set();
                        for (var l = 0; l < selection.length; ++l)
                            (((current = selection[l]) instanceof GObject.GShape && null !== current.getFirstChild()) ||
                                current instanceof GObject.GGroup ||
                                current instanceof GObject.GCompoundShape ||
                                (current instanceof GObject.GSymbol && !current.getMasterSymbol())) &&
                                parentSet.add(current.getParent());
                        (0, Utils.blockChanges)(editor, parentSet, scene);
                        for (l = 0; l < selection.length; ++l)
                            if (
                                (current = selection[l]) instanceof GObject.GGroup ||
                                current instanceof GObject.GCompoundShape ||
                                (current instanceof GObject.GSymbol && !current.getMasterSymbol())
                            ) {
                                var d = current.getParent(),
                                    u = current.getChildren();
                                try {
                                    current.beginUpdate();
                                    for (var p = 0; p < u.length; ++p) {
                                        var g = u[p];
                                        (current.removeChild(g), d.insertChild(g, current), resultElements.push(g));
                                    }
                                } finally {
                                    current.endUpdate();
                                }
                                d.removeChild(current);
                            } else if (current instanceof GObject.GShape && null !== current.getFirstChild()) {
                                ((d = current.getParent()), (u = current.getChildren()));
                                try {
                                    current.beginUpdate();
                                    for (p = u.length - 1; p >= 0; --p) {
                                        g = u[p];
                                        (current.removeChild(g), d.insertChild(g, current.getNext()), resultElements.push(g));
                                    }
                                } finally {
                                    current.endUpdate();
                                }
                                resultElements.push(current);
                            } else resultElements.push(current);
                    } finally {
                        (0, Utils.releaseChanges)(editor, parentSet, scene);
                    }
                    resultElements.length > 0 && editor.updateSelection(false, resultElements);
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(GSplitAction.TITLE));
                }
            }),
            (GSplitAction.prototype.getTooltipConfig = function (key) {
                return (key && GSplitAction.TOOLTIP_CONFIG[key]) || null;
            }),
            (GSplitAction.prototype.toString = function () {
                return "[Object GSplitAction]";
            }),
            (module.exports = GSplitAction));
    };
