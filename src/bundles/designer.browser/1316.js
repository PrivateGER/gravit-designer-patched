module.exports = function (module, exports, require) {
        "use strict";
        (require(19), require(3), require(26));
        var GObject = require(1),
            GPlatform = require(15),
            Utils = require(40),
            GCategory = require(18),
            GElementAction = require(106);
        function GCreateNestedCompoundAction() {}
        (GObject.GObject.inherit(GCreateNestedCompoundAction, GElementAction),
            (GCreateNestedCompoundAction.ID = "modify.createnestedcompound"),
            (GCreateNestedCompoundAction.TITLE = new GObject.GLocaleKey("GCreateNestedCompoundAction", "title")),
            (GCreateNestedCompoundAction.prototype.getId = function () {
                return GCreateNestedCompoundAction.ID;
            }),
            (GCreateNestedCompoundAction.prototype.getTitle = function () {
                return GCreateNestedCompoundAction.TITLE;
            }),
            (GCreateNestedCompoundAction.prototype.getCategory = function () {
                return GCategory.CATEGORY_MODIFY;
            }),
            (GCreateNestedCompoundAction.prototype.getGroup = function () {
                return "structure-boolean";
            }),
            (GCreateNestedCompoundAction.prototype.getShortcut = function () {
                return [GPlatform.GKey.Constant.META, GPlatform.GKey.Constant.ALT_LEFT, "M"];
            }),
            (GCreateNestedCompoundAction.prototype.getIcon = function () {
                return gDesigner.isTouchEnabled() ? "gravit-icon-nested-compound" : "";
            }),
            (GCreateNestedCompoundAction.prototype.isEnabled = function () {
                if (!GElementAction.prototype.isEnabled.call(this)) return false;
                var document = gDesigner.getActiveDocument();
                if (document) {
                    var selection = document.getEditor().getSelection(),
                        n = 0;
                    if (selection && selection.length)
                        for (var i = 0; i < selection.length; ++i) {
                            if ((selection[i] instanceof GObject.GCompoundShape && n++, n >= 2)) return true;
                        }
                }
                return false;
            }),
            (GCreateNestedCompoundAction.prototype.execute = function () {
                var editor = gDesigner.getActiveDocument().getEditor(),
                    orderedSelection = GObject.GNode.order(editor.getIndividualSelection().slice());
                editor.beginTransaction();
                try {
                    for (var targetCompound, extraCompounds = [], affectedParents = new Set(), s = 0; s < orderedSelection.length; ++s) {
                        (shape = orderedSelection[s]) instanceof GObject.GCompoundShape && (targetCompound ? (extraCompounds.push(shape), affectedParents.add(shape.getParent())) : (targetCompound = shape));
                    }
                    if (extraCompounds.length > 0) {
                        try {
                            (0, Utils.blockChanges)(editor, affectedParents, null, targetCompound);
                            for (s = 0; s < extraCompounds.length; ++s) {
                                var shape;
                                ((shape = extraCompounds[s]).getParent().removeChild(shape), targetCompound.appendChild(shape));
                            }
                        } finally {
                            (0, Utils.releaseChanges)(editor, affectedParents, null, targetCompound);
                        }
                        editor.updateSelection(false, [targetCompound]);
                    }
                } finally {
                    editor.commitTransaction("Create nested compound");
                }
            }),
            (GCreateNestedCompoundAction.prototype.toString = function () {
                return "[Object GCreateNestedCompoundAction]";
            }),
            (module.exports = GCreateNestedCompoundAction));
    };
