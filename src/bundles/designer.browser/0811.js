module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GRichTooltipConfig = require(67),
            GCategory = require(18),
            GElementAction = require(106);
        function GGroupAction() {
            GGroupAction.TOOLTIP_CONFIG = {
                [GRichTooltipConfig.TOOLTIP_AREA.TOOLBAR]: GRichTooltipConfig.GRichTooltipConfig.from({
                    title: GObject.GLocale.get(new GObject.GLocaleKey("GGroupAction", "tooltip-title")),
                    description: GObject.GLocale.get(new GObject.GLocaleKey("GGroupAction", "tooltip-description")),
                    shortcut: GGroupAction.SHORTCUT,
                    learnMore: "/docs/organizing-your-designs/groups/",
                }),
            };
        }
        (GObject.GObject.inherit(GGroupAction, GElementAction),
            (GGroupAction.ID = "modify.group"),
            (GGroupAction.TITLE = new GObject.GLocaleKey("GGroupAction", "title")),
            (GGroupAction.SHORTCUT = [GPlatform.GKey.Constant.META, "G"]),
            (GGroupAction.TOOLTIP_CONFIG = null),
            (GGroupAction.prototype.getId = function () {
                return GGroupAction.ID;
            }),
            (GGroupAction.prototype.getTitle = function () {
                return GGroupAction.TITLE;
            }),
            (GGroupAction.prototype.getIcon = function () {
                return "gravit-icon-group";
            }),
            (GGroupAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (GGroupAction.prototype.getGroup = function () {
                return "structure-group";
            }),
            (GGroupAction.prototype.getShortcut = function () {
                return GGroupAction.SHORTCUT;
            }),
            (GGroupAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var activeDocument = gDesigner.getActiveDocument();
                if (activeDocument) {
                    var selection = activeDocument.getEditor().getIndividualSelection();
                    if (selection && selection.length > 0)
                        for (var group = new GObject.GGroup(), i = selection.length - 1; i >= 0; --i) {
                            var a = selection[i];
                            if (a.validateInsertion(group) && !a.getParent().isLocked() && group.validateInsertion(a.getParent())) return true;
                        }
                }
                return false;
            }),
            (GGroupAction.prototype.execute = function () {
                var editor = gDesigner.getActiveDocument().getEditor(),
                    orderedSelection = GObject.GNode.order(editor.getIndividualSelection().slice());
                editor.beginTransaction();
                try {
                    for (var group = new GObject.GGroup(), validElements = [], r = 0; r < orderedSelection.length; ++r) {
                        (child = orderedSelection[r]).validateInsertion(group) && validElements.push(child);
                    }
                    if (validElements.length > 0) {
                        var lastElement = validElements[validElements.length - 1],
                            parent = lastElement.getParent(),
                            nextSibling = lastElement.getNext();
                        if (!parent.isLocked() && group.validateInsertion(parent)) {
                            parent.insertChild(group, nextSibling);
                            var parents,
                                scene = gDesigner.getActiveDocument().getScene();
                            try {
                                parents = new Set();
                                for (r = 0; r < validElements.length; ++r) parents.add(validElements[r].getParent());
                                (0, Utils.blockChanges)(editor, parents, scene, group);
                                for (r = 0; r < validElements.length; ++r) {
                                    var child;
                                    ((child = validElements[r]).getParent().removeChild(child), group.appendChild(child));
                                }
                            } finally {
                                (0, Utils.releaseChanges)(editor, parents, scene, group);
                            }
                        }
                        editor.updateSelection(false, [group]);
                    }
                } finally {
                    editor.commitTransaction(GObject.GLocale.get(new GObject.GLocaleKey("GGroupAction", "title")));
                }
            }),
            (GGroupAction.prototype.getTooltipConfig = function (area) {
                return (area && GGroupAction.TOOLTIP_CONFIG[area]) || null;
            }),
            (GGroupAction.prototype.toString = function () {
                return "[Object GGroupAction]";
            }),
            (module.exports = GGroupAction));
    };
